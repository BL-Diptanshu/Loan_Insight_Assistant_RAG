import json
import os
from typing import Optional
from groq import Groq
from pydantic import ValidationError

from ..schemas import QueryIntentSchema, IntentType, ComplianceTone

class QueryUnderstandingAgent:
    def __init__(self, model_name: str = "llama-3.3-70b-versatile", api_key: Optional[str] = None):
        self.model_name = model_name
        self.api_key = api_key or os.getenv('GROQ_API_KEY')
        self.client = None
        if self.api_key:
            self.client = Groq(api_key=self.api_key)
        else:
            print("[WARN] Groq API Key missing. QueryUnderstandingAgent will fail.")

    def analyze_query(self, query: str) -> QueryIntentSchema:
        if not self.client:
            return self._fallback_intent(query)

        prompt = f"""
You are an expert Loan Query Understanding Agent.
Your goal is to analyze the user's query and extract structured intent information.

USER QUERY: "{query}"

Output must be a valid JSON object matching this structure:
{{
    "intent": "allowed_values: why_rejected, why_approved, similar_cases, risk_analysis, audit_reason, general_inquiry",
    "loan_id": "extracted loan ID if present, else null",
    "filters": {{ "field": "value" }} (extract constraints like amount > 50000, term=short),
    "top_k_hint": integer (implied number of cases to find, default 5),
    "compliance_tone": "allowed_values: audit, business, neutral",
    "confidence_score": float (0.0 to 1.0)
}}

Rules:
1. If the user asks "Why was loan X rejected?", intent is "why_rejected" and loan_id is "X".
2. If the user asks for "similar cases", intent is "similar_cases".
3. If the user mentions "audit" or "compliance", set compliance_tone to "audit".
4. Return ONLY JSON.
"""

        try:
            response = self.client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that outputs JSON only."},
                    {"role": "user", "content": prompt}
                ],
                model=self.model_name,
                temperature=0.0,
                response_format={"type": "json_object"}
            )
            content = response.choices[0].message.content
            data = json.loads(content)
            
            # Validate with Pydantic
            return QueryIntentSchema(**data)

        except (json.JSONDecodeError, ValidationError) as e:
            print(f"[ERROR] Failed to parse intent: {e}")
            return self._fallback_intent(query)
        except Exception as e:
            print(f"[ERROR] LLM Error: {e}")
            return self._fallback_intent(query)

    def _fallback_intent(self, query: str) -> QueryIntentSchema:
        """Simple keyword fallback"""
        query_lower = query.lower()
        intent = IntentType.GENERAL_INQUIRY
        tone = ComplianceTone.NEUTRAL
        
        if "reject" in query_lower:
            intent = IntentType.WHY_REJECTED
        elif "approve" in query_lower:
            intent = IntentType.WHY_APPROVED
        elif "similar" in query_lower:
            intent = IntentType.SIMILAR_CASES
        elif "risk" in query_lower:
            intent = IntentType.RISK_ANALYSIS
        
        if "audit" in query_lower:
            tone = ComplianceTone.AUDIT

        return QueryIntentSchema(
            intent=intent,
            compliance_tone=tone,
            confidence_score=0.5
        )

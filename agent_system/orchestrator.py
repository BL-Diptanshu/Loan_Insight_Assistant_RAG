from typing import Optional
from .schemas import UserQueryInput, FinalResponseSchema
from .agents.query_agent import QueryUnderstandingAgent
from .agents.explanation_agent import ExplanationAgent
from .retrieval_wrapper import retrieval_system

class AgentOrchestrator:
    def __init__(self):
        self.query_agent = QueryUnderstandingAgent()
        self.explanation_agent = ExplanationAgent()
        
        # Ensure retrieval system is ready
        retrieval_system.initialize()

    def pydantic_ai_pipeline(self, user_input: UserQueryInput) -> FinalResponseSchema:
        """
        Main pipeline: Query -> Intent -> Retrieval -> Explanation
        """
        print(f"\n[Orchestrator] Processing query: {user_input.query_text}")
        
        # 1. Query Understanding
        intent_schema = self.query_agent.analyze_query(user_input.query_text)
        print(f"[Orchestrator] Intent Detected: {intent_schema.intent} (Confidence: {intent_schema.confidence_score})")
        
        # 2. Retrieval
        cases = retrieval_system.retrieve_cases(
            query_text=user_input.query_text,
            top_k=intent_schema.top_k_hint,
            filters=intent_schema.filters
        )
        print(f"[Orchestrator] Retrieved {len(cases)} cases.")
        
        # 3. Explanation (Handover to Raj's Agent)
        final_response = self.explanation_agent.generate_explanation(
            query=user_input.query_text,
            intent=intent_schema,
            cases=cases
        )
        
        return final_response

# Simple entry point for testing
def run_orchestrator():
    orchestrator = AgentOrchestrator()
    query = input("Enter loan query: ")
    if query:
        response = orchestrator.pydantic_ai_pipeline(UserQueryInput(query_text=query))
        print("\n=== FINAL RESPONSE ===")
        print(response.model_dump_json(indent=2))

if __name__ == "__main__":
    run_orchestrator()

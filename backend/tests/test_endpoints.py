from fastapi.testclient import TestClient
import sys
import os
from unittest.mock import MagicMock, patch
from enum import Enum

# Add parent directory to path to import main
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# Mock MongoDB connection BEFORE importing main
with patch("database.connection.connect_to_mongo"), \
     patch("database.connection.close_mongo_connection"):
    from main import app

# Create a TestClient
client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_dashboard_stats():
    # Mocking the dashboard stats in api.py or services.py would be better,
    # but for now we assume the file exists or handle error gracefully.
    # If file missing, backend returns error. We can mock it.
    
    with patch("services.loan_api.get_dashboard_stats") as mock_stats:
        mock_stats.return_value = {
            "total_loans": 100,
            "approval_rate": 80.0,
            "avg_cibil": 750,
            "avg_loan_amount": 500000,
            "loan_status_distribution": [],
            "loan_type_distribution": [],
            "recent_applications": []
        }
        
        response = client.get("/dashboard-stats")
        assert response.status_code == 200
        data = response.json()
        assert "total_loans" in data
        assert "approval_rate" in data

class MockIntent(str, Enum):
    TEST = "test_intent"

def test_query_endpoint_validation():
    # Test valid payload with mocked backend
    # mocking loan_api.get_insights on the backend module
    with patch("services.loan_api") as mock_api:
        # Mock the return value of get_insights
        msg = MagicMock()
        msg.summary = "Test summary"
        msg.intent = MockIntent.TEST
        msg.evidence_points = []
        msg.risk_notes = []
        msg.compliance_disclaimer = "Compliance"
        msg.structured_data = [] # empty list
        msg.retrieved_case_count = 0
        msg.source = "rag"
        
        # We need to ensure the mock returns an object that has model_dump() method 
        msg.model_dump.return_value = {
            "summary": "Test summary",
            "intent": "test_intent", 
            "evidence_points": [],
            "risk_notes": [],
            "compliance_disclaimer": "Compliance",
            "structured_data": [],
            "retrieved_case_count": 0,
            "source": "rag"
        }
        
        mock_api.get_insights.return_value = msg

        response = client.post("/query-loan-insights", json={"query": "Test query"})
        assert response.status_code == 200
        data = response.json()
        assert data["answer"] == "Test summary"


Loan Insight Assistant - Technical Documentation
📌 Overview
The Loan Insight Assistant is an advanced Retrieval-Augmented Generation (RAG) system designed for intelligent analysis and searching of loan application data. It leverages semantic search (via FAISS and Sentence Transformers) and LLM-driven reasoning (via Groq API) to provide both mathematical analysis and contextual insights from a dataset of loan records.

🏗️ System Architecture
The system is divided into three primary layers:

1. Data & Vector Layer (rag/)
   This layer handles the core RAG components:

embedding_generator.py
: Utilizes the all-MiniLM-L6-v2 model from Sentence Transformers to convert text representations of loan data into 384-dimensional dense vectors.
vector_store.py
: Manages a FAISS (Facebook AI Similarity Search) index. It supports fast similarity searches using L2 normalized vectors and cosine similarity.
langchain_Retriver.py
: Provides a LangChain-compatible wrapper for the RAG components. It defines
LoanEmbeddings
(embedding wrapper),
LoanFAISSVectorStore
(vector store wrapper), and
LoanRAGRetriever
(the high-level retrieval logic).
llm_router.py
: An intelligent routing component using Groq's llama-3.3-70b-versatile. It classifies user queries into MATHEMATICAL (calculations/filtering) or SEMANTIC (context/reasons) and can generate executable Pandas code for math queries. 2. Agent System Layer (agent_system/)
This layer implements a more structured "Agentic" approach to query handling:

orchestrator.py
: The central coordinator. It runs a pipeline: Query -> Intent Detection -> Retrieval -> Explanation.
agents/query_agent.py
: An LLM-powered agent that parses raw user queries into a structured
QueryIntentSchema
, identifying the intent (e.g., why_rejected), filters, and compliance tone.
agents/explanation_agent.py
: Responsible for taking retrieved loan cases and generating a natural language summary or explanation (currently in placeholder/early implementation).
retrieval_wrapper.py
: A singleton wrapper that bridges the agent_system with the rag layer, ensuring components are initialized once and accessible globally.
schemas.py
: Defines the project's data contract using Pydantic models (Enums for Intents, Risk Flags, and structure for Queries and Responses). 3. Execution & Interface
simple_qa.py
: The primary demonstration script. It initializes the entire RAG system and provides an interactive CLI. It uses the
LLMRoutingAgent
to dynamically choose between semantic search and pandas-based data analysis.
🔄 Core Data Flow
Process A: RAG Pipeline Construction
Load Data: The system reads processed_loan_data_with_embeddings.csv from the output/ directory.
Setup RAG:
Load pre-computed embeddings from loan_embeddings.npy.
Initialize the FAISS index with these embeddings.
Wrap everything in a
LoanRAGRetriever
.
Process B: Query Processing (Dynamic Mode -
simple_qa.py
)
Input: User submits a query (e.g., "What is the average income of approved loans?").
Routing:
LLMRoutingAgent
classifies the query.
If MATHEMATICAL:
LLM generates a Pandas snippet (e.g., result = df[df['Loan_Status'] == 'Approved']['Applicant_Income'].mean()).
System executes code safely and returns the result.
If SEMANTIC:
LoanRAGRetriever
finds the top $K$ most similar loan records using semantic embeddings.
LLM analyzes these retrieved records to generate a contextual answer.
📂 Key Project Files
File Purpose
simple_qa.py
Main entry point for dynamic, LLM-powered Q&A.
rag/llm_router.py
Logic for query classification and Pandas code generation.
rag/langchain_Retriver.py
LangChain integration for semantic search.
agent_system/orchestrator.py
Orchestration of structured agentic workflows.
agent_system/schemas.py
Pydantic data models (the "source of truth" for data structure).
output/ Contains the FAISS index, embeddings, and processed data.
🛠️ Tech Stack
Languages: Python 3.8+
Data Science: Pandas, NumPy
ML/NLP: Sentence-Transformers, PyTorch
Vector Search: FAISS (Meta AI)
Frameworks: LangChain, Pydantic
LLM API: Groq (Llama 3.3 70B)
NOTE

This project is designed to be highly modular. The rag package can be used independently for search, while the agent_system provides a higher-level abstraction for complex multi-step reasoning.

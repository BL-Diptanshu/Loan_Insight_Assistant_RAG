import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Analytics from "../components/Analytics";
import QueryInput from "../components/QueryInput";
import ResponseCard from "../components/ResponseCard";
import { queryLoanInsights } from "../services/loanInsightsApi";

const Home = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const data = await queryLoanInsights(question);
      setResponse(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'query':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="glass-dark neon-border rounded-xl p-6 card-hover">
              <h2 className="text-2xl font-bold gradient-text mb-2">AI Query Assistant</h2>
              <p className="text-gray-300">
                Ask natural language questions about historical loan decisions and get AI-powered insights
              </p>
            </div>

            {/* Query Section */}
            <div className="glass-dark neon-border rounded-xl p-8 card-hover">
              <QueryInput
                question={question}
                setQuestion={setQuestion}
                onSubmit={handleSubmit}
                loading={loading}
              />

              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start backdrop-blur-sm">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-red-300">Error</h3>
                    <p className="text-sm text-red-200 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {response && <ResponseCard data={response} />}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-dark border border-blue-500/30 rounded-xl p-6 card-hover group">
                <div className="w-12 h-12 bg-gradient-blue rounded-lg flex items-center justify-center mb-4 animate-float transition-transform group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Compliance Safe</h3>
                <p className="text-sm text-gray-300">
                  No approval decisions made. Only historical insights provided.
                </p>
              </div>

              <div className="glass-dark border border-cyan-500/30 rounded-xl p-6 card-hover group">
                <div className="w-12 h-12 bg-gradient-cyan rounded-lg flex items-center justify-center mb-4 animate-float transition-transform group-hover:scale-110" style={{animationDelay: '0.2s'}}>
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeLinecap="round" />
                    <path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Fast Retrieval</h3>
                <p className="text-sm text-gray-300">
                  FAISS-powered vector search for instant similar case matching.
                </p>
              </div>

              <div className="glass-dark border border-purple-500/30 rounded-xl p-6 card-hover group">
                <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center mb-4 animate-float transition-transform group-hover:scale-110" style={{animationDelay: '0.4s'}}>
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a4 4 0 014 4c0 1.5-.8 2.8-2 3.5V11h-4V9.5A4 4 0 0112 2z" />
                    <path d="M10 11v2a2 2 0 104 0v-2" />
                    <path d="M8 17h8M9 21h6" strokeLinecap="round" />
                    <circle cx="12" cy="6" r="1" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Explainable AI</h3>
                <p className="text-sm text-gray-300">
                  Clear explanations with risk factors and historical trends.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen mesh-gradient">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsMobileSidebarOpen(false);
        }} 
        isOpen={isMobileSidebarOpen}
      />

      {/* Main Content */}
      <div className="lg:ml-64 transition-all duration-200">
        {/* Top Bar */}
        <div className="glass-dark border-b border-white/10 px-4 md:px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button 
                className="mr-4 lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div>
                <h1 className="text-xl md:text-2xl font-bold gradient-text">
                  {activeTab === 'dashboard' && 'Dashboard'}
                  {activeTab === 'analytics' && 'Analytics'}
                  {activeTab === 'query' && 'Query Assistant'}
                </h1>
                <p className="text-xs md:text-sm text-gray-400 mt-1 hidden md:block">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            

          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Home;

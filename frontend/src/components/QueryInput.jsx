const QueryInput = ({ question, setQuestion, onSubmit, loading }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !loading && question.trim()) {
      onSubmit();
    }
  };

  return (
    <div>
      <label htmlFor="question-input" className="block text-sm font-medium text-gray-300 mb-2">
        Your Question
      </label>
      
      <textarea
        id="question-input"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., Why are home loans rejected for applicants with income between $50k-$70k?"
        rows={5}
        disabled={loading}
        className="w-full bg-white/5 border-2 border-white/10 rounded-lg p-4 text-base text-white
                   placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                   disabled:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50
                   transition-all duration-200 resize-y"
        style={{ minHeight: '120px', maxHeight: '400px' }}
      />

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400">
          {question.length} characters
          {question.trim() && ' • Press Ctrl+Enter to submit'}
        </span>
        {question.length > 500 && (
          <span className="text-xs text-amber-400">
            Consider keeping your question concise
          </span>
        )}
      </div>

      <button
        onClick={onSubmit}
        disabled={loading || !question.trim()}
        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-base
                   hover:from-blue-500 hover:to-purple-500 active:from-blue-700 active:to-purple-700
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
                   disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:opacity-50
                   transition-all duration-200
                   shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 neon-glow"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get Insights
          </span>
        )}
      </button>
    </div>
  );
};

export default QueryInput;

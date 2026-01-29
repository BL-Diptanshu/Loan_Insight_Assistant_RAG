const ResponseCard = ({ data }) => {
  return (
    <div className="mt-6 glass-dark neon-border rounded-xl p-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-xl font-bold text-white">Insight Summary</h3>
          <p className="text-sm text-gray-400 mt-1">Based on historical loan data analysis</p>
        </div>

      </div>

      {/* Explanation */}
      <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <p className="text-gray-200 leading-relaxed text-base">
          {data.explanation}
        </p>
      </div>

      {/* Risk Factors */}
      <div className="mb-5 bg-red-500/10 rounded-lg p-4 border border-red-500/30">
        <h4 className="font-semibold text-white mb-3 flex items-center">
          <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Common Risk Factors
        </h4>
        <ul className="space-y-2">
          {data.common_risk_factors.map((risk, index) => (
            <li key={index} className="flex items-start text-sm text-gray-300">
              <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              <span>{risk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 card-hover">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            Historical Trend
          </p>
          <p className="text-sm font-semibold text-cyan-400">
            {data.historical_trend}
          </p>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10 card-hover">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            Similar Cases
          </p>
          <p className="text-sm font-semibold text-purple-400">
            {data.similar_cases_found}
          </p>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10 card-hover">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            Confidence Level
          </p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.round(data.confidence * 100)}%` }}
              ></div>
            </div>
            <span className="text-sm font-semibold text-blue-400">
              {Math.round(data.confidence * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-500 text-center">
          This analysis is based on historical data and should be used for informational purposes only
        </p>
      </div>
    </div>
  );
};

export default ResponseCard;

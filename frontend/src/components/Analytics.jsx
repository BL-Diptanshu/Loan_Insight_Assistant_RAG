import {
  BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const Analytics = () => {
  // Loan Type Distribution
  const loanTypeData = [
    { name: 'Home Loans', value: 3542, color: '#3b82f6' },
    { name: 'Auto Loans', value: 2156, color: '#10b981' },
    { name: 'Personal Loans', value: 1834, color: '#f59e0b' },
    { name: 'Business Loans', value: 1289, color: '#8b5cf6' },
    { name: 'Education Loans', value: 611, color: '#ec4899' },
  ];

  // Approval vs Rejection Trends
  const approvalTrendData = [
    { month: 'Jan', approved: 4200, rejected: 1800 },
    { month: 'Feb', approved: 4800, rejected: 1600 },
    { month: 'Mar', approved: 5300, rejected: 1900 },
    { month: 'Apr', approved: 4900, rejected: 1700 },
    { month: 'May', approved: 5600, rejected: 2100 },
    { month: 'Jun', approved: 5800, rejected: 1950 },
  ];

  // Daily Query Volume (Last 7 Days)
  const dailyQueryData = [
    { day: 'Mon', queries: 187 },
    { day: 'Tue', queries: 203 },
    { day: 'Wed', queries: 195 },
    { day: 'Thu', queries: 221 },
    { day: 'Fri', queries: 234 },
    { day: 'Sat', queries: 98 },
    { day: 'Sun', queries: 109 },
  ];

  // Income Range Analysis
  const incomeRangeData = [
    { range: '<$30k', approved: 120, rejected: 380 },
    { range: '$30-50k', approved: 450, rejected: 250 },
    { range: '$50-70k', approved: 680, rejected: 180 },
    { range: '$70-100k', approved: 890, rejected: 110 },
    { range: '$100k+', approved: 1200, rejected: 80 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-dark neon-border rounded-xl p-6 card-hover">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold gradient-text mb-2">Analytics Overview</h2>
            <p className="text-gray-300">Key insights into loan decision patterns and trends</p>
          </div>
          <div className="flex items-center space-x-3">
            <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50">
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Last Month</option>
              <option>Last Week</option>
            </select>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all flex items-center space-x-2 neon-glow group">
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-dark border border-blue-500/30 rounded-xl p-6 text-white card-hover group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-300 text-sm font-medium">Total Cases</span>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M7 7h10M7 12h10M7 17h6" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">9,432</p>
          <p className="text-blue-400 text-sm">+12.5% from last period</p>
        </div>

        <div className="glass-dark border border-green-500/30 rounded-xl p-6 text-white card-hover group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-300 text-sm font-medium">Approval Rate</span>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">74.8%</p>
          <p className="text-green-400 text-sm">+2.3% from last period</p>
        </div>

        <div className="glass-dark border border-purple-500/30 rounded-xl p-6 text-white card-hover group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-300 text-sm font-medium">Avg Confidence</span>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 16l4-4 4 4 5-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">87.3%</p>
          <p className="text-purple-400 text-sm">+3.1% from last period</p>
        </div>

        <div className="glass-dark border border-orange-500/30 rounded-xl p-6 text-white card-hover group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-orange-300 text-sm font-medium">Total Queries</span>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.82 3.889 6.115l-.78 3.77 4.076-2.131c.588.086 1.193.131 1.815.131 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">1,247</p>
          <p className="text-orange-400 text-sm">+18.7% from last period</p>
        </div>
      </div>

      {/* Charts Row 1: Loan Type Distribution & Approval vs Rejection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loan Type Distribution - Pie Chart */}
        <div className="glass-dark neon-border rounded-xl p-6 card-hover">
          <h3 className="text-lg font-bold text-white mb-4">Loan Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={loanTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {loanTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(59, 130, 246, 0.3)', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {loanTypeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-300">{item.name}</span>
                </div>
                <span className="font-semibold text-white">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Approval vs Rejection Trends - Area Chart */}
        <div className="glass-dark neon-border rounded-xl p-6 card-hover">
          <h3 className="text-lg font-bold text-white mb-4">Approval vs Rejection Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={approvalTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(59, 130, 246, 0.3)', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend wrapperStyle={{ color: '#9ca3af' }} />
              <Area type="monotone" dataKey="approved" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Approved" />
              <Area type="monotone" dataKey="rejected" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Rejected" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2: Daily Query & Income Range */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Query Activity - Bar Chart */}
        <div className="glass-dark neon-border rounded-xl p-6 card-hover">
          <h3 className="text-lg font-bold text-white mb-4">Daily Query Activity (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyQueryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(59, 130, 246, 0.3)', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="queries" fill="#3b82f6" name="Queries" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Approval by Income Range - Bar Chart */}
        <div className="glass-dark neon-border rounded-xl p-6 card-hover">
          <h3 className="text-lg font-bold text-white mb-4">Approval by Income Range</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeRangeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="range" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(59, 130, 246, 0.3)', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend wrapperStyle={{ color: '#9ca3af' }} />
              <Bar dataKey="approved" fill="#10b981" name="Approved" radius={[8, 8, 0, 0]} />
              <Bar dataKey="rejected" fill="#ef4444" name="Rejected" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-dark border border-blue-500/30 rounded-xl p-6 card-hover group">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center animate-float transition-transform group-hover:scale-110">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 17l5-5-5-5M6 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="font-bold text-white">Peak Performance</h4>
          </div>
          <p className="text-sm text-gray-300">
            Friday shows highest query volume with 234 queries, indicating peak user activity.
          </p>
        </div>

        <div className="glass-dark border border-green-500/30 rounded-xl p-6 card-hover group">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center animate-float transition-transform group-hover:scale-110" style={{animationDelay: '0.2s'}}>
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="font-bold text-white">Top Performer</h4>
          </div>
          <p className="text-sm text-gray-300">
            Home loans represent 37.5% of all queries with highest approval rates in ₹70k+ income range.
          </p>
        </div>

        <div className="glass-dark border border-orange-500/30 rounded-xl p-6 card-hover group">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center animate-float transition-transform group-hover:scale-110" style={{animationDelay: '0.4s'}}>
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 6v2m0 8v2" strokeLinecap="round" />
                <path d="M9 10c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2s-.9 2-2 2h-2c-1.1 0-2 .9-2 2s.9 2 2 2h2c1.1 0 2-.9 2-2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="font-bold text-white">Income Insight</h4>
          </div>
          <p className="text-sm text-gray-300">
            Clear correlation: Higher income ranges show significantly better approval rates (93.8% for ₹100k+).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

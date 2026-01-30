const Sidebar = ({ activeTab, setActiveTab, isOpen }) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      )
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 16l4-4 4 4 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    { 
      id: 'query', 
      label: 'Query Assistant', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.82 3.889 6.115l-.78 3.77 4.076-2.131c.588.086 1.193.131 1.815.131 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="10" r="1" fill="currentColor" />
          <circle cx="12" cy="10" r="1" fill="currentColor" />
          <circle cx="16" cy="10" r="1" fill="currentColor" />
        </svg>
      )
    },
  ];

  return (
    <div 
      className={`
        w-64 glass-dark text-white h-screen fixed left-0 top-0 flex flex-col z-30
        transform transition-transform duration-200 ease-in-out border-r border-white/10
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 animate-scale-pulse">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text">Loan Insights</h1>
            <p className="text-xs text-gray-400">AI Assistant</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all group ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className={`transition-transform duration-300 ${activeTab === item.id ? 'animate-bounce-subtle' : 'group-hover:scale-110'}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
            {activeTab === item.id && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-sm font-semibold">U</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium sidebar-text">User</p>
            <p className="text-xs sidebar-subtext">Analyst</p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

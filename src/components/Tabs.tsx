const Tabs: React.FC<{ tabs: { id: string; label: string; content: React.ReactNode }[]; activeTab: string; onTabChange: (id: string) => void }> = ({ tabs, activeTab, onTabChange }) => (
  <div>
    <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
      {tabs.map((tab: { id: string; label: string; content: React.ReactNode }) => (
        <button
          key={tab.id}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "bg-white text-blue-700 shadow-sm"
              : "text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
    <div className="mt-6">{tabs.find((tab: { id: string }) => tab.id === activeTab)?.content}</div>
  </div>
);

export default Tabs;
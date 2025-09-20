import React, { useState, useEffect } from 'react'

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('templates')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Save Settings
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export Configuration
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'templates', label: 'Templates' },
            { id: 'mapping-libraries', label: 'Mapping Libraries' },
            { id: 'disclosure-defaults', label: 'Disclosure Defaults' },
            { id: 'styles-branding', label: 'Styles/Branding' },
            { id: 'roles-permissions', label: 'Roles/Permissions' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'templates' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Account Templates</h2>
          <div className="space-y-4">
            {[
              { name: 'FRS 102 Full Template', framework: 'FRS 102', type: 'Full Accounts', lastUpdated: '2024-01-15' },
              { name: 'FRS 102 Small Company', framework: 'FRS 102', type: 'Small Company', lastUpdated: '2024-01-15' },
              { name: 'FRS 105 Micro Entity', framework: 'FRS 105', type: 'Micro Entity', lastUpdated: '2024-01-15' },
              { name: 'IFRS Template', framework: 'IFRS', type: 'Full Accounts', lastUpdated: '2024-01-15' },
              { name: 'LLP Template', framework: 'LLP', type: 'Partnership', lastUpdated: '2024-01-15' }
            ].map((template, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.framework} • {template.type}</p>
                  <p className="text-xs text-gray-500">Last updated: {template.lastUpdated}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                  <button className="text-green-600 hover:text-green-900 text-sm">Clone</button>
                  <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Templates</h3>
          <p className="text-2xl font-bold text-gray-900">5</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Mapping Rules</h3>
          <p className="text-2xl font-bold text-blue-600">23</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">User Roles</h3>
          <p className="text-2xl font-bold text-green-600">4</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <p className="text-2xl font-bold text-orange-600">8</p>
        </div>
      </div>
    </div>
  )
}

export default Settings

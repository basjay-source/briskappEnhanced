import React, { useState } from 'react'

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pay-calendars')

  const tabs = [
    { id: 'pay-calendars', label: 'Pay Calendars', icon: '📅' },
    { id: 'tax-year-setup', label: 'Tax Year Setup', icon: '🗓️' },
    { id: 'coa-mapping', label: 'COA Mapping', icon: '🗺️' },
    { id: 'dimensions-defaults', label: 'Dimensions Defaults', icon: '📊' },
    { id: 'roles-permissions', label: 'Roles/Permissions', icon: '👥' },
    { id: 'statutory-settings', label: 'Statutory Settings', icon: '⚖️' },
    { id: 'templates', label: 'Templates', icon: '📄' }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure payroll system settings and preferences</p>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {tabs.find(tab => tab.id === activeTab)?.label}
        </h3>
        <p className="text-gray-600">
          Configure system-wide payroll settings, calendars, and integration mappings.
        </p>
      </div>
    </div>
  )
}

export default Settings

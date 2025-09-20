import React, { useState } from 'react'

const Integrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hmrc-rti')

  const tabs = [
    { id: 'hmrc-rti', label: 'HMRC RTI', icon: '🏛️' },
    { id: 'pension-providers', label: 'Pension Providers', icon: '🏦' },
    { id: 'banking', label: 'Banking (BACS/SEPA)', icon: '💳' },
    { id: 'hris', label: 'HRIS/Time & Attendance', icon: '⏰' },
    { id: 'bookkeeping-erp', label: 'Bookkeeping/ERP', icon: '📊' },
    { id: 'cosec-sync', label: 'CoSec Sync', icon: '🔄' },
    { id: 'api-keys', label: 'API Keys', icon: '🔑' }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect payroll with external systems and services</p>
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
          Seamless integration with HMRC, pension providers, banks, and other business systems.
        </p>
      </div>
    </div>
  )
}

export default Integrations

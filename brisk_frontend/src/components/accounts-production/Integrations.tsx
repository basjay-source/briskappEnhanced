import React, { useState, useEffect } from 'react'

const Integrations: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('bookkeeping')

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
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Test Connections
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Sync All Data
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'bookkeeping', label: 'Bookkeeping' },
            { id: 'business-tax', label: 'Business Tax' },
            { id: 'cosec', label: 'CoSec' },
            { id: 'payroll', label: 'Payroll' },
            { id: 'registry-gateways', label: 'Registry Gateways' },
            { id: 'taxonomies', label: 'Taxonomies' }
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

      {activeTab === 'bookkeeping' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Bookkeeping Module Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Connection Status</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-700">Connected</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Last sync: 2024-01-20 14:30</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Sync Settings</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="auto-import-tb" defaultChecked className="h-4 w-4 text-blue-600" />
                  <label htmlFor="auto-import-tb" className="ml-2 text-sm text-gray-700">Auto-import Trial Balance</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="post-back-journals" defaultChecked className="h-4 w-4 text-blue-600" />
                  <label htmlFor="post-back-journals" className="ml-2 text-sm text-gray-700">Post-back YE Journals</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Connected Modules</h3>
          <p className="text-2xl font-bold text-green-600">4</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Active Gateways</h3>
          <p className="text-2xl font-bold text-blue-600">2</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Taxonomies</h3>
          <p className="text-2xl font-bold text-orange-600">3</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Last Sync</h3>
          <p className="text-2xl font-bold text-gray-900">14:30</p>
        </div>
      </div>
    </div>
  )
}

export default Integrations

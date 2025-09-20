import React, { useState, useEffect } from 'react'

const DocumentHub: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('working-papers')

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
        <h1 className="text-2xl font-bold text-gray-900">Document Hub</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Upload Document
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Create Binder
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'working-papers', label: 'Working Papers' },
            { id: 'proofs-signatures', label: 'Proofs & Signatures' },
            { id: 'filing-evidence', label: 'Filing Evidence' }
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

      {activeTab === 'working-papers' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Working Papers Binders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Trial Balance & Mapping', documents: 8, lastUpdated: '2024-01-20' },
              { name: 'Year-end Adjustments', documents: 12, lastUpdated: '2024-01-19' },
              { name: 'Lead Schedules', documents: 15, lastUpdated: '2024-01-18' },
              { name: 'Fixed Assets', documents: 6, lastUpdated: '2024-01-17' },
              { name: 'Debtors & Creditors', documents: 10, lastUpdated: '2024-01-16' },
              { name: 'Bank Reconciliations', documents: 4, lastUpdated: '2024-01-15' }
            ].map((binder, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">{binder.name}</h3>
                    <p className="text-sm text-gray-600">{binder.documents} documents</p>
                    <p className="text-xs text-gray-500 mt-1">Updated {binder.lastUpdated}</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">📁</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Documents</h3>
          <p className="text-2xl font-bold text-gray-900">67</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Working Papers</h3>
          <p className="text-2xl font-bold text-blue-600">55</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Signed Documents</h3>
          <p className="text-2xl font-bold text-green-600">8</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Filing Evidence</h3>
          <p className="text-2xl font-bold text-orange-600">4</p>
        </div>
      </div>
    </div>
  )
}

export default DocumentHub

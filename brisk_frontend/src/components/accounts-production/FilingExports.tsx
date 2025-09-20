import React, { useState, useEffect } from 'react'

const FilingExports: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('companies-house')

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
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Filing & Exports</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            File to Companies House
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export HMRC Package
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'companies-house', label: 'Companies House/Registry' },
            { id: 'hmrc-package', label: 'HMRC Package' },
            { id: 'post-back-gl', label: 'Post-back to GL' },
            { id: 'deliver-pack', label: 'Deliver Pack' }
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

      {activeTab === 'companies-house' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Companies House Filing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Filing Options</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="radio" id="full-accounts" name="filingType" value="full" defaultChecked className="h-4 w-4 text-blue-600" />
                  <label htmlFor="full-accounts" className="ml-2 text-sm text-gray-700">Full Accounts</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="abridged-accounts" name="filingType" value="abridged" className="h-4 w-4 text-blue-600" />
                  <label htmlFor="abridged-accounts" className="ml-2 text-sm text-gray-700">Abridged Accounts</label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Filing Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">Validation</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Passed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">iXBRL Instance</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Valid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Filings Complete</h3>
          <p className="text-2xl font-bold text-green-600">1</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">HMRC Packages</h3>
          <p className="text-2xl font-bold text-blue-600">1</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">GL Journals</h3>
          <p className="text-2xl font-bold text-yellow-600">5</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Client Packs</h3>
          <p className="text-2xl font-bold text-orange-600">0</p>
        </div>
      </div>
    </div>
  )
}

export default FilingExports

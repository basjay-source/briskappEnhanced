import React, { useState, useEffect } from 'react'

const ProofsReports: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('draft-accounts')

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
        <h1 className="text-2xl font-bold text-gray-900">Proofs & Reports</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate Draft Accounts
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Create Management Pack
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
            CCAB Reports
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'draft-accounts', label: 'Draft Accounts' },
            { id: 'management-pack', label: 'Management Pack' },
            { id: 'ccab-reports', label: 'CCAB Reports' },
            { id: 'highlights-cover', label: 'Highlights & Cover' },
            { id: 'styles', label: 'Styles' }
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

      {activeTab === 'ccab-reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">CCAB Standard Reports</h2>
            <p className="text-sm text-gray-600 mb-6">
              Consultative Committee of Accountancy Bodies (CCAB) standard reporting templates and formats.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'CCAB Financial Statements', description: 'Standard format financial statements', status: 'Available' },
                { name: 'CCAB Directors Report', description: 'Standard directors report template', status: 'Available' },
                { name: 'CCAB Audit Report', description: 'Standard audit report formats', status: 'Available' },
                { name: 'CCAB Small Company', description: 'Small company exemptions format', status: 'Available' },
                { name: 'CCAB Micro Entity', description: 'Micro entity reporting format', status: 'Available' },
                { name: 'CCAB Group Accounts', description: 'Consolidated accounts format', status: 'Available' },
                { name: 'CCAB LLP Accounts', description: 'Limited liability partnership format', status: 'Available' },
                { name: 'CCAB Charity Accounts', description: 'Charity reporting format', status: 'Available' },
                { name: 'CCAB Management Accounts', description: 'Management reporting templates', status: 'Available' }
              ].map((report, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-gray-900 mb-2">{report.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{report.status}</span>
                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">Generate</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Reports</h3>
          <p className="text-2xl font-bold text-gray-900">15</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Generated</h3>
          <p className="text-2xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">CCAB Compliant</h3>
          <p className="text-2xl font-bold text-blue-600">9</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Ready for Filing</h3>
          <p className="text-2xl font-bold text-orange-600">8</p>
        </div>
      </div>
    </div>
  )
}

export default ProofsReports

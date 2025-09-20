import React, { useState, useEffect } from 'react'

const Consolidation: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('group-structure')

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
        <h1 className="text-2xl font-bold text-gray-900">Consolidation &amp; Groups</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Import Subsidiary TBs
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Generate Consolidation
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'group-structure', label: 'Group Structure' },
            { id: 'subsidiary-tbs', label: 'Subsidiary TBs' },
            { id: 'eliminations', label: 'Eliminations' },
            { id: 'goodwill-nci', label: 'Goodwill & NCI' }
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

      {activeTab === 'group-structure' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Group Structure</h2>
          <div className="space-y-4">
            <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
              <h3 className="font-medium text-blue-900">Parent Company</h3>
              <p className="text-sm text-blue-700">Acme Holdings Ltd (100%)</p>
            </div>
            <div className="ml-8 border-2 border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="font-medium text-green-900">Subsidiary</h3>
              <p className="text-sm text-green-700">Acme Trading Ltd (100% owned)</p>
              <p className="text-xs text-green-600">Acquired: 1 January 2020</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'eliminations' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Elimination Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Intercompany Sales</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Eliminate sales between group companies</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£150,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Applied</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Investment in Subsidiary</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Eliminate investment against share capital</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£100,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Applied</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Group Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">£1,200,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Eliminations</h3>
          <p className="text-2xl font-bold text-red-600">£250,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Net Group Revenue</h3>
          <p className="text-2xl font-bold text-blue-600">£950,000</p>
        </div>
      </div>
    </div>
  )
}

export default Consolidation

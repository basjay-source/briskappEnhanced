import React, { useState, useEffect } from 'react'

const CashFlow: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('method')

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
        <h1 className="text-2xl font-bold text-gray-900">Cash Flow</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate Cash Flow
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Reconcile
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'method', label: 'Method' },
            { id: 'non-cash-items', label: 'Non-cash Items' },
            { id: 'working-capital', label: 'Working Capital Bridge' },
            { id: 'reconciliation', label: 'Reconciliation' }
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

      {activeTab === 'method' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Cash Flow Method Selection</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="indirect"
                name="method"
                value="indirect"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="indirect" className="ml-2 text-sm text-gray-700">
                Indirect Method (Recommended)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="direct"
                name="method"
                value="direct"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="direct" className="ml-2 text-sm text-gray-700">
                Direct Method
              </label>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'working-capital' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Opening</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Closing</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Movement</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cash Impact</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Trade Debtors</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£65,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£85,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right">£20,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right font-medium">(£20,000)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Trade Creditors</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£55,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£65,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right">£10,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right font-medium">£10,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">Net Working Capital Movement</td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600 text-right">(£10,000)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reconciliation' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Cash Reconciliation</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Opening Cash</h3>
                <p className="text-2xl font-bold text-gray-900">£28,000</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Net Cash Flow</h3>
                <p className="text-2xl font-bold text-green-600">£7,000</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Closing Cash</h3>
                <p className="text-2xl font-bold text-blue-600">£35,000</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✓ Cash reconciliation complete - no variances identified
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CashFlow

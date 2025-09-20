import React, { useState, useEffect } from 'react'

const TradeProfit: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('starting-profit')

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Trade Profit (Adjusted profit)</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Calculate Adjustments
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Save & Continue
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'starting-profit', label: 'Starting Profit' },
            { id: 'tax-adjustments', label: 'Tax Adjustments' },
            { id: 'non-trading-items', label: 'Non-trading Items' }
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

      {activeTab === 'starting-profit' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Starting Profit per Accounts</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Profit & Loss Extract</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Turnover</span>
                    <span>£450,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost of Sales</span>
                    <span>(£280,000)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gross Profit</span>
                    <span>£170,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Administrative Expenses</span>
                    <span>(£95,000)</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Operating Profit</span>
                    <span>£75,000</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Starting Point Selection</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="radio" id="operating-profit" name="startingPoint" value="operating" defaultChecked className="h-4 w-4 text-blue-600" />
                    <label htmlFor="operating-profit" className="ml-2 text-sm text-gray-700">Operating Profit</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="profit-before-tax" name="startingPoint" value="pbt" className="h-4 w-4 text-blue-600" />
                    <label htmlFor="profit-before-tax" className="ml-2 text-sm text-gray-700">Profit Before Tax</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="net-profit" name="startingPoint" value="net" className="h-4 w-4 text-blue-600" />
                    <label htmlFor="net-profit" className="ml-2 text-sm text-gray-700">Net Profit</label>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <div className="flex justify-between font-medium">
                    <span>Selected Starting Point:</span>
                    <span>£75,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tax-adjustments' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Tax Adjustments</h2>
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Depreciation Add-back</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£18,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Add-back
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Entertainment Expenses</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£2,500</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Disallowable
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Capital Allowances</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">(£28,500)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Deduction
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
              <span className="font-medium">Adjusted Trading Profit:</span>
              <span className="text-xl font-bold text-green-600">£67,000</span>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Starting Profit</h3>
          <p className="text-2xl font-bold text-blue-600">£75,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Add-backs</h3>
          <p className="text-2xl font-bold text-green-600">£20,500</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Deductions</h3>
          <p className="text-2xl font-bold text-red-600">£28,500</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Adjusted Profit</h3>
          <p className="text-2xl font-bold text-orange-600">£67,000</p>
        </div>
      </div>
    </div>
  )
}

export default TradeProfit

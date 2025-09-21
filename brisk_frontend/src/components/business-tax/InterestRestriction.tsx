import React, { useState, useEffect } from 'react'
import { Calculator, FileText, TrendingUp } from 'lucide-react'

const InterestRestriction: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('groups-period')

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
        <h1 className="text-2xl font-bold text-gray-900">Interest Restriction (CIR)</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Calculator className="w-4 h-4 mr-2 inline" />
            Calculate CIR
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <FileText className="w-4 h-4 mr-2 inline" />
            Generate Return
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'groups-period', label: 'Groups/Period' },
            { id: 'tax-ebitda', label: 'Tax-EBITDA' },
            { id: 'net-interest', label: 'Net Interest' },
            { id: 'disallowance-spare', label: 'Disallowance/Spare Capacity' }
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Tax-EBITDA</h3>
          <p className="text-2xl font-bold text-blue-600">£125,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Net Interest</h3>
          <p className="text-2xl font-bold text-green-600">£8,500</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Allowable (30%)</h3>
          <p className="text-2xl font-bold text-orange-600">£37,500</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Disallowance</h3>
          <p className="text-2xl font-bold text-red-600">£0</p>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'groups-period' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Group Structure & Period Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Group Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Group Name</label>
                  <input type="text" value="Acme Group Ltd" className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ultimate Parent</label>
                  <input type="text" value="Acme Holdings Ltd" className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Group Size</label>
                  <select className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>Large Group</option>
                    <option>Medium Group</option>
                    <option>Small Group</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Period Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Period Start</label>
                  <input type="date" value="2023-01-01" className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Period End</label>
                  <input type="date" value="2023-12-31" className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CIR Election</label>
                  <select className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>No Election</option>
                    <option>Group Ratio Election</option>
                    <option>Fixed Ratio Election</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tax-ebitda' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Tax-EBITDA Calculation</h2>
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Adjusted Corporation Tax Profits</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£75,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Before interest</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Add: Depreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£18,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Accounting depreciation</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Add: Amortisation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£5,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Intangible assets</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Add: Tax Depreciation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£27,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Capital allowances</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">Tax-EBITDA</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">£125,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Final calculation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'net-interest' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Net Interest Calculation</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Interest Expense</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Bank Interest</span>
                    <span>£12,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Interest</span>
                    <span>£8,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finance Lease Interest</span>
                    <span>£2,200</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Total Interest Expense</span>
                    <span>£22,700</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Interest Income</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Bank Interest Received</span>
                    <span>£1,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investment Income</span>
                    <span>£13,000</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Total Interest Income</span>
                    <span>£14,200</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-900">Net Interest Expense</span>
                <span className="text-xl font-bold text-blue-900">£8,500</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'disallowance-spare' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Interest Disallowance & Spare Capacity</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">30% Test Calculation</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tax-EBITDA</span>
                    <span>£125,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>30% of Tax-EBITDA</span>
                    <span>£37,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Interest Expense</span>
                    <span>£8,500</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Spare Capacity</span>
                    <span>£29,000</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Disallowance Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Interest Disallowed</span>
                    <span>£0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brought Forward Disallowance</span>
                    <span>£0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carried Forward Disallowance</span>
                    <span>£0</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <div>
                  <h3 className="font-medium text-green-900">No Interest Restriction</h3>
                  <p className="text-sm text-green-800 mt-1">
                    Net interest expense (£8,500) is below the 30% threshold (£37,500). No disallowance applies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InterestRestriction

import React, { useState, useEffect } from 'react'

const iXBRLTagging: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('auto-tag')

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
        <h1 className="text-2xl font-bold text-gray-900">iXBRL Tagging &amp; Validation</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Auto-Tag All
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Validate iXBRL
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
            Preview Instance
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'auto-tag', label: 'Auto-Tag' },
            { id: 'manual-override', label: 'Manual Override' },
            { id: 'taxonomy-version', label: 'Taxonomy Version' },
            { id: 'validator', label: 'Validator' }
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

      {activeTab === 'auto-tag' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Auto-Tagging Progress</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Primary Statements</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <span className="text-sm text-green-600 font-medium">95%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Notes to Accounts</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-sm text-yellow-600 font-medium">78%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Directors' Report</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-sm text-blue-600 font-medium">100%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Element</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Turnover</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">uk-bus:Turnover</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£850,000</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Tagged</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cost of Sales</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">uk-bus:CostSales</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£425,000</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Tagged</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Administrative Expenses</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Not tagged</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£125,000</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-orange-600 hover:text-orange-900">Tag</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'validator' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Validation Results</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-900">Schema Validation</h3>
                    <p className="text-xs text-green-700">All elements conform to taxonomy schema</p>
                  </div>
                </div>
                <span className="text-green-600 font-medium">Passed</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-yellow-600 font-bold">!</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-yellow-900">Business Rules</h3>
                    <p className="text-xs text-yellow-700">2 warnings found - review recommended</p>
                  </div>
                </div>
                <span className="text-yellow-600 font-medium">Warnings</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-red-600 font-bold">✗</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-red-900">Calculation Validation</h3>
                    <p className="text-xs text-red-700">1 calculation error found</p>
                  </div>
                </div>
                <span className="text-red-600 font-medium">Failed</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Validation Issues</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded">
                <span className="text-red-600 font-bold">✗</span>
                <div>
                  <h4 className="text-sm font-medium text-red-900">Calculation Error</h4>
                  <p className="text-xs text-red-700">Total assets does not equal sum of individual asset components</p>
                  <p className="text-xs text-red-600 mt-1">Expected: £720,000 | Actual: £715,000</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <span className="text-yellow-600 font-bold">!</span>
                <div>
                  <h4 className="text-sm font-medium text-yellow-900">Missing Context</h4>
                  <p className="text-xs text-yellow-700">Administrative expenses lacks period context</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Elements</h3>
          <p className="text-2xl font-bold text-gray-900">156</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Tagged</h3>
          <p className="text-2xl font-bold text-green-600">142</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">14</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Completion</h3>
          <p className="text-2xl font-bold text-blue-600">91%</p>
        </div>
      </div>
    </div>
  )
}

export default iXBRLTagging

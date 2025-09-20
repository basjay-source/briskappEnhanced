import React, { useState, useEffect } from 'react'

const AnalyticsReview: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('ratios-trends')

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
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Review</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate Analysis
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'ratios-trends', label: 'Ratios & Trends' },
            { id: 'materiality-checks', label: 'Materiality Checks' },
            { id: 'disclosure-completeness', label: 'Disclosure Completeness' },
            { id: 'variance-commentary', label: 'Variance Commentary' }
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

      {activeTab === 'ratios-trends' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">Gross Margin</h3>
              <p className="text-2xl font-bold text-green-600">50.0%</p>
              <p className="text-xs text-gray-500">vs 50.0% prior year</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">Current Ratio</h3>
              <p className="text-2xl font-bold text-blue-600">1.76</p>
              <p className="text-xs text-gray-500">vs 1.65 prior year</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">Debtor Days</h3>
              <p className="text-2xl font-bold text-orange-600">36</p>
              <p className="text-xs text-gray-500">vs 30 days prior year</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">ROE</h3>
              <p className="text-2xl font-bold text-purple-600">20.8%</p>
              <p className="text-xs text-gray-500">vs 18.5% prior year</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ratio</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Year</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Prior Year</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Industry Benchmark</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Gross Profit Margin</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">50.0%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">50.0%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">45.0%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Above Benchmark</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Current Ratio</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">1.76</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">1.65</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">1.50</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Healthy</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Debt to Equity</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">0.21</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">0.25</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">0.40</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Low Risk</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'disclosure-completeness' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Disclosure Completeness Checklist</h2>
          <div className="space-y-4">
            {[
              { item: 'Accounting Policies', status: 'complete' },
              { item: 'Fixed Assets Note', status: 'complete' },
              { item: 'Debtors Analysis', status: 'complete' },
              { item: 'Creditors Analysis', status: 'complete' },
              { item: 'Related Party Transactions', status: 'incomplete' },
              { item: 'Post Balance Sheet Events', status: 'incomplete' },
              { item: 'Going Concern Statement', status: 'complete' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-900">{item.item}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'complete' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'complete' ? 'Complete' : 'Incomplete'}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Completion Rate: 71% (5 of 7 disclosures complete)
            </p>
          </div>
        </div>
      )}

      {activeTab === 'variance-commentary' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Variance Commentary</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-gray-900">Revenue Growth (+9%)</h3>
              <p className="text-sm text-gray-600 mt-1">
                Revenue increased by £70,000 (9%) due to successful launch of new product line and expansion into new market segments. Growth was consistent throughout the year with no significant seasonal variations.
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-medium text-gray-900">Debtor Days Increase (+6 days)</h3>
              <p className="text-sm text-gray-600 mt-1">
                Debtor days increased from 30 to 36 days due to onboarding of larger corporate clients with extended payment terms. Management is monitoring collection closely and expects improvement in Q1 2024.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium text-gray-900">Margin Stability</h3>
              <p className="text-sm text-gray-600 mt-1">
                Gross margin maintained at 50% despite inflationary pressures, demonstrating effective cost management and pricing strategy implementation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnalyticsReview

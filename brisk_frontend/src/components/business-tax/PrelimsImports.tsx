import React, { useState, useEffect } from 'react'

const PrelimsImports: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('trial-balance')
  const [prelimsData, setPrelimData] = useState<any>(null)

  const tbData = [
    { code: '1000', description: 'Fixed Assets - Cost', debit: 250000, credit: 0, mapped: true },
    { code: '1001', description: 'Fixed Assets - Depreciation', debit: 0, credit: 85000, mapped: true },
    { code: '2000', description: 'Stock', debit: 45000, credit: 0, mapped: true },
    { code: '3000', description: 'Debtors', debit: 65000, credit: 0, mapped: true },
    { code: '4000', description: 'Bank', debit: 25000, credit: 0, mapped: true },
    { code: '5000', description: 'Creditors', debit: 0, credit: 35000, mapped: true },
    { code: '6000', description: 'Sales', debit: 0, credit: 450000, mapped: true },
    { code: '7000', description: 'Purchases', debit: 280000, credit: 0, mapped: true },
    { code: '8000', description: 'Expenses', debit: 95000, credit: 0, mapped: true }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setPrelimData({
        trialBalance: tbData,
        accounts: {
          turnover: 450000,
          costOfSales: 280000,
          grossProfit: 170000,
          expenses: 95000,
          operatingProfit: 75000
        },
        bfAttributes: {
          tradingLosses: 12000,
          nonTradingDeficit: 0,
          propertyLosses: 0,
          mainPool: 45000,
          specialRatePool: 15000,
          singleAssetPool: 0
        }
      })
    }, 1000)
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
        <h1 className="text-2xl font-bold text-gray-900">Prelims: Imports & Accounts</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Import TB
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Lock Snapshot
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'trial-balance', label: 'Trial Balance' },
            { id: 'final-accounts', label: 'Final Accounts (iXBRL)' },
            { id: 'bf-attributes', label: 'B/F Attributes' }
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

      {activeTab === 'trial-balance' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Trial Balance Import</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Final TB Imported</span>
                </div>
                <span className="text-sm text-gray-500">Last updated: 2024-01-10 14:30</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Mapped</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(prelimsData?.trialBalance || tbData).map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {item.debit > 0 ? `£${item.debit.toLocaleString()}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {item.credit > 0 ? `£${item.credit.toLocaleString()}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.mapped ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.mapped ? 'Mapped' : 'Unmapped'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'final-accounts' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Final Accounts (iXBRL)</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">iXBRL Accounts Attachment</h3>
                <p className="text-sm text-gray-500">Linked from Accounts Production module</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Attached</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Profit & Loss Account</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Turnover</span>
                    <span>£{(prelimsData?.accounts?.turnover || 450000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost of Sales</span>
                    <span>(£{(prelimsData?.accounts?.costOfSales || 280000).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gross Profit</span>
                    <span>£{(prelimsData?.accounts?.grossProfit || 170000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Administrative Expenses</span>
                    <span>(£{(prelimsData?.accounts?.expenses || 95000).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Operating Profit</span>
                    <span>£{(prelimsData?.accounts?.operatingProfit || 75000).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Balance Sheet</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Fixed Assets</span>
                    <span>£165,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Assets</span>
                    <span>£135,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Liabilities</span>
                    <span>(£35,000)</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Net Assets</span>
                    <span>£265,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bf-attributes' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Brought Forward Attributes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Losses Brought Forward</h3>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">Trading Losses</span>
                  <span className="text-sm font-medium">£{(prelimsData?.bfAttributes?.tradingLosses || 12000).toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">Non-trading Deficit</span>
                  <span className="text-sm font-medium">£{(prelimsData?.bfAttributes?.nonTradingDeficit || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">Property Losses</span>
                  <span className="text-sm font-medium">£{(prelimsData?.bfAttributes?.propertyLosses || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Capital Allowances Pools</h3>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">Main Pool</span>
                  <span className="text-sm font-medium">£{(prelimsData?.bfAttributes?.mainPool || 45000).toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">Special Rate Pool</span>
                  <span className="text-sm font-medium">£{(prelimsData?.bfAttributes?.specialRatePool || 15000).toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">Single Asset Pool</span>
                  <span className="text-sm font-medium">£{(prelimsData?.bfAttributes?.singleAssetPool || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">TB Balance</h3>
          <p className="text-2xl font-bold text-green-600">Balanced</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Mapped Accounts</h3>
          <p className="text-2xl font-bold text-blue-600">100%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">iXBRL Status</h3>
          <p className="text-2xl font-bold text-green-600">Attached</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">B/F Losses</h3>
          <p className="text-2xl font-bold text-orange-600">£{(prelimsData?.bfAttributes?.tradingLosses || 12000).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default PrelimsImports

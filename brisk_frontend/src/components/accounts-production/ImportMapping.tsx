import React, { useState, useEffect } from 'react'

interface TrialBalanceEntry {
  code: string
  description: string
  debit: number
  credit: number
  balance: number
  mapped: boolean
  mappedTo?: string
}

const ImportMapping: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('trial-balance')
  const [trialBalance, setTrialBalance] = useState<TrialBalanceEntry[]>([])
  const [unmappedOnly, setUnmappedOnly] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const sampleTrialBalance: TrialBalanceEntry[] = [
    { code: '1000', description: 'Freehold Property', debit: 500000, credit: 0, balance: 500000, mapped: true, mappedTo: 'Tangible Fixed Assets' },
    { code: '1100', description: 'Plant & Machinery', debit: 150000, credit: 0, balance: 150000, mapped: true, mappedTo: 'Tangible Fixed Assets' },
    { code: '2000', description: 'Trade Debtors', debit: 85000, credit: 0, balance: 85000, mapped: true, mappedTo: 'Debtors' },
    { code: '2400', description: 'Bank Current Account', debit: 35000, credit: 0, balance: 35000, mapped: true, mappedTo: 'Cash at bank and in hand' },
    { code: '3000', description: 'Trade Creditors', debit: 0, credit: 65000, balance: -65000, mapped: true, mappedTo: 'Creditors: amounts falling due within one year' },
    { code: '5000', description: 'Sales Revenue', debit: 0, credit: 850000, balance: -850000, mapped: true, mappedTo: 'Turnover' },
    { code: '7200', description: 'Professional Fees', debit: 25000, credit: 0, balance: 25000, mapped: false },
    { code: '7300', description: 'Marketing Expenses', debit: 18000, credit: 0, balance: 18000, mapped: false }
  ]

  useEffect(() => {
    setTrialBalance(sampleTrialBalance)
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredTrialBalance = trialBalance.filter(entry => {
    const matchesSearch = entry.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         entry.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = !unmappedOnly || !entry.mapped
    return matchesSearch && matchesFilter
  })

  const handleManualMapping = (code: string, presentationLine: string) => {
    setTrialBalance(prev => prev.map(entry => 
      entry.code === code 
        ? { ...entry, mapped: true, mappedTo: presentationLine }
        : entry
    ))
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
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
        <h1 className="text-2xl font-bold text-gray-900">Import & Mapping</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Import TB from Bookkeeping
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Auto-Map Accounts
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'trial-balance', label: 'Trial Balance' },
            { id: 'mapping-rules', label: 'Mapping Rules' },
            { id: 'accounts-classes', label: 'Accounts Classes' },
            { id: 'variances', label: 'Variances' }
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
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="unmappedOnly"
                    checked={unmappedOnly}
                    onChange={(e) => setUnmappedOnly(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="unmappedOnly" className="ml-2 text-sm text-gray-700">
                    Show unmapped only
                  </label>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {trialBalance.filter(entry => !entry.mapped).length} unmapped accounts
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GL Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mapped To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTrialBalance.map((entry) => (
                    <tr key={entry.code} className={!entry.mapped ? 'bg-yellow-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                        £{entry.balance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.mapped ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {entry.mappedTo}
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Unmapped</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {!entry.mapped && (
                          <select
                            onChange={(e) => handleManualMapping(entry.code, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="">Select mapping...</option>
                            <option value="Tangible Fixed Assets">Tangible Fixed Assets</option>
                            <option value="Debtors">Debtors</option>
                            <option value="Cash at bank and in hand">Cash at bank and in hand</option>
                            <option value="Creditors: amounts falling due within one year">Current Creditors</option>
                            <option value="Turnover">Turnover</option>
                            <option value="Administrative expenses">Administrative expenses</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'mapping-rules' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Mapping Rules Library</h2>
          <p className="text-gray-600">Configure automatic mapping rules for GL codes to presentation lines.</p>
        </div>
      )}

      {activeTab === 'accounts-classes' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Accounts Classification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: 'Fixed Assets', count: 4, color: 'blue' },
              { category: 'Current Assets', count: 6, color: 'green' },
              { category: 'Current Liabilities', count: 5, color: 'yellow' },
              { category: 'Income', count: 2, color: 'indigo' },
              { category: 'Operating Expenses', count: 8, color: 'gray' }
            ].map((category) => (
              <div key={category.category} className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
                <h3 className="font-medium text-gray-900">{category.category}</h3>
                <p className="text-sm text-gray-600 mt-1">{category.count} accounts mapped</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'variances' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Period-on-Period Variances</h2>
          <div className="space-y-4">
            {[
              { account: 'Turnover', current: 850000, prior: 780000, variance: 70000, percentage: 8.97 },
              { account: 'Cost of Sales', current: 425000, prior: 390000, variance: 35000, percentage: 8.97 },
              { account: 'Administrative Expenses', current: 125000, prior: 110000, variance: 15000, percentage: 13.64 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{item.account}</h3>
                  <p className="text-sm text-gray-600">
                    Current: £{item.current.toLocaleString()} | Prior: £{item.prior.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${item.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {item.variance > 0 ? '+' : ''}£{item.variance.toLocaleString()}
                  </div>
                  <div className={`text-sm ${item.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {item.variance > 0 ? '+' : ''}{item.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImportMapping

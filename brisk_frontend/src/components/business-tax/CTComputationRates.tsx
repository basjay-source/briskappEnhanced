import React, { useState, useEffect } from 'react'

interface HMRCRates {
  corporation_tax_main_rate: number
  corporation_tax_small_rate: number
  corporation_tax_threshold: number
  personal_allowance: number
  basic_rate_threshold: number
}

interface CTComputation {
  trading_profit: number
  adjustments: number
  capital_allowances: number
  non_trading_income: number
  chargeable_gains: number
  total_profits: number
  taxable_profits: number
  ct_liability: number
  marginal_relief: number
  final_liability: number
  effective_rate: number
  tax_year: string
  rates_used: HMRCRates
}

const CTComputationRates: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('computation')
  const [rates, setRates] = useState<HMRCRates | null>(null)
  const [computation, setComputation] = useState<CTComputation | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ratesResponse, computationResponse] = await Promise.all([
          fetch('/api/business-tax/hmrc-rates'),
          fetch('/api/business-tax/computation/summary')
        ])
        
        if (ratesResponse.ok && computationResponse.ok) {
          const ratesData = await ratesResponse.json()
          const computationData = await computationResponse.json()
          setRates(ratesData.rates)
          setComputation(computationData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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
        <h1 className="text-2xl font-bold text-gray-900">CT Computation & Rates</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Calculate CT
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Generate CT600
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'computation', label: 'CT Computation' },
            { id: 'rates', label: 'Tax Rates' },
            { id: 'marginal-relief', label: 'Marginal Relief' },
            { id: 'summary', label: 'Summary' }
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

      {activeTab === 'computation' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Corporation Tax Computation</h2>
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Trading Profit</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£67,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Adjusted profit</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Investment Income</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£3,500</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Bank interest</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Chargeable Gains</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£8,200</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Asset disposals</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Profits</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">£78,700</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Taxable profits</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Corporation Tax @ {rates ? (rates.corporation_tax_small_rate * 100).toFixed(0) : '19'}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{computation?.ct_liability.toLocaleString() || '14,953'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Small profits rate</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Less: Marginal Relief</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">(£472)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Marginal relief</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">Corporation Tax Liability</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 text-right">£14,481</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Final liability</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rates' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Tax Rates & Thresholds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Corporation Tax Rates {computation?.tax_year || '2024/25'}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Small Profits Rate</span>
                  <span className="font-medium">{rates ? (rates.corporation_tax_small_rate * 100).toFixed(0) : '19'}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Main Rate</span>
                  <span className="font-medium">{rates ? (rates.corporation_tax_main_rate * 100).toFixed(0) : '25'}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Marginal Rate</span>
                  <span className="font-medium">26.5%</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Profit Thresholds</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Small Profits Threshold</span>
                  <span className="font-medium">£{rates?.corporation_tax_threshold?.toLocaleString() || '250,000'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Marginal Relief Lower Limit</span>
                  <span className="font-medium">£{rates ? (50000).toLocaleString() : '50,000'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Marginal Relief Upper Limit</span>
                  <span className="font-medium">£{rates ? rates.corporation_tax_threshold.toLocaleString() : '250,000'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Profits</h3>
          <p className="text-2xl font-bold text-blue-600">£{computation?.total_profits.toLocaleString() || '78,700'}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Effective Rate</h3>
          <p className="text-2xl font-bold text-green-600">{computation?.effective_rate.toFixed(1) || '18.4'}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">CT Liability</h3>
          <p className="text-2xl font-bold text-red-600">£{computation?.final_liability.toLocaleString() || '14,481'}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Marginal Relief</h3>
          <p className="text-2xl font-bold text-orange-600">£{computation?.marginal_relief.toLocaleString() || '472'}</p>
        </div>
      </div>
    </div>
  )
}

export default CTComputationRates

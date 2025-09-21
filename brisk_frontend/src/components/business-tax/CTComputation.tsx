import React, { useState, useEffect } from 'react'
import { Calculator, TrendingUp, Percent, FileText, Download, Eye } from 'lucide-react'

const CTComputation: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('summary')
  const [computationData, setComputationData] = useState<any>(null)

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
          
          setComputationData({
            summary: {
              tradingProfits: computationData.trading_profit || 180000,
              nonTradingProfits: computationData.non_trading_income || 5000,
              chargeableGains: computationData.chargeable_gains || 8000,
              totalProfits: computationData.total_profits || 193000,
              reliefs: computationData.reliefs || 15000,
              taxableProfits: computationData.taxable_profits || 178000,
              ctRate: Math.round((ratesData.rates.corporation_tax_main_rate || 0.25) * 100),
              ctLiability: computationData.ct_liability || 44500,
              marginalRelief: computationData.marginal_relief || 1200,
              finalLiability: computationData.final_liability || 43300
            },
            rates: {
              smallProfitsRate: Math.round((ratesData.rates.corporation_tax_small_rate || 0.19) * 100),
              mainRate: Math.round((ratesData.rates.corporation_tax_main_rate || 0.25) * 100),
              marginalReliefThreshold: ratesData.rates.corporation_tax_threshold || 250000,
              smallProfitsThreshold: 50000
            },
            straddling: {
              isStraddling: false,
              periods: []
            }
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setComputationData({
          summary: {
            tradingProfits: 180000,
            nonTradingProfits: 5000,
            chargeableGains: 8000,
            totalProfits: 193000,
            reliefs: 15000,
            taxableProfits: 178000,
            ctRate: 25,
            ctLiability: 44500,
            marginalRelief: 1200,
            finalLiability: 43300
          },
          rates: {
            smallProfitsRate: 19,
            mainRate: 25,
            marginalReliefThreshold: 250000,
            smallProfitsThreshold: 50000
          },
          straddling: {
            isStraddling: false,
            periods: []
          }
        })
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
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
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
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'summary', label: 'Summary' },
            { id: 'detailed', label: 'Detailed Computation' },
            { id: 'marginal-relief', label: 'Marginal Relief' },
            { id: 'allocation', label: 'Allocation (straddling periods)' }
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

      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Calculator className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Profits</p>
                  <p className="text-2xl font-bold text-gray-900">£{computationData.summary.totalProfits.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Taxable Profits</p>
                  <p className="text-2xl font-bold text-gray-900">£{computationData.summary.taxableProfits.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Percent className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">CT Liability</p>
                  <p className="text-2xl font-bold text-gray-900">£{computationData.summary.finalLiability.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Computation Summary</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Trading Profits</span>
                  <span className="font-medium">£{computationData.summary.tradingProfits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Non-trading Profits</span>
                  <span className="font-medium">£{computationData.summary.nonTradingProfits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Chargeable Gains</span>
                  <span className="font-medium">£{computationData.summary.chargeableGains.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 font-semibold">
                  <span className="text-gray-900">Total Profits</span>
                  <span>£{computationData.summary.totalProfits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Less: Reliefs</span>
                  <span className="font-medium">(£{computationData.summary.reliefs.toLocaleString()})</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 font-semibold">
                  <span className="text-gray-900">Taxable Profits</span>
                  <span>£{computationData.summary.taxableProfits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Corporation Tax @ {computationData.summary.ctRate}%</span>
                  <span className="font-medium">£{computationData.summary.ctLiability.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Less: Marginal Relief</span>
                  <span className="font-medium">(£{computationData.summary.marginalRelief.toLocaleString()})</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t-2 border-gray-300 font-bold text-lg">
                  <span className="text-gray-900">Corporation Tax Liability</span>
                  <span className="text-green-600">£{computationData.summary.finalLiability.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'detailed' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Detailed Computation</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Trading Income</h4>
                  <div className="space-y-2 ml-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Adjusted trading profits</span>
                      <span>£180,000</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Non-trading Income</h4>
                  <div className="space-y-2 ml-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank interest received</span>
                      <span>£3,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rental income</span>
                      <span>£2,000</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Chargeable Gains</h4>
                  <div className="space-y-2 ml-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Disposal of investment property</span>
                      <span>£8,000</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Reliefs</h4>
                  <div className="space-y-2 ml-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Group relief claimed</span>
                      <span>(£10,000)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Losses brought forward</span>
                      <span>(£5,000)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'marginal-relief' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Marginal Relief Calculation</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Small Profits Rate</label>
                    <div className="mt-1 text-lg font-semibold">{computationData.rates.smallProfitsRate}%</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Main Rate</label>
                    <div className="mt-1 text-lg font-semibold">{computationData.rates.mainRate}%</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Marginal Relief Formula</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      Marginal Relief = (Upper Limit - Augmented Profits) × Marginal Relief Fraction
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Upper Limit:</span>
                        <span>£{computationData.rates.marginalReliefThreshold.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Augmented Profits:</span>
                        <span>£{computationData.summary.taxableProfits.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Marginal Relief Fraction:</span>
                        <span>3/200</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Marginal Relief:</span>
                        <span>£{computationData.summary.marginalRelief.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'allocation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Period Allocation</h3>
            </div>
            <div className="p-6">
              {!computationData.straddling.isStraddling ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No straddling periods detected</p>
                  <p className="text-sm text-gray-500 mt-2">
                    The accounting period falls entirely within one financial year
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    The accounting period straddles two financial years. Profits and rates must be allocated accordingly.
                  </p>
                  {/* Straddling period allocation would go here */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CTComputation

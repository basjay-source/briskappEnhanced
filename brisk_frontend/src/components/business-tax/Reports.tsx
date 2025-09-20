import React, { useState, useEffect } from 'react'
import { Download, Eye, Calendar, FileText, TrendingUp } from 'lucide-react'

const Reports: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('computation')
  const [reportsData, setReportsData] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setReportsData({
        computationPack: {
          status: 'ready',
          lastGenerated: '2024-01-16',
          pages: 15
        },
        lossesRegister: {
          tradingLosses: 25000,
          nonTradingDeficit: 5000,
          propertyLosses: 0
        },
        capitalAllowances: {
          mainPool: 45000,
          specialRate: 12000,
          aia: 200000,
          wda: 8700
        },
        groupRelief: {
          surrendered: 10000,
          claimed: 15000,
          companies: 3
        },
        cir: {
          applicable: false,
          disallowance: 0
        },
        payments: {
          qip1: 11250,
          qip2: 11250,
          qip3: 11250,
          balance: 9550
        }
      })
    }, 1000)
    return () => clearTimeout(timer)
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
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'computation', label: 'Computation Pack' },
            { id: 'losses', label: 'Losses Register' },
            { id: 'ca-movements', label: 'Capital Allowances Movements' },
            { id: 'group-relief', label: 'Group Relief Summary' },
            { id: 'cir', label: 'CIR Report' },
            { id: 'payments', label: 'Payments Forecast' }
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
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Corporation Tax Computation Pack</h3>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                reportsData.computationPack.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
              }`}>
                {reportsData.computationPack.status.charAt(0).toUpperCase() + reportsData.computationPack.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Last Generated</p>
                <p className="text-lg font-semibold text-gray-900">{reportsData.computationPack.lastGenerated}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Pages</p>
                <p className="text-lg font-semibold text-gray-900">{reportsData.computationPack.pages}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Format</p>
                <p className="text-lg font-semibold text-gray-900">PDF</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                Regenerate
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'losses' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Losses Register</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="w-6 h-6 text-red-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-600">Trading Losses</p>
                      <p className="text-lg font-bold text-red-900">£{reportsData.lossesRegister.tradingLosses.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-orange-600">Non-trading Deficit</p>
                      <p className="text-lg font-bold text-orange-900">£{reportsData.lossesRegister.nonTradingDeficit.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="w-6 h-6 text-gray-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Property Losses</p>
                      <p className="text-lg font-bold text-gray-900">£{reportsData.lossesRegister.propertyLosses.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  Export to Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ca-movements' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Capital Allowances Movements</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-600">Main Pool</p>
                    <p className="text-2xl font-bold text-blue-900">£{reportsData.capitalAllowances.mainPool.toLocaleString()}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-purple-600">Special Rate Pool</p>
                    <p className="text-2xl font-bold text-purple-900">£{reportsData.capitalAllowances.specialRate.toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-600">AIA Claimed</p>
                    <p className="text-2xl font-bold text-green-900">£{reportsData.capitalAllowances.aia.toLocaleString()}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-orange-600">WDA Claimed</p>
                    <p className="text-2xl font-bold text-orange-900">£{reportsData.capitalAllowances.wda.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  View Movement Schedule
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'group-relief' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Group Relief Summary</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-600">Surrendered</p>
                  <p className="text-2xl font-bold text-red-900">£{reportsData.groupRelief.surrendered.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-600">Claimed</p>
                  <p className="text-2xl font-bold text-green-900">£{reportsData.groupRelief.claimed.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-600">Group Companies</p>
                  <p className="text-2xl font-bold text-blue-900">{reportsData.groupRelief.companies}</p>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  Generate Letters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cir' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Corporate Interest Restriction Report</h3>
            </div>
            <div className="p-6">
              {!reportsData.cir.applicable ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">CIR not applicable</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Company does not meet CIR thresholds
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-orange-600">Interest Disallowance</p>
                    <p className="text-2xl font-bold text-orange-900">£{reportsData.cir.disallowance.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Payments Forecast</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-600">QIP Q1 (Paid)</p>
                    <p className="text-lg font-bold text-green-900">£{reportsData.payments.qip1.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-600">QIP Q2 (Paid)</p>
                    <p className="text-lg font-bold text-green-900">£{reportsData.payments.qip2.toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-orange-600">QIP Q3 (Due)</p>
                    <p className="text-lg font-bold text-orange-900">£{reportsData.payments.qip3.toLocaleString()}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-red-600">Final Balance</p>
                    <p className="text-lg font-bold text-red-900">£{reportsData.payments.balance.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Payment Schedule</span>
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  Export Forecast
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports

import React, { useState, useEffect } from 'react'
import { TrendingDown, TrendingUp, RotateCcw, ArrowRight, Edit, Calculator, FileText } from 'lucide-react'

const Losses: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('brought-forward')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const tabs = [
    { id: 'brought-forward', label: 'Brought-forward', icon: TrendingDown },
    { id: 'in-year', label: 'In-year', icon: RotateCcw },
    { id: 'carry-back-forward', label: 'Carry-back/Forward', icon: ArrowRight },
    { id: 'streaming', label: 'Streaming', icon: TrendingUp }
  ]

  const broughtForwardLosses = [
    { id: 1, type: 'Trading Losses', amount: 25000, origin: '2021', utilized: 12000, remaining: 13000 },
    { id: 2, type: 'Capital Losses', amount: 8000, origin: '2022', utilized: 0, remaining: 8000 },
    { id: 3, type: 'Non-trading Loan Relationship', amount: 5000, origin: '2020', utilized: 5000, remaining: 0 }
  ]

  const inYearLosses = [
    { id: 1, type: 'Trading Loss', amount: 15000, source: 'Main Trade', treatment: 'Carry Forward', taxSaved: 0 },
    { id: 2, type: 'Capital Loss', amount: 3000, source: 'Asset Disposal', treatment: 'Carry Forward', taxSaved: 0 }
  ]

  const carryBackForward = [
    { id: 1, type: 'Trading Loss Carry Back', amount: 10000, targetYear: '2022', taxSaved: 1900, status: 'Claimed' },
    { id: 2, type: 'Trading Loss Carry Forward', amount: 5000, targetYear: '2024', taxSaved: 0, status: 'Available' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Losses (b/f, in-year, c/f, carry-back)</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Calculator className="w-4 h-4 mr-2 inline" />
            Optimize Relief
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <FileText className="w-4 h-4 mr-2 inline" />
            Generate Statement
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'brought-forward' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-red-50 rounded-lg p-6 cursor-pointer hover:bg-red-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">B/F Losses</p>
                      <p className="text-2xl font-bold text-red-900">£38,000</p>
                    </div>
                    <TrendingDown className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 cursor-pointer hover:bg-green-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Utilized</p>
                      <p className="text-2xl font-bold text-green-900">£17,000</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6 cursor-pointer hover:bg-orange-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Remaining</p>
                      <p className="text-2xl font-bold text-orange-900">£21,000</p>
                    </div>
                    <ArrowRight className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6 cursor-pointer hover:bg-blue-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Tax Saved</p>
                      <p className="text-2xl font-bold text-blue-900">£4,250</p>
                    </div>
                    <Calculator className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loss Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin Year</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilized</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {broughtForwardLosses.map((loss) => (
                      <tr key={loss.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loss.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{loss.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loss.origin}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">£{loss.utilized.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">£{loss.remaining.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'in-year' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Current Year Losses</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loss Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Saved</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inYearLosses.map((loss) => (
                      <tr key={loss.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loss.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{loss.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loss.source}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loss.treatment}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">£{loss.taxSaved.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'carry-back-forward' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Carry-back & Carry-forward Elections</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relief Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Year</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Saved</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {carryBackForward.map((relief) => (
                      <tr key={relief.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{relief.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{relief.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{relief.targetYear}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">£{relief.taxSaved.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            relief.status === 'Claimed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {relief.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'streaming' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Loss Streaming Rules</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-blue-900 mb-4">Streaming Restrictions</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Pre-entry losses</span>
                    <span className="text-sm font-medium text-blue-900">Restricted to same trade</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Capital losses</span>
                    <span className="text-sm font-medium text-blue-900">Against capital gains only</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">Non-trading deficits</span>
                    <span className="text-sm font-medium text-blue-900">Against non-trading profits</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Losses

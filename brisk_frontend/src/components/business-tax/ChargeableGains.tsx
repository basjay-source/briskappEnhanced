import React, { useState, useEffect } from 'react'
import { TrendingUp, Calculator, FileText, Plus, Edit, Building, DollarSign, Percent } from 'lucide-react'

const ChargeableGains: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('disposals')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const tabs = [
    { id: 'disposals', label: 'Disposals', icon: TrendingUp },
    { id: 'indexation', label: 'Indexation (legacy)', icon: Percent },
    { id: 'rollover', label: 'Rollover/Sch 7AC', icon: Calculator },
    { id: 'substantial-shareholding', label: 'Substantial Shareholding', icon: Building }
  ]

  const disposals = [
    { id: 1, asset: 'Office Building - London', disposalDate: '2023-06-15', proceeds: 450000, cost: 350000, indexation: 15000, gain: 85000, relief: 0, chargeableGain: 85000 },
    { id: 2, asset: 'Shares in ABC Ltd', disposalDate: '2023-09-20', proceeds: 75000, cost: 60000, indexation: 0, gain: 15000, relief: 15000, chargeableGain: 0 },
    { id: 3, asset: 'Plant & Machinery', disposalDate: '2023-11-10', proceeds: 25000, cost: 30000, indexation: 2000, gain: -3000, relief: 0, chargeableGain: 0 }
  ]

  const indexationRates = [
    { period: 'Apr 1998 - Mar 1999', rate: '2.4%' },
    { period: 'Apr 1999 - Mar 2000', rate: '1.6%' },
    { period: 'Apr 2000 - Mar 2001', rate: '3.0%' },
    { period: 'Apr 2001 - Mar 2002', rate: '1.8%' }
  ]

  const rolloverReliefs = [
    { id: 1, originalAsset: 'Factory Building', disposalDate: '2022-03-15', proceeds: 200000, gain: 50000, newAsset: 'Warehouse', acquisitionDate: '2022-05-20', cost: 250000, reliefClaimed: 50000 },
    { id: 2, originalAsset: 'Delivery Vehicles', disposalDate: '2023-01-10', proceeds: 45000, gain: 8000, newAsset: 'New Fleet', acquisitionDate: '2023-02-15', cost: 60000, reliefClaimed: 8000 }
  ]

  const substantialShareholdings = [
    { id: 1, company: 'XYZ Trading Ltd', shareholding: '85%', acquisitionDate: '2020-01-15', disposalDate: '2023-08-20', proceeds: 500000, cost: 300000, exemption: 'Substantial Shareholding', chargeableGain: 0 },
    { id: 2, company: 'DEF Services Ltd', shareholding: '15%', acquisitionDate: '2019-06-10', disposalDate: '2023-10-05', proceeds: 80000, cost: 60000, exemption: 'Not Applicable', chargeableGain: 20000 }
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
        <h1 className="text-2xl font-bold text-gray-900">Chargeable Gains (Corp tax on gains)</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Add Disposal
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <Calculator className="w-4 h-4 mr-2 inline" />
            Compute Gains
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
          {activeTab === 'disposals' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-green-50 rounded-lg p-6 cursor-pointer hover:bg-green-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Total Gains</p>
                      <p className="text-2xl font-bold text-green-900">£100,000</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6 cursor-pointer hover:bg-blue-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Reliefs Applied</p>
                      <p className="text-2xl font-bold text-blue-900">£15,000</p>
                    </div>
                    <Calculator className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6 cursor-pointer hover:bg-orange-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Chargeable Gains</p>
                      <p className="text-2xl font-bold text-orange-900">£85,000</p>
                    </div>
                    <FileText className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-6 cursor-pointer hover:bg-red-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">CT on Gains</p>
                      <p className="text-2xl font-bold text-red-900">£21,250</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-red-500" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disposal Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proceeds</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indexation</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/(Loss)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relief</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chargeable</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {disposals.map((disposal) => (
                      <tr key={disposal.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{disposal.asset}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{disposal.disposalDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{disposal.proceeds.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{disposal.cost.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{disposal.indexation.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={disposal.gain >= 0 ? 'text-green-600' : 'text-red-600'}>
                            £{disposal.gain.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">£{disposal.relief.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">£{disposal.chargeableGain.toLocaleString()}</td>
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

          {activeTab === 'indexation' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Indexation Allowance (Pre-2018)</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-blue-800">Indexation allowance is available for assets acquired before 1 January 2018. The allowance is frozen at December 2017 values.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indexation Rate</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {indexationRates.map((rate, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate.period}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rate.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'rollover' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Rollover Relief & Schedule 7AC</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Asset</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disposal Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proceeds</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gain</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Asset</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acquisition Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relief Claimed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rolloverReliefs.map((relief) => (
                      <tr key={relief.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{relief.originalAsset}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{relief.disposalDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{relief.proceeds.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">£{relief.gain.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{relief.newAsset}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{relief.acquisitionDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{relief.cost.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">£{relief.reliefClaimed.toLocaleString()}</td>
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

          {activeTab === 'substantial-shareholding' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Substantial Shareholding Exemption</h3>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-green-800">Gains on disposal of substantial shareholdings (10% or more) in trading companies may be exempt from corporation tax.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shareholding</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acquisition Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disposal Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proceeds</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exemption</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chargeable Gain</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {substantialShareholdings.map((shareholding) => (
                      <tr key={shareholding.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shareholding.company}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shareholding.shareholding}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shareholding.acquisitionDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shareholding.disposalDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{shareholding.proceeds.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{shareholding.cost.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            shareholding.exemption === 'Substantial Shareholding' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {shareholding.exemption}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{shareholding.chargeableGain.toLocaleString()}</td>
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
        </div>
      </div>
    </div>
  )
}

export default ChargeableGains

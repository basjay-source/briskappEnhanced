import React, { useState, useEffect } from 'react'
import { Calculator, Plus, Edit, Trash2, Download, Upload, FileText, Car, Building, Wrench } from 'lucide-react'

const CapitalAllowances: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pools')
  const [showAddAsset, setShowAddAsset] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const poolsData = [
    { id: 'main', name: 'Main Pool', rate: '18%', balance: 45000, wda: 8100, additions: 12000, disposals: 5000 },
    { id: 'special', name: 'Special Rate Pool', rate: '6%', balance: 25000, wda: 1500, additions: 8000, disposals: 2000 },
    { id: 'scba', name: 'SCBA Pool', rate: '100%', balance: 0, wda: 15000, additions: 15000, disposals: 0 },
    { id: 'sba', name: 'SBA Pool', rate: '100%', balance: 0, wda: 5000, additions: 5000, disposals: 0 }
  ]

  const aiaData = [
    { description: 'Plant & Machinery', cost: 25000, aiaUsed: 25000, remaining: 175000 },
    { description: 'Computer Equipment', cost: 8000, aiaUsed: 8000, remaining: 167000 },
    { description: 'Office Furniture', cost: 3500, aiaUsed: 3500, remaining: 163500 }
  ]

  const carsData = [
    { registration: 'AB12 CDE', co2: 95, cost: 18000, pool: 'Main Pool', wda: 3240, balance: 14760 },
    { registration: 'FG34 HIJ', co2: 180, cost: 35000, pool: 'Special Rate', wda: 2100, balance: 32900 },
    { registration: 'KL56 MNO', co2: 45, cost: 28000, pool: 'Main Pool', wda: 5040, balance: 22960 }
  ]

  const disposalData = [
    { asset: 'Manufacturing Equipment', originalCost: 45000, disposal: 38000, balancingCharge: 0, balancingAllowance: 7000 },
    { asset: 'Delivery Van', originalCost: 22000, disposal: 15000, balancingCharge: 0, balancingAllowance: 7000 },
    { asset: 'Office Equipment', originalCost: 8000, disposal: 12000, balancingCharge: 4000, balancingAllowance: 0 }
  ]

  if (loading) {
    return <div className="p-6"><div className="animate-pulse space-y-6"><div className="h-8 bg-gray-200 rounded w-1/4"></div><div className="space-y-4">{[...Array(4)].map((_, i) => (<div key={i} className="h-32 bg-gray-200 rounded"></div>))}</div></div></div>
  }

  const renderPoolsContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Allowances</h3>
          <p className="text-2xl font-bold text-green-600">£28,500</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">AIA Claimed</h3>
          <p className="text-2xl font-bold text-blue-600">£25,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">WDA Claimed</h3>
          <p className="text-2xl font-bold text-orange-600">£3,500</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Pool Balance</h3>
          <p className="text-2xl font-bold text-gray-600">£45,000</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Capital Allowances Pools</h3>
          <button 
            onClick={() => setShowAddAsset(true)}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Asset</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance B/F</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Additions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disposals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WDA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance C/F</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {poolsData.map((pool) => (
                <tr key={pool.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pool.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pool.rate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{pool.balance.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">£{pool.additions.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">£{pool.disposals.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">£{pool.wda.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{(pool.balance + pool.additions - pool.disposals - pool.wda).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
                      <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderAIAContent = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium text-blue-900">Annual Investment Allowance (AIA)</h3>
        </div>
        <p className="text-sm text-blue-700 mt-2">AIA limit for this period: £200,000 | Used: £36,500 | Remaining: £163,500</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">AIA Claims</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Import Assets</span>
            </button>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Claim</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AIA Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AIA Remaining</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {aiaData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{item.cost.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">£{item.aiaUsed.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">£{item.remaining.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
                      <button className="text-green-600 hover:text-green-900"><FileText className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">First Year Allowances (FYA)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-green-900">Electric Vehicles</h4>
            <p className="text-2xl font-bold text-green-600">£28,000</p>
            <p className="text-xs text-green-700">100% FYA claimed</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900">Energy Efficient Equipment</h4>
            <p className="text-2xl font-bold text-blue-600">£12,500</p>
            <p className="text-xs text-blue-700">100% FYA claimed</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-purple-900">Zero Emission Goods Vehicles</h4>
            <p className="text-2xl font-bold text-purple-600">£45,000</p>
            <p className="text-xs text-purple-700">100% FYA claimed</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCarsContent = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Car className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-medium text-yellow-900">Car Capital Allowances</h3>
        </div>
        <p className="text-sm text-yellow-700 mt-2">Cars are allocated to pools based on CO2 emissions. Low emission cars (≤50g/km) qualify for 100% FYA.</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Company Cars</h3>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Car</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO2 (g/km)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WDA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {carsData.map((car, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{car.registration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      car.co2 <= 50 ? 'bg-green-100 text-green-800' : 
                      car.co2 <= 110 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {car.co2}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{car.cost.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.pool}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">£{car.wda.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{car.balance.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
                      <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="text-sm font-medium text-gray-500">Low Emission Cars</h4>
          <p className="text-2xl font-bold text-green-600">1</p>
          <p className="text-xs text-gray-500">≤50g/km CO2</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="text-sm font-medium text-gray-500">Medium Emission Cars</h4>
          <p className="text-2xl font-bold text-yellow-600">1</p>
          <p className="text-xs text-gray-500">51-110g/km CO2</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="text-sm font-medium text-gray-500">High Emission Cars</h4>
          <p className="text-2xl font-bold text-red-600">1</p>
          <p className="text-xs text-gray-500">&gt;110g/km CO2</p>
        </div>
      </div>
    </div>
  )

  const renderDisposalContent = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Wrench className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-medium text-red-900">Disposals & Balancing Adjustments</h3>
        </div>
        <p className="text-sm text-red-700 mt-2">When assets are disposed of, balancing charges or allowances may arise depending on the disposal proceeds.</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Asset Disposals</h3>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Disposal</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disposal Proceeds</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balancing Charge</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balancing Allowance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {disposalData.map((disposal, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{disposal.asset}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{disposal.originalCost.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{disposal.disposal.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    {disposal.balancingCharge > 0 ? `£${disposal.balancingCharge.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    {disposal.balancingAllowance > 0 ? `£${disposal.balancingAllowance.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
                      <button className="text-green-600 hover:text-green-900"><Download className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="text-sm font-medium text-gray-500">Total Balancing Charges</h4>
          <p className="text-2xl font-bold text-red-600">£4,000</p>
          <p className="text-xs text-gray-500">Added to taxable profits</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="text-sm font-medium text-gray-500">Total Balancing Allowances</h4>
          <p className="text-2xl font-bold text-green-600">£14,000</p>
          <p className="text-xs text-gray-500">Deducted from taxable profits</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="text-sm font-medium text-gray-500">Net Adjustment</h4>
          <p className="text-2xl font-bold text-blue-600">£10,000</p>
          <p className="text-xs text-gray-500">Net allowance claimed</p>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pools':
        return renderPoolsContent()
      case 'aia-fya':
        return renderAIAContent()
      case 'cars':
        return renderCarsContent()
      case 'disposal-ba-wdas':
        return renderDisposalContent()
      default:
        return renderPoolsContent()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Capital Allowances</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Calculator className="w-4 h-4" />
            <span>Compute Allowances</span>
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'pools', label: 'Pools (Main/SR/SCBA/SBA)', icon: Building }, 
            { id: 'aia-fya', label: 'AIA/FYA', icon: Calculator }, 
            { id: 'cars', label: 'Cars', icon: Car }, 
            { id: 'disposal-ba-wdas', label: 'Disposal/BA/WDAs', icon: Wrench }
          ].map((tab) => {
            const IconComponent = tab.icon
            return (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
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

      {renderTabContent()}

      {showAddAsset && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Asset</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Asset Description</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cost</label>
                  <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pool</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>Main Pool</option>
                    <option>Special Rate Pool</option>
                    <option>SCBA Pool</option>
                    <option>SBA Pool</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button 
                    type="button" 
                    onClick={() => setShowAddAsset(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  >
                    Add Asset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CapitalAllowances

import React, { useState, useEffect } from 'react'
import { Building, Plus, Search, Filter, TrendingDown, Trash2 } from 'lucide-react'
import { bookkeepingApi } from '../../services/api'

const FixedAssets: React.FC = () => {
  const [activeTab, setActiveTab] = useState('asset-register')
  const [loading, setLoading] = useState(true)
  const [, setFixedAssets] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchFixedAssets = async () => {
      try {
        const response = await bookkeepingApi.getFixedAssets()
        setFixedAssets(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching fixed assets:', error)
        setLoading(false)
      }
    }

    fetchFixedAssets()
  }, [])

  const mockFixedAssets = [
    {
      id: 1,
      assetCode: 'IT001',
      assetName: 'Dell Laptop Computer',
      category: 'IT Equipment',
      purchaseDate: '2023-01-15',
      purchaseCost: 1500.00,
      accumulatedDepreciation: 375.00,
      netBookValue: 1125.00,
      depreciationMethod: 'straight_line',
      usefulLifeYears: 4,
      status: 'active'
    },
    {
      id: 2,
      assetCode: 'VEH001',
      assetName: 'Company Van',
      category: 'Vehicles',
      purchaseDate: '2022-06-10',
      purchaseCost: 25000.00,
      accumulatedDepreciation: 8333.33,
      netBookValue: 16666.67,
      depreciationMethod: 'straight_line',
      usefulLifeYears: 6,
      status: 'active'
    }
  ]

  const tabs = [
    { id: 'asset-register', name: 'Asset Register', icon: Building },
    { id: 'categories', name: 'Categories', icon: Filter },
    { id: 'depreciation-runs', name: 'Depreciation Runs', icon: TrendingDown },
    { id: 'additions', name: 'Additions', icon: Plus },
    { id: 'disposals', name: 'Disposals', icon: Trash2 },
    { id: 'revaluations', name: 'Revaluations', icon: TrendingDown }
  ]

  const renderAssetRegister = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Asset Register</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Asset</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="">All Categories</option>
              <option value="IT Equipment">IT Equipment</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Furniture">Furniture</option>
              <option value="Machinery">Machinery</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Depreciation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NBV</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockFixedAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{asset.assetName}</div>
                      <div className="text-sm text-gray-500">{asset.assetCode}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.purchaseDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{asset.purchaseCost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{asset.accumulatedDepreciation.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    £{asset.netBookValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      asset.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Depreciate</button>
                    <button className="text-red-600 hover:text-red-900">Dispose</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Fixed Assets</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Run Depreciation
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Asset Report
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
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
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {activeTab === 'asset-register' && renderAssetRegister()}
      {activeTab === 'categories' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Asset categories management coming soon...</p>
        </div>
      )}
      {activeTab === 'depreciation-runs' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Depreciation runs coming soon...</p>
        </div>
      )}
      {activeTab === 'additions' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Asset additions coming soon...</p>
        </div>
      )}
      {activeTab === 'disposals' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Asset disposals coming soon...</p>
        </div>
      )}
      {activeTab === 'revaluations' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Asset revaluations coming soon...</p>
        </div>
      )}
    </div>
  )
}

export default FixedAssets

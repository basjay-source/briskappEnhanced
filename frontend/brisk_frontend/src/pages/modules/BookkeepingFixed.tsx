import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import ResponsiveLayout from '../../components/ResponsiveLayout'
import { apiClient } from '../../lib/api'
import { 
  TrendingDown, Download,
  FileText, Calculator, PoundSterling, BarChart3, Building, Plus,
  Package, RefreshCw,
  ChevronDown, Landmark, Clock,
  Mail, Edit
} from 'lucide-react'

export default function BookkeepingFixed() {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [assets, setAssets] = useState<any[]>([])
  const [showAssetForm, setShowAssetForm] = useState(false)
  const [newAsset, setNewAsset] = useState({
    asset_name: '',
    asset_category: 'Equipment',
    acquisition_date: '',
    acquisition_cost: '',
    depreciation_method: 'straight_line',
    depreciation_rate: '20',
    useful_life_years: '5',
    depreciation_start_basis: 'acquisition_date',
    account_id: ''
  })

  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      hasSubTabs: false
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      hasSubTabs: true,
      subTabs: [
        { id: 'financial-reports', label: 'Financial Reports' },
        { id: 'management-reports', label: 'Management Reports' },
        { id: 'analytics', label: 'Analytics' }
      ]
    },
    {
      id: 'banking',
      label: 'Banking',
      icon: Landmark,
      hasSubTabs: true,
      subTabs: [
        { id: 'cash-coding', label: 'Cash Coding' }
      ]
    },
    {
      id: 'fixed-assets',
      label: 'Fixed Assets',
      icon: Building,
      hasSubTabs: false
    },
    {
      id: 'recurring-transactions',
      label: 'Recurring Transactions',
      icon: RefreshCw,
      hasSubTabs: false
    },
    {
      id: 'accruals-prepayments',
      label: 'Accruals & Prepayments',
      icon: Clock,
      hasSubTabs: false
    },
    {
      id: 'invoice-tracking',
      label: 'Invoice Tracking',
      icon: Mail,
      hasSubTabs: false
    }
  ]

  const handleMainTabClick = (tabId: string) => {
    setActiveMainTab(tabId)
    const tab = menuStructure.find(t => t.id === tabId)
    if (tab?.hasSubTabs && tab.subTabs) {
      setActiveSubTab(tab.subTabs[0].id)
    } else {
      setActiveSubTab('')
    }
  }

  const handleSubTabClick = (subTabId: string) => {
    setActiveSubTab(subTabId)
  }

  const loadAssets = async () => {
    try {
      const data = await apiClient.getFixedAssets() as any
      setAssets(data || [])
    } catch (error) {
      console.error('Failed to load fixed assets:', error)
      setAssets([])
    }
  }

  const handleCreateAsset = async () => {
    try {
      await apiClient.createFixedAsset({
        ...newAsset,
        company_id: 'default'
      })
      setShowAssetForm(false)
      setNewAsset({
        asset_name: '',
        asset_category: 'Equipment',
        acquisition_date: '',
        acquisition_cost: '',
        depreciation_method: 'straight_line',
        depreciation_rate: '20',
        useful_life_years: '5',
        depreciation_start_basis: 'acquisition_date',
        account_id: ''
      })
      loadAssets()
    } catch (error) {
      console.error('Failed to create asset:', error)
    }
  }

  const handleCalculateDepreciation = async () => {
    try {
      const result = await apiClient.calculateDepreciation() as any
      alert(result.message)
      loadAssets()
    } catch (error) {
      console.error('Failed to calculate depreciation:', error)
    }
  }

  const handleExportAssets = async () => {
    try {
      const result = await apiClient.exportFixedAssets() as any
      const blob = new Blob([result.csv_data], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = result.filename
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export assets:', error)
    }
  }

  useEffect(() => {
    if (activeMainTab === 'fixed-assets') {
      loadAssets()
    }
  }, [activeMainTab])

  function renderDashboard() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Bookkeeping Dashboard</h2>
            <p className="text-gray-600">Financial management and reporting overview</p>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£{assets.reduce((sum, asset) => sum + (asset.current_book_value || 0), 0).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Current book value</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Assets</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assets.length}</div>
              <p className="text-xs text-muted-foreground">Fixed assets registered</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Depreciation</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£{assets.reduce((sum, asset) => sum + (asset.accumulated_depreciation || 0), 0).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Accumulated depreciation</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Original Cost</CardTitle>
              <PoundSterling className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£{assets.reduce((sum, asset) => sum + (asset.acquisition_cost || 0), 0).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total acquisition cost</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderFixedAssets() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Fixed Assets Register</h2>
            <p className="text-gray-600">Manage fixed assets with flexible depreciation calculations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowAssetForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Asset
            </Button>
            <Button variant="outline" onClick={handleCalculateDepreciation}>
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Depreciation
            </Button>
            <Button onClick={handleExportAssets}>
              <Download className="h-4 w-4 mr-2" />
              Export Register
            </Button>
          </div>
        </div>

        {showAssetForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add Fixed Asset</CardTitle>
              <CardDescription>Create a new fixed asset with depreciation settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Asset Name</label>
                  <Input
                    value={newAsset.asset_name}
                    onChange={(e) => setNewAsset({...newAsset, asset_name: e.target.value})}
                    placeholder="e.g., Office Computer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={newAsset.asset_category}
                    onChange={(e) => setNewAsset({...newAsset, asset_category: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Equipment">Equipment</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Buildings">Buildings</option>
                    <option value="Furniture">Furniture</option>
                    <option value="IT Hardware">IT Hardware</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Acquisition Date</label>
                  <Input
                    type="date"
                    value={newAsset.acquisition_date}
                    onChange={(e) => setNewAsset({...newAsset, acquisition_date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Acquisition Cost (£)</label>
                  <Input
                    type="number"
                    value={newAsset.acquisition_cost}
                    onChange={(e) => setNewAsset({...newAsset, acquisition_cost: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Depreciation Method</label>
                  <select
                    value={newAsset.depreciation_method}
                    onChange={(e) => setNewAsset({...newAsset, depreciation_method: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="straight_line">Straight Line</option>
                    <option value="reducing_balance">Reducing Balance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Depreciation Rate (%)</label>
                  <Input
                    type="number"
                    value={newAsset.depreciation_rate}
                    onChange={(e) => setNewAsset({...newAsset, depreciation_rate: e.target.value})}
                    placeholder="20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Useful Life (Years)</label>
                  <Input
                    type="number"
                    value={newAsset.useful_life_years}
                    onChange={(e) => setNewAsset({...newAsset, useful_life_years: e.target.value})}
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Depreciation Start Basis</label>
                  <select
                    value={newAsset.depreciation_start_basis}
                    onChange={(e) => setNewAsset({...newAsset, depreciation_start_basis: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="acquisition_date">Actual Acquisition Date</option>
                    <option value="year_start">Start of Year</option>
                    <option value="year_end">End of Year</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleCreateAsset}>Add Asset</Button>
                <Button variant="outline" onClick={() => setShowAssetForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Fixed Assets Register</CardTitle>
            <CardDescription>Complete register of all fixed assets with depreciation calculations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-2 text-left font-medium text-black">Asset Name</th>
                    <th className="border border-gray-300 p-2 text-left font-medium text-black">Category</th>
                    <th className="border border-gray-300 p-2 text-left font-medium text-black">Acquisition Date</th>
                    <th className="border border-gray-300 p-2 text-right font-medium text-black">Cost</th>
                    <th className="border border-gray-300 p-2 text-left font-medium text-black">Method</th>
                    <th className="border border-gray-300 p-2 text-left font-medium text-black">Start Basis</th>
                    <th className="border border-gray-300 p-2 text-right font-medium text-black">Accumulated Depreciation</th>
                    <th className="border border-gray-300 p-2 text-right font-medium text-black">Book Value</th>
                    <th className="border border-gray-300 p-2 text-center font-medium text-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 text-black">{asset.asset_name}</td>
                      <td className="border border-gray-300 p-2 text-black">{asset.asset_category}</td>
                      <td className="border border-gray-300 p-2 text-black">{new Date(asset.acquisition_date).toLocaleDateString()}</td>
                      <td className="border border-gray-300 p-2 text-right text-black">£{asset.acquisition_cost.toLocaleString()}</td>
                      <td className="border border-gray-300 p-2 text-black">{asset.depreciation_method.replace('_', ' ')}</td>
                      <td className="border border-gray-300 p-2 text-black">{asset.depreciation_start_basis.replace('_', ' ')}</td>
                      <td className="border border-gray-300 p-2 text-right text-black">£{asset.accumulated_depreciation.toLocaleString()}</td>
                      <td className="border border-gray-300 p-2 text-right text-black">£{asset.current_book_value.toLocaleString()}</td>
                      <td className="border border-gray-300 p-2 text-center">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {assets.length === 0 && (
                    <tr>
                      <td colSpan={9} className="border border-gray-300 p-4 text-center text-gray-500">
                        No fixed assets registered. Click "New Asset" to add your first asset.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderMainContent() {
    if (activeMainTab === 'dashboard') return renderDashboard()
    if (activeMainTab === 'fixed-assets') return renderFixedAssets()
    
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <p className="text-gray-600">This feature is under development</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ResponsiveLayout>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold">Bookkeeping</h1>
            <p className="text-sm text-gray-600">Financial management and reporting</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {menuStructure.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => handleMainTabClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      activeMainTab === item.id
                        ? 'bg-[#FF6B35] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-4 w-4 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.hasSubTabs && (
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        activeMainTab === item.id ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {item.hasSubTabs && activeMainTab === item.id && item.subTabs && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.subTabs.map((subTab) => (
                        <button
                          key={subTab.id}
                          onClick={() => handleSubTabClick(subTab.id)}
                          className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                            activeSubTab === subTab.id
                              ? 'bg-[#FF6B35] text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {subTab.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  )
}

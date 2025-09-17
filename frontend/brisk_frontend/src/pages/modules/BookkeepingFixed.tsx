import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useLocale } from '../../contexts/LocaleContextNew'
import { apiClient } from '../../lib/api'
import { 
  TrendingDown, Download,
  FileText, Calculator, BarChart3, Plus,
  Package, RefreshCw,
  ChevronDown, Landmark, Clock,
  Mail, Edit, Shield, CheckCircle, AlertCircle, Eye, Settings,
  TrendingUp, Zap, Database, ArrowRight, Search,
  Building, PoundSterling
} from 'lucide-react'

export default function BookkeepingFixed() {
  const { formatDate } = useLocale()
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [assets, setAssets] = useState<any[]>([])
  const [showAssetForm, setShowAssetForm] = useState(false)
  const [vatReturns, setVatReturns] = useState<any[]>([])
  const [vatBridges, setVatBridges] = useState<any[]>([])
  const [vatReports, setVatReports] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [complianceFilter, setComplianceFilter] = useState('all')
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
      id: 'vat',
      label: 'VAT & MTD',
      icon: Shield,
      hasSubTabs: true,
      subTabs: [
        { id: 'vat-returns', label: 'VAT Returns' },
        { id: 'mtd-bridging', label: 'MTD Bridging' },
        { id: 'mtd-compliance', label: 'MTD Compliance' },
        { id: 'vat-reports', label: 'VAT Reports' },
        { id: 'vat-rates', label: 'International VAT Rates' },
        { id: 'vat-automation', label: 'VAT Automation' }
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

  const loadVATData = async () => {
    try {
      const [returnsResponse] = await Promise.all([
        apiClient.getVATReturns(),
        apiClient.getVATSchemes(),
        apiClient.getVATAnalytics('compliance')
      ])

      const transformedReturns = returnsResponse.map((ret: any) => ({
        id: ret.id || Math.random().toString(),
        period: ret.period || 'Q4 2024',
        period_start: ret.period_start || '2024-10-01',
        period_end: ret.period_end || '2024-12-31',
        due_date: ret.due_date || '2025-02-07',
        status: ret.status || 'draft',
        mtd_compliance_level: ret.mtd_compliance_level || 'enhanced',
        company_name: ret.company_name || 'Sample Company Ltd',
        box1: ret.box1 || 12500,
        box4: ret.box4 || 3200,
        box5: ret.box5 || 9300,
        box6: ret.box6 || 62500,
        auto_calculated: ret.auto_calculated || true,
        digital_records_maintained: ret.digital_records_maintained || true,
        software_used: ret.software_used || 'Brisk Practice Suite'
      }))

      if (transformedReturns.length === 0) {
        const sampleReturn = await apiClient.createVATReturn({
          period: 'Q4 2024',
          due_date: '2025-02-07',
          status: 'draft',
          box1: 12500,
          box4: 3200,
          box5: 9300,
          box6: 62500
        }) as any
        
        setVatReturns([{
          id: sampleReturn.id || '1',
          period: 'Q4 2024',
          period_start: '2024-10-01',
          period_end: '2024-12-31',
          due_date: '2025-02-07',
          status: 'draft',
          mtd_compliance_level: 'enhanced',
          company_name: 'Sample Company Ltd',
          box1: 12500,
          box4: 3200,
          box5: 9300,
          box6: 62500,
          auto_calculated: true,
          digital_records_maintained: true,
          software_used: 'Brisk Practice Suite'
        }])
      } else {
        setVatReturns(transformedReturns)
      setVatBridges([
        {
          id: '1',
          name: 'Xero Integration',
          status: 'active',
          lastSync: '2024-01-15T10:30:00Z',
          recordsProcessed: 1250,
          type: 'accounting'
        },
        {
          id: '2', 
          name: 'HMRC Gateway',
          status: 'syncing',
          lastSync: '2024-01-15T09:45:00Z',
          recordsProcessed: 890,
          type: 'tax'
        }
      ])

      setVatReports([
        {
          id: '1',
          name: 'MTD Compliance Report',
          type: 'compliance',
          period: 'Q4 2023',
          status: 'completed',
          generatedDate: '2024-01-10T14:20:00Z'
        },
        {
          id: '2',
          name: 'VAT Analysis Report', 
          type: 'analysis',
          period: 'Q4 2023',
          status: 'pending',
          generatedDate: '2024-01-12T11:15:00Z'
        }
      ])
      }

      setVatBridges([
        {
          id: '1',
          name: 'Xero Integration',
          provider: 'Xero',
          bridge_type: 'accounting_software',
          status: 'active',
          last_sync: '2025-01-30T10:30:00Z',
          auto_sync: true,
          sync_frequency: 'daily',
          records_synced: 1250,
          compliance_level: 'full_mtd'
        },
        {
          id: '2',
          name: 'QuickBooks Bridge',
          provider: 'QuickBooks',
          bridge_type: 'accounting_software',
          status: 'syncing',
          last_sync: '2025-01-29T15:45:00Z',
          auto_sync: true,
          sync_frequency: 'weekly',
          records_synced: 890,
          compliance_level: 'enhanced'
        }
      ])

      setVatReports([
        {
          id: '1',
          name: 'MTD Compliance Report',
          type: 'compliance',
          generated_date: '2025-01-30',
          period: 'Q4 2024',
          status: 'completed',
          compliance_score: 98
        },
        {
          id: '2',
          name: 'VAT Liability Analysis',
          type: 'liability_analysis',
          generated_date: '2025-01-29',
          period: 'Q4 2024',
          status: 'completed',
          total_liability: 9300
        }
      ])
    } catch (error) {
      console.error('Error loading VAT data:', error)
      setVatReturns([
        {
          id: '1',
          period: 'Q4 2024',
          period_start: '2024-10-01',
          period_end: '2024-12-31',
          due_date: '2025-02-07',
          status: 'draft',
          mtd_compliance_level: 'enhanced',
          company_name: 'Sample Company Ltd',
          box1: 12500,
          box4: 3200,
          box5: 9300,
          box6: 62500,
          auto_calculated: true,
          digital_records_maintained: true,
          software_used: 'Brisk Practice Suite'
        }
      ])
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
    } else if (activeMainTab === 'vat') {
      loadVATData()
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

  const getComplianceBadge = (level: string) => {
    const variants = {
      basic: { variant: 'secondary' as const, label: 'Basic', color: 'text-gray-600' },
      enhanced: { variant: 'default' as const, label: 'Enhanced', color: 'text-blue-600' },
      full_mtd: { variant: 'default' as const, label: 'MTD Ready', color: 'text-green-600' }
    }
    
    const config = variants[level as keyof typeof variants] || variants.basic
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} bg-gray-100`}>
        {config.label}
      </span>
    )
  }

  const getBridgeStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'syncing':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'disconnected':
        return <AlertCircle className="h-5 w-5 text-gray-500" />
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  const filteredReturns = vatReturns.filter(vatReturn => {
    const matchesSearch = vatReturn.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (vatReturn.company_name && vatReturn.company_name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCompliance = complianceFilter === 'all' || vatReturn.mtd_compliance_level === complianceFilter
    return matchesSearch && matchesCompliance
  })

  const handleReturnClick = (returnId: string) => {
    console.log('Navigating to VAT return details:', returnId)
  }

  const handleBridgeClick = (bridgeId: string) => {
    console.log('Configuring bridge:', bridgeId)
  }

  const handleReportClick = (reportId: string) => {
    console.log('Viewing report details:', reportId)
  }

  function renderVATReturns() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">VAT Returns</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-900" />
              <input
                type="text"
                placeholder="Search returns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              />
            </div>
            <select
              value={complianceFilter}
              onChange={(e) => setComplianceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="basic">Basic</option>
              <option value="enhanced">Enhanced</option>
              <option value="full_mtd">MTD Ready</option>
            </select>
            <button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New VAT Return
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredReturns.map((vatReturn) => (
            <Card 
              key={vatReturn.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleReturnClick(vatReturn.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {vatReturn.automated_calculationsd && <Zap className="h-4 w-4 text-yellow-500" />}
                      {vatReturn.digital_records_maintained && <Database className="h-4 w-4 text-green-500" />}
                      <Shield className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">VAT Return - {vatReturn.period}</CardTitle>
                      <CardDescription>Due: {formatDate(vatReturn.due_date)}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getComplianceBadge(vatReturn.mtd_compliance_level)}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      vatReturn.status === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {vatReturn.status.charAt(0).toUpperCase() + vatReturn.status.slice(1)}
                    </span>
                    <span className="text-lg font-bold text-[#FF6B35]">£{vatReturn.box5.toLocaleString()}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Box 1 (VAT on Sales)</p>
                    <p className="font-bold">£{vatReturn.box1.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Box 4 (VAT on Purchases)</p>
                    <p className="font-bold">£{vatReturn.box4.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Box 5 (Net VAT Due)</p>
                    <p className="font-bold text-[#FF6B35]">£{vatReturn.box5.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Box 6 (Total Sales)</p>
                    <p className="font-bold">£{vatReturn.box6.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calculator className="h-4 w-4" />
                    Period: {formatDate(vatReturn.period_start)} to {formatDate(vatReturn.period_end)}
                  </div>
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReturnClick(vatReturn.id)
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  function renderMTDBridging() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">VAT Bridging & Integrations</h2>
          <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Bridge
          </Button>
        </div>

        <div className="grid gap-4">
          {vatBridges.map((bridge) => (
            <Card 
              key={bridge.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleBridgeClick(bridge.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getBridgeStatusIcon(bridge.status)}
                    <div>
                      <CardTitle className="text-lg">{bridge.name}</CardTitle>
                      <CardDescription>{bridge.provider} • {bridge.bridge_type}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getComplianceBadge(bridge.compliance_level)}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bridge.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {bridge.status.charAt(0).toUpperCase() + bridge.status.slice(1)}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-3 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Last Sync</p>
                    <p className="font-bold">{formatDate(bridge.last_sync)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Records Synced</p>
                    <p className="font-bold">{bridge.records_synced.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sync Frequency</p>
                    <p className="font-bold">{bridge.sync_frequency}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RefreshCw className="h-4 w-4" />
                    Auto-sync: {bridge.auto_sync ? 'Enabled' : 'Disabled'}
                  </div>
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBridgeClick(bridge.id)
                    }}
                  >
                    <Settings className="h-4 w-4" />
                    Configure
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  function renderMTDCompliance() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">MTD Compliance Dashboard</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            View Full Report
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Digital Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">100%</div>
              <p className="text-sm text-gray-600">Compliant records maintained</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                API Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">Active</div>
              <p className="text-sm text-gray-600">HMRC API connected</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#FF6B35]" />
                Compliance Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#FF6B35]">98%</div>
              <p className="text-sm text-gray-600">Overall compliance rating</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderVATReports() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Advanced VAT Reports</h2>
          <button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Generate Report
          </button>
        </div>

        <div className="grid gap-4">
          {vatReports.map((report) => (
            <Card 
              key={report.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleReportClick(report.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <CardDescription>{report.type} • {report.period}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                    {report.compliance_score && (
                      <span className="text-lg font-bold text-green-600">{report.compliance_score}%</span>
                    )}
                    {report.total_liability && (
                      <span className="text-lg font-bold text-[#FF6B35]">£{report.total_liability.toLocaleString()}</span>
                    )}
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calculator className="h-4 w-4" />
                    Generated: {formatDate(report.generated_date)}
                  </div>
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReportClick(report.id)
                    }}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  function renderVATAutomation() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">VAT Automation & AI</h2>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configure Automation
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Auto-Calculation
              </CardTitle>
              <CardDescription>Automated VAT calculations from transaction data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sales VAT</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Purchase VAT</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Reverse Charge</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Disabled</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Smart Bridging & Sync
              </CardTitle>
              <CardDescription>Intelligent data synchronization across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Real-time Sync</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Conflict Resolution</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Auto</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Validation</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Enhanced</span>
                </div>
              </div>
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
                      <td className="border border-gray-300 p-2 text-black">{formatDate(asset.acquisition_date)}</td>
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
    switch (activeMainTab) {
      case 'dashboard':
        return renderDashboard()
      case 'fixed-assets':
        return renderFixedAssets()
      case 'vat':
        switch (activeSubTab) {
          case 'vat-returns':
            return renderVATReturns()
          case 'mtd-bridging':
            return renderMTDBridging()
          case 'mtd-compliance':
            return renderMTDCompliance()
          case 'vat-reports':
            return renderVATReports()
          case 'vat-rates':
            return <div className="p-6"><h2 className="text-2xl font-bold">International VAT Rates</h2><p>International VAT rates functionality is available in the main BookkeepingVAT component.</p></div>
          case 'vat-automation':
            return renderVATAutomation()
          default:
            return renderVATReturns()
        }
      default:
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
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useLocale } from '../../contexts/LocaleContextNew'
import { apiClient } from '../../lib/api'
import { 
  Download, Globe,
  FileText, Calculator, BarChart3, Plus,
  Package, ChevronDown,
  Shield, CheckCircle, Eye, Settings,
  TrendingUp, Zap, Database, ArrowRight
} from 'lucide-react'

export default function BookkeepingVAT() {
  const { formatDate } = useLocale()
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [assets, setAssets] = useState<any[]>([])
  const [showAssetForm, setShowAssetForm] = useState(false)
  const [vatReturns, setVatReturns] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [complianceFilter, setComplianceFilter] = useState('all')
  const [internationalVATRates, setInternationalVATRates] = useState<any[]>([])
  const [selectedCountry, setSelectedCountry] = useState('GB')
  const [vatRateSearch, setVatRateSearch] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')
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
      id: 'vat-mtd',
      label: 'VAT & MTD',
      icon: Shield,
      hasSubTabs: true,
      subTabs: ['VAT Returns', 'MTD Bridging', 'MTD Compliance', 'VAT Reports', 'International VAT', 'VAT Automation']
    },
    {
      id: 'fixed-assets',
      label: 'Fixed Assets',
      icon: Package,
      hasSubTabs: false
    }
  ]

  const handleMainTabClick = (tabId: string) => {
    setActiveMainTab(tabId)
    const menu = menuStructure.find(m => m.id === tabId)
    if (menu?.hasSubTabs && menu.subTabs && menu.subTabs.length > 0) {
      setActiveSubTab(menu.subTabs[0])
    } else {
      setActiveSubTab('')
    }
  }

  const handleSubTabClick = (subTab: string) => {
    setActiveSubTab(subTab)
  }

  const loadAssets = async () => {
    try {
      const response = await apiClient.getFixedAssets()
      setAssets(Array.isArray(response) ? response : [])
    } catch (error) {
      console.error('Error loading assets:', error)
      setAssets([])
    }
  }

  const loadVATData = async () => {
    try {
      const [returnsResponse, ratesResponse] = await Promise.all([
        apiClient.getVATReturns().catch(() => ({ returns: [] })),
        apiClient.getInternationalVATRates().catch(() => [])
      ])

      const returns = (returnsResponse as any)?.returns || []
      const rates = Array.isArray(ratesResponse) ? ratesResponse : []
      
      setVatReturns(Array.isArray(returns) ? returns : [])
      setInternationalVATRates(rates)

    } catch (error) {
      console.error('Error loading VAT data:', error)
      setVatReturns([])
      setInternationalVATRates([])
    }
  }

  useEffect(() => {
    loadAssets()
    loadVATData()
  }, [])

  const handleCreateAsset = async () => {
    try {
      await apiClient.createFixedAsset(newAsset)
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
      console.error('Error creating asset:', error)
    }
  }

  const handleExportAssets = () => {
    const csvContent = [
      ['Asset Name', 'Category', 'Acquisition Date', 'Cost', 'Depreciation Method', 'Current Value'],
      ...assets.map(asset => [
        asset.asset_name,
        asset.asset_category,
        formatDate(asset.acquisition_date),
        asset.acquisition_cost,
        asset.depreciation_method,
        asset.current_value || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fixed_assets_register.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  function renderDashboard() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleMainTabClick('vat-mtd')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">VAT Returns</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vatReturns.length}</div>
              <p className="text-xs text-muted-foreground">Active returns</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleMainTabClick('fixed-assets')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fixed Assets</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assets.length}</div>
              <p className="text-xs text-muted-foreground">Registered assets</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">International VAT</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{internationalVATRates.length}</div>
              <p className="text-xs text-muted-foreground">Countries covered</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MTD Compliance</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">Compliance score</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderVATReturns() {
    const filteredReturns = vatReturns.filter(vatReturn => 
      vatReturn.period?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vatReturn.status?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">VAT Returns</h2>
            <p className="text-gray-600">Manage VAT returns and submissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90">
              <Plus className="h-4 w-4 mr-2" />
              New Return
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          <Input
            placeholder="Search returns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <select
            value={complianceFilter}
            onChange={(e) => setComplianceFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReturns.map((vatReturn) => (
            <Card 
              key={vatReturn.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-[#FF6B35]"
              onClick={() => console.log('View VAT return:', vatReturn.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span>{vatReturn.period}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    vatReturn.status === 'submitted' ? 'bg-green-100 text-green-800' :
                    vatReturn.status === 'overdue' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {vatReturn.status}
                  </span>
                </CardTitle>
                <CardDescription>Due: {formatDate(vatReturn.due_date)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Net VAT Due:</span>
                    <span className="font-medium">£{vatReturn.net_vat_due?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Sales:</span>
                    <span className="font-medium">£{vatReturn.total_value_sales_ex_vat?.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReturns.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No VAT returns found matching your criteria.</p>
          </div>
        )}
      </div>
    )
  }

  function renderInternationalVATRates() {
    const regions = ['Europe', 'North America', 'Asia Pacific', 'Middle East', 'Africa', 'South America']
    const filteredRates = internationalVATRates.filter(rate => 
      rate.country?.toLowerCase().includes(vatRateSearch.toLowerCase()) ||
      rate.countryCode?.toLowerCase().includes(vatRateSearch.toLowerCase()) ||
      rate.currency?.toLowerCase().includes(vatRateSearch.toLowerCase())
    )

    const regionFilteredRates = selectedRegion === 'all' 
      ? filteredRates 
      : filteredRates.filter(rate => rate.region === selectedRegion)

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">International VAT Rates</h2>
            <p className="text-gray-600">Comprehensive global VAT rate database for international compliance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.open('/api/vat/international-rates/export', '_blank')}>
              <Download className="h-4 w-4 mr-2" />
              Export Rates
            </Button>
            <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Rate
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search countries, codes, or currencies..."
              value={vatRateSearch}
              onChange={(e) => setVatRateSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
          >
            <option value="all">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regionFilteredRates.map((rate) => (
            <Card 
              key={rate.countryCode} 
              className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-[#FF6B35]"
              onClick={() => setSelectedCountry(rate.countryCode)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-[#FF6B35]" />
                    {rate.country}
                  </span>
                  <span className="text-sm font-normal text-gray-500">{rate.countryCode}</span>
                </CardTitle>
                <CardDescription>{rate.currency}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Standard Rate:</span>
                    <span className="text-lg font-bold text-[#FF6B35]">{rate.standardRate}%</span>
                  </div>
                  {rate.reducedRates && rate.reducedRates.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Reduced Rates:</span>
                      <span className="text-sm">{rate.reducedRates.join(', ')}%</span>
                    </div>
                  )}
                  {rate.zeroRate && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Zero Rate:</span>
                      <span className="text-sm text-green-600">Available</span>
                    </div>
                  )}
                  <div className="pt-2 border-t">
                    <span className="text-xs text-gray-500">
                      Updated: {formatDate(rate.lastUpdated)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {regionFilteredRates.length === 0 && (
          <div className="text-center py-8">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No VAT rates found matching your search criteria.</p>
          </div>
        )}

        {selectedCountry && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>VAT Rate Details - {internationalVATRates.find(r => r.countryCode === selectedCountry)?.country}</CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const rate = internationalVATRates.find(r => r.countryCode === selectedCountry);
                if (!rate) return null;
                
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Rate Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Standard Rate:</span>
                          <span className="font-medium">{rate.standardRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reduced Rates:</span>
                          <span className="font-medium">{rate.reducedRates && rate.reducedRates.length > 0 ? rate.reducedRates.join(', ') + '%' : 'None'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Zero Rate Available:</span>
                          <span className="font-medium">{rate.zeroRate ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Currency:</span>
                          <span className="font-medium">{rate.currency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Effective Date:</span>
                          <span className="font-medium">{rate.effectiveDate}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Common Exemptions</h4>
                      <ul className="space-y-1">
                        {rate.exemptions && rate.exemptions.map((exemption: string, index: number) => (
                          <li key={index} className="text-sm text-gray-600">• {exemption}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  function renderMTDBridging() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">MTD Bridging</h2>
            <p className="text-gray-600">Making Tax Digital integration and bridging services</p>
          </div>
          <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90">
            <Zap className="h-4 w-4 mr-2" />
            Connect MTD
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-[#FF6B35]" />
                HMRC Connection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <span className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Connected
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-[#FF6B35]" />
                Digital Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span>Compliance:</span>
                <span className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Maintained
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-[#FF6B35]" />
                Auto Calculations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <span className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Active
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderMTDCompliance() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">MTD Compliance</h2>
            <p className="text-gray-600">Monitor Making Tax Digital compliance status</p>
          </div>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            View Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Overall Score:</span>
                  <span className="text-2xl font-bold text-green-600">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Q4 2024</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Q3 2024</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Q2 2024</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
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
          <div>
            <h2 className="text-2xl font-bold">VAT Reports</h2>
            <p className="text-gray-600">Comprehensive VAT reporting and analytics</p>
          </div>
          <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>VAT Liability Trend</CardTitle>
              <CardDescription>Monthly VAT liability analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <TrendingUp className="h-8 w-8 text-[#FF6B35]" />
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Rate Analysis</CardTitle>
              <CardDescription>Effective VAT rate breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Calculator className="h-8 w-8 text-[#FF6B35]" />
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Submission History</CardTitle>
              <CardDescription>VAT return submission timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <FileText className="h-8 w-8 text-[#FF6B35]" />
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderVATAutomation() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">VAT Automation & AI</h2>
            <p className="text-gray-600">Automated VAT processing and AI-powered insights</p>
          </div>
          <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90">
            <Zap className="h-4 w-4 mr-2" />
            Configure Automation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>Configure automated VAT processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Auto-calculate VAT</span>
                  <div className="w-10 h-6 bg-[#FF6B35] rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Auto-submit returns</span>
                  <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Smart categorization</span>
                  <div className="w-10 h-6 bg-[#FF6B35] rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>AI-powered VAT recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">Consider switching to flat rate scheme for Q1 2025</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">VAT compliance score improved by 5% this quarter</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">Review international VAT rates for EU transactions</p>
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Fixed Assets Register</h2>
            <p className="text-gray-600">Manage fixed assets with flexible depreciation calculations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportAssets}>
              <Download className="h-4 w-4 mr-2" />
              Export Register
            </Button>
            <Button 
              className="bg-[#FF6B35] hover:bg-[#FF6B35]/90"
              onClick={() => setShowAssetForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </div>

        {showAssetForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Fixed Asset</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Asset Name</label>
                  <Input
                    value={newAsset.asset_name}
                    onChange={(e) => setNewAsset({...newAsset, asset_name: e.target.value})}
                    placeholder="Enter asset name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={newAsset.asset_category}
                    onChange={(e) => setNewAsset({...newAsset, asset_category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
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
                  <label className="block text-sm font-medium mb-1">Acquisition Cost</label>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  >
                    <option value="straight_line">Straight Line</option>
                    <option value="reducing_balance">Reducing Balance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Depreciation Start Basis</label>
                  <select
                    value={newAsset.depreciation_start_basis}
                    onChange={(e) => setNewAsset({...newAsset, depreciation_start_basis: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  >
                    <option value="acquisition_date">Acquisition Date</option>
                    <option value="start_of_year">Start of Year</option>
                    <option value="end_of_year">End of Year</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleCreateAsset} className="bg-[#FF6B35] hover:bg-[#FF6B35]/90">
                  Create Asset
                </Button>
                <Button variant="outline" onClick={() => setShowAssetForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <Card key={asset.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{asset.asset_name}</span>
                  <Package className="h-5 w-5 text-[#FF6B35]" />
                </CardTitle>
                <CardDescription>{asset.asset_category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Acquisition Date:</span>
                    <span className="font-medium">{formatDate(asset.acquisition_date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Original Cost:</span>
                    <span className="font-medium">£{asset.acquisition_cost?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Current Value:</span>
                    <span className="font-medium">£{asset.current_value?.toLocaleString() || 'N/A'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {assets.length === 0 && (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No fixed assets registered yet.</p>
            <Button 
              className="mt-4 bg-[#FF6B35] hover:bg-[#FF6B35]/90"
              onClick={() => setShowAssetForm(true)}
            >
              Add Your First Asset
            </Button>
          </div>
        )}
      </div>
    )
  }

  function renderMainContent() {
    if (activeMainTab === 'dashboard') {
      return renderDashboard()
    }

    if (activeMainTab === 'fixed-assets') {
      return renderFixedAssets()
    }

    if (activeMainTab === 'vat-mtd') {
      switch (activeSubTab) {
        case 'VAT Returns':
          return renderVATReturns()
        case 'MTD Bridging':
          return renderMTDBridging()
        case 'MTD Compliance':
          return renderMTDCompliance()
        case 'VAT Reports':
          return renderVATReports()
        case 'International VAT':
          return renderInternationalVATRates()
        case 'VAT Automation':
          return renderVATAutomation()
        default:
          return renderVATReturns()
      }
    }

    return (
      <div className="text-center py-8">
        <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">This feature is coming soon.</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Bookkeeping</h1>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuStructure.map((menu) => (
            <div key={menu.id}>
              <button
                onClick={() => handleMainTabClick(menu.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeMainTab === menu.id
                    ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF6B35]/90 text-white shadow-md'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                }`}
              >
                <div className="flex items-center">
                  <menu.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{menu.label}</span>
                </div>
                {menu.hasSubTabs && (
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    activeMainTab === menu.id ? 'rotate-180' : ''
                  }`} />
                )}
              </button>
              
              {menu.hasSubTabs && activeMainTab === menu.id && menu.subTabs && (
                <div className="mt-2 ml-4 space-y-1">
                  {menu.subTabs.map((subTab) => (
                    <button
                      key={subTab}
                      onClick={() => handleSubTabClick(subTab)}
                      className={`w-full px-4 py-2 text-left rounded-md transition-all duration-200 ${
                        activeSubTab === subTab
                          ? 'bg-gradient-to-r from-[#FF6B35]/80 to-[#FF6B35]/60 text-white border-l-2 border-[#FF6B35]'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                      }`}
                    >
                      <span className="text-sm font-medium">{subTab}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderMainContent()}
        </div>
      </div>
    </div>
  )
}

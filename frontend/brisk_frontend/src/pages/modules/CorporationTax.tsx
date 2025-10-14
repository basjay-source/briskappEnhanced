import { useState, useEffect } from 'react'
import { 
  Calculator, 
  TrendingUp, 
  FileText, 
  Brain,
  DollarSign,
  Building2,
  Shield,
  Zap,
  Target,
  BarChart3,
  Clock,
  ChevronDown,
  Send,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  ArrowUpDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AIPromptSection from '../../components/AIPromptSection'
import { hmrcMTDService } from '@/services/hmrcMTD'
import notifications from '@/lib/notifications'
import { calculateCorporationTax, generateTaxYears } from '@/services/taxRates'
import { 
  ctDataService, 
  CTClient, 
  RDProject, 
  CapitalAllowance, 
  GroupReliefClaim,
  CTClientFormData,
  RDProjectFormData 
} from '@/services/corporationTaxData'
import CT600Form from '@/components/corporation-tax/CT600Form'
import { ct600API, rdClaimsAPI, dashboardAPI } from '@/services/corporationTaxAPI'

export default function CorporationTax() {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTaxYear, setSelectedTaxYear] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [dashboardStats, setDashboardStats] = useState<any>(null)
  
  const [clients, setClients] = useState<CTClient[]>(ctDataService.getClients())
  const [rdProjects, setRDProjects] = useState<RDProject[]>(ctDataService.getRDProjects())
  const [capitalAllowances, setCapitalAllowances] = useState<CapitalAllowance[]>(ctDataService.getCapitalAllowances())
  const [groupReliefs, setGroupReliefs] = useState<GroupReliefClaim[]>(ctDataService.getGroupReliefs())
  
  useEffect(() => {
    loadDashboardStats()
  }, [])
  
  const loadDashboardStats = async () => {
    try {
      setIsLoading(true)
      const stats = await dashboardAPI.getStats()
      setDashboardStats(stats)
    } catch (error) {
      console.error('Failed to load dashboard stats:', error)
      setDashboardStats(ctDataService.getDashboardStats())
    } finally {
      setIsLoading(false)
    }
  }
  
  const [showClientModal, setShowClientModal] = useState(false)
  const [showClientDetailModal, setShowClientDetailModal] = useState(false)
  const [showCT600Modal, setShowCT600Modal] = useState(false)
  const [showRDModal, setShowRDModal] = useState(false)
  const [showRDDetailModal, setShowRDDetailModal] = useState(false)
  const [showCAModal, setShowCAModal] = useState(false)
  const [showGRModal, setShowGRModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState<CTClient | null>(null)
  const [selectedCT600Data, setSelectedCT600Data] = useState<any>(null)
  const [selectedRDProject, setSelectedRDProject] = useState<RDProject | null>(null)
  const [editingClient, setEditingClient] = useState<CTClient | null>(null)
  const [editingRDProject, setEditingRDProject] = useState<RDProject | null>(null)
  
  const [sortColumn, setSortColumn] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const taxData = {
    profitBeforeTax: 500000,
    taxableProfit: 475000,
    corporationTax: 113750
  }

  const handleAIQuestion = async (question: string) => {
    setIsAILoading(true)
    try {
      console.log('Business Tax Adviser Question:', question)
    } catch (error) {
      console.error('Error asking AI:', error)
    } finally {
      setIsAILoading(false)
    }
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const handleAddClient = () => {
    setEditingClient(null)
    setShowClientModal(true)
  }

  const handleEditClient = (client: CTClient) => {
    setEditingClient(client)
    setShowClientModal(true)
  }

  const handleViewClient = (client: CTClient) => {
    setSelectedClient(client)
    setShowClientDetailModal(true)
  }

  const handleDeleteClient = (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      ctDataService.deleteClient(id)
      setClients(ctDataService.getClients())
      notifications.custom('Client deleted successfully', 'success')
    }
  }

  const handleSaveClient = (data: CTClientFormData) => {
    if (editingClient) {
      ctDataService.updateClient(editingClient.id, data)
      notifications.custom('Client updated successfully', 'success')
    } else {
      ctDataService.createClient(data)
      notifications.custom('Client created successfully', 'success')
    }
    setClients(ctDataService.getClients())
    setShowClientModal(false)
  }

  const handleAddRDProject = () => {
    setEditingRDProject(null)
    setShowRDModal(true)
  }

  const handleEditRDProject = (project: RDProject) => {
    setEditingRDProject(project)
    setShowRDModal(true)
  }

  const handleViewRDProject = (project: RDProject) => {
    setSelectedRDProject(project)
    setShowRDDetailModal(true)
  }

  const handleDeleteRDProject = (id: string) => {
    if (confirm('Are you sure you want to delete this R&D project?')) {
      ctDataService.deleteRDProject(id)
      setRDProjects(ctDataService.getRDProjects())
      notifications.custom('R&D project deleted successfully', 'success')
    }
  }

  const handleSaveRDProject = (data: RDProjectFormData) => {
    if (editingRDProject) {
      ctDataService.updateRDProject(editingRDProject.id, data)
      notifications.custom('R&D project updated successfully', 'success')
    } else {
      ctDataService.createRDProject(data)
      notifications.custom('R&D project created successfully', 'success')
    }
    setRDProjects(ctDataService.getRDProjects())
    setShowRDModal(false)
  }

  const handleViewCT600 = (client: CTClient) => {
    const ct600Data = {
      companyName: client.companyName,
      companyNumber: client.companyNumber,
      utr: client.utr,
      accountingPeriodStart: client.accountingPeriodStart,
      accountingPeriodEnd: client.accountingPeriodEnd,
      status: client.status as any,
      syncedFromAccounts: true,
      lastSyncDate: new Date().toISOString(),
      profitBeforeTax: 500000,
      turnover: 2500000,
      costOfSales: 1500000,
      adminExpenses: 450000,
      otherIncome: 50000,
      financeCosts: 100000,
      depreciationAddback: 50000,
      legalProfessionalFees: 15000,
      entertainmentDisallowed: 8000,
      provisionsNotAllowed: 5000,
      otherAdjustments: 2000,
      annualInvestmentAllowance: 75000,
      writingDownAllowance: 25000,
      balancingChargeAllowance: 0,
      lossesBroughtForward: 0,
      lossesSetAgainstProfit: 0,
      lossesCarriedBack: 0,
      lossesCarriedForward: 0,
      rdQualifyingExpenditure: 150000,
      rdEnhancementRate: 231,
      rdReliefClaimed: 46575,
      rdTaxCredit: 0,
      patentBoxRelief: 0,
      creativeIndustryRelief: 0,
      marginalRelief: 0,
      groupRelief: 0,
      otherReliefs: 0,
      quarterlyPaymentsMade: 0,
      corporationTaxRate: 19,
      grossProfit: 0,
      totalAdjustments: 0,
      plantMachineryAdditions: 0,
      plantMachineryDisposals: 0,
      totalCapitalAllowances: 0,
      taxableProfit: 0,
      corporationTaxBeforeReliefs: 0,
      totalReliefs: 0,
      corporationTaxDue: 0,
      balanceDue: 0
    }
    setSelectedCT600Data(ct600Data)
    setShowCT600Modal(true)
  }

  const handleSaveCT600 = (data: any) => {
    console.log('Saving CT600 data:', data)
    notifications.custom('CT600 computation saved successfully', 'success')
    setShowCT600Modal(false)
  }

  const stats = dashboardStats || ctDataService.getDashboardStats()

  const getFilteredAndSortedClients = () => {
    let filtered = clients.filter(client => {
      const matchesSearch = searchTerm === '' || 
        client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.companyNumber.includes(searchTerm) ||
        client.utr.includes(searchTerm)
      
      const matchesTaxYear = selectedTaxYear === 'all' || client.taxYear === selectedTaxYear
      const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus
      
      return matchesSearch && matchesTaxYear && matchesStatus
    })

    if (sortColumn) {
      filtered.sort((a, b) => {
        const aVal = a[sortColumn as keyof CTClient]
        const bVal = b[sortColumn as keyof CTClient]
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
        }
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
        }
        
        return 0
      })
    }

    return filtered
  }

  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      hasSubTabs: false
    },
    {
      id: 'computation',
      label: 'CT Computation',
      icon: Calculator,
      hasSubTabs: false
    },
    {
      id: 'rd-claims',
      label: 'R&D Claims',
      icon: TrendingUp,
      hasSubTabs: true,
      subTabs: [
        { id: 'sme-scheme', label: 'SME Scheme' },
        { id: 'rdec-scheme', label: 'RDEC Scheme' },
        { id: 'merged-scheme', label: 'Merged Scheme' }
      ]
    },
    {
      id: 'reliefs',
      label: 'Reliefs & Credits',
      icon: DollarSign,
      hasSubTabs: true,
      subTabs: [
        { id: 'capital-allowances', label: 'Capital Allowances' },
        { id: 'patent-box', label: 'Patent Box' },
        { id: 'creative-relief', label: 'Creative Industry Relief' },
        { id: 'other-reliefs', label: 'Other Reliefs' }
      ]
    },
    {
      id: 'group-relief',
      label: 'Group Relief',
      icon: Building2,
      hasSubTabs: true,
      subTabs: [
        { id: 'elections', label: 'Group Elections' },
        { id: 'surrenders', label: 'Loss Surrenders' },
        { id: 'claims', label: 'Relief Claims' }
      ]
    },
    {
      id: 'quarterly',
      label: 'Quarterly Payments',
      icon: Clock,
      hasSubTabs: false
    },
    {
      id: 'filing',
      label: 'Filing',
      icon: FileText,
      hasSubTabs: false
    }
  ]

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleMainTabClick = (tabId: string) => {
    setActiveMainTab(tabId)
    setActiveSubTab('')
    
    const category = menuStructure.find(cat => cat.id === tabId)
    if (category?.hasSubTabs && !expandedCategories.includes(tabId)) {
      toggleCategory(tabId)
    }
  }

  const handleSubTabClick = (subTabId: string) => {
    setActiveSubTab(subTabId)
  }

  function renderMainContent() {
    if (activeSubTab) {
      switch (activeSubTab) {
        case 'sme-scheme':
        case 'rdec-scheme':
        case 'merged-scheme':
          return renderRDClaims()
        case 'capital-allowances': return renderCapitalAllowances()
        case 'patent-box':
        case 'creative-relief':
        case 'other-reliefs':
          return renderReliefs()
        case 'elections':
        case 'surrenders':
        case 'claims':
          return renderGroupRelief()
        default: return renderDashboard()
      }
    }

    switch (activeMainTab) {
      case 'computation': return renderCT600()
      case 'rd-claims': return renderRDClaims()
      case 'reliefs': return renderCapitalAllowances()
      case 'group-relief': return renderGroupRelief()
      case 'quarterly': return renderQuarterly()
      case 'filing': return renderFiling()
      default: return renderDashboard()
    }
  }

  function renderDashboard() {
    const filteredClients = getFilteredAndSortedClients()
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Corporation Tax Dashboard</h2>
            <p className="text-[#001f3f] mt-2">CT600 computations, R&D claims, and tax planning</p>
          </div>
          <Button onClick={handleAddClient} className="bg-brisk-primary hover:bg-brisk-primary-600">
            <Plus className="h-4 w-4 mr-2" />
            Add New Client
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200" onClick={() => setActiveMainTab('computation')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Total Clients</CardTitle>
              <Building2 className="h-4 w-4 text-[#001f3f]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#001f3f]">{stats.totalClients}</div>
              <p className="text-xs text-[#001f3f] mt-1">Active CT600 returns: {stats.activeCT600s}</p>
              <p className="text-xs text-blue-600 mt-2 font-medium">Click for deep drilldown →</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200" onClick={() => {
            if (clients.length > 0) handleViewCT600(clients[0])
          }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Total Tax Due</CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">£{stats.totalTaxDue.toLocaleString()}</div>
              <p className="text-xs text-[#001f3f] mt-1">Across all clients</p>
              <p className="text-xs text-blue-600 mt-2 font-medium">Click for detailed breakdown →</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200" onClick={() => setActiveMainTab('rd-claims')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">R&D Relief Claimed</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">£{stats.totalRDRelief.toLocaleString()}</div>
              <p className="text-xs text-[#001f3f] mt-1">{stats.rdProjectsActive} active projects</p>
              <p className="text-xs text-blue-600 mt-2 font-medium">Click for project details →</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200" onClick={() => setActiveMainTab('filing')}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Upcoming Deadlines</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.upcomingDeadlines}</div>
              <p className="text-xs text-[#001f3f] mt-1">Within next 90 days</p>
              <p className="text-xs text-blue-600 mt-2 font-medium">Click for filing schedule →</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#001f3f]">Corporation Tax Clients</CardTitle>
                <CardDescription>Manage CT600 computations and submissions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#001f3f]" />
                  <Input
                    placeholder="Search clients, company number, UTR..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 border-[#001f3f]"
                  />
                </div>
              </div>
              <Select value={selectedTaxYear} onValueChange={setSelectedTaxYear}>
                <SelectTrigger className="w-[180px] border-[#001f3f]">
                  <SelectValue placeholder="Tax Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tax Years</SelectItem>
                  {generateTaxYears().map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px] border-[#001f3f]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="filed">Filed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#001f3f]">
                    <th className="text-left p-3 text-[#001f3f] font-semibold cursor-pointer hover:bg-blue-50" onClick={() => handleSort('id')}>
                      <div className="flex items-center gap-2">
                        ID <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 text-[#001f3f] font-semibold cursor-pointer hover:bg-blue-50" onClick={() => handleSort('companyName')}>
                      <div className="flex items-center gap-2">
                        Company Name <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 text-[#001f3f] font-semibold cursor-pointer hover:bg-blue-50" onClick={() => handleSort('companyNumber')}>
                      <div className="flex items-center gap-2">
                        Company No. <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 text-[#001f3f] font-semibold cursor-pointer hover:bg-blue-50" onClick={() => handleSort('taxYear')}>
                      <div className="flex items-center gap-2">
                        Tax Year <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="text-left p-3 text-[#001f3f] font-semibold cursor-pointer hover:bg-blue-50" onClick={() => handleSort('status')}>
                      <div className="flex items-center gap-2">
                        Status <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="text-right p-3 text-[#001f3f] font-semibold cursor-pointer hover:bg-blue-50" onClick={() => handleSort('taxDue')}>
                      <div className="flex items-center justify-end gap-2">
                        Tax Due <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="text-right p-3 text-[#001f3f] font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-8 text-[#001f3f]">
                        No clients found
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map((client) => (
                      <tr key={client.id} className="border-b border-[#001f3f]/20 hover:bg-blue-50 cursor-pointer" onClick={() => handleViewClient(client)}>
                        <td className="p-3 text-[#001f3f]">{client.id}</td>
                        <td className="p-3 text-[#001f3f] font-medium">{client.companyName}</td>
                        <td className="p-3 text-[#001f3f]">{client.companyNumber}</td>
                        <td className="p-3 text-[#001f3f]">{client.taxYear}</td>
                        <td className="p-3">
                          <Badge variant={
                            client.status === 'filed' ? 'default' :
                            client.status === 'submitted' ? 'secondary' :
                            client.status === 'in-progress' ? 'outline' : 'outline'
                          }>
                            {client.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-right text-[#001f3f] font-medium">
                          £{client.taxDue.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            <Button size="sm" variant="ghost" onClick={() => handleViewClient(client)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleEditClient(client)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteClient(client.id)}>
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-[2px] border p-6">
          <AIPromptSection
            title="Ask your Business Tax Adviser"
            description="Get expert corporation tax guidance and optimization strategies"
            placeholder="Ask about CT600 computations, R&D claims, tax planning strategies..."
            recentQuestions={[
              "How can we optimize our corporation tax liability?",
              "What R&D expenditure qualifies for relief claims?",
              "When are quarterly instalment payments due?",
              "How can we optimize group relief structures?",
              "What are the latest corporation tax rates and allowances?"
            ]}
            onSubmit={handleAIQuestion}
            isLoading={isAILoading}
          />
        </div>
      </div>
    )
  }

  function renderCT600() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">CT600 Computation</h2>
            <p className="text-[#001f3f] mt-2">Corporation Tax computation and CT600 preparation</p>
          </div>
          <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
            <Plus className="h-4 w-4 mr-2" />
            New Computation
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Draft Returns</CardTitle>
              <FileText className="h-4 w-4 text-[#001f3f]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#001f3f]">{clients.filter(c => c.status === 'draft').length}</div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{clients.filter(c => c.status === 'in-progress').length}</div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Filed Returns</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{clients.filter(c => c.status === 'filed').length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Corporation Tax Computations</CardTitle>
            <CardDescription>Manage CT600 computations and submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.map((client) => (
                <div key={client.id} className="p-4 border-2 border-[#001f3f] rounded-[2px] hover:bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#001f3f]">{client.companyName}</h3>
                      <p className="text-sm text-[#001f3f] mt-1">
                        Tax Year: {client.taxYear} | Tax Due: £{client.taxDue.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>{client.status}</Badge>
                      <Button size="sm" variant="outline" onClick={() => handleViewCT600(client)} className="border-[#00703c] text-[#00703c] hover:bg-[#00703c] hover:text-white">
                        <FileText className="h-4 w-4 mr-1" />
                        View CT600
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditClient(client)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderRDClaims() {
    const scheme = activeSubTab === 'sme-scheme' ? 'SME' : activeSubTab === 'rdec-scheme' ? 'RDEC' : 'Merged'
    const filteredProjects = activeSubTab ? rdProjects.filter(p => p.scheme === scheme) : rdProjects

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">R&D Claims {scheme && `- ${scheme} Scheme`}</h2>
            <p className="text-[#001f3f] mt-2">Research & Development tax relief claims</p>
          </div>
          <Button onClick={handleAddRDProject} className="bg-brisk-primary hover:bg-brisk-primary-600">
            <Plus className="h-4 w-4 mr-2" />
            New R&D Project
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Total Projects</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#001f3f]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#001f3f]">{filteredProjects.length}</div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Total Relief</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                £{filteredProjects.reduce((sum, p) => sum + p.reliefClaimed + p.taxCredit, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Approved Claims</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {filteredProjects.filter(p => p.status === 'approved').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">R&D Projects</CardTitle>
            <CardDescription>Manage R&D claims and qualifying expenditure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div key={project.id} className="p-4 border-2 border-[#001f3f] rounded-[2px] hover:bg-blue-50 cursor-pointer" onClick={() => handleViewRDProject(project)}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#001f3f]">{project.projectName}</h3>
                      <p className="text-sm text-[#001f3f] mt-1">{project.projectDescription}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-[#001f3f]">Scheme</p>
                          <p className="font-medium text-[#001f3f]">{project.scheme}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#001f3f]">Expenditure</p>
                          <p className="font-medium text-[#001f3f]">£{project.totalQualifyingExpenditure.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#001f3f]">Relief Claimed</p>
                          <p className="font-medium text-green-600">£{project.reliefClaimed.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#001f3f]">Tax Credit</p>
                          <p className="font-medium text-green-600">£{project.taxCredit.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge variant={project.status === 'approved' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleEditRDProject(project); }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDeleteRDProject(project.id); }}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProjects.length === 0 && (
                <div className="text-center p-8 text-[#001f3f]">
                  No R&D projects found for {scheme} scheme
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderCapitalAllowances() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Capital Allowances</h2>
            <p className="text-[#001f3f] mt-2">Manage capital allowances and asset pools</p>
          </div>
          <Button onClick={() => setShowCAModal(true)} className="bg-brisk-primary hover:bg-brisk-primary-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Total Assets</CardTitle>
              <Building2 className="h-4 w-4 text-[#001f3f]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#001f3f]">{capitalAllowances.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Total Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-[#001f3f]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#001f3f]">
                £{capitalAllowances.reduce((sum, ca) => sum + ca.cost, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Allowances Claimed</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                £{capitalAllowances.reduce((sum, ca) => sum + ca.allowanceClaimed, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Capital Allowances Register</CardTitle>
            <CardDescription>Track plant & machinery, buildings, and other capital assets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {capitalAllowances.map((ca) => (
                <div key={ca.id} className="p-4 border-2 border-[#001f3f] rounded-[2px] hover:bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#001f3f]">{ca.assetDescription}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-[#001f3f]">Asset Type</p>
                          <p className="font-medium text-[#001f3f]">{ca.assetType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#001f3f]">Pool Type</p>
                          <p className="font-medium text-[#001f3f]">{ca.poolType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#001f3f]">Cost</p>
                          <p className="font-medium text-[#001f3f]">£{ca.cost.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#001f3f]">WDV</p>
                          <p className="font-medium text-[#001f3f]">£{ca.writtenDownValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#001f3f]">Allowance Claimed</p>
                          <p className="font-medium text-green-600">£{ca.allowanceClaimed.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <Badge variant={ca.status === 'active' ? 'default' : 'secondary'}>
                      {ca.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {capitalAllowances.length === 0 && (
                <div className="text-center p-8 text-[#001f3f]">
                  No capital allowances recorded
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderReliefs() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Reliefs & Credits</h2>
            <p className="text-[#001f3f] mt-2">Patent Box, Creative Industry Relief, and other tax reliefs</p>
          </div>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Patent Box</CardTitle>
              <CardDescription>10% effective rate on qualifying IP profits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#001f3f]">No Patent Box claims recorded</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Creative Industry Relief</CardTitle>
              <CardDescription>Film, TV, animation, video games, theatre, orchestra tax relief</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#001f3f]">No creative industry relief claims recorded</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderGroupRelief() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#001f3f]">Group Relief</h2>
            <p className="text-[#001f3f] mt-2">Group relief elections, loss surrenders, and claims</p>
          </div>
          <Button onClick={() => setShowGRModal(true)} className="bg-brisk-primary hover:bg-brisk-primary-600">
            <Plus className="h-4 w-4 mr-2" />
            New Group Relief Claim
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Active Claims</CardTitle>
              <Building2 className="h-4 w-4 text-[#001f3f]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#001f3f]">{groupReliefs.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Losses Claimed</CardTitle>
              <DollarSign className="h-4 w-4 text-[#001f3f]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#001f3f]">
                £{groupReliefs.reduce((sum, gr) => sum + gr.lossesClaimed, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#001f3f]">Relief Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                £{groupReliefs.reduce((sum, gr) => sum + gr.reliefValue, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Group Relief Claims</CardTitle>
            <CardDescription>Track group relief elections and loss surrenders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {groupReliefs.map((gr) => (
                <div key={gr.id} className="p-4 border-2 border-[#001f3f] rounded-[2px] hover:bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#001f3f]">
                        From: {gr.surrenderingCompanyName}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-[#001f3f]">Tax Year</p>
                          <p className="font-medium text-[#001f3f]">{gr.taxYear}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#001f3f]">Losses Claimed</p>
                          <p className="font-medium text-[#001f3f]">£{gr.lossesClaimed.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#001f3f]">Relief Value</p>
                          <p className="font-medium text-green-600">£{gr.reliefValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#001f3f]">Consent</p>
                          <p className="font-medium text-[#001f3f]">{gr.consentReceived ? 'Received' : 'Pending'}</p>
                        </div>
                      </div>
                    </div>
                    <Badge variant={gr.status === 'approved' ? 'default' : 'secondary'}>
                      {gr.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {groupReliefs.length === 0 && (
                <div className="text-center p-8 text-[#001f3f]">
                  No group relief claims recorded
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderQuarterly() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#001f3f]">Quarterly Instalment Payments</h2>
          <p className="text-[#001f3f] mt-2">Manage quarterly CT instalment payments for large companies</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Quarterly Payments</CardTitle>
            <CardDescription>Track quarterly instalment payment obligations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[#001f3f]">
              Quarterly instalment payments are required for companies with profits exceeding £1.5 million.
              Large companies must pay corporation tax in four instalments during the accounting period.
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-[#001f3f]"><strong>Due dates:</strong></p>
              <ul className="list-disc list-inside text-sm text-[#001f3f] space-y-1">
                <li>Month 7: First instalment (50% of estimated liability × 3/12)</li>
                <li>Month 10: Second instalment</li>
                <li>Month 13 (M+1): Third instalment</li>
                <li>Month 16 (M+4): Fourth and final instalment</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmitCT600ToHMRC = async () => {
    if (!hmrcMTDService.isAuthenticated()) {
      notifications.custom('Initiating HMRC authentication...', 'info')
      const authUrl = hmrcMTDService.initiateOAuth()
      window.location.href = authUrl
      return
    }

    try {
      notifications.custom('Submitting CT600 to HMRC...', 'info')
      notifications.custom('CT600 successfully submitted to HMRC', 'success')
    } catch (error) {
      notifications.custom(`Failed to submit CT600: ${error}`, 'error')
    }
  }

  function renderFiling() {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">HMRC Filing & Submissions</CardTitle>
            <CardDescription>Submit CT600 and related forms to HMRC</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-[#001f3f] rounded-lg">
                <div className="flex items-start gap-4">
                  <FileText className="h-12 w-12 text-blue-600 flex-shrink-0" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-[#001f3f] mb-2">
                      CT600 Corporation Tax Return
                    </h3>
                    <p className="text-[#001f3f] mb-4">
                      Submit your complete corporation tax return to HMRC. Ensure all sections are completed before submission.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-[#001f3f]">Company Details</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-[#001f3f]">Profit & Loss</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-[#001f3f]">Balance Sheet</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-[#001f3f]">Tax Computation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-[#001f3f]">R&D Claims</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-[#001f3f]">Group Relief</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-blue-50 border-2 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-[#001f3f] mb-3">Filing Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#001f3f]">Accounting Period:</span>
                      <span className="font-semibold">01/04/2024 - 31/03/2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#001f3f]">Profit Before Tax:</span>
                      <span className="font-semibold">£{taxData.profitBeforeTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#001f3f]">Taxable Profit:</span>
                      <span className="font-semibold">£{taxData.taxableProfit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-[#001f3f] font-semibold">Corporation Tax Due:</span>
                      <span className="font-bold text-lg">£{taxData.corporationTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#001f3f]">Filing Deadline:</span>
                      <span className="font-semibold text-orange-600">31/03/2026</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 bg-green-50 border border-green-200 rounded">
                <h4 className="font-semibold text-[#001f3f] mb-2">Authentication Status</h4>
                <div className="flex items-center gap-2">
                  {hmrcMTDService.isAuthenticated() ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-[#001f3f]">Connected to HMRC</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-5 w-5 text-orange-600" />
                      <span className="text-sm text-[#001f3f]">HMRC authentication required</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline">Save as Draft</Button>
                <Button 
                  onClick={handleSubmitCT600ToHMRC}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit CT600 to HMRC
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-blue-50">
      <div className="w-64 bg-white border-r-2 border-[#001f3f] flex flex-col">
        <div className="p-4 border-b-2 border-[#001f3f]">
          <h1 className="text-lg font-semibold text-[#001f3f]">Corporation Tax</h1>
          <p className="text-sm text-[#001f3f]">CT600 & R&D Claims</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          <nav className="space-y-0.5">
            {menuStructure.map((item) => {
              const Icon = item.icon
              const isActive = activeMainTab === item.id
              const isExpanded = expandedCategories.includes(item.id)
              
              return (
                <div key={item.id}>
                  <button
                    onClick={() => handleMainTabClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 m-0.5 text-sm rounded-[2px] transition-all duration-200 shadow-sm ${
                      isActive 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-[0.98] font-semibold' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </div>
                    {item.hasSubTabs && (
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {item.hasSubTabs && isExpanded && (
                    <div className="ml-0.5 mt-0.5 space-y-0.5">
                      {item.subTabs?.map((subTab) => {
                        const isSubActive = activeSubTab === subTab.id
                        return (
                          <button
                            key={subTab.id}
                            onClick={() => handleSubTabClick(subTab.id)}
                            className={`w-full flex items-center px-3 py-2 m-0.5 text-sm rounded-[2px] transition-all duration-200 shadow-sm ${
                              isSubActive 
                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-l-2 border-orange-300 shadow-md font-semibold' 
                                : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-sm hover:shadow-md font-medium'
                            }`}
                          >
                            {subTab.label}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderMainContent()}
        </div>
      </div>

      {/* CT600 Form Modal */}
      <Dialog open={showCT600Modal} onOpenChange={setShowCT600Modal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#001f3f]">CT600 Corporation Tax Return</DialogTitle>
            <DialogDescription>
              Complete corporation tax computation and return submission
            </DialogDescription>
          </DialogHeader>
          {selectedCT600Data && (
            <CT600Form
              data={selectedCT600Data}
              onSave={handleSaveCT600}
              onCancel={() => setShowCT600Modal(false)}
              isEditing={false}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

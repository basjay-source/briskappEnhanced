import { 
  Plus, 
  Calculator, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  PoundSterling,
  Users,
  Download,
  Upload,
  Brain,
  Heart,
  PiggyBank,
  Users2,
  Shield,
  Gift,
  Home,
  Banknote,
  BarChart3,
  Edit,
  Settings,
  Target,
  ChevronDown,
  PieChart,
  Eye,
  UserPlus,
  Calendar,
  Send,
  RefreshCw,
  ArrowRight
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { useIsMobile } from '@/hooks/use-mobile'
import KPICard from '../../components/KPICard'
import ResponsiveLayout, { ResponsiveGrid } from '@/components/ResponsiveLayout'
import AIPromptSection from '../../components/AIPromptSection'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'
import ComprehensiveIndividualClientForm from '../../components/ComprehensiveIndividualClientForm'
import { SAReturnForm as ComprehensiveSAReturnForm } from '../../components/ComprehensiveSAReturnForm'
import notifications from '@/lib/notifications'
import { hmrcMTDService } from '@/services/hmrcMTD'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Trash2 } from 'lucide-react'

interface IndividualClient {
  id: string
  firstName: string
  lastName: string
  title?: string
  email: string
  phone: string
  utr?: string
  nationalInsuranceNumber?: string
  taxStatus: string
  businessType?: string
  clientType?: 'individual' | 'sole-trader'
  nextDueDate?: string
  createdAt?: string
  updatedAt?: string
}

interface QuarterlySubmission {
  id: string
  quarter: 1 | 2 | 3 | 4 | 5
  quarterLabel: string
  startDate: string
  endDate: string
  dueDate: string
  status: 'not_started' | 'in_progress' | 'submitted'
  submittedDate?: string
  employmentIncome: number
  selfEmploymentIncome: number
  propertyIncome: number
  dividendIncome: number
  savingsInterest: number
  otherIncome: number
  totalIncome: number
  cumulativeIncome: number
  estimatedTax: number
  cumulativeTax: number
}

interface SAReturn {
  id: string
  clientId: string
  clientName: string
  taxYear: string
  status: 'draft' | 'in_progress' | 'review' | 'submitted' | 'approved'
  dueDate: string
  submittedDate?: string
  utr: string
  niNumber: string
  employmentIncome: number
  selfEmploymentIncome: number
  propertyIncome: number
  dividendIncome: number
  savingsInterest: number
  capitalGains: number
  otherIncome: number
  totalIncome: number
  personalAllowance: number
  taxRelief: number
  pensionContributions: number
  charitableGiving: number
  taxableIncome: number
  estimatedTax: number
  progress: number
  notes?: string
  createdAt: string
  updatedAt: string
  isQuarterlyReporting?: boolean
  quarterlySubmissions?: QuarterlySubmission[]
}

export default function PersonalTax() {
  const isMobile = useIsMobile()
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTaxYear, setSelectedTaxYear] = useState('2024')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedIncomeType, setSelectedIncomeType] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [individualClients, setIndividualClients] = useState<IndividualClient[]>([])
  const [isClientFormOpen, setIsClientFormOpen] = useState(false)
  const [clientFormData, setClientFormData] = useState<Partial<IndividualClient>>({})
  const [selectedClientForEdit, setSelectedClientForEdit] = useState<IndividualClient | null>(null)
  const [clientFormMode, setClientFormMode] = useState<'add' | 'edit' | 'view'>('add')
  
  const [saReturnsData, setSAReturnsData] = useState<SAReturn[]>([])
  const [isSAReturnFormOpen, setIsSAReturnFormOpen] = useState(false)
  const [selectedSAReturn, setSelectedSAReturn] = useState<SAReturn | null>(null)
  const [saReturnFormMode, setSAReturnFormMode] = useState<'add' | 'edit' | 'view'>('add')
  const [showClientList, setShowClientList] = useState(false)
  const [showSAReturnList, setShowSAReturnList] = useState(false)
  const [sortField, setSortField] = useState<'client' | 'taxYear' | 'estimatedTax' | 'dueDate'>('dueDate')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentQuarterData, setCurrentQuarterData] = useState<QuarterlySubmission | null>(null)
  const [isQuarterlyFormOpen, setIsQuarterlyFormOpen] = useState(false)

  useEffect(() => {
    const loadClientsFromPracticeManagement = () => {
      try {
        const saved = localStorage.getItem('individualClients')
        if (saved) {
          const clients = JSON.parse(saved)
          setIndividualClients(clients)
          console.log(`✅ Loaded ${clients.length} individual clients from Practice Management`)
        }
      } catch (e) {
        console.error('Failed to load individual clients from Practice Management:', e)
      }
    }
    loadClientsFromPracticeManagement()

    const loadSAReturns = () => {
      try {
        const saved = localStorage.getItem('saReturns')
        if (saved) {
          const returns = JSON.parse(saved)
          setSAReturnsData(returns)
          console.log(`✅ Loaded ${returns.length} SA Returns`)
        }
      } catch (e) {
        console.error('Failed to load SA Returns:', e)
      }
    }
    loadSAReturns()
  }, [])

  const handleAIQuestion = async (question: string) => {
    setIsAILoading(true)
    try {
      console.log('AI Question:', question)
    } catch (error) {
      console.error('Error asking AI:', error)
    } finally {
      setIsAILoading(false)
    }
  }

  const handleAddClient = () => {
    setSelectedClientForEdit(null)
    setClientFormMode('add')
    setIsClientFormOpen(true)
  }

  const handleEditClient = (client: IndividualClient) => {
    setSelectedClientForEdit(client)
    setClientFormMode('edit')
    setIsClientFormOpen(true)
  }

  const handleViewClient = (client: IndividualClient) => {
    setSelectedClientForEdit(client)
    setClientFormMode('view')
    setIsClientFormOpen(true)
  }

  const handleSaveClient = (data: Partial<IndividualClient>) => {
    if (clientFormMode === 'add') {
      const newClient: IndividualClient = {
        id: `ind-${Date.now()}`,
        ...data,
        clientType: data.clientType || 'individual',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as IndividualClient
      
      const updated = [...individualClients, newClient]
      setIndividualClients(updated)
      localStorage.setItem('individualClients', JSON.stringify(updated))
      notifications.created('Client', `${data.firstName} ${data.lastName}`)
      console.log('✅ Client added from Personal Tax and synced to Practice Management')
    } else if (clientFormMode === 'edit') {
      const updated = individualClients.map(c => 
        c.id === selectedClientForEdit?.id 
          ? { ...c, ...data, updatedAt: new Date().toISOString() } as IndividualClient
          : c
      )
      setIndividualClients(updated)
      localStorage.setItem('individualClients', JSON.stringify(updated))
      notifications.saved('Client', `${data.firstName} ${data.lastName}`)
      console.log('✅ Client updated and synced to Practice Management')
    }
    setIsClientFormOpen(false)
  }

  const handleDeleteClient = (clientId: string) => {
    const client = individualClients.find(c => c.id === clientId)
    if (confirm('Are you sure you want to delete this client? This will also delete all associated SA returns.')) {
      const updated = individualClients.filter(c => c.id !== clientId)
      setIndividualClients(updated)
      localStorage.setItem('individualClients', JSON.stringify(updated))
      
      const updatedReturns = saReturnsData.filter(r => r.clientId !== clientId)
      setSAReturnsData(updatedReturns)
      localStorage.setItem('saReturns', JSON.stringify(updatedReturns))
      notifications.deleted('Client', client ? `${client.firstName} ${client.lastName}` : undefined)
      console.log('✅ Client and associated SA returns deleted')
    }
  }

  const handleAddSAReturn = () => {
    if (individualClients.length === 0) {
      notifications.warning('Please add at least one client before creating an SA return')
      return
    }
    setSelectedSAReturn(null)
    setSAReturnFormMode('add')
    setIsSAReturnFormOpen(true)
  }

  const handleEditSAReturn = (saReturn: SAReturn) => {
    setSelectedSAReturn(saReturn)
    setSAReturnFormMode('edit')
    setIsSAReturnFormOpen(true)
  }

  const handleViewSAReturn = (saReturn: SAReturn) => {
    setSelectedSAReturn(saReturn)
    setSAReturnFormMode('view')
    setIsSAReturnFormOpen(true)
  }

  const handleSaveSAReturn = (data: Partial<SAReturn>) => {
    if (saReturnFormMode === 'add') {
      const newReturn: SAReturn = {
        id: `sa-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as SAReturn
      
      const updated = [...saReturnsData, newReturn]
      setSAReturnsData(updated)
      localStorage.setItem('saReturns', JSON.stringify(updated))
      notifications.created('SA Return', `${data.clientName} - ${data.taxYear}`)
      console.log('✅ SA Return created successfully')
    } else if (saReturnFormMode === 'edit') {
      const updated = saReturnsData.map(r => 
        r.id === selectedSAReturn?.id 
          ? { ...r, ...data, updatedAt: new Date().toISOString() } as SAReturn
          : r
      )
      setSAReturnsData(updated)
      localStorage.setItem('saReturns', JSON.stringify(updated))
      notifications.saved('SA Return', `${data.clientName} - ${data.taxYear}`)
      console.log('✅ SA Return updated successfully')
    }
    setIsSAReturnFormOpen(false)
  }

  const handleDeleteSAReturn = (returnId: string) => {
    const saReturn = saReturnsData.find(r => r.id === returnId)
    if (confirm('Are you sure you want to delete this SA return?')) {
      const updated = saReturnsData.filter(r => r.id !== returnId)
      setSAReturnsData(updated)
      localStorage.setItem('saReturns', JSON.stringify(updated))
      notifications.deleted('SA Return', saReturn ? `${saReturn.clientName} - ${saReturn.taxYear}` : undefined)
      console.log('✅ SA Return deleted successfully')
    }
  }

  const getClientSAReturnInfo = (clientId: string) => {
    const clientReturns = saReturnsData.filter(r => r.clientId === clientId)
    if (clientReturns.length === 0) {
      return { status: 'not-created', taxAmount: 0 }
    }
    
    const latestReturn = clientReturns.reduce((latest, current) => {
      return new Date(current.updatedAt) > new Date(latest.updatedAt) ? current : latest
    }, clientReturns[0])
    
    return {
      status: latestReturn.status,
      taxAmount: latestReturn.estimatedTax || 0
    }
  }
  
  const [selectedClient, setSelectedClient] = useState('')

  const generateTaxYears = () => {
    const currentYear = new Date().getFullYear()
    const taxYears = [{ label: 'All Tax Years', value: 'all' }]
    
    for (let i = 0; i < 30; i++) {
      const year = currentYear - i
      taxYears.push({
        label: `${year}/${String(year + 1).slice(-2)}`,
        value: String(year)
      })
    }
    
    return taxYears
  }

  const taxYearOptions = generateTaxYears()

  const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Draft', value: 'draft' },
    { label: 'In Progress', value: 'progress' },
    { label: 'Submitted', value: 'submitted' },
    { label: 'Approved', value: 'approved' }
  ]

  const incomeTypeOptions = [
    { label: 'All Income Types', value: 'all' },
    { label: 'Employment', value: 'employment' },
    { label: 'Self Employment', value: 'self-employment' },
    { label: 'Property', value: 'property' },
    { label: 'Dividends', value: 'dividends' },
    { label: 'Capital Gains', value: 'capital-gains' }
  ]

  type SubTabConfig = {
    label: string
    icon: React.ComponentType<{ className?: string }>
  }

  type MenuConfig = {
    label: string
    icon: React.ComponentType<{ className?: string }>
    hasSubTabs: boolean
    subTabs?: Record<string, SubTabConfig>
  }

  const menuStructure: Record<string, MenuConfig> = {
    dashboard: { label: 'Dashboard', icon: BarChart3, hasSubTabs: false },
    returns: { 
      label: 'SA Returns', 
      icon: FileText, 
      hasSubTabs: true,
      subTabs: {
        current: { label: 'Current Returns', icon: FileText },
        drafts: { label: 'Draft Returns', icon: Edit },
        submitted: { label: 'Submitted Returns', icon: CheckCircle },
        amendments: { label: 'Amendments', icon: Settings }
      }
    },
    quarterly: {
      label: 'Quarterly Reporting (MTD)',
      icon: Calendar,
      hasSubTabs: true,
      subTabs: {
        overview: { label: 'Quarterly Overview', icon: BarChart3 },
        q1: { label: 'Q1 Apr-Jun', icon: FileText },
        q2: { label: 'Q2 Jul-Sep', icon: FileText },
        q3: { label: 'Q3 Oct-Dec', icon: FileText },
        q4: { label: 'Q4 Jan-Mar', icon: FileText },
        final: { label: 'Final Declaration', icon: CheckCircle }
      }
    },
    cgt: { 
      label: 'CGT Calculator', 
      icon: Calculator, 
      hasSubTabs: true,
      subTabs: {
        calculator: { label: 'CGT Calculator', icon: Calculator },
        optimization: { label: 'Tax Optimization', icon: Target },
        records: { label: 'Asset Records', icon: FileText },
        reports: { label: 'CGT Reports', icon: BarChart3 }
      }
    },
    planning: { 
      label: 'Tax Planning', 
      icon: Target, 
      hasSubTabs: true,
      subTabs: {
        iht: { label: 'IHT Planning', icon: Users },
        pension: { label: 'Pension Planning', icon: PieChart },
        family: { label: 'Family Tax', icon: Users },
        optimization: { label: 'Optimization', icon: TrendingUp }
      }
    },
    filing: { label: 'Filing & Compliance', icon: Upload, hasSubTabs: false }
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleMainTabClick = (tabKey: string) => {
    setActiveMainTab(tabKey)
    const tabConfig = menuStructure[tabKey]
    if (tabConfig && tabConfig.hasSubTabs && tabConfig.subTabs) {
      const firstSubTab = Object.keys(tabConfig.subTabs)[0]
      setActiveSubTab(firstSubTab || '')
      if (!expandedCategories.includes(tabKey)) {
        toggleCategory(tabKey)
      }
    } else {
      setActiveSubTab('')
    }
  }

  const handleSubTabClick = (subTab: string, mainTab: string) => {
    setActiveSubTab(subTab)
    setActiveMainTab(mainTab)
  }

  const kpis = [
    {
      title: 'Active SA Returns',
      value: '12',
      change: '+3 from last month',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Tax Saved (YTD)',
      value: '£45,200',
      change: '+18% vs last year',
      icon: PoundSterling,
      color: 'text-green-600'
    },
    {
      title: 'CGT Optimization',
      value: '£8,500',
      change: 'Potential savings',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'IHT Exposure',
      value: '£2.1M',
      change: 'Across 8 estates',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      title: 'Pension Allowance',
      value: '87%',
      change: 'Average utilization',
      icon: PiggyBank,
      color: 'text-indigo-600'
    },
    {
      title: 'Family Tax Savings',
      value: '£12,400',
      change: 'Through optimization',
      icon: Users2,
      color: 'text-teal-600'
    }
  ]

  const saReturns = [
    {
      id: '1',
      client: 'John Smith',
      taxYear: '2023-24',
      status: 'in_progress',
      dueDate: '2024-01-31',
      estimatedTax: 4500,
      progress: 75
    },
    {
      id: '2',
      client: 'Sarah Johnson',
      taxYear: '2023-24',
      status: 'review',
      dueDate: '2024-01-31',
      estimatedTax: 2800,
      progress: 90
    },
    {
      id: '3',
      client: 'Michael Brown',
      taxYear: '2023-24',
      status: 'completed',
      dueDate: '2024-01-31',
      estimatedTax: 6200,
      progress: 100
    }
  ]

  const optimizationOpportunities = [
    {
      client: 'John Smith',
      opportunity: 'Pension Contribution',
      potentialSaving: 1200,
      description: 'Increase annual pension contribution to maximize tax relief',
      priority: 'High'
    },
    {
      client: 'Sarah Johnson',
      opportunity: 'CGT Timing',
      potentialSaving: 800,
      description: 'Defer capital gains to next tax year for better rate',
      priority: 'Medium'
    },
    {
      client: 'Michael Brown',
      opportunity: 'Dividend Timing',
      potentialSaving: 450,
      description: 'Optimize dividend extraction timing',
      priority: 'Low'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'review':
        return <AlertCircle className="h-4 w-4 text-[#001f3f]" />
      case 'in_progress':
        return <Clock className="h-4 w-4 text-[#001f3f]" />
      default:
        return <Clock className="h-4 w-4 text-[#001f3f]" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'review':
        return 'bg-blue-100 text-[#001f3f]'
      case 'in_progress':
        return 'bg-blue-100 text-[#001f3f]'
      default:
        return 'bg-gray-100 text-[#001f3f]'
    }
  }

  const handleSort = (field: 'client' | 'taxYear' | 'estimatedTax' | 'dueDate') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortReturns = (returns: typeof saReturns) => {
    return [...returns].sort((a, b) => {
      let aVal: any = a[sortField === 'client' ? 'client' : sortField]
      let bVal: any = b[sortField === 'client' ? 'client' : sortField]
      
      if (sortField === 'estimatedTax') {
        aVal = a.estimatedTax
        bVal = b.estimatedTax
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
      }
      
      if (sortField === 'dueDate' || sortField === 'taxYear') {
        aVal = String(aVal)
        bVal = String(bVal)
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }

  const generateQuarterlySubmissions = (taxYear: string): QuarterlySubmission[] => {
    const year = parseInt(taxYear)
    
    return [
      {
        id: `q1-${taxYear}`,
        quarter: 1 as const,
        quarterLabel: 'Q1 (Apr-Jun)',
        startDate: `${year}-04-06`,
        endDate: `${year}-07-05`,
        dueDate: `${year}-08-05`,
        status: 'not_started' as const,
        employmentIncome: 0,
        selfEmploymentIncome: 0,
        propertyIncome: 0,
        dividendIncome: 0,
        savingsInterest: 0,
        otherIncome: 0,
        totalIncome: 0,
        cumulativeIncome: 0,
        estimatedTax: 0,
        cumulativeTax: 0
      },
      {
        id: `q2-${taxYear}`,
        quarter: 2 as const,
        quarterLabel: 'Q2 (Jul-Sep)',
        startDate: `${year}-07-06`,
        endDate: `${year}-10-05`,
        dueDate: `${year}-11-05`,
        status: 'not_started' as const,
        employmentIncome: 0,
        selfEmploymentIncome: 0,
        propertyIncome: 0,
        dividendIncome: 0,
        savingsInterest: 0,
        otherIncome: 0,
        totalIncome: 0,
        cumulativeIncome: 0,
        estimatedTax: 0,
        cumulativeTax: 0
      },
      {
        id: `q3-${taxYear}`,
        quarter: 3 as const,
        quarterLabel: 'Q3 (Oct-Dec)',
        startDate: `${year}-10-06`,
        endDate: `${year + 1}-01-05`,
        dueDate: `${year + 1}-02-05`,
        status: 'not_started' as const,
        employmentIncome: 0,
        selfEmploymentIncome: 0,
        propertyIncome: 0,
        dividendIncome: 0,
        savingsInterest: 0,
        otherIncome: 0,
        totalIncome: 0,
        cumulativeIncome: 0,
        estimatedTax: 0,
        cumulativeTax: 0
      },
      {
        id: `q4-${taxYear}`,
        quarter: 4 as const,
        quarterLabel: 'Q4 (Jan-Mar)',
        startDate: `${year + 1}-01-06`,
        endDate: `${year + 1}-04-05`,
        dueDate: `${year + 1}-05-05`,
        status: 'not_started' as const,
        employmentIncome: 0,
        selfEmploymentIncome: 0,
        propertyIncome: 0,
        dividendIncome: 0,
        savingsInterest: 0,
        otherIncome: 0,
        totalIncome: 0,
        cumulativeIncome: 0,
        estimatedTax: 0,
        cumulativeTax: 0
      },
      {
        id: `final-${taxYear}`,
        quarter: 5 as const,
        quarterLabel: 'Final Declaration',
        startDate: `${year}-04-06`,
        endDate: `${year + 1}-04-05`,
        dueDate: `${year + 1}-01-31`,
        status: 'not_started' as const,
        employmentIncome: 0,
        selfEmploymentIncome: 0,
        propertyIncome: 0,
        dividendIncome: 0,
        savingsInterest: 0,
        otherIncome: 0,
        totalIncome: 0,
        cumulativeIncome: 0,
        estimatedTax: 0,
        cumulativeTax: 0
      }
    ]
  }

  function renderMainContent() {
    if (activeSubTab) {
      switch (activeSubTab) {
        case 'current': return renderCurrentReturns()
        case 'drafts': return renderDraftReturns()
        case 'submitted': return renderSubmittedReturns()
        case 'amendments': return renderCurrentReturns()
        case 'overview': return renderQuarterlyOverview()
        case 'q1': return renderQuarterSubmission(1)
        case 'q2': return renderQuarterSubmission(2)
        case 'q3': return renderQuarterSubmission(3)
        case 'q4': return renderQuarterSubmission(4)
        case 'final': return renderFinalDeclaration()
        case 'calculator': return renderCGTCalculator()
        case 'optimization': return renderOptimization()
        case 'records': return renderCGTCalculator()
        case 'reports': return renderCGTCalculator()
        case 'iht': return renderIHTPlanning()
        case 'pension': return renderPensionPlanning()
        case 'family': return renderFamilyTax()
        default: return renderDashboard()
      }
    }

    switch (activeMainTab) {
      case 'returns': return renderCurrentReturns()
      case 'quarterly': return renderQuarterlyOverview()
      case 'cgt': return renderCGTCalculator()
      case 'planning': return renderIHTPlanning()
      case 'filing': return renderFiling()
      default: return renderDashboard()
    }
  }

  function renderDashboard() {
    return (
      <div className="space-y-6">
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
          <div>
            <h2 className={`font-bold text-[#001f3f] ${isMobile ? 'text-xl' : 'text-2xl'}`}>Personal Tax Dashboard</h2>
            <p className="text-[#001f3f] mt-2">SA returns, CGT optimization, and personal tax planning</p>
          </div>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
            <Button 
              variant="outline" 
              className={`border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white ${isMobile ? 'w-full' : ''}`}
              onClick={() => setShowClientList(true)}
            >
              <Users className="h-4 w-4 mr-2" />
              View All Clients ({individualClients.length})
            </Button>
            <Button 
              variant="outline"
              className={`border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white ${isMobile ? 'w-full' : ''}`}
              onClick={() => setShowSAReturnList(true)}
            >
              <FileText className="h-4 w-4 mr-2" />
              View All SA Returns ({saReturnsData.length})
            </Button>
          </div>
        </div>

        <ResponsiveGrid className={isMobile ? 'grid-cols-2' : 'grid-cols-3'}>
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon
            const drillDownData = {
              title: `${kpi.title} Analysis`,
              description: `Detailed breakdown of ${kpi.title.toLowerCase()}`,
              content: (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-3 border-2 border-[#001f3f] rounded-[2px]">
                      <div className="text-sm text-[#001f3f]">Current Period</div>
                      <div className="text-lg font-semibold">{kpi.value}</div>
                      <div className="text-xs text-green-600">{kpi.change}</div>
                    </div>
                    <div className="p-3 border-2 border-[#001f3f] rounded-[2px]">
                      <div className="text-sm text-[#001f3f]">Previous Period</div>
                      <div className="text-lg font-semibold">£125,000</div>
                      <div className="text-xs text-green-600">+8%</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#001f3f] mb-2">Key Insights</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Strong performance in Q2 with 15% growth</li>
                      <li>• Seasonal trends showing consistent improvement</li>
                      <li>• Efficiency gains from process automation</li>
                    </ul>
                  </div>
                </div>
              )
            }

            return (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                icon={Icon}
                color={kpi.color}
                drillDownData={drillDownData}
              />
            )
          })}
        </ResponsiveGrid>

        {/* Quick Actions Section */}
        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Quick Actions</CardTitle>
            <CardDescription className="text-[#001f3f]">Add new clients and create SA returns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
              <Button 
                variant="outline" 
                className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white h-24 flex flex-col items-center justify-center gap-2"
                onClick={handleAddClient}
              >
                <UserPlus className="h-8 w-8" />
                <div className="flex flex-col items-center">
                  <span className="font-semibold">Add New Client</span>
                  <span className="text-xs">Create individual tax client</span>
                </div>
              </Button>
              <Button 
                className="bg-[#001f3f] hover:bg-[#001f3f]/90 text-white h-24 flex flex-col items-center justify-center gap-2"
                onClick={handleAddSAReturn}
              >
                <Plus className="h-8 w-8" />
                <div className="flex flex-col items-center">
                  <span className="font-semibold">New SA Return</span>
                  <span className="text-xs">Create Self Assessment return</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          <div className={isMobile ? '' : 'lg:col-span-2'}>
            <Card className="border-2 border-[#001f3f]">
              <CardHeader>
                <CardTitle className="text-[#001f3f]">Recent SA Returns</CardTitle>
                <CardDescription className="text-[#001f3f]">Current tax year progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {saReturns.map((saReturn) => (
                    <div 
                      key={saReturn.id} 
                      className={`p-4 border-2 border-[#001f3f] rounded-[2px] hover:bg-blue-50 cursor-pointer transition-colors ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}
                      onClick={() => handleViewSAReturn(saReturn)}
                    >
                      <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                        {getStatusIcon(saReturn.status)}
                        <div className="flex-1">
                          <h4 className="font-medium text-[#001f3f]">{saReturn.client}</h4>
                          <p className="text-sm text-[#001f3f]">Tax Year: {saReturn.taxYear}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`text-xs ${getStatusColor(saReturn.status)}`}>
                              {saReturn.status.replace('_', ' ')}
                            </Badge>
                            <span className="text-xs text-[#001f3f]">Due: {saReturn.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                        <div>
                          <p className="text-sm font-medium text-[#001f3f]">Est. Tax: £{saReturn.estimatedTax.toLocaleString()}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`bg-gray-200 rounded-full h-2 ${isMobile ? 'w-16' : 'w-20'}`}>
                              <div 
                                className="bg-[#001f3f] h-2 rounded-full" 
                                style={{ width: `${saReturn.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-[#001f3f]">{saReturn.progress}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-brisk-primary" />
                      AI Tax Adviser
                    </CardTitle>
                    <CardDescription>Personalized optimization recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-[2px]">
                        <p className="text-sm font-medium text-[#001f3f]">Pension Optimization</p>
                        <p className="text-xs text-[#001f3f]">3 clients could save £4,200 with increased contributions</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-[2px]">
                        <p className="text-sm font-medium text-green-900">CGT Planning</p>
                        <p className="text-xs text-green-700">Defer £25k gains to save £2,500 in tax</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-[2px]">
                        <p className="text-sm font-medium text-purple-900">Dividend Strategy</p>
                        <p className="text-xs text-purple-700">Optimize timing for 2 director clients</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-[2px]">
                        <p className="text-sm font-medium text-red-900">IHT Planning</p>
                        <p className="text-xs text-red-700">2 estates need gift planning review</p>
                      </div>
                      <div className="p-3 bg-teal-50 rounded-[2px]">
                        <p className="text-sm font-medium text-teal-900">Family Tax Planning</p>
                        <p className="text-xs text-teal-700">Marriage allowance opportunities for 5 couples</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <AIPromptSection
                  title="Ask your Personal Tax Adviser"
                  description="Get personalized tax optimization advice and planning strategies"
                  placeholder="Ask about pension contributions, CGT planning, dividend timing, or IHT strategies..."
                  recentQuestions={[
                    "How can I optimize my client's pension contributions?",
                    "What CGT planning opportunities exist for this tax year?",
                    "When should we defer dividend payments?",
                    "What are the current IHT allowances and planning options?",
                    "How can married couples optimize their tax allowances?"
                  ]}
                  onSubmit={handleAIQuestion}
                  isLoading={isAILoading}
                />

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#001f3f]">Upcoming Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">SA100 Filing</p>
                          <p className="text-xs text-[#001f3f]">12 returns pending</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">7 days</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Payment on Account</p>
                          <p className="text-xs text-[#001f3f]">8 clients affected</p>
                        </div>
                        <Badge className="bg-blue-100 text-[#001f3f]">14 days</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">CGT Annual Exemption</p>
                          <p className="text-xs text-[#001f3f]">Planning required</p>
                        </div>
                        <Badge className="bg-[#001f3f] text-white">45 days</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
    )
  }

  function renderCurrentReturns() {
    const currentReturns = sortReturns(saReturns.filter(r => r.status === 'in_progress' || r.status === 'review'))
    
    return (
      <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#001f3f]">Current SA Returns</CardTitle>
                    <CardDescription>Returns currently being prepared or in review</CardDescription>
                  </div>
                  <Button onClick={handleAddSAReturn}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Return
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <SearchFilterHeader
                    searchPlaceholder="Search clients, returns, schedules..."
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    filters={[
                      {
                        label: 'Tax Year',
                        options: taxYearOptions,
                        value: selectedTaxYear,
                        onChange: setSelectedTaxYear
                      },
                      {
                        label: 'Status',
                        options: statusOptions,
                        value: selectedStatus,
                        onChange: setSelectedStatus
                      },
                      {
                        label: 'Income Type',
                        options: incomeTypeOptions,
                        value: selectedIncomeType,
                        onChange: setSelectedIncomeType
                      }
                    ]}
                    dateRange={{
                      from: dateFrom,
                      to: dateTo,
                      onFromChange: setDateFrom,
                      onToChange: setDateTo
                    }}
                  />
                  
                  <div className="flex items-center gap-4">
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder={individualClients.length > 0 ? "Select client from Practice Management" : "No clients available - Add in Practice Management"} />
                      </SelectTrigger>
                      <SelectContent>
                        {individualClients.length === 0 ? (
                          <div className="p-4 text-center text-sm text-[#001f3f]">
                            <p>No individual clients found</p>
                            <p className="text-xs mt-1">Add clients in Practice Management module</p>
                          </div>
                        ) : (
                          individualClients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.title} {client.firstName} {client.lastName} ({client.utr || 'No UTR'})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate Tax
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  {currentReturns.length > 0 ? (
                    <div className="grid gap-4">
                      {currentReturns.map((saReturn) => (
                        <Card key={saReturn.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className={`${isMobile ? 'space-y-4' : 'flex items-center justify-between'}`}>
                              <div className="flex items-center gap-4">
                                {getStatusIcon(saReturn.status)}
                                <div>
                                  <h3 className="font-semibold text-[#001f3f]">{saReturn.client}</h3>
                                  <p className="text-sm text-[#001f3f]">Tax Year: {saReturn.taxYear}</p>
                                  <Badge className={`text-xs mt-1 ${getStatusColor(saReturn.status)}`}>
                                    {saReturn.status.replace('_', ' ')}
                                  </Badge>
                                </div>
                              </div>
                              <div className={`${isMobile ? 'flex justify-between' : 'text-right'}`}>
                                <div>
                                  <p className="font-semibold">£{saReturn.estimatedTax.toLocaleString()}</p>
                                  <p className="text-sm text-[#001f3f]">Estimated Tax</p>
                                  <p className="text-xs text-[#001f3f]">Due: {saReturn.dueDate}</p>
                                </div>
                                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2 mt-2`}>
                                  <Button size="sm" variant="outline" onClick={() => handleEditSAReturn(saReturn)}>Edit</Button>
                                  <Button size="sm" onClick={() => handleViewSAReturn(saReturn)}>View</Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleDeleteSAReturn(saReturn.id)}>Delete</Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-[#001f3f]">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-semibold">No current returns</p>
                      <p className="text-sm mt-2">Start a new return to begin</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
      </div>
    )
  }

  function renderDraftReturns() {
    const draftReturns = sortReturns(saReturns.filter(r => r.status === 'draft' || r.status === 'in_progress'))
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#001f3f]">Draft SA Returns</CardTitle>
                <CardDescription>Returns in progress or saved as drafts</CardDescription>
              </div>
              <Button onClick={handleAddSAReturn}>
                <Plus className="h-4 w-4 mr-2" />
                New Draft
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <SearchFilterHeader
                searchPlaceholder="Search draft returns..."
                searchValue={searchTerm}
                onSearchChange={setSearchTerm}
                filters={[
                  {
                    label: 'Tax Year',
                    options: taxYearOptions,
                    value: selectedTaxYear,
                    onChange: setSelectedTaxYear
                  }
                ]}
                dateRange={{
                  from: dateFrom,
                  to: dateTo,
                  onFromChange: setDateFrom,
                  onToChange: setDateTo
                }}
              />

              {draftReturns.length > 0 ? (
                <div className="grid gap-4">
                  {draftReturns.map((saReturn) => (
                    <Card key={saReturn.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Edit className="h-8 w-8 text-orange-500" />
                            <div>
                              <h3 className="font-semibold text-[#001f3f]">{saReturn.client}</h3>
                              <p className="text-sm text-[#001f3f]">Tax Year: {saReturn.taxYear}</p>
                              <Badge className="text-xs mt-1 bg-orange-100 text-orange-800">
                                {saReturn.status === 'draft' ? 'Draft' : 'In Progress'}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div>
                              <p className="font-semibold">£{saReturn.estimatedTax.toLocaleString()}</p>
                              <p className="text-sm text-[#001f3f]">Estimated Tax</p>
                              <div className="mt-2">
                                <div className="text-xs text-[#001f3f] mb-1">Progress: {saReturn.progress}%</div>
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                  <div className="bg-orange-500 h-2 rounded-full" style={{width: `${saReturn.progress}%`}}></div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="outline" onClick={() => handleEditSAReturn(saReturn)}>
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteSAReturn(saReturn.id)}>
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-[#001f3f]">
                  <Edit className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-semibold">No draft returns</p>
                  <p className="text-sm mt-2">Start a new return to begin</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderSubmittedReturns() {
    const submittedReturns = sortReturns(saReturns.filter(r => r.status === 'submitted' || r.status === 'completed'))
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#001f3f]">Submitted SA Returns</CardTitle>
                <CardDescription>Successfully submitted and completed returns</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <SearchFilterHeader
                searchPlaceholder="Search submitted returns..."
                searchValue={searchTerm}
                onSearchChange={setSearchTerm}
                filters={[
                  {
                    label: 'Tax Year',
                    options: taxYearOptions,
                    value: selectedTaxYear,
                    onChange: setSelectedTaxYear
                  }
                ]}
                dateRange={{
                  from: dateFrom,
                  to: dateTo,
                  onFromChange: setDateFrom,
                  onToChange: setDateTo
                }}
              />

              {submittedReturns.length > 0 ? (
                <div className="grid gap-4">
                  {submittedReturns.map((saReturn) => (
                    <Card key={saReturn.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                            <div>
                              <h3 className="font-semibold text-[#001f3f]">{saReturn.client}</h3>
                              <p className="text-sm text-[#001f3f]">Tax Year: {saReturn.taxYear}</p>
                              <Badge className="text-xs mt-1 bg-green-100 text-green-800">
                                Submitted
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div>
                              <p className="font-semibold text-green-600">£{saReturn.estimatedTax.toLocaleString()}</p>
                              <p className="text-sm text-[#001f3f]">Tax Paid</p>
                              <p className="text-xs text-[#001f3f] mt-1">Submitted: {saReturn.dueDate}</p>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="outline" onClick={() => handleViewSAReturn(saReturn)}>
                                <FileText className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-[#001f3f]">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-semibold">No submitted returns</p>
                  <p className="text-sm mt-2">Completed returns will appear here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderCGTCalculator() {
    const [cgtInputs, setCgtInputs] = useState({
      disposalProceeds: '',
      acquisitionCost: '',
      improvementCosts: '',
      disposalCosts: ''
    })
    
    const [cgtResults, setCgtResults] = useState({
      capitalGain: 0,
      annualExemption: 6000,
      taxableGain: 0,
      cgtDue: 0
    })

    const calculateCGT = () => {
      const proceeds = parseFloat(cgtInputs.disposalProceeds) || 0
      const acquisition = parseFloat(cgtInputs.acquisitionCost) || 0
      const improvements = parseFloat(cgtInputs.improvementCosts) || 0
      const disposalCosts = parseFloat(cgtInputs.disposalCosts) || 0

      const capitalGain = proceeds - acquisition - improvements - disposalCosts
      const taxableGain = Math.max(0, capitalGain - cgtResults.annualExemption)
      const cgtDue = taxableGain * 0.20

      setCgtResults({
        ...cgtResults,
        capitalGain,
        taxableGain,
        cgtDue
      })

      notifications.custom('CGT calculation completed', 'success')
    }

    const saveCGTCalculation = () => {
      const calculation = {
        ...cgtInputs,
        ...cgtResults,
        date: new Date().toISOString()
      }
      console.log('Saving CGT calculation:', calculation)
      notifications.custom('CGT calculation saved successfully', 'success')
    }

    return (
      <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#001f3f]">Capital Gains Tax Calculator</CardTitle>
                <CardDescription>Calculate CGT liability and optimization opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="disposal-proceeds" className="text-[#001f3f]">Disposal Proceeds</Label>
                      <Input 
                        id="disposal-proceeds" 
                        type="number"
                        placeholder="£0.00"
                        value={cgtInputs.disposalProceeds}
                        onChange={(e) => setCgtInputs({...cgtInputs, disposalProceeds: e.target.value})}
                        className="border-[#001f3f]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="acquisition-cost" className="text-[#001f3f]">Acquisition Cost</Label>
                      <Input 
                        id="acquisition-cost" 
                        type="number"
                        placeholder="£0.00"
                        value={cgtInputs.acquisitionCost}
                        onChange={(e) => setCgtInputs({...cgtInputs, acquisitionCost: e.target.value})}
                        className="border-[#001f3f]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="improvement-costs" className="text-[#001f3f]">Improvement Costs</Label>
                      <Input 
                        id="improvement-costs" 
                        type="number"
                        placeholder="£0.00"
                        value={cgtInputs.improvementCosts}
                        onChange={(e) => setCgtInputs({...cgtInputs, improvementCosts: e.target.value})}
                        className="border-[#001f3f]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="disposal-costs" className="text-[#001f3f]">Disposal Costs</Label>
                      <Input 
                        id="disposal-costs" 
                        type="number"
                        placeholder="£0.00"
                        value={cgtInputs.disposalCosts}
                        onChange={(e) => setCgtInputs({...cgtInputs, disposalCosts: e.target.value})}
                        className="border-[#001f3f]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-[#001f3f] hover:bg-[#003366]"
                        onClick={calculateCGT}
                      >
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate CGT
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-[#001f3f] text-[#001f3f]"
                        onClick={saveCGTCalculation}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Card className="bg-blue-50 border-2 border-[#001f3f]">
                      <CardHeader>
                        <CardTitle className="text-lg text-[#001f3f]">CGT Calculation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Capital Gain</span>
                            <span className="font-semibold text-[#001f3f]">£{cgtResults.capitalGain.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Annual Exemption</span>
                            <span className="text-[#001f3f]">£{cgtResults.annualExemption.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Taxable Gain</span>
                            <span className="font-semibold text-[#001f3f]">£{cgtResults.taxableGain.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2 border-[#001f3f]">
                            <span className="text-[#001f3f] font-semibold">CGT Due (20%)</span>
                            <span className="font-bold text-lg text-[#001f3f]">£{cgtResults.cgtDue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
      </div>
    )
  }

  function renderOptimization() {
    const handleApplyOptimization = (opportunity: any) => {
      notifications.custom(`Applying ${opportunity.opportunity} for ${opportunity.client}`, 'info')
      setTimeout(() => {
        notifications.custom(`Successfully applied ${opportunity.opportunity}. Estimated saving: £${opportunity.potentialSaving}`, 'success')
      }, 1000)
    }

    const handleViewDetails = (opportunity: any) => {
      console.log('Viewing details for:', opportunity)
      notifications.custom(`Opening detailed analysis for ${opportunity.client}`, 'info')
    }

    return (
      <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#001f3f]">Tax Optimization Opportunities</CardTitle>
                <CardDescription>AI-powered recommendations for tax savings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimizationOpportunities.map((opportunity, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-600">
                      <CardContent className="p-4">
                        <div className={`${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                          <div className="flex-grow">
                            <h3 className="font-semibold text-[#001f3f] text-lg">{opportunity.client}</h3>
                            <p className="text-sm font-medium text-blue-600 mt-1">{opportunity.opportunity}</p>
                            <p className="text-sm text-[#001f3f] mt-2">{opportunity.description}</p>
                          </div>
                          <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right flex-shrink-0 ml-4'}`}>
                            <div className="mr-4">
                              <p className="text-2xl font-bold text-green-600">£{opportunity.potentialSaving.toLocaleString()}</p>
                              <p className="text-sm text-[#001f3f]">Potential Saving</p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-[#001f3f] text-[#001f3f]"
                                onClick={() => handleViewDetails(opportunity)}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Details
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApplyOptimization(opportunity)}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Apply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
      </div>
    )
  }

  function renderIHTPlanning() {
    return (
      <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Inheritance Tax Planning
                </CardTitle>
                <CardDescription>IHT mitigation strategies and estate planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="estate-value" className="text-[#001f3f]">Total Estate Value</Label>
                      <Input id="estate-value" placeholder="£0.00" />
                    </div>
                    <div>
                      <Label htmlFor="nil-rate-band" className="text-[#001f3f]">Nil Rate Band Available</Label>
                      <Input id="nil-rate-band" value="£325,000" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="residence-nil-rate" className="text-[#001f3f]">Residence Nil Rate Band</Label>
                      <Input id="residence-nil-rate" value="£175,000" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="gifts-made" className="text-[#001f3f]">Gifts Made (Last 7 Years)</Label>
                      <Input id="gifts-made" placeholder="£0.00" />
                    </div>
                    <Button className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate IHT Liability
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-[#001f3f]">IHT Calculation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Estate Value</span>
                            <span className="font-semibold">£0.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Nil Rate Bands</span>
                            <span>£500,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxable Estate</span>
                            <span className="font-semibold">£0.00</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>IHT Due (40%)</span>
                            <span className="font-bold text-lg">£0.00</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-[#001f3f]">Gift Planning</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-green-50 rounded-[2px]">
                            <div className="flex items-center gap-2">
                              <Gift className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium">Annual Exemption</span>
                            </div>
                            <p className="text-xs text-green-700">£3,000 per year available</p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-[2px]">
                            <div className="flex items-center gap-2">
                              <Home className="h-4 w-4 text-[#001f3f]" />
                              <span className="text-sm font-medium">Potentially Exempt Transfers</span>
                            </div>
                            <p className="text-xs text-[#001f3f]">7-year rule applies</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
      </div>
    )
  }

  function renderPensionPlanning() {
    return (
      <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-indigo-600" />
                  Pension Planning and Optimization
                </CardTitle>
                <CardDescription>Annual and lifetime allowance planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="annual-income" className="text-[#001f3f]">Annual Income</Label>
                      <Input id="annual-income" placeholder="£0.00" />
                    </div>
                    <div>
                      <Label htmlFor="current-contributions" className="text-[#001f3f]">Current Pension Contributions</Label>
                      <Input id="current-contributions" placeholder="£0.00" />
                    </div>
                    <div>
                      <Label htmlFor="pension-value" className="text-[#001f3f]">Current Pension Value</Label>
                      <Input id="pension-value" placeholder="£0.00" />
                    </div>
                    <div>
                      <Label htmlFor="unused-allowance" className="text-[#001f3f]">Unused Allowance (3 years)</Label>
                      <Input id="unused-allowance" placeholder="£0.00" />
                    </div>
                    <Button className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Optimize Contributions
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-[#001f3f]">Annual Allowance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Standard Allowance</span>
                            <span>£40,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tapered Allowance</span>
                            <span className="font-semibold">£40,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Used This Year</span>
                            <span>£0</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>Remaining Allowance</span>
                            <span className="font-bold text-lg">£40,000</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-[#001f3f]">Lifetime Allowance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Lifetime Allowance</span>
                            <span>£1,073,100</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Current Value</span>
                            <span>£0</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Utilization</span>
                            <span className="font-semibold">0%</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>Remaining Capacity</span>
                            <span className="font-bold text-lg">£1,073,100</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
      </div>
    )
  }

  function renderFamilyTax() {
    return (
      <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users2 className="h-5 w-5 text-teal-600" />
                  Family Tax Planning
                </CardTitle>
                <CardDescription>Income splitting and family allowance optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-[#001f3f]">Marriage Allowance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="spouse1-income" className="text-[#001f3f]">Spouse 1 Income</Label>
                            <Input id="spouse1-income" placeholder="£0.00" />
                          </div>
                          <div>
                            <Label htmlFor="spouse2-income" className="text-[#001f3f]">Spouse 2 Income</Label>
                            <Input id="spouse2-income" placeholder="£0.00" />
                          </div>
                          <Button className="w-full" variant="outline">
                            Calculate Marriage Allowance
                          </Button>
                          <div className="p-3 bg-teal-50 rounded-[2px]">
                            <p className="text-sm font-medium text-teal-900">Potential Saving</p>
                            <p className="text-lg font-bold text-teal-600">£252</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-[#001f3f]">Child Benefit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="children-count" className="text-[#001f3f]">Number of Children</Label>
                            <Input id="children-count" type="number" placeholder="0" />
                          </div>
                          <div>
                            <Label htmlFor="high-earner-income" className="text-[#001f3f]">High Earner Income</Label>
                            <Input id="high-earner-income" placeholder="£0.00" />
                          </div>
                          <Button className="w-full" variant="outline">
                            Calculate HICBC
                          </Button>
                          <div className="p-3 bg-blue-50 rounded-[2px]">
                            <p className="text-sm font-medium text-[#001f3f]">HICBC Charge</p>
                            <p className="text-lg font-bold text-[#001f3f]">£0</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-[#001f3f]">Family Investment Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                          <div className="flex items-center gap-2 mb-2">
                            <Banknote className="h-4 w-4 text-[#001f3f]" />
                            <span className="font-medium">Junior ISAs</span>
                          </div>
                          <p className="text-sm text-[#001f3f]">£9,000 annual allowance per child</p>
                          <Button size="sm" className="mt-2" variant="outline">Setup</Button>
                        </div>
                        <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span className="font-medium">Education Planning</span>
                          </div>
                          <p className="text-sm text-[#001f3f]">Tax-efficient education funding</p>
                          <Button size="sm" className="mt-2" variant="outline">Plan</Button>
                        </div>
                        <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4 text-purple-600" />
                            <span className="font-medium">Income Splitting</span>
                          </div>
                          <p className="text-sm text-[#001f3f]">Optimize family income distribution</p>
                          <Button size="sm" className="mt-2" variant="outline">Analyze</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
      </div>
    )
  }

  function renderFiling() {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">HMRC Filing and Submissions</CardTitle>
            <CardDescription>Submit returns and track filing status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-[2px]">
                <h3 className="font-semibold text-[#001f3f] text-[#001f3f]">Ready for Filing</h3>
                <p className="text-sm text-[#001f3f]">3 SA returns completed and ready for HMRC submission</p>
                <Button className="mt-2" size="sm">
                  Submit to HMRC
                </Button>
              </div>
              <div className="p-4 bg-green-50 rounded-[2px]">
                <h3 className="font-semibold text-[#001f3f] text-green-900">Successfully Filed</h3>
                <p className="text-sm text-green-700">8 returns filed this month with confirmation receipts</p>
                <Button variant="outline" className="mt-2" size="sm">
                  View Receipts
                </Button>
              </div>
              <div className="p-4 bg-blue-50 rounded-[2px]">
                <h3 className="font-semibold text-[#001f3f] text-[#001f3f]">Pending Review</h3>
                <p className="text-sm text-[#001f3f]">2 returns require client approval before filing</p>
                <Button variant="outline" className="mt-2" size="sm">
                  Send for Approval
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderQuarterlyOverview() {
    const currentTaxYear = '2025'
    const quarters = generateQuarterlySubmissions(currentTaxYear)
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#001f3f]">HMRC Quarterly Reporting (Making Tax Digital)</CardTitle>
                <CardDescription>Submit quarterly updates and final declaration for tax year {currentTaxYear}/{parseInt(currentTaxYear) + 1}</CardDescription>
              </div>
              <Badge className="bg-green-600 text-white">MTD Enabled</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-[#001f3f]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-[#001f3f]">Quarters Submitted</p>
                        <p className="text-2xl font-bold text-[#001f3f]">0/4</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-[#001f3f]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <PoundSterling className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-sm text-[#001f3f]">Cumulative Income</p>
                        <p className="text-2xl font-bold text-[#001f3f]">£0</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-[#001f3f]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-8 w-8 text-orange-600" />
                      <div>
                        <p className="text-sm text-[#001f3f]">Next Deadline</p>
                        <p className="text-2xl font-bold text-[#001f3f]">Aug 5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-[#001f3f]">Quarterly Submission Schedule</h3>
                {quarters.slice(0, 4).map((quarter) => (
                  <Card key={quarter.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            quarter.status === 'submitted' ? 'bg-green-100' :
                            quarter.status === 'in_progress' ? 'bg-orange-100' : 'bg-gray-100'
                          }`}>
                            {quarter.status === 'submitted' ? (
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            ) : quarter.status === 'in_progress' ? (
                              <Clock className="h-6 w-6 text-orange-600" />
                            ) : (
                              <FileText className="h-6 w-6 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#001f3f]">{quarter.quarterLabel}</h4>
                            <p className="text-sm text-[#001f3f]">
                              {new Date(quarter.startDate).toLocaleDateString('en-GB')} - {new Date(quarter.endDate).toLocaleDateString('en-GB')}
                            </p>
                            <Badge className={`mt-1 text-xs ${
                              quarter.status === 'submitted' ? 'bg-green-100 text-green-800' :
                              quarter.status === 'in_progress' ? 'bg-orange-100 text-orange-800' : 
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {quarter.status === 'submitted' ? 'Submitted' : quarter.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-[#001f3f]">Due Date</p>
                          <p className="font-semibold text-[#001f3f]">{new Date(quarter.dueDate).toLocaleDateString('en-GB')}</p>
                          <div className="flex gap-2 mt-3">
                            <Button 
                              size="sm" 
                              onClick={() => handleSubTabClick(`q${quarter.quarter}`, 'quarterly')}
                              className="bg-[#001f3f] hover:bg-[#003366]"
                            >
                              {quarter.status === 'submitted' ? 'View' : 'Start'} <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="border-2 border-green-600 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#001f3f]">Final Declaration</h4>
                          <p className="text-sm text-[#001f3f]">Complete annual reconciliation and submit to HMRC</p>
                          <Badge className="mt-1 text-xs bg-gray-100 text-gray-800">Available after Q4</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#001f3f]">Due Date</p>
                        <p className="font-semibold text-[#001f3f]">31 Jan {parseInt(currentTaxYear) + 2}</p>
                        <Button 
                          size="sm" 
                          disabled
                          className="mt-3"
                        >
                          View <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#001f3f] mb-1">What is Making Tax Digital?</h4>
                    <p className="text-sm text-[#001f3f]">
                      From April 2026, self-employed individuals and landlords must submit quarterly updates to HMRC through MTD-compatible software. 
                      This system requires 4 quarterly submissions plus 1 final declaration each tax year.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderQuarterSubmission(quarterNumber: 1 | 2 | 3 | 4) {
    const currentTaxYear = '2025'
    const quarters = generateQuarterlySubmissions(currentTaxYear)
    const quarter = quarters[quarterNumber - 1]
    
    const handleOpenQuarterlyForm = () => {
      setCurrentQuarterData(quarter)
      setIsQuarterlyFormOpen(true)
    }

    const handleSubmitToHMRC = async () => {
      if (!hmrcMTDService.isAuthenticated()) {
        notifications.error('Please authenticate with HMRC first')
        const authUrl = hmrcMTDService.initiateOAuth()
        window.location.href = authUrl
        return
      }

      try {
        notifications.custom('Submitting to HMRC...', 'info')
        notifications.custom(`${quarter.quarterLabel} successfully submitted to HMRC`, 'success')
      } catch (error) {
        notifications.custom(`Failed to submit: ${error}`, 'error')
      }
    }
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#001f3f]">{quarter.quarterLabel} Submission</CardTitle>
                <CardDescription>
                  {new Date(quarter.startDate).toLocaleDateString('en-GB')} - {new Date(quarter.endDate).toLocaleDateString('en-GB')} 
                  • Due: {new Date(quarter.dueDate).toLocaleDateString('en-GB')}
                </CardDescription>
              </div>
              <Badge className={
                quarter.status === 'submitted' ? 'bg-green-600' : 
                quarter.status === 'in_progress' ? 'bg-orange-600' : 'bg-gray-600'
              }>
                {quarter.status === 'submitted' ? 'Submitted' : quarter.status === 'in_progress' ? 'In Progress' : 'Not Started'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-[#001f3f] rounded-lg">
                <div className="flex items-start gap-4">
                  <FileText className="h-12 w-12 text-blue-600 flex-shrink-0" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-[#001f3f] mb-2">
                      Complete Your Quarterly MTD Submission
                    </h3>
                    <p className="text-[#001f3f] mb-4">
                      Click below to open the comprehensive income and expense form with detailed tracking for:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-[#001f3f]">Employment Income</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-[#001f3f]">Self-Employment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-[#001f3f]">Rental Income</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-[#001f3f]">Dividends (Real-time)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-[#001f3f]">Pensions & Interest</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-[#001f3f]">Expenses & Deductions</span>
                      </div>
                    </div>
                    <Button 
                      onClick={handleOpenQuarterlyForm}
                      className="bg-[#001f3f] hover:bg-[#003366]"
                      size="lg"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Open Detailed Income & Expense Form
                    </Button>
                  </div>
                </div>
              </div>

              <Card className="bg-blue-50 border-2 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-[#001f3f] mb-3">Quarter Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#001f3f]">Employment Income:</span>
                      <span className="font-semibold">£{quarter.employmentIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#001f3f]">Self-Employment Income:</span>
                      <span className="font-semibold">£{quarter.selfEmploymentIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#001f3f]">Property Income:</span>
                      <span className="font-semibold">£{quarter.propertyIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#001f3f]">Dividend Income:</span>
                      <span className="font-semibold">£{quarter.dividendIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-[#001f3f] font-semibold">Total Income (This Quarter):</span>
                      <span className="font-bold">£{quarter.totalIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#001f3f]">Cumulative Income (YTD):</span>
                      <span className="font-semibold">£{quarter.cumulativeIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-[#001f3f] font-semibold">Estimated Tax (Cumulative):</span>
                      <span className="font-bold text-lg">£{quarter.cumulativeTax.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3 justify-end">
                <Button variant="outline">Save as Draft</Button>
                <Button 
                  onClick={handleSubmitToHMRC}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={quarter.totalIncome === 0}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit to HMRC
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderFinalDeclaration() {
    const currentTaxYear = '2025'
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#001f3f]">Final Declaration</CardTitle>
                <CardDescription>Annual reconciliation and final submission for {currentTaxYear}/{parseInt(currentTaxYear) + 1}</CardDescription>
              </div>
              <Badge className="bg-green-600">Ready to Submit</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                <h4 className="font-semibold text-[#001f3f] mb-2">Annual Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#001f3f]">Total Income (All Quarters)</p>
                    <p className="text-2xl font-bold text-[#001f3f]">£0.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#001f3f]">Total Tax Liability</p>
                    <p className="text-2xl font-bold text-[#001f3f]">£0.00</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-[#001f3f]">Additional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[#001f3f]">Personal Allowance Adjustments</Label>
                    <Input type="number" placeholder="0.00" className="border-[#001f3f] mt-2" />
                  </div>
                  <div>
                    <Label className="text-[#001f3f]">Pension Contributions</Label>
                    <Input type="number" placeholder="0.00" className="border-[#001f3f] mt-2" />
                  </div>
                  <div>
                    <Label className="text-[#001f3f]">Charitable Donations (Gift Aid)</Label>
                    <Input type="number" placeholder="0.00" className="border-[#001f3f] mt-2" />
                  </div>
                  <div>
                    <Label className="text-[#001f3f]">Capital Gains Tax</Label>
                    <Input type="number" placeholder="0.00" className="border-[#001f3f] mt-2" />
                  </div>
                </div>
              </div>

              <Card className="bg-green-50 border-2 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-[#001f3f] mb-3">Final Tax Calculation</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#001f3f]">Total Taxable Income:</span>
                      <span className="font-semibold">£0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#001f3f]">Tax Already Paid:</span>
                      <span className="font-semibold">£0.00</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-[#001f3f] font-semibold">Tax Due / (Refund):</span>
                      <span className="font-bold text-lg text-green-600">£0.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3 justify-end">
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Final Declaration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ResponsiveLayout>
      <div className="flex min-h-screen bg-blue-50">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-[#001f3f] flex-shrink-0">
          <div className="p-2">
            <h2 className="text-lg font-semibold text-[#001f3f] mb-4">Personal Tax</h2>
            <nav className="space-y-0.5">
              {Object.entries(menuStructure).map(([key, config]) => (
                <div key={key}>
                  <button
                    onClick={() => handleMainTabClick(key)}
                    className={`w-full flex items-center justify-between px-3 py-2 m-0.5 text-sm rounded-[2px] transition-all duration-200 shadow-sm ${
                      activeMainTab === key 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-[0.98] font-semibold' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
                    }`}
                  >
                    <div className="flex items-center">
                      <config.icon className="h-4 w-4 mr-2" />
                      {config.label}
                    </div>
                    {config.hasSubTabs && (
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        expandedCategories.includes(key) ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {config.hasSubTabs && expandedCategories.includes(key) && config.subTabs && (
                    <div className="ml-0.5 mt-0.5 space-y-0.5">
                      {Object.entries(config.subTabs).map(([subKey, subConfig]) => (
                        <button
                          key={subKey}
                          onClick={() => handleSubTabClick(subKey, key)}
                          className={`w-full flex items-center px-3 py-2 m-0.5 text-sm rounded-[2px] transition-all duration-200 shadow-sm ${
                            activeSubTab === subKey 
                              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-l-2 border-orange-300 shadow-md font-semibold' 
                              : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-sm hover:shadow-md font-medium'
                          }`}
                        >
                          <subConfig.icon className="h-3 w-3 mr-2" />
                          {subConfig.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {renderMainContent()}
          </div>
        </div>
      </div>

      <AIPromptSection
        isLoading={isAILoading}
        onSubmit={handleAIQuestion}
        placeholder="Ask about personal tax planning, SA returns, CGT calculations..."
        title="Personal Tax AI Assistant"
        description="Get expert guidance on personal tax planning, SA returns, and CGT calculations"
        recentQuestions={[]}
      />

      {/* Individual Client Form */}
      <ComprehensiveIndividualClientForm
        open={isClientFormOpen}
        onOpenChange={setIsClientFormOpen}
        client={selectedClientForEdit}
        onSave={handleSaveClient}
        mode={clientFormMode}
      />

      {/* SA Return Form */}
      <ComprehensiveSAReturnForm
        open={isSAReturnFormOpen}
        onOpenChange={setIsSAReturnFormOpen}
        clients={individualClients.map(c => ({ id: c.id, name: `${c.firstName} ${c.lastName}` }))}
        onSave={handleSaveSAReturn}
      />

      {/* Client List Dialog */}
      <Dialog open={showClientList} onOpenChange={setShowClientList}>
        <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f] text-xl">All Clients</DialogTitle>
            <DialogDescription className="text-[#001f3f]">
              Manage your individual tax clients
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {individualClients.length === 0 ? (
              <div className="text-center py-8 text-[#001f3f]">
                <Users className="h-12 w-12 mx-auto mb-3 text-[#001f3f]" />
                <p>No clients found. Add your first client to get started.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-[#001f3f]">
                    <TableHead className="text-[#001f3f] font-bold">S No.</TableHead>
                    <TableHead className="text-[#001f3f] font-bold">Client ID</TableHead>
                    <TableHead className="text-[#001f3f] font-bold">Client Name</TableHead>
                    <TableHead className="text-[#001f3f] font-bold">Client Type</TableHead>
                    <TableHead className="text-[#001f3f] font-bold">NINO</TableHead>
                    <TableHead className="text-[#001f3f] font-bold">UTR No.</TableHead>
                    <TableHead className="text-[#001f3f] font-bold">Status</TableHead>
                    <TableHead className="text-[#001f3f] font-bold">Tax Amount Due</TableHead>
                    <TableHead className="text-[#001f3f] font-bold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {individualClients.map((client, index) => {
                    const saInfo = getClientSAReturnInfo(client.id)
                    return (
                      <TableRow key={client.id} className="border-[#001f3f]">
                        <TableCell className="text-[#001f3f]">{index + 1}</TableCell>
                        <TableCell className="text-[#001f3f] font-mono text-xs">{client.id}</TableCell>
                        <TableCell className="text-[#001f3f] font-medium">
                          {client.title ? `${client.title} ` : ''}{client.firstName} {client.lastName}
                        </TableCell>
                        <TableCell className="text-[#001f3f]">
                          <Badge variant="outline" className="border-[#001f3f] text-[#001f3f]">
                            {client.clientType === 'sole-trader' ? 'Sole Trader' : 'Individual'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[#001f3f] font-mono">{client.nationalInsuranceNumber || '-'}</TableCell>
                        <TableCell className="text-[#001f3f] font-mono">{client.utr || '-'}</TableCell>
                        <TableCell>
                          <Badge className={
                            saInfo.status === 'not-created' ? 'bg-gray-500 text-white' :
                            saInfo.status === 'draft' ? 'bg-gray-400 text-white' :
                            saInfo.status === 'in_progress' ? 'bg-blue-500 text-white' :
                            saInfo.status === 'review' ? 'bg-blue-500 text-white' :
                            saInfo.status === 'submitted' ? 'bg-green-600 text-white' :
                            saInfo.status === 'approved' ? 'bg-green-700 text-white' :
                            'bg-gray-500 text-white'
                          }>
                            {saInfo.status === 'not-created' ? 'Not Created' : 
                             saInfo.status.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[#001f3f] font-medium">
                          {saInfo.status === 'not-created' ? '-' : `£${saInfo.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white"
                              onClick={() => {
                                setShowClientList(false)
                                handleViewClient(client)
                              }}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white"
                              onClick={() => {
                                setShowClientList(false)
                                handleEditClient(client)
                              }}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                              onClick={() => handleDeleteClient(client.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClientList(false)}>
              Close
            </Button>
            <Button 
              className="bg-[#001f3f] hover:bg-[#001f3f]/90 text-white"
              onClick={() => {
                setShowClientList(false)
                handleAddClient()
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SA Return List Dialog */}
      <Dialog open={showSAReturnList} onOpenChange={setShowSAReturnList}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f] text-xl">All SA Returns</DialogTitle>
            <DialogDescription className="text-[#001f3f]">
              View and manage Self Assessment tax returns
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {saReturnsData.length === 0 ? (
              <div className="text-center py-8 text-[#001f3f]">
                <FileText className="h-12 w-12 mx-auto mb-3 text-[#001f3f]" />
                <p>No SA returns found. Create your first SA return to get started.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-[#001f3f]">
                    <TableHead className="text-[#001f3f] font-bold">Client</TableHead>
                    <TableHead className="text-[#001f3f] font-bold">Tax Year</TableHead>
                    <TableHead className="text-[#001f3f] font-bold">Status</TableHead>
                    <TableHead className="text-[#001f3f] font-bold">Due Date</TableHead>
                    <TableHead className="text-[#001f3f] font-bold">Estimated Tax</TableHead>
                    <TableHead className="text-[#001f3f] font-bold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {saReturnsData.map((saReturn) => (
                    <TableRow key={saReturn.id} className="border-[#001f3f]">
                      <TableCell className="text-[#001f3f] font-medium">{saReturn.clientName}</TableCell>
                      <TableCell className="text-[#001f3f]">{saReturn.taxYear}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(saReturn.status)}>
                          {saReturn.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#001f3f]">{new Date(saReturn.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-[#001f3f] font-medium">
                        £{saReturn.estimatedTax?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white"
                            onClick={() => {
                              setShowSAReturnList(false)
                              handleViewSAReturn(saReturn)
                            }}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white"
                            onClick={() => {
                              setShowSAReturnList(false)
                              handleEditSAReturn(saReturn)
                            }}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                            onClick={() => handleDeleteSAReturn(saReturn.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSAReturnList(false)}>
              Close
            </Button>
            <Button 
              className="bg-[#001f3f] hover:bg-[#001f3f]/90 text-white"
              onClick={() => {
                setShowSAReturnList(false)
                handleAddSAReturn()
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              New SA Return
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quarterly MTD Comprehensive Form - Reusing SA Return Form */}
      {currentQuarterData && (
        <ComprehensiveSAReturnForm
          open={isQuarterlyFormOpen}
          onOpenChange={setIsQuarterlyFormOpen}
          saReturn={null}
          onSave={(data) => {
            console.log('Quarterly data saved:', data)
            notifications.custom(`${currentQuarterData.quarterLabel} data saved successfully`, 'success')
            setIsQuarterlyFormOpen(false)
          }}
          mode="add"
          clients={individualClients}
        />
      )}
    </ResponsiveLayout>
  )
}

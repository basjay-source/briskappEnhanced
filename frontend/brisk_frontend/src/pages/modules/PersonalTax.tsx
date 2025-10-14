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
import { calculateIHT, calculatePensionAllowance, calculateMarriageAllowanceSaving, generateTaxYears as getTaxYearsList, calculateOpportunityEstimate } from '@/services/taxRates'
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

  const [cgtInputs, setCgtInputs] = useState({
    disposalProceeds: '',
    acquisitionCost: '',
    improvementCosts: '',
    disposalCosts: '',
    taxYear: selectedTaxYear
  })
  
  const [cgtResults, setCgtResults] = useState({
    capitalGain: 0,
    annualExemption: 0,
    taxableGain: 0,
    cgtDue: 0,
    basicRateCGT: 0,
    higherRateCGT: 0
  })

  const [showOptimizationDetails, setShowOptimizationDetails] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null)
  const [optimizationOpportunitiesData, setOptimizationOpportunitiesData] = useState<any[]>([])

  const [ihtCalculations, setIhtCalculations] = useState(() => {
    const saved = localStorage.getItem('ihtCalculations')
    return saved ? JSON.parse(saved) : []
  })

  const [currentIht, setCurrentIht] = useState({
    estateValue: 0,
    residenceValue: 0,
    taxYear: new Date().getFullYear().toString() + '-' + (new Date().getFullYear() + 1).toString().slice(-2)
  })

  const [ihtResult, setIhtResult] = useState({
    nilRateBand: 0,
    residenceNilRateBand: 0,
    totalNilRateBand: 0,
    taxableEstate: 0,
    ihtDue: 0,
    effectiveRate: 0
  })

  const [pensionCalculations, setPensionCalculations] = useState(() => {
    const saved = localStorage.getItem('pensionCalculations')
    return saved ? JSON.parse(saved) : []
  })

  const [currentPension, setCurrentPension] = useState({
    employmentIncome: 0,
    selfEmploymentIncome: 0,
    rentalIncome: 0,
    dividendIncome: 0,
    savingsInterest: 0,
    pensionIncome: 0,
    otherIncome: 0,
    employeeContributions: 0,
    employerContributions: 0,
    personalContributions: 0,
    totalIncome: 0,
    netIncome: 0,
    adjustedIncome: 0,
    taxYear: new Date().getFullYear().toString() + '-' + (new Date().getFullYear() + 1).toString().slice(-2)
  })

  const [pensionResult, setPensionResult] = useState({
    annualAllowance: 0,
    tapered: false,
    reduction: 0,
    availableAllowance: 0
  })

  const [familyTaxCalculations, setFamilyTaxCalculations] = useState(() => {
    const saved = localStorage.getItem('familyTaxCalculations')
    return saved ? JSON.parse(saved) : []
  })

  const [marriageAllowance, setMarriageAllowance] = useState({
    spouse1Income: 0,
    spouse2Income: 0,
    taxYear: new Date().getFullYear().toString() + '-' + (new Date().getFullYear() + 1).toString().slice(-2),
    eligible: false,
    transferableAmount: 0,
    taxSaving: 0,
    reason: ''
  })

  const [isAddOpportunityModalOpen, setIsAddOpportunityModalOpen] = useState(false)
  const [currentOpportunity, setCurrentOpportunity] = useState({
    client: '',
    opportunity: '',
    description: '',
    potentialSaving: 0,
    taxYear: new Date().getFullYear().toString() + '-' + (new Date().getFullYear() + 1).toString().slice(-2)
  })
  
  const [showIHTDrilldown, setShowIHTDrilldown] = useState(false)
  const [selectedIHTCalculation, setSelectedIHTCalculation] = useState<any>(null)

  const [activeTaxPlanningTab, setActiveTaxPlanningTab] = useState('cgt')

  const getCGTRatesByYear = (year: string) => {
    const yearNum = parseInt(year)
    if (yearNum >= 2024) {
      return { annualExemption: 3000, basicRate: 0.10, higherRate: 0.20 }
    } else if (yearNum >= 2023) {
      return { annualExemption: 6000, basicRate: 0.10, higherRate: 0.20 }
    } else if (yearNum >= 2021) {
      return { annualExemption: 12300, basicRate: 0.10, higherRate: 0.20 }
    } else if (yearNum >= 2020) {
      return { annualExemption: 12000, basicRate: 0.10, higherRate: 0.20 }
    } else {
      return { annualExemption: 11700, basicRate: 0.10, higherRate: 0.20 }
    }
  }

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

    const loadOptimizationOpportunities = () => {
      try {
        const saved = localStorage.getItem('optimizationOpportunities')
        if (saved) {
          const opportunities = JSON.parse(saved)
          setOptimizationOpportunitiesData(opportunities)
          console.log(`✅ Loaded ${opportunities.length} optimization opportunities`)
        }
      } catch (e) {
        console.error('Failed to load optimization opportunities:', e)
      }
    }
    loadOptimizationOpportunities()
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

  const handleCalculateIHT = () => {
    const result = calculateIHT(currentIht.estateValue, currentIht.residenceValue, currentIht.taxYear)
    
    setIhtResult(result)
    
    const calculation = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...currentIht,
      ...result
    }
    
    const updated = [...ihtCalculations, calculation]
    setIhtCalculations(updated)
    localStorage.setItem('ihtCalculations', JSON.stringify(updated))
    notifications.saved('IHT Calculation', `IHT due: £${result.ihtDue.toLocaleString(undefined, {minimumFractionDigits: 2})}`)
  }

  const handleViewIHTCalculation = (calculation: any) => {
    setSelectedIHTCalculation(calculation)
    setShowIHTDrilldown(true)
  }

  const handleDeleteIHTCalculation = (id: string) => {
    const updated = ihtCalculations.filter((calc: any) => calc.id !== id)
    setIhtCalculations(updated)
    localStorage.setItem('ihtCalculations', JSON.stringify(updated))
    notifications.deleted('IHT Calculation', 'Calculation removed successfully')
    setShowIHTDrilldown(false)
  }

  const handleCalculatePension = () => {
    const totalIncome = 
      currentPension.employmentIncome +
      currentPension.selfEmploymentIncome +
      currentPension.rentalIncome +
      currentPension.dividendIncome +
      currentPension.savingsInterest +
      currentPension.pensionIncome +
      currentPension.otherIncome
    
    const netIncome = totalIncome - currentPension.employeeContributions
    const adjustedIncome = netIncome + currentPension.employerContributions
    
    const updatedPension = {
      ...currentPension,
      totalIncome,
      netIncome,
      adjustedIncome
    }
    setCurrentPension(updatedPension)
    
    const result = calculatePensionAllowance(adjustedIncome, currentPension.taxYear)
    
    setPensionResult(result)
    
    const calculation = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...updatedPension,
      ...result
    }
    
    const updated = [...pensionCalculations, calculation]
    setPensionCalculations(updated)
    localStorage.setItem('pensionCalculations', JSON.stringify(updated))
    notifications.saved('Pension Allowance Calculation', `Available allowance: £${result.availableAllowance.toLocaleString()}`)
  }

  const handleCalculateMarriageAllowance = () => {
    const result = calculateMarriageAllowanceSaving(marriageAllowance.spouse1Income, marriageAllowance.spouse2Income, marriageAllowance.taxYear)
    
    setMarriageAllowance({
      ...marriageAllowance,
      ...result
    })
    
    const calculation = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...marriageAllowance,
      ...result
    }
    
    const updated = [...familyTaxCalculations, calculation]
    setFamilyTaxCalculations(updated)
    localStorage.setItem('familyTaxCalculations', JSON.stringify(updated))
    notifications.saved('Marriage Allowance Calculation', result.eligible ? `Tax saving: £${result.taxSaving.toFixed(2)}` : 'Not eligible')
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
    const taxYears = []
    
    for (let i = 0; i < 30; i++) {
      const year = currentYear - i
      taxYears.push(String(year))
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

  const getOpportunityTypes = (taxYear: string) => {
    return [
      { value: 'pension-contribution', label: 'Pension Contribution Optimization' },
      { value: 'marriage-allowance', label: 'Marriage Allowance' },
      { value: 'dividend-optimization', label: 'Dividend vs Salary Optimization' },
      { value: 'capital-allowances', label: 'Capital Allowances Claim' },
      { value: 'tax-loss-harvesting', label: 'Tax Loss Harvesting' },
      { value: 'iht-planning', label: 'Inheritance Tax Planning' },
      { value: 'gift-aid', label: 'Gift Aid Contributions' },
      { value: 'eis-seis', label: 'EIS/SEIS Tax Relief' },
      { value: 'vct-investment', label: 'VCT Investment Relief' },
      { value: 'rent-a-room', label: 'Rent-a-Room Relief' },
      { value: 'trading-allowance', label: 'Trading Allowance' },
      { value: 'property-allowance', label: 'Property Allowance' },
      { value: 'child-benefit', label: 'Child Benefit Charge Optimization' },
      { value: 'tax-code-review', label: 'Tax Code Review' },
      { value: 'business-expense', label: 'Business Expense Optimization' },
      { value: 'incorporation', label: 'Incorporation Tax Benefits' },
      { value: 'r&d-relief', label: 'R&D Tax Relief' },
      { value: 'other', label: 'Other Optimization' }
    ].map(type => ({
      ...type,
      estimatedSaving: calculateOpportunityEstimate(type.value, taxYear)
    }))
  }

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
    planning: { 
      label: 'Tax Planning', 
      icon: Target, 
      hasSubTabs: false
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

  const calculateKPIs = () => {
    const totalClients = individualClients.length
    const activeReturns = saReturnsData.filter(r => r.status === 'in_progress' || r.status === 'draft')
    const completedReturns = saReturnsData.filter(r => r.status === 'submitted' || r.status === 'approved')
    const totalSavings = optimizationOpportunitiesData.reduce((sum, opp) => sum + (opp.potentialSaving || 0), 0)
    const cgtCalculations = JSON.parse(localStorage.getItem('cgtCalculations') || '[]')
    const totalCGTSavings = cgtCalculations.reduce((sum: number, calc: any) => sum + (calc.cgtDue || 0), 0)
    
    return [
      {
        title: 'Total Clients',
        value: totalClients.toString(),
        change: individualClients.length > 0 ? 'Individual clients' : 'No clients yet',
        icon: Users,
        color: 'text-[#001f3f]'
      },
      {
        title: 'Active Returns',
        value: activeReturns.length.toString(),
        change: activeReturns.length > 0 ? 'In progress' : 'No active returns',
        icon: FileText,
        color: 'text-blue-600'
      },
      {
        title: 'Completed Returns',
        value: completedReturns.length.toString(),
        change: completedReturns.length > 0 ? 'Submitted' : 'No completed returns',
        icon: CheckCircle,
        color: 'text-green-600'
      },
      {
        title: 'Optimization Savings',
        value: totalSavings > 0 ? `£${totalSavings.toLocaleString()}` : '£0',
        change: `${optimizationOpportunitiesData.length} opportunities`,
        icon: TrendingUp,
        color: 'text-green-600'
      },
      {
        title: 'CGT Calculations',
        value: cgtCalculations.length.toString(),
        change: totalCGTSavings > 0 ? `£${totalCGTSavings.toLocaleString()} liability` : 'No calculations',
        icon: Calculator,
        color: 'text-indigo-600'
      },
      {
        title: 'Total Returns',
        value: saReturnsData.length.toString(),
        change: saReturnsData.length > 0 ? 'All statuses' : 'No returns yet',
        icon: PoundSterling,
        color: 'text-purple-600'
      }
    ]
  }

  const kpis = calculateKPIs()


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

  const sortReturns = (returns: typeof saReturnsData) => {
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
        case 'cgt': return renderCGTCalculator()
        case 'optimization': return renderOptimization()
        case 'iht': return renderIHTPlanning()
        case 'pension': return renderPensionPlanning()
        default: return renderDashboard()
      }
    }

    switch (activeMainTab) {
      case 'returns': return renderCurrentReturns()
      case 'quarterly': return renderQuarterlyOverview()
      case 'planning': return renderTaxPlanning()
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
                  {saReturnsData.map((saReturn) => (
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
    const currentReturns = sortReturns(saReturnsData.filter(r => r.status === 'in_progress' || r.status === 'review'))
    
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
    const draftReturns = sortReturns(saReturnsData.filter(r => r.status === 'draft' || r.status === 'in_progress'))
    
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
    const submittedReturns = sortReturns(saReturnsData.filter(r => r.status === 'submitted' || r.status === 'completed'))
    
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
    const rates = getCGTRatesByYear(cgtInputs.taxYear)

    const calculateCGT = () => {
      const proceeds = parseFloat(cgtInputs.disposalProceeds) || 0
      const acquisition = parseFloat(cgtInputs.acquisitionCost) || 0
      const improvements = parseFloat(cgtInputs.improvementCosts) || 0
      const disposalCosts = parseFloat(cgtInputs.disposalCosts) || 0

      const capitalGain = proceeds - acquisition - improvements - disposalCosts
      const taxableGain = Math.max(0, capitalGain - rates.annualExemption)
      const higherRateCGT = taxableGain * rates.higherRate

      setCgtResults({
        capitalGain,
        annualExemption: rates.annualExemption,
        taxableGain,
        cgtDue: higherRateCGT,
        basicRateCGT: taxableGain * rates.basicRate,
        higherRateCGT
      })

      notifications.custom('CGT calculation completed', 'success')
    }

    const saveCGTCalculation = () => {
      const calculation = {
        ...cgtInputs,
        ...cgtResults,
        date: new Date().toISOString()
      }
      localStorage.setItem('cgtCalculations', JSON.stringify([
        ...(JSON.parse(localStorage.getItem('cgtCalculations') || '[]')),
        calculation
      ]))
      notifications.custom('CGT calculation saved successfully', 'success')
    }

    return (
      <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#001f3f]">Capital Gains Tax Calculator</CardTitle>
                <CardDescription>Calculate CGT liability for tax year {cgtInputs.taxYear}/{parseInt(cgtInputs.taxYear)+1}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cgt-tax-year" className="text-[#001f3f]">Tax Year</Label>
                      <Select value={cgtInputs.taxYear} onValueChange={(val) => setCgtInputs({...cgtInputs, taxYear: val})}>
                        <SelectTrigger className="border-[#001f3f]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {generateTaxYears().map(year => (
                            <SelectItem key={year} value={year}>{year}/{parseInt(year)+1}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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
                      <Button className="flex-1 bg-[#001f3f] hover:bg-[#003366]" onClick={calculateCGT}>
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate CGT
                      </Button>
                      <Button variant="outline" className="border-[#001f3f] text-[#001f3f]" onClick={saveCGTCalculation}>
                        Save
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Card className="bg-blue-50 border-2 border-[#001f3f]">
                      <CardHeader>
                        <CardTitle className="text-lg text-[#001f3f]">CGT Calculation Results</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Tax Year</span>
                            <span className="font-semibold text-[#001f3f]">{cgtInputs.taxYear}/{parseInt(cgtInputs.taxYear)+1}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Capital Gain</span>
                            <span className="font-semibold text-[#001f3f]">£{cgtResults.capitalGain.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Annual Exemption</span>
                            <span className="text-[#001f3f]">£{rates.annualExemption.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Taxable Gain</span>
                            <span className="font-semibold text-[#001f3f]">£{cgtResults.taxableGain.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[#001f3f]">Basic Rate (10%)</span>
                            <span className="text-[#001f3f]">£{cgtResults.basicRateCGT.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[#001f3f]">Higher Rate (20%)</span>
                            <span className="text-[#001f3f]">£{cgtResults.higherRateCGT.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2 border-[#001f3f]">
                            <span className="text-[#001f3f] font-semibold">CGT Due</span>
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
      const updated = optimizationOpportunitiesData.map(opp => 
        opp.id === opportunity.id ? { ...opp, status: 'applied', appliedDate: new Date().toISOString() } : opp
      )
      setOptimizationOpportunitiesData(updated)
      localStorage.setItem('optimizationOpportunities', JSON.stringify(updated))
      notifications.saved('Optimization Applied', `${opportunity.opportunity} - £${opportunity.potentialSaving.toLocaleString()} savings`)
    }

    const handleViewDetails = (opportunity: any) => {
      setSelectedOpportunity(opportunity)
      setShowOptimizationDetails(true)
    }

    const handleAddOpportunity = () => {
      setCurrentOpportunity({
        client: '',
        opportunity: '',
        description: '',
        potentialSaving: 0,
        taxYear: new Date().getFullYear().toString() + '-' + (new Date().getFullYear() + 1).toString().slice(-2)
      })
      setIsAddOpportunityModalOpen(true)
    }

    const handleSaveOpportunity = () => {
      if (!currentOpportunity.client || !currentOpportunity.opportunity) {
        notifications.custom('Please fill in all required fields', 'error')
        return
      }

      const newOpportunity = {
        id: Date.now().toString(),
        ...currentOpportunity,
        status: 'pending',
        createdDate: new Date().toISOString()
      }

      const updated = [...optimizationOpportunitiesData, newOpportunity]
      setOptimizationOpportunitiesData(updated)
      localStorage.setItem('optimizationOpportunities', JSON.stringify(updated))
      setIsAddOpportunityModalOpen(false)
      notifications.created('Optimization Opportunity', currentOpportunity.opportunity)
    }

    const handleDeleteOpportunity = (id: string) => {
      if (confirm('Are you sure you want to delete this optimization opportunity?')) {
        const updated = optimizationOpportunitiesData.filter(opp => opp.id !== id)
        setOptimizationOpportunitiesData(updated)
        localStorage.setItem('optimizationOpportunities', JSON.stringify(updated))
        notifications.deleted('Optimization Opportunity')
      }
    }

    return (
      <>
        <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-[#001f3f]">Tax Optimization Opportunities</CardTitle>
                      <CardDescription>Identify and track tax-saving opportunities for clients</CardDescription>
                    </div>
                    <Button className="bg-[#001f3f] hover:bg-[#003366]" onClick={handleAddOpportunity}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Opportunity
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {optimizationOpportunitiesData.length > 0 ? (
                    <div className="space-y-4">
                      {optimizationOpportunitiesData.map((opportunity, index) => (
                      <Card key={opportunity.id || index} className="border-l-4 border-l-blue-600">
                        <CardContent className="p-4">
                          <div className={`${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                            <div className="flex-grow">
                              <h3 className="font-semibold text-[#001f3f] text-lg">{opportunity.client}</h3>
                              <p className="text-sm font-medium text-blue-600 mt-1">{opportunity.opportunity}</p>
                              <p className="text-sm text-[#001f3f] mt-2">{opportunity.description}</p>
                              {opportunity.status === 'applied' && (
                                <p className="text-xs text-green-600 mt-1">✓ Applied on {new Date(opportunity.appliedDate).toLocaleDateString()}</p>
                              )}
                            </div>
                            <div className={`${isMobile ? 'flex justify-between items-center mt-3' : 'text-right flex-shrink-0 ml-4'}`}>
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
                                {opportunity.status !== 'applied' && (
                                  <Button 
                                    size="sm" 
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleApplyOptimization(opportunity)}
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Apply
                                  </Button>
                                )}
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-red-600 text-red-600 hover:bg-red-50"
                                  onClick={() => handleDeleteOpportunity(opportunity.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  ) : (
                    <div className="text-center py-12">
                      <Target className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold text-[#001f3f] mb-2">No Optimization Opportunities Yet</h3>
                      <p className="text-sm text-gray-600 mb-4">Start identifying tax-saving opportunities for your clients</p>
                      <Button className="bg-[#001f3f] hover:bg-[#003366]" onClick={handleAddOpportunity}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Opportunity
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
        </div>

        {isAddOpportunityModalOpen && (
          <Dialog open={isAddOpportunityModalOpen} onOpenChange={setIsAddOpportunityModalOpen}>
            <DialogContent className="max-w-2xl border-2 border-[#001f3f]">
              <DialogHeader>
                <DialogTitle className="text-[#001f3f] text-2xl font-bold">Add Optimization Opportunity</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="opp-tax-year" className="text-[#001f3f] font-semibold">Tax Year *</Label>
                  <Select 
                    value={currentOpportunity.taxYear} 
                    onValueChange={(val) => setCurrentOpportunity({...currentOpportunity, taxYear: val})}
                  >
                    <SelectTrigger className="border-[#001f3f]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getTaxYearsList().map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="opp-client" className="text-[#001f3f] font-semibold">Client Name *</Label>
                  <Input 
                    id="opp-client"
                    className="border-[#001f3f]"
                    value={currentOpportunity.client}
                    onChange={(e) => setCurrentOpportunity({...currentOpportunity, client: e.target.value})}
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <Label htmlFor="opp-opportunity" className="text-[#001f3f] font-semibold">Opportunity Type *</Label>
                  <Select 
                    value={currentOpportunity.opportunity} 
                    onValueChange={(val) => {
                      const opportunityTypes = getOpportunityTypes(currentOpportunity.taxYear)
                      const selectedType = opportunityTypes.find(t => t.value === val)
                      setCurrentOpportunity({
                        ...currentOpportunity, 
                        opportunity: val,
                        potentialSaving: selectedType?.estimatedSaving || 0
                      })
                    }}
                  >
                    <SelectTrigger className="border-[#001f3f]">
                      <SelectValue placeholder="Select opportunity type">
                        {currentOpportunity.opportunity && (() => {
                          const opportunityTypes = getOpportunityTypes(currentOpportunity.taxYear)
                          const selected = opportunityTypes.find(t => t.value === currentOpportunity.opportunity)
                          return selected ? `${selected.label} ${selected.estimatedSaving > 0 ? `(~£${selected.estimatedSaving.toLocaleString()})` : ''}` : currentOpportunity.opportunity
                        })()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {getOpportunityTypes(currentOpportunity.taxYear).map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label} {type.estimatedSaving > 0 && `(~£${type.estimatedSaving.toLocaleString()})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="opp-description" className="text-[#001f3f] font-semibold">Description</Label>
                  <textarea
                    id="opp-description"
                    className="w-full min-h-[100px] border-2 border-[#001f3f] rounded p-2"
                    value={currentOpportunity.description}
                    onChange={(e) => setCurrentOpportunity({...currentOpportunity, description: e.target.value})}
                    placeholder="Describe the optimization opportunity..."
                  />
                </div>
                <div>
                  <Label htmlFor="opp-saving" className="text-[#001f3f] font-semibold">Potential Saving (£)</Label>
                  <Input 
                    id="opp-saving"
                    type="number"
                    min="0"
                    className="border-[#001f3f]"
                    value={currentOpportunity.potentialSaving || ''}
                    onChange={(e) => setCurrentOpportunity({...currentOpportunity, potentialSaving: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <DialogFooter className="flex gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddOpportunityModalOpen(false)}>Cancel</Button>
                <Button className="bg-[#001f3f] hover:bg-[#003366]" onClick={handleSaveOpportunity}>
                  <Plus className="h-4 w-4 mr-2" />
                  Save Opportunity
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {showOptimizationDetails && selectedOpportunity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowOptimizationDetails(false)}>
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-[#001f3f]">Optimization Details</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowOptimizationDetails(false)}>✕</Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#001f3f] mb-2">Client Information</h3>
                  <p className="text-gray-700"><span className="font-medium">Name:</span> {selectedOpportunity.client}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#001f3f] mb-2">Opportunity</h3>
                  <p className="text-xl font-medium text-blue-600">{selectedOpportunity.opportunity}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#001f3f] mb-2">Description</h3>
                  <p className="text-gray-700">{selectedOpportunity.description}</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Potential Savings</h3>
                  <p className="text-3xl font-bold text-green-600">£{selectedOpportunity.potentialSaving.toLocaleString()}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#001f3f] mb-2">Implementation Steps</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Review client's current tax position and confirm eligibility</li>
                    <li>Calculate exact savings based on current year's tax rates</li>
                    <li>Prepare necessary documentation and forms</li>
                    <li>Submit required filings to HMRC</li>
                    <li>Update client records and tax return</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#001f3f] mb-2">Deadline & Considerations</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Must be applied before end of current tax year</li>
                    <li>Requires client approval and documentation</li>
                    <li>May affect other tax positions - review holistically</li>
                  </ul>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => {
                    handleApplyOptimization(selectedOpportunity)
                    setShowOptimizationDetails(false)
                  }}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Apply This Optimization
                  </Button>
                  <Button variant="outline" className="border-[#001f3f] text-[#001f3f]" onClick={() => setShowOptimizationDetails(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
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
                      <Label htmlFor="iht-tax-year" className="text-[#001f3f]">Tax Year</Label>
                      <Select value={currentIht.taxYear} onValueChange={(val) => setCurrentIht({...currentIht, taxYear: val})}>
                        <SelectTrigger className="border-[#001f3f]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getTaxYearsList().map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="estate-value" className="text-[#001f3f]">Total Estate Value (£)</Label>
                      <Input 
                        id="estate-value" 
                        type="number" 
                        placeholder="0.00" 
                        value={currentIht.estateValue || ''}
                        onChange={(e) => setCurrentIht({...currentIht, estateValue: parseFloat(e.target.value) || 0})}
                        className="border-[#001f3f]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="residence-value" className="text-[#001f3f]">Residence Value (£)</Label>
                      <Input 
                        id="residence-value" 
                        type="number" 
                        placeholder="0.00" 
                        value={currentIht.residenceValue || ''}
                        onChange={(e) => setCurrentIht({...currentIht, residenceValue: parseFloat(e.target.value) || 0})}
                        className="border-[#001f3f]"
                      />
                    </div>
                    <Button className="w-full bg-[#001f3f] hover:bg-[#003366]" onClick={handleCalculateIHT}>
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate IHT Liability
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <Card className="bg-blue-50 border-2 border-[#001f3f]">
                      <CardHeader>
                        <CardTitle className="text-lg text-[#001f3f]">IHT Calculation Results</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Tax Year</span>
                            <span className="font-semibold text-[#001f3f]">{currentIht.taxYear}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Nil Rate Band</span>
                            <span className="text-[#001f3f]">£{ihtResult.nilRateBand.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Residence NRB</span>
                            <span className="text-[#001f3f]">£{ihtResult.residenceNilRateBand.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Total NRB</span>
                            <span className="font-semibold text-[#001f3f]">£{ihtResult.totalNilRateBand.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Taxable Estate</span>
                            <span className="font-semibold text-[#001f3f]">£{ihtResult.taxableEstate.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2 border-[#001f3f]">
                            <span className="text-[#001f3f] font-semibold">IHT Due (40%)</span>
                            <span className="font-bold text-lg text-red-600">£{ihtResult.ihtDue.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[#001f3f]">Effective Rate</span>
                            <span className="text-[#001f3f]">{ihtResult.effectiveRate.toFixed(2)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {ihtCalculations.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-[#001f3f]">Saved Calculations ({ihtCalculations.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {ihtCalculations.slice(-5).reverse().map((calc: any) => (
                              <div 
                                key={calc.id} 
                                className="p-2 border border-[#001f3f] rounded-[2px] text-sm cursor-pointer hover:bg-blue-50 transition-colors"
                                onClick={() => handleViewIHTCalculation(calc)}
                              >
                                <div className="flex justify-between">
                                  <span className="text-[#001f3f] font-medium">Estate: £{calc.estateValue?.toLocaleString()}</span>
                                  <span className="text-red-600 font-semibold">IHT: £{calc.ihtDue?.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs text-gray-500">{new Date(calc.date).toLocaleDateString()}</span>
                                  <span className="text-xs text-[#001f3f]">Click for details →</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

        {/* IHT Calculation Drilldown Modal */}
        <Dialog open={showIHTDrilldown} onOpenChange={setShowIHTDrilldown}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#001f3f] pb-3">
                <h2 className="text-2xl font-bold text-[#001f3f] flex items-center gap-2">
                  <Heart className="h-6 w-6 text-red-600" />
                  IHT Calculation Details
                </h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-600 text-red-600 hover:bg-red-50"
                  onClick={() => selectedIHTCalculation && handleDeleteIHTCalculation(selectedIHTCalculation.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>

              {selectedIHTCalculation && (
                <div className="space-y-6">
                  {/* Summary Section */}
                  <Card className="bg-blue-50 border-2 border-[#001f3f]">
                    <CardHeader>
                      <CardTitle className="text-[#001f3f]">Calculation Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-[#001f3f]">
                        <span className="font-semibold text-[#001f3f]">Tax Year</span>
                        <span className="text-[#001f3f]">{selectedIHTCalculation.taxYear}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#001f3f]">
                        <span className="font-semibold text-[#001f3f]">Calculation Date</span>
                        <span className="text-[#001f3f]">{new Date(selectedIHTCalculation.date).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#001f3f]">
                        <span className="font-semibold text-[#001f3f]">Total Estate Value</span>
                        <span className="text-lg font-bold text-[#001f3f]">£{selectedIHTCalculation.estateValue?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#001f3f]">
                        <span className="font-semibold text-[#001f3f]">Residence Value</span>
                        <span className="text-[#001f3f]">£{selectedIHTCalculation.residenceValue?.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Allowances Breakdown */}
                  <Card className="border-2 border-[#001f3f]">
                    <CardHeader>
                      <CardTitle className="text-[#001f3f]">Allowances & Reliefs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <div>
                          <p className="font-medium text-[#001f3f]">Nil Rate Band (NRB)</p>
                          <p className="text-xs text-gray-600">Standard inheritance tax threshold</p>
                        </div>
                        <span className="font-semibold text-[#001f3f]">£{selectedIHTCalculation.nilRateBand?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-t border-gray-200">
                        <div>
                          <p className="font-medium text-[#001f3f]">Residence Nil Rate Band</p>
                          <p className="text-xs text-gray-600">Additional relief for main residence</p>
                        </div>
                        <span className="font-semibold text-[#001f3f]">£{selectedIHTCalculation.residenceNilRateBand?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-t-2 border-[#001f3f] bg-blue-50 px-3 rounded">
                        <div>
                          <p className="font-bold text-[#001f3f]">Total Nil Rate Band</p>
                          <p className="text-xs text-gray-600">Combined tax-free allowance</p>
                        </div>
                        <span className="text-lg font-bold text-[#001f3f]">£{selectedIHTCalculation.totalNilRateBand?.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tax Calculation */}
                  <Card className="border-2 border-[#001f3f]">
                    <CardHeader>
                      <CardTitle className="text-[#001f3f]">Tax Calculation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[#001f3f]">Total Estate Value</span>
                        <span className="font-semibold text-[#001f3f]">£{selectedIHTCalculation.estateValue?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[#001f3f]">Less: Total Nil Rate Band</span>
                        <span className="font-semibold text-red-600">- £{selectedIHTCalculation.totalNilRateBand?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-t-2 border-[#001f3f]">
                        <span className="font-bold text-[#001f3f]">Taxable Estate</span>
                        <span className="text-lg font-bold text-[#001f3f]">£{selectedIHTCalculation.taxableEstate?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-t border-gray-200">
                        <span className="text-[#001f3f]">IHT Rate</span>
                        <span className="font-semibold text-[#001f3f]">40%</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-t-2 border-[#001f3f] bg-red-50 px-3 rounded">
                        <div>
                          <p className="font-bold text-red-900 text-lg">Inheritance Tax Due</p>
                          <p className="text-xs text-red-700">Effective Rate: {selectedIHTCalculation.effectiveRate?.toFixed(2)}%</p>
                        </div>
                        <span className="text-2xl font-bold text-red-600">£{selectedIHTCalculation.ihtDue?.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mitigation Strategies */}
                  <Card className="border-2 border-[#001f3f]">
                    <CardHeader>
                      <CardTitle className="text-[#001f3f]">Potential Mitigation Strategies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="p-3 bg-green-50 border border-green-200 rounded">
                          <p className="font-semibold text-green-900">✓ Gifts and Exemptions</p>
                          <p className="text-green-700">Consider annual gift exemptions (£3,000/year) and potentially exempt transfers</p>
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                          <p className="font-semibold text-blue-900">✓ Life Insurance Trusts</p>
                          <p className="text-blue-700">Use life insurance policies in trust to cover IHT liability</p>
                        </div>
                        <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                          <p className="font-semibold text-purple-900">✓ Business & Agricultural Relief</p>
                          <p className="text-purple-700">Explore reliefs for qualifying business assets and agricultural property</p>
                        </div>
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                          <p className="font-semibold text-orange-900">✓ Charitable Donations</p>
                          <p className="text-orange-700">Donate 10% of estate to charity for reduced IHT rate (36%)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1 bg-[#001f3f] hover:bg-[#003366]"
                      onClick={() => setShowIHTDrilldown(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
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
                  Pension Annual Allowance Calculator
                </CardTitle>
                <CardDescription>Calculate your annual allowance with detailed income breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="mb-4">
                    <Label htmlFor="pension-tax-year" className="text-[#001f3f] font-semibold">Tax Year</Label>
                    <Select value={currentPension.taxYear} onValueChange={(val) => setCurrentPension({...currentPension, taxYear: val})}>
                      <SelectTrigger className="border-[#001f3f]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {getTaxYearsList().map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#001f3f] border-b-2 border-[#001f3f] pb-2">Income Sources</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employment-income" className="text-[#001f3f]">Employment Income (£)</Label>
                        <Input id="employment-income" type="number" placeholder="0.00" value={currentPension.employmentIncome || ''} onChange={(e) => setCurrentPension({...currentPension, employmentIncome: parseFloat(e.target.value) || 0})} className="border-[#001f3f]" />
                      </div>
                      <div>
                        <Label htmlFor="self-employment-income" className="text-[#001f3f]">Self-Employment Income (£)</Label>
                        <Input id="self-employment-income" type="number" placeholder="0.00" value={currentPension.selfEmploymentIncome || ''} onChange={(e) => setCurrentPension({...currentPension, selfEmploymentIncome: parseFloat(e.target.value) || 0})} className="border-[#001f3f]" />
                      </div>
                      <div>
                        <Label htmlFor="rental-income" className="text-[#001f3f]">Rental Income (£)</Label>
                        <Input id="rental-income" type="number" placeholder="0.00" value={currentPension.rentalIncome || ''} onChange={(e) => setCurrentPension({...currentPension, rentalIncome: parseFloat(e.target.value) || 0})} className="border-[#001f3f]" />
                      </div>
                      <div>
                        <Label htmlFor="dividend-income" className="text-[#001f3f]">Dividend Income (£)</Label>
                        <Input id="dividend-income" type="number" placeholder="0.00" value={currentPension.dividendIncome || ''} onChange={(e) => setCurrentPension({...currentPension, dividendIncome: parseFloat(e.target.value) || 0})} className="border-[#001f3f]" />
                      </div>
                      <div>
                        <Label htmlFor="savings-interest" className="text-[#001f3f]">Savings Interest (£)</Label>
                        <Input id="savings-interest" type="number" placeholder="0.00" value={currentPension.savingsInterest || ''} onChange={(e) => setCurrentPension({...currentPension, savingsInterest: parseFloat(e.target.value) || 0})} className="border-[#001f3f]" />
                      </div>
                      <div>
                        <Label htmlFor="pension-income" className="text-[#001f3f]">Pension Income (£)</Label>
                        <Input id="pension-income" type="number" placeholder="0.00" value={currentPension.pensionIncome || ''} onChange={(e) => setCurrentPension({...currentPension, pensionIncome: parseFloat(e.target.value) || 0})} className="border-[#001f3f]" />
                      </div>
                      <div>
                        <Label htmlFor="other-income" className="text-[#001f3f]">Other Income (£)</Label>
                        <Input id="other-income" type="number" placeholder="0.00" value={currentPension.otherIncome || ''} onChange={(e) => setCurrentPension({...currentPension, otherIncome: parseFloat(e.target.value) || 0})} className="border-[#001f3f]" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#001f3f] border-b-2 border-[#001f3f] pb-2">Pension Contributions</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="employee-contributions" className="text-[#001f3f]">Employee Contributions (£)</Label>
                        <Input id="employee-contributions" type="number" placeholder="0.00" value={currentPension.employeeContributions || ''} onChange={(e) => setCurrentPension({...currentPension, employeeContributions: parseFloat(e.target.value) || 0})} className="border-[#001f3f]" />
                        <p className="text-xs text-gray-600 mt-1">Reduces net income</p>
                      </div>
                      <div>
                        <Label htmlFor="employer-contributions" className="text-[#001f3f]">Employer Contributions (£)</Label>
                        <Input id="employer-contributions" type="number" placeholder="0.00" value={currentPension.employerContributions || ''} onChange={(e) => setCurrentPension({...currentPension, employerContributions: parseFloat(e.target.value) || 0})} className="border-[#001f3f]" />
                        <p className="text-xs text-gray-600 mt-1">Added to adjusted income</p>
                      </div>
                      <div>
                        <Label htmlFor="personal-contributions" className="text-[#001f3f]">Personal Contributions (£)</Label>
                        <Input id="personal-contributions" type="number" placeholder="0.00" value={currentPension.personalContributions || ''} onChange={(e) => setCurrentPension({...currentPension, personalContributions: parseFloat(e.target.value) || 0})} className="border-[#001f3f]" />
                        <p className="text-xs text-gray-600 mt-1">For reference only</p>
                      </div>
                    </div>
                  </div>

                  <Card className="bg-blue-50 border-2 border-[#001f3f]">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#001f3f]">Income Calculation Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[#001f3f] font-medium">Total Income</span>
                          <span className="text-[#001f3f] font-semibold">£{currentPension.totalIncome.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#001f3f]">Less: Employee Contributions</span>
                          <span className="text-red-600">-£{currentPension.employeeContributions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 border-[#001f3f]">
                          <span className="text-[#001f3f] font-medium">Net Income</span>
                          <span className="text-[#001f3f] font-semibold">£{currentPension.netIncome.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#001f3f]">Add: Employer Contributions</span>
                          <span className="text-green-600">+£{currentPension.employerContributions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t-2 pt-2 border-[#001f3f]">
                          <span className="text-[#001f3f] font-bold">Adjusted Income</span>
                          <span className="text-[#001f3f] font-bold text-lg">£{currentPension.adjustedIncome.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button className="w-full bg-[#001f3f] hover:bg-[#003366]" onClick={handleCalculatePension}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Annual Allowance
                  </Button>

                  <Card className="bg-green-50 border-2 border-green-600">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#001f3f]">Annual Allowance Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[#001f3f]">Tax Year</span>
                          <span className="font-semibold text-[#001f3f]">{currentPension.taxYear}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#001f3f]">Standard Allowance</span>
                          <span className="text-[#001f3f]">£{pensionResult.annualAllowance.toLocaleString()}</span>
                        </div>
                        {pensionResult.tapered && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-[#001f3f]">Taper Reduction</span>
                              <span className="text-red-600">-£{pensionResult.reduction.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-t pt-2 border-[#001f3f]">
                              <span className="text-[#001f3f] font-semibold">Tapered Allowance</span>
                              <span className="font-bold text-lg text-[#001f3f]">£{pensionResult.availableAllowance.toLocaleString()}</span>
                            </div>
                          </>
                        )}
                        {!pensionResult.tapered && (
                          <div className="flex justify-between border-t pt-2 border-[#001f3f]">
                            <span className="text-[#001f3f] font-semibold">Available Allowance</span>
                            <span className="font-bold text-lg text-green-600">£{pensionResult.availableAllowance.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="mt-2 p-2 bg-white rounded text-sm">
                          <p className="text-[#001f3f]">
                            {pensionResult.tapered 
                              ? `Income above taper threshold - allowance reduced to minimum of £10,000`
                              : `No tapering applied - full allowance available`}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {pensionCalculations.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-[#001f3f]">Saved Calculations ({pensionCalculations.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {pensionCalculations.slice(-5).reverse().map((calc: any) => (
                            <div key={calc.id} className="p-2 border rounded-[2px] text-sm">
                              <div className="flex justify-between">
                                <span>Adjusted Income: £{calc.adjustedIncome?.toLocaleString()}</span>
                                <span className="text-green-600">Allowance: £{calc.availableAllowance?.toLocaleString()}</span>
                              </div>
                              <div className="text-xs text-gray-500">{new Date(calc.date).toLocaleDateString()}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
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
                  <Users2 className="h-5 w-5 text-pink-600" />
                  Marriage Allowance Calculator
                </CardTitle>
                <CardDescription>Check eligibility and calculate potential tax savings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="marriage-tax-year" className="text-[#001f3f]">Tax Year</Label>
                      <Select value={marriageAllowance.taxYear} onValueChange={(val) => setMarriageAllowance({...marriageAllowance, taxYear: val})}>
                        <SelectTrigger className="border-[#001f3f]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getTaxYearsList().map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="spouse1-income" className="text-[#001f3f]">Spouse 1 Income (£)</Label>
                      <Input 
                        id="spouse1-income" 
                        type="number" 
                        placeholder="0.00" 
                        value={marriageAllowance.spouse1Income || ''}
                        onChange={(e) => setMarriageAllowance({...marriageAllowance, spouse1Income: parseFloat(e.target.value) || 0})}
                        className="border-[#001f3f]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="spouse2-income" className="text-[#001f3f]">Spouse 2 Income (£)</Label>
                      <Input 
                        id="spouse2-income" 
                        type="number" 
                        placeholder="0.00" 
                        value={marriageAllowance.spouse2Income || ''}
                        onChange={(e) => setMarriageAllowance({...marriageAllowance, spouse2Income: parseFloat(e.target.value) || 0})}
                        className="border-[#001f3f]"
                      />
                    </div>
                    <Button className="w-full bg-[#001f3f] hover:bg-[#003366]" onClick={handleCalculateMarriageAllowance}>
                      <Calculator className="h-4 w-4 mr-2" />
                      Check Eligibility
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <Card className={`border-2 ${marriageAllowance.eligible ? 'bg-green-50 border-green-600' : 'bg-red-50 border-red-600'}`}>
                      <CardHeader>
                        <CardTitle className="text-lg text-[#001f3f]">Eligibility Results</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Tax Year</span>
                            <span className="font-semibold text-[#001f3f]">{marriageAllowance.taxYear}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#001f3f]">Status</span>
                            <span className={`font-bold ${marriageAllowance.eligible ? 'text-green-600' : 'text-red-600'}`}>
                              {marriageAllowance.eligible ? '✓ Eligible' : '✗ Not Eligible'}
                            </span>
                          </div>
                          {marriageAllowance.eligible && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-[#001f3f]">Transferable Amount</span>
                                <span className="text-[#001f3f]">£{marriageAllowance.transferableAmount.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between border-t pt-2 border-green-600">
                                <span className="text-[#001f3f] font-semibold">Annual Tax Saving</span>
                                <span className="font-bold text-lg text-green-600">£{marriageAllowance.taxSaving.toFixed(2)}</span>
                              </div>
                            </>
                          )}
                          <div className="mt-2 p-2 bg-white rounded text-sm">
                            <p className="text-[#001f3f]">{marriageAllowance.reason || 'Enter income details to check eligibility'}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {familyTaxCalculations.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-[#001f3f]">Saved Calculations ({familyTaxCalculations.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {familyTaxCalculations.slice(-5).reverse().map((calc: any) => (
                              <div key={calc.id} className="p-2 border rounded-[2px] text-sm">
                                <div className="flex justify-between">
                                  <span className={calc.eligible ? 'text-green-600' : 'text-red-600'}>
                                    {calc.eligible ? '✓ Eligible' : '✗ Not Eligible'}
                                  </span>
                                  {calc.eligible && <span className="text-green-600">Saving: £{calc.taxSaving?.toFixed(2)}</span>}
                                </div>
                                <div className="text-xs text-gray-500">{new Date(calc.date).toLocaleDateString()}</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
      </div>
    )
  }


  function renderTaxPlanning() {
    const tabs = [
      { key: 'cgt', label: 'CGT Calculator', icon: Calculator },
      { key: 'optimization', label: 'Tax Optimization', icon: Target },
      { key: 'iht', label: 'IHT Planning', icon: Heart },
      { key: 'pension', label: 'Pension Planning', icon: PiggyBank },
      { key: 'marriage', label: 'Marriage Allowance', icon: Users2 }
    ]

    return (
      <div className="space-y-6">
        <div className="flex gap-1 border-b border-gray-200">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTaxPlanningTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTaxPlanningTab(tab.key)}
                className={`
                  flex items-center gap-2 px-6 py-3 font-medium rounded-t-lg transition-all
                  ${isActive 
                    ? 'bg-orange-500 text-white border-2 border-orange-500 border-b-0' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600 border-b-0'}
                `}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div>
          {activeTaxPlanningTab === 'cgt' && renderCGTCalculator()}
          {activeTaxPlanningTab === 'optimization' && renderOptimization()}
          {activeTaxPlanningTab === 'iht' && renderIHTPlanning()}
          {activeTaxPlanningTab === 'pension' && renderPensionPlanning()}
          {activeTaxPlanningTab === 'marriage' && renderFamilyTax()}
        </div>
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

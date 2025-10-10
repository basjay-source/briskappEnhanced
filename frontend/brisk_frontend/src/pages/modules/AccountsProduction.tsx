import React, { useState } from 'react'
import { 
  Building2, FileText, Calculator, Upload, Eye, BarChart3,
  Plus, Send, FileSpreadsheet, CheckCircle, ChevronDown, Settings, FileCheck,
  Edit, Trash2, Download, TrendingUp,
  Globe, Save
} from 'lucide-react'
import ResponsiveLayout from '../../components/ResponsiveLayout'
import AIPromptSection from '@/components/AIPromptSection'
import KPICard from '@/components/KPICard'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'

interface Client {
  id: string
  name: string
  type: 'sole-trader' | 'partnership' | 'limited-company' | 'llp' | 'charity' | 'academy' | 'cic'
  registrationNumber?: string
  yearEnd: string
  accountsStatus: 'not-started' | 'in-progress' | 'review' | 'completed' | 'filed'
  lastAccounts: string
  nextDue: string
  frsStandard: 'FRS 101' | 'FRS 102' | 'FRS 102 1A' | 'FRS 105' | 'IFRS'
  contactPerson: string
  email: string
  phone: string
}

interface TrialBalanceEntry {
  id: string
  accountCode: string
  accountName: string
  debit: number
  credit: number
  category: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense'
}

interface Adjustment {
  id: string
  type: 'prepayment' | 'accrual' | 'depreciation' | 'provision'
  description: string
  amount: number
  date: string
  accountCode: string
  status: 'draft' | 'approved' | 'posted'
}

interface FinancialStatement {
  id: string
  clientId: string
  type: 'balance-sheet' | 'profit-loss' | 'cash-flow'
  period: string
  generatedDate: string
  status: 'draft' | 'review' | 'finalized'
  frsStandard: string
}

const AccountsProduction: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isAILoading, setIsAILoading] = useState(false)

  const [clients, setClients] = useState<Client[]>([
    {
      id: '1', name: 'Acme Trading Ltd', type: 'limited-company',
      registrationNumber: '12345678', yearEnd: '2024-12-31',
      accountsStatus: 'in-progress', lastAccounts: '2023-12-31',
      nextDue: '2025-09-30', frsStandard: 'FRS 102',
      contactPerson: 'John Smith', email: 'john@acmetrading.com',
      phone: '020 7123 4567'
    },
    {
      id: '2', name: 'Green & Partners LLP', type: 'llp',
      registrationNumber: 'OC234567', yearEnd: '2024-03-31',
      accountsStatus: 'review', lastAccounts: '2024-03-31',
      nextDue: '2025-01-31', frsStandard: 'FRS 102',
      contactPerson: 'Sarah Green', email: 'sarah@greenpartners.com',
      phone: '020 7234 5678'
    },
    {
      id: '3', name: 'Smith & Co Solicitors', type: 'partnership',
      registrationNumber: undefined, yearEnd: '2024-04-30',
      accountsStatus: 'not-started', lastAccounts: '2023-04-30',
      nextDue: '2025-01-31', frsStandard: 'FRS 102 1A',
      contactPerson: 'David Smith', email: 'david@smithco.com',
      phone: '020 7345 6789'
    },
    {
      id: '4', name: 'Tech Innovations Ltd', type: 'limited-company',
      registrationNumber: '87654321', yearEnd: '2024-06-30',
      accountsStatus: 'in-progress', lastAccounts: '2023-06-30',
      nextDue: '2025-04-30', frsStandard: 'FRS 102 1A',
      contactPerson: 'Emma Wilson', email: 'emma@techinnovations.com',
      phone: '020 7456 7890'
    },
    {
      id: '5', name: 'Community Care CIC', type: 'cic',
      registrationNumber: 'CE123456', yearEnd: '2024-03-31',
      accountsStatus: 'completed', lastAccounts: '2024-03-31',
      nextDue: '2025-01-31', frsStandard: 'FRS 105',
      contactPerson: 'Michael Brown', email: 'michael@communitycare.org',
      phone: '020 7567 8901'
    },
    {
      id: '6', name: 'Johnson & Associates', type: 'partnership',
      registrationNumber: undefined, yearEnd: '2024-12-31',
      accountsStatus: 'filed', lastAccounts: '2023-12-31',
      nextDue: '2025-09-30', frsStandard: 'FRS 102 1A',
      contactPerson: 'Robert Johnson', email: 'robert@johnsonassociates.com',
      phone: '020 7678 9012'
    },
    {
      id: '7', name: 'Brighton Retail Ltd', type: 'limited-company',
      registrationNumber: '11223344', yearEnd: '2024-09-30',
      accountsStatus: 'review', lastAccounts: '2023-09-30',
      nextDue: '2025-07-31', frsStandard: 'FRS 105',
      contactPerson: 'Lisa Chen', email: 'lisa@brightonretail.com',
      phone: '020 7789 0123'
    }
  ])
  const [clientSearchName, setClientSearchName] = useState('')
  const [clientSearchType, setClientSearchType] = useState('')
  const [clientSearchStatus, setClientSearchStatus] = useState('')

  const [trialBalanceEntries, setTrialBalanceEntries] = useState<TrialBalanceEntry[]>([
    { id: '1', accountCode: '1000', accountName: 'Fixed Assets', debit: 250000, credit: 0, category: 'Asset' },
    { id: '2', accountCode: '1100', accountName: 'Current Assets', debit: 85000, credit: 0, category: 'Asset' },
    { id: '3', accountCode: '2000', accountName: 'Current Liabilities', debit: 0, credit: 45000, category: 'Liability' },
    { id: '4', accountCode: '3000', accountName: 'Share Capital', debit: 0, credit: 100000, category: 'Equity' },
    { id: '5', accountCode: '4000', accountName: 'Sales Revenue', debit: 0, credit: 450000, category: 'Revenue' },
    { id: '6', accountCode: '5000', accountName: 'Cost of Sales', debit: 180000, credit: 0, category: 'Expense' },
    { id: '7', accountCode: '6000', accountName: 'Operating Expenses', debit: 80000, credit: 0, category: 'Expense' }
  ])
  const [tbSearchCode, setTbSearchCode] = useState('')
  const [tbSearchName, setTbSearchName] = useState('')
  const [tbSearchCategory, setTbSearchCategory] = useState('')

  const [adjustments, setAdjustments] = useState<Adjustment[]>([
    { id: '1', type: 'prepayment', description: 'Insurance Prepayment', amount: 2400, date: '2024-12-31', accountCode: '1200', status: 'approved' },
    { id: '2', type: 'accrual', description: 'Electricity Accrual', amount: 850, date: '2024-12-31', accountCode: '2100', status: 'draft' },
    { id: '3', type: 'depreciation', description: 'Plant & Machinery Depreciation', amount: 12500, date: '2024-12-31', accountCode: '6200', status: 'approved' }
  ])
  const [adjSearchType, setAdjSearchType] = useState('')
  const [adjSearchStatus, setAdjSearchStatus] = useState('')

  const [statements, setStatements] = useState<FinancialStatement[]>([
    { id: '1', clientId: '1', type: 'balance-sheet', period: '2024', generatedDate: '2024-01-15', status: 'finalized', frsStandard: 'FRS 102' },
    { id: '2', clientId: '1', type: 'profit-loss', period: '2024', generatedDate: '2024-01-15', status: 'finalized', frsStandard: 'FRS 102' },
    { id: '3', clientId: '2', type: 'balance-sheet', period: '2024', generatedDate: '2024-01-10', status: 'review', frsStandard: 'FRS 102' }
  ])

  const [isClientViewOpen, setIsClientViewOpen] = useState(false)
  const [isClientEditOpen, setIsClientEditOpen] = useState(false)
  const [isClientAddOpen, setIsClientAddOpen] = useState(false)
  const [isClientDeleteOpen, setIsClientDeleteOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [clientFormData, setClientFormData] = useState<Partial<Client>>({})

  const [isTBViewOpen, setIsTBViewOpen] = useState(false)
  const [isTBEditOpen, setIsTBEditOpen] = useState(false)
  const [isTBAddOpen, setIsTBAddOpen] = useState(false)
  const [selectedTBEntry, setSelectedTBEntry] = useState<TrialBalanceEntry | null>(null)
  const [tbFormData, setTBFormData] = useState<Partial<TrialBalanceEntry>>({})

  const [isAdjViewOpen, setIsAdjViewOpen] = useState(false)
  const [isAdjEditOpen, setIsAdjEditOpen] = useState(false)
  const [isAdjAddOpen, setIsAdjAddOpen] = useState(false)
  const [selectedAdjustment, setSelectedAdjustment] = useState<Adjustment | null>(null)
  const [adjFormData, setAdjFormData] = useState<Partial<Adjustment>>({})

  const [isStatementViewOpen, setIsStatementViewOpen] = useState(false)
  const [isGenerateStatementOpen, setIsGenerateStatementOpen] = useState(false)
  const [selectedStatement, setSelectedStatement] = useState<FinancialStatement | null>(null)
  const [statementFormData, setStatementFormData] = useState<Partial<FinancialStatement>>({})

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

  const handleViewClient = (client: Client) => {
    setSelectedClient(client)
    setIsClientViewOpen(true)
  }

  const handleEditClient = (client: Client) => {
    setSelectedClient(client)
    setClientFormData(client)
    setIsClientEditOpen(true)
  }

  const handleAddClient = () => {
    setClientFormData({
      name: '', type: 'limited-company', yearEnd: '', accountsStatus: 'not-started',
      lastAccounts: '', nextDue: '', frsStandard: 'FRS 102',
      contactPerson: '', email: '', phone: ''
    })
    setIsClientAddOpen(true)
  }

  const handleDeleteClient = (client: Client) => {
    setSelectedClient(client)
    setIsClientDeleteOpen(true)
  }

  const handleSaveClient = () => {
    if (selectedClient) {
      setClients(clients.map(c => c.id === selectedClient.id ? { ...selectedClient, ...clientFormData } as Client : c))
    }
    setIsClientEditOpen(false)
  }

  const handleSaveNewClient = () => {
    const newClient: Client = {
      ...clientFormData as Client,
      id: Date.now().toString()
    }
    setClients([...clients, newClient])
    setIsClientAddOpen(false)
  }

  const confirmDeleteClient = () => {
    if (selectedClient) {
      setClients(clients.filter(c => c.id !== selectedClient.id))
    }
    setIsClientDeleteOpen(false)
  }

  const handleViewTBEntry = (entry: TrialBalanceEntry) => {
    setSelectedTBEntry(entry)
    setIsTBViewOpen(true)
  }

  const handleEditTBEntry = (entry: TrialBalanceEntry) => {
    setSelectedTBEntry(entry)
    setTBFormData(entry)
    setIsTBEditOpen(true)
  }

  const handleAddTBEntry = () => {
    setTBFormData({
      accountCode: '', accountName: '', debit: 0, credit: 0, category: 'Asset'
    })
    setIsTBAddOpen(true)
  }

  const handleSaveTBEntry = () => {
    if (selectedTBEntry) {
      setTrialBalanceEntries(trialBalanceEntries.map(e => 
        e.id === selectedTBEntry.id ? { ...selectedTBEntry, ...tbFormData } as TrialBalanceEntry : e
      ))
    }
    setIsTBEditOpen(false)
  }

  const handleSaveNewTBEntry = () => {
    const newEntry: TrialBalanceEntry = {
      ...tbFormData as TrialBalanceEntry,
      id: Date.now().toString()
    }
    setTrialBalanceEntries([...trialBalanceEntries, newEntry])
    setIsTBAddOpen(false)
  }

  const handleViewAdjustment = (adj: Adjustment) => {
    setSelectedAdjustment(adj)
    setIsAdjViewOpen(true)
  }

  const handleEditAdjustment = (adj: Adjustment) => {
    setSelectedAdjustment(adj)
    setAdjFormData(adj)
    setIsAdjEditOpen(true)
  }

  const handleAddAdjustment = () => {
    setAdjFormData({
      type: 'prepayment', description: '', amount: 0, date: '', accountCode: '', status: 'draft'
    })
    setIsAdjAddOpen(true)
  }

  const handleSaveAdjustment = () => {
    if (selectedAdjustment) {
      setAdjustments(adjustments.map(a => 
        a.id === selectedAdjustment.id ? { ...selectedAdjustment, ...adjFormData } as Adjustment : a
      ))
    }
    setIsAdjEditOpen(false)
  }

  const handleSaveNewAdjustment = () => {
    const newAdj: Adjustment = {
      ...adjFormData as Adjustment,
      id: Date.now().toString()
    }
    setAdjustments([...adjustments, newAdj])
    setIsAdjAddOpen(false)
  }

  const handleViewStatement = (stmt: FinancialStatement) => {
    setSelectedStatement(stmt)
    setIsStatementViewOpen(true)
  }

  const handleGenerateStatement = () => {
    setStatementFormData({
      clientId: '', type: 'balance-sheet', period: new Date().getFullYear().toString(),
      status: 'draft', frsStandard: 'FRS 102'
    })
    setIsGenerateStatementOpen(true)
  }

  const handleSaveNewStatement = () => {
    const newStatement: FinancialStatement = {
      ...statementFormData as FinancialStatement,
      id: Date.now().toString(),
      generatedDate: new Date().toISOString().split('T')[0]
    }
    setStatements([...statements, newStatement])
    setIsGenerateStatementOpen(false)
  }

  const getFilteredClients = () => {
    return clients.filter(client => {
      const matchesName = !clientSearchName || client.name.toLowerCase().includes(clientSearchName.toLowerCase())
      const matchesType = !clientSearchType || client.type === clientSearchType
      const matchesStatus = !clientSearchStatus || client.accountsStatus === clientSearchStatus
      return matchesName && matchesType && matchesStatus
    })
  }

  const getFilteredTBEntries = () => {
    return trialBalanceEntries.filter(entry => {
      const matchesCode = !tbSearchCode || entry.accountCode.includes(tbSearchCode)
      const matchesName = !tbSearchName || entry.accountName.toLowerCase().includes(tbSearchName.toLowerCase())
      const matchesCategory = !tbSearchCategory || entry.category === tbSearchCategory
      return matchesCode && matchesName && matchesCategory
    })
  }

  const getFilteredAdjustments = () => {
    return adjustments.filter(adj => {
      const matchesType = !adjSearchType || adj.type === adjSearchType
      const matchesStatus = !adjSearchStatus || adj.status === adjSearchStatus
      return matchesType && matchesStatus
    })
  }

  const menuStructure = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, hasSubTabs: false },
    {
      id: 'clients', label: 'Client Management', icon: Building2, hasSubTabs: true,
      subTabs: {
        'client-list': { label: 'Client List', icon: Building2 },
        'entity-setup': { label: 'Entity Setup', icon: Settings }
      }
    },
    {
      id: 'trial-balance', label: 'Trial Balance', icon: Calculator, hasSubTabs: true,
      subTabs: {
        'import': { label: 'Import TB', icon: Upload },
        'chart-accounts': { label: 'Chart of Accounts', icon: FileText },
        'posting': { label: 'Posting Batches', icon: Calculator },
        'review': { label: 'Review & Adjust', icon: Eye }
      }
    },
    {
      id: 'adjustments', label: 'Year-End Adjustments', icon: FileText, hasSubTabs: true,
      subTabs: {
        'journals': { label: 'Journal Entries', icon: FileText },
        'accruals': { label: 'Accruals & Prepayments', icon: Calculator },
        'depreciation': { label: 'Depreciation', icon: TrendingDown }
      }
    },
    {
      id: 'accounts', label: 'Financial Statements', icon: FileSpreadsheet, hasSubTabs: true,
      subTabs: {
        'generate': { label: 'Generate Accounts', icon: FileSpreadsheet },
        'balance-sheet': { label: 'Balance Sheet', icon: FileCheck },
        'profit-loss': { label: 'Profit & Loss', icon: TrendingUp },
        'notes': { label: 'Notes & Disclosures', icon: FileText }
      }
    },
    {
      id: 'review', label: 'Review & Validation', icon: CheckCircle, hasSubTabs: true,
      subTabs: {
        'check-finish': { label: 'Check & Finish', icon: CheckCircle },
        'approval': { label: 'Approval Workflow', icon: Eye }
      }
    },
    {
      id: 'ixbrl', label: 'iXBRL Tagging', icon: Globe, hasSubTabs: true,
      subTabs: {
        'tagging': { label: 'Tag Accounts', icon: Globe },
        'validation': { label: 'Validation', icon: CheckCircle }
      }
    },
    {
      id: 'filing', label: 'Filing & Submission', icon: Send, hasSubTabs: true,
      subTabs: {
        'companies-house': { label: 'Companies House', icon: Building2 },
        'status': { label: 'Filing Status', icon: Eye }
      }
    },
    {
      id: 'reports', label: 'Reports & Archive', icon: Download, hasSubTabs: true,
      subTabs: {
        'export': { label: 'Export Reports', icon: Download },
        'archive': { label: 'Archive', icon: Save }
      }
    }
  ]

  const handleMainTabClick = (tabKey: string) => {
    setActiveMainTab(tabKey)
    const tabConfig = menuStructure.find(item => item.id === tabKey)
    if (tabConfig && tabConfig.hasSubTabs && tabConfig.subTabs) {
      const firstSubTab = Object.keys(tabConfig.subTabs)[0]
      setActiveSubTab(firstSubTab || '')
      setExpandedCategories([tabKey])
    } else {
      setActiveSubTab('')
      setExpandedCategories([])
    }
  }

  const handleSubTabClick = (subTab: string) => {
    setActiveSubTab(subTab)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'review': return 'secondary'
      case 'in-progress': return 'outline'
      case 'not-started': return 'destructive'
      default: return 'outline'
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#001f3f]">Accounts Production Dashboard</h2>
          <p className="text-[#001f3f]">Client accounts and production workflow</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />New Client</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard title="Total Clients" value={clients.length.toString()} 
          change="+3 this month" icon={Building2} color="text-blue-600" />
        <KPICard title="In Progress" 
          value={clients.filter(c => c.accountsStatus === 'in-progress').length.toString()} 
          change="Active" icon={FileText} color="text-orange-600" />
        <KPICard title="Review" 
          value={clients.filter(c => c.accountsStatus === 'review').length.toString()}
          change="Pending" icon={Eye} color="text-blue-600" />
        <KPICard title="Completed" 
          value={clients.filter(c => c.accountsStatus === 'completed').length.toString()}
          change="Ready" icon={CheckCircle} color="text-green-600" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Client Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead className="text-[#001f3f]">Client</TableHead>
              <TableHead className="text-[#001f3f]">Type</TableHead>
              <TableHead className="text-[#001f3f]">Year End</TableHead>
              <TableHead className="text-[#001f3f]">Status</TableHead>
              <TableHead className="text-[#001f3f]">Due Date</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {clients.map(client => (
                <TableRow key={client.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="text-[#001f3f] font-semibold">{client.name}</TableCell>
                  <TableCell className="text-[#001f3f]">{client.type}</TableCell>
                  <TableCell className="text-[#001f3f]">{client.yearEnd}</TableCell>
                  <TableCell><Badge variant={getStatusBadge(client.accountsStatus)}>{client.accountsStatus}</Badge></TableCell>
                  <TableCell className="text-[#001f3f]">{client.nextDue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderClientManagement = () => {
    const filteredClients = getFilteredClients()
    
    if (activeSubTab === 'client-list') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#001f3f]">Client Management</h2>
              <p className="text-[#001f3f]">Manage client accounts and entity details</p>
            </div>
            <Button onClick={handleAddClient} className="bg-[#001f3f] hover:bg-[#003366]">
              <Plus className="h-4 w-4 mr-2" />Add Client
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Client List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[#001f3f]">
                      <div className="space-y-2">
                        <div>Client Name</div>
                        <Input
                          placeholder="Search..."
                          value={clientSearchName}
                          onChange={(e) => setClientSearchName(e.target.value)}
                          className="h-8 text-xs"
                        />
                      </div>
                    </TableHead>
                    <TableHead className="text-[#001f3f]">
                      <div className="space-y-2">
                        <div>Type</div>
                        <Select value={clientSearchType} onValueChange={setClientSearchType}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All</SelectItem>
                            <SelectItem value="limited-company">Limited Company</SelectItem>
                            <SelectItem value="llp">LLP</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="sole-trader">Sole Trader</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableHead>
                    <TableHead className="text-[#001f3f]">Year End</TableHead>
                    <TableHead className="text-[#001f3f]">
                      <div className="space-y-2">
                        <div>Status</div>
                        <Select value={clientSearchStatus} onValueChange={setClientSearchStatus}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All</SelectItem>
                            <SelectItem value="not-started">Not Started</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="review">Review</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableHead>
                    <TableHead className="text-[#001f3f]">Due Date</TableHead>
                    <TableHead className="text-[#001f3f]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map(client => (
                    <TableRow key={client.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell 
                        className="text-[#001f3f] font-semibold"
                        onClick={() => handleViewClient(client)}
                      >
                        {client.name}
                      </TableCell>
                      <TableCell className="text-[#001f3f]">{client.type}</TableCell>
                      <TableCell className="text-[#001f3f]">{client.yearEnd}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(client.accountsStatus)}>
                          {client.accountsStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#001f3f]">{client.nextDue}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditClient(client)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteClient(client)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )
    }
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#001f3f]">Entity Setup</h2>
        <p className="text-[#001f3f]">Configure entity-specific accounting settings and compliance requirements</p>
      </div>
    )
  }

  const renderTrialBalance = () => {
    const filteredEntries = getFilteredTBEntries()
    const totalDebit = filteredEntries.reduce((sum, entry) => sum + entry.debit, 0)
    const totalCredit = filteredEntries.reduce((sum, entry) => sum + entry.credit, 0)
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#001f3f]">Trial Balance</h2>
            <p className="text-[#001f3f]">Import and review trial balance entries</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />Import TB
            </Button>
            <Button onClick={handleAddTBEntry} className="bg-[#001f3f] hover:bg-[#003366]">
              <Plus className="h-4 w-4 mr-2" />Add Entry
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-[#001f3f]">Total Debits</div>
              <div className="text-2xl font-bold text-[#001f3f]">
                £{totalDebit.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-[#001f3f]">Total Credits</div>
              <div className="text-2xl font-bold text-[#001f3f]">
                £{totalCredit.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-[#001f3f]">Difference</div>
              <div className={`text-2xl font-bold ${Math.abs(totalDebit - totalCredit) < 0.01 ? 'text-green-600' : 'text-red-600'}`}>
                £{Math.abs(totalDebit - totalCredit).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Trial Balance Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#001f3f]">
                    <div className="space-y-2">
                      <div>Code</div>
                      <Input
                        placeholder="Search..."
                        value={tbSearchCode}
                        onChange={(e) => setTbSearchCode(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                  </TableHead>
                  <TableHead className="text-[#001f3f]">
                    <div className="space-y-2">
                      <div>Account Name</div>
                      <Input
                        placeholder="Search..."
                        value={tbSearchName}
                        onChange={(e) => setTbSearchName(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                  </TableHead>
                  <TableHead className="text-[#001f3f]">
                    <div className="space-y-2">
                      <div>Category</div>
                      <Select value={tbSearchCategory} onValueChange={setTbSearchCategory}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All</SelectItem>
                          <SelectItem value="Asset">Asset</SelectItem>
                          <SelectItem value="Liability">Liability</SelectItem>
                          <SelectItem value="Equity">Equity</SelectItem>
                          <SelectItem value="Revenue">Revenue</SelectItem>
                          <SelectItem value="Expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-[#001f3f]">Debit</TableHead>
                  <TableHead className="text-right text-[#001f3f]">Credit</TableHead>
                  <TableHead className="text-[#001f3f]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map(entry => (
                  <TableRow 
                    key={entry.id} 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleViewTBEntry(entry)}
                  >
                    <TableCell className="text-[#001f3f] font-mono">{entry.accountCode}</TableCell>
                    <TableCell className="text-[#001f3f]">{entry.accountName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{entry.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-[#001f3f]">
                      {entry.debit > 0 ? `£${entry.debit.toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell className="text-right text-[#001f3f]">
                      {entry.credit > 0 ? `£${entry.credit.toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditTBEntry(entry)
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderAdjustments = () => {
    const filteredAdj = getFilteredAdjustments()
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#001f3f]">Year-End Adjustments</h2>
            <p className="text-[#001f3f]">Manage prepayments, accruals, depreciation, and provisions</p>
          </div>
          <Button onClick={handleAddAdjustment} className="bg-[#001f3f] hover:bg-[#003366]">
            <Plus className="h-4 w-4 mr-2" />Add Adjustment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Adjustments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#001f3f]">
                    <div className="space-y-2">
                      <div>Type</div>
                      <Select value={adjSearchType} onValueChange={setAdjSearchType}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All</SelectItem>
                          <SelectItem value="prepayment">Prepayment</SelectItem>
                          <SelectItem value="accrual">Accrual</SelectItem>
                          <SelectItem value="depreciation">Depreciation</SelectItem>
                          <SelectItem value="provision">Provision</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableHead>
                  <TableHead className="text-[#001f3f]">Description</TableHead>
                  <TableHead className="text-right text-[#001f3f]">Amount</TableHead>
                  <TableHead className="text-[#001f3f]">Date</TableHead>
                  <TableHead className="text-[#001f3f]">
                    <div className="space-y-2">
                      <div>Status</div>
                      <Select value={adjSearchStatus} onValueChange={setAdjSearchStatus}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="posted">Posted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableHead>
                  <TableHead className="text-[#001f3f]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdj.map(adj => (
                  <TableRow 
                    key={adj.id} 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleViewAdjustment(adj)}
                  >
                    <TableCell>
                      <Badge variant="outline">{adj.type}</Badge>
                    </TableCell>
                    <TableCell className="text-[#001f3f]">{adj.description}</TableCell>
                    <TableCell className="text-right text-[#001f3f]">
                      £{adj.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-[#001f3f]">{adj.date}</TableCell>
                    <TableCell>
                      <Badge variant={adj.status === 'approved' ? 'default' : 'secondary'}>
                        {adj.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditAdjustment(adj)
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderStatements = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#001f3f]">Financial Statements</h2>
            <p className="text-[#001f3f]">Generate and manage statutory accounts</p>
          </div>
          <Button onClick={handleGenerateStatement} className="bg-[#001f3f] hover:bg-[#003366]">
            <Plus className="h-4 w-4 mr-2" />Generate Statement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <FileSpreadsheet className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-[#001f3f]">Balance Sheet</h3>
              <p className="text-sm text-[#001f3f]">Statement of financial position</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <FileText className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-[#001f3f]">Profit & Loss</h3>
              <p className="text-sm text-[#001f3f]">Income statement</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-[#001f3f]">Cash Flow</h3>
              <p className="text-sm text-[#001f3f]">Statement of cash flows</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Generated Statements</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#001f3f]">Client</TableHead>
                  <TableHead className="text-[#001f3f]">Type</TableHead>
                  <TableHead className="text-[#001f3f]">Period</TableHead>
                  <TableHead className="text-[#001f3f]">Generated</TableHead>
                  <TableHead className="text-[#001f3f]">Status</TableHead>
                  <TableHead className="text-[#001f3f]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statements.map(stmt => {
                  const client = clients.find(c => c.id === stmt.clientId)
                  return (
                    <TableRow 
                      key={stmt.id} 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleViewStatement(stmt)}
                    >
                      <TableCell className="text-[#001f3f]">{client?.name || 'Unknown'}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{stmt.type}</Badge>
                      </TableCell>
                      <TableCell className="text-[#001f3f]">{stmt.period}</TableCell>
                      <TableCell className="text-[#001f3f]">{stmt.generatedDate}</TableCell>
                      <TableCell>
                        <Badge variant={stmt.status === 'finalized' ? 'default' : 'secondary'}>
                          {stmt.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderFiling = () => {
    if (activeSubTab === 'companies-house') {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#001f3f]">Companies House Filing</h2>
            <p className="text-[#001f3f]">Submit annual accounts and confirmations to Companies House</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <FileCheck className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-semibold text-[#001f3f]">Annual Accounts (AA01)</h3>
                <p className="text-sm text-[#001f3f]">File statutory accounts</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-semibold text-[#001f3f]">Confirmation Statement (CS01)</h3>
                <p className="text-sm text-[#001f3f]">Annual confirmation of company details</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Filing History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#001f3f]">Recent Companies House submissions will appear here</p>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#00703c]">HMRC Filing</h2>
          <p className="text-[#00703c]">Submit tax computations and iXBRL accounts to HMRC</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-[#00703c]">
            <CardContent className="pt-6">
              <FileText className="h-8 w-8 text-[#00703c] mb-2" />
              <h3 className="font-semibold text-[#00703c]">Corporation Tax (CT600)</h3>
              <p className="text-sm text-[#00703c]">File CT600 return with computations</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-[#00703c]">
            <CardContent className="pt-6">
              <Globe className="h-8 w-8 text-[#00703c] mb-2" />
              <h3 className="font-semibold text-[#00703c]">iXBRL Accounts</h3>
              <p className="text-sm text-[#00703c]">Tagged accounts for HMRC</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#00703c]">
          <CardHeader>
            <CardTitle className="text-[#00703c]">HMRC Filing History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#00703c]">Recent HMRC submissions will appear here</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderMainContent = () => {
    if (activeMainTab === 'dashboard') return renderDashboard()
    if (activeMainTab === 'clients') return renderClientManagement()
    if (activeMainTab === 'trial-balance') {
      if (activeSubTab === 'import') {
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#001f3f]">Import Trial Balance</h2>
            <p className="text-[#001f3f]">Upload trial balance from accounting software</p>
            <Card>
              <CardContent className="pt-6">
                <Button className="bg-[#001f3f] hover:bg-[#003366]">
                  <Upload className="h-4 w-4 mr-2" />Upload File
                </Button>
              </CardContent>
            </Card>
          </div>
        )
      }
      return renderTrialBalance()
    }
    if (activeMainTab === 'adjustments') return renderAdjustments()
    if (activeMainTab === 'accounts') return renderStatements()
    if (activeMainTab === 'filing') return renderFiling()
    
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-[#001f3f] mb-4">
          {menuStructure.find(m => m.id === activeMainTab)?.label}
        </h3>
        <p className="text-[#001f3f]">Content implementation in progress...</p>
      </div>
    )
  }

  return (
    <ResponsiveLayout>
      <div className="flex h-full">
        <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="p-2">
            <nav className="space-y-0.5">
              {menuStructure.map((config) => {
                const Icon = config.icon
                const isExpanded = expandedCategories.includes(config.id)
                const isActive = activeMainTab === config.id
                return (
                  <div key={config.id}>
                    <button onClick={() => handleMainTabClick(config.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 m-0.5 text-sm rounded-[2px] transition-all shadow-sm ${
                        isActive && !config.hasSubTabs
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold'
                          : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 font-medium'
                      }`}>
                      <div className="flex items-center"><Icon className="h-4 w-4 mr-2" />{config.label}</div>
                      {config.hasSubTabs && <ChevronDown className={`h-4 w-4 ${isExpanded ? 'rotate-180' : ''}`} />}
                    </button>
                    {config.hasSubTabs && isExpanded && config.subTabs && (
                      <div className="ml-0.5 mt-0.5 space-y-0.5">
                        {Object.entries(config.subTabs).map(([subKey, subConfig]) => {
                          const isSubActive = activeSubTab === subKey
                          return (
                            <button key={subKey} onClick={() => handleSubTabClick(subKey)}
                              className={`w-full px-3 py-2 m-0.5 text-sm rounded-[2px] ${
                                isSubActive
                                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold'
                                  : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 font-medium'
                              }`}>
                              {subConfig.label}
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
            <div className="mt-8">
              <AIPromptSection title="Ask your Accountant"
                description="Get expert guidance on accounts production and compliance"
                placeholder="Ask about FRS standards, iXBRL tagging, Companies House filing..."
                isLoading={isAILoading} onSubmit={handleAIQuestion}
                recentQuestions={[
                  "How do I apply FRS 102 Section 1A?",
                  "What's required for Companies House filing?"
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isClientViewOpen} onOpenChange={setIsClientViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Client Details</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f]">Client Name</Label>
                  <p className="text-[#001f3f] font-semibold">{selectedClient.name}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f]">Entity Type</Label>
                  <p className="text-[#001f3f]">{selectedClient.type}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f]">Registration Number</Label>
                  <p className="text-[#001f3f]">{selectedClient.registrationNumber || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f]">Year End</Label>
                  <p className="text-[#001f3f]">{selectedClient.yearEnd}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f]">Accounts Status</Label>
                  <Badge variant={getStatusBadge(selectedClient.accountsStatus)}>
                    {selectedClient.accountsStatus}
                  </Badge>
                </div>
                <div>
                  <Label className="text-[#001f3f]">FRS Standard</Label>
                  <p className="text-[#001f3f]">{selectedClient.frsStandard}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f]">Contact Person</Label>
                  <p className="text-[#001f3f]">{selectedClient.contactPerson}</p>
                </div>
                <div>
                  <Label className="text-[#001f3f]">Email</Label>
                  <p className="text-[#001f3f]">{selectedClient.email}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsClientViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isClientEditOpen} onOpenChange={setIsClientEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Edit Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#001f3f]">Client Name</Label>
                <Input
                  value={clientFormData.name || ''}
                  onChange={(e) => setClientFormData({...clientFormData, name: e.target.value})}
                  className="text-[#001f3f]"
                />
              </div>
              <div>
                <Label className="text-[#001f3f]">Entity Type</Label>
                <Select 
                  value={clientFormData.type} 
                  onValueChange={(value) => setClientFormData({...clientFormData, type: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="limited-company">Limited Company</SelectItem>
                    <SelectItem value="llp">LLP</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="sole-trader">Sole Trader</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[#001f3f]">Year End</Label>
                <Input
                  type="date"
                  value={clientFormData.yearEnd || ''}
                  onChange={(e) => setClientFormData({...clientFormData, yearEnd: e.target.value})}
                  className="text-[#001f3f]"
                />
              </div>
              <div>
                <Label className="text-[#001f3f]">Contact Person</Label>
                <Input
                  value={clientFormData.contactPerson || ''}
                  onChange={(e) => setClientFormData({...clientFormData, contactPerson: e.target.value})}
                  className="text-[#001f3f]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsClientEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveClient} className="bg-[#001f3f] hover:bg-[#003366]">
              <Save className="h-4 w-4 mr-2" />Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isClientAddOpen} onOpenChange={setIsClientAddOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Add New Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#001f3f]">Client Name</Label>
                <Input
                  value={clientFormData.name || ''}
                  onChange={(e) => setClientFormData({...clientFormData, name: e.target.value})}
                  className="text-[#001f3f]"
                />
              </div>
              <div>
                <Label className="text-[#001f3f]">Entity Type</Label>
                <Select 
                  value={clientFormData.type} 
                  onValueChange={(value) => setClientFormData({...clientFormData, type: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="limited-company">Limited Company</SelectItem>
                    <SelectItem value="llp">LLP</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="sole-trader">Sole Trader</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[#001f3f]">Year End</Label>
                <Input
                  type="date"
                  value={clientFormData.yearEnd || ''}
                  onChange={(e) => setClientFormData({...clientFormData, yearEnd: e.target.value})}
                  className="text-[#001f3f]"
                />
              </div>
              <div>
                <Label className="text-[#001f3f]">Contact Person</Label>
                <Input
                  value={clientFormData.contactPerson || ''}
                  onChange={(e) => setClientFormData({...clientFormData, contactPerson: e.target.value})}
                  className="text-[#001f3f]"
                />
              </div>
              <div>
                <Label className="text-[#001f3f]">Email</Label>
                <Input
                  type="email"
                  value={clientFormData.email || ''}
                  onChange={(e) => setClientFormData({...clientFormData, email: e.target.value})}
                  className="text-[#001f3f]"
                />
              </div>
              <div>
                <Label className="text-[#001f3f]">Phone</Label>
                <Input
                  value={clientFormData.phone || ''}
                  onChange={(e) => setClientFormData({...clientFormData, phone: e.target.value})}
                  className="text-[#001f3f]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsClientAddOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveNewClient} className="bg-[#001f3f] hover:bg-[#003366]">
              <Plus className="h-4 w-4 mr-2" />Add Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTBEditOpen} onOpenChange={setIsTBEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Edit Trial Balance Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-[#001f3f]">Account Code</Label>
              <Input
                value={tbFormData.accountCode || ''}
                onChange={(e) => setTBFormData({...tbFormData, accountCode: e.target.value})}
                className="text-[#001f3f]"
              />
            </div>
            <div>
              <Label className="text-[#001f3f]">Account Name</Label>
              <Input
                value={tbFormData.accountName || ''}
                onChange={(e) => setTBFormData({...tbFormData, accountName: e.target.value})}
                className="text-[#001f3f]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#001f3f]">Debit</Label>
                <Input
                  type="number"
                  value={tbFormData.debit || 0}
                  onChange={(e) => setTBFormData({...tbFormData, debit: parseFloat(e.target.value)})}
                  className="text-[#001f3f]"
                />
              </div>
              <div>
                <Label className="text-[#001f3f]">Credit</Label>
                <Input
                  type="number"
                  value={tbFormData.credit || 0}
                  onChange={(e) => setTBFormData({...tbFormData, credit: parseFloat(e.target.value)})}
                  className="text-[#001f3f]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTBEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveTBEntry} className="bg-[#001f3f] hover:bg-[#003366]">
              <Save className="h-4 w-4 mr-2" />Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAdjEditOpen} onOpenChange={setIsAdjEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">Edit Adjustment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-[#001f3f]">Type</Label>
              <Select 
                value={adjFormData.type} 
                onValueChange={(value) => setAdjFormData({...adjFormData, type: value as any})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prepayment">Prepayment</SelectItem>
                  <SelectItem value="accrual">Accrual</SelectItem>
                  <SelectItem value="depreciation">Depreciation</SelectItem>
                  <SelectItem value="provision">Provision</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[#001f3f]">Description</Label>
              <Textarea
                value={adjFormData.description || ''}
                onChange={(e) => setAdjFormData({...adjFormData, description: e.target.value})}
                className="text-[#001f3f]"
              />
            </div>
            <div>
              <Label className="text-[#001f3f]">Amount</Label>
              <Input
                type="number"
                value={adjFormData.amount || 0}
                onChange={(e) => setAdjFormData({...adjFormData, amount: parseFloat(e.target.value)})}
                className="text-[#001f3f]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdjEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAdjustment} className="bg-[#001f3f] hover:bg-[#003366]">
              <Save className="h-4 w-4 mr-2" />Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ResponsiveLayout>
  )
}

export default AccountsProduction

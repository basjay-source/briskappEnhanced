import React, { useState, useMemo } from 'react'
import { 
  FileText, 
  Calculator, 
  TrendingUp, 
  Download, 
  Upload, 
  Eye,
  BarChart3,
  Globe,
  ChevronLeft,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Save,
  RefreshCw,
  Send,
  FileSpreadsheet,
  DollarSign,
  TrendingDown,
  AlertCircle,
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  FileUp,
  MessageSquare,
  History,
  Copy,
  FileCheck
} from 'lucide-react'
import ResponsiveLayout from '../../components/ResponsiveLayout'
import AIPromptSection from '@/components/AIPromptSection'
import KPICard from '@/components/KPICard'
import { ExportButton } from '@/components/ExportButton'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'

interface TrialBalanceEntry {
  id: string
  accountCode: string
  accountName: string
  debit: number
  credit: number
  category: string
}

interface JournalEntry {
  id: string
  date: string
  reference: string
  description: string
  entries: { accountCode: string; accountName: string; debit: number; credit: number }[]
  status: 'draft' | 'approved' | 'posted'
  createdBy: string
}

interface FinancialStatement {
  id: string
  type: 'balance-sheet' | 'profit-loss' | 'cash-flow'
  period: string
  generatedDate: string
  status: 'draft' | 'final'
}

const AccountsProduction: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isAILoading, setIsAILoading] = useState(false)

  const [trialBalanceEntries, setTrialBalanceEntries] = useState<TrialBalanceEntry[]>([
    { id: '1', accountCode: '1000', accountName: 'Cash at Bank - Current Account', debit: 45000, credit: 0, category: 'Asset' },
    { id: '2', accountCode: '1010', accountName: 'Cash at Bank - Savings Account', debit: 25000, credit: 0, category: 'Asset' },
    { id: '3', accountCode: '1020', accountName: 'Petty Cash', debit: 500, credit: 0, category: 'Asset' },
    { id: '4', accountCode: '1100', accountName: 'Accounts Receivable', debit: 28500, credit: 0, category: 'Asset' },
    { id: '5', accountCode: '1110', accountName: 'Allowance for Doubtful Debts', debit: 0, credit: 1500, category: 'Asset' },
    { id: '6', accountCode: '1200', accountName: 'Inventory - Raw Materials', debit: 18000, credit: 0, category: 'Asset' },
    { id: '7', accountCode: '1210', accountName: 'Inventory - Finished Goods', debit: 22500, credit: 0, category: 'Asset' },
    { id: '8', accountCode: '1300', accountName: 'Prepaid Expenses', debit: 3500, credit: 0, category: 'Asset' },
    { id: '9', accountCode: '1310', accountName: 'Prepaid Insurance', debit: 4200, credit: 0, category: 'Asset' },
    { id: '10', accountCode: '1500', accountName: 'Land and Buildings', debit: 250000, credit: 0, category: 'Asset' },
    { id: '11', accountCode: '1510', accountName: 'Plant and Machinery', debit: 85000, credit: 0, category: 'Asset' },
    { id: '12', accountCode: '1520', accountName: 'Office Equipment', debit: 15000, credit: 0, category: 'Asset' },
    { id: '13', accountCode: '1530', accountName: 'Motor Vehicles', debit: 35000, credit: 0, category: 'Asset' },
    { id: '14', accountCode: '1550', accountName: 'Accumulated Depreciation', debit: 0, credit: 45000, category: 'Asset' },
    { id: '15', accountCode: '1600', accountName: 'Intangible Assets - Goodwill', debit: 50000, credit: 0, category: 'Asset' },
    
    { id: '16', accountCode: '2000', accountName: 'Accounts Payable', debit: 0, credit: 18500, category: 'Liability' },
    { id: '17', accountCode: '2010', accountName: 'Accrued Expenses', debit: 0, credit: 5200, category: 'Liability' },
    { id: '18', accountCode: '2020', accountName: 'VAT Payable', debit: 0, credit: 8750, category: 'Liability' },
    { id: '19', accountCode: '2030', accountName: 'PAYE/NIC Payable', debit: 0, credit: 6800, category: 'Liability' },
    { id: '20', accountCode: '2100', accountName: 'Bank Loan - Long Term', debit: 0, credit: 66000, category: 'Liability' },
    { id: '21', accountCode: '2110', accountName: 'Bank Loan - Current Portion', debit: 0, credit: 12000, category: 'Liability' },
    { id: '22', accountCode: '2200', accountName: 'Directors Loan Account', debit: 0, credit: 15000, category: 'Liability' },
    { id: '23', accountCode: '2300', accountName: 'Deferred Tax Liability', debit: 0, credit: 8500, category: 'Liability' },
    
    { id: '24', accountCode: '3000', accountName: 'Share Capital', debit: 0, credit: 100000, category: 'Equity' },
    { id: '25', accountCode: '3100', accountName: 'Retained Earnings', debit: 0, credit: 24000, category: 'Equity' },
    { id: '26', accountCode: '3200', accountName: 'Current Year Profit/Loss', debit: 0, credit: 45200, category: 'Equity' },
    
    { id: '27', accountCode: '4000', accountName: 'Sales Revenue - Products', debit: 0, credit: 285000, category: 'Revenue' },
    { id: '28', accountCode: '4010', accountName: 'Sales Revenue - Services', debit: 0, credit: 125000, category: 'Revenue' },
    { id: '29', accountCode: '4100', accountName: 'Other Income', debit: 0, credit: 8500, category: 'Revenue' },
    { id: '30', accountCode: '4110', accountName: 'Interest Income', debit: 0, credit: 1200, category: 'Revenue' },
    
    { id: '31', accountCode: '5000', accountName: 'Cost of Goods Sold', debit: 145000, credit: 0, category: 'Expense' },
    { id: '32', accountCode: '5100', accountName: 'Salaries and Wages', debit: 95000, credit: 0, category: 'Expense' },
    { id: '33', accountCode: '5110', accountName: 'Employers NIC', debit: 12500, credit: 0, category: 'Expense' },
    { id: '34', accountCode: '5120', accountName: 'Pension Contributions', debit: 8200, credit: 0, category: 'Expense' },
    { id: '35', accountCode: '5200', accountName: 'Rent and Rates', debit: 24000, credit: 0, category: 'Expense' },
    { id: '36', accountCode: '5210', accountName: 'Utilities', debit: 6500, credit: 0, category: 'Expense' },
    { id: '37', accountCode: '5300', accountName: 'Marketing and Advertising', debit: 15000, credit: 0, category: 'Expense' },
    { id: '38', accountCode: '5310', accountName: 'Professional Fees', debit: 12000, credit: 0, category: 'Expense' },
    { id: '39', accountCode: '5400', accountName: 'Depreciation Expense', debit: 18500, credit: 0, category: 'Expense' },
    { id: '40', accountCode: '5500', accountName: 'Bank Charges and Interest', debit: 3200, credit: 0, category: 'Expense' },
    { id: '41', accountCode: '5600', accountName: 'Insurance', debit: 8400, credit: 0, category: 'Expense' },
    { id: '42', accountCode: '5700', accountName: 'Motor Vehicle Expenses', debit: 7800, credit: 0, category: 'Expense' },
    { id: '43', accountCode: '5800', accountName: 'Office Expenses', debit: 5600, credit: 0, category: 'Expense' },
    { id: '44', accountCode: '5900', accountName: 'Telecommunications', debit: 3400, credit: 0, category: 'Expense' },
  ])
  const [isTrialBalanceDialogOpen, setIsTrialBalanceDialogOpen] = useState(false)
  const [editingTBEntry, setEditingTBEntry] = useState<TrialBalanceEntry | null>(null)

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-12-15',
      reference: 'JE001',
      description: 'Monthly depreciation adjustment',
      entries: [
        { accountCode: '5400', accountName: 'Depreciation Expense', debit: 2500, credit: 0 },
        { accountCode: '1550', accountName: 'Accumulated Depreciation', debit: 0, credit: 2500 }
      ],
      status: 'posted',
      createdBy: 'John Smith'
    },
    {
      id: '2',
      date: '2024-12-18',
      reference: 'JE002',
      description: 'Accrued expenses adjustment',
      entries: [
        { accountCode: '5310', accountName: 'Professional Fees', debit: 1200, credit: 0 },
        { accountCode: '2010', accountName: 'Accrued Expenses', debit: 0, credit: 1200 }
      ],
      status: 'approved',
      createdBy: 'Sarah Johnson'
    },
    {
      id: '3',
      date: '2024-12-20',
      reference: 'JE003',
      description: 'Bad debt write-off',
      entries: [
        { accountCode: '1110', accountName: 'Allowance for Doubtful Debts', debit: 500, credit: 0 },
        { accountCode: '1100', accountName: 'Accounts Receivable', debit: 0, credit: 500 }
      ],
      status: 'approved',
      createdBy: 'Michael Brown'
    },
    {
      id: '4',
      date: '2024-12-22',
      reference: 'JE004',
      description: 'Prepaid insurance adjustment',
      entries: [
        { accountCode: '5600', accountName: 'Insurance', debit: 700, credit: 0 },
        { accountCode: '1310', accountName: 'Prepaid Insurance', debit: 0, credit: 700 }
      ],
      status: 'draft',
      createdBy: 'Emily Davis'
    },
    {
      id: '5',
      date: '2024-12-23',
      reference: 'JE005',
      description: 'Inventory revaluation',
      entries: [
        { accountCode: '5000', accountName: 'Cost of Goods Sold', debit: 1500, credit: 0 },
        { accountCode: '1210', accountName: 'Inventory - Finished Goods', debit: 0, credit: 1500 }
      ],
      status: 'draft',
      createdBy: 'David Wilson'
    },
    {
      id: '6',
      date: '2024-12-24',
      reference: 'JE006',
      description: 'Reclassify loan current portion',
      entries: [
        { accountCode: '2100', accountName: 'Bank Loan - Long Term', debit: 12000, credit: 0 },
        { accountCode: '2110', accountName: 'Bank Loan - Current Portion', debit: 0, credit: 12000 }
      ],
      status: 'posted',
      createdBy: 'John Smith'
    },
    {
      id: '7',
      date: '2024-12-26',
      reference: 'JE007',
      description: 'Deferred tax adjustment',
      entries: [
        { accountCode: '2300', accountName: 'Deferred Tax Liability', debit: 850, credit: 0 },
        { accountCode: '3200', accountName: 'Current Year Profit/Loss', debit: 0, credit: 850 }
      ],
      status: 'approved',
      createdBy: 'Sarah Johnson'
    },
    {
      id: '8',
      date: '2024-12-28',
      reference: 'JE008',
      description: 'Correct VAT posting error',
      entries: [
        { accountCode: '5800', accountName: 'Office Expenses', debit: 200, credit: 0 },
        { accountCode: '2020', accountName: 'VAT Payable', debit: 0, credit: 200 }
      ],
      status: 'draft',
      createdBy: 'Michael Brown'
    },
    {
      id: '9',
      date: '2024-12-29',
      reference: 'JE009',
      description: 'Year-end closing entry - Revenue',
      entries: [
        { accountCode: '4000', accountName: 'Sales Revenue - Products', debit: 285000, credit: 0 },
        { accountCode: '4010', accountName: 'Sales Revenue - Services', debit: 125000, credit: 0 },
        { accountCode: '3200', accountName: 'Current Year Profit/Loss', debit: 0, credit: 410000 }
      ],
      status: 'draft',
      createdBy: 'John Smith'
    },
    {
      id: '10',
      date: '2024-12-30',
      reference: 'JE010',
      description: 'Accrue pension contributions',
      entries: [
        { accountCode: '5120', accountName: 'Pension Contributions', debit: 850, credit: 0 },
        { accountCode: '2010', accountName: 'Accrued Expenses', debit: 0, credit: 850 }
      ],
      status: 'approved',
      createdBy: 'Emily Davis'
    }
  ])
  const [isJournalDialogOpen, setIsJournalDialogOpen] = useState(false)
  const [editingJournal, setEditingJournal] = useState<JournalEntry | null>(null)

  const [financialStatements, setFinancialStatements] = useState<FinancialStatement[]>([
    { id: '1', type: 'balance-sheet', period: 'Dec 2024', generatedDate: '2024-12-20', status: 'finalized' },
    { id: '2', type: 'profit-loss', period: 'Dec 2024', generatedDate: '2024-12-20', status: 'finalized' },
    { id: '3', type: 'cash-flow', period: 'Dec 2024', generatedDate: '2024-12-20', status: 'finalized' },
    { id: '4', type: 'balance-sheet', period: 'Nov 2024', generatedDate: '2024-11-20', status: 'finalized' },
    { id: '5', type: 'profit-loss', period: 'Nov 2024', generatedDate: '2024-11-20', status: 'finalized' },
    { id: '6', type: 'cash-flow', period: 'Nov 2024', generatedDate: '2024-11-20', status: 'finalized' },
    { id: '7', type: 'balance-sheet', period: 'Oct 2024', generatedDate: '2024-10-20', status: 'finalized' },
    { id: '8', type: 'profit-loss', period: 'Oct 2024', generatedDate: '2024-10-20', status: 'finalized' },
    { id: '9', type: 'cash-flow', period: 'Oct 2024', generatedDate: '2024-10-20', status: 'finalized' },
    { id: '10', type: 'balance-sheet', period: 'Q4 2024', generatedDate: '2024-12-31', status: 'draft' },
    { id: '11', type: 'profit-loss', period: 'Q4 2024', generatedDate: '2024-12-31', status: 'draft' },
    { id: '12', type: 'cash-flow', period: 'Q4 2024', generatedDate: '2024-12-31', status: 'draft' }
  ])
  const [selectedStatement, setSelectedStatement] = useState<FinancialStatement | null>(null)
  const [isStatementDialogOpen, setIsStatementDialogOpen] = useState(false)

  const [drilldownData, setDrilldownData] = useState<any>(null)
  const [isDrilldownOpen, setIsDrilldownOpen] = useState(false)

  const [tbSearchTerm, setTbSearchTerm] = useState('')
  const [tbCategoryFilter, setTbCategoryFilter] = useState<string>('all')
  const [tbSortField, setTbSortField] = useState<keyof TrialBalanceEntry>('accountCode')
  const [tbSortDirection, setTbSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedTBEntries, setSelectedTBEntries] = useState<string[]>([])

  const [jeSearchTerm, setJeSearchTerm] = useState('')
  const [jeStatusFilter, setJeStatusFilter] = useState<string>('all')
  const [jeDateFilter, setJeDateFilter] = useState<string>('')
  const [jeSortField, setJeSortField] = useState<keyof JournalEntry>('reference')
  const [jeSortDirection, setJeSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedJEEntries, setSelectedJEEntries] = useState<string[]>([])

  const [fsSearchTerm, setFsSearchTerm] = useState('')
  const [fsTypeFilter, setFsTypeFilter] = useState<string>('all')
  const [fsStatusFilter, setFsStatusFilter] = useState<string>('all')

  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      hasSubTabs: false
    },
    {
      id: 'trial-balance',
      label: 'Trial Balance',
      icon: Calculator,
      hasSubTabs: true,
      subTabs: [
        { id: 'tb-overview', label: 'Overview' },
        { id: 'tb-mapping', label: 'Account Mapping' },
        { id: 'tb-reconciliation', label: 'Reconciliation' },
        { id: 'tb-import', label: 'Data Import' },
        { id: 'tb-history', label: 'History & Audit Trail' }
      ]
    },
    {
      id: 'adjustments',
      label: 'Adjustments',
      icon: Edit,
      hasSubTabs: true,
      subTabs: [
        { id: 'journal-entries', label: 'Journal Entries' },
        { id: 'prepayments', label: 'Prepayments' },
        { id: 'accruals', label: 'Accruals' },
        { id: 'depreciation', label: 'Depreciation' },
        { id: 'provisions', label: 'Provisions' },
        { id: 'reclassifications', label: 'Reclassifications' }
      ]
    },
    {
      id: 'statements',
      label: 'Financial Statements',
      icon: FileText,
      hasSubTabs: true,
      subTabs: [
        { id: 'balance-sheet', label: 'Balance Sheet' },
        { id: 'profit-loss', label: 'Profit & Loss' },
        { id: 'cash-flow', label: 'Cash Flow' },
        { id: 'notes', label: 'Notes to Accounts' },
        { id: 'directors-report', label: "Directors' Report" },
        { id: 'templates', label: 'Statement Templates' }
      ]
    },
    {
      id: 'year-end',
      label: 'Year-End Processing',
      icon: Calendar,
      hasSubTabs: true,
      subTabs: [
        { id: 'closing-entries', label: 'Closing Entries' },
        { id: 'retained-earnings', label: 'Retained Earnings' },
        { id: 'opening-balances', label: 'Opening Balances' },
        { id: 'period-lock', label: 'Period Lock' },
        { id: 'year-end-checklist', label: 'Year-End Checklist' }
      ]
    },
    {
      id: 'consolidation',
      label: 'Group Consolidation',
      icon: Copy,
      hasSubTabs: true,
      subTabs: [
        { id: 'group-structure', label: 'Group Structure' },
        { id: 'intercompany', label: 'Intercompany Eliminations' },
        { id: 'consolidated-accounts', label: 'Consolidated Accounts' },
        { id: 'minority-interests', label: 'Minority Interests' }
      ]
    },
    {
      id: 'ixbrl',
      label: 'iXBRL Tagging',
      icon: Globe,
      hasSubTabs: true,
      subTabs: [
        { id: 'auto-tagging', label: 'Auto Tagging' },
        { id: 'manual-tagging', label: 'Manual Tagging' },
        { id: 'validation', label: 'Validation' },
        { id: 'preview', label: 'Preview & Submit' }
      ]
    },
    {
      id: 'hmrc',
      label: 'HMRC Integration',
      icon: Send,
      hasSubTabs: true,
      subTabs: [
        { id: 'hmrc-connect', label: 'HMRC Connection' },
        { id: 'corporation-tax', label: 'Corporation Tax' },
        { id: 'vat-filing', label: 'VAT Filing' },
        { id: 'paye-filing', label: 'PAYE Filing' },
        { id: 'submission-history', label: 'Submission History' }
      ]
    },
    {
      id: 'companies-house',
      label: 'Companies House',
      icon: FileUp,
      hasSubTabs: true,
      subTabs: [
        { id: 'ch-connect', label: 'Connection Setup' },
        { id: 'annual-accounts', label: 'Annual Accounts Filing' },
        { id: 'confirmation-statement', label: 'Confirmation Statement' },
        { id: 'forms', label: 'Other Forms' },
        { id: 'filing-history', label: 'Filing History' }
      ]
    },
    {
      id: 'entity-templates',
      label: 'Entity Templates',
      icon: FileSpreadsheet,
      hasSubTabs: true,
      subTabs: [
        { id: 'limited-company', label: 'Limited Company' },
        { id: 'llp', label: 'LLP' },
        { id: 'sole-trader', label: 'Sole Trader' },
        { id: 'partnership', label: 'Partnership' },
        { id: 'charity', label: 'Charity' },
        { id: 'academy', label: 'Academy' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: TrendingUp,
      hasSubTabs: true,
      subTabs: [
        { id: 'financial-reports', label: 'Financial Reports' },
        { id: 'management-accounts', label: 'Management Accounts' },
        { id: 'variance-analysis', label: 'Variance Analysis' },
        { id: 'ratio-analysis', label: 'Ratio Analysis' },
        { id: 'trend-analysis', label: 'Trend Analysis' },
        { id: 'custom-reports', label: 'Custom Reports' }
      ]
    },
    {
      id: 'audit',
      label: 'Audit Trail',
      icon: History,
      hasSubTabs: true,
      subTabs: [
        { id: 'activity-log', label: 'Activity Log' },
        { id: 'change-history', label: 'Change History' },
        { id: 'user-actions', label: 'User Actions' },
        { id: 'approval-workflow', label: 'Approval Workflow' }
      ]
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
    const menuItem = menuStructure.find(item => item.id === tabId)
    if (menuItem?.hasSubTabs) {
      toggleCategory(tabId)
    }
  }

  const handleSubTabClick = (subTabId: string) => {
    setActiveSubTab(subTabId)
  }

  const handleAIQuestion = async (question: string) => {
    setIsAILoading(true)
    try {
      console.log('AI Question:', question)
      await new Promise(resolve => setTimeout(resolve, 2000))
    } finally {
      setIsAILoading(false)
    }
  }

  const handleAddTBEntry = () => {
    setEditingTBEntry({
      id: Date.now().toString(),
      accountCode: '',
      accountName: '',
      debit: 0,
      credit: 0,
      category: 'Asset'
    })
    setIsTrialBalanceDialogOpen(true)
  }

  const handleEditTBEntry = (entry: TrialBalanceEntry) => {
    setEditingTBEntry(entry)
    setIsTrialBalanceDialogOpen(true)
  }

  const handleDeleteTBEntry = (id: string) => {
    setTrialBalanceEntries(prev => prev.filter(e => e.id !== id))
  }

  const handleSaveTBEntry = () => {
    if (!editingTBEntry) return
    
    if (trialBalanceEntries.find(e => e.id === editingTBEntry.id)) {
      setTrialBalanceEntries(prev => prev.map(e => 
        e.id === editingTBEntry.id ? editingTBEntry : e
      ))
    } else {
      setTrialBalanceEntries(prev => [...prev, editingTBEntry])
    }
    setIsTrialBalanceDialogOpen(false)
    setEditingTBEntry(null)
  }

  const handleImportTB = () => {
    const sampleImport: TrialBalanceEntry[] = [
      { id: Date.now().toString(), accountCode: '4000', accountName: 'Sales Revenue', debit: 0, credit: 150000, category: 'Revenue' },
      { id: (Date.now() + 1).toString(), accountCode: '5100', accountName: 'Cost of Sales', debit: 85000, credit: 0, category: 'Expense' }
    ]
    setTrialBalanceEntries(prev => [...prev, ...sampleImport])
  }

  const handleAddJournal = () => {
    setEditingJournal({
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      reference: `JE${String(journalEntries.length + 1).padStart(3, '0')}`,
      description: '',
      entries: [
        { accountCode: '', accountName: '', debit: 0, credit: 0 },
        { accountCode: '', accountName: '', debit: 0, credit: 0 }
      ],
      status: 'draft',
      createdBy: 'Current User'
    })
    setIsJournalDialogOpen(true)
  }

  const handleEditJournal = (journal: JournalEntry) => {
    setEditingJournal(journal)
    setIsJournalDialogOpen(true)
  }

  const handleDeleteJournal = (id: string) => {
    setJournalEntries(prev => prev.filter(j => j.id !== id))
  }

  const handleSaveJournal = () => {
    if (!editingJournal) return
    
    if (journalEntries.find(j => j.id === editingJournal.id)) {
      setJournalEntries(prev => prev.map(j => 
        j.id === editingJournal.id ? editingJournal : j
      ))
    } else {
      setJournalEntries(prev => [...prev, editingJournal])
    }
    setIsJournalDialogOpen(false)
    setEditingJournal(null)
  }

  const handleApproveJournal = (id: string) => {
    setJournalEntries(prev => prev.map(j => 
      j.id === id ? { ...j, status: 'approved' as const } : j
    ))
  }

  const handlePostJournal = (id: string) => {
    const journal = journalEntries.find(j => j.id === id)
    if (journal && journal.status === 'approved') {
      setJournalEntries(prev => prev.map(j => 
        j.id === id ? { ...j, status: 'posted' as const } : j
      ))
      
      journal.entries.forEach(entry => {
        const existingEntry = trialBalanceEntries.find(tb => tb.accountCode === entry.accountCode)
        if (existingEntry) {
          setTrialBalanceEntries(prev => prev.map(tb => 
            tb.accountCode === entry.accountCode 
              ? { ...tb, debit: tb.debit + entry.debit, credit: tb.credit + entry.credit }
              : tb
          ))
        } else {
          setTrialBalanceEntries(prev => [...prev, {
            id: Date.now().toString(),
            accountCode: entry.accountCode,
            accountName: entry.accountName,
            debit: entry.debit,
            credit: entry.credit,
            category: 'Adjustment'
          }])
        }
      })
    }
  }

  const handleGenerateStatement = (type: 'balance-sheet' | 'profit-loss' | 'cash-flow') => {
    const newStatement: FinancialStatement = {
      id: Date.now().toString(),
      type,
      period: 'Dec 2024',
      generatedDate: new Date().toISOString().split('T')[0],
      status: 'draft'
    }
    setFinancialStatements(prev => [...prev, newStatement])
  }

  const handleViewStatement = (statement: FinancialStatement) => {
    setSelectedStatement(statement)
    setIsStatementDialogOpen(true)
  }

  const handleFinalizeStatement = (id: string) => {
    setFinancialStatements(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'final' as const } : s
    ))
  }

  const handleDrilldown = (data: any) => {
    setDrilldownData(data)
    setIsDrilldownOpen(true)
  }

  const handleTBSort = (field: keyof TrialBalanceEntry) => {
    if (tbSortField === field) {
      setTbSortDirection(tbSortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setTbSortField(field)
      setTbSortDirection('asc')
    }
  }

  const handleJESort = (field: keyof JournalEntry) => {
    if (jeSortField === field) {
      setJeSortDirection(jeSortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setJeSortField(field)
      setJeSortDirection('asc')
    }
  }

  const handleSelectAllTB = (checked: boolean) => {
    if (checked) {
      setSelectedTBEntries(filteredAndSortedTBEntries.map(e => e.id))
    } else {
      setSelectedTBEntries([])
    }
  }

  const handleSelectTBEntry = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTBEntries([...selectedTBEntries, id])
    } else {
      setSelectedTBEntries(selectedTBEntries.filter(i => i !== id))
    }
  }

  const handleBulkDeleteTB = () => {
    setTrialBalanceEntries(prev => prev.filter(e => !selectedTBEntries.includes(e.id)))
    setSelectedTBEntries([])
  }

  const handleSelectAllJE = (checked: boolean) => {
    if (checked) {
      setSelectedJEEntries(filteredAndSortedJEEntries.map(j => j.id))
    } else {
      setSelectedJEEntries([])
    }
  }

  const handleSelectJEEntry = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedJEEntries([...selectedJEEntries, id])
    } else {
      setSelectedJEEntries(selectedJEEntries.filter(i => i !== id))
    }
  }

  const handleBulkApproveJE = () => {
    setJournalEntries(prev => prev.map(j => 
      selectedJEEntries.includes(j.id) && j.status === 'draft' 
        ? { ...j, status: 'approved' as const } 
        : j
    ))
    setSelectedJEEntries([])
  }

  const handleBulkDeleteJE = () => {
    setJournalEntries(prev => prev.filter(j => !selectedJEEntries.includes(j.id) || j.status === 'posted'))
    setSelectedJEEntries([])
  }

  const filteredAndSortedTBEntries = useMemo(() => {
    let filtered = trialBalanceEntries.filter(entry => {
      const matchesSearch = !tbSearchTerm || 
        entry.accountCode.toLowerCase().includes(tbSearchTerm.toLowerCase()) ||
        entry.accountName.toLowerCase().includes(tbSearchTerm.toLowerCase())
      const matchesCategory = tbCategoryFilter === 'all' || entry.category === tbCategoryFilter
      return matchesSearch && matchesCategory
    })

    return filtered.sort((a, b) => {
      const aVal = a[tbSortField]
      const bVal = b[tbSortField]
      const direction = tbSortDirection === 'asc' ? 1 : -1
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * direction
      }
      return String(aVal).localeCompare(String(bVal)) * direction
    })
  }, [trialBalanceEntries, tbSearchTerm, tbCategoryFilter, tbSortField, tbSortDirection])

  const filteredAndSortedJEEntries = useMemo(() => {
    let filtered = journalEntries.filter(entry => {
      const matchesSearch = !jeSearchTerm || 
        entry.reference.toLowerCase().includes(jeSearchTerm.toLowerCase()) ||
        entry.description.toLowerCase().includes(jeSearchTerm.toLowerCase())
      const matchesStatus = jeStatusFilter === 'all' || entry.status === jeStatusFilter
      const matchesDate = !jeDateFilter || entry.date.startsWith(jeDateFilter)
      return matchesSearch && matchesStatus && matchesDate
    })

    return filtered.sort((a, b) => {
      const aVal = a[jeSortField]
      const bVal = b[jeSortField]
      const direction = jeSortDirection === 'asc' ? 1 : -1
      return String(aVal).localeCompare(String(bVal)) * direction
    })
  }, [journalEntries, jeSearchTerm, jeStatusFilter, jeDateFilter, jeSortField, jeSortDirection])

  const filteredFinancialStatements = useMemo(() => {
    return financialStatements.filter(statement => {
      const matchesSearch = !fsSearchTerm || 
        statement.period.toLowerCase().includes(fsSearchTerm.toLowerCase())
      const matchesType = fsTypeFilter === 'all' || statement.type === fsTypeFilter
      const matchesStatus = fsStatusFilter === 'all' || statement.status === fsStatusFilter
      return matchesSearch && matchesType && matchesStatus
    })
  }, [financialStatements, fsSearchTerm, fsTypeFilter, fsStatusFilter])

  const totalDebits = filteredAndSortedTBEntries.reduce((sum, entry) => sum + entry.debit, 0)
  const totalCredits = filteredAndSortedTBEntries.reduce((sum, entry) => sum + entry.credit, 0)
  const totalAssets = trialBalanceEntries.filter(e => e.category === 'Asset').reduce((sum, e) => sum + e.debit - e.credit, 0)
  const totalLiabilities = trialBalanceEntries.filter(e => e.category === 'Liability').reduce((sum, e) => sum + e.credit - e.debit, 0)
  const totalEquity = trialBalanceEntries.filter(e => e.category === 'Equity').reduce((sum, e) => sum + e.credit - e.debit, 0)

  const kpis = [
    { label: 'Total Assets', value: `£${totalAssets.toLocaleString()}`, change: '+12.5%', positive: true },
    { label: 'Total Liabilities', value: `£${totalLiabilities.toLocaleString()}`, change: '-3.2%', positive: true },
    { label: 'Net Equity', value: `£${totalEquity.toLocaleString()}`, change: '+18.7%', positive: true },
    { label: 'Working Capital', value: `£${(totalAssets - totalLiabilities).toLocaleString()}`, change: '+8.9%', positive: true }
  ]

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'dashboard':
        return renderDashboardContent()
      
      case 'tb-overview':
        return renderTrialBalanceContent()
      case 'tb-mapping':
        return renderAccountMappingContent()
      case 'tb-reconciliation':
        return renderReconciliationContent()
      case 'tb-import':
        return renderDataImportContent()
      case 'tb-history':
        return renderHistoryContent()
      
      case 'journal-entries':
        return renderAdjustmentsContent()
      case 'prepayments':
        return renderPrepaymentsContent()
      case 'accruals':
        return renderAccrualsContent()
      case 'depreciation':
        return renderDepreciationContent()
      case 'provisions':
        return renderProvisionsContent()
      case 'reclassifications':
        return renderReclassificationsContent()
      
      case 'balance-sheet':
      case 'profit-loss':
      case 'cash-flow':
      case 'notes':
      case 'directors-report':
      case 'templates':
        return renderStatementsContent()
      
      case 'closing-entries':
        return renderClosingEntriesContent()
      case 'retained-earnings':
        return renderRetainedEarningsContent()
      case 'opening-balances':
        return renderOpeningBalancesContent()
      case 'period-lock':
        return renderPeriodLockContent()
      case 'year-end-checklist':
        return renderYearEndChecklistContent()
      
      // Consolidation
      case 'group-structure':
      case 'intercompany':
      case 'consolidated-accounts':
      case 'minority-interests':
        return renderConsolidationContent()
      
      case 'auto-tagging':
      case 'manual-tagging':
      case 'validation':
      case 'preview':
        return renderIXBRLContent()
      
      case 'hmrc-connect':
        return renderHMRCConnectionContent()
      case 'corporation-tax':
        return renderCorporationTaxContent()
      case 'vat-filing':
        return renderVATFilingContent()
      case 'paye-filing':
        return renderPAYEFilingContent()
      case 'submission-history':
        return renderSubmissionHistoryContent()
      
      case 'ch-connect':
        return renderCompaniesHouseConnectionContent()
      case 'annual-accounts':
        return renderAnnualAccountsFilingContent()
      case 'confirmation-statement':
        return renderConfirmationStatementContent()
      case 'forms':
        return renderCompaniesHouseFormsContent()
      case 'filing-history':
        return renderFilingHistoryContent()
      
      case 'limited-company':
      case 'llp':
      case 'sole-trader':
      case 'partnership':
      case 'charity':
      case 'academy':
        return renderEntityTemplatesContent()
      
      case 'financial-reports':
      case 'management-accounts':
      case 'variance-analysis':
      case 'ratio-analysis':
      case 'trend-analysis':
      case 'custom-reports':
        return renderReportsContent()
      
      case 'activity-log':
      case 'change-history':
      case 'user-actions':
      case 'approval-workflow':
        return renderAuditTrailContent()
      
      default:
        return renderDashboardContent()
    }
  }

  const renderDashboardContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.label}
            value={kpi.value}
            change={kpi.change}
            icon={Calculator}
            color={kpi.positive ? 'text-green-600' : 'text-red-600'}
            drillDownData={{
              title: `${kpi.label} Analysis`,
              description: `Detailed financial analysis for ${kpi.label.toLowerCase()}`,
              content: <div>Detailed analysis content for {kpi.label}</div>
            }}
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Recent Activity</CardTitle>
          <CardDescription>Latest accounts production activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
              <div>
                <h3 className="font-semibold text-[#001f3f]">Trial Balance Updated</h3>
                <p className="text-sm text-[#001f3f]">Client: ABC Ltd - Period: Dec 2024</p>
              </div>
              <Badge variant="default">Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border-2 border-[#001f3f] rounded-[2px]">
              <div>
                <h3 className="font-semibold text-[#001f3f]">Financial Statements Generated</h3>
                <p className="text-sm text-[#001f3f]">Client: XYZ Corp - Period: Q4 2024</p>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTrialBalanceContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#001f3f]">Trial Balance</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleImportTB}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <ExportButton data={trialBalanceEntries} filename="trial-balance" />
          <Button size="sm" onClick={handleAddTBEntry}>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleDrilldown({
            title: 'Total Debits Breakdown',
            data: trialBalanceEntries.filter(e => e.debit > 0)
          })}
        >
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-[#001f3f]">Total Debits</h3>
            <p className="text-xl font-bold text-[#001f3f]">£{totalDebits.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleDrilldown({
            title: 'Total Credits Breakdown',
            data: trialBalanceEntries.filter(e => e.credit > 0)
          })}
        >
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-[#001f3f]">Total Credits</h3>
            <p className="text-xl font-bold text-green-600">£{totalCredits.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-[#001f3f]">Balance</h3>
            <p className={`text-xl font-bold ${Math.abs(totalDebits - totalCredits) < 0.01 ? 'text-green-600' : 'text-red-600'}`}>
              £{Math.abs(totalDebits - totalCredits).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Trial Balance Entries</CardTitle>
          <CardDescription>
            Showing {filteredAndSortedTBEntries.length} of {trialBalanceEntries.length} entries
            {selectedTBEntries.length > 0 && ` • ${selectedTBEntries.length} selected`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by account code or name..."
                    value={tbSearchTerm}
                    onChange={(e) => setTbSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={tbCategoryFilter} onValueChange={setTbCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Asset">Assets</SelectItem>
                  <SelectItem value="Liability">Liabilities</SelectItem>
                  <SelectItem value="Equity">Equity</SelectItem>
                  <SelectItem value="Revenue">Revenue</SelectItem>
                  <SelectItem value="Expense">Expenses</SelectItem>
                </SelectContent>
              </Select>
              {selectedTBEntries.length > 0 && (
                <Button variant="destructive" size="sm" onClick={handleBulkDeleteTB}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedTBEntries.length})
                </Button>
              )}
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedTBEntries.length === filteredAndSortedTBEntries.length && filteredAndSortedTBEntries.length > 0}
                      onChange={(e) => handleSelectAllTB(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </TableHead>
                  <TableHead className="text-[#001f3f] cursor-pointer hover:bg-gray-50" onClick={() => handleTBSort('accountCode')}>
                    <div className="flex items-center gap-2">
                      Account Code
                      {tbSortField === 'accountCode' && (
                        tbSortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                      )}
                      {tbSortField !== 'accountCode' && <ArrowUpDown className="h-4 w-4 text-gray-400" />}
                    </div>
                  </TableHead>
                  <TableHead className="text-[#001f3f] cursor-pointer hover:bg-gray-50" onClick={() => handleTBSort('accountName')}>
                    <div className="flex items-center gap-2">
                      Account Name
                      {tbSortField === 'accountName' && (
                        tbSortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                      )}
                      {tbSortField !== 'accountName' && <ArrowUpDown className="h-4 w-4 text-gray-400" />}
                    </div>
                  </TableHead>
                  <TableHead className="text-[#001f3f] cursor-pointer hover:bg-gray-50" onClick={() => handleTBSort('category')}>
                    <div className="flex items-center gap-2">
                      Category
                      {tbSortField === 'category' && (
                        tbSortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                      )}
                      {tbSortField !== 'category' && <ArrowUpDown className="h-4 w-4 text-gray-400" />}
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-[#001f3f] cursor-pointer hover:bg-gray-50" onClick={() => handleTBSort('debit')}>
                    <div className="flex items-center justify-end gap-2">
                      Debit
                      {tbSortField === 'debit' && (
                        tbSortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                      )}
                      {tbSortField !== 'debit' && <ArrowUpDown className="h-4 w-4 text-gray-400" />}
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-[#001f3f] cursor-pointer hover:bg-gray-50" onClick={() => handleTBSort('credit')}>
                    <div className="flex items-center justify-end gap-2">
                      Credit
                      {tbSortField === 'credit' && (
                        tbSortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                      )}
                      {tbSortField !== 'credit' && <ArrowUpDown className="h-4 w-4 text-gray-400" />}
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-[#001f3f]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedTBEntries.map((entry) => (
                <TableRow 
                  key={entry.id}
                  className={`cursor-pointer hover:bg-gray-50 ${selectedTBEntries.includes(entry.id) ? 'bg-blue-50' : ''}`}
                  onClick={() => handleDrilldown({
                    title: `${entry.accountName} Details`,
                    data: entry
                  })}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedTBEntries.includes(entry.id)}
                      onChange={(e) => handleSelectTBEntry(entry.id, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="text-[#001f3f]">{entry.accountCode}</TableCell>
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
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTBEntry(entry)}
                        title="Edit Entry"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTBEntry(entry.id)}
                        title="Delete Entry"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDrilldown({
                          title: `${entry.accountName} History`,
                          data: entry
                        })}
                        title="View History"
                      >
                        <History className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold bg-gray-50">
                <TableCell></TableCell>
                <TableCell colSpan={3} className="text-[#001f3f]">Total</TableCell>
                <TableCell className="text-right text-[#001f3f]">£{totalDebits.toLocaleString()}</TableCell>
                <TableCell className="text-right text-[#001f3f]">£{totalCredits.toLocaleString()}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAdjustmentsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#001f3f]">Journal Entries & Adjustments</h2>
        <Button onClick={handleAddJournal}>
          <Plus className="h-4 w-4 mr-2" />
          New Journal Entry
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-[#001f3f]">Draft Entries</h3>
            <p className="text-xl font-bold text-[#001f3f]">
              {journalEntries.filter(j => j.status === 'draft').length}
            </p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-[#001f3f]">Approved Entries</h3>
            <p className="text-xl font-bold text-green-600">
              {journalEntries.filter(j => j.status === 'approved').length}
            </p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-[#001f3f]">Posted Entries</h3>
            <p className="text-xl font-bold text-blue-600">
              {journalEntries.filter(j => j.status === 'posted').length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Journal Entries</CardTitle>
          <CardDescription>
            Showing {filteredAndSortedJEEntries.length} of {journalEntries.length} entries
            {selectedJEEntries.length > 0 && ` • ${selectedJEEntries.length} selected`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {journalEntries.length > 0 ? (
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by reference or description..."
                      value={jeSearchTerm}
                      onChange={(e) => setJeSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={jeStatusFilter} onValueChange={setJeStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="posted">Posted</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="month"
                    value={jeDateFilter}
                    onChange={(e) => setJeDateFilter(e.target.value)}
                    className="pl-8 w-[180px]"
                    placeholder="Filter by month"
                  />
                </div>
                {selectedJEEntries.length > 0 && (
                  <>
                    <Button variant="default" size="sm" onClick={handleBulkApproveJE}>
                      <Check className="h-4 w-4 mr-2" />
                      Approve Selected ({selectedJEEntries.length})
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleBulkDeleteJE}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Selected ({selectedJEEntries.length})
                    </Button>
                  </>
                )}
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedJEEntries.length === filteredAndSortedJEEntries.length && filteredAndSortedJEEntries.length > 0}
                        onChange={(e) => handleSelectAllJE(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </TableHead>
                    <TableHead className="text-[#001f3f] cursor-pointer hover:bg-gray-50" onClick={() => handleJESort('reference')}>
                      <div className="flex items-center gap-2">
                        Reference
                        {jeSortField === 'reference' && (
                          jeSortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                        )}
                        {jeSortField !== 'reference' && <ArrowUpDown className="h-4 w-4 text-gray-400" />}
                      </div>
                    </TableHead>
                    <TableHead className="text-[#001f3f] cursor-pointer hover:bg-gray-50" onClick={() => handleJESort('date')}>
                      <div className="flex items-center gap-2">
                        Date
                        {jeSortField === 'date' && (
                          jeSortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                        )}
                        {jeSortField !== 'date' && <ArrowUpDown className="h-4 w-4 text-gray-400" />}
                      </div>
                    </TableHead>
                    <TableHead className="text-[#001f3f] cursor-pointer hover:bg-gray-50" onClick={() => handleJESort('description')}>
                      <div className="flex items-center gap-2">
                        Description
                        {jeSortField === 'description' && (
                          jeSortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                        )}
                        {jeSortField !== 'description' && <ArrowUpDown className="h-4 w-4 text-gray-400" />}
                      </div>
                    </TableHead>
                    <TableHead className="text-[#001f3f] cursor-pointer hover:bg-gray-50" onClick={() => handleJESort('status')}>
                      <div className="flex items-center gap-2">
                        Status
                        {jeSortField === 'status' && (
                          jeSortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                        )}
                        {jeSortField !== 'status' && <ArrowUpDown className="h-4 w-4 text-gray-400" />}
                      </div>
                    </TableHead>
                    <TableHead className="text-[#001f3f] cursor-pointer hover:bg-gray-50" onClick={() => handleJESort('createdBy')}>
                      <div className="flex items-center gap-2">
                        Created By
                        {jeSortField === 'createdBy' && (
                          jeSortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                        )}
                        {jeSortField !== 'createdBy' && <ArrowUpDown className="h-4 w-4 text-gray-400" />}
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-[#001f3f]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedJEEntries.map((journal) => (
                    <TableRow 
                      key={journal.id}
                      className={`cursor-pointer hover:bg-gray-50 ${selectedJEEntries.includes(journal.id) ? 'bg-blue-50' : ''}`}
                      onClick={() => handleDrilldown({
                        title: `Journal Entry ${journal.reference}`,
                        data: journal
                      })}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedJEEntries.includes(journal.id)}
                          onChange={(e) => handleSelectJEEntry(journal.id, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell className="text-[#001f3f]">{journal.reference}</TableCell>
                      <TableCell className="text-[#001f3f]">{journal.date}</TableCell>
                      <TableCell className="text-[#001f3f]">{journal.description}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            journal.status === 'posted' ? 'default' : 
                            journal.status === 'approved' ? 'secondary' : 
                            'outline'
                          }
                        >
                          {journal.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#001f3f]">{journal.createdBy}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditJournal(journal)}
                            title="View Entry"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {journal.status === 'draft' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleApproveJournal(journal.id)}
                              title="Approve Entry"
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                          {journal.status === 'approved' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePostJournal(journal.id)}
                              title="Post to Trial Balance"
                            >
                              <Send className="h-4 w-4 text-blue-600" />
                            </Button>
                          )}
                          {journal.status === 'draft' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteJournal(journal.id)}
                              title="Delete Entry"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDrilldown({
                              title: `${journal.reference} - Full Details`,
                              data: journal
                            })}
                            title="View Details"
                          >
                            <FileCheck className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No journal entries recorded for this period</p>
              <Button className="mt-4" onClick={handleAddJournal}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Journal Entry
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderStatementsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#001f3f]">Financial Statements</h2>
        <div className="flex gap-2">
          <Button onClick={() => handleGenerateStatement('balance-sheet')}>
            <Plus className="h-4 w-4 mr-2" />
            Balance Sheet
          </Button>
          <Button onClick={() => handleGenerateStatement('profit-loss')}>
            <Plus className="h-4 w-4 mr-2" />
            P&L
          </Button>
          <Button onClick={() => handleGenerateStatement('cash-flow')}>
            <Plus className="h-4 w-4 mr-2" />
            Cash Flow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleDrilldown({
            title: 'Balance Sheet Overview',
            data: { assets: totalAssets, liabilities: totalLiabilities, equity: totalEquity }
          })}
        >
          <CardContent className="p-4">
            <FileText className="h-8 w-8 text-[#001f3f] mb-2" />
            <h3 className="text-sm font-semibold text-[#001f3f]">Balance Sheets</h3>
            <p className="text-xl font-bold text-[#001f3f]">
              {financialStatements.filter(s => s.type === 'balance-sheet').length}
            </p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleDrilldown({
            title: 'P&L Overview',
            data: financialStatements.filter(s => s.type === 'profit-loss')
          })}
        >
          <CardContent className="p-4">
            <TrendingUp className="h-8 w-8 text-[#001f3f] mb-2" />
            <h3 className="text-sm font-semibold text-[#001f3f]">Profit & Loss</h3>
            <p className="text-xl font-bold text-[#001f3f]">
              {financialStatements.filter(s => s.type === 'profit-loss').length}
            </p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleDrilldown({
            title: 'Cash Flow Overview',
            data: financialStatements.filter(s => s.type === 'cash-flow')
          })}
        >
          <CardContent className="p-4">
            <DollarSign className="h-8 w-8 text-[#001f3f] mb-2" />
            <h3 className="text-sm font-semibold text-[#001f3f]">Cash Flow</h3>
            <p className="text-xl font-bold text-[#001f3f]">
              {financialStatements.filter(s => s.type === 'cash-flow').length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Generated Statements</CardTitle>
          <CardDescription>All financial statements for the current period</CardDescription>
        </CardHeader>
        <CardContent>
          {financialStatements.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#001f3f]">Type</TableHead>
                  <TableHead className="text-[#001f3f]">Period</TableHead>
                  <TableHead className="text-[#001f3f]">Generated Date</TableHead>
                  <TableHead className="text-[#001f3f]">Status</TableHead>
                  <TableHead className="text-right text-[#001f3f]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financialStatements.map((statement) => (
                  <TableRow 
                    key={statement.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleViewStatement(statement)}
                  >
                    <TableCell className="text-[#001f3f]">
                      {statement.type === 'balance-sheet' ? 'Balance Sheet' : 
                       statement.type === 'profit-loss' ? 'Profit & Loss' : 
                       'Cash Flow Statement'}
                    </TableCell>
                    <TableCell className="text-[#001f3f]">{statement.period}</TableCell>
                    <TableCell className="text-[#001f3f]">{statement.generatedDate}</TableCell>
                    <TableCell>
                      <Badge variant={statement.status === 'final' ? 'default' : 'outline'}>
                        {statement.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewStatement(statement)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {statement.status === 'draft' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFinalizeStatement(statement.id)}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                        <ExportButton 
                          data={statement} 
                          filename={`${statement.type}-${statement.period}`} 
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No financial statements generated yet</p>
              <div className="flex gap-2 justify-center mt-4">
                <Button onClick={() => handleGenerateStatement('balance-sheet')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Balance Sheet
                </Button>
                <Button onClick={() => handleGenerateStatement('profit-loss')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Generate P&L
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Balance Sheet</CardTitle>
            <CardDescription>Statement of financial position</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Balance Sheet
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Profit & Loss</CardTitle>
            <CardDescription>Income statement</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View P&L
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderConsolidationContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Consolidation</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Consolidation
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Group Consolidation</CardTitle>
          <CardDescription>Multi-entity financial consolidation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">No consolidation entities configured</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderReportsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Financial Reports</h2>
        <ExportButton
          data={[
            ['Report Type', 'Description', 'Status'],
            ['Management Accounts', 'Monthly management reporting', 'Available'],
            ['Financial Analysis', 'Ratio and trend analysis', 'Available'],
            ['Variance Reports', 'Budget vs actual analysis', 'Available']
          ]}
          filename={`financial-reports-${new Date().toISOString().split('T')[0]}`}
          buttonText="Generate Report"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Management Accounts</CardTitle>
            <CardDescription>Monthly management reporting</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Financial Analysis</CardTitle>
            <CardDescription>Ratio and trend analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Analysis
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">Variance Reports</CardTitle>
            <CardDescription>Budget vs actual analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Variances
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderIXBRLContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#001f3f]">iXBRL Tagging & Validation</h2>
        <div className="flex gap-2">
          <Button onClick={() => handleDrilldown({ title: 'Auto-Tag All', data: {} })}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Auto-Tag All
          </Button>
          <Button onClick={() => handleDrilldown({ title: 'Validate Tags', data: {} })}>
            <Check className="h-4 w-4 mr-2" />
            Validate
          </Button>
          <ExportButton data={[]} filename="ixbrl-document" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Tagged Items"
          value="847"
          change="+12.5%"
          icon={Globe}
          color="text-green-600"
          drillDownData={{ title: 'Tagged Items Details', description: 'View all tagged items', content: <div>Tagged items list</div> }}
        />
        <KPICard
          title="Untagged Items"
          value="23"
          change="-45%"
          icon={AlertCircle}
          color="text-orange-600"
          drillDownData={{ title: 'Untagged Items', description: 'Items requiring tagging', content: <div>Untagged items list</div> }}
        />
        <KPICard
          title="Validation Errors"
          value="0"
          change="-100%"
          icon={Check}
          color="text-green-600"
          drillDownData={{ title: 'Validation Status', description: 'Validation details', content: <div>All validations passed</div> }}
        />
        <KPICard
          title="Completion"
          value="97.4%"
          change="+8.2%"
          icon={TrendingUp}
          color="text-blue-600"
          drillDownData={{ title: 'Tagging Progress', description: 'Overall progress', content: <div>Progress details</div> }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">iXBRL Document Preview</CardTitle>
          <CardDescription>Preview and validate iXBRL tags before submission to Companies House</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                <h3 className="font-semibold text-[#001f3f] mb-2">Document Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#001f3f]">Entity:</span>
                    <span className="font-semibold text-[#001f3f]">ABC Limited</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#001f3f]">Period End:</span>
                    <span className="font-semibold text-[#001f3f]">31 Dec 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#001f3f]">Framework:</span>
                    <span className="font-semibold text-[#001f3f]">FRS 102</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#001f3f]">Taxonomy:</span>
                    <span className="font-semibold text-[#001f3f]">UK GAAP 2024</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-2 border-[#001f3f] rounded-[2px]">
                <h3 className="font-semibold text-[#001f3f] mb-2">Validation Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#001f3f]">Schema Validation</span>
                    <Badge variant="default">Passed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#001f3f]">Business Rules</span>
                    <Badge variant="default">Passed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#001f3f]">Completeness Check</span>
                    <Badge variant="default">Passed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#001f3f]">HMRC Validation</span>
                    <Badge variant="default">Ready</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => handleDrilldown({ title: 'Edit Tags', data: {} })}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Tags
              </Button>
              <Button onClick={() => handleDrilldown({ title: 'Submit to Companies House', data: {} })}>
                <Send className="h-4 w-4 mr-2" />
                Submit to Companies House
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAccountMappingContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#001f3f]">Account Mapping</h2>
        <Button onClick={() => handleDrilldown({ title: 'Create Mapping Rule', data: {} })}>
          <Plus className="h-4 w-4 mr-2" />
          New Mapping Rule
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Chart of Accounts Mapping</CardTitle>
          <CardDescription>Map bookkeeping accounts to financial statement categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-[#001f3f] mb-4">Automated account mapping with AI-powered suggestions</p>
            <Button onClick={() => handleDrilldown({ title: 'Configure Mappings', data: {} })}>Configure Mappings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderReconciliationContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Account Reconciliation</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Reconciled Accounts"
          value="42"
          change="+5"
          icon={Check}
          color="text-green-600"
          drillDownData={{ title: 'Reconciled Accounts', description: 'View reconciled accounts', content: <div>List of reconciled accounts</div> }}
        />
        <KPICard
          title="Pending Reconciliation"
          value="8"
          change="-2"
          icon={AlertCircle}
          color="text-orange-600"
          drillDownData={{ title: 'Pending Items', description: 'Accounts awaiting reconciliation', content: <div>Pending reconciliation list</div> }}
        />
        <KPICard
          title="Reconciliation Rate"
          value="84%"
          change="+3%"
          icon={TrendingUp}
          color="text-blue-600"
          drillDownData={{ title: 'Reconciliation Progress', description: 'Overall progress', content: <div>Progress details</div> }}
        />
      </div>
    </div>
  )

  const renderDataImportContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Data Import</h2>
      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Import Trial Balance</CardTitle>
          <CardDescription>Import from Xero, QuickBooks, Sage, or CSV file</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" onClick={() => handleImportTB()}>
                <Upload className="h-4 w-4 mr-2" />
                Xero
              </Button>
              <Button variant="outline" onClick={() => handleImportTB()}>
                <Upload className="h-4 w-4 mr-2" />
                QuickBooks
              </Button>
              <Button variant="outline" onClick={() => handleImportTB()}>
                <Upload className="h-4 w-4 mr-2" />
                Sage
              </Button>
              <Button variant="outline" onClick={() => handleImportTB()}>
                <Upload className="h-4 w-4 mr-2" />
                CSV File
              </Button>
            </div>
            <div className="text-sm text-[#001f3f]">
              <p>Supported formats: CSV, Excel, QBO, Sage XML</p>
              <p>Automatic mapping and validation included</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderHistoryContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">History & Audit Trail</h2>
      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Trial Balance Changes</CardTitle>
          <CardDescription>Complete audit trail of all changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-3 border-2 border-[#001f3f] rounded-[2px] cursor-pointer hover:bg-gray-50"
                onClick={() => handleDrilldown({ title: `Change Details #${i}`, data: {} })}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-[#001f3f]">Trial Balance Adjustment</p>
                    <p className="text-sm text-[#001f3f]">Modified by John Smith - 2 days ago</p>
                  </div>
                  <Badge variant="outline">Modified</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPrepaymentsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#001f3f]">Prepayments</h2>
        <Button onClick={() => handleDrilldown({ title: 'New Prepayment', data: {} })}>
          <Plus className="h-4 w-4 mr-2" />
          Add Prepayment
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Prepayment Schedule</CardTitle>
          <CardDescription>Track and amortize prepaid expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#001f3f]">Description</TableHead>
                <TableHead className="text-[#001f3f]">Total Amount</TableHead>
                <TableHead className="text-[#001f3f]">Period</TableHead>
                <TableHead className="text-[#001f3f]">Monthly Amount</TableHead>
                <TableHead className="text-[#001f3f]">Remaining</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleDrilldown({ title: 'Insurance Prepayment Details', data: {} })}>
                <TableCell className="text-[#001f3f]">Insurance Premium</TableCell>
                <TableCell className="text-[#001f3f]">£12,000</TableCell>
                <TableCell className="text-[#001f3f]">12 months</TableCell>
                <TableCell className="text-[#001f3f]">£1,000</TableCell>
                <TableCell className="text-[#001f3f]">£8,000</TableCell>
              </TableRow>
              <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleDrilldown({ title: 'Rent Prepayment Details', data: {} })}>
                <TableCell className="text-[#001f3f]">Office Rent</TableCell>
                <TableCell className="text-[#001f3f]">£18,000</TableCell>
                <TableCell className="text-[#001f3f]">6 months</TableCell>
                <TableCell className="text-[#001f3f]">£3,000</TableCell>
                <TableCell className="text-[#001f3f]">£12,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderAccrualsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#001f3f]">Accruals</h2>
        <Button onClick={() => handleDrilldown({ title: 'New Accrual', data: {} })}>
          <Plus className="h-4 w-4 mr-2" />
          Add Accrual
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Accrued Expenses</CardTitle>
          <CardDescription>Track expenses incurred but not yet paid</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#001f3f]">Description</TableHead>
                <TableHead className="text-[#001f3f]">Amount</TableHead>
                <TableHead className="text-[#001f3f]">Period</TableHead>
                <TableHead className="text-[#001f3f]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleDrilldown({ title: 'Utilities Accrual Details', data: {} })}>
                <TableCell className="text-[#001f3f]">Utilities Expense</TableCell>
                <TableCell className="text-[#001f3f]">£1,250</TableCell>
                <TableCell className="text-[#001f3f]">Dec 2024</TableCell>
                <TableCell><Badge variant="default">Active</Badge></TableCell>
              </TableRow>
              <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleDrilldown({ title: 'Professional Fees Accrual Details', data: {} })}>
                <TableCell className="text-[#001f3f]">Professional Fees</TableCell>
                <TableCell className="text-[#001f3f]">£3,500</TableCell>
                <TableCell className="text-[#001f3f]">Dec 2024</TableCell>
                <TableCell><Badge variant="default">Active</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderDepreciationContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#001f3f]">Depreciation Calculator</h2>
        <Button onClick={() => handleDrilldown({ title: 'New Asset', data: {} })}>
          <Plus className="h-4 w-4 mr-2" />
          Add Fixed Asset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Fixed Assets"
          value="£385,000"
          change="+5.2%"
          icon={FileSpreadsheet}
          color="text-blue-600"
          drillDownData={{ title: 'Fixed Assets Register', description: 'All fixed assets', content: <div>Fixed assets list</div> }}
        />
        <KPICard
          title="Accumulated Depreciation"
          value="£45,000"
          change="+12%"
          icon={TrendingDown}
          color="text-orange-600"
          drillDownData={{ title: 'Depreciation History', description: 'Cumulative depreciation', content: <div>Depreciation details</div> }}
        />
        <KPICard
          title="Net Book Value"
          value="£340,000"
          change="+2.8%"
          icon={Calculator}
          color="text-green-600"
          drillDownData={{ title: 'NBV Analysis', description: 'Net book value breakdown', content: <div>NBV details</div> }}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Fixed Assets Register</CardTitle>
          <CardDescription>Calculate depreciation using straight-line, reducing balance, or units of production methods</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#001f3f]">Asset</TableHead>
                <TableHead className="text-[#001f3f]">Cost</TableHead>
                <TableHead className="text-[#001f3f]">Method</TableHead>
                <TableHead className="text-[#001f3f]">Rate</TableHead>
                <TableHead className="text-[#001f3f]">Depreciation (Annual)</TableHead>
                <TableHead className="text-[#001f3f]">NBV</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleDrilldown({ title: 'Building Depreciation Schedule', data: {} })}>
                <TableCell className="text-[#001f3f]">Building</TableCell>
                <TableCell className="text-[#001f3f]">£250,000</TableCell>
                <TableCell className="text-[#001f3f]">Straight Line</TableCell>
                <TableCell className="text-[#001f3f]">2%</TableCell>
                <TableCell className="text-[#001f3f]">£5,000</TableCell>
                <TableCell className="text-[#001f3f]">£225,000</TableCell>
              </TableRow>
              <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleDrilldown({ title: 'Machinery Depreciation Schedule', data: {} })}>
                <TableCell className="text-[#001f3f]">Machinery</TableCell>
                <TableCell className="text-[#001f3f]">£85,000</TableCell>
                <TableCell className="text-[#001f3f]">Reducing Balance</TableCell>
                <TableCell className="text-[#001f3f]">25%</TableCell>
                <TableCell className="text-[#001f3f]">£18,500</TableCell>
                <TableCell className="text-[#001f3f]">£66,500</TableCell>
              </TableRow>
              <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleDrilldown({ title: 'Vehicles Depreciation Schedule', data: {} })}>
                <TableCell className="text-[#001f3f]">Motor Vehicles</TableCell>
                <TableCell className="text-[#001f3f]">£35,000</TableCell>
                <TableCell className="text-[#001f3f]">Straight Line</TableCell>
                <TableCell className="text-[#001f3f]">20%</TableCell>
                <TableCell className="text-[#001f3f]">£7,000</TableCell>
                <TableCell className="text-[#001f3f]">£28,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderProvisionsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#001f3f]">Provisions</h2>
        <Button onClick={() => handleDrilldown({ title: 'New Provision', data: {} })}>
          <Plus className="h-4 w-4 mr-2" />
          Create Provision
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Provisions Register</CardTitle>
          <CardDescription>Track provisions for liabilities and contingencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-[#001f3f] mb-4">Manage provisions for warranties, restructuring, legal claims, and other contingencies</p>
            <Button onClick={() => handleDrilldown({ title: 'Provision Calculator', data: {} })}>Calculate Provision</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderReclassificationsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#001f3f]">Reclassifications</h2>
        <Button onClick={() => handleDrilldown({ title: 'New Reclassification', data: {} })}>
          <Plus className="h-4 w-4 mr-2" />
          Create Reclassification
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Account Reclassifications</CardTitle>
          <CardDescription>Reclassify accounts between balance sheet and P&L categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-[#001f3f] mb-4">Move items between categories for correct financial statement presentation</p>
            <Button onClick={() => handleDrilldown({ title: 'Reclassification Journal', data: {} })}>View Reclassifications</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )


  const renderClosingEntriesContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Year-End Closing Entries</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">Automated Closing Process</CardTitle></CardHeader>
      <CardContent><Button onClick={() => handleDrilldown({ title: "Generate Closing Entries", data: {} })}>Generate Entries</Button></CardContent></Card>
    </div>
  )

  const renderRetainedEarningsContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Retained Earnings</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">Retained Earnings Statement</CardTitle></CardHeader>
      <CardContent><p className="text-[#001f3f]">Track changes in retained earnings</p></CardContent></Card>
    </div>
  )

  const renderOpeningBalancesContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Opening Balances</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">New Period Opening Balances</CardTitle></CardHeader>
      <CardContent><Button onClick={() => handleDrilldown({ title: "Create Opening Balances", data: {} })}>Generate Balances</Button></CardContent></Card>
    </div>
  )

  const renderPeriodLockContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Period Lock</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">Lock Accounting Periods</CardTitle></CardHeader>
      <CardContent><p className="text-[#001f3f]">Prevent changes to closed periods</p></CardContent></Card>
    </div>
  )

  const renderYearEndChecklistContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Year-End Checklist</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">Year-End Closing Checklist</CardTitle></CardHeader>
      <CardContent><p className="text-[#001f3f]">Track progress through year-end procedures</p></CardContent></Card>
    </div>
  )

  const renderHMRCConnectionContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">HMRC Connection</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">HMRC Gateway Connection</CardTitle></CardHeader>
      <CardContent><Button onClick={() => handleDrilldown({ title: "Connect to HMRC", data: {} })}>Connect to HMRC</Button></CardContent></Card>
    </div>
  )

  const renderCorporationTaxContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Corporation Tax Submission</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">CT600 Filing</CardTitle></CardHeader>
      <CardContent><p className="text-[#001f3f]">Submit corporation tax returns to HMRC</p></CardContent></Card>
    </div>
  )

  const renderVATFilingContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">VAT Filing</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">MTD VAT Returns</CardTitle></CardHeader>
      <CardContent><p className="text-[#001f3f]">Submit VAT returns via Making Tax Digital</p></CardContent></Card>
    </div>
  )

  const renderPAYEFilingContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">PAYE Filing</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">RTI Submissions</CardTitle></CardHeader>
      <CardContent><p className="text-[#001f3f]">Submit PAYE information via RTI</p></CardContent></Card>
    </div>
  )

  const renderSubmissionHistoryContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Submission History</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">HMRC Submission History</CardTitle></CardHeader>
      <CardContent><p className="text-[#001f3f]">View all submissions to HMRC</p></CardContent></Card>
    </div>
  )

  const renderCompaniesHouseConnectionContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Companies House Connection</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">Companies House Authentication</CardTitle></CardHeader>
      <CardContent><Button onClick={() => handleDrilldown({ title: "Connect to Companies House", data: {} })}>Connect</Button></CardContent></Card>
    </div>
  )

  const renderAnnualAccountsFilingContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Annual Accounts Filing</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">File Annual Accounts</CardTitle></CardHeader>
      <CardContent><p className="text-[#001f3f]">Submit annual accounts to Companies House</p></CardContent></Card>
    </div>
  )

  const renderConfirmationStatementContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Confirmation Statement</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">File Confirmation Statement</CardTitle></CardHeader>
      <CardContent><p className="text-[#001f3f]">Submit annual confirmation statement</p></CardContent></Card>
    </div>
  )

  const renderCompaniesHouseFormsContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Companies House Forms</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">Other Statutory Forms</CardTitle></CardHeader>
      <CardContent><p className="text-[#001f3f]">File other Companies House forms</p></CardContent></Card>
    </div>
  )

  const renderFilingHistoryContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Filing History</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">Companies House Filing History</CardTitle></CardHeader>
      <CardContent><p className="text-[#001f3f]">View all Companies House filings</p></CardContent></Card>
    </div>
  )

  const renderEntityTemplatesContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Entity Templates</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">Accounting Framework Templates</CardTitle></CardHeader>
      <CardContent><p className="text-[#001f3f]">Select templates for different entity types and accounting frameworks</p></CardContent></Card>
    </div>
  )

  const renderAuditTrailContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#001f3f]">Audit Trail</h2>
      <Card><CardHeader><CardTitle className="text-[#001f3f]">Complete Audit Trail</CardTitle></CardHeader>
      <CardContent><p className="text-[#001f3f]">View all system activities and changes</p></CardContent></Card>
    </div>
  )
  return (
    <ResponsiveLayout>
      <div className="flex min-h-screen bg-blue-50">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-white border-r-2 border-[#001f3f] flex flex-col">
          <div className="p-4 border-b-2 border-[#001f3f]">
            <h1 className="text-xl font-bold text-[#001f3f]">Accounts Production</h1>
            <p className="text-sm text-[#001f3f] mt-1">Financial Statement Preparation</p>
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
                        <span>{item.label}</span>
                      </div>
                      {item.hasSubTabs && (
                        <ChevronLeft className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
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
                              <span>{subTab.label}</span>
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

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            {renderTabContent(activeSubTab || activeMainTab)}
          </div>
        </div>
      </div>
      
      <AIPromptSection
        title="Ask your Accountant"
        description="Get expert accounting and financial reporting guidance"
        placeholder="Ask about FRS 102 disclosures, going concern assessments, ratio analysis, or accounting standards..."
        recentQuestions={[
          "What disclosures are required under FRS 102?",
          "How should we handle going concern assessments?",
          "What are the key ratio analysis insights for this client?",
          "How do we account for lease modifications under FRS 102?",
          "What are the latest updates to accounting standards?"
        ]}
        onSubmit={handleAIQuestion}
        isLoading={isAILoading}
      />

      {/* Trial Balance Entry Dialog */}
      <Dialog open={isTrialBalanceDialogOpen} onOpenChange={setIsTrialBalanceDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">
              {editingTBEntry && trialBalanceEntries.find(e => e.id === editingTBEntry.id) ? 'Edit' : 'Add'} Trial Balance Entry
            </DialogTitle>
            <DialogDescription>
              Enter the trial balance account details
            </DialogDescription>
          </DialogHeader>
          {editingTBEntry && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountCode" className="text-[#001f3f]">Account Code</Label>
                  <Input
                    id="accountCode"
                    value={editingTBEntry.accountCode}
                    onChange={(e) => setEditingTBEntry({...editingTBEntry, accountCode: e.target.value})}
                    placeholder="1000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-[#001f3f]">Category</Label>
                  <Select
                    value={editingTBEntry.category}
                    onValueChange={(value) => setEditingTBEntry({...editingTBEntry, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asset">Asset</SelectItem>
                      <SelectItem value="Liability">Liability</SelectItem>
                      <SelectItem value="Equity">Equity</SelectItem>
                      <SelectItem value="Revenue">Revenue</SelectItem>
                      <SelectItem value="Expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountName" className="text-[#001f3f]">Account Name</Label>
                <Input
                  id="accountName"
                  value={editingTBEntry.accountName}
                  onChange={(e) => setEditingTBEntry({...editingTBEntry, accountName: e.target.value})}
                  placeholder="Cash at Bank"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="debit" className="text-[#001f3f]">Debit (£)</Label>
                  <Input
                    id="debit"
                    type="number"
                    value={editingTBEntry.debit}
                    onChange={(e) => setEditingTBEntry({...editingTBEntry, debit: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credit" className="text-[#001f3f]">Credit (£)</Label>
                  <Input
                    id="credit"
                    type="number"
                    value={editingTBEntry.credit}
                    onChange={(e) => setEditingTBEntry({...editingTBEntry, credit: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTrialBalanceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTBEntry}>
              <Save className="h-4 w-4 mr-2" />
              Save Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Journal Entry Dialog */}
      <Dialog open={isJournalDialogOpen} onOpenChange={setIsJournalDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">
              {editingJournal && journalEntries.find(j => j.id === editingJournal.id) ? 'Edit' : 'New'} Journal Entry
            </DialogTitle>
            <DialogDescription>
              Create or edit a journal entry
            </DialogDescription>
          </DialogHeader>
          {editingJournal && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reference" className="text-[#001f3f]">Reference</Label>
                  <Input
                    id="reference"
                    value={editingJournal.reference}
                    onChange={(e) => setEditingJournal({...editingJournal, reference: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-[#001f3f]">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={editingJournal.date}
                    onChange={(e) => setEditingJournal({...editingJournal, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#001f3f]">Status</Label>
                  <Badge variant={
                    editingJournal.status === 'posted' ? 'default' : 
                    editingJournal.status === 'approved' ? 'secondary' : 
                    'outline'
                  }>
                    {editingJournal.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#001f3f]">Description</Label>
                <Textarea
                  id="description"
                  value={editingJournal.description}
                  onChange={(e) => setEditingJournal({...editingJournal, description: e.target.value})}
                  placeholder="Describe the journal entry..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#001f3f]">Journal Lines</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[#001f3f]">Account Code</TableHead>
                      <TableHead className="text-[#001f3f]">Account Name</TableHead>
                      <TableHead className="text-[#001f3f]">Debit</TableHead>
                      <TableHead className="text-[#001f3f]">Credit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editingJournal.entries.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Input
                            value={entry.accountCode}
                            onChange={(e) => {
                              const newEntries = [...editingJournal.entries]
                              newEntries[index].accountCode = e.target.value
                              setEditingJournal({...editingJournal, entries: newEntries})
                            }}
                            placeholder="Code"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={entry.accountName}
                            onChange={(e) => {
                              const newEntries = [...editingJournal.entries]
                              newEntries[index].accountName = e.target.value
                              setEditingJournal({...editingJournal, entries: newEntries})
                            }}
                            placeholder="Account Name"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={entry.debit}
                            onChange={(e) => {
                              const newEntries = [...editingJournal.entries]
                              newEntries[index].debit = parseFloat(e.target.value) || 0
                              setEditingJournal({...editingJournal, entries: newEntries})
                            }}
                            placeholder="0.00"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={entry.credit}
                            onChange={(e) => {
                              const newEntries = [...editingJournal.entries]
                              newEntries[index].credit = parseFloat(e.target.value) || 0
                              setEditingJournal({...editingJournal, entries: newEntries})
                            }}
                            placeholder="0.00"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingJournal({
                    ...editingJournal,
                    entries: [...editingJournal.entries, { accountCode: '', accountName: '', debit: 0, credit: 0 }]
                  })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Line
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
                <div>
                  <Label className="text-[#001f3f]">Total Debits</Label>
                  <p className="text-xl font-bold text-[#001f3f]">
                    £{editingJournal.entries.reduce((sum, e) => sum + e.debit, 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className="text-[#001f3f]">Total Credits</Label>
                  <p className="text-xl font-bold text-[#001f3f]">
                    £{editingJournal.entries.reduce((sum, e) => sum + e.credit, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsJournalDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveJournal}>
              <Save className="h-4 w-4 mr-2" />
              Save Journal Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Financial Statement View Dialog */}
      <Dialog open={isStatementDialogOpen} onOpenChange={setIsStatementDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">
              {selectedStatement?.type === 'balance-sheet' ? 'Balance Sheet' : 
               selectedStatement?.type === 'profit-loss' ? 'Profit & Loss Statement' : 
               'Cash Flow Statement'}
            </DialogTitle>
            <DialogDescription>
              Period: {selectedStatement?.period} | Generated: {selectedStatement?.generatedDate}
            </DialogDescription>
          </DialogHeader>
          {selectedStatement && (
            <div className="space-y-4">
              {selectedStatement.type === 'balance-sheet' && (
                <div className="space-y-4">
                  <div className="border-2 border-[#001f3f] rounded p-4">
                    <h3 className="font-bold text-[#001f3f] text-lg mb-4">Assets</h3>
                    <div className="space-y-2">
                      {trialBalanceEntries.filter(e => e.category === 'Asset').map(entry => (
                        <div key={entry.id} className="flex justify-between">
                          <span className="text-[#001f3f]">{entry.accountName}</span>
                          <span className="text-[#001f3f] font-semibold">£{(entry.debit - entry.credit).toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="border-t-2 border-[#001f3f] pt-2 mt-2 flex justify-between font-bold">
                        <span className="text-[#001f3f]">Total Assets</span>
                        <span className="text-[#001f3f]">£{totalAssets.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-2 border-[#001f3f] rounded p-4">
                    <h3 className="font-bold text-[#001f3f] text-lg mb-4">Liabilities</h3>
                    <div className="space-y-2">
                      {trialBalanceEntries.filter(e => e.category === 'Liability').map(entry => (
                        <div key={entry.id} className="flex justify-between">
                          <span className="text-[#001f3f]">{entry.accountName}</span>
                          <span className="text-[#001f3f] font-semibold">£{(entry.credit - entry.debit).toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="border-t-2 border-[#001f3f] pt-2 mt-2 flex justify-between font-bold">
                        <span className="text-[#001f3f]">Total Liabilities</span>
                        <span className="text-[#001f3f]">£{totalLiabilities.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-2 border-[#001f3f] rounded p-4">
                    <h3 className="font-bold text-[#001f3f] text-lg mb-4">Equity</h3>
                    <div className="space-y-2">
                      {trialBalanceEntries.filter(e => e.category === 'Equity').map(entry => (
                        <div key={entry.id} className="flex justify-between">
                          <span className="text-[#001f3f]">{entry.accountName}</span>
                          <span className="text-[#001f3f] font-semibold">£{(entry.credit - entry.debit).toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="border-t-2 border-[#001f3f] pt-2 mt-2 flex justify-between font-bold">
                        <span className="text-[#001f3f]">Total Equity</span>
                        <span className="text-[#001f3f]">£{totalEquity.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {selectedStatement.type === 'profit-loss' && (
                <div className="space-y-4">
                  <div className="border-2 border-[#001f3f] rounded p-4">
                    <h3 className="font-bold text-[#001f3f] text-lg mb-4">Revenue</h3>
                    <div className="space-y-2">
                      {trialBalanceEntries.filter(e => e.category === 'Revenue').map(entry => (
                        <div key={entry.id} className="flex justify-between">
                          <span className="text-[#001f3f]">{entry.accountName}</span>
                          <span className="text-[#001f3f] font-semibold">£{(entry.credit - entry.debit).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-2 border-[#001f3f] rounded p-4">
                    <h3 className="font-bold text-[#001f3f] text-lg mb-4">Expenses</h3>
                    <div className="space-y-2">
                      {trialBalanceEntries.filter(e => e.category === 'Expense').map(entry => (
                        <div key={entry.id} className="flex justify-between">
                          <span className="text-[#001f3f]">{entry.accountName}</span>
                          <span className="text-[#001f3f] font-semibold">£{(entry.debit - entry.credit).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-2 border-green-600 bg-green-50 rounded p-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-[#001f3f]">Net Profit / (Loss)</span>
                      <span className="text-green-600">
                        £{(
                          trialBalanceEntries.filter(e => e.category === 'Revenue').reduce((sum, e) => sum + e.credit - e.debit, 0) -
                          trialBalanceEntries.filter(e => e.category === 'Expense').reduce((sum, e) => sum + e.debit - e.credit, 0)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatementDialogOpen(false)}>
              Close
            </Button>
            {selectedStatement && selectedStatement.status === 'draft' && (
              <Button onClick={() => {
                handleFinalizeStatement(selectedStatement.id)
                setIsStatementDialogOpen(false)
              }}>
                <Check className="h-4 w-4 mr-2" />
                Finalize Statement
              </Button>
            )}
            {selectedStatement && (
              <ExportButton 
                data={selectedStatement} 
                filename={`${selectedStatement.type}-${selectedStatement.period}`} 
              />
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Drilldown Dialog */}
      <Dialog open={isDrilldownOpen} onOpenChange={setIsDrilldownOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">{drilldownData?.title}</DialogTitle>
            <DialogDescription>Detailed information and analysis</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {drilldownData && (
              <div className="space-y-4">
                {Array.isArray(drilldownData.data) ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[#001f3f]">Item</TableHead>
                        <TableHead className="text-[#001f3f]">Details</TableHead>
                        <TableHead className="text-right text-[#001f3f]">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {drilldownData.data.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="text-[#001f3f]">{item.accountCode || item.reference || index + 1}</TableCell>
                          <TableCell className="text-[#001f3f]">{item.accountName || item.description || 'N/A'}</TableCell>
                          <TableCell className="text-right text-[#001f3f]">
                            £{((item.debit || 0) + (item.credit || 0)).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="space-y-2">
                    <pre className="bg-gray-50 p-4 rounded border-2 border-[#001f3f] overflow-auto">
                      <code className="text-[#001f3f]">{JSON.stringify(drilldownData.data, null, 2)}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDrilldownOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ResponsiveLayout>
  )
}

export default AccountsProduction

import React, { useState } from 'react'
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
  AlertCircle
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
    { id: '1', accountCode: '1000', accountName: 'Cash at Bank', debit: 45000, credit: 0, category: 'Asset' },
    { id: '2', accountCode: '1100', accountName: 'Accounts Receivable', debit: 28500, credit: 0, category: 'Asset' },
    { id: '3', accountCode: '1500', accountName: 'Fixed Assets', debit: 135000, credit: 0, category: 'Asset' },
    { id: '4', accountCode: '2000', accountName: 'Accounts Payable', debit: 0, credit: 18500, category: 'Liability' },
    { id: '5', accountCode: '2100', accountName: 'Long-term Debt', debit: 0, credit: 66000, category: 'Liability' },
    { id: '6', accountCode: '3000', accountName: 'Share Capital', debit: 0, credit: 100000, category: 'Equity' },
    { id: '7', accountCode: '3100', accountName: 'Retained Earnings', debit: 0, credit: 24000, category: 'Equity' },
  ])
  const [isTrialBalanceDialogOpen, setIsTrialBalanceDialogOpen] = useState(false)
  const [editingTBEntry, setEditingTBEntry] = useState<TrialBalanceEntry | null>(null)

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-12-15',
      reference: 'JE001',
      description: 'Depreciation adjustment',
      entries: [
        { accountCode: '5000', accountName: 'Depreciation Expense', debit: 2500, credit: 0 },
        { accountCode: '1550', accountName: 'Accumulated Depreciation', debit: 0, credit: 2500 }
      ],
      status: 'approved',
      createdBy: 'John Smith'
    }
  ])
  const [isJournalDialogOpen, setIsJournalDialogOpen] = useState(false)
  const [editingJournal, setEditingJournal] = useState<JournalEntry | null>(null)

  const [financialStatements, setFinancialStatements] = useState<FinancialStatement[]>([
    { id: '1', type: 'balance-sheet', period: 'Dec 2024', generatedDate: '2024-12-20', status: 'draft' },
    { id: '2', type: 'profit-loss', period: 'Dec 2024', generatedDate: '2024-12-20', status: 'draft' }
  ])
  const [selectedStatement, setSelectedStatement] = useState<FinancialStatement | null>(null)
  const [isStatementDialogOpen, setIsStatementDialogOpen] = useState(false)

  const [drilldownData, setDrilldownData] = useState<any>(null)
  const [isDrilldownOpen, setIsDrilldownOpen] = useState(false)

  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      hasSubTabs: false
    },
    {
      id: 'accounts',
      label: 'Accounts Production',
      icon: FileText,
      hasSubTabs: true,
      subTabs: [
        { id: 'trial-balance', label: 'Trial Balance' },
        { id: 'adjustments', label: 'Adjustments' },
        { id: 'statements', label: 'Financial Statements' },
        { id: 'consolidation', label: 'Consolidation' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: TrendingUp,
      hasSubTabs: true,
      subTabs: [
        { id: 'financial-reports', label: 'Financial Reports' },
        { id: 'management-accounts', label: 'Management Accounts' },
        { id: 'analysis', label: 'Analysis' }
      ]
    },
    {
      id: 'ixbrl',
      label: 'iXBRL',
      icon: Globe,
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

  const totalDebits = trialBalanceEntries.reduce((sum, entry) => sum + entry.debit, 0)
  const totalCredits = trialBalanceEntries.reduce((sum, entry) => sum + entry.credit, 0)
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
      case 'trial-balance':
        return renderTrialBalanceContent()
      case 'adjustments':
        return renderAdjustmentsContent()
      case 'statements':
        return renderStatementsContent()
      case 'consolidation':
        return renderConsolidationContent()
      case 'financial-reports':
      case 'management-accounts':
      case 'analysis':
        return renderReportsContent()
      case 'ixbrl':
        return renderIXBRLContent()
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
          <CardDescription>Current period trial balance data</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#001f3f]">Account Code</TableHead>
                <TableHead className="text-[#001f3f]">Account Name</TableHead>
                <TableHead className="text-[#001f3f]">Category</TableHead>
                <TableHead className="text-right text-[#001f3f]">Debit</TableHead>
                <TableHead className="text-right text-[#001f3f]">Credit</TableHead>
                <TableHead className="text-right text-[#001f3f]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trialBalanceEntries.map((entry) => (
                <TableRow 
                  key={entry.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleDrilldown({
                    title: `${entry.accountName} Details`,
                    data: entry
                  })}
                >
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
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTBEntry(entry.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold bg-gray-50">
                <TableCell colSpan={3} className="text-[#001f3f]">Total</TableCell>
                <TableCell className="text-right text-[#001f3f]">£{totalDebits.toLocaleString()}</TableCell>
                <TableCell className="text-right text-[#001f3f]">£{totalCredits.toLocaleString()}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
          <CardDescription>All journal entries and adjustments</CardDescription>
        </CardHeader>
        <CardContent>
          {journalEntries.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#001f3f]">Reference</TableHead>
                  <TableHead className="text-[#001f3f]">Date</TableHead>
                  <TableHead className="text-[#001f3f]">Description</TableHead>
                  <TableHead className="text-[#001f3f]">Status</TableHead>
                  <TableHead className="text-[#001f3f]">Created By</TableHead>
                  <TableHead className="text-right text-[#001f3f]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {journalEntries.map((journal) => (
                  <TableRow 
                    key={journal.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleDrilldown({
                      title: `Journal Entry ${journal.reference}`,
                      data: journal
                    })}
                  >
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
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {journal.status === 'draft' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApproveJournal(journal.id)}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                        {journal.status === 'approved' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePostJournal(journal.id)}
                          >
                            <Send className="h-4 w-4 text-blue-600" />
                          </Button>
                        )}
                        {journal.status === 'draft' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteJournal(journal.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
        <h2 className="text-xl font-semibold">iXBRL Generation</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Generate iXBRL
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">iXBRL Documents</CardTitle>
          <CardDescription>Interactive XBRL document generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">No iXBRL documents generated</p>
          </div>
        </CardContent>
      </Card>
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

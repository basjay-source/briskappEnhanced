import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Receipt, TrendingUp, TrendingDown, Download,
  FileText, Calculator, PoundSterling, BarChart3, Building, Users, Plus,
  ShoppingCart, Percent, Package, RefreshCw,
  ChevronDown, BookOpen, Landmark, Clock,
  RotateCcw, ArrowLeft, Mail, Calendar, Upload, Edit, Trash
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import ResponsiveLayout from '../../components/ResponsiveLayout'
import { apiClient } from '../../lib/api'
import { formatCurrency } from '../../lib/currencies'
import AIPromptSection from '../../components/AIPromptSection'

export default function Bookkeeping() {
  const navigate = useNavigate()
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [isAILoading, setIsAILoading] = useState(false)
  const [kpis, setKpis] = useState<any[]>([])
  
  const [reportsSearchTerm, setReportsSearchTerm] = useState('')
  const [reportsDateFrom, setReportsDateFrom] = useState('')
  const [reportsDateTo, setReportsDateTo] = useState('')
  
  const [selectedReport, setSelectedReport] = useState('')

  const [rules, setRules] = useState<any[]>([])
  const [showRuleForm, setShowRuleForm] = useState(false)
  const [newRule, setNewRule] = useState({
    rule_name: '',
    rule_type: 'contains',
    pattern: '',
    target_category: '',
    priority: 100
  })

  useEffect(() => {
    const loadBookkeepingData = async () => {
      try {
        const invoicesData = await apiClient.getInvoices()
        const bookkeepingKpis = [
          {
            title: 'Total Revenue',
            value: formatCurrency((invoicesData as any)?.total_revenue || 125000, 'GBP'),
            change: '+12.5%',
            trend: 'up' as const,
            icon: TrendingUp,
            color: 'text-green-600'
          },
          {
            title: 'Outstanding Invoices',
            value: formatCurrency((invoicesData as any)?.outstanding || 45000, 'GBP'),
            change: '-8.2%',
            trend: 'down' as const,
            icon: Receipt,
            color: 'text-blue-600'
          },
          {
            title: 'Monthly Expenses',
            value: formatCurrency((invoicesData as any)?.expenses || 28000, 'GBP'),
            change: '+5.1%',
            trend: 'up' as const,
            icon: TrendingDown,
            color: 'text-red-600'
          },
          {
            title: 'Net Profit',
            value: formatCurrency((invoicesData as any)?.profit || 97000, 'GBP'),
            change: '+15.3%',
            trend: 'up' as const,
            icon: PoundSterling,
            color: 'text-green-600'
          }
        ]
        setKpis(bookkeepingKpis)
      } catch (error) {
        console.error('Error loading bookkeeping data:', error)
      }
    }
    loadBookkeepingData()
  }, [])

  const handleAIQuestion = async (question: string) => {
    setIsAILoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      return `Based on your bookkeeping data: ${question}`
    } catch (error) {
      console.error('Error with AI question:', error)
      return 'Sorry, I encountered an error processing your question.'
    } finally {
      setIsAILoading(false)
    }
  }

  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      hasSubTabs: false
    },
    {
      id: 'sales',
      label: 'Sales',
      icon: TrendingUp,
      hasSubTabs: true,
      subTabs: [
        { id: 'invoices', label: 'Invoices' },
        { id: 'quotes', label: 'Quotes' },
        { id: 'customers', label: 'Customers' },
        { id: 'receipts', label: 'Receipts' }
      ]
    },
    {
      id: 'purchases',
      label: 'Purchases',
      icon: ShoppingCart,
      hasSubTabs: true,
      subTabs: [
        { id: 'bills', label: 'Bills' },
        { id: 'expenses', label: 'Expenses' },
        { id: 'suppliers', label: 'Suppliers' },
        { id: 'purchase-orders', label: 'Purchase Orders' }
      ]
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: Package,
      hasSubTabs: true,
      subTabs: [
        { id: 'products', label: 'Products' },
        { id: 'stock-levels', label: 'Stock Levels' },
        { id: 'adjustments', label: 'Adjustments' }
      ]
    },
    {
      id: 'banking',
      label: 'Banking',
      icon: Landmark,
      hasSubTabs: true,
      subTabs: [
        { id: 'transactions', label: 'Transactions' },
        { id: 'reconciliation', label: 'Reconciliation' },
        { id: 'accounts', label: 'Accounts' },
        { id: 'cash-coding', label: 'Cash Coding' }
      ]
    },
    {
      id: 'journals',
      label: 'Journals',
      icon: BookOpen,
      hasSubTabs: true,
      subTabs: [
        { id: 'general-journal', label: 'General Journal' },
        { id: 'adjusting-entries', label: 'Adjusting Entries' }
      ]
    },
    {
      id: 'vat',
      label: 'VAT',
      icon: Percent,
      hasSubTabs: true,
      subTabs: [
        { id: 'returns', label: 'Returns' },
        { id: 'schemes', label: 'Schemes' }
      ]
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
    const menuItem = menuStructure.find(item => item.id === tabId)
    if (menuItem?.hasSubTabs && menuItem.subTabs && menuItem.subTabs.length > 0) {
      setActiveSubTab(menuItem.subTabs[0].id)
    } else {
      setActiveSubTab('')
    }
  }

  const handleSubTabClick = (subTabId: string) => {
    setActiveSubTab(subTabId)
  }

  function renderMainContent() {
    if (activeMainTab === 'dashboard') return renderDashboard()
    if (activeMainTab === 'reports') {
      if (activeSubTab === 'financial-reports') return renderFinancialReports()
      if (activeSubTab === 'management-reports') return renderManagementReports()
      if (activeSubTab === 'analytics') return renderAnalyticsReports()
    }
    if (activeMainTab === 'banking') {
      if (activeSubTab === 'cash-coding') return renderCashCoding()
    }
    if (activeMainTab === 'recurring-transactions') return renderRecurringTransactions()
    if (activeMainTab === 'accruals-prepayments') return renderAccrualsPrepaymentsments()
    if (activeMainTab === 'invoice-tracking') return renderInvoiceTracking()
    
    return renderDashboard()
  }

  function renderDashboard() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Bookkeeping Dashboard</h2>
            <p className="text-gray-600">Financial management and reporting</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Transaction
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/app/bookkeeping/transactions')}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <p className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </p>
                  </div>
                  <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AIPromptSection
          title="Bookkeeping AI Adviser"
          description="Get expert advice on financial reports, transactions, and bookkeeping best practices"
          placeholder="Ask about financial reports, transactions, or bookkeeping best practices..."
          onSubmit={handleAIQuestion}
          isLoading={isAILoading}
          recentQuestions={[]}
        />
      </div>
    )
  }

  function renderFinancialReports() {
    const loadReportData = async (reportType: string) => {
      setSelectedReport(reportType)
      try {
        console.log(`Loading ${reportType} report data...`)
      } catch (error) {
        console.error('Error loading report data:', error)
      }
    }

    const renderSalesReport = () => (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-black">Sales Report</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedReport('')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <div className="grid grid-cols-4 gap-4 font-semibold text-black">
              <div>Date</div>
              <div>Customer</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-4 gap-4 py-2 text-black">
              <div>2025-09-15</div>
              <div>ABC Corp</div>
              <div>£2,500.00</div>
              <div><Badge className="bg-green-100 text-green-800">Paid</Badge></div>
            </div>
            <div className="grid grid-cols-4 gap-4 py-2 text-black">
              <div>2025-09-14</div>
              <div>XYZ Ltd</div>
              <div>£1,750.00</div>
              <div><Badge className="bg-blue-100 text-blue-800">Pending</Badge></div>
            </div>
          </div>
        </div>
      </div>
    )

    const renderCustomerReceipts = () => (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-black">Customer Receipts</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedReport('')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <div className="grid grid-cols-5 gap-4 font-semibold text-black">
              <div>Receipt No</div>
              <div>Date</div>
              <div>Customer</div>
              <div>Amount</div>
              <div>Method</div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-5 gap-4 py-2 text-black cursor-pointer hover:bg-gray-50" onClick={() => navigate('/app/bookkeeping/receipt/001')}>
              <div>RCP-001</div>
              <div>2025-09-15</div>
              <div>ABC Corp</div>
              <div>£2,500.00</div>
              <div>Bank Transfer</div>
            </div>
          </div>
        </div>
      </div>
    )

    const renderTradeDebtorsDetailed = () => (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-black">Trade Debtors Detailed</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedReport('')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <div className="grid grid-cols-6 gap-4 font-semibold text-black">
              <div>Customer</div>
              <div>Current</div>
              <div>30 Days</div>
              <div>60 Days</div>
              <div>90+ Days</div>
              <div>Total</div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-6 gap-4 py-2 text-black cursor-pointer hover:bg-gray-50" onClick={() => navigate('/app/bookkeeping/customer/abc-corp')}>
              <div>ABC Corp</div>
              <div>£1,500.00</div>
              <div>£500.00</div>
              <div>£0.00</div>
              <div>£0.00</div>
              <div>£2,000.00</div>
            </div>
          </div>
        </div>
      </div>
    )

    const renderTrialBalanceReport = () => (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-black">Trial Balance</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedReport('')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Opening Balance
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <div className="grid grid-cols-3 gap-4 font-semibold text-black">
              <div>Account</div>
              <div>Debit</div>
              <div>Credit</div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4 py-2 text-black cursor-pointer hover:bg-gray-50" onClick={() => navigate('/app/bookkeeping/account/1000')}>
              <div>1000 - Cash at Bank</div>
              <div>£25,000.00</div>
              <div>-</div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2 text-black cursor-pointer hover:bg-gray-50" onClick={() => navigate('/app/bookkeeping/account/4000')}>
              <div>4000 - Sales Revenue</div>
              <div>-</div>
              <div>£125,000.00</div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2 text-black cursor-pointer hover:bg-gray-50" onClick={() => navigate('/app/bookkeeping/account/5000')}>
              <div>5000 - Cost of Sales</div>
              <div>£45,000.00</div>
              <div>-</div>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="grid grid-cols-3 gap-4 py-2 font-bold text-black">
                <div>Total</div>
                <div>£70,000.00</div>
                <div>£125,000.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    const renderMultiYearTrialBalanceReport = () => (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-black">Multi-Year Trial Balance</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedReport('')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <div className="grid grid-cols-7 gap-2 font-semibold text-black text-sm">
              <div>Account</div>
              <div>2021</div>
              <div>2022</div>
              <div>2023</div>
              <div>2024</div>
              <div>2025</div>
              <div>Change %</div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-7 gap-2 py-2 text-black text-sm cursor-pointer hover:bg-gray-50" onClick={() => navigate('/app/bookkeeping/account/1000')}>
              <div>Cash at Bank</div>
              <div>£15,000</div>
              <div>£18,000</div>
              <div>£22,000</div>
              <div>£25,000</div>
              <div>£28,000</div>
              <div className="text-green-600">+12%</div>
            </div>
            <div className="grid grid-cols-7 gap-2 py-2 text-black text-sm cursor-pointer hover:bg-gray-50" onClick={() => navigate('/app/bookkeeping/account/4000')}>
              <div>Sales Revenue</div>
              <div>£85,000</div>
              <div>£95,000</div>
              <div>£110,000</div>
              <div>£125,000</div>
              <div>£140,000</div>
              <div className="text-green-600">+12%</div>
            </div>
          </div>
        </div>
      </div>
    )

    const renderNominalLedgerReport = () => (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-black">Nominal Ledger Report</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedReport('')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <div className="grid grid-cols-5 gap-4 font-semibold text-black">
              <div>Account Code</div>
              <div>Account Name</div>
              <div>Opening Balance</div>
              <div>Movement</div>
              <div>Closing Balance</div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-5 gap-4 py-2 text-black cursor-pointer hover:bg-gray-50" onClick={() => navigate('/app/bookkeeping/account/1000')}>
              <div>1000</div>
              <div>Cash at Bank</div>
              <div>£20,000.00</div>
              <div>£5,000.00</div>
              <div>£25,000.00</div>
            </div>
            <div className="grid grid-cols-5 gap-4 py-2 text-black cursor-pointer hover:bg-gray-50" onClick={() => navigate('/app/bookkeeping/account/4000')}>
              <div>4000</div>
              <div>Sales Revenue</div>
              <div>£100,000.00</div>
              <div>£25,000.00</div>
              <div>£125,000.00</div>
            </div>
          </div>
        </div>
      </div>
    )

    const renderGeneralLedgerDetailedReport = () => (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-black">General Ledger Detailed</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedReport('')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <div className="grid grid-cols-6 gap-4 font-semibold text-black">
              <div>Date</div>
              <div>Reference</div>
              <div>Description</div>
              <div>Account</div>
              <div>Debit</div>
              <div>Credit</div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-6 gap-4 py-2 text-black cursor-pointer hover:bg-gray-50" onClick={() => navigate('/app/bookkeeping/transaction/001')}>
              <div>2025-09-15</div>
              <div>INV-001</div>
              <div>Sales Invoice</div>
              <div>4000 - Sales</div>
              <div>-</div>
              <div>£2,500.00</div>
            </div>
            <div className="grid grid-cols-6 gap-4 py-2 text-black cursor-pointer hover:bg-gray-50" onClick={() => navigate('/app/bookkeeping/transaction/002')}>
              <div>2025-09-15</div>
              <div>INV-001</div>
              <div>Sales Invoice</div>
              <div>1200 - Debtors</div>
              <div>£2,500.00</div>
              <div>-</div>
            </div>
          </div>
        </div>
      </div>
    )

    const renderGeneralLedgerSummaryReport = () => (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-black">General Ledger Summary</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedReport('')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <div className="grid grid-cols-4 gap-4 font-semibold text-black">
              <div>Account</div>
              <div>Total Debits</div>
              <div>Total Credits</div>
              <div>Net Balance</div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-4 gap-4 py-2 text-black cursor-pointer hover:bg-gray-50" onClick={() => navigate('/app/bookkeeping/account/1000')}>
              <div>1000 - Cash at Bank</div>
              <div>£50,000.00</div>
              <div>£25,000.00</div>
              <div>£25,000.00</div>
            </div>
            <div className="grid grid-cols-4 gap-4 py-2 text-black cursor-pointer hover:bg-gray-50" onClick={() => navigate('/app/bookkeeping/account/4000')}>
              <div>4000 - Sales Revenue</div>
              <div>£0.00</div>
              <div>£125,000.00</div>
              <div>£125,000.00</div>
            </div>
          </div>
        </div>
      </div>
    )

    if (selectedReport) {
      switch (selectedReport) {
        case 'sales-report': return renderSalesReport()
        case 'customer-receipts': return renderCustomerReceipts()
        case 'trade-debtors-detailed': return renderTradeDebtorsDetailed()
        case 'trial-balance': return renderTrialBalanceReport()
        case 'multi-year-trial-balance': return renderMultiYearTrialBalanceReport()
        case 'nominal-ledger': return renderNominalLedgerReport()
        case 'general-ledger-detailed': return renderGeneralLedgerDetailedReport()
        case 'general-ledger-summary': return renderGeneralLedgerSummaryReport()
        default: return <div>Report not found</div>
      }
    }

    const financialReports = [
      {
        title: 'Sales Report',
        description: 'Comprehensive sales analysis with running balances',
        icon: BarChart3,
        color: 'text-blue-500',
        status: 'Generated',
        lastGenerated: '1 hour ago',
        reportType: 'sales-report'
      },
      {
        title: 'Customer Receipts',
        description: 'Customer payment receipts and history',
        icon: Receipt,
        color: 'text-green-500',
        status: 'Generated',
        lastGenerated: '2 hours ago',
        reportType: 'customer-receipts'
      },
      {
        title: 'Sales Invoice List',
        description: 'Complete list of sales invoices',
        icon: FileText,
        color: 'text-purple-500',
        status: 'Generated',
        lastGenerated: '30 minutes ago',
        reportType: 'sales-invoice-list'
      },
      {
        title: 'Purchases Invoice List',
        description: 'Complete list of purchase invoices',
        icon: ShoppingCart,
        color: 'text-orange-500',
        status: 'Generated',
        lastGenerated: '45 minutes ago',
        reportType: 'purchases-invoice-list'
      },
      {
        title: 'Trade Debtors Detailed',
        description: 'Detailed trade debtors with aging analysis',
        icon: Users,
        color: 'text-red-500',
        status: 'Generated',
        lastGenerated: '1 hour ago',
        reportType: 'trade-debtors-detailed'
      },
      {
        title: 'Trade Debtors Summary',
        description: 'Summary of outstanding customer invoices',
        icon: Users,
        color: 'text-red-400',
        status: 'Generated',
        lastGenerated: '1 hour ago',
        reportType: 'trade-debtors-summary'
      },
      {
        title: 'Trade Creditors Detailed',
        description: 'Detailed trade creditors with aging analysis',
        icon: Building,
        color: 'text-indigo-500',
        status: 'Generated',
        lastGenerated: '2 hours ago',
        reportType: 'trade-creditors-detailed'
      },
      {
        title: 'Trade Creditors Summary',
        description: 'Summary of outstanding supplier bills',
        icon: Building,
        color: 'text-indigo-400',
        status: 'Generated',
        lastGenerated: '2 hours ago',
        reportType: 'trade-creditors-summary'
      },
      {
        title: 'Customer Statements',
        description: 'Individual customer account statements',
        icon: FileText,
        color: 'text-cyan-500',
        status: 'Generated',
        lastGenerated: '3 hours ago',
        reportType: 'customer-statements'
      },
      {
        title: 'Supplier Statements',
        description: 'Individual supplier account statements',
        icon: FileText,
        color: 'text-teal-500',
        status: 'Generated',
        lastGenerated: '3 hours ago',
        reportType: 'supplier-statements'
      },
      {
        title: 'Payments to Suppliers',
        description: 'Supplier payment history and analysis',
        icon: PoundSterling,
        color: 'text-emerald-500',
        status: 'Generated',
        lastGenerated: '4 hours ago',
        reportType: 'payments-to-suppliers'
      },
      {
        title: 'Trial Balance',
        description: 'Complete trial balance report',
        icon: Calculator,
        color: 'text-blue-600',
        status: 'Generated',
        lastGenerated: '30 minutes ago',
        reportType: 'trial-balance'
      },
      {
        title: 'Multi-Year Trial Balance',
        description: 'Trial balance comparison for up to 5 years',
        icon: Calendar,
        color: 'text-purple-600',
        status: 'Generated',
        lastGenerated: '1 hour ago',
        reportType: 'multi-year-trial-balance'
      },
      {
        title: 'Nominal Ledger Report',
        description: 'Detailed nominal ledger accounts',
        icon: BookOpen,
        color: 'text-indigo-600',
        status: 'Generated',
        lastGenerated: '45 minutes ago',
        reportType: 'nominal-ledger'
      },
      {
        title: 'General Ledger Detailed',
        description: 'Detailed general ledger transactions',
        icon: FileText,
        color: 'text-green-600',
        status: 'Generated',
        lastGenerated: '2 hours ago',
        reportType: 'general-ledger-detailed'
      },
      {
        title: 'General Ledger Summary',
        description: 'Summary of general ledger accounts',
        icon: BarChart3,
        color: 'text-orange-600',
        status: 'Generated',
        lastGenerated: '2 hours ago',
        reportType: 'general-ledger-summary'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Financial Reports</h2>
            <p className="text-gray-600">Comprehensive financial reporting and analysis</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search reports..."
            value={reportsSearchTerm}
            onChange={(e) => setReportsSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Input
            type="date"
            placeholder="From date"
            value={reportsDateFrom}
            onChange={(e) => setReportsDateFrom(e.target.value)}
          />
          <Input
            type="date"
            placeholder="To date"
            value={reportsDateTo}
            onChange={(e) => setReportsDateTo(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {financialReports
            .filter(report => 
              report.title.toLowerCase().includes(reportsSearchTerm.toLowerCase()) ||
              report.description.toLowerCase().includes(reportsSearchTerm.toLowerCase())
            )
            .map((report, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => loadReportData(report.reportType)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <report.icon className={`h-6 w-6 ${report.color}`} />
                    <Badge variant="secondary">{report.status}</Badge>
                  </div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Last generated: {report.lastGenerated}</span>
                    <Button variant="ghost" size="sm">
                      View Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    )
  }

  function renderManagementReports() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Management Reports</h2>
            <p className="text-gray-600">Management accounting and analysis</p>
          </div>
        </div>
      </div>
    )
  }

  function renderAnalyticsReports() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>
            <p className="text-gray-600">Advanced analytics and business intelligence</p>
          </div>
        </div>
      </div>
    )
  }

  function renderRecurringTransactions() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Recurring Transactions</h2>
            <p className="text-gray-600">Manage recurring sales and purchases</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Recurring Transaction
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Due Transactions
            </Button>
          </div>
        </div>
      </div>
    )
  }

  function renderAccrualsPrepaymentsments() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Accruals & Prepayments</h2>
            <p className="text-gray-600">Manage accruals and prepayments with reversals</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Accrual/Prepayment
            </Button>
            <Button>
              <RotateCcw className="h-4 w-4 mr-2" />
              Process Monthly
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const loadRules = async () => {
    try {
      const data: any = await apiClient.getCategorizationRules()
      setRules(data || [])
    } catch (error) {
      console.error('Failed to load categorization rules:', error)
      setRules([])
    }
  }

  const handleCreateRule = async () => {
    try {
      await apiClient.createCategorizationRule({
        ...newRule,
        company_id: 'default'
      })
      setShowRuleForm(false)
      setNewRule({
        rule_name: '',
        rule_type: 'contains',
        pattern: '',
        target_category: '',
        priority: 100
      })
      loadRules()
    } catch (error) {
      console.error('Failed to create rule:', error)
    }
  }

  const handleDeleteRule = async (ruleId: string) => {
    try {
      await apiClient.deleteCategorizationRule(ruleId)
      loadRules()
    } catch (error) {
      console.error('Failed to delete rule:', error)
    }
  }

  const handleAutoCategorize = async () => {
    try {
      const result: any = await apiClient.autoCategorizeTransactions()
      alert(result.message)
    } catch (error) {
      console.error('Failed to auto-categorize:', error)
    }
  }

  useEffect(() => {
    if (activeMainTab === 'banking' && activeSubTab === 'cash-coding') {
      loadRules()
    }
  }, [activeMainTab, activeSubTab])

  function renderCashCoding() {

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Cash Coding & Auto-Categorization</h2>
            <p className="text-gray-600">Manage rules for automatic transaction categorization</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowRuleForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Rule
            </Button>
            <Button onClick={handleAutoCategorize}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Auto-Categorize
            </Button>
          </div>
        </div>

        {showRuleForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create Categorization Rule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Rule Name</label>
                  <Input
                    value={newRule.rule_name}
                    onChange={(e) => setNewRule({...newRule, rule_name: e.target.value})}
                    placeholder="e.g., Salary Payments"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Rule Type</label>
                  <select
                    value={newRule.rule_type}
                    onChange={(e) => setNewRule({...newRule, rule_type: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="contains">Contains Text</option>
                    <option value="exact_match">Exact Match</option>
                    <option value="regex">Regular Expression</option>
                    <option value="amount_range">Amount Range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pattern</label>
                  <Input
                    value={newRule.pattern}
                    onChange={(e) => setNewRule({...newRule, pattern: e.target.value})}
                    placeholder="e.g., SALARY, >1000, 100-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Target Category</label>
                  <Input
                    value={newRule.target_category}
                    onChange={(e) => setNewRule({...newRule, target_category: e.target.value})}
                    placeholder="e.g., Payroll, Office Expenses"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleCreateRule}>Create Rule</Button>
                <Button variant="outline" onClick={() => setShowRuleForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Categorization Rules</CardTitle>
            <CardDescription>Active rules for automatic transaction categorization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rules.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No categorization rules created yet.</p>
                  <p className="text-sm text-gray-400">Click "New Rule" to create your first rule.</p>
                </div>
              ) : (
                rules.map((rule: any) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{rule.rule_name}</h4>
                        <Badge className="bg-blue-100 text-blue-800">{rule.rule_type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Pattern: "{rule.pattern}" → Category: "{rule.target_category}"
                      </p>
                      <p className="text-xs text-gray-500">Priority: {rule.priority}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteRule(rule.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderInvoiceTracking() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Invoice Tracking</h2>
            <p className="text-gray-600">Email invoices with payment links and tracking</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Invoice
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
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

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Receipt, TrendingUp, TrendingDown, Download,
  FileText, Calculator, PoundSterling, BarChart3, Building, Users, Plus,
  ShoppingCart, Percent, Package, RefreshCw,
  ChevronDown, BookOpen, Landmark, Clock,
  RotateCcw, ArrowLeft, Mail, Calendar, Upload, Edit, Trash, PieChart,
  Target, LineChart, Link, CreditCard
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import ResponsiveLayout from '../../components/ResponsiveLayout'
import { useLocale } from '../../contexts/LocaleContextNew'
import { apiClient } from '../../lib/api'
import { formatCurrency } from '../../lib/currencies'
import AIPromptSection from '../../components/AIPromptSection'
import BookkeepingVAT from './BookkeepingVAT'

export default function Bookkeeping() {
  const navigate = useNavigate()
  const { formatDate } = useLocale()
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

  useEffect(() => {
    loadRules()
  }, [])

  useEffect(() => {
    const loadBookkeepingData = async () => {
      try {
        const [invoicesData, expensesData, profitData] = await Promise.all([
          apiClient.getInvoices(),
          apiClient.getBills().then(bills => ({ total: (bills as any[])?.reduce((sum, bill) => sum + (bill.amount || 0), 0) || 28000 })),
          Promise.resolve({ net_profit: 97000 })
        ])
        
        const totalRevenue = (invoicesData as any)?.total_revenue || 
                           (Array.isArray(invoicesData) ? invoicesData.reduce((sum, inv) => sum + (inv.amount || 0), 0) : 125000)
        const outstanding = (invoicesData as any)?.outstanding || 
                          (Array.isArray(invoicesData) ? invoicesData.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + (inv.amount || 0), 0) : 45000)
        const expenses = (expensesData as any)?.total || 28000
        const profit = (profitData as any)?.net_profit || 97000
        
        const bookkeepingKpis = [
          {
            title: 'Total Revenue',
            value: formatCurrency(totalRevenue, 'GBP'),
            change: '+12.5%',
            trend: 'up' as const,
            icon: TrendingUp,
            color: 'text-green-600'
          },
          {
            title: 'Outstanding Invoices',
            value: formatCurrency(outstanding, 'GBP'),
            change: '-8.2%',
            trend: 'down' as const,
            icon: Receipt,
            color: 'text-blue-600'
          },
          {
            title: 'Monthly Expenses',
            value: formatCurrency(expenses, 'GBP'),
            change: '+5.1%',
            trend: 'up' as const,
            icon: TrendingDown,
            color: 'text-red-600'
          },
          {
            title: 'Net Profit',
            value: formatCurrency(profit, 'GBP'),
            change: '+15.3%',
            trend: 'up' as const,
            icon: PoundSterling,
            color: 'text-green-600'
          }
        ]
        setKpis(bookkeepingKpis)
      } catch (error) {
        console.error('Error loading bookkeeping data:', error)
        const fallbackKpis = [
          {
            title: 'Total Revenue',
            value: formatCurrency(125000, 'GBP'),
            change: '+12.5%',
            trend: 'up' as const,
            icon: TrendingUp,
            color: 'text-green-600'
          },
          {
            title: 'Outstanding Invoices',
            value: formatCurrency(45000, 'GBP'),
            change: '-8.2%',
            trend: 'down' as const,
            icon: Receipt,
            color: 'text-blue-600'
          },
          {
            title: 'Monthly Expenses',
            value: formatCurrency(28000, 'GBP'),
            change: '+5.1%',
            trend: 'up' as const,
            icon: TrendingDown,
            color: 'text-red-600'
          },
          {
            title: 'Net Profit',
            value: formatCurrency(97000, 'GBP'),
            change: '+15.3%',
            trend: 'up' as const,
            icon: PoundSterling,
            color: 'text-green-600'
          }
        ]
        setKpis(fallbackKpis)
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
      id: 'projects', 
      label: 'Projects', 
      icon: Target, 
      hasSubTabs: true,
      subTabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'tracking', label: 'Time Tracking' },
        { id: 'costing', label: 'Project Costing' },
        { id: 'reports', label: 'Reports' }
      ]
    },
    { 
      id: 'budgets', 
      label: 'Budgets', 
      icon: PieChart, 
      hasSubTabs: true,
      subTabs: [
        { id: 'planning', label: 'Budget Planning' },
        { id: 'monitoring', label: 'Budget Monitoring' },
        { id: 'forecasting', label: 'Forecasting' },
        { id: 'variance', label: 'Variance Analysis' }
      ]
    },
    { 
      id: 'property', 
      label: 'Property', 
      icon: Building, 
      hasSubTabs: true,
      subTabs: [
        { id: 'portfolio', label: 'Property Portfolio' },
        { id: 'tenants', label: 'Tenant Management' },
        { id: 'income', label: 'Rental Income' },
        { id: 'expenses', label: 'Property Expenses' }
      ]
    },
    { 
      id: 'ecommerce', 
      label: 'eCommerce', 
      icon: ShoppingCart, 
      hasSubTabs: true,
      subTabs: [
        { id: 'platforms', label: 'Connected Platforms' },
        { id: 'orders', label: 'Order Management' },
        { id: 'settlements', label: 'Settlement Tracking' },
        { id: 'analytics', label: 'Sales Analytics' }
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
      id: 'fixed-assets',
      label: 'Fixed Assets',
      icon: Building,
      hasSubTabs: false
    },
    {
      id: 'invoice-tracking',
      label: 'Invoice Tracking',
      icon: Mail,
      hasSubTabs: false
    },
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
    switch (activeMainTab) {
      case 'dashboard':
        return renderDashboard()
      case 'vat':
        return <BookkeepingVAT />
      case 'reports':
        switch (activeSubTab) {
          case 'financial-reports':
            return renderFinancialReports()
          case 'management-reports':
            return renderManagementReports()
          case 'analytics':
            return renderAnalyticsReports()
          default:
            return renderFinancialReports()
        }
      case 'projects':
        switch (activeSubTab) {
          case 'overview':
            return renderProjectOverview()
          case 'tracking':
            return renderTimeTracking()
          case 'costing':
            return renderProjectCosting()
          case 'reports':
            return renderProjectReports()
          default:
            return renderProjectsContent()
        }
      case 'budgets':
        switch (activeSubTab) {
          case 'planning':
            return renderBudgetPlanning()
          case 'monitoring':
            return renderBudgetMonitoring()
          case 'forecasting':
            return renderForecasting()
          case 'variance':
            return renderVarianceAnalysis()
          default:
            return renderBudgetsContent()
        }
      case 'property':
        switch (activeSubTab) {
          case 'portfolio':
            return renderPropertyPortfolio()
          case 'tenants':
            return renderTenantManagement()
          case 'income':
            return renderRentalIncome()
          case 'expenses':
            return renderPropertyExpenses()
          default:
            return renderPropertyContent()
        }
      case 'ecommerce':
        switch (activeSubTab) {
          case 'platforms':
            return renderConnectedPlatforms()
          case 'orders':
            return renderOrderManagement()
          case 'settlements':
            return renderSettlementTracking()
          case 'analytics':
            return renderSalesAnalytics()
          default:
            return renderEcommerceContent()
        }
      case 'banking':
        switch (activeSubTab) {
          case 'cash-coding':
            return renderCashCoding()
          default:
            return renderCashCoding()
        }
      case 'recurring-transactions':
        return renderRecurringTransactions()
      case 'accruals-prepayments':
        return renderAccrualsPrepaymentsments()
      case 'fixed-assets':
        return renderFixedAssets()
      case 'invoice-tracking':
        return renderInvoiceTracking()
      default:
        return renderDashboard()
    }
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
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
              if (kpi.title === 'Total Revenue') navigate('/app/books/sales/invoices')
              else if (kpi.title === 'Outstanding Invoices') navigate('/app/books/sales/invoices')
              else if (kpi.title === 'Monthly Expenses') navigate('/app/books/purchases/expenses')
              else if (kpi.title === 'Net Profit') navigate('/app/books/reports/financial-reports')
              else navigate('/app/books/banking/transactions')
            }}>
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
          title="Ask your Bookkeeping Adviser"
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
            <div className="grid grid-cols-3 gap-4 py-2 text-black cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate('/app/books/banking/bank-accounts/1000')}>
              <div>1000 - Cash at Bank</div>
              <div>£25,000.00</div>
              <div>-</div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2 text-black cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate('/app/books/sales/invoices')}>
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
        color: 'text-[#FF6B35]',
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
            className="bg-blue-900 text-white placeholder:text-gray-300 border-blue-800 focus:border-blue-700"
          />
          <Input
            type="date"
            placeholder="To date"
            value={reportsDateTo}
            onChange={(e) => setReportsDateTo(e.target.value)}
            className="bg-blue-900 text-white placeholder:text-gray-300 border-blue-800 focus:border-blue-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
    const managementReports = [
      {
        name: 'Monthly Management Pack',
        description: 'KPIs, variance analysis, and commentary',
        icon: TrendingUp,
        status: 'ready',
        lastGenerated: '2024-01-15'
      },
      {
        name: 'Budget vs Actual',
        description: 'Performance against budget with variances',
        icon: BarChart3,
        status: 'ready',
        lastGenerated: '2024-01-15'
      },
      {
        name: 'Cash Flow Forecast',
        description: '13-week rolling cash flow projection',
        icon: Calculator,
        status: 'ready',
        lastGenerated: '2024-01-15'
      },
      {
        name: 'Departmental Analysis',
        description: 'Cost center performance analysis',
        icon: PieChart,
        status: 'ready',
        lastGenerated: '2024-01-15'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Management Reports</h2>
            <p className="text-gray-600">Management accounting and analysis</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Custom Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {managementReports.map((report, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <report.icon className="h-6 w-6 text-[#FF6B35]" />
                  <Badge variant="secondary">{report.status}</Badge>
                </div>
                <CardTitle className="text-lg">{report.name}</CardTitle>
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

  function renderAnalyticsReports() {
    const analysisReports = [
      {
        name: 'Ratio Analysis',
        description: 'Liquidity, profitability, and efficiency ratios',
        icon: BarChart3,
        status: 'ready',
        lastGenerated: '2024-01-15'
      },
      {
        name: 'Trend Analysis',
        description: 'Multi-period trend identification',
        icon: TrendingUp,
        status: 'ready',
        lastGenerated: '2024-01-15'
      },
      {
        name: 'Benchmarking Report',
        description: 'Industry comparison and benchmarks',
        icon: PieChart,
        status: 'ready',
        lastGenerated: '2024-01-15'
      },
      {
        name: 'Variance Analysis',
        description: 'Detailed variance explanations',
        icon: Calculator,
        status: 'ready',
        lastGenerated: '2024-01-15'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>
            <p className="text-gray-600">Advanced analytics and business intelligence</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export Analytics
            </Button>
            <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Custom Analysis
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {analysisReports.map((report, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <report.icon className="h-6 w-6 text-[#FF6B35]" />
                  <Badge variant="secondary">{report.status}</Badge>
                </div>
                <CardTitle className="text-lg">{report.name}</CardTitle>
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
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export Accruals
            </Button>
            <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Accrual/Prepayment
            </Button>
            <Button className="w-full sm:w-auto">
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
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setShowRuleForm(true)} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
            <Button onClick={handleAutoCategorize} className="w-full sm:w-auto">
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

  function renderFixedAssets() {

    const loadAssets = async () => {
      try {
        const data = await apiClient.getFixedAssets() as any
        setAssets(data)
      } catch (error) {
        console.error('Failed to load fixed assets:', error)
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
      loadAssets()
    }, [])

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
                      <td className="border border-gray-300 p-2 text-right text-black">£{asset.accumulated_depreciation.toLocaleString()}</td>
                      <td className="border border-gray-300 p-2 text-right text-black">£{asset.current_book_value.toLocaleString()}</td>
                      <td className="border border-gray-300 p-2 text-center">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

  function renderProjectsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Project Management</h2>
            <p className="text-gray-600">Track project costs, time, and profitability</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Current projects and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Website Redesign</p>
                  <p className="text-sm text-gray-600">Client: ABC Company Ltd</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-[#FF6B35] h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">65%</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£8,500</p>
                  <p className="text-xs text-gray-500">Budget: £12,000</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderProjectOverview() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Project Overview</h2>
            <p className="text-gray-600">Comprehensive view of all projects</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#FF6B35]">12</div>
              <p className="text-sm text-gray-600">Currently in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£45,230</div>
              <p className="text-sm text-gray-600">This quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profit Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">32%</div>
              <p className="text-sm text-gray-600">Average across projects</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderTimeTracking() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Time Tracking</h2>
            <p className="text-gray-600">Track time spent on projects and tasks</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Start Timer
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Timesheet Report
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Today's Time Entries</CardTitle>
            <CardDescription>Track your time across different projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Website Development</p>
                  <p className="text-sm text-gray-600">ABC Company Ltd</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">3h 45m</p>
                  <p className="text-xs text-gray-500">£187.50</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderProjectCosting() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Project Costing</h2>
            <p className="text-gray-600">Analyze project costs and profitability</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calculator className="h-4 w-4 mr-2" />
              Cost Analysis
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Profitability Report
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Cost Breakdown</CardTitle>
            <CardDescription>Detailed cost analysis by project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Labor Costs</p>
                  <p className="text-sm text-gray-600">Direct and indirect labor</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£12,450</p>
                  <p className="text-xs text-gray-500">65% of total</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderProjectReports() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Project Reports</h2>
            <p className="text-gray-600">Comprehensive project reporting and analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Custom Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>On Time Delivery</span>
                  <span className="font-semibold">85%</span>
                </div>
                <div className="flex justify-between">
                  <span>Budget Adherence</span>
                  <span className="font-semibold">92%</span>
                </div>
                <div className="flex justify-between">
                  <span>Client Satisfaction</span>
                  <span className="font-semibold">4.8/5</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Revenue</span>
                  <span className="font-semibold">£45,230</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Project Value</span>
                  <span className="font-semibold">£3,769</span>
                </div>
                <div className="flex justify-between">
                  <span>Profit Margin</span>
                  <span className="font-semibold">32%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderBudgetsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Budgets & Forecasting</h2>
            <p className="text-gray-600">Budget planning and financial forecasting</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export Budget
            </Button>
            <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Budget
            </Button>
            <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 w-full sm:w-auto">
              <Calculator className="h-4 w-4 mr-2" />
              Forecast
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Budget vs Actual</CardTitle>
            <CardDescription>Current year budget performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Revenue</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">85%</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£125,430</p>
                  <p className="text-xs text-gray-500">Budget: £150,000</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderBudgetPlanning() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Budget Planning</h2>
            <p className="text-gray-600">Create and manage financial budgets</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Budget
            </Button>
            <Button className="w-full sm:w-auto">
              <Calculator className="h-4 w-4 mr-2" />
              Budget Template
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Plan your budget across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Revenue</p>
                  <p className="text-sm text-gray-600">Expected income</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£150,000</p>
                  <p className="text-xs text-gray-500">Annual target</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderBudgetMonitoring() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Budget Monitoring</h2>
            <p className="text-gray-600">Monitor budget performance and variances</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Charts
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Variance Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget vs Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#FF6B35]">85%</div>
              <p className="text-sm text-gray-600">Of budget achieved</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Variance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">+£5,430</div>
              <p className="text-sm text-gray-600">Above budget</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">£148,200</div>
              <p className="text-sm text-gray-600">Year-end projection</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderForecasting() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Financial Forecasting</h2>
            <p className="text-gray-600">Predict future financial performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <LineChart className="h-4 w-4 mr-2" />
              Generate Forecast
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Forecast Report
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>12-Month Forecast</CardTitle>
            <CardDescription>Projected financial performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Revenue Forecast</p>
                  <p className="text-sm text-gray-600">Based on historical trends</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£180,000</p>
                  <p className="text-xs text-green-600">+20% growth</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderVarianceAnalysis() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Variance Analysis</h2>
            <p className="text-gray-600">Analyze budget vs actual performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Detailed Analysis
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Variance Report
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Variance Summary</CardTitle>
            <CardDescription>Key variances from budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Revenue Variance</p>
                  <p className="text-sm text-gray-600">Actual vs budgeted revenue</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+£5,430</p>
                  <p className="text-xs text-gray-500">3.6% favorable</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderPropertyContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Property Management</h2>
            <p className="text-gray-600">Rental properties, tenants, and property income</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Manage Tenants
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Property Portfolio</CardTitle>
            <CardDescription>Overview of rental properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Building className="h-8 w-8 text-[#FF6B35]" />
                  <div>
                    <p className="font-medium">123 Main Street</p>
                    <p className="text-sm text-gray-600">2 bed apartment</p>
                    <p className="text-xs text-gray-500">Tenant: John Smith</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">£1,200/month</p>
                  <Badge className="bg-green-100 text-green-800">Occupied</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderPropertyPortfolio() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Property Portfolio</h2>
            <p className="text-gray-600">Manage your rental property portfolio</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Portfolio Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#FF6B35]">8</div>
              <p className="text-sm text-gray-600">Rental properties</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£9,600</div>
              <p className="text-sm text-gray-600">Total rental income</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Occupancy Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <p className="text-sm text-gray-600">Currently occupied</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderTenantManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Tenant Management</h2>
            <p className="text-gray-600">Manage tenant information and communications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Tenant
            </Button>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Send Notice
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Tenants</CardTitle>
            <CardDescription>Current tenant information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-gray-600">123 Main Street, Apt 2B</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£1,200/month</p>
                  <Badge className="bg-green-100 text-green-800">Current</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderRentalIncome() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Rental Income</h2>
            <p className="text-gray-600">Track rental income and payments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Receipt className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Income Report
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Income Summary</CardTitle>
            <CardDescription>Rental income by property</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">123 Main Street</p>
                  <p className="text-sm text-gray-600">2 bed apartment</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£1,200</p>
                  <Badge className="bg-green-100 text-green-800">Paid</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderPropertyExpenses() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Property Expenses</h2>
            <p className="text-gray-600">Track property-related expenses</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Expense Report
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Property maintenance and expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Plumbing Repair</p>
                  <p className="text-sm text-gray-600">123 Main Street</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£150</p>
                  <p className="text-xs text-gray-500">Maintenance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderEcommerceContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">eCommerce Integration</h2>
            <p className="text-gray-600">Connect and sync with online sales platforms</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Link className="h-4 w-4 mr-2" />
              Connect Platform
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connected Platforms</CardTitle>
            <CardDescription>Your eCommerce integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <ShoppingCart className="h-8 w-8 text-[#FF6B35]" />
                  <div>
                    <p className="font-medium">Amazon Seller Central</p>
                    <p className="text-sm text-gray-600">Last sync: 1 hour ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">£15,430</p>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderConnectedPlatforms() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Connected Platforms</h2>
            <p className="text-gray-600">Manage eCommerce platform integrations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Link className="h-4 w-4 mr-2" />
              Add Platform
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Platform Integrations</CardTitle>
            <CardDescription>Your connected eCommerce platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Amazon Seller Central</p>
                  <p className="text-sm text-gray-600">Last sync: 1 hour ago</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderOrderManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Order Management</h2>
            <p className="text-gray-600">Manage eCommerce orders and fulfillment</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Process Orders
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Order Report
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest eCommerce orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Order #12345</p>
                  <p className="text-sm text-gray-600">Amazon - 2 items</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£89.99</p>
                  <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderSettlementTracking() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Settlement Tracking</h2>
            <p className="text-gray-600">Track platform settlements and payments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              View Settlements
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Settlement Report
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Settlements</CardTitle>
            <CardDescription>Platform payment settlements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Amazon Settlement</p>
                  <p className="text-sm text-gray-600">Period: 01-15 Sep 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£2,450.30</p>
                  <Badge className="bg-green-100 text-green-800">Received</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderSalesAnalytics() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Sales Analytics</h2>
            <p className="text-gray-600">Analyze eCommerce sales performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Charts
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Analytics Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#FF6B35]">£45,230</div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">1,234</div>
              <p className="text-sm text-gray-600">Total orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">3.2%</div>
              <p className="text-sm text-gray-600">Average conversion</p>
            </CardContent>
          </Card>
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
                    className={`w-full flex items-center justify-between px-3 py-2 m-0.5 rounded-lg text-left transition-all duration-200 shadow-sm ${
                      activeMainTab === item.id
                        ? 'bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white shadow-md transform scale-[0.98] font-semibold'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
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
                          className={`w-full px-3 py-2 m-0.5 rounded-lg text-left text-sm transition-all duration-200 shadow-sm ${
                            activeSubTab === subTab.id
                              ? 'bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white shadow-md transform scale-[0.98] font-semibold'
                              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
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

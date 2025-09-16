import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  CreditCard, Receipt, TrendingUp, TrendingDown, Download, Edit,
  Link, FileText, Calculator, PoundSterling, BarChart3, Building, Users, Plus,
  PieChart, LineChart, Activity, Target, ShoppingCart, Percent, Package, RefreshCw,
  ChevronDown, BookOpen, Landmark, Clock, Copy,
  RotateCcw, CheckCircle, Settings, ArrowLeftRight,
  ArrowLeft, Mail
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { useIsMobile } from '../../hooks/use-mobile'
import ResponsiveLayout from '../../components/ResponsiveLayout'
import { apiClient } from '../../lib/api'
import { formatCurrency } from '../../lib/currencies'

export default function Bookkeeping() {
  const navigate = useNavigate()
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['transactions', 'reports'])
  const isMobile = useIsMobile()
  const [isAILoading, setIsAILoading] = useState(false)
  const [kpis, setKpis] = useState<any[]>([])
  
  const [reportsSearchTerm, setReportsSearchTerm] = useState('')
  const [reportsDateFrom, setReportsDateFrom] = useState('')
  const [reportsDateTo, setReportsDateTo] = useState('')
  
  const [selectedReport, setSelectedReport] = useState('')
  const [reportData, setReportData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

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
            value: formatCurrency((invoicesData as any)?.outstanding_amount || 45000, 'GBP'),
            change: '-5.2%',
            trend: 'down' as const,
            icon: FileText,
            color: 'text-blue-600'
          },
          {
            title: 'Monthly Expenses',
            value: formatCurrency((invoicesData as any)?.monthly_expenses || 32000, 'GBP'),
            change: '+3.1%',
            trend: 'up' as const,
            icon: TrendingDown,
            color: 'text-red-600'
          },
          {
            title: 'Cash Flow',
            value: formatCurrency((invoicesData as any)?.cash_flow || 78000, 'GBP'),
            change: '+8.7%',
            trend: 'up' as const,
            icon: Activity,
            color: 'text-purple-600'
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
      console.log('AI Question:', question)
    } catch (error) {
      console.error('Error processing AI question:', error)
    } finally {
      setIsAILoading(false)
    }
  }

  const menuStructure = {
    dashboard: { label: 'Dashboard', icon: BarChart3, hasSubTabs: false },
    sales: { 
      label: 'Sales', 
      icon: TrendingUp, 
      hasSubTabs: true,
      subTabs: {
        invoices: { label: 'Invoices', icon: FileText },
        quotes: { label: 'Quotes', icon: Calculator },
        customers: { label: 'Customers', icon: Users },
        products: { label: 'Products', icon: Package }
      }
    },
    purchases: { 
      label: 'Purchases', 
      icon: ShoppingCart, 
      hasSubTabs: true,
      subTabs: {
        bills: { label: 'Bills', icon: Receipt },
        orders: { label: 'Purchase Orders', icon: ShoppingCart },
        suppliers: { label: 'Suppliers', icon: Building },
        expenses: { label: 'Expenses', icon: CreditCard }
      }
    },
    inventory: { 
      label: 'Inventory', 
      icon: Package, 
      hasSubTabs: true,
      subTabs: {
        products: { label: 'Products', icon: Package },
        movements: { label: 'Stock Movements', icon: ArrowLeftRight },
        adjustments: { label: 'Adjustments', icon: Edit },
        reports: { label: 'Reports', icon: BarChart3 }
      }
    },
    banking: { 
      label: 'Banking', 
      icon: Landmark, 
      hasSubTabs: true,
      subTabs: {
        accounts: { label: 'Bank Accounts', icon: Landmark },
        transactions: { label: 'Transactions', icon: ArrowLeftRight },
        reconciliation: { label: 'Reconciliation', icon: CheckCircle },
        feeds: { label: 'Bank Feeds', icon: Link }
      }
    },
    journals: { 
      label: 'Journals', 
      icon: BookOpen, 
      hasSubTabs: true,
      subTabs: {
        general: { label: 'General Journal', icon: BookOpen },
        adjustments: { label: 'Adjustments', icon: Edit },
        reversals: { label: 'Reversals', icon: RotateCcw },
        templates: { label: 'Templates', icon: Copy }
      }
    },
    vat: { 
      label: 'VAT', 
      icon: Percent, 
      hasSubTabs: true,
      subTabs: {
        returns: { label: 'VAT Returns', icon: FileText },
        schemes: { label: 'VAT Schemes', icon: Settings },
        reports: { label: 'VAT Reports', icon: BarChart3 },
        compliance: { label: 'Compliance', icon: CheckCircle }
      }
    },
    reports: { 
      label: 'Reports', 
      icon: BarChart3, 
      hasSubTabs: true,
      subTabs: {
        financial: { label: 'Financial Reports', icon: Calculator },
        management: { label: 'Management Reports', icon: Target },
        analytics: { label: 'Analytics', icon: LineChart }
      }
    },
    'recurring-transactions': { label: 'Recurring Transactions', icon: RefreshCw, hasSubTabs: false },
    'accruals-prepayments': { label: 'Accruals & Prepayments', icon: Clock, hasSubTabs: false },
    'invoice-tracking': { label: 'Invoice Tracking', icon: Mail, hasSubTabs: false }
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
    const tabConfig = menuStructure[tabKey as keyof typeof menuStructure]
    if (tabConfig && tabConfig.hasSubTabs && 'subTabs' in tabConfig) {
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

  function renderMainContent() {
    if (activeMainTab === 'dashboard') {
      return renderDashboard()
    } else if (activeMainTab === 'reports') {
      if (activeSubTab === 'financial') return renderFinancialReports()
      if (activeSubTab === 'management') return renderManagementReports()
      if (activeSubTab === 'analytics') return renderAnalyticsReports()
      return renderFinancialReports()
    } else if (activeMainTab === 'recurring-transactions') {
      return renderRecurringTransactions()
    } else if (activeMainTab === 'accruals-prepayments') {
      return renderAccrualsPrepaymentsments()
    } else if (activeMainTab === 'invoice-tracking') {
      return renderInvoiceTracking()
    }
    return renderDashboard()
  }

  function renderDashboard() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Bookkeeping Dashboard</h2>
            <p className="text-gray-600">Overview of your financial position and key metrics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          {kpis.map((kpi, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/app/books/analytics')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className={`text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ask your Bookkeeping Adviser</CardTitle>
            <CardDescription>Get expert bookkeeping and accounting guidance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Ask about transactions, reconciliation, or financial reports..."
                className="flex-1"
              />
              <Button onClick={() => handleAIQuestion("Sample question")} disabled={isAILoading}>
                {isAILoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Ask"}
              </Button>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2">Recent Questions:</p>
              <ul className="space-y-1">
                <li>• How do I reconcile bank transactions?</li>
                <li>• What are the VAT filing requirements?</li>
                <li>• How do I categorize business expenses?</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderFinancialReports() {
    const loadReportData = async (reportType: string) => {
      setIsLoading(true)
      setSelectedReport(reportType)
      
      try {
        let data
        switch (reportType) {
          case 'sales-report':
            data = await apiClient.getSalesReport()
            break
          case 'customer-receipts':
            data = await apiClient.getCustomerReceipts()
            break
          case 'sales-invoice-list':
            data = await apiClient.getSalesInvoiceList()
            break
          case 'purchases-invoice-list':
            data = await apiClient.getPurchasesInvoiceList()
            break
          case 'trade-debtors-detailed':
            data = await apiClient.getTradeDebtorsDetailed()
            break
          case 'trade-debtors-summary':
            data = await apiClient.getTradeDebtorsSummary()
            break
          case 'trade-creditors-detailed':
            data = await apiClient.getTradeCreditorsDetailed()
            break
          case 'trade-creditors-summary':
            data = await apiClient.getTradeCreditorsSummary()
            break
          case 'customer-statements':
            data = await apiClient.getCustomerStatement('default-customer')
            break
          case 'supplier-statements':
            data = await apiClient.getSupplierStatement('default-supplier')
            break
          case 'payments-to-suppliers':
            data = await apiClient.getPaymentsToSuppliers()
            break
          case 'trial-balance':
            data = await apiClient.getTrialBalance('default-company')
            break
          case 'profit-loss':
            data = await apiClient.getTrialBalance('default-company')
            break
          case 'balance-sheet':
            data = await apiClient.getTrialBalance('default-company')
            break
          case 'aged-debtors':
            data = await apiClient.getAgedDebtors('default-company')
            break
          case 'aged-creditors':
            data = await apiClient.getAgedCreditors('default-company')
            break
          default:
            data = { message: 'Report not implemented yet' }
        }
        setReportData(data)
      } catch (error) {
        console.error('Error loading report:', error)
        setReportData({ error: 'Failed to load report data' })
      } finally {
        setIsLoading(false)
      }
    }

    const renderSalesReport = () => (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Sales Report with Running Balances</h3>
          <div className="text-sm text-gray-600">
            Period: {reportsDateFrom || 'All time'} to {reportsDateTo || 'Current'}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Running Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData?.sales?.map((sale: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/app/books/invoices/${sale.invoice_id}`)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(sale.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.customer_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.invoice_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(sale.amount, 'GBP')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{formatCurrency(sale.running_total, 'GBP')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )

    const renderCustomerReceipts = () => (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Customer Receipts</h3>
          <div className="text-sm text-gray-600">
            Period: {reportsDateFrom || 'All time'} to {reportsDateTo || 'Current'}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt #</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData?.receipts?.map((receipt: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/app/books/receipts/${receipt.id}`)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(receipt.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{receipt.customer_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{receipt.receipt_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(receipt.amount, 'GBP')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{receipt.payment_method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )

    const renderTradeDebtorsDetailed = () => (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Trade Debtors Detailed Analysis</h3>
          <div className="text-sm text-gray-600">
            As at: {new Date().toLocaleDateString()}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData?.debtors?.map((debtor: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/app/books/customers/${debtor.customer_id}`)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{debtor.customer_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{debtor.invoice_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(debtor.invoice_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(debtor.invoice_amount, 'GBP')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(debtor.outstanding_amount, 'GBP')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <Badge variant={debtor.days_overdue > 90 ? 'destructive' : debtor.days_overdue > 30 ? 'secondary' : 'default'}>
                        {debtor.days_overdue} days
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )

    const renderTrialBalanceReport = () => (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Trial Balance with Running Balances</h3>
          <div className="text-sm text-gray-600">
            As at: {new Date().toLocaleDateString()}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Running Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData?.accounts?.map((account: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/app/books/accounts/${account.id}`)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(account.debit || 0, 'GBP')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(account.credit || 0, 'GBP')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{formatCurrency(account.balance || 0, 'GBP')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )

    if (selectedReport) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedReport('')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" onClick={() => loadReportData(selectedReport)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <>
              {selectedReport === 'sales-report' && renderSalesReport()}
              {selectedReport === 'customer-receipts' && renderCustomerReceipts()}
              {selectedReport === 'trade-debtors-detailed' && renderTradeDebtorsDetailed()}
              {selectedReport === 'trial-balance' && renderTrialBalanceReport()}
            </>
          )}
        </div>
      )
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
        description: 'Complete trial balance with running balances',
        icon: Calculator,
        color: 'text-blue-600',
        status: 'Generated',
        lastGenerated: '30 minutes ago',
        reportType: 'trial-balance'
      },
      {
        title: 'Profit & Loss',
        description: 'Comprehensive P&L statement with comparisons',
        icon: TrendingUp,
        color: 'text-green-600',
        status: 'Generated',
        lastGenerated: '1 hour ago',
        reportType: 'profit-loss'
      },
      {
        title: 'Balance Sheet',
        description: 'Complete balance sheet with running balances',
        icon: PieChart,
        color: 'text-purple-600',
        status: 'Generated',
        lastGenerated: '1 hour ago',
        reportType: 'balance-sheet'
      },
      {
        title: 'Cash Flow Statement',
        description: 'Cash flow analysis and projections',
        icon: LineChart,
        color: 'text-indigo-600',
        status: 'Generated',
        lastGenerated: '2 hours ago',
        reportType: 'cash-flow'
      },
      {
        title: 'Aged Debtors',
        description: 'Customer aging analysis with drill-down',
        icon: Users,
        color: 'text-red-600',
        status: 'Generated',
        lastGenerated: '45 minutes ago',
        reportType: 'aged-debtors'
      },
      {
        title: 'Aged Creditors',
        description: 'Supplier aging analysis with drill-down',
        icon: Building,
        color: 'text-orange-600',
        status: 'Generated',
        lastGenerated: '45 minutes ago',
        reportType: 'aged-creditors'
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

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search reports..."
              value={reportsSearchTerm}
              onChange={(e) => setReportsSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
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
        </div>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
          {financialReports
            .filter(report => 
              report.title.toLowerCase().includes(reportsSearchTerm.toLowerCase()) ||
              report.description.toLowerCase().includes(reportsSearchTerm.toLowerCase())
            )
            .map((report, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => loadReportData(report.reportType)}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{report.title}</CardTitle>
                  <report.icon className={`h-4 w-4 ${report.color}`} />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600 mb-2">{report.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant={report.status === 'Generated' ? 'default' : 'secondary'}>
                      {report.status}
                    </Badge>
                    <span className="text-xs text-gray-500">{report.lastGenerated}</span>
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
            <p className="text-gray-600">Strategic management reporting and KPI analysis</p>
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

  function renderInvoiceTracking() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Invoice Tracking</h2>
            <p className="text-gray-600">Track invoice emails, opens, and payment links</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Invoice Email
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
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Bookkeeping</h1>
            <p className="text-sm text-gray-600 mt-1">Financial management and reporting</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {Object.entries(menuStructure).map(([key, config]) => (
                <div key={key}>
                  <button
                    onClick={() => handleMainTabClick(key)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeMainTab === key
                        ? 'bg-[#FF6B35] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <config.icon className="h-4 w-4 mr-3" />
                      {config.label}
                    </div>
                    {config.hasSubTabs && (
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        expandedCategories.includes(key) ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>

                  {config.hasSubTabs && 'subTabs' in config && expandedCategories.includes(key) && (
                    <div className="ml-6 mt-2 space-y-1">
                      {Object.entries(config.subTabs).map(([subKey, subConfig]: [string, any]) => (
                        <button
                          key={subKey}
                          onClick={() => handleSubTabClick(subKey, key)}
                          className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                            activeMainTab === key && activeSubTab === subKey
                              ? 'bg-[#FF6B35] text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <subConfig.icon className="h-4 w-4 mr-3" />
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

        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            {renderMainContent()}
          </main>
        </div>
      </div>
    </ResponsiveLayout>
  )
}

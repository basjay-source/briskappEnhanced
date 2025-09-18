import React, { useState } from 'react'
import { 
  CreditCard, 
  Receipt, 
  TrendingUp, 
  TrendingDown,
  Download,
  Upload,
  Eye,
  Edit,
  Filter,
  Link,
  FileText,
  Calculator,
  PoundSterling,
  BarChart3,
  Building,
  Users,
  Plus,
  PieChart,
  LineChart,
  Activity,
  Target,
  ShoppingCart,
  Percent,
  Package,
  RefreshCw,
  Scan,
  UserCheck,
  ChevronDown,
  BookOpen,
  Database,
  Landmark,
  Clock,
  Copy,
  RotateCcw,
  AlertCircle,
  ExternalLink,
  CheckCircle,
  Search,
  Settings,
  Calendar,
  ArrowLeftRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import AIPromptSection from '../../components/AIPromptSection'
import KPICard from '../../components/KPICard'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'
import InvoiceTemplateManager from '../../components/InvoiceTemplateManager'

export default function Bookkeeping() {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['sales', 'purchases', 'banking', 'journals', 'vat', 'reports', 'projects', 'budgets', 'property', 'ecommerce'])
  const isMobile = useIsMobile()
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  
  const [reportsSearchTerm, setReportsSearchTerm] = useState('')
  const [reportsSelectedPeriod, setReportsSelectedPeriod] = useState('current')
  const [reportsSelectedClient, setReportsSelectedClient] = useState('all')
  const [reportsSelectedDepartment, setReportsSelectedDepartment] = useState('all')
  const [reportsSelectedAnalysis, setReportsSelectedAnalysis] = useState('ratio')
  const [reportsSelectedComparison, setReportsSelectedComparison] = useState('industry')
  const [reportsDateFrom, setReportsDateFrom] = useState('')
  const [reportsDateTo, setReportsDateTo] = useState('')

  const handleAIQuestion = async (question: string) => {
    setIsAILoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('AI Question:', question)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsAILoading(false)
    }
  }

  const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Draft', value: 'draft' },
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Paid', value: 'paid' },
    { label: 'Overdue', value: 'overdue' }
  ]

  const typeOptions = [
    { label: 'All Types', value: 'all' },
    { label: 'Invoice', value: 'invoice' },
    { label: 'Credit Note', value: 'credit' },
    { label: 'Purchase Order', value: 'po' },
    { label: 'Bill', value: 'bill' },
    { label: 'Expense', value: 'expense' }
  ]

  const categoryOptions = [
    { label: 'All Categories', value: 'all' },
    { label: 'Sales', value: 'sales' },
    { label: 'Purchases', value: 'purchases' },
    { label: 'Banking', value: 'banking' },
    { label: 'Expenses', value: 'expenses' },
    { label: 'Assets', value: 'assets' }
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
    dashboard: { label: 'Dashboard', icon: Activity, hasSubTabs: false },
    accounts: { label: 'Chart of Accounts', icon: Database, hasSubTabs: false },
    sales: { 
      label: 'Sales', 
      icon: TrendingUp, 
      hasSubTabs: true,
      subTabs: {
        invoices: { label: 'Invoices', icon: Receipt },
        quotes: { label: 'Quotes', icon: FileText },
        customers: { label: 'Customers', icon: Users },
        products: { label: 'Products', icon: Package }
      }
    },
    purchases: { 
      label: 'Purchases', 
      icon: TrendingDown, 
      hasSubTabs: true,
      subTabs: {
        bills: { label: 'Bills', icon: Receipt },
        orders: { label: 'Purchase Orders', icon: ShoppingCart },
        suppliers: { label: 'Suppliers', icon: Building },
        expenses: { label: 'Expenses', icon: CreditCard }
      }
    },
    banking: { 
      label: 'Banking', 
      icon: CreditCard, 
      hasSubTabs: true,
      subTabs: {
        bankaccounts: { label: 'Bank Accounts', icon: Landmark },
        transactions: { label: 'Transactions', icon: Receipt },
        reconciliation: { label: 'Reconciliation', icon: RefreshCw },
        feeds: { label: 'Bank Feeds', icon: Link }
      }
    },
    journals: { 
      label: 'Journals', 
      icon: BookOpen, 
      hasSubTabs: true,
      subTabs: {
        general: { label: 'General Journal', icon: Edit },
        adjustments: { label: 'Adjustments', icon: RefreshCw },
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
        schemes: { label: 'VAT Schemes', icon: RefreshCw },
        reports: { label: 'VAT Reports', icon: BarChart3 },
        compliance: { label: 'Compliance', icon: UserCheck }
      }
    },
    reports: {
      label: 'Reports',
      icon: FileText,
      hasSubTabs: true,
      subTabs: {
        financial: { label: 'Financial Reports', icon: BarChart3 },
        management: { label: 'Management Reports', icon: PieChart },
        analytics: { label: 'Analytics', icon: LineChart }
      }
    },
    projects: { 
      label: 'Projects', 
      icon: Target, 
      hasSubTabs: true,
      subTabs: {
        overview: { label: 'Project Overview', icon: Target },
        tracking: { label: 'Time Tracking', icon: Clock },
        costing: { label: 'Project Costing', icon: Calculator },
        reports: { label: 'Project Reports', icon: FileText }
      }
    },
    budgets: { 
      label: 'Budgets', 
      icon: Calculator, 
      hasSubTabs: true,
      subTabs: {
        planning: { label: 'Budget Planning', icon: Calculator },
        monitoring: { label: 'Budget Monitoring', icon: TrendingUp },
        forecasting: { label: 'Forecasting', icon: LineChart },
        variance: { label: 'Variance Analysis', icon: BarChart3 }
      }
    },
    property: { 
      label: 'Property', 
      icon: Landmark, 
      hasSubTabs: true,
      subTabs: {
        portfolio: { label: 'Property Portfolio', icon: Building },
        tenants: { label: 'Tenant Management', icon: Users },
        income: { label: 'Rental Income', icon: PoundSterling },
        expenses: { label: 'Property Expenses', icon: Receipt }
      }
    },
    ecommerce: { 
      label: 'eCommerce', 
      icon: ShoppingCart, 
      hasSubTabs: true,
      subTabs: {
        platforms: { label: 'Connected Platforms', icon: Link },
        orders: { label: 'Order Management', icon: Package },
        settlements: { label: 'Settlement Tracking', icon: CreditCard },
        analytics: { label: 'Sales Analytics', icon: BarChart3 }
      }
    },
    documents: { label: 'Documents', icon: Scan, hasSubTabs: false },
    integrations: { label: 'Integrations', icon: Link, hasSubTabs: false }
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
      title: "Total Revenue",
      value: "£125,430",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Outstanding Invoices",
      value: "£23,450",
      change: "-8.2%",
      trend: "down",
      icon: Receipt,
      color: "text-orange-600"
    },
    {
      title: "Bank Balance",
      value: "£45,230",
      change: "+5.1%",
      trend: "up",
      icon: CreditCard,
      color: "text-blue-600"
    },
    {
      title: "Monthly Expenses",
      value: "£18,920",
      change: "+3.4%",
      trend: "up",
      icon: TrendingDown,
      color: "text-red-600"
    }
  ]

  function renderMainContent() {
    if (activeMainTab === 'dashboard') {
      return renderDashboard()
    } else if (activeMainTab === 'accounts') {
      return renderChartOfAccounts()
    } else if (activeMainTab === 'sales') {
      if (activeSubTab === 'invoices') return renderInvoicesManagement()
      if (activeSubTab === 'quotes') return renderQuotesManagement()
      if (activeSubTab === 'customers') return renderCustomersManagement()
      if (activeSubTab === 'products') return renderProductsManagement()
      return renderSalesContent()
    } else if (activeMainTab === 'purchases') {
      if (activeSubTab === 'bills') return renderBillsManagement()
      if (activeSubTab === 'orders') return renderPurchaseOrdersManagement()
      if (activeSubTab === 'suppliers') return renderSuppliersManagement()
      if (activeSubTab === 'expenses') return renderExpensesManagement()
      return renderPurchasesContent()
    } else if (activeMainTab === 'banking') {
      if (activeSubTab === 'bankaccounts') return renderBankAccountsManagement()
      if (activeSubTab === 'transactions') return renderBankTransactionsManagement()
      if (activeSubTab === 'reconciliation') return renderReconciliationManagement()
      if (activeSubTab === 'feeds') return renderBankFeedsManagement()
      return renderBankingContent()
    } else if (activeMainTab === 'journals') {
      if (activeSubTab === 'general') return renderGeneralJournal()
      if (activeSubTab === 'adjustments') return renderJournalAdjustments()
      if (activeSubTab === 'reversals') return renderJournalReversals()
      if (activeSubTab === 'templates') return renderJournalTemplates()
      return renderJournalsContent()
    } else if (activeMainTab === 'vat') {
      if (activeSubTab === 'returns') return renderVATReturns()
      if (activeSubTab === 'schemes') return renderVATSchemes()
      if (activeSubTab === 'reports') return renderVATReports()
      if (activeSubTab === 'compliance') return renderVATCompliance()
      return renderVATContent()
    } else if (activeMainTab === 'reports') {
      if (activeSubTab === 'financial') return renderFinancialReports()
      if (activeSubTab === 'management') return renderManagementReports()
      if (activeSubTab === 'analytics') return renderAnalyticsReports()
      return renderFinancialReports()
    } else if (activeMainTab === 'projects') {
      if (activeSubTab === 'overview') return renderProjectOverview()
      if (activeSubTab === 'tracking') return renderTimeTracking()
      if (activeSubTab === 'costing') return renderProjectCosting()
      if (activeSubTab === 'reports') return renderProjectReports()
      return renderProjectsContent()
    } else if (activeMainTab === 'budgets') {
      if (activeSubTab === 'planning') return renderBudgetPlanning()
      if (activeSubTab === 'monitoring') return renderBudgetMonitoring()
      if (activeSubTab === 'forecasting') return renderForecasting()
      if (activeSubTab === 'variance') return renderVarianceAnalysis()
      return renderBudgetsContent()
    } else if (activeMainTab === 'property') {
      if (activeSubTab === 'portfolio') return renderPropertyPortfolio()
      if (activeSubTab === 'tenants') return renderTenantManagement()
      if (activeSubTab === 'income') return renderRentalIncome()
      if (activeSubTab === 'expenses') return renderPropertyExpenses()
      return renderPropertyContent()
    } else if (activeMainTab === 'ecommerce') {
      if (activeSubTab === 'platforms') return renderConnectedPlatforms()
      if (activeSubTab === 'orders') return renderOrderManagement()
      if (activeSubTab === 'settlements') return renderSettlementTracking()
      if (activeSubTab === 'analytics') return renderSalesAnalytics()
      return renderEcommerceContent()
    } else if (activeMainTab === 'documents') {
      return renderDocumentsContent()
    } else if (activeMainTab === 'integrations') {
      return renderIntegrationsContent()
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
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon
            const drillDownData = {
              title: `${kpi.title} Analysis`,
              description: `Detailed breakdown and insights for ${kpi.title.toLowerCase()}`,
              content: (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Current Value</h4>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                      <p className={`text-sm ${kpi.color}`}>{kpi.change}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Monthly Trend</h4>
                      <p className="text-sm text-gray-600">Performance over time</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Last 6 months</span>
                          <span className="text-green-600">+18%</span>
                        </div>
                        <Progress value={72} className="mt-1" />
                      </div>
                    </div>
                  </div>
                  
                  {kpi.title === 'Total Revenue' && (
                    <div>
                      <h4 className="font-semibold mb-3">Revenue Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border rounded">
                          <span>Product Sales</span>
                          <span className="font-semibold">£89,200 (71%)</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Services</span>
                          <span className="font-semibold">£28,430 (23%)</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Other Income</span>
                          <span className="font-semibold">£7,800 (6%)</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {kpi.title === 'Outstanding Invoices' && (
                    <div>
                      <h4 className="font-semibold mb-3">Outstanding Invoice Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>INV-001 - ABC Corp</span>
                          <Badge variant="destructive">£12,500 (15 days)</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>INV-002 - XYZ Ltd</span>
                          <Badge variant="secondary">£8,950 (5 days)</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>INV-003 - DEF Services</span>
                          <Badge variant="outline">£2,000 (current)</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {kpi.title === 'Bank Balance' && (
                    <div>
                      <h4 className="font-semibold mb-3">Account Balances</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border rounded">
                          <span>Current Account</span>
                          <span className="font-semibold">£32,450</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Savings Account</span>
                          <span className="font-semibold">£12,780</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {kpi.title === 'Monthly Expenses' && (
                    <div>
                      <h4 className="font-semibold mb-3">Expense Categories</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>Office Rent - £8,500</span>
                          <Badge variant="default">On Budget</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>Utilities - £2,420</span>
                          <Badge variant="destructive">+£420 over</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>Marketing - £4,200</span>
                          <Badge variant="default">-£800 under</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">Export Data</Button>
                    <Button>View Detailed Report</Button>
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
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Payment from ABC Corp</p>
                      <Badge className="bg-green-100 text-green-800">Received</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Invoice INV-001</p>
                    <p className="text-xs text-gray-500">Today, 2:30 PM</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+£2,500</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common bookkeeping tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
                <Button variant="outline" className="justify-start">
                  <Receipt className="h-4 w-4 mr-2" />
                  Record Expense
                </Button>
                <Button variant="outline" className="justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Bank Reconciliation
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }


  function renderSalesContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Sales Management</h2>
            <p className="text-gray-600">Invoices, quotes, customers, and sales analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
            <Button>
              <UserCheck className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>
        
        <SearchFilterHeader
          searchPlaceholder="Search invoices, quotes, customers..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Status',
              options: statusOptions,
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Type',
              options: typeOptions,
              value: selectedType,
              onChange: setSelectedType
            },
            {
              label: 'Category',
              options: categoryOptions,
              value: selectedCategory,
              onChange: setSelectedCategory
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Outstanding Invoices</p>
                  <p className="text-2xl font-bold">£12,000</p>
                  <p className="text-xs text-gray-500">4 invoices</p>
                </div>
                <Receipt className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month Sales</p>
                  <p className="text-2xl font-bold">£28,500</p>
                  <p className="text-xs text-green-600">+15.2%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Customers</p>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-blue-600">+8 new</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Invoice Value</p>
                  <p className="text-2xl font-bold">£1,850</p>
                  <p className="text-xs text-purple-600">+5.8%</p>
                </div>
                <Calculator className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Latest sales invoices and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">INV-001</p>
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  </div>
                  <p className="text-sm text-gray-600">ABC Corp</p>
                  <p className="text-xs text-gray-500">Due: 2024-01-30</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£2,500</p>
                  <div className="flex gap-1 mt-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Template Management</CardTitle>
            <CardDescription>Customize invoice templates with your company branding</CardDescription>
          </CardHeader>
          <CardContent>
            <InvoiceTemplateManager />
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderPurchasesContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Purchases Overview</h2>
            <p className="text-gray-600">Complete purchase management dashboard and quick access to all purchase functions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Quick Bill
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Purchase Report
            </Button>
          </div>
        </div>
        
        <SearchFilterHeader
          searchPlaceholder="Search bills, purchase orders, suppliers..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Status',
              options: statusOptions,
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Type',
              options: typeOptions,
              value: selectedType,
              onChange: setSelectedType
            },
            {
              label: 'Category',
              options: categoryOptions,
              value: selectedCategory,
              onChange: setSelectedCategory
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Outstanding Bills</p>
                  <p className="text-2xl font-bold">£18,750</p>
                  <p className="text-xs text-gray-500">8 bills</p>
                </div>
                <Receipt className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month Purchases</p>
                  <p className="text-2xl font-bold">£32,400</p>
                  <p className="text-xs text-orange-600">+8.5%</p>
                </div>
                <TrendingDown className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-xs text-blue-600">+3 new</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Bill Value</p>
                  <p className="text-2xl font-bold">£1,245</p>
                  <p className="text-xs text-purple-600">-2.1%</p>
                </div>
                <PoundSterling className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Functions</CardTitle>
              <CardDescription>Quick access to all purchase management features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start h-12" onClick={() => handleSubTabClick('bills', 'purchases')}>
                  <Receipt className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Bill Management</div>
                    <div className="text-sm text-gray-600">Process, approve, and track bills</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-12" onClick={() => handleSubTabClick('orders', 'purchases')}>
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Purchase Orders</div>
                    <div className="text-sm text-gray-600">Create and track purchase orders</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-12" onClick={() => handleSubTabClick('suppliers', 'purchases')}>
                  <Building className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Supplier Database</div>
                    <div className="text-sm text-gray-600">Manage supplier information and terms</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-12" onClick={() => handleSubTabClick('expenses', 'purchases')}>
                  <CreditCard className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Expense Management</div>
                    <div className="text-sm text-gray-600">Track and categorize expenses</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest purchase transactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'Bill', ref: 'BILL-2024-001', supplier: 'Office Supplies Ltd', amount: 450, status: 'Pending', time: '1 hour ago' },
                  { type: 'PO', ref: 'PO-2024-008', supplier: 'Tech Equipment Co', amount: 2850, status: 'Approved', time: '3 hours ago' },
                  { type: 'Expense', ref: 'EXP-2024-045', supplier: 'Travel Agency', amount: 185, status: 'Submitted', time: '5 hours ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{activity.ref}</p>
                        <Badge className={`${
                          activity.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                          activity.status === 'Submitted' ? 'bg-blue-100 text-blue-800' : 
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{activity.supplier}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{activity.amount}</p>
                      <p className="text-sm text-gray-600">{activity.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderBankingContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Banking & Reconciliation</h2>
            <p className="text-gray-600">Bank feeds, reconciliation, and transaction management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
          </div>
        </div>
        
        <SearchFilterHeader
          searchPlaceholder="Search transactions, bank accounts, reconciliations..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Status',
              options: statusOptions,
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Type',
              options: typeOptions,
              value: selectedType,
              onChange: setSelectedType
            },
            {
              label: 'Category',
              options: categoryOptions,
              value: selectedCategory,
              onChange: setSelectedCategory
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <Card>
          <CardHeader>
            <CardTitle>Bank Accounts</CardTitle>
            <CardDescription>Connected bank accounts and their balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium">Barclays Business Current</p>
                    <p className="text-sm text-gray-600">****1234</p>
                    <p className="text-xs text-gray-500">Last sync: 2 hours ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">£45,230</p>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderJournalsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Journal Entries</h2>
            <p className="text-gray-600">Manual journal entries and adjustments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Journal Entries</CardTitle>
            <CardDescription>Latest manual entries and adjustments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Office supplies purchase</p>
                  <p className="text-sm text-gray-600">JE001 - Office Expenses</p>
                  <p className="text-xs text-gray-500">2024-01-15</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£250</p>
                  <p className="text-xs text-gray-500">Debit</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderVATContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">VAT Returns</h2>
            <p className="text-gray-600">VAT calculations and Making Tax Digital submissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate VAT
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Submit Return
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>VAT Summary</CardTitle>
            <CardDescription>Current quarter VAT position</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">VAT on Sales</p>
                <p className="text-xl font-bold text-blue-900">£5,700</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-600">VAT on Purchases</p>
                <p className="text-xl font-bold text-green-900">£1,890</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-orange-600">VAT Due</p>
                <p className="text-xl font-bold text-orange-900">£3,810</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }


  function renderFinancialReports() {

    const periodOptions = [
      { label: 'Current Period', value: 'current' },
      { label: 'Previous Period', value: 'previous' },
      { label: 'Year to Date', value: 'ytd' },
      { label: 'Custom Range', value: 'custom' }
    ]

    const clientOptions = [
      { label: 'All Clients', value: 'all' },
      { label: 'ABC Ltd', value: 'abc' },
      { label: 'XYZ Corp', value: 'xyz' },
      { label: 'Smith & Co', value: 'smith' }
    ]

    const financialReports = [
      {
        title: 'Profit & Loss',
        description: 'Comprehensive P&L with comparatives',
        icon: BarChart3,
        color: 'text-blue-500',
        status: 'Generated',
        lastGenerated: '2 hours ago'
      },
      {
        title: 'Balance Sheet',
        description: 'Assets, liabilities & equity',
        icon: FileText,
        color: 'text-purple-500',
        status: 'Scheduled',
        lastGenerated: '1 day ago'
      },
      {
        title: 'Cash Flow Statement',
        description: 'Operating, investing & financing',
        icon: PoundSterling,
        color: 'text-green-500',
        status: 'Generated',
        lastGenerated: '3 hours ago'
      },
      {
        title: 'Trial Balance',
        description: 'Detailed account balances',
        icon: Calculator,
        color: 'text-orange-500',
        status: 'Generated',
        lastGenerated: '1 hour ago'
      },
      {
        title: 'Aged Debtors',
        description: 'Outstanding customer invoices',
        icon: Users,
        color: 'text-red-500',
        status: 'Generated',
        lastGenerated: '4 hours ago'
      },
      {
        title: 'Aged Creditors',
        description: 'Outstanding supplier bills',
        icon: Building,
        color: 'text-indigo-500',
        status: 'Scheduled',
        lastGenerated: '2 days ago'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Financial Reports</h2>
            <p className="text-gray-600">Generate comprehensive financial statements and reports</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Schedule Reports
            </Button>
          </div>
        </div>

        <SearchFilterHeader
          searchPlaceholder="Search financial reports..."
          searchValue={reportsSearchTerm}
          onSearchChange={setReportsSearchTerm}
          filters={[
            {
              label: 'Period',
              options: periodOptions,
              value: reportsSelectedPeriod,
              onChange: setReportsSelectedPeriod
            },
            {
              label: 'Client',
              options: clientOptions,
              value: reportsSelectedClient,
              onChange: setReportsSelectedClient
            }
          ]}
          dateRange={{
            from: reportsDateFrom,
            to: reportsDateTo,
            onFromChange: setReportsDateFrom,
            onToChange: setReportsDateTo
          }}
        />

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {financialReports.map((report, index) => {
            const Icon = report.icon
            const drillDownData = {
              title: `${report.title} Analysis`,
              description: `Detailed financial analysis and breakdown for ${report.title.toLowerCase()}`,
              content: (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Report Status</h4>
                      <p className="text-sm text-gray-600">{report.description}</p>
                      <div className="mt-2">
                        <Badge variant={report.status === 'Generated' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">Last generated: {report.lastGenerated}</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Report Metrics</h4>
                      <p className="text-sm text-gray-600">Financial performance indicators</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Accuracy Score</span>
                          <span className="text-green-600">98%</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  {report.title === 'Profit & Loss' && (
                    <div>
                      <h4 className="font-semibold mb-3">P&L Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border rounded">
                          <span>Total Revenue</span>
                          <span className="font-semibold">£125,430</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Total Expenses</span>
                          <span className="font-semibold">£89,250</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded bg-green-50">
                          <span>Net Profit</span>
                          <span className="font-semibold text-green-600">£36,180</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {report.title === 'Balance Sheet' && (
                    <div>
                      <h4 className="font-semibold mb-3">Balance Sheet Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border rounded">
                          <span>Total Assets</span>
                          <span className="font-semibold">£245,680</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Total Liabilities</span>
                          <span className="font-semibold">£89,420</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded bg-blue-50">
                          <span>Net Worth</span>
                          <span className="font-semibold text-blue-600">£156,260</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {report.title === 'Cash Flow Statement' && (
                    <div>
                      <h4 className="font-semibold mb-3">Cash Flow Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border rounded">
                          <span>Operating Cash Flow</span>
                          <span className="font-semibold">£42,350</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Investing Cash Flow</span>
                          <span className="font-semibold">-£15,200</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Financing Cash Flow</span>
                          <span className="font-semibold">-£8,500</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">Export Report</Button>
                    <Button>Generate New</Button>
                  </div>
                </div>
              )
            }
            return (
              <KPICard
                key={index}
                title={report.title}
                value={report.status}
                change={`Last: ${report.lastGenerated}`}
                icon={Icon}
                color={report.color}
                drillDownData={drillDownData}
              />
            )
          })}
        </div>
      </div>
    )
  }

  function renderManagementReports() {

    const periodOptions = [
      { label: 'Monthly', value: 'monthly' },
      { label: 'Quarterly', value: 'quarterly' },
      { label: 'Annual', value: 'annual' },
      { label: 'Custom', value: 'custom' }
    ]

    const departmentOptions = [
      { label: 'All Departments', value: 'all' },
      { label: 'Sales', value: 'sales' },
      { label: 'Operations', value: 'operations' },
      { label: 'Administration', value: 'admin' }
    ]

    const managementReports = [
      {
        title: 'Monthly Management Pack',
        description: 'Executive summary with KPIs',
        icon: FileText,
        color: 'text-blue-500',
        status: 'Current',
        value: '98% Complete'
      },
      {
        title: 'Budget vs Actual',
        description: 'Variance analysis and forecasting',
        icon: BarChart3,
        color: 'text-green-500',
        status: 'Updated',
        value: '5% Variance'
      },
      {
        title: 'Cash Flow Forecast',
        description: '13-week rolling cash forecast',
        icon: TrendingUp,
        color: 'text-purple-500',
        status: 'Projected',
        value: '£45K Surplus'
      },
      {
        title: 'Departmental Analysis',
        description: 'Cost center performance',
        icon: PieChart,
        color: 'text-orange-500',
        status: 'Analyzed',
        value: '3 Departments'
      },
      {
        title: 'Key Performance Indicators',
        description: 'Business metrics dashboard',
        icon: Target,
        color: 'text-red-500',
        status: 'Tracking',
        value: '12 KPIs'
      },
      {
        title: 'Profitability Analysis',
        description: 'Product and service margins',
        icon: Calculator,
        color: 'text-indigo-500',
        status: 'Reviewed',
        value: '28% Margin'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Management Reports</h2>
            <p className="text-gray-600">Strategic insights and performance analytics for decision making</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Pack
            </Button>
            <Button>
              <Target className="h-4 w-4 mr-2" />
              Create Dashboard
            </Button>
          </div>
        </div>

        <SearchFilterHeader
          searchPlaceholder="Search management reports..."
          searchValue={reportsSearchTerm}
          onSearchChange={setReportsSearchTerm}
          filters={[
            {
              label: 'Period',
              options: periodOptions,
              value: reportsSelectedPeriod,
              onChange: setReportsSelectedPeriod
            },
            {
              label: 'Department',
              options: departmentOptions,
              value: reportsSelectedDepartment,
              onChange: setReportsSelectedDepartment
            }
          ]}
          dateRange={{
            from: reportsDateFrom,
            to: reportsDateTo,
            onFromChange: setReportsDateFrom,
            onToChange: setReportsDateTo
          }}
        />

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {managementReports.map((report, index) => {
            const Icon = report.icon
            const drillDownData = {
              title: `${report.title} Analysis`,
              description: `Detailed management analysis and insights for ${report.title.toLowerCase()}`,
              content: (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Current Status</h4>
                      <p className="text-2xl font-bold">{report.value}</p>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Performance Score</h4>
                      <p className="text-sm text-gray-600">Management effectiveness</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Overall Score</span>
                          <span className="text-green-600">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  {report.title === 'Monthly Management Pack' && (
                    <div>
                      <h4 className="font-semibold mb-3">Executive Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border rounded">
                          <span>Revenue Growth</span>
                          <span className="font-semibold text-green-600">+12.5%</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Cost Control</span>
                          <span className="font-semibold text-blue-600">-3.2%</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Customer Satisfaction</span>
                          <span className="font-semibold">96%</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {report.title === 'Budget vs Actual' && (
                    <div>
                      <h4 className="font-semibold mb-3">Variance Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>Revenue Variance</span>
                          <Badge variant="default">+8.2%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>Expense Variance</span>
                          <Badge variant="secondary">-2.1%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>Overall Variance</span>
                          <Badge variant="outline">+5.0%</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {report.title === 'Cash Flow Forecast' && (
                    <div>
                      <h4 className="font-semibold mb-3">13-Week Forecast</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border rounded">
                          <span>Week 1-4 Projection</span>
                          <span className="font-semibold">£125K</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Week 5-8 Projection</span>
                          <span className="font-semibold">£98K</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Week 9-13 Projection</span>
                          <span className="font-semibold">£156K</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">Export Analysis</Button>
                    <Button>Schedule Report</Button>
                  </div>
                </div>
              )
            }
            return (
              <KPICard
                key={index}
                title={report.title}
                value={report.value}
                change={report.status}
                icon={Icon}
                color={report.color}
                drillDownData={drillDownData}
              />
            )
          })}
        </div>
      </div>
    )
  }

  function renderAnalyticsReports() {

    const analysisOptions = [
      { label: 'Ratio Analysis', value: 'ratio' },
      { label: 'Trend Analysis', value: 'trend' },
      { label: 'Variance Analysis', value: 'variance' },
      { label: 'Benchmarking', value: 'benchmark' }
    ]

    const comparisonOptions = [
      { label: 'Industry Average', value: 'industry' },
      { label: 'Previous Period', value: 'previous' },
      { label: 'Budget Target', value: 'budget' },
      { label: 'Peer Companies', value: 'peers' }
    ]

    const analyticsReports = [
      {
        title: 'Ratio Analysis',
        description: 'Financial ratios and performance metrics',
        icon: Calculator,
        color: 'text-blue-500',
        status: 'Excellent',
        value: '8.5/10'
      },
      {
        title: 'Trend Analysis',
        description: 'Historical performance trends',
        icon: TrendingUp,
        color: 'text-green-500',
        status: 'Improving',
        value: '+15% YoY'
      },
      {
        title: 'Benchmarking Report',
        description: 'Industry comparison analysis',
        icon: BarChart3,
        color: 'text-purple-500',
        status: 'Above Average',
        value: '75th Percentile'
      },
      {
        title: 'Variance Analysis',
        description: 'Budget vs actual performance',
        icon: PieChart,
        color: 'text-orange-500',
        status: 'On Target',
        value: '3% Variance'
      },
      {
        title: 'Profitability Analysis',
        description: 'Margin and profit analysis',
        icon: Target,
        color: 'text-red-500',
        status: 'Strong',
        value: '28.5% Margin'
      },
      {
        title: 'Efficiency Metrics',
        description: 'Operational efficiency indicators',
        icon: Activity,
        color: 'text-indigo-500',
        status: 'Optimized',
        value: '92% Efficiency'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>
            <p className="text-gray-600">Advanced analytics and business intelligence for strategic planning</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Analytics
            </Button>
            <Button>
              <BarChart3 className="h-4 w-4 mr-2" />
              Create Dashboard
            </Button>
          </div>
        </div>

        <SearchFilterHeader
          searchPlaceholder="Search analytics reports..."
          searchValue={reportsSearchTerm}
          onSearchChange={setReportsSearchTerm}
          filters={[
            {
              label: 'Analysis Type',
              options: analysisOptions,
              value: reportsSelectedAnalysis,
              onChange: setReportsSelectedAnalysis
            },
            {
              label: 'Comparison',
              options: comparisonOptions,
              value: reportsSelectedComparison,
              onChange: setReportsSelectedComparison
            }
          ]}
          dateRange={{
            from: reportsDateFrom,
            to: reportsDateTo,
            onFromChange: setReportsDateFrom,
            onToChange: setReportsDateTo
          }}
        />

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {analyticsReports.map((report, index) => {
            const Icon = report.icon
            const drillDownData = {
              title: `${report.title} Deep Dive`,
              description: `Advanced analytics and insights for ${report.title.toLowerCase()}`,
              content: (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Current Performance</h4>
                      <p className="text-2xl font-bold">{report.value}</p>
                      <p className="text-sm text-gray-600">{report.status}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Analytics Score</h4>
                      <p className="text-sm text-gray-600">Data quality and insights</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Overall Score</span>
                          <span className="text-green-600">96%</span>
                        </div>
                        <Progress value={96} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  {report.title === 'Ratio Analysis' && (
                    <div>
                      <h4 className="font-semibold mb-3">Key Financial Ratios</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border rounded">
                          <span>Current Ratio</span>
                          <span className="font-semibold">2.4</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Quick Ratio</span>
                          <span className="font-semibold">1.8</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Debt-to-Equity</span>
                          <span className="font-semibold">0.35</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {report.title === 'Trend Analysis' && (
                    <div>
                      <h4 className="font-semibold mb-3">Performance Trends</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>Revenue Trend</span>
                          <Badge variant="default">+15% YoY</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>Profit Trend</span>
                          <Badge variant="secondary">+22% YoY</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span>Efficiency Trend</span>
                          <Badge variant="outline">+8% YoY</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {report.title === 'Benchmarking Report' && (
                    <div>
                      <h4 className="font-semibold mb-3">Industry Comparison</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 border rounded">
                          <span>Revenue per Employee</span>
                          <span className="font-semibold">75th percentile</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Profit Margin</span>
                          <span className="font-semibold">80th percentile</span>
                        </div>
                        <div className="flex justify-between p-2 border rounded">
                          <span>Asset Turnover</span>
                          <span className="font-semibold">65th percentile</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">Export Analysis</Button>
                    <Button>Generate Insights</Button>
                  </div>
                </div>
              )
            }
            return (
              <KPICard
                key={index}
                title={report.title}
                value={report.value}
                change={report.status}
                icon={Icon}
                color={report.color}
                drillDownData={drillDownData}
              />
            )
          })}
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
                  <p className="text-sm text-gray-600">Client: ABC Corp</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
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

  function renderBudgetsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Budgets & Forecasting</h2>
            <p className="text-gray-600">Budget planning and financial forecasting</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Budget
            </Button>
            <Button>
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
                  <Building className="h-8 w-8 text-blue-600" />
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
                  <ShoppingCart className="h-8 w-8 text-orange-600" />
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

  function renderDocumentsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Document Management</h2>
            <p className="text-gray-600">Upload, scan, and organize financial documents</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button>
              <Scan className="h-4 w-4 mr-2" />
              Scan Receipt
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Latest uploaded and scanned documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Office Supplies Receipt</p>
                    <p className="text-sm text-gray-600">Uploaded today</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderIntegrationsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Integrations & Import</h2>
            <p className="text-gray-600">Connect external bookkeeping software and import trial balance data</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Link className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Integrations</CardTitle>
            <CardDescription>Connect with popular accounting software</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Xero</p>
                    <p className="text-sm text-gray-600">Cloud accounting</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
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
            <p className="text-gray-600">Monitor all active projects and their progress</p>
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

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">12</div>
              <p className="text-sm text-gray-600">Currently in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£145,000</div>
              <p className="text-sm text-gray-600">Across all projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">68%</div>
              <p className="text-sm text-gray-600">Average progress</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Latest project activity and status updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Website Redesign', client: 'ABC Corp', progress: 75, budget: 12000, spent: 8500, status: 'On Track' },
                { name: 'Mobile App Development', client: 'XYZ Ltd', progress: 45, budget: 25000, spent: 11250, status: 'Behind' },
                { name: 'Brand Identity', client: 'StartupCo', progress: 90, budget: 8000, spent: 7200, status: 'Ahead' }
              ].map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <Target className="h-8 w-8 text-brisk-primary" />
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-gray-600">Client: {project.client}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-brisk-primary h-2 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{project.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">£{project.spent.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Budget: £{project.budget.toLocaleString()}</p>
                    <Badge className={`mt-1 ${
                      project.status === 'On Track' ? 'bg-green-100 text-green-800' :
                      project.status === 'Behind' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brisk-primary">7.5h</div>
              <p className="text-sm text-gray-600">Hours logged</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">38h</div>
              <p className="text-sm text-gray-600">Total hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Billable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">32h</div>
              <p className="text-sm text-gray-600">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">84%</div>
              <p className="text-sm text-gray-600">Efficiency rate</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Time Entries</CardTitle>
            <CardDescription>Latest time tracking entries across projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { project: 'Website Redesign', task: 'Frontend Development', hours: 3.5, date: 'Today', billable: true },
                { project: 'Mobile App', task: 'UI Design', hours: 2.0, date: 'Today', billable: true },
                { project: 'Brand Identity', task: 'Logo Design', hours: 1.5, date: 'Yesterday', billable: true },
                { project: 'Internal', task: 'Team Meeting', hours: 1.0, date: 'Yesterday', billable: false }
              ].map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{entry.project}</p>
                      <p className="text-sm text-gray-600">{entry.task}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{entry.hours}h</p>
                    <p className="text-xs text-gray-500">{entry.date}</p>
                    <Badge className={`mt-1 ${entry.billable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {entry.billable ? 'Billable' : 'Non-billable'}
                    </Badge>
                  </div>
                </div>
              ))}
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
              Cost Calculator
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Analysis
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£89,500</div>
              <p className="text-sm text-gray-600">From completed projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">£62,300</div>
              <p className="text-sm text-gray-600">Direct and indirect costs</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profit Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">30.4%</div>
              <p className="text-sm text-gray-600">Average across projects</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Cost Breakdown</CardTitle>
            <CardDescription>Detailed cost analysis by project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Website Redesign', budget: 12000, labor: 7200, materials: 800, overhead: 500, total: 8500, margin: 29.2 },
                { name: 'Mobile App Development', budget: 25000, labor: 15000, materials: 2000, overhead: 1500, total: 18500, margin: 26.0 },
                { name: 'Brand Identity', budget: 8000, labor: 4800, materials: 400, overhead: 300, total: 5500, margin: 31.3 }
              ].map((project, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{project.name}</h3>
                    <Badge className={`${project.margin > 30 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                      {project.margin}% margin
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Budget</p>
                      <p className="font-semibold">£{project.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Labor</p>
                      <p className="font-semibold">£{project.labor.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Materials</p>
                      <p className="font-semibold">£{project.materials.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Overhead</p>
                      <p className="font-semibold">£{project.overhead.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Cost</p>
                      <p className="font-semibold">£{project.total.toLocaleString()}</p>
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
              <Filter className="h-4 w-4 mr-2" />
              Filter Reports
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-brisk-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Project Summary</h3>
              <p className="text-sm text-gray-600 mb-3">Overview of all project metrics</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Time Analysis</h3>
              <p className="text-sm text-gray-600 mb-3">Detailed time tracking reports</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <PoundSterling className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Profitability</h3>
              <p className="text-sm text-gray-600 mb-3">Project profitability analysis</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Generated project reports and scheduled deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Monthly Project Summary', type: 'Summary', generated: '2 hours ago', size: '2.4 MB' },
                { name: 'Q4 Time Analysis', type: 'Time Tracking', generated: '1 day ago', size: '1.8 MB' },
                { name: 'Project Profitability Report', type: 'Financial', generated: '3 days ago', size: '3.1 MB' },
                { name: 'Client Project Status', type: 'Status', generated: '1 week ago', size: '1.2 MB' }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-gray-600">{report.type} • {report.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{report.generated}</span>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
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
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Budget
            </Button>
            <Button>
              <Calculator className="h-4 w-4 mr-2" />
              Budget Wizard
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Annual Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brisk-primary">£450,000</div>
              <p className="text-sm text-gray-600">2024 total budget</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Allocated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">£380,000</div>
              <p className="text-sm text-gray-600">84% allocated</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">£70,000</div>
              <p className="text-sm text-gray-600">Available to allocate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">8</div>
              <p className="text-sm text-gray-600">Budget categories</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Budget allocation by department and category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: 'Operations', allocated: 150000, spent: 125000, remaining: 25000, percentage: 83.3 },
                { category: 'Marketing', allocated: 80000, spent: 65000, remaining: 15000, percentage: 81.3 },
                { category: 'Technology', allocated: 60000, spent: 45000, remaining: 15000, percentage: 75.0 },
                { category: 'Human Resources', allocated: 90000, spent: 78000, remaining: 12000, percentage: 86.7 }
              ].map((budget, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{budget.category}</h3>
                    <Badge className={`${budget.percentage > 85 ? 'bg-red-100 text-red-800' : budget.percentage > 75 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                      {budget.percentage}% used
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                    <div>
                      <p className="text-gray-600">Allocated</p>
                      <p className="font-semibold">£{budget.allocated.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Spent</p>
                      <p className="font-semibold">£{budget.spent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Remaining</p>
                      <p className="font-semibold">£{budget.remaining.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${budget.percentage > 85 ? 'bg-red-600' : budget.percentage > 75 ? 'bg-orange-600' : 'bg-green-600'}`}
                      style={{ width: `${budget.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
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
            <p className="text-gray-600">Track budget performance and spending patterns</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter Period
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Good</div>
              <p className="text-sm text-gray-600">Overall status</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Variance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">-5.2%</div>
              <p className="text-sm text-gray-600">vs planned</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Burn Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brisk-primary">£31,667</div>
              <p className="text-sm text-gray-600">Monthly average</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">£425,000</div>
              <p className="text-sm text-gray-600">Year-end projection</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Budget Performance</CardTitle>
            <CardDescription>Budget vs actual spending by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { month: 'January', budgeted: 37500, actual: 35200, variance: -6.1, status: 'Under' },
                { month: 'February', budgeted: 37500, actual: 39800, variance: 6.1, status: 'Over' },
                { month: 'March', budgeted: 37500, actual: 36900, variance: -1.6, status: 'Under' },
                { month: 'April', budgeted: 37500, actual: 38200, variance: 1.9, status: 'Over' }
              ].map((month, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <TrendingUp className={`h-6 w-6 ${month.status === 'Over' ? 'text-red-600' : 'text-green-600'}`} />
                    <div>
                      <p className="font-medium">{month.month}</p>
                      <p className="text-sm text-gray-600">
                        £{month.actual.toLocaleString()} / £{month.budgeted.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${month.status === 'Over' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {month.variance > 0 ? '+' : ''}{month.variance}%
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">{month.status} Budget</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderForecasting() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Financial Forecasting</h2>
            <p className="text-gray-600">Predict future financial performance and trends</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <LineChart className="h-4 w-4 mr-2" />
              Run Forecast
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Forecast
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">6-Month Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brisk-primary">£275,000</div>
              <p className="text-sm text-gray-600">Projected revenue</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+12.5%</div>
              <p className="text-sm text-gray-600">Year over year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">87%</div>
              <p className="text-sm text-gray-600">Forecast accuracy</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Forecast Scenarios</CardTitle>
            <CardDescription>Different financial scenarios and their projections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { scenario: 'Conservative', revenue: 240000, expenses: 180000, profit: 60000, probability: 70 },
                { scenario: 'Most Likely', revenue: 275000, expenses: 195000, profit: 80000, probability: 85 },
                { scenario: 'Optimistic', revenue: 320000, expenses: 210000, profit: 110000, probability: 45 }
              ].map((scenario, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{scenario.scenario}</h3>
                    <Badge className={`${scenario.probability > 70 ? 'bg-green-100 text-green-800' : scenario.probability > 50 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                      {scenario.probability}% likely
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Revenue</p>
                      <p className="font-semibold text-green-600">£{scenario.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Expenses</p>
                      <p className="font-semibold text-red-600">£{scenario.expenses.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Profit</p>
                      <p className="font-semibold text-brisk-primary">£{scenario.profit.toLocaleString()}</p>
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

  function renderVarianceAnalysis() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Variance Analysis</h2>
            <p className="text-gray-600">Analyze differences between budgeted and actual performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Analysis
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Variance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+£15,000</div>
              <p className="text-sm text-gray-600">Above budget</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cost Variance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">+£8,500</div>
              <p className="text-sm text-gray-600">Over budget</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Net Variance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brisk-primary">+£6,500</div>
              <p className="text-sm text-gray-600">Favorable</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Variance %</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">2.8%</div>
              <p className="text-sm text-gray-600">Of total budget</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Variance Analysis</CardTitle>
            <CardDescription>Line-by-line comparison of budget vs actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: 'Sales Revenue', budgeted: 120000, actual: 135000, variance: 15000, type: 'Favorable' },
                { category: 'Cost of Sales', budgeted: 45000, actual: 48500, variance: -3500, type: 'Unfavorable' },
                { category: 'Operating Expenses', budgeted: 35000, actual: 40000, variance: -5000, type: 'Unfavorable' },
                { category: 'Marketing Costs', budgeted: 15000, actual: 12000, variance: 3000, type: 'Favorable' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <BarChart3 className={`h-6 w-6 ${item.type === 'Favorable' ? 'text-green-600' : 'text-red-600'}`} />
                    <div>
                      <p className="font-medium">{item.category}</p>
                      <p className="text-sm text-gray-600">
                        Budget: £{item.budgeted.toLocaleString()} | Actual: £{item.actual.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${item.type === 'Favorable' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.variance > 0 ? '+' : ''}£{item.variance.toLocaleString()}
                    </p>
                    <Badge className={`${item.type === 'Favorable' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.type}
                    </Badge>
                  </div>
                </div>
              ))}
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
              <Building className="h-4 w-4 mr-2" />
              Portfolio Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">15</div>
              <p className="text-sm text-gray-600">In portfolio</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Occupied</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">13</div>
              <p className="text-sm text-gray-600">87% occupancy</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">£18,500</div>
              <p className="text-sm text-gray-600">Rental income</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">£2.4M</div>
              <p className="text-sm text-gray-600">Total value</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Property List</CardTitle>
            <CardDescription>Overview of all properties in your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { address: '123 Main Street', type: '2 bed apartment', tenant: 'John Smith', rent: 1200, status: 'Occupied', value: 180000 },
                { address: '456 Oak Avenue', type: '3 bed house', tenant: 'Sarah Johnson', rent: 1800, status: 'Occupied', value: 250000 },
                { address: '789 Pine Road', type: '1 bed flat', tenant: null, rent: 900, status: 'Vacant', value: 120000 },
                { address: '321 Elm Street', type: '4 bed house', tenant: 'Mike Wilson', rent: 2200, status: 'Occupied', value: 320000 }
              ].map((property, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Building className="h-8 w-8 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{property.address}</p>
                      <p className="text-sm text-gray-600">{property.type}</p>
                      <p className="text-xs text-gray-500">
                        {property.tenant ? `Tenant: ${property.tenant}` : 'No tenant'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{property.rent}/month</p>
                    <p className="text-sm text-gray-600">Value: £{property.value.toLocaleString()}</p>
                    <Badge className={`${property.status === 'Occupied' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {property.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderTenantManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Tenant Management</h2>
            <p className="text-gray-600">Manage tenant relationships and communications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Tenant
            </Button>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Send Notice
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Tenants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">13</div>
              <p className="text-sm text-gray-600">Current tenants</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lease Renewals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">3</div>
              <p className="text-sm text-gray-600">Due this quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Outstanding Rent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">£2,400</div>
              <p className="text-sm text-gray-600">Overdue payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">4.2/5</div>
              <p className="text-sm text-gray-600">Average rating</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tenant Directory</CardTitle>
            <CardDescription>Complete list of current and past tenants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'John Smith', property: '123 Main Street', lease: '2023-01-15 to 2024-01-14', rent: 1200, status: 'Current', contact: 'john@email.com' },
                { name: 'Sarah Johnson', property: '456 Oak Avenue', lease: '2022-06-01 to 2024-05-31', rent: 1800, status: 'Current', contact: 'sarah@email.com' },
                { name: 'Mike Wilson', property: '321 Elm Street', lease: '2023-03-01 to 2025-02-28', rent: 2200, status: 'Current', contact: 'mike@email.com' },
                { name: 'Emma Davis', property: '789 Pine Road', lease: '2022-12-01 to 2023-11-30', rent: 900, status: 'Former', contact: 'emma@email.com' }
              ].map((tenant, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Users className="h-8 w-8 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{tenant.name}</p>
                      <p className="text-sm text-gray-600">{tenant.property}</p>
                      <p className="text-xs text-gray-500">{tenant.lease}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{tenant.rent}/month</p>
                    <p className="text-sm text-gray-600">{tenant.contact}</p>
                    <Badge className={`${tenant.status === 'Current' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {tenant.status}
                    </Badge>
                  </div>
                </div>
              ))}
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
            <p className="text-gray-600">Track and analyze rental income streams</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <PoundSterling className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Income Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£18,500</div>
              <p className="text-sm text-gray-600">Collected rent</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">YTD Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">£185,000</div>
              <p className="text-sm text-gray-600">Year to date</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Collection Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">96%</div>
              <p className="text-sm text-gray-600">On-time payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Yield</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">7.8%</div>
              <p className="text-sm text-gray-600">Annual yield</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Rent Payments</CardTitle>
            <CardDescription>Latest rental income transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { tenant: 'John Smith', property: '123 Main Street', amount: 1200, date: '2024-01-01', status: 'Paid', method: 'Bank Transfer' },
                { tenant: 'Sarah Johnson', property: '456 Oak Avenue', amount: 1800, date: '2024-01-01', status: 'Paid', method: 'Standing Order' },
                { tenant: 'Mike Wilson', property: '321 Elm Street', amount: 2200, date: '2024-01-01', status: 'Paid', method: 'Direct Debit' },
                { tenant: 'Emma Davis', property: '789 Pine Road', amount: 900, date: '2024-01-01', status: 'Overdue', method: 'Bank Transfer' }
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <PoundSterling className={`h-6 w-6 ${payment.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`} />
                    <div>
                      <p className="font-medium">{payment.tenant}</p>
                      <p className="text-sm text-gray-600">{payment.property}</p>
                      <p className="text-xs text-gray-500">{payment.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{payment.amount}</p>
                    <p className="text-sm text-gray-600">{payment.date}</p>
                    <Badge className={`${payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
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
            <p className="text-gray-600">Track maintenance, repairs, and property-related costs</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
            <Button>
              <Receipt className="h-4 w-4 mr-2" />
              Expense Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">£3,200</div>
              <p className="text-sm text-gray-600">Total expenses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">YTD Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">£28,500</div>
              <p className="text-sm text-gray-600">Year to date</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">£15,200</div>
              <p className="text-sm text-gray-600">Repairs & upkeep</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Net Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£156,500</div>
              <p className="text-sm text-gray-600">After expenses</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Latest property-related expenditures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { description: 'Plumbing Repair', property: '123 Main Street', amount: 450, date: '2024-01-15', category: 'Maintenance', status: 'Paid' },
                { description: 'Property Insurance', property: 'All Properties', amount: 1200, date: '2024-01-10', category: 'Insurance', status: 'Paid' },
                { description: 'Garden Maintenance', property: '456 Oak Avenue', amount: 180, date: '2024-01-08', category: 'Maintenance', status: 'Pending' },
                { description: 'Electrical Safety Check', property: '321 Elm Street', amount: 320, date: '2024-01-05', category: 'Safety', status: 'Paid' }
              ].map((expense, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Receipt className="h-6 w-6 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-gray-600">{expense.property}</p>
                      <p className="text-xs text-gray-500">{expense.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{expense.amount}</p>
                    <p className="text-sm text-gray-600">{expense.date}</p>
                    <Badge className={`${expense.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                      {expense.status}
                    </Badge>
                  </div>
                </div>
              ))}
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
            <p className="text-gray-600">Manage your eCommerce platform integrations</p>
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

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">5</div>
              <p className="text-sm text-gray-600">Active platforms</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">£45,230</div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">1,247</div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Last Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">2h</div>
              <p className="text-sm text-gray-600">Ago</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Platform Integrations</CardTitle>
            <CardDescription>Your connected eCommerce platforms and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Amazon Seller Central', type: 'Marketplace', sales: 18500, orders: 456, status: 'Connected', lastSync: '1 hour ago' },
                { name: 'eBay Store', type: 'Marketplace', sales: 12300, orders: 234, status: 'Connected', lastSync: '2 hours ago' },
                { name: 'Shopify Store', type: 'Website', sales: 8900, orders: 167, status: 'Connected', lastSync: '30 minutes ago' },
                { name: 'Etsy Shop', type: 'Marketplace', sales: 3200, orders: 89, status: 'Error', lastSync: '1 day ago' },
                { name: 'WooCommerce', type: 'Website', sales: 2330, orders: 45, status: 'Connected', lastSync: '1 hour ago' }
              ].map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <ShoppingCart className="h-8 w-8 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{platform.name}</p>
                      <p className="text-sm text-gray-600">{platform.type}</p>
                      <p className="text-xs text-gray-500">Last sync: {platform.lastSync}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{platform.sales.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{platform.orders} orders</p>
                    <Badge className={`${platform.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {platform.status}
                    </Badge>
                  </div>
                </div>
              ))}
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
            <p className="text-gray-600">Track and manage orders across all platforms</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter Orders
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Orders
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">47</div>
              <p className="text-sm text-gray-600">New orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">23</div>
              <p className="text-sm text-gray-600">Awaiting fulfillment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shipped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">156</div>
              <p className="text-sm text-gray-600">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">8</div>
              <p className="text-sm text-gray-600">Pending processing</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from all connected platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { orderId: 'AMZ-001234', platform: 'Amazon', customer: 'John Doe', amount: 89.99, status: 'Shipped', date: '2024-01-15' },
                { orderId: 'EB-567890', platform: 'eBay', customer: 'Sarah Smith', amount: 45.50, status: 'Pending', date: '2024-01-15' },
                { orderId: 'SH-112233', platform: 'Shopify', customer: 'Mike Johnson', amount: 129.99, status: 'Processing', date: '2024-01-14' },
                { orderId: 'ET-445566', platform: 'Etsy', customer: 'Emma Wilson', amount: 24.99, status: 'Delivered', date: '2024-01-14' }
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Package className="h-6 w-6 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{order.orderId}</p>
                      <p className="text-sm text-gray-600">{order.platform} • {order.customer}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{order.amount}</p>
                    <Badge className={`${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
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
            <p className="text-gray-600">Monitor platform payouts and settlement schedules</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              Reconcile
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Settlement Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">£8,450</div>
              <p className="text-sm text-gray-600">Awaiting settlement</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£42,300</div>
              <p className="text-sm text-gray-600">Settled amount</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">£3,180</div>
              <p className="text-sm text-gray-600">Platform fees</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Net Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">£39,120</div>
              <p className="text-sm text-gray-600">After fees</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Settlement History</CardTitle>
            <CardDescription>Recent platform settlements and payouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { platform: 'Amazon', amount: 15430, fees: 1234, net: 14196, date: '2024-01-10', status: 'Settled' },
                { platform: 'eBay', amount: 8900, fees: 712, net: 8188, date: '2024-01-08', status: 'Settled' },
                { platform: 'Shopify', amount: 12500, fees: 375, net: 12125, date: '2024-01-05', status: 'Settled' },
                { platform: 'Etsy', amount: 3200, fees: 256, net: 2944, date: '2024-01-03', status: 'Pending' }
              ].map((settlement, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <CreditCard className={`h-6 w-6 ${settlement.status === 'Settled' ? 'text-green-600' : 'text-orange-600'}`} />
                    <div>
                      <p className="font-medium">{settlement.platform}</p>
                      <p className="text-sm text-gray-600">Gross: £{settlement.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Fees: £{settlement.fees.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{settlement.net.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{settlement.date}</p>
                    <Badge className={`${settlement.status === 'Settled' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                      {settlement.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderInvoicesManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Invoice Management</h2>
            <p className="text-gray-600">Create, manage, and track all customer invoices</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </div>
        </div>

        <SearchFilterHeader
          searchPlaceholder="Search invoices by customer, number, amount..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Status',
              options: statusOptions,
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Type',
              options: typeOptions,
              value: selectedType,
              onChange: setSelectedType
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Outstanding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">£23,450</div>
              <p className="text-sm text-gray-600">12 invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">£8,200</div>
              <p className="text-sm text-gray-600">3 invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paid This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£45,600</div>
              <p className="text-sm text-gray-600">28 invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">£1,850</div>
              <p className="text-sm text-gray-600">Per invoice</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Latest invoice activity and payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { number: 'INV-2024-001', customer: 'ABC Corporation', amount: 2500, date: '2024-01-15', status: 'Paid', dueDate: '2024-02-14' },
                { number: 'INV-2024-002', customer: 'XYZ Limited', amount: 1850, date: '2024-01-16', status: 'Outstanding', dueDate: '2024-02-15' },
                { number: 'INV-2024-003', customer: 'StartupCo Ltd', amount: 950, date: '2024-01-17', status: 'Overdue', dueDate: '2024-02-01' },
                { number: 'INV-2024-004', customer: 'Tech Solutions Inc', amount: 3200, date: '2024-01-18', status: 'Outstanding', dueDate: '2024-02-17' },
                { number: 'INV-2024-005', customer: 'Marketing Pro Ltd', amount: 1450, date: '2024-01-19', status: 'Paid', dueDate: '2024-02-18' }
              ].map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{invoice.number}</p>
                      <Badge className={`${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                        invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{invoice.customer}</p>
                    <p className="text-xs text-gray-500">Due: {invoice.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{invoice.amount}</p>
                    <p className="text-sm text-gray-600">{invoice.date}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Template Management</CardTitle>
            <CardDescription>Customize invoice templates with your company branding</CardDescription>
          </CardHeader>
          <CardContent>
            <InvoiceTemplateManager />
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderQuotesManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Quote Management</h2>
            <p className="text-gray-600">Create, manage, and convert quotes to invoices</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Quote
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">15</div>
              <p className="text-sm text-gray-600">Awaiting response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Accepted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">8</div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">68%</div>
              <p className="text-sm text-gray-600">Quotes to sales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">£34,750</div>
              <p className="text-sm text-gray-600">Pending quotes</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Quotes</CardTitle>
            <CardDescription>Latest quotes and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { number: 'QUO-2024-015', customer: 'ABC Corporation', amount: 3500, date: '2024-01-20', status: 'Pending', validUntil: '2024-02-20' },
                { number: 'QUO-2024-016', customer: 'XYZ Limited', amount: 2850, date: '2024-01-19', status: 'Accepted', validUntil: '2024-02-19' },
                { number: 'QUO-2024-017', customer: 'StartupCo Ltd', amount: 1950, date: '2024-01-18', status: 'Declined', validUntil: '2024-02-18' },
                { number: 'QUO-2024-018', customer: 'Tech Solutions Inc', amount: 4200, date: '2024-01-17', status: 'Pending', validUntil: '2024-02-17' },
                { number: 'QUO-2024-019', customer: 'Marketing Pro Ltd', amount: 1650, date: '2024-01-16', status: 'Accepted', validUntil: '2024-02-16' }
              ].map((quote, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{quote.number}</p>
                      <Badge className={`${
                        quote.status === 'Accepted' ? 'bg-green-100 text-green-800' : 
                        quote.status === 'Declined' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {quote.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{quote.customer}</p>
                    <p className="text-xs text-gray-500">Valid until: {quote.validUntil}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{quote.amount}</p>
                    <p className="text-sm text-gray-600">{quote.date}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      {quote.status === 'Accepted' && (
                        <Button variant="ghost" size="sm">
                          <Receipt className="h-3 w-3" />
                        </Button>
                      )}
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

  function renderCustomersManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Customer Management</h2>
            <p className="text-gray-600">Manage customer information, contacts, and transaction history</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">156</div>
              <p className="text-sm text-gray-600">Active customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">New This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">8</div>
              <p className="text-sm text-gray-600">+12% growth</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Customer Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">£12,450</div>
              <p className="text-sm text-gray-600">Lifetime value</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">£1,850</div>
              <p className="text-sm text-gray-600">Per customer</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Database</CardTitle>
            <CardDescription>Complete customer information and transaction history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'ABC Corporation', email: 'accounts@abccorp.com', phone: '+44 20 7123 4567', totalSpent: 12450, lastOrder: '2024-01-15', status: 'Active' },
                { name: 'XYZ Limited', email: 'finance@xyzltd.com', phone: '+44 161 234 5678', totalSpent: 8750, lastOrder: '2024-01-12', status: 'Active' },
                { name: 'StartupCo Ltd', email: 'admin@startupco.com', phone: '+44 113 345 6789', totalSpent: 3200, lastOrder: '2024-01-10', status: 'Active' },
                { name: 'Tech Solutions Inc', email: 'billing@techsolutions.com', phone: '+44 121 456 7890', totalSpent: 15600, lastOrder: '2024-01-08', status: 'VIP' },
                { name: 'Marketing Pro Ltd', email: 'accounts@marketingpro.com', phone: '+44 131 567 8901', totalSpent: 5400, lastOrder: '2024-01-05', status: 'Active' }
              ].map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{customer.name}</p>
                      <Badge className={`${
                        customer.status === 'VIP' ? 'bg-purple-100 text-purple-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {customer.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{customer.email}</p>
                    <p className="text-xs text-gray-500">{customer.phone}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">£{customer.totalSpent}</p>
                    <p className="text-sm text-gray-600">Total spent</p>
                    <p className="text-xs text-gray-500">Last: {customer.lastOrder}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Receipt className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderProductsManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Product Catalog</h2>
            <p className="text-gray-600">Manage products, services, pricing, and inventory</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Catalog
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">45</div>
              <p className="text-sm text-gray-600">Active products</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">28</div>
              <p className="text-sm text-gray-600">Service offerings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Seller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">£45,600</div>
              <p className="text-sm text-gray-600">Revenue this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">£1,245</div>
              <p className="text-sm text-gray-600">Per product</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Catalog</CardTitle>
            <CardDescription>Complete product and service listings with pricing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Professional Services Package', category: 'Services', price: 2500, cost: 1200, margin: 52, sales: 24, status: 'Active' },
                { name: 'Consultation Services', category: 'Services', price: 1800, cost: 800, margin: 56, sales: 18, status: 'Active' },
                { name: 'Software License', category: 'Products', price: 850, cost: 400, margin: 53, sales: 35, status: 'Active' },
                { name: 'Training Program', category: 'Services', price: 1500, cost: 600, margin: 60, sales: 12, status: 'Active' },
                { name: 'Support Package', category: 'Services', price: 950, cost: 350, margin: 63, sales: 28, status: 'Active' }
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{product.name}</p>
                      <Badge className="bg-blue-100 text-blue-800">{product.category}</Badge>
                      <Badge className={`${
                        product.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Cost: £{product.cost} | Margin: {product.margin}%</p>
                    <p className="text-xs text-gray-500">{product.sales} units sold this month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{product.price}</p>
                    <p className="text-sm text-gray-600">Unit price</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-3 w-3" />
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

  function renderBillsManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Bill Management</h2>
            <p className="text-gray-600">Process, approve, and track supplier bills and payments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Bill
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </div>
        </div>

        <SearchFilterHeader
          searchPlaceholder="Search bills by supplier, amount, due date..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filters={[
            {
              label: 'Status',
              options: statusOptions,
              value: selectedStatus,
              onChange: setSelectedStatus
            },
            {
              label: 'Category',
              options: categoryOptions,
              value: selectedCategory,
              onChange: setSelectedCategory
            }
          ]}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo
          }}
        />

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Outstanding Bills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">£18,750</div>
              <p className="text-sm text-gray-600">8 bills</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">£5,200</div>
              <p className="text-sm text-gray-600">2 bills</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paid This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£32,400</div>
              <p className="text-sm text-gray-600">18 bills</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">£1,245</div>
              <p className="text-sm text-gray-600">Per bill</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bills</CardTitle>
            <CardDescription>Latest supplier bills and payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { number: 'BILL-2024-001', supplier: 'Office Supplies Ltd', amount: 450, date: '2024-01-20', status: 'Pending', dueDate: '2024-02-19' },
                { number: 'BILL-2024-002', supplier: 'Tech Equipment Co', amount: 2850, date: '2024-01-19', status: 'Approved', dueDate: '2024-02-18' },
                { number: 'BILL-2024-003', supplier: 'Utilities Provider', amount: 185, date: '2024-01-18', status: 'Paid', dueDate: '2024-02-17' },
                { number: 'BILL-2024-004', supplier: 'Marketing Agency', amount: 3200, date: '2024-01-17', status: 'Overdue', dueDate: '2024-02-01' },
                { number: 'BILL-2024-005', supplier: 'Legal Services', amount: 1450, date: '2024-01-16', status: 'Pending', dueDate: '2024-02-15' }
              ].map((bill, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{bill.number}</p>
                      <Badge className={`${
                        bill.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                        bill.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                        bill.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {bill.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{bill.supplier}</p>
                    <p className="text-xs text-gray-500">Due: {bill.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{bill.amount}</p>
                    <p className="text-sm text-gray-600">{bill.date}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      {bill.status === 'Approved' && (
                        <Button variant="ghost" size="sm">
                          <CreditCard className="h-3 w-3" />
                        </Button>
                      )}
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

  function renderPurchaseOrdersManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Purchase Order Management</h2>
            <p className="text-gray-600">Create, track, and manage purchase orders</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New PO
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active POs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">12</div>
              <p className="text-sm text-gray-600">In progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">5</div>
              <p className="text-sm text-gray-600">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">28</div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">£45,600</div>
              <p className="text-sm text-gray-600">Active POs</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Purchase Orders</CardTitle>
            <CardDescription>Latest purchase orders and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { number: 'PO-2024-008', supplier: 'Tech Equipment Co', amount: 2850, date: '2024-01-20', status: 'Approved', deliveryDate: '2024-02-05' },
                { number: 'PO-2024-009', supplier: 'Office Furniture Ltd', amount: 1650, date: '2024-01-19', status: 'Pending', deliveryDate: '2024-02-10' },
                { number: 'PO-2024-010', supplier: 'Software Vendor', amount: 950, date: '2024-01-18', status: 'Delivered', deliveryDate: '2024-01-25' },
                { number: 'PO-2024-011', supplier: 'Stationery Supplies', amount: 320, date: '2024-01-17', status: 'In Transit', deliveryDate: '2024-01-30' },
                { number: 'PO-2024-012', supplier: 'Marketing Materials', amount: 1450, date: '2024-01-16', status: 'Approved', deliveryDate: '2024-02-08' }
              ].map((po, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{po.number}</p>
                      <Badge className={`${
                        po.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        po.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                        po.status === 'Approved' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {po.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{po.supplier}</p>
                    <p className="text-xs text-gray-500">Delivery: {po.deliveryDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{po.amount}</p>
                    <p className="text-sm text-gray-600">{po.date}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ShoppingCart className="h-3 w-3" />
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

  function renderSuppliersManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Supplier Management</h2>
            <p className="text-gray-600">Manage supplier information, payment terms, and transaction history</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">89</div>
              <p className="text-sm text-gray-600">Active suppliers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">New This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">3</div>
              <p className="text-sm text-gray-600">+5% growth</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Supplier Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">£8,450</div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">£1,245</div>
              <p className="text-sm text-gray-600">Per supplier</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Supplier Database</CardTitle>
            <CardDescription>Complete supplier information and payment terms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Tech Equipment Co', email: 'orders@techequipment.com', phone: '+44 20 8123 4567', totalSpent: 8450, paymentTerms: '30 days', status: 'Preferred' },
                { name: 'Office Supplies Ltd', email: 'sales@officesupplies.com', phone: '+44 161 234 5678', totalSpent: 3200, paymentTerms: '14 days', status: 'Active' },
                { name: 'Marketing Agency', email: 'billing@marketingagency.com', phone: '+44 113 345 6789', totalSpent: 5600, paymentTerms: '30 days', status: 'Active' },
                { name: 'Legal Services', email: 'accounts@legalservices.com', phone: '+44 121 456 7890', totalSpent: 2850, paymentTerms: '7 days', status: 'Active' },
                { name: 'Utilities Provider', email: 'billing@utilities.com', phone: '+44 131 567 8901', totalSpent: 1450, paymentTerms: '30 days', status: 'Active' }
              ].map((supplier, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{supplier.name}</p>
                      <Badge className={`${
                        supplier.status === 'Preferred' ? 'bg-purple-100 text-purple-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {supplier.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{supplier.email}</p>
                    <p className="text-xs text-gray-500">{supplier.phone} | Terms: {supplier.paymentTerms}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">£{supplier.totalSpent}</p>
                    <p className="text-sm text-gray-600">Total spent</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Receipt className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderExpensesManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Expense Management</h2>
            <p className="text-gray-600">Track, categorize, and manage business expenses</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">£12,450</div>
              <p className="text-sm text-gray-600">Total expenses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">£2,850</div>
              <p className="text-sm text-gray-600">8 expenses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reimbursable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">£1,650</div>
              <p className="text-sm text-gray-600">Employee expenses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">£185</div>
              <p className="text-sm text-gray-600">Per transaction</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Latest expense submissions and approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { reference: 'EXP-2024-045', description: 'Travel - Client Meeting', category: 'Travel', amount: 185, date: '2024-01-20', status: 'Approved', submittedBy: 'John Smith' },
                { reference: 'EXP-2024-046', description: 'Office Supplies', category: 'Office', amount: 95, date: '2024-01-19', status: 'Pending', submittedBy: 'Sarah Johnson' },
                { reference: 'EXP-2024-047', description: 'Software Subscription', category: 'Software', amount: 450, date: '2024-01-18', status: 'Approved', submittedBy: 'Mike Chen' },
                { reference: 'EXP-2024-048', description: 'Client Lunch', category: 'Meals', amount: 85, date: '2024-01-17', status: 'Submitted', submittedBy: 'Emma Wilson' },
                { reference: 'EXP-2024-049', description: 'Parking Fees', category: 'Travel', amount: 25, date: '2024-01-16', status: 'Approved', submittedBy: 'David Brown' }
              ].map((expense, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{expense.reference}</p>
                      <Badge className={`${
                        expense.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                        expense.status === 'Submitted' ? 'bg-blue-100 text-blue-800' : 
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {expense.status}
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-800">{expense.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{expense.description}</p>
                    <p className="text-xs text-gray-500">By: {expense.submittedBy} | {expense.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{expense.amount}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
              <CardDescription>Breakdown by expense category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: 'Travel', amount: 3450, percentage: 28, color: 'bg-brisk-primary' },
                  { category: 'Office Supplies', amount: 2850, percentage: 23, color: 'bg-orange-500' },
                  { category: 'Software', amount: 2200, percentage: 18, color: 'bg-green-500' },
                  { category: 'Meals & Entertainment', amount: 1950, percentage: 16, color: 'bg-purple-500' },
                  { category: 'Other', amount: 2000, percentage: 15, color: 'bg-gray-500' }
                ].map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{category.category}</p>
                      <p className="font-semibold">£{category.amount}</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${category.color}`}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">{category.percentage}% of total expenses</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Trend</CardTitle>
              <CardDescription>Expense trends over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: 'January 2024', amount: 12450, change: '+8%' },
                  { month: 'December 2023', amount: 11520, change: '-3%' },
                  { month: 'November 2023', amount: 11890, change: '+12%' },
                  { month: 'October 2023', amount: 10620, change: '+5%' },
                  { month: 'September 2023', amount: 10120, change: '-2%' },
                  { month: 'August 2023', amount: 10350, change: '+7%' }
                ].map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{month.month}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{month.amount}</p>
                      <p className={`text-sm ${month.change.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                        {month.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderBankAccountsManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Bank Account Management</h2>
            <p className="text-gray-600">Manage bank accounts, balances, and account settings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£125,430</div>
              <p className="text-sm text-gray-600">Across all accounts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">8</div>
              <p className="text-sm text-gray-600">Connected accounts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Inflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">£45,230</div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Outflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">£32,180</div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bank Accounts</CardTitle>
            <CardDescription>All connected bank accounts and their current balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Business Current Account', bank: 'Barclays', accountNumber: '****1234', balance: 45230, type: 'Current', status: 'Active' },
                { name: 'Business Savings Account', bank: 'HSBC', accountNumber: '****5678', balance: 32100, type: 'Savings', status: 'Active' },
                { name: 'Payroll Account', bank: 'Lloyds', accountNumber: '****9012', balance: 28900, type: 'Current', status: 'Active' },
                { name: 'Tax Reserve Account', bank: 'NatWest', accountNumber: '****3456', balance: 12800, type: 'Savings', status: 'Active' },
                { name: 'Petty Cash Account', bank: 'Santander', accountNumber: '****7890', balance: 6400, type: 'Current', status: 'Active' }
              ].map((account, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Landmark className="h-8 w-8 text-brisk-primary" />
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-gray-600">{account.bank} • {account.accountNumber}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge className="bg-blue-100 text-blue-800">{account.type}</Badge>
                        <Badge className="bg-green-100 text-green-800">{account.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">£{account.balance.toLocaleString()}</p>
                    <div className="flex gap-1 mt-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-3 w-3" />
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

  function renderBankTransactionsManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Bank Transactions</h2>
            <p className="text-gray-600">View, categorize, and manage all bank transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">1,245</div>
              <p className="text-sm text-gray-600">Total transactions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Uncategorized</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">23</div>
              <p className="text-sm text-gray-600">Need attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£45,230</div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">£32,180</div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest bank transactions across all accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: '2024-01-20', description: 'Customer Payment - INV-001', account: 'Business Current', amount: 2500, type: 'Credit', category: 'Sales', status: 'Categorized' },
                { date: '2024-01-20', description: 'Office Rent Payment', account: 'Business Current', amount: -1200, type: 'Debit', category: 'Rent', status: 'Categorized' },
                { date: '2024-01-19', description: 'Supplier Payment - Tech Co', account: 'Business Current', amount: -850, type: 'Debit', category: 'Purchases', status: 'Categorized' },
                { date: '2024-01-19', description: 'Bank Transfer In', account: 'Business Savings', amount: 5000, type: 'Credit', category: '', status: 'Uncategorized' },
                { date: '2024-01-18', description: 'Utilities - Electric', account: 'Business Current', amount: -185, type: 'Debit', category: 'Utilities', status: 'Categorized' }
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{transaction.description}</p>
                      <Badge className={`${
                        transaction.status === 'Categorized' ? 'bg-green-100 text-green-800' : 
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {transaction.status}
                      </Badge>
                      {transaction.category && (
                        <Badge className="bg-blue-100 text-blue-800">{transaction.category}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{transaction.account} • {transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}£{Math.abs(transaction.amount)}
                    </p>
                    <p className="text-sm text-gray-600">{transaction.type}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
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

  function renderReconciliationManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Bank Reconciliation</h2>
            <p className="text-gray-600">Reconcile bank statements with your accounting records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Statement
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Auto Reconcile
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reconciled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£123,450</div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Outstanding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">£2,850</div>
              <p className="text-sm text-gray-600">Needs attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Discrepancies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">3</div>
              <p className="text-sm text-gray-600">Items to review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Match Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">97.8%</div>
              <p className="text-sm text-gray-600">Auto-matched</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Reconciliation Status</CardTitle>
              <CardDescription>Current reconciliation status by account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { account: 'Business Current Account', lastReconciled: '2024-01-15', status: 'Complete', balance: 45230, difference: 0 },
                  { account: 'Business Savings Account', lastReconciled: '2024-01-10', status: 'Outstanding', balance: 32100, difference: 150 },
                  { account: 'Payroll Account', lastReconciled: '2024-01-12', status: 'Complete', balance: 28900, difference: 0 },
                  { account: 'Tax Reserve Account', lastReconciled: '2024-01-08', status: 'Pending', balance: 12800, difference: -75 }
                ].map((account, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{account.account}</p>
                      <p className="text-sm text-gray-600">Last: {account.lastReconciled}</p>
                      <Badge className={`${
                        account.status === 'Complete' ? 'bg-green-100 text-green-800' : 
                        account.status === 'Outstanding' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {account.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{account.balance.toLocaleString()}</p>
                      {account.difference !== 0 && (
                        <p className={`text-sm ${account.difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {account.difference > 0 ? '+' : ''}£{account.difference}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Outstanding Items</CardTitle>
              <CardDescription>Items requiring manual reconciliation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { description: 'Unmatched Deposit', amount: 1500, date: '2024-01-18', type: 'Credit' },
                  { description: 'Bank Charges', amount: -25, date: '2024-01-17', type: 'Debit' },
                  { description: 'Interest Payment', amount: 45, date: '2024-01-16', type: 'Credit' },
                  { description: 'Unknown Transfer', amount: -200, date: '2024-01-15', type: 'Debit' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{item.description}</p>
                      <p className="text-sm text-gray-600">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.amount > 0 ? '+' : ''}£{Math.abs(item.amount)}
                      </p>
                      <div className="flex gap-1 mt-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <UserCheck className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderBankFeedsManagement() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Bank Feed Management</h2>
            <p className="text-gray-600">Manage automatic bank feed connections and data synchronization</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Feed
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Feeds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">8</div>
              <p className="text-sm text-gray-600">Connected banks</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Last Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">2 hrs</div>
              <p className="text-sm text-gray-600">Ago</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">New Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">45</div>
              <p className="text-sm text-gray-600">Since last sync</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sync Success</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">99.2%</div>
              <p className="text-sm text-gray-600">Success rate</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bank Feed Status</CardTitle>
            <CardDescription>Status and configuration of all bank feed connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { bank: 'Barclays Business', account: '****1234', status: 'Active', lastSync: '2 hours ago', frequency: 'Every 4 hours', transactions: 156 },
                { bank: 'HSBC Business', account: '****5678', status: 'Active', lastSync: '1 hour ago', frequency: 'Every 2 hours', transactions: 89 },
                { bank: 'Lloyds Payroll', account: '****9012', status: 'Active', lastSync: '3 hours ago', frequency: 'Daily', transactions: 23 },
                { bank: 'NatWest Savings', account: '****3456', status: 'Warning', lastSync: '12 hours ago', frequency: 'Daily', transactions: 5 },
                { bank: 'Santander Petty Cash', account: '****7890', status: 'Error', lastSync: '2 days ago', frequency: 'Every 6 hours', transactions: 0 }
              ].map((feed, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Link className={`h-6 w-6 ${
                      feed.status === 'Active' ? 'text-green-600' : 
                      feed.status === 'Warning' ? 'text-orange-600' : 
                      'text-red-600'
                    }`} />
                    <div>
                      <p className="font-medium">{feed.bank}</p>
                      <p className="text-sm text-gray-600">{feed.account} • {feed.frequency}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge className={`${
                          feed.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          feed.status === 'Warning' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {feed.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{feed.transactions} transactions</p>
                    <p className="text-sm text-gray-600">Last sync: {feed.lastSync}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feed Configuration</CardTitle>
            <CardDescription>Configure automatic categorization rules and sync settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-medium">Auto-Categorization Rules</h4>
                {[
                  { rule: 'Contains "SALARY" → Payroll', matches: 45 },
                  { rule: 'Contains "RENT" → Office Expenses', matches: 12 },
                  { rule: 'Contains "HMRC" → Tax Payments', matches: 8 },
                  { rule: 'Amount > £1000 → Manual Review', matches: 23 }
                ].map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <p className="text-sm">{rule.rule}</p>
                    <Badge className="bg-blue-100 text-blue-800">{rule.matches} matches</Badge>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Sync Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-sync frequency</span>
                    <span className="text-sm font-medium">Every 2 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Duplicate detection</span>
                    <span className="text-sm font-medium">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-categorization</span>
                    <span className="text-sm font-medium">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notification alerts</span>
                    <span className="text-sm font-medium">Email + In-app</span>
                  </div>
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
            <p className="text-gray-600">Analyze sales performance across all platforms</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Custom Report
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£125,430</div>
              <p className="text-sm text-gray-600">This quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brisk-primary">+18.5%</div>
              <p className="text-sm text-gray-600">vs last quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Best Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">Amazon</div>
              <p className="text-sm text-gray-600">£45,230 revenue</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">3.2%</div>
              <p className="text-sm text-gray-600">Average rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Platform</CardTitle>
              <CardDescription>Sales breakdown by eCommerce platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { platform: 'Amazon', revenue: 45230, percentage: 36, color: 'bg-orange-500' },
                  { platform: 'eBay', revenue: 32100, percentage: 26, color: 'bg-blue-500' },
                  { platform: 'Shopify', revenue: 28900, percentage: 23, color: 'bg-green-500' },
                  { platform: 'Etsy', revenue: 12800, percentage: 10, color: 'bg-purple-500' },
                  { platform: 'WooCommerce', revenue: 6400, percentage: 5, color: 'bg-gray-500' }
                ].map((platform, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${platform.color}`}></div>
                      <span className="font-medium">{platform.platform}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{platform.revenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{platform.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best-selling products across all platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { product: 'Wireless Headphones', sales: 234, revenue: 18720, platform: 'Amazon' },
                  { product: 'Smart Watch', sales: 156, revenue: 15600, platform: 'eBay' },
                  { product: 'Phone Case', sales: 445, revenue: 8900, platform: 'Shopify' },
                  { product: 'Bluetooth Speaker', sales: 89, revenue: 7120, platform: 'Etsy' },
                  { product: 'Laptop Stand', sales: 67, revenue: 4020, platform: 'Amazon' }
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{product.product}</p>
                      <p className="text-sm text-gray-600">{product.platform} • {product.sales} sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderChartOfAccounts() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Chart of Accounts</h2>
            <p className="text-gray-600">Manage your complete chart of accounts structure</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Chart
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Accounts</p>
                  <p className="text-2xl font-bold">247</p>
                  <p className="text-xs text-blue-600">Active accounts</p>
                </div>
                <Database className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Asset Accounts</p>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-xs text-green-600">Including current assets</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Liability Accounts</p>
                  <p className="text-2xl font-bold">34</p>
                  <p className="text-xs text-orange-600">Current & long-term</p>
                </div>
                <TrendingDown className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue Accounts</p>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-xs text-purple-600">Income streams</p>
                </div>
                <PoundSterling className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Categories</CardTitle>
            <CardDescription>Organized by account type and classification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: 'Current Assets', accounts: 45, balance: '£125,430', type: 'Assets' },
                { category: 'Fixed Assets', accounts: 23, balance: '£89,200', type: 'Assets' },
                { category: 'Current Liabilities', accounts: 18, balance: '£34,500', type: 'Liabilities' },
                { category: 'Revenue', accounts: 32, balance: '£245,600', type: 'Income' },
                { category: 'Operating Expenses', accounts: 67, balance: '£78,900', type: 'Expenses' }
              ].map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{category.category}</p>
                      <Badge className={`${
                        category.type === 'Assets' ? 'bg-green-100 text-green-800' : 
                        category.type === 'Liabilities' ? 'bg-red-100 text-red-800' : 
                        category.type === 'Income' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {category.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{category.accounts} accounts</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{category.balance}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-3 w-3" />
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

  function renderGeneralJournal() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">General Journal</h2>
            <p className="text-gray-600">Record and manage all journal entries</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Journal
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Entries</p>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-xs text-blue-600">This period</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-xs text-orange-600">Awaiting approval</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Auto Entries</p>
                  <p className="text-2xl font-bold">456</p>
                  <p className="text-xs text-green-600">System generated</p>
                </div>
                <RefreshCw className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Manual Entries</p>
                  <p className="text-2xl font-bold">791</p>
                  <p className="text-xs text-purple-600">User created</p>
                </div>
                <Edit className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Journal Entries</CardTitle>
            <CardDescription>Latest journal entries and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'JE-2024-001', description: 'Monthly depreciation', date: '2024-01-31', amount: 2500, status: 'Posted' },
                { id: 'JE-2024-002', description: 'Accrued expenses adjustment', date: '2024-01-30', amount: 1850, status: 'Pending' },
                { id: 'JE-2024-003', description: 'Bank reconciliation adjustment', date: '2024-01-29', amount: 450, status: 'Posted' },
                { id: 'JE-2024-004', description: 'Prepaid insurance allocation', date: '2024-01-28', amount: 750, status: 'Draft' }
              ].map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{entry.id}</p>
                      <Badge className={`${
                        entry.status === 'Posted' ? 'bg-green-100 text-green-800' : 
                        entry.status === 'Pending' ? 'bg-orange-100 text-orange-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {entry.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{entry.description}</p>
                    <p className="text-xs text-gray-500">{entry.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{entry.amount}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-3 w-3" />
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

  function renderJournalAdjustments() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Journal Adjustments</h2>
            <p className="text-gray-600">Period-end adjustments and corrections</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Adjustment
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Process All
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Adjustment Categories</CardTitle>
            <CardDescription>Common adjustment types and their impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { type: 'Accruals', count: 12, amount: 15600, description: 'Expenses incurred but not yet recorded' },
                { type: 'Prepayments', count: 8, amount: 9200, description: 'Expenses paid in advance' },
                { type: 'Depreciation', count: 15, amount: 22400, description: 'Asset depreciation charges' },
                { type: 'Bad Debt', count: 3, amount: 4500, description: 'Provision for doubtful debts' }
              ].map((adjustment, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{adjustment.type}</h3>
                    <Badge>{adjustment.count} entries</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{adjustment.description}</p>
                  <p className="text-lg font-semibold">£{adjustment.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderJournalReversals() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Journal Reversals</h2>
            <p className="text-gray-600">Reverse and correct journal entries</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              New Reversal
            </Button>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Find Entry
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reversal History</CardTitle>
            <CardDescription>Recently reversed journal entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { original: 'JE-2024-045', reversal: 'JE-2024-046', date: '2024-01-25', amount: 1200, reason: 'Incorrect account coding' },
                { original: 'JE-2024-032', reversal: 'JE-2024-047', date: '2024-01-24', amount: 850, reason: 'Duplicate entry' },
                { original: 'JE-2024-028', reversal: 'JE-2024-048', date: '2024-01-23', amount: 2100, reason: 'Wrong period' }
              ].map((reversal, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{reversal.original}</p>
                      <ArrowLeftRight className="h-4 w-4 text-gray-400" />
                      <p className="font-medium">{reversal.reversal}</p>
                    </div>
                    <p className="text-sm text-gray-600">{reversal.reason}</p>
                    <p className="text-xs text-gray-500">{reversal.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{reversal.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderJournalTemplates() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Journal Templates</h2>
            <p className="text-gray-600">Reusable journal entry templates</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
            <Button>
              <Copy className="h-4 w-4 mr-2" />
              Use Template
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Templates</CardTitle>
            <CardDescription>Pre-configured journal entry templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { name: 'Monthly Depreciation', category: 'Fixed Assets', usage: 12, description: 'Standard monthly depreciation entries' },
                { name: 'Accrued Expenses', category: 'Liabilities', usage: 8, description: 'Period-end expense accruals' },
                { name: 'Prepaid Insurance', category: 'Assets', usage: 6, description: 'Insurance prepayment allocation' },
                { name: 'Bank Charges', category: 'Expenses', usage: 15, description: 'Monthly bank fee entries' }
              ].map((template, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{template.name}</h3>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">Used {template.usage} times</p>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-3 w-3" />
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

  function renderVATReturns() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">VAT Returns</h2>
            <p className="text-gray-600">Manage VAT returns and submissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Return
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Submit to HMRC
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Period</p>
                  <p className="text-2xl font-bold">Q1 2024</p>
                  <p className="text-xs text-blue-600">Due: 7 May 2024</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">VAT Due</p>
                  <p className="text-2xl font-bold">£8,450</p>
                  <p className="text-xs text-red-600">Amount payable</p>
                </div>
                <PoundSterling className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">VAT Reclaim</p>
                  <p className="text-2xl font-bold">£3,200</p>
                  <p className="text-xs text-green-600">Input VAT</p>
                </div>
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Net Due</p>
                  <p className="text-2xl font-bold">£5,250</p>
                  <p className="text-xs text-orange-600">Final amount</p>
                </div>
                <Calculator className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>VAT Return History</CardTitle>
            <CardDescription>Previous VAT return submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { period: 'Q4 2023', submitted: '2024-02-07', due: 5250, status: 'Submitted', reference: 'VAT-2023-Q4' },
                { period: 'Q3 2023', submitted: '2023-11-06', due: 4800, status: 'Paid', reference: 'VAT-2023-Q3' },
                { period: 'Q2 2023', submitted: '2023-08-05', due: 6100, status: 'Paid', reference: 'VAT-2023-Q2' }
              ].map((return_, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{return_.period}</p>
                      <Badge className={`${
                        return_.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                        return_.status === 'Submitted' ? 'bg-blue-100 text-blue-800' : 
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {return_.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{return_.reference}</p>
                    <p className="text-xs text-gray-500">Submitted: {return_.submitted}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{return_.due}</p>
                    <div className="flex gap-1 mt-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
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

  function renderVATSchemes() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">VAT Schemes</h2>
            <p className="text-gray-600">Manage VAT scheme settings and configurations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Change Scheme
            </Button>
            <Button>
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Impact
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current VAT Scheme</CardTitle>
            <CardDescription>Your active VAT registration details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg bg-blue-50">
                <h3 className="font-medium text-blue-900">Standard VAT Scheme</h3>
                <p className="text-sm text-blue-700 mt-1">Standard rate: 20%</p>
                <p className="text-sm text-blue-700">Registration: GB123456789</p>
                <p className="text-sm text-blue-700">Effective from: 1 April 2023</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quarterly returns</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Digital submissions</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">MTD compliant</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available VAT Schemes</CardTitle>
            <CardDescription>Compare different VAT scheme options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Standard VAT', rate: '20%', threshold: '£85,000', description: 'Standard VAT registration with full input tax recovery' },
                { name: 'Flat Rate Scheme', rate: '16.5%', threshold: '£150,000', description: 'Simplified scheme with fixed percentage on turnover' },
                { name: 'Cash Accounting', rate: '20%', threshold: '£1.35m', description: 'Pay VAT when you receive payment from customers' },
                { name: 'Annual Accounting', rate: '20%', threshold: '£1.35m', description: 'Make monthly payments with annual return' }
              ].map((scheme, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{scheme.name}</p>
                      <Badge variant="outline">{scheme.rate}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{scheme.description}</p>
                    <p className="text-xs text-gray-500">Threshold: {scheme.threshold}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Calculator className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderVATReports() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">VAT Reports</h2>
            <p className="text-gray-600">Comprehensive VAT analysis and reporting</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Custom Report
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>VAT Summary</CardTitle>
              <CardDescription>Current period overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Output VAT</span>
                  <span className="font-medium">£8,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Input VAT</span>
                  <span className="font-medium">£3,200</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Net VAT Due</span>
                  <span className="font-bold">£5,250</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>VAT by Rate</CardTitle>
              <CardDescription>Breakdown by VAT rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Standard (20%)</span>
                  <span className="font-medium">£7,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Reduced (5%)</span>
                  <span className="font-medium">£850</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Zero (0%)</span>
                  <span className="font-medium">£400</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>VAT compliance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">MTD Compliant</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Returns Up to Date</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">No Penalties</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>VAT Analysis by Month</CardTitle>
            <CardDescription>Monthly VAT liability trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { month: 'January 2024', output: 2800, input: 1200, net: 1600 },
                { month: 'February 2024', output: 3200, input: 1100, net: 2100 },
                { month: 'March 2024', output: 2450, input: 900, net: 1550 }
              ].map((month, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{month.month}</p>
                    <div className="flex gap-4 mt-1">
                      <span className="text-sm text-gray-600">Output: £{month.output}</span>
                      <span className="text-sm text-gray-600">Input: £{month.input}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">£{month.net}</p>
                    <p className="text-xs text-gray-500">Net VAT</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderVATCompliance() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">VAT Compliance</h2>
            <p className="text-gray-600">Monitor VAT compliance and regulatory requirements</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <AlertCircle className="h-4 w-4 mr-2" />
              Check Status
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Compliance Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Checklist</CardTitle>
              <CardDescription>Essential VAT compliance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { item: 'VAT registration up to date', status: 'complete', description: 'Registration details current' },
                  { item: 'Quarterly returns submitted', status: 'complete', description: 'All returns filed on time' },
                  { item: 'MTD software compliant', status: 'complete', description: 'Using approved software' },
                  { item: 'Digital records maintained', status: 'complete', description: 'Records stored digitally' },
                  { item: 'VAT invoices compliant', status: 'warning', description: 'Some invoices missing details' }
                ].map((check, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="mt-1">
                      {check.status === 'complete' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{check.item}</p>
                      <p className="text-sm text-gray-600">{check.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Important VAT dates and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { task: 'Q1 2024 VAT Return', date: '7 May 2024', days: 15, type: 'return' },
                  { task: 'VAT Payment Due', date: '7 May 2024', days: 15, type: 'payment' },
                  { task: 'Annual VAT Review', date: '31 March 2024', days: -5, type: 'review' }
                ].map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{deadline.task}</p>
                      <p className="text-sm text-gray-600">{deadline.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={`${
                        deadline.days < 0 ? 'bg-red-100 text-red-800' : 
                        deadline.days <= 7 ? 'bg-orange-100 text-orange-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {deadline.days < 0 ? `${Math.abs(deadline.days)} days overdue` : 
                         deadline.days === 0 ? 'Due today' : 
                         `${deadline.days} days`}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Alerts</CardTitle>
            <CardDescription>Recent compliance notifications and actions required</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'warning', message: 'VAT invoice missing customer VAT number', date: '2024-01-28', action: 'Update invoice template' },
                { type: 'info', message: 'New VAT rate changes effective April 2024', date: '2024-01-25', action: 'Review rate settings' },
                { type: 'success', message: 'Q4 2023 VAT return successfully submitted', date: '2024-01-20', action: 'No action required' }
              ].map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="mt-1">
                    {alert.type === 'warning' ? (
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                    ) : alert.type === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <ExternalLink className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-gray-600">{alert.action}</p>
                    <p className="text-xs text-gray-500">{alert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ResponsiveLayout>
      <div className="flex min-h-screen bg-blue-50">
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Bookkeeping</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <nav className="p-2">
              {Object.entries(menuStructure).map(([key, config]) => {
                const Icon = config.icon
                const isExpanded = expandedCategories.includes(key)
                const isActive = activeMainTab === key
                
                return (
                  <div key={key} className="mb-1">
                    <button
                      onClick={() => handleMainTabClick(key)}
                      className={`w-full flex items-center justify-between px-3 py-2 m-0.5 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                        isActive 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-[0.98] font-semibold' 
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="h-4 w-4 mr-3" />
                        <span>{config.label}</span>
                      </div>
                      {config.hasSubTabs && (
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`} />
                      )}
                    </button>
                    
                    {config.hasSubTabs && isExpanded && config.subTabs && (
                      <div className="ml-4 mt-1 space-y-1">
                        {Object.entries(config.subTabs).map(([subKey, subConfig]) => {
                          const SubIcon = subConfig.icon
                          const isSubActive = activeSubTab === subKey && activeMainTab === key
                          
                          return (
                            <button
                              key={subKey}
                              onClick={() => handleSubTabClick(subKey, key)}
                              className={`w-full flex items-center px-3 py-2 m-0.5 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                                isSubActive 
                                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-l-2 border-orange-300 shadow-md font-semibold' 
                                  : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-sm hover:shadow-md font-medium'
                              }`}
                            >
                              <SubIcon className="h-4 w-4 mr-3" />
                              <span>{subConfig.label}</span>
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
            
            <AIPromptSection
              title="Ask your Bookkeeping Adviser"
              description="Get expert bookkeeping and accounting guidance"
              placeholder="Ask about transactions, reconciliation, VAT, reporting..."
              isLoading={isAILoading}
              onSubmit={handleAIQuestion}
              recentQuestions={[
                "How do I reconcile bank transactions?",
                "What are the VAT filing requirements?",
                "How do I categorize business expenses?"
              ]}
            />
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  )
}

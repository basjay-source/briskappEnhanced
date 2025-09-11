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
  FolderOpen,
  BookOpen,
  Database,
  Landmark,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import AIPromptSection from '../../components/AIPromptSection'
import InvoiceTemplateManager from '../../components/InvoiceTemplateManager'

export default function Bookkeeping() {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['transactions', 'reports'])
  const isMobile = useIsMobile()
  const [isAILoading, setIsAILoading] = useState(false)

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
    transactions: { 
      label: 'Transactions', 
      icon: Receipt, 
      hasSubTabs: true,
      subTabs: {
        sales: { label: 'Sales', icon: TrendingUp },
        purchases: { label: 'Purchases', icon: TrendingDown },
        banking: { label: 'Banking', icon: CreditCard },
        journals: { label: 'Journals', icon: BookOpen },
        vat: { label: 'VAT Returns', icon: Percent }
      }
    },
    accounts: {
      label: 'Accounts',
      icon: Database,
      hasSubTabs: true,
      subTabs: {
        chartofaccounts: { label: 'Chart of Accounts', icon: FolderOpen },
        inventory: { label: 'Inventory', icon: Package },
        fixedassets: { label: 'Fixed Assets', icon: Building }
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
    } else if (activeMainTab === 'transactions') {
      if (activeSubTab === 'sales') return renderSalesContent()
      if (activeSubTab === 'purchases') return renderPurchasesContent()
      if (activeSubTab === 'banking') return renderBankingContent()
      if (activeSubTab === 'journals') return renderJournalsContent()
      if (activeSubTab === 'vat') return renderVATContent()
      return renderTransactionsContent()
    } else if (activeMainTab === 'accounts') {
      return renderAccountsContent()
    } else if (activeMainTab === 'reports') {
      return renderReportsContent()
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
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                      <p className={`text-xs ${kpi.color}`}>{kpi.change}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${kpi.color}`} />
                  </div>
                </CardContent>
              </Card>
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

  function renderTransactionsContent() {
    if (activeSubTab === 'sales') {
      return renderSalesContent()
    } else if (activeSubTab === 'purchases') {
      return renderPurchasesContent()
    } else if (activeSubTab === 'banking') {
      return renderBankingContent()
    } else if (activeSubTab === 'journals') {
      return renderJournalsContent()
    } else if (activeSubTab === 'vat') {
      return renderVATContent()
    }
    return renderSalesContent()
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
            <h2 className="text-2xl font-bold">Purchases Management</h2>
            <p className="text-gray-600">Bills, expenses, suppliers, and purchase analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Bill
            </Button>
            <Button>
              <Building className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bills</CardTitle>
            <CardDescription>Latest purchase bills and expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">BILL-001</p>
                    <Badge className="bg-orange-100 text-orange-800">Pending</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Office Supplies Ltd</p>
                  <p className="text-xs text-gray-500">Due: 2024-02-15</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£450</p>
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

  function renderAccountsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Chart of Accounts</h2>
            <p className="text-gray-600">Account structure and balances</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
            <CardDescription>Overview of account categories and balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <FolderOpen className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Assets</p>
                    <p className="text-sm text-gray-600">Current & Fixed Assets</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">£125,000</p>
                  <p className="text-xs text-gray-500">15 accounts</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderReportsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Financial Reports</h2>
            <p className="text-gray-600">Comprehensive financial reporting and analysis</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
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
              <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Profit & Loss</h3>
              <p className="text-sm text-gray-600 mb-3">Comprehensive P&L with comparatives</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Balance Sheet</h3>
              <p className="text-sm text-gray-600 mb-3">Assets, liabilities & equity</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <PoundSterling className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Cash Flow Statement</h3>
              <p className="text-sm text-gray-600 mb-3">Operating, investing & financing</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>
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

  return (
    <ResponsiveLayout>
      <div className="flex h-screen bg-gray-50">
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
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-brisk-primary text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
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
                              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                                isSubActive 
                                  ? 'bg-brisk-primary/10 text-brisk-primary border-l-2 border-brisk-primary' 
                                  : 'text-gray-600 hover:bg-gray-50'
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

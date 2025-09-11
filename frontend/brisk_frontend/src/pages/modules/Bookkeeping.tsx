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
  Landmark
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
    projects: { label: 'Projects', icon: Target, hasSubTabs: false },
    budgets: { label: 'Budgets', icon: Calculator, hasSubTabs: false },
    property: { label: 'Property', icon: Landmark, hasSubTabs: false },
    ecommerce: { label: 'eCommerce', icon: ShoppingCart, hasSubTabs: false },
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


  const handleSubTabClickSingle = (subTab: string) => {
    setActiveSubTab(subTab)
    setActiveMainTab('transactions')
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
      return renderTransactionsContent()
    } else if (activeMainTab === 'accounts') {
      return renderAccountsContent()
    } else if (activeMainTab === 'reports') {
      return renderReportsContent()
    } else if (activeMainTab === 'projects') {
      return renderProjectsContent()
    } else if (activeMainTab === 'budgets') {
      return renderBudgetsContent()
    } else if (activeMainTab === 'property') {
      return renderPropertyContent()
    } else if (activeMainTab === 'ecommerce') {
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
                              onClick={() => handleSubTabClickSingle(subKey)}
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

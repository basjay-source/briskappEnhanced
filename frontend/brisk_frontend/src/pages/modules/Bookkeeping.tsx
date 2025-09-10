import { useState } from 'react'
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
  Search,
  Settings,
  Link,
  FileText,
  Calculator,
  PoundSterling,
  BarChart3,
  Building,
  Users,
  CheckCircle,
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
  Clock,
  UserCheck,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Folder,
  BookOpen,
  Database,
  FileSearch,
  Landmark
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useIsMobile } from '@/hooks/use-mobile'

export default function Bookkeeping() {
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['transactions', 'reports'])
  const isMobile = useIsMobile()

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

  const handleSubTabClick = (mainTab: string, subTab: string) => {
    setActiveMainTab(mainTab)
    setActiveSubTab(subTab)
  }

  const chartOfAccounts = [
    { 
      id: 'COA001', 
      code: '1000', 
      name: 'Assets', 
      type: 'Asset', 
      parent: null, 
      level: 0,
      balance: 125000,
      children: [
        { id: 'COA002', code: '1100', name: 'Current Assets', type: 'Asset', parent: 'COA001', level: 1, balance: 75000 },
        { id: 'COA003', code: '1200', name: 'Fixed Assets', type: 'Asset', parent: 'COA001', level: 1, balance: 50000 }
      ]
    },
    { 
      id: 'COA004', 
      code: '2000', 
      name: 'Liabilities', 
      type: 'Liability', 
      parent: null, 
      level: 0,
      balance: 45000,
      children: [
        { id: 'COA005', code: '2100', name: 'Current Liabilities', type: 'Liability', parent: 'COA004', level: 1, balance: 25000 },
        { id: 'COA006', code: '2200', name: 'Long-term Liabilities', type: 'Liability', parent: 'COA004', level: 1, balance: 20000 }
      ]
    },
    { 
      id: 'COA007', 
      code: '3000', 
      name: 'Equity', 
      type: 'Equity', 
      parent: null, 
      level: 0,
      balance: 80000,
      children: [
        { id: 'COA008', code: '3100', name: 'Share Capital', type: 'Equity', parent: 'COA007', level: 1, balance: 50000 },
        { id: 'COA009', code: '3200', name: 'Retained Earnings', type: 'Equity', parent: 'COA007', level: 1, balance: 30000 }
      ]
    },
    { 
      id: 'COA010', 
      code: '4000', 
      name: 'Revenue', 
      type: 'Revenue', 
      parent: null, 
      level: 0,
      balance: 180000,
      children: [
        { id: 'COA011', code: '4100', name: 'Sales Revenue', type: 'Revenue', parent: 'COA010', level: 1, balance: 150000 },
        { id: 'COA012', code: '4200', name: 'Other Income', type: 'Revenue', parent: 'COA010', level: 1, balance: 30000 }
      ]
    },
    { 
      id: 'COA013', 
      code: '5000', 
      name: 'Expenses', 
      type: 'Expense', 
      parent: null, 
      level: 0,
      balance: 95000,
      children: [
        { id: 'COA014', code: '5100', name: 'Cost of Sales', type: 'Expense', parent: 'COA013', level: 1, balance: 60000 },
        { id: 'COA015', code: '5200', name: 'Operating Expenses', type: 'Expense', parent: 'COA013', level: 1, balance: 35000 }
      ]
    }
  ]

  const journalEntries = [
    { id: 'JE001', date: '2024-01-15', description: 'Office supplies purchase', debit: 250, credit: 0, account: 'Office Expenses' },
    { id: 'JE002', date: '2024-01-16', description: 'Client payment received', debit: 0, credit: 1500, account: 'Accounts Receivable' },
    { id: 'JE003', date: '2024-01-17', description: 'Rent payment', debit: 800, credit: 0, account: 'Rent Expense' }
  ]

  const inventoryItems = [
    { id: 'INV001', name: 'Product A', quantity: 150, unitCost: 25.50, totalValue: 3825, category: 'Electronics' },
    { id: 'INV002', name: 'Product B', quantity: 75, unitCost: 45.00, totalValue: 3375, category: 'Accessories' },
    { id: 'INV003', name: 'Product C', quantity: 200, unitCost: 12.75, totalValue: 2550, category: 'Supplies' }
  ]

  const fixedAssets = [
    { id: 'FA001', name: 'Office Equipment', purchaseDate: '2023-01-15', cost: 15000, depreciation: 1500, netValue: 13500, category: 'Equipment' },
    { id: 'FA002', name: 'Company Vehicle', purchaseDate: '2023-06-01', cost: 25000, depreciation: 2500, netValue: 22500, category: 'Vehicles' },
    { id: 'FA003', name: 'Computer Systems', purchaseDate: '2023-03-10', cost: 8000, depreciation: 1200, netValue: 6800, category: 'IT Equipment' }
  ]

  const financialReports = [
    { id: 'RPT001', name: 'Profit & Loss', type: 'Financial', lastGenerated: '2024-01-15', status: 'Current' },
    { id: 'RPT002', name: 'Balance Sheet', type: 'Financial', lastGenerated: '2024-01-15', status: 'Current' },
    { id: 'RPT003', name: 'Cash Flow Statement', type: 'Financial', lastGenerated: '2024-01-14', status: 'Current' },
    { id: 'RPT004', name: 'Comparative P&L', type: 'Financial', lastGenerated: '2024-01-13', status: 'Current' },
    { id: 'RPT005', name: 'Budget Report', type: 'Management', lastGenerated: '2024-01-12', status: 'Current' },
    { id: 'RPT006', name: 'Day Books', type: 'Management', lastGenerated: '2024-01-15', status: 'Current' },
    { id: 'RPT007', name: 'Recent Transactions', type: 'Management', lastGenerated: '2024-01-15', status: 'Current' },
    { id: 'RPT008', name: 'Account Details', type: 'Management', lastGenerated: '2024-01-14', status: 'Current' },
    { id: 'RPT009', name: 'Nominal Ledger', type: 'Management', lastGenerated: '2024-01-14', status: 'Current' },
    { id: 'RPT010', name: 'Cash and Bank Report', type: 'Management', lastGenerated: '2024-01-15', status: 'Current' },
    { id: 'RPT011', name: 'Aged Debtors', type: 'Management', lastGenerated: '2024-01-15', status: 'Current' },
    { id: 'RPT012', name: 'Aged Creditors', type: 'Management', lastGenerated: '2024-01-15', status: 'Current' }
  ]

  const integrationProviders = [
    { id: 'INT001', name: 'Xero', status: 'Connected', lastSync: '2024-01-15 10:30', accounts: 45 },
    { id: 'INT002', name: 'QuickBooks Online', status: 'Available', lastSync: null, accounts: 0 },
    { id: 'INT003', name: 'Sage Business Cloud', status: 'Available', lastSync: null, accounts: 0 },
    { id: 'INT004', name: 'FreeAgent', status: 'Available', lastSync: null, accounts: 0 },
    { id: 'INT005', name: 'Zoho Books', status: 'Available', lastSync: null, accounts: 0 },
    { id: 'INT006', name: 'FreshBooks', status: 'Available', lastSync: null, accounts: 0 }
  ]

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current': return 'bg-green-100 text-green-800'
      case 'Connected': return 'bg-green-100 text-green-800'
      case 'Available': return 'bg-blue-100 text-blue-800'
      case 'Overdue': return 'bg-red-100 text-red-800'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bookkeeping</h1>
            <p className="text-gray-600">Comprehensive bookkeeping and financial management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size={isMobile ? "sm" : "default"}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size={isMobile ? "sm" : "default"}>
              <Link className="h-4 w-4 mr-2" />
              Connect Bank
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* 2-Level Navigation Sidebar */}
          <div className={`${isMobile ? 'w-full' : 'w-80'} bg-white rounded-lg shadow-sm border p-4`}>
            <div className="space-y-2">
              {Object.entries(menuStructure).map(([key, config]) => {
                const Icon = config.icon
                const isActive = activeMainTab === key
                const isExpanded = expandedCategories.includes(key)
                
                return (
                  <div key={key}>
                    <button
                      onClick={() => handleMainTabClick(key)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        isActive 
                          ? 'bg-brisk-primary text-white' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{config.label}</span>
                      </div>
                      {config.hasSubTabs && (
                        isExpanded ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    
                    {config.hasSubTabs && isExpanded && config.subTabs && (
                      <div className="ml-8 mt-2 space-y-1">
                        {Object.entries(config.subTabs).map(([subKey, subConfig]) => {
                          const SubIcon = subConfig.icon
                          const isSubActive = activeMainTab === key && activeSubTab === subKey
                          
                          return (
                            <button
                              key={subKey}
                              onClick={() => handleSubTabClick(key, subKey)}
                              className={`w-full flex items-center gap-3 p-2 rounded-md text-left transition-colors ${
                                isSubActive 
                                  ? 'bg-brisk-primary/10 text-brisk-primary border-l-2 border-brisk-primary' 
                                  : 'hover:bg-gray-50 text-gray-600'
                              }`}
                            >
                              <SubIcon className="h-4 w-4" />
                              <span className="text-sm">{subConfig.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  )

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
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-gray-600">Overview of your bookkeeping activities</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
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

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {journalEntries.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{entry.description}</p>
                      <p className="text-sm text-gray-600">{entry.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {entry.debit > 0 ? `£${entry.debit.toLocaleString()}` : `£${entry.credit.toLocaleString()}`}
                      </p>
                      <p className="text-xs text-gray-500">{entry.account}</p>
                    </div>
                  </div>
                ))}
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
            <CardDescription>Latest purchase bills and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">BILL-001</p>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
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
                    <p className="text-xs text-gray-500">Last sync: 2 mins ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">£45,230</p>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
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
            <p className="text-gray-600">Manual journal entries, adjustments, and audit trails</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Journal Entries</CardTitle>
            <CardDescription>Latest manual journal entries and adjustments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{entry.id}</p>
                      <Badge className="bg-blue-100 text-blue-800">Posted</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{entry.description}</p>
                    <p className="text-xs text-gray-500">{entry.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {entry.debit > 0 ? `£${entry.debit.toLocaleString()}` : `£${entry.credit.toLocaleString()}`}
                    </p>
                    <p className="text-xs text-gray-500">{entry.account}</p>
                  </div>
                </div>
              ))}
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
            <p className="text-gray-600">VAT submissions and MTD compliance</p>
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
            <CardTitle>VAT Returns</CardTitle>
            <CardDescription>Quarterly VAT return submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Q4 2023</p>
                    <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Due: 2024-02-07</p>
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>Sales VAT: £12,450</span>
                    <span>Purchase VAT: £3,200</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">£9,250</p>
                  <p className="text-xs text-gray-500">Net VAT Due</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderAccountsContent() {
    if (activeSubTab === 'chartofaccounts') {
      return renderChartOfAccountsContent()
    } else if (activeSubTab === 'inventory') {
      return renderInventoryContent()
    } else if (activeSubTab === 'fixedassets') {
      return renderFixedAssetsContent()
    }
    return renderChartOfAccountsContent()
  }

  function renderChartOfAccountsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Chart of Accounts</h2>
            <p className="text-gray-600">Hierarchical account structure and management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Accounts
            </CardTitle>
            <CardDescription>Find accounts by code, name, or type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search accounts..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Account Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Types</option>
                  <option value="Asset">Assets</option>
                  <option value="Liability">Liabilities</option>
                  <option value="Equity">Equity</option>
                  <option value="Revenue">Revenue</option>
                  <option value="Expense">Expenses</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Account Hierarchy
            </CardTitle>
            <CardDescription>Organized account structure with balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {chartOfAccounts.map((account) => (
                <div key={account.id}>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Folder className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{account.code}</span>
                          <span className="font-medium">{account.name}</span>
                        </div>
                        <p className="text-xs text-gray-500">{account.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">£{account.balance?.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Balance</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {account.children && (
                    <div className="ml-8 mt-2 space-y-2">
                      {account.children.map((child) => (
                        <div key={child.id} className="flex items-center justify-between p-2 border-l-2 border-gray-200 pl-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs bg-gray-50 px-2 py-1 rounded">{child.code}</span>
                            <span className="text-sm">{child.name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">£{child.balance?.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-2">
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
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderInventoryContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Inventory Management</h2>
            <p className="text-gray-600">Stock levels, valuations, and inventory tracking</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>Current stock levels and valuations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Package className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">£{item.totalValue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">£{item.unitCost} per unit</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderFixedAssetsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Fixed Assets Register</h2>
            <p className="text-gray-600">Asset tracking, depreciation, and valuations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fixed Assets</CardTitle>
            <CardDescription>Asset register with depreciation tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fixedAssets.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Building className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      <p className="text-sm text-gray-600">{asset.category}</p>
                      <p className="text-xs text-gray-500">Purchased: {asset.purchaseDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">£{asset.netValue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Cost: £{asset.cost.toLocaleString()}</p>
                    <p className="text-xs text-red-500">Depreciation: £{asset.depreciation.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderReportsContent() {
    if (activeSubTab === 'financial') {
      return renderFinancialReportsContent()
    } else if (activeSubTab === 'management') {
      return renderManagementReportsContent()
    } else if (activeSubTab === 'analytics') {
      return renderAnalyticsContent()
    }
    return renderFinancialReportsContent()
  }

  function renderFinancialReportsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Financial Reports</h2>
            <p className="text-gray-600">Standard financial statements and reports</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Report Settings
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Custom Report
            </Button>
          </div>
        </div>

        {/* Advanced Search & Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Reports
            </CardTitle>
            <CardDescription>Find reports quickly with advanced search and filtering options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Reports</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by name, type, or content..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Types</option>
                  <option value="financial">Financial Statements</option>
                  <option value="management">Management Reports</option>
                  <option value="analytics">Analytics & KPIs</option>
                  <option value="custom">Custom Reports</option>
                  <option value="scheduled">Scheduled Reports</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Periods</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option value="generated">Generated</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
              <Button variant="ghost" size="sm">
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Financial Reports Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-brisk-primary" />
              Standard Financial Reports
            </CardTitle>
            <CardDescription>Core financial statements and reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
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
              
              <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
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
              
              <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
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

              <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <LineChart className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Comparative Reports</h3>
                  <p className="text-sm text-gray-600 mb-3">Period-over-period comparisons</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline">Generate</Button>
                    <Button size="sm">Schedule</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Calculator className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Budget Report</h3>
                  <p className="text-sm text-gray-600 mb-3">Budget vs actual analysis</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline">Generate</Button>
                    <Button size="sm">Schedule</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Day Books</h3>
                  <p className="text-sm text-gray-600 mb-3">Daily transaction summaries</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline">Generate</Button>
                    <Button size="sm">Schedule</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderManagementReportsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Management Reports</h2>
            <p className="text-gray-600">Detailed operational and management reports</p>
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

        {/* Management Reports Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-brisk-primary" />
              Management & Operational Reports
            </CardTitle>
            <CardDescription>Detailed reports for business management and analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Recent Transactions</h3>
                  <p className="text-sm text-gray-600 mb-3">Latest transaction activity</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm">Export</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <FileSearch className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Account Details</h3>
                  <p className="text-sm text-gray-600 mb-3">Detailed account breakdowns</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm">Export</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Database className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Nominal Ledger</h3>
                  <p className="text-sm text-gray-600 mb-3">Complete ledger with all accounts</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm">Export</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Cash and Bank Report</h3>
                  <p className="text-sm text-gray-600 mb-3">Cash flow and bank reconciliation</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm">Export</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Aged Debtors</h3>
                  <p className="text-sm text-gray-600 mb-3">Outstanding customer balances</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm">Export</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <TrendingDown className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Aged Creditors</h3>
                  <p className="text-sm text-gray-600 mb-3">Outstanding supplier balances</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm">Export</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Recently generated management reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialReports.filter(report => report.type === 'Management').map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{report.name}</p>
                      <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Last generated: {report.lastGenerated}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-4 w-4" />
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

  function renderAnalyticsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            <p className="text-gray-600">Advanced analytics and business intelligence</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-brisk-primary" />
              Interactive Analytics
            </CardTitle>
            <CardDescription>Visual analytics and trend analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Revenue Trends</h3>
                <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Interactive chart placeholder</p>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Expense Analysis</h3>
                <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Interactive chart placeholder</p>
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
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
          </div>
        </div>

        {/* CSV Import Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-brisk-primary" />
              Trial Balance CSV Import
            </CardTitle>
            <CardDescription>Import trial balance data from CSV files with automatic mapping</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Trial Balance CSV</h3>
              <p className="text-gray-600 mb-4">Drag and drop your CSV file here, or click to browse</p>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
              <p className="text-xs text-gray-500 mt-2">Supports CSV files up to 10MB</p>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">CSV Format Requirements:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Account Code, Account Name, Debit, Credit columns required</li>
                <li>• First row should contain column headers</li>
                <li>• Amounts should be numeric (no currency symbols)</li>
                <li>• UTF-8 encoding recommended</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Integration Providers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-brisk-primary" />
              Bookkeeping Software Integrations
            </CardTitle>
            <CardDescription>Connect with popular bookkeeping platforms for seamless data sync</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {integrationProviders.map((provider) => (
                <Card key={provider.id} className="border-2 border-gray-200 hover:border-brisk-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{provider.name}</h3>
                      <Badge className={getStatusColor(provider.status)}>{provider.status}</Badge>
                    </div>
                    {provider.status === 'Connected' ? (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Last sync: {provider.lastSync}</p>
                        <p className="text-sm text-gray-600">Accounts: {provider.accounts}</p>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Sync Now
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Connect to sync trial balance and transaction data</p>
                        <Button size="sm" className="w-full">
                          <Link className="h-4 w-4 mr-2" />
                          Connect {provider.name}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sync History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sync Activity</CardTitle>
            <CardDescription>History of data imports and synchronizations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Xero Trial Balance Import</p>
                    <p className="text-sm text-gray-600">45 accounts imported successfully</p>
                    <p className="text-xs text-gray-500">2024-01-15 10:30 AM</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">CSV Trial Balance Upload</p>
                    <p className="text-sm text-gray-600">trial_balance_dec_2023.csv</p>
                    <p className="text-xs text-gray-500">2024-01-14 2:15 PM</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderProjectsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Project Management</h2>
            <p className="text-gray-600">Advanced project tracking and profitability analysis</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500">Project management content will be displayed here</p>
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
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500">Budget and forecasting content will be displayed here</p>
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
            <p className="text-gray-600">Rental property management and tracking</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500">Property management content will be displayed here</p>
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
            <p className="text-gray-600">Multi-platform eCommerce management</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500">eCommerce integration content will be displayed here</p>
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
            <p className="text-gray-600">OCR processing and document automation</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500">Document management content will be displayed here</p>
          </CardContent>
        </Card>
      </div>
    )
  }
}

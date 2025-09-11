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
  Search,
  Settings,
  Link,
  FileText,
  Calculator,
  PoundSterling,
  BarChart3,
  Building,
  Building2,
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
  Landmark,
  AlertTriangle,
  DollarSign,
  Globe,
  Zap,
  Archive,
  FileSpreadsheet
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
      case 'Draft': return 'bg-brisk-primary-50 text-brisk-primary'
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
                    <Badge className="bg-brisk-primary-50 text-brisk-primary">Pending</Badge>
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
                    <Badge className="bg-brisk-primary-50 text-brisk-primary">Draft</Badge>
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
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Project Reports
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Project Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£145,230</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">-2 from yesterday</p>
            </CardContent>
          </Card>
        </div>

        {/* Project List */}
        <Card>
          <CardHeader>
            <CardTitle>Current Projects</CardTitle>
            <CardDescription>Track progress and profitability across all active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'ABC Ltd - Year End Accounts', client: 'ABC Ltd', progress: 75, budget: 15000, actual: 11250, status: 'On Track' },
                { name: 'XYZ Corp - Tax Planning', client: 'XYZ Corp', progress: 45, budget: 8000, actual: 3600, status: 'On Track' },
                { name: 'Smith & Co - Payroll Setup', client: 'Smith & Co', progress: 90, budget: 5000, actual: 4800, status: 'Nearly Complete' },
                { name: 'Johnson Ltd - VAT Returns', client: 'Johnson Ltd', progress: 30, budget: 3000, actual: 1200, status: 'Behind Schedule' }
              ].map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{project.name}</h4>
                    <p className="text-sm text-gray-600">{project.client}</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-brisk-primary h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm">
                      <span className="font-medium">£{project.actual.toLocaleString()}</span>
                      <span className="text-gray-500"> / £{project.budget.toLocaleString()}</span>
                    </div>
                    <Badge variant={project.status === 'On Track' ? 'default' : project.status === 'Nearly Complete' ? 'secondary' : 'destructive'}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gantt Chart View */}
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
            <CardDescription>Gantt chart view of project schedules and dependencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-2 text-xs text-gray-500 border-b pb-2">
                <div className="col-span-3">Project</div>
                <div className="col-span-9 grid grid-cols-12 gap-1">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                    <div key={month} className="text-center">{month}</div>
                  ))}
                </div>
              </div>
              {[
                { name: 'ABC Ltd - Year End', start: 2, duration: 4 },
                { name: 'XYZ Corp - Tax Planning', start: 1, duration: 6 },
                { name: 'Smith & Co - Payroll', start: 3, duration: 2 },
                { name: 'Johnson Ltd - VAT', start: 4, duration: 3 }
              ].map((project, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-3 text-sm font-medium">{project.name}</div>
                  <div className="col-span-9 grid grid-cols-12 gap-1">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div 
                        key={i} 
                        className={`h-6 rounded ${
                          i >= project.start && i < project.start + project.duration 
                            ? 'bg-brisk-primary' 
                            : 'bg-gray-100'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
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
              <Download className="h-4 w-4 mr-2" />
              Export Budget
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Budget
            </Button>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£250,000</div>
              <p className="text-xs text-muted-foreground">Annual budget 2024</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actual Spend</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£187,500</div>
              <p className="text-xs text-muted-foreground">75% of budget used</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Variance</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">-£12,500</div>
              <p className="text-xs text-muted-foreground">5% under budget</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Forecast</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£235,000</div>
              <p className="text-xs text-muted-foreground">Year-end projection</p>
            </CardContent>
          </Card>
        </div>

        {/* Budget vs Actual Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Budget vs Actual Analysis</CardTitle>
            <CardDescription>Compare budgeted amounts with actual spending across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: 'Revenue', budget: 300000, actual: 285000, variance: -15000, percentage: 95 },
                { category: 'Cost of Sales', budget: 120000, actual: 114000, variance: -6000, percentage: 95 },
                { category: 'Operating Expenses', budget: 80000, actual: 73500, variance: -6500, percentage: 92 },
                { category: 'Marketing', budget: 25000, actual: 28000, variance: 3000, percentage: 112 },
                { category: 'Staff Costs', budget: 150000, actual: 155000, variance: 5000, percentage: 103 }
              ].map((item, index) => (
                <div key={index} className="grid grid-cols-6 gap-4 items-center p-4 border rounded-lg">
                  <div className="font-medium">{item.category}</div>
                  <div className="text-right">£{item.budget.toLocaleString()}</div>
                  <div className="text-right">£{item.actual.toLocaleString()}</div>
                  <div className={`text-right font-medium ${item.variance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                    £{Math.abs(item.variance).toLocaleString()}
                  </div>
                  <div className="text-right">{item.percentage}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.percentage <= 100 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(item.percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cash Flow Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>Cash Flow Forecast</CardTitle>
            <CardDescription>12-month rolling cash flow projection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-13 gap-2 text-xs text-gray-500 border-b pb-2">
                <div>Category</div>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                  <div key={month} className="text-center">{month}</div>
                ))}
              </div>
              {[
                { category: 'Opening Balance', values: [50000, 55000, 52000, 58000, 62000, 65000, 68000, 70000, 72000, 75000, 78000, 80000] },
                { category: 'Cash Inflows', values: [25000, 22000, 28000, 26000, 30000, 28000, 32000, 30000, 28000, 26000, 24000, 22000] },
                { category: 'Cash Outflows', values: [-20000, -25000, -22000, -22000, -27000, -25000, -30000, -28000, -25000, -23000, -22000, -20000] },
                { category: 'Closing Balance', values: [55000, 52000, 58000, 62000, 65000, 68000, 70000, 72000, 75000, 78000, 80000, 82000] }
              ].map((row, index) => (
                <div key={index} className={`grid grid-cols-13 gap-2 items-center text-sm ${index === 3 ? 'font-bold border-t pt-2' : ''}`}>
                  <div className="font-medium">{row.category}</div>
                  {row.values.map((value, i) => (
                    <div key={i} className={`text-right ${value < 0 ? 'text-red-600' : value > 50000 ? 'text-green-600' : ''}`}>
                      £{Math.abs(value).toLocaleString()}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scenario Planning */}
        <Card>
          <CardHeader>
            <CardTitle>Scenario Planning</CardTitle>
            <CardDescription>What-if analysis for different business scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Best Case</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Revenue Growth:</span>
                      <span className="font-medium">+15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost Reduction:</span>
                      <span className="font-medium">-5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Net Profit:</span>
                      <span className="font-medium text-green-600">£95,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600">Most Likely</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Revenue Growth:</span>
                      <span className="font-medium">+8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost Increase:</span>
                      <span className="font-medium">+3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Net Profit:</span>
                      <span className="font-medium text-blue-600">£75,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Worst Case</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Revenue Decline:</span>
                      <span className="font-medium">-10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost Increase:</span>
                      <span className="font-medium">+8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Net Profit:</span>
                      <span className="font-medium text-red-600">£45,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
            <p className="text-gray-600">Rental property management and tracking</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Property Reports
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        </div>

        {/* Property Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 this quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Rental Income</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£18,500</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">11 of 12 occupied</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance Costs</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£2,340</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Property List */}
        <Card>
          <CardHeader>
            <CardTitle>Property Portfolio</CardTitle>
            <CardDescription>Overview of all rental properties and their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { address: '123 Oak Street, London', tenant: 'John Smith', rent: 1800, status: 'Occupied', lease_end: '2024-12-31', yield: 5.2 },
                { address: '456 Pine Avenue, Manchester', tenant: 'Sarah Johnson', rent: 1200, status: 'Occupied', lease_end: '2024-08-15', yield: 6.1 },
                { address: '789 Elm Road, Birmingham', tenant: 'Vacant', rent: 1500, status: 'Vacant', lease_end: null, yield: 0 },
                { address: '321 Maple Close, Leeds', tenant: 'Mike Wilson', rent: 1100, status: 'Occupied', lease_end: '2025-03-20', yield: 5.8 }
              ].map((property, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{property.address}</h4>
                    <p className="text-sm text-gray-600">
                      {property.status === 'Occupied' ? `Tenant: ${property.tenant}` : 'Available for rent'}
                    </p>
                    {property.lease_end && (
                      <p className="text-xs text-gray-500">Lease ends: {property.lease_end}</p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-semibold">£{property.rent}/month</div>
                    <div className="text-sm text-gray-600">Yield: {property.yield}%</div>
                    <Badge variant={property.status === 'Occupied' ? 'default' : 'secondary'}>
                      {property.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tenant Management */}
        <Card>
          <CardHeader>
            <CardTitle>Tenant Management</CardTitle>
            <CardDescription>Track tenant information, lease agreements, and payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Recent Payments</h4>
                <div className="space-y-2">
                  {[
                    { tenant: 'John Smith', amount: 1800, date: '2024-01-01', status: 'Paid' },
                    { tenant: 'Sarah Johnson', amount: 1200, date: '2024-01-01', status: 'Paid' },
                    { tenant: 'Mike Wilson', amount: 1100, date: '2024-01-01', status: 'Pending' }
                  ].map((payment, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium">{payment.tenant}</div>
                        <div className="text-sm text-gray-600">{payment.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">£{payment.amount}</div>
                        <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'}>
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Upcoming Lease Renewals</h4>
                <div className="space-y-2">
                  {[
                    { tenant: 'Sarah Johnson', property: '456 Pine Avenue', date: '2024-08-15', action: 'Review Required' },
                    { tenant: 'Mike Wilson', property: '321 Maple Close', date: '2025-03-20', action: 'Renewal Notice' }
                  ].map((renewal, index) => (
                    <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="font-medium">{renewal.tenant}</div>
                      <div className="text-sm text-gray-600">{renewal.property}</div>
                      <div className="text-sm">Expires: {renewal.date}</div>
                      <Badge variant="outline" className="mt-1">
                        {renewal.action}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Performance Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Property Performance</CardTitle>
            <CardDescription>Financial performance and ROI analysis by property</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
                <div>Property</div>
                <div className="text-right">Monthly Rent</div>
                <div className="text-right">Annual Income</div>
                <div className="text-right">Expenses</div>
                <div className="text-right">Net Income</div>
                <div className="text-right">ROI</div>
                <div className="text-right">Yield</div>
              </div>
              {[
                { property: '123 Oak Street', rent: 1800, expenses: 3200, value: 350000 },
                { property: '456 Pine Avenue', rent: 1200, expenses: 2100, value: 200000 },
                { property: '789 Elm Road', rent: 1500, expenses: 2800, value: 280000 },
                { property: '321 Maple Close', rent: 1100, expenses: 1900, value: 180000 }
              ].map((property, index) => {
                const annualIncome = property.rent * 12;
                const netIncome = annualIncome - property.expenses;
                const roi = ((netIncome / property.value) * 100).toFixed(1);
                const yield_rate = ((annualIncome / property.value) * 100).toFixed(1);
                
                return (
                  <div key={index} className="grid grid-cols-7 gap-4 text-sm items-center py-2">
                    <div className="font-medium">{property.property}</div>
                    <div className="text-right">£{property.rent}</div>
                    <div className="text-right">£{annualIncome.toLocaleString()}</div>
                    <div className="text-right">£{property.expenses.toLocaleString()}</div>
                    <div className="text-right font-medium">£{netIncome.toLocaleString()}</div>
                    <div className={`text-right font-medium ${parseFloat(roi) > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                      {roi}%
                    </div>
                    <div className="text-right">{yield_rate}%</div>
                  </div>
                );
              })}
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
            <p className="text-gray-600">Multi-platform eCommerce management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All Platforms
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Connect Platform
            </Button>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connected Platforms</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Amazon, eBay, Shopify, Etsy, WooCommerce</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£45,230</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£3,420</div>
              <p className="text-xs text-muted-foreground">7.6% of sales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Settlement</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£41,810</div>
              <p className="text-xs text-muted-foreground">After fees and returns</p>
            </CardContent>
          </Card>
        </div>

        {/* Platform Connections */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Connections</CardTitle>
            <CardDescription>Manage your eCommerce platform integrations and sync status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { platform: 'Amazon', status: 'Connected', lastSync: '2 hours ago', sales: 18500, fees: 1850, orders: 145 },
                { platform: 'eBay', status: 'Connected', lastSync: '1 hour ago', sales: 12300, fees: 1230, orders: 89 },
                { platform: 'Shopify', status: 'Connected', lastSync: '30 minutes ago', sales: 8900, fees: 267, orders: 67 },
                { platform: 'Etsy', status: 'Connected', lastSync: '45 minutes ago', sales: 3200, fees: 160, orders: 34 },
                { platform: 'WooCommerce', status: 'Error', lastSync: '2 days ago', sales: 2330, fees: 70, orders: 23 }
              ].map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Globe className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{platform.platform}</h4>
                      <p className="text-sm text-gray-600">Last sync: {platform.lastSync}</p>
                      <Badge variant={platform.status === 'Connected' ? 'default' : 'destructive'}>
                        {platform.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">£{platform.sales.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{platform.orders} orders</div>
                    <div className="text-sm text-red-600">-£{platform.fees} fees</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
            <CardDescription>Performance breakdown by platform and product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Sales by Platform</h4>
                <div className="space-y-3">
                  {[
                    { platform: 'Amazon', percentage: 41, amount: 18500, color: 'bg-orange-500' },
                    { platform: 'eBay', percentage: 27, amount: 12300, color: 'bg-blue-500' },
                    { platform: 'Shopify', percentage: 20, amount: 8900, color: 'bg-green-500' },
                    { platform: 'Etsy', percentage: 7, amount: 3200, color: 'bg-purple-500' },
                    { platform: 'WooCommerce', percentage: 5, amount: 2330, color: 'bg-gray-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${item.color}`}></div>
                        <span className="font-medium">{item.platform}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">£{item.amount.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Top Products</h4>
                <div className="space-y-3">
                  {[
                    { product: 'Wireless Headphones', sales: 8500, units: 85, platform: 'Amazon' },
                    { product: 'Phone Case Set', sales: 6200, units: 124, platform: 'eBay' },
                    { product: 'Laptop Stand', sales: 4800, units: 48, platform: 'Shopify' },
                    { product: 'Desk Organizer', sales: 3100, units: 62, platform: 'Etsy' },
                    { product: 'USB Cable Pack', sales: 2400, units: 96, platform: 'Amazon' }
                  ].map((product, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium">{product.product}</div>
                        <div className="text-sm text-gray-600">{product.platform} • {product.units} units</div>
                      </div>
                      <div className="font-semibold">£{product.sales.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fee Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Analysis</CardTitle>
            <CardDescription>Breakdown of platform fees and profit margins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
                <div>Platform</div>
                <div className="text-right">Gross Sales</div>
                <div className="text-right">Platform Fees</div>
                <div className="text-right">Payment Fees</div>
                <div className="text-right">Total Fees</div>
                <div className="text-right">Net Revenue</div>
              </div>
              {[
                { platform: 'Amazon', gross: 18500, platformFee: 1480, paymentFee: 370, total: 1850 },
                { platform: 'eBay', gross: 12300, platformFee: 984, paymentFee: 246, total: 1230 },
                { platform: 'Shopify', gross: 8900, platformFee: 178, paymentFee: 89, total: 267 },
                { platform: 'Etsy', gross: 3200, platformFee: 128, paymentFee: 32, total: 160 },
                { platform: 'WooCommerce', gross: 2330, platformFee: 47, paymentFee: 23, total: 70 }
              ].map((row, index) => {
                const netRevenue = row.gross - row.total;
                const feePercentage = ((row.total / row.gross) * 100).toFixed(1);
                
                return (
                  <div key={index} className="grid grid-cols-6 gap-4 text-sm items-center py-2">
                    <div className="font-medium">{row.platform}</div>
                    <div className="text-right">£{row.gross.toLocaleString()}</div>
                    <div className="text-right">£{row.platformFee.toLocaleString()}</div>
                    <div className="text-right">£{row.paymentFee.toLocaleString()}</div>
                    <div className="text-right font-medium text-red-600">
                      £{row.total.toLocaleString()} ({feePercentage}%)
                    </div>
                    <div className="text-right font-medium text-green-600">
                      £{netRevenue.toLocaleString()}
                    </div>
                  </div>
                );
              })}
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
            <p className="text-gray-600">OCR processing and document automation</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Search Documents
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
          </div>
        </div>

        {/* Document Processing Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+89 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processed Today</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">OCR completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Eye className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Requires approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Auto-Posted</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground">Automatically processed</p>
            </CardContent>
          </Card>
        </div>

        {/* Document Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>Drag and drop files or click to browse. Supports PDF, JPG, PNG formats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brisk-primary transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Drop files here to upload</h3>
              <p className="text-gray-600 mb-4">or click to browse from your computer</p>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h4 className="font-semibold">Invoices</h4>
                <p className="text-sm text-gray-600">Auto-extract vendor, amount, date</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Receipt className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold">Receipts</h4>
                <p className="text-sm text-gray-600">Categorize expenses automatically</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <FileSpreadsheet className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h4 className="font-semibold">Bank Statements</h4>
                <p className="text-sm text-gray-600">Import transactions directly</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Latest uploaded and processed documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Invoice_ABC_Ltd_001.pdf', type: 'Invoice', amount: 1250.00, date: '2024-01-15', status: 'Processed', confidence: 98 },
                { name: 'Receipt_Office_Supplies.jpg', type: 'Receipt', amount: 45.99, date: '2024-01-14', status: 'Review Required', confidence: 85 },
                { name: 'Bank_Statement_Jan_2024.pdf', type: 'Bank Statement', amount: null, date: '2024-01-13', status: 'Processed', confidence: 100 },
                { name: 'Invoice_XYZ_Corp_045.pdf', type: 'Invoice', amount: 2800.00, date: '2024-01-12', status: 'Processed', confidence: 95 },
                { name: 'Expense_Receipt_Fuel.jpg', type: 'Receipt', amount: 78.50, date: '2024-01-11', status: 'Auto-Posted', confidence: 92 }
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{doc.name}</h4>
                      <p className="text-sm text-gray-600">{doc.type} • {doc.date}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={
                          doc.status === 'Processed' || doc.status === 'Auto-Posted' ? 'default' : 
                          doc.status === 'Review Required' ? 'secondary' : 'outline'
                        }>
                          {doc.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {doc.confidence}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {doc.amount && (
                      <div className="text-lg font-semibold">£{doc.amount.toFixed(2)}</div>
                    )}
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* OCR Processing Queue */}
        <Card>
          <CardHeader>
            <CardTitle>Processing Queue</CardTitle>
            <CardDescription>Documents currently being processed by OCR engine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Invoice_DEF_Ltd_078.pdf', progress: 85, stage: 'Extracting data fields' },
                { name: 'Receipt_Restaurant_Bill.jpg', progress: 60, stage: 'Text recognition' },
                { name: 'Statement_Credit_Card.pdf', progress: 30, stage: 'Document analysis' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.stage}</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-brisk-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <RefreshCw className="h-5 w-5 text-brisk-primary animate-spin" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Document Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Document Categories</CardTitle>
            <CardDescription>Organize and filter documents by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { category: 'Invoices', count: 342, icon: FileText, color: 'bg-blue-100 text-blue-600' },
                { category: 'Receipts', count: 189, icon: Receipt, color: 'bg-green-100 text-green-600' },
                { category: 'Bank Statements', count: 24, icon: FileSpreadsheet, color: 'bg-purple-100 text-purple-600' },
                { category: 'Contracts', count: 67, icon: FileText, color: 'bg-orange-100 text-orange-600' },
                { category: 'Tax Documents', count: 45, icon: Archive, color: 'bg-red-100 text-red-600' },
                { category: 'Other', count: 89, icon: FileText, color: 'bg-gray-100 text-gray-600' }
              ].map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <div key={index} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className={`w-12 h-12 rounded-lg ${cat.color} flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-semibold text-sm">{cat.category}</h4>
                    <p className="text-xs text-gray-600">{cat.count} documents</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

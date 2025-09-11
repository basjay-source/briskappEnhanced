import React, { useState } from 'react'
import { 
  Calculator, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Download,
  Upload,
  Brain,
  Eye,
  Search,
  BarChart3,
  Building2,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
  RefreshCw,
  Target,
  LineChart,
  Calendar,
  ArrowUpDown,
  Zap,
  BookOpen,
  Shield,
  Award,
  Lightbulb,
  Filter,
  FileSearch,
  Printer,
  Mail,
  Clock,
  Activity,
  DollarSign,
  Percent,
  Database,
  Archive,
  FileSpreadsheet
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function AccountsProduction() {
  const [activeTab, setActiveTab] = useState('trial-balance')
  const [filterText, setFilterText] = useState('')
  const [selectedAccountType, setSelectedAccountType] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('2024')
  const [showComparisons, setShowComparisons] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['assets', 'liabilities'])
  const [autoMappingEnabled] = useState(true)
  const [reportSearchTerm, setReportSearchTerm] = useState('')
  const [selectedYears, setSelectedYears] = useState<string[]>(['2024'])
  const [reportAccountType, setReportAccountType] = useState('full')
  const [reportFilters, setReportFilters] = useState({
    category: 'all',
    status: 'all',
    amount_min: '',
    amount_max: ''
  })

  const tabs = [
    { id: 'trial-balance', label: 'Trial Balance', icon: Calculator },
    { id: 'adjustments', label: 'Adjustments', icon: FileText },
    { id: 'statements', label: 'Financial Statements', icon: TrendingUp },
    { id: 'consolidation', label: 'Consolidation', icon: Building2 },
    { id: 'reports', label: 'Advanced Reports', icon: BarChart3 },
    { id: 'ixbrl', label: 'iXBRL & Filing', icon: Eye }
  ]

  const accountTypes = [
    { value: 'full', label: 'Full Accounts', description: 'Complete statutory accounts with all required disclosures' },
    { value: 'filleted', label: 'Filleted Accounts', description: 'Full detailed disclosure with all notes and supporting schedules' },
    { value: 'abbreviated', label: 'Abbreviated Accounts', description: 'Simplified format with reduced disclosure requirements' },
    { value: 'micro-entity', label: 'Micro-Entity Accounts', description: 'Minimal disclosure format for small companies' },
    { value: 'dormant', label: 'Dormant Accounts', description: 'Simplified format for inactive companies' }
  ]

  const availableYears = ['2024', '2023', '2022', '2021', '2020']

  const multiYearTrialBalance = [
    { account: '1000 - Fixed Assets', 2024: 125000, 2023: 110000, 2022: 95000, 2021: 85000, 2020: 75000 },
    { account: '1100 - Current Assets', 2024: 45000, 2023: 38000, 2022: 32000, 2021: 28000, 2020: 25000 },
    { account: '2000 - Current Liabilities', 2024: -25000, 2023: -22000, 2022: -18000, 2021: -15000, 2020: -12000 },
    { account: '2100 - Long Term Liabilities', 2024: -65000, 2023: -58000, 2022: -52000, 2021: -48000, 2020: -45000 },
    { account: '3000 - Share Capital', 2024: -50000, 2023: -50000, 2022: -40000, 2021: -35000, 2020: -30000 },
    { account: '4000 - Revenue', 2024: -180000, 2023: -152000, 2022: -135000, 2021: -118000, 2020: -105000 },
    { account: '5000 - Cost of Sales', 2024: 72000, 2023: 61000, 2022: 54000, 2021: 47000, 2020: 42000 },
    { account: '6000 - Operating Expenses', 2024: 78000, 2023: 73000, 2022: 64000, 2021: 56000, 2020: 50000 }
  ]

  const nominalLedgerData = [
    { date: '2024-01-15', account: '1000 - Fixed Assets', reference: 'JE001', description: 'Equipment Purchase', debit: 15000, credit: 0, balance: 125000 },
    { date: '2024-01-20', account: '4000 - Revenue', reference: 'INV001', description: 'Sales Invoice #001', debit: 0, credit: 5000, balance: -180000 },
    { date: '2024-02-01', account: '5000 - Cost of Sales', reference: 'PUR001', description: 'Inventory Purchase', debit: 3000, credit: 0, balance: 72000 },
    { date: '2024-02-15', account: '6000 - Operating Expenses', reference: 'EXP001', description: 'Office Rent', debit: 2500, credit: 0, balance: 78000 },
    { date: '2024-03-01', account: '1100 - Current Assets', reference: 'BNK001', description: 'Bank Transfer', debit: 8000, credit: 0, balance: 45000 },
    { date: '2024-03-10', account: '2000 - Current Liabilities', reference: 'AP001', description: 'Supplier Payment', debit: 0, credit: 1500, balance: -25000 }
  ]

  const managementAccountsData = {
    profitLoss: {
      revenue: { current: 180000, previous: 152000, variance: 18.4 },
      costOfSales: { current: 72000, previous: 61000, variance: 18.0 },
      grossProfit: { current: 108000, previous: 91000, variance: 18.7 },
      operatingExpenses: { current: 78000, previous: 73000, variance: 6.8 },
      netProfit: { current: 30000, previous: 18000, variance: 66.7 }
    },
    balanceSheet: {
      fixedAssets: { current: 125000, previous: 110000, variance: 13.6 },
      currentAssets: { current: 45000, previous: 38000, variance: 18.4 },
      currentLiabilities: { current: 25000, previous: 22000, variance: 13.6 },
      netAssets: { current: 145000, previous: 126000, variance: 15.1 }
    },
    ratios: {
      currentRatio: { current: 1.8, previous: 1.7, benchmark: 2.0 },
      quickRatio: { current: 1.2, previous: 1.1, benchmark: 1.0 },
      debtToEquity: { current: 0.62, previous: 0.63, benchmark: 0.5 },
      returnOnAssets: { current: 0.17, previous: 0.13, benchmark: 0.15 }
    }
  }

  const trialBalanceData = [
    { 
      code: '1000', 
      name: 'Bank Current Account', 
      debit: 15000, 
      credit: 0, 
      category: 'Current Assets',
      type: 'assets',
      mapped: true,
      confidence: 98,
      prior_year: 12500,
      variance: 2500,
      variance_pct: 20.0
    },
    { 
      code: '1200', 
      name: 'Trade Debtors', 
      debit: 8500, 
      credit: 0, 
      category: 'Current Assets',
      type: 'assets',
      mapped: true,
      confidence: 95,
      prior_year: 7200,
      variance: 1300,
      variance_pct: 18.1
    },
    { 
      code: '1500', 
      name: 'Fixed Assets - Equipment', 
      debit: 45000, 
      credit: 0, 
      category: 'Fixed Assets',
      type: 'assets',
      mapped: true,
      confidence: 100,
      prior_year: 48000,
      variance: -3000,
      variance_pct: -6.3
    },
    { 
      code: '2100', 
      name: 'Trade Creditors', 
      debit: 0, 
      credit: 4200, 
      category: 'Current Liabilities',
      type: 'liabilities',
      mapped: true,
      confidence: 92,
      prior_year: 3800,
      variance: 400,
      variance_pct: 10.5
    },
    { 
      code: '2500', 
      name: 'Long Term Loan', 
      debit: 0, 
      credit: 25000, 
      category: 'Long Term Liabilities',
      type: 'liabilities',
      mapped: true,
      confidence: 100,
      prior_year: 30000,
      variance: -5000,
      variance_pct: -16.7
    },
    { 
      code: '3000', 
      name: 'Share Capital', 
      debit: 0, 
      credit: 10000, 
      category: 'Equity',
      type: 'equity',
      mapped: true,
      confidence: 100,
      prior_year: 10000,
      variance: 0,
      variance_pct: 0
    },
    { 
      code: '4000', 
      name: 'Sales Revenue', 
      debit: 0, 
      credit: 45000, 
      category: 'Revenue',
      type: 'income',
      mapped: true,
      confidence: 98,
      prior_year: 38000,
      variance: 7000,
      variance_pct: 18.4
    },
    { 
      code: '5000', 
      name: 'Cost of Sales', 
      debit: 18000, 
      credit: 0, 
      category: 'Cost of Sales',
      type: 'expenses',
      mapped: true,
      confidence: 95,
      prior_year: 15200,
      variance: 2800,
      variance_pct: 18.4
    },
    { 
      code: '6000', 
      name: 'Office Expenses', 
      debit: 3200, 
      credit: 0, 
      category: 'Operating Expenses',
      type: 'expenses',
      mapped: false,
      confidence: 75,
      prior_year: 2200,
      variance: 1000,
      variance_pct: 45.5
    },
    { 
      code: '6100', 
      name: 'Professional Fees', 
      debit: 2800, 
      credit: 0, 
      category: 'Operating Expenses',
      type: 'expenses',
      mapped: true,
      confidence: 90,
      prior_year: 2500,
      variance: 300,
      variance_pct: 12.0
    }
  ]

  const kpis = [
    { label: 'Total Assets', value: '£125,400', change: '+8.2%', color: 'text-green-600', trend: 'up' },
    { label: 'Total Liabilities', value: '£45,200', change: '-2.1%', color: 'text-red-600', trend: 'down' },
    { label: 'Net Profit', value: '£23,800', change: '+15.3%', color: 'text-green-600', trend: 'up' },
    { label: 'Current Ratio', value: '2.8', change: '+0.3', color: 'text-blue-600', trend: 'up' },
    { label: 'Gross Margin', value: '60.0%', change: '+2.1%', color: 'text-green-600', trend: 'up' },
    { label: 'Working Capital', value: '£19,300', change: '+12.5%', color: 'text-green-600', trend: 'up' }
  ]

  const aiInsights = [
    {
      type: 'warning',
      title: 'Unusual Expense Pattern',
      description: 'Office expenses increased 45% vs last period. Review for accuracy and potential misclassification.',
      confidence: 92,
      priority: 'high',
      action: 'Review expense coding and supporting documentation',
      impact: 'Material misstatement risk'
    },
    {
      type: 'info',
      title: 'Disclosure Requirement',
      description: 'Related party transactions require disclosure under FRS 102 Section 33.',
      confidence: 98,
      priority: 'medium',
      action: 'Prepare related party disclosure note',
      impact: 'Compliance requirement'
    },
    {
      type: 'success',
      title: 'Strong Liquidity Position',
      description: 'Current ratio of 2.8 indicates excellent short-term liquidity and working capital management.',
      confidence: 95,
      priority: 'low',
      action: 'Consider investment opportunities for excess cash',
      impact: 'Optimization opportunity'
    },
    {
      type: 'warning',
      title: 'Depreciation Policy Review',
      description: 'Fixed asset depreciation rates may need review based on current usage patterns.',
      confidence: 88,
      priority: 'medium',
      action: 'Conduct asset utilization review',
      impact: 'Accounting policy compliance'
    },
    {
      type: 'info',
      title: 'Revenue Recognition',
      description: 'Ensure revenue recognition aligns with FRS 102 Section 23 requirements.',
      confidence: 94,
      priority: 'medium',
      action: 'Review revenue recognition policies',
      impact: 'Financial reporting accuracy'
    }
  ]

  const entityGroups = [
    {
      id: 'group-1',
      name: 'ABC Holdings Group',
      parent_company: 'ABC Holdings Ltd',
      subsidiaries: ['ABC Trading Ltd', 'ABC Services Ltd', 'ABC Property Ltd'],
      consolidation_method: 'full',
      elimination_rules: 3,
      currency: 'GBP'
    }
  ]

  const consolidationRules = [
    {
      id: 'rule-1',
      type: 'Intercompany Sales',
      source_account: '4000',
      target_account: '5000',
      elimination_percentage: 100,
      amount: 15000,
      status: 'active'
    },
    {
      id: 'rule-2',
      type: 'Intercompany Loan',
      source_account: '1300',
      target_account: '2300',
      elimination_percentage: 100,
      amount: 50000,
      status: 'active'
    }
  ]

  const filteredTrialBalance = trialBalanceData.filter(account => {
    const matchesText = account.name.toLowerCase().includes(filterText.toLowerCase()) ||
                       account.code.includes(filterText)
    const matchesType = selectedAccountType === 'all' || account.type === selectedAccountType
    return matchesText && matchesType
  })

  const groupedTrialBalance = filteredTrialBalance.reduce((groups, account) => {
    const group = account.type
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(account)
    return groups
  }, {} as Record<string, typeof trialBalanceData>)

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    )
  }

  const calculateGroupTotals = (accounts: typeof trialBalanceData) => {
    return accounts.reduce((totals, account) => ({
      debit: totals.debit + account.debit,
      credit: totals.credit + account.credit
    }), { debit: 0, credit: 0 })
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounts Production</h1>
          <p className="text-gray-600 mt-2">Advanced FRS 102/105, IFRS compliance, consolidation, and iXBRL generation</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import TB
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Auto-Map
          </Button>
          <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
            <Download className="h-4 w-4 mr-2" />
            Export Package
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">{kpi.label}</p>
                <p className="text-xl font-bold">{kpi.value}</p>
                <div className="flex items-center gap-1">
                  <span className={`text-xs ${kpi.color}`}>{kpi.change}</span>
                  <span className="text-xs text-gray-500">vs prior</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Accounts Production Workflow</CardTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab(tab.id)}
                        className="flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === 'trial-balance' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Advanced Trial Balance</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Balanced
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800">
                        {autoMappingEnabled ? 'Auto-mapping ON' : 'Auto-mapping OFF'}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search accounts..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedAccountType} onValueChange={setSelectedAccountType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Account Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="assets">Assets</SelectItem>
                        <SelectItem value="liabilities">Liabilities</SelectItem>
                        <SelectItem value="equity">Equity</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expenses">Expenses</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="comparisons"
                        checked={showComparisons}
                        onCheckedChange={setShowComparisons}
                      />
                      <Label htmlFor="comparisons" className="text-sm">Compare</Label>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left p-3 font-medium">Code</th>
                          <th className="text-left p-3 font-medium">Account Name</th>
                          <th className="text-left p-3 font-medium">Category</th>
                          <th className="text-right p-3 font-medium">Debit</th>
                          <th className="text-right p-3 font-medium">Credit</th>
                          {showComparisons && (
                            <>
                              <th className="text-right p-3 font-medium">Prior Year</th>
                              <th className="text-right p-3 font-medium">Variance</th>
                              <th className="text-right p-3 font-medium">%</th>
                            </>
                          )}
                          <th className="text-center p-3 font-medium">Mapping</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(groupedTrialBalance).map(([groupName, accounts]) => (
                          <React.Fragment key={groupName}>
                            <tr 
                              className="bg-gray-100 border-b cursor-pointer hover:bg-gray-200"
                              onClick={() => toggleGroup(groupName)}
                            >
                              <td colSpan={showComparisons ? 9 : 6} className="p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {expandedGroups.includes(groupName) ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                    <span className="font-semibold capitalize">{groupName}</span>
                                    <Badge variant="outline">{accounts.length} accounts</Badge>
                                  </div>
                                  <div className="flex gap-4 text-sm font-medium">
                                    <span>Dr: £{calculateGroupTotals(accounts).debit.toLocaleString()}</span>
                                    <span>Cr: £{calculateGroupTotals(accounts).credit.toLocaleString()}</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            {expandedGroups.includes(groupName) && accounts.map((account, index) => (
                              <tr key={`${groupName}-${index}`} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-mono text-sm">{account.code}</td>
                                <td className="p-3">{account.name}</td>
                                <td className="p-3 text-sm text-gray-600">{account.category}</td>
                                <td className="p-3 text-right tabular-nums">
                                  {account.debit > 0 ? `£${account.debit.toLocaleString()}` : '-'}
                                </td>
                                <td className="p-3 text-right tabular-nums">
                                  {account.credit > 0 ? `£${account.credit.toLocaleString()}` : '-'}
                                </td>
                                {showComparisons && (
                                  <>
                                    <td className="p-3 text-right tabular-nums text-gray-600">
                                      £{account.prior_year.toLocaleString()}
                                    </td>
                                    <td className={`p-3 text-right tabular-nums ${
                                      account.variance > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                      {account.variance > 0 ? '+' : ''}£{account.variance.toLocaleString()}
                                    </td>
                                    <td className={`p-3 text-right tabular-nums ${
                                      account.variance_pct > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                      {account.variance_pct > 0 ? '+' : ''}{account.variance_pct.toFixed(1)}%
                                    </td>
                                  </>
                                )}
                                <td className="p-3 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    {account.mapped ? (
                                      <Badge className="bg-green-100 text-green-800 text-xs">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        {account.confidence}%
                                      </Badge>
                                    ) : (
                                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                        Review
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 font-semibold bg-gray-50">
                          <td className="p-3" colSpan={showComparisons ? 3 : 3}>Total</td>
                          <td className="p-3 text-right">£{filteredTrialBalance.reduce((sum, acc) => sum + acc.debit, 0).toLocaleString()}</td>
                          <td className="p-3 text-right">£{filteredTrialBalance.reduce((sum, acc) => sum + acc.credit, 0).toLocaleString()}</td>
                          {showComparisons && (
                            <td colSpan={4} className="p-3"></td>
                          )}
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Import Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Auto-mapped</span>
                            <span className="font-medium">9/10 accounts</span>
                          </div>
                          <Progress value={90} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Confidence: 94%</span>
                            <span>1 requires review</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Balance Validation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Trial balance balanced</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>No duplicate codes</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <span>1 unmapped account</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Button size="sm" variant="outline" className="w-full justify-start">
                            <Zap className="h-4 w-4 mr-2" />
                            Auto-map remaining
                          </Button>
                          <Button size="sm" variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Export to Excel
                          </Button>
                          <Button size="sm" variant="outline" className="w-full justify-start">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh from source
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 'adjustments' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Year-end Adjustments</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Depreciation - Office Equipment</h4>
                          <p className="text-sm text-gray-600">Annual depreciation charge</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">£2,400</p>
                          <Badge className="bg-blue-100 text-blue-800">Posted</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Accrued Expenses</h4>
                          <p className="text-sm text-gray-600">Outstanding utility bills</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">£850</p>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'statements' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Financial Statements</h3>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="frs102">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frs102">FRS 102</SelectItem>
                          <SelectItem value="frs105">FRS 105</SelectItem>
                          <SelectItem value="ifrs">IFRS</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
                  </div>

                  <Tabs defaultValue="summary" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                      <TabsTrigger value="detailed">Detailed P&amp;L</TabsTrigger>
                      <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
                      <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
                    </TabsList>

                    <TabsContent value="summary" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <TrendingUp className="h-4 w-4" />
                              Profit &amp; Loss Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span>Turnover</span>
                                <span className="tabular-nums font-medium">£45,000</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Cost of Sales</span>
                                <span className="tabular-nums">(£18,000)</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between font-semibold">
                                <span>Gross Profit</span>
                                <span className="tabular-nums">£27,000</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Operating Expenses</span>
                                <span className="tabular-nums">(£6,000)</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between font-semibold text-green-600">
                                <span>Net Profit</span>
                                <span className="tabular-nums">£21,000</span>
                              </div>
                              <div className="text-xs text-gray-600 mt-2">
                                Gross Margin: 60.0% | Net Margin: 46.7%
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <BarChart3 className="h-4 w-4" />
                              Balance Sheet Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span>Fixed Assets</span>
                                <span className="tabular-nums">£45,000</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Current Assets</span>
                                <span className="tabular-nums">£23,500</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between font-semibold">
                                <span>Total Assets</span>
                                <span className="tabular-nums">£68,500</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Current Liabilities</span>
                                <span className="tabular-nums">(£4,200)</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Long Term Liabilities</span>
                                <span className="tabular-nums">(£25,000)</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between font-semibold text-blue-600">
                                <span>Net Assets</span>
                                <span className="tabular-nums">£39,300</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <LineChart className="h-4 w-4" />
                              Cash Flow Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span>Operating Activities</span>
                                <span className="tabular-nums text-green-600">£18,500</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Investing Activities</span>
                                <span className="tabular-nums text-red-600">(£5,200)</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Financing Activities</span>
                                <span className="tabular-nums text-red-600">(£2,000)</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between font-semibold">
                                <span>Net Cash Flow</span>
                                <span className="tabular-nums">£11,300</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Opening Cash</span>
                                <span className="tabular-nums">£3,700</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between font-semibold text-blue-600">
                                <span>Closing Cash</span>
                                <span className="tabular-nums">£15,000</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Key Ratios Analysis</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Current Ratio</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">2.8</span>
                                  <Badge className="bg-green-100 text-green-800">Strong</Badge>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Quick Ratio</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">2.1</span>
                                  <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Debt to Equity</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">0.74</span>
                                  <Badge className="bg-blue-100 text-blue-800">Moderate</Badge>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Return on Assets</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">30.7%</span>
                                  <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Disclosure Checklist</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>Accounting policies note</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>Fixed assets note</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>Creditors note</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <AlertCircle className="h-4 w-4 text-yellow-600" />
                                <span>Related party transactions</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <AlertCircle className="h-4 w-4 text-yellow-600" />
                                <span>Post balance sheet events</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="detailed" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Detailed Profit &amp; Loss Account</CardTitle>
                          <CardDescription>For the year ended 31 December 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 text-sm font-medium border-b pb-2">
                              <span>Description</span>
                              <span className="text-right">2024</span>
                              <span className="text-right">2023</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="grid grid-cols-3 gap-4">
                                <span className="font-medium">TURNOVER</span>
                                <span className="text-right tabular-nums">£45,000</span>
                                <span className="text-right tabular-nums">£38,000</span>
                              </div>
                              <div className="grid grid-cols-3 gap-4 ml-4">
                                <span>Sales - Products</span>
                                <span className="text-right tabular-nums">£35,000</span>
                                <span className="text-right tabular-nums">£30,000</span>
                              </div>
                              <div className="grid grid-cols-3 gap-4 ml-4">
                                <span>Sales - Services</span>
                                <span className="text-right tabular-nums">£10,000</span>
                                <span className="text-right tabular-nums">£8,000</span>
                              </div>
                              <Separator />
                              <div className="grid grid-cols-3 gap-4">
                                <span className="font-medium">COST OF SALES</span>
                                <span className="text-right tabular-nums">(£18,000)</span>
                                <span className="text-right tabular-nums">(£15,200)</span>
                              </div>
                              <Separator />
                              <div className="grid grid-cols-3 gap-4 font-semibold">
                                <span>GROSS PROFIT</span>
                                <span className="text-right tabular-nums">£27,000</span>
                                <span className="text-right tabular-nums">£22,800</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="balance-sheet" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Balance Sheet</CardTitle>
                          <CardDescription>As at 31 December 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">ASSETS</h4>
                              <div className="space-y-2 text-sm">
                                <div className="font-medium">Fixed Assets</div>
                                <div className="ml-4 space-y-1">
                                  <div className="flex justify-between">
                                    <span>Equipment</span>
                                    <span className="tabular-nums">£45,000</span>
                                  </div>
                                </div>
                                <div className="font-medium mt-3">Current Assets</div>
                                <div className="ml-4 space-y-1">
                                  <div className="flex justify-between">
                                    <span>Trade Debtors</span>
                                    <span className="tabular-nums">£8,500</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Cash at Bank</span>
                                    <span className="tabular-nums">£15,000</span>
                                  </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold">
                                  <span>TOTAL ASSETS</span>
                                  <span className="tabular-nums">£68,500</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">LIABILITIES &amp; EQUITY</h4>
                              <div className="space-y-2 text-sm">
                                <div className="font-medium">Current Liabilities</div>
                                <div className="ml-4 space-y-1">
                                  <div className="flex justify-between">
                                    <span>Trade Creditors</span>
                                    <span className="tabular-nums">£4,200</span>
                                  </div>
                                </div>
                                <div className="font-medium mt-3">Long Term Liabilities</div>
                                <div className="ml-4 space-y-1">
                                  <div className="flex justify-between">
                                    <span>Bank Loan</span>
                                    <span className="tabular-nums">£25,000</span>
                                  </div>
                                </div>
                                <div className="font-medium mt-3">Equity</div>
                                <div className="ml-4 space-y-1">
                                  <div className="flex justify-between">
                                    <span>Share Capital</span>
                                    <span className="tabular-nums">£10,000</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Retained Earnings</span>
                                    <span className="tabular-nums">£29,300</span>
                                  </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold">
                                  <span>TOTAL LIABILITIES &amp; EQUITY</span>
                                  <span className="tabular-nums">£68,500</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="cash-flow" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Cash Flow Statement</CardTitle>
                          <CardDescription>For the year ended 31 December 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Operating Activities</h4>
                              <div className="ml-4 space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Net profit for the year</span>
                                  <span className="tabular-nums">£21,000</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Depreciation</span>
                                  <span className="tabular-nums">£3,000</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Increase in debtors</span>
                                  <span className="tabular-nums">(£1,300)</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Increase in creditors</span>
                                  <span className="tabular-nums">£400</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                  <span>Net cash from operating activities</span>
                                  <span className="tabular-nums">£23,100</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Investing Activities</h4>
                              <div className="ml-4 space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Purchase of equipment</span>
                                  <span className="tabular-nums">(£5,200)</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                  <span>Net cash used in investing activities</span>
                                  <span className="tabular-nums">(£5,200)</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Financing Activities</h4>
                              <div className="ml-4 space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Loan repayments</span>
                                  <span className="tabular-nums">(£5,000)</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Dividends paid</span>
                                  <span className="tabular-nums">(£2,000)</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                  <span>Net cash used in financing activities</span>
                                  <span className="tabular-nums">(£7,000)</span>
                                </div>
                              </div>
                            </div>
                            <Separator />
                            <div className="space-y-1 text-sm font-semibold">
                              <div className="flex justify-between">
                                <span>Net increase in cash</span>
                                <span className="tabular-nums">£10,900</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Cash at beginning of year</span>
                                <span className="tabular-nums">£4,100</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between text-blue-600">
                                <span>Cash at end of year</span>
                                <span className="tabular-nums">£15,000</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {activeTab === 'consolidation' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Group Consolidation</h3>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Entity
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Rules
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Entity Groups</CardTitle>
                        <CardDescription>Manage consolidation groups and subsidiaries</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {entityGroups.map((group) => (
                            <div key={group.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{group.name}</h4>
                                <Badge className="bg-blue-100 text-blue-800">{group.consolidation_method}</Badge>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Parent:</span>
                                  <span>{group.parent_company}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Subsidiaries:</span>
                                  <span>{group.subsidiaries.length}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Currency:</span>
                                  <span>{group.currency}</span>
                                </div>
                              </div>
                              <div className="mt-3 flex gap-2">
                                <Button size="sm" variant="outline">View Details</Button>
                                <Button size="sm" variant="outline">Consolidate</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Elimination Rules</CardTitle>
                        <CardDescription>Intercompany elimination configuration</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {consolidationRules.map((rule) => (
                            <div key={rule.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{rule.type}</h4>
                                <Badge className={rule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                  {rule.status}
                                </Badge>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Source Account:</span>
                                  <span className="font-mono">{rule.source_account}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Target Account:</span>
                                  <span className="font-mono">{rule.target_account}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Elimination:</span>
                                  <span>{rule.elimination_percentage}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Amount:</span>
                                  <span className="font-medium">£{rule.amount.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Consolidated Trial Balance</CardTitle>
                      <CardDescription>Combined group trial balance with eliminations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Select defaultValue="abc-holdings">
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="abc-holdings">ABC Holdings Group</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Recalculate
                          </Button>
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Consolidated
                          </Button>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr className="border-b bg-gray-50">
                                <th className="text-left p-3">Account</th>
                                <th className="text-right p-3">Parent</th>
                                <th className="text-right p-3">Sub 1</th>
                                <th className="text-right p-3">Sub 2</th>
                                <th className="text-right p-3">Eliminations</th>
                                <th className="text-right p-3">Consolidated</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="p-3 font-medium">Sales Revenue</td>
                                <td className="p-3 text-right">£45,000</td>
                                <td className="p-3 text-right">£25,000</td>
                                <td className="p-3 text-right">£18,000</td>
                                <td className="p-3 text-right text-red-600">(£15,000)</td>
                                <td className="p-3 text-right font-medium">£73,000</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3 font-medium">Cost of Sales</td>
                                <td className="p-3 text-right">£18,000</td>
                                <td className="p-3 text-right">£10,000</td>
                                <td className="p-3 text-right">£7,200</td>
                                <td className="p-3 text-right text-red-600">(£15,000)</td>
                                <td className="p-3 text-right font-medium">£20,200</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3 font-medium">Intercompany Receivables</td>
                                <td className="p-3 text-right">£50,000</td>
                                <td className="p-3 text-right">£0</td>
                                <td className="p-3 text-right">£0</td>
                                <td className="p-3 text-right text-red-600">(£50,000)</td>
                                <td className="p-3 text-right font-medium">£0</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3 font-medium">Intercompany Payables</td>
                                <td className="p-3 text-right">£0</td>
                                <td className="p-3 text-right">£30,000</td>
                                <td className="p-3 text-right">£20,000</td>
                                <td className="p-3 text-right text-red-600">(£50,000)</td>
                                <td className="p-3 text-right font-medium">£0</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-center">
                                <p className="text-sm text-gray-600">Total Eliminations</p>
                                <p className="text-xl font-bold text-red-600">£115,000</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-center">
                                <p className="text-sm text-gray-600">Minority Interest</p>
                                <p className="text-xl font-bold">£8,500</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-center">
                                <p className="text-sm text-gray-600">Goodwill</p>
                                <p className="text-xl font-bold">£12,000</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Advanced Reports</h3>
                    <div className="flex items-center gap-2">
                      <Select value={reportAccountType} onValueChange={setReportAccountType}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          {accountTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Custom Report
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </div>

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
                              value={reportSearchTerm}
                              onChange={(e) => setReportSearchTerm(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Date Range</label>
                          <Select value={reportFilters.category} onValueChange={(value) => setReportFilters({...reportFilters, category: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Periods</SelectItem>
                              <SelectItem value="current">Current Year</SelectItem>
                              <SelectItem value="previous">Previous Year</SelectItem>
                              <SelectItem value="ytd">Year to Date</SelectItem>
                              <SelectItem value="custom">Custom Range</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Report Type</label>
                          <Select value={reportFilters.status} onValueChange={(value) => setReportFilters({...reportFilters, status: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="All types" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="financial">Financial Reports</SelectItem>
                              <SelectItem value="management">Management Reports</SelectItem>
                              <SelectItem value="statutory">Statutory Reports</SelectItem>
                              <SelectItem value="analysis">Analysis Reports</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Actions</label>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Filter className="h-4 w-4 mr-2" />
                              Apply
                            </Button>
                            <Button variant="ghost" size="sm" className="flex-1">
                              Clear
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Tabs defaultValue="trial-balance-reports" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="trial-balance-reports">Trial Balance</TabsTrigger>
                      <TabsTrigger value="management-accounts">Management Accounts</TabsTrigger>
                      <TabsTrigger value="nominal-ledger">Nominal Ledger</TabsTrigger>
                      <TabsTrigger value="statutory-accounts">Statutory Accounts</TabsTrigger>
                    </TabsList>

                    <TabsContent value="trial-balance-reports" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Standard Trial Balance
                            </CardTitle>
                            <CardDescription>Current period trial balance with account details</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Period:</span>
                                <span>Dec 2024</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Accounts:</span>
                                <span>156</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Balance:</span>
                                <span className="text-green-600">Balanced</span>
                              </div>
                              <Button size="sm" className="w-full mt-3">Generate Report</Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <BarChart3 className="h-4 w-4" />
                              Multi-Year Trial Balance
                            </CardTitle>
                            <CardDescription>Comparative trial balance up to 5 years</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Years:</span>
                                <span>2020-2024</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Variance Analysis:</span>
                                <span className="text-blue-600">Included</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Trend Analysis:</span>
                                <span className="text-green-600">Available</span>
                              </div>
                              <Button size="sm" className="w-full mt-3">Generate Report</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Calculator className="h-5 w-5" />
                            Multi-Year Trial Balance Preview
                          </CardTitle>
                          <CardDescription>Comparative analysis across selected years</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <label className="text-sm font-medium mb-2 block">Select Years (up to 5)</label>
                            <div className="flex flex-wrap gap-2">
                              {availableYears.map((year) => (
                                <Button
                                  key={year}
                                  variant={selectedYears.includes(year) ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => {
                                    if (selectedYears.includes(year)) {
                                      setSelectedYears(selectedYears.filter(y => y !== year))
                                    } else if (selectedYears.length < 5) {
                                      setSelectedYears([...selectedYears, year])
                                    }
                                  }}
                                >
                                  {year}
                                </Button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left p-2">Account</th>
                                  {selectedYears.sort().reverse().map((year) => (
                                    <th key={year} className="text-right p-2">{year}</th>
                                  ))}
                                  <th className="text-right p-2">Variance %</th>
                                </tr>
                              </thead>
                              <tbody>
                                {multiYearTrialBalance.map((row, index) => {
                                  const currentYear = Math.max(...selectedYears.map(y => parseInt(y)))
                                  const previousYear = currentYear - 1
                                  const variance = previousYear >= 2020 ? 
                                    ((row[currentYear as keyof typeof row] as number - (row[previousYear as keyof typeof row] as number)) / Math.abs(row[previousYear as keyof typeof row] as number) * 100) : 0
                                  
                                  return (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                      <td className="p-2 font-medium">{row.account}</td>
                                      {selectedYears.sort().reverse().map((year) => (
                                        <td key={year} className="text-right p-2">
                                          £{(row[year as keyof typeof row] as number).toLocaleString()}
                                        </td>
                                      ))}
                                      <td className={`text-right p-2 ${variance > 0 ? 'text-green-600' : variance < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                                        {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="management-accounts" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Profit & Loss Summary</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Revenue</span>
                              <div className="text-right">
                                <div className="font-medium">£{managementAccountsData.profitLoss.revenue.current.toLocaleString()}</div>
                                <div className={`text-xs ${managementAccountsData.profitLoss.revenue.variance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {managementAccountsData.profitLoss.revenue.variance > 0 ? '+' : ''}{managementAccountsData.profitLoss.revenue.variance}%
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Gross Profit</span>
                              <div className="text-right">
                                <div className="font-medium">£{managementAccountsData.profitLoss.grossProfit.current.toLocaleString()}</div>
                                <div className={`text-xs ${managementAccountsData.profitLoss.grossProfit.variance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {managementAccountsData.profitLoss.grossProfit.variance > 0 ? '+' : ''}{managementAccountsData.profitLoss.grossProfit.variance}%
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Net Profit</span>
                              <div className="text-right">
                                <div className="font-medium">£{managementAccountsData.profitLoss.netProfit.current.toLocaleString()}</div>
                                <div className={`text-xs ${managementAccountsData.profitLoss.netProfit.variance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {managementAccountsData.profitLoss.netProfit.variance > 0 ? '+' : ''}{managementAccountsData.profitLoss.netProfit.variance}%
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Balance Sheet Summary</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Fixed Assets</span>
                              <div className="text-right">
                                <div className="font-medium">£{managementAccountsData.balanceSheet.fixedAssets.current.toLocaleString()}</div>
                                <div className={`text-xs ${managementAccountsData.balanceSheet.fixedAssets.variance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {managementAccountsData.balanceSheet.fixedAssets.variance > 0 ? '+' : ''}{managementAccountsData.balanceSheet.fixedAssets.variance}%
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Current Assets</span>
                              <div className="text-right">
                                <div className="font-medium">£{managementAccountsData.balanceSheet.currentAssets.current.toLocaleString()}</div>
                                <div className={`text-xs ${managementAccountsData.balanceSheet.currentAssets.variance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {managementAccountsData.balanceSheet.currentAssets.variance > 0 ? '+' : ''}{managementAccountsData.balanceSheet.currentAssets.variance}%
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Net Assets</span>
                              <div className="text-right">
                                <div className="font-medium">£{managementAccountsData.balanceSheet.netAssets.current.toLocaleString()}</div>
                                <div className={`text-xs ${managementAccountsData.balanceSheet.netAssets.variance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {managementAccountsData.balanceSheet.netAssets.variance > 0 ? '+' : ''}{managementAccountsData.balanceSheet.netAssets.variance}%
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Key Ratios</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Current Ratio</span>
                              <div className="text-right">
                                <div className="font-medium">{managementAccountsData.ratios.currentRatio.current}</div>
                                <div className="text-xs text-gray-500">Target: {managementAccountsData.ratios.currentRatio.benchmark}</div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Quick Ratio</span>
                              <div className="text-right">
                                <div className="font-medium">{managementAccountsData.ratios.quickRatio.current}</div>
                                <div className="text-xs text-gray-500">Target: {managementAccountsData.ratios.quickRatio.benchmark}</div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">ROA</span>
                              <div className="text-right">
                                <div className="font-medium">{(managementAccountsData.ratios.returnOnAssets.current * 100).toFixed(1)}%</div>
                                <div className="text-xs text-gray-500">Target: {(managementAccountsData.ratios.returnOnAssets.benchmark * 100).toFixed(1)}%</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Management Accounts Dashboard
                          </CardTitle>
                          <CardDescription>Board-ready financial pack with KPIs and analysis</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="text-center p-4 border rounded-lg">
                              <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                              <div className="text-2xl font-bold">£180k</div>
                              <div className="text-sm text-gray-600">Revenue</div>
                              <div className="text-xs text-green-600">+18.4% YoY</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                              <div className="text-2xl font-bold">60%</div>
                              <div className="text-sm text-gray-600">Gross Margin</div>
                              <div className="text-xs text-blue-600">+0.4% YoY</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <Activity className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                              <div className="text-2xl font-bold">1.8</div>
                              <div className="text-sm text-gray-600">Current Ratio</div>
                              <div className="text-xs text-purple-600">+0.1 YoY</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <Percent className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                              <div className="text-2xl font-bold">17%</div>
                              <div className="text-sm text-gray-600">ROA</div>
                              <div className="text-xs text-orange-600">+4% YoY</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button>
                              <Download className="h-4 w-4 mr-2" />
                              Export PDF
                            </Button>
                            <Button variant="outline">
                              <FileSpreadsheet className="h-4 w-4 mr-2" />
                              Export Excel
                            </Button>
                            <Button variant="outline">
                              <Mail className="h-4 w-4 mr-2" />
                              Email Report
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="nominal-ledger" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Database className="h-5 w-5" />
                            Detailed Nominal Ledger
                          </CardTitle>
                          <CardDescription>Transaction-level detail with full audit trail</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Search Transactions</label>
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  type="text"
                                  placeholder="Search by description, reference..."
                                  className="pl-10"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Account Filter</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="All accounts" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Accounts</SelectItem>
                                  <SelectItem value="1000">1000 - Fixed Assets</SelectItem>
                                  <SelectItem value="4000">4000 - Revenue</SelectItem>
                                  <SelectItem value="5000">5000 - Cost of Sales</SelectItem>
                                  <SelectItem value="6000">6000 - Operating Expenses</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Date Range</label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Current year" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="current">Current Year</SelectItem>
                                  <SelectItem value="previous">Previous Year</SelectItem>
                                  <SelectItem value="ytd">Year to Date</SelectItem>
                                  <SelectItem value="custom">Custom Range</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Actions</label>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Refresh
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Download className="h-4 w-4 mr-2" />
                                  Export
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left p-2">Date</th>
                                  <th className="text-left p-2">Account</th>
                                  <th className="text-left p-2">Reference</th>
                                  <th className="text-left p-2">Description</th>
                                  <th className="text-right p-2">Debit</th>
                                  <th className="text-right p-2">Credit</th>
                                  <th className="text-right p-2">Balance</th>
                                </tr>
                              </thead>
                              <tbody>
                                {nominalLedgerData.map((transaction, index) => (
                                  <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{transaction.date}</td>
                                    <td className="p-2 font-medium">{transaction.account}</td>
                                    <td className="p-2">{transaction.reference}</td>
                                    <td className="p-2">{transaction.description}</td>
                                    <td className="text-right p-2">
                                      {transaction.debit > 0 ? `£${transaction.debit.toLocaleString()}` : '-'}
                                    </td>
                                    <td className="text-right p-2">
                                      {transaction.credit > 0 ? `£${transaction.credit.toLocaleString()}` : '-'}
                                    </td>
                                    <td className="text-right p-2 font-medium">
                                      £{Math.abs(transaction.balance).toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                            <span>Showing 6 of 1,247 transactions</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Previous</Button>
                              <Button variant="outline" size="sm">Next</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="statutory-accounts" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Full Accounts
                            </CardTitle>
                            <CardDescription>Complete statutory accounts with all required disclosures</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Disclosure Level:</span>
                                <span>Complete</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Notes:</span>
                                <span>All Required</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Status:</span>
                                <span className="text-green-600">Ready</span>
                              </div>
                              <Button size="sm" className="w-full mt-3">Generate</Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <FileSearch className="h-4 w-4" />
                              Filleted Accounts
                            </CardTitle>
                            <CardDescription>Full detailed disclosure with all notes and supporting schedules</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Disclosure Level:</span>
                                <span>Detailed</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Schedules:</span>
                                <span>All Included</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Status:</span>
                                <span className="text-green-600">Ready</span>
                              </div>
                              <Button size="sm" className="w-full mt-3">Generate</Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Archive className="h-4 w-4" />
                              Abbreviated Accounts
                            </CardTitle>
                            <CardDescription>Simplified format with reduced disclosure requirements</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Disclosure Level:</span>
                                <span>Reduced</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Notes:</span>
                                <span>Essential Only</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Status:</span>
                                <span className="text-green-600">Ready</span>
                              </div>
                              <Button size="sm" className="w-full mt-3">Generate</Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Target className="h-4 w-4" />
                              Micro-Entity Accounts
                            </CardTitle>
                            <CardDescription>Minimal disclosure format for small companies</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Disclosure Level:</span>
                                <span>Minimal</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Format:</span>
                                <span>Basic P&L & BS</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Status:</span>
                                <span className="text-green-600">Ready</span>
                              </div>
                              <Button size="sm" className="w-full mt-3">Generate</Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Dormant Accounts
                            </CardTitle>
                            <CardDescription>Simplified format for inactive companies</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Activity Level:</span>
                                <span>Dormant</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Format:</span>
                                <span>Simplified</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Status:</span>
                                <span className="text-green-600">Ready</span>
                              </div>
                              <Button size="sm" className="w-full mt-3">Generate</Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Printer className="h-4 w-4" />
                              Custom Format
                            </CardTitle>
                            <CardDescription>Build your own account format with custom disclosures</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Templates:</span>
                                <span>5 Available</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Customizable:</span>
                                <span className="text-blue-600">Yes</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Status:</span>
                                <span className="text-yellow-600">Configure</span>
                              </div>
                              <Button size="sm" className="w-full mt-3">Configure</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Account Type Comparison
                          </CardTitle>
                          <CardDescription>Compare disclosure requirements across different account types</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left p-2">Feature</th>
                                  <th className="text-center p-2">Full</th>
                                  <th className="text-center p-2">Filleted</th>
                                  <th className="text-center p-2">Abbreviated</th>
                                  <th className="text-center p-2">Micro-Entity</th>
                                  <th className="text-center p-2">Dormant</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="p-2">Director's Report</td>
                                  <td className="text-center p-2"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></td>
                                  <td className="text-center p-2"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></td>
                                  <td className="text-center p-2"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></td>
                                  <td className="text-center p-2">-</td>
                                  <td className="text-center p-2">-</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Detailed Notes</td>
                                  <td className="text-center p-2"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></td>
                                  <td className="text-center p-2"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></td>
                                  <td className="text-center p-2">Limited</td>
                                  <td className="text-center p-2">-</td>
                                  <td className="text-center p-2">-</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Cash Flow Statement</td>
                                  <td className="text-center p-2"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></td>
                                  <td className="text-center p-2"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></td>
                                  <td className="text-center p-2">Optional</td>
                                  <td className="text-center p-2">-</td>
                                  <td className="text-center p-2">-</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Audit Report</td>
                                  <td className="text-center p-2"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></td>
                                  <td className="text-center p-2"><CheckCircle className="h-4 w-4 text-green-600 mx-auto" /></td>
                                  <td className="text-center p-2">If Required</td>
                                  <td className="text-center p-2">-</td>
                                  <td className="text-center p-2">-</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {activeTab === 'ixbrl' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">iXBRL Generation &amp; Filing</h3>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="uk-gaap">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uk-gaap">UK GAAP</SelectItem>
                          <SelectItem value="ifrs">IFRS</SelectItem>
                          <SelectItem value="frs105">FRS 105</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="sm" variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Validate
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Tagging Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-brisk-primary">94%</div>
                            <p className="text-sm text-gray-600">Elements Tagged</p>
                          </div>
                          <Progress value={94} className="h-3" />
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Required tags:</span>
                              <span className="font-medium">47/47</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Optional tags:</span>
                              <span className="font-medium">23/26</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Custom tags:</span>
                              <span className="font-medium">5</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Validation Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Schema validation passed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Taxonomy compliance verified</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Business rules validated</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm">3 optional tags missing</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm">1 warning: date format</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Filing Readiness</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Badge className="bg-green-100 text-green-800 w-full justify-center py-2">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Ready for Filing
                          </Badge>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>Companies House compliant</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>HMRC compatible</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>Digital signature ready</span>
                            </div>
                          </div>
                          <Button size="sm" className="w-full mt-3">
                            <Download className="h-4 w-4 mr-2" />
                            Generate Final iXBRL
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Tagging Details</CardTitle>
                      <CardDescription>Detailed breakdown of iXBRL tagging by section</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Profit &amp; Loss</span>
                              <Badge className="bg-green-100 text-green-800">100%</Badge>
                            </div>
                            <Progress value={100} className="h-2" />
                            <p className="text-xs text-gray-600 mt-1">15/15 tags</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Balance Sheet</span>
                              <Badge className="bg-green-100 text-green-800">95%</Badge>
                            </div>
                            <Progress value={95} className="h-2" />
                            <p className="text-xs text-gray-600 mt-1">19/20 tags</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Notes</span>
                              <Badge className="bg-yellow-100 text-yellow-800">88%</Badge>
                            </div>
                            <Progress value={88} className="h-2" />
                            <p className="text-xs text-gray-600 mt-1">22/25 tags</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Context</span>
                              <Badge className="bg-green-100 text-green-800">100%</Badge>
                            </div>
                            <Progress value={100} className="h-2" />
                            <p className="text-xs text-gray-600 mt-1">8/8 tags</p>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr className="border-b bg-gray-50">
                                <th className="text-left p-3">Element</th>
                                <th className="text-left p-3">Tag</th>
                                <th className="text-right p-3">Value</th>
                                <th className="text-center p-3">Status</th>
                                <th className="text-center p-3">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="p-3">Turnover</td>
                                <td className="p-3 font-mono text-xs">uk-bus:Turnover</td>
                                <td className="p-3 text-right">£45,000</td>
                                <td className="p-3 text-center">
                                  <Badge className="bg-green-100 text-green-800">Tagged</Badge>
                                </td>
                                <td className="p-3 text-center">
                                  <Button size="sm" variant="outline">Edit</Button>
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3">Cost of Sales</td>
                                <td className="p-3 font-mono text-xs">uk-bus:CostSales</td>
                                <td className="p-3 text-right">£18,000</td>
                                <td className="p-3 text-center">
                                  <Badge className="bg-green-100 text-green-800">Tagged</Badge>
                                </td>
                                <td className="p-3 text-center">
                                  <Button size="sm" variant="outline">Edit</Button>
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3">Fixed Assets</td>
                                <td className="p-3 font-mono text-xs">uk-bus:FixedAssets</td>
                                <td className="p-3 text-right">£45,000</td>
                                <td className="p-3 text-center">
                                  <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>
                                </td>
                                <td className="p-3 text-center">
                                  <Button size="sm" variant="outline">Fix</Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Custom Tag
                            </Button>
                            <Button size="sm" variant="outline">
                              <ArrowUpDown className="h-4 w-4 mr-2" />
                              Auto-suggest Tags
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">Preview iXBRL</Button>
                            <Button size="sm">
                              <Shield className="h-4 w-4 mr-2" />
                              Submit for Filing
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-brisk-primary" />
                AI Accounts Adviser
              </CardTitle>
              <CardDescription>Partner-ready commentary and intelligent insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Tabs defaultValue="insights" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="insights">Insights</TabsTrigger>
                    <TabsTrigger value="commentary">Commentary</TabsTrigger>
                    <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                  </TabsList>

                  <TabsContent value="insights" className="space-y-3 mt-4">
                    {aiInsights.map((insight, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${
                        insight.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                        insight.type === 'success' ? 'bg-green-50 border-green-200' :
                        'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="flex items-start gap-2">
                          {insight.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />}
                          {insight.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />}
                          {insight.type === 'info' && <FileText className="h-4 w-4 text-blue-600 mt-0.5" />}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">{insight.title}</h4>
                              <Badge className={`text-xs ${
                                insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                                insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {insight.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">Action:</span>
                                <span className="text-xs font-medium">{insight.action}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">Impact:</span>
                                <span className="text-xs">{insight.impact}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">Confidence:</span>
                                <span className="text-xs font-medium">{insight.confidence}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="commentary" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Executive Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-2">
                        <p>
                          The company demonstrates strong financial performance with revenue growth of 18.4% year-on-year, 
                          reaching £45,000. The gross profit margin of 60.0% indicates effective cost management and pricing strategy.
                        </p>
                        <p>
                          Liquidity position remains excellent with a current ratio of 2.8, providing substantial working capital 
                          buffer. The company maintains a conservative debt structure with manageable long-term obligations.
                        </p>
                        <p>
                          Key areas for attention include expense control, particularly office expenses which increased 45%, 
                          and ensuring compliance with disclosure requirements under FRS 102.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Performance Analysis</CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">Profitability</p>
                            <p>Strong gross margin at 60.0% with net profit margin of 46.7%, indicating efficient operations.</p>
                          </div>
                          <div>
                            <p className="font-medium">Liquidity</p>
                            <p>Excellent liquidity with current ratio of 2.8 and quick ratio of 2.1, well above industry norms.</p>
                          </div>
                          <div>
                            <p className="font-medium">Efficiency</p>
                            <p>Asset turnover of 0.66 suggests room for improvement in asset utilization.</p>
                          </div>
                          <div>
                            <p className="font-medium">Leverage</p>
                            <p>Conservative debt-to-equity ratio of 0.74 provides financial flexibility.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-2">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Award className="h-3 w-3 text-blue-600 mt-0.5" />
                            <div>
                              <p className="font-medium">Strategic</p>
                              <p>Consider expansion opportunities given strong cash position and profitability.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 text-yellow-600 mt-0.5" />
                            <div>
                              <p className="font-medium">Operational</p>
                              <p>Implement expense monitoring controls to maintain cost discipline.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Shield className="h-3 w-3 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-medium">Compliance</p>
                              <p>Ensure all FRS 102 disclosure requirements are met before filing.</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="scenarios" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">What-If Analysis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <div className="p-2 border rounded text-xs">
                            <p className="font-medium">Scenario: Revenue -10%</p>
                            <p>Impact: Net profit reduces to £16,500 (-22%)</p>
                            <p className="text-gray-600">Recommendation: Focus on cost reduction</p>
                          </div>
                          <div className="p-2 border rounded text-xs">
                            <p className="font-medium">Scenario: Interest rates +2%</p>
                            <p>Impact: Additional £500 annual interest cost</p>
                            <p className="text-gray-600">Recommendation: Consider fixed-rate options</p>
                          </div>
                          <div className="p-2 border rounded text-xs">
                            <p className="font-medium">Scenario: Expansion investment £20k</p>
                            <p>Impact: ROI potential 25% based on current margins</p>
                            <p className="text-gray-600">Recommendation: Proceed with detailed analysis</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Standards Navigator</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3 w-3 text-blue-600" />
                          <span>FRS 102 Section 7 - Statement of Cash Flows</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3 w-3 text-blue-600" />
                          <span>FRS 102 Section 33 - Related Party Disclosures</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3 w-3 text-blue-600" />
                          <span>FRS 102 Section 17 - Property, Plant and Equipment</span>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

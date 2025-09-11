import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Calculator, 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Download, 
  Upload, 
  Search,
  Settings,
  Plus,
  Eye,
  Edit,
  BarChart3,
  Building2,
  Globe
} from 'lucide-react'
import AIPromptSection from '@/components/AIPromptSection'

const AccountsProduction: React.FC = () => {
  const tabs = [
    { id: 'trial-balance', label: 'Trial Balance', icon: Calculator },
    { id: 'adjustments', label: 'Adjustments', icon: Edit },
    { id: 'statements', label: 'Statements', icon: FileText },
    { id: 'consolidation', label: 'Consolidation', icon: Building2 },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'ixbrl', label: 'iXBRL', icon: Globe }
  ]

  const trialBalanceData = [
    {
      code: '1000',
      account: 'Cash at Bank',
      debit: 45000,
      credit: 0,
      type: 'assets',
      group: 'Current Assets'
    },
    {
      code: '1100',
      account: 'Accounts Receivable',
      debit: 28000,
      credit: 0,
      type: 'assets',
      group: 'Current Assets'
    },
    {
      code: '1200',
      account: 'Inventory',
      debit: 15000,
      credit: 0,
      type: 'assets',
      group: 'Current Assets'
    },
    {
      code: '1300',
      account: 'Prepaid Expenses',
      debit: 3500,
      credit: 0,
      type: 'assets',
      group: 'Current Assets'
    },
    {
      code: '1500',
      account: 'Office Equipment',
      debit: 25000,
      credit: 0,
      type: 'assets',
      group: 'Fixed Assets'
    },
    {
      code: '1510',
      account: 'Accumulated Depreciation - Equipment',
      debit: 0,
      credit: 8000,
      type: 'assets',
      group: 'Fixed Assets'
    },
    {
      code: '1600',
      account: 'Computer Equipment',
      debit: 15000,
      credit: 0,
      type: 'assets',
      group: 'Fixed Assets'
    },
    {
      code: '1610',
      account: 'Accumulated Depreciation - Computers',
      debit: 0,
      credit: 5000,
      type: 'assets',
      group: 'Fixed Assets'
    },
    {
      code: '2000',
      account: 'Accounts Payable',
      debit: 0,
      credit: 18000,
      type: 'liabilities',
      group: 'Current Liabilities'
    },
    {
      code: '2100',
      account: 'Accrued Expenses',
      debit: 0,
      credit: 8500,
      type: 'liabilities',
      group: 'Current Liabilities'
    },
    {
      code: '2200',
      account: 'VAT Payable',
      debit: 0,
      credit: 4200,
      type: 'liabilities',
      group: 'Current Liabilities'
    },
    {
      code: '2300',
      account: 'PAYE/NIC Payable',
      debit: 0,
      credit: 3800,
      type: 'liabilities',
      group: 'Current Liabilities'
    },
    {
      code: '2500',
      account: 'Bank Loan',
      debit: 0,
      credit: 25000,
      type: 'liabilities',
      group: 'Long-term Liabilities'
    },
    {
      code: '3000',
      account: 'Share Capital',
      debit: 0,
      credit: 50000,
      type: 'equity',
      group: 'Equity'
    },
    {
      code: '3100',
      account: 'Retained Earnings',
      debit: 0,
      credit: 12300,
      type: 'equity',
      group: 'Equity'
    },
    {
      code: '4000',
      account: 'Sales Revenue',
      debit: 0,
      credit: 180000,
      type: 'income',
      group: 'Revenue'
    },
    {
      code: '4100',
      account: 'Interest Income',
      debit: 0,
      credit: 1200,
      type: 'income',
      group: 'Other Income'
    },
    {
      code: '5000',
      account: 'Cost of Goods Sold',
      debit: 95000,
      credit: 0,
      type: 'expenses',
      group: 'Cost of Sales'
    },
    {
      code: '6000',
      account: 'Salaries and Wages',
      debit: 45000,
      credit: 0,
      type: 'expenses',
      group: 'Operating Expenses'
    },
    {
      code: '6100',
      account: 'Rent Expense',
      debit: 18000,
      credit: 0,
      type: 'expenses',
      group: 'Operating Expenses'
    },
    {
      code: '6200',
      account: 'Utilities',
      debit: 4800,
      credit: 0,
      type: 'expenses',
      group: 'Operating Expenses'
    },
    {
      code: '6300',
      account: 'Insurance',
      debit: 3600,
      credit: 0,
      type: 'expenses',
      group: 'Operating Expenses'
    },
    {
      code: '6400',
      account: 'Professional Fees',
      debit: 8500,
      credit: 0,
      type: 'expenses',
      group: 'Operating Expenses'
    },
    {
      code: '6500',
      account: 'Depreciation Expense',
      debit: 6500,
      credit: 0,
      type: 'expenses',
      group: 'Operating Expenses'
    },
    {
      code: '7000',
      account: 'Interest Expense',
      debit: 2400,
      credit: 0,
      type: 'expenses',
      group: 'Finance Costs'
    }
  ]

  const kpis = [
    { label: 'Total Assets', value: '£208,500', change: '+5.2%', positive: true },
    { label: 'Total Liabilities', value: '£84,500', change: '-2.1%', positive: true },
    { label: 'Net Equity', value: '£124,000', change: '+8.7%', positive: true },
    { label: 'Working Capital', value: '£56,000', change: '+12.3%', positive: true }
  ]

  const aiInsights = [
    {
      type: 'warning',
      title: 'Liquidity Concern',
      message: 'Current ratio has decreased to 1.8x. Consider reviewing payment terms with suppliers.',
      action: 'Review cash flow forecast',
      priority: 'high'
    },
    {
      type: 'success',
      title: 'Profitability Improvement',
      message: 'Gross margin improved by 3.2% compared to prior year. Strong operational performance.',
      action: 'Maintain current strategy',
      priority: 'low'
    },
    {
      type: 'info',
      title: 'Depreciation Review',
      message: 'Fixed asset depreciation rates appear consistent with industry standards.',
      action: 'Annual review scheduled',
      priority: 'medium'
    },
    {
      type: 'warning',
      title: 'Receivables Aging',
      message: 'Average collection period increased to 45 days. Consider credit control review.',
      action: 'Review credit policies',
      priority: 'medium'
    }
  ]

  const entityGroups = [
    {
      id: 1,
      name: 'ABC Holdings Group',
      parent_company: 'ABC Holdings Ltd',
      subsidiaries: ['ABC Trading Ltd', 'ABC Services Ltd'],
      consolidation_method: 'Full',
      currency: 'GBP'
    },
    {
      id: 2,
      name: 'XYZ International',
      parent_company: 'XYZ Corp',
      subsidiaries: ['XYZ UK Ltd', 'XYZ Europe BV'],
      consolidation_method: 'Equity',
      currency: 'EUR'
    }
  ]

  const consolidationRules = [
    {
      id: 1,
      type: 'Intercompany Sales',
      source_account: '4000',
      target_account: '5000',
      elimination_percentage: 100,
      amount: 25000,
      status: 'active'
    },
    {
      id: 2,
      type: 'Intercompany Loans',
      source_account: '1400',
      target_account: '2400',
      elimination_percentage: 100,
      amount: 50000,
      status: 'active'
    },
    {
      id: 3,
      type: 'Management Charges',
      source_account: '6800',
      target_account: '4200',
      elimination_percentage: 100,
      amount: 15000,
      status: 'inactive'
    }
  ]

  const [filterText, setFilterText] = useState('')
  const [selectedAccountType, setSelectedAccountType] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('current')
  const [showComparisons, setShowComparisons] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Current Assets', 'Revenue'])
  const [isAILoading, setIsAILoading] = useState(false)

  const handleAIQuestion = async (question: string) => {
    setIsAILoading(true)
    try {
      console.log('AI Question:', question)
    } catch (error) {
      console.error('Error asking AI:', error)
    } finally {
      setIsAILoading(false)
    }
  }

  const filteredTrialBalance = trialBalanceData.filter(account => {
    const matchesText = account.account.toLowerCase().includes(filterText.toLowerCase()) || 
                       account.code.includes(filterText)
    return matchesText && (selectedAccountType === 'all' || account.type === selectedAccountType)
  })

  const groupedTrialBalance = filteredTrialBalance.reduce((groups, account) => {
    const group = account.group
    if (!groups[group]) groups[group] = []
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

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'trial-balance':
        return renderTrialBalanceContent()
      case 'adjustments':
        return renderAdjustmentsContent()
      case 'statements':
        return renderStatementsContent()
      case 'consolidation':
        return renderConsolidationContent()
      case 'reports':
        return renderReportsContent()
      case 'ixbrl':
        return renderIXBRLContent()
      default:
        return <div>Content for {tabId}</div>
    }
  }

  const renderTrialBalanceContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Advanced Trial Balance</h3>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Balanced
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            Auto-mapping ON
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
            <SelectItem value="current">Current Year</SelectItem>
            <SelectItem value="prior">Prior Year</SelectItem>
            <SelectItem value="comparative">Comparative</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="comparisons"
            checked={showComparisons}
            onCheckedChange={(checked) => setShowComparisons(checked as boolean)}
          />
          <Label htmlFor="comparisons" className="text-sm">Compare</Label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-3 font-medium">Account Code</th>
              <th className="text-left p-3 font-medium">Account Name</th>
              <th className="text-right p-3 font-medium">Debit</th>
              <th className="text-right p-3 font-medium">Credit</th>
              {showComparisons && (
                <>
                  <th className="text-right p-3 font-medium">Prior Year</th>
                  <th className="text-right p-3 font-medium">Variance</th>
                </>
              )}
              <th className="text-center p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedTrialBalance).map(([groupName, accounts]) => {
              const groupTotals = calculateGroupTotals(accounts)
              const isExpanded = expandedGroups.includes(groupName)
              
              return (
                <React.Fragment key={groupName}>
                  <tr 
                    className="border-b bg-blue-50 cursor-pointer hover:bg-blue-100"
                    onClick={() => toggleGroup(groupName)}
                  >
                    <td className="p-3 font-semibold" colSpan={showComparisons ? 7 : 5}>
                      <div className="flex items-center justify-between">
                        <span>{groupName}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">
                            Dr: £{groupTotals.debit.toLocaleString()} | 
                            Cr: £{groupTotals.credit.toLocaleString()}
                          </span>
                          <span className="text-xs">
                            {isExpanded ? '▼' : '▶'}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && accounts.map((account) => (
                    <tr key={account.code} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-mono text-sm">{account.code}</td>
                      <td className="p-3">{account.account}</td>
                      <td className="p-3 text-right font-mono">
                        {account.debit > 0 ? `£${account.debit.toLocaleString()}` : '-'}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {account.credit > 0 ? `£${account.credit.toLocaleString()}` : '-'}
                      </td>
                      {showComparisons && (
                        <>
                          <td className="p-3 text-right font-mono text-gray-600">
                            £{(account.debit - account.credit).toLocaleString()}
                          </td>
                          <td className="p-3 text-right font-mono">
                            <span className={account.debit > account.credit ? 'text-green-600' : 'text-red-600'}>
                              {account.debit > account.credit ? '+' : ''}
                              £{Math.abs(account.debit - account.credit).toLocaleString()}
                            </span>
                          </td>
                        </>
                      )}
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Balance Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Debits:</span>
                <span className="font-mono">£{trialBalanceData.reduce((sum, acc) => sum + acc.debit, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Credits:</span>
                <span className="font-mono">£{trialBalanceData.reduce((sum, acc) => sum + acc.credit, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Difference:</span>
                <span className="font-mono font-semibold text-green-600">£0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Key Ratios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Current Ratio:</span>
                <span className="font-semibold">1.8:1</span>
              </div>
              <div className="flex justify-between">
                <span>Quick Ratio:</span>
                <span className="font-semibold">1.2:1</span>
              </div>
              <div className="flex justify-between">
                <span>Debt to Equity:</span>
                <span className="font-semibold">0.68:1</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiInsights.slice(0, 2).map((insight, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-2">
                    {insight.type === 'warning' && <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />}
                    {insight.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />}
                    {insight.type === 'info' && <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5" />}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{insight.message}</p>
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

  const renderAdjustmentsContent = () => (
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
              <Badge className="bg-brisk-primary-50 text-brisk-primary">Pending</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStatementsContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Financial Statements</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profit & Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generate P&L</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Balance Sheet</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generate BS</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generate CF</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderConsolidationContent = () => (
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
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Test</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderReportsContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Advanced Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Management Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generate Report</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Variance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generate Report</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cash Flow Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generate Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderIXBRLContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">iXBRL Generation</h3>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tagging Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Primary Statements:</span>
                <Badge className="bg-green-100 text-green-800">Complete</Badge>
              </div>
              <div className="flex justify-between">
                <span>Notes:</span>
                <Badge className="bg-brisk-primary-50 text-brisk-primary">In Progress</Badge>
              </div>
              <div className="flex justify-between">
                <span>Validation:</span>
                <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button className="w-full">Generate iXBRL</Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Accounts Production</h1>
          <p className="text-gray-600">Comprehensive financial statement preparation and analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  </div>
                  <div className={`text-sm font-medium ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Financial Data Management</CardTitle>
                <CardDescription>
                  Manage trial balances, adjustments, and financial statement preparation
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import TB
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="trial-balance" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-6">
                  {renderTabContent(tab.id)}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
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
    </div>
  )
}

export default AccountsProduction

import { 
  CreditCard, 
  Receipt, 
  TrendingUp, 
  AlertTriangle,
  Download,
  Upload,
  Eye,
  Edit,
  Filter,
  Search,
  Brain,
  Settings,
  Link,
  FileText,
  Calculator,
  PoundSterling,
  BarChart3,
  Zap
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout from '@/components/ResponsiveLayout'

export default function Bookkeeping() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedAccount, setSelectedAccount] = useState('')

  const kpis = [
    {
      title: 'Bank Balance',
      value: '£45,230',
      change: '+£2,340 this week',
      icon: CreditCard,
      color: 'text-blue-600'
    },
    {
      title: 'Unreconciled',
      value: '23',
      change: 'Transactions pending',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      title: 'VAT Due',
      value: '£8,450',
      change: 'Due in 12 days',
      icon: Receipt,
      color: 'text-red-600'
    },
    {
      title: 'Monthly Profit',
      value: '£12,680',
      change: '+18% vs last month',
      icon: TrendingUp,
      color: 'text-green-600'
    }
  ]

  const bankAccounts = [
    {
      id: 'BA001',
      name: 'Current Account',
      bank: 'Barclays',
      number: '****1234',
      balance: '£45,230.50',
      status: 'Connected',
      lastSync: '2024-01-20 16:30',
      unreconciled: 5
    },
    {
      id: 'BA002',
      name: 'Savings Account',
      bank: 'HSBC',
      number: '****5678',
      balance: '£25,000.00',
      status: 'Connected',
      lastSync: '2024-01-20 16:25',
      unreconciled: 0
    },
    {
      id: 'BA003',
      name: 'Business Credit Card',
      bank: 'Santander',
      number: '****9012',
      balance: '-£3,450.25',
      status: 'Syncing',
      lastSync: '2024-01-20 15:45',
      unreconciled: 8
    }
  ]

  const transactions = [
    {
      id: 'T001',
      date: '2024-01-20',
      description: 'Office Supplies Ltd',
      amount: '-£234.50',
      category: 'Office Expenses',
      status: 'Categorized',
      account: 'Current Account',
      vatRate: '20%'
    },
    {
      id: 'T002',
      date: '2024-01-19',
      description: 'Client Payment - ABC Corp',
      amount: '+£5,000.00',
      category: 'Sales',
      status: 'Reconciled',
      account: 'Current Account',
      vatRate: '20%'
    },
    {
      id: 'T003',
      date: '2024-01-18',
      description: 'Fuel Station',
      amount: '-£85.60',
      category: 'Travel',
      status: 'Pending Review',
      account: 'Business Credit Card',
      vatRate: '20%'
    }
  ]

  const vatReturns = [
    {
      id: 'VAT001',
      period: 'Q4 2024',
      dueDate: '2024-02-07',
      status: 'In Progress',
      vatDue: '£8,450.25',
      salesVat: '£12,340.50',
      purchaseVat: '£3,890.25',
      progress: 75
    },
    {
      id: 'VAT002',
      period: 'Q3 2024',
      dueDate: '2024-11-07',
      status: 'Submitted',
      vatDue: '£6,230.75',
      salesVat: '£9,850.00',
      purchaseVat: '£3,619.25',
      progress: 100
    }
  ]


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected':
      case 'Reconciled':
      case 'Submitted':
        return 'text-green-600 bg-green-50'
      case 'Syncing':
      case 'In Progress':
      case 'Categorized':
        return 'text-yellow-600 bg-yellow-50'
      case 'Pending Review':
      case 'Overdue':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-blue-600 bg-blue-50'
    }
  }

  return (
    <ResponsiveLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Bookkeeping</h1>
            <p className="text-gray-600">Bank feeds, VAT MTD, reconciliation & management accounts</p>
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-5'}`}>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="banking">Banking</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="vat">VAT Returns</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              {kpis.map((kpi, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                        <p className="text-2xl font-bold">{kpi.value}</p>
                        <p className="text-xs text-gray-500">{kpi.change}</p>
                      </div>
                      <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest bank feed transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{transaction.description}</p>
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{transaction.date} | {transaction.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount}
                          </span>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bank Account Status</CardTitle>
                  <CardDescription>Connected accounts overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bankAccounts.map((account) => (
                      <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{account.name}</p>
                            <Badge className={getStatusColor(account.status)}>
                              {account.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{account.bank} {account.number}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{account.balance}</p>
                          <p className="text-xs text-gray-500">{account.unreconciled} unreconciled</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-brisk-primary" />
                  Bookkeeping AI Insights
                </CardTitle>
                <CardDescription>Intelligent categorization and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Smart Categorization</h3>
                    <p className="text-sm text-blue-700">23 transactions auto-categorized this week with 98% accuracy. Review suggested categories for 3 pending items.</p>
                    <Button size="sm" className="mt-2">Review Categories</Button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900">VAT Optimization</h3>
                    <p className="text-sm text-green-700">Potential VAT savings of £450 identified through expense categorization improvements.</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h3 className="font-semibold text-orange-900">Cash Flow Alert</h3>
                    <p className="text-sm text-orange-700">Large payment due next week may impact cash flow. Consider payment scheduling options.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="banking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bank Account Management</CardTitle>
                <CardDescription>Connect and manage bank feeds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bankAccounts.map((account) => (
                    <Card key={account.id} className="border-l-4 border-l-brisk-primary">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{account.name}</h3>
                              <Badge className={getStatusColor(account.status)}>
                                {account.status}
                              </Badge>
                              <Badge variant="outline">{account.bank}</Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                              <span>Balance: {account.balance}</span>
                              <span>Account: {account.number}</span>
                              <span>Unreconciled: {account.unreconciled}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Last sync: {account.lastSync}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Zap className="h-4 w-4 mr-2" />
                              Sync Now
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-2" />
                              Settings
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Connect New Bank</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                        <CardContent className="p-6 text-center">
                          <CreditCard className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">Open Banking</h3>
                          <p className="text-sm text-gray-600 mb-3">Secure bank connection via Open Banking</p>
                          <Button size="sm" variant="outline">Connect</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                        <CardContent className="p-6 text-center">
                          <Upload className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">CSV Import</h3>
                          <p className="text-sm text-gray-600 mb-3">Upload bank statements manually</p>
                          <Button size="sm" variant="outline">Import</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                        <CardContent className="p-6 text-center">
                          <Link className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">API Integration</h3>
                          <p className="text-sm text-gray-600 mb-3">Connect via banking API</p>
                          <Button size="sm" variant="outline">Setup</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Management</CardTitle>
                <CardDescription>Review and categorize transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Input placeholder="Search transactions..." className="flex-1" />
                  <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Accounts</SelectItem>
                      <SelectItem value="current">Current Account</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <Card key={transaction.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{transaction.description}</h3>
                              <Badge className={getStatusColor(transaction.status)}>
                                {transaction.status}
                              </Badge>
                              <Badge variant="outline">{transaction.category}</Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                              <span>Date: {transaction.date}</span>
                              <span>Account: {transaction.account}</span>
                              <span>VAT: {transaction.vatRate}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`text-lg font-bold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                              {transaction.amount}
                            </span>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>VAT Returns Management</CardTitle>
                <CardDescription>Making Tax Digital (MTD) compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vatReturns.map((vatReturn) => (
                    <Card key={vatReturn.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{vatReturn.period}</h3>
                              <Badge className={getStatusColor(vatReturn.status)}>
                                {vatReturn.status}
                              </Badge>
                              <Badge variant="outline">Due: {vatReturn.dueDate}</Badge>
                            </div>
                            <div className="mb-2">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-gray-600">Progress:</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-brisk-primary h-2 rounded-full" 
                                    style={{ width: `${vatReturn.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{vatReturn.progress}%</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                              <span>VAT Due: {vatReturn.vatDue}</span>
                              <span>Sales VAT: {vatReturn.salesVat}</span>
                              <span>Purchase VAT: {vatReturn.purchaseVat}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Calculator className="h-4 w-4 mr-2" />
                              Calculate
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                            <Button size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Submit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Management Reports</CardTitle>
                <CardDescription>Financial reports and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">P&L Report</h3>
                      <p className="text-sm text-gray-600 mb-3">Profit and loss statement</p>
                      <Button size="sm" variant="outline">Generate</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <PoundSterling className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Cash Flow</h3>
                      <p className="text-sm text-gray-600 mb-3">Cash flow forecast</p>
                      <Button size="sm" variant="outline">Generate</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <FileText className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Balance Sheet</h3>
                      <p className="text-sm text-gray-600 mb-3">Assets and liabilities</p>
                      <Button size="sm" variant="outline">Generate</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">KPI Dashboard</h3>
                      <p className="text-sm text-gray-600 mb-3">Key performance indicators</p>
                      <Button size="sm" variant="outline">View</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <Receipt className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">VAT Analysis</h3>
                      <p className="text-sm text-gray-600 mb-3">VAT breakdown and analysis</p>
                      <Button size="sm" variant="outline">Generate</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <Download className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Custom Report</h3>
                      <p className="text-sm text-gray-600 mb-3">Build custom reports</p>
                      <Button size="sm" variant="outline">Create</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ResponsiveLayout>
  )
}

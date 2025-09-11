import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useIsMobile } from '@/hooks/use-mobile'
import { 
  Building2, 
  Users, 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  PoundSterling,
  Shield,
  Download,
  Filter,
  Plus,
  Edit,
  Eye,
  Target,
  BarChart3,
  PieChart,
  Lightbulb,
  Zap
} from 'lucide-react'

interface CharityAccount {
  id: string
  name: string
  registrationNumber: string
  type: 'charity' | 'academy' | 'trust'
  status: 'active' | 'dormant' | 'pending'
  yearEnd: string
  totalIncome: number
  totalExpenditure: number
  netAssets: number
  funds: {
    unrestricted: number
    restricted: number
    endowment: number
  }
  trustees: number
  lastFiling: string
  nextDue: string
  complianceScore: number
}

interface Fund {
  id: string
  name: string
  type: 'unrestricted' | 'restricted' | 'endowment'
  balance: number
  purpose: string
  restrictions: string
  movements: FundMovement[]
}

interface FundMovement {
  id: string
  date: string
  description: string
  amount: number
  type: 'income' | 'expenditure' | 'transfer'
  reference: string
}

interface Trustee {
  id: string
  name: string
  role: string
  appointmentDate: string
  resignationDate?: string
  status: 'active' | 'resigned'
  address: string
  occupation: string
  otherTrusteeships: string[]
}

interface SofaEntry {
  id: string
  category: string
  subcategory: string
  unrestricted: number
  restricted: number
  endowment: number
  total: number
  priorYear: number
}

const CharityAccounts: React.FC = () => {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')

  const [charities] = useState<CharityAccount[]>([
    {
      id: '1',
      name: 'St. Mary\'s Primary Academy',
      registrationNumber: '1234567',
      type: 'academy',
      status: 'active',
      yearEnd: '2024-08-31',
      totalIncome: 2450000,
      totalExpenditure: 2380000,
      netAssets: 1850000,
      funds: {
        unrestricted: 125000,
        restricted: 1650000,
        endowment: 75000
      },
      trustees: 8,
      lastFiling: '2024-01-15',
      nextDue: '2025-01-31',
      complianceScore: 95
    },
    {
      id: '2',
      name: 'Community Support Foundation',
      registrationNumber: '2345678',
      type: 'charity',
      status: 'active',
      yearEnd: '2024-03-31',
      totalIncome: 850000,
      totalExpenditure: 780000,
      netAssets: 420000,
      funds: {
        unrestricted: 180000,
        restricted: 220000,
        endowment: 20000
      },
      trustees: 6,
      lastFiling: '2024-06-30',
      nextDue: '2024-12-31',
      complianceScore: 88
    }
  ])

  const [funds] = useState<Fund[]>([
    {
      id: '1',
      name: 'General Fund',
      type: 'unrestricted',
      balance: 125000,
      purpose: 'General charitable activities',
      restrictions: 'None',
      movements: [
        {
          id: '1',
          date: '2024-09-01',
          description: 'Donation received',
          amount: 5000,
          type: 'income',
          reference: 'DON001'
        },
        {
          id: '2',
          date: '2024-09-05',
          description: 'Program expenses',
          amount: -2500,
          type: 'expenditure',
          reference: 'EXP001'
        }
      ]
    },
    {
      id: '2',
      name: 'Building Fund',
      type: 'restricted',
      balance: 1650000,
      purpose: 'School building maintenance and improvements',
      restrictions: 'Can only be used for capital expenditure on buildings',
      movements: [
        {
          id: '3',
          date: '2024-08-15',
          description: 'Government grant',
          amount: 500000,
          type: 'income',
          reference: 'GRA001'
        }
      ]
    }
  ])

  const [trustees] = useState<Trustee[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Chair of Trustees',
      appointmentDate: '2020-09-01',
      status: 'active',
      address: '123 High Street, London, SW1A 1AA',
      occupation: 'Retired Headteacher',
      otherTrusteeships: ['Local Education Trust']
    },
    {
      id: '2',
      name: 'Michael Brown',
      role: 'Treasurer',
      appointmentDate: '2021-01-15',
      status: 'active',
      address: '456 Oak Avenue, London, SW2B 2BB',
      occupation: 'Chartered Accountant',
      otherTrusteeships: []
    }
  ])

  const [sofaData] = useState<SofaEntry[]>([
    {
      id: '1',
      category: 'Income',
      subcategory: 'Donations and legacies',
      unrestricted: 45000,
      restricted: 25000,
      endowment: 5000,
      total: 75000,
      priorYear: 68000
    },
    {
      id: '2',
      category: 'Income',
      subcategory: 'Charitable activities',
      unrestricted: 180000,
      restricted: 520000,
      endowment: 0,
      total: 700000,
      priorYear: 650000
    },
    {
      id: '3',
      category: 'Expenditure',
      subcategory: 'Charitable activities',
      unrestricted: 195000,
      restricted: 485000,
      endowment: 0,
      total: 680000,
      priorYear: 625000
    }
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'dormant': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  const filteredCharities = charities.filter(charity =>
    charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    charity.registrationNumber.includes(searchTerm)
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Charity & Academy Accounts</h1>
            <p className="text-gray-600">SORP compliance, fund accounting, and trustee management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Charity
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Charities</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{charities.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(charities.reduce((sum, c) => sum + c.totalIncome, 0))}
              </div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Assets</CardTitle>
              <PoundSterling className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(charities.reduce((sum, c) => sum + c.netAssets, 0))}
              </div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Compliance</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(charities.reduce((sum, c) => sum + c.complianceScore, 0) / charities.length)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Excellent rating
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-8'}`}>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="funds">Fund Accounting</TabsTrigger>
            <TabsTrigger value="sofa">SOFA</TabsTrigger>
            <TabsTrigger value="trustees">Trustees</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="grants">Grants</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>Charity Portfolio</CardTitle>
                <CardDescription>Manage your charity and academy accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search charities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>

                {/* Charity List */}
                <div className="space-y-4">
                  {filteredCharities.map((charity) => (
                    <Card key={charity.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{charity.name}</h3>
                              <Badge className={getStatusColor(charity.status)}>
                                {charity.status}
                              </Badge>
                              <Badge variant="outline">
                                {charity.type}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Reg No:</span> {charity.registrationNumber}
                              </div>
                              <div>
                                <span className="font-medium">Year End:</span> {charity.yearEnd}
                              </div>
                              <div>
                                <span className="font-medium">Income:</span> {formatCurrency(charity.totalIncome)}
                              </div>
                              <div>
                                <span className="font-medium">Net Assets:</span> {formatCurrency(charity.netAssets)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <div className={`text-sm font-medium ${getComplianceColor(charity.complianceScore)}`}>
                                {charity.complianceScore}% Compliance
                              </div>
                              <div className="text-xs text-gray-500">
                                Next due: {charity.nextDue}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
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

          <TabsContent value="funds" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Fund Accounting</CardTitle>
                    <CardDescription>Manage unrestricted, restricted, and endowment funds</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Fund
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Fund Summary */}
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Unrestricted Funds</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(funds.filter(f => f.type === 'unrestricted').reduce((sum, f) => sum + f.balance, 0))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Restricted Funds</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(funds.filter(f => f.type === 'restricted').reduce((sum, f) => sum + f.balance, 0))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Endowment Funds</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">
                        {formatCurrency(funds.filter(f => f.type === 'endowment').reduce((sum, f) => sum + f.balance, 0))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Fund Details */}
                <div className="space-y-4">
                  {funds.map((fund) => (
                    <Card key={fund.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{fund.name}</CardTitle>
                            <CardDescription>{fund.purpose}</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">{formatCurrency(fund.balance)}</div>
                            <Badge variant="outline">{fund.type}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <Label className="text-sm font-medium">Restrictions:</Label>
                          <p className="text-sm text-gray-600">{fund.restrictions}</p>
                        </div>
                        
                        {/* Recent Movements */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Recent Movements:</Label>
                          <div className="space-y-2">
                            {fund.movements.slice(0, 3).map((movement) => (
                              <div key={movement.id} className="flex items-center justify-between text-sm">
                                <div>
                                  <span className="font-medium">{movement.description}</span>
                                  <span className="text-gray-500 ml-2">({movement.reference})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500">{movement.date}</span>
                                  <span className={`font-medium ${movement.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatCurrency(Math.abs(movement.amount))}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sofa" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Statement of Financial Activities (SOFA)</CardTitle>
                    <CardDescription>SORP-compliant financial reporting</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Entry
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Category</th>
                        <th className="text-right p-2">Unrestricted</th>
                        <th className="text-right p-2">Restricted</th>
                        <th className="text-right p-2">Endowment</th>
                        <th className="text-right p-2">Total 2024</th>
                        <th className="text-right p-2">Total 2023</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sofaData.map((entry) => (
                        <tr key={entry.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">
                            <div>
                              <div className="font-medium">{entry.category}</div>
                              <div className="text-sm text-gray-600">{entry.subcategory}</div>
                            </div>
                          </td>
                          <td className="text-right p-2">{formatCurrency(entry.unrestricted)}</td>
                          <td className="text-right p-2">{formatCurrency(entry.restricted)}</td>
                          <td className="text-right p-2">{formatCurrency(entry.endowment)}</td>
                          <td className="text-right p-2 font-medium">{formatCurrency(entry.total)}</td>
                          <td className="text-right p-2 text-gray-600">{formatCurrency(entry.priorYear)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trustees" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Trustee Management</CardTitle>
                    <CardDescription>Manage trustee appointments and records</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Trustee
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trustees.map((trustee) => (
                    <Card key={trustee.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{trustee.name}</h3>
                              <Badge className={trustee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {trustee.status}
                              </Badge>
                            </div>
                            <div className="grid gap-2 text-sm text-gray-600">
                              <div><span className="font-medium">Role:</span> {trustee.role}</div>
                              <div><span className="font-medium">Appointed:</span> {trustee.appointmentDate}</div>
                              <div><span className="font-medium">Occupation:</span> {trustee.occupation}</div>
                              <div><span className="font-medium">Address:</span> {trustee.address}</div>
                              {trustee.otherTrusteeships.length > 0 && (
                                <div><span className="font-medium">Other Trusteeships:</span> {trustee.otherTrusteeships.join(', ')}</div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
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

          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SORP Compliance Dashboard</CardTitle>
                <CardDescription>Monitor compliance with charity accounting standards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Compliance Checklist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Annual Return Filed</span>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Accounts Submitted</span>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Trustee Declarations</span>
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Public Benefit Statement</span>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Risk Management</span>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Filing Deadlines</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">Annual Return</div>
                            <div className="text-xs text-gray-600">St. Mary's Academy</div>
                          </div>
                          <Badge variant="outline">31 Jan 2025</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">Accounts Filing</div>
                            <div className="text-xs text-gray-600">Community Support</div>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">31 Dec 2024</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">Trustee Report</div>
                            <div className="text-xs text-gray-600">St. Mary's Academy</div>
                          </div>
                          <Badge variant="outline">31 Jan 2025</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Charity Reports</CardTitle>
                <CardDescription>Generate SORP-compliant reports and statements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">Annual Report</h3>
                          <p className="text-sm text-gray-600">Complete annual report with trustee report</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-8 w-8 text-green-600" />
                        <div>
                          <h3 className="font-semibold">SOFA Report</h3>
                          <p className="text-sm text-gray-600">Statement of Financial Activities</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <PieChart className="h-8 w-8 text-purple-600" />
                        <div>
                          <h3 className="font-semibold">Fund Analysis</h3>
                          <p className="text-sm text-gray-600">Detailed fund movement analysis</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-8 w-8 text-orange-600" />
                        <div>
                          <h3 className="font-semibold">Trustee Register</h3>
                          <p className="text-sm text-gray-600">Complete trustee information</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-8 w-8 text-red-600" />
                        <div>
                          <h3 className="font-semibold">Compliance Report</h3>
                          <p className="text-sm text-gray-600">SORP compliance status</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Target className="h-8 w-8 text-teal-600" />
                        <div>
                          <h3 className="font-semibold">Impact Report</h3>
                          <p className="text-sm text-gray-600">Charitable impact and outcomes</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Insights Panel */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <CardTitle>AI Charity Adviser</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Compliance Alert</h4>
                  <p className="text-sm text-blue-800">
                    Community Support Foundation's accounts filing deadline is approaching (31 Dec 2024). 
                    Consider scheduling the preparation process.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Fund Optimization</h4>
                  <p className="text-sm text-green-800">
                    St. Mary's Academy has significant unrestricted reserves. Consider designating funds 
                    for specific projects to improve transparency.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <Zap className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">SORP Update</h4>
                  <p className="text-sm text-yellow-800">
                    New SORP guidance on digital assets reporting. Review your cryptocurrency 
                    and digital investment disclosures.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CharityAccounts

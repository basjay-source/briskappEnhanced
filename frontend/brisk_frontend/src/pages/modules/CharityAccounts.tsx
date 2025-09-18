import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useIsMobile } from '@/hooks/use-mobile'
import KPICard from '@/components/KPICard'
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
  Plus,
  Edit,
  Eye,
  Target,
  BarChart3,
  PieChart,
  Lightbulb,
  Zap,
  Activity,
  Heart,
  FileCheck,
  ChevronDown,
  ChevronRight,
  Search,
  Gift,
  Link
} from 'lucide-react'
import AIPromptSection from '@/components/AIPromptSection'

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
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['accounts', 'reports'])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAILoading, setIsAILoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('')
  const [dateFrom, setDateFrom] = useState<Date | undefined>()
  const [dateTo, setDateTo] = useState<Date | undefined>()

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
    accounts: { 
      label: 'Charity Accounts', 
      icon: Heart, 
      hasSubTabs: true,
      subTabs: {
        fundaccounting: { label: 'Fund Accounting', icon: PoundSterling },
        sofa: { label: 'SOFA Generation', icon: FileText },
        trustees: { label: 'Trustee Management', icon: Users },
        compliance: { label: 'SORP Compliance', icon: Shield }
      }
    },
    grants: { label: 'Grants Management', icon: Gift, hasSubTabs: false },
    reports: {
      label: 'Reports & Filing',
      icon: FileCheck,
      hasSubTabs: true,
      subTabs: {
        annual: { label: 'Annual Reports', icon: FileText },
        financial: { label: 'Financial Statements', icon: BarChart3 },
        compliance: { label: 'Compliance Reports', icon: Shield },
        analytics: { label: 'Analytics & Insights', icon: PieChart }
      }
    },
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


  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-brisk-primary'
    return 'text-red-600'
  }

  const filteredCharities = charities.filter(charity =>
    charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    charity.registrationNumber.includes(searchTerm)
  )


  function renderMainContent() {
    if (activeMainTab === 'dashboard') {
      return renderDashboard()
    } else if (activeMainTab === 'accounts') {
      return renderAccountsContent()
    } else if (activeMainTab === 'grants') {
      return renderGrantsContent()
    } else if (activeMainTab === 'reports') {
      return renderReportsContent()
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
            <p className="text-black">Overview of your charity accounts</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2 text-white" />
              Export
            </Button>
            <Button>
              <Eye className="h-4 w-4 mr-2 text-white" />
              View All
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <KPICard
            title="Total Charities"
            value={charities.length.toString()}
            change="+2 this month"
            icon={Building2}
            color="text-blue-500"
            drillDownData={{
              title: "Total Charities Analysis",
              description: "Detailed breakdown of charity portfolio and registration status",
              content: (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border-brisk-navy-blue border rounded-lg">
                      <h4 className="font-semibold mb-2">Current Portfolio</h4>
                      <p className="text-2xl font-bold">{charities.length}</p>
                      <p className="text-sm text-green-600">+2 this month</p>
                    </div>
                    <div className="p-4 border-brisk-navy-blue border rounded-lg">
                      <h4 className="font-semibold mb-2">Growth Rate</h4>
                      <p className="text-sm text-black">Portfolio expansion</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Annual Growth</span>
                          <span className="text-green-600">12%</span>
                        </div>
                        <Progress value={12} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Charity Types</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 border-brisk-navy-blue border rounded">
                        <span>Registered Charities</span>
                        <span className="font-semibold">{charities.filter(c => c.type === 'charity').length}</span>
                      </div>
                      <div className="flex justify-between p-2 border-brisk-navy-blue border rounded">
                        <span>Academy Trusts</span>
                        <span className="font-semibold">{charities.filter(c => c.type === 'academy').length}</span>
                      </div>
                      <div className="flex justify-between p-2 border-brisk-navy-blue border rounded">
                        <span>Other Trusts</span>
                        <span className="font-semibold">{charities.filter(c => c.type === 'trust').length}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">Export Portfolio</Button>
                    <Button>Add New Charity</Button>
                  </div>
                </div>
              )
            }}
          />
          
          <KPICard
            title="Total Income"
            value={formatCurrency(charities.reduce((sum, c) => sum + c.totalIncome, 0))}
            change="+15% vs last year"
            icon={TrendingUp}
            color="text-green-500"
            drillDownData={{
              title: "Total Income Analysis",
              description: "Detailed breakdown of charity income sources and trends",
              content: (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border-brisk-navy-blue border rounded-lg">
                      <h4 className="font-semibold mb-2">Total Income</h4>
                      <p className="text-2xl font-bold">{formatCurrency(charities.reduce((sum, c) => sum + c.totalIncome, 0))}</p>
                      <p className="text-sm text-green-600">+15% vs last year</p>
                    </div>
                    <div className="p-4 border-brisk-navy-blue border rounded-lg">
                      <h4 className="font-semibold mb-2">Income Growth</h4>
                      <p className="text-sm text-black">Year-over-year growth</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Growth Rate</span>
                          <span className="text-green-600">15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Income Sources</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 border-brisk-navy-blue border rounded">
                        <span>Donations & Grants</span>
                        <Badge variant="default">£2.1M (65%)</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 border-brisk-navy-blue border rounded">
                        <span>Trading Activities</span>
                        <Badge variant="secondary">£850K (26%)</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 border-brisk-navy-blue border rounded">
                        <span>Investment Income</span>
                        <Badge variant="outline">£290K (9%)</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">Export Income Report</Button>
                    <Button>Generate SOFA</Button>
                  </div>
                </div>
              )
            }}
          />
          
          <KPICard
            title="Net Assets"
            value={formatCurrency(charities.reduce((sum, c) => sum + c.netAssets, 0))}
            change="Stable"
            icon={PoundSterling}
            color="text-blue-500"
            drillDownData={{
              title: "Net Assets Analysis",
              description: "Detailed breakdown of charity assets and fund allocation",
              content: (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border-brisk-navy-blue border rounded-lg">
                      <h4 className="font-semibold mb-2">Total Net Assets</h4>
                      <p className="text-2xl font-bold">{formatCurrency(charities.reduce((sum, c) => sum + c.netAssets, 0))}</p>
                      <p className="text-sm text-blue-600">Stable</p>
                    </div>
                    <div className="p-4 border-brisk-navy-blue border rounded-lg">
                      <h4 className="font-semibold mb-2">Asset Utilization</h4>
                      <p className="text-sm text-black">Efficiency ratio</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Utilization Rate</span>
                          <span className="text-blue-600">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Fund Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 border-brisk-navy-blue border rounded">
                        <span>Unrestricted Funds</span>
                        <span className="font-semibold">£4.2M</span>
                      </div>
                      <div className="flex justify-between p-2 border-brisk-navy-blue border rounded">
                        <span>Restricted Funds</span>
                        <span className="font-semibold">£2.8M</span>
                      </div>
                      <div className="flex justify-between p-2 border-brisk-navy-blue border rounded">
                        <span>Endowment Funds</span>
                        <span className="font-semibold">£1.5M</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">Export Balance Sheet</Button>
                    <Button>Fund Analysis</Button>
                  </div>
                </div>
              )
            }}
          />
          
          <KPICard
            title="Compliance Score"
            value={`${Math.round(charities.reduce((sum, c) => sum + c.complianceScore, 0) / charities.length)}%`}
            change="Excellent"
            icon={Shield}
            color="text-green-500"
            drillDownData={{
              title: "Compliance Score Analysis",
              description: "Detailed breakdown of charity compliance and regulatory status",
              content: (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border-brisk-navy-blue border rounded-lg">
                      <h4 className="font-semibold mb-2">Overall Score</h4>
                      <p className="text-2xl font-bold">{Math.round(charities.reduce((sum, c) => sum + c.complianceScore, 0) / charities.length)}%</p>
                      <p className="text-sm text-green-600">Excellent</p>
                    </div>
                    <div className="p-4 border-brisk-navy-blue border rounded-lg">
                      <h4 className="font-semibold mb-2">Compliance Trend</h4>
                      <p className="text-sm text-black">6-month improvement</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Improvement</span>
                          <span className="text-green-600">+8%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Compliance Areas</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 border-brisk-navy-blue border rounded">
                        <span>Annual Returns</span>
                        <Badge variant="default">100% Complete</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 border-brisk-navy-blue border rounded">
                        <span>Trustee Updates</span>
                        <Badge variant="secondary">95% Complete</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 border-brisk-navy-blue border rounded">
                        <span>Financial Reporting</span>
                        <Badge variant="outline">92% Complete</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline">Export Compliance Report</Button>
                    <Button>Review Actions</Button>
                  </div>
                </div>
              )
            }}
          />
        </div>

        {/* Charity Portfolio and AI Adviser */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-white" />
                Charity Portfolio
              </CardTitle>
              <CardDescription>Search and manage your charity accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Search charities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
                <div className="space-y-3">
                  {filteredCharities.map((charity) => (
                    <div key={charity.id} className="flex items-center justify-between p-3 border-brisk-navy-blue border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{charity.name}</h4>
                          <Badge variant={charity.status === 'active' ? 'default' : 'secondary'}>
                            {charity.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-black">Reg: {charity.registrationNumber}</p>
                        <p className="text-sm text-black">Year End: {charity.yearEnd}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(charity.totalIncome)}</p>
                        <p className="text-sm text-black">Income</p>
                        <Badge className={getComplianceColor(charity.complianceScore)}>
                          {charity.complianceScore}% Compliant
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-white" />
                AI Charity Adviser
              </CardTitle>
              <CardDescription>Intelligent insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-brisk-navy-blue">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-white mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Upcoming Deadline</h4>
                      <p className="text-sm text-blue-700">
                        Annual return for Hope Foundation due in 14 days
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-brisk-navy-blue">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-white mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Fund Optimization</h4>
                      <p className="text-sm text-green-700">
                        Consider transferring £15,000 from general fund to building maintenance reserve
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-brisk-navy-blue">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-white mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-900">SORP Update</h4>
                      <p className="text-sm text-orange-700">
                        New guidance on volunteer time valuation available - review impact on accounts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderAccountsContent() {
    if (activeSubTab === 'fundaccounting') {
      return renderFundAccountingContent()
    } else if (activeSubTab === 'sofa') {
      return renderSofaContent()
    } else if (activeSubTab === 'trustees') {
      return renderTrusteesContent()
    } else if (activeSubTab === 'compliance') {
      return renderComplianceContent()
    }
    return renderFundAccountingContent()
  }

  function renderFundAccountingContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Fund Accounting</h2>
            <p className="text-black">Manage unrestricted, restricted, and endowment funds</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2 text-white" />
              Add Fund
            </Button>
            <Button>
              <Eye className="h-4 w-4 mr-2 text-white" />
              View Report
            </Button>
          </div>
        </div>

        {/* Fund Types */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PoundSterling className="h-5 w-5 text-white" />
                Unrestricted Funds
              </CardTitle>
              <CardDescription>General charitable activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funds.filter(f => f.type === 'unrestricted').map((fund) => (
                  <div key={fund.id} className="p-3 border-brisk-navy-blue border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{fund.name}</h4>
                      <span className="font-semibold text-green-600">{formatCurrency(fund.balance)}</span>
                    </div>
                    <p className="text-sm text-black mt-1">{fund.purpose}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-white" />
                Restricted Funds
              </CardTitle>
              <CardDescription>Specific purposes or restrictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funds.filter(f => f.type === 'restricted').map((fund) => (
                  <div key={fund.id} className="p-3 border-brisk-navy-blue border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{fund.name}</h4>
                      <span className="font-semibold text-blue-600">{formatCurrency(fund.balance)}</span>
                    </div>
                    <p className="text-sm text-black mt-1">{fund.purpose}</p>
                    <p className="text-xs text-red-600 mt-1">Restrictions: {fund.restrictions}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-white" />
                Endowment Funds
              </CardTitle>
              <CardDescription>Permanent funds - income only</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funds.filter(f => f.type === 'endowment').map((fund) => (
                  <div key={fund.id} className="p-3 border-brisk-navy-blue border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{fund.name}</h4>
                      <span className="font-semibold text-purple-600">{formatCurrency(fund.balance)}</span>
                    </div>
                    <p className="text-sm text-black mt-1">{fund.purpose}</p>
                    <p className="text-xs text-purple-600 mt-1">Capital preserved</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderSofaContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Statement of Financial Activities (SOFA)</h2>
            <p className="text-black">SORP-compliant financial statement</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2 text-white" />
              Export SOFA
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2 text-white" />
              Generate Report
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-brisk-navy-blue border">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border-brisk-navy-blue border p-3 text-left">Category</th>
                    <th className="border-brisk-navy-blue border p-3 text-right">Unrestricted</th>
                    <th className="border-brisk-navy-blue border p-3 text-right">Restricted</th>
                    <th className="border-brisk-navy-blue border p-3 text-right">Endowment</th>
                    <th className="border-brisk-navy-blue border p-3 text-right">Total 2024</th>
                    <th className="border-brisk-navy-blue border p-3 text-right">Total 2023</th>
                  </tr>
                </thead>
                <tbody>
                  {sofaData.map((entry) => (
                    <tr key={entry.id}>
                      <td className="border-brisk-navy-blue border p-3">{entry.subcategory}</td>
                      <td className="border-brisk-navy-blue border p-3 text-right">{formatCurrency(entry.unrestricted)}</td>
                      <td className="border-brisk-navy-blue border p-3 text-right">{formatCurrency(entry.restricted)}</td>
                      <td className="border-brisk-navy-blue border p-3 text-right">{formatCurrency(entry.endowment)}</td>
                      <td className="border-brisk-navy-blue border p-3 text-right font-semibold">{formatCurrency(entry.total)}</td>
                      <td className="border-brisk-navy-blue border p-3 text-right">{formatCurrency(entry.priorYear)}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderTrusteesContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Trustee Management</h2>
            <p className="text-black">Manage trustee appointments and records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2 text-white" />
              Add Trustee
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2 text-white" />
              Export Register
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {trustees.map((trustee) => (
                <div key={trustee.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{trustee.name}</h4>
                        <Badge variant={trustee.status === 'active' ? 'default' : 'secondary'}>
                          {trustee.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-black mt-1">{trustee.role}</p>
                      <p className="text-sm text-black">Appointed: {trustee.appointmentDate}</p>
                      <p className="text-sm text-black mt-2">{trustee.occupation}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 text-white" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 text-white" />
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

  function renderComplianceContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">SORP Compliance</h2>
            <p className="text-black">Ensure compliance with charity accounting standards</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Trustee Annual Report</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Public Benefit Statement</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <span>Risk Management Policy</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Filing Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-red-900">Annual Return</p>
                      <p className="text-sm text-red-700">Hope Foundation</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">14 days</Badge>
                  </div>
                </div>
                <div className="p-3 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-orange-900">Accounts Filing</p>
                      <p className="text-sm text-orange-700">Community Trust</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">45 days</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderGrantsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Grants Management</h2>
            <p className="text-black">Track and manage grant applications</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2 text-white" />
              Add Grant
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-black mb-2">Grants Management</h3>
              <p className="text-black mb-4">
                Comprehensive grant tracking system
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2 text-white" />
                Add Grant Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderReportsContent() {
    if (activeSubTab === 'annual') {
      return renderAnnualReportsContent()
    } else if (activeSubTab === 'financial') {
      return renderFinancialReportsContent()
    } else if (activeSubTab === 'compliance') {
      return renderComplianceReportsContent()
    } else if (activeSubTab === 'analytics') {
      return renderAnalyticsContent()
    }
    return renderAnnualReportsContent()
  }

  function renderAnnualReportsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Annual Reports</h2>
            <p className="text-black">Generate comprehensive annual reports</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Trustee Annual Report</h3>
              <p className="text-sm text-black mb-3">Comprehensive annual report</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Public Benefit Report</h3>
              <p className="text-sm text-black mb-3">Public benefit statement</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Impact Assessment</h3>
              <p className="text-sm text-black mb-3">Social return analysis</p>
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

  function renderFinancialReportsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Financial Reports</h2>
            <p className="text-black">Financial statements and analysis</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">SOFA Report</h3>
              <p className="text-sm text-black mb-3">Statement of Financial Activities</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <PieChart className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Balance Sheet</h3>
              <p className="text-sm text-black mb-3">Assets, liabilities & funds</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Cash Flow Statement</h3>
              <p className="text-sm text-black mb-3">Operating & financing activities</p>
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

  function renderComplianceReportsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Compliance Reports</h2>
            <p className="text-black">SORP compliance and regulatory reports</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">SORP Compliance</h3>
              <p className="text-sm text-black mb-3">Full SORP compliance report</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Trustee Register</h3>
              <p className="text-sm text-black mb-3">Complete trustee information</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">Generate</Button>
                <Button size="sm">Schedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Risk Assessment</h3>
              <p className="text-sm text-black mb-3">Risk management report</p>
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

  function renderAnalyticsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>
            <p className="text-black">Performance analytics and benchmarking</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Performance Dashboard</h3>
              <p className="text-sm text-black mb-3">Key performance indicators</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">View</Button>
                <Button size="sm">Export</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <PieChart className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Sector Benchmarking</h3>
              <p className="text-sm text-black mb-3">Compare against sector averages</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">View</Button>
                <Button size="sm">Export</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Trend Analysis</h3>
              <p className="text-sm text-black mb-3">Multi-year trend analysis</p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline">View</Button>
                <Button size="sm">Export</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function renderIntegrationsContent() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Integrations</h2>
            <p className="text-black">Connect with external systems</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Link className="h-4 w-4 mr-2 text-white" />
              Add Integration
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <Link className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">System Integrations</h3>
              <p className="text-gray-600 mb-4">
                Connect with Charity Commission API and other platforms
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2 text-white" />
                Add Integration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-brisk-navy-blue flex flex-col">
        <div className="p-4 border-b border-brisk-navy-blue">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="h-6 w-6 text-brisk-primary" />
            Charity & Academy Accounts
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {Object.entries(menuStructure).map(([categoryKey, category]) => (
            <div key={categoryKey}>
              <button
                onClick={() => toggleCategory(categoryKey)}
                className="w-full flex items-center justify-between p-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <category.icon className="h-4 w-4 text-white" />
                  {category.label}
                </div>
                {expandedCategories.includes(categoryKey) ? (
                  <ChevronDown className="h-4 w-4 text-white" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-white" />
                )}
              </button>
              
              {expandedCategories.includes(categoryKey) && category.subTabs && (
                <div className="ml-6 mt-1 space-y-1">
                  {Object.entries(category.subTabs).map(([subKey, subTab]) => (
                    <button
                      key={subKey}
                      onClick={() => {
                        handleSubTabClick(categoryKey, subKey)
                      }}
                      className={`w-full text-left p-2 text-sm rounded-md transition-colors ${
                        activeMainTab === categoryKey && activeSubTab === subKey
                          ? 'bg-brisk-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {subTab.label}
                    </button>
                  ))}
                </div>
              )}
              
              {!category.subTabs && (
                <div className="ml-6 mt-1">
                  <button
                    onClick={() => handleMainTabClick(categoryKey)}
                    className={`w-full text-left p-2 text-sm rounded-md transition-colors ${
                      activeMainTab === categoryKey
                        ? 'bg-brisk-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    View {category.label}
                  </button>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderMainContent()}
        </div>
        
        <AIPromptSection
          title="Ask your Charity Accountant"
          description="Get expert charity accounting guidance on SORP, trustees, charity commission regulations, and fund management"
          placeholder="Ask about SORP requirements, trustees, charity commission, grants and donations, restricted/unrestricted funds, surpluses and deficits..."
          recentQuestions={[
            "What are the latest SORP requirements for charity accounts?",
            "How do we manage restricted vs unrestricted funds properly?",
            "What are the current charity commission filing requirements?",
            "How should we account for grants and donations?",
            "What trustee report sections are mandatory under SORP?",
            "How do we handle surpluses and deficits in charity accounts?"
          ]}
          onSubmit={handleAIQuestion}
          isLoading={isAILoading}
        />
      </div>
    </div>
  )
}

export default CharityAccounts

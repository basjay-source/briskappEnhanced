import { 
  Plus, 
  Calculator, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  PoundSterling,
  Users,
  Download,
  Upload,
  Brain,
  Heart,
  PiggyBank,
  Users2,
  Shield,
  Gift,
  Home,
  Banknote
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout, { ResponsiveGrid } from '@/components/ResponsiveLayout'
import AIPromptSection from '../../components/AIPromptSection'

export default function PersonalTax() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('dashboard')
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
  const [selectedClient, setSelectedClient] = useState('')

  const kpis = [
    {
      title: 'Active SA Returns',
      value: '12',
      change: '+3 from last month',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Tax Saved (YTD)',
      value: '£45,200',
      change: '+18% vs last year',
      icon: PoundSterling,
      color: 'text-green-600'
    },
    {
      title: 'CGT Optimization',
      value: '£8,500',
      change: 'Potential savings',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'IHT Exposure',
      value: '£2.1M',
      change: 'Across 8 estates',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      title: 'Pension Allowance',
      value: '87%',
      change: 'Average utilization',
      icon: PiggyBank,
      color: 'text-indigo-600'
    },
    {
      title: 'Family Tax Savings',
      value: '£12,400',
      change: 'Through optimization',
      icon: Users2,
      color: 'text-teal-600'
    }
  ]

  const saReturns = [
    {
      id: '1',
      client: 'John Smith',
      taxYear: '2023-24',
      status: 'in_progress',
      dueDate: '2024-01-31',
      estimatedTax: 4500,
      progress: 75
    },
    {
      id: '2',
      client: 'Sarah Johnson',
      taxYear: '2023-24',
      status: 'review',
      dueDate: '2024-01-31',
      estimatedTax: 2800,
      progress: 90
    },
    {
      id: '3',
      client: 'Michael Brown',
      taxYear: '2023-24',
      status: 'completed',
      dueDate: '2024-01-31',
      estimatedTax: 6200,
      progress: 100
    }
  ]

  const optimizationOpportunities = [
    {
      client: 'John Smith',
      opportunity: 'Pension Contribution',
      potentialSaving: 1200,
      description: 'Increase annual pension contribution to maximize tax relief'
    },
    {
      client: 'Sarah Johnson',
      opportunity: 'CGT Timing',
      potentialSaving: 800,
      description: 'Defer capital gains to next tax year for better rate'
    },
    {
      client: 'Michael Brown',
      opportunity: 'Dividend Timing',
      potentialSaving: 450,
      description: 'Optimize dividend extraction timing'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'review':
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'review':
        return 'bg-orange-100 text-orange-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <ResponsiveLayout>
      <div className="space-y-6">
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
          <div>
            <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Personal Tax</h1>
            <p className="text-gray-600 mt-2">SA returns, CGT optimization, and personal tax planning</p>
          </div>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
            <Button variant="outline" className={isMobile ? 'w-full' : ''}>
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
            <Button className={`bg-brisk-primary hover:bg-brisk-primary-600 ${isMobile ? 'w-full' : ''}`}>
              <Plus className="h-4 w-4 mr-2" />
              New SA Return
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-8'}`}>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="returns">SA Returns</TabsTrigger>
            {!isMobile && <TabsTrigger value="cgt">CGT Calculator</TabsTrigger>}
            {!isMobile && <TabsTrigger value="iht-planning">IHT Planning</TabsTrigger>}
            {!isMobile && <TabsTrigger value="pension-planning">Pension Planning</TabsTrigger>}
            {!isMobile && <TabsTrigger value="family-tax">Family Tax</TabsTrigger>}
            {!isMobile && <TabsTrigger value="optimization">Optimization</TabsTrigger>}
            {!isMobile && <TabsTrigger value="filing">Filing</TabsTrigger>}
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <ResponsiveGrid className={isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'}>
              {kpis.map((kpi, index) => {
                const Icon = kpi.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                          <p className="text-2xl font-bold">{kpi.value}</p>
                          <p className={`text-sm ${kpi.color}`}>{kpi.change}</p>
                        </div>
                        <Icon className={`h-8 w-8 ${kpi.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </ResponsiveGrid>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
              <div className={isMobile ? '' : 'lg:col-span-2'}>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent SA Returns</CardTitle>
                    <CardDescription>Current tax year progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {saReturns.map((saReturn) => (
                        <div key={saReturn.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                          <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                            {getStatusIcon(saReturn.status)}
                            <div className="flex-1">
                              <h4 className="font-medium">{saReturn.client}</h4>
                              <p className="text-sm text-gray-600">Tax Year: {saReturn.taxYear}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={`text-xs ${getStatusColor(saReturn.status)}`}>
                                  {saReturn.status.replace('_', ' ')}
                                </Badge>
                                <span className="text-xs text-gray-500">Due: {saReturn.dueDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                            <div>
                              <p className="text-sm font-medium">Est. Tax: £{saReturn.estimatedTax.toLocaleString()}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className={`bg-gray-200 rounded-full h-2 ${isMobile ? 'w-16' : 'w-20'}`}>
                                  <div 
                                    className="bg-brisk-primary h-2 rounded-full" 
                                    style={{ width: `${saReturn.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-600">{saReturn.progress}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-brisk-primary" />
                      AI Tax Adviser
                    </CardTitle>
                    <CardDescription>Personalized optimization recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">Pension Optimization</p>
                        <p className="text-xs text-blue-700">3 clients could save £4,200 with increased contributions</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-900">CGT Planning</p>
                        <p className="text-xs text-green-700">Defer £25k gains to save £2,500 in tax</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-purple-900">Dividend Strategy</p>
                        <p className="text-xs text-purple-700">Optimize timing for 2 director clients</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-sm font-medium text-red-900">IHT Planning</p>
                        <p className="text-xs text-red-700">2 estates need gift planning review</p>
                      </div>
                      <div className="p-3 bg-teal-50 rounded-lg">
                        <p className="text-sm font-medium text-teal-900">Family Tax Planning</p>
                        <p className="text-xs text-teal-700">Marriage allowance opportunities for 5 couples</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <AIPromptSection
                  title="Ask your Personal Tax Adviser"
                  description="Get personalized tax optimization advice and planning strategies"
                  placeholder="Ask about pension contributions, CGT planning, dividend timing, or IHT strategies..."
                  recentQuestions={[
                    "How can I optimize my client's pension contributions?",
                    "What CGT planning opportunities exist for this tax year?",
                    "When should we defer dividend payments?",
                    "What are the current IHT allowances and planning options?",
                    "How can married couples optimize their tax allowances?"
                  ]}
                  onSubmit={handleAIQuestion}
                  isLoading={isAILoading}
                />

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">SA100 Filing</p>
                          <p className="text-xs text-gray-600">12 returns pending</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">7 days</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Payment on Account</p>
                          <p className="text-xs text-gray-600">8 clients affected</p>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800">14 days</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">CGT Annual Exemption</p>
                          <p className="text-xs text-gray-600">Planning required</p>
                        </div>
                        <Badge className="bg-brisk-primary-50 text-brisk-primary">45 days</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="returns" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>SA100 Returns Management</CardTitle>
                    <CardDescription>Create and manage Self Assessment returns</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Return
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="michael">Michael Brown</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate Tax
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {saReturns.map((saReturn) => (
                      <Card key={saReturn.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className={`${isMobile ? 'space-y-4' : 'flex items-center justify-between'}`}>
                            <div className="flex items-center gap-4">
                              {getStatusIcon(saReturn.status)}
                              <div>
                                <h3 className="font-semibold">{saReturn.client}</h3>
                                <p className="text-sm text-gray-600">Tax Year: {saReturn.taxYear}</p>
                                <Badge className={`text-xs mt-1 ${getStatusColor(saReturn.status)}`}>
                                  {saReturn.status.replace('_', ' ')}
                                </Badge>
                              </div>
                            </div>
                            <div className={`${isMobile ? 'flex justify-between' : 'text-right'}`}>
                              <div>
                                <p className="font-semibold">£{saReturn.estimatedTax.toLocaleString()}</p>
                                <p className="text-sm text-gray-600">Estimated Tax</p>
                                <p className="text-xs text-gray-500">Due: {saReturn.dueDate}</p>
                              </div>
                              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2 mt-2`}>
                                <Button size="sm" variant="outline">Edit</Button>
                                <Button size="sm">File</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cgt" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Capital Gains Tax Calculator</CardTitle>
                <CardDescription>Calculate CGT liability and optimization opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="disposal-proceeds">Disposal Proceeds</Label>
                      <Input id="disposal-proceeds" placeholder="£0.00" />
                    </div>
                    <div>
                      <Label htmlFor="acquisition-cost">Acquisition Cost</Label>
                      <Input id="acquisition-cost" placeholder="£0.00" />
                    </div>
                    <div>
                      <Label htmlFor="improvement-costs">Improvement Costs</Label>
                      <Input id="improvement-costs" placeholder="£0.00" />
                    </div>
                    <div>
                      <Label htmlFor="disposal-costs">Disposal Costs</Label>
                      <Input id="disposal-costs" placeholder="£0.00" />
                    </div>
                    <Button className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate CGT
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">CGT Calculation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Capital Gain</span>
                            <span className="font-semibold">£0.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Annual Exemption</span>
                            <span>£6,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxable Gain</span>
                            <span className="font-semibold">£0.00</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>CGT Due</span>
                            <span className="font-bold text-lg">£0.00</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Optimization Opportunities</CardTitle>
                <CardDescription>AI-powered recommendations for tax savings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimizationOpportunities.map((opportunity, index) => (
                    <Card key={index} className="border-l-4 border-l-brisk-primary">
                      <CardContent className="p-4">
                        <div className={`${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                          <div>
                            <h3 className="font-semibold">{opportunity.client}</h3>
                            <p className="text-sm font-medium text-brisk-primary">{opportunity.opportunity}</p>
                            <p className="text-sm text-gray-600">{opportunity.description}</p>
                          </div>
                          <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                            <div>
                              <p className="text-lg font-bold text-green-600">£{opportunity.potentialSaving}</p>
                              <p className="text-sm text-gray-600">Potential Saving</p>
                            </div>
                            <Button size="sm" className={isMobile ? '' : 'ml-4'}>
                              Apply
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

          <TabsContent value="iht-planning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Inheritance Tax Planning
                </CardTitle>
                <CardDescription>IHT mitigation strategies and estate planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="estate-value">Total Estate Value</Label>
                      <Input id="estate-value" placeholder="£0.00" />
                    </div>
                    <div>
                      <Label htmlFor="nil-rate-band">Nil Rate Band Available</Label>
                      <Input id="nil-rate-band" value="£325,000" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="residence-nil-rate">Residence Nil Rate Band</Label>
                      <Input id="residence-nil-rate" value="£175,000" readOnly />
                    </div>
                    <div>
                      <Label htmlFor="gifts-made">Gifts Made (Last 7 Years)</Label>
                      <Input id="gifts-made" placeholder="£0.00" />
                    </div>
                    <Button className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate IHT Liability
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">IHT Calculation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Estate Value</span>
                            <span className="font-semibold">£0.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Nil Rate Bands</span>
                            <span>£500,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxable Estate</span>
                            <span className="font-semibold">£0.00</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>IHT Due (40%)</span>
                            <span className="font-bold text-lg">£0.00</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Gift Planning</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Gift className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium">Annual Exemption</span>
                            </div>
                            <p className="text-xs text-green-700">£3,000 per year available</p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Home className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium">Potentially Exempt Transfers</span>
                            </div>
                            <p className="text-xs text-blue-700">7-year rule applies</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pension-planning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-indigo-600" />
                  Pension Planning and Optimization
                </CardTitle>
                <CardDescription>Annual and lifetime allowance planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="annual-income">Annual Income</Label>
                      <Input id="annual-income" placeholder="£0.00" />
                    </div>
                    <div>
                      <Label htmlFor="current-contributions">Current Pension Contributions</Label>
                      <Input id="current-contributions" placeholder="£0.00" />
                    </div>
                    <div>
                      <Label htmlFor="pension-value">Current Pension Value</Label>
                      <Input id="pension-value" placeholder="£0.00" />
                    </div>
                    <div>
                      <Label htmlFor="unused-allowance">Unused Allowance (3 years)</Label>
                      <Input id="unused-allowance" placeholder="£0.00" />
                    </div>
                    <Button className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Optimize Contributions
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Annual Allowance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Standard Allowance</span>
                            <span>£40,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tapered Allowance</span>
                            <span className="font-semibold">£40,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Used This Year</span>
                            <span>£0</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>Remaining Allowance</span>
                            <span className="font-bold text-lg">£40,000</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Lifetime Allowance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Lifetime Allowance</span>
                            <span>£1,073,100</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Current Value</span>
                            <span>£0</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Utilization</span>
                            <span className="font-semibold">0%</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>Remaining Capacity</span>
                            <span className="font-bold text-lg">£1,073,100</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="family-tax" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users2 className="h-5 w-5 text-teal-600" />
                  Family Tax Planning
                </CardTitle>
                <CardDescription>Income splitting and family allowance optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Marriage Allowance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="spouse1-income">Spouse 1 Income</Label>
                            <Input id="spouse1-income" placeholder="£0.00" />
                          </div>
                          <div>
                            <Label htmlFor="spouse2-income">Spouse 2 Income</Label>
                            <Input id="spouse2-income" placeholder="£0.00" />
                          </div>
                          <Button className="w-full" variant="outline">
                            Calculate Marriage Allowance
                          </Button>
                          <div className="p-3 bg-teal-50 rounded-lg">
                            <p className="text-sm font-medium text-teal-900">Potential Saving</p>
                            <p className="text-lg font-bold text-teal-600">£252</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Child Benefit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="children-count">Number of Children</Label>
                            <Input id="children-count" type="number" placeholder="0" />
                          </div>
                          <div>
                            <Label htmlFor="high-earner-income">High Earner Income</Label>
                            <Input id="high-earner-income" placeholder="£0.00" />
                          </div>
                          <Button className="w-full" variant="outline">
                            Calculate HICBC
                          </Button>
                          <div className="p-3 bg-orange-50 rounded-lg">
                            <p className="text-sm font-medium text-orange-900">HICBC Charge</p>
                            <p className="text-lg font-bold text-orange-600">£0</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Family Investment Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Banknote className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">Junior ISAs</span>
                          </div>
                          <p className="text-sm text-gray-600">£9,000 annual allowance per child</p>
                          <Button size="sm" className="mt-2" variant="outline">Setup</Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span className="font-medium">Education Planning</span>
                          </div>
                          <p className="text-sm text-gray-600">Tax-efficient education funding</p>
                          <Button size="sm" className="mt-2" variant="outline">Plan</Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4 text-purple-600" />
                            <span className="font-medium">Income Splitting</span>
                          </div>
                          <p className="text-sm text-gray-600">Optimize family income distribution</p>
                          <Button size="sm" className="mt-2" variant="outline">Analyze</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="filing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>HMRC Filing and Submissions</CardTitle>
                <CardDescription>Submit returns and track filing status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Ready for Filing</h3>
                    <p className="text-sm text-blue-700">3 SA returns completed and ready for HMRC submission</p>
                    <Button className="mt-2" size="sm">
                      Submit to HMRC
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900">Successfully Filed</h3>
                    <p className="text-sm text-green-700">8 returns filed this month with confirmation receipts</p>
                    <Button variant="outline" className="mt-2" size="sm">
                      View Receipts
                    </Button>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h3 className="font-semibold text-orange-900">Pending Review</h3>
                    <p className="text-sm text-orange-700">2 returns require client approval before filing</p>
                    <Button variant="outline" className="mt-2" size="sm">
                      Send for Approval
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ResponsiveLayout>
  )
}

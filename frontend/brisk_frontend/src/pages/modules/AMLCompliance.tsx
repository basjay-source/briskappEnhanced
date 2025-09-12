import { 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Clock,
  TrendingUp,
  Eye,
  Upload,
  Brain,
  Settings,
  Filter,
  Plus,
  Edit,
  Shield,
  Network,
  FileText,
  Zap,
  Globe,
  UserCheck,
  AlertCircle,
  Target,
  Activity,
  BarChart3
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { useIsMobile } from '@/hooks/use-mobile'
import KPICard from '../../components/KPICard'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import AIPromptSection from '@/components/AIPromptSection'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'

export default function AMLCompliance() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('')
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

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

  const riskLevelOptions = [
    { label: 'All Risk Levels', value: 'all' },
    { label: 'Low Risk', value: 'low' },
    { label: 'Medium Risk', value: 'medium' },
    { label: 'High Risk', value: 'high' },
    { label: 'Critical Risk', value: 'critical' }
  ]

  const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Pending Review', value: 'pending' },
    { label: 'In Progress', value: 'progress' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Requires EDD', value: 'edd' }
  ]

  const jurisdictionOptions = [
    { label: 'All Jurisdictions', value: 'all' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'European Union', value: 'eu' },
    { label: 'United States', value: 'us' },
    { label: 'High Risk Countries', value: 'high-risk' },
    { label: 'Sanctions List', value: 'sanctions' }
  ]

  const kpis = [
    {
      title: 'Active Cases',
      value: '23',
      change: '+2 from last week',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'High Risk Clients',
      value: '3',
      change: 'Requires attention',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'PEP Matches',
      value: '7',
      change: '2 new this week',
      icon: UserCheck,
      color: 'text-orange-600'
    },
    {
      title: 'Sanctions Hits',
      value: '0',
      change: 'All clear',
      icon: Shield,
      color: 'text-green-600'
    },
    {
      title: 'Completed KYC',
      value: '156',
      change: 'This month',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Avg. Processing',
      value: '2.3 days',
      change: '-15% from last month',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      title: 'SARs Filed',
      value: '2',
      change: 'This quarter',
      icon: FileText,
      color: 'text-red-600'
    },
    {
      title: 'AI Alerts',
      value: '12',
      change: '5 resolved today',
      icon: Brain,
      color: 'text-brisk-primary'
    }
  ]

  const riskAssessments = [
    {
      id: 'RA001',
      client: 'TechCorp Ltd',
      riskLevel: 'Medium',
      score: 65,
      status: 'Under Review',
      lastUpdated: '2024-01-20',
      assignee: 'Sarah Johnson',
      flags: ['PEP Check', 'Enhanced DD'],
      aiInsights: 'Elevated risk due to cross-border operations in medium-risk jurisdictions',
      screenings: { pep: 1, sanctions: 0, adverseMedia: 0 },
      uboComplexity: 'Medium'
    },
    {
      id: 'RA002',
      client: 'Global Imports Inc',
      riskLevel: 'High',
      score: 85,
      status: 'Enhanced DD',
      lastUpdated: '2024-01-19',
      assignee: 'Mike Chen',
      flags: ['Sanctions', 'High Value', 'Complex Structure'],
      aiInsights: 'Complex ownership structure with multiple jurisdictions requires enhanced monitoring',
      screenings: { pep: 2, sanctions: 0, adverseMedia: 1 },
      uboComplexity: 'High'
    },
    {
      id: 'RA003',
      client: 'Local Services Ltd',
      riskLevel: 'Low',
      score: 25,
      status: 'Approved',
      lastUpdated: '2024-01-18',
      assignee: 'Emma Wilson',
      flags: ['Standard KYC'],
      aiInsights: 'Low risk profile with straightforward business model and local operations',
      screenings: { pep: 0, sanctions: 0, adverseMedia: 0 },
      uboComplexity: 'Low'
    }
  ]

  const kycChecks = [
    {
      id: 'KYC001',
      client: 'ABC Manufacturing',
      type: 'Individual',
      status: 'Pending Documents',
      progress: 75,
      documents: ['Passport', 'Proof of Address'],
      missing: ['Bank Statement']
    },
    {
      id: 'KYC002',
      client: 'XYZ Holdings',
      type: 'Corporate',
      status: 'Complete',
      progress: 100,
      documents: ['Certificate of Incorporation', 'PSC Register', 'Bank Statement'],
      missing: []
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Complete':
      case 'Approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'Pending Documents':
      case 'Under Review':
        return <Clock className="h-4 w-4 text-brisk-primary" />
      case 'Enhanced DD':
      case 'High Risk':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Eye className="h-4 w-4 text-gray-500" />
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'text-red-600 bg-red-50'
      case 'Medium':
        return 'text-brisk-primary bg-brisk-primary-50'
      case 'Low':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <ResponsiveLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">AML/KYC Compliance</h1>
            <p className="text-gray-600">Risk assessment, identity verification and compliance monitoring</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size={isMobile ? "sm" : "default"}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size={isMobile ? "sm" : "default"}>
              <Plus className="h-4 w-4 mr-2" />
              New Assessment
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-6'}`}>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
            <TabsTrigger value="kyc">KYC &amp; IDV</TabsTrigger>
            <TabsTrigger value="screening">Screening</TabsTrigger>
            <TabsTrigger value="ubo">UBO Mapping</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              {kpis.map((kpi, index) => {
                const Icon = kpi.icon
                const drillDownData = {
                  title: `${kpi.title} Analysis`,
                  description: `Detailed AML compliance analysis and breakdown for ${kpi.title.toLowerCase()}`,
                  content: (
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Current Status</h4>
                          <p className="text-2xl font-bold">{kpi.value}</p>
                          <p className={`text-sm ${kpi.color}`}>{kpi.change}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Compliance Score</h4>
                          <p className="text-sm text-gray-600">AML regulatory compliance</p>
                          <div className="mt-2">
                            <div className="flex justify-between text-xs">
                              <span>Overall Score</span>
                              <span className="text-green-600">96%</span>
                            </div>
                            <Progress value={96} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      {kpi.title === 'Active Cases' && (
                        <div>
                          <h4 className="font-semibold mb-3">Case Risk Profile</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between p-2 border rounded">
                              <span>Low Risk</span>
                              <span className="font-semibold">15 cases (65%)</span>
                            </div>
                            <div className="flex justify-between p-2 border rounded">
                              <span>Medium Risk</span>
                              <span className="font-semibold">6 cases (26%)</span>
                            </div>
                            <div className="flex justify-between p-2 border rounded">
                              <span>High Risk</span>
                              <span className="font-semibold">2 cases (9%)</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {kpi.title === 'High Risk Clients' && (
                        <div>
                          <h4 className="font-semibold mb-3">Risk Assessment</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 border rounded">
                              <span>Enhanced DD Required</span>
                              <Badge variant="destructive">2 clients</Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 border rounded">
                              <span>Under Review</span>
                              <Badge variant="secondary">1 client</Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 border rounded">
                              <span>Monitoring Required</span>
                              <Badge variant="outline">3 clients</Badge>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {kpi.title === 'Completed KYC' && (
                        <div>
                          <h4 className="font-semibold mb-3">KYC Breakdown</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between p-2 border rounded">
                              <span>Standard KYC</span>
                              <span className="font-semibold">142 completed</span>
                            </div>
                            <div className="flex justify-between p-2 border rounded">
                              <span>Enhanced KYC</span>
                              <span className="font-semibold">12 completed</span>
                            </div>
                            <div className="flex justify-between p-2 border rounded">
                              <span>Simplified KYC</span>
                              <span className="font-semibold">2 completed</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-2 pt-4">
                        <Button variant="outline">Export Compliance Report</Button>
                        <Button>Generate SAR</Button>
                      </div>
                    </div>
                  )
                }
                return (
                  <KPICard
                    key={index}
                    title={kpi.title}
                    value={kpi.value}
                    change={kpi.change}
                    icon={Icon}
                    color={kpi.color}
                    drillDownData={drillDownData}
                  />
                )
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Risk Assessments</CardTitle>
                  <CardDescription>Latest client risk evaluations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskAssessments.slice(0, 3).map((assessment) => (
                      <div key={assessment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{assessment.client}</p>
                            <Badge className={getRiskColor(assessment.riskLevel)}>
                              {assessment.riskLevel}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">Score: {assessment.score} | {assessment.assignee}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(assessment.status)}
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
                  <CardTitle>Compliance Status</CardTitle>
                  <CardDescription>Regulatory requirements overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Customer Due Diligence</span>
                      <Badge variant="secondary">98% Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Enhanced Due Diligence</span>
                      <Badge variant="default">12 Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>PEP Screening</span>
                      <Badge variant="secondary">Up to Date</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sanctions Check</span>
                      <Badge variant="secondary">Daily Updates</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Transaction Monitoring</span>
                      <Badge variant="destructive">3 Alerts</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-brisk-primary" />
                  AML AI Insights
                </CardTitle>
                <CardDescription>Intelligent risk analysis and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h3 className="font-semibold text-red-900">High Risk Alert</h3>
                    <p className="text-sm text-red-700">Global Imports Inc shows unusual transaction patterns. Recommend enhanced monitoring.</p>
                    <Button size="sm" className="mt-2">Review Case</Button>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Process Optimization</h3>
                    <p className="text-sm text-blue-700">KYC completion time reduced by 15% this month. Consider applying new workflow to all cases.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900">Compliance Update</h3>
                    <p className="text-sm text-green-700">All regulatory requirements met for Q4 2024. Next review due in 30 days.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Management</CardTitle>
                <CardDescription>Evaluate and monitor client risk profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <SearchFilterHeader
                  searchPlaceholder="Search clients, cases, risk assessments..."
                  searchValue={searchTerm}
                  onSearchChange={setSearchTerm}
                  filters={[
                    {
                      label: 'Risk Level',
                      options: riskLevelOptions,
                      value: selectedRiskLevel || 'all',
                      onChange: setSelectedRiskLevel
                    },
                    {
                      label: 'Status',
                      options: statusOptions,
                      value: selectedStatus,
                      onChange: setSelectedStatus
                    },
                    {
                      label: 'Jurisdiction',
                      options: jurisdictionOptions,
                      value: selectedJurisdiction,
                      onChange: setSelectedJurisdiction
                    }
                  ]}
                  dateRange={{
                    from: dateFrom,
                    to: dateTo,
                    onFromChange: setDateFrom,
                    onToChange: setDateTo
                  }}
                />

                <div className="space-y-4">
                  {riskAssessments.map((assessment) => (
                    <Card key={assessment.id} className="border-l-4 border-l-brisk-primary">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{assessment.client}</h3>
                              <Badge className={getRiskColor(assessment.riskLevel)}>
                                {assessment.riskLevel} Risk
                              </Badge>
                              <Badge variant="outline">Score: {assessment.score}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {assessment.flags.map((flag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {flag}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">
                              Assigned to {assessment.assignee} | Last updated: {assessment.lastUpdated}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(assessment.status)}
                            <span className="text-sm font-medium">{assessment.status}</span>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Review
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

          <TabsContent value="kyc" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>KYC Document Management</CardTitle>
                <CardDescription>Identity verification and document collection</CardDescription>
              </CardHeader>
              <CardContent>
                <SearchFilterHeader
                  searchPlaceholder="Search KYC checks, documents, clients..."
                  searchValue={searchTerm}
                  onSearchChange={setSearchTerm}
                  filters={[
                    {
                      label: 'Status',
                      options: statusOptions,
                      value: selectedStatus,
                      onChange: setSelectedStatus
                    },
                    {
                      label: 'Document Type',
                      options: [
                        { label: 'All Types', value: 'all' },
                        { label: 'Passport', value: 'passport' },
                        { label: 'Driving License', value: 'license' },
                        { label: 'Utility Bill', value: 'utility' },
                        { label: 'Bank Statement', value: 'bank' }
                      ],
                      value: selectedJurisdiction,
                      onChange: setSelectedJurisdiction
                    }
                  ]}
                  dateRange={{
                    from: dateFrom,
                    to: dateTo,
                    onFromChange: setDateFrom,
                    onToChange: setDateTo
                  }}
                />
                
                <div className="space-y-4">
                  {kycChecks.map((check) => (
                    <Card key={check.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{check.client}</h3>
                              <Badge variant="outline">{check.type}</Badge>
                              {getStatusIcon(check.status)}
                              <span className="text-sm font-medium">{check.status}</span>
                            </div>
                            <div className="mb-2">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-gray-600">Progress:</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-brisk-primary h-2 rounded-full" 
                                    style={{ width: `${check.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{check.progress}%</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {check.documents.map((doc, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  ✓ {doc}
                                </Badge>
                              ))}
                              {check.missing.map((doc, index) => (
                                <Badge key={index} variant="destructive" className="text-xs">
                                  ✗ {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Review
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

          <TabsContent value="screening" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-brisk-primary" />
                  PEP &amp; Sanctions Screening
                </CardTitle>
                <CardDescription>Real-time screening against global watchlists</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Clean Screens</p>
                          <p className="text-2xl font-bold text-green-600">847</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">PEP Matches</p>
                          <p className="text-2xl font-bold text-orange-600">7</p>
                        </div>
                        <UserCheck className="h-8 w-8 text-orange-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Sanctions Hits</p>
                          <p className="text-2xl font-bold text-red-600">0</p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Recent Screening Results</h3>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Screening
                    </Button>
                  </div>
                  
                  {riskAssessments.map((assessment) => (
                    <Card key={assessment.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{assessment.client}</h3>
                              <Badge className={getRiskColor(assessment.riskLevel)}>
                                {assessment.riskLevel} Risk
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">PEP:</span>
                                <span className={`ml-1 font-medium ${assessment.screenings.pep > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                                  {assessment.screenings.pep} matches
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">Sanctions:</span>
                                <span className={`ml-1 font-medium ${assessment.screenings.sanctions > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                  {assessment.screenings.sanctions} matches
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">Adverse Media:</span>
                                <span className={`ml-1 font-medium ${assessment.screenings.adverseMedia > 0 ? 'text-brisk-primary' : 'text-green-600'}`}>
                                  {assessment.screenings.adverseMedia} matches
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                            <Button variant="outline" size="sm">
                              <Zap className="h-4 w-4 mr-2" />
                              Re-screen
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

          <TabsContent value="ubo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-brisk-primary" />
                  Ultimate Beneficial Ownership Mapping
                </CardTitle>
                <CardDescription>Corporate structure analysis and UBO identification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4 mb-6">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Mapped Entities</p>
                          <p className="text-2xl font-bold text-blue-600">156</p>
                        </div>
                        <Network className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Simple Structures</p>
                          <p className="text-2xl font-bold text-green-600">89</p>
                        </div>
                        <Target className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-brisk-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Complex Structures</p>
                          <p className="text-2xl font-bold text-brisk-primary">45</p>
                        </div>
                        <AlertCircle className="h-8 w-8 text-brisk-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">High Complexity</p>
                          <p className="text-2xl font-bold text-red-600">22</p>
                        </div>
                        <Activity className="h-8 w-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Corporate Structures</h3>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Map Structure
                    </Button>
                  </div>
                  
                  {riskAssessments.map((assessment) => (
                    <Card key={assessment.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{assessment.client}</h3>
                              <Badge variant="outline">
                                {assessment.uboComplexity} Complexity
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              {assessment.aiInsights}
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Globe className="h-4 w-4 text-gray-400" />
                                <span>3 jurisdictions</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span>5 entities</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BarChart3 className="h-4 w-4 text-gray-400" />
                                <span>2 levels deep</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Network className="h-4 w-4 mr-2" />
                              View Structure
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Update
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

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Monitoring &amp; Alerts</CardTitle>
                <CardDescription>Suspicious activity detection and continuous monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Active Alerts</h3>
                      <p className="text-2xl font-bold text-red-600 mb-2">3</p>
                      <Button size="sm" variant="outline">Review</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Transactions Monitored</h3>
                      <p className="text-2xl font-bold text-blue-600 mb-2">1,247</p>
                      <Button size="sm" variant="outline">View Report</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <Settings className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Monitoring Rules</h3>
                      <p className="text-2xl font-bold text-gray-600 mb-2">12</p>
                      <Button size="sm" variant="outline">Configure</Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-red-900">Unusual Transaction Pattern</p>
                          <p className="text-sm text-red-700">Global Imports Inc - Multiple large cash deposits</p>
                        </div>
                        <Button size="sm" variant="destructive">Investigate</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-brisk-primary-50 rounded-lg">
                        <div>
                          <p className="font-medium text-brisk-primary">Threshold Exceeded</p>
                          <p className="text-sm text-brisk-primary">TechCorp Ltd - Transaction above £10,000 limit</p>
                        </div>
                        <Button size="sm" variant="outline">Review</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <AIPromptSection
        title="Ask your AML Compliance Adviser"
        description="Get expert AML and compliance guidance for your practice"
        placeholder="Ask about PEP screening, risk assessments, due diligence requirements, or regulatory updates..."
        recentQuestions={[
          "What are the latest PEP screening requirements?",
          "How often should we update client risk assessments?",
          "What documentation is needed for enhanced due diligence?",
          "How do we handle suspicious activity reporting?",
          "What are the current AML record-keeping requirements?"
        ]}
        onSubmit={handleAIQuestion}
        isLoading={isAILoading}
      />
    </ResponsiveLayout>
  )
}

import { 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Search, 
  Clock, 
  TrendingUp,
  Eye,
  Upload,
  Brain,
  Settings,
  Filter,
  Plus,
  Edit
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

export default function AMLCompliance() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('')

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
      flags: ['PEP Check', 'Enhanced DD']
    },
    {
      id: 'RA002',
      client: 'Global Imports Inc',
      riskLevel: 'High',
      score: 85,
      status: 'Enhanced DD',
      lastUpdated: '2024-01-19',
      assignee: 'Mike Chen',
      flags: ['Sanctions', 'High Value', 'Complex Structure']
    },
    {
      id: 'RA003',
      client: 'Local Services Ltd',
      riskLevel: 'Low',
      score: 25,
      status: 'Approved',
      lastUpdated: '2024-01-18',
      assignee: 'Emma Wilson',
      flags: ['Standard KYC']
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
        return <Clock className="h-4 w-4 text-yellow-500" />
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
        return 'text-yellow-600 bg-yellow-50'
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
            <p className="text-gray-600">Risk assessment, identity verification & compliance monitoring</p>
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
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
            <TabsTrigger value="kyc">KYC Checks</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
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
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Input placeholder="Search clients..." className="flex-1" />
                  <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

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

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Monitoring</CardTitle>
                <CardDescription>Suspicious activity detection and alerts</CardDescription>
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
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="font-medium text-yellow-900">Threshold Exceeded</p>
                          <p className="text-sm text-yellow-700">TechCorp Ltd - Transaction above £10,000 limit</p>
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
    </ResponsiveLayout>
  )
}

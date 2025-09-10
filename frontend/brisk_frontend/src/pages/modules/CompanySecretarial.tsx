import { 
  Building, 
  FileText, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Filter,
  Search,
  Brain,
  ExternalLink,
  Settings
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

export default function CompanySecretarial() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedCompany, setSelectedCompany] = useState('')

  const kpis = [
    {
      title: 'Active Companies',
      value: '45',
      change: '+3 this month',
      icon: Building,
      color: 'text-blue-600'
    },
    {
      title: 'Pending Filings',
      value: '8',
      change: 'Due this week',
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      title: 'Overdue Tasks',
      value: '2',
      change: 'Requires attention',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'Completed (MTD)',
      value: '23',
      change: '+15% vs last month',
      icon: CheckCircle,
      color: 'text-green-600'
    }
  ]

  const companies = [
    {
      id: 'C001',
      name: 'TechCorp Ltd',
      number: '12345678',
      status: 'Active',
      nextFiling: '2024-02-15',
      filingType: 'Annual Return',
      pscCount: 3,
      lastUpdate: '2024-01-15'
    },
    {
      id: 'C002',
      name: 'Global Services Inc',
      number: '87654321',
      status: 'Active',
      nextFiling: '2024-01-30',
      filingType: 'Confirmation Statement',
      pscCount: 2,
      lastUpdate: '2024-01-10'
    },
    {
      id: 'C003',
      name: 'Local Trading Ltd',
      number: '11223344',
      status: 'Dormant',
      nextFiling: '2024-03-01',
      filingType: 'Dormant Accounts',
      pscCount: 1,
      lastUpdate: '2024-01-05'
    }
  ]

  const filings = [
    {
      id: 'F001',
      company: 'TechCorp Ltd',
      type: 'Annual Return',
      status: 'In Progress',
      dueDate: '2024-02-15',
      assignee: 'Sarah Johnson',
      progress: 75
    },
    {
      id: 'F002',
      company: 'Global Services Inc',
      type: 'PSC Update',
      status: 'Ready to File',
      dueDate: '2024-01-30',
      assignee: 'Mike Chen',
      progress: 100
    },
    {
      id: 'F003',
      company: 'Local Trading Ltd',
      type: 'Confirmation Statement',
      status: 'Overdue',
      dueDate: '2024-01-25',
      assignee: 'Emma Wilson',
      progress: 50
    }
  ]

  const pscRegister = [
    {
      id: 'PSC001',
      company: 'TechCorp Ltd',
      name: 'John Smith',
      type: 'Individual',
      shares: '75%',
      voting: '75%',
      appointed: '2023-01-15',
      status: 'Active'
    },
    {
      id: 'PSC002',
      company: 'TechCorp Ltd',
      name: 'Investment Holdings Ltd',
      type: 'Corporate',
      shares: '25%',
      voting: '25%',
      appointed: '2023-06-01',
      status: 'Active'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Ready to File':
      case 'Complete':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'In Progress':
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'Overdue':
      case 'Urgent':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'Dormant':
        return <Clock className="h-4 w-4 text-gray-500" />
      default:
        return <Eye className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Ready to File':
        return 'text-green-600 bg-green-50'
      case 'In Progress':
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'Overdue':
      case 'Urgent':
        return 'text-red-600 bg-red-50'
      case 'Dormant':
        return 'text-gray-600 bg-gray-50'
      default:
        return 'text-blue-600 bg-blue-50'
    }
  }

  return (
    <ResponsiveLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Company Secretarial</h1>
            <p className="text-gray-600">Companies House filings, PSC registers & compliance tracking</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size={isMobile ? "sm" : "default"}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size={isMobile ? "sm" : "default"}>
              <Plus className="h-4 w-4 mr-2" />
              New Filing
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="filings">Filings</TabsTrigger>
            <TabsTrigger value="psc">PSC Register</TabsTrigger>
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
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Critical filing dates to watch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filings.slice(0, 3).map((filing) => (
                      <div key={filing.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{filing.company}</p>
                            <Badge className={getStatusColor(filing.status)}>
                              {filing.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{filing.type} | Due: {filing.dueDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(filing.status)}
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
                  <CardTitle>Filing Progress</CardTitle>
                  <CardDescription>Current filing status overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Annual Returns</span>
                      <Badge variant="secondary">5 Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Confirmation Statements</span>
                      <Badge variant="secondary">3 Due Soon</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>PSC Updates</span>
                      <Badge variant="destructive">2 Overdue</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Officer Changes</span>
                      <Badge variant="secondary">1 In Progress</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Share Allotments</span>
                      <Badge variant="secondary">Ready to File</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-brisk-primary" />
                  Company Secretary AI Insights
                </CardTitle>
                <CardDescription>Intelligent compliance recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h3 className="font-semibold text-red-900">Urgent Filing Alert</h3>
                    <p className="text-sm text-red-700">Local Trading Ltd confirmation statement is 5 days overdue. Late filing penalties may apply.</p>
                    <Button size="sm" className="mt-2">File Now</Button>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Compliance Reminder</h3>
                    <p className="text-sm text-blue-700">3 companies have annual returns due within 30 days. Consider preparing documents early.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900">Process Optimization</h3>
                    <p className="text-sm text-green-700">Filing completion rate improved by 20% this quarter. Current average processing time: 3.2 days.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Management</CardTitle>
                <CardDescription>Manage company records and compliance status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Input placeholder="Search companies..." className="flex-1" />
                  <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Company Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Companies</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="dormant">Dormant</SelectItem>
                      <SelectItem value="dissolved">Dissolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                <div className="space-y-4">
                  {companies.map((company) => (
                    <Card key={company.id} className="border-l-4 border-l-brisk-primary">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{company.name}</h3>
                              <Badge className={getStatusColor(company.status)}>
                                {company.status}
                              </Badge>
                              <Badge variant="outline">#{company.number}</Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                              <span>Next Filing: {company.nextFiling}</span>
                              <span>Type: {company.filingType}</span>
                              <span>PSCs: {company.pscCount}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Last updated: {company.lastUpdate}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Companies House
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

          <TabsContent value="filings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filing Management</CardTitle>
                <CardDescription>Track and manage Companies House filings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filings.map((filing) => (
                    <Card key={filing.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{filing.company}</h3>
                              <Badge variant="outline">{filing.type}</Badge>
                              {getStatusIcon(filing.status)}
                              <span className="text-sm font-medium">{filing.status}</span>
                            </div>
                            <div className="mb-2">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-gray-600">Progress:</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-brisk-primary h-2 rounded-full" 
                                    style={{ width: `${filing.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{filing.progress}%</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">
                              Due: {filing.dueDate} | Assigned to: {filing.assignee}
                            </p>
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
                            <Button size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              File
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

          <TabsContent value="psc" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PSC Register Management</CardTitle>
                <CardDescription>Persons with Significant Control register</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pscRegister.map((psc) => (
                    <Card key={psc.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{psc.name}</h3>
                              <Badge variant="outline">{psc.type}</Badge>
                              {getStatusIcon(psc.status)}
                              <span className="text-sm font-medium">{psc.status}</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 mb-2">
                              <span>Shares: {psc.shares}</span>
                              <span>Voting: {psc.voting}</span>
                              <span>Appointed: {psc.appointed}</span>
                            </div>
                            <p className="text-sm text-gray-600">Company: {psc.company}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Update
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>PSC Filing Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                        <CardContent className="p-6 text-center">
                          <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">Add New PSC</h3>
                          <p className="text-sm text-gray-600 mb-3">Register new person with significant control</p>
                          <Button size="sm" variant="outline">Add PSC</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                        <CardContent className="p-6 text-center">
                          <FileText className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">PSC01 Form</h3>
                          <p className="text-sm text-gray-600 mb-3">Notification of PSC details</p>
                          <Button size="sm" variant="outline">Generate</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                        <CardContent className="p-6 text-center">
                          <Settings className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">Bulk Update</h3>
                          <p className="text-sm text-gray-600 mb-3">Update multiple PSC records</p>
                          <Button size="sm" variant="outline">Import</Button>
                        </CardContent>
                      </Card>
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

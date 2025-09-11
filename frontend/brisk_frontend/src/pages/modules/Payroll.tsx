import { 
  Users, 
  Calculator, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  PoundSterling,
  Download,
  Brain,
  UserPlus,
  Play,
  Settings,
  Eye,
  Edit
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout, { ResponsiveGrid } from '@/components/ResponsiveLayout'

export default function Payroll() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedEmployee, setSelectedEmployee] = useState('')

  const kpis = [
    {
      title: 'Active Employees',
      value: '45',
      change: '+3 this month',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Monthly Payroll',
      value: '£125,400',
      change: '+5.2% vs last month',
      icon: PoundSterling,
      color: 'text-green-600'
    },
    {
      title: 'Pension Enrolled',
      value: '42/45',
      change: '93% compliance',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'RTI Submissions',
      value: '12/12',
      change: 'All on time',
      icon: CheckCircle,
      color: 'text-green-600'
    }
  ]

  const employees = [
    {
      id: '1',
      name: 'John Smith',
      position: 'Senior Developer',
      salary: 55000,
      status: 'active',
      pensionEnrolled: true,
      lastPayRun: '2024-01-15',
      ytdGross: 4583.33,
      ytdTax: 916.67,
      ytdNI: 458.33
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      position: 'Marketing Manager',
      salary: 45000,
      status: 'active',
      pensionEnrolled: true,
      lastPayRun: '2024-01-15',
      ytdGross: 3750.00,
      ytdTax: 625.00,
      ytdNI: 375.00
    },
    {
      id: '3',
      name: 'Michael Brown',
      position: 'Accountant',
      salary: 38000,
      status: 'active',
      pensionEnrolled: false,
      lastPayRun: '2024-01-15',
      ytdGross: 3166.67,
      ytdTax: 483.33,
      ytdNI: 316.67
    }
  ]

  const payRuns = [
    {
      id: '1',
      period: 'January 2024',
      payDate: '2024-01-31',
      status: 'completed',
      employeeCount: 45,
      grossPay: 125400,
      totalTax: 25080,
      totalNI: 12540,
      netPay: 87780
    },
    {
      id: '2',
      period: 'December 2023',
      payDate: '2023-12-31',
      status: 'completed',
      employeeCount: 42,
      grossPay: 119200,
      totalTax: 23840,
      totalNI: 11920,
      netPay: 83440
    },
    {
      id: '3',
      period: 'February 2024',
      payDate: '2024-02-29',
      status: 'draft',
      employeeCount: 45,
      grossPay: 0,
      totalTax: 0,
      totalNI: 0,
      netPay: 0
    }
  ]

  const rtiSubmissions = [
    {
      id: '1',
      type: 'FPS',
      period: 'January 2024',
      submittedDate: '2024-01-31',
      status: 'accepted',
      employeeCount: 45,
      reference: 'FPS240131001'
    },
    {
      id: '2',
      type: 'EPS',
      period: 'January 2024',
      submittedDate: '2024-01-31',
      status: 'accepted',
      employeeCount: 45,
      reference: 'EPS240131001'
    },
    {
      id: '3',
      type: 'FPS',
      period: 'February 2024',
      submittedDate: null,
      status: 'pending',
      employeeCount: 45,
      reference: null
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
      case 'draft':
        return <Clock className="h-4 w-4 text-orange-600" />
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'accepted':
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'draft':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <ResponsiveLayout>
      <div className="space-y-6">
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
          <div>
            <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Payroll</h1>
            <p className="text-gray-600 mt-2">RTI submissions, pensions, and payroll management</p>
          </div>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
            <Button variant="outline" className={isMobile ? 'w-full' : ''}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
            <Button className={`bg-brisk-primary hover:bg-brisk-primary-600 ${isMobile ? 'w-full' : ''}`}>
              <Play className="h-4 w-4 mr-2" />
              New Pay Run
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-6'}`}>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            {!isMobile && <TabsTrigger value="payruns">Pay Runs</TabsTrigger>}
            {!isMobile && <TabsTrigger value="rti">RTI</TabsTrigger>}
            {!isMobile && <TabsTrigger value="statutory">Statutory</TabsTrigger>}
            {!isMobile && <TabsTrigger value="reports">Reports</TabsTrigger>}
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <ResponsiveGrid className={isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}>
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
                    <CardTitle>Recent Pay Runs</CardTitle>
                    <CardDescription>Latest payroll processing activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {payRuns.slice(0, 3).map((payRun) => (
                        <div key={payRun.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                          <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                            {getStatusIcon(payRun.status)}
                            <div className="flex-1">
                              <h4 className="font-medium">{payRun.period}</h4>
                              <p className="text-sm text-gray-600">Pay Date: {payRun.payDate}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={`text-xs ${getStatusColor(payRun.status)}`}>
                                  {payRun.status}
                                </Badge>
                                <span className="text-xs text-gray-500">{payRun.employeeCount} employees</span>
                              </div>
                            </div>
                          </div>
                          <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                            <div>
                              <p className="text-sm font-medium">Gross: £{payRun.grossPay.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">Net: £{payRun.netPay.toLocaleString()}</p>
                            </div>
                            <div className={`flex gap-2 ${isMobile ? '' : 'ml-4'}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              {payRun.status === 'draft' && (
                                <Button size="sm">
                                  <Play className="h-3 w-3" />
                                </Button>
                              )}
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
                      Enhanced HR Adviser
                    </CardTitle>
                    <CardDescription>Advanced HR insights, policy templates, and cost simulations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-900">Compliance Score: 85/100</h4>
                          <p className="text-xs text-blue-700">3 employees need pension auto-enrollment review</p>
                          <Button className="mt-2" size="sm">
                            Review Compliance
                          </Button>
                        </div>
                        
                        <div className="p-3 bg-amber-50 rounded-lg">
                          <h4 className="font-semibold text-amber-900">Policy Updates</h4>
                          <p className="text-xs text-amber-700">New minimum wage rates effective April 2024</p>
                          <Button className="mt-2" size="sm" variant="outline">
                            View Updates
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold mb-2">Policy Templates</h5>
                        <div className="grid gap-2">
                          <Card className="border border-gray-200 hover:shadow-sm transition-shadow">
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h6 className="font-medium text-sm">Employment Contract</h6>
                                  <p className="text-xs text-gray-600">Comprehensive template with statutory requirements</p>
                                </div>
                                <Button size="sm" variant="outline">Generate</Button>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border border-gray-200 hover:shadow-sm transition-shadow">
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h6 className="font-medium text-sm">Employee Handbook</h6>
                                  <p className="text-xs text-gray-600">Complete policies and procedures guide</p>
                                </div>
                                <Button size="sm" variant="outline">Generate</Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold mb-2">Cost Simulations</h5>
                        <div className="space-y-2">
                          <Card className="border border-green-200 bg-green-50">
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h6 className="font-medium text-green-900 text-sm">5% Salary Increase</h6>
                                  <p className="text-xs text-green-700">Annual cost: £6,270 (inc. NI &amp; pension)</p>
                                </div>
                                <Button size="sm" variant="outline" className="border-green-300">
                                  Details
                                </Button>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border border-purple-200 bg-purple-50">
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h6 className="font-medium text-purple-900 text-sm">Enhanced Benefits</h6>
                                  <p className="text-xs text-purple-700">£90,000 annual cost, 15-25% turnover reduction</p>
                                </div>
                                <Button size="sm" variant="outline" className="border-purple-300">
                                  Calculate ROI
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">February Pay Run</p>
                          <p className="text-xs text-gray-600">45 employees</p>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800">Due 29 Feb</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">P11D Preparation</p>
                          <p className="text-xs text-gray-600">Benefits reporting</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Due 6 Jul</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Pension Contributions</p>
                          <p className="text-xs text-gray-600">Monthly submission</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Due 22 Feb</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="employees" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Employee Management</CardTitle>
                    <CardDescription>Manage employee records and payroll details</CardDescription>
                  </div>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Filter by department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {employees.map((employee) => (
                      <Card key={employee.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className={`${isMobile ? 'space-y-4' : 'flex items-center justify-between'}`}>
                            <div className="flex items-center gap-4">
                              {getStatusIcon(employee.status)}
                              <div>
                                <h3 className="font-semibold">{employee.name}</h3>
                                <p className="text-sm text-gray-600">{employee.position}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={`text-xs ${getStatusColor(employee.status)}`}>
                                    {employee.status}
                                  </Badge>
                                  <Badge className={`text-xs ${employee.pensionEnrolled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {employee.pensionEnrolled ? 'Pension Enrolled' : 'No Pension'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className={`${isMobile ? 'grid grid-cols-2 gap-4' : 'text-right'}`}>
                              <div>
                                <p className="font-semibold">£{employee.salary.toLocaleString()}</p>
                                <p className="text-sm text-gray-600">Annual Salary</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">YTD: £{employee.ytdGross.toLocaleString()}</p>
                                <p className="text-xs text-gray-600">Last: {employee.lastPayRun}</p>
                              </div>
                              <div className={`flex gap-2 ${isMobile ? 'col-span-2' : 'ml-4'}`}>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Settings className="h-3 w-3" />
                                </Button>
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

          <TabsContent value="payruns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pay Run Management</CardTitle>
                <CardDescription>Process payroll and manage pay runs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payRuns.map((payRun) => (
                    <Card key={payRun.id} className="border-l-4 border-l-brisk-primary">
                      <CardContent className="p-4">
                        <div className={`${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                          <div className="flex items-center gap-4">
                            {getStatusIcon(payRun.status)}
                            <div>
                              <h3 className="font-semibold">{payRun.period}</h3>
                              <p className="text-sm text-gray-600">Pay Date: {payRun.payDate}</p>
                              <Badge className={`text-xs mt-1 ${getStatusColor(payRun.status)}`}>
                                {payRun.status}
                              </Badge>
                            </div>
                          </div>
                          <div className={`${isMobile ? 'grid grid-cols-2 gap-4' : 'flex gap-8'}`}>
                            <div>
                              <p className="text-sm font-medium">Gross Pay</p>
                              <p className="text-lg font-bold">£{payRun.grossPay.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Net Pay</p>
                              <p className="text-lg font-bold">£{payRun.netPay.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Employees</p>
                              <p className="text-lg font-bold">{payRun.employeeCount}</p>
                            </div>
                            <div className={`flex gap-2 ${isMobile ? 'col-span-2' : ''}`}>
                              <Button size="sm" variant="outline">View</Button>
                              {payRun.status === 'draft' && <Button size="sm">Process</Button>}
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

          <TabsContent value="rti" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>RTI Submissions</CardTitle>
                <CardDescription>Real Time Information submissions to HMRC</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Ready for Submission</h3>
                    <p className="text-sm text-blue-700">February 2024 FPS ready for HMRC submission</p>
                    <Button className="mt-2" size="sm">
                      Submit to HMRC
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {rtiSubmissions.map((submission) => (
                      <Card key={submission.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className={`${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                            <div className="flex items-center gap-4">
                              {getStatusIcon(submission.status)}
                              <div>
                                <h3 className="font-semibold">{submission.type} - {submission.period}</h3>
                                <p className="text-sm text-gray-600">
                                  {submission.submittedDate ? `Submitted: ${submission.submittedDate}` : 'Not submitted'}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={`text-xs ${getStatusColor(submission.status)}`}>
                                    {submission.status}
                                  </Badge>
                                  <span className="text-xs text-gray-500">{submission.employeeCount} employees</span>
                                </div>
                              </div>
                            </div>
                            <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                              <div>
                                {submission.reference && (
                                  <p className="text-sm font-medium">Ref: {submission.reference}</p>
                                )}
                                <p className="text-xs text-gray-600">
                                  {submission.status === 'accepted' ? 'Successfully processed' : 'Awaiting submission'}
                                </p>
                              </div>
                              <div className={`flex gap-2 ${isMobile ? '' : 'ml-4'}`}>
                                <Button size="sm" variant="outline">View</Button>
                                {submission.status === 'pending' && <Button size="sm">Submit</Button>}
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

          <TabsContent value="statutory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statutory Payments</CardTitle>
                <CardDescription>Manage SSP, SMP, SPP, SAP, and Shared Parental Pay</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-4">Current Statutory Payments</h3>
                    <div className="space-y-3">
                      <Card className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Sarah Johnson - Maternity Pay</h4>
                              <p className="text-sm text-gray-600">SMP: £172.48/week • 12 weeks remaining</p>
                              <p className="text-xs text-gray-500">Started: 15 Jan 2024</p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Michael Brown - Sick Pay</h4>
                              <p className="text-sm text-gray-600">SSP: £109.40/week • 2 weeks</p>
                              <p className="text-xs text-gray-500">Started: 1 Feb 2024</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Calculate New Statutory Payment</h3>
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div>
                          <label className="text-sm font-medium">Employee</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employee" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">John Smith</SelectItem>
                              <SelectItem value="2">Sarah Johnson</SelectItem>
                              <SelectItem value="3">Michael Brown</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Payment Type</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SSP">Statutory Sick Pay (SSP)</SelectItem>
                              <SelectItem value="SMP">Statutory Maternity Pay (SMP)</SelectItem>
                              <SelectItem value="SPP">Statutory Paternity Pay (SPP)</SelectItem>
                              <SelectItem value="SAP">Statutory Adoption Pay (SAP)</SelectItem>
                              <SelectItem value="ShPP">Shared Parental Pay (ShPP)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Start Date</label>
                            <input type="date" className="w-full p-2 border rounded-md" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Expected Duration</label>
                            <input type="number" placeholder="Weeks" className="w-full p-2 border rounded-md" />
                          </div>
                        </div>

                        <Button className="w-full">Calculate Payment</Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold mb-4">Statutory Payment Rates (2024)</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-semibold text-blue-900">SSP</h4>
                        <p className="text-2xl font-bold text-blue-800">£109.40</p>
                        <p className="text-sm text-blue-600">per week</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-semibold text-green-900">SMP/SPP/SAP</h4>
                        <p className="text-2xl font-bold text-green-800">£172.48</p>
                        <p className="text-sm text-green-600">per week</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-semibold text-purple-900">ShPP</h4>
                        <p className="text-2xl font-bold text-purple-800">£172.48</p>
                        <p className="text-sm text-purple-600">per week</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Payroll Reports</CardTitle>
                <CardDescription>Generate comprehensive payroll reports and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Payroll Summary</h3>
                      <p className="text-sm text-gray-600 mb-3">Monthly payroll breakdown</p>
                      <Button size="sm" variant="outline">Generate</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <Calculator className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Tax and NI Report</h3>
                      <p className="text-sm text-gray-600 mb-3">PAYE and NI calculations</p>
                      <Button size="sm" variant="outline">Generate</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Pension Report</h3>
                      <p className="text-sm text-gray-600 mb-3">Auto-enrollment status</p>
                      <Button size="sm" variant="outline">Generate</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">P60 Certificates</h3>
                      <p className="text-sm text-gray-600 mb-3">Year-end tax certificates</p>
                      <Button size="sm" variant="outline">Generate P60s</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <FileText className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">P11D Benefits</h3>
                      <p className="text-sm text-gray-600 mb-3">Benefits in kind reporting</p>
                      <Button size="sm" variant="outline">Generate P11Ds</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <Calculator className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Statutory Payments</h3>
                      <p className="text-sm text-gray-600 mb-3">SSP, SMP, SPP, SAP, ShPP</p>
                      <Button size="sm" variant="outline">Calculate</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Payroll Analytics</h3>
                      <p className="text-sm text-gray-600 mb-3">Trends and insights</p>
                      <Button size="sm" variant="outline">View Analytics</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <FileText className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">CIS Reports</h3>
                      <p className="text-sm text-gray-600 mb-3">Construction industry scheme</p>
                      <Button size="sm" variant="outline">Generate CIS</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <Download className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Payslip Archive</h3>
                      <p className="text-sm text-gray-600 mb-3">Historical payslips</p>
                      <Button size="sm" variant="outline">Access Archive</Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-blue-900">Year-End Processing</h4>
                            <p className="text-sm text-blue-700">Generate all P60s and P11Ds for tax year</p>
                          </div>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Start Process
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-green-900">Pension Auto-Enrollment</h4>
                            <p className="text-sm text-green-700">Review and process new enrollments</p>
                          </div>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Review Queue
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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

import { useState, useEffect } from 'react'
import { 
  Clock, 
  Play, 
  Pause, 
  Square, 
  Plus,
  Filter,
  Search,
  CheckCircle,
  Circle,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  Download,
  Edit,
  Trash2,
  Timer,
  BarChart3,
  PieChart,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout, { ResponsiveGrid } from '@/components/ResponsiveLayout'

interface TimeEntry {
  id: string
  jobId: string
  taskId?: string
  jobTitle: string
  taskName?: string
  clientName: string
  description: string
  hours: number
  billable: boolean
  hourlyRate: number
  date: string
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  employeeName: string
}

interface JobCode {
  id: string
  code: string
  name: string
  defaultRate: number
  billable: boolean
  category: string
}

interface EmployeeRate {
  employeeId: string
  employeeName: string
  jobCodeId: string
  hourlyRate: number
}

export default function TimeAndFeesModule() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [selectedJob, setSelectedJob] = useState('')
  const [selectedTask, setSelectedTask] = useState('')

  const kpis = [
    {
      title: 'Total Hours This Week',
      value: '156.5',
      change: '+8%',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Billable Hours',
      value: '124.2',
      change: '+12%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Utilization Rate',
      value: '87%',
      change: '+5%',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      title: 'Revenue This Month',
      value: '£45,200',
      change: '+15%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ]

  const timeEntries: TimeEntry[] = [
    {
      id: '1',
      jobId: 'job1',
      jobTitle: 'VAT Return Q4 2024',
      clientName: 'ABC Manufacturing Ltd',
      description: 'Preparing quarterly VAT return and reconciliation',
      hours: 3.5,
      billable: true,
      hourlyRate: 85,
      date: '2024-01-15',
      status: 'approved',
      employeeName: 'Sarah Johnson'
    },
    {
      id: '2',
      jobId: 'job2',
      taskId: 'task1',
      jobTitle: 'Annual Accounts 2023',
      taskName: 'Trial Balance Review',
      clientName: 'XYZ Services Ltd',
      description: 'Reviewing trial balance and making adjustments',
      hours: 2.0,
      billable: true,
      hourlyRate: 95,
      date: '2024-01-15',
      status: 'submitted',
      employeeName: 'Mike Chen'
    },
    {
      id: '3',
      jobId: 'job3',
      jobTitle: 'Team Meeting',
      clientName: 'Internal',
      description: 'Weekly team standup and planning session',
      hours: 1.0,
      billable: false,
      hourlyRate: 0,
      date: '2024-01-15',
      status: 'approved',
      employeeName: 'Emma Wilson'
    }
  ]

  const jobCodes: JobCode[] = [
    { id: '1', code: 'ACC001', name: 'Accounts Preparation', defaultRate: 85, billable: true, category: 'Accounts' },
    { id: '2', code: 'TAX001', name: 'Corporation Tax', defaultRate: 95, billable: true, category: 'Tax' },
    { id: '3', code: 'VAT001', name: 'VAT Returns', defaultRate: 75, billable: true, category: 'VAT' },
    { id: '4', code: 'PAY001', name: 'Payroll Processing', defaultRate: 65, billable: true, category: 'Payroll' },
    { id: '5', code: 'ADM001', name: 'Administration', defaultRate: 0, billable: false, category: 'Admin' }
  ]

  const employeeRates: EmployeeRate[] = [
    { employeeId: '1', employeeName: 'Sarah Johnson', jobCodeId: '1', hourlyRate: 90 },
    { employeeId: '1', employeeName: 'Sarah Johnson', jobCodeId: '2', hourlyRate: 100 },
    { employeeId: '2', employeeName: 'Mike Chen', jobCodeId: '1', hourlyRate: 85 },
    { employeeId: '2', employeeName: 'Mike Chen', jobCodeId: '3', hourlyRate: 80 },
    { employeeId: '3', employeeName: 'Emma Wilson', jobCodeId: '4', hourlyRate: 70 }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatHours = (seconds: number) => {
    return (seconds / 3600).toFixed(2)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'submitted':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'rejected':
        return <Circle className="h-4 w-4 text-red-600" />
      default:
        return <Edit className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'submitted':
        return 'bg-blue-100 text-blue-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const startTimer = () => {
    setIsTimerRunning(true)
  }

  const pauseTimer = () => {
    setIsTimerRunning(false)
  }

  const stopTimer = () => {
    setIsTimerRunning(false)
    setCurrentTime(0)
  }

  const logTime = () => {
    if (currentTime > 0 && selectedJob) {
      console.log('Logging time:', {
        jobId: selectedJob,
        taskId: selectedTask,
        hours: formatHours(currentTime),
        description: 'Timer entry'
      })
      setCurrentTime(0)
      setIsTimerRunning(false)
    }
  }

  return (
    <ResponsiveLayout>
      <div className="space-y-6">
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
          <div>
            <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Time Management & Fees</h1>
            <p className="text-gray-600 mt-2">Advanced time tracking, billing workflows, and comprehensive analytics</p>
          </div>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
            <Button variant="outline" className={isMobile ? 'w-full' : ''}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className={`bg-brisk-primary hover:bg-brisk-primary-600 ${isMobile ? 'w-full' : ''}`}>
              <Plus className="h-4 w-4 mr-2" />
              New Time Entry
            </Button>
          </div>
        </div>

        <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-4 border-b`}>
          <div className={`flex ${isMobile ? 'w-full overflow-x-auto' : ''} gap-2`}>
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('dashboard')}
              className={`${isMobile ? 'flex-shrink-0' : ''} ${activeTab === 'dashboard' ? 'bg-brisk-primary' : ''}`}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'timer' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('timer')}
              className={`${isMobile ? 'flex-shrink-0' : ''} ${activeTab === 'timer' ? 'bg-brisk-primary' : ''}`}
            >
              <Timer className="h-4 w-4 mr-2" />
              Live Timer
            </Button>
            <Button
              variant={activeTab === 'entries' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('entries')}
              className={`${isMobile ? 'flex-shrink-0' : ''} ${activeTab === 'entries' ? 'bg-brisk-primary' : ''}`}
            >
              <Clock className="h-4 w-4 mr-2" />
              Time Entries
            </Button>
            <Button
              variant={activeTab === 'approvals' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('approvals')}
              className={`${isMobile ? 'flex-shrink-0' : ''} ${activeTab === 'approvals' ? 'bg-brisk-primary' : ''}`}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approvals
            </Button>
            <Button
              variant={activeTab === 'rates' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('rates')}
              className={`${isMobile ? 'flex-shrink-0' : ''} ${activeTab === 'rates' ? 'bg-brisk-primary' : ''}`}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Rates & Billing
            </Button>
            <Button
              variant={activeTab === 'reports' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('reports')}
              className={`${isMobile ? 'flex-shrink-0' : ''} ${activeTab === 'reports' ? 'bg-brisk-primary' : ''}`}
            >
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </Button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <>
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
                          <p className={`text-sm ${kpi.color}`}>{kpi.change} from last week</p>
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
                    <CardTitle>Recent Time Entries</CardTitle>
                    <CardDescription>Latest time tracking activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {timeEntries.slice(0, 5).map((entry) => (
                        <div key={entry.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                          <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                            {getStatusIcon(entry.status)}
                            <div className="flex-1">
                              <h4 className="font-medium">{entry.jobTitle}</h4>
                              {entry.taskName && <p className="text-sm text-gray-500">{entry.taskName}</p>}
                              <p className="text-sm text-gray-600">{entry.clientName}</p>
                              <p className="text-xs text-gray-500">{entry.description}</p>
                            </div>
                          </div>
                          <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                            <div>
                              <p className="text-sm font-medium">{entry.hours}h</p>
                              <p className="text-sm text-gray-600">{entry.employeeName}</p>
                              <Badge className={`text-xs ${getStatusColor(entry.status)}`}>
                                {entry.status}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {entry.billable ? `£${(entry.hours * entry.hourlyRate).toFixed(2)}` : 'Non-billable'}
                              </p>
                              <p className="text-xs text-gray-500">{entry.date}</p>
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
                    <CardTitle>Team Utilization</CardTitle>
                    <CardDescription>Current week performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Sarah Johnson</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                          <span className="text-xs text-green-600">95%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Mike Chen</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                          </div>
                          <span className="text-xs text-blue-600">87%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Emma Wilson</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                          <span className="text-xs text-orange-600">78%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analytics</CardTitle>
                    <CardDescription>This month's performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Billable Hours</span>
                        <span className="text-sm font-medium">324.5h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Average Rate</span>
                        <span className="text-sm font-medium">£85/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Revenue</span>
                        <span className="text-sm font-medium">£27,582</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm font-medium">Projected Monthly</span>
                        <span className="text-sm font-bold text-green-600">£45,200</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {activeTab === 'timer' && (
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
            <Card>
              <CardHeader>
                <CardTitle>Live Timer</CardTitle>
                <CardDescription>Track time in real-time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-mono font-bold text-brisk-primary mb-4">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-sm text-gray-600 mb-6">
                    {formatHours(currentTime)} hours
                  </div>
                  <div className="flex justify-center gap-3">
                    {!isTimerRunning ? (
                      <Button onClick={startTimer} className="bg-green-600 hover:bg-green-700">
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    ) : (
                      <Button onClick={pauseTimer} className="bg-brisk-primary hover:bg-brisk-primary-600">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button onClick={stopTimer} variant="outline">
                      <Square className="h-4 w-4 mr-2" />
                      Stop
                    </Button>
                    {currentTime > 0 && (
                      <Button onClick={logTime} className="bg-brisk-primary hover:bg-brisk-primary-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Log Time
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Timer Settings</CardTitle>
                <CardDescription>Configure your time entry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Job</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                  >
                    <option value="">Select a job...</option>
                    <option value="job1">VAT Return Q4 2024 - ABC Manufacturing Ltd</option>
                    <option value="job2">Annual Accounts 2023 - XYZ Services Ltd</option>
                    <option value="job3">Payroll Processing - DEF Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Task (Optional)</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedTask}
                    onChange={(e) => setSelectedTask(e.target.value)}
                  >
                    <option value="">Select a task...</option>
                    <option value="task1">Trial Balance Review</option>
                    <option value="task2">Adjustments & Reclassifications</option>
                    <option value="task3">Final Review</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea 
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    placeholder="Describe what you're working on..."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="billable" defaultChecked />
                  <label htmlFor="billable" className="text-sm">Billable time</label>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'entries' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Time Entries</CardTitle>
                  <CardDescription>Manage all time entries</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search entries..." className={`pl-10 ${isMobile ? 'w-full' : 'w-64'}`} />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeEntries.map((entry) => (
                  <div key={entry.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                    <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                      {getStatusIcon(entry.status)}
                      <div className="flex-1">
                        <h4 className="font-medium">{entry.jobTitle}</h4>
                        {entry.taskName && <p className="text-sm text-gray-500">{entry.taskName}</p>}
                        <p className="text-sm text-gray-600">{entry.clientName}</p>
                        <p className="text-xs text-gray-500">{entry.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {entry.billable ? 'Billable' : 'Non-billable'}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(entry.status)}`}>
                            {entry.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className={`${isMobile ? 'flex justify-between items-center' : 'text-right'}`}>
                      <div>
                        <p className="text-sm font-medium">{entry.hours}h</p>
                        <p className="text-sm text-gray-600">{entry.employeeName}</p>
                        <p className="text-xs text-gray-500">{entry.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {entry.billable ? `£${(entry.hours * entry.hourlyRate).toFixed(2)}` : '£0.00'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {entry.billable ? `£${entry.hourlyRate}/hr` : 'Non-billable'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'approvals' && (
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
            <div className={isMobile ? '' : 'lg:col-span-2'}>
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                  <CardDescription>Time entries awaiting approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeEntries.filter(entry => entry.status === 'submitted').map((entry) => (
                      <div key={entry.id} className={`p-4 border rounded-lg ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                        <div className="flex-1">
                          <h4 className="font-medium">{entry.jobTitle}</h4>
                          <p className="text-sm text-gray-600">{entry.clientName}</p>
                          <p className="text-xs text-gray-500">{entry.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-medium">{entry.hours}h</span>
                            <span className="text-sm text-gray-600">by {entry.employeeName}</span>
                            <Badge className="text-xs bg-blue-100 text-blue-800">
                              £{(entry.hours * entry.hourlyRate).toFixed(2)}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Approval Summary</CardTitle>
                  <CardDescription>This week's activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pending</span>
                      <span className="text-sm font-medium">3 entries</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Approved</span>
                      <span className="text-sm font-medium">24 entries</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Rejected</span>
                      <span className="text-sm font-medium">1 entry</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-medium">Total Value</span>
                      <span className="text-sm font-bold">£12,450</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'rates' && (
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
            <Card>
              <CardHeader>
                <CardTitle>Job Codes</CardTitle>
                <CardDescription>Manage billing codes and default rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobCodes.map((code) => (
                    <div key={code.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{code.code}</h4>
                        <p className="text-sm text-gray-600">{code.name}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {code.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {code.billable ? `£${code.defaultRate}/hr` : 'Non-billable'}
                        </p>
                        <Badge className={`text-xs ${code.billable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {code.billable ? 'Billable' : 'Non-billable'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employee Rates</CardTitle>
                <CardDescription>Per-employee hourly rates by job code</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employeeRates.map((rate, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{rate.employeeName}</h4>
                        <p className="text-sm text-gray-600">
                          {jobCodes.find(code => code.id === rate.jobCodeId)?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">£{rate.hourlyRate}/hr</p>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
              <Card>
                <CardHeader>
                  <CardTitle>Utilization Report</CardTitle>
                  <CardDescription>Team efficiency metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <PieChart className="h-16 w-16 mx-auto text-brisk-primary mb-4" />
                    <p className="text-2xl font-bold">87%</p>
                    <p className="text-sm text-gray-600">Average utilization</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analysis</CardTitle>
                  <CardDescription>Financial performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 mx-auto text-green-600 mb-4" />
                    <p className="text-2xl font-bold">£45,200</p>
                    <p className="text-sm text-gray-600">This month</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Efficiency Metrics</CardTitle>
                  <CardDescription>Performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <Target className="h-16 w-16 mx-auto text-purple-600 mb-4" />
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-sm text-gray-600">On-time delivery</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Reports</CardTitle>
                <CardDescription>Generate comprehensive reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    <span>Time Summary</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <DollarSign className="h-6 w-6 mb-2" />
                    <span>Billing Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Team Performance</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span>Utilization Analysis</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span>Project Timeline</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    <span>Revenue Forecast</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ResponsiveLayout>
  )
}

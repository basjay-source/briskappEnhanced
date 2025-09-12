import { useState, useEffect } from 'react'
import { 
  Clock, 
  Play, 
  Pause, 
  Square, 
  Plus,
  CheckCircle,
  Circle,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Edit,
  Timer,
  BarChart3,
  PieChart,
  Target,
  Brain,
  Zap,
  Settings,
  AlertTriangle,
  TrendingDown,
  Award,
  Activity,
  Calculator,
  BarChart,
  Database,
  Globe,
  Lightbulb,
  Percent,
  Smartphone,
  Star,
  Workflow
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout, { ResponsiveGrid } from '@/components/ResponsiveLayout'
import { SearchFilterHeader } from '../../components/SearchFilterHeader'
import KPICard from '../../components/KPICard'

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
  aiSuggestions?: string[]
  profitabilityScore?: number
  automationLevel?: 'manual' | 'semi-auto' | 'fully-auto'
}

interface JobCode {
  id: string
  code: string
  name: string
  defaultRate: number
  billable: boolean
  category: string
  profitMargin?: number
  demandLevel?: 'low' | 'medium' | 'high'
  skillLevel?: 'junior' | 'senior' | 'expert'
}

interface EmployeeRate {
  employeeId: string
  employeeName: string
  jobCodeId: string
  hourlyRate: number
  utilizationTarget?: number
  performanceScore?: number
  specializations?: string[]
}

interface AIInsight {
  type: 'optimization' | 'warning' | 'opportunity' | 'forecast'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high'
  actionable: boolean
}

export default function TimeAndFeesModuleAdvanced() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [selectedJob, setSelectedJob] = useState('')
  const [selectedTask, setSelectedTask] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProjectStatus, setSelectedProjectStatus] = useState('all')
  const [selectedClientType, setSelectedClientType] = useState('all')
  const [selectedBillingStatus, setSelectedBillingStatus] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const kpis = [
    {
      title: 'Total Hours This Week',
      value: '156.5',
      change: '+8%',
      icon: Clock,
      color: 'text-blue-600',
      trend: 'up'
    },
    {
      title: 'Billable Hours',
      value: '124.2',
      change: '+12%',
      icon: DollarSign,
      color: 'text-green-600',
      trend: 'up'
    },
    {
      title: 'Utilization Rate',
      value: '87%',
      change: '+5%',
      icon: Target,
      color: 'text-purple-600',
      trend: 'up'
    },
    {
      title: 'Revenue This Month',
      value: '£45,200',
      change: '+15%',
      icon: TrendingUp,
      color: 'text-orange-600',
      trend: 'up'
    },
    {
      title: 'Profit Margin',
      value: '68%',
      change: '+3%',
      icon: Percent,
      color: 'text-emerald-600',
      trend: 'up'
    },
    {
      title: 'AI Automation',
      value: '42%',
      change: '+18%',
      icon: Brain,
      color: 'text-indigo-600',
      trend: 'up'
    }
  ]

  const aiInsights: AIInsight[] = [
    {
      type: 'optimization',
      title: 'Optimize Sarah Johnson\'s Schedule',
      description: 'Sarah has 15% idle time this week. Suggest reallocating 6 hours to high-value tax work.',
      impact: 'high',
      actionable: true
    },
    {
      type: 'opportunity',
      title: 'Premium Rate Opportunity',
      description: 'Client ABC Manufacturing shows 95% satisfaction. Consider 15% rate increase for next engagement.',
      impact: 'medium',
      actionable: true
    },
    {
      type: 'warning',
      title: 'Capacity Constraint Alert',
      description: 'Team utilization will exceed 95% next week. Consider resource reallocation or overtime.',
      impact: 'high',
      actionable: true
    },
    {
      type: 'forecast',
      title: 'Revenue Forecast Update',
      description: 'Based on current trends, monthly revenue projected to reach £52,000 (+16% vs target).',
      impact: 'medium',
      actionable: false
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
      employeeName: 'Sarah Johnson',
      aiSuggestions: ['Consider automating VAT reconciliation', 'Client shows pattern for quarterly extensions'],
      profitabilityScore: 85,
      automationLevel: 'semi-auto'
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
      employeeName: 'Mike Chen',
      aiSuggestions: ['Use AI-powered anomaly detection', 'Historical data suggests 2.5h typical duration'],
      profitabilityScore: 92,
      automationLevel: 'manual'
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
      employeeName: 'Emma Wilson',
      profitabilityScore: 0,
      automationLevel: 'manual'
    }
  ]

  const jobCodes: JobCode[] = [
    { 
      id: '1', 
      code: 'ACC001', 
      name: 'Accounts Preparation', 
      defaultRate: 85, 
      billable: true, 
      category: 'Accounts',
      profitMargin: 68,
      demandLevel: 'high',
      skillLevel: 'senior'
    },
    { 
      id: '2', 
      code: 'TAX001', 
      name: 'Corporation Tax', 
      defaultRate: 95, 
      billable: true, 
      category: 'Tax',
      profitMargin: 72,
      demandLevel: 'high',
      skillLevel: 'expert'
    },
    { 
      id: '3', 
      code: 'VAT001', 
      name: 'VAT Returns', 
      defaultRate: 75, 
      billable: true, 
      category: 'VAT',
      profitMargin: 65,
      demandLevel: 'medium',
      skillLevel: 'senior'
    },
    { 
      id: '4', 
      code: 'PAY001', 
      name: 'Payroll Processing', 
      defaultRate: 65, 
      billable: true, 
      category: 'Payroll',
      profitMargin: 58,
      demandLevel: 'medium',
      skillLevel: 'junior'
    },
    { 
      id: '5', 
      code: 'ADM001', 
      name: 'Administration', 
      defaultRate: 0, 
      billable: false, 
      category: 'Admin',
      profitMargin: 0,
      demandLevel: 'low',
      skillLevel: 'junior'
    }
  ]

  const employeeRates: EmployeeRate[] = [
    { 
      employeeId: '1', 
      employeeName: 'Sarah Johnson', 
      jobCodeId: '1', 
      hourlyRate: 90,
      utilizationTarget: 85,
      performanceScore: 94,
      specializations: ['FRS 102', 'IFRS', 'Group Accounts']
    },
    { 
      employeeId: '1', 
      employeeName: 'Sarah Johnson', 
      jobCodeId: '2', 
      hourlyRate: 100,
      utilizationTarget: 85,
      performanceScore: 94,
      specializations: ['Corporation Tax', 'R&D Claims']
    },
    { 
      employeeId: '2', 
      employeeName: 'Mike Chen', 
      jobCodeId: '1', 
      hourlyRate: 85,
      utilizationTarget: 80,
      performanceScore: 88,
      specializations: ['SME Accounts', 'Charity Accounts']
    },
    { 
      employeeId: '2', 
      employeeName: 'Mike Chen', 
      jobCodeId: '3', 
      hourlyRate: 80,
      utilizationTarget: 80,
      performanceScore: 88,
      specializations: ['VAT', 'MTD']
    },
    { 
      employeeId: '3', 
      employeeName: 'Emma Wilson', 
      jobCodeId: '4', 
      hourlyRate: 70,
      utilizationTarget: 75,
      performanceScore: 82,
      specializations: ['Payroll', 'Auto Enrolment']
    }
  ]

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
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

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization':
        return <Zap className="h-4 w-4 text-blue-600" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case 'opportunity':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'forecast':
        return <BarChart className="h-4 w-4 text-purple-600" />
      default:
        return <Lightbulb className="h-4 w-4 text-gray-600" />
    }
  }

  const getInsightColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'border-red-200 bg-red-50'
      case 'medium':
        return 'border-orange-200 bg-orange-50'
      case 'low':
        return 'border-blue-200 bg-blue-50'
      default:
        return 'border-gray-200 bg-gray-50'
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

  const projectStatusOptions = [
    { label: 'All Project Status', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'On Hold', value: 'on-hold' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' }
  ]

  const clientTypeOptions = [
    { label: 'All Client Types', value: 'all' },
    { label: 'Corporate', value: 'corporate' },
    { label: 'SME', value: 'sme' },
    { label: 'Individual', value: 'individual' },
    { label: 'Non-Profit', value: 'non-profit' }
  ]

  const billingStatusOptions = [
    { label: 'All Billing Status', value: 'all' },
    { label: 'Billable', value: 'billable' },
    { label: 'Non-Billable', value: 'non-billable' },
    { label: 'Invoiced', value: 'invoiced' },
    { label: 'Paid', value: 'paid' }
  ]

  return (
    <ResponsiveLayout>
      <div className="space-y-6">
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
          <div>
            <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
              Time Management & Fees
            </h1>
            <p className="text-gray-600 mt-2">
              AI-powered time tracking, advanced analytics, and intelligent workflow automation
            </p>
          </div>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
            <Button variant="outline" className={isMobile ? 'w-full' : ''}>
              <Brain className="h-4 w-4 mr-2" />
              AI Insights
            </Button>
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
              variant={activeTab === 'ai-insights' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('ai-insights')}
              className={`${isMobile ? 'flex-shrink-0' : ''} ${activeTab === 'ai-insights' ? 'bg-brisk-primary' : ''}`}
            >
              <Brain className="h-4 w-4 mr-2" />
              AI Insights
            </Button>
            <Button
              variant={activeTab === 'timer' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('timer')}
              className={`${isMobile ? 'flex-shrink-0' : ''} ${activeTab === 'timer' ? 'bg-brisk-primary' : ''}`}
            >
              <Timer className="h-4 w-4 mr-2" />
              Smart Timer
            </Button>
            <Button
              variant={activeTab === 'analytics' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('analytics')}
              className={`${isMobile ? 'flex-shrink-0' : ''} ${activeTab === 'analytics' ? 'bg-brisk-primary' : ''}`}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button
              variant={activeTab === 'workflow' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('workflow')}
              className={`${isMobile ? 'flex-shrink-0' : ''} ${activeTab === 'workflow' ? 'bg-brisk-primary' : ''}`}
            >
              <Workflow className="h-4 w-4 mr-2" />
              Automation
            </Button>
            <Button
              variant={activeTab === 'capacity' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('capacity')}
              className={`${isMobile ? 'flex-shrink-0' : ''} ${activeTab === 'capacity' ? 'bg-brisk-primary' : ''}`}
            >
              <Users className="h-4 w-4 mr-2" />
              Capacity
            </Button>
            <Button
              variant={activeTab === 'profitability' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('profitability')}
              className={`${isMobile ? 'flex-shrink-0' : ''} ${activeTab === 'profitability' ? 'bg-brisk-primary' : ''}`}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Profitability
            </Button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <SearchFilterHeader
              searchPlaceholder="Search projects, timesheets, clients..."
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              filters={[
                {
                  label: 'Project Status',
                  options: projectStatusOptions,
                  value: selectedProjectStatus,
                  onChange: setSelectedProjectStatus
                },
                {
                  label: 'Client Type',
                  options: clientTypeOptions,
                  value: selectedClientType,
                  onChange: setSelectedClientType
                },
                {
                  label: 'Billing Status',
                  options: billingStatusOptions,
                  value: selectedBillingStatus,
                  onChange: setSelectedBillingStatus
                }
              ]}
              dateRange={{
                from: dateFrom,
                to: dateTo,
                onFromChange: setDateFrom,
                onToChange: setDateTo
              }}
            />
            
            <ResponsiveGrid className={isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}>
              {kpis.map((kpi, index) => {
                const Icon = kpi.icon
                const drillDownData = {
                  title: `${kpi.title} Analysis`,
                  description: `Detailed time management analysis and breakdown for ${kpi.title.toLowerCase()}`,
                  content: (
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Current Period</h4>
                          <p className="text-2xl font-bold">{kpi.value}</p>
                          <p className={`text-sm ${kpi.color} flex items-center gap-1`}>
                            {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {kpi.change} from last week
                          </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Efficiency Score</h4>
                          <p className="text-sm text-gray-600">Time tracking efficiency</p>
                          <div className="mt-2">
                            <div className="flex justify-between text-xs">
                              <span>Overall Score</span>
                              <span className="text-green-600">92%</span>
                            </div>
                            <Progress value={92} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      {kpi.title === 'Total Hours' && (
                        <div>
                          <h4 className="font-semibold mb-3">Hours Breakdown</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between p-2 border rounded">
                              <span>Billable Hours</span>
                              <span className="font-semibold">156.5 hours</span>
                            </div>
                            <div className="flex justify-between p-2 border rounded">
                              <span>Non-Billable Hours</span>
                              <span className="font-semibold">23.5 hours</span>
                            </div>
                            <div className="flex justify-between p-2 border rounded">
                              <span>Admin Time</span>
                              <span className="font-semibold">8.0 hours</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {kpi.title === 'Billable Hours' && (
                        <div>
                          <h4 className="font-semibold mb-3">Billing Analysis</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 border rounded">
                              <span>Standard Rate</span>
                              <Badge variant="default">£125/hour</Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 border rounded">
                              <span>Premium Rate</span>
                              <Badge variant="secondary">£175/hour</Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 border rounded">
                              <span>Discounted Rate</span>
                              <Badge variant="outline">£95/hour</Badge>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {kpi.title === 'Utilization Rate' && (
                        <div>
                          <h4 className="font-semibold mb-3">Utilization Trends</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between p-2 border rounded">
                              <span>This Week</span>
                              <span className="font-semibold">87%</span>
                            </div>
                            <div className="flex justify-between p-2 border rounded">
                              <span>Last Week</span>
                              <span className="font-semibold">82%</span>
                            </div>
                            <div className="flex justify-between p-2 border rounded">
                              <span>Monthly Average</span>
                              <span className="font-semibold">85%</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-2 pt-4">
                        <Button variant="outline">Export Time Data</Button>
                        <Button>Generate Timesheet</Button>
                      </div>
                    </div>
                  )
                }
                return (
                  <KPICard
                    key={index}
                    title={kpi.title}
                    value={kpi.value}
                    change={`${kpi.change} from last week`}
                    icon={Icon}
                    color={kpi.color}
                    drillDownData={drillDownData}
                  />
                )
              })}
            </ResponsiveGrid>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
              <div className={isMobile ? '' : 'lg:col-span-2'}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Recent Time Entries
                    </CardTitle>
                    <CardDescription>Latest time tracking activity with AI insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SearchFilterHeader
                      searchPlaceholder="Search time entries, jobs, clients..."
                      searchValue={searchTerm}
                      onSearchChange={setSearchTerm}
                      filters={[
                        {
                          label: 'Project Status',
                          options: projectStatusOptions,
                          value: selectedProjectStatus,
                          onChange: setSelectedProjectStatus
                        },
                        {
                          label: 'Client Type',
                          options: clientTypeOptions,
                          value: selectedClientType,
                          onChange: setSelectedClientType
                        },
                        {
                          label: 'Billing Status',
                          options: billingStatusOptions,
                          value: selectedBillingStatus,
                          onChange: setSelectedBillingStatus
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
                      {timeEntries.slice(0, 5).map((entry) => (
                        <div key={entry.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                          <div className={`flex items-center gap-4 ${isMobile ? 'justify-between' : ''}`}>
                            {getStatusIcon(entry.status)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{entry.jobTitle}</h4>
                                {entry.profitabilityScore && (
                                  <Badge variant="outline" className="text-xs">
                                    {entry.profitabilityScore}% profit
                                  </Badge>
                                )}
                                {entry.automationLevel === 'semi-auto' && (
                                  <Badge className="text-xs bg-blue-100 text-blue-800">
                                    <Zap className="h-3 w-3 mr-1" />
                                    Semi-Auto
                                  </Badge>
                                )}
                              </div>
                              {entry.taskName && <p className="text-sm text-gray-500">{entry.taskName}</p>}
                              <p className="text-sm text-gray-600">{entry.clientName}</p>
                              <p className="text-xs text-gray-500">{entry.description}</p>
                              {entry.aiSuggestions && entry.aiSuggestions.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs text-blue-600 flex items-center gap-1">
                                    <Brain className="h-3 w-3" />
                                    AI: {entry.aiSuggestions[0]}
                                  </p>
                                </div>
                              )}
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
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-brisk-primary" />
                      AI Insights
                    </CardTitle>
                    <CardDescription>Intelligent recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {aiInsights.slice(0, 3).map((insight, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${getInsightColor(insight.impact)}`}>
                          <div className="flex items-start gap-2">
                            {getInsightIcon(insight.type)}
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{insight.title}</h4>
                              <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                              {insight.actionable && (
                                <Button size="sm" variant="outline" className="mt-2 h-6 text-xs">
                                  Take Action
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      Team Performance
                    </CardTitle>
                    <CardDescription>Real-time utilization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Sarah Johnson</span>
                          <Badge className="text-xs bg-green-100 text-green-800">
                            <Star className="h-3 w-3 mr-1" />
                            94
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                          <span className="text-xs text-green-600">95%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Mike Chen</span>
                          <Badge className="text-xs bg-blue-100 text-blue-800">
                            <Star className="h-3 w-3 mr-1" />
                            88
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                          </div>
                          <span className="text-xs text-blue-600">87%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Emma Wilson</span>
                          <Badge className="text-xs bg-orange-100 text-orange-800">
                            <Star className="h-3 w-3 mr-1" />
                            82
                          </Badge>
                        </div>
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
              </div>
            </div>
          </>
        )}

        {activeTab === 'ai-insights' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-brisk-primary" />
                  AI-Powered Insights & Recommendations
                </CardTitle>
                <CardDescription>
                  Intelligent analysis of your time tracking data with actionable recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${getInsightColor(insight.impact)}`}>
                      <div className="flex items-start gap-3">
                        {getInsightIcon(insight.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{insight.title}</h3>
                            <Badge variant="outline" className={`text-xs ${
                              insight.impact === 'high' ? 'border-red-300 text-red-700' :
                              insight.impact === 'medium' ? 'border-orange-300 text-orange-700' :
                              'border-blue-300 text-blue-700'
                            }`}>
                              {insight.impact} impact
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{insight.description}</p>
                          {insight.actionable && (
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-brisk-primary hover:bg-brisk-primary-600">
                                Implement
                              </Button>
                              <Button size="sm" variant="outline">
                                Learn More
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Predictive Analytics
                  </CardTitle>
                  <CardDescription>AI-powered forecasting and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800">Revenue Forecast</h4>
                      <p className="text-sm text-green-600">
                        Based on current trends, expect £52,000 revenue this month (+16% vs target)
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800">Capacity Planning</h4>
                      <p className="text-sm text-blue-600">
                        Team will reach 95% capacity by week 3. Consider hiring or outsourcing.
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-800">Client Retention</h4>
                      <p className="text-sm text-purple-600">
                        ABC Manufacturing shows 98% retention probability based on engagement patterns.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Automation Opportunities
                  </CardTitle>
                  <CardDescription>Tasks ready for automation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">VAT Return Processing</h4>
                        <p className="text-sm text-gray-600">42% automation potential</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Automate
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Time Entry Classification</h4>
                        <p className="text-sm text-gray-600">78% automation potential</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Automate
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Invoice Generation</h4>
                        <p className="text-sm text-gray-600">85% automation potential</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Automate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'timer' && (
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  Smart Timer
                </CardTitle>
                <CardDescription>AI-enhanced time tracking with intelligent suggestions</CardDescription>
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
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Smart Timer Settings
                </CardTitle>
                <CardDescription>AI-powered job and task suggestions</CardDescription>
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
                  {selectedJob && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                      <Brain className="h-3 w-3 inline mr-1" />
                      AI suggests 2.5h typical duration for this task type
                    </div>
                  )}
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
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="ai-assist" defaultChecked />
                  <label htmlFor="ai-assist" className="text-sm">Enable AI assistance</label>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-brisk-primary" />
                    Utilization Analysis
                  </CardTitle>
                  <CardDescription>Team efficiency breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brisk-primary mb-2">87%</div>
                    <p className="text-sm text-gray-600 mb-4">Average utilization</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Billable</span>
                        <span className="font-medium">79%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Non-billable</span>
                        <span className="font-medium">8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Admin</span>
                        <span className="font-medium">13%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Revenue Trends
                  </CardTitle>
                  <CardDescription>Financial performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">£45.2K</div>
                    <p className="text-sm text-gray-600 mb-4">This month</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>vs Last Month</span>
                        <span className="font-medium text-green-600">+15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>vs Target</span>
                        <span className="font-medium text-green-600">+8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Forecast</span>
                        <span className="font-medium">£52K</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Efficiency Score
                  </CardTitle>
                  <CardDescription>Overall performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">94%</div>
                    <p className="text-sm text-gray-600 mb-4">Efficiency rating</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>On-time delivery</span>
                        <span className="font-medium">96%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quality score</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Client satisfaction</span>
                        <span className="font-medium">94%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Advanced Analytics Dashboard
                </CardTitle>
                <CardDescription>Comprehensive performance metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
                  <Button variant="outline" className="h-24 flex-col justify-center">
                    <BarChart className="h-6 w-6 mb-2 text-blue-600" />
                    <span className="text-sm">Revenue Forecast</span>
                    <span className="text-xs text-gray-500">AI-powered</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col justify-center">
                    <Users className="h-6 w-6 mb-2 text-green-600" />
                    <span className="text-sm">Team Performance</span>
                    <span className="text-xs text-gray-500">Real-time</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col justify-center">
                    <Percent className="h-6 w-6 mb-2 text-purple-600" />
                    <span className="text-sm">Profitability</span>
                    <span className="text-xs text-gray-500">By client/job</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col justify-center">
                    <Calendar className="h-6 w-6 mb-2 text-orange-600" />
                    <span className="text-sm">Capacity Planning</span>
                    <span className="text-xs text-gray-500">Predictive</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col justify-center">
                    <Award className="h-6 w-6 mb-2 text-indigo-600" />
                    <span className="text-sm">Quality Metrics</span>
                    <span className="text-xs text-gray-500">Benchmarked</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col justify-center">
                    <Globe className="h-6 w-6 mb-2 text-teal-600" />
                    <span className="text-sm">Market Analysis</span>
                    <span className="text-xs text-gray-500">Competitive</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col justify-center">
                    <Database className="h-6 w-6 mb-2 text-red-600" />
                    <span className="text-sm">Data Insights</span>
                    <span className="text-xs text-gray-500">ML-driven</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col justify-center">
                    <Smartphone className="h-6 w-6 mb-2 text-pink-600" />
                    <span className="text-sm">Mobile Analytics</span>
                    <span className="text-xs text-gray-500">Cross-platform</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-brisk-primary" />
                  Intelligent Workflow Automation
                </CardTitle>
                <CardDescription>
                  AI-powered automation rules and workflow optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  <div>
                    <h3 className="font-medium mb-4">Active Automation Rules</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Auto-categorize Time Entries</h4>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Automatically categorizes time entries based on description and client patterns
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Zap className="h-3 w-3" />
                          <span>78% accuracy • Saves 2.5h/week</span>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Smart Rate Suggestions</h4>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Suggests optimal billing rates based on client value and market data
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <TrendingUp className="h-3 w-3" />
                          <span>12% revenue increase • 95% acceptance rate</span>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Deadline Alerts</h4>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Proactive notifications for approaching deadlines and capacity issues
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <AlertTriangle className="h-3 w-3" />
                          <span>Zero missed deadlines • 24h advance notice</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Available Automations</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg border-dashed">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Invoice Generation</h4>
                          <Button size="sm" variant="outline">Enable</Button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Auto-generate invoices when time entries are approved
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calculator className="h-3 w-3" />
                          <span>Potential: 85% automation • 4h/week saved</span>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg border-dashed">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Client Communication</h4>
                          <Button size="sm" variant="outline">Enable</Button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Automated status updates and progress reports to clients
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Users className="h-3 w-3" />
                          <span>Potential: 60% automation • Better satisfaction</span>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg border-dashed">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Resource Optimization</h4>
                          <Button size="sm" variant="outline">Enable</Button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          AI-powered task assignment based on skills and availability
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Target className="h-3 w-3" />
                          <span>Potential: 15% efficiency gain • Balanced workload</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'capacity' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-brisk-primary" />
                  Advanced Capacity Planning
                </CardTitle>
                <CardDescription>
                  AI-powered resource optimization and capacity forecasting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  <div>
                    <h3 className="font-medium mb-4">Current Capacity Overview</h3>
                    <div className="space-y-4">
                      {employeeRates.slice(0, 3).map((employee, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{employee.employeeName}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="text-xs bg-blue-100 text-blue-800">
                                  <Star className="h-3 w-3 mr-1" />
                                  {employee.performanceScore}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Target: {employee.utilizationTarget}%
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">
                                {index === 0 ? '95%' : index === 1 ? '87%' : '78%'}
                              </div>
                              <div className="text-xs text-gray-500">Current utilization</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Billable hours</span>
                              <span>{index === 0 ? '38.5h' : index === 1 ? '34.8h' : '31.2h'}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Available capacity</span>
                              <span className="text-green-600">
                                {index === 0 ? '2h' : index === 1 ? '5.2h' : '8.8h'}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Specializations: {employee.specializations?.join(', ')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Capacity Forecasting</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <h4 className="font-medium text-orange-800">Capacity Alert</h4>
                        </div>
                        <p className="text-sm text-orange-700 mb-3">
                          Team utilization will exceed 95% in week 3. Consider resource reallocation.
                        </p>
                        <Button size="sm" className="bg-brisk-primary hover:bg-brisk-primary-600 text-white">
                          View Recommendations
                        </Button>
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <h4 className="font-medium text-blue-800">Growth Opportunity</h4>
                        </div>
                        <p className="text-sm text-blue-700 mb-3">
                          Demand for tax services increasing by 25%. Consider expanding team.
                        </p>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Hiring Plan
                        </Button>
                      </div>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-green-600" />
                          <h4 className="font-medium text-green-800">Optimization Suggestion</h4>
                        </div>
                        <p className="text-sm text-green-700 mb-3">
                          Reallocating 6h from admin to billable work could increase revenue by £510.
                        </p>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          Apply Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profitability' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Advanced Profitability Analysis
                </CardTitle>
                <CardDescription>
                  Comprehensive profit analysis by client, job type, and employee
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                  <div>
                    <h3 className="font-medium mb-4">Top Performing Clients</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">ABC Manufacturing</h4>
                          <Badge className="bg-green-100 text-green-800">92% margin</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Revenue</span>
                            <span>£12,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hours</span>
                            <span>147h</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg Rate</span>
                            <span>£85/h</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">XYZ Services</h4>
                          <Badge className="bg-green-100 text-green-800">88% margin</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Revenue</span>
                            <span>£9,800</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hours</span>
                            <span>103h</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg Rate</span>
                            <span>£95/h</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">DEF Consulting</h4>
                          <Badge className="bg-orange-100 text-orange-800">72% margin</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Revenue</span>
                            <span>£6,200</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hours</span>
                            <span>95h</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg Rate</span>
                            <span>£65/h</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Service Line Profitability</h3>
                    <div className="space-y-3">
                      {jobCodes.filter(code => code.billable).map((code) => (
                        <div key={code.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{code.name}</h4>
                            <Badge className={`${
                              code.profitMargin && code.profitMargin > 70 ? 'bg-green-100 text-green-800' :
                              code.profitMargin && code.profitMargin > 60 ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {code.profitMargin}% margin
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div className="flex justify-between">
                              <span>Default Rate</span>
                              <span>£{code.defaultRate}/h</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Demand</span>
                              <span className="capitalize">{code.demandLevel}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Skill Level</span>
                              <span className="capitalize">{code.skillLevel}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Profitability Insights</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <h4 className="font-medium text-green-800">Rate Optimization</h4>
                        </div>
                        <p className="text-sm text-green-700">
                          Corporation Tax services show 15% rate increase potential based on market analysis.
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <h4 className="font-medium text-blue-800">Resource Efficiency</h4>
                        </div>
                        <p className="text-sm text-blue-700">
                          Sarah Johnson generates 23% higher profit margins than team average.
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-purple-600" />
                          <h4 className="font-medium text-purple-800">Growth Opportunity</h4>
                        </div>
                        <p className="text-sm text-purple-700">
                          Focus on high-margin accounts preparation could increase overall profitability by 8%.
                        </p>
                      </div>
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <h4 className="font-medium text-orange-800">Cost Alert</h4>
                        </div>
                        <p className="text-sm text-orange-700">
                          Administrative overhead increased 12% this quarter. Review non-billable activities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ResponsiveLayout>
  )
}

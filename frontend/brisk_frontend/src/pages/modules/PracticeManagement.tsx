import { 
  Calendar, 
  Users, 
  Clock, 
  AlertTriangle, 
  Plus,
  Filter,
  CheckCircle,
  Circle,
  Pause,
  Mail,
  FileText,
  Award,
  Globe,
  Workflow,
  Target,
  Shield,
  TrendingUp,
  ChevronDown,
  BarChart3,
  Heart
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout, { ResponsiveGrid } from '@/components/ResponsiveLayout'
import KPICard from '@/components/KPICard'
import NewEmailStudio from '@/components/NewEmailStudio'
import PayslipTemplateManager from '../../components/PayslipTemplateManager'
import InvoiceTemplateManager from '../../components/InvoiceTemplateManager'
import AIPromptSection from '../../components/AIPromptSection'
import ClientPortalAdvanced from '../../components/ClientPortalAdvanced'
import WorkflowBuilderAdvanced from '../../components/WorkflowBuilderAdvanced'
import CapacityPlanningAdvanced from '../../components/CapacityPlanningAdvanced'
import ComplianceAutomation from '../../components/ComplianceAutomation'

export default function PracticeManagement() {
  const isMobile = useIsMobile()
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['jobs'])
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')

  const handleAIQuestion = async (question: string) => {
    setIsAILoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('AI Question:', question)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsAILoading(false)
    }
  }

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'on_hold', label: 'On Hold' }
  ]

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ]


  const kpis = [
    {
      title: 'Active Jobs',
      value: '24',
      change: '+3 from last week',
      trend: 'up' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Completed This Month',
      value: '156',
      change: '+12% from last month',
      trend: 'up' as const,
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Avg. Completion Time',
      value: '4.2 days',
      change: '-0.8 days improvement',
      trend: 'up' as const,
      icon: Clock,
      color: 'orange'
    },
    {
      title: 'Client Satisfaction',
      value: '94%',
      change: '+2% from last month',
      trend: 'up' as const,
      icon: Award,
      color: 'purple'
    }
  ]

  const jobs = [
    {
      id: 1,
      title: 'Annual Accounts - ABC Ltd',
      client: 'ABC Ltd',
      status: 'in_progress',
      priority: 'high',
      assignee: 'John Smith',
      dueDate: '2024-02-15',
      progress: 75
    },
    {
      id: 2,
      title: 'VAT Return Q4',
      client: 'XYZ Corp',
      status: 'completed',
      priority: 'medium',
      assignee: 'Sarah Johnson',
      dueDate: '2024-02-10',
      progress: 100
    },
    {
      id: 3,
      title: 'Payroll Processing',
      client: 'DEF Ltd',
      status: 'on_hold',
      priority: 'low',
      assignee: 'Mike Wilson',
      dueDate: '2024-02-20',
      progress: 30
    }
  ]

  const upcomingDeadlines = [
    { type: 'VAT Return', client: 'ABC Ltd', date: '2024-02-15', days: 5 },
    { type: 'Corporation Tax', client: 'XYZ Corp', date: '2024-02-18', days: 8 },
    { type: 'Annual Accounts', client: 'DEF Ltd', date: '2024-02-25', days: 15 },
    { type: 'Confirmation Statement', client: 'GHI Ltd', date: '2024-02-20', days: 23 }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in_progress':
        return <Circle className="h-4 w-4 text-blue-600" />
      case 'on_hold':
        return <Pause className="h-4 w-4 text-brisk-primary" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-green-100 text-green-800'
    }
  }

  const menuStructure = {
    dashboard: {
      label: 'Dashboard',
      icon: Calendar,
      hasSubTabs: false
    },
    jobs: {
      label: 'Jobs & Tasks',
      icon: Users,
      hasSubTabs: true,
      subTabs: {
        overview: { label: 'Job Overview', icon: Calendar },
        tracking: { label: 'Time Tracking', icon: Clock },
        deadlines: { label: 'Deadlines', icon: AlertTriangle }
      }
    },
    'client-portal': {
      label: 'Client Portal',
      icon: Globe,
      hasSubTabs: false
    },
    workflows: {
      label: 'Workflows',
      icon: Workflow,
      hasSubTabs: true,
      subTabs: {
        builder: { label: 'Workflow Builder', icon: Workflow },
        automation: { label: 'Automation', icon: Target }
      }
    },
    capacity: {
      label: 'Capacity Planning',
      icon: Target,
      hasSubTabs: false
    },
    compliance: {
      label: 'Compliance',
      icon: Shield,
      hasSubTabs: false
    },
    analytics: {
      label: 'Analytics',
      icon: TrendingUp,
      hasSubTabs: false
    },
    'ai-adviser': {
      label: 'AI Adviser',
      icon: Award,
      hasSubTabs: false
    },
    email: {
      label: 'Email Studio',
      icon: Mail,
      hasSubTabs: false
    },
    templates: {
      label: 'Templates',
      icon: FileText,
      hasSubTabs: true,
      subTabs: {
        payslip: { label: 'Payslip Templates', icon: FileText },
        invoice: { label: 'Invoice Templates', icon: FileText },
        analytics: { label: 'Template Analytics', icon: BarChart3 }
      }
    },
    reports: {
      label: 'Reports',
      icon: BarChart3,
      hasSubTabs: false
    }
  }

  const handleMainTabClick = (tabKey: string) => {
    setActiveMainTab(tabKey)
    const config = menuStructure[tabKey as keyof typeof menuStructure]
    if (config.hasSubTabs && 'subTabs' in config && config.subTabs) {
      const firstSubTab = Object.keys(config.subTabs)[0]
      setActiveSubTab(firstSubTab)
      if (!expandedCategories.includes(tabKey)) {
        setExpandedCategories(prev => [...prev, tabKey])
      }
    } else {
      setActiveSubTab('')
      setExpandedCategories(prev => prev.filter(cat => cat !== tabKey))
    }
  }

  const handleSubTabClick = (subTabKey: string, mainTabKey: string) => {
    setActiveMainTab(mainTabKey)
    setActiveSubTab(subTabKey)
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
        <div>
          <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Practice Management Dashboard</h1>
          <p className="text-gray-600 mt-2">Workflow automation, job tracking, compliance management & communications</p>
        </div>
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
          <Button variant="outline" className={isMobile ? 'w-full' : ''}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className={`bg-brisk-primary hover:bg-brisk-primary-600 ${isMobile ? 'w-full' : ''}`}>
            <Plus className="h-4 w-4 mr-2" />
            New Job
          </Button>
        </div>
      </div>

      <ResponsiveGrid>
        {kpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </ResponsiveGrid>

      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg border">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
            <CardDescription>Latest job assignments and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobs.slice(0, 5).map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 border-2 border-blue-900 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(job.status)}
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-gray-600">{job.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getPriorityColor(job.priority)}>
                      {job.priority}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{job.assignee}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Critical deadlines requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-2 border-blue-900 rounded-lg">
                  <div>
                    <p className="font-medium">{deadline.type}</p>
                    <p className="text-sm text-gray-600">{deadline.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{deadline.date}</p>
                    <p className={`text-sm ${deadline.days <= 7 ? 'text-red-600' : 'text-blue-600'}`}>
                      {deadline.days} days
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderJobOverview = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Job Overview</h2>
          <p className="text-gray-600">Complete job management and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter Jobs
          </Button>
          <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
            <Plus className="h-4 w-4 mr-2" />
            New Job
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>All Jobs</CardTitle>
            <CardDescription>Complete job management and tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border-2 border-blue-900 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(job.status)}
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-gray-600">{job.client}</p>
                      <p className="text-xs text-gray-500">Due: {job.dueDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getPriorityColor(job.priority)}>
                      {job.priority}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{job.assignee}</p>
                    <Progress value={job.progress} className="w-20 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderTimeTracking = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Time Tracking</h2>
          <p className="text-gray-600">Track time spent on jobs and tasks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            Start Timer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Time Entries</CardTitle>
          <CardDescription>Track time spent on jobs and tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Time tracking functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderDeadlines = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Deadlines Management</h2>
          <p className="text-gray-600">Monitor and manage upcoming deadlines</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Add Deadline
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Critical Deadlines</CardTitle>
          <CardDescription>Monitor and manage upcoming deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-2 border-blue-900 rounded-lg">
                <div>
                  <p className="font-medium">{deadline.type}</p>
                  <p className="text-sm text-gray-600">{deadline.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{deadline.date}</p>
                  <p className={`text-sm ${deadline.days <= 7 ? 'text-red-600' : 'text-orange-600'}`}>
                    {deadline.days} days remaining
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderClientPortal = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Client Portal</h2>
          <p className="text-gray-600">Advanced client portal management and configuration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Globe className="h-4 w-4 mr-2" />
            Portal Settings
          </Button>
        </div>
      </div>
      <ClientPortalAdvanced />
    </div>
  )

  const renderWorkflowBuilder = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Workflow Builder</h2>
          <p className="text-gray-600">Design and configure automated workflows</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Workflow className="h-4 w-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>
      <WorkflowBuilderAdvanced />
    </div>
  )

  const renderWorkflowAutomation = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Workflow Automation</h2>
          <p className="text-gray-600">Configure automated workflow triggers and actions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Target className="h-4 w-4 mr-2" />
            Automation Rules
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
          <CardDescription>Configure automated workflow triggers and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Workflow automation configuration will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderCapacityPlanning = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Capacity Planning</h2>
          <p className="text-gray-600">Advanced capacity planning and resource allocation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Target className="h-4 w-4 mr-2" />
            Plan Capacity
          </Button>
        </div>
      </div>
      <CapacityPlanningAdvanced />
    </div>
  )

  const renderCompliance = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Compliance Management</h2>
          <p className="text-gray-600">Automated compliance monitoring and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Compliance Check
          </Button>
        </div>
      </div>
      <ComplianceAutomation />
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Practice Analytics</h2>
          <p className="text-gray-600">Analyze practice performance and efficiency</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Analyze practice performance and efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Practice Analytics</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Export Report
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                  Schedule Report
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Practice Revenue"
                value="£847,230"
                change="+12.5%"
                icon={TrendingUp}
                color="text-green-600"
                drillDownData={{
                  title: "Practice Revenue Breakdown",
                  description: "Detailed breakdown of practice revenue by service type and monthly trends",
                  content: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900">Revenue by Service</h4>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between">
                              <span>Advisory Services</span>
                              <span className="font-semibold">£345,120</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Compliance</span>
                              <span className="font-semibold">£234,560</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Project Work</span>
                              <span className="font-semibold">£167,890</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Retainer Fees</span>
                              <span className="font-semibold">£99,660</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-orange-900">Monthly Trends</h4>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between">
                              <span>January</span>
                              <span className="font-semibold">£78,450</span>
                            </div>
                            <div className="flex justify-between">
                              <span>February</span>
                              <span className="font-semibold">£82,340</span>
                            </div>
                            <div className="flex justify-between">
                              <span>March</span>
                              <span className="font-semibold">£89,120</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }}
              />
              <KPICard
                title="Client Satisfaction"
                value="4.8/5"
                change="+0.2"
                icon={Heart}
                color="text-pink-600"
                drillDownData={{
                  title: "Client Satisfaction Analysis",
                  description: "Detailed analysis of client satisfaction metrics and feedback",
                  content: (
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900">Satisfaction Breakdown</h4>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span>Service Quality</span>
                            <span className="font-semibold">4.9/5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Response Time</span>
                            <span className="font-semibold">4.7/5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Value for Money</span>
                            <span className="font-semibold">4.6/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }}
              />
              <KPICard
                title="Team Utilization"
                value="87.3%"
                change="+5.2%"
                icon={Users}
                color="text-blue-600"
                drillDownData={{
                  title: "Team Utilization Details",
                  description: "Detailed breakdown of team utilization by role and department",
                  content: (
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900">Utilization by Role</h4>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span>Senior Partners</span>
                            <span className="font-semibold">92.1%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Managers</span>
                            <span className="font-semibold">89.4%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Associates</span>
                            <span className="font-semibold">84.7%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }}
              />
              <KPICard
                title="Project Completion"
                value="94.2%"
                change="+3.1%"
                icon={BarChart3}
                color="text-purple-600"
                drillDownData={{
                  title: "Project Completion Analysis",
                  description: "Analysis of project completion rates by type and timeline",
                  content: (
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900">Completion by Type</h4>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span>Tax Projects</span>
                            <span className="font-semibold">96.8%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Advisory Projects</span>
                            <span className="font-semibold">93.2%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Compliance Projects</span>
                            <span className="font-semibold">91.7%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h4 className="text-lg font-semibold mb-4">Revenue Trends</h4>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <span className="text-gray-500">Revenue Chart Placeholder</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h4 className="text-lg font-semibold mb-4">Client Growth</h4>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <span className="text-gray-500">Client Growth Chart Placeholder</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h4 className="text-lg font-semibold mb-4">Key Performance Indicators</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">£2,847</div>
                  <div className="text-sm text-gray-600">Average Project Value</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">12.3</div>
                  <div className="text-sm text-gray-600">Days Average Completion</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">98.7%</div>
                  <div className="text-sm text-gray-600">Client Retention Rate</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAIAdviser = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">AI Practice Adviser</h2>
          <p className="text-gray-600">Get intelligent insights for practice optimization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Award className="h-4 w-4 mr-2" />
            AI Insights
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>Get intelligent insights for practice optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Ask your Practice Manager</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  New Conversation
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                  View History
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">AI</span>
                </div>
                <div>
                  <h4 className="font-semibold">Practice Management AI Adviser</h4>
                  <p className="text-sm text-gray-600">Specialized in practice operations, client management, and business strategy</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-900 mb-2">What I can help you with:</h5>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Practice workflow optimization and automation strategies</li>
                    <li>• Client onboarding and relationship management best practices</li>
                    <li>• Resource allocation and team utilization analysis</li>
                    <li>• Business development and growth planning</li>
                    <li>• Compliance and risk management frameworks</li>
                    <li>• Performance metrics and KPI tracking</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm">You</span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      className="w-full p-3 border rounded-lg resize-none"
                      rows={3}
                      placeholder="Ask me anything about practice management, client relationships, workflow optimization, or business strategy..."
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                      Workflow Analysis
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                      Client Strategy
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                      Performance Review
                    </button>
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Send
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h4 className="text-lg font-semibold mb-4">Recent Insights</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900 font-medium">Workflow Optimization</p>
                    <p className="text-xs text-blue-700 mt-1">Your client onboarding process could be streamlined by 23% with automated document collection.</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-900 font-medium">Resource Allocation</p>
                    <p className="text-xs text-orange-700 mt-1">Consider redistributing junior staff workload to improve utilization rates across teams.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-900 font-medium">Client Satisfaction</p>
                    <p className="text-xs text-green-700 mt-1">Implementing weekly check-ins could increase client satisfaction scores by 15%.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h4 className="text-lg font-semibold mb-4">Recommended Actions</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Review high-risk client accounts</p>
                      <p className="text-xs text-gray-600">3 clients showing payment delays</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Update service agreements</p>
                      <p className="text-xs text-gray-600">12 agreements due for renewal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Schedule team training</p>
                      <p className="text-xs text-gray-600">New compliance requirements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderEmailStudio = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Email Studio</h2>
          <p className="text-gray-600">Advanced email management and automation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Compose Email
          </Button>
        </div>
      </div>
      <NewEmailStudio />
    </div>
  )

  const renderPayslipTemplates = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Payslip Templates</h2>
          <p className="text-gray-600">Streamline payroll processing with branded templates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payslip Template Workflows</CardTitle>
          <CardDescription>Streamline payroll processing with branded templates</CardDescription>
        </CardHeader>
        <CardContent>
          <PayslipTemplateManager />
        </CardContent>
      </Card>
    </div>
  )

  const renderInvoiceTemplates = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Invoice Templates</h2>
          <p className="text-gray-600">Streamline invoice creation with branded templates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Template Workflows</CardTitle>
          <CardDescription>Streamline invoice creation with branded templates</CardDescription>
        </CardHeader>
        <CardContent>
          <InvoiceTemplateManager />
        </CardContent>
      </Card>
    </div>
  )

  const renderTemplateAnalytics = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Template Analytics</h2>
          <p className="text-gray-600">Monitor template performance and usage patterns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Template Usage Analytics</CardTitle>
          <CardDescription>Monitor template performance and usage patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Templates Created</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-gray-600">+3 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Templates Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-gray-600">+12 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Time Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42h</div>
                <p className="text-xs text-gray-600">This month</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Practice Reports</h2>
          <p className="text-gray-600">Generate comprehensive practice management reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Management Reports</CardTitle>
          <CardDescription>Generate comprehensive practice management reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Practice Reports</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Generate Report
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                  Schedule Reports
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Financial Reports</h4>
                    <p className="text-sm text-gray-600">Revenue, profitability, and financial performance</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly P&L</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cash Flow Report</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Budget vs Actual</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fee Analysis</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600">👥</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Client Reports</h4>
                    <p className="text-sm text-gray-600">Client analysis and relationship metrics</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Client Portfolio</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Satisfaction Survey</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Retention Analysis</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Utilization</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Performance Reports</h4>
                    <p className="text-sm text-gray-600">Team productivity and efficiency metrics</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Team Utilization</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Project Completion</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time Analysis</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Quality Metrics</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600">📋</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Compliance Reports</h4>
                    <p className="text-sm text-gray-600">Regulatory and compliance tracking</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>AML Compliance</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GDPR Audit</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Professional Standards</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Risk Assessment</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-600">📈</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Business Intelligence</h4>
                    <p className="text-sm text-gray-600">Strategic insights and analytics</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Market Analysis</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Competitive Benchmarking</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Growth Opportunities</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Trend Analysis</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Generate</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Custom Reports</h4>
                    <p className="text-sm text-gray-600">Build your own reports and dashboards</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Report Builder</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Open</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Saved Templates</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">View</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Data Export</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Configure</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>API Access</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">Setup</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h4 className="text-lg font-semibold mb-4">Recent Reports</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Report Name</th>
                      <th className="text-left py-2">Type</th>
                      <th className="text-left py-2">Generated</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Monthly Financial Summary</td>
                      <td className="py-2">Financial</td>
                      <td className="py-2">2024-03-15</td>
                      <td className="py-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Complete</span>
                      </td>
                      <td className="py-2">
                        <button className="text-blue-600 hover:underline text-sm mr-2">View</button>
                        <button className="text-blue-600 hover:underline text-sm">Download</button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Client Satisfaction Survey</td>
                      <td className="py-2">Client</td>
                      <td className="py-2">2024-03-14</td>
                      <td className="py-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Complete</span>
                      </td>
                      <td className="py-2">
                        <button className="text-blue-600 hover:underline text-sm mr-2">View</button>
                        <button className="text-blue-600 hover:underline text-sm">Download</button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Team Utilization Report</td>
                      <td className="py-2">Performance</td>
                      <td className="py-2">2024-03-13</td>
                      <td className="py-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Processing</span>
                      </td>
                      <td className="py-2">
                        <button className="text-gray-400 text-sm mr-2">View</button>
                        <button className="text-gray-400 text-sm">Download</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderMainContent = () => {
    if (activeSubTab) {
      switch (`${activeMainTab}.${activeSubTab}`) {
        case 'jobs.overview':
          return renderJobOverview()
        case 'jobs.tracking':
          return renderTimeTracking()
        case 'jobs.deadlines':
          return renderDeadlines()
        case 'workflows.builder':
          return renderWorkflowBuilder()
        case 'workflows.automation':
          return renderWorkflowAutomation()
        case 'templates.payslip':
          return renderPayslipTemplates()
        case 'templates.invoice':
          return renderInvoiceTemplates()
        case 'templates.analytics':
          return renderTemplateAnalytics()
        default:
          return renderDashboard()
      }
    }

    switch (activeMainTab) {
      case 'dashboard':
        return renderDashboard()
      case 'client-portal':
        return renderClientPortal()
      case 'capacity':
        return renderCapacityPlanning()
      case 'compliance':
        return renderCompliance()
      case 'analytics':
        return renderAnalytics()
      case 'ai-adviser':
        return renderAIAdviser()
      case 'email':
        return renderEmailStudio()
      case 'reports':
        return renderReports()
      default:
        return renderDashboard()
    }
  }

  return (
    <ResponsiveLayout>
      <div className="flex min-h-screen bg-blue-50">
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Practice Management</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <nav className="p-2">
              {Object.entries(menuStructure).map(([key, config]) => {
                const Icon = config.icon
                const isExpanded = expandedCategories.includes(key)
                const isActive = activeMainTab === key
                
                return (
                  <div key={key} className="mb-1">
                    <button
                      onClick={() => handleMainTabClick(key)}
                      className={`w-full flex items-center justify-between px-3 py-2 m-0.5 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                        isActive 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transform scale-[0.98] font-semibold' 
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow-md transform hover:scale-[0.99] font-medium'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="h-4 w-4 mr-3" />
                        <span>{config.label}</span>
                      </div>
                      {config.hasSubTabs && (
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`} />
                      )}
                    </button>
                    
                    {config.hasSubTabs && isExpanded && 'subTabs' in config && config.subTabs && (
                      <div className="ml-4 mt-1 space-y-1">
                        {Object.entries(config.subTabs).map(([subKey, subConfig]) => {
                          const SubIcon = subConfig.icon
                          const isSubActive = activeSubTab === subKey && activeMainTab === key
                          
                          return (
                            <button
                              key={subKey}
                              onClick={() => handleSubTabClick(subKey, key)}
                              className={`w-full flex items-center px-3 py-2 m-0.5 text-sm rounded-lg transition-all duration-200 shadow-sm ${
                                isSubActive 
                                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-l-2 border-orange-300 shadow-md font-semibold' 
                                  : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-sm hover:shadow-md font-medium'
                              }`}
                            >
                              <SubIcon className="h-4 w-4 mr-3" />
                              <span>{subConfig.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderMainContent()}
            
            <AIPromptSection
              title="Ask your Practice Manager"
              description="Get expert practice management and workflow guidance"
              placeholder="Ask about client management, workflow automation, practice efficiency..."
              isLoading={isAILoading}
              onSubmit={handleAIQuestion}
              recentQuestions={[
                "How do I automate client onboarding?",
                "What are the best practices for job tracking?",
                "How can I improve team productivity?"
              ]}
            />
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  )
}

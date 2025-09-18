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
  BarChart3
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
        return <CheckCircle className="h-4 w-4 text-white" />
      case 'in_progress':
        return <Circle className="h-4 w-4 text-white" />
      case 'on_hold':
        return <Pause className="h-4 w-4 text-white" />
      default:
        return <Circle className="h-4 w-4 text-white" />
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
          <h1 className={`font-bold text-black ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Practice Management Dashboard</h1>
          <p className="text-black mt-2">Workflow automation, job tracking, compliance management & communications</p>
        </div>
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
          <Button variant="outline" className={isMobile ? 'w-full' : ''}>
            <Filter className="h-4 w-4 mr-2 text-white" />
            Filter Jobs
          </Button>
          <Button className={`bg-brisk-primary hover:bg-brisk-primary-600 ${isMobile ? 'w-full' : ''}`}>
            <Plus className="h-4 w-4 mr-2 text-white" />
            New Job
          </Button>
        </div>
      </div>

      <ResponsiveGrid>
        {kpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </ResponsiveGrid>

      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg border-brisk-navy-blue border">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border-brisk-navy-blue border rounded-md"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border-brisk-navy-blue border rounded-md"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border-brisk-navy-blue border rounded-md"
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
                <div key={job.id} className="flex items-center justify-between p-3 border-brisk-navy-blue border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(job.status)}
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-black">{job.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getPriorityColor(job.priority)}>
                      {job.priority}
                    </Badge>
                    <p className="text-sm text-black mt-1">{job.assignee}</p>
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
                <div key={index} className="flex items-center justify-between p-3 border-brisk-navy-blue border rounded-lg">
                  <div>
                    <p className="font-medium">{deadline.type}</p>
                    <p className="text-sm text-black">{deadline.client}</p>
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
          <p className="text-black">Complete job management and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2 text-white" />
            Filter Jobs
          </Button>
          <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
            <Plus className="h-4 w-4 mr-2 text-white" />
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
                <div key={job.id} className="flex items-center justify-between p-4 border-brisk-navy-blue border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(job.status)}
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-black">{job.client}</p>
                      <p className="text-xs text-black">Due: {job.dueDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getPriorityColor(job.priority)}>
                      {job.priority}
                    </Badge>
                    <p className="text-sm text-black mt-1">{job.assignee}</p>
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
          <p className="text-black">Track time spent on jobs and tasks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="h-4 w-4 mr-2 text-white" />
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
          <p className="text-black">Time tracking functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderDeadlines = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Deadlines Management</h2>
          <p className="text-black">Monitor and manage upcoming deadlines</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <AlertTriangle className="h-4 w-4 mr-2 text-white" />
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
              <div key={index} className="flex items-center justify-between p-4 border-brisk-navy-blue border rounded-lg">
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
          <p className="text-black">Advanced client portal management and configuration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Globe className="h-4 w-4 mr-2 text-white" />
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
          <p className="text-black">Design and configure automated workflows</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Workflow className="h-4 w-4 mr-2 text-white" />
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
          <p className="text-black">Configure automated workflow triggers and actions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Target className="h-4 w-4 mr-2 text-white" />
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
          <p className="text-black">Workflow automation configuration will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderCapacityPlanning = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Capacity Planning</h2>
          <p className="text-black">Advanced capacity planning and resource allocation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Target className="h-4 w-4 mr-2 text-white" />
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
          <p className="text-black">Automated compliance monitoring and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Shield className="h-4 w-4 mr-2 text-white" />
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
          <p className="text-black">Analyze practice performance and efficiency</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2 text-white" />
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
          <p className="text-black">Analytics dashboard will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderAIAdviser = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">AI Practice Adviser</h2>
          <p className="text-black">Get intelligent insights for practice optimization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Award className="h-4 w-4 mr-2 text-white" />
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
          <p className="text-gray-600">AI adviser functionality will be implemented here.</p>
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
            <Mail className="h-4 w-4 mr-2 text-white" />
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
            <FileText className="h-4 w-4 mr-2 text-white" />
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
            <FileText className="h-4 w-4 mr-2 text-white" />
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
            <BarChart3 className="h-4 w-4 mr-2 text-white" />
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
            <BarChart3 className="h-4 w-4 mr-2 text-white" />
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
          <p className="text-gray-600">Reports functionality will be implemented here.</p>
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
      <div className="flex h-screen bg-blue-50">
        <div className="w-64 bg-white border-r border-brisk-navy-blue flex flex-col">
          <div className="p-4 border-b border-brisk-navy-blue">
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
                        <Icon className="h-4 w-4 mr-3 text-white" />
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
                              <SubIcon className="h-4 w-4 mr-3 text-white" />
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

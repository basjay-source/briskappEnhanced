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
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout, { ResponsiveGrid } from '@/components/ResponsiveLayout'
import { useLocale } from '@/contexts/LocaleContextNew'
import KPICard from '@/components/KPICard'
import NewEmailStudio from '@/components/NewEmailStudio'
import PayslipTemplateManager from '../../components/PayslipTemplateManager'
import InvoiceTemplateManager from '../../components/InvoiceTemplateManager'
import AIPromptSection from '../../components/AIPromptSection'
import ClientPortalAdvanced from '../../components/ClientPortalAdvanced'
import WorkflowBuilderAdvanced from '../../components/WorkflowBuilderAdvanced'
import CapacityPlanningAdvanced from '../../components/CapacityPlanningAdvanced'
import ComplianceAutomation from '../../components/ComplianceAutomation'
import { apiClient } from '@/lib/api'

export default function PracticeManagement() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const { formatDate } = useLocale()
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['jobs'])
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [kpis, setKpis] = useState<any[]>([])
  const [jobs, setJobs] = useState<any[]>([])
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<any[]>([])

  useEffect(() => {
    const loadPracticeData = async () => {
      try {
        const jobsData = await apiClient.getJobs()
        
        const jobs = jobsData?.jobs || []
        setJobs(jobs)
        
        const activeJobs = jobs.length
        const overdueJobs = jobs.filter((job: any) => job.status === 'not_started').length
        const inProgressJobs = jobs.filter((job: any) => job.status === 'in_progress').length
        const completedJobs = jobs.filter((job: any) => job.status === 'completed').length
        
        setKpis([
          {
            title: 'Active Jobs',
            value: activeJobs.toString(),
            change: '+5 this week',
            icon: Users,
            color: 'text-blue-600',
            drillDownData: {
              title: 'Active Jobs Details',
              description: 'Detailed breakdown of all active jobs in the system',
              content: (
                <div className="space-y-4">
                  {jobs.filter((job: any) => job.status !== 'completed').map((job: any) => (
                    <div key={job.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{job.title}</h4>
                          <p className="text-sm text-gray-600">Client: {job.client_id}</p>
                          <p className="text-sm text-gray-600">Status: {job.status}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(job.priority)}`}>
                            {job.priority}
                          </span>
                          {job.due_date && (
                            <p className="text-sm text-gray-600 mt-1">Due: {job.due_date}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          },
          {
            title: 'In Progress',
            value: inProgressJobs.toString(),
            change: 'Currently active',
            icon: Clock,
            color: 'text-orange-600',
            drillDownData: {
              title: 'Jobs In Progress',
              description: 'All jobs currently being worked on',
              content: (
                <div className="space-y-4">
                  {jobs.filter((job: any) => job.status === 'in_progress').map((job: any) => (
                    <div key={job.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{job.title}</h4>
                          <p className="text-sm text-gray-600">Client: {job.client_id}</p>
                          <p className="text-sm text-gray-600">Assigned: {job.assigned_to || 'Unassigned'}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(job.priority)}`}>
                            {job.priority}
                          </span>
                          {job.estimated_hours && (
                            <p className="text-sm text-gray-600 mt-1">Est: {job.estimated_hours}h</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          },
          {
            title: 'Completed',
            value: completedJobs.toString(),
            change: '+12% vs last week',
            icon: CheckCircle,
            color: 'text-green-600',
            drillDownData: {
              title: 'Completed Jobs',
              description: 'Recently completed jobs and their details',
              content: (
                <div className="space-y-4">
                  {jobs.filter((job: any) => job.status === 'completed').map((job: any) => (
                    <div key={job.id} className="p-4 border rounded-lg bg-green-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{job.title}</h4>
                          <p className="text-sm text-gray-600">Client: {job.client_id}</p>
                          <p className="text-sm text-green-600">✓ Completed</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(job.priority)}`}>
                            {job.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          },
          {
            title: 'Not Started',
            value: overdueJobs.toString(),
            change: 'Pending start',
            icon: Calendar,
            color: 'text-purple-600',
            drillDownData: {
              title: 'Jobs Not Started',
              description: 'Jobs that are scheduled but not yet started',
              content: (
                <div className="space-y-4">
                  {jobs.filter((job: any) => job.status === 'not_started').map((job: any) => (
                    <div key={job.id} className="p-4 border rounded-lg bg-purple-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{job.title}</h4>
                          <p className="text-sm text-gray-600">Client: {job.client_id}</p>
                          <p className="text-sm text-purple-600">📅 Not Started</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(job.priority)}`}>
                            {job.priority}
                          </span>
                          {job.due_date && (
                            <p className="text-sm text-purple-600 mt-1">Due: {job.due_date}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          }
        ])
        
        const deadlines = jobs
          .filter((job: any) => job.due_date)
          .map((job: any) => ({
            type: job.title,
            client: job.client_id || 'Unknown Client',
            date: formatDate(job.due_date),
            days: Math.ceil((new Date(job.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
          }))
          .sort((a: any, b: any) => a.days - b.days)
          .slice(0, 5)
        
        setUpcomingDeadlines(deadlines)
      } catch (error) {
        console.error('Failed to load practice management data:', error)
        setKpis([])
        setJobs([])
        setUpcomingDeadlines([])
      }
    }
    
    loadPracticeData()
  }, [])

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
          <Button className={`bg-brisk-primary hover:bg-brisk-primary-600 ${isMobile ? 'w-full' : ''}`} onClick={() => navigate('/app/practice/jobs/new')}>
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
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="px-3 py-2">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="px-3 py-2">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              {priorityOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(job.status)}
                    <div>
                      <p className="font-bold">{job.title}</p>
                      <p className="text-sm text-gray-600">{job.client_id || 'Unknown Client'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getPriorityColor(job.priority)}>
                      {job.priority}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{job.assigned_to || 'Unassigned'}</p>
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
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-bold">{deadline.type}</p>
                    <p className="text-sm text-gray-600">{deadline.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{formatDate(new Date(deadline.date))}</p>
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
          <Button className="bg-brisk-primary hover:bg-brisk-primary-600" onClick={() => navigate('/app/practice/jobs/new')}>
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
                <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(job.status)}
                    <div>
                      <p className="font-bold">{job.title}</p>
                      <p className="text-sm text-gray-600">{job.client}</p>
                      <p className="text-xs text-gray-500">Due: {formatDate(new Date(job.dueDate))}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getPriorityColor(job.priority)}>
                      {job.priority}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{job.assigned_to || 'Unassigned'}</p>
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
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-bold">{deadline.type}</p>
                  <p className="text-sm text-gray-600">{deadline.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{formatDate(new Date(deadline.date))}</p>
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
          <p className="text-gray-600">Analytics dashboard will be implemented here.</p>
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
        <div className="w-64 bg-white border-r border-blue-900 flex flex-col">
          <div className="p-4 border-b border-blue-900">
            <h2 className="text-lg font-bold text-gray-900">Practice Management</h2>
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

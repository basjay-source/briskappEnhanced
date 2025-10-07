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
  Heart,
  Edit,
  Trash2
} from 'lucide-react'
import { useState, useEffect } from 'react'
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
import { api } from '@/lib/api'

interface Job {
  id: string
  client_id: string
  title: string
  description?: string
  status: string
  priority: string
  assigned_to?: string
  due_date?: string
  progress_percentage: number
  created_at: string
}

interface Deadline {
  id: string
  client_id: string
  title: string
  description?: string
  deadline_type: string
  due_date: string
  status: string
  priority: string
}

interface DashboardData {
  kpis: {
    total_revenue: { value: number; change: string }
    active_clients: { value: number; change: string }
    completion_rate: { value: string; change: string }
    avg_response_time: { value: string; change: string }
  }
  summary: {
    active_jobs: number
    overdue_jobs: number
    upcoming_deadlines: number
    this_week_hours: number
  }
}

export default function PracticeManagement() {
  const isMobile = useIsMobile()
  const [activeMainTab, setActiveMainTab] = useState('dashboard')
  const [activeSubTab, setActiveSubTab] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['jobs'])
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [deadlines, setDeadlines] = useState<Deadline[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDashboardData()
    loadJobs()
    loadDeadlines()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/v1/practice/dashboard')
      setDashboardData(response.data)
      setError(null)
    } catch (err: any) {
      console.error('Error loading dashboard:', err)
      setError(err.message || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const loadJobs = async () => {
    try {
      const params: any = {}
      if (selectedStatus !== 'all') params.status = selectedStatus
      if (selectedPriority !== 'all') params.priority = selectedPriority
      if (searchTerm) params.search = searchTerm
      
      const response = await api.get('/api/v1/practice/jobs', { params })
      setJobs(response.data.jobs || [])
    } catch (err: any) {
      console.error('Error loading jobs:', err)
      setError(err.message || 'Failed to load jobs')
    }
  }

  const loadDeadlines = async () => {
    try {
      const response = await api.get('/api/v1/practice/compliance/deadlines')
      setDeadlines(response.data.deadlines || [])
    } catch (err: any) {
      console.error('Error loading deadlines:', err)
      setError(err.message || 'Failed to load deadlines')
    }
  }

  useEffect(() => {
    loadJobs()
  }, [selectedStatus, selectedPriority, searchTerm])

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return
    
    try {
      await api.delete(`/api/v1/practice/jobs/${jobId}`)
      await loadJobs()
      await loadDashboardData()
    } catch (err: any) {
      console.error('Error deleting job:', err)
      alert('Failed to delete job')
    }
  }

  const handleDeleteDeadline = async (deadlineId: string) => {
    if (!confirm('Are you sure you want to delete this deadline?')) return
    
    try {
      await api.delete(`/api/v1/practice/compliance/deadlines/${deadlineId}`)
      await loadDeadlines()
      await loadDashboardData()
    } catch (err: any) {
      console.error('Error deleting deadline:', err)
      alert('Failed to delete deadline')
    }
  }

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
    { value: 'not_started', label: 'Not Started' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'on_hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' }
  ]

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ]

  const calculateDaysRemaining = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in_progress':
        return <Circle className="h-4 w-4 text-blue-600" />
      case 'on_hold':
        return <Pause className="h-4 w-4 text-blue-900" />
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

  const renderDashboard = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <p className="text-red-600">{error}</p>
            <Button onClick={loadDashboardData} className="mt-4">Retry</Button>
          </div>
        </div>
      )
    }

    const kpis = dashboardData ? [
      {
        title: 'Total Revenue',
        value: `£${dashboardData.kpis.total_revenue.value.toLocaleString()}`,
        change: dashboardData.kpis.total_revenue.change,
        trend: 'up' as const,
        icon: TrendingUp,
        color: 'blue'
      },
      {
        title: 'Active Clients',
        value: dashboardData.kpis.active_clients.value.toString(),
        change: dashboardData.kpis.active_clients.change,
        trend: 'up' as const,
        icon: Users,
        color: 'green'
      },
      {
        title: 'Completion Rate',
        value: dashboardData.kpis.completion_rate.value,
        change: dashboardData.kpis.completion_rate.change,
        trend: 'up' as const,
        icon: CheckCircle,
        color: 'orange'
      },
      {
        title: 'Avg Response Time',
        value: dashboardData.kpis.avg_response_time.value,
        change: dashboardData.kpis.avg_response_time.change,
        trend: 'up' as const,
        icon: Clock,
        color: 'purple'
      }
    ] : []

    return (
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

      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-[2px] border">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border-2 border-blue-900 rounded-[2px]-md"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border-2 border-blue-900 rounded-[2px]-md"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border-2 border-blue-900 rounded-[2px]-md"
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
              <CardTitle className="text-blue-900">Recent Jobs</CardTitle>
              <CardDescription>Latest job assignments and progress</CardDescription>
            </CardHeader>
            <CardContent>
              {jobs.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No jobs found. Create your first job to get started.</p>
              ) : (
                <div className="space-y-4">
                  {jobs.slice(0, 5).map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 border-2 border-blue-900 rounded-[2px] hover:bg-blue-50 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3 flex-1">
                        {getStatusIcon(job.status)}
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-gray-600">Client ID: {job.client_id}</p>
                          {job.due_date && (
                            <p className="text-xs text-gray-500">Due: {new Date(job.due_date).toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <div>
                          <Badge className={getPriorityColor(job.priority)}>
                            {job.priority}
                          </Badge>
                          {job.assigned_to && (
                            <p className="text-sm text-gray-600 mt-1">{job.assigned_to}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteJob(job.id)
                          }}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-900">Upcoming Deadlines</CardTitle>
              <CardDescription>Critical deadlines requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              {deadlines.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No upcoming deadlines.</p>
              ) : (
                <div className="space-y-4">
                  {deadlines.slice(0, 5).map((deadline) => {
                    const daysRemaining = calculateDaysRemaining(deadline.due_date)
                    return (
                      <div key={deadline.id} className="flex items-center justify-between p-3 border-2 border-blue-900 rounded-[2px] hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex-1">
                          <p className="font-medium">{deadline.title}</p>
                          <p className="text-sm text-gray-600">{deadline.deadline_type}</p>
                          <p className="text-xs text-gray-500">Client ID: {deadline.client_id}</p>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <div>
                            <p className="text-sm font-medium">{new Date(deadline.due_date).toLocaleDateString()}</p>
                            <p className={`text-sm ${daysRemaining <= 7 ? 'text-red-600' : daysRemaining <= 14 ? 'text-orange-600' : 'text-blue-600'}`}>
                              {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteDeadline(deadline.id)
                            }}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderJobOverview = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Job Overview</h2>
          <p className="text-gray-600">Complete job management and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadJobs}>
            <Filter className="h-4 w-4 mr-2" />
            Refresh
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
            <CardTitle className="text-blue-900">All Jobs ({jobs.length})</CardTitle>
            <CardDescription>Complete job management and tracking</CardDescription>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No jobs found. Create your first job to get started.</p>
                <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Job
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border-2 border-blue-900 rounded-[2px] hover:bg-blue-50 transition-colors">
                    <div className="flex items-center space-x-4 flex-1">
                      {getStatusIcon(job.status)}
                      <div className="flex-1">
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-gray-600">Client ID: {job.client_id}</p>
                        {job.due_date && (
                          <p className="text-xs text-gray-500">Due: {new Date(job.due_date).toLocaleDateString()}</p>
                        )}
                        {job.description && (
                          <p className="text-xs text-gray-500 mt-1">{job.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <Badge className={getPriorityColor(job.priority)}>
                          {job.priority}
                        </Badge>
                        {job.assigned_to && (
                          <p className="text-sm text-gray-600 mt-1">{job.assigned_to}</p>
                        )}
                        <Progress value={job.progress_percentage} className="w-20 mt-2" />
                        <p className="text-xs text-gray-500 mt-1">{job.progress_percentage}% Complete</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderTimeTracking = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Time Tracking</h2>
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
          <CardTitle className="text-blue-900">Time Entries</CardTitle>
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
          <h2 className="text-2xl font-bold text-blue-900">Deadlines Management</h2>
          <p className="text-gray-600">Monitor and manage upcoming deadlines</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadDeadlines}>
            <Filter className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Add Deadline
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">All Deadlines ({deadlines.length})</CardTitle>
          <CardDescription>Monitor and manage upcoming deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          {deadlines.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No deadlines found. Add your first deadline to track compliance.</p>
              <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
                <Plus className="h-4 w-4 mr-2" />
                Add First Deadline
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {deadlines.map((deadline) => {
                const daysRemaining = calculateDaysRemaining(deadline.due_date)
                return (
                  <div key={deadline.id} className="flex items-center justify-between p-4 border-2 border-blue-900 rounded-[2px] hover:bg-blue-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{deadline.title}</p>
                        <Badge className={getPriorityColor(deadline.priority)}>
                          {deadline.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{deadline.deadline_type}</p>
                      <p className="text-xs text-gray-500">Client ID: {deadline.client_id}</p>
                      {deadline.description && (
                        <p className="text-xs text-gray-500 mt-1">{deadline.description}</p>
                      )}
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="text-sm font-medium">{new Date(deadline.due_date).toLocaleDateString()}</p>
                        <p className={`text-sm font-semibold ${
                          daysRemaining < 0 ? 'text-red-700' : 
                          daysRemaining <= 7 ? 'text-red-600' : 
                          daysRemaining <= 14 ? 'text-orange-600' : 
                          'text-blue-600'
                        }`}>
                          {daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` :
                           daysRemaining === 0 ? 'Due today' :
                           `${daysRemaining} days remaining`}
                        </p>
                        <Badge className={`mt-1 ${deadline.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-900'}`}>
                          {deadline.status}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDeadline(deadline.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderClientPortal = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Client Portal</h2>
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
          <h2 className="text-2xl font-bold text-blue-900">Workflow Builder</h2>
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
          <h2 className="text-2xl font-bold text-blue-900">Workflow Automation</h2>
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
          <CardTitle className="text-blue-900">Automation Rules</CardTitle>
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
          <h2 className="text-2xl font-bold text-blue-900">Capacity Planning</h2>
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
          <h2 className="text-2xl font-bold text-blue-900">Compliance Management</h2>
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
          <h2 className="text-2xl font-bold text-blue-900">Practice Analytics</h2>
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
          <CardTitle className="text-blue-900">Performance Metrics</CardTitle>
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
                        <div className="bg-blue-50 p-4 rounded-[2px]">
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
                        <div className="bg-orange-50 p-4 rounded-[2px]">
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
                      <div className="bg-blue-50 p-4 rounded-[2px]">
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
                      <div className="bg-blue-50 p-4 rounded-[2px]">
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
                      <div className="bg-blue-50 p-4 rounded-[2px]">
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
              <div className="bg-white p-6 rounded-[2px] shadow-sm border">
                <h4 className="text-lg font-semibold mb-4">Revenue Trends</h4>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <span className="text-gray-500">Revenue Chart Placeholder</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-[2px] shadow-sm border">
                <h4 className="text-lg font-semibold mb-4">Client Growth</h4>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <span className="text-gray-500">Client Growth Chart Placeholder</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2px] shadow-sm border">
              <h4 className="text-lg font-semibold mb-4">Key Performance Indicators</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-[2px]">
                  <div className="text-2xl font-bold text-blue-600">£2,847</div>
                  <div className="text-sm text-gray-600">Average Project Value</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-[2px]">
                  <div className="text-2xl font-bold text-orange-600">12.3</div>
                  <div className="text-sm text-gray-600">Days Average Completion</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-[2px]">
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
          <h2 className="text-2xl font-bold text-blue-900">AI Practice Adviser</h2>
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
          <CardTitle className="text-blue-900">AI Recommendations</CardTitle>
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

            <div className="bg-white rounded-[2px] shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">AI</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Practice Management AI Adviser</h4>
                  <p className="text-sm text-gray-600">Specialized in practice operations, client management, and business strategy</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-[2px]">
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
                      className="w-full p-3 border-2 border-blue-900 rounded-[2px] resize-none"
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
              <div className="bg-white p-6 rounded-[2px] shadow-sm border">
                <h4 className="text-lg font-semibold mb-4">Recent Insights</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-[2px]">
                    <p className="text-sm text-blue-900 font-medium">Workflow Optimization</p>
                    <p className="text-xs text-blue-700 mt-1">Your client onboarding process could be streamlined by 23% with automated document collection.</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-[2px]">
                    <p className="text-sm text-orange-900 font-medium">Resource Allocation</p>
                    <p className="text-xs text-orange-700 mt-1">Consider redistributing junior staff workload to improve utilization rates across teams.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-[2px]">
                    <p className="text-sm text-green-900 font-medium">Client Satisfaction</p>
                    <p className="text-xs text-green-700 mt-1">Implementing weekly check-ins could increase client satisfaction scores by 15%.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[2px] shadow-sm border">
                <h4 className="text-lg font-semibold mb-4">Recommended Actions</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[2px]">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Review high-risk client accounts</p>
                      <p className="text-xs text-gray-600">3 clients showing payment delays</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[2px]">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Update service agreements</p>
                      <p className="text-xs text-gray-600">12 agreements due for renewal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[2px]">
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
          <h2 className="text-2xl font-bold text-blue-900">Email Studio</h2>
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
          <h2 className="text-2xl font-bold text-blue-900">Payslip Templates</h2>
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
          <CardTitle className="text-blue-900">Payslip Template Workflows</CardTitle>
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
          <h2 className="text-2xl font-bold text-blue-900">Invoice Templates</h2>
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
          <CardTitle className="text-blue-900">Invoice Template Workflows</CardTitle>
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
          <h2 className="text-2xl font-bold text-blue-900">Template Analytics</h2>
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
          <CardTitle className="text-blue-900">Template Usage Analytics</CardTitle>
          <CardDescription>Monitor template performance and usage patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-900">Templates Created</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-gray-600">+3 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-900">Templates Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-gray-600">+12 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-900">Time Saved</CardTitle>
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
          <h2 className="text-2xl font-bold text-blue-900">Practice Reports</h2>
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
          <CardTitle className="text-blue-900">Management Reports</CardTitle>
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
              <div className="bg-white p-6 rounded-[2px] shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-[2px] flex items-center justify-center">
                    <span className="text-blue-600">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Financial Reports</h4>
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

              <div className="bg-white p-6 rounded-[2px] shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-[2px] flex items-center justify-center">
                    <span className="text-orange-600">👥</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Client Reports</h4>
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

              <div className="bg-white p-6 rounded-[2px] shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-[2px] flex items-center justify-center">
                    <span className="text-green-600">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Performance Reports</h4>
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

              <div className="bg-white p-6 rounded-[2px] shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-[2px] flex items-center justify-center">
                    <span className="text-purple-600">📋</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Compliance Reports</h4>
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

              <div className="bg-white p-6 rounded-[2px] shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-[2px] flex items-center justify-center">
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

              <div className="bg-white p-6 rounded-[2px] shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-[2px] flex items-center justify-center">
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

            <div className="bg-white p-6 rounded-[2px] shadow-sm border">
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
        <div className="w-64 bg-white border-r-2 border-blue-900 flex flex-col">
          <div className="p-4 border-b-2 border-blue-900">
            <h2 className="text-lg font-semibold text-blue-900">Practice Management</h2>
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
                      className={`w-full flex items-center justify-between px-3 py-2 m-0.5 text-sm rounded-[2px] transition-all duration-200 shadow-sm ${
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
                              className={`w-full flex items-center px-3 py-2 m-0.5 text-sm rounded-[2px] transition-all duration-200 shadow-sm ${
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

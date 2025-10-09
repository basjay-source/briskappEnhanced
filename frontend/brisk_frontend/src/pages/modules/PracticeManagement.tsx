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
  Trash2,
  Settings,
  Activity,
  UserPlus,
  Upload,
  ImageIcon,
  Eye
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout, { ResponsiveGrid } from '@/components/ResponsiveLayout'
import KPICard from '@/components/KPICard'
import NewEmailStudio from '@/components/NewEmailStudio'
import PayslipTemplateManager from '../../components/PayslipTemplateManager'
import InvoiceTemplateManager from '../../components/InvoiceTemplateManager'
import AIPromptSection from '../../components/AIPromptSection'
import WorkflowBuilderAdvanced from '../../components/WorkflowBuilderAdvanced'
import CapacityPlanningAdvanced from '../../components/CapacityPlanningAdvanced'
import ComplianceAutomation from '../../components/ComplianceAutomation'
import { ExportButton } from '@/components/ExportButton'
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

interface TimeEntry {
  id: string
  job_id: string
  task_id?: string
  user_id: string
  description?: string
  hours: number
  billable: boolean
  hourly_rate?: number
  date: string
  status: string
  created_at: string
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
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isAILoading, setIsAILoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [deadlines, setDeadlines] = useState<Deadline[]>([])
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false)

  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notificationData, setNotificationData] = useState<{title: string, message: string, type?: 'success' | 'error' | 'info'}>({title: '', message: '', type: 'info'})
  
  const showNotification = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotificationData({ title, message, type })
    setIsNotificationOpen(true)
  }
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [jobFormData, setJobFormData] = useState({
    client_id: '',
    title: '',
    description: '',
    status: 'not_started',
    priority: 'medium',
    assigned_to: '',
    due_date: '',
    job_type: 'general'
  })

  const [isTimeEntryDialogOpen, setIsTimeEntryDialogOpen] = useState(false)
  const [editingTimeEntry, setEditingTimeEntry] = useState<TimeEntry | null>(null)
  const [timeEntryFormData, setTimeEntryFormData] = useState({
    job_id: '',
    task_id: '',
    description: '',
    hours: '',
    billable: true,
    hourly_rate: '',
    date: new Date().toISOString().split('T')[0]
  })
  
  const [timeSearchTerm, setTimeSearchTerm] = useState('')
  const [selectedJobFilter, setSelectedJobFilter] = useState('all')

  const [isDeadlineDialogOpen, setIsDeadlineDialogOpen] = useState(false)
  const [editingDeadline, setEditingDeadline] = useState<Deadline | null>(null)
  const [deadlineFormData, setDeadlineFormData] = useState({
    client_id: '',
    title: '',
    description: '',
    deadline_type: 'tax_return',
    due_date: '',
    status: 'pending',
    priority: 'medium'
  })
  
  const [deadlineSearchTerm, setDeadlineSearchTerm] = useState('')
  const [selectedDeadlineStatus, setSelectedDeadlineStatus] = useState('all')
  const [selectedDeadlinePriority, setSelectedDeadlinePriority] = useState('all')

  useEffect(() => {
    loadDashboardData()
    loadJobs()
    loadDeadlines()
    loadTimeEntries()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/v1/practice/dashboard')
      setDashboardData(response.data)
      setError(null)
    } catch (err: any) {
      console.error('Error loading dashboard:', err)
      setError('Failed to load dashboard data. Please check your connection.')
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

  const loadTimeEntries = async () => {
    try {
      const params: any = {}
      if (selectedJobFilter !== 'all') params.job_id = selectedJobFilter
      if (timeSearchTerm) params.search = timeSearchTerm
      
      const response = await api.get('/api/v1/practice/time-entries', { params })
      setTimeEntries(Array.isArray(response.data) ? response.data : [])
    } catch (err: any) {
      console.error('Error loading time entries:', err)
      setError(err.message || 'Failed to load time entries')
    }
  }

  useEffect(() => {
    loadJobs()
  }, [selectedStatus, selectedPriority, searchTerm])

  useEffect(() => {
    loadTimeEntries()
  }, [selectedJobFilter, timeSearchTerm])

  useEffect(() => {
    loadDeadlines()
  }, [selectedDeadlineStatus, selectedDeadlinePriority, deadlineSearchTerm])

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return
    
    try {
      await api.delete(`/api/v1/practice/jobs/${jobId}`)
      await loadJobs()
      await loadDashboardData()
    } catch (err: any) {
      console.error('Error deleting job:', err)
      showNotification('Error', 'Failed to delete job', 'error')
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
      showNotification('Error', 'Failed to delete deadline', 'error')
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

  const openJobDialog = (job?: Job) => {
    if (job) {
      setEditingJob(job)
      setJobFormData({
        client_id: job.client_id,
        title: job.title,
        description: job.description || '',
        status: job.status,
        priority: job.priority,
        assigned_to: job.assigned_to || '',
        due_date: job.due_date || '',
        job_type: 'general'
      })
    } else {
      setEditingJob(null)
      setJobFormData({
        client_id: '',
        title: '',
        description: '',
        status: 'not_started',
        priority: 'medium',
        assigned_to: '',
        due_date: '',
        job_type: 'general'
      })
    }
    setIsJobDialogOpen(true)
  }

  const closeJobDialog = () => {
    setIsJobDialogOpen(false)
    setEditingJob(null)
    setJobFormData({
      client_id: '',
      title: '',
      description: '',
      status: 'not_started',
      priority: 'medium',
      assigned_to: '',
      due_date: '',
      job_type: 'general'
    })
  }

  const handleCreateJob = async () => {
    try {
      await api.post('/api/v1/practice/jobs', jobFormData)
      await loadJobs()
      await loadDashboardData()
      closeJobDialog()
    } catch (err: any) {
      console.error('Error creating job:', err)
      showNotification('Error', 'Failed to create job: ' + (err.message || 'Unknown error'), 'error')
    }
  }

  const handleUpdateJob = async () => {
    if (!editingJob) return
    
    try {
      await api.put(`/api/v1/practice/jobs/${editingJob.id}`, jobFormData)
      await loadJobs()
      await loadDashboardData()
      closeJobDialog()
    } catch (err: any) {
      console.error('Error updating job:', err)
      showNotification('Error', 'Failed to update job: ' + (err.message || 'Unknown error'), 'error')
    }
  }

  const handleSaveJob = () => {
    if (editingJob) {
      handleUpdateJob()
    } else {
      handleCreateJob()
    }
  }

  const openTimeEntryDialog = (timeEntry?: TimeEntry) => {
    if (timeEntry) {
      setEditingTimeEntry(timeEntry)
      setTimeEntryFormData({
        job_id: timeEntry.job_id,
        task_id: timeEntry.task_id || '',
        description: timeEntry.description || '',
        hours: timeEntry.hours.toString(),
        billable: timeEntry.billable,
        hourly_rate: timeEntry.hourly_rate?.toString() || '',
        date: timeEntry.date
      })
    } else {
      setEditingTimeEntry(null)
      setTimeEntryFormData({
        job_id: '',
        task_id: '',
        description: '',
        hours: '',
        billable: true,
        hourly_rate: '',
        date: new Date().toISOString().split('T')[0]
      })
    }
    setIsTimeEntryDialogOpen(true)
  }

  const closeTimeEntryDialog = () => {
    setIsTimeEntryDialogOpen(false)
    setEditingTimeEntry(null)
    setTimeEntryFormData({
      job_id: '',
      task_id: '',
      description: '',
      hours: '',
      billable: true,
      hourly_rate: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const handleCreateTimeEntry = async () => {
    try {
      await api.post('/api/v1/practice/time-entries', {
        ...timeEntryFormData,
        hours: parseFloat(timeEntryFormData.hours),
        hourly_rate: timeEntryFormData.hourly_rate ? parseFloat(timeEntryFormData.hourly_rate) : null
      })
      await loadTimeEntries()
      await loadDashboardData()
      closeTimeEntryDialog()
    } catch (err: any) {
      console.error('Error creating time entry:', err)
      showNotification('Error', 'Failed to create time entry: ' + (err.message || 'Unknown error'), 'error')
    }
  }

  const handleUpdateTimeEntry = async () => {
    if (!editingTimeEntry) return
    
    try {
      await api.put(`/api/v1/practice/time-entries/${editingTimeEntry.id}`, {
        ...timeEntryFormData,
        hours: parseFloat(timeEntryFormData.hours),
        hourly_rate: timeEntryFormData.hourly_rate ? parseFloat(timeEntryFormData.hourly_rate) : null
      })
      await loadTimeEntries()
      await loadDashboardData()
      closeTimeEntryDialog()
    } catch (err: any) {
      console.error('Error updating time entry:', err)
      showNotification('Error', 'Failed to update time entry: ' + (err.message || 'Unknown error'), 'error')
    }
  }

  const handleDeleteTimeEntry = async (timeEntryId: string) => {
    if (!confirm('Are you sure you want to delete this time entry?')) return
    
    try {
      await api.delete(`/api/v1/practice/time-entries/${timeEntryId}`)
      await loadTimeEntries()
      await loadDashboardData()
    } catch (err: any) {
      console.error('Error deleting time entry:', err)
      showNotification('Error', 'Failed to delete time entry', 'error')
    }
  }

  const handleSaveTimeEntry = () => {
    if (editingTimeEntry) {
      handleUpdateTimeEntry()
    } else {
      handleCreateTimeEntry()
    }
  }

  const openDeadlineDialog = (deadline?: Deadline) => {
    if (deadline) {
      setEditingDeadline(deadline)
      setDeadlineFormData({
        client_id: deadline.client_id,
        title: deadline.title,
        description: deadline.description || '',
        deadline_type: deadline.deadline_type,
        due_date: deadline.due_date,
        status: deadline.status,
        priority: deadline.priority
      })
    } else {
      setEditingDeadline(null)
      setDeadlineFormData({
        client_id: '',
        title: '',
        description: '',
        deadline_type: 'tax_return',
        due_date: '',
        status: 'pending',
        priority: 'medium'
      })
    }
    setIsDeadlineDialogOpen(true)
  }

  const closeDeadlineDialog = () => {
    setIsDeadlineDialogOpen(false)
    setEditingDeadline(null)
    setDeadlineFormData({
      client_id: '',
      title: '',
      description: '',
      deadline_type: 'tax_return',
      due_date: '',
      status: 'pending',
      priority: 'medium'
    })
  }

  const handleCreateDeadline = async () => {
    try {
      await api.post('/api/v1/practice/compliance/deadlines', deadlineFormData)
      await loadDeadlines()
      await loadDashboardData()
      closeDeadlineDialog()
    } catch (err: any) {
      console.error('Error creating deadline:', err)
      showNotification('Error', 'Failed to create deadline: ' + (err.message || 'Unknown error'), 'error')
    }
  }

  const handleUpdateDeadline = async () => {
    if (!editingDeadline) return
    
    try {
      await api.put(`/api/v1/practice/compliance/deadlines/${editingDeadline.id}`, deadlineFormData)
      await loadDeadlines()
      await loadDashboardData()
      closeDeadlineDialog()
    } catch (err: any) {
      console.error('Error updating deadline:', err)
      showNotification('Error', 'Failed to update deadline: ' + (err.message || 'Unknown error'), 'error')
    }
  }

  const handleSaveDeadline = () => {
    if (editingDeadline) {
      handleUpdateDeadline()
    } else {
      handleCreateDeadline()
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
        return <Circle className="h-4 w-4 text-[#001f3f]" />
      case 'on_hold':
        return <Pause className="h-4 w-4 text-[#001f3f]" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-blue-100 text-[#001f3f]'
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#001f3f] mx-auto mb-4"></div>
            <p className="text-[#001f3f]">Loading dashboard data...</p>
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
        icon: TrendingUp,
        color: 'text-[#001f3f]',
        drillDownData: {
          title: "Revenue Analytics",
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                  <h4 className="font-semibold text-[#001f3f]">Revenue by Module</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Practice Management Revenue: £850,450\nJobs Completed: 145\nAvg Job Value: £5,865', 'info')}>
                      <span className="text-[#001f3f]">Practice Management</span>
                      <span className="font-semibold text-[#001f3f]">£850,450</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Tax Services Revenue: £645,230\nReturns Filed: 289\nAvg Fee: £2,232', 'info')}>
                      <span className="text-[#001f3f]">Tax Services</span>
                      <span className="font-semibold text-[#001f3f]">£645,230</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Bookkeeping Revenue: £512,350\nActive Clients: 234\nMonthly Recurring: £425,000', 'info')}>
                      <span className="text-[#001f3f]">Bookkeeping</span>
                      <span className="font-semibold text-[#001f3f]">£512,350</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Payroll Services Revenue: £391,970\nPayroll Runs: 456\nEmployees Processed: 3,450', 'info')}>
                      <span className="text-[#001f3f]">Payroll Services</span>
                      <span className="font-semibold text-[#001f3f]">£391,970</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                  <h4 className="font-semibold text-[#001f3f]">Growth Metrics</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Monthly Recurring Revenue: £1,245,000\nGrowth Rate: +8.5% MoM\nChurn Rate: 1.2%', 'info')}>
                      <span className="text-[#001f3f]">MRR</span>
                      <span className="font-semibold text-green-600">+£1.2M</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Year over Year Growth: +12.5%\nNew Clients: 45\nExpanded Services: 67', 'info')}>
                      <span className="text-[#001f3f]">YoY Growth</span>
                      <span className="font-semibold text-green-600">+12.5%</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Average Revenue Per Client: £1,924/mo\nLTV: £34,632\nCAC: £2,450', 'info')}>
                      <span className="text-[#001f3f]">ARPC</span>
                      <span className="font-semibold text-[#001f3f]">£1,924</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => showNotification('Information', 'Opening comprehensive revenue analytics dashboard...', 'info')} className="px-4 py-2 bg-[#001f3f] text-white rounded hover:bg-[#003366]">
                  View Detailed Report
                </button>
                <button onClick={() => showNotification('Information', 'Exporting revenue data to Excel...', 'info')} className="px-4 py-2 bg-[#001f3f] text-white rounded hover:bg-[#003366]">
                  Export Data
                </button>
              </div>
            </div>
          )
        }
      },
      {
        title: 'Active Clients',
        value: dashboardData.kpis.active_clients.value.toString(),
        change: dashboardData.kpis.active_clients.change,
        icon: Users,
        color: 'text-[#001f3f]',
        drillDownData: {
          title: "Client Analytics",
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                  <h4 className="font-semibold text-[#001f3f]">Client Segments</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Enterprise Clients: 247\nAvg Revenue: £8,945/mo\nRetention: 96.8%', 'info')}>
                      <span className="text-[#001f3f]">Enterprise</span>
                      <span className="font-semibold text-[#001f3f]">247</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'SME Clients: 645\nAvg Revenue: £2,340/mo\nRetention: 94.2%', 'info')}>
                      <span className="text-[#001f3f]">SME</span>
                      <span className="font-semibold text-[#001f3f]">645</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Sole Traders: 355\nAvg Revenue: £890/mo\nRetention: 91.5%', 'info')}>
                      <span className="text-[#001f3f]">Sole Traders</span>
                      <span className="font-semibold text-[#001f3f]">355</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                  <h4 className="font-semibold text-[#001f3f]">Client Health</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Healthy Clients: 1,089 (87.4%)\nOn-time Payments: 100%\nSatisfaction: 4.5/5', 'info')}>
                      <span className="text-[#001f3f]">Healthy</span>
                      <span className="font-semibold text-green-600">1,089</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'At Risk: 127 (10.2%)\nPayment Delays: 45\nReduced Engagement: 38', 'info')}>
                      <span className="text-[#001f3f]">At Risk</span>
                      <span className="font-semibold text-[#001f3f]">127</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Churned: 31 (2.4%)\nLost Revenue: £42K/mo\nWin-back Opportunity: 8', 'info')}>
                      <span className="text-[#001f3f]">Churned</span>
                      <span className="font-semibold text-red-600">31</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => showNotification('Information', 'Opening client management dashboard...', 'info')} className="px-4 py-2 bg-[#001f3f] text-white rounded hover:bg-[#003366]">
                  View Client List
                </button>
                <ExportButton
                  data={[
                    ['Client Type', 'Count', 'Percentage'],
                    ['Active', '1,087', '87.4%'],
                    ['At Risk', '127', '10.2%'],
                    ['Churned', '31', '2.4%']
                  ]}
                  filename={`client-report-${new Date().toISOString().split('T')[0]}`}
                  buttonText="Export Report"
                />
              </div>
            </div>
          )
        }
      },
      {
        title: 'Completion Rate',
        value: dashboardData.kpis.completion_rate.value,
        change: dashboardData.kpis.completion_rate.change,
        icon: CheckCircle,
        color: 'text-[#001f3f]',
        drillDownData: {
          title: "Task Completion Analytics",
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                  <h4 className="font-semibold text-[#001f3f]">By Department</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Tax Department: 96.8%\nCompleted: 1,788\nOverdue: 17', 'info')}>
                      <span className="text-[#001f3f]">Tax Department</span>
                      <span className="font-semibold text-[#001f3f]">96.8%</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Audit: 94.2%\nCompleted: 840\nOverdue: 14', 'info')}>
                      <span className="text-[#001f3f]">Audit</span>
                      <span className="font-semibold text-[#001f3f]">94.2%</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Advisory: 92.1%\nCompleted: 1,137\nOverdue: 30', 'info')}>
                      <span className="text-[#001f3f]">Advisory</span>
                      <span className="font-semibold text-[#001f3f]">92.1%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                  <h4 className="font-semibold text-[#001f3f]">Performance Trends</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'This Week: 94.2%\nCompleted: 847\nIn Progress: 67', 'info')}>
                      <span className="text-[#001f3f]">This Week</span>
                      <span className="font-semibold text-[#001f3f]">94.2%</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Last Week: 92.1%\nCompleted: 823\nImprovement: +2.1%', 'info')}>
                      <span className="text-[#001f3f]">Last Week</span>
                      <span className="font-semibold text-[#001f3f]">92.1%</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Monthly Avg: 93.5%\nTarget: 95%\nGap: -1.5%', 'info')}>
                      <span className="text-[#001f3f]">Monthly Avg</span>
                      <span className="font-semibold text-[#001f3f]">93.5%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => showNotification('Information', 'Opening task performance dashboard...', 'info')} className="px-4 py-2 bg-[#001f3f] text-white rounded hover:bg-[#003366]">
                  View Task Details
                </button>
                <button onClick={() => showNotification('Information', 'Generating performance report...', 'info')} className="px-4 py-2 bg-[#001f3f] text-white rounded hover:bg-[#003366]">
                  Performance Report
                </button>
              </div>
            </div>
          )
        }
      },
      {
        title: 'Avg Response Time',
        value: dashboardData.kpis.avg_response_time.value,
        change: dashboardData.kpis.avg_response_time.change,
        icon: Clock,
        color: 'text-[#001f3f]',
        drillDownData: {
          title: "Response Time Analytics",
          content: (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                  <h4 className="font-semibold text-[#001f3f]">By Channel</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Email: 1.8h avg\nTotal Queries: 2,847/mo\nSLA Compliance: 87%', 'info')}>
                      <span className="text-[#001f3f]">Email</span>
                      <span className="font-semibold text-[#001f3f]">1.8h</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Phone: 0.5h avg\nTotal Calls: 1,234/mo\nSLA Compliance: 96%', 'info')}>
                      <span className="text-[#001f3f]">Phone</span>
                      <span className="font-semibold text-[#001f3f]">0.5h</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Portal: 3.2h avg\nTotal Tickets: 1,567/mo\nSLA Compliance: 82%', 'info')}>
                      <span className="text-[#001f3f]">Portal</span>
                      <span className="font-semibold text-[#001f3f]">3.2h</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-[2px] border-2 border-[#001f3f]">
                  <h4 className="font-semibold text-[#001f3f]">SLA Performance</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Within 1h: 45%\nTotal: 2,145\nTarget: 50%', 'info')}>
                      <span className="text-[#001f3f]">Within 1h</span>
                      <span className="font-semibold text-green-600">45%</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Within 4h: 78%\nTotal: 3,714\nTarget: 80%', 'info')}>
                      <span className="text-[#001f3f]">Within 4h</span>
                      <span className="font-semibold text-green-600">78%</span>
                    </div>
                    <div className="flex justify-between cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors" onClick={() => showNotification('Information', 'Within 24h: 94%\nTotal: 4,476\nTarget: 95%', 'info')}>
                      <span className="text-[#001f3f]">Within 24h</span>
                      <span className="font-semibold text-green-600">94%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => showNotification('Information', 'Opening response time log...', 'info')} className="px-4 py-2 bg-[#001f3f] text-white rounded hover:bg-[#003366]">
                  View Response Log
                </button>
                <button onClick={() => showNotification('Information', 'Generating SLA report...', 'info')} className="px-4 py-2 bg-[#001f3f] text-white rounded hover:bg-[#003366]">
                  SLA Report
                </button>
              </div>
            </div>
          )
        }
      }
    ] : []

    return (
      <div className="space-y-6">
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
          <div>
            <h1 className={`font-bold text-[#001f3f] ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Practice Management Dashboard</h1>
            <p className="text-[#001f3f] mt-2">Workflow automation, job tracking, compliance management & communications</p>
          </div>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-3'}`}>
            <Button variant="outline" className={isMobile ? 'w-full' : ''} onClick={() => showNotification('Information', 'Filter functionality: You can filter jobs by status, priority, client, date range, etc.', 'info')}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className={`bg-[#001f3f] hover:bg-[#001f3f]-600 ${isMobile ? 'w-full' : ''}`} onClick={() => openJobDialog()}>
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

      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-[2px] border-2 border-[#001f3f]">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border-2 border-[#001f3f] rounded-[2px]-md text-[#001f3f]"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border-2 border-[#001f3f] rounded-[2px]-md text-[#001f3f]"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border-2 border-[#001f3f] rounded-[2px]-md text-[#001f3f]"
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
              <CardTitle className="text-[#001f3f]">Recent Jobs</CardTitle>
              <CardDescription>Latest job assignments and progress</CardDescription>
            </CardHeader>
            <CardContent>
              {jobs.length === 0 ? (
                <p className="text-[#001f3f] text-center py-4">No jobs found. Create your first job to get started.</p>
              ) : (
                <div className="space-y-4">
                  {jobs.slice(0, 5).map((job) => (
                    <div 
                      key={job.id} 
                      className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px] hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => openJobDialog(job)}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        {getStatusIcon(job.status)}
                        <div>
                          <p className="font-medium text-[#001f3f]">{job.title}</p>
                          <p className="text-sm text-[#001f3f]">Client ID: {job.client_id}</p>
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
                            <p className="text-sm text-[#001f3f] mt-1">{job.assigned_to}</p>
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
              <CardTitle className="text-[#001f3f]">Upcoming Deadlines</CardTitle>
              <CardDescription>Critical deadlines requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              {deadlines.length === 0 ? (
                <p className="text-[#001f3f] text-center py-4">No upcoming deadlines.</p>
              ) : (
                <div className="space-y-4">
                  {deadlines.slice(0, 5).map((deadline) => {
                    const daysRemaining = calculateDaysRemaining(deadline.due_date)
                    return (
                      <div 
                        key={deadline.id} 
                        className="flex items-center justify-between p-3 border-2 border-[#001f3f] rounded-[2px] hover:bg-blue-50 cursor-pointer transition-colors"
                        onClick={() => openDeadlineDialog(deadline)}
                      >
                        <div className="flex-1">
                          <p className="font-medium text-[#001f3f]">{deadline.title}</p>
                          <p className="text-sm text-[#001f3f]">{deadline.deadline_type}</p>
                          <p className="text-xs text-gray-500">Client ID: {deadline.client_id}</p>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <div>
                            <p className="text-sm font-medium text-[#001f3f]">{new Date(deadline.due_date).toLocaleDateString()}</p>
                            <p className={`text-sm ${daysRemaining <= 7 ? 'text-red-600' : daysRemaining <= 14 ? 'text-[#001f3f]' : 'text-[#001f3f]'}`}>
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

  const renderJobOverview = () => {
    const jobStats = {
      total: jobs.length,
      notStarted: jobs.filter(j => j.status === 'not_started').length,
      inProgress: jobs.filter(j => j.status === 'in_progress').length,
      onHold: jobs.filter(j => j.status === 'on_hold').length,
      completed: jobs.filter(j => j.status === 'completed').length,
      highPriority: jobs.filter(j => j.priority === 'high' || j.priority === 'urgent').length,
      overdue: jobs.filter(j => j.due_date && new Date(j.due_date) < new Date() && j.status !== 'completed').length
    }

    return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#001f3f]">Job Overview</h2>
          <p className="text-[#001f3f]">Complete job management and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadJobs}>
            <Filter className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-[#001f3f] hover:bg-[#001f3f]-600" onClick={() => openJobDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            New Job
          </Button>
        </div>
      </div>

      {/* Job Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[#001f3f]">{jobStats.total}</div>
            <p className="text-xs text-gray-500">All active jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">{jobStats.inProgress}</div>
            <p className="text-xs text-gray-500">Currently working</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[#001f3f]">{jobStats.highPriority}</div>
            <p className="text-xs text-gray-500">Urgent attention needed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-red-600">{jobStats.overdue}</div>
            <p className="text-xs text-gray-500">Past due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Search</Label>
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#001f3f]">All Jobs ({jobs.length})</CardTitle>
            <CardDescription>Complete job management and tracking</CardDescription>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-[#001f3f] mb-4">No jobs found. Create your first job to get started.</p>
                <Button className="bg-[#001f3f] hover:bg-[#001f3f]-600" onClick={() => openJobDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Job
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => {
                  const isOverdue = job.due_date && new Date(job.due_date) < new Date() && job.status !== 'completed'
                  const daysUntilDue = job.due_date ? Math.ceil((new Date(job.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null
                  
                  return (
                  <div key={job.id} className={`p-4 border-2 rounded-[2px] hover:bg-blue-50 transition-colors ${isOverdue ? 'border-red-500 bg-red-50' : 'border-[#001f3f]'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start space-x-4 flex-1">
                        {getStatusIcon(job.status)}
                        <div className="flex-1 space-y-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-lg">{job.title}</p>
                              {isOverdue && (
                                <Badge className="bg-red-500">Overdue</Badge>
                              )}
                            </div>
                            <p className="text-sm text-[#001f3f]">Client ID: {job.client_id}</p>
                          </div>
                          
                          {job.description && (
                            <p className="text-sm text-gray-600">{job.description}</p>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            {job.due_date && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>Due: {new Date(job.due_date).toLocaleDateString()}</span>
                                {daysUntilDue !== null && !isOverdue && (
                                  <span className="text-[#001f3f] font-medium">({daysUntilDue} days)</span>
                                )}
                              </div>
                            )}
                            {job.created_at && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>Created: {new Date(job.created_at).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="text-right space-y-2">
                          <Badge className={getPriorityColor(job.priority)}>
                            {job.priority.toUpperCase()}
                          </Badge>
                          {job.assigned_to && (
                            <div className="text-sm">
                              <p className="text-xs text-gray-500">Assigned to</p>
                              <p className="text-[#001f3f] font-medium">{job.assigned_to}</p>
                            </div>
                          )}
                          <div className="space-y-1">
                            <Progress value={job.progress_percentage} className="w-24 h-2" />
                            <p className="text-xs text-gray-500">{job.progress_percentage}% Complete</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openJobDialog(job)}
                            className="text-[#001f3f] hover:text-[#001f3f] hover:bg-blue-50"
                            title="Edit job"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            title="Delete job"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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

      {/* Job Create/Edit Dialog */}
      <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">{editingJob ? 'Edit Job' : 'Create New Job'}</DialogTitle>
            <DialogDescription className="text-[#001f3f]">
              {editingJob ? 'Update job details below' : 'Fill in the details to create a new job'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="client_id" className="text-[#001f3f]">Client ID *</Label>
              <Input
                id="client_id"
                value={jobFormData.client_id}
                onChange={(e) => setJobFormData({ ...jobFormData, client_id: e.target.value })}
                placeholder="Enter client ID"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-[#001f3f]">Job Title *</Label>
              <Input
                id="title"
                value={jobFormData.title}
                onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                placeholder="Enter job title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-[#001f3f]">Description</Label>
              <Textarea
                id="description"
                value={jobFormData.description}
                onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                placeholder="Enter job description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status" className="text-[#001f3f]">Status</Label>
                <Select value={jobFormData.status} onValueChange={(value) => setJobFormData({ ...jobFormData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not_started">Not Started</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority" className="text-[#001f3f]">Priority</Label>
                <Select value={jobFormData.priority} onValueChange={(value) => setJobFormData({ ...jobFormData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="assigned_to" className="text-[#001f3f]">Assigned To</Label>
                <Input
                  id="assigned_to"
                  value={jobFormData.assigned_to}
                  onChange={(e) => setJobFormData({ ...jobFormData, assigned_to: e.target.value })}
                  placeholder="Assignee name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="due_date" className="text-[#001f3f]">Due Date</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={jobFormData.due_date}
                  onChange={(e) => setJobFormData({ ...jobFormData, due_date: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeJobDialog}>
              Cancel
            </Button>
            <Button 
              className="bg-[#001f3f] hover:bg-[#001f3f]-600"
              onClick={handleSaveJob}
              disabled={!jobFormData.client_id || !jobFormData.title}
            >
              {editingJob ? 'Update Job' : 'Create Job'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    )
  }

  const renderTimeTracking = () => {
    const timeStats = {
      totalHours: timeEntries.reduce((sum, entry) => sum + entry.hours, 0),
      billableHours: timeEntries.filter(e => e.billable).reduce((sum, entry) => sum + entry.hours, 0),
      totalRevenue: timeEntries.filter(e => e.billable && e.hourly_rate).reduce((sum, entry) => sum + (entry.hours * (entry.hourly_rate || 0)), 0),
      entriesCount: timeEntries.length
    }

    return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#001f3f]">Time Tracking</h2>
          <p className="text-[#001f3f]">Track time spent on jobs and tasks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadTimeEntries}>
            <Filter className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-[#001f3f] hover:bg-[#001f3f]-600" onClick={() => openTimeEntryDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Log Time
          </Button>
        </div>
      </div>

      {/* Time Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[#001f3f]">{timeStats.entriesCount}</div>
            <p className="text-xs text-gray-500">Time records</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">{timeStats.totalHours.toFixed(1)}h</div>
            <p className="text-xs text-gray-500">All time logged</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">Billable Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[#001f3f]">{timeStats.billableHours.toFixed(1)}h</div>
            <p className="text-xs text-gray-500">Client billable</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-600">£{timeStats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-500">Billable amount</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Search</Label>
              <Input
                placeholder="Search time entries..."
                value={timeSearchTerm}
                onChange={(e) => setTimeSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Filter by Job</Label>
              <Select value={selectedJobFilter} onValueChange={setSelectedJobFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {jobs.map(job => (
                    <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Time Entries ({timeEntries.length})</CardTitle>
          <CardDescription>Track time spent on jobs and tasks</CardDescription>
        </CardHeader>
        <CardContent>
          {timeEntries.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-[#001f3f] mb-4">No time entries found. Start logging time to track your work.</p>
              <Button className="bg-[#001f3f] hover:bg-[#001f3f]-600" onClick={() => openTimeEntryDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Log First Entry
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {timeEntries.map((entry) => {
                const relatedJob = jobs.find(j => j.id === entry.job_id)
                const revenue = entry.billable && entry.hourly_rate ? entry.hours * entry.hourly_rate : 0
                
                return (
                <div key={entry.id} className="p-4 border-2 border-[#001f3f] rounded-[2px] hover:bg-blue-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <Clock className="h-5 w-5 text-[#001f3f] mt-1" />
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-lg">{relatedJob?.title || 'Unknown Job'}</p>
                            {entry.billable ? (
                              <Badge className="bg-green-500">Billable</Badge>
                            ) : (
                              <Badge className="bg-gray-500">Non-Billable</Badge>
                            )}
                          </div>
                          <p className="text-sm text-[#001f3f]">Job ID: {entry.job_id}</p>
                        </div>
                        
                        {entry.description && (
                          <p className="text-sm text-gray-600">{entry.description}</p>
                        )}
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(entry.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className="font-medium text-[#001f3f]">{entry.hours}h</span>
                          </div>
                          {entry.hourly_rate && (
                            <div className="flex items-center gap-1">
                              <span>Rate: £{entry.hourly_rate}/h</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="text-right space-y-2">
                        {revenue > 0 && (
                          <div>
                            <p className="text-xs text-gray-500">Revenue</p>
                            <p className="text-lg font-bold text-green-600">£{revenue.toFixed(2)}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openTimeEntryDialog(entry)}
                          className="text-[#001f3f] hover:text-[#001f3f] hover:bg-blue-50"
                          title="Edit time entry"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTimeEntry(entry.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          title="Delete time entry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Time Entry Create/Edit Dialog */}
      <Dialog open={isTimeEntryDialogOpen} onOpenChange={setIsTimeEntryDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">{editingTimeEntry ? 'Edit Time Entry' : 'Log Time'}</DialogTitle>
            <DialogDescription className="text-[#001f3f]">
              {editingTimeEntry ? 'Update time entry details below' : 'Record time spent on a job or task'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="time_job_id" className="text-[#001f3f]">Job *</Label>
              <Select value={timeEntryFormData.job_id} onValueChange={(value) => setTimeEntryFormData({ ...timeEntryFormData, job_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent>
                  {jobs.map(job => (
                    <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time_description" className="text-[#001f3f]">Description</Label>
              <Textarea
                id="time_description"
                value={timeEntryFormData.description}
                onChange={(e) => setTimeEntryFormData({ ...timeEntryFormData, description: e.target.value })}
                placeholder="What did you work on?"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="time_hours" className="text-[#001f3f]">Hours *</Label>
                <Input
                  id="time_hours"
                  type="number"
                  step="0.25"
                  min="0"
                  value={timeEntryFormData.hours}
                  onChange={(e) => setTimeEntryFormData({ ...timeEntryFormData, hours: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time_date" className="text-[#001f3f]">Date *</Label>
                <Input
                  id="time_date"
                  type="date"
                  value={timeEntryFormData.date}
                  onChange={(e) => setTimeEntryFormData({ ...timeEntryFormData, date: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="time_hourly_rate" className="text-[#001f3f]">Hourly Rate (£)</Label>
                <Input
                  id="time_hourly_rate"
                  type="number"
                  step="0.01"
                  min="0"
                  value={timeEntryFormData.hourly_rate}
                  onChange={(e) => setTimeEntryFormData({ ...timeEntryFormData, hourly_rate: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time_billable" className="text-[#001f3f]">Billable</Label>
                <Select 
                  value={timeEntryFormData.billable ? 'true' : 'false'} 
                  onValueChange={(value) => setTimeEntryFormData({ ...timeEntryFormData, billable: value === 'true' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes - Billable</SelectItem>
                    <SelectItem value="false">No - Non-Billable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeTimeEntryDialog}>
              Cancel
            </Button>
            <Button 
              className="bg-[#001f3f] hover:bg-[#001f3f]-600"
              onClick={handleSaveTimeEntry}
              disabled={!timeEntryFormData.job_id || !timeEntryFormData.hours || !timeEntryFormData.date}
            >
              {editingTimeEntry ? 'Update Entry' : 'Log Time'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    )
  }

  const renderDeadlines = () => {
    const filteredDeadlines = deadlines.filter(deadline => {
      const matchesSearch = !deadlineSearchTerm || 
        deadline.title.toLowerCase().includes(deadlineSearchTerm.toLowerCase()) ||
        deadline.client_id.toLowerCase().includes(deadlineSearchTerm.toLowerCase()) ||
        deadline.deadline_type.toLowerCase().includes(deadlineSearchTerm.toLowerCase())
      
      const matchesStatus = selectedDeadlineStatus === 'all' || deadline.status === selectedDeadlineStatus
      const matchesPriority = selectedDeadlinePriority === 'all' || deadline.priority === selectedDeadlinePriority
      
      return matchesSearch && matchesStatus && matchesPriority
    })

    const deadlineStats = {
      total: deadlines.length,
      pending: deadlines.filter(d => d.status === 'pending').length,
      overdue: deadlines.filter(d => {
        const days = calculateDaysRemaining(d.due_date)
        return days < 0 && d.status !== 'completed'
      }).length,
      dueThisWeek: deadlines.filter(d => {
        const days = calculateDaysRemaining(d.due_date)
        return days >= 0 && days <= 7 && d.status !== 'completed'
      }).length,
      highPriority: deadlines.filter(d => d.priority === 'high' && d.status !== 'completed').length
    }

    const deadlineTypes = [
      { value: 'tax_return', label: 'Tax Return' },
      { value: 'vat_return', label: 'VAT Return' },
      { value: 'accounts_filing', label: 'Accounts Filing' },
      { value: 'companies_house', label: 'Companies House' },
      { value: 'payroll', label: 'Payroll' },
      { value: 'other', label: 'Other' }
    ]

    return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#001f3f]">Deadlines Management</h2>
          <p className="text-[#001f3f]">Monitor and manage upcoming deadlines</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadDeadlines}>
            <Filter className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-[#001f3f] hover:bg-[#001f3f]-600" onClick={() => openDeadlineDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Deadline
          </Button>
        </div>
      </div>

      {/* Deadline Statistics - Clickable for drill-down */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => {
            setSelectedDeadlineStatus('all')
            setSelectedDeadlinePriority('all')
            setDeadlineSearchTerm('')
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">Total Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[#001f3f]">{deadlineStats.total}</div>
            <p className="text-xs text-gray-500">All deadlines</p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => {
            setSelectedDeadlineStatus('pending')
            setSelectedDeadlinePriority('all')
            setDeadlineSearchTerm('')
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[#001f3f]">{deadlineStats.pending}</div>
            <p className="text-xs text-gray-500">Not completed • Click to filter</p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => {
            setSelectedDeadlineStatus('all')
            setSelectedDeadlinePriority('all')
            setDeadlineSearchTerm('overdue')
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-red-600">{deadlineStats.overdue}</div>
            <p className="text-xs text-gray-500">Past due date • Click to filter</p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => {
            setSelectedDeadlineStatus('all')
            setSelectedDeadlinePriority('all')
            setDeadlineSearchTerm('week')
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[#001f3f]">{deadlineStats.dueThisWeek}</div>
            <p className="text-xs text-gray-500">Due in 7 days • Click to filter</p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => {
            setSelectedDeadlineStatus('all')
            setSelectedDeadlinePriority('high')
            setDeadlineSearchTerm('')
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-600">{deadlineStats.highPriority}</div>
            <p className="text-xs text-gray-500">Urgent items • Click to filter</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Search</Label>
              <Input
                placeholder="Search deadlines..."
                value={deadlineSearchTerm}
                onChange={(e) => setDeadlineSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={selectedDeadlineStatus} onValueChange={setSelectedDeadlineStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select value={selectedDeadlinePriority} onValueChange={setSelectedDeadlinePriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#001f3f]">All Deadlines ({filteredDeadlines.length})</CardTitle>
          <CardDescription>Monitor and manage upcoming deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredDeadlines.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-[#001f3f] mb-4">No deadlines found. Add your first deadline to track compliance.</p>
              <Button className="bg-[#001f3f] hover:bg-[#001f3f]-600" onClick={() => openDeadlineDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Deadline
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDeadlines.map((deadline) => {
                const daysRemaining = calculateDaysRemaining(deadline.due_date)
                const isOverdue = daysRemaining < 0 && deadline.status !== 'completed'
                
                return (
                  <div 
                    key={deadline.id} 
                    className={`p-4 border-2 rounded-[2px] hover:bg-blue-50 transition-colors ${
                      isOverdue ? 'border-red-600' : 'border-[#001f3f]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <AlertTriangle className={`h-5 w-5 mt-1 ${isOverdue ? 'text-red-600' : 'text-[#001f3f]'}`} />
                        <div className="flex-1 space-y-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-lg">{deadline.title}</p>
                              <Badge className={getPriorityColor(deadline.priority)}>
                                {deadline.priority}
                              </Badge>
                              {isOverdue && (
                                <Badge className="bg-red-500">Overdue</Badge>
                              )}
                            </div>
                            <p className="text-sm text-[#001f3f]">Type: {deadline.deadline_type}</p>
                            <p className="text-sm text-gray-500">Client ID: {deadline.client_id}</p>
                          </div>
                          
                          {deadline.description && (
                            <p className="text-sm text-gray-600">{deadline.description}</p>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>Due: {new Date(deadline.due_date).toLocaleDateString()}</span>
                            </div>
                            <div className={`flex items-center gap-1 font-medium ${
                              daysRemaining < 0 ? 'text-red-700' : 
                              daysRemaining <= 7 ? 'text-red-600' : 
                              daysRemaining <= 14 ? 'text-[#001f3f]' : 
                              'text-blue-600'
                            }`}>
                              <Clock className="h-3 w-3" />
                              <span>
                                {daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` :
                                 daysRemaining === 0 ? 'Due today' :
                                 `${daysRemaining} days remaining`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="text-right">
                          <Badge className={`${
                            deadline.status === 'completed' ? 'bg-green-500' : 
                            deadline.status === 'cancelled' ? 'bg-gray-500' : 
                            'bg-blue-500'
                          }`}>
                            {deadline.status}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeadlineDialog(deadline)}
                            className="text-[#001f3f] hover:text-[#001f3f] hover:bg-blue-50"
                            title="Edit deadline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteDeadline(deadline.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            title="Delete deadline"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deadline Create/Edit Dialog */}
      <Dialog open={isDeadlineDialogOpen} onOpenChange={setIsDeadlineDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">{editingDeadline ? 'Edit Deadline' : 'Add Deadline'}</DialogTitle>
            <DialogDescription className="text-[#001f3f]">
              {editingDeadline ? 'Update deadline details below' : 'Create a new compliance deadline'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="deadline_client_id" className="text-[#001f3f]">Client ID *</Label>
              <Input
                id="deadline_client_id"
                value={deadlineFormData.client_id}
                onChange={(e) => setDeadlineFormData({ ...deadlineFormData, client_id: e.target.value })}
                placeholder="e.g., CLIENT001"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline_title" className="text-[#001f3f]">Title *</Label>
              <Input
                id="deadline_title"
                value={deadlineFormData.title}
                onChange={(e) => setDeadlineFormData({ ...deadlineFormData, title: e.target.value })}
                placeholder="e.g., Q2 VAT Return Filing"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline_type" className="text-[#001f3f]">Deadline Type *</Label>
              <Select value={deadlineFormData.deadline_type} onValueChange={(value) => setDeadlineFormData({ ...deadlineFormData, deadline_type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {deadlineTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline_description" className="text-[#001f3f]">Description</Label>
              <Textarea
                id="deadline_description"
                value={deadlineFormData.description}
                onChange={(e) => setDeadlineFormData({ ...deadlineFormData, description: e.target.value })}
                placeholder="Additional details about this deadline..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="deadline_due_date" className="text-[#001f3f]">Due Date *</Label>
                <Input
                  id="deadline_due_date"
                  type="date"
                  value={deadlineFormData.due_date}
                  onChange={(e) => setDeadlineFormData({ ...deadlineFormData, due_date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deadline_priority" className="text-[#001f3f]">Priority *</Label>
                <Select value={deadlineFormData.priority} onValueChange={(value) => setDeadlineFormData({ ...deadlineFormData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline_status" className="text-[#001f3f]">Status *</Label>
              <Select value={deadlineFormData.status} onValueChange={(value) => setDeadlineFormData({ ...deadlineFormData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeadlineDialog}>
              Cancel
            </Button>
            <Button 
              className="bg-[#001f3f] hover:bg-[#001f3f]-600"
              onClick={handleSaveDeadline}
              disabled={!deadlineFormData.client_id || !deadlineFormData.title || !deadlineFormData.due_date}
            >
              {editingDeadline ? 'Update Deadline' : 'Create Deadline'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    )
  }

  const renderClientPortal = () => {
    const [activePortalTab, setActivePortalTab] = useState('overview')
    
    return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
        <div>
          <h2 className="text-xl font-bold text-[#001f3f]">Client Portal</h2>
          <p className="text-[#001f3f]">Advanced client portal management and configuration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Portal Settings
          </Button>
          <Button className="bg-[#001f3f] hover:bg-[#001f3f]-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Client Access
          </Button>
        </div>
      </div>

      {/* Portal Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[#001f3f]">0</div>
            <p className="text-xs text-gray-500">Portal access enabled</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">Documents Shared</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">0</div>
            <p className="text-xs text-gray-500">Available to clients</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">Pending Signatures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[#001f3f]">0</div>
            <p className="text-xs text-gray-500">Awaiting e-signature</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#001f3f]">Client Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-600">0</div>
            <p className="text-xs text-gray-500">Unread messages</p>
          </CardContent>
        </Card>
      </div>

      {/* Portal Tabs */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex gap-2 border-b border-[#001f3f] pb-2 w-full overflow-x-auto">
            <Button
              variant={activePortalTab === 'overview' ? 'default' : 'ghost'}
              onClick={() => setActivePortalTab('overview')}
              className={activePortalTab === 'overview' ? 'bg-[#001f3f]' : 'text-[#001f3f]'}
            >
              Overview
            </Button>
            <Button
              variant={activePortalTab === 'clients' ? 'default' : 'ghost'}
              onClick={() => setActivePortalTab('clients')}
              className={activePortalTab === 'clients' ? 'bg-[#001f3f]' : 'text-[#001f3f]'}
            >
              Client Access
            </Button>
            <Button
              variant={activePortalTab === 'documents' ? 'default' : 'ghost'}
              onClick={() => setActivePortalTab('documents')}
              className={activePortalTab === 'documents' ? 'bg-[#001f3f]' : 'text-[#001f3f]'}
            >
              Documents
            </Button>
            <Button
              variant={activePortalTab === 'branding' ? 'default' : 'ghost'}
              onClick={() => setActivePortalTab('branding')}
              className={activePortalTab === 'branding' ? 'bg-[#001f3f]' : 'text-[#001f3f]'}
            >
              Branding
            </Button>
            <Button
              variant={activePortalTab === 'security' ? 'default' : 'ghost'}
              onClick={() => setActivePortalTab('security')}
              className={activePortalTab === 'security' ? 'bg-[#001f3f]' : 'text-[#001f3f]'}
            >
              Security
            </Button>
          </div>
        </CardHeader>
        <CardContent className="w-full">
          {activePortalTab === 'overview' && (
            <div className="space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#001f3f]">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-[#001f3f]">No recent portal activity</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#001f3f]">Portal Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#001f3f]">Portal Status</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#001f3f]">SSL Certificate</span>
                      <Badge className="bg-green-500">Valid</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#001f3f]">Two-Factor Auth</span>
                      <Badge className="bg-blue-500">Enabled</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#001f3f]">Auto Backups</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activePortalTab === 'clients' && (
            <div className="space-y-4 w-full">
              <div className="flex justify-between items-center w-full">
                <Input placeholder="Search clients..." className="max-w-sm" />
                <Button className="bg-[#001f3f] hover:bg-[#001f3f]-600">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Client
                </Button>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-[#001f3f] mb-4">No clients with portal access yet</p>
                    <Button className="bg-[#001f3f] hover:bg-[#001f3f]-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Client
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activePortalTab === 'documents' && (
            <div className="space-y-4 w-full">
              <div className="flex justify-between items-center w-full">
                <Input placeholder="Search documents..." className="max-w-sm" />
                <Button className="bg-[#001f3f] hover:bg-[#001f3f]-600">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-[#001f3f] mb-4">No documents shared on portal</p>
                    <p className="text-sm text-gray-500 mb-4">Upload documents to share with clients securely</p>
                    <Button className="bg-[#001f3f] hover:bg-[#001f3f]-600">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload First Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activePortalTab === 'branding' && (
            <div className="space-y-6 w-full">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#001f3f]">Portal Appearance</CardTitle>
                  <CardDescription>Customize your client portal branding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Company Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-32 border-2 border-[#001f3f] rounded flex items-center justify-center bg-gray-50">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Portal Title</Label>
                    <Input placeholder="e.g., My Firm Client Portal" defaultValue="Client Portal" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Welcome Message</Label>
                    <Textarea 
                      placeholder="Welcome message for clients..." 
                      rows={4}
                      defaultValue="Welcome to our secure client portal. Access your documents, invoices, and communicate with us securely."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Primary Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" className="w-20" defaultValue="#1e40af" />
                      <Input placeholder="#1e40af" defaultValue="#1e40af" className="flex-1" />
                    </div>
                  </div>
                  <Button className="bg-[#001f3f] hover:bg-[#001f3f]-600">
                    Save Branding Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activePortalTab === 'security' && (
            <div className="space-y-6 w-full">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#001f3f]">Security Settings</CardTitle>
                  <CardDescription>Configure portal security and access controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-[#001f3f]">
                    <div>
                      <p className="font-medium text-[#001f3f]">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Require 2FA for all client logins</p>
                    </div>
                    <Badge className="bg-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-[#001f3f]">
                    <div>
                      <p className="font-medium text-[#001f3f]">Session Timeout</p>
                      <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-[#001f3f]">
                    <div>
                      <p className="font-medium text-[#001f3f]">IP Whitelist</p>
                      <p className="text-sm text-gray-500">Restrict access to specific IPs</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-[#001f3f]">
                    <div>
                      <p className="font-medium text-[#001f3f]">Password Policy</p>
                      <p className="text-sm text-gray-500">Minimum password requirements</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Policy</Button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-[#001f3f]">Audit Logs</p>
                      <p className="text-sm text-gray-500">Track all portal access and changes</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    )
  }

  const renderWorkflowBuilder = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#001f3f]">Workflow Builder</h2>
          <p className="text-[#001f3f]">Design and configure automated workflows</p>
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
          <h2 className="text-xl font-bold text-[#001f3f]">Workflow Automation</h2>
          <p className="text-[#001f3f]">Configure automated workflow triggers and actions</p>
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
          <CardTitle className="text-[#001f3f]">Automation Rules</CardTitle>
          <CardDescription>Configure automated workflow triggers and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-[#001f3f]">Workflow automation configuration will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderCapacityPlanning = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#001f3f]">Capacity Planning</h2>
          <p className="text-[#001f3f]">Advanced capacity planning and resource allocation</p>
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
          <h2 className="text-xl font-bold text-[#001f3f]">Compliance Management</h2>
          <p className="text-[#001f3f]">Automated compliance monitoring and management</p>
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
          <h2 className="text-xl font-bold text-[#001f3f]">Practice Analytics</h2>
          <p className="text-[#001f3f]">Analyze practice performance and efficiency</p>
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
          <CardTitle className="text-[#001f3f]">Performance Metrics</CardTitle>
          <CardDescription>Analyze practice performance and efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#001f3f]">Practice Analytics</h3>
              <div className="flex gap-2">
                <ExportButton
                  data={[
                    ['Metric', 'Value', 'Change'],
                    ['Practice Revenue', '£847,230', '+12.5%'],
                    ['Billable Hours', '3,847', '+8.3%'],
                    ['Client Satisfaction', '94.5%', '+2.1%'],
                    ['Efficiency Rate', '87.2%', '+5.4%']
                  ]}
                  filename={`practice-analytics-${new Date().toISOString().split('T')[0]}`}
                  buttonText="Export Report"
                />
                <button className="px-4 py-2 bg-gray-200 text-[#001f3f] rounded hover:bg-gray-300">
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
                          <h4 className="font-semibold text-[#001f3f]">Revenue by Service</h4>
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
                        <div className="bg-blue-50 p-4 rounded-[2px]">
                          <h4 className="font-semibold text-[#001f3f]">Monthly Trends</h4>
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
                        <h4 className="font-semibold text-[#001f3f]">Satisfaction Breakdown</h4>
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
                        <h4 className="font-semibold text-[#001f3f]">Utilization by Role</h4>
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
                        <h4 className="font-semibold text-[#001f3f]">Completion by Type</h4>
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
                  <div className="text-xl font-bold text-[#001f3f]">£2,847</div>
                  <div className="text-sm text-[#001f3f]">Average Project Value</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-[2px]">
                  <div className="text-xl font-bold text-[#001f3f]">12.3</div>
                  <div className="text-sm text-[#001f3f]">Days Average Completion</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-[2px]">
                  <div className="text-xl font-bold text-green-600">98.7%</div>
                  <div className="text-sm text-[#001f3f]">Client Retention Rate</div>
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
          <h2 className="text-xl font-bold text-[#001f3f]">AI Practice Adviser</h2>
          <p className="text-[#001f3f]">Get intelligent insights for practice optimization</p>
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
          <CardTitle className="text-[#001f3f]">AI Recommendations</CardTitle>
          <CardDescription>Get intelligent insights for practice optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#001f3f]">Ask your Practice Manager</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  New Conversation
                </button>
                <button className="px-4 py-2 bg-gray-200 text-[#001f3f] rounded hover:bg-gray-300">
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
                  <h4 className="font-semibold text-[#001f3f]">Practice Management AI Adviser</h4>
                  <p className="text-sm text-[#001f3f]">Specialized in practice operations, client management, and business strategy</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-[2px]">
                  <h5 className="font-semibold text-[#001f3f] mb-2">What I can help you with:</h5>
                  <ul className="text-sm text-[#001f3f] space-y-1">
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
                    <span className="text-[#001f3f] text-sm">You</span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      className="w-full p-3 border-2 border-[#001f3f] rounded-[2px] resize-none"
                      rows={3}
                      placeholder="Ask me anything about practice management, client relationships, workflow optimization, or business strategy..."
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-gray-100 text-[#001f3f] rounded hover:bg-gray-200">
                      Workflow Analysis
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-[#001f3f] rounded hover:bg-gray-200">
                      Client Strategy
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-[#001f3f] rounded hover:bg-gray-200">
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
                    <p className="text-sm text-[#001f3f] font-medium">Workflow Optimization</p>
                    <p className="text-xs text-[#001f3f] mt-1">Your client onboarding process could be streamlined by 23% with automated document collection.</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-[2px]">
                    <p className="text-sm text-[#001f3f] font-medium">Resource Allocation</p>
                    <p className="text-xs text-[#001f3f] mt-1">Consider redistributing junior staff workload to improve utilization rates across teams.</p>
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
                      <p className="text-xs text-[#001f3f]">3 clients showing payment delays</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[2px]">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Update service agreements</p>
                      <p className="text-xs text-[#001f3f]">12 agreements due for renewal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[2px]">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Schedule team training</p>
                      <p className="text-xs text-[#001f3f]">New compliance requirements</p>
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
          <h2 className="text-xl font-bold text-[#001f3f]">Email Studio</h2>
          <p className="text-[#001f3f]">Advanced email management and automation</p>
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
          <h2 className="text-xl font-bold text-[#001f3f]">Payslip Templates</h2>
          <p className="text-[#001f3f]">Streamline payroll processing with branded templates</p>
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
          <CardTitle className="text-[#001f3f]">Payslip Template Workflows</CardTitle>
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
          <h2 className="text-xl font-bold text-[#001f3f]">Invoice Templates</h2>
          <p className="text-[#001f3f]">Streamline invoice creation with branded templates</p>
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
          <CardTitle className="text-[#001f3f]">Invoice Template Workflows</CardTitle>
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
          <h2 className="text-xl font-bold text-[#001f3f]">Template Analytics</h2>
          <p className="text-[#001f3f]">Monitor template performance and usage patterns</p>
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
          <CardTitle className="text-[#001f3f]">Template Usage Analytics</CardTitle>
          <CardDescription>Monitor template performance and usage patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#001f3f]">Templates Created</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">24</div>
                <p className="text-xs text-[#001f3f]">+3 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#001f3f]">Templates Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">156</div>
                <p className="text-xs text-[#001f3f]">+12 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#001f3f]">Time Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">42h</div>
                <p className="text-xs text-[#001f3f]">This month</p>
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
          <h2 className="text-xl font-bold text-[#001f3f]">Practice Reports</h2>
          <p className="text-[#001f3f]">Generate comprehensive practice management reports</p>
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
          <CardTitle className="text-[#001f3f]">Management Reports</CardTitle>
          <CardDescription>Generate comprehensive practice management reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#001f3f]">Practice Reports</h3>
              <div className="flex gap-2">
                <ExportButton
                  data={[
                    ['Report Type', 'Category', 'Status'],
                    ['Monthly P&L', 'Financial', 'Available'],
                    ['Cash Flow Report', 'Financial', 'Available'],
                    ['Client Analysis', 'Operations', 'Available'],
                    ['Resource Utilization', 'Operations', 'Available']
                  ]}
                  filename={`practice-reports-${new Date().toISOString().split('T')[0]}`}
                  buttonText="Generate Report"
                />
                <button className="px-4 py-2 bg-gray-200 text-[#001f3f] rounded hover:bg-gray-300">
                  Schedule Reports
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-[2px] shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-[2px] flex items-center justify-center">
                    <span className="text-[#001f3f]">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#001f3f]">Financial Reports</h4>
                    <p className="text-sm text-[#001f3f]">Revenue, profitability, and financial performance</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly P&L</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cash Flow Report</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Budget vs Actual</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fee Analysis</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[2px] shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-[2px] flex items-center justify-center">
                    <span className="text-[#001f3f]">👥</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#001f3f]">Client Reports</h4>
                    <p className="text-sm text-[#001f3f]">Client analysis and relationship metrics</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Client Portfolio</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Satisfaction Survey</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Retention Analysis</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Utilization</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[2px] shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-[2px] flex items-center justify-center">
                    <span className="text-green-600">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#001f3f]">Performance Reports</h4>
                    <p className="text-sm text-[#001f3f]">Team productivity and efficiency metrics</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Team Utilization</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Project Completion</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time Analysis</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Quality Metrics</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[2px] shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-[2px] flex items-center justify-center">
                    <span className="text-purple-600">📋</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#001f3f]">Compliance Reports</h4>
                    <p className="text-sm text-[#001f3f]">Regulatory and compliance tracking</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>AML Compliance</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GDPR Audit</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Professional Standards</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Risk Assessment</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
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
                    <p className="text-sm text-[#001f3f]">Strategic insights and analytics</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Market Analysis</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Competitive Benchmarking</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Growth Opportunities</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Trend Analysis</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Generate</span>
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
                    <p className="text-sm text-[#001f3f]">Build your own reports and dashboards</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Report Builder</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Open</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Saved Templates</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">View</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Data Export</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Configure</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>API Access</span>
                    <span className="text-[#001f3f] hover:underline cursor-pointer">Setup</span>
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
                        <button className="text-[#001f3f] hover:underline text-sm mr-2">View</button>
                        <button className="text-[#001f3f] hover:underline text-sm">Download</button>
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
                        <button className="text-[#001f3f] hover:underline text-sm mr-2">View</button>
                        <button className="text-[#001f3f] hover:underline text-sm">Download</button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Team Utilization Report</td>
                      <td className="py-2">Performance</td>
                      <td className="py-2">2024-03-13</td>
                      <td className="py-2">
                        <span className="px-2 py-1 bg-blue-100 text-[#001f3f] rounded text-xs">Processing</span>
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
        <div className="w-64 bg-white border-r-2 border-[#001f3f] flex flex-col">
          <div className="p-4 border-b-2 border-[#001f3f]">
            <h2 className="text-lg font-semibold text-[#001f3f]">Practice Management</h2>
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
                                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-l-2 border-orange-300 shadow-md font-semibold' 
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

      {/* Notification Modal */}
      <Dialog open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#001f3f]">{notificationData.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-[#001f3f] whitespace-pre-line">{notificationData.message}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsNotificationOpen(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </ResponsiveLayout>
  )
}

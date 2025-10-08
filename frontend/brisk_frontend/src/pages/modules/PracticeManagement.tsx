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
  Eye,
  Zap,
  Play,
  CheckSquare,
  Bell,
  RefreshCw,
  Search,
  Download,
  X,
  DollarSign
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
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['jobs'])
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

  const [workflows, setWorkflows] = useState<any[]>([])
  const [isWorkflowDialogOpen, setIsWorkflowDialogOpen] = useState(false)
  const [editingWorkflow, setEditingWorkflow] = useState<any | null>(null)
  const [activeWorkflowTab, setActiveWorkflowTab] = useState('builder')
  const [workflowSearchTerm, setWorkflowSearchTerm] = useState('')
  const [workflowFormData, setWorkflowFormData] = useState({
    name: '',
    description: '',
    trigger_type: 'manual',
    trigger_event: '',
    conditions: [] as any[],
    actions: [] as any[],
    status: 'active',
    category: 'custom'
  })

  const [automationRules, setAutomationRules] = useState<any[]>([])
  const [isAutomationDialogOpen, setIsAutomationDialogOpen] = useState(false)
  const [editingAutomation, setEditingAutomation] = useState<any | null>(null)
  const [automationFormData, setAutomationFormData] = useState({
    name: '',
    description: '',
    trigger_type: 'event',
    trigger_event: '',
    trigger_schedule: '',
    conditions: [] as any[],
    actions: [] as any[],
    status: 'active',
    priority: 'medium'
  })
  const [activeAutomationTab, setActiveAutomationTab] = useState('rules')
  const [automationSearchTerm, setAutomationSearchTerm] = useState('')

  const [aiQuestion, setAiQuestion] = useState('')
  const [aiConversations, setAiConversations] = useState<any[]>([])
  const [currentConversation, setCurrentConversation] = useState<any | null>(null)
  const [showConversationHistory, setShowConversationHistory] = useState(false)
  const [aiReports, setAiReports] = useState<any[]>([])

  useEffect(() => {
    loadDashboardData()
    loadJobs()
    loadDeadlines()
    loadTimeEntries()
    loadWorkflows()
    loadAutomationRules()
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
    if (!question.trim()) return
    
    setIsAILoading(true)
    try {
      const newMessage = {
        id: Date.now().toString(),
        question: question,
        answer: `Based on your practice data, here's my analysis for "${question}":\n\n• Current performance metrics show strong client retention\n• Workflow efficiency can be improved by 23% with automation\n• Consider reallocating resources for optimal utilization\n\nWould you like a detailed report on any of these areas?`,
        timestamp: new Date().toISOString(),
        category: 'general'
      }
      
      if (currentConversation) {
        const updatedConversation = {
          ...currentConversation,
          messages: [...currentConversation.messages, newMessage]
        }
        setCurrentConversation(updatedConversation)
        
        const updatedConversations = aiConversations.map(conv => 
          conv.id === currentConversation.id ? updatedConversation : conv
        )
        setAiConversations(updatedConversations)
      } else {
        const newConversation = {
          id: Date.now().toString(),
          title: question.substring(0, 50) + '...',
          messages: [newMessage],
          created_at: new Date().toISOString()
        }
        setCurrentConversation(newConversation)
        setAiConversations([newConversation, ...aiConversations])
      }
      
      setAiQuestion('')
    } catch (error) {
      console.error('Error getting AI response:', error)
      alert('Failed to get AI response. Please try again.')
    } finally {
      setIsAILoading(false)
    }
  }

  const handleNewConversation = () => {
    setCurrentConversation(null)
    setAiQuestion('')
  }

  const handleViewHistory = () => {
    setShowConversationHistory(!showConversationHistory)
  }

  const handleSelectConversation = (conversation: any) => {
    setCurrentConversation(conversation)
    setShowConversationHistory(false)
  }

  const handleDeleteConversation = (conversationId: string) => {
    setAiConversations(aiConversations.filter(conv => conv.id !== conversationId))
    if (currentConversation?.id === conversationId) {
      setCurrentConversation(null)
    }
  }

  const handleGenerateFullReport = async () => {
    setIsAILoading(true)
    try {
      const report = {
        id: Date.now().toString(),
        title: 'Comprehensive Practice Analysis Report',
        generated_at: new Date().toISOString(),
        sections: {
          client_analysis: {
            total_clients: 287,
            retention_rate: 98.7,
            satisfaction_score: 4.8,
            at_risk_clients: 3,
            high_value_clients: 45
          },
          workflow_efficiency: {
            automation_opportunities: 23,
            bottlenecks_identified: 5,
            time_savings_potential: '127 hours/month'
          },
          billing_performance: {
            total_revenue: '£847,230',
            outstanding_invoices: '£45,320',
            average_payment_time: '14.2 days',
            collection_rate: 96.5
          },
          deadline_management: {
            upcoming_deadlines: 24,
            overdue_items: 2,
            completion_rate: 94.2
          },
          team_performance: {
            utilization_rate: 87.3,
            billable_hours: 8281,
            avg_project_completion: '12.3 days'
          }
        }
      }
      
      setAiReports([report, ...aiReports])
      alert('Full practice report generated successfully!\n\nKey Findings:\n• 98.7% client retention rate\n• 23% automation improvement potential\n• £45,320 in outstanding invoices\n• 94.2% deadline completion rate')
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Failed to generate report. Please try again.')
    } finally {
      setIsAILoading(false)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    setAiQuestion(prompt)
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
      alert('Failed to create job: ' + (err.message || 'Unknown error'))
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
      alert('Failed to update job: ' + (err.message || 'Unknown error'))
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
      alert('Failed to create time entry: ' + (err.message || 'Unknown error'))
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
      alert('Failed to update time entry: ' + (err.message || 'Unknown error'))
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
      alert('Failed to delete time entry')
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
      alert('Failed to create deadline: ' + (err.message || 'Unknown error'))
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
      alert('Failed to update deadline: ' + (err.message || 'Unknown error'))
    }
  }

  const handleSaveDeadline = () => {
    if (editingDeadline) {
      handleUpdateDeadline()
    } else {
      handleCreateDeadline()
    }
  }

  const loadWorkflows = async () => {
    try {
      const response = await api.get('/api/v1/practice/workflows')
      setWorkflows(response.data)
    } catch (err: any) {
      console.error('Failed to load workflows:', err)
      setWorkflows([])
    }
  }

  const openWorkflowDialog = (workflow: any | null = null) => {
    if (workflow) {
      setEditingWorkflow(workflow)
      setWorkflowFormData({
        name: workflow.name,
        description: workflow.description,
        trigger_type: workflow.trigger_type,
        trigger_event: workflow.trigger_event || '',
        conditions: workflow.conditions || [],
        actions: workflow.actions || [],
        status: workflow.status,
        category: workflow.category
      })
    } else {
      setEditingWorkflow(null)
      setWorkflowFormData({
        name: '',
        description: '',
        trigger_type: 'manual',
        trigger_event: '',
        conditions: [],
        actions: [],
        status: 'active',
        category: 'custom'
      })
    }
    setIsWorkflowDialogOpen(true)
  }

  const closeWorkflowDialog = () => {
    setIsWorkflowDialogOpen(false)
    setEditingWorkflow(null)
    setWorkflowFormData({
      name: '',
      description: '',
      trigger_type: 'manual',
      trigger_event: '',
      conditions: [],
      actions: [],
      status: 'active',
      category: 'custom'
    })
  }

  const handleCreateWorkflow = async () => {
    try {
      const response = await api.post('/api/v1/practice/workflows', workflowFormData)
      setWorkflows([...workflows, response.data])
      closeWorkflowDialog()
    } catch (err: any) {
      console.error('Failed to create workflow:', err)
      alert('Failed to create workflow: ' + (err.message || 'Unknown error'))
    }
  }

  const handleUpdateWorkflow = async () => {
    if (!editingWorkflow) return
    try {
      const response = await api.put(`/api/v1/practice/workflows/${editingWorkflow.id}`, workflowFormData)
      setWorkflows(workflows.map(w => w.id === editingWorkflow.id ? response.data : w))
      closeWorkflowDialog()
    } catch (err: any) {
      console.error('Failed to update workflow:', err)
      alert('Failed to update workflow: ' + (err.message || 'Unknown error'))
    }
  }

  const handleSaveWorkflow = () => {
    if (editingWorkflow) {
      handleUpdateWorkflow()
    } else {
      handleCreateWorkflow()
    }
  }

  const handleDeleteWorkflow = async (id: string) => {
    if (!confirm('Are you sure you want to delete this workflow?')) return
    try {
      await api.delete(`/api/v1/practice/workflows/${id}`)
      setWorkflows(workflows.filter(w => w.id !== id))
    } catch (err: any) {
      console.error('Failed to delete workflow:', err)
      alert('Failed to delete workflow')
    }
  }

  const handleCloneWorkflow = async (workflow: any) => {
    try {
      console.log('Cloning workflow:', workflow)
      const clonedData = {
        name: workflow.name ? `${workflow.name} (Copy)` : 'New Workflow (Copy)',
        description: workflow.description || '',
        trigger_type: workflow.trigger_type || 'manual',
        trigger_event: workflow.trigger_event || '',
        conditions: workflow.conditions || [],
        actions: workflow.actions || [],
        status: 'active',
        category: 'custom'
      }
      console.log('Sending cloned data:', clonedData)
      const response = await api.post('/api/v1/practice/workflows', clonedData)
      console.log('Clone response:', response)
      setWorkflows([...workflows, response.data])
      setActiveWorkflowTab('builder')
      alert(`Successfully created "${response.data.name}" from template!`)
      await loadWorkflows()
    } catch (err: any) {
      console.error('Failed to clone workflow - Full error:', err)
      console.error('Error message:', err.message)
      console.error('Error response:', err.response)
      alert('Failed to clone workflow: ' + (err.message || err.toString()))
    }
  }

  const handleToggleWorkflowStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
      const response = await api.patch(`/api/v1/practice/workflows/${id}`, { status: newStatus })
      setWorkflows(workflows.map(w => w.id === id ? response.data : w))
    } catch (err: any) {
      console.error('Failed to toggle workflow status:', err)
      alert('Failed to toggle workflow status')
    }
  }

  const loadAutomationRules = async () => {
    try {
      const response = await api.get('/api/v1/practice/automation-rules')
      setAutomationRules(response.data)
    } catch (err: any) {
      console.error('Failed to load automation rules:', err)
      setAutomationRules([])
    }
  }

  const openAutomationDialog = (rule: any | null = null) => {
    if (rule) {
      setEditingAutomation(rule)
      setAutomationFormData({
        name: rule.name,
        description: rule.description,
        trigger_type: rule.trigger_type,
        trigger_event: rule.trigger_event || '',
        trigger_schedule: rule.trigger_schedule || '',
        conditions: rule.conditions || [],
        actions: rule.actions || [],
        status: rule.status,
        priority: rule.priority
      })
    } else {
      setEditingAutomation(null)
      setAutomationFormData({
        name: '',
        description: '',
        trigger_type: 'event',
        trigger_event: '',
        trigger_schedule: '',
        conditions: [],
        actions: [],
        status: 'active',
        priority: 'medium'
      })
    }
    setIsAutomationDialogOpen(true)
  }

  const closeAutomationDialog = () => {
    setIsAutomationDialogOpen(false)
    setEditingAutomation(null)
    setAutomationFormData({
      name: '',
      description: '',
      trigger_type: 'event',
      trigger_event: '',
      trigger_schedule: '',
      conditions: [],
      actions: [],
      status: 'active',
      priority: 'medium'
    })
  }

  const handleCreateAutomation = async () => {
    try {
      const response = await api.post('/api/v1/practice/automation-rules', automationFormData)
      setAutomationRules([...automationRules, response.data])
      closeAutomationDialog()
      alert('Automation rule created successfully!')
    } catch (err: any) {
      console.error('Failed to create automation:', err)
      alert('Failed to create automation: ' + (err.message || 'Unknown error'))
    }
  }

  const handleUpdateAutomation = async () => {
    if (!editingAutomation) return
    try {
      const response = await api.put(`/api/v1/practice/automation-rules/${editingAutomation.id}`, automationFormData)
      setAutomationRules(automationRules.map(r => r.id === editingAutomation.id ? response.data : r))
      closeAutomationDialog()
      alert('Automation rule updated successfully!')
    } catch (err: any) {
      console.error('Failed to update automation:', err)
      alert('Failed to update automation: ' + (err.message || 'Unknown error'))
    }
  }

  const handleSaveAutomation = () => {
    if (editingAutomation) {
      handleUpdateAutomation()
    } else {
      handleCreateAutomation()
    }
  }

  const handleDeleteAutomation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this automation rule?')) return
    try {
      await api.delete(`/api/v1/practice/automation-rules/${id}`)
      setAutomationRules(automationRules.filter(r => r.id !== id))
      alert('Automation rule deleted successfully!')
    } catch (err: any) {
      console.error('Failed to delete automation:', err)
      alert('Failed to delete automation')
    }
  }

  const handleToggleAutomationStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
      const response = await api.patch(`/api/v1/practice/automation-rules/${id}`, { status: newStatus })
      setAutomationRules(automationRules.map(r => r.id === id ? response.data : r))
    } catch (err: any) {
      console.error('Failed to toggle automation status:', err)
      alert('Failed to toggle automation status')
    }
  }

  const addCondition = () => {
    setAutomationFormData({
      ...automationFormData,
      conditions: [...automationFormData.conditions, { field: '', operator: 'equals', value: '' }]
    })
  }

  const removeCondition = (index: number) => {
    setAutomationFormData({
      ...automationFormData,
      conditions: automationFormData.conditions.filter((_, i) => i !== index)
    })
  }

  const updateCondition = (index: number, field: string, value: any) => {
    const newConditions = [...automationFormData.conditions]
    newConditions[index] = { ...newConditions[index], [field]: value }
    setAutomationFormData({ ...automationFormData, conditions: newConditions })
  }

  const addAction = () => {
    setAutomationFormData({
      ...automationFormData,
      actions: [...automationFormData.actions, { type: 'send_email', config: {} }]
    })
  }

  const removeAction = (index: number) => {
    setAutomationFormData({
      ...automationFormData,
      actions: automationFormData.actions.filter((_, i) => i !== index)
    })
  }

  const updateAction = (index: number, field: string, value: any) => {
    const newActions = [...automationFormData.actions]
    newActions[index] = { ...newActions[index], [field]: value }
    setAutomationFormData({ ...automationFormData, actions: newActions })
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
            <p className="text-blue-900">Loading dashboard data...</p>
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
            <p className="text-blue-900 mt-2">Workflow automation, job tracking, compliance management & communications</p>
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
                <p className="text-blue-900 text-center py-4">No jobs found. Create your first job to get started.</p>
              ) : (
                <div className="space-y-4">
                  {jobs.slice(0, 5).map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 border-2 border-blue-900 rounded-[2px] hover:bg-blue-50 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3 flex-1">
                        {getStatusIcon(job.status)}
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-blue-900">Client ID: {job.client_id}</p>
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
                            <p className="text-sm text-blue-900 mt-1">{job.assigned_to}</p>
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
                <p className="text-blue-900 text-center py-4">No upcoming deadlines.</p>
              ) : (
                <div className="space-y-4">
                  {deadlines.slice(0, 5).map((deadline) => {
                    const daysRemaining = calculateDaysRemaining(deadline.due_date)
                    return (
                      <div key={deadline.id} className="flex items-center justify-between p-3 border-2 border-blue-900 rounded-[2px] hover:bg-blue-50 cursor-pointer transition-colors">
                        <div className="flex-1">
                          <p className="font-medium">{deadline.title}</p>
                          <p className="text-sm text-blue-900">{deadline.deadline_type}</p>
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
          <h2 className="text-2xl font-bold text-blue-900">Job Overview</h2>
          <p className="text-blue-900">Complete job management and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadJobs}>
            <Filter className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-brisk-primary hover:bg-brisk-primary-600" onClick={() => openJobDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            New Job
          </Button>
        </div>
      </div>

      {/* Job Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{jobStats.total}</div>
            <p className="text-xs text-gray-500">All active jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{jobStats.inProgress}</div>
            <p className="text-xs text-gray-500">Currently working</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{jobStats.highPriority}</div>
            <p className="text-xs text-gray-500">Urgent attention needed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{jobStats.overdue}</div>
            <p className="text-xs text-gray-500">Past due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Filters & Search</CardTitle>
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
            <CardTitle className="text-blue-900">All Jobs ({jobs.length})</CardTitle>
            <CardDescription>Complete job management and tracking</CardDescription>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-blue-900 mb-4">No jobs found. Create your first job to get started.</p>
                <Button className="bg-brisk-primary hover:bg-brisk-primary-600" onClick={() => openJobDialog()}>
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
                  <div key={job.id} className={`p-4 border-2 rounded-[2px] hover:bg-blue-50 transition-colors ${isOverdue ? 'border-red-500 bg-red-50' : 'border-blue-900'}`}>
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
                            <p className="text-sm text-blue-900">Client ID: {job.client_id}</p>
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
                                  <span className="text-blue-900 font-medium">({daysUntilDue} days)</span>
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
                              <p className="text-blue-900 font-medium">{job.assigned_to}</p>
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
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
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
            <DialogTitle className="text-blue-900">{editingJob ? 'Edit Job' : 'Create New Job'}</DialogTitle>
            <DialogDescription>
              {editingJob ? 'Update job details below' : 'Fill in the details to create a new job'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="client_id">Client ID *</Label>
              <Input
                id="client_id"
                value={jobFormData.client_id}
                onChange={(e) => setJobFormData({ ...jobFormData, client_id: e.target.value })}
                placeholder="Enter client ID"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={jobFormData.title}
                onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                placeholder="Enter job title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
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
                <Label htmlFor="status">Status</Label>
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
                <Label htmlFor="priority">Priority</Label>
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
                <Label htmlFor="assigned_to">Assigned To</Label>
                <Input
                  id="assigned_to"
                  value={jobFormData.assigned_to}
                  onChange={(e) => setJobFormData({ ...jobFormData, assigned_to: e.target.value })}
                  placeholder="Assignee name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="due_date">Due Date</Label>
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
              className="bg-brisk-primary hover:bg-brisk-primary-600"
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
          <h2 className="text-2xl font-bold text-blue-900">Time Tracking</h2>
          <p className="text-blue-900">Track time spent on jobs and tasks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadTimeEntries}>
            <Filter className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-brisk-primary hover:bg-brisk-primary-600" onClick={() => openTimeEntryDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Log Time
          </Button>
        </div>
      </div>

      {/* Time Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{timeStats.entriesCount}</div>
            <p className="text-xs text-gray-500">Time records</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{timeStats.totalHours.toFixed(1)}h</div>
            <p className="text-xs text-gray-500">All time logged</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Billable Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{timeStats.billableHours.toFixed(1)}h</div>
            <p className="text-xs text-gray-500">Client billable</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">£{timeStats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-500">Billable amount</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Filters & Search</CardTitle>
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
          <CardTitle className="text-blue-900">Time Entries ({timeEntries.length})</CardTitle>
          <CardDescription>Track time spent on jobs and tasks</CardDescription>
        </CardHeader>
        <CardContent>
          {timeEntries.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-blue-900 mb-4">No time entries found. Start logging time to track your work.</p>
              <Button className="bg-brisk-primary hover:bg-brisk-primary-600" onClick={() => openTimeEntryDialog()}>
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
                <div key={entry.id} className="p-4 border-2 border-blue-900 rounded-[2px] hover:bg-blue-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <Clock className="h-5 w-5 text-blue-900 mt-1" />
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
                          <p className="text-sm text-blue-900">Job ID: {entry.job_id}</p>
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
                            <span className="font-medium text-blue-900">{entry.hours}h</span>
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
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
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
            <DialogTitle className="text-blue-900">{editingTimeEntry ? 'Edit Time Entry' : 'Log Time'}</DialogTitle>
            <DialogDescription>
              {editingTimeEntry ? 'Update time entry details below' : 'Record time spent on a job or task'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="time_job_id">Job *</Label>
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
              <Label htmlFor="time_description">Description</Label>
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
                <Label htmlFor="time_hours">Hours *</Label>
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
                <Label htmlFor="time_date">Date *</Label>
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
                <Label htmlFor="time_hourly_rate">Hourly Rate (£)</Label>
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
                <Label htmlFor="time_billable">Billable</Label>
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
              className="bg-brisk-primary hover:bg-brisk-primary-600"
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
          <h2 className="text-2xl font-bold text-blue-900">Deadlines Management</h2>
          <p className="text-blue-900">Monitor and manage upcoming deadlines</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadDeadlines}>
            <Filter className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-brisk-primary hover:bg-brisk-primary-600" onClick={() => openDeadlineDialog()}>
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
            <CardTitle className="text-sm text-blue-900">Total Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{deadlineStats.total}</div>
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
            <CardTitle className="text-sm text-blue-900">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{deadlineStats.pending}</div>
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
            <CardTitle className="text-sm text-blue-900">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{deadlineStats.overdue}</div>
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
            <CardTitle className="text-sm text-blue-900">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{deadlineStats.dueThisWeek}</div>
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
            <CardTitle className="text-sm text-blue-900">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{deadlineStats.highPriority}</div>
            <p className="text-xs text-gray-500">Urgent items • Click to filter</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Filters & Search</CardTitle>
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
          <CardTitle className="text-blue-900">All Deadlines ({filteredDeadlines.length})</CardTitle>
          <CardDescription>Monitor and manage upcoming deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredDeadlines.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-blue-900 mb-4">No deadlines found. Add your first deadline to track compliance.</p>
              <Button className="bg-brisk-primary hover:bg-brisk-primary-600" onClick={() => openDeadlineDialog()}>
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
                      isOverdue ? 'border-red-600' : 'border-blue-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <AlertTriangle className={`h-5 w-5 mt-1 ${isOverdue ? 'text-red-600' : 'text-blue-900'}`} />
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
                            <p className="text-sm text-blue-900">Type: {deadline.deadline_type}</p>
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
                              daysRemaining <= 14 ? 'text-orange-600' : 
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
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
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
            <DialogTitle className="text-blue-900">{editingDeadline ? 'Edit Deadline' : 'Add Deadline'}</DialogTitle>
            <DialogDescription>
              {editingDeadline ? 'Update deadline details below' : 'Create a new compliance deadline'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="deadline_client_id">Client ID *</Label>
              <Input
                id="deadline_client_id"
                value={deadlineFormData.client_id}
                onChange={(e) => setDeadlineFormData({ ...deadlineFormData, client_id: e.target.value })}
                placeholder="e.g., CLIENT001"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline_title">Title *</Label>
              <Input
                id="deadline_title"
                value={deadlineFormData.title}
                onChange={(e) => setDeadlineFormData({ ...deadlineFormData, title: e.target.value })}
                placeholder="e.g., Q2 VAT Return Filing"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline_type">Deadline Type *</Label>
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
              <Label htmlFor="deadline_description">Description</Label>
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
                <Label htmlFor="deadline_due_date">Due Date *</Label>
                <Input
                  id="deadline_due_date"
                  type="date"
                  value={deadlineFormData.due_date}
                  onChange={(e) => setDeadlineFormData({ ...deadlineFormData, due_date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deadline_priority">Priority *</Label>
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
              <Label htmlFor="deadline_status">Status *</Label>
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
              className="bg-brisk-primary hover:bg-brisk-primary-600"
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
          <h2 className="text-2xl font-bold text-blue-900">Client Portal</h2>
          <p className="text-blue-900">Advanced client portal management and configuration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Portal Settings
          </Button>
          <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Client Access
          </Button>
        </div>
      </div>

      {/* Portal Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">0</div>
            <p className="text-xs text-gray-500">Portal access enabled</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Documents Shared</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">0</div>
            <p className="text-xs text-gray-500">Available to clients</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Pending Signatures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">0</div>
            <p className="text-xs text-gray-500">Awaiting e-signature</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Client Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">0</div>
            <p className="text-xs text-gray-500">Unread messages</p>
          </CardContent>
        </Card>
      </div>

      {/* Portal Tabs */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex gap-2 border-b border-blue-900 pb-2 w-full overflow-x-auto">
            <Button
              variant={activePortalTab === 'overview' ? 'default' : 'ghost'}
              onClick={() => setActivePortalTab('overview')}
              className={activePortalTab === 'overview' ? 'bg-brisk-primary' : 'text-blue-900'}
            >
              Overview
            </Button>
            <Button
              variant={activePortalTab === 'clients' ? 'default' : 'ghost'}
              onClick={() => setActivePortalTab('clients')}
              className={activePortalTab === 'clients' ? 'bg-brisk-primary' : 'text-blue-900'}
            >
              Client Access
            </Button>
            <Button
              variant={activePortalTab === 'documents' ? 'default' : 'ghost'}
              onClick={() => setActivePortalTab('documents')}
              className={activePortalTab === 'documents' ? 'bg-brisk-primary' : 'text-blue-900'}
            >
              Documents
            </Button>
            <Button
              variant={activePortalTab === 'branding' ? 'default' : 'ghost'}
              onClick={() => setActivePortalTab('branding')}
              className={activePortalTab === 'branding' ? 'bg-brisk-primary' : 'text-blue-900'}
            >
              Branding
            </Button>
            <Button
              variant={activePortalTab === 'security' ? 'default' : 'ghost'}
              onClick={() => setActivePortalTab('security')}
              className={activePortalTab === 'security' ? 'bg-brisk-primary' : 'text-blue-900'}
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
                    <CardTitle className="text-blue-900">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-blue-900">No recent portal activity</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-900">Portal Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-900">Portal Status</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-900">SSL Certificate</span>
                      <Badge className="bg-green-500">Valid</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-900">Two-Factor Auth</span>
                      <Badge className="bg-blue-500">Enabled</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-900">Auto Backups</span>
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
                <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Client
                </Button>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-blue-900 mb-4">No clients with portal access yet</p>
                    <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
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
                <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-blue-900 mb-4">No documents shared on portal</p>
                    <p className="text-sm text-gray-500 mb-4">Upload documents to share with clients securely</p>
                    <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
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
                  <CardTitle className="text-blue-900">Portal Appearance</CardTitle>
                  <CardDescription>Customize your client portal branding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Company Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-32 border-2 border-blue-900 rounded flex items-center justify-center bg-gray-50">
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
                  <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
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
                  <CardTitle className="text-blue-900">Security Settings</CardTitle>
                  <CardDescription>Configure portal security and access controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-blue-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Require 2FA for all client logins</p>
                    </div>
                    <Badge className="bg-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-blue-900">Session Timeout</p>
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
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-blue-900">IP Whitelist</p>
                      <p className="text-sm text-gray-500">Restrict access to specific IPs</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-blue-900">Password Policy</p>
                      <p className="text-sm text-gray-500">Minimum password requirements</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Policy</Button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-blue-900">Audit Logs</p>
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

  const renderWorkflowBuilder = () => {
    const preBuiltTemplates = [
      {
        id: 'template-1',
        name: 'Client Onboarding Workflow',
        description: 'Automated workflow for new client setup',
        trigger_type: 'event',
        trigger_event: 'client_created',
        actions: ['send_welcome_email', 'create_folder', 'assign_manager'],
        category: 'template',
        status: 'active',
        executions: 24
      },
      {
        id: 'template-2',
        name: 'Tax Return Reminder',
        description: 'Sends reminders for upcoming tax deadlines',
        trigger_type: 'scheduled',
        trigger_event: 'deadline_approaching',
        actions: ['send_email', 'create_task'],
        category: 'template',
        status: 'active',
        executions: 156
      },
      {
        id: 'template-3',
        name: 'Invoice Payment Follow-up',
        description: 'Automated follow-up for overdue invoices',
        trigger_type: 'scheduled',
        trigger_event: 'invoice_overdue',
        actions: ['send_reminder', 'notify_manager'],
        category: 'template',
        status: 'active',
        executions: 89
      },
      {
        id: 'template-4',
        name: 'Document Review Approval',
        description: 'Route documents for review and approval',
        trigger_type: 'event',
        trigger_event: 'document_uploaded',
        actions: ['assign_reviewer', 'send_notification'],
        category: 'template',
        status: 'active',
        executions: 45
      }
    ]

    const customWorkflows = workflows.filter(w => w.category === 'custom')
    const filteredWorkflows = customWorkflows.filter(w => 
      w.name.toLowerCase().includes(workflowSearchTerm.toLowerCase()) ||
      w.description?.toLowerCase().includes(workflowSearchTerm.toLowerCase())
    )

    const workflowStats = {
      total: workflows.length,
      active: workflows.filter(w => w.status === 'active').length,
      inactive: workflows.filter(w => w.status === 'inactive').length,
      executions: workflows.reduce((sum, w) => sum + (w.executions || 0), 0)
    }

    return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Workflow Builder</h2>
          <p className="text-blue-900">Design and configure automated workflows</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setActiveWorkflowTab('templates')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Browse Templates
          </Button>
          <Button 
            className="bg-brisk-primary hover:bg-brisk-primary-600"
            onClick={() => openWorkflowDialog()}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>

      {/* Workflow Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => {
            setActiveWorkflowTab('builder')
            setWorkflowSearchTerm('')
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Total Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{workflowStats.total}</div>
            <p className="text-xs text-gray-500">All workflows • Click to view</p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => {
            setActiveWorkflowTab('builder')
            setWorkflowSearchTerm('')
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{workflowStats.active}</div>
            <p className="text-xs text-gray-500">Currently running • Click to view</p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => {
            setActiveWorkflowTab('builder')
            setWorkflowSearchTerm('')
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Inactive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{workflowStats.inactive}</div>
            <p className="text-xs text-gray-500">Paused workflows • Click to view</p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => {
            setActiveWorkflowTab('analytics')
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Total Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{workflowStats.executions}</div>
            <p className="text-xs text-gray-500">All time • Click for analytics</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex gap-2 border-b border-blue-900 pb-2 w-full overflow-x-auto">
            <Button
              variant={activeWorkflowTab === 'builder' ? 'default' : 'ghost'}
              onClick={() => setActiveWorkflowTab('builder')}
              className={activeWorkflowTab === 'builder' ? 'bg-brisk-primary' : 'text-blue-900'}
            >
              Builder
            </Button>
            <Button
              variant={activeWorkflowTab === 'templates' ? 'default' : 'ghost'}
              onClick={() => setActiveWorkflowTab('templates')}
              className={activeWorkflowTab === 'templates' ? 'bg-brisk-primary' : 'text-blue-900'}
            >
              Templates
            </Button>
            <Button
              variant={activeWorkflowTab === 'analytics' ? 'default' : 'ghost'}
              onClick={() => setActiveWorkflowTab('analytics')}
              className={activeWorkflowTab === 'analytics' ? 'bg-brisk-primary' : 'text-blue-900'}
            >
              Analytics
            </Button>
          </div>
        </CardHeader>
        <CardContent className="w-full">
          {activeWorkflowTab === 'builder' && (
            <div className="space-y-4 w-full">
              <div className="flex justify-between items-center w-full">
                <Input 
                  placeholder="Search workflows..." 
                  className="max-w-sm"
                  value={workflowSearchTerm}
                  onChange={(e) => setWorkflowSearchTerm(e.target.value)}
                />
                <Badge variant="outline" className="text-blue-900">
                  {filteredWorkflows.length} Custom Workflows
                </Badge>
              </div>

              {filteredWorkflows.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <Workflow className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-blue-900 mb-4">No custom workflows yet</p>
                      <p className="text-sm text-gray-500 mb-4">Create your first workflow or start from a template</p>
                      <div className="flex gap-2 justify-center">
                        <Button 
                          className="bg-brisk-primary hover:bg-brisk-primary-600"
                          onClick={() => openWorkflowDialog()}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create Workflow
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setActiveWorkflowTab('templates')}
                        >
                          Browse Templates
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {filteredWorkflows.map((workflow) => (
                    <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-blue-900">{workflow.name}</CardTitle>
                            <CardDescription>{workflow.description}</CardDescription>
                          </div>
                          <Badge className={workflow.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                            {workflow.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Target className="h-4 w-4 text-blue-900" />
                            <span className="text-blue-900">Trigger: {workflow.trigger_type}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-blue-900" />
                            <span className="text-blue-900">Executions: {workflow.executions || 0}</span>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => openWorkflowDialog(workflow)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCloneWorkflow(workflow)}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Clone
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleToggleWorkflowStatus(workflow.id, workflow.status)}
                            >
                              {workflow.status === 'active' ? <Pause className="h-4 w-4 mr-1" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                              {workflow.status === 'active' ? 'Pause' : 'Activate'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteWorkflow(workflow.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeWorkflowTab === 'templates' && (
            <div className="space-y-4 w-full">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-lg font-semibold text-blue-900">Pre-built Workflow Templates</h3>
                <Badge variant="outline" className="text-blue-900">
                  {preBuiltTemplates.length} Templates Available
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {preBuiltTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-blue-900">{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                        <Badge className="bg-blue-500">Template</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="h-4 w-4 text-blue-900" />
                          <span className="text-blue-900">Trigger: {template.trigger_type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-blue-900" />
                          <span className="text-blue-900">Used {template.executions} times</span>
                        </div>
                        <div className="flex flex-wrap gap-1 pt-2">
                          <span className="text-xs text-gray-500">Actions:</span>
                          {template.actions.map((action, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {action.replace(/_/g, ' ')}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            className="bg-brisk-primary hover:bg-brisk-primary-600 flex-1"
                            onClick={() => handleCloneWorkflow(template)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Use Template
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openWorkflowDialog(template)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeWorkflowTab === 'analytics' && (
            <div className="space-y-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-900">Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">98.5%</div>
                    <p className="text-sm text-gray-500">Successful executions</p>
                    <Progress value={98.5} className="mt-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-900">Avg Execution Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-900">2.3s</div>
                    <p className="text-sm text-gray-500">Average duration</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-900">Time Saved</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">142hrs</div>
                    <p className="text-sm text-gray-500">This month</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Top Performing Workflows</CardTitle>
                  <CardDescription>Workflows with the highest execution count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...preBuiltTemplates].sort((a, b) => b.executions - a.executions).slice(0, 5).map((workflow, idx) => (
                      <div key={workflow.id} className="flex items-center justify-between p-3 border border-blue-900 rounded">
                        <div className="flex items-center gap-3">
                          <div className="text-lg font-bold text-blue-900">#{idx + 1}</div>
                          <div>
                            <p className="font-medium text-blue-900">{workflow.name}</p>
                            <p className="text-sm text-gray-500">{workflow.trigger_type} trigger</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-900">{workflow.executions}</p>
                          <p className="text-xs text-gray-500">executions</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Recent Activity</CardTitle>
                  <CardDescription>Latest workflow executions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workflows.length === 0 ? (
                      <p className="text-center text-gray-500 py-4">No workflow activity yet</p>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Workflow execution history will appear here</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Workflow Dialog */}
      <Dialog open={isWorkflowDialogOpen} onOpenChange={setIsWorkflowDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-blue-900">
              {editingWorkflow ? 'Edit Workflow' : 'Create New Workflow'}
            </DialogTitle>
            <DialogDescription>
              Configure your workflow triggers, conditions, and actions
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label className="text-blue-900">Workflow Name</Label>
              <Input
                value={workflowFormData.name}
                onChange={(e) => setWorkflowFormData({...workflowFormData, name: e.target.value})}
                placeholder="e.g., New Client Onboarding"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-blue-900">Description</Label>
              <Textarea
                value={workflowFormData.description}
                onChange={(e) => setWorkflowFormData({...workflowFormData, description: e.target.value})}
                placeholder="Describe what this workflow does..."
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-blue-900">Trigger Type</Label>
              <Select 
                value={workflowFormData.trigger_type}
                onValueChange={(value) => setWorkflowFormData({...workflowFormData, trigger_type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="event">Event-based</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="conditional">Conditional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {workflowFormData.trigger_type !== 'manual' && (
              <div className="grid gap-2">
                <Label className="text-blue-900">Trigger Event</Label>
                <Input
                  value={workflowFormData.trigger_event}
                  onChange={(e) => setWorkflowFormData({...workflowFormData, trigger_event: e.target.value})}
                  placeholder="e.g., client_created, deadline_approaching"
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label className="text-blue-900">Status</Label>
              <Select 
                value={workflowFormData.status}
                onValueChange={(value) => setWorkflowFormData({...workflowFormData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeWorkflowDialog}>
              Cancel
            </Button>
            <Button 
              className="bg-brisk-primary hover:bg-brisk-primary-600"
              onClick={handleSaveWorkflow}
              disabled={!workflowFormData.name}
            >
              {editingWorkflow ? 'Update Workflow' : 'Create Workflow'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    )
  }

  const renderWorkflowAutomation = () => {
    const filteredRules = automationRules.filter(rule => 
      rule.name.toLowerCase().includes(automationSearchTerm.toLowerCase()) ||
      rule.description?.toLowerCase().includes(automationSearchTerm.toLowerCase())
    )

    const automationStats = {
      total: automationRules.length,
      active: automationRules.filter(r => r.status === 'active').length,
      inactive: automationRules.filter(r => r.status === 'inactive').length,
      executions: automationRules.reduce((sum, r) => sum + (r.executions || 0), 0)
    }

    const triggerTypes = [
      { value: 'event', label: 'Event Trigger', icon: Zap },
      { value: 'schedule', label: 'Scheduled', icon: Clock },
      { value: 'manual', label: 'Manual', icon: Play }
    ]

    const actionTypes = [
      { value: 'send_email', label: 'Send Email', icon: Mail },
      { value: 'create_task', label: 'Create Task', icon: CheckSquare },
      { value: 'update_status', label: 'Update Status', icon: Activity },
      { value: 'send_notification', label: 'Send Notification', icon: Bell },
      { value: 'create_document', label: 'Create Document', icon: FileText },
      { value: 'assign_user', label: 'Assign User', icon: Users }
    ]

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">Workflow Automation</h2>
            <p className="text-blue-900">Configure automated workflow triggers and actions</p>
          </div>
          <div className="flex gap-2">
            <Button 
              className="bg-brisk-primary hover:bg-brisk-primary-600"
              onClick={() => openAutomationDialog()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Rule
            </Button>
            <Button 
              variant="outline"
              onClick={() => loadAutomationRules()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="flex border-b border-blue-900">
          {[
            { id: 'rules', label: 'Automation Rules', icon: Zap },
            { id: 'triggers', label: 'Trigger Types', icon: Target },
            { id: 'actions', label: 'Action Types', icon: Activity },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveAutomationTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeAutomationTab === tab.id
                  ? 'text-white bg-brisk-primary border-b-2 border-brisk-primary'
                  : 'text-blue-900 hover:bg-blue-50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeAutomationTab === 'rules' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setAutomationSearchTerm('')}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-blue-900">Total Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">{automationStats.total}</div>
                  <p className="text-xs text-gray-500">All automation rules</p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setAutomationSearchTerm('')}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-blue-900">Active Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{automationStats.active}</div>
                  <p className="text-xs text-gray-500">Currently running</p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setAutomationSearchTerm('')}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-blue-900">Inactive Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-600">{automationStats.inactive}</div>
                  <p className="text-xs text-gray-500">Paused or disabled</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-blue-900">Total Executions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">{automationStats.executions}</div>
                  <p className="text-xs text-gray-500">All time runs</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-blue-900">Automation Rules</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-900" />
                    <Input
                      placeholder="Search rules..."
                      value={automationSearchTerm}
                      onChange={(e) => setAutomationSearchTerm(e.target.value)}
                      className="pl-10 border-blue-900 text-blue-900"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredRules.length === 0 ? (
                  <div className="text-center py-8 text-blue-900">
                    <Zap className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No automation rules found</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {automationSearchTerm ? 'Try adjusting your search' : 'Create your first automation rule to get started'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredRules.map((rule) => (
                      <div
                        key={rule.id}
                        className="border border-blue-900 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-blue-900">{rule.name}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded ${
                                rule.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {rule.status}
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded ${
                                rule.priority === 'high' ? 'bg-red-100 text-red-800' :
                                rule.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {rule.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                            <div className="flex items-center gap-4 mt-3 text-sm text-blue-900">
                              <span className="flex items-center gap-1">
                                <Target className="h-4 w-4" />
                                {rule.trigger_type === 'event' ? 'Event' : rule.trigger_type === 'schedule' ? 'Scheduled' : 'Manual'}
                              </span>
                              {rule.trigger_event && (
                                <span className="flex items-center gap-1">
                                  <Activity className="h-4 w-4" />
                                  {rule.trigger_event}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <CheckSquare className="h-4 w-4" />
                                {rule.conditions?.length || 0} Conditions
                              </span>
                              <span className="flex items-center gap-1">
                                <Zap className="h-4 w-4" />
                                {rule.actions?.length || 0} Actions
                              </span>
                              <span className="flex items-center gap-1">
                                <Play className="h-4 w-4" />
                                {rule.executions || 0} Executions
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleAutomationStatus(rule.id, rule.status)}
                            >
                              {rule.status === 'active' ? (
                                <>
                                  <Pause className="h-4 w-4 mr-1" />
                                  Pause
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-1" />
                                  Activate
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openAutomationDialog(rule)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteAutomation(rule.id)}
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
        )}

        {activeAutomationTab === 'triggers' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Available Trigger Types</CardTitle>
                <CardDescription>Configure when automation rules should execute</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {triggerTypes.map((trigger) => (
                    <div key={trigger.value} className="border border-blue-900 rounded-lg p-4">
                      <trigger.icon className="h-8 w-8 text-brisk-primary mb-3" />
                      <h3 className="font-semibold text-blue-900 mb-2">{trigger.label}</h3>
                      <p className="text-sm text-gray-600">
                        {trigger.value === 'event' && 'Trigger on specific system events like client creation, job completion, or deadline approach'}
                        {trigger.value === 'schedule' && 'Run automation on a recurring schedule (daily, weekly, monthly)'}
                        {trigger.value === 'manual' && 'Execute automation manually when needed'}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeAutomationTab === 'actions' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Available Action Types</CardTitle>
                <CardDescription>Actions that can be performed by automation rules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {actionTypes.map((action) => (
                    <div key={action.value} className="border border-blue-900 rounded-lg p-4">
                      <action.icon className="h-8 w-8 text-brisk-primary mb-3" />
                      <h3 className="font-semibold text-blue-900 mb-2">{action.label}</h3>
                      <p className="text-sm text-gray-600">
                        {action.value === 'send_email' && 'Send automated email notifications to clients or team members'}
                        {action.value === 'create_task' && 'Automatically create tasks and assign to users'}
                        {action.value === 'update_status' && 'Update job or deadline status based on conditions'}
                        {action.value === 'send_notification' && 'Send in-app notifications to relevant users'}
                        {action.value === 'create_document' && 'Generate documents from templates'}
                        {action.value === 'assign_user' && 'Assign jobs or tasks to specific users'}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeAutomationTab === 'analytics' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Execution Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-900">Total Executions</span>
                      <span className="text-2xl font-bold text-blue-900">{automationStats.executions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-900">Active Rules</span>
                      <span className="text-2xl font-bold text-green-600">{automationStats.active}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-900">Average per Rule</span>
                      <span className="text-2xl font-bold text-blue-900">
                        {automationStats.total > 0 ? Math.round(automationStats.executions / automationStats.total) : 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Rule Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-blue-900">Active</span>
                        <span className="text-blue-900">{automationStats.active}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${automationStats.total > 0 ? (automationStats.active / automationStats.total) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-blue-900">Inactive</span>
                        <span className="text-blue-900">{automationStats.inactive}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gray-600 h-2 rounded-full" 
                          style={{ width: `${automationStats.total > 0 ? (automationStats.inactive / automationStats.total) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Top Performing Rules</CardTitle>
              </CardHeader>
              <CardContent>
                {automationRules.length === 0 ? (
                  <p className="text-center text-blue-900 py-8">No automation rules to display</p>
                ) : (
                  <div className="space-y-3">
                    {[...automationRules]
                      .sort((a, b) => (b.executions || 0) - (a.executions || 0))
                      .slice(0, 5)
                      .map((rule) => (
                        <div key={rule.id} className="flex justify-between items-center border-b border-blue-900 pb-2">
                          <div>
                            <p className="font-medium text-blue-900">{rule.name}</p>
                            <p className="text-sm text-gray-500">{rule.trigger_type}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-900">{rule.executions || 0}</p>
                            <p className="text-xs text-gray-500">executions</p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <Dialog open={isAutomationDialogOpen} onOpenChange={setIsAutomationDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-blue-900">
                {editingAutomation ? 'Edit Automation Rule' : 'Create Automation Rule'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-blue-900">Rule Name *</Label>
                  <Input
                    value={automationFormData.name}
                    onChange={(e) => setAutomationFormData({ ...automationFormData, name: e.target.value })}
                    placeholder="Enter rule name"
                    className="border-blue-900 text-blue-900"
                  />
                </div>
                <div>
                  <Label className="text-blue-900">Priority</Label>
                  <Select 
                    value={automationFormData.priority}
                    onValueChange={(value) => setAutomationFormData({ ...automationFormData, priority: value })}
                  >
                    <SelectTrigger className="border-blue-900 text-blue-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-blue-900">Description</Label>
                <Textarea
                  value={automationFormData.description}
                  onChange={(e) => setAutomationFormData({ ...automationFormData, description: e.target.value })}
                  placeholder="Describe what this rule does"
                  rows={3}
                  className="border-blue-900 text-blue-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-blue-900">Trigger Type *</Label>
                  <Select 
                    value={automationFormData.trigger_type}
                    onValueChange={(value) => setAutomationFormData({ ...automationFormData, trigger_type: value })}
                  >
                    <SelectTrigger className="border-blue-900 text-blue-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="event">Event Trigger</SelectItem>
                      <SelectItem value="schedule">Scheduled</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {automationFormData.trigger_type === 'event' && (
                  <div>
                    <Label className="text-blue-900">Trigger Event</Label>
                    <Input
                      value={automationFormData.trigger_event}
                      onChange={(e) => setAutomationFormData({ ...automationFormData, trigger_event: e.target.value })}
                      placeholder="e.g., client_created, job_completed"
                      className="border-blue-900 text-blue-900"
                    />
                  </div>
                )}
                {automationFormData.trigger_type === 'schedule' && (
                  <div>
                    <Label className="text-blue-900">Schedule</Label>
                    <Input
                      value={automationFormData.trigger_schedule}
                      onChange={(e) => setAutomationFormData({ ...automationFormData, trigger_schedule: e.target.value })}
                      placeholder="e.g., daily, weekly, monthly"
                      className="border-blue-900 text-blue-900"
                    />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-blue-900">Conditions</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addCondition}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Condition
                  </Button>
                </div>
                <div className="space-y-2">
                  {automationFormData.conditions.map((condition, index) => (
                    <div key={index} className="flex gap-2 items-start border border-blue-900 rounded p-2">
                      <Input
                        placeholder="Field"
                        value={condition.field || ''}
                        onChange={(e) => updateCondition(index, 'field', e.target.value)}
                        className="flex-1 border-blue-900 text-blue-900"
                      />
                      <Select
                        value={condition.operator || 'equals'}
                        onValueChange={(value) => updateCondition(index, 'operator', value)}
                      >
                        <SelectTrigger className="w-32 border-blue-900 text-blue-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="not_equals">Not Equals</SelectItem>
                          <SelectItem value="contains">Contains</SelectItem>
                          <SelectItem value="greater_than">Greater Than</SelectItem>
                          <SelectItem value="less_than">Less Than</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Value"
                        value={condition.value || ''}
                        onChange={(e) => updateCondition(index, 'value', e.target.value)}
                        className="flex-1 border-blue-900 text-blue-900"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeCondition(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-blue-900">Actions</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addAction}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Action
                  </Button>
                </div>
                <div className="space-y-2">
                  {automationFormData.actions.map((action, index) => (
                    <div key={index} className="flex gap-2 items-center border border-blue-900 rounded p-2">
                      <Select
                        value={action.type || 'send_email'}
                        onValueChange={(value) => updateAction(index, 'type', value)}
                      >
                        <SelectTrigger className="flex-1 border-blue-900 text-blue-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="send_email">Send Email</SelectItem>
                          <SelectItem value="create_task">Create Task</SelectItem>
                          <SelectItem value="update_status">Update Status</SelectItem>
                          <SelectItem value="send_notification">Send Notification</SelectItem>
                          <SelectItem value="create_document">Create Document</SelectItem>
                          <SelectItem value="assign_user">Assign User</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAction(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-blue-900">Status</Label>
                <Select 
                  value={automationFormData.status}
                  onValueChange={(value) => setAutomationFormData({ ...automationFormData, status: value })}
                >
                  <SelectTrigger className="border-blue-900 text-blue-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closeAutomationDialog}>
                Cancel
              </Button>
              <Button 
                className="bg-brisk-primary hover:bg-brisk-primary-600"
                onClick={handleSaveAutomation}
                disabled={!automationFormData.name}
              >
                {editingAutomation ? 'Update Rule' : 'Create Rule'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  const renderCapacityPlanning = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Capacity Planning</h2>
          <p className="text-blue-900">Advanced capacity planning and resource allocation</p>
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
          <p className="text-blue-900">Automated compliance monitoring and management</p>
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
          <p className="text-blue-900">Analyze practice performance and efficiency</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => alert('Generating report...')}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" onClick={() => alert('Exporting report...')}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" onClick={() => alert('Schedule report dialog...')}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
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
                          <h4 className="font-semibold text-blue-900 mb-3">Revenue by Service</h4>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: Advisory Services - £345,120\n\nBreakdown:\n• Tax Advisory: £145,000\n• Business Strategy: £98,500\n• Financial Planning: £101,620')}>
                              <span>Advisory Services</span>
                              <span className="font-semibold">£345,120</span>
                            </div>
                            <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: Compliance - £234,560\n\nBreakdown:\n• Annual Accounts: £124,300\n• Tax Returns: £78,900\n• Statutory Filing: £31,360')}>
                              <span>Compliance</span>
                              <span className="font-semibold">£234,560</span>
                            </div>
                            <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: Project Work - £167,890\n\nBreakdown:\n• M&A Support: £89,400\n• Due Diligence: £45,200\n• Special Projects: £33,290')}>
                              <span>Project Work</span>
                              <span className="font-semibold">£167,890</span>
                            </div>
                            <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: Retainer Fees - £99,660\n\nBreakdown:\n• Monthly Retainers: £67,800\n• Quarterly Reviews: £21,400\n• On-Call Support: £10,460')}>
                              <span>Retainer Fees</span>
                              <span className="font-semibold">£99,660</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-[2px]">
                          <h4 className="font-semibold text-blue-900 mb-3">Monthly Trends</h4>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: January Revenue - £78,450\n\nBreakdown:\n• Week 1: £18,200\n• Week 2: £19,800\n• Week 3: £21,150\n• Week 4: £19,300')}>
                              <span>January</span>
                              <span className="font-semibold">£78,450</span>
                            </div>
                            <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: February Revenue - £82,340\n\nBreakdown:\n• Week 1: £20,100\n• Week 2: £21,450\n• Week 3: £19,890\n• Week 4: £20,900')}>
                              <span>February</span>
                              <span className="font-semibold">£82,340</span>
                            </div>
                            <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: March Revenue - £89,120\n\nBreakdown:\n• Week 1: £22,800\n• Week 2: £23,150\n• Week 3: £21,670\n• Week 4: £21,500')}>
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
                        <h4 className="font-semibold text-blue-900 mb-3">Satisfaction Breakdown</h4>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: Service Quality - 4.9/5\n\nClient Feedback:\n• Technical Expertise: 5.0/5\n• Professionalism: 4.9/5\n• Accuracy: 4.8/5\n• Communication: 4.9/5')}>
                            <span>Service Quality</span>
                            <span className="font-semibold">4.9/5</span>
                          </div>
                          <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: Response Time - 4.7/5\n\nMetrics:\n• Email Response: 4.8/5 (avg 2.1 hours)\n• Phone Response: 4.9/5 (avg 15 mins)\n• Query Resolution: 4.5/5 (avg 1.2 days)')}>
                            <span>Response Time</span>
                            <span className="font-semibold">4.7/5</span>
                          </div>
                          <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: Value for Money - 4.6/5\n\nClient Perception:\n• Pricing Transparency: 4.7/5\n• Service vs Cost: 4.6/5\n• Additional Value: 4.5/5')}>
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
                        <h4 className="font-semibold text-blue-900 mb-3">Utilization by Role</h4>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: Senior Partners - 92.1%\n\n5 Staff Members:\n• Billable Hours: 1,840h (92.1%)\n• Non-billable: 158h\n• Chargeable Rate: £285/hr\n• Total Revenue: £524,400')}>
                            <span>Senior Partners</span>
                            <span className="font-semibold">92.1%</span>
                          </div>
                          <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: Managers - 89.4%\n\n8 Staff Members:\n• Billable Hours: 2,863h (89.4%)\n• Non-billable: 339h\n• Chargeable Rate: £175/hr\n• Total Revenue: £501,025')}>
                            <span>Managers</span>
                            <span className="font-semibold">89.4%</span>
                          </div>
                          <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: Associates - 84.7%\n\n15 Staff Members:\n• Billable Hours: 4,578h (84.7%)\n• Non-billable: 827h\n• Chargeable Rate: £95/hr\n• Total Revenue: £434,910')}>
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
                        <h4 className="font-semibold text-blue-900 mb-3">Completion by Type</h4>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: Tax Projects - 96.8%\n\nCompletion Details:\n• On Time: 89 projects (94.7%)\n• Early: 2 projects (2.1%)\n• Late: 3 projects (3.2%)\n• Avg Days to Complete: 8.3')}>
                            <span>Tax Projects</span>
                            <span className="font-semibold">96.8%</span>
                          </div>
                          <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: Advisory Projects - 93.2%\n\nCompletion Details:\n• On Time: 43 projects (87.8%)\n• Early: 3 projects (6.1%)\n• Late: 3 projects (6.1%)\n• Avg Days to Complete: 14.7')}>
                            <span>Advisory Projects</span>
                            <span className="font-semibold">93.2%</span>
                          </div>
                          <div className="flex justify-between p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors" onClick={() => alert('Drill down: Compliance Projects - 91.7%\n\nCompletion Details:\n• On Time: 55 projects (91.7%)\n• Early: 0 projects (0%)\n• Late: 5 projects (8.3%)\n• Avg Days to Complete: 12.1')}>
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
              <div className="bg-white p-6 rounded-[2px] shadow-sm border-2 border-blue-900">
                <h4 className="text-lg font-semibold mb-4 text-blue-900">Revenue Trends</h4>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <span className="text-blue-900">Revenue Chart Placeholder</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-[2px] shadow-sm border-2 border-blue-900">
                <h4 className="text-lg font-semibold mb-4 text-blue-900">Client Growth</h4>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <span className="text-blue-900">Client Growth Chart Placeholder</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2px] shadow-sm border-2 border-blue-900">
              <h4 className="text-lg font-semibold mb-4 text-blue-900">Key Performance Indicators</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className="text-center p-4 bg-blue-50 rounded-[2px] border-2 border-blue-900 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => alert('Average Project Value - £2,847\n\nDetailed Breakdown:\n\n• Small Projects (<£1,000): £685 avg\n  127 projects, £87,045 total\n\n• Medium Projects (£1,000-£5,000): £2,340 avg\n  89 projects, £208,260 total\n\n• Large Projects (>£5,000): £8,950 avg\n  34 projects, £304,300 total\n\n• Year-over-year: +8.3%\n• Quarterly trend: Increasing\n• Top service type: Advisory (£3,840 avg)')}
                >
                  <div className="text-2xl font-bold text-blue-600">£2,847</div>
                  <div className="text-sm text-blue-900">Average Project Value</div>
                </div>
                <div 
                  className="text-center p-4 bg-blue-50 rounded-[2px] border-2 border-blue-900 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => alert('Days Average Completion - 12.3 days\n\nDetailed Breakdown:\n\n• Fast Track (<7 days): 5.2 days\n  78 projects (31%)\n\n• Standard (7-14 days): 10.8 days\n  124 projects (50%)\n\n• Extended (>14 days): 21.4 days\n  48 projects (19%)\n\n• Year-over-year: -2.1 days (improved)\n• On-time completion: 92.8%\n• Client satisfaction impact: +0.3 rating')}
                >
                  <div className="text-2xl font-bold text-blue-600">12.3</div>
                  <div className="text-sm text-blue-900">Days Average Completion</div>
                </div>
                <div 
                  className="text-center p-4 bg-green-50 rounded-[2px] border-2 border-blue-900 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => alert('Client Retention Rate - 98.7%\n\nDetailed Analysis:\n\n• Active Clients: 287\n• Clients Retained: 283\n• New Clients This Year: 47\n• Clients Lost: 4\n\n• Retention by Segment:\n  - Premium: 99.2% (121/122)\n  - Standard: 98.5% (132/134)\n  - Basic: 97.4% (30/31)\n\n• Average client tenure: 4.7 years\n• Lifetime value per client: £34,200')}
                >
                  <div className="text-2xl font-bold text-green-600">98.7%</div>
                  <div className="text-sm text-blue-900">Client Retention Rate</div>
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
          <p className="text-blue-900">Get intelligent insights for practice optimization</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={handleGenerateFullReport}
            disabled={isAILoading}
          >
            <Award className="h-4 w-4 mr-2" />
            Generate Full Report
          </Button>
        </div>
      </div>

      {showConversationHistory && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-blue-900">Conversation History</CardTitle>
              <Button variant="ghost" onClick={handleViewHistory}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {aiConversations.length === 0 ? (
              <p className="text-blue-900 text-center py-8">No conversation history yet</p>
            ) : (
              <div className="space-y-3">
                {aiConversations.map((conv) => (
                  <div 
                    key={conv.id}
                    className="p-4 border-2 border-blue-900 rounded-[2px] cursor-pointer hover:bg-blue-50 transition-colors"
                    onClick={() => handleSelectConversation(conv)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-900">{conv.title}</h4>
                        <p className="text-sm text-blue-700">
                          {new Date(conv.created_at).toLocaleString()} • {conv.messages.length} messages
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteConversation(conv.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Ask your Practice Manager</CardTitle>
          <CardDescription>Get intelligent insights for practice optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-blue-900">
                {currentConversation ? `Conversation: ${currentConversation.title}` : 'New Conversation'}
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleNewConversation}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  New Conversation
                </button>
                <button 
                  onClick={handleViewHistory}
                  className="px-4 py-2 bg-gray-200 text-blue-900 rounded hover:bg-gray-300"
                >
                  View History ({aiConversations.length})
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[2px] shadow-sm border-2 border-blue-900 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">AI</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Practice Management AI Adviser</h4>
                  <p className="text-sm text-blue-900">Specialized in practice operations, client management, and business strategy</p>
                </div>
              </div>

              {currentConversation && currentConversation.messages.length > 0 && (
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {currentConversation.messages.map((msg: any) => (
                    <div key={msg.id} className="space-y-3">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-900 text-sm">You</span>
                        </div>
                        <div className="flex-1 bg-gray-100 p-3 rounded-[2px]">
                          <p className="text-blue-900">{msg.question}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">AI</span>
                        </div>
                        <div className="flex-1 bg-blue-50 p-3 rounded-[2px]">
                          <p className="text-blue-900 whitespace-pre-line">{msg.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!currentConversation && (
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
              )}

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-900 text-sm">You</span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      className="w-full p-3 border-2 border-blue-900 rounded-[2px] resize-none text-blue-900"
                      rows={3}
                      placeholder="Ask me anything about practice management, client relationships, workflow optimization, or business strategy..."
                      disabled={isAILoading}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    <button 
                      onClick={() => handleQuickPrompt('How can I optimize my workflow automation?')}
                      className="px-3 py-1 text-sm bg-gray-100 text-blue-900 rounded hover:bg-gray-200"
                      disabled={isAILoading}
                    >
                      Workflow Analysis
                    </button>
                    <button 
                      onClick={() => handleQuickPrompt('What client retention strategies should I implement?')}
                      className="px-3 py-1 text-sm bg-gray-100 text-blue-900 rounded hover:bg-gray-200"
                      disabled={isAILoading}
                    >
                      Client Strategy
                    </button>
                    <button 
                      onClick={() => handleQuickPrompt('Review my practice performance metrics')}
                      className="px-3 py-1 text-sm bg-gray-100 text-blue-900 rounded hover:bg-gray-200"
                      disabled={isAILoading}
                    >
                      Performance Review
                    </button>
                    <button 
                      onClick={() => handleQuickPrompt('Analyze my billing and invoicing efficiency')}
                      className="px-3 py-1 text-sm bg-gray-100 text-blue-900 rounded hover:bg-gray-200"
                      disabled={isAILoading}
                    >
                      Billing Analysis
                    </button>
                    <button 
                      onClick={() => handleQuickPrompt('Review my deadline management approach')}
                      className="px-3 py-1 text-sm bg-gray-100 text-blue-900 rounded hover:bg-gray-200"
                      disabled={isAILoading}
                    >
                      Deadline Review
                    </button>
                  </div>
                  <button 
                    onClick={() => handleAIQuestion(aiQuestion)}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isAILoading || !aiQuestion.trim()}
                  >
                    {isAILoading ? 'Analyzing...' : 'Send'}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                className="bg-white p-6 rounded-[2px] shadow-sm border-2 border-blue-900 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => alert('Client Analysis Deep Dive\n\n• Total Active Clients: 287\n• Client Retention Rate: 98.7%\n• Average Client Tenure: 4.7 years\n• Client Satisfaction Score: 4.8/5.0\n\nTop Performing Segments:\n• Premium Tier: 122 clients (£4.2M revenue)\n• Standard Tier: 134 clients (£2.8M revenue)\n• Basic Tier: 31 clients (£420K revenue)\n\nAt-Risk Clients (3):\n1. ABC Corp - 45 days overdue\n2. XYZ Ltd - Low engagement score\n3. DEF Inc - Service complaints\n\nRecommendations:\n• Implement quarterly business reviews for premium clients\n• Create automated check-in workflows\n• Develop targeted retention campaigns')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h4 className="text-lg font-semibold text-blue-900">Client Insights</h4>
                </div>
                <p className="text-sm text-blue-700 mb-4">Comprehensive client relationship analysis and retention strategies</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Total Clients</span>
                    <span className="text-xs font-bold text-blue-900">287</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Retention Rate</span>
                    <span className="text-xs font-bold text-green-600">98.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">At Risk</span>
                    <span className="text-xs font-bold text-red-600">3</span>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white p-6 rounded-[2px] shadow-sm border-2 border-blue-900 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => alert('Workflow Optimization Analysis\n\n• Current Efficiency Score: 77%\n• Automation Potential: 23% improvement\n• Process Bottlenecks: 5 identified\n• Time Savings Opportunity: 127 hours/month\n\nKey Findings:\n\n1. Client Onboarding (32% time savings)\n   - Automate document collection\n   - Implement e-signature workflows\n   - Create standardized checklists\n\n2. Job Assignment (18% improvement)\n   - AI-powered workload balancing\n   - Skill-based auto-assignment\n   - Real-time capacity monitoring\n\n3. Communication (15% efficiency gain)\n   - Template library expansion\n   - Automated status updates\n   - Client portal adoption\n\nEstimated ROI: £45,600/year')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="h-6 w-6 text-blue-600" />
                  <h4 className="text-lg font-semibold text-blue-900">Workflow Insights</h4>
                </div>
                <p className="text-sm text-blue-700 mb-4">Process optimization and automation opportunities</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Efficiency Score</span>
                    <span className="text-xs font-bold text-blue-900">77%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Time Savings</span>
                    <span className="text-xs font-bold text-green-600">127 hrs/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Bottlenecks</span>
                    <span className="text-xs font-bold text-orange-600">5</span>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white p-6 rounded-[2px] shadow-sm border-2 border-blue-900 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => alert('Billing & Invoicing Performance\n\n• Total Revenue (YTD): £847,230\n• Outstanding Invoices: £45,320 (5.3%)\n• Average Payment Time: 14.2 days\n• Collection Rate: 96.5%\n\nRevenue Breakdown:\n• Recurring Services: £612,450 (72%)\n• Project Work: £189,780 (22%)\n• Additional Services: £45,000 (5%)\n\nAging Analysis:\n• Current (0-30 days): £38,240\n• 31-60 days: £5,680\n• 61-90 days: £980\n• 90+ days: £420\n\nRecommendations:\n• Implement automated payment reminders\n• Offer early payment discounts (2% net 10)\n• Review pricing for underperforming services\n• Convert more clients to direct debit')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                  <h4 className="text-lg font-semibold text-blue-900">Billing Insights</h4>
                </div>
                <p className="text-sm text-blue-700 mb-4">Revenue performance and invoicing efficiency</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Total Revenue</span>
                    <span className="text-xs font-bold text-blue-900">£847,230</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Outstanding</span>
                    <span className="text-xs font-bold text-orange-600">£45,320</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Collection Rate</span>
                    <span className="text-xs font-bold text-green-600">96.5%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="bg-white p-6 rounded-[2px] shadow-sm border-2 border-blue-900 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => alert('Deadline Management Analysis\n\n• Total Active Deadlines: 24\n• Overdue Items: 2 (8.3%)\n• Completion Rate: 94.2%\n• Average Lead Time: 8.7 days\n\nDeadline Distribution:\n• Tax Returns: 12 deadlines\n• Companies House: 7 deadlines\n• Compliance: 3 deadlines\n• Internal: 2 deadlines\n\nCritical Items:\n1. VAT Return - ABC Corp (Due: Tomorrow)\n2. Annual Accounts - XYZ Ltd (2 days overdue)\n3. Corporation Tax - DEF Inc (Due: 3 days)\n\nRecommendations:\n• Set earlier internal deadlines (5-7 day buffer)\n• Implement automated client reminders\n• Create escalation protocols for at-risk deadlines\n• Use workflow automation for routine filings')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <h4 className="text-lg font-semibold text-blue-900">Deadline Insights</h4>
                </div>
                <p className="text-sm text-blue-700 mb-4">Deadline tracking and compliance management</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Active Deadlines</span>
                    <span className="text-xs font-bold text-blue-900">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Overdue</span>
                    <span className="text-xs font-bold text-red-600">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Completion Rate</span>
                    <span className="text-xs font-bold text-green-600">94.2%</span>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white p-6 rounded-[2px] shadow-sm border-2 border-blue-900 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => alert('Team Performance Matrix\n\n• Overall Utilization: 87.3%\n• Total Billable Hours: 8,281\n• Average Project Time: 12.3 days\n• Team Efficiency Score: 8.4/10\n\nTeam Breakdown:\n• Senior Staff: 92% utilization (3 members)\n• Mid-level: 88% utilization (5 members)\n• Junior Staff: 79% utilization (4 members)\n\nTop Performers:\n1. Sarah Johnson - 94% util, 4.9 client rating\n2. Mike Chen - 91% util, 4.8 client rating\n3. Emma Davis - 89% util, 4.7 client rating\n\nDevelopment Areas:\n• Redistribute workload for junior staff\n• Implement mentorship programs\n• Cross-training for skill diversification\n• Consider hiring mid-level accountant')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <h4 className="text-lg font-semibold text-blue-900">Performance Insights</h4>
                </div>
                <p className="text-sm text-blue-700 mb-4">Team productivity and utilization metrics</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Utilization</span>
                    <span className="text-xs font-bold text-blue-900">87.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Billable Hours</span>
                    <span className="text-xs font-bold text-green-600">8,281</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-blue-900">Efficiency Score</span>
                    <span className="text-xs font-bold text-blue-900">8.4/10</span>
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
          <p className="text-blue-900">Advanced email management and automation</p>
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
          <p className="text-blue-900">Streamline payroll processing with branded templates</p>
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
          <p className="text-blue-900">Streamline invoice creation with branded templates</p>
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
          <p className="text-blue-900">Monitor template performance and usage patterns</p>
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
                <p className="text-xs text-blue-900">+3 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-900">Templates Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-blue-900">+12 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-900">Time Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42h</div>
                <p className="text-xs text-blue-900">This month</p>
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
          <p className="text-blue-900">Generate comprehensive practice management reports</p>
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
              <h3 className="text-2xl font-bold text-blue-900">Practice Reports</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Generate Report
                </button>
                <button className="px-4 py-2 bg-gray-200 text-blue-900 rounded hover:bg-gray-300">
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
                    <p className="text-sm text-blue-900">Revenue, profitability, and financial performance</p>
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
                  <div className="w-10 h-10 bg-blue-100 rounded-[2px] flex items-center justify-center">
                    <span className="text-blue-600">👥</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Client Reports</h4>
                    <p className="text-sm text-blue-900">Client analysis and relationship metrics</p>
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
                    <p className="text-sm text-blue-900">Team productivity and efficiency metrics</p>
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
                    <p className="text-sm text-blue-900">Regulatory and compliance tracking</p>
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
                    <p className="text-sm text-blue-900">Strategic insights and analytics</p>
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
                    <p className="text-sm text-blue-900">Build your own reports and dashboards</p>
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

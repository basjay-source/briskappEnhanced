import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  CheckSquare, Search, Plus, Clock, User, AlertTriangle,
  CheckCircle, Eye, Edit, MessageSquare
} from 'lucide-react'
import { practiceManagementApi, PMTask } from '../../services/api'

const TaskingChecklists: React.FC = () => {
  const [tasks, setTasks] = useState<PMTask[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await practiceManagementApi.getTasks()
        setTasks(data)
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
        setTasks([
          { id: 1, name: 'Review trial balance', job_name: 'Year-end Accounts - ABC Ltd', status: 'in_progress', priority: 'high', estimated_hours: 4, actual_hours: 2, due_date: '2024-01-25', assignee: 'John Smith', approval_required: true, created_at: '2024-01-15T10:30:00Z' },
          { id: 2, name: 'Prepare VAT return', job_name: 'VAT Return - DEF Ltd', status: 'pending', priority: 'urgent', estimated_hours: 2, actual_hours: 0, due_date: '2024-01-22', assignee: 'Sarah Johnson', approval_required: false, created_at: '2024-01-10T14:20:00Z' },
          { id: 3, name: 'Client document review', job_name: 'Monthly Bookkeeping - XYZ', status: 'waiting_approval', priority: 'medium', estimated_hours: 1, actual_hours: 1, due_date: '2024-01-30', assignee: 'Mike Wilson', approval_required: true, created_at: '2024-01-05T09:15:00Z' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.job_name && task.job_name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Pending</Badge>
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>
      case 'waiting_approval':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Waiting Approval</Badge>
      case 'complete':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Complete</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>
      case 'high':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">High</Badge>
      case 'urgent':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Urgent</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Tasking & Checklists</h1>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasking & Checklists</h1>
          <p className="text-gray-600 mt-1">Break down jobs into tasks, manage checklists and track approvals</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <CheckSquare className="h-4 w-4 mr-2" />
            Templates
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {tasks.filter(t => t.status === 'in_progress' || t.status === 'pending').length}
            </div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Approval</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {tasks.filter(t => t.status === 'waiting_approval').length}
            </div>
            <p className="text-xs text-yellow-600 flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Requires review
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'complete').length / tasks.length) * 100) : 0}%
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              This week
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Task Time</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">2.3h</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              Average completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Tasks</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="waiting_approval">Waiting Approval</option>
                <option value="complete">Complete</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{task.name}</h3>
                    {getStatusBadge(task.status)}
                    {getPriorityBadge(task.priority)}
                    {task.approval_required && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        Approval Required
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {task.job_name}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {task.assignee}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {task.actual_hours}h / {task.estimated_hours}h
                    </span>
                    {task.due_date && (
                      <span className="flex items-center">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  {task.status === 'waiting_approval' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-4">Create your first task to get started</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Checklists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Standard Checklists</CardTitle>
            <CardDescription>Regulatory and service-specific checklists</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Year-end Accounts Checklist</h4>
                  <p className="text-sm text-gray-600">47 items • Companies Act compliance</p>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">VAT Return Checklist</h4>
                  <p className="text-sm text-gray-600">12 items • HMRC requirements</p>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Payroll Setup Checklist</h4>
                  <p className="text-sm text-gray-600">23 items • RTI compliance</p>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Comments</CardTitle>
            <CardDescription>Latest task discussions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">JS</span>
                </div>
                <div>
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-sm text-gray-600">Trial balance reviewed - minor adjustments needed</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-medium text-sm">SJ</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">VAT return ready for final review</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-medium text-sm">MW</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Mike Wilson</p>
                  <p className="text-sm text-gray-600">Client documents uploaded to portal</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TaskingChecklists

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Briefcase, Search, Plus, Calendar, Clock, DollarSign,
  User, AlertTriangle, CheckCircle, Eye, Edit, Play
} from 'lucide-react'
import { practiceManagementApi, PMJob } from '../../services/api'

const JobsWorkflows: React.FC = () => {
  const [jobs, setJobs] = useState<PMJob[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'gantt'>('kanban')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await practiceManagementApi.getJobs()
        setJobs(data)
      } catch (error) {
        console.error('Failed to fetch jobs:', error)
        setJobs([
          { id: 1, job_number: 'JOB-2024-001', name: 'Year-end Accounts - ABC Ltd', client_name: 'ABC Manufacturing Ltd', status: 'in_progress', priority: 'high', budget_hours: 40, actual_hours: 32, budget_amount: 6000, actual_amount: 4800, due_date: '2024-02-15', assignee: 'John Smith', created_at: '2024-01-15T10:30:00Z' },
          { id: 2, job_number: 'JOB-2024-002', name: 'Monthly Bookkeeping - XYZ', client_name: 'XYZ Services Ltd', status: 'planned', priority: 'medium', budget_hours: 8, actual_hours: 0, budget_amount: 800, actual_amount: 0, due_date: '2024-01-31', assignee: 'Sarah Johnson', created_at: '2024-01-10T14:20:00Z' },
          { id: 3, job_number: 'JOB-2024-003', name: 'VAT Return - DEF Ltd', client_name: 'DEF Consulting', status: 'review', priority: 'urgent', budget_hours: 4, actual_hours: 4, budget_amount: 600, actual_amount: 600, due_date: '2024-01-25', assignee: 'Mike Wilson', created_at: '2024-01-05T09:15:00Z' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.job_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.client_name && job.client_name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planned':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Planned</Badge>
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>
      case 'waiting_client':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Waiting Client</Badge>
      case 'review':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Review</Badge>
      case 'complete':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Complete</Badge>
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>
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

  const getProgressPercentage = (job: PMJob) => {
    if (job.budget_hours === 0) return 0
    return Math.min((job.actual_hours / job.budget_hours) * 100, 100)
  }

  const jobsByStatus = {
    planned: filteredJobs.filter(job => job.status === 'planned'),
    in_progress: filteredJobs.filter(job => job.status === 'in_progress'),
    waiting_client: filteredJobs.filter(job => job.status === 'waiting_client'),
    review: filteredJobs.filter(job => job.status === 'review'),
    complete: filteredJobs.filter(job => job.status === 'complete')
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Jobs & Workflows</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Jobs & Workflows</h1>
          <p className="text-gray-600 mt-1">Manage jobs, track progress and monitor workflows</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Gantt View
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Job
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {jobs.filter(j => j.status === 'in_progress' || j.status === 'planned').length}
            </div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overdue Jobs</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Budget Utilization</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">78%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              Average across jobs
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">92%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              On-time delivery
            </p>
          </CardContent>
        </Card>
      </div>

      {/* View Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CardTitle className="text-lg font-semibold">Jobs</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'kanban' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('kanban')}
                >
                  Kanban
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
                <Button
                  variant={viewMode === 'gantt' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('gantt')}
                >
                  Gantt
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search jobs..."
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
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="waiting_client">Waiting Client</option>
                <option value="review">Review</option>
                <option value="complete">Complete</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'kanban' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {Object.entries(jobsByStatus).map(([status, statusJobs]) => (
                <div key={status} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 capitalize">
                      {status.replace('_', ' ')}
                    </h3>
                    <Badge variant="outline">{statusJobs.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {statusJobs.map((job) => (
                      <Card key={job.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-sm">{job.name}</h4>
                              <p className="text-xs text-gray-600">{job.job_number}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              {getPriorityBadge(job.priority)}
                              <span className="text-xs text-gray-500">
                                {job.assignee}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span>Progress</span>
                                <span>{Math.round(getProgressPercentage(job))}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${getProgressPercentage(job)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{job.actual_hours}h / {job.budget_hours}h</span>
                              {job.due_date && (
                                <span>{new Date(job.due_date).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{job.name}</h3>
                      {getStatusBadge(job.status)}
                      {getPriorityBadge(job.priority)}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {job.job_number} • {job.client_name}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {job.assignee}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.actual_hours}h / {job.budget_hours}h
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        £{job.actual_amount?.toLocaleString()} / £{job.budget_amount?.toLocaleString()}
                      </span>
                      {job.due_date && (
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Due: {new Date(job.due_date).toLocaleDateString()}
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
                    {job.status === 'planned' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'gantt' && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Gantt Chart View</h3>
              <p className="text-gray-600 mb-4">Interactive timeline view of jobs and dependencies</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Load Gantt Chart
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default JobsWorkflows

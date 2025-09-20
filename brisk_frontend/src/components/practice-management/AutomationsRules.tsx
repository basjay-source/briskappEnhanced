import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Zap, Search, Plus, Play, Pause, Eye, Edit, Settings,
  Clock, TrendingUp, CheckCircle, AlertTriangle
} from 'lucide-react'
import { practiceManagementApi, AutomationRule } from '../../services/api'

const AutomationsRules: React.FC = () => {
  const [automations, setAutomations] = useState<AutomationRule[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    const fetchAutomations = async () => {
      try {
        const data = await practiceManagementApi.getAutomationRules()
        setAutomations(data)
      } catch (error) {
        console.error('Failed to fetch automation rules:', error)
        setAutomations([
          { id: 1, name: 'Client Onboarding Workflow', description: 'Automatically create tasks and send welcome emails when new client is added', trigger_event: 'client.created', is_active: true, execution_count: 45, last_executed: '2024-01-20T10:30:00Z', created_at: '2024-01-15T10:30:00Z' },
          { id: 2, name: 'Deadline Reminder System', description: 'Send email reminders 14, 7, and 1 days before filing deadlines', trigger_event: 'deadline.approaching', is_active: true, execution_count: 128, last_executed: '2024-01-21T09:15:00Z', created_at: '2024-01-10T14:20:00Z' },
          { id: 3, name: 'Invoice Overdue Notifications', description: 'Automatically send payment reminders for overdue invoices', trigger_event: 'invoice.overdue', is_active: false, execution_count: 23, last_executed: '2024-01-18T14:45:00Z', created_at: '2024-01-05T09:15:00Z' },
          { id: 4, name: 'Job Completion Workflow', description: 'Create billing milestone and notify client when job is marked complete', trigger_event: 'job.completed', is_active: true, execution_count: 67, last_executed: '2024-01-21T16:20:00Z', created_at: '2024-01-01T16:30:00Z' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchAutomations()
  }, [])

  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && automation.is_active) ||
                         (statusFilter === 'inactive' && !automation.is_active)
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        <Play className="h-3 w-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
        <Pause className="h-3 w-3 mr-1" />
        Inactive
      </Badge>
    )
  }

  const getTriggerBadge = (trigger: string) => {
    const colors = {
      'client.created': 'bg-blue-50 text-blue-700 border-blue-200',
      'deadline.approaching': 'bg-orange-50 text-orange-700 border-orange-200',
      'invoice.overdue': 'bg-red-50 text-red-700 border-red-200',
      'job.completed': 'bg-green-50 text-green-700 border-green-200'
    }
    return (
      <Badge variant="outline" className={colors[trigger as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200'}>
        {trigger.replace('.', ' ')}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Automations & Rules</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Automations & Rules</h1>
          <p className="text-gray-600 mt-1">Create and manage automated workflows and business rules</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Templates
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Automation
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Rules</CardTitle>
            <Zap className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {automations.filter(a => a.is_active).length}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Executions</CardTitle>
            <Play className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {automations.reduce((sum, a) => sum + a.execution_count, 0).toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              All time
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">98.5%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">47h</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Automation Rules</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search automations..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAutomations.map((automation) => (
              <div key={automation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{automation.name}</h3>
                    {getStatusBadge(automation.is_active)}
                    {getTriggerBadge(automation.trigger_event)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {automation.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Play className="h-4 w-4 mr-1" />
                      {automation.execution_count} executions
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Last run: {automation.last_executed ? new Date(automation.last_executed).toLocaleDateString() : 'Never'}
                    </span>
                    <span className="flex items-center">
                      Created: {new Date(automation.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={automation.is_active ? 'border-red-300 text-red-700 hover:bg-red-100' : 'border-green-300 text-green-700 hover:bg-green-100'}
                  >
                    {automation.is_active ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Activate
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredAutomations.length === 0 && (
            <div className="text-center py-12">
              <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No automations found</h3>
              <p className="text-gray-600 mb-4">Create your first automation to streamline workflows</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Automation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Automation Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Popular Templates</CardTitle>
            <CardDescription>Pre-built automation workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Client Welcome Series</h4>
                  <p className="text-sm text-gray-600">Automated onboarding emails and task creation</p>
                </div>
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Deadline Management</h4>
                  <p className="text-sm text-gray-600">Automatic reminders and escalations</p>
                </div>
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Invoice Follow-up</h4>
                  <p className="text-sm text-gray-600">Payment reminders and collections workflow</p>
                </div>
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Quality Assurance</h4>
                  <p className="text-sm text-gray-600">Automatic review assignments and notifications</p>
                </div>
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <CardDescription>Latest automation executions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Job Completion Workflow</p>
                  <p className="text-xs text-gray-600">Executed for ABC Ltd - Year-end Accounts</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Deadline Reminder System</p>
                  <p className="text-xs text-gray-600">Sent 14-day reminder for VAT Return</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Client Onboarding Workflow</p>
                  <p className="text-xs text-gray-600">Failed: Email service unavailable</p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Invoice Follow-up</p>
                  <p className="text-xs text-gray-600">Sent payment reminder to XYZ Services</p>
                  <p className="text-xs text-gray-500">8 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AutomationsRules

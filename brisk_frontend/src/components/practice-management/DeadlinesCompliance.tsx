import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Calendar, Search, Plus, AlertTriangle, Clock, CheckCircle,
  Eye, Edit, Bell, TrendingUp
} from 'lucide-react'
import { practiceManagementApi, PMDeadline } from '../../services/api'

const DeadlinesCompliance: React.FC = () => {
  const [deadlines, setDeadlines] = useState<PMDeadline[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')

  useEffect(() => {
    const fetchDeadlines = async () => {
      try {
        const data = await practiceManagementApi.getDeadlines()
        setDeadlines(data)
      } catch (error) {
        console.error('Failed to fetch deadlines:', error)
        setDeadlines([
          { id: 1, name: 'VAT Return Q4 2023', client_name: 'ABC Manufacturing Ltd', deadline_type: 'vat', regulatory_type: 'VAT Return', due_date: '2024-02-07', status: 'pending', readiness_percentage: 85, escalated: false, created_at: '2024-01-15T10:30:00Z' },
          { id: 2, name: 'Corporation Tax Return', client_name: 'XYZ Services Ltd', deadline_type: 'corporation_tax', regulatory_type: 'CT600', due_date: '2024-01-31', status: 'overdue', readiness_percentage: 60, escalated: true, created_at: '2024-01-10T14:20:00Z' },
          { id: 3, name: 'Annual Confirmation Statement', client_name: 'DEF Consulting', deadline_type: 'companies_house', regulatory_type: 'CS01', due_date: '2024-02-15', status: 'ready', readiness_percentage: 100, escalated: false, created_at: '2024-01-05T09:15:00Z' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchDeadlines()
  }, [])

  const filteredDeadlines = deadlines.filter(deadline => {
    const matchesSearch = deadline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (deadline.client_name && deadline.client_name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === 'all' || deadline.deadline_type === typeFilter
    return matchesSearch && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      case 'ready':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Ready</Badge>
      case 'filed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Filed</Badge>
      case 'overdue':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getReadinessColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-600'
    if (percentage >= 70) return 'bg-yellow-600'
    if (percentage >= 50) return 'bg-orange-600'
    return 'bg-red-600'
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Deadlines & Compliance Calendar</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Deadlines & Compliance Calendar</h1>
          <p className="text-gray-600 mt-1">Track regulatory deadlines and monitor compliance readiness</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Set Alerts
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Deadline
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Due This Week</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {deadlines.filter(d => getDaysUntilDue(d.due_date) <= 7 && getDaysUntilDue(d.due_date) >= 0).length}
            </div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              Upcoming deadlines
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {deadlines.filter(d => d.status === 'overdue').length}
            </div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Requires immediate action
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ready to File</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {deadlines.filter(d => d.status === 'ready').length}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              100% complete
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Compliance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">96%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              On-time filing rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* View Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CardTitle className="text-lg font-semibold">Compliance Calendar</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('calendar')}
                >
                  Calendar
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search deadlines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                <option value="vat">VAT</option>
                <option value="corporation_tax">Corporation Tax</option>
                <option value="personal_tax">Personal Tax</option>
                <option value="companies_house">Companies House</option>
                <option value="payroll">Payroll</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredDeadlines.map((deadline) => {
                const daysUntil = getDaysUntilDue(deadline.due_date)
                return (
                  <div key={deadline.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">{deadline.name}</h3>
                        {getStatusBadge(deadline.status)}
                        {deadline.escalated && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Escalated
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {deadline.client_name} • {deadline.regulatory_type}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Due: {new Date(deadline.due_date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {daysUntil > 0 ? `${daysUntil} days remaining` : 
                           daysUntil === 0 ? 'Due today' : 
                           `${Math.abs(daysUntil)} days overdue`}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span>Readiness:</span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getReadinessColor(deadline.readiness_percentage)}`}
                              style={{ width: `${deadline.readiness_percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{deadline.readiness_percentage}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {deadline.status === 'ready' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          File Now
                        </Button>
                      )}
                      {deadline.status === 'overdue' && (
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Urgent
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {viewMode === 'calendar' && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View</h3>
              <p className="text-gray-600 mb-4">Interactive calendar showing all compliance deadlines</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Load Calendar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Regulatory Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Regulatory Feeds</CardTitle>
            <CardDescription>Automatic deadline detection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">HMRC VAT Returns</h4>
                  <p className="text-sm text-gray-600">Quarterly deadlines auto-imported</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Companies House Filings</h4>
                  <p className="text-sm text-gray-600">Annual returns and confirmations</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">HMRC Corporation Tax</h4>
                  <p className="text-sm text-gray-600">CT600 filing deadlines</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Escalation Rules</CardTitle>
            <CardDescription>Automated alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Standard Escalation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>14 days before due</span>
                    <Badge variant="outline" className="text-xs">Email reminder</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>7 days before due</span>
                    <Badge variant="outline" className="text-xs">Manager alert</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>1 day before due</span>
                    <Badge variant="outline" className="text-xs">Partner notification</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>On due date</span>
                    <Badge variant="outline" className="text-xs">Urgent escalation</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Configure Rules
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DeadlinesCompliance

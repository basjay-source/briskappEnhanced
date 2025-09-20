import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Calendar, Search, Plus, Clock, Users, CheckCircle,
  Eye, Edit, AlertTriangle, TrendingUp, Plane
} from 'lucide-react'
import { practiceManagementApi, LeaveRequest } from '../../services/api'

const LeaveHolidaysResourcing: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const data = await practiceManagementApi.getLeaveRequests()
        setLeaveRequests(data)
      } catch (error) {
        console.error('Failed to fetch leave requests:', error)
        setLeaveRequests([
          { id: 1, user_name: 'John Smith', leave_type: 'annual', start_date: '2024-02-15', end_date: '2024-02-19', days_requested: 5, status: 'approved', approved_by: 'Manager', created_at: '2024-01-15T10:30:00Z' },
          { id: 2, user_name: 'Sarah Johnson', leave_type: 'sick', start_date: '2024-01-22', end_date: '2024-01-22', days_requested: 1, status: 'approved', approved_by: 'Manager', created_at: '2024-01-20T14:20:00Z' },
          { id: 3, user_name: 'Mike Wilson', leave_type: 'annual', start_date: '2024-03-01', end_date: '2024-03-08', days_requested: 6, status: 'pending', approved_by: null, created_at: '2024-01-18T09:15:00Z' },
          { id: 4, user_name: 'Emma Davis', leave_type: 'training', start_date: '2024-02-05', end_date: '2024-02-06', days_requested: 2, status: 'approved', approved_by: 'Partner', created_at: '2024-01-12T16:30:00Z' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchLeaveRequests()
  }, [])

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = (request.user_name || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>
      case 'cancelled':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getLeaveTypeBadge = (type: string) => {
    switch (type) {
      case 'annual':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Annual Leave</Badge>
      case 'sick':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Sick Leave</Badge>
      case 'training':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Training</Badge>
      case 'personal':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Personal</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Leave, Holidays & Resourcing</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Leave, Holidays & Resourcing</h1>
          <p className="text-gray-600 mt-1">Manage team leave, track capacity and plan resource allocation</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Holiday Calendar
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Request Leave
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {leaveRequests.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-xs text-yellow-600 flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Team Availability</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Current week
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Leave Taken</CardTitle>
            <Plane className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {leaveRequests.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.days_requested, 0)}
            </div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              Days this year
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approval Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {leaveRequests.length > 0 ? Math.round((leaveRequests.filter(r => r.status === 'approved').length / leaveRequests.length) * 100) : 0}%
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              Last 12 months
            </p>
          </CardContent>
        </Card>
      </div>

      {/* View Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CardTitle className="text-lg font-semibold">Leave Requests</CardTitle>
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
                  placeholder="Search requests..."
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
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{request.user_name}</h3>
                      {getLeaveTypeBadge(request.leave_type)}
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {request.leave_type} leave request
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(request.start_date).toLocaleDateString()} - {new Date(request.end_date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {request.days_requested} days
                      </span>
                      {request.approved_by && (
                        <span className="flex items-center">
                          Approved by: {request.approved_by}
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
                    {request.status === 'pending' && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'calendar' && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Leave Calendar</h3>
              <p className="text-gray-600 mb-4">Interactive calendar showing team leave and availability</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Load Calendar
              </Button>
            </div>
          )}

          {filteredRequests.length === 0 && viewMode === 'list' && (
            <div className="text-center py-12">
              <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
              <p className="text-gray-600 mb-4">Submit your first leave request</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Request Leave
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resource Planning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Capacity Forecast</CardTitle>
            <CardDescription>Upcoming capacity impacts from approved leave</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">This Week</h4>
                  <p className="text-sm text-gray-600">1 person on leave</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">87% capacity</p>
                  <p className="text-xs text-gray-500">Normal operations</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Next Week</h4>
                  <p className="text-sm text-gray-600">2 people on leave</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-yellow-600">75% capacity</p>
                  <p className="text-xs text-gray-500">Monitor workload</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Week of Feb 15</h4>
                  <p className="text-sm text-gray-600">3 people on leave</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">62% capacity</p>
                  <p className="text-xs text-gray-500">Resource planning needed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Leave Balances</CardTitle>
            <CardDescription>Annual leave entitlements and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">John Smith</h4>
                  <p className="text-sm text-gray-600">Senior Accountant</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">15 days remaining</p>
                  <p className="text-xs text-gray-500">of 25 days</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Bookkeeper</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">22 days remaining</p>
                  <p className="text-xs text-gray-500">of 25 days</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Mike Wilson</h4>
                  <p className="text-sm text-gray-600">Tax Specialist</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">18 days remaining</p>
                  <p className="text-xs text-gray-500">of 25 days</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Emma Davis</h4>
                  <p className="text-sm text-gray-600">Junior Accountant</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">20 days remaining</p>
                  <p className="text-xs text-gray-500">of 22 days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LeaveHolidaysResourcing

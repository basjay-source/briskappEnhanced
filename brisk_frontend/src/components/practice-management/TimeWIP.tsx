import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Clock, Search, Plus, DollarSign, TrendingUp, AlertTriangle,
  CheckCircle, Eye, Edit, Play, Calendar
} from 'lucide-react'
import { practiceManagementApi, TimeEntry, WIPEntry } from '../../services/api'

const TimeWIP: React.FC = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [wipEntries, setWipEntries] = useState<WIPEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'timesheet' | 'wip' | 'approvals'>('timesheet')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [timeData, wipData] = await Promise.all([
          practiceManagementApi.getTimeEntries(),
          practiceManagementApi.getWIPEntries()
        ])
        setTimeEntries(timeData)
        setWipEntries(wipData)
      } catch (error) {
        console.error('Failed to fetch time/WIP data:', error)
        setTimeEntries([
          { id: 1, user_name: 'John Smith', job_name: 'Year-end Accounts - ABC Ltd', date: '2024-01-15', hours: 6.5, description: 'Trial balance review and adjustments', billable: true, hourly_rate: 75, status: 'approved', created_at: '2024-01-15T10:30:00Z' },
          { id: 2, user_name: 'Sarah Johnson', job_name: 'Monthly Bookkeeping - XYZ', date: '2024-01-15', hours: 4, description: 'Bank reconciliation and posting', billable: true, hourly_rate: 50, status: 'pending', created_at: '2024-01-15T14:20:00Z' },
          { id: 3, user_name: 'Mike Wilson', job_name: 'VAT Return - DEF Ltd', date: '2024-01-14', hours: 2.5, description: 'VAT return preparation', billable: true, hourly_rate: 65, status: 'approved', created_at: '2024-01-14T09:15:00Z' }
        ])
        setWipEntries([
          { id: 1, job_name: 'Year-end Accounts - ABC Ltd', date: '2024-01-15', hours: 32, billing_amount: 2400, write_up_amount: 200, write_off_amount: 0, status: 'ready_to_bill', created_at: '2024-01-15T10:30:00Z' },
          { id: 2, job_name: 'Monthly Bookkeeping - XYZ', date: '2024-01-15', hours: 16, billing_amount: 800, write_up_amount: 0, write_off_amount: 50, status: 'in_progress', created_at: '2024-01-15T14:20:00Z' },
          { id: 3, job_name: 'VAT Return - DEF Ltd', date: '2024-01-14', hours: 8, billing_amount: 520, write_up_amount: 0, write_off_amount: 0, status: 'billed', created_at: '2024-01-14T09:15:00Z' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>
      case 'ready_to_bill':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Ready to Bill</Badge>
      case 'in_progress':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">In Progress</Badge>
      case 'billed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Billed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Time & WIP</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Time & WIP</h1>
          <p className="text-gray-600 mt-1">Track time, manage work in progress and monitor realization</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-2" />
            Start Timer
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Log Time
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total WIP</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              £{wipEntries.reduce((sum, wip) => sum + (wip.billing_amount || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Billable Hours</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {timeEntries.filter(t => t.billable).reduce((sum, t) => sum + t.hours, 0)}h
            </div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              This week
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Realization Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Above target (85%)
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
              {timeEntries.filter(t => t.status === 'pending').length}
            </div>
            <p className="text-xs text-yellow-600 flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Requires review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'timesheet', label: 'Timesheets', icon: Clock },
            { id: 'wip', label: 'WIP Review', icon: DollarSign },
            { id: 'approvals', label: 'Approvals', icon: CheckCircle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Timesheet Tab */}
      {activeTab === 'timesheet' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Time Entries</CardTitle>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search time entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  This Week
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{entry.job_name}</h3>
                      {getStatusBadge(entry.status)}
                      {entry.billable && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Billable
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {entry.user_name} • {entry.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {entry.hours}h
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        £{entry.hourly_rate}/hour
                      </span>
                      <span className="font-medium">
                        Total: £{((entry.hourly_rate || 0) * entry.hours).toFixed(2)}
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
                    {entry.status === 'pending' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* WIP Tab */}
      {activeTab === 'wip' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">WIP Review</CardTitle>
            <CardDescription>Monitor work in progress and billing readiness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wipEntries.map((wip) => (
                <div key={wip.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{wip.job_name}</h3>
                      {getStatusBadge(wip.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                      <div>
                        <span className="text-gray-600">Hours:</span>
                        <span className="font-medium ml-2">{wip.hours}h</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Billing Amount:</span>
                        <span className="font-medium ml-2">£{wip.billing_amount?.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Write-up:</span>
                        <span className="font-medium ml-2 text-green-600">+£{wip.write_up_amount?.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Write-off:</span>
                        <span className="font-medium ml-2 text-red-600">-£{wip.write_off_amount?.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">Net Amount: </span>
                      <span className="font-medium text-lg">
                        £{((wip.billing_amount || 0) + (wip.write_up_amount || 0) - (wip.write_off_amount || 0)).toLocaleString()}
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
                    {wip.status === 'ready_to_bill' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Bill Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Approvals Tab */}
      {activeTab === 'approvals' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Pending Approvals</CardTitle>
            <CardDescription>Time entries requiring approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeEntries.filter(entry => entry.status === 'pending').map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{entry.job_name}</h3>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Pending Review
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {entry.user_name} • {entry.hours}h • {entry.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Submitted: {new Date(entry.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                      Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
              
              {timeEntries.filter(entry => entry.status === 'pending').length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pending approvals</h3>
                  <p className="text-gray-600">All time entries have been reviewed</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default TimeWIP

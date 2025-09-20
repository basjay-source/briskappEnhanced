import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Calendar, Search, Plus, Users, Clock, TrendingUp,
  AlertTriangle, Eye, Edit, BarChart3
} from 'lucide-react'

const SchedulingCapacity: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly' | 'heatmap'>('weekly')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const teamMembers = [
    { id: 1, name: 'John Smith', role: 'Senior Accountant', utilization: 85, capacity: 40, allocated: 34, skills: ['Accounts', 'Tax', 'Audit'] },
    { id: 2, name: 'Sarah Johnson', role: 'Bookkeeper', utilization: 92, capacity: 40, allocated: 37, skills: ['Bookkeeping', 'VAT', 'Payroll'] },
    { id: 3, name: 'Mike Wilson', role: 'Tax Specialist', utilization: 78, capacity: 40, allocated: 31, skills: ['Tax', 'Advisory', 'Planning'] },
    { id: 4, name: 'Emma Davis', role: 'Junior Accountant', utilization: 65, capacity: 40, allocated: 26, skills: ['Accounts', 'Bookkeeping'] }
  ]

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600 bg-red-50 border-red-200'
    if (utilization >= 80) return 'text-orange-600 bg-orange-50 border-orange-200'
    if (utilization >= 70) return 'text-green-600 bg-green-50 border-green-200'
    return 'text-blue-600 bg-blue-50 border-blue-200'
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Scheduling & Capacity</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Scheduling & Capacity</h1>
          <p className="text-gray-600 mt-1">Plan work allocation, monitor capacity and optimize resource utilization</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Scenario Planner
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Job
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Team Utilization</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(teamMembers.reduce((sum, member) => sum + member.utilization, 0) / teamMembers.length)}%
            </div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              Average across team
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overallocated</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {teamMembers.filter(m => m.utilization >= 90).length}
            </div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Team members
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Available Capacity</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {teamMembers.reduce((sum, member) => sum + (member.capacity - member.allocated), 0)}h
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              This week
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Efficiency Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* View Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CardTitle className="text-lg font-semibold">Capacity Planning</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'weekly' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('weekly')}
                >
                  Weekly
                </Button>
                <Button
                  variant={viewMode === 'monthly' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('monthly')}
                >
                  Monthly
                </Button>
                <Button
                  variant={viewMode === 'heatmap' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('heatmap')}
                >
                  Heatmap
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search team members..."
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'weekly' && (
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Utilization:</span>
                        <Badge variant="outline" className={getUtilizationColor(member.utilization)}>
                          {member.utilization}%
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Allocated:</span>
                        <span className="text-sm font-medium">{member.allocated}h / {member.capacity}h</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Skills:</span>
                        <div className="flex space-x-1">
                          {member.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            member.utilization >= 90 ? 'bg-red-600' :
                            member.utilization >= 80 ? 'bg-orange-600' :
                            member.utilization >= 70 ? 'bg-green-600' : 'bg-blue-600'
                          }`}
                          style={{ width: `${Math.min(member.utilization, 100)}%` }}
                        ></div>
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
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'monthly' && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Monthly Capacity View</h3>
              <p className="text-gray-600 mb-4">Extended planning view with monthly allocation breakdown</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Load Monthly View
              </Button>
            </div>
          )}

          {viewMode === 'heatmap' && (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Capacity Heatmap</h3>
              <p className="text-gray-600 mb-4">Visual representation of team capacity and workload distribution</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Heatmap
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skills Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Skills Matching</CardTitle>
            <CardDescription>Match skills to job requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Upcoming Job: Year-end Accounts</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Required: Accounts, Audit</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      3 matches
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Suggested: John Smith (85% util), Mike Wilson (78% util)
                  </div>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Upcoming Job: VAT Return</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Required: VAT, Bookkeeping</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      1 match
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Suggested: Sarah Johnson (92% util - overallocated)
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Capacity Alerts</CardTitle>
            <CardDescription>Resource planning notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-900">Sarah Johnson overallocated</p>
                  <p className="text-xs text-red-700">92% utilization - consider redistributing work</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Deadline conflict detected</p>
                  <p className="text-xs text-yellow-700">3 jobs due same week - capacity breach likely</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Emma Davis underutilized</p>
                  <p className="text-xs text-blue-700">65% utilization - available for additional work</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SchedulingCapacity

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Plus, BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react'

const Reports: React.FC = () => {
  const [reports] = useState([
    {
      id: 1,
      name: 'Monthly Usage Report',
      type: 'usage',
      schedule: 'monthly',
      lastRun: '2025-09-01',
      status: 'completed',
      recipients: 'admin@briskaccountants.com'
    },
    {
      id: 2,
      name: 'Security KPI Dashboard',
      type: 'security',
      schedule: 'weekly',
      lastRun: '2025-09-18',
      status: 'completed',
      recipients: 'security@briskaccountants.com'
    },
    {
      id: 3,
      name: 'Billing Forecast',
      type: 'financial',
      schedule: 'quarterly',
      lastRun: '2025-07-01',
      status: 'scheduled',
      recipients: 'finance@briskaccountants.com'
    }
  ])

  const [analytics] = useState([
    {
      metric: 'User Adoption Rate',
      value: '87%',
      change: '+5%',
      trend: 'up'
    },
    {
      metric: 'Feature Usage',
      value: '92%',
      change: '+12%',
      trend: 'up'
    },
    {
      metric: 'Support Tickets',
      value: '23',
      change: '-8%',
      trend: 'down'
    },
    {
      metric: 'System Uptime',
      value: '99.9%',
      change: '0%',
      trend: 'stable'
    }
  ])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Admin Analytics</h1>
          <p className="text-gray-600 mt-2">Generate reports, track usage analytics, and monitor key performance indicators</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-600">Scheduled reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Points</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-gray-600">Collected this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-gray-600">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£45.2K</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
            <CardDescription>Real-time analytics and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.metric}</p>
                    <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={
                      item.trend === 'up' ? 'bg-green-100 text-green-800' :
                      item.trend === 'down' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {item.change}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">vs last period</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
            <CardDescription>Automated report generation and distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.type}</Badge>
                    </TableCell>
                    <TableCell className="text-xs">{report.schedule}</TableCell>
                    <TableCell>
                      <Badge className={report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Run</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage & Adoption Analytics</CardTitle>
          <CardDescription>Track feature usage and user engagement across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Most Used Features</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Dashboard</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">User Management</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Billing</span>
                  <span className="text-sm font-medium">76%</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">User Activity</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Daily Active Users</span>
                  <span className="text-sm font-medium">67</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Weekly Active Users</span>
                  <span className="text-sm font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Monthly Active Users</span>
                  <span className="text-sm font-medium">156</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Avg Session Duration</span>
                  <span className="text-sm font-medium">24 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Page Load Time</span>
                  <span className="text-sm font-medium">1.2s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Error Rate</span>
                  <span className="text-sm font-medium">0.1%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Reports

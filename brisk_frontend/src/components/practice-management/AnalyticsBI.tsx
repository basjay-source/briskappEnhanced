import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  BarChart3, Search, Plus, TrendingUp, TrendingDown, DollarSign,
  Users, Clock, Target, Download, Calendar, Filter
} from 'lucide-react'

const AnalyticsBI: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [periodFilter, setPeriodFilter] = useState<string>('month')

  const kpiData = {
    revenue: { current: 125000, previous: 118000, change: 5.9 },
    utilization: { current: 78, previous: 75, change: 4.0 },
    realization: { current: 92, previous: 89, change: 3.4 },
    margin: { current: 35, previous: 32, change: 9.4 },
    wip: { current: 45000, previous: 52000, change: -13.5 },
    ar: { current: 28000, previous: 31000, change: -9.7 }
  }

  const reports = [
    { id: 1, name: 'Revenue by Service Line', category: 'financial', description: 'Breakdown of revenue by service type', last_run: '2024-01-21T10:30:00Z', frequency: 'monthly' },
    { id: 2, name: 'Team Utilization Report', category: 'operational', description: 'Staff utilization and capacity analysis', last_run: '2024-01-21T09:15:00Z', frequency: 'weekly' },
    { id: 3, name: 'Client Profitability Analysis', category: 'financial', description: 'Profit margins by client and engagement', last_run: '2024-01-20T14:20:00Z', frequency: 'quarterly' },
    { id: 4, name: 'WIP Aging Report', category: 'financial', description: 'Work in progress aging and recovery analysis', last_run: '2024-01-20T11:45:00Z', frequency: 'weekly' },
    { id: 5, name: 'SLA Performance Dashboard', category: 'operational', description: 'Service level agreement compliance metrics', last_run: '2024-01-19T16:30:00Z', frequency: 'daily' },
    { id: 6, name: 'Quality Metrics Summary', category: 'operational', description: 'Quality review outcomes and trends', last_run: '2024-01-19T08:20:00Z', frequency: 'monthly' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600'
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      financial: 'bg-blue-50 text-blue-700 border-blue-200',
      operational: 'bg-green-50 text-green-700 border-green-200',
      compliance: 'bg-orange-50 text-orange-700 border-orange-200'
    }
    return (
      <Badge variant="outline" className={colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200'}>
        {category}
      </Badge>
    )
  }

  const getFrequencyBadge = (frequency: string) => {
    const colors = {
      daily: 'bg-red-50 text-red-700 border-red-200',
      weekly: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      monthly: 'bg-blue-50 text-blue-700 border-blue-200',
      quarterly: 'bg-purple-50 text-purple-700 border-purple-200'
    }
    return (
      <Badge variant="outline" className={colors[frequency as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200'}>
        {frequency}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Analytics & BI</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Analytics & BI</h1>
          <p className="text-gray-600 mt-1">Business intelligence and performance analytics</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              £{kpiData.revenue.current.toLocaleString()}
            </div>
            <p className={`text-xs flex items-center mt-1 ${getChangeColor(kpiData.revenue.change)}`}>
              {getChangeIcon(kpiData.revenue.change)}
              <span className="ml-1">{Math.abs(kpiData.revenue.change)}% vs last {periodFilter}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Utilization</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{kpiData.utilization.current}%</div>
            <p className={`text-xs flex items-center mt-1 ${getChangeColor(kpiData.utilization.change)}`}>
              {getChangeIcon(kpiData.utilization.change)}
              <span className="ml-1">{Math.abs(kpiData.utilization.change)}% vs last {periodFilter}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Realization</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{kpiData.realization.current}%</div>
            <p className={`text-xs flex items-center mt-1 ${getChangeColor(kpiData.realization.change)}`}>
              {getChangeIcon(kpiData.realization.change)}
              <span className="ml-1">{Math.abs(kpiData.realization.change)}% vs last {periodFilter}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Gross Margin</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{kpiData.margin.current}%</div>
            <p className={`text-xs flex items-center mt-1 ${getChangeColor(kpiData.margin.change)}`}>
              {getChangeIcon(kpiData.margin.change)}
              <span className="ml-1">{Math.abs(kpiData.margin.change)}% vs last {periodFilter}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">WIP Balance</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              £{kpiData.wip.current.toLocaleString()}
            </div>
            <p className={`text-xs flex items-center mt-1 ${getChangeColor(kpiData.wip.change)}`}>
              {getChangeIcon(kpiData.wip.change)}
              <span className="ml-1">{Math.abs(kpiData.wip.change)}% vs last {periodFilter}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">AR Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              £{kpiData.ar.current.toLocaleString()}
            </div>
            <p className={`text-xs flex items-center mt-1 ${getChangeColor(kpiData.ar.change)}`}>
              {getChangeIcon(kpiData.ar.change)}
              <span className="ml-1">{Math.abs(kpiData.ar.change)}% vs last {periodFilter}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Available Reports</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="font-medium text-gray-900">{report.name}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                    {getCategoryBadge(report.category)}
                    {getFrequencyBadge(report.frequency)}
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 ml-8">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Last run: {new Date(report.last_run).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Frequency: {report.frequency}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Run Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Revenue chart would be displayed here</p>
                <p className="text-sm text-gray-500">Interactive chart showing monthly trends</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Service Line Performance</CardTitle>
            <CardDescription>Revenue breakdown by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Accounts Preparation</h4>
                  <p className="text-sm text-gray-600">45% of total revenue</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">£56,250</p>
                  <p className="text-xs text-gray-500">+8% vs last month</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Tax Services</h4>
                  <p className="text-sm text-gray-600">30% of total revenue</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">£37,500</p>
                  <p className="text-xs text-gray-500">+3% vs last month</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Payroll Services</h4>
                  <p className="text-sm text-gray-600">15% of total revenue</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">£18,750</p>
                  <p className="text-xs text-gray-500">+12% vs last month</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Advisory Services</h4>
                  <p className="text-sm text-gray-600">10% of total revenue</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">£12,500</p>
                  <p className="text-xs text-gray-500">-2% vs last month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AnalyticsBI

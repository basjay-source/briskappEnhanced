import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Award, Search, Plus, Clock, TrendingUp, AlertTriangle,
  CheckCircle, Eye, Edit, BarChart3, Target
} from 'lucide-react'
import { practiceManagementApi, PMSLA } from '../../services/api'

const SLAsQoS: React.FC = () => {
  const [slas, setSlas] = useState<PMSLA[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [serviceFilter, setServiceFilter] = useState<string>('all')

  useEffect(() => {
    const fetchSLAs = async () => {
      try {
        const data = await practiceManagementApi.getSLAs()
        setSlas(data)
      } catch (error) {
        console.error('Failed to fetch SLAs:', error)
        setSlas([
          { id: 1, name: 'Year-end Accounts SLA', service_type: 'accounts', response_time_hours: 24, resolution_time_hours: 168, uptime_percentage: 99.5, created_at: '2024-01-15T10:30:00Z' },
          { id: 2, name: 'VAT Return SLA', service_type: 'vat', response_time_hours: 4, resolution_time_hours: 48, uptime_percentage: 99.8, created_at: '2024-01-10T14:20:00Z' },
          { id: 3, name: 'Payroll Processing SLA', service_type: 'payroll', response_time_hours: 2, resolution_time_hours: 24, uptime_percentage: 99.9, created_at: '2024-01-05T09:15:00Z' },
          { id: 4, name: 'Bookkeeping SLA', service_type: 'bookkeeping', response_time_hours: 8, resolution_time_hours: 72, uptime_percentage: 99.2, created_at: '2024-01-01T16:30:00Z' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSLAs()
  }, [])

  const filteredSLAs = slas.filter(sla => {
    const matchesSearch = sla.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesService = serviceFilter === 'all' || sla.service_type === serviceFilter
    return matchesSearch && matchesService
  })

  const getPerformanceBadge = (percentage: number | null) => {
    if (!percentage) return <Badge variant="outline">N/A</Badge>
    if (percentage >= 99) return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Excellent</Badge>
    if (percentage >= 95) return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Good</Badge>
    if (percentage >= 90) return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Fair</Badge>
    return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Poor</Badge>
  }

  const getServiceTypeBadge = (type: string) => {
    const colors = {
      accounts: 'bg-blue-50 text-blue-700 border-blue-200',
      bookkeeping: 'bg-green-50 text-green-700 border-green-200',
      vat: 'bg-orange-50 text-orange-700 border-orange-200',
      payroll: 'bg-purple-50 text-purple-700 border-purple-200',
      tax: 'bg-red-50 text-red-700 border-red-200'
    }
    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200'}>
        {type}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">SLAs & QoS</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">SLAs & QoS</h1>
          <p className="text-gray-600 mt-1">Monitor service level agreements and quality of service metrics</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Performance Report
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New SLA
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overall SLA Performance</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {slas.length > 0 ? Math.round(slas.reduce((sum, sla) => sum + (sla.uptime_percentage || 0), 0) / slas.length * 100) / 100 : 0}%
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Above target (95%)
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {slas.length > 0 ? Math.round(slas.reduce((sum, sla) => sum + sla.response_time_hours, 0) / slas.length) : 0}h
            </div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              Average across services
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">SLA Breaches</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" />
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Client Satisfaction</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">4.7/5</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Based on 89 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Service Level Agreements</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search SLAs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Services</option>
                <option value="accounts">Accounts</option>
                <option value="bookkeeping">Bookkeeping</option>
                <option value="vat">VAT</option>
                <option value="payroll">Payroll</option>
                <option value="tax">Tax</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSLAs.map((sla) => (
              <div key={sla.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{sla.name}</h3>
                    {getServiceTypeBadge(sla.service_type)}
                    {getPerformanceBadge(sla.uptime_percentage)}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                    <div>
                      <span className="text-gray-600">Response Time:</span>
                      <span className="font-medium ml-2">{sla.response_time_hours}h</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Resolution Time:</span>
                      <span className="font-medium ml-2">{sla.resolution_time_hours}h</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Uptime:</span>
                      <span className="font-medium ml-2">{sla.uptime_percentage}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium ml-2">{new Date(sla.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          (sla.uptime_percentage || 0) >= 99 ? 'bg-green-600' :
                          (sla.uptime_percentage || 0) >= 95 ? 'bg-blue-600' :
                          (sla.uptime_percentage || 0) >= 90 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${sla.uptime_percentage || 0}%` }}
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
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredSLAs.length === 0 && (
            <div className="text-center py-12">
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No SLAs found</h3>
              <p className="text-gray-600 mb-4">Create your first SLA to track service quality</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create SLA
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Performance Trends</CardTitle>
            <CardDescription>SLA performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">This Month</h4>
                  <p className="text-sm text-gray-600">Average performance: 98.2%</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.1%
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Last Month</h4>
                  <p className="text-sm text-gray-600">Average performance: 96.1%</p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Baseline
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Quarter Average</h4>
                  <p className="text-sm text-gray-600">Average performance: 97.5%</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Above Target
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Breach Management</CardTitle>
            <CardDescription>SLA breach handling and escalation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Breach Response</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Immediate notification</span>
                    <Badge variant="outline" className="text-xs">Client & Team</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Root cause analysis</span>
                    <Badge variant="outline" className="text-xs">Within 24h</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Corrective action plan</span>
                    <Badge variant="outline" className="text-xs">Within 48h</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Client credit (if applicable)</span>
                    <Badge variant="outline" className="text-xs">Automatic</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Target className="h-4 w-4 mr-2" />
                Configure Breach Rules
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SLAsQoS

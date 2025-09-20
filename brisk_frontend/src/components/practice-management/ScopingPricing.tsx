import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Package, Search, Plus, DollarSign, Clock, Calculator,
  Edit, Eye, TrendingUp, BarChart3, Settings
} from 'lucide-react'
import { practiceManagementApi, ServiceCatalogItem } from '../../services/api'

const ScopingPricing: React.FC = () => {
  const [services, setServices] = useState<ServiceCatalogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('all')

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await practiceManagementApi.getServiceCatalog()
        setServices(data)
      } catch (error) {
        console.error('Failed to fetch service catalog:', error)
        setServices([
          { id: 1, name: 'Year-end Accounts', service_type: 'accounts', description: 'Preparation of statutory accounts', pricing_model: 'fixed', base_price: 2500, hourly_rate: null, default_sla_hours: 168, created_at: '2024-01-15T10:30:00Z' },
          { id: 2, name: 'Monthly Bookkeeping', service_type: 'bookkeeping', description: 'Monthly bookkeeping and reconciliation', pricing_model: 'monthly', base_price: 500, hourly_rate: null, default_sla_hours: 72, created_at: '2024-01-10T14:20:00Z' },
          { id: 3, name: 'Tax Advisory', service_type: 'tax', description: 'Tax planning and advisory services', pricing_model: 'hourly', base_price: null, hourly_rate: 150, default_sla_hours: 48, created_at: '2024-01-05T09:15:00Z' },
          { id: 4, name: 'Payroll Services', service_type: 'payroll', description: 'Monthly payroll processing', pricing_model: 'per_employee', base_price: 25, hourly_rate: null, default_sla_hours: 24, created_at: '2024-01-01T16:30:00Z' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = serviceTypeFilter === 'all' || service.service_type === serviceTypeFilter
    return matchesSearch && matchesType
  })

  const getPricingDisplay = (service: ServiceCatalogItem) => {
    switch (service.pricing_model) {
      case 'fixed':
        return `£${service.base_price?.toLocaleString()} fixed`
      case 'hourly':
        return `£${service.hourly_rate}/hour`
      case 'monthly':
        return `£${service.base_price}/month`
      case 'per_employee':
        return `£${service.base_price}/employee`
      default:
        return 'Custom pricing'
    }
  }

  const getServiceTypeBadge = (type: string) => {
    const colors = {
      accounts: 'bg-blue-50 text-blue-700 border-blue-200',
      bookkeeping: 'bg-green-50 text-green-700 border-green-200',
      tax: 'bg-orange-50 text-orange-700 border-orange-200',
      payroll: 'bg-purple-50 text-purple-700 border-purple-200',
      advisory: 'bg-gray-50 text-gray-700 border-gray-200'
    }
    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors] || colors.advisory}>
        {type}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Scoping & Pricing</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Scoping & Pricing</h1>
          <p className="text-gray-600 mt-1">Manage service catalog, pricing models and estimators</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Calculator className="h-4 w-4 mr-2" />
            Pricing Calculator
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Services</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{services.length}</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              Active services
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Service Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">£1,250</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg SLA</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {services.length > 0 ? Math.round(services.reduce((sum, s) => sum + s.default_sla_hours, 0) / services.length) : 0}h
            </div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              Average delivery time
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Utilization Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              Service adoption rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Service Catalog</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={serviceTypeFilter}
                onChange={(e) => setServiceTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                <option value="accounts">Accounts</option>
                <option value="bookkeeping">Bookkeeping</option>
                <option value="tax">Tax</option>
                <option value="payroll">Payroll</option>
                <option value="advisory">Advisory</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-600 mt-1">
                        {service.description}
                      </CardDescription>
                    </div>
                    {getServiceTypeBadge(service.service_type)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pricing:</span>
                    <span className="font-medium text-gray-900">{getPricingDisplay(service)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SLA:</span>
                    <span className="font-medium text-gray-900">{service.default_sla_hours}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Model:</span>
                    <Badge variant="outline" className="text-xs">
                      {service.pricing_model.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="pt-3 border-t flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calculator className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Use Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Pricing Models</CardTitle>
            <CardDescription>Configure pricing strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Fixed Fee</h4>
                  <p className="text-sm text-gray-600">Set price per service</p>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Time & Materials</h4>
                  <p className="text-sm text-gray-600">Hourly rate billing</p>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Value-based</h4>
                  <p className="text-sm text-gray-600">Price based on value delivered</p>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Retainer</h4>
                  <p className="text-sm text-gray-600">Monthly recurring fee</p>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Estimators</CardTitle>
            <CardDescription>Driver-based pricing calculators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Transaction Volume Estimator</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Monthly Transactions</label>
                    <Input placeholder="500" className="text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Complexity Factor</label>
                    <select className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm">
                      <option>Simple</option>
                      <option>Medium</option>
                      <option>Complex</option>
                    </select>
                  </div>
                </div>
                <Button size="sm" className="mt-3 w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
              </div>

              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Entity Count Estimator</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Number of Entities</label>
                    <Input placeholder="3" className="text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Jurisdiction</label>
                    <select className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm">
                      <option>UK</option>
                      <option>EU</option>
                      <option>US</option>
                    </select>
                  </div>
                </div>
                <Button size="sm" className="mt-3 w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ScopingPricing

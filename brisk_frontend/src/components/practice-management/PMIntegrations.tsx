import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Link, Search, Plus, Settings, CheckCircle, AlertTriangle,
  Eye, RefreshCw, TrendingUp, Zap
} from 'lucide-react'

const PMIntegrations: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const integrations = [
    { id: 1, name: 'Xero', category: 'accounting', description: 'Sync clients, invoices and financial data', status: 'connected', last_sync: '2024-01-21T10:30:00Z', sync_frequency: 'hourly', records_synced: 1247 },
    { id: 2, name: 'QuickBooks Online', category: 'accounting', description: 'Import chart of accounts and transactions', status: 'disconnected', last_sync: null, sync_frequency: 'daily', records_synced: 0 },
    { id: 3, name: 'HMRC Making Tax Digital', category: 'tax', description: 'Submit VAT returns and retrieve obligations', status: 'connected', last_sync: '2024-01-20T14:20:00Z', sync_frequency: 'manual', records_synced: 45 },
    { id: 4, name: 'Companies House', category: 'compliance', description: 'File annual returns and confirmation statements', status: 'connected', last_sync: '2024-01-19T09:15:00Z', sync_frequency: 'weekly', records_synced: 23 },
    { id: 5, name: 'Slack', category: 'communication', description: 'Send notifications and updates to team channels', status: 'connected', last_sync: '2024-01-21T11:45:00Z', sync_frequency: 'real-time', records_synced: 89 },
    { id: 6, name: 'Microsoft 365', category: 'productivity', description: 'Calendar integration and email synchronization', status: 'error', last_sync: '2024-01-20T08:30:00Z', sync_frequency: 'hourly', records_synced: 156 },
    { id: 7, name: 'DocuSign', category: 'documents', description: 'Electronic signature workflows', status: 'connected', last_sync: '2024-01-21T09:20:00Z', sync_frequency: 'real-time', records_synced: 34 },
    { id: 8, name: 'Stripe', category: 'payments', description: 'Process client payments and subscriptions', status: 'connected', last_sync: '2024-01-21T12:10:00Z', sync_frequency: 'real-time', records_synced: 67 }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || integration.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Connected
        </Badge>
      case 'disconnected':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          Disconnected
        </Badge>
      case 'error':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Error
        </Badge>
      case 'syncing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <RefreshCw className="h-3 w-3 mr-1" />
          Syncing
        </Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      accounting: 'bg-blue-50 text-blue-700 border-blue-200',
      tax: 'bg-orange-50 text-orange-700 border-orange-200',
      compliance: 'bg-red-50 text-red-700 border-red-200',
      communication: 'bg-purple-50 text-purple-700 border-purple-200',
      productivity: 'bg-green-50 text-green-700 border-green-200',
      documents: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      payments: 'bg-pink-50 text-pink-700 border-pink-200'
    }
    return (
      <Badge variant="outline" className={colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200'}>
        {category}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-1">Connect external systems and automate data synchronization</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            API Settings
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Connected</CardTitle>
            <Link className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {integrations.filter(i => i.status === 'connected').length}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              Active integrations
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Data Synced</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {integrations.reduce((sum, i) => sum + i.records_synced, 0).toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              Records this month
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Sync Success</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">99.2%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {integrations.filter(i => i.status === 'error').length}
            </div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Require attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Connected Systems</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="accounting">Accounting</option>
                <option value="tax">Tax</option>
                <option value="compliance">Compliance</option>
                <option value="communication">Communication</option>
                <option value="productivity">Productivity</option>
                <option value="documents">Documents</option>
                <option value="payments">Payments</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredIntegrations.map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{integration.name}</h3>
                    {getStatusBadge(integration.status)}
                    {getCategoryBadge(integration.category)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {integration.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Sync: {integration.sync_frequency}
                    </span>
                    <span className="flex items-center">
                      <Zap className="h-4 w-4 mr-1" />
                      {integration.records_synced} records
                    </span>
                    {integration.last_sync && (
                      <span className="flex items-center">
                        Last sync: {new Date(integration.last_sync).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  {integration.status === 'connected' && (
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  )}
                  {integration.status === 'disconnected' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Link className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  )}
                  {integration.status === 'error' && (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Fix
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Available Integrations</CardTitle>
            <CardDescription>Popular systems you can connect</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Sage 50</h4>
                  <p className="text-sm text-gray-600">Desktop accounting software integration</p>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">FreeAgent</h4>
                  <p className="text-sm text-gray-600">Cloud accounting for small businesses</p>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Mailchimp</h4>
                  <p className="text-sm text-gray-600">Email marketing and client communications</p>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Zapier</h4>
                  <p className="text-sm text-gray-600">Connect 5000+ apps with automated workflows</p>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Sync Health</CardTitle>
            <CardDescription>Recent synchronization activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Xero Sync Completed</p>
                  <p className="text-xs text-gray-600">47 transactions imported</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">HMRC MTD Sync</p>
                  <p className="text-xs text-gray-600">VAT obligations retrieved</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Microsoft 365 Error</p>
                  <p className="text-xs text-gray-600">Authentication token expired</p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Stripe Payment Sync</p>
                  <p className="text-xs text-gray-600">12 payments processed</p>
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

export default PMIntegrations

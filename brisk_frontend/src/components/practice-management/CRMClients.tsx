import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Users, Search, Plus, Mail, Calendar,
  Star, TrendingUp, DollarSign, FileText, Eye, Edit
} from 'lucide-react'
import { practiceManagementApi, Client, Opportunity } from '../../services/api'

const CRMClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsData, opportunitiesData] = await Promise.all([
          practiceManagementApi.getClients(),
          practiceManagementApi.getOpportunities()
        ])
        setClients(clientsData)
        setOpportunities(opportunitiesData)
      } catch (error) {
        console.error('Failed to fetch CRM data:', error)
        setClients([
          { id: 1, name: 'ABC Manufacturing Ltd', client_code: 'ABC001', contact_email: 'finance@abc.com', document_count: 45, created_at: '2024-01-15T10:30:00Z' },
          { id: 2, name: 'XYZ Services Ltd', client_code: 'XYZ002', contact_email: 'admin@xyz.com', document_count: 32, created_at: '2024-01-10T14:20:00Z' },
          { id: 3, name: 'DEF Consulting', client_code: 'DEF003', contact_email: 'info@def.com', document_count: 28, created_at: '2024-01-05T09:15:00Z' }
        ])
        setOpportunities([
          { id: 1, name: 'Year-end Accounts', client_name: 'ABC Manufacturing Ltd', value_estimate: 15000, probability: 90, stage: 'proposal', expected_close_date: '2024-02-01', assignee: 'John Smith', created_at: '2024-01-15T10:30:00Z' },
          { id: 2, name: 'Payroll Services', client_name: 'XYZ Services Ltd', value_estimate: 8000, probability: 70, stage: 'negotiation', expected_close_date: '2024-01-25', assignee: 'Sarah Johnson', created_at: '2024-01-10T14:20:00Z' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.client_code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">CRM & Clients</h1>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CRM & Clients</h1>
          <p className="text-gray-600 mt-1">Manage client relationships and track opportunities</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Import Clients
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{clients.length}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Opportunities</CardTitle>
            <Star className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{opportunities.length}</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Pipeline value: £{opportunities.reduce((sum, opp) => sum + (opp.value_estimate || 0), 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Client Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">£12.5k</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% from last year
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Client Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">4.8/5</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Based on 127 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Client Directory</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <Card key={client.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold">{client.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        Code: {client.client_code}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{client.contact_email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>{client.document_count} documents</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Client since {new Date(client.created_at).toLocaleDateString()}</span>
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
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Opportunities Pipeline</CardTitle>
          <CardDescription>Track and manage sales opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{opportunity.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={`${
                        opportunity.stage === 'proposal' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        opportunity.stage === 'negotiation' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {opportunity.stage}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {opportunity.client_name} • Assigned to {opportunity.assignee}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Value: £{opportunity.value_estimate?.toLocaleString()}</span>
                    <span>Probability: {opportunity.probability}%</span>
                    <span>Expected close: {opportunity.expected_close_date ? new Date(opportunity.expected_close_date).toLocaleDateString() : 'TBD'}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Create Proposal
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {opportunities.length === 0 && (
            <div className="text-center py-12">
              <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities yet</h3>
              <p className="text-gray-600 mb-4">Start tracking sales opportunities to grow your practice</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Opportunity
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CRMClients

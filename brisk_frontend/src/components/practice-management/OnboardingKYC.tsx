import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  UserCheck, Search, Plus, AlertTriangle, CheckCircle, Clock,
  Shield, FileText, Eye, Edit, Download
} from 'lucide-react'

const OnboardingKYC: React.FC = () => {
  const [kycCases, setKycCases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    const fetchKYCData = async () => {
      try {
        setKycCases([
          { id: 1, client_name: 'ABC Manufacturing Ltd', status: 'approved', risk_level: 'low', assigned_to: 'Sarah Johnson', created_at: '2024-01-15T10:30:00Z', completed_at: '2024-01-16T14:20:00Z' },
          { id: 2, client_name: 'XYZ Services Ltd', status: 'pending', risk_level: 'medium', assigned_to: 'John Smith', created_at: '2024-01-14T09:15:00Z', completed_at: null },
          { id: 3, client_name: 'DEF Consulting', status: 'edd_required', risk_level: 'high', assigned_to: 'MLRO Team', created_at: '2024-01-13T16:45:00Z', completed_at: null },
          { id: 4, client_name: 'GHI Holdings', status: 'rejected', risk_level: 'high', assigned_to: 'MLRO Team', created_at: '2024-01-12T11:30:00Z', completed_at: '2024-01-12T15:45:00Z' }
        ])
      } catch (error) {
        console.error('Failed to fetch KYC data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchKYCData()
  }, [])

  const filteredCases = kycCases.filter(kycCase => {
    const matchesSearch = kycCase.client_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || kycCase.status === statusFilter
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
      case 'edd_required':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">EDD Required</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low Risk</Badge>
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium Risk</Badge>
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High Risk</Badge>
      default:
        return <Badge variant="outline">{risk}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Onboarding & KYC Gate</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Onboarding & KYC Gate</h1>
          <p className="text-gray-600 mt-1">Manage client onboarding, KYC/AML compliance and risk assessment</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Intake Forms
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New KYC Case
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Cases</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{kycCases.length}</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {kycCases.filter(c => c.status === 'pending' || c.status === 'edd_required').length}
            </div>
            <p className="text-xs text-yellow-600 flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Requires attention
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
              {kycCases.length > 0 ? Math.round((kycCases.filter(c => c.status === 'approved').length / kycCases.length) * 100) : 0}%
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">2.3</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              Days average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">KYC Cases</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search cases..."
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
                <option value="edd_required">EDD Required</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCases.map((kycCase) => (
              <div key={kycCase.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{kycCase.client_name}</h3>
                    {getStatusBadge(kycCase.status)}
                    {getRiskBadge(kycCase.risk_level)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Assigned to: {kycCase.assigned_to}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Created: {new Date(kycCase.created_at).toLocaleDateString()}</span>
                    {kycCase.completed_at && (
                      <span>Completed: {new Date(kycCase.completed_at).toLocaleDateString()}</span>
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
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  {kycCase.status === 'pending' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  )}
                  {kycCase.status === 'edd_required' && (
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      <Shield className="h-4 w-4 mr-2" />
                      EDD Review
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No KYC cases found</h3>
              <p className="text-gray-600 mb-4">Start a new client onboarding process</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New KYC Case
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Onboarding Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Onboarding Workflow</CardTitle>
            <CardDescription>Standard client onboarding process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Intake Form</h4>
                  <p className="text-sm text-gray-600">Collect basic client information</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium">KYC/AML Check</h4>
                  <p className="text-sm text-gray-600">Identity verification and risk assessment</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Document Collection</h4>
                  <p className="text-sm text-gray-600">Gather required documentation</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-medium">Welcome Pack</h4>
                  <p className="text-sm text-gray-600">Send portal access and welcome materials</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Risk Assessment</CardTitle>
            <CardDescription>AML risk factors and scoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Geographic Risk</h4>
                  <p className="text-sm text-gray-600">Country/jurisdiction assessment</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Low
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Business Type</h4>
                  <p className="text-sm text-gray-600">Industry sector risk</p>
                </div>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Medium
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">PEP Status</h4>
                  <p className="text-sm text-gray-600">Politically exposed person check</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Clear
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Sanctions Check</h4>
                  <p className="text-sm text-gray-600">Sanctions list screening</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Clear
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OnboardingKYC

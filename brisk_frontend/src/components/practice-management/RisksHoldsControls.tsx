import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  AlertTriangle, Search, Plus, Shield, Lock, Eye,
  Edit, FileText, Clock, User, TrendingUp, CheckCircle
} from 'lucide-react'
import { practiceManagementApi, RiskRegister, PMHold } from '../../services/api'

const RisksHoldsControls: React.FC = () => {
  const [risks, setRisks] = useState<RiskRegister[]>([])
  const [holds, setHolds] = useState<PMHold[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'risks' | 'holds' | 'incidents'>('risks')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [risksData, holdsData] = await Promise.all([
          practiceManagementApi.getRisks(),
          practiceManagementApi.getHolds()
        ])
        setRisks(risksData)
        setHolds(holdsData)
      } catch (error) {
        console.error('Failed to fetch risks/holds data:', error)
        setRisks([
          { id: 1, client_name: 'ABC Manufacturing Ltd', risk_type: 'scope', description: 'Scope Creep Risk - Regular client communication and change order process', likelihood: 'medium', impact: 'medium', risk_score: 6, status: 'active', owner: 'John Smith', created_at: '2024-01-15T10:30:00Z' },
          { id: 2, client_name: 'XYZ Services Ltd', risk_type: 'regulatory', description: 'Regulatory Change Impact - Updated procedures and staff training completed', likelihood: 'high', impact: 'high', risk_score: 9, status: 'mitigated', owner: 'Sarah Johnson', created_at: '2024-01-10T14:20:00Z' },
          { id: 3, client_name: 'DEF Consulting', risk_type: 'operational', description: 'Key Person Dependency - Cross-training program initiated', likelihood: 'low', impact: 'medium', risk_score: 3, status: 'monitoring', owner: 'Mike Wilson', created_at: '2024-01-05T09:15:00Z' }
        ])
        setHolds([
          { id: 1, client_name: 'GHI Holdings', hold_type: 'kyc', reason: 'Pending enhanced due diligence completion', applied_by: 'MLRO Team', applied_at: '2024-01-12T10:30:00Z', is_active: true, affects_filing: true, affects_billing: false },
          { id: 2, client_name: 'JKL Services', hold_type: 'payment', reason: 'Outstanding invoice >90 days', applied_by: 'Billing Admin', applied_at: '2024-01-08T14:20:00Z', is_active: true, affects_filing: false, affects_billing: true }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Critical</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Active</Badge>
      case 'monitoring':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Monitoring</Badge>
      case 'mitigated':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Mitigated</Badge>
      case 'closed':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Closed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getHoldTypeBadge = (type: string) => {
    switch (type) {
      case 'kyc':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">KYC</Badge>
      case 'payment':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Payment</Badge>
      case 'legal':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Legal</Badge>
      case 'compliance':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Compliance</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Risks, Holds & Controls</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Risks, Holds & Controls</h1>
          <p className="text-gray-600 mt-1">Manage engagement risks, client holds and control frameworks</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Risk Register
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Risk
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {risks.filter(r => r.status === 'active').length}
            </div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              Requiring attention
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Holds</CardTitle>
            <Lock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {holds.filter(h => h.is_active).length}
            </div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              Blocking operations
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Risk Score</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">Low</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Overall assessment
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Mitigation Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">89%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Risks addressed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'risks', label: 'Risk Register', icon: AlertTriangle },
            { id: 'holds', label: 'Holds & Gates', icon: Lock },
            { id: 'incidents', label: 'Incident Log', icon: FileText }
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

      {/* Risks Tab */}
      {activeTab === 'risks' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Risk Register</CardTitle>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search risks..."
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
              {risks.map((risk) => (
                <div key={risk.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{risk.description.split(' - ')[0]}</h3>
                      {getSeverityBadge(risk.likelihood)}
                      {getStatusBadge(risk.status)}
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {risk.risk_type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {risk.client_name}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      <strong>Description:</strong> {risk.description.split(' - ')[1] || risk.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Owner: {risk.owner}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Created: {new Date(risk.created_at).toLocaleDateString()}
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
                    {risk.status === 'active' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mitigate
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Holds Tab */}
      {activeTab === 'holds' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Holds & Gates</CardTitle>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search holds..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <Lock className="h-4 w-4 mr-2" />
                  Apply Hold
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {holds.map((hold) => (
                <div key={hold.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{hold.hold_type.toUpperCase()} Hold</h3>
                      {getHoldTypeBadge(hold.hold_type)}
                      {!hold.is_active ? (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Released</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Active</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {hold.client_name}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      <strong>Reason:</strong> {hold.reason}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Applied by: {hold.applied_by}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Applied: {new Date(hold.applied_at).toLocaleDateString()}
                      </span>
                      {!hold.is_active && (
                        <span className="flex items-center">
                          Status: Released
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
                    {hold.is_active && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Release
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Incidents Tab */}
      {activeTab === 'incidents' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Incident Log</CardTitle>
            <CardDescription>Record and track incidents and near misses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No incidents recorded</h3>
              <p className="text-gray-600 mb-4">Track incidents and near misses for continuous improvement</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Log Incident
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Control Framework */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Control Framework</CardTitle>
            <CardDescription>Risk management controls and procedures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Client Acceptance</h4>
                  <p className="text-sm text-gray-600">KYC and risk assessment procedures</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Effective
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Engagement Management</h4>
                  <p className="text-sm text-gray-600">Scope and budget controls</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Effective
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Quality Assurance</h4>
                  <p className="text-sm text-gray-600">Review and approval processes</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Effective
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Data Protection</h4>
                  <p className="text-sm text-gray-600">Information security controls</p>
                </div>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Review Due
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Risk Trends</CardTitle>
            <CardDescription>Risk patterns and emerging issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">This Quarter</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>New risks identified</span>
                    <Badge variant="outline" className="text-xs">8</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Risks mitigated</span>
                    <Badge variant="outline" className="text-xs">12</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Incidents reported</span>
                    <Badge variant="outline" className="text-xs">2</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Controls tested</span>
                    <Badge variant="outline" className="text-xs">15</Badge>
                  </div>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Emerging Risks</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>• Regulatory changes in tax legislation</p>
                  <p>• Cybersecurity threats increasing</p>
                  <p>• Staff retention challenges</p>
                  <p>• Economic uncertainty impact</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RisksHoldsControls

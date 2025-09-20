import React, { useState, useEffect } from 'react'
import { AlertTriangle, TrendingUp, Users, Building, Search, Plus, Eye, Edit, CheckCircle, Clock } from 'lucide-react'
import { amlKycApi } from '../../services/api'

interface RiskAssessment {
  id: string
  clientName: string
  clientType: 'individual' | 'entity'
  assessmentDate: string
  nextReviewDate: string
  overallRiskScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'very_high'
  status: 'draft' | 'completed' | 'under_review' | 'approved'
  assessedBy: string
  approvedBy?: string
  factors: RiskFactor[]
}

interface RiskFactor {
  category: string
  factor: string
  score: number
  weight: number
  justification: string
}

interface RiskMatrix {
  category: string
  factors: {
    name: string
    lowRisk: string
    mediumRisk: string
    highRisk: string
    weight: number
  }[]
}

const RiskAssessment: React.FC = () => {
  const [assessments, setAssessments] = useState<RiskAssessment[]>([])
  const [riskMatrix, setRiskMatrix] = useState<RiskMatrix[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('assessments')
  const [searchTerm, setSearchTerm] = useState('')
  const [riskFilter, setRiskFilter] = useState<string>('all')

  useEffect(() => {
    fetchRiskData()
  }, [])

  const fetchRiskData = async () => {
    try {
      setLoading(true)
      const [assessmentsResponse, matrixResponse] = await Promise.all([
        amlKycApi.getRiskAssessments(),
        amlKycApi.getRiskMatrix()
      ])
      
      const transformedAssessments = (assessmentsResponse || []).map((assessment: any) => ({
        id: assessment.id?.toString() || '',
        clientName: `Client ${assessment.case_id || 'Unknown'}`,
        clientType: 'individual' as const,
        assessmentDate: assessment.assessment_date || new Date().toISOString().split('T')[0],
        nextReviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        overallRiskScore: assessment.client_risk_score || 0,
        riskLevel: assessment.overall_risk_level?.toLowerCase() || 'medium',
        status: 'completed' as const,
        assessedBy: 'System',
        factors: []
      }))
      
      setAssessments(transformedAssessments)
      setRiskMatrix(matrixResponse || [])
    } catch (error) {
      console.error('Error fetching risk data:', error)
      setAssessments([
        {
          id: '1',
          clientName: 'John Smith',
          clientType: 'individual',
          assessmentDate: '2024-09-01',
          nextReviewDate: '2025-09-01',
          overallRiskScore: 25,
          riskLevel: 'low',
          status: 'approved',
          assessedBy: 'Sarah Johnson',
          approvedBy: 'Michael Brown',
          factors: [
            { category: 'Geographic', factor: 'Country of Residence', score: 10, weight: 0.2, justification: 'UK resident - low risk jurisdiction' },
            { category: 'Product/Service', factor: 'Service Type', score: 15, weight: 0.3, justification: 'Standard accounting services' },
            { category: 'Customer', factor: 'Occupation', score: 20, weight: 0.25, justification: 'Teacher - low risk profession' },
            { category: 'Delivery', factor: 'Face to Face', score: 5, weight: 0.25, justification: 'In-person relationship' }
          ]
        },
        {
          id: '2',
          clientName: 'Global Trading Inc',
          clientType: 'entity',
          assessmentDate: '2024-09-10',
          nextReviewDate: '2025-03-10',
          overallRiskScore: 75,
          riskLevel: 'high',
          status: 'completed',
          assessedBy: 'David Wilson',
          factors: [
            { category: 'Geographic', factor: 'Jurisdiction', score: 80, weight: 0.2, justification: 'Operations in high-risk jurisdictions' },
            { category: 'Product/Service', factor: 'Business Type', score: 70, weight: 0.3, justification: 'International trading - higher risk' },
            { category: 'Customer', factor: 'Ownership Structure', score: 85, weight: 0.25, justification: 'Complex ownership structure' },
            { category: 'Delivery', factor: 'Remote Relationship', score: 60, weight: 0.25, justification: 'Limited face-to-face contact' }
          ]
        },
        {
          id: '3',
          clientName: 'Tech Innovations BV',
          clientType: 'entity',
          assessmentDate: '2024-09-15',
          nextReviewDate: '2025-09-15',
          overallRiskScore: 45,
          riskLevel: 'medium',
          status: 'under_review',
          assessedBy: 'Alice Brown',
          factors: [
            { category: 'Geographic', factor: 'Jurisdiction', score: 30, weight: 0.2, justification: 'Netherlands - medium risk' },
            { category: 'Product/Service', factor: 'Business Type', score: 50, weight: 0.3, justification: 'Technology sector' },
            { category: 'Customer', factor: 'Company Age', score: 40, weight: 0.25, justification: 'Established company' },
            { category: 'Delivery', factor: 'Relationship Type', score: 60, weight: 0.25, justification: 'Mixed delivery methods' }
          ]
        }
      ])
      setRiskMatrix([
        {
          category: 'Geographic Risk',
          factors: [
            {
              name: 'Country/Jurisdiction',
              lowRisk: 'UK, EU, US, Australia',
              mediumRisk: 'Other developed countries',
              highRisk: 'FATF blacklisted countries',
              weight: 0.2
            },
            {
              name: 'Sanctions Risk',
              lowRisk: 'No sanctions exposure',
              mediumRisk: 'Indirect sanctions exposure',
              highRisk: 'Direct sanctions exposure',
              weight: 0.15
            }
          ]
        },
        {
          category: 'Customer Risk',
          factors: [
            {
              name: 'Customer Type',
              lowRisk: 'Individual, SME',
              mediumRisk: 'Large corporation',
              highRisk: 'PEP, High net worth',
              weight: 0.25
            },
            {
              name: 'Business Sector',
              lowRisk: 'Professional services',
              mediumRisk: 'Manufacturing, retail',
              highRisk: 'MSB, gambling, crypto',
              weight: 0.2
            }
          ]
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-600" />
      case 'under_review': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'draft': return <Clock className="w-4 h-4 text-gray-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'under_review': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'very_high': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return 'text-green-600'
    if (score <= 50) return 'text-yellow-600'
    if (score <= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === 'all' || assessment.riskLevel === riskFilter
    return matchesSearch && matchesRisk
  })

  const totalAssessments = assessments.length
  const highRiskClients = assessments.filter(a => a.riskLevel === 'high' || a.riskLevel === 'very_high').length
  const pendingReviews = assessments.filter(a => a.status === 'under_review').length
  const averageRiskScore = assessments.length > 0 ? 
    Math.round(assessments.reduce((sum, a) => sum + a.overallRiskScore, 0) / assessments.length) : 0

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Risk Assessment & Scoring</h1>
          <p className="text-gray-600">Comprehensive risk evaluation and scoring framework</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                <p className="text-2xl font-bold text-gray-900">{totalAssessments}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk Clients</p>
                <p className="text-2xl font-bold text-red-600">{highRiskClients}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingReviews}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Risk Score</p>
                <p className={`text-2xl font-bold ${getRiskScoreColor(averageRiskScore)}`}>{averageRiskScore}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('assessments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'assessments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Risk Assessments
              </button>
              <button
                onClick={() => setActiveTab('matrix')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'matrix'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Risk Matrix
              </button>
              <button
                onClick={() => setActiveTab('scoring')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'scoring'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Scoring Framework
              </button>
            </nav>
          </div>

          {activeTab === 'assessments' && (
            <>
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <h2 className="text-lg font-semibold text-gray-900">Risk Assessments</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search assessments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={riskFilter}
                      onChange={(e) => setRiskFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Risk Levels</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="very_high">Very High</option>
                    </select>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>New Assessment</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading assessments...</p>
                    </div>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Review</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessed By</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAssessments.map((assessment) => (
                        <tr key={assessment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {assessment.clientType === 'individual' ? (
                                <Users className="w-5 h-5 text-gray-400 mr-3" />
                              ) : (
                                <Building className="w-5 h-5 text-gray-400 mr-3" />
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">{assessment.clientName}</div>
                                <div className="text-sm text-gray-500 capitalize">{assessment.clientType}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    assessment.overallRiskScore <= 30 ? 'bg-green-600' :
                                    assessment.overallRiskScore <= 50 ? 'bg-yellow-600' :
                                    assessment.overallRiskScore <= 70 ? 'bg-orange-600' : 'bg-red-600'
                                  }`}
                                  style={{
                                    width: `${assessment.overallRiskScore}%`
                                  }}
                                ></div>
                              </div>
                              <span className={`text-sm font-medium ${getRiskScoreColor(assessment.overallRiskScore)}`}>
                                {assessment.overallRiskScore}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(assessment.riskLevel)}`}>
                              {assessment.riskLevel.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(assessment.status)}
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assessment.status)}`}>
                                {assessment.status.replace('_', ' ')}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(assessment.assessmentDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(assessment.nextReviewDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {assessment.assessedBy}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {activeTab === 'matrix' && (
            <div className="p-6">
              <div className="space-y-8">
                {riskMatrix.map((category, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{category.category}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-4 font-medium text-gray-900">Factor</th>
                            <th className="text-left py-2 px-4 font-medium text-green-700">Low Risk</th>
                            <th className="text-left py-2 px-4 font-medium text-yellow-700">Medium Risk</th>
                            <th className="text-left py-2 px-4 font-medium text-red-700">High Risk</th>
                            <th className="text-left py-2 px-4 font-medium text-gray-900">Weight</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.factors.map((factor, factorIndex) => (
                            <tr key={factorIndex} className="border-b border-gray-100">
                              <td className="py-3 px-4 font-medium text-gray-900">{factor.name}</td>
                              <td className="py-3 px-4 text-sm text-gray-600">{factor.lowRisk}</td>
                              <td className="py-3 px-4 text-sm text-gray-600">{factor.mediumRisk}</td>
                              <td className="py-3 px-4 text-sm text-gray-600">{factor.highRisk}</td>
                              <td className="py-3 px-4 text-sm text-gray-900">{(factor.weight * 100).toFixed(0)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'scoring' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Score Bands</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
                      <span className="font-medium text-green-800">Low Risk</span>
                      <span className="text-green-700">0 - 30</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-lg">
                      <span className="font-medium text-yellow-800">Medium Risk</span>
                      <span className="text-yellow-700">31 - 50</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-100 rounded-lg">
                      <span className="font-medium text-orange-800">High Risk</span>
                      <span className="text-orange-700">51 - 70</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                      <span className="font-medium text-red-800">Very High Risk</span>
                      <span className="text-red-700">71 - 100</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Review Frequencies</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Low Risk:</span>
                      <span className="font-medium">Annual review</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medium Risk:</span>
                      <span className="font-medium">Bi-annual review</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">High Risk:</span>
                      <span className="font-medium">Quarterly review</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Very High Risk:</span>
                      <span className="font-medium">Monthly review</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RiskAssessment

import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Users, AlertTriangle, Download, Calendar, Eye } from 'lucide-react'
import { amlKycApi } from '../../services/api'

interface ReportData {
  id: string
  name: string
  type: 'compliance' | 'risk' | 'operational' | 'regulatory'
  description: string
  lastGenerated: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual'
  status: 'ready' | 'generating' | 'error'
  size?: string
}

interface AnalyticsData {
  totalCases: number
  activeCases: number
  highRiskClients: number
  completedScreenings: number
  averageProcessingTime: number
  complianceScore: number
  monthlyTrends: {
    month: string
    cases: number
    screenings: number
    alerts: number
  }[]
}

const AMLReports: React.FC = () => {
  const [reports, setReports] = useState<ReportData[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [dateRange, setDateRange] = useState('30')

  useEffect(() => {
    fetchReportsData()
  }, [])

  const fetchReportsData = async () => {
    try {
      setLoading(true)
      const response = await amlKycApi.getDashboardStats()
      setAnalytics(response.data || null)
    } catch (error) {
      console.error('Error fetching reports data:', error)
      setAnalytics({
        totalCases: 1247,
        activeCases: 89,
        highRiskClients: 23,
        completedScreenings: 2156,
        averageProcessingTime: 2.4,
        complianceScore: 94,
        monthlyTrends: [
          { month: 'Jan', cases: 98, screenings: 156, alerts: 12 },
          { month: 'Feb', cases: 112, screenings: 178, alerts: 8 },
          { month: 'Mar', cases: 89, screenings: 134, alerts: 15 },
          { month: 'Apr', cases: 134, screenings: 201, alerts: 6 },
          { month: 'May', cases: 156, screenings: 234, alerts: 11 },
          { month: 'Jun', cases: 123, screenings: 189, alerts: 9 }
        ]
      })
      setReports([
        {
          id: '1',
          name: 'Monthly Compliance Report',
          type: 'compliance',
          description: 'Comprehensive monthly compliance overview',
          lastGenerated: '2024-09-01T09:00:00Z',
          frequency: 'monthly',
          status: 'ready',
          size: '2.4 MB'
        },
        {
          id: '2',
          name: 'Risk Assessment Summary',
          type: 'risk',
          description: 'Summary of all risk assessments and scores',
          lastGenerated: '2024-09-20T08:30:00Z',
          frequency: 'weekly',
          status: 'ready',
          size: '1.8 MB'
        },
        {
          id: '3',
          name: 'Screening Activity Report',
          type: 'operational',
          description: 'Detailed screening activity and results',
          lastGenerated: '2024-09-20T07:15:00Z',
          frequency: 'daily',
          status: 'ready',
          size: '956 KB'
        },
        {
          id: '4',
          name: 'Regulatory Filing Report',
          type: 'regulatory',
          description: 'SAR/STR filings and regulatory submissions',
          lastGenerated: '2024-09-15T14:20:00Z',
          frequency: 'quarterly',
          status: 'generating'
        },
        {
          id: '5',
          name: 'Client Onboarding Analytics',
          type: 'operational',
          description: 'KYC completion rates and processing times',
          lastGenerated: '2024-09-19T16:45:00Z',
          frequency: 'weekly',
          status: 'ready',
          size: '1.2 MB'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800'
      case 'generating': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'compliance': return 'bg-blue-100 text-blue-800'
      case 'risk': return 'bg-red-100 text-red-800'
      case 'operational': return 'bg-green-100 text-green-800'
      case 'regulatory': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & MI</h1>
          <p className="text-gray-600">Management information and regulatory reporting</p>
        </div>

        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Cases</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalCases.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Cases</p>
                  <p className="text-2xl font-bold text-orange-600">{analytics.activeCases}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Risk Clients</p>
                  <p className="text-2xl font-bold text-red-600">{analytics.highRiskClients}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                  <p className="text-2xl font-bold text-green-600">{analytics.complianceScore}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analytics Dashboard
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reports'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Standard Reports
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'custom'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Custom Reports
              </button>
            </nav>
          </div>

          {activeTab === 'dashboard' && analytics && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Trends</h3>
                  <div className="space-y-4">
                    {analytics.monthlyTrends.map((trend, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">{trend.month}</span>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-blue-600">{trend.cases} cases</span>
                          <span className="text-green-600">{trend.screenings} screenings</span>
                          <span className="text-red-600">{trend.alerts} alerts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Avg Processing Time</span>
                      <span className="text-sm font-bold text-gray-900">{analytics.averageProcessingTime} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Completed Screenings</span>
                      <span className="text-sm font-bold text-gray-900">{analytics.completedScreenings.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Compliance Score</span>
                      <span className="text-sm font-bold text-green-600">{analytics.complianceScore}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <>
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <h2 className="text-lg font-semibold text-gray-900">Standard Reports</h2>
                  <div className="flex items-center space-x-4">
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="7">Last 7 days</option>
                      <option value="30">Last 30 days</option>
                      <option value="90">Last 90 days</option>
                      <option value="365">Last year</option>
                    </select>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Schedule Report</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading reports...</p>
                    </div>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Generated</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{report.name}</div>
                              <div className="text-sm text-gray-500">{report.description}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(report.type)}`}>
                              {report.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                            {report.frequency}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(report.lastGenerated).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.size || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              {report.status === 'ready' && (
                                <button className="text-green-600 hover:text-green-900">
                                  <Download className="w-4 h-4" />
                                </button>
                              )}
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

          {activeTab === 'custom' && (
            <div className="p-6">
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Custom Report Builder</h3>
                <p className="text-gray-600 mb-6">Create custom reports with specific metrics and filters</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                  Build Custom Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AMLReports

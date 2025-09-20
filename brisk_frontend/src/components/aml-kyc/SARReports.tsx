import React, { useState, useEffect } from 'react'
import { FileText, Search, Plus, Send, Eye, Edit, Clock, CheckCircle, XCircle } from 'lucide-react'
import { amlKycApi } from '../../services/api'

interface SARReport {
  id: string
  reportNumber: string
  clientName: string
  reportType: 'SAR' | 'STR' | 'Internal'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'draft' | 'pending_review' | 'submitted' | 'acknowledged' | 'rejected'
  createdDate: string
  submittedDate?: string
  acknowledgedDate?: string
  createdBy: string
  reviewedBy?: string
  suspiciousActivity: string
  amount?: number
  currency?: string
  regulatoryBody?: string
}

interface InternalReport {
  id: string
  title: string
  type: 'monthly_summary' | 'quarterly_review' | 'annual_report' | 'incident_report' | 'training_report'
  status: 'draft' | 'completed' | 'distributed'
  createdDate: string
  completedDate?: string
  createdBy: string
  recipients: string[]
  summary: string
}

const SARReports: React.FC = () => {
  const [sarReports, setSarReports] = useState<SARReport[]>([])
  const [internalReports, setInternalReports] = useState<InternalReport[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('sar')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      setLoading(true)
      const [sarResponse, internalResponse] = await Promise.all([
        amlKycApi.getSARReports(),
        amlKycApi.getInternalReports()
      ])
      
      const transformedSARReports = (sarResponse || []).map((report: any) => ({
        id: report.id?.toString() || '',
        reportNumber: `SAR-${report.id || '001'}`,
        clientName: `Client ${report.case_id || 'Unknown'}`,
        reportType: report.report_type || 'SAR',
        priority: 'medium' as const,
        status: report.filing_status || 'draft',
        createdDate: report.filed_at || new Date().toISOString().split('T')[0],
        createdBy: 'System',
        suspiciousActivity: 'Suspicious transaction pattern detected',
        amount: 10000,
        currency: 'GBP',
        regulatoryBody: report.jurisdiction || 'FCA'
      }))
      
      setSarReports(transformedSARReports)
      setInternalReports(internalResponse || [])
    } catch (error) {
      console.error('Error fetching reports:', error)
      setSarReports([
        {
          id: '1',
          reportNumber: 'SAR-2024-001',
          clientName: 'John Smith',
          reportType: 'SAR',
          priority: 'high',
          status: 'submitted',
          createdDate: '2024-09-01',
          submittedDate: '2024-09-05',
          createdBy: 'Sarah Johnson',
          reviewedBy: 'Michael Brown',
          suspiciousActivity: 'Unusual large cash deposits',
          amount: 50000,
          currency: 'GBP',
          regulatoryBody: 'NCA'
        },
        {
          id: '2',
          reportNumber: 'STR-2024-002',
          clientName: 'Global Corp Ltd',
          reportType: 'STR',
          priority: 'medium',
          status: 'pending_review',
          createdDate: '2024-09-10',
          createdBy: 'David Wilson',
          suspiciousActivity: 'Complex transaction structure',
          amount: 100000,
          currency: 'USD',
          regulatoryBody: 'FCA'
        },
        {
          id: '3',
          reportNumber: 'INT-2024-003',
          clientName: 'Tech Innovations',
          reportType: 'Internal',
          priority: 'low',
          status: 'draft',
          createdDate: '2024-09-15',
          createdBy: 'Alice Brown',
          suspiciousActivity: 'Potential sanctions match'
        }
      ])
      setInternalReports([
        {
          id: '1',
          title: 'Monthly AML Summary - September 2024',
          type: 'monthly_summary',
          status: 'completed',
          createdDate: '2024-09-01',
          completedDate: '2024-09-30',
          createdBy: 'Sarah Johnson',
          recipients: ['MLRO', 'Board', 'Compliance Team'],
          summary: 'Monthly summary of AML activities and compliance metrics'
        },
        {
          id: '2',
          title: 'Q3 2024 Compliance Review',
          type: 'quarterly_review',
          status: 'draft',
          createdDate: '2024-09-15',
          createdBy: 'Michael Brown',
          recipients: ['Board', 'Senior Management'],
          summary: 'Quarterly review of compliance framework and effectiveness'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'acknowledged': return <CheckCircle className="w-4 h-4 text-blue-600" />
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending_review': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'draft': return <Clock className="w-4 h-4 text-gray-600" />
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-800'
      case 'acknowledged': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending_review': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'distributed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'SAR': return 'bg-red-100 text-red-800'
      case 'STR': return 'bg-orange-100 text-orange-800'
      case 'Internal': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredSARReports = sarReports.filter(report => {
    const matchesSearch = report.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredInternalReports = internalReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalSARReports = sarReports.length
  const submittedReports = sarReports.filter(r => r.status === 'submitted').length
  const pendingReports = sarReports.filter(r => r.status === 'pending_review').length
  const draftReports = sarReports.filter(r => r.status === 'draft').length

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SAR/STR & Internal Reports</h1>
          <p className="text-gray-600">Suspicious activity reporting and internal compliance reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{totalSARReports}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="text-2xl font-bold text-green-600">{submittedReports}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingReports}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-600">{draftReports}</p>
              </div>
              <Edit className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('sar')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'sar'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                SAR/STR Reports
              </button>
              <button
                onClick={() => setActiveTab('internal')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'internal'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Internal Reports
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'templates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Templates
              </button>
            </nav>
          </div>

          {activeTab === 'sar' && (
            <>
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <h2 className="text-lg font-semibold text-gray-900">SAR/STR Reports</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="draft">Draft</option>
                      <option value="pending_review">Pending Review</option>
                      <option value="submitted">Submitted</option>
                      <option value="acknowledged">Acknowledged</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>New Report</span>
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSARReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{report.reportNumber}</div>
                              <div className="text-sm text-gray-500">{report.suspiciousActivity}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.clientName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(report.reportType)}`}>
                              {report.reportType}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(report.priority)}`}>
                              {report.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(report.status)}
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                                {report.status.replace('_', ' ')}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.amount ? `${report.currency} ${report.amount.toLocaleString()}` : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(report.createdDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              {report.status === 'pending_review' && (
                                <button className="text-green-600 hover:text-green-900">
                                  <Send className="w-4 h-4" />
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

          {activeTab === 'internal' && (
            <>
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <h2 className="text-lg font-semibold text-gray-900">Internal Reports</h2>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>New Internal Report</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInternalReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.title}</div>
                            <div className="text-sm text-gray-500">{report.summary}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {report.type.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(report.status)}
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(report.createdDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.recipients.join(', ')}
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
              </div>
            </>
          )}

          {activeTab === 'templates' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">SAR Template</h3>
                  <p className="text-gray-600 mb-4">Standard template for Suspicious Activity Reports</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Use Template
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">STR Template</h3>
                  <p className="text-gray-600 mb-4">Standard template for Suspicious Transaction Reports</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Use Template
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Summary Template</h3>
                  <p className="text-gray-600 mb-4">Template for monthly compliance summaries</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Use Template
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quarterly Review Template</h3>
                  <p className="text-gray-600 mb-4">Template for quarterly compliance reviews</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SARReports

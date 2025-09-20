import React, { useState, useEffect } from 'react'
import { Database, FileText, Upload, Search, Eye, Download, Trash2, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import { amlKycApi } from '../../services/api'

interface AMLDocument {
  id: string
  fileName: string
  clientName: string
  documentType: 'identity' | 'address' | 'source_of_funds' | 'source_of_wealth' | 'kyc_form' | 'due_diligence' | 'sanctions_check' | 'other'
  category: 'individual' | 'entity' | 'transaction' | 'compliance'
  status: 'pending_review' | 'approved' | 'rejected' | 'expired'
  uploadedDate: string
  expiryDate?: string
  uploadedBy: string
  reviewedBy?: string
  fileSize: number
  fileType: string
  tags: string[]
}

const AMLDocumentHub: React.FC = () => {
  const [documents, setDocuments] = useState<AMLDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [activeTab, setActiveTab] = useState('documents')

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const response = await amlKycApi.getAMLDocuments()
      setDocuments(response.data || [])
    } catch (error) {
      console.error('Error fetching AML documents:', error)
      setDocuments([
        {
          id: '1',
          fileName: 'passport_john_smith.pdf',
          clientName: 'John Smith',
          documentType: 'identity',
          category: 'individual',
          status: 'approved',
          uploadedDate: '2024-09-01',
          expiryDate: '2029-09-01',
          uploadedBy: 'Sarah Johnson',
          reviewedBy: 'Michael Brown',
          fileSize: 2048576,
          fileType: 'PDF',
          tags: ['passport', 'identity', 'primary']
        },
        {
          id: '2',
          fileName: 'utility_bill_acme_corp.pdf',
          clientName: 'Acme Corporation Ltd',
          documentType: 'address',
          category: 'entity',
          status: 'pending_review',
          uploadedDate: '2024-09-15',
          expiryDate: '2024-12-15',
          uploadedBy: 'David Wilson',
          fileSize: 1024768,
          fileType: 'PDF',
          tags: ['address', 'utility', 'verification']
        },
        {
          id: '3',
          fileName: 'bank_statement_global_trading.pdf',
          clientName: 'Global Trading Inc',
          documentType: 'source_of_funds',
          category: 'entity',
          status: 'approved',
          uploadedDate: '2024-09-10',
          uploadedBy: 'Alice Brown',
          reviewedBy: 'Sarah Johnson',
          fileSize: 3145728,
          fileType: 'PDF',
          tags: ['bank_statement', 'source_of_funds', 'financial']
        },
        {
          id: '4',
          fileName: 'sanctions_check_tech_innovations.pdf',
          clientName: 'Tech Innovations BV',
          documentType: 'sanctions_check',
          category: 'compliance',
          status: 'expired',
          uploadedDate: '2024-06-01',
          expiryDate: '2024-09-01',
          uploadedBy: 'Michael Brown',
          reviewedBy: 'David Wilson',
          fileSize: 512000,
          fileType: 'PDF',
          tags: ['sanctions', 'screening', 'compliance']
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending_review': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'rejected': return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'expired': return <AlertTriangle className="w-4 h-4 text-orange-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending_review': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'expired': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'identity': return 'bg-blue-100 text-blue-800'
      case 'address': return 'bg-green-100 text-green-800'
      case 'source_of_funds': return 'bg-purple-100 text-purple-800'
      case 'source_of_wealth': return 'bg-indigo-100 text-indigo-800'
      case 'kyc_form': return 'bg-yellow-100 text-yellow-800'
      case 'due_diligence': return 'bg-red-100 text-red-800'
      case 'sanctions_check': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const today = new Date()
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === 'all' || doc.documentType === typeFilter
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const totalDocuments = documents.length
  const pendingReview = documents.filter(d => d.status === 'pending_review').length
  const expiredDocuments = documents.filter(d => d.status === 'expired').length
  const expiringSoon = documents.filter(d => isExpiringSoon(d.expiryDate)).length

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Hub</h1>
          <p className="text-gray-600">AML/KYC document management and storage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{totalDocuments}</p>
              </div>
              <Database className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingReview}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-orange-600">{expiringSoon}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600">{expiredDocuments}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'documents'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Documents
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'upload'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upload
              </button>
              <button
                onClick={() => setActiveTab('retention')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'retention'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Retention Policy
              </button>
            </nav>
          </div>

          {activeTab === 'documents' && (
            <>
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <h2 className="text-lg font-semibold text-gray-900">Document Library</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="identity">Identity</option>
                      <option value="address">Address</option>
                      <option value="source_of_funds">Source of Funds</option>
                      <option value="source_of_wealth">Source of Wealth</option>
                      <option value="kyc_form">KYC Form</option>
                      <option value="due_diligence">Due Diligence</option>
                      <option value="sanctions_check">Sanctions Check</option>
                      <option value="other">Other</option>
                    </select>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="pending_review">Pending Review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading documents...</p>
                    </div>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDocuments.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 text-gray-400 mr-3" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{doc.fileName}</div>
                                <div className="text-sm text-gray-500">{doc.fileType}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {doc.clientName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(doc.documentType)}`}>
                              {doc.documentType.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(doc.status)}
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                                {doc.status.replace('_', ' ')}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(doc.uploadedDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {doc.expiryDate ? (
                              <span className={isExpiringSoon(doc.expiryDate) ? 'text-orange-600 font-medium' : ''}>
                                {new Date(doc.expiryDate).toLocaleDateString()}
                              </span>
                            ) : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatFileSize(doc.fileSize)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <Download className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
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

          {activeTab === 'upload' && (
            <div className="p-6">
              <div className="max-w-2xl mx-auto">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload AML/KYC Documents</h3>
                  <p className="text-gray-600 mb-4">Drag and drop files here, or click to select files</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                    Select Files
                  </button>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Supported file types:</h4>
                  <p className="text-sm text-gray-600">PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'retention' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Document Retention Periods</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Identity Documents:</span>
                      <span className="font-medium">5 years after relationship ends</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Address Verification:</span>
                      <span className="font-medium">5 years after relationship ends</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Source of Funds:</span>
                      <span className="font-medium">5 years after relationship ends</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Diligence Records:</span>
                      <span className="font-medium">5 years after relationship ends</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction Records:</span>
                      <span className="font-medium">5 years after transaction</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Automatic Actions</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Expiry notifications (30 days before)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Automatic archival after retention period</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Secure deletion after legal hold release</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Audit trail for all document actions</span>
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

export default AMLDocumentHub

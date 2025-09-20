import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  FileText, Search, Upload, Eye, Edit, Download,
  Folder, Clock, User, TrendingUp, CheckCircle
} from 'lucide-react'

const PMDocumentHub: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const documents = [
    { id: 1, name: 'ABC Ltd - Year-end Accounts 2023', type: 'accounts', client: 'ABC Manufacturing Ltd', status: 'final', size: '2.4 MB', last_modified: '2024-01-20T10:30:00Z', created_by: 'John Smith' },
    { id: 2, name: 'VAT Return Q4 2023 - DEF Ltd', type: 'tax', client: 'DEF Services Ltd', status: 'draft', size: '156 KB', last_modified: '2024-01-19T14:20:00Z', created_by: 'Sarah Johnson' },
    { id: 3, name: 'Payroll Summary December 2023', type: 'payroll', client: 'GHI Corp', status: 'approved', size: '890 KB', last_modified: '2024-01-18T09:15:00Z', created_by: 'Mike Wilson' },
    { id: 4, name: 'Engagement Letter - JKL Holdings', type: 'engagement', client: 'JKL Holdings', status: 'signed', size: '245 KB', last_modified: '2024-01-17T16:30:00Z', created_by: 'Emma Davis' },
    { id: 5, name: 'Management Accounts Nov 2023', type: 'management', client: 'MNO Enterprises', status: 'review', size: '1.8 MB', last_modified: '2024-01-16T11:45:00Z', created_by: 'John Smith' },
    { id: 6, name: 'Corporation Tax Computation 2023', type: 'tax', client: 'PQR Limited', status: 'filed', size: '567 KB', last_modified: '2024-01-15T08:20:00Z', created_by: 'Sarah Johnson' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || doc.type === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Draft</Badge>
      case 'review':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Under Review</Badge>
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
      case 'final':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Final</Badge>
      case 'signed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Signed
        </Badge>
      case 'filed':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Filed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      accounts: 'bg-blue-50 text-blue-700 border-blue-200',
      tax: 'bg-orange-50 text-orange-700 border-orange-200',
      payroll: 'bg-purple-50 text-purple-700 border-purple-200',
      engagement: 'bg-green-50 text-green-700 border-green-200',
      management: 'bg-pink-50 text-pink-700 border-pink-200'
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
          <h1 className="text-3xl font-bold text-gray-900">Document Hub</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Document Hub</h1>
          <p className="text-gray-600 mt-1">Manage client documents, working papers and deliverables</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Folder className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{documents.length}</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              Across all clients
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {documents.filter(d => d.status === 'review' || d.status === 'draft').length}
            </div>
            <p className="text-xs text-yellow-600 flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              Awaiting action
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Storage Used</CardTitle>
            <Folder className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">6.2 GB</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              of 50 GB limit
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {documents.filter(d => d.status === 'final' || d.status === 'signed' || d.status === 'filed').length}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Documents</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search documents..."
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
                <option value="all">All Types</option>
                <option value="accounts">Accounts</option>
                <option value="tax">Tax</option>
                <option value="payroll">Payroll</option>
                <option value="engagement">Engagement</option>
                <option value="management">Management</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="font-medium text-gray-900">{document.name}</h3>
                      <p className="text-sm text-gray-600">{document.client}</p>
                    </div>
                    {getStatusBadge(document.status)}
                    {getTypeBadge(document.type)}
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 ml-8">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {document.created_by}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Modified: {new Date(document.last_modified).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      Size: {document.size}
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
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-4">Upload your first document to get started</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            <CardDescription>Common document operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Create Working Papers</h4>
                  <p className="text-sm text-gray-600">Generate structured workpaper templates</p>
                </div>
                <Button variant="outline" size="sm">
                  Create
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Generate Report Pack</h4>
                  <p className="text-sm text-gray-600">Compile client deliverables</p>
                </div>
                <Button variant="outline" size="sm">
                  Generate
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Request Client Documents</h4>
                  <p className="text-sm text-gray-600">Send document request via portal</p>
                </div>
                <Button variant="outline" size="sm">
                  Request
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Archive Completed Job</h4>
                  <p className="text-sm text-gray-600">Move documents to long-term storage</p>
                </div>
                <Button variant="outline" size="sm">
                  Archive
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <CardDescription>Latest document changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Year-end Accounts Finalized</p>
                  <p className="text-xs text-gray-600">ABC Manufacturing Ltd</p>
                  <p className="text-xs text-gray-500">2 hours ago by John Smith</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Engagement Letter Signed</p>
                  <p className="text-xs text-gray-600">JKL Holdings</p>
                  <p className="text-xs text-gray-500">4 hours ago by Emma Davis</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Upload className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">VAT Return Uploaded</p>
                  <p className="text-xs text-gray-600">DEF Services Ltd</p>
                  <p className="text-xs text-gray-500">6 hours ago by Sarah Johnson</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Eye className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Management Accounts Reviewed</p>
                  <p className="text-xs text-gray-600">MNO Enterprises</p>
                  <p className="text-xs text-gray-500">8 hours ago by Mike Wilson</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PMDocumentHub

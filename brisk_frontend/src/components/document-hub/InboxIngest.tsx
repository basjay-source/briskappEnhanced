import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  Inbox, Mail, Upload, Smartphone, FolderOpen, Settings,
  FileText, AlertTriangle, CheckCircle, Clock, Filter
} from 'lucide-react'

const InboxIngest: React.FC = () => {
  const [inboxItems, setInboxItems] = useState<any[]>([])
  const [importRules, setImportRules] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setInboxItems([
          {
            id: 1,
            filename: "Invoice_ABC_Corp_2024.pdf",
            source: "email",
            sender: "accounts@abccorp.com",
            size: "245 KB",
            status: "pending",
            received_at: "2024-09-20T10:30:00Z",
            auto_route: "Purchases"
          },
          {
            id: 2,
            filename: "Bank_Statement_Sep_2024.pdf",
            source: "portal",
            sender: "client@briskaccountants.com",
            size: "1.2 MB",
            status: "processing",
            received_at: "2024-09-20T09:15:00Z",
            auto_route: "Bank Reconciliation"
          },
          {
            id: 3,
            filename: "P60_Employee_001.pdf",
            source: "mobile",
            sender: "Mobile Scanner",
            size: "180 KB",
            status: "completed",
            received_at: "2024-09-20T08:45:00Z",
            auto_route: "Payroll"
          }
        ])

        setImportRules([
          {
            id: 1,
            name: "Invoice Auto-Route",
            pattern: "invoice|bill",
            destination: "Purchases",
            is_active: true
          },
          {
            id: 2,
            name: "P60 Classification",
            pattern: "p60|p11d",
            destination: "Payroll",
            is_active: true
          },
          {
            id: 3,
            name: "Bank Statement Route",
            pattern: "bank.*statement",
            destination: "Bank Reconciliation",
            is_active: true
          }
        ])
      } catch (error) {
        console.error('Failed to fetch inbox data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'processing':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Processing</Badge>
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'email':
        return <Mail className="h-4 w-4" />
      case 'portal':
        return <Upload className="h-4 w-4" />
      case 'mobile':
        return <Smartphone className="h-4 w-4" />
      case 'watch_folder':
        return <FolderOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inbox & Ingest</h1>
        <p className="text-gray-600 mt-2">Manage incoming documents from email, portal, mobile, and watch folders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inbox</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{inboxItems.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Inbox className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {inboxItems.filter(item => item.status === 'processing').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {inboxItems.filter(item => item.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {inboxItems.filter(item => item.status === 'failed').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inbox Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Inbox Items</CardTitle>
              <CardDescription>Documents awaiting processing and routing</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Input placeholder="Search documents..." className="w-64" />
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inboxItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-gray-100">
                    {getSourceIcon(item.source)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{item.filename}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">From: {item.sender}</span>
                      <span className="text-sm text-gray-500">Size: {item.size}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(item.received_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Auto-route: {item.auto_route}</p>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Process</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Import Rules */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Import Rules
              </CardTitle>
              <CardDescription>Automatic routing and classification rules</CardDescription>
            </div>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {importRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{rule.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">Pattern: {rule.pattern}</span>
                    <span className="text-sm text-gray-500">→ {rule.destination}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={rule.is_active ? "default" : "secondary"} 
                         className={rule.is_active ? "bg-green-100 text-green-800" : ""}>
                    {rule.is_active ? "Active" : "Inactive"}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">
                      {rule.is_active ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ingest Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full bg-blue-100 mx-auto w-fit mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Email Drop</h3>
            <p className="text-sm text-gray-600 mb-4">docs@briskaccountants.com</p>
            <Button variant="outline" size="sm">Configure</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full bg-green-100 mx-auto w-fit mb-4">
              <Upload className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Portal Uploads</h3>
            <p className="text-sm text-gray-600 mb-4">Client portal integration</p>
            <Button variant="outline" size="sm">Configure</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full bg-orange-100 mx-auto w-fit mb-4">
              <Smartphone className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Mobile Scan</h3>
            <p className="text-sm text-gray-600 mb-4">Mobile app integration</p>
            <Button variant="outline" size="sm">Configure</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full bg-purple-100 mx-auto w-fit mb-4">
              <FolderOpen className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Watch Folders</h3>
            <p className="text-sm text-gray-600 mb-4">Cloud storage sync</p>
            <Button variant="outline" size="sm">Configure</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default InboxIngest

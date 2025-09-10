import { 
  FileSignature, 
  Send, 
  Users, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Upload,
  Plus,
  Filter,
  Search,
  FileText,
  Shield,
  History,
  Settings,
  Mail
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout from '@/components/ResponsiveLayout'

export default function ESignature() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedStatus, setSelectedStatus] = useState('')

  const kpis = [
    {
      title: 'Active Envelopes',
      value: '12',
      change: '+3 this week',
      icon: FileSignature,
      color: 'text-blue-600'
    },
    {
      title: 'Pending Signatures',
      value: '8',
      change: 'Awaiting response',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Completed (MTD)',
      value: '45',
      change: '+25% vs last month',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Avg. Completion',
      value: '2.3 days',
      change: '-20% faster',
      icon: Users,
      color: 'text-purple-600'
    }
  ]

  const envelopes = [
    {
      id: 'ENV001',
      title: 'Annual Accounts - TechCorp Ltd',
      status: 'Pending Signatures',
      created: '2024-01-20',
      dueDate: '2024-01-27',
      signers: 3,
      completed: 1,
      documents: ['Annual Accounts.pdf', 'Directors Report.pdf'],
      creator: 'Sarah Johnson'
    },
    {
      id: 'ENV002',
      title: 'Employment Contract - John Smith',
      status: 'Completed',
      created: '2024-01-18',
      dueDate: '2024-01-25',
      signers: 2,
      completed: 2,
      documents: ['Employment Contract.pdf'],
      creator: 'Mike Chen'
    },
    {
      id: 'ENV003',
      title: 'Service Agreement - ABC Services',
      status: 'Draft',
      created: '2024-01-19',
      dueDate: '2024-01-26',
      signers: 4,
      completed: 0,
      documents: ['Service Agreement.pdf', 'Terms & Conditions.pdf'],
      creator: 'Emma Wilson'
    }
  ]

  const signingRequests = [
    {
      id: 'SR001',
      envelope: 'Annual Accounts - TechCorp Ltd',
      signer: 'John Smith (Director)',
      email: 'john.smith@techcorp.com',
      status: 'Sent',
      sentDate: '2024-01-20',
      reminderCount: 1,
      position: 'Director Signature'
    },
    {
      id: 'SR002',
      envelope: 'Annual Accounts - TechCorp Ltd',
      signer: 'Jane Doe (Secretary)',
      email: 'jane.doe@techcorp.com',
      status: 'Pending',
      sentDate: '2024-01-20',
      reminderCount: 0,
      position: 'Company Secretary'
    },
    {
      id: 'SR003',
      envelope: 'Service Agreement - ABC Services',
      signer: 'Robert Brown (CEO)',
      email: 'robert@abcservices.com',
      status: 'Viewed',
      sentDate: '2024-01-19',
      reminderCount: 2,
      position: 'CEO Signature'
    }
  ]

  const templates = [
    {
      id: 'TPL001',
      name: 'Annual Accounts Package',
      description: 'Standard annual accounts with director signatures',
      fields: ['Director Signature', 'Company Secretary', 'Date'],
      usage: 45,
      lastUsed: '2024-01-20'
    },
    {
      id: 'TPL002',
      name: 'Employment Contract',
      description: 'New employee contract template',
      fields: ['Employee Signature', 'HR Manager', 'Start Date'],
      usage: 23,
      lastUsed: '2024-01-18'
    },
    {
      id: 'TPL003',
      name: 'Service Agreement',
      description: 'Client service agreement template',
      fields: ['Client Signature', 'Account Manager', 'Service Date'],
      usage: 12,
      lastUsed: '2024-01-15'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'Pending Signatures':
      case 'Sent':
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'Draft':
        return <Edit className="h-4 w-4 text-gray-500" />
      case 'Viewed':
        return <Eye className="h-4 w-4 text-blue-500" />
      case 'Overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <FileSignature className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-50'
      case 'Pending Signatures':
      case 'Sent':
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'Draft':
        return 'text-gray-600 bg-gray-50'
      case 'Viewed':
        return 'text-blue-600 bg-blue-50'
      case 'Overdue':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <ResponsiveLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">e-Signature</h1>
            <p className="text-gray-600">Digital signing workflows & document management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size={isMobile ? "sm" : "default"}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size={isMobile ? "sm" : "default"}>
              <Plus className="h-4 w-4 mr-2" />
              Create Envelope
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="envelopes">Envelopes</TabsTrigger>
            <TabsTrigger value="signing">Signing Requests</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              {kpis.map((kpi, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                        <p className="text-2xl font-bold">{kpi.value}</p>
                        <p className="text-xs text-gray-500">{kpi.change}</p>
                      </div>
                      <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Envelopes</CardTitle>
                  <CardDescription>Latest signing workflows</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {envelopes.slice(0, 3).map((envelope) => (
                      <div key={envelope.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{envelope.title}</p>
                            <Badge className={getStatusColor(envelope.status)}>
                              {envelope.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {envelope.completed}/{envelope.signers} signatures | Due: {envelope.dueDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(envelope.status)}
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Signing Activity</CardTitle>
                  <CardDescription>Recent signature requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Pending Signatures</span>
                      <Badge variant="destructive">8 Urgent</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Completed Today</span>
                      <Badge variant="secondary">5 Documents</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Reminders Sent</span>
                      <Badge variant="secondary">12 This Week</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Templates Used</span>
                      <Badge variant="secondary">3 Popular</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Audit Logs</span>
                      <Badge variant="secondary">All Tracked</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-brisk-primary" />
                  Security & Compliance
                </CardTitle>
                <CardDescription>Digital signature security and audit information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900">Security Status</h3>
                    <p className="text-sm text-green-700">All signatures use 256-bit encryption with tamper-evident seals. Certificate authority validation active.</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Compliance</h3>
                    <p className="text-sm text-blue-700">eIDAS compliant signatures. Full audit trail maintained for all documents. Legal validity ensured.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-900">Audit Trail</h3>
                    <p className="text-sm text-purple-700">Complete signing history tracked: IP addresses, timestamps, device information, and authentication methods.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="envelopes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Envelope Management</CardTitle>
                <CardDescription>Manage signing workflows and documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Input placeholder="Search envelopes..." className="flex-1" />
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending Signatures</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                <div className="space-y-4">
                  {envelopes.map((envelope) => (
                    <Card key={envelope.id} className="border-l-4 border-l-brisk-primary">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{envelope.title}</h3>
                              <Badge className={getStatusColor(envelope.status)}>
                                {envelope.status}
                              </Badge>
                              <Badge variant="outline">{envelope.id}</Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 mb-2">
                              <span>Created: {envelope.created}</span>
                              <span>Due: {envelope.dueDate}</span>
                              <span>Signatures: {envelope.completed}/{envelope.signers}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {envelope.documents.map((doc, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500">Created by: {envelope.creator}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Send className="h-4 w-4 mr-2" />
                              Send
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Signing Requests</CardTitle>
                <CardDescription>Track individual signature requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {signingRequests.map((request) => (
                    <Card key={request.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{request.signer}</h3>
                              <Badge className={getStatusColor(request.status)}>
                                {request.status}
                              </Badge>
                              <Badge variant="outline">{request.position}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">Envelope: {request.envelope}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                              <span>Email: {request.email}</span>
                              <span>Sent: {request.sentDate}</span>
                              <span>Reminders: {request.reminderCount}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4 mr-2" />
                              Remind
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <History className="h-4 w-4 mr-2" />
                              History
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Templates</CardTitle>
                <CardDescription>Reusable signing templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <Card key={template.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{template.name}</h3>
                              <Badge variant="outline">Used {template.usage} times</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {template.fields.map((field, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {field}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500">Last used: {template.lastUsed}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Create New Template</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                        <CardContent className="p-6 text-center">
                          <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">Blank Template</h3>
                          <p className="text-sm text-gray-600 mb-3">Start with a blank template</p>
                          <Button size="sm" variant="outline">Create</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                        <CardContent className="p-6 text-center">
                          <Upload className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">Upload Document</h3>
                          <p className="text-sm text-gray-600 mb-3">Upload existing document</p>
                          <Button size="sm" variant="outline">Upload</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors">
                        <CardContent className="p-6 text-center">
                          <Settings className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">Advanced Template</h3>
                          <p className="text-sm text-gray-600 mb-3">Complex signing workflows</p>
                          <Button size="sm" variant="outline">Build</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ResponsiveLayout>
  )
}

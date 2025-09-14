import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  FileText, Download, Eye, MessageSquare, Clock, CheckCircle, 
  AlertTriangle, User, Upload
} from 'lucide-react'

interface ClientPortalProps {
  clientId?: string
  practiceId?: string
  whiteLabel?: {
    companyName: string
    logo?: string
    primaryColor: string
    secondaryColor: string
    customDomain?: string
  }
}

export default function ClientPortalAdvanced({ 
  whiteLabel = {
    companyName: "Brisk Accountants",
    primaryColor: "#0B5FFF",
    secondaryColor: "#1E40AF"
  }
}: ClientPortalProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [jobs] = useState([
    {
      id: "job-1",
      title: "Year End Accounts 2024",
      type: "Accounts Preparation",
      status: "in_progress",
      progress: 75,
      dueDate: "2024-03-31",
      assignedTo: "Sarah Johnson",
      documents: [
        { name: "Trial Balance.xlsx", type: "excel", uploaded: "2024-01-15", size: "2.4 MB" },
        { name: "Bank Statements.pdf", type: "pdf", uploaded: "2024-01-20", size: "1.8 MB" }
      ],
      messages: [
        { from: "Sarah Johnson", message: "Trial balance reviewed, minor adjustments needed", time: "2 hours ago" },
        { from: "Client", message: "Additional invoices uploaded", time: "1 day ago" }
      ]
    },
    {
      id: "job-2", 
      title: "VAT Return Q4 2023",
      type: "VAT Return",
      status: "completed",
      progress: 100,
      dueDate: "2024-02-07",
      assignedTo: "Mike Chen",
      documents: [
        { name: "VAT Return Q4.pdf", type: "pdf", uploaded: "2024-02-05", size: "856 KB" }
      ],
      messages: []
    },
    {
      id: "job-3",
      title: "Corporation Tax Return 2024", 
      type: "Corporation Tax",
      status: "pending",
      progress: 25,
      dueDate: "2024-04-30",
      assignedTo: "Emma Wilson",
      documents: [],
      messages: [
        { from: "Emma Wilson", message: "Waiting for additional documentation", time: "3 days ago" }
      ]
    }
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-600" />
      case 'pending': return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* White-label Header */}
      <div 
        className="bg-white border-b shadow-sm"
        style={{ borderBottomColor: whiteLabel.primaryColor + '20' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              {whiteLabel.logo ? (
                <img src={whiteLabel.logo} alt="Logo" className="h-8 w-auto" />
              ) : (
                <div 
                  className="h-8 w-8 rounded flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: whiteLabel.primaryColor }}
                >
                  {whiteLabel.companyName.charAt(0)}
                </div>
              )}
              <h1 className="text-xl font-semibold text-gray-900">
                {whiteLabel.companyName} Client Portal
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Support
              </Button>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-xs text-blue-600">1 due this month</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold">1</p>
                      <p className="text-xs text-green-600">This quarter</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Documents</p>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-xs text-gray-600">Ready for review</p>
                    </div>
                    <FileText className="h-8 w-8 text-gray-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Messages</p>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-xs text-orange-600">Unread</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates on your jobs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {jobs.slice(0, 3).map((job) => (
                        <div key={job.id} className="flex items-center gap-4 p-4 border rounded-lg">
                          {getStatusIcon(job.status)}
                          <div className="flex-1">
                            <h4 className="font-medium">{job.title}</h4>
                            <p className="text-sm text-gray-600">{job.type}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Progress value={job.progress} className="flex-1 h-2" />
                              <span className="text-xs text-gray-600">{job.progress}%</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(job.status)}>
                              {job.status.replace('_', ' ')}
                            </Badge>
                            <p className="text-xs text-gray-600 mt-1">Due: {job.dueDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Documents
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Reports
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View All Jobs
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Jobs</CardTitle>
                <CardDescription>Track progress on all your accounting work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="p-6 border rounded-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(job.status)}
                          <div>
                            <h3 className="font-semibold">{job.title}</h3>
                            <p className="text-sm text-gray-600">{job.type}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status.replace('_', ' ')}
                        </Badge>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Progress</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={job.progress} className="flex-1" />
                            <span className="text-sm text-gray-600">{job.progress}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Due Date</p>
                          <p className="text-sm mt-1">{job.dueDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          Assigned to: <span className="font-medium">{job.assignedTo}</span>
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Library</CardTitle>
                <CardDescription>Access and manage your documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.flatMap(job => 
                    job.documents.map(doc => (
                      <div key={`${job.id}-${doc.name}`} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-sm text-gray-600">
                              {job.title} • {doc.size} • {doc.uploaded}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communication with your accounting team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.flatMap(job => 
                    job.messages.map((message, index) => (
                      <div key={`${job.id}-${index}`} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-600" />
                            <span className="font-medium">{message.from}</span>
                          </div>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{message.message}</p>
                        <p className="text-xs text-gray-500">Re: {job.title}</p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

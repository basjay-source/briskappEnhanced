import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  FileSignature, Send, CheckCircle, Clock,
  Eye, Download, Plus, Settings
} from 'lucide-react'

const ESignApprovals: React.FC = () => {
  const [envelopes, setEnvelopes] = useState<any[]>([])
  const [templates, setTemplates] = useState<any[]>([])

  useEffect(() => {
    setEnvelopes([
      {
        id: 1,
        name: "Year-End Accounts 2024 - ABC Corp",
        status: "sent",
        documents: ["Accounts.pdf", "Directors_Report.pdf", "Rep_Letter.pdf"],
        recipients: [
          { name: "John Smith", email: "john@abccorp.com", role: "Director", status: "signed" },
          { name: "Jane Doe", email: "jane@abccorp.com", role: "Director", status: "pending" }
        ],
        created_at: "2024-09-20T10:30:00Z",
        expires_at: "2024-10-20T10:30:00Z"
      },
      {
        id: 2,
        name: "Engagement Letter - XYZ Services",
        status: "completed",
        documents: ["Engagement_Letter.pdf"],
        recipients: [
          { name: "Mike Johnson", email: "mike@xyzservices.com", role: "CEO", status: "signed" }
        ],
        created_at: "2024-09-19T14:20:00Z",
        completed_at: "2024-09-19T16:45:00Z"
      },
      {
        id: 3,
        name: "Board Minutes - Q3 2024",
        status: "draft",
        documents: ["Board_Minutes_Q3.pdf"],
        recipients: [
          { name: "Sarah Wilson", email: "sarah@company.com", role: "Chairman", status: "pending" },
          { name: "Tom Brown", email: "tom@company.com", role: "Director", status: "pending" }
        ],
        created_at: "2024-09-18T11:30:00Z"
      }
    ])

    setTemplates([
      {
        id: 1,
        name: "Year-End Accounts Package",
        description: "Standard year-end accounts with director signatures",
        documents: ["Accounts", "Directors Report", "Representation Letter"],
        recipients: ["Director 1", "Director 2", "Company Secretary"]
      },
      {
        id: 2,
        name: "Engagement Letter",
        description: "Client engagement letter for new appointments",
        documents: ["Engagement Letter"],
        recipients: ["Client Contact"]
      },
      {
        id: 3,
        name: "Board Resolution",
        description: "Standard board resolution template",
        documents: ["Resolution"],
        recipients: ["Chairman", "Directors"]
      }
    ])
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'sent':
        return <Badge className="bg-blue-100 text-blue-800">Sent</Badge>
      case 'viewed':
        return <Badge className="bg-orange-100 text-orange-800">Viewed</Badge>
      case 'signed':
        return <Badge className="bg-purple-100 text-purple-800">Signed</Badge>
      case 'declined':
        return <Badge variant="destructive">Declined</Badge>
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRecipientStatusBadge = (status: string) => {
    switch (status) {
      case 'signed':
        return <Badge className="bg-green-100 text-green-800">Signed</Badge>
      case 'viewed':
        return <Badge className="bg-orange-100 text-orange-800">Viewed</Badge>
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      case 'declined':
        return <Badge variant="destructive">Declined</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">E-Sign & Approvals</h1>
          <p className="text-gray-600 mt-2">Manage electronic signatures and approval workflows</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Signature Pack
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Envelopes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{envelopes.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <FileSignature className="h-6 w-6 text-blue-600" />
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
                  {envelopes.filter(env => env.status === 'completed').length}
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
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {envelopes.filter(env => env.status === 'sent' || env.status === 'viewed').length}
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
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {envelopes.filter(env => env.status === 'draft').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <FileSignature className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Signature Envelopes</CardTitle>
              <CardDescription>Active and recent signature requests</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Input placeholder="Search envelopes..." className="w-64" />
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {envelopes.map((envelope) => (
              <div key={envelope.id} className="p-6 border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 text-lg">{envelope.name}</h4>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-500">
                        Created: {new Date(envelope.created_at).toLocaleDateString()}
                      </span>
                      {envelope.expires_at && (
                        <span className="text-sm text-gray-500">
                          Expires: {new Date(envelope.expires_at).toLocaleDateString()}
                        </span>
                      )}
                      {envelope.completed_at && (
                        <span className="text-sm text-gray-500">
                          Completed: {new Date(envelope.completed_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(envelope.status)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Documents ({envelope.documents.length})</h5>
                    <div className="space-y-2">
                      {envelope.documents.map((doc: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-900">{doc}</span>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Recipients ({envelope.recipients.length})</h5>
                    <div className="space-y-2">
                      {envelope.recipients.map((recipient: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{recipient.name}</p>
                            <p className="text-xs text-gray-500">{recipient.email} • {recipient.role}</p>
                          </div>
                          {getRecipientStatusBadge(recipient.status)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="flex space-x-2">
                    {envelope.status === 'draft' && (
                      <>
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      </>
                    )}
                    {envelope.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                  {envelope.status === 'sent' && (
                    <Button variant="outline" size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Send Reminder
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Signature Templates
              </CardTitle>
              <CardDescription>Pre-configured signature workflows</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div key={template.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div>
                    <p className="text-xs font-medium text-gray-700 uppercase">Documents</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {template.documents.slice(0, 2).map((doc: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                      {template.documents.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.documents.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-700 uppercase">Recipients</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {template.recipients.slice(0, 2).map((recipient: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {recipient}
                        </Badge>
                      ))}
                      {template.recipients.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.recipients.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Use</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ESignApprovals

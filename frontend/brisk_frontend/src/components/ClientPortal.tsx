import { 
  FileText, 
  Upload, 
  MessageCircle, 
  Download,
  Eye,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useIsMobile } from '@/hooks/use-mobile'

export default function ClientPortal() {
  const isMobile = useIsMobile()

  const jobs = [
    {
      id: '1',
      title: 'Annual Accounts 2023',
      status: 'in_progress',
      progress: 75,
      dueDate: '2024-02-15',
      description: 'Preparation of annual accounts and filing with Companies House'
    },
    {
      id: '2', 
      title: 'VAT Return Q4 2024',
      status: 'completed',
      progress: 100,
      dueDate: '2024-01-31',
      description: 'Quarterly VAT return submission to HMRC'
    }
  ]

  const documents = [
    {
      name: 'Trial Balance December 2023.pdf',
      type: 'Financial Statement',
      uploadDate: '2024-01-15',
      status: 'approved'
    },
    {
      name: 'Bank Statements Q4 2023.pdf',
      type: 'Supporting Document',
      uploadDate: '2024-01-10',
      status: 'pending'
    }
  ]

  const messages = [
    {
      from: 'Sarah Johnson',
      message: 'Please review the draft accounts and let us know if you have any questions.',
      timestamp: '2024-01-20 14:30',
      type: 'received'
    },
    {
      from: 'You',
      message: 'The figures look correct. When will the final version be ready?',
      timestamp: '2024-01-20 16:45',
      type: 'sent'
    }
  ]

  return (
    <div className={`${isMobile ? 'p-4' : 'p-6'} space-y-6`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Client Portal</h1>
          <p className="text-gray-600 mt-2">Track your jobs, documents, and communications</p>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-8 w-8 text-gray-400" />
          <div className="text-right">
            <p className="font-bold">ABC Manufacturing Ltd</p>
            <p className="text-sm text-gray-600">Client ID: CLI001</p>
          </div>
        </div>
      </div>

      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
        <div className={isMobile ? '' : 'lg:col-span-2'}>
          <Card>
            <CardHeader>
              <CardTitle>Active Jobs</CardTitle>
              <CardDescription>Current work in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold">{job.title}</h4>
                      <Badge className={
                        job.status === 'completed' ? 'bg-green-100 text-green-800' :
                        job.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {job.status === 'in_progress' ? 'In Progress' : 'Completed'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-brisk-primary h-2 rounded-full" 
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{job.progress}%</span>
                      </div>
                      <p className="text-sm text-gray-600">Due: {job.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Document Centre</CardTitle>
              <CardDescription>Upload and manage your documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-blue-900 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drag and drop files here or click to browse</p>
                  <Button variant="outline" className="mt-2">
                    Choose Files
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-bold text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-600">{doc.type} • {doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={
                          doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-brisk-primary-50 text-brisk-primary'
                        }>
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Secure communication with your accountant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`p-3 rounded-lg ${
                    msg.type === 'sent' ? 'bg-brisk-primary-50 ml-4' : 'bg-gray-50 mr-4'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-sm">{msg.from}</p>
                      <p className="text-xs text-gray-500">{msg.timestamp}</p>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                ))}
                
                <div className="flex gap-2 mt-4">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button size="sm">Send</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

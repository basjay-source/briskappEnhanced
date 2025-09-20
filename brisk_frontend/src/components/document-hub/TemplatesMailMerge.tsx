import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  FileText, Mail, Plus, Settings, Download, Eye, Send, Database
} from 'lucide-react'

const TemplatesMailMerge: React.FC = () => {
  const [templates, setTemplates] = useState<any[]>([])
  const [mergeJobs, setMergeJobs] = useState<any[]>([])

  useEffect(() => {
    setTemplates([
      {
        id: 1,
        name: "Engagement Letter Template",
        type: "engagement_letter",
        description: "Standard client engagement letter",
        merge_fields: ["client_name", "client_address", "engagement_type", "fee_estimate"],
        usage_count: 45,
        last_used: "2024-09-20T10:30:00Z"
      },
      {
        id: 2,
        name: "Year-End Accounts Cover Letter",
        type: "cover_letter",
        description: "Cover letter for year-end accounts submission",
        merge_fields: ["client_name", "year_end_date", "filing_deadline", "partner_name"],
        usage_count: 123,
        last_used: "2024-09-19T14:20:00Z"
      },
      {
        id: 3,
        name: "VAT Return Notification",
        type: "notification",
        description: "VAT return completion notification",
        merge_fields: ["client_name", "vat_period", "amount_due", "due_date"],
        usage_count: 67,
        last_used: "2024-09-18T11:30:00Z"
      }
    ])

    setMergeJobs([
      {
        id: 1,
        template_name: "Engagement Letter Template",
        client_count: 15,
        status: "completed",
        output_format: "PDF",
        created_at: "2024-09-20T09:00:00Z",
        completed_at: "2024-09-20T09:05:00Z"
      },
      {
        id: 2,
        template_name: "Year-End Accounts Cover Letter",
        client_count: 8,
        status: "processing",
        output_format: "DOCX",
        created_at: "2024-09-20T10:15:00Z"
      }
    ])
  }, [])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates &amp; Mail-Merge</h1>
          <p className="text-gray-600 mt-2">Create and manage document templates with mail-merge capabilities</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Templates</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{templates.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {mergeJobs.filter(job => job.status === 'processing').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Settings className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Documents Generated</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">234</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Download className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">156</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Template Library</CardTitle>
              <CardDescription>Manage document templates and merge fields</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Input placeholder="Search templates..." className="w-64" />
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    </div>
                    <Badge variant="outline">{template.type}</Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Merge Fields:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.merge_fields.slice(0, 3).map((field: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                        {template.merge_fields.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.merge_fields.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Used {template.usage_count} times</span>
                      <span>Last: {new Date(template.last_used).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mt-3">
                    <div>
                      <p className="text-xs font-medium text-gray-700">Signature Font:</p>
                      <select className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1" style={{fontFamily: 'var(--selected-font, inherit)'}}>
                        <option value="Allura" style={{fontFamily: 'Allura, cursive'}}>Allura</option>
                        <option value="Dancing Script" style={{fontFamily: 'Dancing Script, cursive'}}>Dancing Script</option>
                        <option value="Great Vibes" style={{fontFamily: 'Great Vibes, cursive'}}>Great Vibes</option>
                        <option value="Pacifico" style={{fontFamily: 'Pacifico, cursive'}}>Pacifico</option>
                        <option value="Satisfy" style={{fontFamily: 'Satisfy, cursive'}}>Satisfy</option>
                        <option value="Kaushan Script" style={{fontFamily: 'Kaushan Script, cursive'}}>Kaushan Script</option>
                        <option value="Amatic SC" style={{fontFamily: 'Amatic SC, cursive'}}>Amatic SC</option>
                        <option value="Caveat" style={{fontFamily: 'Caveat, cursive'}}>Caveat</option>
                        <option value="Courgette" style={{fontFamily: 'Courgette, cursive'}}>Courgette</option>
                        <option value="Handlee" style={{fontFamily: 'Handlee, cursive'}}>Handlee</option>
                        <option value="Indie Flower" style={{fontFamily: 'Indie Flower, cursive'}}>Indie Flower</option>
                        <option value="Kalam" style={{fontFamily: 'Kalam, cursive'}}>Kalam</option>
                        <option value="Leckerli One" style={{fontFamily: 'Leckerli One, cursive'}}>Leckerli One</option>
                        <option value="Lobster" style={{fontFamily: 'Lobster, cursive'}}>Lobster</option>
                        <option value="Marck Script" style={{fontFamily: 'Marck Script, cursive'}}>Marck Script</option>
                        <option value="Permanent Marker" style={{fontFamily: 'Permanent Marker, cursive'}}>Permanent Marker</option>
                        <option value="Shadows Into Light" style={{fontFamily: 'Shadows Into Light, cursive'}}>Shadows Into Light</option>
                        <option value="Tangerine" style={{fontFamily: 'Tangerine, cursive'}}>Tangerine</option>
                        <option value="Yellowtail" style={{fontFamily: 'Yellowtail, cursive'}}>Yellowtail</option>
                        <option value="Zeyada" style={{fontFamily: 'Zeyada, cursive'}}>Zeyada</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Merge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Bulk Mail Merge
          </CardTitle>
          <CardDescription>Generate documents for multiple clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Select Template</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="">Choose template...</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Output Format</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Client Filter</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="all">All Clients</option>
                <option value="active">Active Clients</option>
                <option value="year-end">Year-End Clients</option>
                <option value="vat">VAT Clients</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <Button className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Start Bulk Merge
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Recent Merge Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mergeJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{job.template_name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">{job.client_count} clients</span>
                    <span className="text-sm text-gray-500">Format: {job.output_format}</span>
                    <span className="text-sm text-gray-500">
                      Started: {new Date(job.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={job.status === 'completed' ? 'default' : 'secondary'} 
                         className={job.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                    {job.status}
                  </Badge>
                  <div className="flex space-x-2">
                    {job.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TemplatesMailMerge

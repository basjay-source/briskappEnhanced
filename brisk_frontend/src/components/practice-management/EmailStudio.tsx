import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { 
  Mail, Send, Save, Eye, FileText, Palette, Settings,
  Bold, Italic, Underline, Link, Image, AlignLeft, AlignCenter,
  AlignRight, List, ListOrdered, Quote, Code, Undo, Redo,
  Paperclip, Calendar, Clock, Target, BarChart3, Zap
} from 'lucide-react'
import { practiceManagementApi, EmailTemplate } from '../../services/api'

const EmailStudio: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'compose' | 'templates' | 'campaigns' | 'analytics'>('compose')
  const [emailContent, setEmailContent] = useState('')
  const [emailSubject, setEmailSubject] = useState('')

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await practiceManagementApi.getEmailTemplates()
        setTemplates(data)
      } catch (error) {
        console.error('Failed to fetch email templates:', error)
        setTemplates([
          { id: 1, name: 'Welcome Client', template_type: 'welcome', subject: 'Welcome to Brisk Accountants', created_at: '2024-01-15T10:30:00Z' },
          { id: 2, name: 'Invoice Reminder', template_type: 'reminder', subject: 'Payment Reminder - Invoice #{invoice_number}', created_at: '2024-01-14T09:15:00Z' },
          { id: 3, name: 'Proposal Follow-up', template_type: 'proposal', subject: 'Following up on your proposal', created_at: '2024-01-13T14:20:00Z' },
          { id: 4, name: 'Deadline Notification', template_type: 'deadline', subject: 'Upcoming Deadline: {deadline_name}', created_at: '2024-01-12T11:45:00Z' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  const formatToolbarButtons = [
    { icon: Bold, label: 'Bold', action: 'bold' },
    { icon: Italic, label: 'Italic', action: 'italic' },
    { icon: Underline, label: 'Underline', action: 'underline' },
    { icon: Link, label: 'Link', action: 'link' },
    { icon: Image, label: 'Image', action: 'image' },
    { icon: AlignLeft, label: 'Align Left', action: 'alignLeft' },
    { icon: AlignCenter, label: 'Align Center', action: 'alignCenter' },
    { icon: AlignRight, label: 'Align Right', action: 'alignRight' },
    { icon: List, label: 'Bullet List', action: 'bulletList' },
    { icon: ListOrdered, label: 'Numbered List', action: 'numberedList' },
    { icon: Quote, label: 'Quote', action: 'quote' },
    { icon: Code, label: 'Code', action: 'code' }
  ]

  const colorPalette = [
    '#0B5FFF', '#FF7A00', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1', '#14B8A6'
  ]

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Email Studio</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Email Studio</h1>
          <p className="text-gray-600 mt-1">Advanced colorful Microsoft-styled email composition and management</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4 mr-2" />
            Send Email
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'compose', label: 'Compose', icon: Mail },
            { id: 'templates', label: 'Templates', icon: FileText },
            { id: 'campaigns', label: 'Campaigns', icon: Target },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Compose Tab */}
      {activeTab === 'compose' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Email Composer */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Compose Email</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Email Headers */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                      <Input placeholder="recipient@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                      <Input value="admin@briskaccountants.com" readOnly className="bg-gray-50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Input 
                      placeholder="Email subject"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                    />
                  </div>
                </div>

                {/* Formatting Toolbar */}
                <div className="border rounded-lg p-3 bg-gray-50">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Format Buttons */}
                    <div className="flex items-center space-x-1 border-r pr-3">
                      {formatToolbarButtons.slice(0, 4).map((button) => (
                        <Button
                          key={button.action}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          title={button.label}
                        >
                          <button.icon className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>

                    {/* Alignment Buttons */}
                    <div className="flex items-center space-x-1 border-r pr-3">
                      {formatToolbarButtons.slice(5, 8).map((button) => (
                        <Button
                          key={button.action}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          title={button.label}
                        >
                          <button.icon className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>

                    {/* List Buttons */}
                    <div className="flex items-center space-x-1 border-r pr-3">
                      {formatToolbarButtons.slice(8, 10).map((button) => (
                        <Button
                          key={button.action}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          title={button.label}
                        >
                          <button.icon className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>

                    {/* Color Palette */}
                    <div className="flex items-center space-x-1">
                      <Palette className="h-4 w-4 text-gray-500 mr-2" />
                      {colorPalette.map((color) => (
                        <button
                          key={color}
                          className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          title={`Color: ${color}`}
                        />
                      ))}
                    </div>

                    {/* Undo/Redo */}
                    <div className="flex items-center space-x-1 border-l pl-3">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Undo">
                        <Undo className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Redo">
                        <Redo className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Email Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Content</label>
                  <div className="border rounded-lg">
                    <Textarea
                      placeholder="Compose your email here..."
                      className="min-h-[400px] border-0 resize-none focus:ring-0"
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                    />
                  </div>
                </div>

                {/* Attachments */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Paperclip className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Attachments</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Add Files
                    </Button>
                  </div>
                </div>

                {/* Send Options */}
                <div className="border-t pt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Schedule Send</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Delivery Receipt</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline">
                      Save as Template
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4 mr-2" />
                      Send Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {templates.slice(0, 4).map((template) => (
                    <Button
                      key={template.id}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => console.log('Template selected:', template.name)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {template.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Merge Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Merge Fields</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    '{{client_name}}',
                    '{{contact_name}}',
                    '{{invoice_number}}',
                    '{{due_date}}',
                    '{{amount}}',
                    '{{deadline_name}}'
                  ].map((field) => (
                    <Button
                      key={field}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-blue-600 hover:bg-blue-50"
                    >
                      {field}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Year-end Reminders', sent: '2024-01-15', opens: '85%' },
                    { name: 'Invoice Follow-ups', sent: '2024-01-10', opens: '72%' },
                    { name: 'Welcome Series', sent: '2024-01-05', opens: '91%' }
                  ].map((campaign, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
                      <p className="text-sm font-medium">{campaign.name}</p>
                      <p className="text-xs text-gray-500">Sent: {campaign.sent}</p>
                      <Badge variant="outline" className="mt-1">
                        {campaign.opens} open rate
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{template.name}</CardTitle>
                  <Badge variant="outline">{template.template_type}</Badge>
                </div>
                <CardDescription>{template.subject}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Created: {new Date(template.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Use Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Email Campaigns</CardTitle>
            <CardDescription>Manage and track your email marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-600 mb-4">Create your first email campaign to get started</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Zap className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Open Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82.5%</div>
              <p className="text-xs text-green-600">+5.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Click Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.1%</div>
              <p className="text-xs text-blue-600">+2.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Bounce Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3%</div>
              <p className="text-xs text-green-600">-0.5% from last month</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default EmailStudio

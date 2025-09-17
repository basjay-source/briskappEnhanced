import React, { useState, useEffect } from 'react'
import { 
  Mail, 
  Send, 
  Clock,
  X,
  Plus,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
  Palette,
  Calendar,
  FileText,
  Users,
  Building,
  DollarSign,
  Paperclip
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

interface Client {
  id: string
  name: string
}

interface TemplateData {
  client_name: string
  company_number: string
  vat_number: string
  industry_sector: string
  year_end: string
  incorporation_date: string
  registered_address: string
  turnover: string
  net_profit: string
  tax_payable: string
  profit_margin: string
  total_assets: string
  total_liabilities: string
  working_capital: string
  cash_flow: string
  employee_count: string
  services: string
  practice_name: string
  signature: string
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  category: string
}

export default function NewEmailStudio() {
  const [activeTab, setActiveTab] = useState('home')
  const [isComposing, setIsComposing] = useState(false)
  const [selectedClient, setSelectedClient] = useState<string>('')
  const [templateData, setTemplateData] = useState<TemplateData | null>(null)
  const [availableClients, setAvailableClients] = useState<Client[]>([])
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([])
  const [composeData, setComposeData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
    priority: 'normal' as 'low' | 'normal' | 'high'
  })

  const ribbonTabs = [
    { id: 'home', label: 'Home', color: 'bg-blue-600' },
    { id: 'insert', label: 'Insert', color: 'bg-green-600' },
    { id: 'format', label: 'Format', color: 'bg-purple-600' },
    { id: 'templates', label: 'Templates', color: 'bg-[#FF6B35]' },
    { id: 'send', label: 'Send', color: 'bg-red-600' }
  ]

  const serviceTemplates = [
    { id: 'accounts-prep', name: 'Accounts Preparation', category: 'Accounts' },
    { id: 'tax-compliance', name: 'Tax Compliance', category: 'Tax' },
    { id: 'vat-returns', name: 'VAT Returns', category: 'VAT' },
    { id: 'payroll', name: 'Payroll Services', category: 'Payroll' },
    { id: 'company-secretarial', name: 'Company Secretarial', category: 'Secretarial' },
    { id: 'management-accounts', name: 'Management Accounts', category: 'Accounts' },
    { id: 'year-end', name: 'Year End Accounts', category: 'Accounts' },
    { id: 'tax-planning', name: 'Tax Planning', category: 'Tax' },
    { id: 'business-advisory', name: 'Business Advisory', category: 'Advisory' },
    { id: 'bookkeeping', name: 'Bookkeeping', category: 'Books' },
    { id: 'self-assessment', name: 'Self Assessment', category: 'Tax' },
    { id: 'corporation-tax', name: 'Business Tax', category: 'Tax' },
    { id: 'audit', name: 'Audit Services', category: 'Audit' },
    { id: 'financial-planning', name: 'Financial Planning', category: 'Advisory' },
    { id: 'compliance', name: 'Compliance Services', category: 'Compliance' }
  ]

  const templateVariables = [
    { 
      category: 'Client Data', 
      icon: Building,
      variables: [
        { key: 'client_name', label: 'Client Name', description: 'Full client/company name' },
        { key: 'company_number', label: 'Company Number', description: 'Companies House registration number' },
        { key: 'vat_number', label: 'VAT Number', description: 'VAT registration number' },
        { key: 'industry_sector', label: 'Industry Sector', description: 'Business industry classification' },
        { key: 'year_end', label: 'Year End', description: 'Accounting year end date' },
        { key: 'incorporation_date', label: 'Incorporation Date', description: 'Company incorporation date' },
        { key: 'registered_address', label: 'Registered Address', description: 'Official registered address' }
      ]
    },
    {
      category: 'Financial Data',
      icon: DollarSign,
      variables: [
        { key: 'turnover', label: 'Turnover', description: 'Annual revenue/turnover' },
        { key: 'net_profit', label: 'Net Profit', description: 'Net profit after tax' },
        { key: 'tax_payable', label: 'Tax Payable', description: 'Business tax liability' },
        { key: 'profit_margin', label: 'Profit Margin', description: 'Net profit margin percentage' },
        { key: 'total_assets', label: 'Total Assets', description: 'Total company assets' },
        { key: 'total_liabilities', label: 'Total Liabilities', description: 'Total company liabilities' },
        { key: 'working_capital', label: 'Working Capital', description: 'Current assets minus current liabilities' },
        { key: 'cash_flow', label: 'Cash Flow', description: 'Operating cash flow' }
      ]
    },
    {
      category: 'Services & Other',
      icon: Users,
      variables: [
        { key: 'services', label: 'Services', description: 'Services provided to client' },
        { key: 'employee_count', label: 'Employee Count', description: 'Number of employees' },
        { key: 'practice_name', label: 'Practice Name', description: 'Accounting practice name' },
        { key: 'signature', label: 'Signature', description: 'Professional email signature' }
      ]
    }
  ]

  const fetchAvailableClients = React.useCallback(async () => {
    try {
      const response = await fetch('/api/books/customers')
      const data = await response.json()
      setAvailableClients(data.customers || [])
    } catch (error) {
      console.error('Failed to fetch clients:', error)
    }
  }, [])

  const loadEmailTemplates = React.useCallback(() => {
    const templates = serviceTemplates.map(template => ({
      id: template.id,
      name: template.name,
      category: template.category,
      subject: `${template.name} - {{client_name}}`,
      body: `Dear {{client_name}},\n\nI hope this email finds you well.\n\nRegarding your ${template.name.toLowerCase()} requirements, I wanted to provide you with an update.\n\n{{services}}\n\nPlease don't hesitate to contact us if you have any questions.\n\n{{signature}}`
    }))
    setEmailTemplates(templates)
  }, [])

  useEffect(() => {
    fetchAvailableClients()
    loadEmailTemplates()
  }, [fetchAvailableClients, loadEmailTemplates])

  useEffect(() => {
    if (selectedClient) {
      fetchClientTemplateData(selectedClient)
    }
  }, [selectedClient])


  const fetchClientTemplateData = async (clientId: string) => {
    try {
      const response = await fetch(`/api/email/template-data/${clientId}`)
      const data = await response.json()
      setTemplateData(data)
    } catch (error) {
      console.error('Failed to fetch client template data:', error)
    }
  }


  const insertVariable = (variableKey: string) => {
    const variable = `{{${variableKey}}}`
    setComposeData(prev => ({
      ...prev,
      body: prev.body + variable
    }))
  }

  const replaceTemplateVariables = (text: string): string => {
    if (!templateData) return text
    
    let result = text
    Object.entries(templateData).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g')
      result = result.replace(regex, value)
    })
    return result
  }

  const loadTemplate = (template: EmailTemplate) => {
    setComposeData(prev => ({
      ...prev,
      subject: template.subject,
      body: template.body
    }))
  }

  const handleSend = async () => {
    try {
      const emailData = {
        to: composeData.to.split(',').map(email => email.trim()),
        cc: composeData.cc ? composeData.cc.split(',').map(email => email.trim()) : [],
        bcc: composeData.bcc ? composeData.bcc.split(',').map(email => email.trim()) : [],
        subject: replaceTemplateVariables(composeData.subject),
        body: replaceTemplateVariables(composeData.body),
        priority: composeData.priority,
        client_id: selectedClient
      }

      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      })

      if (response.ok) {
        alert('Email sent successfully!')
        setIsComposing(false)
        setComposeData({
          to: '',
          cc: '',
          bcc: '',
          subject: '',
          body: '',
          priority: 'normal'
        })
      }
    } catch (error) {
      console.error('Failed to send email:', error)
      alert('Failed to send email')
    }
  }

  const renderRibbonTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="flex items-center gap-4 p-4 bg-white border-b">
            <div className="flex items-center gap-2">
              <Select onValueChange={(value) => setComposeData(prev => ({ ...prev, priority: value as 'low' | 'normal' | 'high' }))}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator orientation="vertical" className="h-8" />

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Underline className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-8" />

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 'insert':
        return (
          <div className="flex items-center gap-4 p-4 bg-white border-b">
            <Button variant="ghost" size="sm">
              <Link className="h-4 w-4 mr-2" />
              Link
            </Button>
            <Button variant="ghost" size="sm">
              <Image className="h-4 w-4 mr-2" />
              Image
            </Button>
            <Button variant="ghost" size="sm">
              <Paperclip className="h-4 w-4 mr-2" />
              Attachment
            </Button>
            <Button variant="ghost" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Meeting
            </Button>
          </div>
        )

      case 'format':
        return (
          <div className="flex items-center gap-4 p-4 bg-white border-b">
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arial">Arial</SelectItem>
                <SelectItem value="helvetica">Helvetica</SelectItem>
                <SelectItem value="times">Times New Roman</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="14">14</SelectItem>
                <SelectItem value="16">16</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" size="sm">
              <Palette className="h-4 w-4 mr-2" />
              Color
            </Button>
          </div>
        )

      case 'templates':
        return (
          <div className="flex items-center gap-4 p-4 bg-white border-b">
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              New Template
            </Button>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </div>
        )

      case 'send':
        return (
          <div className="flex items-center gap-4 p-4 bg-white border-b">
            <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="h-full bg-gray-50">
      <div className="flex h-full">
        {/* Main Email Composition Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Email Studio</h2>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsComposing(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </div>
            </div>
          </div>

          {/* Ribbon Tabs */}
          {isComposing && (
            <div className="bg-gray-100 border-b">
              <div className="flex">
                {ribbonTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 text-sm font-medium text-white transition-colors ${
                      activeTab === tab.id 
                        ? `${tab.color} border-b-2 border-white` 
                        : `${tab.color} opacity-80 hover:opacity-100`
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {renderRibbonTab()}
            </div>
          )}

          {/* Email Composition */}
          {isComposing ? (
            <div className="flex-1 p-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Compose Email</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsComposing(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Client</label>
                      <Select value={selectedClient} onValueChange={setSelectedClient}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableClients.map(client => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">To</label>
                    <Input 
                      value={composeData.to}
                      onChange={(e) => setComposeData(prev => ({ ...prev, to: e.target.value }))}
                      placeholder="recipient@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">CC</label>
                      <Input 
                        value={composeData.cc}
                        onChange={(e) => setComposeData(prev => ({ ...prev, cc: e.target.value }))}
                        placeholder="cc@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">BCC</label>
                      <Input 
                        value={composeData.bcc}
                        onChange={(e) => setComposeData(prev => ({ ...prev, bcc: e.target.value }))}
                        placeholder="bcc@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input 
                      value={composeData.subject}
                      onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Email subject"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <Textarea 
                      value={composeData.body}
                      onChange={(e) => setComposeData(prev => ({ ...prev, body: e.target.value }))}
                      placeholder="Type your message here..."
                      rows={12}
                      className="resize-none"
                    />
                  </div>

                  {templateData && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-bold text-blue-900 mb-2">Preview with Client Data:</h4>
                      <div className="text-sm text-blue-800">
                        <div><strong>Subject:</strong> {replaceTemplateVariables(composeData.subject)}</div>
                        <div className="mt-2"><strong>Body:</strong></div>
                        <div className="whitespace-pre-wrap bg-white p-2 rounded border">
                          {replaceTemplateVariables(composeData.body)}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Welcome to Email Studio</h3>
                <p className="text-gray-600 mb-4">Advanced email management with client data integration</p>
                <Button 
                  onClick={() => setIsComposing(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Compose New Email
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Template Variables */}
        <div className="w-80 bg-white border-l border-blue-900 flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-bold text-gray-900">Template Variables</h3>
            <p className="text-sm text-gray-600">Click to insert into email</p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Service Templates */}
            <div className="p-4 border-b">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Service Templates
              </h4>
              <div className="space-y-2">
                {emailTemplates.slice(0, 5).map(template => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template)}
                    className="w-full text-left p-2 rounded-lg border border-blue-900 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="font-medium text-sm">{template.name}</div>
                    <div className="text-xs text-gray-500">{template.category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Template Variables */}
            {templateVariables.map(category => {
              const Icon = category.icon
              return (
                <div key={category.category} className="p-4 border-b">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Icon className="h-4 w-4 mr-2" />
                    {category.category}
                  </h4>
                  <div className="space-y-2">
                    {category.variables.map(variable => (
                      <button
                        key={variable.key}
                        onClick={() => insertVariable(variable.key)}
                        className="w-full text-left p-2 rounded-lg border border-blue-900 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <div className="font-medium text-sm">{variable.label}</div>
                        <div className="text-xs text-gray-500">{variable.description}</div>
                        {templateData && (
                          <div className="text-xs text-blue-600 mt-1">
                            {templateData[variable.key as keyof TemplateData]}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

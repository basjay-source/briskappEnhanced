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
  Paperclip,
  List,
  ListOrdered,
  Indent,
  Outdent,
  Quote,
  Code,
  Table,
  Sparkles,
  Flag,
  Tag,
  Eye,
  Copy,
  BarChart3,
  TrendingUp,
  CheckCircle,
  Inbox,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
  const [activeView, setActiveView] = useState<'inbox' | 'compose' | 'analytics'>('inbox')
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
  const emailMetrics = {
    totalSent: 145,
    totalReceived: 234,
    openRate: 87.3,
    responseRate: 64.2,
    avgResponseTime: '2.4h'
  }

  const ribbonTabs = [
    { id: 'home', label: 'Home', color: 'bg-blue-600', icon: Mail },
    { id: 'insert', label: 'Insert', color: 'bg-green-600', icon: Plus },
    { id: 'format', label: 'Format', color: 'bg-purple-600', icon: Palette },
    { id: 'review', label: 'Review', color: 'bg-orange-600', icon: Eye },
    { id: 'send', label: 'Send Options', color: 'bg-red-600', icon: Send }
  ]

  const fontFamilies = ['Arial', 'Calibri', 'Times New Roman', 'Verdana', 'Georgia', 'Courier New', 'Helvetica']
  const fontSizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '28', '32', '36']
  const fontColors = ['#000000', '#1e3a8a', '#dc2626', '#16a34a', '#ea580c', '#9333ea', '#0891b2', '#ca8a04']

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
    { id: 'corporation-tax', name: 'Corporation Tax', category: 'Tax' },
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
        { key: 'tax_payable', label: 'Tax Payable', description: 'Corporation tax liability' },
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

  const RibbonGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="px-3 py-2 border-r border-blue-200">
      <div className="text-xs text-blue-900 mb-2 font-medium">{title}</div>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  )

  const renderRibbonTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="flex items-start bg-white border-b-2 border-blue-900 p-2">
            <RibbonGroup title="Clipboard">
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Copy className="h-5 w-5 text-blue-900" />
                <span className="text-xs text-blue-900">Copy</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Paperclip className="h-5 w-5 text-blue-900" />
                <span className="text-xs text-blue-900">Paste</span>
              </Button>
            </RibbonGroup>

            <RibbonGroup title="Font">
              <Select defaultValue="Arial">
                <SelectTrigger className="w-32 h-8 border-2 border-blue-900 text-blue-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map(font => (
                    <SelectItem key={font} value={font} className="text-blue-900">{font}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue="12">
                <SelectTrigger className="w-16 h-8 border-2 border-blue-900 text-blue-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontSizes.map(size => (
                    <SelectItem key={size} value={size} className="text-blue-900">{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 border border-blue-900">
                  <Bold className="h-4 w-4 text-blue-900" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 border border-blue-900">
                  <Italic className="h-4 w-4 text-blue-900" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 border border-blue-900">
                  <Underline className="h-4 w-4 text-blue-900" />
                </Button>
              </div>
            </RibbonGroup>

            <RibbonGroup title="Paragraph">
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 border border-blue-900">
                  <AlignLeft className="h-4 w-4 text-blue-900" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 border border-blue-900">
                  <AlignCenter className="h-4 w-4 text-blue-900" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 border border-blue-900">
                  <AlignRight className="h-4 w-4 text-blue-900" />
                </Button>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 border border-blue-900">
                  <List className="h-4 w-4 text-blue-900" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 border border-blue-900">
                  <ListOrdered className="h-4 w-4 text-blue-900" />
                </Button>
              </div>
            </RibbonGroup>

            <RibbonGroup title="Tags">
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Tag className="h-5 w-5 text-blue-900" />
                <span className="text-xs text-blue-900">Categorize</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Flag className="h-5 w-5 text-blue-900" />
                <span className="text-xs text-blue-900">Follow Up</span>
              </Button>
            </RibbonGroup>
          </div>
        )

      case 'insert':
        return (
          <div className="flex items-start bg-white border-b-2 border-blue-900 p-2">
            <RibbonGroup title="Include">
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Paperclip className="h-5 w-5 text-green-700" />
                <span className="text-xs text-blue-900">Attach File</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Image className="h-5 w-5 text-green-700" />
                <span className="text-xs text-blue-900">Picture</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Table className="h-5 w-5 text-green-700" />
                <span className="text-xs text-blue-900">Table</span>
              </Button>
            </RibbonGroup>

            <RibbonGroup title="Links">
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Link className="h-5 w-5 text-green-700" />
                <span className="text-xs text-blue-900">Hyperlink</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Building className="h-5 w-5 text-green-700" />
                <span className="text-xs text-blue-900">Business Card</span>
              </Button>
            </RibbonGroup>

            <RibbonGroup title="Text">
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <FileText className="h-5 w-5 text-green-700" />
                <span className="text-xs text-blue-900">Signature</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Quote className="h-5 w-5 text-green-700" />
                <span className="text-xs text-blue-900">Quote</span>
              </Button>
            </RibbonGroup>

            <RibbonGroup title="Symbols">
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Sparkles className="h-5 w-5 text-green-700" />
                <span className="text-xs text-blue-900">Emoji</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Calendar className="h-5 w-5 text-green-700" />
                <span className="text-xs text-blue-900">Date/Time</span>
              </Button>
            </RibbonGroup>
          </div>
        )

      case 'format':
        return (
          <div className="flex items-start bg-white border-b-2 border-blue-900 p-2">
            <RibbonGroup title="Font Color">
              <div className="flex gap-1">
                {fontColors.map(color => (
                  <button
                    key={color}
                    className="w-6 h-6 rounded border-2 border-blue-900"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </RibbonGroup>

            <RibbonGroup title="Styles">
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Code className="h-5 w-5 text-purple-700" />
                <span className="text-xs text-blue-900">Styles</span>
              </Button>
              <Select defaultValue="normal">
                <SelectTrigger className="w-32 h-8 border-2 border-blue-900 text-blue-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal" className="text-blue-900">Normal</SelectItem>
                  <SelectItem value="heading1" className="text-blue-900">Heading 1</SelectItem>
                  <SelectItem value="heading2" className="text-blue-900">Heading 2</SelectItem>
                </SelectContent>
              </Select>
            </RibbonGroup>

            <RibbonGroup title="Indentation">
              <Button variant="ghost" size="sm" className="h-8 w-8 border border-blue-900">
                <Indent className="h-4 w-4 text-purple-700" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 border border-blue-900">
                <Outdent className="h-4 w-4 text-purple-700" />
              </Button>
            </RibbonGroup>
          </div>
        )

      case 'review':
        return (
          <div className="flex items-start bg-white border-b-2 border-blue-900 p-2">
            <RibbonGroup title="Proofing">
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <CheckCircle className="h-5 w-5 text-orange-700" />
                <span className="text-xs text-blue-900">Spelling</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Eye className="h-5 w-5 text-orange-700" />
                <span className="text-xs text-blue-900">Preview</span>
              </Button>
            </RibbonGroup>

            <RibbonGroup title="Language">
              <Select defaultValue="en">
                <SelectTrigger className="w-32 h-8 border-2 border-blue-900 text-blue-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en" className="text-blue-900">English (UK)</SelectItem>
                  <SelectItem value="es" className="text-blue-900">Spanish</SelectItem>
                  <SelectItem value="fr" className="text-blue-900">French</SelectItem>
                </SelectContent>
              </Select>
            </RibbonGroup>
          </div>
        )

      case 'send':
        return (
          <div className="flex items-start bg-white border-b-2 border-blue-900 p-2">
            <RibbonGroup title="Send">
              <Button onClick={handleSend} className="flex-col h-16 bg-blue-600 hover:bg-blue-700">
                <Send className="h-5 w-5" />
                <span className="text-xs">Send Now</span>
              </Button>
              <Button variant="outline" className="flex-col h-16 border-2 border-blue-900">
                <Clock className="h-5 w-5 text-red-700" />
                <span className="text-xs text-blue-900">Schedule</span>
              </Button>
            </RibbonGroup>

            <RibbonGroup title="Priority">
              <Select value={composeData.priority} onValueChange={(v) => setComposeData({...composeData, priority: v as any})}>
                <SelectTrigger className="w-32 h-8 border-2 border-blue-900 text-blue-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low" className="text-blue-900">Low</SelectItem>
                  <SelectItem value="normal" className="text-blue-900">Normal</SelectItem>
                  <SelectItem value="high" className="text-blue-900">High</SelectItem>
                </SelectContent>
              </Select>
            </RibbonGroup>

            <RibbonGroup title="Tracking">
              <Button variant="ghost" size="sm" className="flex-col h-16">
                <Eye className="h-5 w-5 text-red-700" />
                <span className="text-xs text-blue-900">Read Receipt</span>
              </Button>
            </RibbonGroup>
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
          <div className="bg-white border-b-2 border-blue-900 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-blue-900">Email Studio</h2>
              <div className="flex gap-2">
                <Button 
                  variant={activeView === 'inbox' ? 'default' : 'outline'}
                  onClick={() => { setActiveView('inbox'); setIsComposing(false); }}
                  className={activeView === 'inbox' ? 'bg-orange-600 hover:bg-orange-700' : 'border-2 border-blue-900 text-blue-900'}
                >
                  <Inbox className="h-4 w-4 mr-2" />
                  Inbox
                </Button>
                <Button 
                  variant={activeView === 'compose' ? 'default' : 'outline'}
                  onClick={() => { setActiveView('compose'); setIsComposing(true); }}
                  className={activeView === 'compose' ? 'bg-orange-600 hover:bg-orange-700' : 'border-2 border-blue-900 text-blue-900'}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Compose
                </Button>
                <Button 
                  variant={activeView === 'analytics' ? 'default' : 'outline'}
                  onClick={() => { setActiveView('analytics'); setIsComposing(false); }}
                  className={activeView === 'analytics' ? 'bg-orange-600 hover:bg-orange-700' : 'border-2 border-blue-900 text-blue-900'}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>
          </div>

          {/* Ribbon Tabs */}
          {isComposing && (
            <div className="bg-gray-100 border-b">
              <div className="flex">
                {ribbonTabs.map(tab => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 text-sm font-medium text-white transition-colors flex items-center gap-2 ${
                        activeTab === tab.id 
                          ? `${tab.color} border-b-4 border-white` 
                          : `${tab.color} opacity-80 hover:opacity-100`
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
              
              {renderRibbonTab()}
            </div>
          )}

          {/* Main Content Area */}
          {activeView === 'compose' ? (
            <div className="flex-1 p-6">
              <Card className="border-2 border-blue-900 rounded-[2px]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-blue-900">Compose Email</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => { setActiveView('inbox'); setIsComposing(false); }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-blue-900">Client</label>
                      <Select value={selectedClient} onValueChange={setSelectedClient}>
                        <SelectTrigger className="border-2 border-blue-900 text-blue-900">
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableClients.map(client => (
                            <SelectItem key={client.id} value={client.id} className="text-blue-900">
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-blue-900">To</label>
                    <Input 
                      value={composeData.to}
                      onChange={(e) => setComposeData(prev => ({ ...prev, to: e.target.value }))}
                      placeholder="recipient@example.com"
                      className="border-2 border-blue-900 text-blue-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-blue-900">CC</label>
                      <Input 
                        value={composeData.cc}
                        onChange={(e) => setComposeData(prev => ({ ...prev, cc: e.target.value }))}
                        placeholder="cc@example.com"
                        className="border-2 border-blue-900 text-blue-900"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-900">BCC</label>
                      <Input 
                        value={composeData.bcc}
                        onChange={(e) => setComposeData(prev => ({ ...prev, bcc: e.target.value }))}
                        placeholder="bcc@example.com"
                        className="border-2 border-blue-900 text-blue-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-blue-900">Subject</label>
                    <Input 
                      value={composeData.subject}
                      onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Email subject"
                      className="border-2 border-blue-900 text-blue-900"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-blue-900">Message</label>
                    <Textarea 
                      value={composeData.body}
                      onChange={(e) => setComposeData(prev => ({ ...prev, body: e.target.value }))}
                      placeholder="Type your message here..."
                      rows={12}
                      className="resize-none border-2 border-blue-900 text-blue-900"
                    />
                  </div>

                  {templateData && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-[2px] border-2 border-blue-900">
                      <h4 className="font-medium text-blue-900 mb-2">Preview with Client Data:</h4>
                      <div className="text-sm text-blue-800">
                        <div><strong>Subject:</strong> {replaceTemplateVariables(composeData.subject)}</div>
                        <div className="mt-2"><strong>Body:</strong></div>
                        <div className="whitespace-pre-wrap bg-white p-2 rounded border-2 border-blue-900">
                          {replaceTemplateVariables(composeData.body)}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : activeView === 'analytics' ? (
            <div className="flex-1 p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]"
                    onClick={() => alert('Total Sent Emails\n\nBreakdown:\n• This Month: 145 emails\n• Last Month: 132 emails\n• Growth: +9.8%\n\nBy Category:\n• Client Updates: 45\n• Tax Notifications: 38\n• General Correspondence: 62\n\nTop Recipients:\n• ABC Corp: 12 emails\n• XYZ Ltd: 9 emails')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-900">Total Sent</p>
                          <p className="text-3xl font-bold text-blue-900">{emailMetrics.totalSent}</p>
                        </div>
                        <Mail className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]"
                    onClick={() => alert('Open Rate Analysis\n\n• Current: 87.3%\n• Industry Average: 72%\n• Performance: +15.3% above average\n\nTop Performing:\n• Subject with client name: 94%\n• Urgent notifications: 91%\n• Monthly updates: 85%\n\nImprovement Areas:\n• Generic subjects: 68%\n• Long subjects: 71%')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-900">Open Rate</p>
                          <p className="text-3xl font-bold text-green-600">{emailMetrics.openRate}%</p>
                        </div>
                        <Eye className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]"
                    onClick={() => alert('Response Rate Details\n\n• Current: 64.2%\n• Target: 70%\n• Gap: -5.8%\n\nResponse Times:\n• Within 1 hour: 23%\n• Within 4 hours: 45%\n• Within 24 hours: 78%\n• After 24 hours: 22%\n\nBy Email Type:\n• Questions: 89%\n• Updates: 34%\n• Notifications: 12%')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-900">Response Rate</p>
                          <p className="text-3xl font-bold text-blue-900">{emailMetrics.responseRate}%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]"
                    onClick={() => alert('Average Response Time\n\n• Current: 2.4 hours\n• Last Month: 3.1 hours\n• Improvement: -22.6%\n\nBy Day:\n• Monday: 1.8h\n• Tuesday: 2.1h\n• Wednesday: 2.7h\n• Thursday: 2.9h\n• Friday: 3.2h\n\nBy Time:\n• Morning (9-12): 1.6h\n• Afternoon (12-5): 2.8h\n• Evening (5-9): 4.2h')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-900">Avg Response</p>
                          <p className="text-3xl font-bold text-blue-900">{emailMetrics.avgResponseTime}</p>
                        </div>
                        <Clock className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Inbox className="h-16 w-16 text-blue-900 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-blue-900 mb-2">Your Inbox</h3>
                <p className="text-blue-900 mb-4">No messages yet</p>
                <Button 
                  onClick={() => { setActiveView('compose'); setIsComposing(true); }}
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
        <div className="w-80 bg-white border-l-2 border-blue-900 flex flex-col">
          <div className="p-4 border-b-2 border-blue-900">
            <h3 className="font-semibold text-blue-900">Template Variables</h3>
            <p className="text-sm text-blue-900">Click to insert into email</p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Service Templates */}
            <div className="p-4 border-b-2 border-blue-900">
              <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-blue-900" />
                Service Templates
              </h4>
              <div className="space-y-2">
                {emailTemplates.slice(0, 5).map(template => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template)}
                    className="w-full text-left p-2 rounded-[2px] border-2 border-blue-900 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="font-medium text-sm text-blue-900">{template.name}</div>
                    <div className="text-xs text-blue-700">{template.category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Template Variables */}
            {templateVariables.map(category => {
              const Icon = category.icon
              return (
                <div key={category.category} className="p-4 border-b-2 border-blue-900">
                  <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                    <Icon className="h-4 w-4 mr-2 text-blue-900" />
                    {category.category}
                  </h4>
                  <div className="space-y-2">
                    {category.variables.map(variable => (
                      <button
                        key={variable.key}
                        onClick={() => insertVariable(variable.key)}
                        className="w-full text-left p-2 rounded-[2px] border-2 border-blue-900 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <div className="font-medium text-sm text-blue-900">{variable.label}</div>
                        <div className="text-xs text-blue-700">{variable.description}</div>
                        {templateData && (
                          <div className="text-xs text-blue-600 mt-1 font-medium">
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

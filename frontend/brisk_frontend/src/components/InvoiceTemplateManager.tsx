import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Plus, Eye, Edit, Trash2 } from 'lucide-react'
import TemplateBrandingEditor from './TemplateBrandingEditor'
import { invoiceTemplateApi, templateBrandingApi } from '../lib/templateApi'
import { InvoiceTemplate, TemplateBranding } from '../types/templates'

export default function InvoiceTemplateManager() {
  const [templates, setTemplates] = useState<InvoiceTemplate[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [branding, setBranding] = useState<TemplateBranding>({
    practice_id: 'default',
    template_id: 'default',
    custom_branding: {
      company_name: '',
      logo_url: '',
      address: '',
      phone: '',
      email: '',
      website: ''
    },
    theme_colors: {
      primary: '#0B5FFF',
      secondary: '#FF7A00',
      accent: '#10B981',
      text: '#1F2937',
      background: '#FFFFFF'
    },
    is_active: true
  })
  const [newTemplate, setNewTemplate] = useState<Partial<InvoiceTemplate>>({
    name: '',
    description: '',
    template_type: 'modern',
    is_default: false
  })

  const preloadedTemplates: InvoiceTemplate[] = [
    {
      id: 'invoice-1',
      name: 'Modern Professional',
      description: 'Clean, modern invoice design with bold typography and structured layout',
      template_type: 'modern',
      branding: {
        primary_color: '#0B5FFF',
        secondary_color: '#FF7A00',
        accent_color: '#10B981',
        text_color: '#1F2937',
        background_color: '#FFFFFF'
      },
      layout: {
        header_style: 'centered',
        footer_style: 'detailed',
        table_style: 'modern',
        font_family: 'Inter',
        font_size: 14,
        line_spacing: 1.5
      },
      custom_fields: [],
      is_default: true
    },
    {
      id: 'invoice-2',
      name: 'Classic Business',
      description: 'Traditional business invoice with formal styling and comprehensive details',
      template_type: 'classic',
      branding: {
        primary_color: '#059669',
        secondary_color: '#047857',
        accent_color: '#065f46',
        text_color: '#1F2937',
        background_color: '#FFFFFF'
      },
      layout: {
        header_style: 'left',
        footer_style: 'minimal',
        table_style: 'classic',
        font_family: 'Times New Roman',
        font_size: 12,
        line_spacing: 1.2
      },
      custom_fields: [],
      is_default: false
    },
    {
      id: 'invoice-3',
      name: 'Minimal Clean',
      description: 'Minimalist invoice design focusing on clarity and simplicity',
      template_type: 'minimal',
      branding: {
        primary_color: '#6B7280',
        secondary_color: '#4B5563',
        accent_color: '#374151',
        text_color: '#1F2937',
        background_color: '#FFFFFF'
      },
      layout: {
        header_style: 'centered',
        footer_style: 'compact',
        table_style: 'striped',
        font_family: 'Arial',
        font_size: 13,
        line_spacing: 1.4
      },
      custom_fields: [],
      is_default: false
    },
    {
      id: 'invoice-4',
      name: 'Corporate Elite',
      description: 'Professional corporate invoice template with premium styling',
      template_type: 'professional',
      branding: {
        primary_color: '#7C3AED',
        secondary_color: '#8B5CF6',
        accent_color: '#A78BFA',
        text_color: '#1F2937',
        background_color: '#FFFFFF'
      },
      layout: {
        header_style: 'right',
        footer_style: 'detailed',
        table_style: 'modern',
        font_family: 'Roboto',
        font_size: 14,
        line_spacing: 1.6
      },
      custom_fields: [],
      is_default: false
    },
    {
      id: 'invoice-5',
      name: 'Creative Studio',
      description: 'Creative and colorful invoice design for creative businesses',
      template_type: 'creative',
      branding: {
        primary_color: '#EC4899',
        secondary_color: '#DB2777',
        accent_color: '#BE185D',
        text_color: '#1F2937',
        background_color: '#FFFFFF'
      },
      layout: {
        header_style: 'centered',
        footer_style: 'compact',
        table_style: 'modern',
        font_family: 'Inter',
        font_size: 14,
        line_spacing: 1.5
      },
      custom_fields: [],
      is_default: false
    }
  ]

  useEffect(() => {
    loadTemplates()
    loadBranding()
  }, [])

  const loadTemplates = async () => {
    try {
      const response = await invoiceTemplateApi.getTemplates()
      setTemplates(response.templates || preloadedTemplates)
    } catch {
      setTemplates(preloadedTemplates)
    }
  }

  const loadBranding = async () => {
    try {
      const response = await templateBrandingApi.getBranding('practice-1')
      setBranding(response)
    } catch {
      console.log('Using default branding')
    }
  }

  const handleCreateTemplate = async () => {
    try {
      const templateData: InvoiceTemplate = {
        ...newTemplate,
        name: newTemplate.name || '',
        description: newTemplate.description || '',
        template_type: (newTemplate.template_type as InvoiceTemplate['template_type']) || 'modern',
        branding: {
          primary_color: '#0B5FFF',
          secondary_color: '#FF7A00',
          accent_color: '#10B981',
          text_color: '#1F2937',
          background_color: '#FFFFFF'
        },
        layout: {
          header_style: 'centered',
          footer_style: 'detailed',
          table_style: 'modern',
          font_family: 'Inter',
          font_size: 14,
          line_spacing: 1.5
        },
        custom_fields: [],
        is_default: newTemplate.is_default || false
      }
      await invoiceTemplateApi.createTemplate(templateData)
      setShowCreateDialog(false)
      setNewTemplate({ name: '', description: '', template_type: 'modern', is_default: false })
      loadTemplates()
    } catch (error) {
      console.error('Error creating template:', error)
    }
  }

  const handleUpdateBranding = async () => {
    try {
      await templateBrandingApi.updateBranding('practice-1', branding)
    } catch (error) {
      console.error('Error updating branding:', error)
    }
  }

  const getTemplateTypeColor = (type: string) => {
    switch (type) {
      case 'modern':
        return 'bg-blue-100 text-blue-800'
      case 'classic':
        return 'bg-green-100 text-green-800'
      case 'minimal':
        return 'bg-gray-100 text-gray-800'
      case 'professional':
        return 'bg-purple-100 text-purple-800'
      case 'creative':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handlePreviewTemplate = (template: InvoiceTemplate) => {
    console.log('Preview template:', template)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Invoice Templates</h2>
          <p className="text-gray-600">Customize invoice templates and branding for your business</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Invoice Template</DialogTitle>
                <DialogDescription>
                  Create a custom invoice template for your business
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    placeholder="Enter template name"
                  />
                </div>
                <div>
                  <Label htmlFor="template-description">Description</Label>
                  <Input
                    id="template-description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    placeholder="Enter template description"
                  />
                </div>
                <div>
                  <Label htmlFor="template-type">Template Type</Label>
                  <Select 
                    value={newTemplate.template_type} 
                    onValueChange={(value) => setNewTemplate({ ...newTemplate, template_type: value as InvoiceTemplate['template_type'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTemplate}>
                    Create Template
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex gap-1">
                      {template.is_default && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                      <Badge className={getTemplateTypeColor(template.template_type)}>
                        {template.template_type}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePreviewTemplate(template)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <TemplateBrandingEditor
            branding={branding}
            onBrandingChange={setBranding}
            templateType="invoice"
          />
          <div className="flex justify-end">
            <Button onClick={handleUpdateBranding}>
              Save Branding Settings
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Preview</CardTitle>
              <CardDescription>
                Preview how your invoice templates will appear with current branding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 bg-white min-h-[400px]">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      {branding.custom_branding?.logo_url && (
                        <img 
                          src={branding.custom_branding.logo_url} 
                          alt="Company Logo" 
                          className="max-h-16 mb-4"
                        />
                      )}
                      <h3 
                        className="text-2xl font-bold"
                        style={{ 
                          color: branding.theme_colors?.primary,
                          fontFamily: 'Inter'
                        }}
                      >
                        {branding.custom_branding?.company_name || 'Your Company Name'}
                      </h3>
                      <p className="text-gray-600">
                        {branding.custom_branding?.address || '123 Business Street, City, Country'}
                      </p>
                      <p className="text-gray-600">
                        {branding.custom_branding?.phone || '+44 20 1234 5678'} | {branding.custom_branding?.email || 'info@company.com'}
                      </p>
                    </div>
                    <div className="text-right">
                      <h2 
                        className="text-3xl font-bold mb-2"
                        style={{ color: branding.theme_colors?.primary }}
                      >
                        INVOICE
                      </h2>
                      <p className="text-gray-600">Invoice #: INV-001</p>
                      <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                      <p className="text-gray-600">Due Date: {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-2">Bill To:</h4>
                      <p className="font-medium">ABC Client Ltd</p>
                      <p className="text-gray-600">456 Client Avenue</p>
                      <p className="text-gray-600">London, UK</p>
                      <p className="text-gray-600">client@example.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Payment Terms:</h4>
                      <p className="text-gray-600">Net 30 days</p>
                      <p className="text-gray-600">Bank transfer preferred</p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div 
                      className="px-4 py-3 font-semibold text-white"
                      style={{ backgroundColor: branding.theme_colors?.primary }}
                    >
                      <div className="grid grid-cols-4 gap-4">
                        <span>Description</span>
                        <span className="text-center">Quantity</span>
                        <span className="text-center">Rate</span>
                        <span className="text-right">Amount</span>
                      </div>
                    </div>
                    <div className="px-4 py-3 border-b">
                      <div className="grid grid-cols-4 gap-4">
                        <span>Professional Services</span>
                        <span className="text-center">10</span>
                        <span className="text-center">£150.00</span>
                        <span className="text-right">£1,500.00</span>
                      </div>
                    </div>
                    <div className="px-4 py-3 border-b">
                      <div className="grid grid-cols-4 gap-4">
                        <span>Consultation</span>
                        <span className="text-center">5</span>
                        <span className="text-center">£200.00</span>
                        <span className="text-right">£1,000.00</span>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50">
                      <div className="grid grid-cols-4 gap-4">
                        <span className="col-span-3 text-right font-semibold">Subtotal:</span>
                        <span className="text-right font-semibold">£2,500.00</span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mt-1">
                        <span className="col-span-3 text-right">VAT (20%):</span>
                        <span className="text-right">£500.00</span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mt-2 pt-2 border-t">
                        <span className="col-span-3 text-right text-lg font-bold">Total:</span>
                        <span 
                          className="text-right text-lg font-bold"
                          style={{ color: branding.theme_colors?.primary }}
                        >
                          £3,000.00
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-gray-600 text-sm">
                    <p>Thank you for your business!</p>
                    <p>Payment is due within 30 days of invoice date.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

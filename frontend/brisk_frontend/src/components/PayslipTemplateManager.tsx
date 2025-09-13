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
import { payslipTemplateApi, templateBrandingApi } from '../lib/templateApi'
import { PayslipTemplate, TemplateBranding } from '../types/templates'

export default function PayslipTemplateManager() {
  const [templates, setTemplates] = useState<PayslipTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<PayslipTemplate | null>(null)
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
      secondary: '#1E40AF',
      accent: '#10B981',
      text: '#1F2937',
      background: '#FFFFFF'
    },
    is_active: true
  })
  const [newTemplate, setNewTemplate] = useState<Partial<PayslipTemplate>>({
    name: '',
    description: '',
    template_type: 'modern',
    is_default: false
  })

  const preloadedTemplates: PayslipTemplate[] = [
    {
      id: 'template-1',
      name: 'Modern Professional',
      description: 'Clean, modern payslip design with structured layout and professional styling',
      template_type: 'modern',
      branding: {
        primary_color: '#0B5FFF',
        secondary_color: '#1E40AF',
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
      id: 'template-2',
      name: 'Classic Business',
      description: 'Traditional payslip format with formal styling and comprehensive details',
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
      id: 'template-3',
      name: 'Minimal Clean',
      description: 'Minimalist payslip focusing on clarity and essential information',
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
      id: 'template-4',
      name: 'Corporate Elite',
      description: 'Premium corporate payslip template with sophisticated design elements',
      template_type: 'corporate',
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
      id: 'template-5',
      name: 'Creative Studio',
      description: 'Creative and colorful payslip design for modern creative businesses',
      template_type: 'professional',
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
      const response = await payslipTemplateApi.getTemplates()
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
      const templateData: PayslipTemplate = {
        ...newTemplate,
        name: newTemplate.name || '',
        description: newTemplate.description || '',
        template_type: (newTemplate.template_type as PayslipTemplate['template_type']) || 'modern',
        branding: {
          primary_color: '#0B5FFF',
          secondary_color: '#1E40AF',
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
      await payslipTemplateApi.createTemplate(templateData)
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
      case 'corporate':
        return 'bg-purple-100 text-purple-800'
      case 'creative':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handlePreviewTemplate = (template: PayslipTemplate) => {
    setSelectedTemplate(template)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payslip Templates</h2>
          <p className="text-gray-600">Customize payslip templates and branding for your organization</p>
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
                <DialogTitle>Create New Payslip Template</DialogTitle>
                <DialogDescription>
                  Create a custom payslip template for your organization
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
                    onValueChange={(value) => setNewTemplate({ ...newTemplate, template_type: value as PayslipTemplate['template_type'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
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
            templateType="payslip"
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
              <CardTitle>Template Preview</CardTitle>
              <CardDescription>
                Preview how your payslip templates will appear with current branding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 bg-white min-h-[400px]">
                <div className="space-y-4">
                  {branding.custom_branding?.logo_url && (
                    <div className="flex justify-center">
                      <img 
                        src={branding.custom_branding.logo_url} 
                        alt="Company Logo" 
                        className="max-h-16"
                      />
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 
                      className="text-xl font-semibold mb-2"
                      style={{ 
                        color: branding.theme_colors?.primary,
                        fontFamily: 'Inter'
                      }}
                    >
                      {branding.custom_branding?.company_name || 'Your Company Name'}
                    </h3>
                    <h4 className="text-lg font-medium mb-4">
                      {selectedTemplate?.name || 'Payslip Template Preview'}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Employee Name</p>
                        <p className="font-medium">John Smith</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Employee Number</p>
                        <p className="font-medium">EMP001</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pay Period</p>
                        <p className="font-medium">January 2024</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pay Date</p>
                        <p className="font-medium">31/01/2024</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h5 className="font-medium mb-2">Earnings</h5>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Basic Salary</span>
                          <span>£3,000.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Overtime</span>
                          <span>£200.00</span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-1">
                          <span>Gross Pay</span>
                          <span>£3,200.00</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h5 className="font-medium mb-2">Deductions</h5>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Income Tax</span>
                          <span>£480.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>National Insurance</span>
                          <span>£256.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pension</span>
                          <span>£96.00</span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-1">
                          <span>Total Deductions</span>
                          <span>£832.00</span>
                        </div>
                      </div>
                    </div>

                    <div 
                      className="border-t pt-4 p-3 rounded"
                      style={{ backgroundColor: `${branding.theme_colors?.primary}10` }}
                    >
                      <div className="flex justify-between text-lg font-bold">
                        <span>Net Pay</span>
                        <span style={{ color: branding.theme_colors?.primary }}>£2,368.00</span>
                      </div>
                    </div>
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

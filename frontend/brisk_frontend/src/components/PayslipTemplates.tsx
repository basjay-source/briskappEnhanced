import React, { useState, useEffect } from 'react'
import {
  FileText, Plus, Edit, Copy, Trash2, Eye, Palette, Type, Layout, Save, ArrowLeft,
  Clock, Users, CheckCircle, TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { api } from '@/lib/api'

interface PayslipTemplate {
  id: string
  name: string
  description: string
  category: string
  logoUrl?: string
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  headerText: string
  footerText: string
  includeCompanyDetails: boolean
  includeEmployeePhoto: boolean
  showDeductionBreakdown: boolean
  showYTDTotals: boolean
  usageCount: number
  lastUsed?: string
  createdAt: string
  createdBy: string
}

interface TemplateMetrics {
  totalTemplates: number
  totalPayslipsGenerated: number
  avgProcessingTime: string
  mostUsedTemplate: string
}

export default function PayslipTemplates() {
  const [templates, setTemplates] = useState<PayslipTemplate[]>([])
  const [metrics, setMetrics] = useState<TemplateMetrics>({
    totalTemplates: 0,
    totalPayslipsGenerated: 0,
    avgProcessingTime: '0s',
    mostUsedTemplate: 'N/A'
  })
  const [selectedTemplate, setSelectedTemplate] = useState<PayslipTemplate | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('templates')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'standard',
    primaryColor: '#1e3a8a',
    secondaryColor: '#3b82f6',
    fontFamily: 'Arial',
    headerText: '',
    footerText: '',
    includeCompanyDetails: true,
    includeEmployeePhoto: false,
    showDeductionBreakdown: true,
    showYTDTotals: true
  })

  useEffect(() => {
    loadTemplates()
    loadMetrics()
  }, [])

  const loadTemplates = async () => {
    try {
      const response = await api.get('/api/v1/payroll/payslip-templates')
      setTemplates(response.data || [])
    } catch (error) {
      console.error('Failed to load templates:', error)
    }
  }

  const loadMetrics = async () => {
    try {
      const response = await api.get('/api/v1/payroll/payslip-metrics')
      setMetrics(response.data || metrics)
    } catch (error) {
      console.error('Failed to load metrics:', error)
    }
  }

  const handleCreate = async () => {
    try {
      const response = await api.post('/api/v1/payroll/payslip-templates', formData)
      setTemplates([...templates, response.data])
      setIsCreating(false)
      resetForm()
      loadMetrics()
    } catch (error) {
      console.error('Failed to create template:', error)
    }
  }

  const handleUpdate = async () => {
    if (!selectedTemplate) return
    try {
      const response = await api.put(`/api/v1/payroll/payslip-templates/${selectedTemplate.id}`, formData)
      setTemplates(templates.map(t => t.id === selectedTemplate.id ? response.data : t))
      setIsEditing(false)
      setSelectedTemplate(null)
      resetForm()
    } catch (error) {
      console.error('Failed to update template:', error)
    }
  }

  const handleClone = async (template: PayslipTemplate) => {
    try {
      const clonedData = {
        ...template,
        name: `${template.name} (Copy)`,
        id: undefined,
        createdAt: undefined,
        usageCount: 0
      }
      const response = await api.post('/api/v1/payroll/payslip-templates', clonedData)
      setTemplates([...templates, response.data])
      loadMetrics()
    } catch (error) {
      console.error('Failed to clone template:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return
    try {
      await api.delete(`/api/v1/payroll/payslip-templates/${id}`)
      setTemplates(templates.filter(t => t.id !== id))
      loadMetrics()
    } catch (error) {
      console.error('Failed to delete template:', error)
    }
  }

  const handleEdit = (template: PayslipTemplate) => {
    setSelectedTemplate(template)
    setFormData({
      name: template.name,
      description: template.description,
      category: template.category,
      primaryColor: template.primaryColor,
      secondaryColor: template.secondaryColor,
      fontFamily: template.fontFamily,
      headerText: template.headerText,
      footerText: template.footerText,
      includeCompanyDetails: template.includeCompanyDetails,
      includeEmployeePhoto: template.includeEmployeePhoto,
      showDeductionBreakdown: template.showDeductionBreakdown,
      showYTDTotals: template.showYTDTotals
    })
    setIsEditing(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'standard',
      primaryColor: '#1e3a8a',
      secondaryColor: '#3b82f6',
      fontFamily: 'Arial',
      headerText: '',
      footerText: '',
      includeCompanyDetails: true,
      includeEmployeePhoto: false,
      showDeductionBreakdown: true,
      showYTDTotals: true
    })
  }

  const fontFamilies = ['Arial', 'Calibri', 'Times New Roman', 'Verdana', 'Georgia', 'Courier New']
  const categories = [
    { value: 'standard', label: 'Standard Payslip' },
    { value: 'executive', label: 'Executive Payslip' },
    { value: 'detailed', label: 'Detailed Breakdown' },
    { value: 'simple', label: 'Simple Format' },
    { value: 'international', label: 'International' }
  ]

  if (isCreating || isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setIsCreating(false)
              setIsEditing(false)
              setSelectedTemplate(null)
              resetForm()
            }}
            className="border-2 border-blue-900 text-blue-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-blue-900">
              {isEditing ? 'Edit Template' : 'Create New Template'}
            </h2>
            <p className="text-blue-900">Configure your payslip template with custom branding</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-2 border-blue-900 rounded-[2px]">
            <CardHeader>
              <CardTitle className="text-blue-900">Basic Information</CardTitle>
              <CardDescription className="text-blue-900">Template name, category and description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-900">Template Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Standard Monthly Payslip"
                    className="border-2 border-blue-900 text-blue-900"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Category *</label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger className="border-2 border-blue-900 text-blue-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value} className="text-blue-900">
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-900">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the template usage and features..."
                  rows={3}
                  className="border-2 border-blue-900 text-blue-900"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-900 rounded-[2px]">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Branding & Design
              </CardTitle>
              <CardDescription className="text-blue-900">Customize colors and fonts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-900">Primary Color</label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-16 h-10 border-2 border-blue-900 rounded cursor-pointer"
                    />
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="border-2 border-blue-900 text-blue-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Secondary Color</label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="w-16 h-10 border-2 border-blue-900 rounded cursor-pointer"
                    />
                    <Input
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="border-2 border-blue-900 text-blue-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Font Family</label>
                  <Select value={formData.fontFamily} onValueChange={(v) => setFormData({ ...formData, fontFamily: v })}>
                    <SelectTrigger className="border-2 border-blue-900 text-blue-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map(font => (
                        <SelectItem key={font} value={font} className="text-blue-900">{font}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-900 rounded-[2px]">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center gap-2">
                <Type className="h-5 w-5" />
                Header & Footer
              </CardTitle>
              <CardDescription className="text-blue-900">Configure header and footer text</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-blue-900">Header Text</label>
                <Input
                  value={formData.headerText}
                  onChange={(e) => setFormData({ ...formData, headerText: e.target.value })}
                  placeholder="Company name or payslip title"
                  className="border-2 border-blue-900 text-blue-900"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-blue-900">Footer Text</label>
                <Input
                  value={formData.footerText}
                  onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
                  placeholder="Confidential notice or contact info"
                  className="border-2 border-blue-900 text-blue-900"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-900 rounded-[2px]">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Display Options
              </CardTitle>
              <CardDescription className="text-blue-900">Configure what information to display</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'includeCompanyDetails', label: 'Include Company Details', desc: 'Show company info' },
                  { key: 'includeEmployeePhoto', label: 'Include Employee Photo', desc: 'Display employee photo' },
                  { key: 'showDeductionBreakdown', label: 'Show Deduction Breakdown', desc: 'Display detailed deductions' },
                  { key: 'showYTDTotals', label: 'Show Year-to-Date Totals', desc: 'Include YTD earnings' }
                ].map(option => (
                  <div key={option.key} className="border-2 border-blue-900 rounded-[2px] p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[option.key as keyof typeof formData] as boolean}
                        onChange={(e) => setFormData({ ...formData, [option.key]: e.target.checked })}
                        className="w-5 h-5 mt-0.5 border-2 border-blue-900 rounded text-blue-900"
                      />
                      <div>
                        <div className="text-sm font-medium text-blue-900">{option.label}</div>
                        <div className="text-xs text-blue-700">{option.desc}</div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3 justify-end border-t-2 border-blue-900 pt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsCreating(false)
                setIsEditing(false)
                setSelectedTemplate(null)
                resetForm()
              }}
              className="border-2 border-blue-900 text-blue-900"
            >
              Cancel
            </Button>
            <Button
              onClick={isEditing ? handleUpdate : handleCreate}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? 'Update Template' : 'Create Template'}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Payslip Templates</h2>
          <p className="text-blue-900">Streamline payroll processing with branded templates</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]"
          onClick={() => alert(`Total Templates\n\nActive: ${metrics.totalTemplates}\nMost Used: ${metrics.mostUsedTemplate}`)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-900">Total Templates</p>
                <p className="text-3xl font-bold text-blue-900">{metrics.totalTemplates}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]"
          onClick={() => alert(`Payslips Generated\n\nThis Month: ${metrics.totalPayslipsGenerated}`)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-900">Payslips Generated</p>
                <p className="text-3xl font-bold text-green-600">{metrics.totalPayslipsGenerated}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]"
          onClick={() => alert(`Processing Time\n\nAverage: ${metrics.avgProcessingTime}`)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-900">Avg Processing Time</p>
                <p className="text-3xl font-bold text-blue-900">{metrics.avgProcessingTime}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-900 rounded-[2px]"
          onClick={() => alert(`Most Used Template\n\nName: ${metrics.mostUsedTemplate}`)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-900">Most Used</p>
                <p className="text-lg font-bold text-blue-900">{metrics.mostUsedTemplate}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 border-2 border-blue-900">
          <TabsTrigger value="templates" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Templates
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map(template => (
              <Card key={template.id} className="border-2 border-blue-900 rounded-[2px]">
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center justify-between">
                    <span>{template.name}</span>
                    <Badge className="bg-blue-100 text-blue-800">{template.category}</Badge>
                  </CardTitle>
                  <CardDescription className="text-blue-900">{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-blue-900">
                    <Users className="h-4 w-4" />
                    <span>Used {template.usageCount} times</span>
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="w-8 h-8 rounded border-2 border-blue-900"
                      style={{ backgroundColor: template.primaryColor }}
                      title="Primary Color"
                    />
                    <div
                      className="w-8 h-8 rounded border-2 border-blue-900"
                      style={{ backgroundColor: template.secondaryColor }}
                      title="Secondary Color"
                    />
                    <span className="text-sm text-blue-900 ml-2">{template.fontFamily}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(template)} className="border-2 border-blue-900 text-blue-900">
                      <Edit className="h-4 w-4 mr-1" />Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleClone(template)} className="border-2 border-blue-900 text-blue-900">
                      <Copy className="h-4 w-4 mr-1" />Clone
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => alert('Preview coming soon')} className="border-2 border-blue-900 text-blue-900">
                      <Eye className="h-4 w-4 mr-1" />Preview
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(template.id)} className="border-2 border-red-600 text-red-600">
                      <Trash2 className="h-4 w-4 mr-1" />Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-2 border-blue-900 rounded-[2px]">
              <CardHeader>
                <CardTitle className="text-blue-900">Usage Statistics</CardTitle>
                <CardDescription className="text-blue-900">Most used templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.slice(0, 5).map(template => (
                    <div key={template.id} className="flex items-center justify-between p-3 border-2 border-blue-900 rounded-[2px]">
                      <span className="text-sm text-blue-900 font-medium">{template.name}</span>
                      <Badge className="bg-blue-100 text-blue-800">{template.usageCount} uses</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-900 rounded-[2px]">
              <CardHeader>
                <CardTitle className="text-blue-900">Template Categories</CardTitle>
                <CardDescription className="text-blue-900">Distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map(cat => {
                    const count = templates.filter(t => t.category === cat.value).length
                    return (
                      <div key={cat.value} className="flex items-center justify-between p-3 border-2 border-blue-900 rounded-[2px]">
                        <span className="text-sm text-blue-900 font-medium">{cat.label}</span>
                        <Badge className="bg-blue-100 text-blue-800">{count} templates</Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

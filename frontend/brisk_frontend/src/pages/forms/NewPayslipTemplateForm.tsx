import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { ArrowLeft, FileText } from 'lucide-react'
import { payslipTemplateApi } from '../../lib/templateApi'
import type { PayslipTemplate } from '../../types/templates'

export default function NewPayslipTemplateForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [newTemplate, setNewTemplate] = useState<Partial<PayslipTemplate>>({
    name: '',
    description: '',
    template_type: 'modern'
  })

  const handleCreateTemplate = async () => {
    if (!newTemplate.name) return

    setIsLoading(true)
    try {
      const templateData: PayslipTemplate = {
        ...newTemplate,
        name: newTemplate.name || '',
        description: newTemplate.description || '',
        template_type: (newTemplate.template_type as PayslipTemplate['template_type']) || 'modern',
        branding: {
          primary_color: '#0B5FFF',
          secondary_color: '#1E40AF',
          accent_color: '#F59E0B',
          text_color: '#1F2937',
          background_color: '#FFFFFF'
        },
        layout: {
          header_style: 'centered',
          footer_style: 'minimal',
          table_style: 'modern',
          font_family: 'Inter',
          font_size: 12,
          line_spacing: 1.2
        },
        custom_fields: [],
        is_default: false
      }

      await payslipTemplateApi.createTemplate(templateData)
      navigate('/app/admin', { 
        state: { message: 'Payslip template created successfully!' }
      })
    } catch (error) {
      console.error('Failed to create template:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/app/admin')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Button>
          <h1 className="text-3xl font-bold">{t('templates.createNewPayslipTemplate')}</h1>
          <p className="text-gray-600 mt-2">
            {t('templates.createCustomPayslipTemplate')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('templates.templateDetails')}
            </CardTitle>
            <CardDescription>
              {t('templates.fillTemplateDetailsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="template-name">{t('templates.templateName')} *</Label>
              <Input
                id="template-name"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                placeholder={t('templates.templateNamePlaceholder')}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="template-description">{t('templates.description')}</Label>
              <Input
                id="template-description"
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                placeholder={t('templates.descriptionPlaceholder')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="template-type">{t('templates.templateType')}</Label>
              <Select 
                value={newTemplate.template_type} 
                onValueChange={(value) => setNewTemplate({ ...newTemplate, template_type: value as PayslipTemplate['template_type'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">{t('templates.modern')}</SelectItem>
                  <SelectItem value="classic">{t('templates.classic')}</SelectItem>
                  <SelectItem value="minimal">{t('templates.minimal')}</SelectItem>
                  <SelectItem value="corporate">{t('templates.corporate')}</SelectItem>
                  <SelectItem value="creative">{t('templates.creative')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/app/admin')}
            disabled={isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button 
            onClick={handleCreateTemplate} 
            disabled={!newTemplate.name || isLoading}
          >
            {isLoading ? t('common.creating') : t('templates.createTemplate')}
          </Button>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Send, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  Download,
  Eye
} from 'lucide-react'

interface FormField {
  id: string
  label: string
  type: 'text' | 'number' | 'email' | 'date' | 'select' | 'textarea' | 'checkbox' | 'currency'
  required?: boolean
  options?: { label: string; value: string }[]
  validation?: (value: any) => string | null
  helpText?: string
  placeholder?: string
}

interface FormPage {
  id: string
  title: string
  description: string
  fields: FormField[]
  validation?: (data: Record<string, any>) => string[]
}

interface GovernmentFormWizardProps {
  formType: 'hmrc' | 'companies-house' | 'payroll'
  formName: string
  formCode: string
  pages: FormPage[]
  onSave: (data: Record<string, any>) => void
  onSubmit: (data: Record<string, any>) => void
  onPreview: (data: Record<string, any>) => void
  initialData?: Record<string, any>
  className?: string
}

export function GovernmentFormWizard({
  formType,
  formName,
  formCode,
  pages,
  onSave,
  onSubmit,
  onPreview,
  initialData = {},
  className = ''
}: GovernmentFormWizardProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const getFormColors = () => {
    switch (formType) {
      case 'hmrc':
        return {
          primary: 'bg-brisk-hmrc-green',
          secondary: 'bg-brisk-hmrc-green-50',
          border: 'border-brisk-hmrc-green',
          text: 'text-brisk-hmrc-green-700',
          button: 'hmrc-primary'
        }
      case 'companies-house':
        return {
          primary: 'bg-brisk-companies-house-blue',
          secondary: 'bg-brisk-companies-house-blue-50',
          border: 'border-brisk-companies-house-blue',
          text: 'text-blue-700',
          button: 'companies-house'
        }
      case 'payroll':
        return {
          primary: 'bg-brisk-hmrc-green',
          secondary: 'bg-white',
          border: 'border-brisk-hmrc-green',
          text: 'text-brisk-hmrc-green-700',
          button: 'hmrc-primary'
        }
      default:
        return {
          primary: 'bg-brisk-blue-500',
          secondary: 'bg-brisk-blue-50',
          border: 'border-brisk-blue-500',
          text: 'text-brisk-blue-700',
          button: 'brisk-primary'
        }
    }
  }

  const colors = getFormColors()
  const currentPageData = pages[currentPage]
  const progress = ((currentPage + 1) / pages.length) * 100

  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && (!value || value === '')) {
      return `${field.label} is required`
    }

    if (field.validation) {
      return field.validation(value)
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address'
      }
    }

    if (field.type === 'number' && value && isNaN(Number(value))) {
      return 'Please enter a valid number'
    }

    return null
  }

  const validateCurrentPage = (): boolean => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    currentPageData.fields.forEach(field => {
      const error = validateField(field, formData[field.id])
      if (error) {
        newErrors[field.id] = error
        isValid = false
      }
    })

    if (currentPageData.validation) {
      const pageErrors = currentPageData.validation(formData)
      if (pageErrors.length > 0) {
        pageErrors.forEach((error, index) => {
          newErrors[`page_${index}`] = error
        })
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
    
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  const handleNext = () => {
    if (validateCurrentPage()) {
      setCurrentPage(prev => Math.min(pages.length - 1, prev + 1))
    }
  }

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(formData)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentPage()) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: FormField) => {
    const value = formData[field.id] || ''
    const error = errors[field.id]

    const fieldProps = {
      id: field.id,
      value,
      onChange: (e: any) => handleFieldChange(field.id, e.target.value),
      className: `${error ? 'border-red-500' : colors.border} focus:ring-2 focus:ring-opacity-50`,
      placeholder: field.placeholder
    }

    return (
      <div key={field.id} className="space-y-2">
        <Label htmlFor={field.id} className={`${colors.text} font-medium`}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        
        {field.type === 'select' ? (
          <Select value={value} onValueChange={(val) => handleFieldChange(field.id, val)}>
            <SelectTrigger className={fieldProps.className}>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : field.type === 'textarea' ? (
          <Textarea {...fieldProps} rows={4} />
        ) : field.type === 'checkbox' ? (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={value === true}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
            />
            <Label htmlFor={field.id} className="text-sm">
              {field.label}
            </Label>
          </div>
        ) : (
          <Input {...fieldProps} type={field.type} />
        )}
        
        {field.helpText && (
          <p className="text-sm text-black">{field.helpText}</p>
        )}
        
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4 text-white" />
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <Card className={`${colors.secondary} ${colors.border} border-2`}>
        <CardHeader className={`${colors.primary} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">
                {formType === 'hmrc' && 'HM Revenue & Customs'}
                {formType === 'companies-house' && 'Companies House'}
                {formType === 'payroll' && 'HMRC Payroll'}
              </CardTitle>
              <CardDescription className="text-white/90">
                {formName} ({formCode})
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Step {currentPage + 1} of {pages.length}</div>
              <div className="text-xs opacity-75">{Math.round(progress)}% Complete</div>
            </div>
          </div>
          <Progress value={progress} className="mt-4 bg-white/20" />
        </CardHeader>

        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className={`text-xl font-semibold ${colors.text} mb-2`}>
              {currentPageData.title}
            </h2>
            <p className="text-black">{currentPageData.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPageData.fields.map(renderField)}
          </div>

          {Object.keys(errors).filter(key => key.startsWith('page_')).length > 0 && (
            <div className="mt-6 p-4 bg-red-50 border border-brisk-navy-blue rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">Page Validation Errors:</h4>
              <ul className="list-disc list-inside text-red-700 text-sm">
                {Object.entries(errors)
                  .filter(([key]) => key.startsWith('page_'))
                  .map(([key, error]) => (
                    <li key={key}>{error}</li>
                  ))}
              </ul>
            </div>
          )}
        </CardContent>

        <div className="flex items-center justify-between p-6 border-t border-brisk-navy-blue bg-gray-50">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={handleSave}
              disabled={isSaving}
              className="text-black"
            >
              <Save className="h-4 w-4 mr-2 text-white" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => onPreview(formData)}
              className="text-black"
            >
              <Eye className="h-4 w-4 mr-2 text-white" />
              Preview
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2 text-white" />
              Previous
            </Button>

            {currentPage < pages.length - 1 ? (
              <Button
                variant={colors.button as any}
                onClick={handleNext}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2 text-white" />
              </Button>
            ) : (
              <Button
                variant={colors.button as any}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <Send className="h-4 w-4 mr-2 text-white" />
                {isSubmitting ? 'Submitting...' : 'Submit to Government'}
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div className="mt-4 flex items-center justify-center gap-2">
        {pages.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index <= currentPage ? colors.primary : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

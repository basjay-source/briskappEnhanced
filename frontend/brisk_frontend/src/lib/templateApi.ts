import { PayslipTemplate, InvoiceTemplate, TemplateBranding } from '../types/templates'

const API_BASE = '/api'

const api = {
  get: async (url: string) => {
    const response = await fetch(`${API_BASE}${url}`)
    return response.json()
  },
  post: async (url: string, data: unknown) => {
    const response = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  },
  put: async (url: string, data: unknown) => {
    const response = await fetch(`${API_BASE}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  },
  delete: async (url: string) => {
    const response = await fetch(`${API_BASE}${url}`, {
      method: 'DELETE'
    })
    return response.json()
  }
}

export const payslipTemplateApi = {
  getTemplates: () => api.get('/payslip-templates'),
  createTemplate: (template: PayslipTemplate) => api.post('/payslip-templates', template),
  updateTemplate: (id: string, template: PayslipTemplate) => api.put(`/payslip-templates/${id}`, template),
  deleteTemplate: (id: string) => api.delete(`/payslip-templates/${id}`),
  previewTemplate: (templateId: string, payslipId: string) => 
    api.get(`/payslip-templates/${templateId}/preview?payslip_id=${payslipId}`),
  generatePayslip: (templateId: string, payslipData: Record<string, unknown>) => 
    api.post(`/payslip-templates/${templateId}/generate`, payslipData)
}

export const invoiceTemplateApi = {
  getTemplates: () => api.get('/invoice-templates'),
  createTemplate: (template: InvoiceTemplate) => api.post('/invoice-templates', template),
  updateTemplate: (id: string, template: InvoiceTemplate) => api.put(`/invoice-templates/${id}`, template),
  deleteTemplate: (id: string) => api.delete(`/invoice-templates/${id}`),
  previewTemplate: (templateId: string, invoiceData: Record<string, unknown>) => 
    api.post(`/invoice-templates/${templateId}/preview`, invoiceData),
  generateInvoice: (templateId: string, invoiceData: Record<string, unknown>) => 
    api.post(`/invoice-templates/${templateId}/generate`, invoiceData)
}

export const templateBrandingApi = {
  getBranding: (practiceId: string) => api.get(`/template-branding/${practiceId}`),
  updateBranding: (practiceId: string, branding: TemplateBranding) => 
    api.put(`/template-branding/${practiceId}`, branding),
  uploadLogo: async (file: File) => {
    const formData = new FormData()
    formData.append('logo', file)
    const response = await fetch(`${API_BASE}/template-branding/upload-logo`, {
      method: 'POST',
      body: formData
    })
    return response.json()
  }
}

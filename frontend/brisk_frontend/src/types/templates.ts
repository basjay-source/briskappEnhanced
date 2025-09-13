export interface TemplateBranding {
  id?: string
  practice_id: string
  template_id: string
  custom_branding: {
    company_name: string
    company_tagline?: string
    logo_url?: string
    address: string
    phone?: string
    email?: string
    website?: string
    tax_number?: string
    registration_number?: string
  }
  theme_colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  font_family?: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface PayslipTemplate {
  id?: string
  name: string
  description?: string
  template_type: 'modern' | 'classic' | 'minimal' | 'professional' | 'corporate'
  branding: {
    primary_color: string
    secondary_color: string
    accent_color: string
    text_color: string
    background_color: string
  }
  layout: {
    header_style: 'centered' | 'left' | 'right'
    footer_style: 'minimal' | 'detailed' | 'compact'
    table_style: 'modern' | 'classic' | 'striped'
    font_family: string
    font_size: number
    line_spacing: number
  }
  custom_fields: Array<{
    name: string
    type: 'text' | 'number' | 'date' | 'boolean'
    required: boolean
    default_value?: string | number | boolean
  }>
  is_default: boolean
  created_at?: string
  updated_at?: string
}

export interface InvoiceTemplate {
  id?: string
  name: string
  description?: string
  template_type: 'modern' | 'classic' | 'minimal' | 'professional' | 'creative'
  branding: {
    primary_color: string
    secondary_color: string
    accent_color: string
    text_color: string
    background_color: string
  }
  layout: {
    header_style: 'centered' | 'left' | 'right'
    footer_style: 'minimal' | 'detailed' | 'compact'
    table_style: 'modern' | 'classic' | 'striped'
    font_family: string
    font_size: number
    line_spacing: number
  }
  custom_fields: Array<{
    name: string
    type: 'text' | 'number' | 'date' | 'boolean'
    required: boolean
    default_value?: string | number | boolean
  }>
  is_default: boolean
  created_at?: string
  updated_at?: string
}

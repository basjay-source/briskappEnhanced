import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Image, Palette } from 'lucide-react'
import { TemplateBranding } from '../types/templates'

interface TemplateBrandingEditorProps {
  branding: TemplateBranding
  onBrandingChange: (branding: TemplateBranding) => void
  templateType: 'payslip' | 'invoice'
}

export default function TemplateBrandingEditor({
  branding,
  onBrandingChange,
  templateType
}: TemplateBrandingEditorProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleLogoUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onBrandingChange({
          ...branding,
          custom_branding: {
            ...branding.custom_branding,
            logo_url: event.target?.result as string
          }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Company Branding
        </CardTitle>
        <CardDescription>
          Customize your company's appearance in {templateType} templates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={branding.custom_branding?.company_name || ''}
                onChange={(e) => onBrandingChange({
                  ...branding,
                  custom_branding: {
                    ...branding.custom_branding,
                    company_name: e.target.value
                  }
                })}
                placeholder="Enter company name"
              />
            </div>
            
            <div>
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primary-color"
                  type="color"
                  value={branding.theme_colors?.primary || '#0B5FFF'}
                  onChange={(e) => onBrandingChange({
                    ...branding,
                    theme_colors: {
                      ...branding.theme_colors,
                      primary: e.target.value
                    }
                  })}
                  className="w-16 h-10"
                />
                <Input
                  value={branding.theme_colors?.primary || '#0B5FFF'}
                  onChange={(e) => onBrandingChange({
                    ...branding,
                    theme_colors: {
                      ...branding.theme_colors,
                      primary: e.target.value
                    }
                  })}
                  placeholder="#0B5FFF"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondary-color"
                  type="color"
                  value={branding.theme_colors?.secondary || '#1E40AF'}
                  onChange={(e) => onBrandingChange({
                    ...branding,
                    theme_colors: {
                      ...branding.theme_colors,
                      secondary: e.target.value
                    }
                  })}
                  className="w-16 h-10"
                />
                <Input
                  value={branding.theme_colors?.secondary || '#1E40AF'}
                  onChange={(e) => onBrandingChange({
                    ...branding,
                    theme_colors: {
                      ...branding.theme_colors,
                      secondary: e.target.value
                    }
                  })}
                  placeholder="#1E40AF"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="font-family">Font Family</Label>
              <Select 
                value={branding.font_family || 'Inter'} 
                onValueChange={(value) => onBrandingChange({
                  ...branding,
                  font_family: value
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                  <SelectItem value="Lato">Lato</SelectItem>
                  <SelectItem value="Montserrat">Montserrat</SelectItem>
                  <SelectItem value="Poppins">Poppins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Company Logo</Label>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  dragActive ? 'border-brisk-primary bg-blue-50' : 'border-blue-900 hover:border-brisk-primary'
                }`}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragActive(true)
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDragActive(false)
                  const files = Array.from(e.dataTransfer.files)
                  if (files.length > 0) handleLogoUpload(files[0])
                }}
                onClick={() => {
                  const input = document.createElement('input')
                  input.type = 'file'
                  input.accept = 'image/*'
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0]
                    if (file) handleLogoUpload(file)
                  }
                  input.click()
                }}
              >
                {branding.custom_branding?.logo_url ? (
                  <div className="space-y-3">
                    <img 
                      src={branding.custom_branding.logo_url} 
                      alt="Company Logo" 
                      className="max-h-20 mx-auto"
                    />
                    <div className="flex gap-2 justify-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onBrandingChange({
                            ...branding,
                            custom_branding: {
                              ...branding.custom_branding,
                              logo_url: ''
                            }
                          })
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Image className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-sm font-bold">Drop logo here or click to upload</p>
                      <p className="text-xs text-gray-500">PNG, JPG, SVG up to 2MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold mb-2">Branding Preview</h4>
              <div 
                className="p-4 bg-white rounded border"
                style={{ 
                  fontFamily: branding.font_family || 'Inter',
                  borderColor: branding.theme_colors?.primary || '#0B5FFF'
                }}
              >
                {branding.custom_branding?.logo_url && (
                  <img 
                    src={branding.custom_branding.logo_url} 
                    alt="Logo" 
                    className="h-8 mb-2"
                  />
                )}
                <h5 
                  className="font-bold"
                  style={{ color: branding.theme_colors?.primary || '#0B5FFF' }}
                >
                  {branding.custom_branding?.company_name || 'Your Company Name'}
                </h5>
                <p className="text-sm text-gray-600">Sample {templateType} content</p>
                <div 
                  className="mt-2 px-3 py-1 rounded text-white text-sm inline-block"
                  style={{ backgroundColor: branding.theme_colors?.secondary || '#1E40AF' }}
                >
                  Action Button
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

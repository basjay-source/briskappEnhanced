import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Plus, Palette, Globe, Image, FileText } from 'lucide-react'

const Branding: React.FC = () => {
  const [brandingSettings] = useState({
    primaryColor: '#0B5FFF',
    secondaryColor: '#FF7A00',
    logoUrl: '/brisk-logo.png',
    customDomain: 'portal.briskaccountants.com',
    companyName: 'Brisk Accountants'
  })

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Branding & White-label</h1>
          <p className="text-gray-600 mt-2">Customize logos, colors, domains, and client portal themes</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Upload Assets
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Brand Assets</CardTitle>
            <Image className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-600">Logos & images</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Domains</CardTitle>
            <Globe className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-gray-600">Active domain</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Color Themes</CardTitle>
            <Palette className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-600">Primary & secondary</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-600">Document styles</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Brand Colors & Logo</CardTitle>
            <CardDescription>Configure your brand identity and visual elements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={brandingSettings.primaryColor}
                  className="w-16 h-10"
                />
                <Input
                  value={brandingSettings.primaryColor}
                  className="flex-1"
                  readOnly
                />
              </div>
            </div>
            <div>
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={brandingSettings.secondaryColor}
                  className="w-16 h-10"
                />
                <Input
                  value={brandingSettings.secondaryColor}
                  className="flex-1"
                  readOnly
                />
              </div>
            </div>
            <div>
              <Label htmlFor="logo">Company Logo</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="logo"
                  value={brandingSettings.logoUrl}
                  className="flex-1"
                  readOnly
                />
                <Button variant="outline" size="sm">Upload</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Domain & Portal Settings</CardTitle>
            <CardDescription>Configure custom domain and client portal appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="domain">Custom Domain</Label>
              <Input
                id="domain"
                value={brandingSettings.customDomain}
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">DKIM configured</p>
            </div>
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={brandingSettings.companyName}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label>Portal Theme Status</Label>
              <div className="flex items-center justify-between">
                <span className="text-sm">Client Portal</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Document Watermarks</span>
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Templates</span>
                <Badge className="bg-green-100 text-green-800">Customized</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Branding

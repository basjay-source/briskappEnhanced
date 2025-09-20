import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  BookOpen, Search, Plus, FileText, Eye, Edit, Download,
  Star, Clock, User, TrendingUp, Folder
} from 'lucide-react'

const KnowledgebaseTemplates: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'sops' | 'checklists' | 'workpapers' | 'templates'>('sops')

  const sops = [
    { id: 1, title: 'Year-end Accounts Preparation', category: 'accounts', version: '2.1', last_updated: '2024-01-15', author: 'Senior Partner', downloads: 45 },
    { id: 2, title: 'VAT Return Process', category: 'tax', version: '1.8', last_updated: '2024-01-10', author: 'Tax Manager', downloads: 32 },
    { id: 3, title: 'Payroll Setup Procedure', category: 'payroll', version: '3.0', last_updated: '2024-01-05', author: 'Payroll Specialist', downloads: 28 },
    { id: 4, title: 'Client Onboarding SOP', category: 'general', version: '1.5', last_updated: '2024-01-01', author: 'Practice Manager', downloads: 67 }
  ]

  const checklists = [
    { id: 1, title: 'Companies Act Compliance Checklist', items: 47, category: 'compliance', last_updated: '2024-01-15', author: 'Compliance Team' },
    { id: 2, title: 'VAT Return Review Checklist', items: 12, category: 'tax', last_updated: '2024-01-10', author: 'Tax Team' },
    { id: 3, title: 'Payroll Year-end Checklist', items: 23, category: 'payroll', last_updated: '2024-01-05', author: 'Payroll Team' },
    { id: 4, title: 'New Client Setup Checklist', items: 18, category: 'general', last_updated: '2024-01-01', author: 'Admin Team' }
  ]

  const workpaperPacks = [
    { id: 1, title: 'Limited Company Accounts Pack', sections: 8, category: 'accounts', last_updated: '2024-01-15', author: 'Accounts Team' },
    { id: 2, title: 'Corporation Tax Pack', sections: 6, category: 'tax', last_updated: '2024-01-10', author: 'Tax Team' },
    { id: 3, title: 'Charity Accounts Pack', sections: 12, category: 'charity', last_updated: '2024-01-05', author: 'Charity Specialist' },
    { id: 4, title: 'Partnership Accounts Pack', sections: 7, category: 'accounts', last_updated: '2024-01-01', author: 'Accounts Team' }
  ]

  const emailTemplates = [
    { id: 1, title: 'Welcome New Client', type: 'welcome', category: 'client', last_updated: '2024-01-15', author: 'Marketing Team' },
    { id: 2, title: 'Invoice Reminder', type: 'reminder', category: 'billing', last_updated: '2024-01-10', author: 'Billing Team' },
    { id: 3, title: 'Deadline Notification', type: 'notification', category: 'compliance', last_updated: '2024-01-05', author: 'Compliance Team' },
    { id: 4, title: 'Proposal Follow-up', type: 'follow-up', category: 'sales', last_updated: '2024-01-01', author: 'Business Development' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const getCategoryBadge = (category: string) => {
    const colors = {
      accounts: 'bg-blue-50 text-blue-700 border-blue-200',
      tax: 'bg-orange-50 text-orange-700 border-orange-200',
      payroll: 'bg-purple-50 text-purple-700 border-purple-200',
      compliance: 'bg-red-50 text-red-700 border-red-200',
      general: 'bg-gray-50 text-gray-700 border-gray-200',
      charity: 'bg-green-50 text-green-700 border-green-200',
      client: 'bg-blue-50 text-blue-700 border-blue-200',
      billing: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      sales: 'bg-pink-50 text-pink-700 border-pink-200'
    }
    return (
      <Badge variant="outline" className={colors[category as keyof typeof colors] || colors.general}>
        {category}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Knowledgebase & Templates</h1>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Knowledgebase & Templates</h1>
          <p className="text-gray-600 mt-1">Manage SOPs, checklists, workpaper packs and email templates</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Folder className="h-4 w-4 mr-2" />
            Categories
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Document
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Documents</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {sops.length + checklists.length + workpaperPacks.length + emailTemplates.length}
            </div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Most Downloaded</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">Client Onboarding</div>
            <p className="text-xs text-yellow-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              67 downloads
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Recently Updated</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Usage Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">94%</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Team adoption
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'sops', label: 'SOPs', icon: BookOpen },
            { id: 'checklists', label: 'Checklists', icon: FileText },
            { id: 'workpapers', label: 'Workpaper Packs', icon: Folder },
            { id: 'templates', label: 'Email Templates', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* SOPs Tab */}
      {activeTab === 'sops' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Standard Operating Procedures</CardTitle>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search SOPs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sops.map((sop) => (
                <div key={sop.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{sop.title}</h3>
                      {getCategoryBadge(sop.category)}
                      <Badge variant="outline" className="text-xs">
                        v{sop.version}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {sop.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Updated: {new Date(sop.last_updated).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {sop.downloads} downloads
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Checklists Tab */}
      {activeTab === 'checklists' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Checklists</CardTitle>
            <CardDescription>Quality control and compliance checklists</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {checklists.map((checklist) => (
                <div key={checklist.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{checklist.title}</h3>
                      {getCategoryBadge(checklist.category)}
                      <Badge variant="outline" className="text-xs">
                        {checklist.items} items
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {checklist.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Updated: {new Date(checklist.last_updated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Use Checklist
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workpapers Tab */}
      {activeTab === 'workpapers' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Workpaper Packs</CardTitle>
            <CardDescription>Structured workpaper templates by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workpaperPacks.map((pack) => (
                <div key={pack.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{pack.title}</h3>
                      {getCategoryBadge(pack.category)}
                      <Badge variant="outline" className="text-xs">
                        {pack.sections} sections
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {pack.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Updated: {new Date(pack.last_updated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Create Workpapers
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Email & Letter Templates</CardTitle>
            <CardDescription>Communication templates for client interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailTemplates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{template.title}</h3>
                      {getCategoryBadge(template.category)}
                      <Badge variant="outline" className="text-xs">
                        {template.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {template.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Updated: {new Date(template.last_updated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default KnowledgebaseTemplates

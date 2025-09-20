import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  FolderOpen, Plus, Tag, Star, Lock, Unlock, Search,
  FileText, Calendar, Building, User, Filter
} from 'lucide-react'

const BindersTags: React.FC = () => {
  const [binders, setBinders] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBinders([
          {
            id: 1,
            name: "Year-End 2024",
            client: "Brisk Accountants Ltd",
            type: "year-end",
            tabs: ["Trial Balance", "Reconciliations", "Invoices", "Bank", "Minutes", "Tax"],
            document_count: 156,
            is_locked: false,
            is_favorite: true,
            created_at: "2024-01-15T00:00:00Z",
            last_updated: "2024-09-20T10:30:00Z"
          },
          {
            id: 2,
            name: "VAT Returns Q3 2024",
            client: "ABC Corporation",
            type: "vat",
            tabs: ["Sales", "Purchases", "VAT100", "Supporting Docs"],
            document_count: 89,
            is_locked: true,
            is_favorite: false,
            created_at: "2024-07-01T00:00:00Z",
            last_updated: "2024-09-15T14:20:00Z"
          },
          {
            id: 3,
            name: "Payroll 2024",
            client: "XYZ Services Ltd",
            type: "payroll",
            tabs: ["P60s", "P11Ds", "RTI Submissions", "PAYE", "Pension"],
            document_count: 234,
            is_locked: false,
            is_favorite: true,
            created_at: "2024-04-01T00:00:00Z",
            last_updated: "2024-09-19T16:45:00Z"
          },
          {
            id: 4,
            name: "KYC Documentation",
            client: "New Client Ltd",
            type: "kyc",
            tabs: ["ID Documents", "Proof of Address", "Source of Wealth", "Due Diligence"],
            document_count: 12,
            is_locked: false,
            is_favorite: false,
            created_at: "2024-09-10T00:00:00Z",
            last_updated: "2024-09-18T11:30:00Z"
          }
        ])

        setTags([
          { id: 1, name: "urgent", color: "red", usage_count: 45 },
          { id: 2, name: "reviewed", color: "green", usage_count: 234 },
          { id: 3, name: "confidential", color: "orange", usage_count: 67 },
          { id: 4, name: "draft", color: "yellow", usage_count: 123 },
          { id: 5, name: "final", color: "blue", usage_count: 189 },
          { id: 6, name: "client-copy", color: "purple", usage_count: 78 },
          { id: 7, name: "hmrc", color: "gray", usage_count: 56 },
          { id: 8, name: "signed", color: "green", usage_count: 145 }
        ])
      } catch (error) {
        console.error('Failed to fetch binders data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const getBinderTypeIcon = (type: string) => {
    switch (type) {
      case 'year-end':
        return <Calendar className="h-4 w-4" />
      case 'vat':
        return <FileText className="h-4 w-4" />
      case 'payroll':
        return <User className="h-4 w-4" />
      case 'kyc':
        return <Building className="h-4 w-4" />
      default:
        return <FolderOpen className="h-4 w-4" />
    }
  }

  const getTagColor = (color: string) => {
    const colors: { [key: string]: string } = {
      red: 'bg-red-100 text-red-800',
      green: 'bg-green-100 text-green-800',
      orange: 'bg-orange-100 text-orange-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      blue: 'bg-blue-100 text-blue-800',
      purple: 'bg-purple-100 text-purple-800',
      gray: 'bg-gray-100 text-gray-800'
    }
    return colors[color] || 'bg-gray-100 text-gray-800'
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Binders & Tags</h1>
          <p className="text-gray-600 mt-2">Organize documents into structured binders and manage tags</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Tag className="h-4 w-4 mr-2" />
            Manage Tags
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Binder
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Binders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{binders.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <FolderOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Locked Binders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {binders.filter(b => b.is_locked).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Lock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorites</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {binders.filter(b => b.is_favorite).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {binders.reduce((sum, b) => sum + b.document_count, 0)}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input placeholder="Search binders..." className="w-full" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Advanced Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Binder Tree */}
      <Card>
        <CardHeader>
          <CardTitle>Binder Tree</CardTitle>
          <CardDescription>Organized document binders by client and type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {binders.map((binder) => (
              <Card key={binder.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-blue-100">
                        {getBinderTypeIcon(binder.type)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{binder.name}</h3>
                        <p className="text-sm text-gray-600">{binder.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {binder.is_favorite && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                      {binder.is_locked ? (
                        <Lock className="h-4 w-4 text-orange-500" />
                      ) : (
                        <Unlock className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Documents</span>
                      <Badge variant="outline">{binder.document_count}</Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Tabs:</p>
                      <div className="flex flex-wrap gap-1">
                        {binder.tabs.slice(0, 3).map((tab: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tab}
                          </Badge>
                        ))}
                        {binder.tabs.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{binder.tabs.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Updated: {new Date(binder.last_updated).toLocaleDateString()}</span>
                        <Badge variant="outline" className="text-xs">
                          {binder.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      Open
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tag Manager */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Tag Manager
              </CardTitle>
              <CardDescription>Manage document tags and their usage</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Tag
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-2">
                  <Badge className={getTagColor(tag.color)}>
                    {tag.name}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{tag.usage_count} uses</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full bg-blue-100 mx-auto w-fit mb-4">
              <Plus className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Create Binder</h3>
            <p className="text-sm text-gray-600 mb-4">Start a new document binder</p>
            <Button variant="outline" size="sm">Create</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full bg-green-100 mx-auto w-fit mb-4">
              <FolderOpen className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Import Template</h3>
            <p className="text-sm text-gray-600 mb-4">Use a firm template</p>
            <Button variant="outline" size="sm">Import</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full bg-orange-100 mx-auto w-fit mb-4">
              <Tag className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Bulk Tag</h3>
            <p className="text-sm text-gray-600 mb-4">Tag multiple documents</p>
            <Button variant="outline" size="sm">Tag</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BindersTags

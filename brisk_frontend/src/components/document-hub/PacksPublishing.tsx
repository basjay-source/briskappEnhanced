import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  Package, FileText, Download, Plus
} from 'lucide-react'

const PacksPublishing: React.FC = () => {
  const [packs, setPacks] = useState<any[]>([])

  useEffect(() => {
    setPacks([
      {
        id: 1,
        name: "Year-End Accounts Pack - ABC Corp",
        type: "year-end",
        client: "ABC Corporation",
        documents: 8,
        status: "published",
        created_at: "2024-09-20T10:30:00Z"
      },
      {
        id: 2,
        name: "VAT Return Pack - Q3 2024",
        type: "vat",
        client: "XYZ Services",
        documents: 5,
        status: "draft",
        created_at: "2024-09-19T14:20:00Z"
      }
    ])
  }, [])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Packs & Publishing</h1>
          <p className="text-gray-600 mt-2">Create and publish document packages</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Pack
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Packs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{packs.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Packs</CardTitle>
          <CardDescription>Manage document packages and publishing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {packs.map((pack) => (
              <div key={pack.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{pack.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">Client: {pack.client}</span>
                    <span className="text-sm text-gray-500">{pack.documents} documents</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={pack.status === 'published' ? 'default' : 'secondary'}>
                    {pack.status}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PacksPublishing

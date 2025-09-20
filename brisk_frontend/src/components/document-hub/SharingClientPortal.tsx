import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  Share2, Link, Plus
} from 'lucide-react'

const SharingClientPortal: React.FC = () => {
  const [shares, setShares] = useState<any[]>([])

  useEffect(() => {
    setShares([
      {
        id: 1,
        document: "Annual_Accounts_2024.pdf",
        recipient: "john@abccorp.com",
        expires_at: "2024-10-20T00:00:00Z",
        access_count: 3,
        status: "active"
      }
    ])
  }, [])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sharing & Client Portal</h1>
          <p className="text-gray-600 mt-2">Manage document sharing and client portal access</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Share
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Shares</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{shares.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Share2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Shares</CardTitle>
          <CardDescription>Secure document sharing links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shares.map((share) => (
              <div key={share.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{share.document}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">To: {share.recipient}</span>
                    <span className="text-sm text-gray-500">Accessed: {share.access_count} times</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="default">{share.status}</Badge>
                  <Button variant="outline" size="sm">
                    <Link className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SharingClientPortal

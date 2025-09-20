import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  Plug, Settings, CheckCircle, AlertTriangle
} from 'lucide-react'

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<any[]>([])

  useEffect(() => {
    setIntegrations([
      {
        id: 1,
        name: "DocuSign",
        type: "e-sign",
        status: "connected",
        last_sync: "2024-09-20T10:30:00Z"
      },
      {
        id: 2,
        name: "Google Drive",
        type: "storage",
        status: "connected",
        last_sync: "2024-09-20T09:15:00Z"
      },
      {
        id: 3,
        name: "Office 365",
        type: "office",
        status: "error",
        last_sync: "2024-09-19T14:20:00Z"
      }
    ])
  }, [])

  return (
    <div className="w-full max-w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600 mt-2">Manage external service integrations and API connections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Integrations</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{integrations.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Plug className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Services</CardTitle>
          <CardDescription>External service integrations and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{integration.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">Type: {integration.type}</span>
                    <span className="text-sm text-gray-500">
                      Last sync: {new Date(integration.last_sync).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={integration.status === 'connected' ? 'default' : 'destructive'}
                         className={integration.status === 'connected' ? 'bg-green-100 text-green-800' : ''}>
                    {integration.status === 'connected' ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 mr-1" />
                    )}
                    {integration.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
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

export default Integrations

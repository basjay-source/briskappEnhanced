import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { 
  Activity, FileText
} from 'lucide-react'

const AuditActivity: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    setActivities([
      {
        id: 1,
        action: "Document uploaded",
        user: "John Smith",
        document: "Invoice_2024_001.pdf",
        timestamp: "2024-09-20T10:30:00Z",
        ip_address: "192.168.1.100"
      },
      {
        id: 2,
        action: "Document shared",
        user: "Jane Doe",
        document: "Accounts_2024.pdf",
        timestamp: "2024-09-20T09:15:00Z",
        ip_address: "192.168.1.101"
      }
    ])
  }, [])

  return (
    <div className="w-full max-w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Audit & Activity</h1>
        <p className="text-gray-600 mt-2">Monitor document activity and maintain audit trails</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Activities</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activities.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Immutable audit trail of document activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{activity.action}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">User: {activity.user}</span>
                    <span className="text-sm text-gray-500">Document: {activity.document}</span>
                    <span className="text-sm text-gray-500">IP: {activity.ip_address}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </span>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Details
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

export default AuditActivity

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  Shield, Plus, Settings
} from 'lucide-react'

const RetentionCompliance: React.FC = () => {
  const [policies, setPolicies] = useState<any[]>([])

  useEffect(() => {
    setPolicies([
      {
        id: 1,
        document_type: "Invoice",
        retention_years: 7,
        jurisdiction: "UK",
        auto_delete: false,
        documents_affected: 1250
      },
      {
        id: 2,
        document_type: "KYC Documents",
        retention_years: 5,
        jurisdiction: "UK",
        auto_delete: false,
        documents_affected: 89
      }
    ])
  }, [])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Retention & Compliance</h1>
          <p className="text-gray-600 mt-2">Manage document retention policies and compliance</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Policy
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Retention Policies</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{policies.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Retention Policies</CardTitle>
          <CardDescription>Document retention schedules and compliance rules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {policies.map((policy) => (
              <div key={policy.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{policy.document_type}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">{policy.retention_years} years</span>
                    <span className="text-sm text-gray-500">{policy.jurisdiction}</span>
                    <span className="text-sm text-gray-500">{policy.documents_affected} documents</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={policy.auto_delete ? 'destructive' : 'secondary'}>
                    {policy.auto_delete ? 'Auto-delete' : 'Manual'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit
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

export default RetentionCompliance

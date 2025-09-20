import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Input } from '../ui/input'
import { Search, FileText, Shield, Download, Eye } from 'lucide-react'

const LogsAudit: React.FC = () => {
  const [auditLogs] = useState([
    {
      id: 1,
      timestamp: '2025-09-20 01:30:15',
      user: 'admin@briskaccountants.com',
      action: 'user.created',
      resource: 'User: john.doe@client.com',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2025-09-20 01:25:42',
      user: 'admin@briskaccountants.com',
      action: 'tenant.updated',
      resource: 'Tenant: Demo Client Ltd',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2025-09-20 01:20:18',
      user: 'security@briskaccountants.com',
      action: 'login.failed',
      resource: 'Authentication attempt',
      ipAddress: '203.0.113.45',
      status: 'failed'
    }
  ])

  const [eDiscoveryHolds] = useState([
    {
      id: 1,
      name: 'Legal Case 2025-001',
      tenant: 'Client ABC Ltd',
      dateRange: '2023-01-01 to 2024-12-31',
      status: 'active',
      createdBy: 'legal@briskaccountants.com'
    }
  ])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Logs, Audit & E-Discovery</h1>
          <p className="text-gray-600 mt-2">Monitor audit trails, access logs, and manage e-discovery holds</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audit Events</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-gray-600">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Events</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-600">Requires review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">E-Discovery Holds</CardTitle>
            <Eye className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-gray-600">Active holds</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Log Retention</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 years</div>
            <p className="text-xs text-gray-600">Immutable storage</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>Immutable audit log of all system activities</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search audit logs..."
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.action}</Badge>
                  </TableCell>
                  <TableCell className="max-w-48 truncate">{log.resource}</TableCell>
                  <TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
                  <TableCell>
                    <Badge className={log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>E-Discovery Holds</CardTitle>
          <CardDescription>Legal holds preventing data deletion</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hold Name</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eDiscoveryHolds.map((hold) => (
                <TableRow key={hold.id}>
                  <TableCell className="font-medium">{hold.name}</TableCell>
                  <TableCell>{hold.tenant}</TableCell>
                  <TableCell className="text-xs">{hold.dateRange}</TableCell>
                  <TableCell>
                    <Badge className="bg-orange-100 text-orange-800">{hold.status}</Badge>
                  </TableCell>
                  <TableCell>{hold.createdBy}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Export</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default LogsAudit

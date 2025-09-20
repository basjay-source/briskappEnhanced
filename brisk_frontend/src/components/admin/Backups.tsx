import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Plus, Database, Shield, Clock, HardDrive } from 'lucide-react'

const Backups: React.FC = () => {
  const [backups] = useState([
    {
      id: 1,
      name: 'Daily Full Backup',
      type: 'full',
      status: 'completed',
      lastRun: '2025-09-20 02:00',
      size: '2.4 GB',
      retention: '30 days'
    },
    {
      id: 2,
      name: 'Hourly Incremental',
      type: 'incremental',
      status: 'running',
      lastRun: '2025-09-20 01:00',
      size: '156 MB',
      retention: '7 days'
    }
  ])

  const [snapshots] = useState([
    {
      id: 1,
      tenant: 'Brisk Accountants',
      createdAt: '2025-09-19 14:30',
      size: '1.2 GB',
      type: 'manual',
      reason: 'Before system upgrade'
    },
    {
      id: 2,
      tenant: 'Demo Client Ltd',
      createdAt: '2025-09-18 09:15',
      size: '890 MB',
      type: 'automatic',
      reason: 'Scheduled snapshot'
    }
  ])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Backups, DR & Data Lifecycle</h1>
          <p className="text-gray-600 mt-2">Manage backup schedules, disaster recovery, and data lifecycle policies</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Backup
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backup Jobs</CardTitle>
            <Database className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-600">Active schedules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.6 GB</div>
            <p className="text-xs text-gray-600">Encrypted at rest</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RPO Target</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 hour</div>
            <p className="text-xs text-gray-600">Recovery point</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DR Status</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Ready</div>
            <p className="text-xs text-gray-600">Last tested: 7 days ago</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Backup Schedules</CardTitle>
            <CardDescription>Automated backup jobs and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell className="font-medium">{backup.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{backup.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={backup.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {backup.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Run Now</Button>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tenant Snapshots</CardTitle>
            <CardDescription>Point-in-time snapshots for tenant data</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {snapshots.map((snapshot) => (
                  <TableRow key={snapshot.id}>
                    <TableCell className="font-medium">{snapshot.tenant}</TableCell>
                    <TableCell>{snapshot.createdAt}</TableCell>
                    <TableCell>{snapshot.size}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Restore</Button>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Backups

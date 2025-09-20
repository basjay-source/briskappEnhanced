import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Plus, Upload, FileText, CheckCircle, AlertTriangle } from 'lucide-react'

const Imports: React.FC = () => {
  const [importJobs] = useState([
    {
      id: 1,
      name: 'Client Data Migration',
      type: 'clients',
      status: 'completed',
      records: 150,
      errors: 0,
      startedAt: '2025-09-19 14:30',
      completedAt: '2025-09-19 14:45'
    },
    {
      id: 2,
      name: 'Chart of Accounts Import',
      type: 'accounts',
      status: 'running',
      records: 89,
      errors: 2,
      startedAt: '2025-09-20 09:15',
      completedAt: null
    },
    {
      id: 3,
      name: 'Contact List Upload',
      type: 'contacts',
      status: 'failed',
      records: 0,
      errors: 5,
      startedAt: '2025-09-18 16:20',
      completedAt: '2025-09-18 16:22'
    }
  ])

  const [wizards] = useState([
    {
      id: 1,
      name: 'Client Import Wizard',
      description: 'Import client organizations and contacts',
      fields: 'Name, Email, Address, Tax ID',
      format: 'CSV, Excel'
    },
    {
      id: 2,
      name: 'Chart of Accounts Wizard',
      description: 'Import accounting chart of accounts',
      fields: 'Code, Name, Type, Parent',
      format: 'CSV, QIF'
    },
    {
      id: 3,
      name: 'Trial Balance Wizard',
      description: 'Import trial balance data',
      fields: 'Account, Debit, Credit, Period',
      format: 'CSV, Excel'
    }
  ])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Imports, Migrations & Seed Data</h1>
          <p className="text-gray-600 mt-2">Import data using wizards, manage migrations, and seed initial data</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Start Import
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Import Jobs</CardTitle>
            <Upload className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-600">Total jobs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Records Imported</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">239</div>
            <p className="text-xs text-gray-600">Successfully processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97%</div>
            <p className="text-xs text-gray-600">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-gray-600">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Import Jobs</CardTitle>
          <CardDescription>Track data import progress and results</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Errors</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {importJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      job.status === 'completed' ? 'bg-green-100 text-green-800' :
                      job.status === 'running' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{job.records}</TableCell>
                  <TableCell>{job.errors}</TableCell>
                  <TableCell className="text-xs">{job.startedAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View</Button>
                      {job.status === 'failed' && (
                        <Button variant="outline" size="sm">Retry</Button>
                      )}
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
          <CardTitle>Import Wizards</CardTitle>
          <CardDescription>Available data import wizards and templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wizards.map((wizard) => (
              <div key={wizard.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-900 mb-2">{wizard.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{wizard.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs">
                    <span className="font-medium">Fields:</span> {wizard.fields}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Formats:</span> {wizard.format}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Start Wizard
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Imports

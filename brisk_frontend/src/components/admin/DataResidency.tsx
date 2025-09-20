import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Plus, MapPin, Globe, Shield, Database } from 'lucide-react'

const DataResidency: React.FC = () => {
  const [regions] = useState([
    {
      id: 1,
      name: 'United Kingdom',
      code: 'UK',
      status: 'active',
      tenants: 15,
      dataCenter: 'London-1',
      compliance: 'GDPR, UK-GDPR'
    },
    {
      id: 2,
      name: 'European Union',
      code: 'EU',
      status: 'active',
      tenants: 8,
      dataCenter: 'Frankfurt-1',
      compliance: 'GDPR'
    },
    {
      id: 3,
      name: 'United States',
      code: 'US',
      status: 'active',
      tenants: 3,
      dataCenter: 'Virginia-1',
      compliance: 'SOC 2, CCPA'
    }
  ])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data & Residency</h1>
          <p className="text-gray-600 mt-2">Manage data regions, residency rules, and cross-region processing</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Region
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Regions</CardTitle>
            <Globe className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-600">UK, EU, US</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <MapPin className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26</div>
            <p className="text-xs text-gray-600">Across all regions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Centers</CardTitle>
            <Database className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-600">Primary locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-gray-600">Compliant</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Regional Data Management</CardTitle>
          <CardDescription>Configure data residency and regional compliance settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tenants</TableHead>
                <TableHead>Data Center</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regions.map((region) => (
                <TableRow key={region.id}>
                  <TableCell className="font-medium">{region.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{region.code}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">{region.status}</Badge>
                  </TableCell>
                  <TableCell>{region.tenants}</TableCell>
                  <TableCell>{region.dataCenter}</TableCell>
                  <TableCell>{region.compliance}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Configure</Button>
                      <Button variant="outline" size="sm">Monitor</Button>
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

export default DataResidency

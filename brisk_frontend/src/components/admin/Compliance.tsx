import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Plus, Shield, FileCheck, Users, Building } from 'lucide-react'

const Compliance: React.FC = () => {
  const [certifications] = useState([
    {
      id: 1,
      name: 'ISO 27001',
      status: 'active',
      issueDate: '2024-03-15',
      expiryDate: '2027-03-15',
      authority: 'BSI Group'
    },
    {
      id: 2,
      name: 'SOC 2 Type II',
      status: 'active',
      issueDate: '2024-06-01',
      expiryDate: '2025-06-01',
      authority: 'AICPA'
    },
    {
      id: 3,
      name: 'Cyber Essentials Plus',
      status: 'expiring',
      issueDate: '2024-01-10',
      expiryDate: '2025-01-10',
      authority: 'NCSC'
    }
  ])

  const [policies] = useState([
    {
      id: 1,
      name: 'Information Security Policy',
      version: 'v2.1',
      status: 'published',
      lastReview: '2025-09-01',
      nextReview: '2026-09-01'
    },
    {
      id: 2,
      name: 'Data Privacy Policy',
      version: 'v1.8',
      status: 'published',
      lastReview: '2025-08-15',
      nextReview: '2026-08-15'
    },
    {
      id: 3,
      name: 'Acceptable Use Policy',
      version: 'v1.5',
      status: 'draft',
      lastReview: '2025-07-20',
      nextReview: '2025-10-20'
    }
  ])

  const [attestations] = useState([
    {
      id: 1,
      staff: 'Sarah Johnson',
      policy: 'Information Security Policy',
      status: 'completed',
      completedDate: '2025-09-15',
      dueDate: '2025-09-30'
    },
    {
      id: 2,
      staff: 'Mike Chen',
      policy: 'Data Privacy Policy',
      status: 'pending',
      completedDate: null,
      dueDate: '2025-09-25'
    }
  ])

  const [vendors] = useState([
    {
      id: 1,
      name: 'Cloud Storage Provider',
      riskLevel: 'medium',
      dpaStatus: 'signed',
      lastAssessment: '2025-06-15',
      nextReview: '2026-06-15'
    },
    {
      id: 2,
      name: 'Email Service Provider',
      riskLevel: 'low',
      dpaStatus: 'signed',
      lastAssessment: '2025-08-01',
      nextReview: '2026-08-01'
    }
  ])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compliance, Policies & Attestations</h1>
          <p className="text-gray-600 mt-2">Manage certifications, policies, staff attestations, and vendor assessments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-600">Active certifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Policies</CardTitle>
            <FileCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-600">Published policies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Attestations</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-gray-600">Completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendor Assessments</CardTitle>
            <Building className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-600">Active vendors</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
            <CardDescription>Track compliance certifications and renewal dates</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certification</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certifications.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.name}</TableCell>
                    <TableCell>
                      <Badge className={
                        cert.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }>
                        {cert.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{cert.expiryDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Renew</Button>
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
            <CardTitle>Policy Library</CardTitle>
            <CardDescription>Manage organizational policies and procedures</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Policy</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="font-medium">{policy.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{policy.version}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={policy.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {policy.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Publish</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Staff Attestations</CardTitle>
            <CardDescription>Track policy acknowledgments and training completion</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff</TableHead>
                  <TableHead>Policy</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attestations.map((attestation) => (
                  <TableRow key={attestation.id}>
                    <TableCell className="font-medium">{attestation.staff}</TableCell>
                    <TableCell className="text-xs">{attestation.policy}</TableCell>
                    <TableCell>
                      <Badge className={attestation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {attestation.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{attestation.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Management</CardTitle>
            <CardDescription>Track vendor risk assessments and data processing agreements</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>DPA Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>
                      <Badge className={
                        vendor.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                        vendor.riskLevel === 'medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {vendor.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">{vendor.dpaStatus}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Assess</Button>
                        <Button variant="outline" size="sm">View DPA</Button>
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

export default Compliance

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Plus, GitBranch, Beaker, Calendar, Activity } from 'lucide-react'

const Environments: React.FC = () => {
  const [releases] = useState([
    {
      id: 1,
      version: 'v2.1.0',
      channel: 'stable',
      status: 'deployed',
      deployedAt: '2025-09-15',
      features: 'Enhanced reporting, Bug fixes'
    },
    {
      id: 2,
      version: 'v2.2.0-beta',
      channel: 'beta',
      status: 'testing',
      deployedAt: '2025-09-18',
      features: 'New dashboard, API improvements'
    }
  ])

  const [experiments] = useState([
    {
      id: 1,
      name: 'New Dashboard Layout',
      status: 'running',
      traffic: '25%',
      startDate: '2025-09-10',
      metric: 'User engagement'
    },
    {
      id: 2,
      name: 'Simplified Onboarding',
      status: 'completed',
      traffic: '50%',
      startDate: '2025-08-15',
      metric: 'Conversion rate'
    }
  ])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Environments, Releases & Experiments</h1>
          <p className="text-gray-600 mt-2">Manage release channels, change windows, and A/B experiments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Experiment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Release Channels</CardTitle>
            <GitBranch className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-600">Stable & Beta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Experiments</CardTitle>
            <Beaker className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-gray-600">Running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Change Windows</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployments</CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Release Management</CardTitle>
            <CardDescription>Track releases across different channels</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Version</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {releases.map((release) => (
                  <TableRow key={release.id}>
                    <TableCell className="font-medium">{release.version}</TableCell>
                    <TableCell>
                      <Badge variant={release.channel === 'stable' ? 'default' : 'secondary'}>
                        {release.channel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={release.status === 'deployed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {release.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Rollback</Button>
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
            <CardTitle>A/B Experiments</CardTitle>
            <CardDescription>Monitor running experiments and their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Experiment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Traffic</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experiments.map((experiment) => (
                  <TableRow key={experiment.id}>
                    <TableCell className="font-medium">{experiment.name}</TableCell>
                    <TableCell>
                      <Badge className={experiment.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        {experiment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{experiment.traffic}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Results</Button>
                        <Button variant="outline" size="sm">Stop</Button>
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

export default Environments

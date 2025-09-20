import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  Clipboard, CheckCircle, Clock, User, Lock, Plus, Settings
} from 'lucide-react'

const WorkpapersChecklists: React.FC = () => {
  const [workpapers, setWorkpapers] = useState<any[]>([])
  const [checklists, setChecklists] = useState<any[]>([])

  useEffect(() => {
    setWorkpapers([
      {
        id: 1,
        name: "Fixed Assets Schedule",
        client: "ABC Corporation",
        type: "schedule",
        owner: "John Smith",
        reviewer: "Jane Doe",
        status: "in_review",
        completion: 85,
        tb_references: ["1200", "1210", "1220"],
        created_at: "2024-09-15T00:00:00Z"
      },
      {
        id: 2,
        name: "Bank Reconciliation - Current Account",
        client: "XYZ Services",
        type: "reconciliation",
        owner: "Mike Johnson",
        reviewer: null,
        status: "draft",
        completion: 60,
        tb_references: ["1000"],
        created_at: "2024-09-18T00:00:00Z"
      }
    ])

    setChecklists([
      {
        id: 1,
        name: "Year-End Accounts Checklist",
        client: "ABC Corporation",
        total_items: 25,
        completed_items: 18,
        owner: "Sarah Wilson",
        due_date: "2024-10-15T00:00:00Z",
        status: "in_progress"
      },
      {
        id: 2,
        name: "VAT Return Review Checklist",
        client: "XYZ Services",
        total_items: 12,
        completed_items: 12,
        owner: "Tom Brown",
        due_date: "2024-09-30T00:00:00Z",
        status: "completed"
      }
    ])
  }, [])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workpapers & Checklists</h1>
          <p className="text-gray-600 mt-2">Manage electronic workpapers and review checklists</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Clipboard className="h-4 w-4 mr-2" />
            New Checklist
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Workpaper
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Workpapers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{workpapers.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Clipboard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Review</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {workpapers.filter(wp => wp.status === 'in_review').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {checklists.filter(cl => cl.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Locked</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <Lock className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Electronic Workpapers</CardTitle>
              <CardDescription>Working papers with tick-marks and cross-references</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Input placeholder="Search workpapers..." className="w-64" />
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workpapers.map((workpaper) => (
              <div key={workpaper.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{workpaper.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">Client: {workpaper.client}</span>
                      <span className="text-sm text-gray-500">Type: {workpaper.type}</span>
                      <span className="text-sm text-gray-500">
                        Created: {new Date(workpaper.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Badge variant={workpaper.status === 'completed' ? 'default' : 'secondary'} 
                         className={workpaper.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                   workpaper.status === 'in_review' ? 'bg-orange-100 text-orange-800' : 
                                   'bg-blue-100 text-blue-800'}>
                    {workpaper.status.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Owner</p>
                    <div className="flex items-center mt-1">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{workpaper.owner}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Reviewer</p>
                    <div className="flex items-center mt-1">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{workpaper.reviewer || 'Not assigned'}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">TB References</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {workpaper.tb_references.map((ref: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {ref}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Completion</span>
                    <span className="text-sm text-gray-600">{workpaper.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${workpaper.completion}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Open</Button>
                  <Button variant="outline" size="sm">Add Tick-mark</Button>
                  <Button variant="outline" size="sm">Cross-ref</Button>
                  {workpaper.status === 'draft' && (
                    <Button variant="outline" size="sm">Submit for Review</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Review Checklists
          </CardTitle>
          <CardDescription>Track completion of review procedures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checklists.map((checklist) => (
              <div key={checklist.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{checklist.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">Client: {checklist.client}</span>
                      <span className="text-sm text-gray-500">Owner: {checklist.owner}</span>
                      <span className="text-sm text-gray-500">
                        Due: {new Date(checklist.due_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Badge variant={checklist.status === 'completed' ? 'default' : 'secondary'} 
                         className={checklist.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                    {checklist.status.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">
                      {checklist.completed_items} / {checklist.total_items} items
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(checklist.completed_items / checklist.total_items) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Open Checklist</Button>
                  <Button variant="outline" size="sm">Add Comment</Button>
                  {checklist.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      <Lock className="h-4 w-4 mr-2" />
                      Lock
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default WorkpapersChecklists

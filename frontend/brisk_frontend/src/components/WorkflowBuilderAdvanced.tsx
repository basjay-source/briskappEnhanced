import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, Trash2, Settings, Play, Save, Copy, 
  Clock, CheckCircle, Users, Mail,
  Workflow, Zap, Target
} from 'lucide-react'

interface WorkflowStep {
  id: string
  type: 'task' | 'approval' | 'notification' | 'condition' | 'delay'
  title: string
  description?: string
  assignedTo?: string
  dueInDays?: number
  conditions?: Array<{
    field: string
    operator: string
    value: string
  }>
  position: { x: number; y: number }
  connections: string[]
}

interface WorkflowTemplate {
  id: string
  name: string
  description: string
  jobType: string
  steps: WorkflowStep[]
  isActive: boolean
  createdAt: string
  usageCount: number
}

export default function WorkflowBuilderAdvanced() {
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null)
  const [draggedStep, setDraggedStep] = useState<string | null>(null)

  const [prebuiltTemplates] = useState<WorkflowTemplate[]>([
    {
      id: 'vat-return-workflow',
      name: 'VAT Return Process',
      description: 'Complete VAT return workflow with client communication and HMRC submission',
      jobType: 'vat_return',
      isActive: true,
      createdAt: '2024-01-15',
      usageCount: 47,
      steps: [
        {
          id: 'step-1',
          type: 'task',
          title: 'Collect VAT Records',
          description: 'Gather all VAT invoices and receipts from client',
          assignedTo: 'auto-assign',
          dueInDays: 2,
          position: { x: 100, y: 100 },
          connections: ['step-2']
        },
        {
          id: 'step-2',
          type: 'task',
          title: 'Prepare VAT Return',
          description: 'Complete VAT100 form with collected data',
          assignedTo: 'qualified-staff',
          dueInDays: 3,
          position: { x: 300, y: 100 },
          connections: ['step-3']
        },
        {
          id: 'step-3',
          type: 'approval',
          title: 'Partner Review',
          description: 'Senior partner approval before submission',
          assignedTo: 'partner',
          dueInDays: 1,
          position: { x: 500, y: 100 },
          connections: ['step-4']
        },
        {
          id: 'step-4',
          type: 'notification',
          title: 'Client Notification',
          description: 'Notify client of VAT liability and submission',
          position: { x: 700, y: 100 },
          connections: ['step-5']
        },
        {
          id: 'step-5',
          type: 'task',
          title: 'HMRC Submission',
          description: 'Submit VAT return to HMRC via MTD',
          assignedTo: 'qualified-staff',
          dueInDays: 1,
          position: { x: 900, y: 100 },
          connections: []
        }
      ]
    },
    {
      id: 'year-end-workflow',
      name: 'Year End Accounts',
      description: 'Complete year-end accounts preparation and filing workflow',
      jobType: 'year_end',
      isActive: true,
      createdAt: '2024-01-10',
      usageCount: 23,
      steps: [
        {
          id: 'step-1',
          type: 'task',
          title: 'Trial Balance Review',
          description: 'Review and validate trial balance from bookkeeping',
          assignedTo: 'senior-staff',
          dueInDays: 5,
          position: { x: 100, y: 100 },
          connections: ['step-2']
        },
        {
          id: 'step-2',
          type: 'task',
          title: 'Adjustments & Accruals',
          description: 'Post year-end adjustments and accruals',
          assignedTo: 'senior-staff',
          dueInDays: 7,
          position: { x: 300, y: 100 },
          connections: ['step-3']
        },
        {
          id: 'step-3',
          type: 'task',
          title: 'Prepare Accounts',
          description: 'Draft statutory accounts and notes',
          assignedTo: 'qualified-staff',
          dueInDays: 10,
          position: { x: 500, y: 100 },
          connections: ['step-4']
        },
        {
          id: 'step-4',
          type: 'approval',
          title: 'Partner Review',
          description: 'Final partner review and approval',
          assignedTo: 'partner',
          dueInDays: 3,
          position: { x: 700, y: 100 },
          connections: ['step-5']
        },
        {
          id: 'step-5',
          type: 'task',
          title: 'Companies House Filing',
          description: 'File accounts with Companies House',
          assignedTo: 'admin-staff',
          dueInDays: 2,
          position: { x: 900, y: 100 },
          connections: []
        }
      ]
    },
    {
      id: 'payroll-workflow',
      name: 'Monthly Payroll Process',
      description: 'Complete monthly payroll processing with RTI submission',
      jobType: 'payroll',
      isActive: true,
      createdAt: '2024-01-20',
      usageCount: 156,
      steps: [
        {
          id: 'step-1',
          type: 'task',
          title: 'Collect Payroll Data',
          description: 'Gather timesheets, expenses, and changes',
          assignedTo: 'payroll-staff',
          dueInDays: 2,
          position: { x: 100, y: 100 },
          connections: ['step-2']
        },
        {
          id: 'step-2',
          type: 'task',
          title: 'Process Payroll',
          description: 'Calculate pay, tax, and NI contributions',
          assignedTo: 'payroll-staff',
          dueInDays: 1,
          position: { x: 300, y: 100 },
          connections: ['step-3']
        },
        {
          id: 'step-3',
          type: 'approval',
          title: 'Payroll Approval',
          description: 'Manager approval before payment',
          assignedTo: 'manager',
          dueInDays: 1,
          position: { x: 500, y: 100 },
          connections: ['step-4', 'step-5']
        },
        {
          id: 'step-4',
          type: 'task',
          title: 'RTI Submission',
          description: 'Submit FPS to HMRC',
          assignedTo: 'payroll-staff',
          dueInDays: 1,
          position: { x: 700, y: 50 },
          connections: []
        },
        {
          id: 'step-5',
          type: 'notification',
          title: 'Payslip Distribution',
          description: 'Send payslips to employees',
          position: { x: 700, y: 150 },
          connections: []
        }
      ]
    }
  ])

  const [customWorkflows, setCustomWorkflows] = useState<WorkflowTemplate[]>([])

  const stepTypes = [
    { type: 'task', icon: CheckCircle, label: 'Task', color: 'bg-blue-100 text-blue-800' },
    { type: 'approval', icon: Users, label: 'Approval', color: 'bg-purple-100 text-purple-800' },
    { type: 'notification', icon: Mail, label: 'Notification', color: 'bg-green-100 text-green-800' },
    { type: 'condition', icon: Target, label: 'Condition', color: 'bg-orange-100 text-orange-800' },
    { type: 'delay', icon: Clock, label: 'Delay', color: 'bg-gray-100 text-gray-800' }
  ]

  const getStepIcon = (type: string) => {
    const stepType = stepTypes.find(st => st.type === type)
    return stepType ? stepType.icon : CheckCircle
  }

  const getStepColor = (type: string) => {
    const stepType = stepTypes.find(st => st.type === type)
    return stepType ? stepType.color : 'bg-gray-100 text-gray-800'
  }

  const handleDragStart = (stepId: string) => {
    setDraggedStep(stepId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!selectedTemplate || !draggedStep) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const updatedSteps = selectedTemplate.steps.map(step =>
      step.id === draggedStep ? { ...step, position: { x, y } } : step
    )

    setSelectedTemplate({
      ...selectedTemplate,
      steps: updatedSteps
    })

    setDraggedStep(null)
  }

  const createNewWorkflow = () => {
    const newWorkflow: WorkflowTemplate = {
      id: `custom-${Date.now()}`,
      name: 'New Workflow',
      description: 'Custom workflow template',
      jobType: 'custom',
      isActive: false,
      createdAt: new Date().toISOString().split('T')[0],
      usageCount: 0,
      steps: []
    }
    setSelectedTemplate(newWorkflow)
    console.log('Building workflow:', newWorkflow.name)
  }

  const addStep = (type: string) => {
    if (!selectedTemplate) return

    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      type: type as WorkflowStep['type'],
      title: `New ${type}`,
      description: '',
      position: { x: 200, y: 200 },
      connections: []
    }

    setSelectedTemplate({
      ...selectedTemplate,
      steps: [...selectedTemplate.steps, newStep]
    })
  }

  const deleteStep = (stepId: string) => {
    if (!selectedTemplate) return

    const updatedSteps = selectedTemplate.steps.filter(step => step.id !== stepId)
    setSelectedTemplate({
      ...selectedTemplate,
      steps: updatedSteps
    })
  }

  const saveWorkflow = () => {
    if (!selectedTemplate) return

    if (customWorkflows.find(w => w.id === selectedTemplate.id)) {
      setCustomWorkflows(prev => 
        prev.map(w => w.id === selectedTemplate.id ? selectedTemplate : w)
      )
    } else {
      setCustomWorkflows(prev => [...prev, selectedTemplate])
    }

    console.log('Workflow saved successfully')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Workflow Automation</h2>
          <p className="text-gray-600">Create and manage intelligent workflow templates</p>
        </div>
        <Button onClick={createNewWorkflow} className="bg-brisk-primary hover:bg-brisk-primary-600">
          <Plus className="h-4 w-4 mr-2" />
          New Workflow
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-brisk-primary" />
                  Pre-built Templates
                </CardTitle>
                <CardDescription>UK compliance workflows ready to use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prebuiltTemplates.map((template) => (
                    <div key={template.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {template.usageCount} uses
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{template.jobType.replace('_', ' ')}</Badge>
                          <span className="text-xs text-gray-500">{template.steps.length} steps</span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedTemplate(template)
                              setActiveTab('builder')
                            }}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="h-4 w-4 mr-2" />
                            Clone
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  Custom Workflows
                </CardTitle>
                <CardDescription>Your organization's custom templates</CardDescription>
              </CardHeader>
              <CardContent>
                {customWorkflows.length === 0 ? (
                  <div className="text-center py-8">
                    <Workflow className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No custom workflows yet</p>
                    <Button onClick={createNewWorkflow} variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Workflow
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customWorkflows.map((template) => (
                      <div key={template.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{template.name}</h4>
                            <p className="text-sm text-gray-600">{template.description}</p>
                          </div>
                          <Badge className={template.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                            {template.isActive ? 'Active' : 'Draft'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{template.jobType}</Badge>
                            <span className="text-xs text-gray-500">{template.steps.length} steps</span>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedTemplate(template)
                                setActiveTab('builder')
                                console.log('Customizing template:', template.name)
                              }}
                            >
                              <Settings className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          {selectedTemplate ? (
            <div className="grid gap-6 lg:grid-cols-4">
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{selectedTemplate.name}</CardTitle>
                        <CardDescription>{selectedTemplate.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Test
                        </Button>
                        <Button onClick={saveWorkflow} size="sm" className="bg-brisk-primary">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="relative bg-gray-50 rounded-lg p-6 min-h-96 overflow-auto"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      {selectedTemplate.steps.map((step) => {
                        const StepIcon = getStepIcon(step.type)
                        return (
                          <div
                            key={step.id}
                            className="absolute bg-white border-2 border-gray-200 rounded-lg p-4 w-48 cursor-move hover:border-brisk-primary"
                            style={{ 
                              left: step.position.x, 
                              top: step.position.y,
                              zIndex: draggedStep === step.id ? 10 : 1
                            }}
                            draggable
                            onDragStart={() => handleDragStart(step.id)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <StepIcon className="h-4 w-4" />
                                <Badge className={getStepColor(step.type)} variant="secondary">
                                  {step.type}
                                </Badge>
                              </div>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => deleteStep(step.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            <h4 className="font-medium text-sm mb-1">{step.title}</h4>
                            {step.description && (
                              <p className="text-xs text-gray-600 mb-2">{step.description}</p>
                            )}
                            {step.assignedTo && (
                              <p className="text-xs text-blue-600">→ {step.assignedTo}</p>
                            )}
                            {step.dueInDays && (
                              <p className="text-xs text-orange-600">Due: {step.dueInDays} days</p>
                            )}
                          </div>
                        )
                      })}

                      {/* Connection lines would be rendered here */}
                      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                        {selectedTemplate.steps.map(step => 
                          step.connections.map(connectionId => {
                            const targetStep = selectedTemplate.steps.find(s => s.id === connectionId)
                            if (!targetStep) return null
                            
                            return (
                              <line
                                key={`${step.id}-${connectionId}`}
                                x1={step.position.x + 96}
                                y1={step.position.y + 40}
                                x2={targetStep.position.x + 96}
                                y2={targetStep.position.y + 40}
                                stroke="#0B5FFF"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                              />
                            )
                          })
                        )}
                        <defs>
                          <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon
                              points="0 0, 10 3.5, 0 7"
                              fill="#0B5FFF"
                            />
                          </marker>
                        </defs>
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Add Steps</CardTitle>
                    <CardDescription>Drag steps to the canvas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stepTypes.map((stepType) => {
                        const Icon = stepType.icon
                        return (
                          <Button
                            key={stepType.type}
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => addStep(stepType.type)}
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            {stepType.label}
                          </Button>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Workflow Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="workflow-name">Name</Label>
                      <Input
                        id="workflow-name"
                        value={selectedTemplate.name}
                        onChange={(e) => setSelectedTemplate({
                          ...selectedTemplate,
                          name: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="workflow-description">Description</Label>
                      <Input
                        id="workflow-description"
                        value={selectedTemplate.description}
                        onChange={(e) => setSelectedTemplate({
                          ...selectedTemplate,
                          description: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="job-type">Job Type</Label>
                      <Select
                        value={selectedTemplate.jobType}
                        onValueChange={(value) => setSelectedTemplate({
                          ...selectedTemplate,
                          jobType: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vat_return">VAT Return</SelectItem>
                          <SelectItem value="year_end">Year End</SelectItem>
                          <SelectItem value="payroll">Payroll</SelectItem>
                          <SelectItem value="corporation_tax">Corporation Tax</SelectItem>
                          <SelectItem value="personal_tax">Personal Tax</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Workflow className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Workflow Selected</h3>
                <p className="text-gray-600 mb-4">Select a template to edit or create a new workflow</p>
                <Button onClick={createNewWorkflow} className="bg-brisk-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Workflow
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Workflows</p>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-green-600">+2 this month</p>
                  </div>
                  <Workflow className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Jobs Automated</p>
                    <p className="text-2xl font-bold">847</p>
                    <p className="text-xs text-green-600">87% automation rate</p>
                  </div>
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Time Saved</p>
                    <p className="text-2xl font-bold">156h</p>
                    <p className="text-xs text-green-600">This month</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold">94.2%</p>
                    <p className="text-xs text-green-600">+1.2% improvement</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Workflow Performance</CardTitle>
              <CardDescription>Most used and efficient workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prebuiltTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-gray-600">{template.jobType.replace('_', ' ')}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm font-medium">{template.usageCount}</p>
                        <p className="text-xs text-gray-600">Uses</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">92%</p>
                        <p className="text-xs text-gray-600">Success</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">4.2h</p>
                        <p className="text-xs text-gray-600">Avg Time</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Efficient</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

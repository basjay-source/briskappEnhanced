import { useState } from 'react'
import { 
  Plus, 
  Trash2, 
  ArrowDown, 
  ArrowUp, 
  Play,
  Save
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

interface WorkflowStep {
  id: string
  name: string
  description: string
  estimatedHours: number
  dependencies: string[]
  assignee?: string
  checklist: string[]
}

interface WorkflowTemplate {
  id: string
  name: string
  description: string
  jobType: string
  steps: WorkflowStep[]
}

export default function WorkflowBuilder() {
  const [template, setTemplate] = useState<WorkflowTemplate>({
    id: 'new',
    name: 'VAT Return Workflow',
    description: 'Standard quarterly VAT return process',
    jobType: 'vat_return',
    steps: [
      {
        id: '1',
        name: 'Gather Source Documents',
        description: 'Collect sales invoices, purchase invoices, and bank statements',
        estimatedHours: 2,
        dependencies: [],
        checklist: ['Sales invoices', 'Purchase invoices', 'Bank statements', 'Previous VAT return']
      },
      {
        id: '2',
        name: 'Data Entry & Reconciliation',
        description: 'Enter transactions and reconcile accounts',
        estimatedHours: 4,
        dependencies: ['1'],
        checklist: ['Enter sales transactions', 'Enter purchase transactions', 'Reconcile VAT control account']
      },
      {
        id: '3',
        name: 'VAT Return Preparation',
        description: 'Prepare and review VAT return',
        estimatedHours: 1,
        dependencies: ['2'],
        checklist: ['Calculate VAT liability', 'Complete VAT return form', 'Review calculations']
      },
      {
        id: '4',
        name: 'Client Review & Approval',
        description: 'Send to client for review and approval',
        estimatedHours: 0.5,
        dependencies: ['3'],
        checklist: ['Send draft to client', 'Obtain client approval', 'Address any queries']
      },
      {
        id: '5',
        name: 'Submit to HMRC',
        description: 'Submit VAT return via MTD',
        estimatedHours: 0.5,
        dependencies: ['4'],
        checklist: ['Submit via MTD', 'Confirm submission', 'File confirmation receipt']
      }
    ]
  })

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      name: 'New Step',
      description: '',
      estimatedHours: 1,
      dependencies: [],
      checklist: []
    }
    setTemplate({
      ...template,
      steps: [...template.steps, newStep]
    })
  }

  const removeStep = (stepId: string) => {
    setTemplate({
      ...template,
      steps: template.steps.filter(step => step.id !== stepId)
    })
  }

  const moveStep = (stepId: string, direction: 'up' | 'down') => {
    const currentIndex = template.steps.findIndex(step => step.id === stepId)
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === template.steps.length - 1)
    ) {
      return
    }

    const newSteps = [...template.steps]
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    
    const temp = newSteps[currentIndex]
    newSteps[currentIndex] = newSteps[targetIndex]
    newSteps[targetIndex] = temp
    
    setTemplate({
      ...template,
      steps: newSteps
    })
  }

  const updateStep = (stepId: string, field: keyof WorkflowStep, value: any) => {
    setTemplate({
      ...template,
      steps: template.steps.map(step =>
        step.id === stepId ? { ...step, [field]: value } : step
      )
    })
  }

  const totalHours = template.steps.reduce((sum, step) => sum + step.estimatedHours, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflow Builder</h1>
          <p className="text-gray-600 mt-2">Create and customize workflow templates</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Play className="h-4 w-4 mr-2" />
            Test Workflow
          </Button>
          <Button className="bg-brisk-primary hover:bg-brisk-primary-600">
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Workflow Steps</CardTitle>
                  <CardDescription>
                    Total estimated time: {totalHours} hours
                  </CardDescription>
                </div>
                <Button onClick={addStep} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {template.steps.map((step, index) => (
                  <div key={step.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">Step {index + 1}</Badge>
                        <Input
                          value={step.name}
                          onChange={(e) => updateStep(step.id, 'name', e.target.value)}
                          className="font-medium"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveStep(step.id, 'up')}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveStep(step.id, 'down')}
                          disabled={index === template.steps.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStep(step.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Input
                          value={step.description}
                          onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                          placeholder="Step description..."
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Estimated Hours</label>
                        <Input
                          type="number"
                          value={step.estimatedHours}
                          onChange={(e) => updateStep(step.id, 'estimatedHours', parseFloat(e.target.value))}
                          min="0"
                          step="0.5"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="text-sm font-medium">Checklist Items</label>
                      <div className="space-y-2 mt-2">
                        {step.checklist.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-2">
                            <Input
                              value={item}
                              onChange={(e) => {
                                const newChecklist = [...step.checklist]
                                newChecklist[itemIndex] = e.target.value
                                updateStep(step.id, 'checklist', newChecklist)
                              }}
                              placeholder="Checklist item..."
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newChecklist = step.checklist.filter((_, i) => i !== itemIndex)
                                updateStep(step.id, 'checklist', newChecklist)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            updateStep(step.id, 'checklist', [...step.checklist, ''])
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Item
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Template Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Template Name</label>
                  <Input
                    value={template.name}
                    onChange={(e) => setTemplate({ ...template, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={template.description}
                    onChange={(e) => setTemplate({ ...template, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Job Type</label>
                  <select
                    value={template.jobType}
                    onChange={(e) => setTemplate({ ...template, jobType: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="vat_return">VAT Return</option>
                    <option value="year_end">Year End Accounts</option>
                    <option value="payroll">Payroll Processing</option>
                    <option value="tax_return">Tax Return</option>
                    <option value="bookkeeping">Bookkeeping</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Workflow Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Steps</span>
                  <span className="font-medium">{template.steps.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Estimated Hours</span>
                  <span className="font-medium">{totalHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Checklist Items</span>
                  <span className="font-medium">
                    {template.steps.reduce((sum, step) => sum + step.checklist.length, 0)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

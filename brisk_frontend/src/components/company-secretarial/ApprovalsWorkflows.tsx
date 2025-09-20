import React, { useState, useEffect } from 'react'

interface ApprovalWorkflow {
  id: string
  name: string
  type: 'Maker-Checker' | 'Sequential' | 'Parallel' | 'Conditional'
  steps: WorkflowStep[]
  status: 'Active' | 'Draft' | 'Inactive'
  createdDate: string
}

interface WorkflowStep {
  id: string
  name: string
  approverRole: string
  required: boolean
  order: number
  conditions?: string
}

interface PendingApproval {
  id: string
  workflowName: string
  itemType: string
  itemDescription: string
  submittedBy: string
  submittedDate: string
  currentStep: string
  currentApprover: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Pending' | 'Approved' | 'Rejected' | 'Escalated'
}

const ApprovalsWorkflows: React.FC = () => {
  const [activeTab, setActiveTab] = useState('maker-checker')
  const [workflows, setWorkflows] = useState<ApprovalWorkflow[]>([])
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'maker-checker', label: 'Maker-Checker', icon: '✅' },
    { id: 'templates', label: 'Templates', icon: '📋' },
    { id: 'delegations', label: 'Delegations', icon: '👥' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setWorkflows([
        {
          id: '1',
          name: 'Share Allotment Approval',
          type: 'Sequential',
          steps: [
            { id: '1', name: 'Prepare', approverRole: 'CoSec Clerk', required: true, order: 1 },
            { id: '2', name: 'Review', approverRole: 'CoSec Manager', required: true, order: 2 },
            { id: '3', name: 'Approve', approverRole: 'Partner', required: true, order: 3 }
          ],
          status: 'Active',
          createdDate: '2024-01-15'
        },
        {
          id: '2',
          name: 'Director Appointment',
          type: 'Maker-Checker',
          steps: [
            { id: '1', name: 'Prepare', approverRole: 'CoSec Clerk', required: true, order: 1 },
            { id: '2', name: 'Check & Approve', approverRole: 'CoSec Manager', required: true, order: 2 }
          ],
          status: 'Active',
          createdDate: '2024-01-10'
        }
      ])

      setPendingApprovals([
        {
          id: '1',
          workflowName: 'Share Allotment Approval',
          itemType: 'Share Allotment',
          itemDescription: '5,000 Ordinary Shares to John Smith',
          submittedBy: 'Sarah Johnson',
          submittedDate: '2024-01-20',
          currentStep: 'Partner Approval',
          currentApprover: 'Michael Brown',
          priority: 'High',
          status: 'Pending'
        },
        {
          id: '2',
          workflowName: 'Director Appointment',
          itemType: 'Officer Change',
          itemDescription: 'Appoint Jane Doe as Director',
          submittedBy: 'CoSec Clerk',
          submittedDate: '2024-01-18',
          currentStep: 'Manager Review',
          currentApprover: 'CoSec Manager',
          priority: 'Medium',
          status: 'Pending'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-blue-100 text-blue-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Escalated': 'bg-orange-100 text-orange-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    }
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'maker-checker':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Approval Workflow</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter workflow name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Maker-Checker (2 steps)</option>
                      <option>Sequential Approval</option>
                      <option>Parallel Approval</option>
                      <option>Conditional Approval</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Applies To</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Share allotments</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Officer appointments</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Dividend declarations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Charge registrations</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Approval Steps</label>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">Step 1: Prepare</span>
                          <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                        </div>
                        <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                          <option>CoSec Clerk</option>
                          <option>CoSec Manager</option>
                          <option>Partner</option>
                        </select>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">Step 2: Approve</span>
                          <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                        </div>
                        <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                          <option>CoSec Manager</option>
                          <option>Partner</option>
                          <option>Client</option>
                        </select>
                      </div>
                      <button className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600">
                        + Add Step
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Create Workflow
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                      Save Draft
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Existing Workflows</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Steps</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workflows.map((workflow) => (
                    <tr key={workflow.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {workflow.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {workflow.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {workflow.steps.length} steps
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(workflow.createdDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(workflow.status)}`}>
                          {workflow.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Disable</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
                  <div className="flex space-x-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All pending</option>
                      <option>My approvals</option>
                      <option>High priority</option>
                    </select>
                  </div>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Step</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingApprovals.map((approval) => (
                    <tr key={approval.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{approval.itemType}</div>
                        <div className="text-sm text-gray-500">{approval.itemDescription}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{approval.submittedBy}</div>
                        <div className="text-sm text-gray-500">{new Date(approval.submittedDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{approval.currentStep}</div>
                        <div className="text-sm text-gray-500">{approval.currentApprover}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(approval.priority)}`}>
                          {approval.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(approval.status)}`}>
                          {approval.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                        <button className="text-red-600 hover:text-red-900 mr-3">Reject</button>
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'templates':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Board Resolution Template</h4>
                  <p className="text-sm text-gray-600 mb-3">Standard board resolution for approvals</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Edit</button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">Preview</button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Approval Letter Template</h4>
                  <p className="text-sm text-gray-600 mb-3">Letter template for approval notifications</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Edit</button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">Preview</button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Rejection Notice Template</h4>
                  <p className="text-sm text-gray-600 mb-3">Template for rejection notifications</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Edit</button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">Preview</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Template</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter template name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Board Resolution</option>
                      <option>Shareholder Resolution</option>
                      <option>Approval Letter</option>
                      <option>Rejection Notice</option>
                      <option>Meeting Notice</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Variables</label>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Available variables:</div>
                      <div>• {`{{company_name}}`}</div>
                      <div>• {`{{company_number}}`}</div>
                      <div>• {`{{date}}`}</div>
                      <div>• {`{{approver_name}}`}</div>
                      <div>• {`{{item_description}}`}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Content</label>
                    <textarea
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter template content with variables"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Save Template
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'delegations':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Delegations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delegator</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Michael Brown (Partner)</option>
                      <option>Sarah Johnson (CoSec Manager)</option>
                      <option>John Smith (Director)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delegate To</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Sarah Johnson (CoSec Manager)</option>
                      <option>CoSec Clerk</option>
                      <option>Assistant Manager</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delegation Period</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="From"
                      />
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="To"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delegation Scope</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">All approvals</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Share allotments only</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Officer appointments only</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Up to £10,000 value</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter reason for delegation"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Create Delegation
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                      Save Draft
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Active Delegations</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delegator</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delegate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scope</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Michael Brown
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Sarah Johnson
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Share allotments only
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      20 Jan - 28 Feb 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Revoke</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      default:
        return <div>Content not found</div>
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Approvals &amp; Workflows</h1>
          <p className="text-gray-600">Configure approval chains, templates and delegations</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Quick Approval
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Workflow Builder
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {renderTabContent()}
    </div>
  )
}

export default ApprovalsWorkflows

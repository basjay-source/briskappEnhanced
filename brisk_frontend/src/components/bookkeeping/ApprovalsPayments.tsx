import React, { useState } from 'react'
import { CheckCircle, CreditCard, Send, Users, Settings, Search, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react'

const ApprovalsPayments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('approval-centre')
  const [searchTerm, setSearchTerm] = useState('')

  const tabs = [
    { id: 'approval-centre', name: 'Approval Centre', icon: CheckCircle },
    { id: 'payment-runs', name: 'Payment Runs', icon: CreditCard },
    { id: 'remittances', name: 'Remittances', icon: Send },
    { id: 'payment-methods', name: 'Payment Methods', icon: Settings },
    { id: 'approval-workflows', name: 'Approval Workflows', icon: Users }
  ]

  const mockPendingApprovals = [
    { id: 1, type: 'Purchase Invoice', supplier: 'Office Supplies Ltd', amount: 1250.00, submittedBy: 'John Smith', date: '2024-01-15', priority: 'High' },
    { id: 2, type: 'Expense Claim', supplier: 'Travel Expenses', amount: 450.75, submittedBy: 'Sarah Johnson', date: '2024-01-14', priority: 'Medium' },
    { id: 3, type: 'Journal Entry', supplier: 'Year End Adjustment', amount: 5000.00, submittedBy: 'Mike Wilson', date: '2024-01-13', priority: 'High' },
    { id: 4, type: 'Purchase Invoice', supplier: 'IT Equipment Co', amount: 2800.00, submittedBy: 'Emma Davis', date: '2024-01-12', priority: 'Low' }
  ]

  const mockPaymentRuns = [
    { id: 1, name: 'Weekly Supplier Run', date: '2024-01-15', status: 'Pending', amount: 15750.00, suppliers: 12, method: 'BACS' },
    { id: 2, name: 'Monthly Payroll', date: '2024-01-01', status: 'Completed', amount: 45000.00, suppliers: 25, method: 'BACS' },
    { id: 3, name: 'Urgent Payments', date: '2024-01-10', status: 'Processing', amount: 3200.00, suppliers: 3, method: 'Faster Payment' }
  ]

  const mockRemittances = [
    { id: 1, supplier: 'Office Supplies Ltd', amount: 1250.00, date: '2024-01-15', status: 'Sent', method: 'Email', reference: 'REM-001' },
    { id: 2, supplier: 'IT Equipment Co', amount: 2800.00, date: '2024-01-14', status: 'Pending', method: 'Post', reference: 'REM-002' },
    { id: 3, supplier: 'Utilities Company', amount: 850.00, date: '2024-01-13', status: 'Sent', method: 'Email', reference: 'REM-003' }
  ]

  const mockPaymentMethods = [
    { id: 1, name: 'BACS Transfer', type: 'Bank Transfer', status: 'Active', defaultAccount: 'Main Current Account', fees: '£0.20' },
    { id: 2, name: 'Faster Payment', type: 'Bank Transfer', status: 'Active', defaultAccount: 'Main Current Account', fees: '£0.50' },
    { id: 3, name: 'CHAPS', type: 'Bank Transfer', status: 'Active', defaultAccount: 'Main Current Account', fees: '£25.00' },
    { id: 4, name: 'Cheque', type: 'Paper', status: 'Inactive', defaultAccount: 'Main Current Account', fees: '£2.00' }
  ]

  const mockWorkflows = [
    { id: 1, name: 'Standard Purchase Approval', trigger: 'Amount > £500', approvers: 'Manager → Director', timeLimit: '48 hours' },
    { id: 2, name: 'High Value Approval', trigger: 'Amount > £5000', approvers: 'Manager → Director → Partner', timeLimit: '72 hours' },
    { id: 3, name: 'Expense Claim Approval', trigger: 'All Expenses', approvers: 'Line Manager', timeLimit: '24 hours' },
    { id: 4, name: 'Journal Entry Approval', trigger: 'All Journals', approvers: 'Senior Accountant → Manager', timeLimit: '24 hours' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Approvals & Payments</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            New Payment Run
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Bulk Approve
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {activeTab === 'approval-centre' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Pending Approvals</h3>
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-blue-700">Awaiting review</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Approved Today</h3>
              <p className="text-2xl font-bold text-green-600">8</p>
              <p className="text-sm text-green-700">Ready for payment</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Overdue</h3>
              <p className="text-2xl font-bold text-yellow-600">3</p>
              <p className="text-sm text-yellow-700">Need attention</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-medium text-red-900">Rejected</h3>
              <p className="text-2xl font-bold text-red-600">2</p>
              <p className="text-sm text-red-700">This week</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Pending Approvals</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search approvals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier/Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockPendingApprovals.map((approval) => (
                    <tr key={approval.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{approval.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{approval.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{approval.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{approval.submittedBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{approval.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          approval.priority === 'High' ? 'bg-red-100 text-red-800' :
                          approval.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {approval.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">Approve</button>
                          <button className="text-red-600 hover:text-red-900">Reject</button>
                          <button className="text-gray-600 hover:text-gray-900">View</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payment-runs' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Active Runs</h3>
              <p className="text-2xl font-bold text-blue-600">3</p>
              <p className="text-sm text-blue-700">In progress</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Total Amount</h3>
              <p className="text-2xl font-bold text-green-600">£64K</p>
              <p className="text-sm text-green-700">This month</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Suppliers</h3>
              <p className="text-2xl font-bold text-yellow-600">40</p>
              <p className="text-sm text-yellow-700">Total active</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Success Rate</h3>
              <p className="text-2xl font-bold text-purple-600">98.5%</p>
              <p className="text-sm text-purple-700">Payment success</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Payment Runs</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search payment runs..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Create Run
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Run Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suppliers</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockPaymentRuns.map((run) => (
                    <tr key={run.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{run.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{run.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          run.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          run.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {run.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{run.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{run.suppliers}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{run.method}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'remittances' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Sent Today</h3>
              <p className="text-2xl font-bold text-blue-600">15</p>
              <p className="text-sm text-blue-700">Remittances</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Email Success</h3>
              <p className="text-2xl font-bold text-green-600">98%</p>
              <p className="text-sm text-green-700">Delivery rate</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">5</p>
              <p className="text-sm text-yellow-700">To be sent</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Total Value</h3>
              <p className="text-2xl font-bold text-purple-600">£4.9K</p>
              <p className="text-sm text-purple-700">This week</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Remittance Advices</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search remittances..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Send Batch
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockRemittances.map((remittance) => (
                    <tr key={remittance.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{remittance.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{remittance.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{remittance.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          remittance.status === 'Sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {remittance.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{remittance.method}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{remittance.reference}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                          <button className="text-green-600 hover:text-green-900">Resend</button>
                          <button className="text-gray-600 hover:text-gray-900">Download</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payment-methods' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Payment Methods Configuration</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                Add Method
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default Account</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockPaymentMethods.map((method) => (
                    <tr key={method.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{method.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{method.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          method.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {method.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{method.defaultAccount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{method.fees}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'approval-workflows' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Approval Workflows</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                Create Workflow
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approvers</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Limit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockWorkflows.map((workflow) => (
                    <tr key={workflow.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{workflow.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workflow.trigger}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workflow.approvers}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workflow.timeLimit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">Edit</button>
                          <button className="text-green-600 hover:text-green-900">Test</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApprovalsPayments

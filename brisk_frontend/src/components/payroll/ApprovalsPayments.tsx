import React, { useState, useEffect } from 'react'

interface PendingApproval {
  id: string
  type: 'Pay Run' | 'Bonus' | 'Expense' | 'Pension Remittance'
  description: string
  amount: number
  requestedBy: string
  requestDate: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Pending' | 'Approved' | 'Rejected'
}

interface PaymentRun {
  id: string
  description: string
  payPeriod: string
  totalNet: number
  totalGross: number
  employeeCount: number
  approvalStatus: 'Pending' | 'Approved' | 'Paid'
  paymentDate: string
  approvedBy?: string
}

interface Remittance {
  id: string
  type: 'PAYE' | 'NI' | 'Pension' | 'Student Loan'
  recipient: string
  amount: number
  dueDate: string
  status: 'Pending' | 'Sent' | 'Acknowledged'
  reference: string
}

const ApprovalsPayments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('approval-centre')
  const [approvals, setApprovals] = useState<PendingApproval[]>([])
  const [paymentRuns, setPaymentRuns] = useState<PaymentRun[]>([])
  const [remittances, setRemittances] = useState<Remittance[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'approval-centre', label: 'Approval Centre', icon: '✅' },
    { id: 'payroll-payment-runs', label: 'Payroll Payment Runs', icon: '💳' },
    { id: 'remittances', label: 'Remittances', icon: '📧' },
    { id: 'methods', label: 'Methods', icon: '🏦' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setApprovals([
        {
          id: '1',
          type: 'Pay Run',
          description: 'February 2024 Monthly Payroll',
          amount: 284750,
          requestedBy: 'Sarah Johnson',
          requestDate: '2024-02-28',
          priority: 'High',
          status: 'Pending'
        },
        {
          id: '2',
          type: 'Bonus',
          description: 'Q1 Performance Bonuses',
          amount: 15000,
          requestedBy: 'Mike Chen',
          requestDate: '2024-02-27',
          priority: 'Medium',
          status: 'Pending'
        },
        {
          id: '3',
          type: 'Pension Remittance',
          description: 'February Pension Contributions',
          amount: 22781,
          requestedBy: 'System',
          requestDate: '2024-02-29',
          priority: 'High',
          status: 'Approved'
        }
      ])

      setPaymentRuns([
        {
          id: '1',
          description: 'February 2024 Monthly Payroll',
          payPeriod: '01/02/2024 - 29/02/2024',
          totalNet: 210122,
          totalGross: 284750,
          employeeCount: 156,
          approvalStatus: 'Approved',
          paymentDate: '2024-03-01',
          approvedBy: 'David Wilson'
        },
        {
          id: '2',
          description: 'January 2024 Monthly Payroll',
          payPeriod: '01/01/2024 - 31/01/2024',
          totalNet: 205890,
          totalGross: 278450,
          employeeCount: 154,
          approvalStatus: 'Paid',
          paymentDate: '2024-02-01',
          approvedBy: 'David Wilson'
        }
      ])

      setRemittances([
        {
          id: '1',
          type: 'PAYE',
          recipient: 'HMRC',
          amount: 42150,
          dueDate: '2024-03-19',
          status: 'Pending',
          reference: 'PAYE-FEB24-001'
        },
        {
          id: '2',
          type: 'NI',
          recipient: 'HMRC',
          amount: 18240,
          dueDate: '2024-03-19',
          status: 'Pending',
          reference: 'NI-FEB24-001'
        },
        {
          id: '3',
          type: 'Pension',
          recipient: 'Aviva Pension Scheme',
          amount: 22781,
          dueDate: '2024-03-15',
          status: 'Sent',
          reference: 'PENS-FEB24-001'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Paid': 'bg-blue-100 text-blue-800',
      'Sent': 'bg-green-100 text-green-800',
      'Acknowledged': 'bg-blue-100 text-blue-800'
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

  const renderApprovalCentreTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Approve All
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Bulk Actions
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Requested By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {approvals.map((approval) => (
              <tr key={approval.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{approval.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{approval.description}</div>
                  <div className="text-sm text-gray-500">Requested: {approval.requestDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{approval.amount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{approval.requestedBy}</div>
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
                  {approval.status === 'Pending' && (
                    <>
                      <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                      <button className="text-red-600 hover:text-red-900 mr-3">Reject</button>
                    </>
                  )}
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderPaymentRunsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Payroll Payment Runs</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Generate Bank File
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pay Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paymentRuns.map((run) => (
              <tr key={run.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{run.description}</div>
                  {run.approvedBy && (
                    <div className="text-sm text-gray-500">Approved by: {run.approvedBy}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{run.payPeriod}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{run.employeeCount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{run.totalNet.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Gross: £{run.totalGross.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{run.paymentDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(run.approvalStatus)}`}>
                    {run.approvalStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Bank File</button>
                  <button className="text-gray-600 hover:text-gray-900">Receipt</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderRemittancesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Tax &amp; Pension Remittances</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Send All Pending
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recipient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {remittances.map((remittance) => (
              <tr key={remittance.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{remittance.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{remittance.recipient}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{remittance.amount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{remittance.dueDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{remittance.reference}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(remittance.status)}`}>
                    {remittance.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {remittance.status === 'Pending' && (
                    <button className="text-green-600 hover:text-green-900 mr-3">Send</button>
                  )}
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-gray-600 hover:text-gray-900">History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderMethodsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Bank Transfer (BACS)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Service User Number:</span>
                <span className="font-medium">123456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sort Code:</span>
                <span className="font-medium">12-34-56</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Number:</span>
                <span className="font-medium">12345678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Faster Payments</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Limit:</span>
                <span className="font-medium">£250,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Per Transaction:</span>
                <span className="font-medium">£250,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'approval-centre': return renderApprovalCentreTab()
      case 'payroll-payment-runs': return renderPaymentRunsTab()
      case 'remittances': return renderRemittancesTab()
      case 'methods': return renderMethodsTab()
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600">
              Streamlined approval workflows with integrated payment processing.
            </p>
          </div>
        )
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
          <h1 className="text-2xl font-bold text-gray-900">Approvals &amp; Payments</h1>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export Reports
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Payment Dashboard
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

export default ApprovalsPayments

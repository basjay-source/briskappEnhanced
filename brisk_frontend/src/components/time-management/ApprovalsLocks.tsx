import React, { useState, useEffect } from 'react'
import { CheckCircle, Lock, User, Clock, Calendar, Receipt, AlertTriangle } from 'lucide-react'

const ApprovalsLocks: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('timesheet')

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        setLoading(false)
      } catch (error) {
        console.error('Error fetching approvals:', error)
        setLoading(false)
      }
    }

    fetchApprovals()
  }, [])

  const tabs = [
    { id: 'timesheet-approvals', name: 'Timesheet Approvals', icon: Clock },
    { id: 'expense-approvals', name: 'Expense Approvals', icon: Receipt },
    { id: 'period-locks', name: 'Period Locks', icon: Lock },
    { id: 'override-requests', name: 'Override Requests', icon: AlertTriangle }
  ]


  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const timesheetApprovals = [
    {
      id: 1,
      user: 'John Smith',
      period: 'Week ending 15 Jan 2024',
      totalHours: 42.5,
      billableHours: 38.0,
      status: 'Pending',
      submittedAt: '2024-01-16 09:30',
      entries: 12
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      period: 'Week ending 15 Jan 2024',
      totalHours: 40.0,
      billableHours: 35.5,
      status: 'Approved',
      submittedAt: '2024-01-16 08:45',
      approvedAt: '2024-01-16 14:20',
      entries: 10
    },
    {
      id: 3,
      user: 'Mike Wilson',
      period: 'Week ending 15 Jan 2024',
      totalHours: 45.0,
      billableHours: 42.0,
      status: 'Rejected',
      submittedAt: '2024-01-16 10:15',
      rejectedAt: '2024-01-16 16:30',
      entries: 15,
      rejectionReason: 'Missing narratives for 3 entries'
    }
  ]

  const expenseApprovals = [
    {
      id: 1,
      user: 'John Smith',
      description: 'Client meeting expenses',
      amount: 125.50,
      currency: 'GBP',
      date: '2024-01-15',
      status: 'Pending',
      billable: true,
      client: 'Acme Corp'
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      description: 'Travel expenses',
      amount: 89.25,
      currency: 'GBP',
      date: '2024-01-14',
      status: 'Approved',
      billable: true,
      client: 'Tech Ltd'
    }
  ]

  const periodLocks = [
    {
      id: 1,
      period: 'December 2023',
      lockDate: '2024-01-05',
      lockedBy: 'Finance Manager',
      status: 'Locked',
      entries: 245,
      totalHours: 1850
    },
    {
      id: 2,
      period: 'November 2023',
      lockDate: '2023-12-05',
      lockedBy: 'Finance Manager',
      status: 'Locked',
      entries: 238,
      totalHours: 1795
    }
  ]

  const overrideRequests = [
    {
      id: 1,
      user: 'John Smith',
      type: 'Period Lock Override',
      reason: 'Missing time entry for client meeting',
      period: 'December 2023',
      requestedAt: '2024-01-10 14:30',
      status: 'Pending',
      approver: 'Finance Manager'
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      type: 'Fee Cap Override',
      reason: 'Additional work requested by client',
      engagement: 'Acme Corp Audit',
      requestedAt: '2024-01-09 11:20',
      status: 'Approved',
      approver: 'Partner'
    }
  ]


  const renderTimesheetApprovals = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entries</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {timesheetApprovals.map((approval) => (
            <tr key={approval.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{approval.user}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {approval.period}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{approval.totalHours}h total</div>
                <div className="text-sm text-gray-500">{approval.billableHours}h billable</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {approval.entries}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  approval.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  approval.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {approval.status}
                </span>
                {approval.rejectionReason && (
                  <div className="text-xs text-red-600 mt-1">{approval.rejectionReason}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {approval.submittedAt}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {approval.status === 'Pending' ? (
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-900">Approve</button>
                    <button className="text-red-600 hover:text-red-900">Reject</button>
                  </div>
                ) : (
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderExpenseApprovals = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billable</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenseApprovals.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {expense.user}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{expense.description}</div>
                <div className="text-sm text-gray-500">{expense.date}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                £{expense.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {expense.client}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  expense.billable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {expense.billable ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  expense.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {expense.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {expense.status === 'Pending' ? (
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-900">Approve</button>
                    <button className="text-red-600 hover:text-red-900">Reject</button>
                  </div>
                ) : (
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderPeriodLocks = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <Lock className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-sm font-medium text-blue-800">Period Lock Information</h3>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          Locked periods restrict time and expense entry edits. Override requests can be submitted for exceptional circumstances.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lock Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Locked By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entries</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {periodLocks.map((lock) => (
              <tr key={lock.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {lock.period}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lock.lockDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lock.lockedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lock.entries}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lock.totalHours}h
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    <Lock className="w-3 h-3 mr-1" />
                    {lock.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-red-600 hover:text-red-900">Unlock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderOverrideRequests = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approver</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {overrideRequests.map((request) => (
            <tr key={request.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {request.user}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{request.type}</div>
                <div className="text-sm text-gray-500">
                  {request.period || request.engagement}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.reason}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {request.requestedAt}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.approver}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {request.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {request.status === 'Pending' ? (
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-900">Approve</button>
                    <button className="text-red-600 hover:text-red-900">Reject</button>
                  </div>
                ) : (
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Approvals &amp; Locks</h1>
          <p className="text-gray-600 mt-2">Line-manager approvals, period locks, and override requests</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab: any) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
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

        <div className="p-6">
          {activeTab === 'timesheet' && renderTimesheetApprovals()}
          {activeTab === 'expense' && renderExpenseApprovals()}
          {activeTab === 'locks' && renderPeriodLocks()}
          {activeTab === 'override' && renderOverrideRequests()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Timesheets</span>
              <span className="text-sm font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Expenses</span>
              <span className="text-sm font-medium">5</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Approved Today</h3>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Timesheets</span>
              <span className="text-sm font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Expenses</span>
              <span className="text-sm font-medium">12</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Locked Periods</h3>
            <Lock className="w-5 h-5 text-red-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Current</span>
              <span className="text-sm font-medium">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Override Requests</span>
              <span className="text-sm font-medium">1</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">This Week</h3>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Submissions</span>
              <span className="text-sm font-medium">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Processed</span>
              <span className="text-sm font-medium">18</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApprovalsLocks

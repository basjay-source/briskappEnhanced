import React, { useState, useEffect } from 'react'

interface LeaveRequest {
  id: string
  employee: string
  type: 'Holiday' | 'Sickness' | 'Maternity' | 'Paternity' | 'Other'
  startDate: string
  endDate: string
  days: number
  status: 'Pending' | 'Approved' | 'Rejected'
  approver: string
  reason?: string
  statutory: boolean
  payAmount?: number
}

interface LeaveBalance {
  employee: string
  holidayEntitlement: number
  holidayTaken: number
  holidayRemaining: number
  sickDaysTaken: number
  carryOver: number
}

const LeaveAbsence: React.FC = () => {
  const [activeTab, setActiveTab] = useState('holiday')
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'holiday', label: 'Holiday', icon: '🏖️' },
    { id: 'sickness', label: 'Sickness (SSP)', icon: '🤒' },
    { id: 'family-leave', label: 'Family Leave (SMP/SPP/ShPP)', icon: '👶' },
    { id: 'other-absence', label: 'Other Absence', icon: '📅' },
    { id: 'policies', label: 'Policies', icon: '📋' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setLeaveRequests([
        {
          id: '1',
          employee: 'John Smith',
          type: 'Holiday',
          startDate: '2024-02-15',
          endDate: '2024-02-19',
          days: 5,
          status: 'Pending',
          approver: 'Sarah Johnson',
          statutory: false
        },
        {
          id: '2',
          employee: 'Emma Davis',
          type: 'Sickness',
          startDate: '2024-01-22',
          endDate: '2024-01-24',
          days: 3,
          status: 'Approved',
          approver: 'Michael Brown',
          reason: 'Flu symptoms',
          statutory: true,
          payAmount: 309.48
        }
      ])

      setLeaveBalances([
        {
          employee: 'John Smith',
          holidayEntitlement: 28,
          holidayTaken: 8,
          holidayRemaining: 20,
          sickDaysTaken: 2,
          carryOver: 5
        },
        {
          employee: 'Emma Davis',
          holidayEntitlement: 25,
          holidayTaken: 12,
          holidayRemaining: 13,
          sickDaysTaken: 6,
          carryOver: 0
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'holiday':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900">Holiday Balances</h4>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entitlement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Taken
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remaining
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaveBalances.map((balance, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{balance.employee}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{balance.holidayEntitlement} days</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{balance.holidayTaken} days</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{balance.holidayRemaining} days</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Adjust</button>
                        <button className="text-green-600 hover:text-green-900">History</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'sickness':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sickness &amp; SSP Management</h3>
            <div className="space-y-4">
              {leaveRequests.filter(req => req.type === 'Sickness').map(request => (
                <div key={request.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{request.employee}</h4>
                      <p className="text-sm text-gray-500">
                        {request.startDate} to {request.endDate} ({request.days} days)
                      </p>
                      {request.reason && (
                        <p className="text-sm text-gray-600">Reason: {request.reason}</p>
                      )}
                      {request.statutory && (
                        <p className="text-sm text-green-600">
                          SSP Eligible: £{request.payAmount?.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600">
              Content for {tabs.find(tab => tab.id === activeTab)?.label} will be displayed here.
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
          <h1 className="text-2xl font-bold text-gray-900">Leave &amp; Absence</h1>
          <p className="text-gray-600">Manage holiday, sickness, and statutory leave entitlements</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Bulk Approve
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Export Report
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

export default LeaveAbsence

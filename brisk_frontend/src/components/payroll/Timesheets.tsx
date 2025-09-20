import React, { useState, useEffect } from 'react'

interface TimesheetEntry {
  id: string
  employee: string
  department: string
  week: string
  regularHours: number
  overtimeHours: number
  totalHours: number
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected'
  approver: string
  project?: string
  costCenter: string
}

const Timesheets: React.FC = () => {
  const [activeTab, setActiveTab] = useState('timesheet-entry')
  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'timesheet-entry', label: 'Timesheet Entry', icon: '⏰' },
    { id: 'imports', label: 'Imports', icon: '📥' },
    { id: 'approvals', label: 'Approvals', icon: '✅' },
    { id: 'costing', label: 'Costing', icon: '💰' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setTimesheets([
        {
          id: '1',
          employee: 'John Smith',
          department: 'Finance',
          week: 'Week ending 21/01/2024',
          regularHours: 37.5,
          overtimeHours: 5,
          totalHours: 42.5,
          status: 'Submitted',
          approver: 'Sarah Johnson',
          project: 'Client ABC Audit',
          costCenter: 'AUDIT001'
        },
        {
          id: '2',
          employee: 'Michael Brown',
          department: 'Operations',
          week: 'Week ending 21/01/2024',
          regularHours: 40,
          overtimeHours: 8,
          totalHours: 48,
          status: 'Approved',
          approver: 'Emma Davis',
          costCenter: 'OPS001'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Submitted': 'bg-blue-100 text-blue-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timesheet-entry':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Week
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project/Cost Center
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
                {timesheets.map((timesheet) => (
                  <tr key={timesheet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{timesheet.employee}</div>
                        <div className="text-sm text-gray-500">{timesheet.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{timesheet.week}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Regular: {timesheet.regularHours}h
                      </div>
                      <div className="text-sm text-gray-500">
                        Overtime: {timesheet.overtimeHours}h
                      </div>
                      <div className="text-sm font-medium">
                        Total: {timesheet.totalHours}h
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {timesheet.project || 'General'}
                      </div>
                      <div className="text-sm text-gray-500">{timesheet.costCenter}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(timesheet.status)}`}>
                        {timesheet.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                      <button className="text-gray-600 hover:text-gray-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <h1 className="text-2xl font-bold text-gray-900">Timesheets</h1>
          <p className="text-gray-600">Manage time entry, approvals, and project costing</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Bulk Approve
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Export Data
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

export default Timesheets

import React, { useState, useEffect } from 'react'

interface PayRun {
  id: string
  name: string
  payPeriod: string
  payDate: string
  status: 'Draft' | 'Approved' | 'Committed' | 'Paid'
  employeeCount: number
  grossPay: number
  netPay: number
  deductions: number
  variance: number
  variancePercent: number
}

const PayRuns: React.FC = () => {
  const [activeTab, setActiveTab] = useState('draft-runs')
  const [payRuns, setPayRuns] = useState<PayRun[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPayRun, setSelectedPayRun] = useState<PayRun | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const tabs = [
    { id: 'draft-runs', label: 'Draft Runs', icon: '📝' },
    { id: 'off-cycle', label: 'Off-Cycle', icon: '🔄' },
    { id: 'bonuses', label: 'Bonuses/Ad-hoc', icon: '🎁' },
    { id: 'variances', label: 'Variances', icon: '📊' },
    { id: 'run-log', label: 'Run Log', icon: '📋' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setPayRuns([
        {
          id: '1',
          name: 'January 2024 - Monthly Salary',
          payPeriod: '01/01/2024 - 31/01/2024',
          payDate: '31/01/2024',
          status: 'Draft',
          employeeCount: 142,
          grossPay: 485750,
          netPay: 342850,
          deductions: 142900,
          variance: 12500,
          variancePercent: 2.6
        },
        {
          id: '2',
          name: 'Week 3 Jan 2024 - Weekly Wages',
          payPeriod: '15/01/2024 - 21/01/2024',
          payDate: '26/01/2024',
          status: 'Approved',
          employeeCount: 14,
          grossPay: 8750,
          netPay: 6890,
          deductions: 1860,
          variance: -250,
          variancePercent: -2.8
        },
        {
          id: '3',
          name: 'December 2023 - Monthly Salary',
          payPeriod: '01/12/2023 - 31/12/2023',
          payDate: '29/12/2023',
          status: 'Paid',
          employeeCount: 138,
          grossPay: 472300,
          netPay: 335200,
          deductions: 137100,
          variance: 0,
          variancePercent: 0
        },
        {
          id: '4',
          name: 'Christmas Bonus 2023',
          payPeriod: '01/12/2023 - 31/12/2023',
          payDate: '15/12/2023',
          status: 'Paid',
          employeeCount: 156,
          grossPay: 78000,
          netPay: 54600,
          deductions: 23400,
          variance: 0,
          variancePercent: 0
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-blue-100 text-blue-800',
      'Committed': 'bg-green-100 text-green-800',
      'Paid': 'bg-gray-100 text-gray-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-red-600'
    if (variance < 0) return 'text-green-600'
    return 'text-gray-600'
  }

  const renderDraftRunsTab = () => (
    <div className="space-y-6">
      {/* Create New Run */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Create New Pay Run</h3>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Pay Run
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📅</div>
            <h4 className="font-medium text-gray-900">Monthly Salary</h4>
            <p className="text-sm text-gray-500">142 employees</p>
            <p className="text-sm text-gray-500">Due: 31 Jan 2024</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⏰</div>
            <h4 className="font-medium text-gray-900">Weekly Wages</h4>
            <p className="text-sm text-gray-500">14 employees</p>
            <p className="text-sm text-gray-500">Due: 26 Jan 2024</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🎁</div>
            <h4 className="font-medium text-gray-900">Bonus Run</h4>
            <p className="text-sm text-gray-500">Ad-hoc payments</p>
            <p className="text-sm text-gray-500">As needed</p>
          </div>
        </div>
      </div>

      {/* Draft Pay Runs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Draft Pay Runs</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pay Run
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gross Pay
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Pay
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variance
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
            {payRuns.filter(run => run.status === 'Draft' || run.status === 'Approved').map((payRun) => (
              <tr key={payRun.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{payRun.name}</div>
                    <div className="text-sm text-gray-500">{payRun.payPeriod}</div>
                    <div className="text-sm text-gray-500">Pay Date: {payRun.payDate}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payRun.employeeCount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{payRun.grossPay.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{payRun.netPay.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${getVarianceColor(payRun.variance)}`}>
                    £{Math.abs(payRun.variance).toLocaleString()} ({payRun.variancePercent > 0 ? '+' : ''}{payRun.variancePercent}%)
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(payRun.status)}`}>
                    {payRun.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedPayRun(payRun)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Review
                    </button>
                    {payRun.status === 'Draft' && (
                      <button className="text-green-600 hover:text-green-900">
                        Approve
                      </button>
                    )}
                    {payRun.status === 'Approved' && (
                      <button className="text-orange-600 hover:text-orange-900">
                        Commit
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderVariancesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pay Run Variances</h3>
        <div className="space-y-4">
          {payRuns.filter(run => Math.abs(run.variancePercent) > 2).map(payRun => (
            <div key={payRun.id} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{payRun.name}</h4>
                  <p className="text-sm text-gray-500">
                    Variance: £{Math.abs(payRun.variance).toLocaleString()} ({payRun.variancePercent > 0 ? '+' : ''}{payRun.variancePercent}%)
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Investigate
                  </button>
                  <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700">
                    Drill Down
                  </button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Gross Pay:</span>
                  <span className="ml-2 font-medium">£{payRun.grossPay.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Deductions:</span>
                  <span className="ml-2 font-medium">£{payRun.deductions.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Net Pay:</span>
                  <span className="ml-2 font-medium">£{payRun.netPay.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderRunLogTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Pay Run History</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pay Run
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payRuns.map((payRun) => (
              <tr key={payRun.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{payRun.name}</div>
                    <div className="text-sm text-gray-500">Pay Date: {payRun.payDate}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(payRun.status)}`}>
                    {payRun.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payRun.employeeCount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{payRun.grossPay.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-green-600 hover:text-green-900">Payslips</button>
                    <button className="text-gray-600 hover:text-gray-900">Export</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'draft-runs': return renderDraftRunsTab()
      case 'off-cycle': return <div className="p-6 text-center text-gray-500">Off-cycle pay runs will be displayed here</div>
      case 'bonuses': return <div className="p-6 text-center text-gray-500">Bonus and ad-hoc pay runs will be displayed here</div>
      case 'variances': return renderVariancesTab()
      case 'run-log': return renderRunLogTab()
      default: return renderDraftRunsTab()
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
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pay Runs</h1>
          <p className="text-gray-600">Manage payroll processing, approvals, and payments</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Import Timesheets
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Create Pay Run
          </button>
        </div>
      </div>

      {/* Tabs */}
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

      {/* Tab Content */}
      {renderTabContent()}

      {/* Pay Run Detail Modal */}
      {selectedPayRun && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">{selectedPayRun.name}</h3>
              <button
                onClick={() => setSelectedPayRun(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Employees</div>
                <div className="text-xl font-bold">{selectedPayRun.employeeCount}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Gross Pay</div>
                <div className="text-xl font-bold">£{selectedPayRun.grossPay.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Deductions</div>
                <div className="text-xl font-bold">£{selectedPayRun.deductions.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Net Pay</div>
                <div className="text-xl font-bold">£{selectedPayRun.netPay.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedPayRun(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              {selectedPayRun.status === 'Draft' && (
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Approve Pay Run
                </button>
              )}
              {selectedPayRun.status === 'Approved' && (
                <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                  Commit Pay Run
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Pay Run Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Pay Run</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pay Run Name</label>
                <input
                  type="text"
                  placeholder="e.g., February 2024 - Monthly Salary"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pay Period Start</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pay Period End</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pay Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pay Calendar</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Monthly Salary</option>
                  <option>Weekly Wages</option>
                  <option>4-weekly</option>
                  <option>Bonus/Ad-hoc</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Create Pay Run
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PayRuns

import React, { useState } from 'react'
import { Lock, CheckCircle, Calendar, FileText } from 'lucide-react'

const PeriodClose: React.FC = () => {
  const [activeTab, setActiveTab] = useState('close-checklist')

  const tabs = [
    { id: 'close-checklist', name: 'Close Checklist', icon: CheckCircle },
    { id: 'period-locks', name: 'Period Locks', icon: Lock },
    { id: 'year-end-adjustments', name: 'Year-End Adjustments', icon: FileText },
    { id: 'post-close-tb', name: 'Post-Close TB', icon: Calendar }
  ]

  const mockCloseChecklist = [
    { id: 1, task: 'Bank Reconciliation Complete', status: 'Complete', assignee: 'John Smith', dueDate: '2024-04-30', completedDate: '2024-04-29' },
    { id: 2, task: 'VAT Return Filed', status: 'Complete', assignee: 'Sarah Johnson', dueDate: '2024-05-07', completedDate: '2024-05-06' },
    { id: 3, task: 'AR/AP Reviewed', status: 'In Progress', assignee: 'Mike Wilson', dueDate: '2024-05-01', completedDate: null },
    { id: 4, task: 'Fixed Assets Depreciation Run', status: 'Pending', assignee: 'Emma Davis', dueDate: '2024-05-02', completedDate: null },
    { id: 5, task: 'Payroll Journals Posted', status: 'Complete', assignee: 'John Smith', dueDate: '2024-04-30', completedDate: '2024-04-30' },
    { id: 6, task: 'Accruals & Prepayments', status: 'Pending', assignee: 'Sarah Johnson', dueDate: '2024-05-03', completedDate: null }
  ]

  const mockPeriodLocks = [
    { id: 1, period: 'March 2024', module: 'Sales', status: 'Locked', lockedBy: 'John Smith', lockedDate: '2024-04-05', canUnlock: true },
    { id: 2, period: 'March 2024', module: 'Purchases', status: 'Locked', lockedBy: 'Sarah Johnson', lockedDate: '2024-04-05', canUnlock: true },
    { id: 3, period: 'March 2024', module: 'Banking', status: 'Locked', lockedBy: 'Mike Wilson', lockedDate: '2024-04-06', canUnlock: false },
    { id: 4, period: 'March 2024', module: 'VAT', status: 'Locked', lockedBy: 'Emma Davis', lockedDate: '2024-04-07', canUnlock: false },
    { id: 5, period: 'April 2024', module: 'Sales', status: 'Open', lockedBy: null, lockedDate: null, canUnlock: true },
    { id: 6, period: 'April 2024', module: 'Purchases', status: 'Open', lockedBy: null, lockedDate: null, canUnlock: true }
  ]

  const mockYearEndAdjustments = [
    { id: 1, description: 'Depreciation Adjustment', account: '6200 - Depreciation', debit: 15000, credit: 0, reference: 'YE001', status: 'Posted' },
    { id: 2, description: 'Accrued Expenses', account: '2100 - Accrued Expenses', debit: 0, credit: 8500, reference: 'YE002', status: 'Posted' },
    { id: 3, description: 'Prepaid Insurance Adjustment', account: '1300 - Prepaid Insurance', debit: 0, credit: 2400, reference: 'YE003', status: 'Draft' },
    { id: 4, description: 'Bad Debt Provision', account: '6400 - Bad Debt Expense', debit: 5000, credit: 0, reference: 'YE004', status: 'Draft' },
    { id: 5, description: 'Stock Adjustment', account: '1200 - Inventory', debit: 0, credit: 3200, reference: 'YE005', status: 'Review' }
  ]

  const mockTrialBalance = [
    { account: '1000 - Cash at Bank', debit: 125000, credit: 0, balance: 125000 },
    { account: '1100 - Accounts Receivable', debit: 85000, credit: 0, balance: 85000 },
    { account: '1200 - Inventory', debit: 45000, credit: 0, balance: 45000 },
    { account: '1500 - Fixed Assets', debit: 250000, credit: 0, balance: 250000 },
    { account: '2000 - Accounts Payable', debit: 0, credit: 35000, balance: -35000 },
    { account: '2100 - Accrued Expenses', debit: 0, credit: 15000, balance: -15000 },
    { account: '3000 - Share Capital', debit: 0, credit: 100000, balance: -100000 },
    { account: '4000 - Sales Revenue', debit: 0, credit: 450000, balance: -450000 },
    { account: '5000 - Cost of Sales', debit: 180000, credit: 0, balance: 180000 },
    { account: '6000 - Operating Expenses', debit: 95000, credit: 0, balance: 95000 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Period Close</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Close Period
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Generate TB
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900">Tasks Complete</h4>
          <p className="text-2xl font-bold text-blue-600">3/6</p>
          <p className="text-sm text-blue-700">Close checklist</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium text-green-900">Periods Locked</h4>
          <p className="text-2xl font-bold text-green-600">4</p>
          <p className="text-sm text-green-700">March 2024</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900">Adjustments</h4>
          <p className="text-2xl font-bold text-yellow-600">5</p>
          <p className="text-sm text-yellow-700">Year-end entries</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-medium text-purple-900">TB Balance</h4>
          <p className="text-2xl font-bold text-purple-600">£0</p>
          <p className="text-sm text-purple-700">In balance</p>
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

      {activeTab === 'close-checklist' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Period Close Checklist</h3>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option value="">All Periods</option>
                <option value="april-2024">April 2024</option>
                <option value="march-2024">March 2024</option>
                <option value="february-2024">February 2024</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Add Task
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockCloseChecklist.map((task) => (
                  <tr key={task.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{task.task}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        task.status === 'Complete' ? 'bg-green-100 text-green-800' :
                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignee}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.completedDate || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      {task.status !== 'Complete' && (
                        <button className="text-green-600 hover:text-green-900">Complete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'period-locks' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Period Locks</h3>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option value="">All Periods</option>
                <option value="april-2024">April 2024</option>
                <option value="march-2024">March 2024</option>
                <option value="february-2024">February 2024</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Lock Period
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Locked By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Locked Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPeriodLocks.map((lock) => (
                  <tr key={lock.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lock.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lock.module}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        lock.status === 'Locked' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {lock.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lock.lockedBy || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lock.lockedDate || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lock.status === 'Locked' && lock.canUnlock ? (
                        <button className="text-red-600 hover:text-red-900">Unlock</button>
                      ) : lock.status === 'Open' ? (
                        <button className="text-blue-600 hover:text-blue-900">Lock</button>
                      ) : (
                        <span className="text-gray-400">No action</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'year-end-adjustments' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Year-End Adjustments</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search adjustments..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                New Adjustment
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockYearEndAdjustments.map((adjustment) => (
                  <tr key={adjustment.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{adjustment.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{adjustment.account}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {adjustment.debit > 0 ? `£${adjustment.debit.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {adjustment.credit > 0 ? `£${adjustment.credit.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{adjustment.reference}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        adjustment.status === 'Posted' ? 'bg-green-100 text-green-800' :
                        adjustment.status === 'Review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {adjustment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      {adjustment.status === 'Draft' && (
                        <button className="text-green-600 hover:text-green-900">Post</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'post-close-tb' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Post-Close Trial Balance</h3>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option value="">March 2024</option>
                <option value="february-2024">February 2024</option>
                <option value="january-2024">January 2024</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Export TB
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50">
                Publish
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockTrialBalance.map((account, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{account.account}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {account.debit > 0 ? `£${account.debit.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {account.credit > 0 ? `£${account.credit.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <span className={account.balance >= 0 ? 'text-gray-900' : 'text-red-600'}>
                        £{Math.abs(account.balance).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-bold">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">TOTALS</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                    £{mockTrialBalance.reduce((sum, acc) => sum + acc.debit, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                    £{mockTrialBalance.reduce((sum, acc) => sum + acc.credit, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                    £0
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default PeriodClose

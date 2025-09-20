import React, { useState } from 'react'
import { Calendar, DollarSign, TrendingUp, FileText, AlertTriangle } from 'lucide-react'

const RevenueRecognition: React.FC = () => {
  const [activeTab, setActiveTab] = useState('rules')

  const recognitionRules = [
    {
      id: 1,
      engagement: 'Acme Corp Audit',
      method: 'Over Time by Input',
      totalAmount: 50000.00,
      startDate: '2024-01-01',
      endDate: '2024-04-30',
      status: 'Active',
      recognizedToDate: 17500.00
    },
    {
      id: 2,
      engagement: 'Tech Ltd Implementation',
      method: 'Point in Time',
      totalAmount: 25000.00,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      status: 'Active',
      recognizedToDate: 0.00
    },
    {
      id: 3,
      engagement: 'Global Inc Advisory',
      method: 'Over Service Period',
      totalAmount: 75000.00,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Active',
      recognizedToDate: 6250.00
    }
  ]

  const deferralsAccruals = [
    {
      id: 1,
      engagement: 'Acme Corp Audit',
      type: 'Deferred Revenue',
      amount: 32500.00,
      period: 'Q1 2024',
      status: 'Posted',
      journalRef: 'JE-2024-001'
    },
    {
      id: 2,
      engagement: 'Tech Ltd Implementation',
      type: 'Accrued Revenue',
      amount: 15000.00,
      period: 'Q1 2024',
      status: 'Pending',
      journalRef: null
    },
    {
      id: 3,
      engagement: 'Global Inc Advisory',
      type: 'Deferred Revenue',
      amount: 68750.00,
      period: 'Q1 2024',
      status: 'Posted',
      journalRef: 'JE-2024-003'
    }
  ]

  const journalEntries = [
    {
      id: 1,
      reference: 'JE-2024-001',
      date: '2024-01-31',
      description: 'Revenue recognition - Acme Corp Audit',
      debitAccount: 'Deferred Revenue',
      creditAccount: 'Revenue',
      amount: 17500.00,
      status: 'Posted'
    },
    {
      id: 2,
      reference: 'JE-2024-002',
      date: '2024-01-31',
      description: 'Revenue recognition - Global Inc Advisory',
      debitAccount: 'Deferred Revenue',
      creditAccount: 'Revenue',
      amount: 6250.00,
      status: 'Posted'
    },
    {
      id: 3,
      reference: 'JE-2024-003',
      date: '2024-02-29',
      description: 'Revenue recognition - Acme Corp Audit',
      debitAccount: 'Deferred Revenue',
      creditAccount: 'Revenue',
      amount: 17500.00,
      status: 'Draft'
    }
  ]

  const tabs = [
    { id: 'rules', name: 'Rules (IFRS/GAAP)', icon: FileText },
    { id: 'deferrals', name: 'Deferrals & Accruals', icon: Calendar },
    { id: 'journals', name: 'Journals', icon: DollarSign }
  ]

  const renderRules = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recognized</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recognitionRules.map((rule) => (
            <tr key={rule.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {rule.engagement}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {rule.method}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                £{rule.totalAmount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{rule.startDate}</div>
                <div className="text-sm text-gray-500">to {rule.endDate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">£{rule.recognizedToDate.toLocaleString()}</div>
                <div className="text-sm text-gray-500">
                  {((rule.recognizedToDate / rule.totalAmount) * 100).toFixed(1)}%
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                £{(rule.totalAmount - rule.recognizedToDate).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  rule.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {rule.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderDeferralsAccruals = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Journal Ref</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {deferralsAccruals.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.engagement}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  item.type === 'Deferred Revenue' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                }`}>
                  {item.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                £{item.amount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.period}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.journalRef || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  item.status === 'Posted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {item.status === 'Pending' ? (
                  <button className="text-green-600 hover:text-green-900">Post</button>
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

  const renderJournals = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debit Account</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Account</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {journalEntries.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {entry.reference}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {entry.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {entry.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {entry.debitAccount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {entry.creditAccount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                £{entry.amount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  entry.status === 'Posted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {entry.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {entry.status === 'Draft' ? (
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-900">Post</button>
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
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

  const totalRecognized = recognitionRules.reduce((sum, rule) => sum + rule.recognizedToDate, 0)
  const totalDeferred = deferralsAccruals.filter(item => item.type === 'Deferred Revenue').reduce((sum, item) => sum + item.amount, 0)
  const totalAccrued = deferralsAccruals.filter(item => item.type === 'Accrued Revenue').reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Revenue Recognition</h1>
          <p className="text-gray-600 mt-2">Choose recognition method, generate deferral/accrual schedules, and post revenue journals</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <FileText className="w-4 h-4" />
          <span>Generate Journals</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recognized Revenue</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            £{totalRecognized.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">This period</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Deferred Revenue</h3>
            <Calendar className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-orange-600">
            £{totalDeferred.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">To be recognized</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Accrued Revenue</h3>
            <DollarSign className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            £{totalAccrued.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">Earned not billed</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Journals</h3>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {journalEntries.filter(entry => entry.status === 'Draft').length}
          </div>
          <p className="text-sm text-gray-500 mt-1">Awaiting posting</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
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
          {activeTab === 'rules' && renderRules()}
          {activeTab === 'deferrals' && renderDeferralsAccruals()}
          {activeTab === 'journals' && renderJournals()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recognition Methods</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Over Time by Input</span>
              <span className="text-sm font-medium">2 engagements</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Point in Time</span>
              <span className="text-sm font-medium">1 engagement</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Over Service Period</span>
              <span className="text-sm font-medium">1 engagement</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Revenue journal posted</p>
                <p className="text-sm text-gray-500">JE-2024-002 - £6,250</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium">Posted</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Schedule updated</p>
                <p className="text-sm text-gray-500">Acme Corp Audit - 35% complete</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600 font-medium">Updated</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueRecognition

import React, { useState } from 'react'
import { Users, Plus, Filter, CreditCard, Car, CheckCircle, AlertTriangle } from 'lucide-react'

const Expenses: React.FC = () => {
  const [activeTab, setActiveTab] = useState('claims')

  const tabs = [
    { id: 'claims', name: 'Claims', icon: Users },
    { id: 'mileage', name: 'Mileage', icon: Car },
    { id: 'corporate-cards', name: 'Corporate Cards', icon: CreditCard },
    { id: 'policy-rules', name: 'Policy Rules', icon: Filter },
    { id: 'reimbursements', name: 'Reimbursements', icon: Plus }
  ]

  const mockExpenseClaims = [
    { id: 1, employee: 'John Smith', date: '2024-04-15', description: 'Client meeting lunch', amount: 45.50, status: 'Approved', category: 'Meals & Entertainment', receipt: true },
    { id: 2, employee: 'Sarah Johnson', date: '2024-04-14', description: 'Travel to London office', amount: 125.00, status: 'Pending', category: 'Travel', receipt: true },
    { id: 3, employee: 'Mike Wilson', date: '2024-04-13', description: 'Office supplies', amount: 28.75, status: 'Rejected', category: 'Office Expenses', receipt: false },
    { id: 4, employee: 'Emma Davis', date: '2024-04-12', description: 'Conference registration', amount: 350.00, status: 'Approved', category: 'Training', receipt: true }
  ]

  const mockMileageClaims = [
    { id: 1, employee: 'John Smith', date: '2024-04-15', from: 'Office', to: 'Client Site A', miles: 25, rate: 0.45, amount: 11.25, purpose: 'Client meeting' },
    { id: 2, employee: 'Sarah Johnson', date: '2024-04-14', from: 'Home', to: 'London Office', miles: 45, rate: 0.45, amount: 20.25, purpose: 'Team meeting' },
    { id: 3, employee: 'Mike Wilson', date: '2024-04-13', from: 'Office', to: 'Court', miles: 15, rate: 0.45, amount: 6.75, purpose: 'Legal hearing' }
  ]

  const mockCorporateCards = [
    { id: 1, cardHolder: 'John Smith', cardNumber: '**** 1234', lastTransaction: '2024-04-15', amount: 125.50, merchant: 'Shell Petrol Station', category: 'Fuel', status: 'Matched' },
    { id: 2, cardHolder: 'Sarah Johnson', cardNumber: '**** 5678', lastTransaction: '2024-04-14', amount: 89.00, merchant: 'Premier Inn', category: 'Accommodation', status: 'Pending' },
    { id: 3, cardHolder: 'Mike Wilson', cardNumber: '**** 9012', lastTransaction: '2024-04-13', amount: 45.75, merchant: 'Amazon Business', category: 'Office Supplies', status: 'Unmatched' }
  ]

  const mockPolicyRules = [
    { id: 1, category: 'Meals & Entertainment', limit: 50.00, period: 'Per meal', requiresReceipt: true, requiresApproval: true, vatRecoverable: true },
    { id: 2, category: 'Travel', limit: 500.00, period: 'Per trip', requiresReceipt: true, requiresApproval: false, vatRecoverable: true },
    { id: 3, category: 'Office Expenses', limit: 100.00, period: 'Per month', requiresReceipt: true, requiresApproval: false, vatRecoverable: true },
    { id: 4, category: 'Training', limit: 1000.00, period: 'Per year', requiresReceipt: true, requiresApproval: true, vatRecoverable: false }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Expenses (Employees)</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            New Claim
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900">Pending Claims</h4>
          <p className="text-2xl font-bold text-blue-600">8</p>
          <p className="text-sm text-blue-700">Awaiting approval</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium text-green-900">This Month</h4>
          <p className="text-2xl font-bold text-green-600">£2,450</p>
          <p className="text-sm text-green-700">Total expenses</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900">VAT Recoverable</h4>
          <p className="text-2xl font-bold text-yellow-600">£490</p>
          <p className="text-sm text-yellow-700">This month</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-medium text-purple-900">Average Processing</h4>
          <p className="text-2xl font-bold text-purple-600">2.5</p>
          <p className="text-sm text-purple-700">Days</p>
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

      {activeTab === 'claims' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Expense Claims</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search claims..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                New Claim
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockExpenseClaims.map((claim) => (
                  <tr key={claim.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.employee}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{claim.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{claim.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {claim.receipt ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">View</button>
                      <button className="text-green-600 hover:text-green-900">Approve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'mileage' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Mileage Claims</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search mileage..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                New Mileage
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Journey</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Miles</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockMileageClaims.map((claim) => (
                  <tr key={claim.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.employee}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{claim.from} → {claim.to}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{claim.miles}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{claim.rate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{claim.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{claim.purpose}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Approve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'corporate-cards' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Corporate Card Transactions</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search transactions..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Import Feed
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card Holder</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockCorporateCards.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.cardHolder}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{transaction.cardNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.lastTransaction}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{transaction.merchant}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{transaction.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.status === 'Matched' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Match</button>
                      <button className="text-green-600 hover:text-green-900">Code</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'policy-rules' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Expense Policy Rules</h3>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Add Rule
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Limit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt Required</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval Required</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT Recoverable</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPolicyRules.map((rule) => (
                  <tr key={rule.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{rule.limit.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {rule.requiresReceipt ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {rule.requiresApproval ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {rule.vatRecoverable ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reimbursements' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Employee Reimbursements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Pending Reimbursements</h4>
              <p className="text-2xl font-bold text-blue-600">£1,250</p>
              <p className="text-sm text-blue-700">5 employees</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">Processed This Month</h4>
              <p className="text-2xl font-bold text-green-600">£3,450</p>
              <p className="text-sm text-green-700">12 payments</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Average Processing Time</h4>
              <p className="text-2xl font-bold text-yellow-600">3.2</p>
              <p className="text-sm text-yellow-700">Days</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Process Reimbursements
            </button>
            <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
              Export Payment File
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Expenses

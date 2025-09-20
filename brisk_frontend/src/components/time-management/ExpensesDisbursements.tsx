import React, { useState } from 'react'
import { Plus, Search, Filter, Upload, Receipt, DollarSign, Calendar, CheckCircle } from 'lucide-react'

const ExpensesDisbursements: React.FC = () => {
  const [activeTab, setActiveTab] = useState('expenses')
  const [searchTerm, setSearchTerm] = useState('')

  const expenses = [
    {
      id: 1,
      date: '2024-01-15',
      description: 'Client meeting lunch',
      category: 'Meals & Entertainment',
      amount: 45.50,
      currency: 'GBP',
      billable: true,
      client: 'Acme Corp',
      status: 'Approved',
      receipt: true
    },
    {
      id: 2,
      date: '2024-01-14',
      description: 'Travel to client site',
      category: 'Travel',
      amount: 125.00,
      currency: 'GBP',
      billable: true,
      client: 'Tech Ltd',
      status: 'Submitted',
      receipt: true
    },
    {
      id: 3,
      date: '2024-01-13',
      description: 'Office supplies',
      category: 'Office Expenses',
      amount: 32.75,
      currency: 'GBP',
      billable: false,
      client: null,
      status: 'Draft',
      receipt: false
    }
  ]

  const disbursements = [
    {
      id: 1,
      date: '2024-01-15',
      description: 'Companies House filing fee',
      category: 'Filing Fees',
      amount: 12.00,
      markup: 10,
      client: 'Acme Corp',
      status: 'Billed'
    },
    {
      id: 2,
      date: '2024-01-14',
      description: 'Search fee - Land Registry',
      category: 'Search Fees',
      amount: 3.00,
      markup: 15,
      client: 'Tech Ltd',
      status: 'Approved'
    },
    {
      id: 3,
      date: '2024-01-13',
      description: 'Courier service',
      category: 'Courier',
      amount: 25.00,
      markup: 20,
      client: 'Global Inc',
      status: 'Pending'
    }
  ]

  const mileageEntries = [
    {
      id: 1,
      date: '2024-01-15',
      from: 'Office',
      to: 'Acme Corp - London',
      miles: 25,
      rate: 0.45,
      amount: 11.25,
      client: 'Acme Corp',
      status: 'Approved'
    },
    {
      id: 2,
      date: '2024-01-14',
      from: 'Office',
      to: 'Tech Ltd - Birmingham',
      miles: 120,
      rate: 0.45,
      amount: 54.00,
      client: 'Tech Ltd',
      status: 'Submitted'
    }
  ]

  const tabs = [
    { id: 'expenses', name: 'Staff Expenses', icon: Receipt },
    { id: 'disbursements', name: 'Client Disbursements', icon: DollarSign },
    { id: 'mileage', name: 'Mileage', icon: Calendar }
  ]

  const renderExpenses = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billable</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {expense.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{expense.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {expense.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                £{expense.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {expense.client || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  expense.billable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {expense.billable ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {expense.receipt ? (
                  <button className="text-green-600 hover:text-green-900 flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>View</span>
                  </button>
                ) : (
                  <button className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </button>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  expense.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  expense.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {expense.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderDisbursements = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Markup</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {disbursements.map((disbursement) => (
            <tr key={disbursement.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {disbursement.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{disbursement.description}</div>
                <div className="text-sm text-gray-500">{disbursement.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                £{disbursement.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {disbursement.markup}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                £{(disbursement.amount * (1 + disbursement.markup / 100)).toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {disbursement.client}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  disbursement.status === 'Billed' ? 'bg-green-100 text-green-800' :
                  disbursement.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {disbursement.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderMileage = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Journey</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miles</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mileageEntries.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {entry.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{entry.from}</div>
                <div className="text-sm text-gray-500">to {entry.to}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {entry.miles}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                £{entry.rate}/mile
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                £{entry.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {entry.client}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  entry.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {entry.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
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
          <h1 className="text-3xl font-bold text-gray-900">Expenses &amp; Disbursements</h1>
          <p className="text-gray-600 mt-2">Capture staff expenses, client disbursements, and mileage with receipts</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
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
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {activeTab === 'expenses' && renderExpenses()}
          {activeTab === 'disbursements' && renderDisbursements()}
          {activeTab === 'mileage' && renderMileage()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
            <Receipt className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Expenses</span>
              <span className="text-sm font-medium">£1,245.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Billable</span>
              <span className="text-sm font-medium text-green-600">£985.25</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Non-billable</span>
              <span className="text-sm font-medium text-gray-600">£260.25</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Disbursements</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Value</span>
              <span className="text-sm font-medium">£340.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Markup</span>
              <span className="text-sm font-medium text-green-600">£51.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Billable Total</span>
              <span className="text-sm font-medium">£391.00</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Approval</h3>
            <Calendar className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Expenses</span>
              <span className="text-sm font-medium">8 items</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Disbursements</span>
              <span className="text-sm font-medium">3 items</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Value</span>
              <span className="text-sm font-medium">£425.75</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpensesDisbursements

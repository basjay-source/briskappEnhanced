import React, { useState } from 'react'
import { FileText, Clock, CheckCircle, AlertTriangle, DollarSign, Calendar, Search, Filter } from 'lucide-react'

const InvoiceTracking: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FileText },
    { id: 'pending', name: 'Pending Invoices', icon: Clock },
    { id: 'overdue', name: 'Overdue', icon: AlertTriangle },
    { id: 'paid', name: 'Paid', icon: CheckCircle },
    { id: 'analytics', name: 'Analytics', icon: DollarSign },
    { id: 'automation', name: 'Automation', icon: Calendar }
  ]

  const invoiceStats = [
    {
      title: 'Total Outstanding',
      value: '£45,678.90',
      change: '+12.5%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Overdue Amount',
      value: '£8,234.50',
      change: '-5.2%',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Paid This Month',
      value: '£67,890.00',
      change: '+18.7%',
      changeType: 'increase',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Average Days to Pay',
      value: '28 days',
      change: '-3 days',
      changeType: 'decrease',
      icon: Clock,
      color: 'orange'
    }
  ]

  const invoices = [
    {
      id: 'INV-2024-001',
      customer: 'Acme Corp Ltd',
      amount: 2450.00,
      dueDate: '2024-01-20',
      status: 'Pending',
      daysOverdue: 0,
      lastReminder: null,
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'INV-2024-002',
      customer: 'Tech Solutions Inc',
      amount: 1875.50,
      dueDate: '2024-01-10',
      status: 'Overdue',
      daysOverdue: 5,
      lastReminder: '2024-01-12',
      paymentMethod: 'Direct Debit'
    },
    {
      id: 'INV-2024-003',
      customer: 'Global Enterprises',
      amount: 3200.00,
      dueDate: '2024-01-25',
      status: 'Pending',
      daysOverdue: 0,
      lastReminder: null,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'INV-2024-004',
      customer: 'Local Business Ltd',
      amount: 890.00,
      dueDate: '2024-01-05',
      status: 'Overdue',
      daysOverdue: 10,
      lastReminder: '2024-01-08',
      paymentMethod: 'Bank Transfer'
    }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {invoiceStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Status Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">67%</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">18%</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">15%</div>
            <div className="text-sm text-gray-600">Paid</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderInvoiceList = (filterStatus?: string) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {filterStatus ? `${filterStatus} Invoices` : 'All Invoices'}
        </h3>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm"
            />
          </div>
          <button className="border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
            Send Reminders
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices
                .filter(invoice => !filterStatus || invoice.status === filterStatus)
                .map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.daysOverdue > 0 ? `${invoice.daysOverdue} days` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Remind</button>
                    <button className="text-orange-600 hover:text-orange-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Invoice Tracking</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Create Invoice
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Export Report
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

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'pending' && renderInvoiceList('Pending')}
      {activeTab === 'overdue' && renderInvoiceList('Overdue')}
      {activeTab === 'paid' && renderInvoiceList('Paid')}
      {activeTab === 'analytics' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Invoice analytics coming soon...</p>
        </div>
      )}
      {activeTab === 'automation' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Invoice automation coming soon...</p>
        </div>
      )}
    </div>
  )
}

export default InvoiceTracking

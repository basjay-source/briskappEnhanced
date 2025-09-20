import React, { useState, useEffect } from 'react'
import { Search, Filter, CreditCard, AlertTriangle, Phone, Mail, Archive } from 'lucide-react'

const CollectionsPayments: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('ar-aging')

  useEffect(() => {
    const fetchARItems = async () => {
      try {
        setLoading(false)
      } catch (error) {
        console.error('Error fetching AR items:', error)
        setLoading(false)
      }
    }

    fetchARItems()
  }, [])


  const tabs = [
    { id: 'ar-aging', name: 'AR Aging', icon: CreditCard },
    { id: 'dunning', name: 'Dunning', icon: Mail },
    { id: 'payment-methods', name: 'Payment Methods', icon: CreditCard },
    { id: 'disputes', name: 'Disputes', icon: AlertTriangle }
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

  const arAging = [
    {
      id: 1,
      invoice: 'INV-2024-001',
      client: 'Acme Corp',
      amount: 15000.00,
      invoiceDate: '2023-12-15',
      dueDate: '2024-01-14',
      daysOverdue: 2,
      agingBucket: '0-30 days',
      status: 'Overdue',
      lastContact: '2024-01-10'
    },
    {
      id: 2,
      invoice: 'INV-2023-089',
      client: 'Tech Ltd',
      amount: 8500.00,
      invoiceDate: '2023-11-20',
      dueDate: '2023-12-20',
      daysOverdue: 27,
      agingBucket: '0-30 days',
      status: 'Overdue',
      lastContact: '2024-01-05'
    },
    {
      id: 3,
      invoice: 'INV-2023-075',
      client: 'Global Inc',
      amount: 12000.00,
      invoiceDate: '2023-10-15',
      dueDate: '2023-11-14',
      daysOverdue: 63,
      agingBucket: '60-90 days',
      status: 'Dispute',
      lastContact: '2023-12-20'
    },
    {
      id: 4,
      invoice: 'INV-2023-045',
      client: 'Startup Co',
      amount: 3500.00,
      invoiceDate: '2023-08-10',
      dueDate: '2023-09-09',
      daysOverdue: 129,
      agingBucket: '90+ days',
      status: 'Legal',
      lastContact: '2023-11-15'
    }
  ]

  const dunningSequences = [
    {
      id: 1,
      name: 'Standard Sequence',
      steps: [
        { step: 1, trigger: '7 days overdue', action: 'Email reminder', template: 'First Reminder' },
        { step: 2, trigger: '14 days overdue', action: 'Email + SMS', template: 'Second Reminder' },
        { step: 3, trigger: '30 days overdue', action: 'Phone call', template: 'Phone Script' },
        { step: 4, trigger: '45 days overdue', action: 'Final notice', template: 'Final Notice' },
        { step: 5, trigger: '60 days overdue', action: 'Legal referral', template: 'Legal Notice' }
      ]
    }
  ]

  const paymentMethods = [
    {
      method: 'Bank Transfer',
      enabled: true,
      accountDetails: 'Sort: 12-34-56, Account: 12345678',
      fees: '£0',
      processingTime: '1-3 days'
    },
    {
      method: 'Credit Card',
      enabled: true,
      provider: 'Stripe',
      fees: '2.9% + 30p',
      processingTime: 'Instant'
    },
    {
      method: 'Direct Debit',
      enabled: true,
      provider: 'GoCardless',
      fees: '1% (max £2)',
      processingTime: '3-5 days'
    },
    {
      method: 'PayPal',
      enabled: false,
      provider: 'PayPal',
      fees: '3.4% + 20p',
      processingTime: 'Instant'
    }
  ]

  const disputesPromises = [
    {
      id: 1,
      invoice: 'INV-2023-075',
      client: 'Global Inc',
      type: 'Dispute',
      amount: 12000.00,
      reason: 'Scope disagreement',
      status: 'Under Review',
      raisedDate: '2023-12-15',
      assignedTo: 'Partner'
    },
    {
      id: 2,
      invoice: 'INV-2024-001',
      client: 'Acme Corp',
      type: 'Promise to Pay',
      amount: 15000.00,
      reason: 'Cash flow issues',
      status: 'Active',
      promiseDate: '2024-01-25',
      assignedTo: 'Manager'
    }
  ]


  const renderARAging = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aging Bucket</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {arAging.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{item.invoice}</div>
                <div className="text-sm text-gray-500">{item.invoiceDate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.client}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                £{item.amount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.dueDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-medium ${
                  item.daysOverdue > 60 ? 'text-red-600' :
                  item.daysOverdue > 30 ? 'text-orange-600' :
                  'text-yellow-600'
                }`}>
                  {item.daysOverdue} days
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  item.agingBucket === '0-30 days' ? 'bg-yellow-100 text-yellow-800' :
                  item.agingBucket === '60-90 days' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.agingBucket}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  item.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                  item.status === 'Dispute' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">Contact</button>
                  <button className="text-green-600 hover:text-green-900">Payment Link</button>
                  <button className="text-gray-600 hover:text-gray-900">View</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderDunning = () => (
    <div className="space-y-6">
      {dunningSequences.map((sequence) => (
        <div key={sequence.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{sequence.name}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Step</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Trigger</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Template</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sequence.steps.map((step) => (
                  <tr key={step.step}>
                    <td className="px-4 py-2 text-sm text-gray-900">{step.step}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{step.trigger}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{step.action}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{step.template}</td>
                    <td className="px-4 py-2 text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )

  const renderPaymentMethods = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processing Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paymentMethods.map((method, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900">{method.method}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {method.provider || method.accountDetails || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {method.fees}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {method.processingTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  method.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {method.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">
                  {method.enabled ? 'Disable' : 'Enable'}
                </button>
                <button className="text-gray-600 hover:text-gray-900">Configure</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderDisputes = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {disputesPromises.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.invoice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.client}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  item.type === 'Dispute' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                £{item.amount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.reason}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.assignedTo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Update</button>
                <button className="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const totalOverdue = arAging.reduce((sum, item) => sum + item.amount, 0)
  const totalDisputes = disputesPromises.filter(item => item.type === 'Dispute').reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collections &amp; Payment Links</h1>
          <p className="text-gray-600 mt-2">Monitor aging, launch dunning sequences, manage payment methods and disputes</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Mail className="w-4 h-4" />
          <span>Send Reminder</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Overdue</h3>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-red-600">
            £{totalOverdue.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">{arAging.length} invoices</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">In Dispute</h3>
            <Archive className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-orange-600">
            £{totalDisputes.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">{disputesPromises.filter(item => item.type === 'Dispute').length} disputes</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
            <CreditCard className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {paymentMethods.filter(method => method.enabled).length}
          </div>
          <p className="text-sm text-gray-500 mt-1">Active methods</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Collection Rate</h3>
            <Phone className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            88.7%
          </div>
          <p className="text-sm text-gray-500 mt-1">This month</p>
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
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {activeTab === 'ar-aging' && renderARAging()}
          {activeTab === 'dunning' && renderDunning()}
          {activeTab === 'payment-methods' && renderPaymentMethods()}
          {activeTab === 'disputes' && renderDisputes()}
        </div>
      </div>
    </div>
  )
}

export default CollectionsPayments

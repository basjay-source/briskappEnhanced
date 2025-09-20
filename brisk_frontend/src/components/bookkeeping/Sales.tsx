import React, { useState, useEffect } from 'react'
import { ShoppingCart, Plus, Search, Filter, FileText, CreditCard } from 'lucide-react'
import { bookkeepingApi } from '../../services/api'

const Sales: React.FC = () => {
  const [activeTab, setActiveTab] = useState('customers')
  const [loading, setLoading] = useState(true)
  const [, setCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await bookkeepingApi.getCustomers()
        setCustomers(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching customers:', error)
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  const mockCustomers = [
    {
      id: 1,
      customerCode: 'ACME001',
      companyName: 'Acme Corp Ltd',
      contactName: 'John Smith',
      email: 'john@acmecorp.com',
      phone: '+44 20 1234 5678',
      vatNumber: 'GB123456789',
      creditLimit: 50000.00,
      currentBalance: 15000.00,
      status: 'active'
    },
    {
      id: 2,
      customerCode: 'TECH001',
      companyName: 'Tech Solutions Inc',
      contactName: 'Sarah Johnson',
      email: 'sarah@techsolutions.com',
      phone: '+44 20 8765 4321',
      vatNumber: 'GB987654321',
      creditLimit: 25000.00,
      currentBalance: 8500.00,
      status: 'active'
    }
  ]

  const salesInvoices = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      customer: 'Acme Corp Ltd',
      invoiceDate: '2024-01-15',
      dueDate: '2024-02-14',
      subtotal: 10000.00,
      vatAmount: 2000.00,
      totalAmount: 12000.00,
      status: 'sent',
      currency: 'GBP'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      customer: 'Tech Solutions Inc',
      invoiceDate: '2024-01-12',
      dueDate: '2024-02-11',
      subtotal: 5000.00,
      vatAmount: 1000.00,
      totalAmount: 6000.00,
      status: 'paid',
      currency: 'GBP'
    }
  ]

  const tabs = [
    { id: 'customers', name: 'Customers', icon: ShoppingCart },
    { id: 'quotes', name: 'Quotes', icon: FileText },
    { id: 'sales-invoices', name: 'Sales Invoices', icon: FileText },
    { id: 'credit-notes', name: 'Credit Notes', icon: CreditCard },
    { id: 'recurring', name: 'Recurring', icon: Plus },
    { id: 'receipts', name: 'Receipts', icon: CreditCard },
    { id: 'price-lists', name: 'Price Lists', icon: FileText }
  ]

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Customers</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Limit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{customer.companyName}</div>
                      <div className="text-sm text-gray-500">{customer.customerCode}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{customer.contactName}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.vatNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{customer.creditLimit.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{customer.currentBalance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Invoice</button>
                    <button className="text-purple-600 hover:text-purple-900">Statement</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderSalesInvoices = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Sales Invoices</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Invoice</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.invoiceDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.currency} {invoice.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                      invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Send</button>
                    <button className="text-purple-600 hover:text-purple-900">Receipt</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sales (AR)</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Bulk Actions
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Export Data
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

      {activeTab === 'customers' && renderCustomers()}
      {activeTab === 'sales-invoices' && renderSalesInvoices()}
      {activeTab === 'quotes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Active Quotes</h3>
              <p className="text-2xl font-bold text-blue-600">24</p>
              <p className="text-sm text-blue-700">Awaiting response</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Accepted</h3>
              <p className="text-2xl font-bold text-green-600">18</p>
              <p className="text-sm text-green-700">This month</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">6</p>
              <p className="text-sm text-yellow-700">Need follow-up</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Win Rate</h3>
              <p className="text-2xl font-bold text-purple-600">75%</p>
              <p className="text-sm text-purple-700">Success rate</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Sales Quotes</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search quotes..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  New Quote
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Create and manage sales quotes with automated follow-up, conversion tracking, and seamless invoice generation upon acceptance.</p>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'credit-notes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Total Credit Notes</h3>
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-blue-700">This month</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-medium text-red-900">Total Value</h3>
              <p className="text-2xl font-bold text-red-600">£8,450</p>
              <p className="text-sm text-red-700">Credits issued</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Applied</h3>
              <p className="text-2xl font-bold text-green-600">9</p>
              <p className="text-sm text-green-700">Against invoices</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Outstanding</h3>
              <p className="text-2xl font-bold text-yellow-600">3</p>
              <p className="text-sm text-yellow-700">Unapplied credits</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Credit Notes Management</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search credit notes..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  New Credit Note
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Issue credit notes for returns, adjustments, and corrections with automatic VAT handling and customer account allocation.</p>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'recurring' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Active Templates</h3>
              <p className="text-2xl font-bold text-blue-600">15</p>
              <p className="text-sm text-blue-700">Recurring invoices</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Monthly Revenue</h3>
              <p className="text-2xl font-bold text-green-600">£45K</p>
              <p className="text-sm text-green-700">Recurring income</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Next Run</h3>
              <p className="text-2xl font-bold text-yellow-600">8</p>
              <p className="text-sm text-yellow-700">Due tomorrow</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Success Rate</h3>
              <p className="text-2xl font-bold text-purple-600">98%</p>
              <p className="text-sm text-purple-700">Auto-generation</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Recurring Invoice Templates</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  New Template
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Set up automated recurring invoices with flexible scheduling, escalation rules, and automatic payment collection integration.</p>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'receipts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Unallocated</h3>
              <p className="text-2xl font-bold text-blue-600">£12,500</p>
              <p className="text-sm text-blue-700">Pending allocation</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Allocated Today</h3>
              <p className="text-2xl font-bold text-green-600">£25,000</p>
              <p className="text-sm text-green-700">Payments matched</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Partial Payments</h3>
              <p className="text-2xl font-bold text-yellow-600">8</p>
              <p className="text-sm text-yellow-700">Need completion</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Auto-Match Rate</h3>
              <p className="text-2xl font-bold text-purple-600">85%</p>
              <p className="text-sm text-purple-700">Success rate</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Receipt Allocation</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search receipts..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Auto-Allocate
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Allocate customer payments to outstanding invoices with intelligent matching, partial payment handling, and automated reconciliation.</p>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'price-lists' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Active Price Lists</h3>
              <p className="text-2xl font-bold text-blue-600">6</p>
              <p className="text-sm text-blue-700">Current lists</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Products/Services</h3>
              <p className="text-2xl font-bold text-green-600">156</p>
              <p className="text-sm text-green-700">Total items</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Customer Groups</h3>
              <p className="text-2xl font-bold text-yellow-600">12</p>
              <p className="text-sm text-yellow-700">Pricing tiers</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Avg Margin</h3>
              <p className="text-2xl font-bold text-purple-600">35%</p>
              <p className="text-sm text-purple-700">Gross margin</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Price Lists Management</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search price lists..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  New Price List
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Manage product and service pricing with customer-specific rates, volume discounts, and automated price updates across all sales channels.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sales

import React, { useState, useEffect } from 'react'
import { Receipt, Plus, Search, Filter, FileText, ShoppingCart } from 'lucide-react'
import { bookkeepingApi } from '../../services/api'

const Purchases: React.FC = () => {
  const [activeTab, setActiveTab] = useState('suppliers')
  const [loading, setLoading] = useState(true)
  const [, setSuppliers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await bookkeepingApi.getSuppliers()
        setSuppliers(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching suppliers:', error)
        setLoading(false)
      }
    }

    fetchSuppliers()
  }, [])

  const mockSuppliers = [
    {
      id: 1,
      supplierCode: 'OFF001',
      companyName: 'Office Supplies Ltd',
      contactName: 'Mike Wilson',
      email: 'mike@officesupplies.com',
      phone: '+44 20 5555 1234',
      vatNumber: 'GB555123456',
      paymentTerms: '30 days',
      currentBalance: 2500.00,
      status: 'active'
    },
    {
      id: 2,
      supplierCode: 'IT001',
      companyName: 'IT Services Inc',
      contactName: 'Lisa Brown',
      email: 'lisa@itservices.com',
      phone: '+44 20 6666 5678',
      vatNumber: 'GB666789123',
      paymentTerms: '14 days',
      currentBalance: 4500.00,
      status: 'active'
    }
  ]

  const purchaseBills = [
    {
      id: 1,
      billNumber: 'BILL-2024-001',
      supplier: 'Office Supplies Ltd',
      billDate: '2024-01-10',
      dueDate: '2024-02-09',
      subtotal: 2000.00,
      vatAmount: 400.00,
      totalAmount: 2400.00,
      status: 'approved',
      currency: 'GBP'
    },
    {
      id: 2,
      billNumber: 'BILL-2024-002',
      supplier: 'IT Services Inc',
      billDate: '2024-01-08',
      dueDate: '2024-01-22',
      subtotal: 3500.00,
      vatAmount: 700.00,
      totalAmount: 4200.00,
      status: 'paid',
      currency: 'GBP'
    }
  ]

  const tabs = [
    { id: 'suppliers', name: 'Suppliers', icon: Receipt },
    { id: 'purchase-orders', name: 'Purchase Orders', icon: ShoppingCart },
    { id: 'bills', name: 'Bills', icon: FileText },
    { id: 'credit-notes', name: 'Credit Notes', icon: FileText },
    { id: 'recurring-bills', name: 'Recurring Bills', icon: Plus },
    { id: 'receipts', name: 'Receipts (GRNs)', icon: Receipt }
  ]

  const renderSuppliers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Suppliers</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Supplier</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search suppliers..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Terms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{supplier.companyName}</div>
                      <div className="text-sm text-gray-500">{supplier.supplierCode}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{supplier.contactName}</div>
                      <div className="text-sm text-gray-500">{supplier.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {supplier.vatNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {supplier.paymentTerms}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{supplier.currentBalance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      supplier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {supplier.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Bill</button>
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

  const renderBills = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Purchase Bills</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Bill</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {purchaseBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bill.billNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bill.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bill.billDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bill.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bill.currency} {bill.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      bill.status === 'paid' ? 'bg-green-100 text-green-800' :
                      bill.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                      bill.status === 'overdue' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                    <button className="text-purple-600 hover:text-purple-900">Pay</button>
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
        <h1 className="text-2xl font-bold text-gray-900">Purchases (AP)</h1>
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

      {activeTab === 'suppliers' && renderSuppliers()}
      {activeTab === 'bills' && renderBills()}
      {activeTab === 'purchase-orders' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Active POs</h3>
              <p className="text-2xl font-bold text-blue-600">24</p>
              <p className="text-sm text-blue-700">Pending delivery</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Completed</h3>
              <p className="text-2xl font-bold text-green-600">156</p>
              <p className="text-sm text-green-700">This month</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Total Value</h3>
              <p className="text-2xl font-bold text-yellow-600">£89,450</p>
              <p className="text-sm text-yellow-700">Outstanding orders</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Overdue</h3>
              <p className="text-2xl font-bold text-purple-600">3</p>
              <p className="text-sm text-purple-700">Need follow-up</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Purchase Orders Management</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search purchase orders..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  New PO
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Create and manage purchase orders with approval workflows, delivery tracking, and automatic conversion to bills upon receipt.</p>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'credit-notes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Credit Notes</h3>
              <p className="text-2xl font-bold text-blue-600">8</p>
              <p className="text-sm text-blue-700">This month</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-medium text-red-900">Total Value</h3>
              <p className="text-2xl font-bold text-red-600">£3,450</p>
              <p className="text-sm text-red-700">Credits received</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Applied</h3>
              <p className="text-2xl font-bold text-green-600">6</p>
              <p className="text-sm text-green-700">Against bills</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Outstanding</h3>
              <p className="text-2xl font-bold text-yellow-600">2</p>
              <p className="text-sm text-yellow-700">Unapplied credits</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Supplier Credit Notes</h3>
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
              <p className="text-gray-600">Manage supplier credit notes for returns, adjustments, and corrections with automatic VAT handling and bill allocation.</p>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'recurring-bills' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Active Templates</h3>
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-blue-700">Recurring bills</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Monthly Cost</h3>
              <p className="text-2xl font-bold text-green-600">£15,680</p>
              <p className="text-sm text-green-700">Recurring expenses</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Next Run</h3>
              <p className="text-2xl font-bold text-yellow-600">5</p>
              <p className="text-sm text-yellow-700">Due tomorrow</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Success Rate</h3>
              <p className="text-2xl font-bold text-purple-600">96%</p>
              <p className="text-sm text-purple-700">Auto-generation</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Recurring Bill Templates</h3>
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
              <p className="text-gray-600">Set up automated recurring bills for utilities, rent, subscriptions, and other regular expenses with flexible scheduling and approval workflows.</p>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'receipts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">GRNs Created</h3>
              <p className="text-2xl font-bold text-blue-600">45</p>
              <p className="text-sm text-blue-700">This month</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Matched to POs</h3>
              <p className="text-2xl font-bold text-green-600">42</p>
              <p className="text-sm text-green-700">Auto-matched</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Pending Bills</h3>
              <p className="text-2xl font-bold text-yellow-600">8</p>
              <p className="text-sm text-yellow-700">Awaiting invoices</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Discrepancies</h3>
              <p className="text-2xl font-bold text-purple-600">2</p>
              <p className="text-sm text-purple-700">Need review</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Goods Received Notes (GRNs)</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search GRNs..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  New GRN
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Track goods received against purchase orders with automatic matching, quality control, and seamless conversion to purchase bills.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Purchases

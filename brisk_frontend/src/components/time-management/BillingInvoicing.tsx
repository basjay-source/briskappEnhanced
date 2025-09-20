import React, { useState, useEffect } from 'react'
import { Plus, Search, Filter, FileText, Send, DollarSign, Calendar, CheckCircle } from 'lucide-react'

const BillingInvoicing: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('drafts')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(false)
      } catch (error) {
        console.error('Error fetching invoices:', error)
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  const mockInvoices = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      client: 'Acme Corp',
      engagement: 'Annual Audit',
      invoiceDate: '2024-01-15',
      dueDate: '2024-02-14',
      subtotal: 12500.00,
      vatAmount: 2500.00,
      totalAmount: 15000.00,
      currency: 'GBP',
      status: 'Draft',
      paymentTerms: '30 days',
      wipItems: 8
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      client: 'Tech Ltd',
      engagement: 'Tax Return',
      invoiceDate: '2024-01-10',
      dueDate: '2024-02-09',
      subtotal: 3500.00,
      vatAmount: 700.00,
      totalAmount: 4200.00,
      currency: 'GBP',
      status: 'Issued',
      paymentTerms: '30 days',
      wipItems: 5
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      client: 'Global Inc',
      engagement: 'Advisory Services',
      invoiceDate: '2024-01-05',
      dueDate: '2024-02-04',
      subtotal: 8750.00,
      vatAmount: 1750.00,
      totalAmount: 10500.00,
      currency: 'GBP',
      status: 'Paid',
      paymentTerms: '30 days',
      wipItems: 12
    }
  ]

  const tabs = [
    { id: 'drafts', name: 'Drafts', icon: FileText },
    { id: 'issued', name: 'Issued', icon: Send },
    { id: 'paid', name: 'Paid', icon: CheckCircle },
    { id: 'overdue', name: 'Overdue', icon: Calendar }
  ]

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.engagement.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === 'drafts' ? invoice.status === 'Draft' :
                      activeTab === 'issued' ? invoice.status === 'Issued' :
                      activeTab === 'paid' ? invoice.status === 'Paid' :
                      activeTab === 'overdue' ? invoice.status === 'Overdue' : true
    return matchesSearch && matchesTab
  })

  const totalDrafts = mockInvoices.filter(inv => inv.status === 'Draft').reduce((sum, inv) => sum + inv.totalAmount, 0)
  const totalIssued = mockInvoices.filter(inv => inv.status === 'Issued').reduce((sum, inv) => sum + inv.totalAmount, 0)
  const totalPaid = mockInvoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.totalAmount, 0)

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing &amp; Invoicing</h1>
          <p className="text-gray-600 mt-2">Create draft invoices, set VAT treatment, issue and post to AR</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Invoice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Draft Invoices</h3>
            <FileText className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-orange-600">
            £{totalDrafts.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">{mockInvoices.filter(inv => inv.status === 'Draft').length} invoices</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Issued</h3>
            <Send className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            £{totalIssued.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">{mockInvoices.filter(inv => inv.status === 'Issued').length} invoices</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Paid</h3>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            £{totalPaid.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">{mockInvoices.filter(inv => inv.status === 'Paid').length} invoices</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
            <DollarSign className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-purple-600">
            £{(totalDrafts + totalIssued + totalPaid).toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">Total invoiced</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const count = mockInvoices.filter(inv => 
                tab.id === 'drafts' ? inv.status === 'Draft' :
                tab.id === 'issued' ? inv.status === 'Issued' :
                tab.id === 'paid' ? inv.status === 'Paid' :
                tab.id === 'overdue' ? inv.status === 'Overdue' : false
              ).length
              
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
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {count}
                  </span>
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
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    VAT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
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
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No invoices found
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                          <div className="text-sm text-gray-500">{invoice.engagement}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {invoice.client}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{invoice.invoiceDate}</div>
                        <div className="text-sm text-gray-500">Due: {invoice.dueDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        £{invoice.subtotal.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        £{invoice.vatAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        £{invoice.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          invoice.status === 'Draft' ? 'bg-orange-100 text-orange-800' :
                          invoice.status === 'Issued' ? 'bg-blue-100 text-blue-800' :
                          invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {invoice.status === 'Draft' ? (
                            <>
                              <button className="text-blue-600 hover:text-blue-900">Edit</button>
                              <button className="text-green-600 hover:text-green-900">Issue</button>
                            </>
                          ) : (
                            <>
                              <button className="text-blue-600 hover:text-blue-900">View</button>
                              <button className="text-gray-600 hover:text-gray-900">PDF</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">INV-2024-003 paid</p>
                <p className="text-sm text-gray-500">Global Inc - £10,500</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium">Paid</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">INV-2024-002 issued</p>
                <p className="text-sm text-gray-500">Tech Ltd - £4,200</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600 font-medium">Issued</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">VAT Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Standard Rate (20%)</span>
              <span className="text-sm font-medium">£4,950</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Zero Rate (0%)</span>
              <span className="text-sm font-medium">£0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Exempt</span>
              <span className="text-sm font-medium">£0</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-900">Total VAT</span>
                <span className="text-sm font-bold text-gray-900">£4,950</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillingInvoicing

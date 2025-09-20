import React, { useState, useEffect } from 'react'
import { Banknote, Plus, Search, Filter, RefreshCw, CheckCircle } from 'lucide-react'
import { bookkeepingApi } from '../../services/api'

const Banking: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bank-accounts')
  const [loading, setLoading] = useState(true)
  const [, setBankAccounts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const response = await bookkeepingApi.getBankAccounts()
        setBankAccounts(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching bank accounts:', error)
        setLoading(false)
      }
    }

    fetchBankAccounts()
  }, [])

  const mockBankAccounts = [
    {
      id: 1,
      accountName: 'Main Current Account',
      bankName: 'Barclays Bank',
      accountNumber: '12345678',
      sortCode: '20-00-00',
      currency: 'GBP',
      currentBalance: 25000.00,
      lastReconciled: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      accountName: 'Business Savings',
      bankName: 'HSBC',
      accountNumber: '87654321',
      sortCode: '40-00-00',
      currency: 'GBP',
      currentBalance: 50000.00,
      lastReconciled: '2024-01-10',
      status: 'active'
    },
    {
      id: 3,
      accountName: 'USD Account',
      bankName: 'Barclays Bank',
      accountNumber: '11223344',
      sortCode: '20-00-00',
      currency: 'USD',
      currentBalance: 15000.00,
      lastReconciled: '2024-01-12',
      status: 'active'
    }
  ]

  const bankTransactions = [
    {
      id: 1,
      date: '2024-01-16',
      description: 'ACME CORP PAYMENT',
      reference: 'TXN001',
      amount: 5000.00,
      type: 'credit',
      isReconciled: false,
      balance: 30000.00
    },
    {
      id: 2,
      date: '2024-01-15',
      description: 'OFFICE SUPPLIES LTD',
      reference: 'DD001',
      amount: -250.00,
      type: 'debit',
      isReconciled: true,
      balance: 25000.00
    },
    {
      id: 3,
      date: '2024-01-14',
      description: 'SALARY PAYMENT',
      reference: 'SAL001',
      amount: -12000.00,
      type: 'debit',
      isReconciled: false,
      balance: 25250.00
    }
  ]


  const tabs = [
    { id: 'bank-accounts', name: 'Bank Accounts', icon: Banknote },
    { id: 'feeds', name: 'Feeds', icon: RefreshCw },
    { id: 'reconcile', name: 'Reconcile', icon: CheckCircle },
    { id: 'bank-rules', name: 'Bank Rules', icon: Filter },
    { id: 'cash-coding', name: 'Cash Coding', icon: Plus },
    { id: 'transfers', name: 'Transfers', icon: RefreshCw }
  ]

  const renderBankAccounts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Bank Accounts</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Account</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBankAccounts.map((account) => (
          <div key={account.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <Banknote className="w-8 h-8 text-blue-600" />
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {account.status}
              </span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{account.accountName}</h4>
            <p className="text-sm text-gray-500 mb-1">{account.bankName}</p>
            <p className="text-sm text-gray-500 mb-4">{account.sortCode} • {account.accountNumber}</p>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Current Balance</span>
                <span className="font-semibold text-gray-900">
                  {account.currency} {account.currentBalance.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Last Reconciled</span>
                <span className="text-sm text-gray-500">{account.lastReconciled}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderReconcile = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Bank Reconciliation</h3>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>Main Current Account</option>
            <option>Business Savings</option>
            <option>USD Account</option>
          </select>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Auto Match
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bankTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.reference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                      £{Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{transaction.balance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.isReconciled ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.isReconciled ? 'Reconciled' : 'Unreconciled'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {!transaction.isReconciled && (
                      <>
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Match</button>
                        <button className="text-green-600 hover:text-green-900">Code</button>
                      </>
                    )}
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
        <h1 className="text-2xl font-bold text-gray-900">Banking</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Import Statement
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Reconciliation Report
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

      {activeTab === 'bank-accounts' && renderBankAccounts()}
      {activeTab === 'reconcile' && renderReconcile()}
      {activeTab === 'feeds' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Bank feeds configuration coming soon...</p>
        </div>
      )}
      {activeTab === 'bank-rules' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Bank rules configuration coming soon...</p>
        </div>
      )}
      {activeTab === 'cash-coding' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Cash coding interface coming soon...</p>
        </div>
      )}
      {activeTab === 'transfers' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Bank transfers interface coming soon...</p>
        </div>
      )}
    </div>
  )
}

export default Banking

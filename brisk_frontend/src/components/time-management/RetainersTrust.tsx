import React, { useState, useEffect } from 'react'
import { Plus, Search, Wallet, DollarSign, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import { timeFeesApi } from '../../services/api'

const RetainersTrust: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const fetchRetainerAccounts = async () => {
      try {
        await timeFeesApi.getRetainerAccounts()
      } catch (error) {
        console.error('Error fetching retainer accounts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRetainerAccounts()
  }, [])

  const mockRetainerAccounts = [
    {
      id: 1,
      accountName: 'Acme Corp General Retainer',
      client: 'Acme Corp',
      balance: 25000.00,
      targetBalance: 30000.00,
      lowBalanceThreshold: 10000.00,
      currency: 'GBP',
      status: 'Active',
      monthlyDrawdown: 8500.00,
      lastTopUp: '2024-01-01'
    },
    {
      id: 2,
      accountName: 'Tech Ltd Advisory Retainer',
      client: 'Tech Ltd',
      balance: 5000.00,
      targetBalance: 20000.00,
      lowBalanceThreshold: 8000.00,
      currency: 'GBP',
      status: 'Low Balance',
      monthlyDrawdown: 6200.00,
      lastTopUp: '2023-12-15'
    },
    {
      id: 3,
      accountName: 'Global Inc Legal Retainer',
      client: 'Global Inc',
      balance: 45000.00,
      targetBalance: 50000.00,
      lowBalanceThreshold: 15000.00,
      currency: 'GBP',
      status: 'Active',
      monthlyDrawdown: 12000.00,
      lastTopUp: '2024-01-10'
    },
    {
      id: 4,
      accountName: 'Startup Co Trust Account',
      client: 'Startup Co',
      balance: 500.00,
      targetBalance: 10000.00,
      lowBalanceThreshold: 2000.00,
      currency: 'GBP',
      status: 'Depleted',
      monthlyDrawdown: 1500.00,
      lastTopUp: '2023-11-20'
    }
  ]

  const transactions = [
    {
      id: 1,
      type: 'Deposit',
      amount: 15000.00,
      description: 'Client top-up payment',
      date: '2024-01-15',
      account: 'Acme Corp General Retainer'
    },
    {
      id: 2,
      type: 'Drawdown',
      amount: -8500.00,
      description: 'Monthly advisory fees',
      date: '2024-01-14',
      account: 'Tech Ltd Advisory Retainer'
    },
    {
      id: 3,
      type: 'Interest',
      amount: 125.50,
      description: 'Monthly interest credit',
      date: '2024-01-13',
      account: 'Global Inc Legal Retainer'
    },
    {
      id: 4,
      type: 'Drawdown',
      amount: -2500.00,
      description: 'Legal consultation fees',
      date: '2024-01-12',
      account: 'Global Inc Legal Retainer'
    }
  ]

  const filteredAccounts = mockRetainerAccounts.filter(account => {
    const matchesSearch = account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'low-balance' && account.balance <= account.lowBalanceThreshold) ||
                         (statusFilter === 'active' && account.status === 'Active') ||
                         (statusFilter === 'depleted' && account.status === 'Depleted') ||
                         (statusFilter === 'suspended' && account.status === 'Suspended')
    return matchesSearch && matchesStatus
  })

  const totalBalance = mockRetainerAccounts.reduce((sum, account) => sum + account.balance, 0)
  const activeAccounts = mockRetainerAccounts.filter(account => account.status === 'Active').length
  const lowBalanceAccounts = mockRetainerAccounts.filter(account => account.balance <= account.lowBalanceThreshold).length

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
          <h1 className="text-3xl font-bold text-gray-900">Retainers &amp; Trust Accounts</h1>
          <p className="text-gray-600 mt-2">Create retainer accounts, record deposits, automate drawdowns with reconciliation</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Account</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Balance</h3>
            <Wallet className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            £{totalBalance.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">Across all accounts</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Accounts</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {activeAccounts}
          </div>
          <p className="text-sm text-gray-500 mt-1">of {mockRetainerAccounts.length} total</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Low Balance Alerts</h3>
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {lowBalanceAccounts}
          </div>
          <p className="text-sm text-gray-500 mt-1">Require attention</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Drawdowns</h3>
            <TrendingDown className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-purple-600">
            £{mockRetainerAccounts.reduce((sum, account) => sum + account.monthlyDrawdown, 0).toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search retainer accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="low-balance">Low Balance</option>
              <option value="depleted">Depleted</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Low Threshold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monthly Usage
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
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No retainer accounts found
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{account.accountName}</div>
                        <div className="text-sm text-gray-500">{account.client}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">£{account.balance.toLocaleString()}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            account.balance <= account.lowBalanceThreshold ? 'bg-red-500' :
                            account.balance < account.targetBalance * 0.5 ? 'bg-orange-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((account.balance / account.targetBalance) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      £{account.targetBalance.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      £{account.lowBalanceThreshold.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      £{account.monthlyDrawdown.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        account.status === 'Active' ? 'bg-green-100 text-green-800' :
                        account.status === 'Low Balance' ? 'bg-orange-100 text-orange-800' :
                        account.status === 'Depleted' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {account.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                        <button className="text-green-600 hover:text-green-900">Top Up</button>
                        <button className="text-orange-600 hover:text-orange-900">Drawdown</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === 'Deposit' ? 'bg-green-100' :
                    transaction.type === 'Drawdown' ? 'bg-red-100' :
                    'bg-blue-100'
                  }`}>
                    {transaction.type === 'Deposit' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : transaction.type === 'Drawdown' ? (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    ) : (
                      <DollarSign className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
                    <p className="text-sm text-gray-500">{transaction.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}£{Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Balance Alerts</h3>
          <div className="space-y-3">
            {mockRetainerAccounts
              .filter(account => account.balance <= account.lowBalanceThreshold)
              .map((account) => (
                <div key={account.id} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-800">{account.accountName}</p>
                      <p className="text-sm text-orange-600">Balance: £{account.balance.toLocaleString()}</p>
                    </div>
                    <button className="text-sm bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded">
                      Top Up
                    </button>
                  </div>
                </div>
              ))}
            {mockRetainerAccounts.filter(account => account.balance <= account.lowBalanceThreshold).length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No balance alerts</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RetainersTrust

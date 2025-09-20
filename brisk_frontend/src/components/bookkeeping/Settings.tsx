import React, { useState } from 'react'
import { List, Calculator, Hash, Calendar, DollarSign, Users, Edit, Trash2 } from 'lucide-react'

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chart-of-accounts')

  const tabs = [
    { id: 'chart-of-accounts', name: 'Chart of Accounts', icon: List },
    { id: 'tax-codes', name: 'Tax Codes', icon: Calculator },
    { id: 'sequences', name: 'Sequences', icon: Hash },
    { id: 'numbering', name: 'Numbering', icon: Hash },
    { id: 'posting-periods', name: 'Posting Periods', icon: Calendar },
    { id: 'currencies', name: 'Currencies', icon: DollarSign },
    { id: 'roles-permissions', name: 'Roles/Permissions', icon: Users }
  ]

  const mockChartOfAccounts = [
    { id: 1, code: '1000', name: 'Cash at Bank', type: 'Asset', category: 'Current Assets', balance: 125000, locked: true },
    { id: 2, code: '1100', name: 'Accounts Receivable', type: 'Asset', category: 'Current Assets', balance: 85000, locked: false },
    { id: 3, code: '1200', name: 'Inventory', type: 'Asset', category: 'Current Assets', balance: 45000, locked: false },
    { id: 4, code: '1500', name: 'Fixed Assets', type: 'Asset', category: 'Non-Current Assets', balance: 250000, locked: true },
    { id: 5, code: '2000', name: 'Accounts Payable', type: 'Liability', category: 'Current Liabilities', balance: -35000, locked: false },
    { id: 6, code: '2100', name: 'Accrued Expenses', type: 'Liability', category: 'Current Liabilities', balance: -15000, locked: false },
    { id: 7, code: '3000', name: 'Share Capital', type: 'Equity', category: 'Equity', balance: -100000, locked: true },
    { id: 8, code: '4000', name: 'Sales Revenue', type: 'Income', category: 'Revenue', balance: -450000, locked: false },
    { id: 9, code: '5000', name: 'Cost of Sales', type: 'Expense', category: 'Cost of Sales', balance: 180000, locked: false },
    { id: 10, code: '6000', name: 'Operating Expenses', type: 'Expense', category: 'Operating Expenses', balance: 95000, locked: false }
  ]

  const mockTaxCodes = [
    { id: 1, code: 'S', name: 'Standard Rate', rate: 20, type: 'VAT', country: 'UK', description: 'Standard VAT rate for most goods and services' },
    { id: 2, code: 'Z', name: 'Zero Rate', rate: 0, type: 'VAT', country: 'UK', description: 'Zero-rated supplies (books, food, etc.)' },
    { id: 3, code: 'E', name: 'Exempt', rate: 0, type: 'VAT', country: 'UK', description: 'Exempt supplies (insurance, finance, etc.)' },
    { id: 4, code: 'R', name: 'Reduced Rate', rate: 5, type: 'VAT', country: 'UK', description: 'Reduced rate (domestic fuel, etc.)' },
    { id: 5, code: 'T1', name: 'Sales Tax', rate: 8.25, type: 'Sales Tax', country: 'US', description: 'California state sales tax' },
    { id: 6, code: 'GST', name: 'GST Standard', rate: 10, type: 'GST', country: 'AU', description: 'Australian Goods and Services Tax' }
  ]

  const mockSequences = [
    { id: 1, name: 'Sales Invoices', prefix: 'INV', currentNumber: 1234, nextNumber: 1235, format: 'INV-{YYYY}-{####}', active: true },
    { id: 2, name: 'Purchase Orders', prefix: 'PO', currentNumber: 567, nextNumber: 568, format: 'PO-{####}', active: true },
    { id: 3, name: 'Credit Notes', prefix: 'CN', currentNumber: 89, nextNumber: 90, format: 'CN-{YYYY}-{####}', active: true },
    { id: 4, name: 'Journal Entries', prefix: 'JE', currentNumber: 2456, nextNumber: 2457, format: 'JE-{######}', active: true },
    { id: 5, name: 'Payment Vouchers', prefix: 'PV', currentNumber: 345, nextNumber: 346, format: 'PV-{YYYY}-{####}', active: false }
  ]

  const mockPostingPeriods = [
    { id: 1, period: 'January 2024', startDate: '2024-01-01', endDate: '2024-01-31', status: 'Closed', vatPeriod: 'Q1 2024' },
    { id: 2, period: 'February 2024', startDate: '2024-02-01', endDate: '2024-02-29', status: 'Closed', vatPeriod: 'Q1 2024' },
    { id: 3, period: 'March 2024', startDate: '2024-03-01', endDate: '2024-03-31', status: 'Closed', vatPeriod: 'Q1 2024' },
    { id: 4, period: 'April 2024', startDate: '2024-04-01', endDate: '2024-04-30', status: 'Open', vatPeriod: 'Q2 2024' },
    { id: 5, period: 'May 2024', startDate: '2024-05-01', endDate: '2024-05-31', status: 'Future', vatPeriod: 'Q2 2024' }
  ]

  const mockCurrencies = [
    { id: 1, code: 'GBP', name: 'British Pound', symbol: '£', rate: 1.0000, isBase: true, lastUpdated: '2024-04-15 14:30' },
    { id: 2, code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.2650, isBase: false, lastUpdated: '2024-04-15 14:30' },
    { id: 3, code: 'EUR', name: 'Euro', symbol: '€', rate: 1.1750, isBase: false, lastUpdated: '2024-04-15 14:30' },
    { id: 4, code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.7250, isBase: false, lastUpdated: '2024-04-15 14:30' },
    { id: 5, code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.9150, isBase: false, lastUpdated: '2024-04-15 14:30' }
  ]

  const mockRolesPermissions = [
    { id: 1, role: 'Partner', users: 3, permissions: ['Full Access', 'Approve Payments', 'Lock Periods', 'Manage Users'], description: 'Full system access with all permissions' },
    { id: 2, role: 'Manager', users: 8, permissions: ['Bookkeeping', 'Reports', 'Approve Journals', 'Client Access'], description: 'Management level access with approval rights' },
    { id: 3, role: 'Senior Accountant', users: 12, permissions: ['Bookkeeping', 'Reports', 'VAT Returns', 'Banking'], description: 'Senior level bookkeeping and reporting access' },
    { id: 4, role: 'Bookkeeper', users: 15, permissions: ['Data Entry', 'Basic Reports', 'Invoice Creation'], description: 'Standard bookkeeping data entry access' },
    { id: 5, role: 'Client', users: 45, permissions: ['View Reports', 'Upload Documents', 'View Invoices'], description: 'Client portal access for viewing and document upload' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Import Template
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Export Config
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900">Chart Accounts</h4>
          <p className="text-2xl font-bold text-blue-600">156</p>
          <p className="text-sm text-blue-700">Active accounts</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium text-green-900">Tax Codes</h4>
          <p className="text-2xl font-bold text-green-600">24</p>
          <p className="text-sm text-green-700">Configured codes</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900">Currencies</h4>
          <p className="text-2xl font-bold text-yellow-600">8</p>
          <p className="text-sm text-yellow-700">Active currencies</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-medium text-purple-900">User Roles</h4>
          <p className="text-2xl font-bold text-purple-600">12</p>
          <p className="text-sm text-purple-700">Permission groups</p>
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

      {activeTab === 'chart-of-accounts' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Chart of Accounts</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search accounts..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option value="">All Types</option>
                <option value="asset">Assets</option>
                <option value="liability">Liabilities</option>
                <option value="equity">Equity</option>
                <option value="income">Income</option>
                <option value="expense">Expenses</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Add Account
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockChartOfAccounts.map((account) => (
                  <tr key={account.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{account.code}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{account.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      <span className={account.balance >= 0 ? 'text-gray-900' : 'text-red-600'}>
                        £{Math.abs(account.balance).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        account.locked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {account.locked ? 'Locked' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">
                        <Edit className="w-4 h-4" />
                      </button>
                      {!account.locked && (
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'tax-codes' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Tax Codes</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search tax codes..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option value="">All Countries</option>
                <option value="UK">United Kingdom</option>
                <option value="US">United States</option>
                <option value="AU">Australia</option>
                <option value="CA">Canada</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Add Tax Code
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockTaxCodes.map((taxCode) => (
                  <tr key={taxCode.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-gray-900">{taxCode.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{taxCode.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{taxCode.rate}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{taxCode.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{taxCode.country}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{taxCode.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'sequences' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Number Sequences</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search sequences..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Add Sequence
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prefix</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Next</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockSequences.map((sequence) => (
                  <tr key={sequence.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{sequence.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{sequence.prefix}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{sequence.currentNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{sequence.nextNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{sequence.format}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        sequence.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {sequence.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">Reset</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'posting-periods' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Posting Periods</h3>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option value="">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Create Period
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPostingPeriods.map((period) => (
                  <tr key={period.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{period.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{period.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{period.endDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{period.vatPeriod}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        period.status === 'Open' ? 'bg-green-100 text-green-800' :
                        period.status === 'Closed' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {period.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {period.status === 'Open' && (
                        <button className="text-red-600 hover:text-red-900 mr-2">Close</button>
                      )}
                      {period.status === 'Closed' && (
                        <button className="text-green-600 hover:text-green-900 mr-2">Reopen</button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'currencies' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Currencies & Exchange Rates</h3>
            <div className="flex space-x-2">
              <button className="border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50">
                Update Rates
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Add Currency
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Exchange Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Currency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockCurrencies.map((currency) => (
                  <tr key={currency.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-gray-900">{currency.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currency.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{currency.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {currency.isBase ? 'Base' : currency.rate.toFixed(4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {currency.isBase && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          Base Currency
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{currency.lastUpdated}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">
                        <Edit className="w-4 h-4" />
                      </button>
                      {!currency.isBase && (
                        <button className="text-green-600 hover:text-green-900">Update Rate</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'roles-permissions' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Roles & Permissions</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search roles..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Create Role
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Permissions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockRolesPermissions.map((role) => (
                  <tr key={role.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{role.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{role.users}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission, index) => (
                          <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {permission}
                          </span>
                        ))}
                        {role.permissions.length > 3 && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                            +{role.permissions.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{role.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 mr-2">Permissions</button>
                      <button className="text-purple-600 hover:text-purple-900">Users</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'numbering' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Numbering Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Document Numbering</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <span className="text-sm text-gray-700">Auto-increment numbers</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <span className="text-sm text-gray-700">Include year in format</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <span className="text-sm text-gray-700">Reset annually</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <span className="text-sm text-gray-700">Leading zeros</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Format Examples</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sales Invoice:</span>
                  <span className="font-mono">INV-2024-0001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase Order:</span>
                  <span className="font-mono">PO-0001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Credit Note:</span>
                  <span className="font-mono">CN-2024-0001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Journal Entry:</span>
                  <span className="font-mono">JE-000001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings

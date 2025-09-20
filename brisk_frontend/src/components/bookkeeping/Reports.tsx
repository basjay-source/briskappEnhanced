import React, { useState, useEffect } from 'react'
import { BarChart3, FileText, TrendingUp, Calculator, Download } from 'lucide-react'
import { bookkeepingApi } from '../../services/api'

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trial-balance')
  const [loading, setLoading] = useState(false)

  const tabs = [
    { id: 'trial-balance', name: 'Trial Balance', icon: BarChart3 },
    { id: 'ar-ap-aged', name: 'AR/AP Aged', icon: TrendingUp },
    { id: 'bank-recs', name: 'Bank Recs', icon: FileText },
    { id: 'vat-reports', name: 'VAT Reports', icon: Calculator },
    { id: 'management-reports', name: 'Management P&L/BS', icon: BarChart3 },
    { id: 'audit-trail', name: 'Audit Trail', icon: FileText },
    { id: 'custom', name: 'Custom', icon: Download }
  ]

  const renderTrialBalance = () => {
    const [trialBalance, setTrialBalance] = useState<any>(null)

    useEffect(() => {
      const fetchTrialBalance = async () => {
        try {
          setLoading(true)
          const response = await bookkeepingApi.getTrialBalance()
          setTrialBalance(response.data)
          setLoading(false)
        } catch (error) {
          console.error('Error fetching trial balance:', error)
          setLoading(false)
        }
      }

      fetchTrialBalance()
    }, [])

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
          <h3 className="text-lg font-semibold text-gray-900">Trial Balance</h3>
          <div className="flex space-x-3">
            <input type="date" className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Generate
            </button>
            <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
              Export PDF
            </button>
          </div>
        </div>

        {trialBalance && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-medium text-gray-900">
                Trial Balance as of {trialBalance.as_of_date}
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trialBalance.accounts?.map((account: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {account.account_code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {account.account_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        {account.debit > 0 ? `£${account.debit.toLocaleString()}` : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        {account.credit > 0 ? `£${account.credit.toLocaleString()}` : ''}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" colSpan={2}>
                      Total
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                      £{trialBalance.total_debits?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                      £{trialBalance.total_credits?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Schedule Report
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Report Pack
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

      {activeTab === 'trial-balance' && renderTrialBalance()}
      {activeTab === 'ar-ap-aged' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Outstanding AR</h3>
              <p className="text-2xl font-bold text-blue-600">£45,250</p>
              <p className="text-sm text-blue-700">Total receivables</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-medium text-red-900">Outstanding AP</h3>
              <p className="text-2xl font-bold text-red-600">£32,180</p>
              <p className="text-sm text-red-700">Total payables</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Aged Receivables Analysis</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-5 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Current</p>
                  <p className="text-lg font-semibold text-green-600">£15,200</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">1-30 Days</p>
                  <p className="text-lg font-semibold text-yellow-600">£12,500</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">31-60 Days</p>
                  <p className="text-lg font-semibold text-orange-600">£8,750</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">61-90 Days</p>
                  <p className="text-lg font-semibold text-red-600">£5,200</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">90+ Days</p>
                  <p className="text-lg font-semibold text-red-800">£3,600</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Generate Report
                </button>
                <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 text-sm">
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'bank-recs' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Reconciled</h3>
              <p className="text-2xl font-bold text-green-600">95%</p>
              <p className="text-sm text-green-700">This month</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Pending Items</h3>
              <p className="text-2xl font-bold text-yellow-600">12</p>
              <p className="text-sm text-yellow-700">Need attention</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Variance</h3>
              <p className="text-2xl font-bold text-blue-600">£125</p>
              <p className="text-sm text-blue-700">Outstanding</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Bank Reconciliation Summary</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">Main Current Account</span>
                  <span className="text-sm font-medium text-green-600">Reconciled</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">Business Savings Account</span>
                  <span className="text-sm font-medium text-green-600">Reconciled</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                  <span className="text-sm text-gray-700">Petty Cash Account</span>
                  <span className="text-sm font-medium text-yellow-600">Pending</span>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  View Details
                </button>
                <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 text-sm">
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'vat-reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">VAT Liability</h3>
              <p className="text-2xl font-bold text-blue-600">£8,450</p>
              <p className="text-sm text-blue-700">Current quarter</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Input VAT</h3>
              <p className="text-2xl font-bold text-green-600">£3,200</p>
              <p className="text-sm text-green-700">Recoverable</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Output VAT</h3>
              <p className="text-2xl font-bold text-yellow-600">£11,650</p>
              <p className="text-sm text-yellow-700">Collected</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Net Position</h3>
              <p className="text-2xl font-bold text-purple-600">£8,450</p>
              <p className="text-sm text-purple-700">To pay</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">VAT Analysis Reports</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">VAT Return Summary</h4>
                  <p className="text-sm text-gray-600 mb-3">Quarterly VAT return analysis with box-by-box breakdown</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">Generate</button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">VAT Exceptions</h4>
                  <p className="text-sm text-gray-600 mb-3">Transactions requiring VAT review or correction</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">View</button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">EC Sales List</h4>
                  <p className="text-sm text-gray-600 mb-3">European Community sales reporting for VAT purposes</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">Generate</button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Intrastat Report</h4>
                  <p className="text-sm text-gray-600 mb-3">EU trade statistics for goods movements</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">Generate</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'management-reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Revenue</h3>
              <p className="text-2xl font-bold text-blue-600">£125K</p>
              <p className="text-sm text-blue-700">This month</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Gross Profit</h3>
              <p className="text-2xl font-bold text-green-600">65%</p>
              <p className="text-sm text-green-700">Margin</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Expenses</h3>
              <p className="text-2xl font-bold text-yellow-600">£45K</p>
              <p className="text-sm text-yellow-700">Operating costs</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Net Profit</h3>
              <p className="text-2xl font-bold text-purple-600">£35K</p>
              <p className="text-sm text-purple-700">After tax</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Management Reporting Suite</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Profit & Loss</h4>
                  <p className="text-sm text-gray-600 mb-3">Monthly P&L with variance analysis and budget comparison</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">Generate</button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Balance Sheet</h4>
                  <p className="text-sm text-gray-600 mb-3">Statement of financial position with comparative periods</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">Generate</button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Cash Flow</h4>
                  <p className="text-sm text-gray-600 mb-3">Cash flow statement with forecasting and trend analysis</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">Generate</button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">KPI Dashboard</h4>
                  <p className="text-sm text-gray-600 mb-3">Key performance indicators with visual charts and trends</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">View</button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Budget vs Actual</h4>
                  <p className="text-sm text-gray-600 mb-3">Variance analysis with drill-down capabilities</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">Generate</button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Departmental Reports</h4>
                  <p className="text-sm text-gray-600 mb-3">Cost center analysis and departmental profitability</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">Generate</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'audit-trail' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Total Entries</h3>
              <p className="text-2xl font-bold text-blue-600">2,456</p>
              <p className="text-sm text-blue-700">This month</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Approved</h3>
              <p className="text-2xl font-bold text-green-600">2,398</p>
              <p className="text-sm text-green-700">97.6% rate</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Modifications</h3>
              <p className="text-2xl font-bold text-yellow-600">45</p>
              <p className="text-sm text-yellow-700">Edited entries</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-medium text-red-900">Deletions</h3>
              <p className="text-2xl font-bold text-red-600">13</p>
              <p className="text-sm text-red-700">Removed entries</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Audit Trail & Activity Log</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Journal Entry #JE-2024-001</p>
                    <p className="text-xs text-gray-600">Created by John Smith on 2024-01-15 at 14:30</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Created</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Invoice #INV-2024-045</p>
                    <p className="text-xs text-gray-600">Modified by Sarah Johnson on 2024-01-15 at 13:45</p>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Modified</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Payment #PAY-2024-123</p>
                    <p className="text-xs text-gray-600">Approved by Mike Wilson on 2024-01-15 at 12:20</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Approved</span>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Full Audit Report
                </button>
                <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 text-sm">
                  Export Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'custom' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Custom Report Builder</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Report Configuration</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Report Name</label>
                      <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="Enter report name" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Data Source</label>
                      <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                        <option>General Ledger</option>
                        <option>Sales Ledger</option>
                        <option>Purchase Ledger</option>
                        <option>Fixed Assets</option>
                        <option>VAT Transactions</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Date Range</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="date" className="border border-gray-300 rounded px-3 py-2 text-sm" />
                        <input type="date" className="border border-gray-300 rounded px-3 py-2 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Grouping</label>
                      <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                        <option>By Account</option>
                        <option>By Department</option>
                        <option>By Project</option>
                        <option>By Month</option>
                        <option>By Supplier/Customer</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Available Fields</h4>
                  <div className="border border-gray-200 rounded p-4 h-64 overflow-y-auto">
                    <div className="space-y-2">
                      {['Account Code', 'Account Name', 'Transaction Date', 'Description', 'Debit Amount', 'Credit Amount', 'Reference', 'Department', 'Project Code', 'VAT Code', 'Supplier Name', 'Customer Name'].map((field) => (
                        <label key={field} className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-gray-700">{field}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Generate Report
                </button>
                <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 text-sm">
                  Save Template
                </button>
                <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 text-sm">
                  Preview
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Saved Report Templates</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Monthly Departmental P&L</h4>
                  <p className="text-sm text-gray-600 mb-3">Profit & Loss by department with monthly breakdown</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">Run Report</button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Project Cost Analysis</h4>
                  <p className="text-sm text-gray-600 mb-3">Detailed cost breakdown by project with variance analysis</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">Run Report</button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Supplier Spend Analysis</h4>
                  <p className="text-sm text-gray-600 mb-3">Top suppliers by spend with payment terms analysis</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">Run Report</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports

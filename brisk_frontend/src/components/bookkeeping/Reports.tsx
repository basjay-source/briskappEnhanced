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
        <div className="text-center py-12">
          <p className="text-gray-500">Aged receivables/payables reports coming soon...</p>
        </div>
      )}
      {activeTab === 'bank-recs' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Bank reconciliation reports coming soon...</p>
        </div>
      )}
      {activeTab === 'vat-reports' && (
        <div className="text-center py-12">
          <p className="text-gray-500">VAT reports coming soon...</p>
        </div>
      )}
      {activeTab === 'management-reports' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Management reports coming soon...</p>
        </div>
      )}
      {activeTab === 'audit-trail' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Audit trail reports coming soon...</p>
        </div>
      )}
      {activeTab === 'custom' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Custom reports coming soon...</p>
        </div>
      )}
    </div>
  )
}

export default Reports

import React, { useState, useEffect } from 'react'
import { Layers, Eye, Send, Settings, CheckCircle } from 'lucide-react'

const JournalsPostBack: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('mapping')
  const [journalsData, setJournalsData] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setJournalsData({
        mapping: {
          ctCharge: '7000',
          ctPayable: '2300',
          deferredTax: '2310'
        },
        journals: [
          { account: '7000', description: 'Corporation Tax Charge', debit: 43300, credit: 0 },
          { account: '2300', description: 'Corporation Tax Payable', debit: 0, credit: 43300 }
        ],
        deferredTax: {
          enabled: false,
          amount: 0
        }
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Journals & Post-Back</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Post to GL</span>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'mapping', label: 'Mapping' },
            { id: 'preview', label: 'Preview & Post' },
            { id: 'deferred', label: 'Deferred Tax (optional)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'mapping' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">GL Account Mapping</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Corporation Tax Charge</label>
                  <input
                    type="text"
                    value={journalsData.mapping.ctCharge}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Corporation Tax Payable</label>
                  <input
                    type="text"
                    value={journalsData.mapping.ctPayable}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Deferred Tax</label>
                  <input
                    type="text"
                    value={journalsData.mapping.deferredTax}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    readOnly
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Configure Mapping</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Journal Entries Preview</h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Debit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {journalsData.journals.map((journal: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {journal.account}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {journal.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {journal.debit > 0 ? `£${journal.debit.toLocaleString()}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {journal.credit > 0 ? `£${journal.credit.toLocaleString()}` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={2} className="px-6 py-3 text-sm font-medium text-gray-900">
                        Totals
                      </td>
                      <td className="px-6 py-3 text-sm font-bold text-gray-900">
                        £{journalsData.journals.reduce((sum: number, j: any) => sum + j.debit, 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-3 text-sm font-bold text-gray-900">
                        £{journalsData.journals.reduce((sum: number, j: any) => sum + j.credit, 0).toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="ml-2 text-sm font-medium text-green-800">
                    Journal entries balanced and ready to post
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  Post to Bookkeeping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'deferred' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Deferred Tax</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={journalsData.deferredTax.enabled}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Enable deferred tax calculations
                  </label>
                </div>

                {!journalsData.deferredTax.enabled ? (
                  <div className="text-center py-8">
                    <Layers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Deferred tax not enabled</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Enable above to calculate deferred tax provisions
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Deferred Tax Amount</label>
                      <input
                        type="number"
                        value={journalsData.deferredTax.amount}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JournalsPostBack

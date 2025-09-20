import React, { useState, useEffect } from 'react'
import { FileText, MessageSquare } from 'lucide-react'

const PostFilingEnquiries: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('statement')
  const [postFilingData, setPostFilingData] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setPostFilingData({
        statement: {
          balance: 9550,
          lastUpdated: '2024-01-15',
          payments: [
            { date: '2024-07-10', amount: 11250, type: 'QIP Q1', cleared: true },
            { date: '2024-10-12', amount: 11250, type: 'QIP Q2', cleared: true }
          ]
        },
        amendments: [],
        enquiries: []
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
        <h1 className="text-2xl font-bold text-gray-900">Post-Filing & Enquiries</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Refresh Statement
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Create Amendment
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'statement', label: 'Statement of Account' },
            { id: 'amendments', label: 'Amendments' },
            { id: 'enquiries', label: 'Enquiry Management' }
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

      {activeTab === 'statement' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Current Balance</h3>
              <span className="text-2xl font-bold text-red-600">£{postFilingData.statement.balance.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">Last updated: {postFilingData.statement.lastUpdated}</p>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {postFilingData.statement.payments.map((payment: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          £{payment.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            payment.cleared ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {payment.cleared ? 'Cleared' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'amendments' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Amendments</h3>
            </div>
            <div className="p-6">
              {postFilingData.amendments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No amendments filed</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Amendments will appear here when filed
                  </p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Create Amendment
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Amendments would be displayed here */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'enquiries' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">HMRC Enquiries</h3>
            </div>
            <div className="p-6">
              {postFilingData.enquiries.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No active enquiries</p>
                  <p className="text-sm text-gray-500 mt-2">
                    HMRC enquiries will appear here when received
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Enquiries would be displayed here */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostFilingEnquiries

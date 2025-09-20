import React, { useState, useEffect } from 'react'
import { CreditCard, Calendar, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react'

const PaymentsLiabilities: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('summary')
  const [paymentsData, setPaymentsData] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setPaymentsData({
        summary: {
          totalLiability: 43300,
          paidToDate: 22500,
          outstanding: 20800,
          nextDueDate: '2025-01-14',
          nextAmount: 11250
        },
        payments: [
          { date: '2024-07-10', amount: 11250, type: 'QIP Q1', reference: 'QIP240710001', status: 'Cleared' },
          { date: '2024-10-12', amount: 11250, type: 'QIP Q2', reference: 'QIP241012001', status: 'Cleared' },
          { date: '2025-01-14', amount: 11250, type: 'QIP Q3', reference: 'Pending', status: 'Due' },
          { date: '2025-04-14', amount: 9550, type: 'Balance', reference: 'Pending', status: 'Future' }
        ],
        interest: {
          accrued: 0,
          rate: 7.75
        },
        ttp: {
          active: false,
          arrangements: []
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        <h1 className="text-2xl font-bold text-gray-900">Payments & Liabilities</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Record Payment
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Request TTP
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'summary', label: 'Liability Summary' },
            { id: 'payments', label: 'Payments' },
            { id: 'interest', label: 'Interest/Penalties' },
            { id: 'ttp', label: 'Time to Pay' }
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

      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Liability</p>
                  <p className="text-2xl font-bold text-gray-900">£{paymentsData.summary.totalLiability.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Paid to Date</p>
                  <p className="text-2xl font-bold text-gray-900">£{paymentsData.summary.paidToDate.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Outstanding</p>
                  <p className="text-2xl font-bold text-gray-900">£{paymentsData.summary.outstanding.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Next Due</p>
                  <p className="text-lg font-bold text-gray-900">{paymentsData.summary.nextDueDate}</p>
                  <p className="text-sm text-gray-600">£{paymentsData.summary.nextAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Liability Timeline</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Corporation Tax Liability</span>
                  <span className="font-medium">£{paymentsData.summary.totalLiability.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">QIP Payments (Q1 & Q2)</span>
                  <span className="font-medium text-green-600">(£{paymentsData.summary.paidToDate.toLocaleString()})</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">QIP Q3 Due {paymentsData.summary.nextDueDate}</span>
                  <span className="font-medium text-orange-600">£{paymentsData.summary.nextAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 font-semibold">
                  <span className="text-gray-900">Remaining Balance</span>
                  <span className="text-red-600">£{(paymentsData.summary.outstanding - paymentsData.summary.nextAmount).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="space-y-6">
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
                        Reference
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentsData.payments.map((payment: any, index: number) => (
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.reference}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            payment.status === 'Cleared' ? 'bg-green-100 text-green-800' :
                            payment.status === 'Due' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {payment.status}
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

      {activeTab === 'interest' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Accrued Interest</p>
                  <p className="text-2xl font-bold text-gray-900">£{paymentsData.interest.accrued}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Interest Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{paymentsData.interest.rate}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Interest & Penalties</h3>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">No interest or penalties currently accrued</p>
                <p className="text-sm text-gray-500 mt-2">
                  All payments have been made on time
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ttp' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Time to Pay Arrangements</h3>
            </div>
            <div className="p-6">
              {!paymentsData.ttp.active ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No active Time to Pay arrangements</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Contact HMRC if you need to arrange a payment plan
                  </p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Request Time to Pay
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* TTP arrangements would be displayed here */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentsLiabilities

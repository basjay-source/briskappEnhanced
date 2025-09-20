import React, { useState, useEffect } from 'react'
import { Clock, Calculator, AlertTriangle, CheckCircle, Calendar } from 'lucide-react'

const QIPs: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('threshold')
  const [qipData, setQipData] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setQipData({
        threshold: {
          qualifies: true,
          ctLiability: 45000,
          threshold: 10000,
          reason: 'CT liability exceeds £10,000'
        },
        schedule: [
          { quarter: 'Q1', dueDate: '2024-07-14', amount: 11250, status: 'paid', paidDate: '2024-07-10' },
          { quarter: 'Q2', dueDate: '2024-10-14', amount: 11250, status: 'paid', paidDate: '2024-10-12' },
          { quarter: 'Q3', dueDate: '2025-01-14', amount: 11250, status: 'due', paidDate: null },
          { quarter: 'Q4', dueDate: '2025-04-14', amount: 11250, status: 'future', paidDate: null }
        ],
        interest: {
          overpayments: 0,
          underpayments: 0,
          rate: 7.75
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
        <h1 className="text-2xl font-bold text-gray-900">Quarterly Instalment Payments (QIPs)</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Calculate QIPs
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Generate Schedule
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'threshold', label: 'Threshold Test' },
            { id: 'schedule', label: 'Schedule' },
            { id: 'interest', label: 'Interest' }
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

      {activeTab === 'threshold' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${
              qipData.threshold.qualifies ? 'border-orange-500' : 'border-green-500'
            }`}>
              <div className="flex items-center">
                {qipData.threshold.qualifies ? (
                  <AlertTriangle className="w-8 h-8 text-orange-600" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                )}
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">QIP Status</p>
                  <p className="text-lg font-bold text-gray-900">
                    {qipData.threshold.qualifies ? 'Required' : 'Not Required'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Calculator className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">CT Liability</p>
                  <p className="text-2xl font-bold text-gray-900">£{qipData.threshold.ctLiability.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Threshold Test Details</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Corporation Tax Liability</span>
                  <span className="font-medium">£{qipData.threshold.ctLiability.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">QIP Threshold</span>
                  <span className="font-medium">£{qipData.threshold.threshold.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Exceeds Threshold</span>
                  <span className={`font-medium ${qipData.threshold.qualifies ? 'text-orange-600' : 'text-green-600'}`}>
                    {qipData.threshold.qualifies ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Reason:</strong> {qipData.threshold.reason}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">QIP Schedule</h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quarter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Paid Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {qipData.schedule.map((payment: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {payment.quarter}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          £{payment.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                            payment.status === 'due' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.paidDate || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Paid</p>
                  <p className="text-2xl font-bold text-gray-900">£22,500</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Due</p>
                  <p className="text-2xl font-bold text-gray-900">£11,250</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-gray-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Future</p>
                  <p className="text-2xl font-bold text-gray-900">£11,250</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'interest' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Interest Calculations</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Current Interest Rate</h4>
                  <div className="text-3xl font-bold text-blue-600">{qipData.interest.rate}%</div>
                  <p className="text-sm text-gray-500 mt-1">Per annum</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Interest Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overpayment Interest</span>
                      <span className="font-medium text-green-600">£{qipData.interest.overpayments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Underpayment Interest</span>
                      <span className="font-medium text-red-600">£{qipData.interest.underpayments}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Interest Calculation Rules</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Interest runs from the due date to the date of payment</li>
                  <li>• Overpayments earn interest at the same rate as underpayments</li>
                  <li>• Interest is calculated daily and compounded</li>
                  <li>• Interest rates are set by HMRC and can change quarterly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QIPs

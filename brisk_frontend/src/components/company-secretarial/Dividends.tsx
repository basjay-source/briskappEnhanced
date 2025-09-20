import React, { useState, useEffect } from 'react'

interface Dividend {
  id: string
  type: 'Interim' | 'Final'
  shareClass: string
  perShareAmount: number
  recordDate: string
  paymentDate: string
  totalAmount: number
  status: 'Draft' | 'Declared' | 'Paid'
}

interface DividendSchedule {
  shareholderName: string
  shareClass: string
  shares: number
  perShareAmount: number
  grossAmount: number
  taxCredit: number
  netAmount: number
}

const Dividends: React.FC = () => {
  const [activeTab, setActiveTab] = useState('interim-final')
  const [dividends, setDividends] = useState<Dividend[]>([])
  const [schedules, setSchedules] = useState<DividendSchedule[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'interim-final', label: 'Interim/Final', icon: '💰' },
    { id: 'schedules', label: 'Schedules', icon: '📊' },
    { id: 'vouchers', label: 'Vouchers', icon: '🧾' },
    { id: 'waivers', label: 'Waivers', icon: '📝' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setDividends([
        {
          id: '1',
          type: 'Interim',
          shareClass: 'Ordinary Shares',
          perShareAmount: 0.05,
          recordDate: '2024-01-15',
          paymentDate: '2024-01-31',
          totalAmount: 5000,
          status: 'Declared'
        },
        {
          id: '2',
          type: 'Final',
          shareClass: 'Ordinary Shares',
          perShareAmount: 0.10,
          recordDate: '2024-03-31',
          paymentDate: '2024-04-30',
          totalAmount: 10000,
          status: 'Draft'
        }
      ])

      setSchedules([
        {
          shareholderName: 'John Smith',
          shareClass: 'Ordinary Shares',
          shares: 60000,
          perShareAmount: 0.05,
          grossAmount: 3000,
          taxCredit: 333.33,
          netAmount: 2666.67
        },
        {
          shareholderName: 'Sarah Johnson',
          shareClass: 'Ordinary Shares',
          shares: 30000,
          perShareAmount: 0.05,
          grossAmount: 1500,
          taxCredit: 166.67,
          netAmount: 1333.33
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Declared': 'bg-blue-100 text-blue-800',
      'Paid': 'bg-green-100 text-green-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'interim-final':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Declare New Dividend</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dividend Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Interim Dividend</option>
                      <option>Final Dividend</option>
                      <option>Special Dividend</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Share Class</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Ordinary Shares</option>
                      <option>Preference Shares</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Per Share Amount (£)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Record Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Distributable Reserves Check</label>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="text-sm text-green-800">
                        <div>Available reserves: £250,000</div>
                        <div>Proposed dividend: £10,000</div>
                        <div className="font-medium">Sufficient reserves available ✓</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Board Resolution Required</label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-600">Generate board resolution</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Calculate Dividend
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Declare Dividend
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Dividend History</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Per Share</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dividends.map((dividend) => (
                    <tr key={dividend.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dividend.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dividend.shareClass}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        £{dividend.perShareAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        £{dividend.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(dividend.paymentDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(dividend.status)}`}>
                          {dividend.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-green-600 hover:text-green-900 mr-3">Vouchers</button>
                        <button className="text-gray-600 hover:text-gray-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'schedules':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Dividend Schedules</h3>
                <div className="flex space-x-3">
                  <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Interim Dividend - Jan 2024</option>
                    <option>Final Dividend - Apr 2024</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Export Schedule
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shareholder</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Per Share</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Credit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {schedules.map((schedule, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {schedule.shareholderName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {schedule.shareClass}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {schedule.shares.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          £{schedule.perShareAmount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          £{schedule.grossAmount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          £{schedule.taxCredit.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          £{schedule.netAmount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case 'vouchers':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Dividend Vouchers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Dividend</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Interim Dividend - Jan 2024</option>
                      <option>Final Dividend - Apr 2024</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Voucher Template</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Standard Dividend Voucher</option>
                      <option>Detailed Dividend Voucher</option>
                      <option>Custom Template</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Include Tax Certificate</label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-gray-600">Include dividend tax certificate</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-2">Voucher Preview</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Company: Acme Corporation Limited</div>
                      <div>Dividend Type: Interim</div>
                      <div>Payment Date: 31 January 2024</div>
                      <div>Per Share: £0.05</div>
                      <div>Tax Credit Rate: 8.75%</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Generate Vouchers
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Email to Shareholders
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'waivers':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dividend Waivers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shareholder</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>John Smith</option>
                      <option>Sarah Johnson</option>
                      <option>Investment Holdings Ltd</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dividend to Waive</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Interim Dividend - Jan 2024</option>
                      <option>Final Dividend - Apr 2024</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waiver Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Full waiver</option>
                      <option>Partial waiver</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waiver Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Waiver</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter reason for dividend waiver"
                    />
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg bg-blue-50">
                    <h4 className="font-medium text-blue-900 mb-2">Tax Implications</h4>
                    <div className="text-sm text-blue-800">
                      <div>• Waived dividends may still be taxable</div>
                      <div>• Consider timing of waiver vs declaration</div>
                      <div>• Consult tax advisor for complex situations</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Record Waiver
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Generate Waiver Letter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <div>Content not found</div>
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dividends</h1>
          <p className="text-gray-600">Manage dividend declarations, schedules, vouchers and waivers</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Quick Dividend
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Export All
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {renderTabContent()}
    </div>
  )
}

export default Dividends

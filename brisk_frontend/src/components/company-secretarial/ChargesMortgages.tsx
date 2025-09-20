import React, { useState, useEffect } from 'react'

interface Charge {
  id: string
  lender: string
  chargeType: 'Fixed' | 'Floating' | 'Fixed & Floating'
  assetsCharged: string
  amount: number
  currency: string
  instrumentDate: string
  filingDate?: string
  satisfactionDate?: string
  status: 'Active' | 'Satisfied' | 'Released' | 'Pending'
  mrReference: string
}

const ChargesMortgages: React.FC = () => {
  const [activeTab, setActiveTab] = useState('create-charge')
  const [charges, setCharges] = useState<Charge[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'create-charge', label: 'Create Charge', icon: '➕' },
    { id: 'satisfy-release', label: 'Satisfy/Release', icon: '✅' },
    { id: 'register', label: 'Register', icon: '📋' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setCharges([
        {
          id: '1',
          lender: 'HSBC Bank plc',
          chargeType: 'Fixed & Floating',
          assetsCharged: 'All assets of the company',
          amount: 500000,
          currency: 'GBP',
          instrumentDate: '2021-06-15',
          filingDate: '2021-06-20',
          status: 'Active',
          mrReference: 'MR01-001'
        },
        {
          id: '2',
          lender: 'Barclays Bank PLC',
          chargeType: 'Fixed',
          assetsCharged: 'Freehold property at 123 Business Street',
          amount: 250000,
          currency: 'GBP',
          instrumentDate: '2022-03-10',
          filingDate: '2022-03-15',
          satisfactionDate: '2023-12-01',
          status: 'Satisfied',
          mrReference: 'MR01-002'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Satisfied': 'bg-blue-100 text-blue-800',
      'Released': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'create-charge':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Charge</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lender/Chargee</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter lender name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Charge Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Fixed Charge</option>
                      <option>Floating Charge</option>
                      <option>Fixed &amp; Floating Charge</option>
                      <option>Debenture</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount Secured</label>
                    <div className="flex space-x-2">
                      <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>GBP</option>
                        <option>USD</option>
                        <option>EUR</option>
                      </select>
                      <input
                        type="number"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instrument Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assets Charged</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe the assets subject to the charge"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Charge Document</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-gray-400 mb-2">📄</div>
                        <div className="text-sm text-gray-600">
                          <button className="text-blue-600 hover:text-blue-800">Upload charge document</button>
                          <span> or drag and drop</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Create Charge
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Generate MR01
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="text-blue-400">ℹ️</div>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Filing Requirements</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Charges must be filed within 21 days of creation</li>
                      <li>MR01 form required for registration at Companies House</li>
                      <li>Late filing may result in the charge being void against liquidators and creditors</li>
                      <li>Filing fee: £13 (online) or £40 (paper)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'satisfy-release':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Satisfy/Release Charge</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Charge</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>HSBC Bank plc - MR01-001 (Active)</option>
                      <option>Barclays Bank PLC - MR01-002 (Satisfied)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Full Satisfaction</option>
                      <option>Partial Release</option>
                      <option>Release of Property</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Satisfaction Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consideration Paid</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Amount paid to satisfy charge"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Satisfaction Details</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Details of satisfaction or release"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Documents</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-gray-400 mb-2">📄</div>
                        <div className="text-sm text-gray-600">
                          <button className="text-blue-600 hover:text-blue-800">Upload documents</button>
                          <span> or drag and drop</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Satisfaction letter, receipts, etc.</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Record Satisfaction
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      File MR04/MR05
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'register':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Charges Register</h3>
                  <div className="flex space-x-3">
                    <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All charges</option>
                      <option>Active only</option>
                      <option>Satisfied only</option>
                    </select>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Export Register
                    </button>
                  </div>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assets</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {charges.map((charge) => (
                    <tr key={charge.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{charge.lender}</div>
                        <div className="text-sm text-gray-500">{charge.mrReference}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {charge.chargeType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {charge.currency} {charge.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {charge.assetsCharged}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>Created: {new Date(charge.instrumentDate).toLocaleDateString()}</div>
                        {charge.filingDate && (
                          <div>Filed: {new Date(charge.filingDate).toLocaleDateString()}</div>
                        )}
                        {charge.satisfactionDate && (
                          <div>Satisfied: {new Date(charge.satisfactionDate).toLocaleDateString()}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(charge.status)}`}>
                          {charge.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                        {charge.status === 'Active' && (
                          <button className="text-red-600 hover:text-red-900">Satisfy</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Register Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <div className="text-sm text-blue-800">Total Charges</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">1</div>
                  <div className="text-sm text-green-800">Active Charges</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">1</div>
                  <div className="text-sm text-gray-800">Satisfied Charges</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">£750K</div>
                  <div className="text-sm text-orange-800">Total Secured</div>
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
          <h1 className="text-2xl font-bold text-gray-900">Charges &amp; Mortgages</h1>
          <p className="text-gray-600">Record charges, manage satisfaction and maintain charges register</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Quick Charge
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Export Register
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

export default ChargesMortgages

import React, { useState, useEffect } from 'react'


const Registers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('members')
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'members', label: 'Members', icon: '👥' },
    { id: 'allotments-transfers', label: 'Allotments &amp; Transfers', icon: '📈' },
    { id: 'directors', label: 'Directors', icon: '👤' },
    { id: 'secretaries', label: 'Secretaries', icon: '📝' },
    { id: 'psc', label: 'PSC', icon: '🏢' },
    { id: 'charges', label: 'Charges', icon: '🏦' },
    { id: 'debentures', label: 'Debenture Holders (optional)', icon: '📋' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])


  const renderTabContent = () => {
    switch (activeTab) {
      case 'members':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Members Register</h3>
                <div className="flex space-x-3">
                  <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>As at: Current</option>
                    <option>As at: 31 Dec 2023</option>
                    <option>As at: 30 Jun 2023</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Export Register
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares Held</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate No.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        John Smith
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        456 Home Road, London, SW1A 1AA
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Ordinary Shares
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        60,000
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        15 Mar 2020
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        001, 003
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-green-600 hover:text-green-900">View</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Sarah Johnson
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        789 Garden Lane, London, N1 1BB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Ordinary Shares
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        30,000
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        15 Mar 2020
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        002
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-green-600 hover:text-green-900">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case 'allotments-transfers':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Allotments &amp; Transfers Register</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consideration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15 Mar 2020</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Allotment</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Smith</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ordinary</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">60,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£600</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">001</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">01 Jun 2021</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Transfer</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Investment Holdings Ltd</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ordinary</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£15,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">004</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case 'directors':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Directors Register</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resignation Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nationality</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        John Smith
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        123 Business Street, London, EC1A 1BB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        15 Mar 2020
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        -
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        British
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Company Director
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Sarah Johnson
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        123 Business Street, London, EC1A 1BB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        01 Jun 2021
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        -
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        British
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Finance Director
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label} Register
            </h3>
            <p className="text-gray-600">
              Comprehensive register for {tabs.find(tab => tab.id === activeTab)?.label} will be displayed here.
            </p>
            <div className="mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Export Register
              </button>
            </div>
          </div>
        )
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
          <h1 className="text-2xl font-bold text-gray-900">Registers (Statutory)</h1>
          <p className="text-gray-600">Maintain statutory registers with as-at snapshots and audit trail</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Bulk Export
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Archive Snapshot
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
              <span dangerouslySetInnerHTML={{ __html: tab.label }}></span>
            </button>
          ))}
        </nav>
      </div>

      {renderTabContent()}
    </div>
  )
}

export default Registers

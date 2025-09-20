import React, { useState, useEffect } from 'react'

interface Officer {
  id: string
  name: string
  type: 'Director' | 'Secretary'
  appointmentDate: string
  nationality: string
  occupation: string
  serviceAddress: string
  residentialAddress: string
  status: 'Active' | 'Resigned'
}

interface PSC {
  id: string
  name: string
  type: 'Individual' | 'Corporate'
  natureOfControl: string[]
  notificationDate: string
  address: string
  dateOfBirth?: string
  status: 'Active' | 'Ceased'
}

const OfficersPSC: React.FC = () => {
  const [activeTab, setActiveTab] = useState('directors')
  const [officers, setOfficers] = useState<Officer[]>([])
  const [pscs, setPSCs] = useState<PSC[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'directors', label: 'Directors', icon: '👤' },
    { id: 'secretaries', label: 'Secretaries', icon: '📝' },
    { id: 'psc-register', label: 'PSC Register', icon: '👥' },
    { id: 'psc-statements', label: 'PSC Statements', icon: '📋' },
    { id: 'dtr-notices', label: 'DTR/Notices', icon: '📨' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setOfficers([
        {
          id: '1',
          name: 'John Smith',
          type: 'Director',
          appointmentDate: '2020-03-15',
          nationality: 'British',
          occupation: 'Company Director',
          serviceAddress: '123 Business Street, London, EC1A 1BB',
          residentialAddress: '456 Home Road, London, SW1A 1AA',
          status: 'Active'
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          type: 'Director',
          appointmentDate: '2021-06-01',
          nationality: 'British',
          occupation: 'Finance Director',
          serviceAddress: '123 Business Street, London, EC1A 1BB',
          residentialAddress: '789 Garden Lane, London, N1 1BB',
          status: 'Active'
        },
        {
          id: '3',
          name: 'Corporate Secretaries Ltd',
          type: 'Secretary',
          appointmentDate: '2020-03-15',
          nationality: 'N/A',
          occupation: 'Corporate Secretary',
          serviceAddress: '321 Secretary House, London, EC2A 2BB',
          residentialAddress: 'N/A',
          status: 'Active'
        }
      ])

      setPSCs([
        {
          id: '1',
          name: 'John Smith',
          type: 'Individual',
          natureOfControl: ['More than 25% but not more than 50% of shares', 'More than 25% but not more than 50% of voting rights'],
          notificationDate: '2020-03-15',
          address: '456 Home Road, London, SW1A 1AA',
          dateOfBirth: '1975-08-12',
          status: 'Active'
        },
        {
          id: '2',
          name: 'Investment Holdings Ltd',
          type: 'Corporate',
          natureOfControl: ['More than 50% but less than 75% of shares'],
          notificationDate: '2021-01-10',
          address: '789 Corporate Plaza, London, EC3A 3BB',
          status: 'Active'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Resigned': 'bg-red-100 text-red-800',
      'Ceased': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'directors':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Directors</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Appoint Director
                </button>
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {officers.filter(o => o.type === 'Director').map((officer) => (
                  <tr key={officer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{officer.name}</div>
                        <div className="text-sm text-gray-500">{officer.occupation}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(officer.appointmentDate).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">{officer.nationality}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">Service: {officer.serviceAddress}</div>
                      <div className="text-sm text-gray-500">Residential: {officer.residentialAddress}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(officer.status)}`}>
                        {officer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-green-600 hover:text-green-900 mr-3">File AP01</button>
                      <button className="text-red-600 hover:text-red-900">Resign</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case 'secretaries':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Company Secretaries</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Appoint Secretary
                </button>
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {officers.filter(o => o.type === 'Secretary').map((officer) => (
                  <tr key={officer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{officer.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(officer.appointmentDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{officer.serviceAddress}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(officer.status)}`}>
                        {officer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-green-600 hover:text-green-900 mr-3">File AP03</button>
                      <button className="text-red-600 hover:text-red-900">Resign</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case 'psc-register':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">PSC Register</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Add PSC
                </button>
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nature of Control</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notification Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pscs.map((psc) => (
                  <tr key={psc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{psc.name}</div>
                        <div className="text-sm text-gray-500">{psc.address}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{psc.type}</div>
                      {psc.dateOfBirth && (
                        <div className="text-sm text-gray-500">DOB: {new Date(psc.dateOfBirth).toLocaleDateString()}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {psc.natureOfControl.map((control, index) => (
                          <div key={index} className="mb-1">{control}</div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(psc.notificationDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(psc.status)}`}>
                        {psc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-green-600 hover:text-green-900 mr-3">File PSC01</button>
                      <button className="text-red-600 hover:text-red-900">Cease</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case 'psc-statements':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">PSC Statements &amp; Investigation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Statement Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>No PSC statement</option>
                      <option>Investigation ongoing</option>
                      <option>Restrictions notice issued</option>
                      <option>No investigation required</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Statement Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Record Statement
                  </button>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Recent Statements</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm font-medium">No investigation required</div>
                      <div className="text-xs text-gray-500">Recorded: 15 Jan 2024</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm font-medium">Investigation ongoing</div>
                      <div className="text-xs text-gray-500">Recorded: 10 Dec 2023</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'dtr-notices':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Disclosure and Transparency Rules (DTR) Notices</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notice Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>DTR5 Notice</option>
                      <option>Investigation Notice</option>
                      <option>Warning Notice</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
                    <input
                      type="text"
                      placeholder="Enter recipient name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notice Details</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter notice details and requirements"
                  />
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Send Notice
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                    Save Draft
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Notice History</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Due</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">DTR5 Notice</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Smith</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10 Jan 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">24 Jan 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900">Follow Up</button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
          <h1 className="text-2xl font-bold text-gray-900">Officers &amp; PSC</h1>
          <p className="text-gray-600">Manage directors, secretaries, and persons with significant control</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Bulk Import
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

export default OfficersPSC

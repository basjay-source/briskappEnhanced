import React, { useState, useEffect } from 'react'

interface Document {
  id: string
  name: string
  type: string
  category: 'Minute Book' | 'Certificates' | 'Filings Evidence' | 'Valuations' | 'Agreements'
  uploadDate: string
  size: string
  status: 'Active' | 'Archived' | 'Pending'
  version: string
}

const DocumentHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('minute-book')
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'minute-book', label: 'Minute Book', icon: '📖' },
    { id: 'certificates', label: 'Certificates', icon: '📜' },
    { id: 'filings-evidence', label: 'Filings Evidence', icon: '🏛️' },
    { id: 'valuations', label: 'Valuations', icon: '💰' },
    { id: 'agreements', label: 'Agreements', icon: '📝' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setDocuments([
        {
          id: '1',
          name: 'Board Meeting Minutes - January 2024',
          type: 'PDF',
          category: 'Minute Book',
          uploadDate: '2024-01-15',
          size: '2.3 MB',
          status: 'Active',
          version: '1.0'
        },
        {
          id: '2',
          name: 'Share Certificate 001 - John Smith',
          type: 'PDF',
          category: 'Certificates',
          uploadDate: '2024-01-10',
          size: '156 KB',
          status: 'Active',
          version: '1.0'
        },
        {
          id: '3',
          name: 'CS01 Filing Acknowledgement',
          type: 'PDF',
          category: 'Filings Evidence',
          uploadDate: '2024-01-20',
          size: '234 KB',
          status: 'Active',
          version: '1.0'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Archived': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'minute-book':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Corporate Minute Book</h3>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Upload Minutes
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Generate Minute
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Board Meeting</option>
                      <option>General Meeting</option>
                      <option>AGM</option>
                      <option>EGM</option>
                      <option>Committee Meeting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <div className="text-gray-400 mb-2">📄</div>
                        <div className="text-sm text-gray-600">
                          <button className="text-blue-600 hover:text-blue-800">Click to upload</button>
                          <span> or drag and drop</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Minute Book Structure</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>• Board Meeting Minutes</div>
                      <div>• General Meeting Minutes</div>
                      <div>• Written Resolutions</div>
                      <div>• Meeting Notices</div>
                      <div>• Attendance Records</div>
                      <div>• Supporting Documents</div>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Document Features</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div>• E-signature integration</div>
                      <div>• Version control</div>
                      <div>• Audit trail</div>
                      <div>• Automatic indexing</div>
                      <div>• Search functionality</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Minutes</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Search minutes..."
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All meetings</option>
                      <option>Board meetings</option>
                      <option>General meetings</option>
                    </select>
                  </div>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.filter(doc => doc.category === 'Minute Book').map((document) => (
                    <tr key={document.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="text-blue-600 mr-3">📄</div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{document.name}</div>
                            <div className="text-sm text-gray-500">Version {document.version}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {document.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {document.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(document.status)}`}>
                          {document.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-green-600 hover:text-green-900 mr-3">Download</button>
                        <button className="text-gray-600 hover:text-gray-900">Archive</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'certificates':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibent text-gray-900 mb-4">Certificate Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Share Certificate</option>
                      <option>Director Appointment</option>
                      <option>Secretary Appointment</option>
                      <option>Good Standing Certificate</option>
                      <option>Incorporation Certificate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>John Smith</option>
                      <option>Sarah Johnson</option>
                      <option>Investment Holdings Ltd</option>
                    </select>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Generate Certificate
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Bulk Generate
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">Certificate Features</h4>
                    <div className="text-sm text-purple-700 space-y-1">
                      <div>• Professional templates</div>
                      <div>• Security watermarks</div>
                      <div>• Digital signatures</div>
                      <div>• Automatic numbering</div>
                      <div>• Version tracking</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Archive</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">Share Certificates</h4>
                    <span className="text-sm text-blue-600">15 issued</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <div>Last issued: 15 Jan 2024</div>
                    <div>Next number: 016</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">View All</button>
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">Generate</button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">Officer Certificates</h4>
                    <span className="text-sm text-blue-600">8 issued</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <div>Last issued: 10 Jan 2024</div>
                    <div>Active officers: 3</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">View All</button>
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">Generate</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'filings-evidence':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filing Evidence Storage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filing Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Confirmation Statement</option>
                      <option>Officer Appointment</option>
                      <option>PSC Filing</option>
                      <option>Share Allotment</option>
                      <option>Charge Registration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Filing Acknowledgement</option>
                      <option>Rejection Notice</option>
                      <option>Correction Request</option>
                      <option>Companies House Email</option>
                    </select>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Upload Evidence
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      View Archive
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Filing Evidence Requirements</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div>• Keep acknowledgements for 6 years</div>
                      <div>• Store rejection notices</div>
                      <div>• Maintain correspondence</div>
                      <div>• Document corrections</div>
                      <div>• Track filing dates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'valuations':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Valuation Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Valuation Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Share Valuation</option>
                      <option>EMI Valuation</option>
                      <option>CSOP Valuation</option>
                      <option>Asset Valuation</option>
                      <option>Business Valuation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Valuation Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Valuer</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter valuer name"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Upload Valuation
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Request Valuation
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">Valuation Requirements</h4>
                    <div className="text-sm text-orange-700 space-y-1">
                      <div>• HMRC approved valuers for EMI</div>
                      <div>• Annual valuations for options</div>
                      <div>• Independent valuations</div>
                      <div>• Supporting documentation</div>
                      <div>• Methodology disclosure</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'agreements':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Agreements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agreement Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Shareholders Agreement</option>
                      <option>Service Agreement</option>
                      <option>Option Agreement</option>
                      <option>Loan Agreement</option>
                      <option>Charge Agreement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parties</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter parties to agreement"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Execution Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Upload Agreement
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Generate Template
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Agreement Management</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>• Version control</div>
                      <div>• E-signature integration</div>
                      <div>• Renewal reminders</div>
                      <div>• Amendment tracking</div>
                      <div>• Compliance monitoring</div>
                    </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Document Hub</h1>
          <p className="text-gray-600">Manage corporate documents, certificates and legal agreements</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Quick Upload
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Document Search
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

export default DocumentHub

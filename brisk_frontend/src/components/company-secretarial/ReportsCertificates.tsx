import React, { useState, useEffect } from 'react'

interface Report {
  id: string
  type: string
  name: string
  description: string
  lastGenerated: string
  format: 'PDF' | 'Excel' | 'Word'
  status: 'Available' | 'Generating' | 'Error'
}

const ReportsCertificates: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cap-table')
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'cap-table', label: 'Cap Table (as-at)', icon: '📊' },
    { id: 'ownership', label: 'Ownership %', icon: '📈' },
    { id: 'options-register', label: 'Options Register', icon: '📋' },
    { id: 'dividend-register', label: 'Dividend Register', icon: '💰' },
    { id: 'officers-psc', label: 'Officers/PSC Listing', icon: '👥' },
    { id: 'certificates', label: 'Certificates (Share/Officer/Good Standing pack)', icon: '📜' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setReports([
        {
          id: '1',
          type: 'Cap Table',
          name: 'Capitalization Table as at 31 Dec 2023',
          description: 'Complete shareholding analysis with percentages',
          lastGenerated: '2024-01-15',
          format: 'PDF',
          status: 'Available'
        },
        {
          id: '2',
          type: 'Share Certificate',
          name: 'Share Certificate - John Smith',
          description: '60,000 Ordinary Shares - Certificate 001',
          lastGenerated: '2024-01-10',
          format: 'PDF',
          status: 'Available'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Available': 'bg-green-100 text-green-800',
      'Generating': 'bg-blue-100 text-blue-800',
      'Error': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'cap-table':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Cap Table Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">As at Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="2024-01-31"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Format</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Detailed Cap Table (PDF)</option>
                      <option>Summary Cap Table (PDF)</option>
                      <option>Investor Format (Excel)</option>
                      <option>FD/FD-1 Style (Excel)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Include Options</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Outstanding options</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Fully diluted basis</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Cap Table Preview</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>• Total Shares: 100,000</div>
                      <div>• Shareholders: 3</div>
                      <div>• Share Classes: 2</div>
                      <div>• Outstanding Options: 15,000</div>
                      <div>• Last Updated: 15 Jan 2024</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Generate Report
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Schedule Regular
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Cap Table Summary</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shareholder</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voting %</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Smith</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ordinary</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">60,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">60.0%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">60.0%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sarah Johnson</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ordinary</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">30,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">30.0%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">30.0%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Investment Holdings Ltd</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ordinary</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10.0%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case 'ownership':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ownership Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Current Ownership</option>
                      <option>Historical Comparison</option>
                      <option>Dilution Analysis</option>
                      <option>Voting Control Analysis</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="From"
                      />
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="To"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Include</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Beneficial ownership</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Nominee holdings</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Trust arrangements</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Ownership Summary</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div>• Majority Shareholder: John Smith (60%)</div>
                      <div>• Significant Control: 1 person</div>
                      <div>• PSC Threshold: Met</div>
                      <div>• Voting Control: Concentrated</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Generate Analysis
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Export Chart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'options-register':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Options Register Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scheme</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Schemes</option>
                      <option>EMI Scheme 2021</option>
                      <option>CSOP Scheme 2022</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status Filter</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Options</option>
                      <option>Outstanding Only</option>
                      <option>Vested Only</option>
                      <option>Exercised Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Format</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Detailed Register (PDF)</option>
                      <option>Summary Report (PDF)</option>
                      <option>Excel Spreadsheet</option>
                      <option>ERS Format</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">Options Summary</h4>
                    <div className="text-sm text-purple-700 space-y-1">
                      <div>• Total Granted: 15,000</div>
                      <div>• Outstanding: 10,000</div>
                      <div>• Vested: 10,000</div>
                      <div>• Exercised: 5,000</div>
                      <div>• Lapsed: 0</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Generate Register
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'dividend-register':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dividend Register Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Current Year</option>
                      <option>Previous Year</option>
                      <option>Last 3 Years</option>
                      <option>All Time</option>
                      <option>Custom Period</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dividend Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Dividends</option>
                      <option>Interim Only</option>
                      <option>Final Only</option>
                      <option>Special Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Include</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Tax credit details</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Shareholder schedules</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Waiver details</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Dividend Summary</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div>• Total Distributed: £15,000</div>
                      <div>• Payments Made: 2</div>
                      <div>• Average Per Share: £0.075</div>
                      <div>• Tax Credits: £1,667</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Generate Register
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Export Schedules
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'officers-psc':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Officers &amp; PSC Listing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Current Officers &amp; PSC</option>
                      <option>Officers Only</option>
                      <option>PSC Only</option>
                      <option>Historical Changes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Include Details</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Service addresses</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Residential addresses</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Appointment dates</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Nature of control</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Current Summary</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>• Directors: 2</div>
                      <div>• Secretaries: 1</div>
                      <div>• PSCs: 2</div>
                      <div>• Last Updated: 15 Jan 2024</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Generate Listing
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'certificates':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Certificates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Share Certificates</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shareholder</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Shareholders</option>
                      <option>John Smith</option>
                      <option>Sarah Johnson</option>
                      <option>Investment Holdings Ltd</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>New Certificate</option>
                      <option>Replacement Certificate</option>
                      <option>Consolidated Certificate</option>
                    </select>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Generate Share Certificate
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Officer Certificates</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Officer</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>John Smith (Director)</option>
                      <option>Sarah Johnson (Director)</option>
                      <option>Corporate Secretaries Ltd</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Appointment Letter</option>
                      <option>Incumbency Certificate</option>
                      <option>Authority Certificate</option>
                    </select>
                  </div>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Generate Officer Certificate
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Good Standing Pack</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Include</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Certificate of Incorporation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Certificate of Good Standing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Current Officers List</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Articles of Association</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Latest Accounts</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                    Generate Good Standing Pack
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Standard Share Certificate</h4>
                  <p className="text-sm text-gray-600 mb-3">Traditional format with company seal</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Preview</button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">Edit</button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Modern Share Certificate</h4>
                  <p className="text-sm text-gray-600 mb-3">Contemporary design with security features</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Preview</button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">Edit</button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Director Appointment Letter</h4>
                  <p className="text-sm text-gray-600 mb-3">Formal appointment confirmation</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Preview</button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">Edit</button>
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
          <h1 className="text-2xl font-bold text-gray-900">Reports &amp; Certificates</h1>
          <p className="text-gray-600">Generate reports, certificates and good standing packs</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Quick Certificate
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Bulk Generate
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

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports &amp; Certificates</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {report.type}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{report.name}</div>
                  <div className="text-sm text-gray-500">{report.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(report.lastGenerated).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.format}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Download</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Regenerate</button>
                  <button className="text-gray-600 hover:text-gray-900">Share</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReportsCertificates

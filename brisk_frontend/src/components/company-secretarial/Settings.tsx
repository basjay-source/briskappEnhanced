import React, { useState, useEffect } from 'react'

interface Template {
  id: string
  name: string
  type: string
  category: string
  lastModified: string
  status: 'Active' | 'Draft' | 'Archived'
}

interface ShareClass {
  id: string
  name: string
  nominal: string
  currency: string
  rights: string[]
  dividendRate?: string
  redeemable: boolean
  convertible: boolean
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('templates')
  const [templates, setTemplates] = useState<Template[]>([])
  const [shareClasses, setShareClasses] = useState<ShareClass[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'templates', label: 'Templates & Precedents', icon: '📋' },
    { id: 'numbering', label: 'Numbering', icon: '🔢' },
    { id: 'share-classes', label: 'Share Class Catalog', icon: '📊' },
    { id: 'permissions', label: 'Permissions', icon: '🔐' },
    { id: 'jurisdictions', label: 'Jurisdiction Profiles', icon: '🌍' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setTemplates([
        {
          id: '1',
          name: 'Board Resolution - Share Allotment',
          type: 'Board Resolution',
          category: 'Resolutions',
          lastModified: '2024-01-15',
          status: 'Active'
        },
        {
          id: '2',
          name: 'Shareholder Resolution - Name Change',
          type: 'Shareholder Resolution',
          category: 'Resolutions',
          lastModified: '2024-01-10',
          status: 'Active'
        },
        {
          id: '3',
          name: 'Share Certificate Template',
          type: 'Certificate',
          category: 'Certificates',
          lastModified: '2024-01-08',
          status: 'Active'
        }
      ])

      setShareClasses([
        {
          id: '1',
          name: 'Ordinary',
          nominal: '0.01',
          currency: 'GBP',
          rights: ['Voting', 'Dividend', 'Capital'],
          redeemable: false,
          convertible: false
        },
        {
          id: '2',
          name: 'Preference A',
          nominal: '1.00',
          currency: 'GBP',
          rights: ['Dividend', 'Capital'],
          dividendRate: '5.0% Fixed',
          redeemable: true,
          convertible: false
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Archived': 'bg-gray-100 text-gray-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'templates':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Template</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter template name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Board Resolution</option>
                      <option>Shareholder Resolution</option>
                      <option>Written Resolution</option>
                      <option>Meeting Notice</option>
                      <option>Share Certificate</option>
                      <option>Officer Certificate</option>
                      <option>Dividend Voucher</option>
                      <option>Letter Template</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Resolutions</option>
                      <option>Certificates</option>
                      <option>Notices</option>
                      <option>Letters</option>
                      <option>Forms</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Content</label>
                    <textarea
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter template content with variables like {{company_name}}, {{date}}, etc."
                    />
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Available Variables</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>• {`{{company_name}}`} - Company name</div>
                      <div>• {`{{company_number}}`} - Company registration number</div>
                      <div>• {`{{date}}`} - Current date</div>
                      <div>• {`{{registered_office}}`} - Registered office address</div>
                      <div>• {`{{director_name}}`} - Director name</div>
                      <div>• {`{{share_class}}`} - Share class</div>
                      <div>• {`{{nominal_value}}`} - Nominal value</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Save Template
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Existing Templates</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Search templates..."
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All categories</option>
                      <option>Resolutions</option>
                      <option>Certificates</option>
                      <option>Notices</option>
                    </select>
                  </div>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {templates.map((template) => (
                    <tr key={template.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {template.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {template.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {template.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(template.lastModified).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(template.status)}`}>
                          {template.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-green-600 hover:text-green-900 mr-3">Preview</button>
                        <button className="text-gray-600 hover:text-gray-900">Duplicate</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'numbering':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Numbering Sequences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3">Share Certificates</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-20">Prefix:</span>
                        <input type="text" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="SC" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-20">Next No:</span>
                        <input type="number" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="016" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-20">Format:</span>
                        <span className="text-sm text-gray-600">SC001, SC002, SC003...</span>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3">Board Minutes</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-20">Prefix:</span>
                        <input type="text" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="BM" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-20">Next No:</span>
                        <input type="number" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="024" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-20">Format:</span>
                        <span className="text-sm text-gray-600">BM2024-001, BM2024-002...</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3">General Meeting Minutes</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-20">Prefix:</span>
                        <input type="text" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="GM" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-20">Next No:</span>
                        <input type="number" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="003" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-20">Format:</span>
                        <span className="text-sm text-gray-600">GM2024-001, GM2024-002...</span>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3">Written Resolutions</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-20">Prefix:</span>
                        <input type="text" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="WR" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-20">Next No:</span>
                        <input type="number" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="008" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-20">Format:</span>
                        <span className="text-sm text-gray-600">WR2024-001, WR2024-002...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        )
      case 'share-classes':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Class Catalog</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Ordinary, Preference A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nominal Value</label>
                    <div className="flex space-x-2">
                      <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>GBP</option>
                        <option>USD</option>
                        <option>EUR</option>
                      </select>
                      <input
                        type="number"
                        step="0.01"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.01"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rights</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Voting rights</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Dividend rights</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Capital distribution rights</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Pre-emption rights</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dividend Rate</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        step="0.01"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="5.00"
                      />
                      <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>% Fixed</option>
                        <option>% Cumulative</option>
                        <option>Participating</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Redemption</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Redeemable</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Convertible</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Add Share Class
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Import Template
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Existing Share Classes</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nominal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rights</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dividend</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shareClasses.map((shareClass) => (
                    <tr key={shareClass.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {shareClass.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shareClass.currency} {shareClass.nominal}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shareClass.rights.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shareClass.dividendRate || 'Participating'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-gray-600 hover:text-gray-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'permissions':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>CoSec Clerk</option>
                      <option>CoSec Manager</option>
                      <option>Partner</option>
                      <option>Client (Portal)</option>
                      <option>Read-only (Audit/AP)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">View company profile</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Edit registers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Submit filings</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Issue certificates</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Approve transactions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Manage templates</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Access audit logs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Permission Guidelines</h4>
                    <div className="text-sm text-yellow-700 space-y-1">
                      <div>• CoSec Clerk: Prepare documents, edit registers</div>
                      <div>• CoSec Manager: Approve &amp; submit filings</div>
                      <div>• Partner: Final approvals, special transactions</div>
                      <div>• Client: View cap table, upload docs, e-sign</div>
                      <div>• Audit: Read-only access, export data</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Save Permissions
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                      Reset to Default
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'jurisdictions':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Jurisdiction Profiles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jurisdiction</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>United Kingdom</option>
                      <option>Ireland</option>
                      <option>Jersey</option>
                      <option>Guernsey</option>
                      <option>Isle of Man</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>GBP - British Pound</option>
                      <option>EUR - Euro</option>
                      <option>USD - US Dollar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filing Authority</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value="Companies House"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Annual Return Due</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Anniversary of incorporation</option>
                      <option>Fixed date (31 December)</option>
                      <option>Fixed date (31 March)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">UK Specific Settings</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div>• Confirmation Statement (CS01)</div>
                      <div>• PSC Register requirements</div>
                      <div>• Model Articles available</div>
                      <div>• Electronic filing mandatory</div>
                      <div>• SAIL register option</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Form Codes</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-32">Incorporation:</span>
                        <input type="text" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="IN01" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-32">Annual Return:</span>
                        <input type="text" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="CS01" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-32">Officer Change:</span>
                        <input type="text" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="AP01/TM01" />
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Save Profile
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Add Jurisdiction
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Configured Jurisdictions</h3>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurisdiction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filing Authority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Return</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      United Kingdom
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      GBP
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Companies House
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Anniversary
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-gray-600 hover:text-gray-900">Configure</button>
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
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure templates, numbering, permissions and jurisdiction settings</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export Settings
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Import Settings
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

export default Settings

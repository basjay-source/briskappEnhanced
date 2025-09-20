import React, { useState, useEffect } from 'react'

interface CompanyDetails {
  name: string
  number: string
  registeredOffice: string
  sicCodes: string[]
  ard: string
  incorporationDate: string
  jurisdiction: string
  status: string
}

interface ShareClass {
  id: string
  name: string
  currency: string
  nominal: number
  rights: string
  issued: number
  authorized: number
}

const CompanyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('details')
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null)
  const [shareClasses, setShareClasses] = useState<ShareClass[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'details', label: 'Registered Details', icon: '🏢' },
    { id: 'sic-ard', label: 'SIC & ARD', icon: '📊' },
    { id: 'articles', label: 'Articles & Share Classes', icon: '📋' },
    { id: 'registers', label: 'Registers Location', icon: '📍' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setCompanyDetails({
        name: 'Acme Corporation Limited',
        number: '12345678',
        registeredOffice: '123 Business Street, London, EC1A 1BB',
        sicCodes: ['62020', '70229'],
        ard: '31 December',
        incorporationDate: '15 March 2020',
        jurisdiction: 'England & Wales',
        status: 'Active'
      })

      setShareClasses([
        {
          id: '1',
          name: 'Ordinary Shares',
          currency: 'GBP',
          nominal: 0.01,
          rights: 'Full voting, dividend, capital',
          issued: 100000,
          authorized: 1000000
        },
        {
          id: '2',
          name: 'Preference Shares',
          currency: 'GBP',
          nominal: 1.00,
          rights: 'Fixed dividend 5%, no voting',
          issued: 0,
          authorized: 50000
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={companyDetails?.name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Number</label>
                  <input
                    type="text"
                    value={companyDetails?.number || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registered Office</label>
                  <textarea
                    value={companyDetails?.registeredOffice || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Incorporation Date</label>
                  <input
                    type="text"
                    value={companyDetails?.incorporationDate || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jurisdiction</label>
                  <input
                    type="text"
                    value={companyDetails?.jurisdiction || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Update Details
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  File AD01 (Address Change)
                </button>
              </div>
            </div>
          </div>
        )
      case 'sic-ard':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SIC Codes &amp; Accounting Reference Date</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SIC Codes</label>
                  <div className="space-y-2">
                    {companyDetails?.sicCodes?.map((code, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={code}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="px-3 py-2 text-red-600 hover:text-red-800">Remove</button>
                      </div>
                    ))}
                  </div>
                  <button className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                    Add SIC Code
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accounting Reference Date</label>
                  <input
                    type="text"
                    value={companyDetails?.ard || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    This determines when your annual accounts are due
                  </p>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Update SIC/ARD
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  File AA01 (ARD Change)
                </button>
              </div>
            </div>
          </div>
        )
      case 'articles':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Articles of Association</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Articles</label>
                  <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <p className="text-sm text-gray-600">Model Articles for Private Companies Limited by Shares</p>
                    <p className="text-xs text-gray-500 mt-1">Adopted: 15 March 2020</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Upload New Articles
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    File CC04
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Classes</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nominal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rights</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued/Authorized</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {shareClasses.map((shareClass) => (
                      <tr key={shareClass.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {shareClass.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {shareClass.currency}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {shareClass.nominal.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {shareClass.rights}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {shareClass.issued.toLocaleString()} / {shareClass.authorized.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                          <button className="text-green-600 hover:text-green-900">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Add Share Class
                </button>
              </div>
            </div>
          </div>
        )
      case 'registers':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statutory Registers Location</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Register Location</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Registered Office</option>
                    <option>Alternative Location</option>
                    <option>SAIL (Single Alternative Inspection Location)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Register Format</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="format" value="electronic" className="mr-2" defaultChecked />
                      Electronic registers
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="format" value="paper" className="mr-2" />
                      Paper registers
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SAIL Address (if applicable)</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter SAIL address if different from registered office"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Update Register Location
                </button>
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
          <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600">Manage company details, SIC codes, articles and register locations</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Companies House Lookup
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Export Profile
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

export default CompanyProfile

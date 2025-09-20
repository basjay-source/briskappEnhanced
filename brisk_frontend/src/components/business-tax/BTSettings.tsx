import React, { useState, useEffect } from 'react'
import { FileText, Save } from 'lucide-react'

const BTSettings: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('rates')
  const [settingsData, setSettingsData] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setSettingsData({
        rates: {
          smallProfitsRate: 19,
          mainRate: 25,
          marginalReliefThreshold: 250000,
          smallProfitsThreshold: 50000
        },
        permissions: [
          { role: 'Preparer', canPrepare: true, canReview: false, canFile: false },
          { role: 'Reviewer', canPrepare: true, canReview: true, canFile: false },
          { role: 'Partner', canPrepare: true, canReview: true, canFile: true }
        ],
        templates: [
          { name: 'Standard CT Computation', type: 'Computation', lastModified: '2024-01-10' },
          { name: 'Group Relief Letter', type: 'Letter', lastModified: '2024-01-08' },
          { name: 'R&D Claim Report', type: 'Report', lastModified: '2024-01-05' }
        ],
        mappings: {
          entertainment: '6200',
          depreciation: '6300',
          capitalAllowances: '6310'
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
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'rates', label: 'CT Rates & Thresholds' },
            { id: 'permissions', label: 'Roles/Permissions' },
            { id: 'templates', label: 'Templates' },
            { id: 'mappings', label: 'Mapping Libraries' }
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

      {activeTab === 'rates' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Corporation Tax Rates</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Small Profits Rate (%)</label>
                  <input
                    type="number"
                    value={settingsData.rates.smallProfitsRate}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Main Rate (%)</label>
                  <input
                    type="number"
                    value={settingsData.rates.mainRate}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Small Profits Threshold (£)</label>
                  <input
                    type="number"
                    value={settingsData.rates.smallProfitsThreshold}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Marginal Relief Threshold (£)</label>
                  <input
                    type="number"
                    value={settingsData.rates.marginalReliefThreshold}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'permissions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Role Permissions</h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prepare
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Review
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {settingsData.permissions.map((permission: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {permission.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={permission.canPrepare}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={permission.canReview}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={permission.canFile}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                          />
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

      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Document Templates</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {settingsData.templates.map((template: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.type} • Modified {template.lastModified}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Add Template
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'mappings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Account Mapping Libraries</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Entertainment Expenses</label>
                  <input
                    type="text"
                    value={settingsData.mappings.entertainment}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Depreciation</label>
                  <input
                    type="text"
                    value={settingsData.mappings.depreciation}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capital Allowances</label>
                  <input
                    type="text"
                    value={settingsData.mappings.capitalAllowances}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Mapping Guidelines</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Map common disallowable expenses to appropriate GL codes</li>
                  <li>• Ensure consistency across all client engagements</li>
                  <li>• Update mappings when chart of accounts changes</li>
                  <li>• Test mappings with trial balance imports</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BTSettings

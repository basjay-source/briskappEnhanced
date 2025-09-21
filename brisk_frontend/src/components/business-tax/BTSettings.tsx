import React, { useState, useEffect } from 'react'
import { FileText, Save, RefreshCw } from 'lucide-react'

const BTSettings: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('rates')
  const [settingsData, setSettingsData] = useState<any>(null)
  const [hmrcRates, setHmrcRates] = useState<any>(null)
  const [ratesLoading, setRatesLoading] = useState(false)

  const fetchHMRCRates = async () => {
    setRatesLoading(true)
    try {
      const response = await fetch('/api/business-tax/hmrc-rates')
      const rates = await response.json()
      setHmrcRates(rates)
      setSettingsData((prev: any) => ({
        ...prev,
        rates: {
          smallProfitsRate: rates.corporation_tax_small_rate,
          mainRate: rates.corporation_tax_main_rate,
          marginalReliefThreshold: rates.marginal_relief_threshold,
          smallProfitsThreshold: rates.small_profits_threshold
        }
      }))
    } catch (error) {
      console.error('Failed to fetch HMRC rates:', error)
    } finally {
      setRatesLoading(false)
    }
  }

  useEffect(() => {
    const initializeData = async () => {
      await fetchHMRCRates()
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
      setLoading(false)
    }
    initializeData()
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
        <div className="flex space-x-3">
          <button 
            onClick={fetchHMRCRates}
            disabled={ratesLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${ratesLoading ? 'animate-spin' : ''}`} />
            <span>Update HMRC Rates</span>
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
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
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Corporation Tax Rates</h3>
                {hmrcRates && (
                  <div className="text-sm text-gray-600">
                    Tax Year: {hmrcRates.tax_year} | Last Updated: {new Date(hmrcRates.effective_date).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Small Profits Rate (%)</label>
                  <input
                    type="number"
                    value={settingsData.rates.smallProfitsRate}
                    readOnly
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700"
                  />
                  <p className="mt-1 text-xs text-gray-500">Automatically updated from HMRC</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Main Rate (%)</label>
                  <input
                    type="number"
                    value={settingsData.rates.mainRate}
                    readOnly
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700"
                  />
                  <p className="mt-1 text-xs text-gray-500">Automatically updated from HMRC</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Small Profits Threshold (£)</label>
                  <input
                    type="number"
                    value={settingsData.rates.smallProfitsThreshold}
                    readOnly
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700"
                  />
                  <p className="mt-1 text-xs text-gray-500">Automatically updated from HMRC</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Marginal Relief Threshold (£)</label>
                  <input
                    type="number"
                    value={settingsData.rates.marginalReliefThreshold}
                    readOnly
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700"
                  />
                  <p className="mt-1 text-xs text-gray-500">Automatically updated from HMRC</p>
                </div>
              </div>
              
              {hmrcRates && (
                <div className="mt-6 bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Dynamic Rate Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
                    <div>
                      <span className="font-medium">Tax Year:</span> {hmrcRates.tax_year}
                    </div>
                    <div>
                      <span className="font-medium">Effective Date:</span> {new Date(hmrcRates.effective_date).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">AIA Allowance:</span> £{hmrcRates.aia_allowance?.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">WDA Main Rate:</span> {hmrcRates.writing_down_allowance_main}%
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-green-700">
                    Rates are automatically updated based on the latest HMRC announcements and Finance Act changes.
                  </p>
                </div>
              )}
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

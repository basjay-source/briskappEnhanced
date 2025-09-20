import React, { useState, useEffect } from 'react'

interface Integration {
  id: string
  name: string
  type: string
  status: 'Connected' | 'Disconnected' | 'Error' | 'Syncing'
  lastSync: string
  description: string
}

const Integrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('companies-house')
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'companies-house', label: 'Companies House (UK)', icon: '🏢' },
    { id: 'hmrc-ers', label: 'HMRC ERS', icon: '🏛️' },
    { id: 'accounts-production', label: 'Accounts Production', icon: '📊' },
    { id: 'bookkeeping', label: 'Bookkeeping', icon: '📚' },
    { id: 'personal-tax', label: 'Personal Tax', icon: '💰' },
    { id: 'aml-kyc', label: 'AML/KYC', icon: '🔍' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setIntegrations([
        {
          id: '1',
          name: 'Companies House API',
          type: 'Government',
          status: 'Connected',
          lastSync: '2024-01-20T10:30:00Z',
          description: 'Real-time company data and filing submissions'
        },
        {
          id: '2',
          name: 'HMRC ERS Gateway',
          type: 'Government',
          status: 'Connected',
          lastSync: '2024-01-19T15:45:00Z',
          description: 'Employment Related Securities annual returns'
        },
        {
          id: '3',
          name: 'Accounts Production Module',
          type: 'Internal',
          status: 'Connected',
          lastSync: '2024-01-20T09:15:00Z',
          description: 'Share capital and director disclosures'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Connected': 'bg-green-100 text-green-800',
      'Disconnected': 'bg-gray-100 text-gray-800',
      'Error': 'bg-red-100 text-red-800',
      'Syncing': 'bg-blue-100 text-blue-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'companies-house':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Companies House Integration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Companies House API key"
                      value="••••••••••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Production</option>
                      <option>Sandbox</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Auto-sync Settings</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Sync company details daily</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Auto-submit filings</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Import filing acknowledgements</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Integration Status</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div>✓ API connection active</div>
                      <div>✓ Authentication valid</div>
                      <div>✓ Last sync: 20 Jan 2024 10:30</div>
                      <div>✓ Rate limit: 600/hour remaining</div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Available Services</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>• Company profile lookup</div>
                      <div>• Officer information sync</div>
                      <div>• PSC data retrieval</div>
                      <div>• Filing submissions</div>
                      <div>• Document downloads</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Test Connection
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Sync Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sync History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">20 Jan 2024 10:30</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Company Details</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 companies</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Success
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">View Log</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case 'hmrc-ers':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">HMRC ERS Integration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">HMRC User ID</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Enter HMRC User ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Enter password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scheme Types</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">EMI (Enterprise Management Incentives)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">CSOP (Company Share Option Plan)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">SAYE (Save As You Earn)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">SIP (Share Incentive Plan)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">ERS Features</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div>• Annual return generation</div>
                      <div>• Scheme registration</div>
                      <div>• Option grant reporting</div>
                      <div>• Exercise notifications</div>
                      <div>• Compliance monitoring</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 text-white rounded-md hover:opacity-90 transition-colors" style={{ backgroundColor: '#00703c' }}>
                      Connect to HMRC
                    </button>
                    <button className="px-4 py-2 text-white rounded-md hover:opacity-90 transition-colors" style={{ backgroundColor: '#00703c' }}>
                      Submit Return
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'accounts-production':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Accounts Production Integration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sync Settings</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Director information</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Share capital details</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Dividend disclosures</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Related party transactions</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sync Frequency</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Real-time</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Manual</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Data Flow</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>CoSec → Accounts: Directors, Share capital</div>
                      <div>CoSec → Accounts: Dividends, PSC info</div>
                      <div>Accounts → CoSec: Profit available</div>
                      <div>Accounts → CoSec: Distributable reserves</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Configure Sync
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Sync Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'bookkeeping':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bookkeeping Integration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Journal Settings</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Auto-post dividend journals</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Auto-post share capital movements</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Auto-post option exercises</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Accounts</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-24">Share Capital:</span>
                        <input type="text" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="3000" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-24">Share Premium:</span>
                        <input type="text" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="3100" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm w-24">Dividends:</span>
                        <input type="text" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" value="3200" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">Journal Types</h4>
                    <div className="text-sm text-purple-700 space-y-1">
                      <div>• Dividend payments</div>
                      <div>• Share allotments</div>
                      <div>• Share premium</div>
                      <div>• Buy-back transactions</div>
                      <div>• Option exercises</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Configure Accounts
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Test Journal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'personal-tax':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Tax Integration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data Export Settings</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Dividend schedules by shareholder</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Option exercise notifications</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Director loan account movements</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax Year</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>2023/24</option>
                      <option>2022/23</option>
                      <option>2021/22</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">SA100 Context</h4>
                    <div className="text-sm text-yellow-700 space-y-1">
                      <div>• Dividend income (SA106)</div>
                      <div>• Employment income (SA102)</div>
                      <div>• Share option gains (SA102)</div>
                      <div>• Capital gains (SA108)</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Export Data
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Generate Reports
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'aml-kyc':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AML/KYC Integration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trigger Settings</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">New officer appointments</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">PSC changes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Significant shareholding changes</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check Level</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Standard Due Diligence</option>
                      <option>Enhanced Due Diligence</option>
                      <option>Simplified Due Diligence</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">AML Triggers</h4>
                    <div className="text-sm text-red-700 space-y-1">
                      <div>• New beneficial owners</div>
                      <div>• High-risk jurisdictions</div>
                      <div>• PEP identification</div>
                      <div>• Sanctions screening</div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Configure Triggers
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Run Check
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
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect with government agencies and internal modules</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Add Integration
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Sync All
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Integration Status</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Integration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {integrations.map((integration) => (
              <tr key={integration.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{integration.name}</div>
                  <div className="text-sm text-gray-500">{integration.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {integration.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(integration.lastSync).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(integration.status)}`}>
                    {integration.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Configure</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Sync</button>
                  <button className="text-gray-600 hover:text-gray-900">Test</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Integrations

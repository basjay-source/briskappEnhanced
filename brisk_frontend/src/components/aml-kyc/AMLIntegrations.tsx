import React, { useState, useEffect } from 'react'
import { Link, Settings, CheckCircle, AlertTriangle, Clock, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import { amlKycApi } from '../../services/api'

interface Integration {
  id: string
  name: string
  type: 'screening' | 'data_source' | 'api' | 'webhook'
  provider: string
  status: 'active' | 'inactive' | 'error' | 'pending'
  lastSync: string
  description: string
  endpoint?: string
  apiKey?: string
  webhookUrl?: string
}

const AMLIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('integrations')

  useEffect(() => {
    fetchIntegrations()
  }, [])

  const fetchIntegrations = async () => {
    try {
      setLoading(true)
      const response = await amlKycApi.getAMLDocuments()
      setIntegrations(response.data || [])
    } catch (error) {
      console.error('Error fetching integrations:', error)
      setIntegrations([
        {
          id: '1',
          name: 'World-Check One',
          type: 'screening',
          provider: 'Refinitiv',
          status: 'active',
          lastSync: '2024-09-20T10:30:00Z',
          description: 'Global sanctions and PEP screening database',
          endpoint: 'https://api.worldcheck.com/v1',
          apiKey: 'wc_***************'
        },
        {
          id: '2',
          name: 'Dow Jones Risk Center',
          type: 'screening',
          provider: 'Dow Jones',
          status: 'active',
          lastSync: '2024-09-20T09:15:00Z',
          description: 'Enhanced due diligence and risk intelligence',
          endpoint: 'https://api.dowjones.com/v2',
          apiKey: 'dj_***************'
        },
        {
          id: '3',
          name: 'Companies House API',
          type: 'data_source',
          provider: 'Companies House',
          status: 'active',
          lastSync: '2024-09-20T08:45:00Z',
          description: 'UK company information and filings',
          endpoint: 'https://api.companieshouse.gov.uk',
          apiKey: 'ch_***************'
        },
        {
          id: '4',
          name: 'HMRC Sanctions List',
          type: 'data_source',
          provider: 'HMRC',
          status: 'error',
          lastSync: '2024-09-19T16:20:00Z',
          description: 'UK financial sanctions list',
          endpoint: 'https://api.hmrc.gov.uk/sanctions'
        },
        {
          id: '5',
          name: 'AML Alert Webhook',
          type: 'webhook',
          provider: 'Internal',
          status: 'pending',
          lastSync: '2024-09-20T07:00:00Z',
          description: 'Real-time AML alerts and notifications',
          webhookUrl: 'https://app.brisk.com/webhooks/aml-alerts'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'inactive': return <Clock className="w-4 h-4 text-gray-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'screening': return 'bg-blue-100 text-blue-800'
      case 'data_source': return 'bg-green-100 text-green-800'
      case 'api': return 'bg-purple-100 text-purple-800'
      case 'webhook': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const activeIntegrations = integrations.filter(i => i.status === 'active').length
  const errorIntegrations = integrations.filter(i => i.status === 'error').length
  const pendingIntegrations = integrations.filter(i => i.status === 'pending').length

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Integrations</h1>
          <p className="text-gray-600">Third-party integrations and API management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Integrations</p>
                <p className="text-2xl font-bold text-gray-900">{integrations.length}</p>
              </div>
              <Link className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{activeIntegrations}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Errors</p>
                <p className="text-2xl font-bold text-red-600">{errorIntegrations}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingIntegrations}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('integrations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'integrations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Integrations
              </button>
              <button
                onClick={() => setActiveTab('api-keys')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'api-keys'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                API Keys
              </button>
              <button
                onClick={() => setActiveTab('webhooks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'webhooks'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Webhooks
              </button>
            </nav>
          </div>

          {activeTab === 'integrations' && (
            <>
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <h2 className="text-lg font-semibold text-gray-900">System Integrations</h2>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Integration</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading integrations...</p>
                    </div>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Integration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {integrations.map((integration) => (
                        <tr key={integration.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Link className="w-5 h-5 text-gray-400 mr-3" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{integration.name}</div>
                                <div className="text-sm text-gray-500">{integration.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(integration.type)}`}>
                              {integration.type.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {integration.provider}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(integration.status)}
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(integration.status)}`}>
                                {integration.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(integration.lastSync).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Settings className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {activeTab === 'api-keys' && (
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">API Key Management</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                      <div>
                        <h4 className="font-medium text-gray-900">World-Check One API</h4>
                        <p className="text-sm text-gray-600">wc_***************</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                      <div>
                        <h4 className="font-medium text-gray-900">Dow Jones API</h4>
                        <p className="text-sm text-gray-600">dj_***************</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'webhooks' && (
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Webhook Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                      <div>
                        <h4 className="font-medium text-gray-900">AML Alert Webhook</h4>
                        <p className="text-sm text-gray-600">https://app.brisk.com/webhooks/aml-alerts</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AMLIntegrations

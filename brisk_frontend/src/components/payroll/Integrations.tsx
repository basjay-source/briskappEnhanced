import React, { useState, useEffect } from 'react'

interface Integration {
  id: string
  name: string
  type: 'HMRC' | 'Pension' | 'Banking' | 'HRIS' | 'ERP' | 'CoSec'
  status: 'Connected' | 'Disconnected' | 'Error' | 'Pending'
  lastSync: string
  description: string
  version?: string
}

interface APIKey {
  id: string
  name: string
  key: string
  permissions: string[]
  created: string
  lastUsed: string
  status: 'Active' | 'Inactive' | 'Expired'
}

const Integrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hmrc-rti')
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'hmrc-rti', label: 'HMRC RTI', icon: '🏛️' },
    { id: 'pension-providers', label: 'Pension Providers', icon: '🏦' },
    { id: 'banking', label: 'Banking (BACS/SEPA)', icon: '💳' },
    { id: 'hris', label: 'HRIS/Time & Attendance', icon: '⏰' },
    { id: 'bookkeeping-erp', label: 'Bookkeeping/ERP', icon: '📊' },
    { id: 'cosec-sync', label: 'CoSec Sync', icon: '🔄' },
    { id: 'api-keys', label: 'API Keys', icon: '🔑' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setIntegrations([
        {
          id: '1',
          name: 'HMRC Gateway',
          type: 'HMRC',
          status: 'Connected',
          lastSync: '2024-02-29 14:30',
          description: 'Real Time Information submissions to HMRC',
          version: 'v2.1'
        },
        {
          id: '2',
          name: 'Aviva Pension Scheme',
          type: 'Pension',
          status: 'Connected',
          lastSync: '2024-02-28 09:15',
          description: 'Auto-enrolment and contribution management',
          version: 'v1.8'
        },
        {
          id: '3',
          name: 'HSBC Business Banking',
          type: 'Banking',
          status: 'Connected',
          lastSync: '2024-02-29 16:45',
          description: 'BACS payment processing and reconciliation'
        },
        {
          id: '4',
          name: 'BambooHR',
          type: 'HRIS',
          status: 'Disconnected',
          lastSync: '2024-02-15 11:20',
          description: 'Employee data and time tracking integration'
        },
        {
          id: '5',
          name: 'Sage Intacct',
          type: 'ERP',
          status: 'Connected',
          lastSync: '2024-02-29 17:00',
          description: 'Financial data and journal posting integration'
        },
        {
          id: '6',
          name: 'Companies House API',
          type: 'CoSec',
          status: 'Connected',
          lastSync: '2024-02-28 12:30',
          description: 'Director and company information synchronization'
        }
      ])

      setApiKeys([
        {
          id: '1',
          name: 'Payroll API - Production',
          key: 'pk_live_51H...***',
          permissions: ['read:employees', 'write:payroll', 'read:reports'],
          created: '2024-01-15',
          lastUsed: '2024-02-29',
          status: 'Active'
        },
        {
          id: '2',
          name: 'Time Tracking Integration',
          key: 'pk_test_51H...***',
          permissions: ['read:timesheets', 'write:timesheets'],
          created: '2024-02-01',
          lastUsed: '2024-02-28',
          status: 'Active'
        },
        {
          id: '3',
          name: 'Legacy API Key',
          key: 'pk_live_49G...***',
          permissions: ['read:employees'],
          created: '2023-12-01',
          lastUsed: '2024-01-15',
          status: 'Inactive'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Connected': 'bg-green-100 text-green-800',
      'Disconnected': 'bg-red-100 text-red-800',
      'Error': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Expired': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      'HMRC': 'bg-green-100 text-green-800',
      'Pension': 'bg-blue-100 text-blue-800',
      'Banking': 'bg-purple-100 text-purple-800',
      'HRIS': 'bg-orange-100 text-orange-800',
      'ERP': 'bg-indigo-100 text-indigo-800',
      'CoSec': 'bg-pink-100 text-pink-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderHMRCTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">HMRC RTI Gateway Connection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Connection Status:</span>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">PAYE Reference:</span>
              <span className="text-sm text-gray-900">123/AB12345</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Accounts Office Reference:</span>
              <span className="text-sm text-gray-900">123PA00012345</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Last Submission:</span>
              <span className="text-sm text-gray-900">29/02/2024 14:30</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Certificate Expiry:</span>
              <span className="text-sm text-gray-900">15/12/2024</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Test Connection
            </button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Update Credentials
            </button>
            <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
              Renew Certificate
            </button>
            <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              View Submission Log
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">System Integrations</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add Integration
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Integration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Sync
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Version
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {integrations.map((integration) => (
              <tr key={integration.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{integration.name}</div>
                    <div className="text-sm text-gray-500">{integration.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(integration.type)}`}>
                    {integration.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(integration.status)}`}>
                    {integration.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{integration.lastSync}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{integration.version || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Configure</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Sync</button>
                  <button className="text-gray-600 hover:text-gray-900">Logs</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderAPIKeysTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">API Keys Management</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Generate New Key
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Used
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {apiKeys.map((key) => (
              <tr key={key.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{key.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-mono">{key.key}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {key.permissions.map((permission, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                        {permission}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{key.created}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{key.lastUsed}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(key.status)}`}>
                    {key.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Rotate</button>
                  <button className="text-gray-600 hover:text-gray-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hmrc-rti': return renderHMRCTab()
      case 'pension-providers':
      case 'banking':
      case 'hris':
      case 'bookkeeping-erp':
      case 'cosec-sync':
        return renderIntegrationsTab()
      case 'api-keys': return renderAPIKeysTab()
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600">
              Seamless integration with HMRC, pension providers, banks, and other business systems.
            </p>
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
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect payroll with external systems and services</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Sync All
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Integration Health
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

export default Integrations

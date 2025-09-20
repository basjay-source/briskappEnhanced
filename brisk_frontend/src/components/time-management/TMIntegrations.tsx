import React, { useState } from 'react'
import { Zap, CheckCircle, AlertTriangle, Settings, RefreshCw, Calendar, Mail, CreditCard } from 'lucide-react'

const TMIntegrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookkeeping')

  const integrations = [
    {
      category: 'Bookkeeping/ERP',
      items: [
        {
          name: 'Xero',
          description: 'Sync invoices, AR, and cash receipts',
          status: 'Connected',
          lastSync: '2024-01-16 09:30',
          features: ['Invoice sync', 'AR posting', 'Cash allocation', 'Client mapping']
        },
        {
          name: 'QuickBooks',
          description: 'Full accounting integration',
          status: 'Available',
          lastSync: null,
          features: ['Invoice sync', 'AR posting', 'Cash allocation', 'GL posting']
        },
        {
          name: 'Sage',
          description: 'Enterprise accounting sync',
          status: 'Available',
          lastSync: null,
          features: ['Invoice sync', 'AR posting', 'Cash allocation', 'Multi-company']
        }
      ]
    },
    {
      category: 'Payments',
      items: [
        {
          name: 'Stripe',
          description: 'Credit card and ACH payments',
          status: 'Connected',
          lastSync: '2024-01-16 10:15',
          features: ['Payment links', 'Auto-reconcile', 'Subscription billing', 'Multi-currency']
        },
        {
          name: 'GoCardless',
          description: 'Direct debit payments',
          status: 'Connected',
          lastSync: '2024-01-16 08:45',
          features: ['Direct debit', 'Auto-reconcile', 'Mandate management', 'Retry logic']
        },
        {
          name: 'PayPal',
          description: 'PayPal payment processing',
          status: 'Available',
          lastSync: null,
          features: ['Payment links', 'Auto-reconcile', 'International payments']
        }
      ]
    },
    {
      category: 'Calendar/Email',
      items: [
        {
          name: 'Microsoft 365',
          description: 'Calendar and email integration',
          status: 'Connected',
          lastSync: '2024-01-16 09:00',
          features: ['Calendar sync', 'Meeting time capture', 'Email tracking', 'Contact sync']
        },
        {
          name: 'Google Workspace',
          description: 'Google calendar and Gmail',
          status: 'Available',
          lastSync: null,
          features: ['Calendar sync', 'Meeting time capture', 'Email tracking', 'Contact sync']
        }
      ]
    },
    {
      category: 'Practice Management',
      items: [
        {
          name: 'Internal Practice Mgmt',
          description: 'Bi-directional sync with Practice Management module',
          status: 'Connected',
          lastSync: '2024-01-16 10:30',
          features: ['Job sync', 'Budget sync', 'Client mapping', 'Task integration']
        }
      ]
    },
    {
      category: 'HR/Payroll',
      items: [
        {
          name: 'BambooHR',
          description: 'Employee data and leave sync',
          status: 'Available',
          lastSync: null,
          features: ['Employee sync', 'Leave calendar', 'Capacity planning', 'Rate management']
        },
        {
          name: 'ADP',
          description: 'Payroll and HR integration',
          status: 'Available',
          lastSync: null,
          features: ['Employee sync', 'Leave calendar', 'Cost center mapping']
        }
      ]
    }
  ]

  const syncLogs = [
    {
      id: 1,
      integration: 'Xero',
      action: 'Invoice sync',
      status: 'Success',
      records: 12,
      timestamp: '2024-01-16 09:30',
      details: '12 invoices synced successfully'
    },
    {
      id: 2,
      integration: 'Stripe',
      action: 'Payment reconciliation',
      status: 'Success',
      records: 8,
      timestamp: '2024-01-16 10:15',
      details: '8 payments auto-reconciled'
    },
    {
      id: 3,
      integration: 'Microsoft 365',
      action: 'Calendar sync',
      status: 'Warning',
      records: 45,
      timestamp: '2024-01-16 09:00',
      details: '45 events synced, 3 conflicts resolved'
    },
    {
      id: 4,
      integration: 'GoCardless',
      action: 'Direct debit collection',
      status: 'Success',
      records: 15,
      timestamp: '2024-01-16 08:45',
      details: '15 payments collected successfully'
    }
  ]

  const tabs = [
    { id: 'bookkeeping', name: 'Bookkeeping/ERP', icon: CreditCard },
    { id: 'payments', name: 'Payments (DD/Card)', icon: CreditCard },
    { id: 'calendar', name: 'Calendar/Email', icon: Calendar },
    { id: 'practice', name: 'Practice Mgmt', icon: Zap },
    { id: 'hr', name: 'HR/Payroll', icon: Mail }
  ]

  const renderIntegrationCategory = (category: string) => {
    const categoryData = integrations.find(cat => cat.category.toLowerCase().includes(category.toLowerCase()))
    if (!categoryData) return null

    return (
      <div className="space-y-4">
        {categoryData.items.map((integration, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-600">{integration.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  integration.status === 'Connected' ? 'bg-green-100 text-green-800' :
                  integration.status === 'Error' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {integration.status === 'Connected' && <CheckCircle className="w-4 h-4 mr-1" />}
                  {integration.status === 'Error' && <AlertTriangle className="w-4 h-4 mr-1" />}
                  {integration.status}
                </span>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            {integration.lastSync && (
              <div className="mb-4 text-sm text-gray-500">
                Last sync: {integration.lastSync}
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {integration.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex space-x-3">
              {integration.status === 'Connected' ? (
                <>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>Sync Now</span>
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                    Configure
                  </button>
                  <button className="border border-red-300 text-red-700 px-4 py-2 rounded-lg hover:bg-red-50">
                    Disconnect
                  </button>
                </>
              ) : (
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-2">Connect with bookkeeping, payments, calendar, and HR systems</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Zap className="w-4 h-4" />
          <span>Browse Integrations</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Connected</h3>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {integrations.reduce((count, cat) => count + cat.items.filter(item => item.status === 'Connected').length, 0)}
          </div>
          <p className="text-sm text-gray-500 mt-1">Active integrations</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Available</h3>
            <Zap className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {integrations.reduce((count, cat) => count + cat.items.filter(item => item.status === 'Available').length, 0)}
          </div>
          <p className="text-sm text-gray-500 mt-1">Ready to connect</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Last Sync</h3>
            <RefreshCw className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-lg font-bold text-purple-600">
            10:30 AM
          </div>
          <p className="text-sm text-gray-500 mt-1">Today</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sync Status</h3>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-lg font-bold text-green-600">
            Healthy
          </div>
          <p className="text-sm text-gray-500 mt-1">All systems operational</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'bookkeeping' && renderIntegrationCategory('Bookkeeping')}
          {activeTab === 'payments' && renderIntegrationCategory('Payments')}
          {activeTab === 'calendar' && renderIntegrationCategory('Calendar')}
          {activeTab === 'practice' && renderIntegrationCategory('Practice')}
          {activeTab === 'hr' && renderIntegrationCategory('HR')}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sync Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Integration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {syncLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.integration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      log.status === 'Success' ? 'bg-green-100 text-green-800' :
                      log.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.records}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TMIntegrations

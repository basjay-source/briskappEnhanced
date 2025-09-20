import React, { useState, useEffect } from 'react'
import { Plug, CheckCircle, AlertTriangle, RefreshCw, Settings } from 'lucide-react'

const Integrations: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [integrationsData, setIntegrationsData] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setIntegrationsData({
        integrations: [
          { id: 'bookkeeping', name: 'Bookkeeping', status: 'connected', lastSync: '2024-01-16 09:30', description: 'Trial balance and journal sync' },
          { id: 'accounts-production', name: 'Accounts Production', status: 'connected', lastSync: '2024-01-15 16:45', description: 'iXBRL accounts and disclosures' },
          { id: 'hmrc-ct', name: 'HMRC CT', status: 'connected', lastSync: '2024-01-16 10:15', description: 'Corporation tax filing' },
          { id: 'cosec', name: 'Company Secretarial', status: 'connected', lastSync: '2024-01-14 14:20', description: 'Company information and shareholdings' },
          { id: 'payroll', name: 'Payroll', status: 'warning', lastSync: '2024-01-10 11:30', description: 'Employee costs and PAYE data' },
          { id: 'banking', name: 'Banking', status: 'disconnected', lastSync: null, description: 'Bank transactions and reconciliation' }
        ]
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
            {[...Array(6)].map((_, i) => (
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
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Sync All</span>
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrationsData.integrations.map((integration: any) => (
          <div key={integration.id} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Plug className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-900">{integration.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {integration.status === 'connected' && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {integration.status === 'warning' && (
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  )}
                  {integration.status === 'disconnected' && (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    integration.status === 'connected' ? 'bg-green-100 text-green-800' :
                    integration.status === 'warning' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Sync:</span>
                  <span className="text-gray-900">
                    {integration.lastSync || 'Never'}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                {integration.status === 'connected' ? (
                  <>
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                      Sync Now
                    </button>
                    <button className="px-3 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                      Configure
                    </button>
                  </>
                ) : (
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Integration Benefits</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Automatic data synchronization between modules</li>
          <li>• Reduced manual data entry and errors</li>
          <li>• Real-time updates across all connected systems</li>
          <li>• Comprehensive audit trail of all data transfers</li>
          <li>• Seamless workflow between tax preparation and filing</li>
        </ul>
      </div>
    </div>
  )
}

export default Integrations

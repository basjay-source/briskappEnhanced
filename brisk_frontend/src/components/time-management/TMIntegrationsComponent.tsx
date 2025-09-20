import React, { useState, useEffect } from 'react'
import { Plus, Search, Filter, Link, CheckCircle, AlertTriangle, Settings } from 'lucide-react'

const TMIntegrationsComponent: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        setLoading(false)
      } catch (error) {
        console.error('Error fetching integrations:', error)
        setLoading(false)
      }
    }

    fetchIntegrations()
  }, [])

  const mockIntegrations = [
    {
      id: 1,
      name: 'Xero',
      category: 'Bookkeeping',
      description: 'Sync invoices and payments',
      status: 'Connected',
      last_sync: '2024-01-20 09:30'
    },
    {
      id: 2,
      name: 'Outlook Calendar',
      category: 'Calendar',
      description: 'Import meetings for time suggestions',
      status: 'Connected',
      last_sync: '2024-01-20 10:15'
    },
    {
      id: 3,
      name: 'Stripe',
      category: 'Payments',
      description: 'Process online payments',
      status: 'Disconnected',
      last_sync: null
    }
  ]

  const filteredIntegrations = mockIntegrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || integration.category.toLowerCase() === categoryFilter
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
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
          <Plus className="w-4 h-4" />
          <span>Add Integration</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="bookkeeping">Bookkeeping</option>
              <option value="calendar">Calendar</option>
              <option value="payments">Payments</option>
              <option value="hr">HR/Payroll</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <div key={integration.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Link className="w-8 h-8 text-blue-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                      <p className="text-sm text-gray-600">{integration.category}</p>
                    </div>
                  </div>
                  {integration.status === 'Connected' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                
                <p className="text-sm text-gray-700 mb-4">{integration.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    integration.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {integration.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
                
                {integration.last_sync && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Last sync: {integration.last_sync}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TMIntegrationsComponent

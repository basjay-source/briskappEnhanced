import React, { useState } from 'react'
import { Globe, ShoppingCart, Package, TrendingUp, Settings, Zap, CreditCard } from 'lucide-react'

const EcommerceIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('platforms')

  const tabs = [
    { id: 'platforms', name: 'Platform Connections', icon: Globe },
    { id: 'orders', name: 'Order Sync', icon: ShoppingCart },
    { id: 'inventory', name: 'Inventory Management', icon: Package },
    { id: 'payments', name: 'Payment Gateways', icon: CreditCard },
    { id: 'analytics', name: 'Sales Analytics', icon: TrendingUp },
    { id: 'automation', name: 'Automation Rules', icon: Zap },
    { id: 'settings', name: 'Integration Settings', icon: Settings }
  ]

  const ecommercePlatforms = [
    {
      id: 1,
      name: 'Shopify',
      logo: '🛍️',
      status: 'Connected',
      lastSync: '2024-01-15 10:30',
      orders: 1247,
      revenue: 89650.00,
      currency: 'GBP'
    },
    {
      id: 2,
      name: 'WooCommerce',
      logo: '🛒',
      status: 'Connected',
      lastSync: '2024-01-15 09:45',
      orders: 892,
      revenue: 45320.00,
      currency: 'GBP'
    },
    {
      id: 3,
      name: 'Amazon',
      logo: '📦',
      status: 'Connected',
      lastSync: '2024-01-15 11:15',
      orders: 2156,
      revenue: 156780.00,
      currency: 'GBP'
    },
    {
      id: 4,
      name: 'eBay',
      logo: '🏪',
      status: 'Connected',
      lastSync: '2024-01-15 08:20',
      orders: 634,
      revenue: 28940.00,
      currency: 'GBP'
    },
    {
      id: 5,
      name: 'Etsy',
      logo: '🎨',
      status: 'Connected',
      lastSync: '2024-01-15 12:00',
      orders: 445,
      revenue: 18750.00,
      currency: 'GBP'
    },
    {
      id: 6,
      name: 'Magento',
      logo: '🏬',
      status: 'Disconnected',
      lastSync: 'Never',
      orders: 0,
      revenue: 0,
      currency: 'GBP'
    },
    {
      id: 7,
      name: 'BigCommerce',
      logo: '🛍️',
      status: 'Disconnected',
      lastSync: 'Never',
      orders: 0,
      revenue: 0,
      currency: 'GBP'
    },
    {
      id: 8,
      name: 'Square',
      logo: '⬜',
      status: 'Connected',
      lastSync: '2024-01-15 10:45',
      orders: 567,
      revenue: 34560.00,
      currency: 'GBP'
    }
  ]

  const recentOrders = [
    {
      id: 'ORD-2024-001',
      platform: 'Shopify',
      customer: 'John Smith',
      amount: 125.99,
      status: 'Synced',
      date: '2024-01-15',
      invoiceNumber: 'INV-2024-0156'
    },
    {
      id: 'ORD-2024-002',
      platform: 'Amazon',
      customer: 'Sarah Johnson',
      amount: 89.50,
      status: 'Pending',
      date: '2024-01-15',
      invoiceNumber: null
    },
    {
      id: 'ORD-2024-003',
      platform: 'Etsy',
      customer: 'Mike Wilson',
      amount: 45.00,
      status: 'Synced',
      date: '2024-01-14',
      invoiceNumber: 'INV-2024-0155'
    }
  ]

  const renderPlatforms = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Ecommerce Platform Connections</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Add Platform
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ecommercePlatforms.map((platform) => (
          <div key={platform.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{platform.logo}</span>
                <h4 className="font-semibold text-gray-900">{platform.name}</h4>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                platform.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {platform.status}
              </span>
            </div>
            
            {platform.status === 'Connected' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Orders:</span>
                  <span className="font-medium">{platform.orders.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-medium">£{platform.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Sync:</span>
                  <span className="font-medium">{platform.lastSync}</span>
                </div>
              </div>
            )}
            
            <div className="mt-4 flex space-x-2">
              {platform.status === 'Connected' ? (
                <>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm">
                    Sync Now
                  </button>
                  <button className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm hover:bg-gray-50">
                    Configure
                  </button>
                </>
              ) : (
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Order Synchronization</h3>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Sync All Orders
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Export Orders
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Recent Orders</h4>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search orders..."
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              />
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                <option>All Platforms</option>
                <option>Shopify</option>
                <option>Amazon</option>
                <option>Etsy</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.platform}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Synced' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.invoiceNumber || 'Pending'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900">Sync</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Ecommerce Integration</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Add Integration
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Sync All
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
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

      {activeTab === 'platforms' && renderPlatforms()}
      {activeTab === 'orders' && renderOrders()}
      {activeTab === 'inventory' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Inventory management coming soon...</p>
        </div>
      )}
      {activeTab === 'payments' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Payment gateway integration coming soon...</p>
        </div>
      )}
      {activeTab === 'analytics' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Sales analytics coming soon...</p>
        </div>
      )}
      {activeTab === 'automation' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Automation rules coming soon...</p>
        </div>
      )}
      {activeTab === 'settings' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Integration settings coming soon...</p>
        </div>
      )}
    </div>
  )
}

export default EcommerceIntegration

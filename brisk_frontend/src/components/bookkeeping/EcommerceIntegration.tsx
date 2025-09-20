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
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Total Products</h3>
              <p className="text-2xl font-bold text-blue-600">2,456</p>
              <p className="text-sm text-blue-700">Across all platforms</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">In Stock</h3>
              <p className="text-2xl font-bold text-green-600">1,892</p>
              <p className="text-sm text-green-700">Available items</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Low Stock</h3>
              <p className="text-2xl font-bold text-yellow-600">124</p>
              <p className="text-sm text-yellow-700">Need reordering</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-medium text-red-900">Out of Stock</h3>
              <p className="text-2xl font-bold text-red-600">45</p>
              <p className="text-sm text-red-700">Urgent attention</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Inventory Management</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">Centralized inventory management across all ecommerce platforms with real-time stock level synchronization and automated reorder alerts.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Multi-Platform Sync</h4>
                  <p className="text-sm text-gray-600">Synchronize inventory levels across Shopify, Amazon, eBay, Etsy, and other platforms</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Stock Alerts</h4>
                  <p className="text-sm text-gray-600">Automated low stock alerts and reorder point management</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Cost Tracking</h4>
                  <p className="text-sm text-gray-600">Track product costs, margins, and profitability across channels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Payment Methods</h3>
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-blue-700">Connected gateways</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Success Rate</h3>
              <p className="text-2xl font-bold text-green-600">98.5%</p>
              <p className="text-sm text-green-700">Payment success</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Processing Fees</h3>
              <p className="text-2xl font-bold text-yellow-600">£2,340</p>
              <p className="text-sm text-yellow-700">This month</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Disputes</h3>
              <p className="text-2xl font-bold text-purple-600">3</p>
              <p className="text-sm text-purple-700">Active cases</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Payment Gateway Integration</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">Comprehensive payment gateway management with automated reconciliation, fee tracking, and dispute resolution workflows.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Gateway Management</h4>
                  <p className="text-sm text-gray-600">Connect and manage Stripe, PayPal, Square, and other payment processors</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Automated Reconciliation</h4>
                  <p className="text-sm text-gray-600">Automatic matching of payments with orders and invoice generation</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Fee Analysis</h4>
                  <p className="text-sm text-gray-600">Detailed breakdown of processing fees and cost optimization recommendations</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Dispute Management</h4>
                  <p className="text-sm text-gray-600">Automated dispute tracking and resolution workflow management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Total Revenue</h3>
              <p className="text-2xl font-bold text-blue-600">£345,680</p>
              <p className="text-sm text-blue-700">All platforms YTD</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Growth Rate</h3>
              <p className="text-2xl font-bold text-green-600">+24%</p>
              <p className="text-sm text-green-700">vs last year</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Avg Order Value</h3>
              <p className="text-2xl font-bold text-yellow-600">£67.50</p>
              <p className="text-sm text-yellow-700">Across all channels</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Conversion Rate</h3>
              <p className="text-2xl font-bold text-purple-600">3.2%</p>
              <p className="text-sm text-purple-700">Platform average</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Sales Analytics & Insights</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Top Performing Platforms</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Amazon</span>
                      <span className="text-sm font-medium">£156,780 (45%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Shopify</span>
                      <span className="text-sm font-medium">£89,650 (26%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">WooCommerce</span>
                      <span className="text-sm font-medium">£45,320 (13%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">eBay</span>
                      <span className="text-sm font-medium">£28,940 (8%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Etsy</span>
                      <span className="text-sm font-medium">£18,750 (5%)</span>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Monthly Trends</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">January</span>
                      <span className="text-sm font-medium text-green-600">+18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">February</span>
                      <span className="text-sm font-medium text-green-600">+22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">March</span>
                      <span className="text-sm font-medium text-green-600">+15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">April</span>
                      <span className="text-sm font-medium text-green-600">+28%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'automation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Active Rules</h3>
              <p className="text-2xl font-bold text-blue-600">15</p>
              <p className="text-sm text-blue-700">Automation workflows</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Orders Processed</h3>
              <p className="text-2xl font-bold text-green-600">2,847</p>
              <p className="text-sm text-green-700">Auto-processed</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Time Saved</h3>
              <p className="text-2xl font-bold text-yellow-600">45hrs</p>
              <p className="text-sm text-yellow-700">This month</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">Success Rate</h3>
              <p className="text-2xl font-bold text-purple-600">97%</p>
              <p className="text-sm text-purple-700">Automation accuracy</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Automation Rules & Workflows</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">Order Processing Automation</h4>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-gray-600">Automatically create invoices and update inventory when orders are received</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">VAT Calculation</h4>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-gray-600">Automatically calculate and apply correct VAT rates based on customer location</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">Customer Categorization</h4>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-gray-600">Automatically categorize customers based on purchase history and location</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">Expense Allocation</h4>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Pending</span>
                  </div>
                  <p className="text-sm text-gray-600">Automatically allocate platform fees and shipping costs to appropriate expense accounts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Connected Platforms</h3>
              <p className="text-2xl font-bold text-blue-600">8</p>
              <p className="text-sm text-blue-700">Active integrations</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Sync Frequency</h3>
              <p className="text-2xl font-bold text-green-600">15min</p>
              <p className="text-sm text-green-700">Update interval</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Data Retention</h3>
              <p className="text-2xl font-bold text-yellow-600">2 years</p>
              <p className="text-sm text-yellow-700">Historical data</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900">API Calls</h3>
              <p className="text-2xl font-bold text-purple-600">45,678</p>
              <p className="text-sm text-purple-700">This month</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Integration Settings & Configuration</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Sync Settings</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Order Sync</span>
                      <span className="text-sm font-medium text-green-600">Real-time</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Inventory Sync</span>
                      <span className="text-sm font-medium text-blue-600">Every 15 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Customer Sync</span>
                      <span className="text-sm font-medium text-blue-600">Hourly</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Product Sync</span>
                      <span className="text-sm font-medium text-blue-600">Daily</span>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Data Mapping</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Default Tax Code</span>
                      <span className="text-sm font-medium">T1 - Standard Rate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sales Account</span>
                      <span className="text-sm font-medium">4000 - Sales</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Shipping Account</span>
                      <span className="text-sm font-medium">4010 - Shipping</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Fees Account</span>
                      <span className="text-sm font-medium">7200 - Platform Fees</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EcommerceIntegration

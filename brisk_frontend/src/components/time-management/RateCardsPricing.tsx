import React, { useState } from 'react'
import { Plus, Search, Edit, DollarSign, User, Calendar, Building } from 'lucide-react'

const RateCardsPricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('role-rates')
  const [searchTerm, setSearchTerm] = useState('')

  const roleRates = [
    { role: 'Partner', rate: 450, currency: 'GBP', effectiveDate: '2024-01-01' },
    { role: 'Director', rate: 350, currency: 'GBP', effectiveDate: '2024-01-01' },
    { role: 'Manager', rate: 250, currency: 'GBP', effectiveDate: '2024-01-01' },
    { role: 'Senior', rate: 180, currency: 'GBP', effectiveDate: '2024-01-01' },
    { role: 'Staff', rate: 120, currency: 'GBP', effectiveDate: '2024-01-01' },
    { role: 'Trainee', rate: 80, currency: 'GBP', effectiveDate: '2024-01-01' }
  ]

  const personOverrides = [
    { name: 'John Smith', role: 'Partner', standardRate: 450, overrideRate: 500, client: 'Acme Corp', effectiveDate: '2024-01-01' },
    { name: 'Sarah Johnson', role: 'Manager', standardRate: 250, overrideRate: 280, client: 'Tech Ltd', effectiveDate: '2024-02-01' },
    { name: 'Mike Wilson', role: 'Senior', standardRate: 180, overrideRate: 200, client: 'Global Inc', effectiveDate: '2024-01-15' }
  ]

  const clientOverrides = [
    { client: 'Acme Corp', service: 'Audit', standardRate: 250, overrideRate: 280, discount: 0 },
    { client: 'Tech Ltd', service: 'Tax', standardRate: 180, overrideRate: 160, discount: 11.1 },
    { client: 'Global Inc', service: 'Advisory', standardRate: 350, overrideRate: 375, discount: 0 }
  ]

  const priceRules = [
    { name: 'Charity Discount', condition: 'Client Type = Charity', adjustment: '-10%', status: 'Active' },
    { name: 'Crypto Premium', condition: 'Service = Crypto Advisory', adjustment: '+20%', status: 'Active' },
    { name: 'Volume Discount', condition: 'Annual Fees > £100k', adjustment: '-5%', status: 'Active' },
    { name: 'Rush Job Premium', condition: 'Deadline < 7 days', adjustment: '+25%', status: 'Active' }
  ]

  const tabs = [
    { id: 'role-rates', name: 'Role Rates', icon: User },
    { id: 'person-overrides', name: 'Person Overrides', icon: User },
    { id: 'client-overrides', name: 'Client Overrides', icon: Building },
    { id: 'price-rules', name: 'Price Rules', icon: DollarSign }
  ]

  const renderRoleRates = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {roleRates.map((rate, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{rate.role}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">£{rate.rate}/hour</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{rate.currency}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{rate.effectiveDate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">
                  <Edit className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderPersonOverrides = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Person</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standard Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Override Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {personOverrides.map((override, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{override.name}</div>
                  <div className="text-sm text-gray-500">{override.role}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">£{override.standardRate}/hour</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">£{override.overrideRate}/hour</div>
                <div className={`text-sm ${override.overrideRate > override.standardRate ? 'text-green-600' : 'text-red-600'}`}>
                  {override.overrideRate > override.standardRate ? '+' : ''}
                  {((override.overrideRate - override.standardRate) / override.standardRate * 100).toFixed(1)}%
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{override.client}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{override.effectiveDate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderClientOverrides = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standard Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Override Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clientOverrides.map((override, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{override.client}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{override.service}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">£{override.standardRate}/hour</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">£{override.overrideRate}/hour</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-medium ${override.discount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {override.discount > 0 ? `-${override.discount}%` : 'Premium'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderPriceRules = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adjustment</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {priceRules.map((rule, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{rule.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{rule.condition}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-medium ${rule.adjustment.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {rule.adjustment}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  rule.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {rule.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">Disable</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rate Cards &amp; Pricing</h1>
          <p className="text-gray-600 mt-2">Manage role rates, person overrides, client pricing, and price rules</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Rate</span>
        </button>
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
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search rates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {activeTab === 'role-rates' && renderRoleRates()}
          {activeTab === 'person-overrides' && renderPersonOverrides()}
          {activeTab === 'client-overrides' && renderClientOverrides()}
          {activeTab === 'price-rules' && renderPriceRules()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Rate Summary</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Rate</span>
              <span className="text-sm font-medium">£245/hour</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Highest Rate</span>
              <span className="text-sm font-medium">£500/hour</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Lowest Rate</span>
              <span className="text-sm font-medium">£80/hour</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Overrides</h3>
            <User className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Person Overrides</span>
              <span className="text-sm font-medium">3 active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Client Overrides</span>
              <span className="text-sm font-medium">3 active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Price Rules</span>
              <span className="text-sm font-medium">4 active</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Changes</h3>
            <Calendar className="w-5 h-5 text-purple-500" />
          </div>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="font-medium text-gray-900">Partner rate increased</p>
              <p className="text-gray-500">£450 → £500 for Acme Corp</p>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">New price rule added</p>
              <p className="text-gray-500">Rush job premium +25%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RateCardsPricing

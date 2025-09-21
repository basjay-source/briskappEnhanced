import React, { useState, useEffect } from 'react'
import { AlertTriangle, CheckCircle, Clock, FileText, Plus, Edit } from 'lucide-react'

const DisallowablesAddbacks: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('policy-rules')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const tabs = [
    { id: 'policy-rules', label: 'Policy Rules', icon: FileText },
    { id: 'review-queue', label: 'Review Queue', icon: Clock },
    { id: 'permanent-vs-temporary', label: 'Permanent vs Temporary', icon: AlertTriangle },
    { id: 'adjustments', label: 'Adjustments', icon: Edit }
  ]

  const disallowableItems = [
    { id: 1, description: 'Entertainment expenses', amount: 2500, type: 'Permanent', status: 'Disallowed', category: 'Entertainment' },
    { id: 2, description: 'Depreciation charge', amount: 18000, type: 'Permanent', status: 'Add-back', category: 'Depreciation' },
    { id: 3, description: 'Provision for bad debts', amount: 5000, type: 'Temporary', status: 'Review', category: 'Provisions' },
    { id: 4, description: 'Legal fees - capital', amount: 3200, type: 'Permanent', status: 'Disallowed', category: 'Legal' }
  ]

  const policyRules = [
    { category: 'Entertainment', rule: 'All entertainment expenses are disallowable', rate: '100%' },
    { category: 'Depreciation', rule: 'Replace with capital allowances', rate: '100%' },
    { category: 'Provisions', rule: 'Only specific provisions allowed', rate: 'Variable' },
    { category: 'Legal Fees', rule: 'Capital legal fees disallowed', rate: '100%' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Disallowables & Add-backs</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Apply Rules
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <FileText className="w-4 h-4 mr-2 inline" />
            Review Queue
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'policy-rules' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-red-50 rounded-lg p-6 cursor-pointer hover:bg-red-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Total Disallowables</p>
                      <p className="text-2xl font-bold text-red-900">£28,700</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6 cursor-pointer hover:bg-orange-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Permanent Differences</p>
                      <p className="text-2xl font-bold text-orange-900">£23,700</p>
                    </div>
                    <FileText className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6 cursor-pointer hover:bg-blue-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Timing Differences</p>
                      <p className="text-2xl font-bold text-blue-900">£5,000</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Items in Queue</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disallowance Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {policyRules.map((rule, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.rule}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.rate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'review-queue' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Items Requiring Review</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {disallowableItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{item.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.status === 'Disallowed' ? 'bg-red-100 text-red-800' :
                            item.status === 'Add-back' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'permanent-vs-temporary' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Permanent vs Temporary Differences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-red-900 mb-4">Permanent Differences</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-red-700">Entertainment expenses</span>
                      <span className="text-sm font-medium text-red-900">£2,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-red-700">Depreciation add-back</span>
                      <span className="text-sm font-medium text-red-900">£18,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-red-700">Legal fees (capital)</span>
                      <span className="text-sm font-medium text-red-900">£3,200</span>
                    </div>
                    <div className="flex justify-between border-t border-red-300 pt-3">
                      <span className="text-sm font-medium text-red-900">Total Permanent</span>
                      <span className="text-sm font-bold text-red-900">£23,700</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-blue-900 mb-4">Temporary Differences</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Provision for bad debts</span>
                      <span className="text-sm font-medium text-blue-900">£5,000</span>
                    </div>
                    <div className="flex justify-between border-t border-blue-300 pt-3">
                      <span className="text-sm font-medium text-blue-900">Total Temporary</span>
                      <span className="text-sm font-bold text-blue-900">£5,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'adjustments' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Tax Adjustments Summary</h3>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Accounting Profit</span>
                    <span className="text-lg font-semibold text-gray-900">£75,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-red-700">Add: Disallowable expenses</span>
                    <span className="text-lg font-semibold text-red-900">£23,700</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-700">Less: Capital allowances</span>
                    <span className="text-lg font-semibold text-green-900">(£28,500)</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Adjusted Trading Profit</span>
                      <span className="text-xl font-bold text-orange-600">£70,200</span>
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

export default DisallowablesAddbacks

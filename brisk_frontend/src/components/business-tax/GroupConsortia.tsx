import React, { useState, useEffect } from 'react'
import { Users, Building, FileText, Plus, Edit, CheckCircle, AlertTriangle } from 'lucide-react'

const GroupConsortia: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('group-members')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const tabs = [
    { id: 'group-members', label: 'Group Members', icon: Users },
    { id: 'surrenders', label: 'Surrenders', icon: FileText },
    { id: 'claims-allocations', label: 'Claims & Allocations', icon: Building },
    { id: 'letters-elections', label: 'Letters & Elections', icon: Edit }
  ]

  const groupMembers = [
    { id: 1, name: 'Alpha Holdings Ltd', utr: '1234567890', status: 'Active', ownership: '100%', losses: 15000, profits: 0 },
    { id: 2, name: 'Beta Trading Ltd', utr: '2345678901', status: 'Active', ownership: '100%', losses: 0, profits: 45000 },
    { id: 3, name: 'Gamma Services Ltd', utr: '3456789012', status: 'Active', ownership: '100%', losses: 9000, profits: 0 }
  ]

  const surrenders = [
    { id: 1, surrenderingCompany: 'Alpha Holdings Ltd', amount: 15000, period: '2023', status: 'Available', claimingCompany: null },
    { id: 2, surrenderingCompany: 'Gamma Services Ltd', amount: 9000, period: '2023', status: 'Claimed', claimingCompany: 'Beta Trading Ltd' }
  ]

  const claims = [
    { id: 1, claimingCompany: 'Beta Trading Ltd', surrenderingCompany: 'Alpha Holdings Ltd', amount: 15000, taxSaved: 3750, status: 'Claimed' },
    { id: 2, claimingCompany: 'Beta Trading Ltd', surrenderingCompany: 'Gamma Services Ltd', amount: 9000, taxSaved: 2250, status: 'Claimed' }
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
        <h1 className="text-2xl font-bold text-gray-900">Group & Consortia (Group relief)</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Add Member
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <FileText className="w-4 h-4 mr-2 inline" />
            Generate Letters
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
          {activeTab === 'group-members' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 cursor-pointer hover:bg-blue-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Group Members</p>
                      <p className="text-2xl font-bold text-blue-900">{groupMembers.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 cursor-pointer hover:bg-green-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Available Relief</p>
                      <p className="text-2xl font-bold text-green-900">£24,000</p>
                    </div>
                    <FileText className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6 cursor-pointer hover:bg-orange-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Claimed Relief</p>
                      <p className="text-2xl font-bold text-orange-900">£24,000</p>
                    </div>
                    <Building className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-6 cursor-pointer hover:bg-red-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Tax Saved</p>
                      <p className="text-2xl font-bold text-red-900">£6,000</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-red-500" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UTR</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ownership</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Losses</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profits</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {groupMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.utr}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.ownership}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {member.losses > 0 ? `£${member.losses.toLocaleString()}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {member.profits > 0 ? `£${member.profits.toLocaleString()}` : '-'}
                        </td>
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

          {activeTab === 'surrenders' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Loss Surrenders</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surrendering Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claiming Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {surrenders.map((surrender) => (
                      <tr key={surrender.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{surrender.surrenderingCompany}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{surrender.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{surrender.period}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            surrender.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {surrender.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {surrender.claimingCompany || '-'}
                        </td>
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

          {activeTab === 'claims-allocations' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Relief Claims & Allocations</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claiming Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surrendering Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Claimed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Saved</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {claims.map((claim) => (
                      <tr key={claim.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.claimingCompany}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.surrenderingCompany}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{claim.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">£{claim.taxSaved.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {claim.status}
                          </span>
                        </td>
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

          {activeTab === 'letters-elections' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Group Relief Letters & Elections</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-blue-800">Group relief letters must be submitted within 2 years of the end of the surrendering company's accounting period</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Surrender Letters</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">Alpha Holdings Ltd</span>
                      <span className="text-sm font-medium text-green-600">Generated</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">Gamma Services Ltd</span>
                      <span className="text-sm font-medium text-green-600">Generated</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Claim Elections</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">Beta Trading Ltd</span>
                      <span className="text-sm font-medium text-green-600">Submitted</span>
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

export default GroupConsortia

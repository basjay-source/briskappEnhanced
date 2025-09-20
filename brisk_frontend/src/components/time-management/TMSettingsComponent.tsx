import React, { useState, useEffect } from 'react'
import { Save, Clock, DollarSign, FileText, Users } from 'lucide-react'

const TMSettingsComponent: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('time')

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(false)
      } catch (error) {
        console.error('Error fetching settings:', error)
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

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
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Configure time policies, approval rules, and system preferences</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('time')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            activeTab === 'time' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          Time Policies
        </button>
        <button
          onClick={() => setActiveTab('approval')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            activeTab === 'approval' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          Approval Rules
        </button>
        <button
          onClick={() => setActiveTab('invoice')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            activeTab === 'invoice' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          Invoice Templates
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
            activeTab === 'permissions' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
          }`}
        >
          Permissions
        </button>
      </div>

      {activeTab === 'time' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Time Policies</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Rounding</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>6 minutes</option>
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>No rounding</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Time Unit</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>0.1 hours</option>
                <option>0.25 hours</option>
                <option>0.5 hours</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Late Submission Penalty</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>None</option>
                <option>Warning only</option>
                <option>Require approval</option>
                <option>Block submission</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auto-lock Period</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Manual only</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'approval' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Users className="w-5 h-5 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Approval Rules</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Timesheet Approval</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Approval Chain</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Line Manager</option>
                    <option>Line Manager → Partner</option>
                    <option>Partner Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Auto-approve Threshold</label>
                  <input
                    type="number"
                    placeholder="40"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Expense Approval</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Manager Limit</label>
                  <input
                    type="number"
                    placeholder="500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Partner Limit</label>
                  <input
                    type="number"
                    placeholder="2000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Auto-approve Under</label>
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'invoice' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <FileText className="w-5 h-5 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Invoice Templates</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Template</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Standard Invoice</option>
                <option>Detailed Time Invoice</option>
                <option>Summary Invoice</option>
                <option>Fixed Fee Invoice</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Numbering</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Prefix</label>
                  <input
                    type="text"
                    placeholder="INV-"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Next Number</label>
                  <input
                    type="number"
                    placeholder="1001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Net 30</option>
                <option>Net 15</option>
                <option>Net 7</option>
                <option>Due on receipt</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'permissions' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <DollarSign className="w-5 h-5 text-orange-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Permissions</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Rate Visibility</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Staff can see own rates</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Managers can see team rates</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Partners can see all rates</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">WIP Access</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Staff can see own WIP</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Managers can see team WIP</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Partners can see all WIP</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TMSettingsComponent

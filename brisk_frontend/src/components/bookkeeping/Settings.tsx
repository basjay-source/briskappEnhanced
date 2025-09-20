import React, { useState } from 'react'
import { List, Calculator, Hash, Calendar, DollarSign, Users } from 'lucide-react'

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chart-of-accounts')

  const tabs = [
    { id: 'chart-of-accounts', name: 'Chart of Accounts', icon: List },
    { id: 'tax-codes', name: 'Tax Codes', icon: Calculator },
    { id: 'sequences', name: 'Sequences', icon: Hash },
    { id: 'numbering', name: 'Numbering', icon: Hash },
    { id: 'posting-periods', name: 'Posting Periods', icon: Calendar },
    { id: 'currencies', name: 'Currencies', icon: DollarSign },
    { id: 'roles-permissions', name: 'Roles/Permissions', icon: Users }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Import Template
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Export Config
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

      <div className="text-center py-12">
        <p className="text-gray-500">Settings configuration coming soon...</p>
      </div>
    </div>
  )
}

export default Settings

import React, { useState } from 'react'
import { Banknote, Eye, CreditCard, Users, Globe, Key } from 'lucide-react'

const Integrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bank-feeds')

  const tabs = [
    { id: 'bank-feeds', name: 'Bank Feeds', icon: Banknote },
    { id: 'ocr-apps', name: 'OCR Apps', icon: Eye },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'payroll', name: 'Payroll', icon: Users },
    { id: 'hmrc-mtd', name: 'HMRC/MTD', icon: Globe },
    { id: 'cosec-sync', name: 'CoSec Sync', icon: Users },
    { id: 'api-keys', name: 'API Keys', icon: Key }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Add Integration
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Test Connections
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
        <p className="text-gray-500">Integrations functionality coming soon...</p>
      </div>
    </div>
  )
}

export default Integrations

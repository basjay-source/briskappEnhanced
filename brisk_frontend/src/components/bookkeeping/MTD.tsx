import React, { useState } from 'react'
import { Send, FileText, CheckCircle, AlertTriangle, Globe } from 'lucide-react'

const MTD: React.FC = () => {
  const [activeTab, setActiveTab] = useState('vat-mtd')
  const [, ] = useState('')

  const tabs = [
    { id: 'vat-mtd', name: 'VAT MTD', icon: Send },
    { id: 'income-tax-mtd', name: 'Income Tax MTD', icon: FileText },
    { id: 'digital-records', name: 'Digital Records', icon: CheckCircle },
    { id: 'compliance', name: 'Compliance', icon: AlertTriangle },
    { id: 'api-connections', name: 'API Connections', icon: Globe }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">MTD</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Connect HMRC
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Test Connection
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
        <p className="text-gray-500">Making Tax Digital functionality coming soon...</p>
      </div>
    </div>
  )
}

export default MTD

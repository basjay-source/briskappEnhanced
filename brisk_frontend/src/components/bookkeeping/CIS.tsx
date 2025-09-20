import React, { useState } from 'react'
import { HardHat, FileText, Users, Calculator, Send } from 'lucide-react'

const CIS: React.FC = () => {
  const [activeTab, setActiveTab] = useState('contractors')
  const [, ] = useState('')

  const tabs = [
    { id: 'contractors', name: 'Contractors', icon: Users },
    { id: 'subcontractors', name: 'Subcontractors', icon: HardHat },
    { id: 'deductions', name: 'Deductions', icon: Calculator },
    { id: 'returns', name: 'Returns', icon: FileText },
    { id: 'submissions', name: 'Submissions', icon: Send }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">CIS</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            New Contractor
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            CIS Return
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
        <p className="text-gray-500">Construction Industry Scheme functionality coming soon...</p>
      </div>
    </div>
  )
}

export default CIS

import React, { useState } from 'react'
import { Upload, Users, FileText, RefreshCw, Settings } from 'lucide-react'

const PayrollImports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('payroll-journals')

  const tabs = [
    { id: 'payroll-journals', name: 'Payroll Journals', icon: FileText },
    { id: 'employee-sync', name: 'Employee Sync', icon: Users },
    { id: 'benefits-mapping', name: 'Benefits/P11D Mapping', icon: Settings },
    { id: 'import-history', name: 'Import History', icon: Upload },
    { id: 'reconciliation', name: 'Reconciliation', icon: RefreshCw }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Payroll Imports</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Import Payroll
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Sync Employees
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
        <p className="text-gray-500">Payroll imports functionality coming soon...</p>
      </div>
    </div>
  )
}

export default PayrollImports

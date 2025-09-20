import React from 'react'
import { Shield } from 'lucide-react'

const DecisionsHolds: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Decisions, Holds & Escalations</h1>
          <p className="text-gray-600">Decision management and escalation workflows</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Decisions & Holds</h3>
              <p className="text-gray-600">Comprehensive decision tracking and hold management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DecisionsHolds

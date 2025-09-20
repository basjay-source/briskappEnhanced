import React from 'react'
import { Eye } from 'lucide-react'

const EnhancedDueDiligence: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Enhanced Due Diligence (EDD)</h1>
          <p className="text-gray-600">Advanced due diligence for high-risk clients and transactions</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Enhanced Due Diligence</h3>
              <p className="text-gray-600">Comprehensive EDD workflows and documentation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedDueDiligence

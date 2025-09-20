import React from 'react'
import { Building, Plus } from 'lucide-react'

const EntitiesKYB: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Entities (KYB)</h1>
          <p className="text-gray-600">Entity verification and Know Your Business compliance</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Entity KYB Management</h3>
              <p className="text-gray-600 mb-4">Comprehensive entity verification and business compliance</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto">
                <Plus className="w-4 h-4" />
                <span>Add Entity</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntitiesKYB

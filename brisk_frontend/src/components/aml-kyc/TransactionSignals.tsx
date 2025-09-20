import React from 'react'
import { AlertTriangle } from 'lucide-react'

const TransactionSignals: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction Risk Signals</h1>
          <p className="text-gray-600">Transaction monitoring and risk signal detection</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Transaction Signals</h3>
              <p className="text-gray-600">Advanced transaction risk detection and analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionSignals

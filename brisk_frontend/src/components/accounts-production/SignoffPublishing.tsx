import React, { useState, useEffect } from 'react'

const SignoffPublishing: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('workflow')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sign-off & Publishing</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Send for Signatures
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Lock & Version
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'workflow', label: 'Workflow' },
            { id: 'signatures', label: 'Signatures' },
            { id: 'lock-version', label: 'Lock & Version' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'workflow' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Sign-off Workflow</h2>
          <div className="space-y-4">
            {[
              { step: 'Preparer Review', user: 'Jane Doe', status: 'Complete', date: '2024-01-18' },
              { step: 'Manager Review', user: 'John Smith', status: 'Complete', date: '2024-01-19' },
              { step: 'Partner Review', user: 'Sarah Wilson', status: 'In Progress', date: null },
              { step: 'Client Approval', user: 'Client Director', status: 'Pending', date: null }
            ].map((step, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.status === 'Complete' ? 'bg-green-100 text-green-600' :
                    step.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {step.status === 'Complete' ? '✓' : index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{step.step}</h3>
                    <p className="text-sm text-gray-600">{step.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    step.status === 'Complete' ? 'bg-green-100 text-green-800' :
                    step.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {step.status}
                  </span>
                  {step.date && <p className="text-xs text-gray-500 mt-1">{step.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Workflow Steps</h3>
          <p className="text-2xl font-bold text-gray-900">5</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-600">2</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Signatures</h3>
          <p className="text-2xl font-bold text-blue-600">2/3</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Progress</h3>
          <p className="text-2xl font-bold text-orange-600">60%</p>
        </div>
      </div>
    </div>
  )
}

export default SignoffPublishing

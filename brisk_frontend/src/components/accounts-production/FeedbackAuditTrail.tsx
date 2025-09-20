import React, { useState, useEffect } from 'react'

const FeedbackAuditTrail: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('review-points')

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
        <h1 className="text-2xl font-bold text-gray-900">Feedback & Audit Trail</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Add Review Point
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export Audit Trail
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'review-points', label: 'Review Points' },
            { id: 'change-log', label: 'Change Log' },
            { id: 'sign-offs', label: 'Sign-offs' }
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

      {activeTab === 'review-points' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Review Points & Comments</h2>
          <div className="space-y-4">
            {[
              {
                id: '1',
                section: 'Notes & Disclosures',
                point: 'Related party transactions disclosure incomplete',
                author: 'Sarah Wilson',
                date: '2024-01-19',
                status: 'Open',
                priority: 'High'
              },
              {
                id: '2',
                section: 'Cash Flow',
                point: 'Working capital movement calculation needs verification',
                author: 'John Smith',
                date: '2024-01-18',
                status: 'Resolved',
                priority: 'Medium'
              }
            ].map((point) => (
              <div key={point.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-900">{point.section}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        point.priority === 'High' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {point.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        point.status === 'Open' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {point.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{point.point}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>By {point.author}</span>
                      <span>{point.date}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 text-sm">Reply</button>
                    <button className="text-green-600 hover:text-green-900 text-sm">Resolve</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Review Points</h3>
          <p className="text-2xl font-bold text-gray-900">3</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Open Issues</h3>
          <p className="text-2xl font-bold text-red-600">1</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Changes Made</h3>
          <p className="text-2xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Sign-offs</h3>
          <p className="text-2xl font-bold text-green-600">2/4</p>
        </div>
      </div>
    </div>
  )
}

export default FeedbackAuditTrail

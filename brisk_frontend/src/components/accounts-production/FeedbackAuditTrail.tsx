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

      {activeTab === 'change-log' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Change Log & Audit Trail</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-4">
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>All Changes</option>
                  <option>Data Changes</option>
                  <option>Status Changes</option>
                  <option>User Actions</option>
                </select>
                <input 
                  type="date" 
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Export Log
              </button>
            </div>
            <div className="space-y-3">
              {[
                {
                  timestamp: '2024-01-20 14:30:15',
                  user: 'Sarah Wilson',
                  action: 'Updated',
                  section: 'Notes & Disclosures',
                  details: 'Modified related party transactions note',
                  type: 'Data Change'
                },
                {
                  timestamp: '2024-01-20 11:45:22',
                  user: 'John Smith',
                  action: 'Approved',
                  section: 'Cash Flow Statement',
                  details: 'Approved working capital adjustments',
                  type: 'Status Change'
                },
                {
                  timestamp: '2024-01-19 16:20:08',
                  user: 'Jane Doe',
                  action: 'Created',
                  section: 'Adjustments',
                  details: 'Added year-end accrual adjustment YE001',
                  type: 'Data Change'
                },
                {
                  timestamp: '2024-01-19 09:15:33',
                  user: 'Michael Brown',
                  action: 'Exported',
                  section: 'Trial Balance',
                  details: 'Exported TB to Excel for review',
                  type: 'User Action'
                }
              ].map((log, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      log.type === 'Data Change' ? 'bg-blue-100 text-blue-600' :
                      log.type === 'Status Change' ? 'bg-green-100 text-green-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {log.action.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{log.action}</span>
                      <span className="text-sm text-gray-600">{log.section}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.type === 'Data Change' ? 'bg-blue-100 text-blue-800' :
                        log.type === 'Status Change' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {log.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{log.details}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>By {log.user}</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sign-offs' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Sign-offs & Approvals</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Required Sign-offs</h3>
                <div className="space-y-3">
                  {[
                    { 
                      role: 'Preparer', 
                      user: 'Jane Doe', 
                      section: 'All Sections', 
                      status: 'Complete', 
                      date: '2024-01-18',
                      certificate: 'PREP-2024-001'
                    },
                    { 
                      role: 'Reviewer', 
                      user: 'John Smith', 
                      section: 'Financial Statements', 
                      status: 'Complete', 
                      date: '2024-01-19',
                      certificate: 'REV-2024-001'
                    },
                    { 
                      role: 'Partner', 
                      user: 'Sarah Wilson', 
                      section: 'Final Review', 
                      status: 'Pending', 
                      date: null,
                      certificate: null
                    }
                  ].map((signoff, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium text-gray-900">{signoff.role}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              signoff.status === 'Complete' ? 'bg-green-100 text-green-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {signoff.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{signoff.user} - {signoff.section}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            {signoff.date && <span>{signoff.date}</span>}
                            {signoff.certificate && <span>Cert: {signoff.certificate}</span>}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {signoff.status === 'Complete' && (
                            <button className="text-blue-600 hover:text-blue-900 text-sm">View Certificate</button>
                          )}
                          {signoff.status === 'Pending' && (
                            <button className="text-green-600 hover:text-green-900 text-sm">Sign Off</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Sign-off Requirements</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Preparer Checklist</h4>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" defaultChecked />
                        <span className="ml-2 text-gray-700">Trial balance imported and mapped</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" defaultChecked />
                        <span className="ml-2 text-gray-700">All adjustments posted</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" defaultChecked />
                        <span className="ml-2 text-gray-700">Notes and disclosures complete</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <span className="ml-2 text-gray-700">Working papers filed</span>
                      </label>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Reviewer Checklist</h4>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                        <span className="ml-2 text-gray-700">Financial statements reviewed</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                        <span className="ml-2 text-gray-700">Adjustments verified</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-gray-700">Compliance checks complete</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-gray-700">Quality review passed</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Complete Sign-off
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Generate Certificates
              </button>
              <button className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                Export Sign-off Report
              </button>
            </div>
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

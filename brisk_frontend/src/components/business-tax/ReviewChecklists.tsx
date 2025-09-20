import React, { useState, useEffect } from 'react'
import { CheckCircle, AlertTriangle, FileText, Eye, Download, Edit } from 'lucide-react'

const ReviewChecklists: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('exceptions')
  const [reviewData, setReviewData] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setReviewData({
        exceptions: [
          { id: 1, type: 'error', title: 'Missing R&D project details', description: 'Project ABC123 requires technical narrative', section: 'R&D Reliefs', priority: 'High' },
          { id: 2, type: 'warning', title: 'Unusual capital allowances rate', description: 'Special rate pool showing 8% instead of 6%', section: 'Capital Allowances', priority: 'Medium' }
        ],
        checklists: [
          { id: 'capital-allowances', name: 'Capital Allowances', completed: 8, total: 10, status: 'in-progress' },
          { id: 'losses', name: 'Losses & Reliefs', completed: 5, total: 5, status: 'complete' },
          { id: 'group-relief', name: 'Group Relief', completed: 3, total: 4, status: 'in-progress' },
          { id: 'cir', name: 'Corporate Interest Restriction', completed: 0, total: 6, status: 'not-started' },
          { id: 'rd', name: 'R&D Claims', completed: 7, total: 8, status: 'in-progress' },
          { id: 'transfer-pricing', name: 'Transfer Pricing', completed: 4, total: 4, status: 'complete' },
          { id: 'chargeable-gains', name: 'Chargeable Gains', completed: 3, total: 3, status: 'complete' }
        ],
        repLetter: {
          status: 'draft',
          lastModified: '2024-01-16',
          signedBy: null,
          signedDate: null
        }
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Review & Checklists</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Run Full Review
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Generate Rep Letter
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'exceptions', label: 'Exceptions' },
            { id: 'checklists', label: 'Disclosure/Tax Checklists' },
            { id: 'rep-letter', label: 'Representation Letter' }
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

      {activeTab === 'exceptions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Errors</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviewData.exceptions.filter((e: any) => e.type === 'error').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Warnings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviewData.exceptions.filter((e: any) => e.type === 'warning').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Outstanding Exceptions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {reviewData.exceptions.map((exception: any) => (
                  <div key={exception.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-1 ${
                          exception.type === 'error' ? 'bg-red-500' : 'bg-orange-500'
                        }`}></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{exception.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{exception.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">Section: {exception.section}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              exception.priority === 'High' ? 'bg-red-100 text-red-800' :
                              exception.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {exception.priority} Priority
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                          Resolve
                        </button>
                        <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                          Ignore
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'checklists' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Complete</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviewData.checklists.filter((c: any) => c.status === 'complete').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviewData.checklists.filter((c: any) => c.status === 'in-progress').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Not Started</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviewData.checklists.filter((c: any) => c.status === 'not-started').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Tax & Disclosure Checklists</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {reviewData.checklists.map((checklist: any) => (
                  <div key={checklist.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${
                          checklist.status === 'complete' ? 'bg-green-500' :
                          checklist.status === 'in-progress' ? 'bg-orange-500' :
                          'bg-gray-300'
                        }`}></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{checklist.name}</h4>
                          <p className="text-sm text-gray-600">
                            {checklist.completed} of {checklist.total} items completed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              checklist.status === 'complete' ? 'bg-green-500' :
                              checklist.status === 'in-progress' ? 'bg-orange-500' :
                              'bg-gray-300'
                            }`}
                            style={{ width: `${(checklist.completed / checklist.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                          {Math.round((checklist.completed / checklist.total) * 100)}%
                        </span>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                          Review
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rep-letter' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Management Representation Letter</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{reviewData.repLetter.status}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Last Modified</p>
                    <p className="text-lg font-semibold text-gray-900">{reviewData.repLetter.lastModified}</p>
                  </div>
                </div>

                {reviewData.repLetter.status === 'draft' ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Representation letter is in draft</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Review and finalize the letter before sending for signature
                    </p>
                    <div className="flex justify-center space-x-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </button>
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2">
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        Send for Signature
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <h4 className="font-medium text-green-900">Letter Signed</h4>
                        <p className="text-sm text-green-700">
                          Signed by {reviewData.repLetter.signedBy} on {reviewData.repLetter.signedDate}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Representation Letter Contents</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Completeness and accuracy of financial information</li>
                    <li>• Disclosure of all material transactions</li>
                    <li>• Confirmation of tax positions taken</li>
                    <li>• Related party transaction disclosures</li>
                    <li>• Subsequent events confirmation</li>
                    <li>• Management's responsibility statements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewChecklists

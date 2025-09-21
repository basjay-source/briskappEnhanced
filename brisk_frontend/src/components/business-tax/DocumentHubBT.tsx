import React, { useState, useEffect } from 'react'

const DocumentHubBT: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('documents')

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
        <h1 className="text-2xl font-bold text-gray-900">Document Hub</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Upload Document
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Create Folder
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'documents', label: 'Documents' },
            { id: 'workpapers', label: 'Workpapers' },
            { id: 'correspondence', label: 'Correspondence' },
            { id: 'archive', label: 'Archive' }
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

      {activeTab === 'documents' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Tax Documents</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 border rounded-lg hover:shadow-md cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">CT600 Forms</h3>
                    <p className="text-sm text-gray-500">12 files</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg hover:shadow-md cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Computations</h3>
                    <p className="text-sm text-gray-500">8 files</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg hover:shadow-md cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4m-6-4v.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Supporting Docs</h3>
                    <p className="text-sm text-gray-500">24 files</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg hover:shadow-md cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">HMRC Correspondence</h3>
                    <p className="text-sm text-gray-500">6 files</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CT600 2023.pdf</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Corporation Tax Return</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">15 Jan 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">2.4 MB</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-900 text-sm mr-2">View</button>
                      <button className="text-green-600 hover:text-green-900 text-sm mr-2">Download</button>
                      <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tax Computation.xlsx</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Computation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">12 Jan 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">856 KB</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-900 text-sm mr-2">View</button>
                      <button className="text-green-600 hover:text-green-900 text-sm mr-2">Download</button>
                      <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">HMRC Acknowledgement.pdf</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Correspondence</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">20 Jan 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">124 KB</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-900 text-sm mr-2">View</button>
                      <button className="text-green-600 hover:text-green-900 text-sm mr-2">Download</button>
                      <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Documents</h3>
          <p className="text-2xl font-bold text-blue-600">50</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Storage Used</h3>
          <p className="text-2xl font-bold text-green-600">124 MB</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Recent Uploads</h3>
          <p className="text-2xl font-bold text-orange-600">8</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Shared Files</h3>
          <p className="text-2xl font-bold text-purple-600">12</p>
        </div>
      </div>
    </div>
  )
}

export default DocumentHubBT

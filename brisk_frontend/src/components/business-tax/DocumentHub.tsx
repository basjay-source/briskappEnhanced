import React, { useState, useEffect } from 'react'
import { FileText, Upload, Download, Eye, Search } from 'lucide-react'

const DocumentHub: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('working-papers')
  const [documentsData, setDocumentsData] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setDocumentsData({
        workingPapers: [
          { name: 'Capital Allowances Workings', type: 'Excel', size: '1.2 MB', lastModified: '2024-01-15' },
          { name: 'R&D Claim Calculations', type: 'Excel', size: '0.8 MB', lastModified: '2024-01-14' },
          { name: 'Group Relief Workings', type: 'PDF', size: '0.5 MB', lastModified: '2024-01-13' }
        ],
        letters: [
          { name: 'Group Relief Surrender Letter', type: 'PDF', size: '0.3 MB', lastModified: '2024-01-16' },
          { name: 'R&D Election Letter', type: 'PDF', size: '0.2 MB', lastModified: '2024-01-12' }
        ],
        evidence: [
          { name: 'Filed CT600', type: 'PDF', size: '2.1 MB', lastModified: '2024-01-16' },
          { name: 'HMRC Acknowledgement', type: 'PDF', size: '0.1 MB', lastModified: '2024-01-16' },
          { name: 'iXBRL Accounts', type: 'HTML', size: '2.4 MB', lastModified: '2024-01-15' }
        ]
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
        <h1 className="text-2xl font-bold text-gray-900">Document Hub</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'working-papers', label: 'Working Papers' },
            { id: 'letters', label: 'Letters & Elections' },
            { id: 'evidence', label: 'Filing Evidence' }
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

      {activeTab === 'working-papers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Working Papers</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {documentsData.workingPapers.map((doc: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600">{doc.type} • {doc.size} • Modified {doc.lastModified}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload working papers</p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Choose Files
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'letters' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Letters & Elections</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {documentsData.letters.map((doc: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-6 h-6 text-green-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600">{doc.type} • {doc.size} • Modified {doc.lastModified}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload letters and elections</p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Choose Files
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'evidence' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Filing Evidence</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {documentsData.evidence.map((doc: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-6 h-6 text-orange-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600">{doc.type} • {doc.size} • Modified {doc.lastModified}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentHub

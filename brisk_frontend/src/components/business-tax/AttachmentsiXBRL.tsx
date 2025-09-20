import React, { useState, useEffect } from 'react'
import { Upload, FileText, CheckCircle, AlertTriangle, Download, Eye } from 'lucide-react'

const AttachmentsiXBRL: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('accounts')
  const [attachmentsData, setAttachmentsData] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setAttachmentsData({
        accounts: {
          status: 'attached',
          filename: 'annual_accounts_2023.html',
          size: '2.4 MB',
          lastModified: '2024-01-15',
          validation: 'passed'
        },
        computation: {
          status: 'attached',
          filename: 'ct_computation_2023.html',
          size: '1.2 MB',
          lastModified: '2024-01-16',
          validation: 'passed'
        },
        supportingDocs: [
          { name: 'Group Relief Letter', filename: 'group_relief_letter.pdf', size: '0.8 MB', status: 'attached' },
          { name: 'R&D Report', filename: 'rd_report_2023.pdf', size: '1.5 MB', status: 'attached' },
          { name: 'Capital Allowances Schedule', filename: 'ca_schedule.pdf', size: '0.6 MB', status: 'attached' },
          { name: 'Transfer Pricing Documentation', filename: 'tp_docs.pdf', size: '2.1 MB', status: 'pending' }
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
            {[...Array(4)].map((_, i) => (
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
        <h1 className="text-2xl font-bold text-gray-900">Attachments & iXBRL</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Validate All</span>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'accounts', label: 'Accounts (iXBRL)' },
            { id: 'computation', label: 'Computation (iXBRL/PDF)' },
            { id: 'supporting', label: 'Supporting Docs' }
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

      {activeTab === 'accounts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Annual Accounts (iXBRL)</h3>
            </div>
            <div className="p-6">
              {attachmentsData.accounts.status === 'attached' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="font-medium text-green-900">Accounts Attached</h4>
                        <p className="text-sm text-green-700">{attachmentsData.accounts.filename}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-green-600 hover:text-green-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:text-green-800">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-600">File Size</p>
                      <p className="text-lg font-semibold text-gray-900">{attachmentsData.accounts.size}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-600">Last Modified</p>
                      <p className="text-lg font-semibold text-gray-900">{attachmentsData.accounts.lastModified}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-600">Validation</p>
                      <p className="text-lg font-semibold text-green-600">Passed</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">iXBRL Validation Results</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>✓ Schema validation passed</li>
                      <li>✓ Taxonomy validation passed</li>
                      <li>✓ Business rules validation passed</li>
                      <li>✓ All mandatory tags present</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No accounts attached</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Upload the iXBRL annual accounts from Accounts Production
                  </p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Attach from Accounts Production
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'computation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Corporation Tax Computation</h3>
            </div>
            <div className="p-6">
              {attachmentsData.computation.status === 'attached' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="font-medium text-green-900">Computation Attached</h4>
                        <p className="text-sm text-green-700">{attachmentsData.computation.filename}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-green-600 hover:text-green-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:text-green-800">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Format Options</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="radio" name="format" value="ixbrl" className="mr-2" defaultChecked />
                          <span className="text-sm">iXBRL (Recommended)</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="format" value="pdf" className="mr-2" />
                          <span className="text-sm">PDF (Legacy)</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Generation Options</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className="text-sm">Include working notes</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className="text-sm">Include supporting schedules</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Regenerate Computation
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No computation attached</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Generate the CT computation from the completed sections
                  </p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Generate Computation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'supporting' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Supporting Documents</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {attachmentsData.supportingDocs.map((doc: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        doc.status === 'attached' ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600">{doc.filename} • {doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {doc.status === 'attached' ? (
                        <>
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Attached
                          </span>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Download className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                            Pending
                          </span>
                          <button className="p-1 text-blue-600 hover:text-blue-800">
                            <Upload className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Add additional supporting documents</p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Upload Document
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Attached</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {attachmentsData.supportingDocs.filter((d: any) => d.status === 'attached').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {attachmentsData.supportingDocs.filter((d: any) => d.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{attachmentsData.supportingDocs.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AttachmentsiXBRL

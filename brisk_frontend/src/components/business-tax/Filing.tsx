import React, { useState, useEffect } from 'react'
import { Send, Wifi, WifiOff, CheckCircle, AlertTriangle, FileText, Eye } from 'lucide-react'

const Filing: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('connection')
  const [filingData, setFilingData] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setFilingData({
        connection: {
          status: 'connected',
          lastChecked: '2024-01-16 10:30:00',
          environment: 'Production'
        },
        validation: {
          errors: 0,
          warnings: 1,
          status: 'Ready to file'
        },
        filing: {
          status: 'not-filed',
          canFile: true,
          filedDate: null,
          acknowledgement: null
        },
        acknowledgements: []
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
        <h1 className="text-2xl font-bold text-gray-900">Filing</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Test Connection
          </button>
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
            disabled={!filingData.filing.canFile}
          >
            <Send className="w-4 h-4" />
            <span>File Return</span>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'connection', label: 'HMRC Connection' },
            { id: 'validate', label: 'Validate' },
            { id: 'file', label: 'e-File' },
            { id: 'acknowledgements', label: 'Acknowledgements' }
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

      {activeTab === 'connection' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${
              filingData.connection.status === 'connected' ? 'border-green-500' : 'border-red-500'
            }`}>
              <div className="flex items-center">
                {filingData.connection.status === 'connected' ? (
                  <Wifi className="w-8 h-8 text-green-600" />
                ) : (
                  <WifiOff className="w-8 h-8 text-red-600" />
                )}
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Connection Status</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">{filingData.connection.status}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Environment</p>
                  <p className="text-lg font-bold text-gray-900">{filingData.connection.environment}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Connection Details</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Last Connection Check</span>
                  <span className="font-medium">{filingData.connection.lastChecked}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">HMRC Gateway Status</span>
                  <span className="font-medium text-green-600">Online</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Authentication</span>
                  <span className="font-medium text-green-600">Valid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'validate' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Errors</p>
                  <p className="text-2xl font-bold text-gray-900">{filingData.validation.errors}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Warnings</p>
                  <p className="text-2xl font-bold text-gray-900">{filingData.validation.warnings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-lg font-bold text-gray-900">{filingData.validation.status}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Validation Results</h3>
            </div>
            <div className="p-6">
              {filingData.validation.errors === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600">No validation errors found</p>
                  <p className="text-sm text-gray-500 mt-2">
                    CT600 is ready for filing
                  </p>
                  <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Proceed to Filing
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Validation errors would be displayed here */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'file' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">e-Filing</h3>
            </div>
            <div className="p-6">
              {filingData.filing.status === 'not-filed' ? (
                <div className="text-center py-8">
                  <Send className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Ready to file CT600</p>
                  <p className="text-sm text-gray-500 mb-4">
                    All validations passed. Click below to submit to HMRC.
                  </p>
                  <button 
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-lg font-medium"
                    disabled={!filingData.filing.canFile}
                  >
                    Submit to HMRC
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-900">Return Filed Successfully</h4>
                      <p className="text-sm text-green-700">
                        Filed on {filingData.filing.filedDate}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Filing Checklist</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ CT600 completed and validated</li>
              <li>✓ All required schedules attached</li>
              <li>✓ iXBRL accounts attached</li>
              <li>✓ Supporting documents uploaded</li>
              <li>✓ HMRC connection established</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'acknowledgements' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Filing Acknowledgements</h3>
            </div>
            <div className="p-6">
              {filingData.acknowledgements.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No acknowledgements received</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Acknowledgements will appear here after filing
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filingData.acknowledgements.map((ack: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{ack.type}</h4>
                          <p className="text-sm text-gray-600">{ack.reference}</p>
                          <p className="text-xs text-gray-500">{ack.timestamp}</p>
                        </div>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filing

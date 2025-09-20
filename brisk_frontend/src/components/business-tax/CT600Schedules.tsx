import React, { useState, useEffect } from 'react'
import { FileText, CheckCircle, AlertTriangle, Eye, Download, Upload } from 'lucide-react'

const CT600Schedules: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('header')
  const [ct600Data, setCt600Data] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setCt600Data({
        header: {
          companyName: 'Example Trading Ltd',
          companyNumber: '12345678',
          utr: '1234567890',
          apStart: '2023-01-01',
          apEnd: '2023-12-31',
          returnType: 'Company Tax Return'
        },
        schedules: [
          { id: 'CT600A', name: 'Loans to participators', required: false, completed: false },
          { id: 'CT600B', name: 'Controlled foreign companies', required: false, completed: false },
          { id: 'CT600C', name: 'Group and consortium relief', required: true, completed: true },
          { id: 'CT600D', name: 'Insurance companies', required: false, completed: false },
          { id: 'CT600E', name: 'Charities', required: false, completed: false },
          { id: 'CT600F', name: 'Tonnage tax', required: false, completed: false },
          { id: 'CT600G', name: 'Research and development', required: true, completed: true },
          { id: 'CT600H', name: 'Corporate interest restriction', required: false, completed: false },
          { id: 'CT600I', name: 'Hybrid and other mismatches', required: false, completed: false },
          { id: 'CT600J', name: 'Disclosure of tax avoidance schemes', required: false, completed: false }
        ],
        validation: {
          errors: 0,
          warnings: 2,
          status: 'Ready to file'
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
        <h1 className="text-2xl font-bold text-gray-900">CT600 & Schedules</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'header', label: 'Header' },
            { id: 'schedules', label: 'Schedules' },
            { id: 'validation', label: 'Validation' },
            { id: 'attachments', label: 'Attachments Index' }
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

      {activeTab === 'header' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">CT600 Header Information</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <div className="mt-1 text-sm text-gray-900">{ct600Data.header.companyName}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Number</label>
                  <div className="mt-1 text-sm text-gray-900">{ct600Data.header.companyNumber}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">UTR</label>
                  <div className="mt-1 text-sm text-gray-900">{ct600Data.header.utr}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Return Type</label>
                  <div className="mt-1 text-sm text-gray-900">{ct600Data.header.returnType}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Accounting Period Start</label>
                  <div className="mt-1 text-sm text-gray-900">{ct600Data.header.apStart}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Accounting Period End</label>
                  <div className="mt-1 text-sm text-gray-900">{ct600Data.header.apEnd}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Main CT600 Sections</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Trading/Non-trading Income',
                  'Chargeable Gains',
                  'Losses and Reliefs',
                  'Corporation Tax Calculation',
                  'Tax Reconciliation',
                  'Payments and Liabilities'
                ].map((section, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">{section}</span>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'schedules' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">CT600 Schedules</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {ct600Data.schedules.map((schedule: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        schedule.completed ? 'bg-green-500' : 
                        schedule.required ? 'bg-orange-500' : 'bg-gray-300'
                      }`}></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{schedule.id}</h4>
                        <p className="text-sm text-gray-600">{schedule.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {schedule.required && (
                        <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                          Required
                        </span>
                      )}
                      {schedule.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : schedule.required ? (
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ct600Data.schedules.filter((s: any) => s.completed).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Required</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ct600Data.schedules.filter((s: any) => s.required && !s.completed).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-gray-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{ct600Data.schedules.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'validation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Errors</p>
                  <p className="text-2xl font-bold text-gray-900">{ct600Data.validation.errors}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Warnings</p>
                  <p className="text-2xl font-bold text-gray-900">{ct600Data.validation.warnings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-lg font-bold text-gray-900">{ct600Data.validation.status}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Validation Results</h3>
            </div>
            <div className="p-6">
              {ct600Data.validation.errors === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600">No validation errors found</p>
                  <p className="text-sm text-gray-500 mt-2">
                    CT600 is ready for filing
                  </p>
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

      {activeTab === 'attachments' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Attachments Index</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: 'Annual Accounts (iXBRL)', type: 'iXBRL', size: '2.4 MB', status: 'Attached' },
                  { name: 'Corporation Tax Computation', type: 'PDF', size: '1.2 MB', status: 'Attached' },
                  { name: 'Group Relief Letter', type: 'PDF', size: '0.8 MB', status: 'Attached' },
                  { name: 'R&D Report', type: 'PDF', size: '1.5 MB', status: 'Attached' }
                ].map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{attachment.name}</h4>
                        <p className="text-sm text-gray-600">{attachment.type} • {attachment.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {attachment.status}
                      </span>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Add additional attachments</p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Upload File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CT600Schedules

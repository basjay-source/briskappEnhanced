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
        <h1 className="text-2xl font-bold text-gray-900">Sign-off &amp; Publishing</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Send for Signatures
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Lock &amp; Version
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

      {activeTab === 'signatures' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">E-Signature Management</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Required Signatures</h3>
                <div className="space-y-3">
                  {[
                    { role: 'Director', name: 'John Smith', status: 'Signed', date: '2024-01-19' },
                    { role: 'Company Secretary', name: 'Sarah Wilson', status: 'Pending', date: null },
                    { role: 'Auditor', name: 'Michael Brown', status: 'Pending', date: null }
                  ].map((sig, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{sig.role}</p>
                        <p className="text-sm text-gray-600">{sig.name}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          sig.status === 'Signed' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {sig.status}
                        </span>
                        {sig.date && <p className="text-xs text-gray-500 mt-1">{sig.date}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Signature Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Signature Method
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option>DocuSign</option>
                      <option>Adobe Sign</option>
                      <option>HelloSign</option>
                      <option>Manual Upload</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Signature Font Style
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" style={{fontFamily: 'var(--selected-font, inherit)'}}>
                      <option value="Allura" style={{fontFamily: 'Allura, cursive'}}>Allura</option>
                      <option value="Dancing Script" style={{fontFamily: 'Dancing Script, cursive'}}>Dancing Script</option>
                      <option value="Great Vibes" style={{fontFamily: 'Great Vibes, cursive'}}>Great Vibes</option>
                      <option value="Pacifico" style={{fontFamily: 'Pacifico, cursive'}}>Pacifico</option>
                      <option value="Satisfy" style={{fontFamily: 'Satisfy, cursive'}}>Satisfy</option>
                      <option value="Kaushan Script" style={{fontFamily: 'Kaushan Script, cursive'}}>Kaushan Script</option>
                      <option value="Amatic SC" style={{fontFamily: 'Amatic SC, cursive'}}>Amatic SC</option>
                      <option value="Caveat" style={{fontFamily: 'Caveat, cursive'}}>Caveat</option>
                      <option value="Courgette" style={{fontFamily: 'Courgette, cursive'}}>Courgette</option>
                      <option value="Handlee" style={{fontFamily: 'Handlee, cursive'}}>Handlee</option>
                      <option value="Indie Flower" style={{fontFamily: 'Indie Flower, cursive'}}>Indie Flower</option>
                      <option value="Kalam" style={{fontFamily: 'Kalam, cursive'}}>Kalam</option>
                      <option value="Leckerli One" style={{fontFamily: 'Leckerli One, cursive'}}>Leckerli One</option>
                      <option value="Lobster" style={{fontFamily: 'Lobster, cursive'}}>Lobster</option>
                      <option value="Marck Script" style={{fontFamily: 'Marck Script, cursive'}}>Marck Script</option>
                      <option value="Permanent Marker" style={{fontFamily: 'Permanent Marker, cursive'}}>Permanent Marker</option>
                      <option value="Shadows Into Light" style={{fontFamily: 'Shadows Into Light, cursive'}}>Shadows Into Light</option>
                      <option value="Tangerine" style={{fontFamily: 'Tangerine, cursive'}}>Tangerine</option>
                      <option value="Yellowtail" style={{fontFamily: 'Yellowtail, cursive'}}>Yellowtail</option>
                      <option value="Zeyada" style={{fontFamily: 'Zeyada, cursive'}}>Zeyada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reminder Frequency
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option>Daily</option>
                      <option>Every 3 days</option>
                      <option>Weekly</option>
                      <option>Manual only</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Require authentication</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                      <span className="ml-2 text-sm text-gray-700">Sequential signing</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Send Reminders
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Download Signed Documents
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'lock-version' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Lock &amp; Version Control</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Document Versions</h3>
                <div className="space-y-3">
                  {[
                    { version: 'v1.0', date: '2024-01-15', user: 'Jane Doe', status: 'Draft', locked: false },
                    { version: 'v1.1', date: '2024-01-18', user: 'John Smith', status: 'Review', locked: false },
                    { version: 'v2.0', date: '2024-01-20', user: 'Sarah Wilson', status: 'Final', locked: true }
                  ].map((version, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{version.version}</p>
                        <p className="text-sm text-gray-600">{version.date} by {version.user}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          version.status === 'Final' ? 'bg-green-100 text-green-800' :
                          version.status === 'Review' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {version.status}
                        </span>
                        {version.locked && (
                          <span className="text-red-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Lock Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lock Level
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option>Read Only</option>
                      <option>Partner Override</option>
                      <option>Full Lock</option>
                      <option>Audit Lock</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto-lock Trigger
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option>Manual only</option>
                      <option>After filing</option>
                      <option>After client approval</option>
                      <option>After final review</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Prevent deletion</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Audit trail required</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                      <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Lock Current Version
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Create New Version
              </button>
              <button className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                Export Version History
              </button>
            </div>
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

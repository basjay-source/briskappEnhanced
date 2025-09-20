import React, { useState, useEffect } from 'react'

const DirectorsGovernance: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('directors-report')

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
        <h1 className="text-2xl font-bold text-gray-900">Directors & Governance</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Import from CoSec
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Generate Reports
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'directors-report', label: 'Directors\' Report' },
            { id: 'strategic-report', label: 'Strategic Report' },
            { id: 'auditors-report', label: 'Auditor\'s Report' },
            { id: 'going-concern', label: 'Going Concern' }
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

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          {activeTab === 'directors-report' && 'Directors\' Report'}
          {activeTab === 'strategic-report' && 'Strategic Report'}
          {activeTab === 'auditors-report' && 'Auditor\'s Report'}
          {activeTab === 'going-concern' && 'Going Concern Assessment'}
        </h2>
        
        {activeTab === 'directors-report' && (
          <div className="space-y-4">
            <textarea
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter directors' report content..."
              defaultValue="The directors present their report and the audited financial statements for the year ended 31 December 2023.

PRINCIPAL ACTIVITIES
The company's principal activity during the year was software development and consulting services.

RESULTS AND DIVIDENDS
The profit for the year, after taxation, amounted to £125,000 (2022: £98,000).

DIRECTORS
The directors who served during the year were:
- John Smith (Managing Director)
- Jane Doe (Finance Director)

DIRECTORS' RESPONSIBILITIES
The directors are responsible for preparing the Directors' Report and the financial statements in accordance with applicable law and regulations."
            />
          </div>
        )}

        {activeTab === 'going-concern' && (
          <div className="space-y-4">
            <textarea
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter going concern assessment..."
              defaultValue="GOING CONCERN ASSESSMENT

The directors have assessed the company's ability to continue as a going concern for a period of at least twelve months from the date of approval of these financial statements.

FINANCIAL POSITION
As at 31 December 2023, the company had:
- Cash at bank: £35,000
- Net current assets: £97,000
- No bank borrowings

CONCLUSION
Based on this assessment, the directors have a reasonable expectation that the company has adequate resources to continue in operational existence for the foreseeable future."
            />
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Approve
          </button>
        </div>
      </div>
    </div>
  )
}

export default DirectorsGovernance

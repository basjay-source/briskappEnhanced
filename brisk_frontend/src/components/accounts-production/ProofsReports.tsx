import React, { useState, useEffect } from 'react'

const ProofsReports: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('draft-accounts')

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
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Proofs & Reports</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate Draft Accounts
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Create Management Pack
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
            CCAB Reports
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'draft-accounts', label: 'Draft Accounts' },
            { id: 'management-pack', label: 'Management Pack' },
            { id: 'ccab-reports', label: 'CCAB Reports' },
            { id: 'standard-reports', label: 'Standard Reports' },
            { id: 'highlights-cover', label: 'Highlights & Cover' },
            { id: 'styles', label: 'Styles' }
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

      {activeTab === 'ccab-reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">CCAB Standard Reports</h2>
            <p className="text-sm text-gray-600 mb-6">
              Consultative Committee of Accountancy Bodies (CCAB) standard reporting templates and formats.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'CCAB Financial Statements', description: 'Standard format financial statements', status: 'Available' },
                { name: 'CCAB Directors Report', description: 'Standard directors report template', status: 'Available' },
                { name: 'CCAB Audit Report', description: 'Standard audit report formats', status: 'Available' },
                { name: 'CCAB Small Company', description: 'Small company exemptions format', status: 'Available' },
                { name: 'CCAB Micro Entity', description: 'Micro entity reporting format', status: 'Available' },
                { name: 'CCAB Group Accounts', description: 'Consolidated accounts format', status: 'Available' },
                { name: 'CCAB LLP Accounts', description: 'Limited liability partnership format', status: 'Available' },
                { name: 'CCAB Charity Accounts', description: 'Charity reporting format', status: 'Available' },
                { name: 'CCAB Management Accounts', description: 'Management reporting templates', status: 'Available' }
              ].map((report, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-gray-900 mb-2">{report.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{report.status}</span>
                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">Generate</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'standard-reports' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Standard Format Reports</h3>
            <p className="text-blue-700">
              Generate reports in standard format for seamless integration with accounting software and compliance requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Trial Balance', description: 'Current period trial balance in standard format', status: 'Available', type: 'Current Period' },
              { name: 'Multi Year Trial Balance', description: 'Trial balance comparison up to 5 years', status: 'Available', type: 'Up to 5 Years' },
              { name: 'Nominal Ledger', description: 'Detailed nominal ledger transactions', status: 'Available', type: 'Detailed' },
              { name: 'Lead Schedules', description: 'Lead schedules and working papers', status: 'Available', type: 'Lead Schedules' },
              { name: 'Schedules', description: 'Working paper schedules and analysis', status: 'Available', type: 'Working Papers' },
              { name: 'Journal Entries', description: 'All journal entries for the period', status: 'Available', type: 'All Periods' },
              { name: 'Abbreviated Accounts', description: 'Small company abbreviated accounts', status: 'Available', type: 'Small Company' },
              { name: 'Consolidated Accounts', description: 'Group consolidated accounts', status: 'Available', type: 'Group' },
              { name: 'Filleted Accounts', description: 'Public filing version of accounts', status: 'Available', type: 'Public Filing' },
              { name: 'Full Accounts', description: 'Complete statutory accounts', status: 'Available', type: 'Complete' },
              { name: 'Dormant Accounts', description: 'Dormant company accounts', status: 'Available', type: 'Dormant Company' }
            ].map((report, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-900 mb-2">{report.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                <p className="text-xs text-gray-500 mb-3">Type: {report.type}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{report.status}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700">
                    Generate
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                    Export
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Report Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Multi-Year Range
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Current + 1 Prior Year</option>
                  <option>Current + 2 Prior Years</option>
                  <option>Current + 3 Prior Years</option>
                  <option>Current + 4 Prior Years</option>
                  <option>Current + 5 Prior Years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Format
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>CSV Format</option>
                  <option>Excel Format</option>
                  <option>XML Format</option>
                  <option>PDF Report</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Include Zero Balances
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Exclude Zero Balances</option>
                  <option>Include Zero Balances</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nominal Code Range
                </label>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="From" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input 
                    type="text" 
                    placeholder="To" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                Generate All Reports
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Export Reports
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'management-pack' && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-green-900 mb-2">Management Pack Reports</h3>
            <p className="text-green-700">
              Comprehensive management reporting suite for internal analysis and decision making.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Management Accounts', description: 'Monthly management accounts with variance analysis', status: 'Available', type: 'Monthly' },
              { name: 'KPI Dashboard', description: 'Key performance indicators and metrics', status: 'Available', type: 'Real-time' },
              { name: 'Budget vs Actual', description: 'Budget comparison and variance analysis', status: 'Available', type: 'Comparative' },
              { name: 'Cash Flow Forecast', description: 'Forward-looking cash flow projections', status: 'Available', type: 'Forecast' },
              { name: 'Departmental Reports', description: 'Department-wise performance analysis', status: 'Available', type: 'Departmental' },
              { name: 'Profitability Analysis', description: 'Product and service profitability breakdown', status: 'Available', type: 'Analysis' },
              { name: 'Executive Summary', description: 'High-level executive dashboard', status: 'Available', type: 'Summary' },
              { name: 'Trend Analysis', description: 'Historical trends and patterns', status: 'Available', type: 'Trends' },
              { name: 'Ratio Analysis', description: 'Financial ratios and benchmarking', status: 'Available', type: 'Ratios' }
            ].map((report, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-900 mb-2">{report.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                <p className="text-xs text-gray-500 mb-3">Type: {report.type}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{report.status}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700">
                    Generate
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                    Export
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Management Pack Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reporting Period
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Current Month</option>
                  <option>Current Quarter</option>
                  <option>Year to Date</option>
                  <option>Rolling 12 Months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comparison Period
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Prior Month</option>
                  <option>Prior Year</option>
                  <option>Budget</option>
                  <option>Forecast</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detail Level
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Summary</option>
                  <option>Detailed</option>
                  <option>Full Detail</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Include Departments
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>All Departments</option>
                  <option>Selected Departments</option>
                  <option>Exclude Departments</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Generate Management Pack
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Schedule Delivery
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Reports</h3>
          <p className="text-2xl font-bold text-gray-900">25</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Generated</h3>
          <p className="text-2xl font-bold text-green-600">22</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">CCAB Compliant</h3>
          <p className="text-2xl font-bold text-blue-600">9</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Standard Reports</h3>
          <p className="text-2xl font-bold text-orange-600">11</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Ready for Filing</h3>
          <p className="text-2xl font-bold text-green-600">18</p>
        </div>
      </div>
    </div>
  )
}

export default ProofsReports

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

      {activeTab === 'draft-accounts' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Draft Accounts Generation</h3>
            <p className="text-blue-700">
              Generate draft statutory accounts from your trial balance and adjustments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Types</h3>
              <div className="space-y-3">
                {[
                  { name: 'Full Accounts', description: 'Complete statutory accounts', status: 'Available' },
                  { name: 'Abbreviated Accounts', description: 'Small company format', status: 'Available' },
                  { name: 'Filleted Accounts', description: 'Medium company format', status: 'Available' },
                  { name: 'Dormant Accounts', description: 'Dormant company format', status: 'Available' }
                ].map((account, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{account.name}</h4>
                        <p className="text-sm text-gray-600">{account.description}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {account.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Generation Options</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Format
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Companies Act 2006</option>
                    <option>FRS 102</option>
                    <option>FRS 105</option>
                    <option>IFRS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Period End
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    defaultValue="2023-12-31"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Include comparatives</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Auto-populate notes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    <span className="ml-2 text-sm text-gray-700">Include cash flow</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Generations</h3>
              <div className="space-y-3">
                {[
                  { client: 'ABC Ltd', type: 'Full Accounts', date: '2024-01-20', status: 'Complete' },
                  { client: 'XYZ Corp', type: 'Abbreviated', date: '2024-01-19', status: 'In Progress' },
                  { client: 'DEF Ltd', type: 'Dormant', date: '2024-01-18', status: 'Complete' }
                ].map((gen, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{gen.client}</h4>
                        <p className="text-sm text-gray-600">{gen.type} - {gen.date}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        gen.status === 'Complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {gen.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'management-pack' && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-green-900 mb-2">Management Pack Reports</h3>
            <p className="text-green-700">
              Generate comprehensive management reporting packs for internal use and board meetings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Executive Summary', description: 'High-level financial overview', icon: '📊' },
              { name: 'Management Accounts', description: 'Detailed P&L and Balance Sheet', icon: '📈' },
              { name: 'Budget vs Actual', description: 'Performance against budget', icon: '🎯' },
              { name: 'Cash Flow Forecast', description: '13-week rolling forecast', icon: '💰' },
              { name: 'KPI Dashboard', description: 'Key performance indicators', icon: '📋' },
              { name: 'Variance Analysis', description: 'Period-on-period analysis', icon: '📉' },
              { name: 'Departmental Reports', description: 'Cost center performance', icon: '🏢' },
              { name: 'Project Profitability', description: 'Project-level analysis', icon: '🔍' },
              { name: 'Board Pack', description: 'Complete board presentation', icon: '👥' }
            ].map((report, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{report.icon}</span>
                  <h3 className="text-lg font-medium text-gray-900">{report.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Generate
                  </button>
                  <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ccab-reports' && (
        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-orange-900 mb-2">CCAB Format Reports</h3>
            <p className="text-orange-700">
              Generate reports in CCAB (Consultative Committee of Accountancy Bodies) standard formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Financial Statements', description: 'CCAB standard financial statements', status: 'Available' },
              { name: 'Directors Report', description: 'CCAB directors report template', status: 'Available' },
              { name: 'Audit Report', description: 'CCAB audit report format', status: 'Available' },
              { name: 'Small Company', description: 'CCAB small company accounts', status: 'Available' },
              { name: 'Management Accounts', description: 'CCAB management reporting', status: 'Available' }
            ].map((report, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{report.name}</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                    Generate
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Preview
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'standard-reports' && (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-purple-900 mb-2">Standard Format Reports</h3>
            <p className="text-purple-700">
              Generate standard accounting reports including trial balances, ledgers, and schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Trial Balance', description: 'Current period trial balance', format: 'Excel/PDF' },
              { name: 'Multi Year Trial Balance', description: 'Up to 5 years comparison', format: 'Excel/PDF' },
              { name: 'Nominal Ledger', description: 'Detailed account transactions', format: 'Excel/PDF' },
              { name: 'Lead Schedules', description: 'Working paper schedules', format: 'Excel/PDF' },
              { name: 'Schedules', description: 'Supporting schedules', format: 'Excel/PDF' },
              { name: 'Journal Entries', description: 'All journal postings', format: 'Excel/PDF' },
              { name: 'Abbreviated Accounts', description: 'Small company format', format: 'PDF' },
              { name: 'Consolidated Accounts', description: 'Group consolidation', format: 'PDF' },
              { name: 'Filleted Accounts', description: 'Medium company format', format: 'PDF' },
              { name: 'Full Accounts', description: 'Complete statutory accounts', format: 'PDF' },
              { name: 'Dormant Accounts', description: 'Dormant company accounts', format: 'PDF' }
            ].map((report, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{report.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                <p className="text-xs text-gray-500 mb-4">Format: {report.format}</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Generate
                  </button>
                  <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                    Schedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'highlights-cover' && (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-purple-900 mb-2">Highlights & Cover Pages</h3>
            <p className="text-purple-700">
              Configure cover pages, highlights, and executive summary content for your financial reports.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cover Page Templates</h3>
              <div className="space-y-4">
                {[
                  { id: '1', name: 'Professional', description: 'Clean professional layout with company branding' },
                  { id: '2', name: 'Corporate', description: 'Corporate focused design with executive summary' },
                  { id: '3', name: 'Minimal', description: 'Minimal design approach with key highlights' }
                ].map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Executive Highlights</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Performance Metrics
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <span className="text-sm text-gray-600">Revenue Growth</span>
                      <p className="text-lg font-bold text-green-600">+15.2%</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <span className="text-sm text-gray-600">Profit Margin</span>
                      <p className="text-lg font-bold text-blue-600">22.8%</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <span className="text-sm text-gray-600">ROE</span>
                      <p className="text-lg font-bold text-purple-600">18.5%</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <span className="text-sm text-gray-600">Current Ratio</span>
                      <p className="text-lg font-bold text-orange-600">1.76</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Achievement Highlights
                  </label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={4}
                    placeholder="Enter key achievements and milestones for the period..."
                    defaultValue="• Successful expansion into new markets
• Implementation of new ERP system
• Achievement of ISO certification
• 25% increase in customer satisfaction"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Summary Sections</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Revenue Analysis</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Revenue by segment</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Year-on-year comparison</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    <span className="ml-2 text-sm text-gray-700">Seasonal trends</span>
                  </label>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Profitability</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Gross margin analysis</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Operating efficiency</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    <span className="ml-2 text-sm text-gray-700">Cost breakdown</span>
                  </label>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Financial Position</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Liquidity ratios</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    <span className="ml-2 text-sm text-gray-700">Debt analysis</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    <span className="ml-2 text-sm text-gray-700">Working capital</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Preview Cover Page
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Generate Highlights
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'styles' && (
        <div className="space-y-6">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-indigo-900 mb-2">Report Styling & Branding</h3>
            <p className="text-indigo-700">
              Customize the visual appearance, branding, and formatting of your financial reports.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Color Scheme</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 border-2 border-gray-300"></div>
                    <input 
                      type="text" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      defaultValue="#0B5FFF"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500 border-2 border-gray-300"></div>
                    <input 
                      type="text" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      defaultValue="#FF7A00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500 border-2 border-gray-300"></div>
                    <input 
                      type="text" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      defaultValue="#10B981"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Typography</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heading Font</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Arial</option>
                    <option>Helvetica</option>
                    <option>Times New Roman</option>
                    <option>Calibri</option>
                    <option>Georgia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Body Font</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Arial</option>
                    <option>Helvetica</option>
                    <option>Times New Roman</option>
                    <option>Calibri</option>
                    <option>Georgia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>10pt</option>
                    <option>11pt</option>
                    <option>12pt</option>
                    <option>14pt</option>
                    <option>16pt</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Layout & Formatting</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Orientation
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Portrait</option>
                  <option>Landscape</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Size
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>A4</option>
                  <option>Letter</option>
                  <option>Legal</option>
                  <option>A3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Margins
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Normal (2.5cm)</option>
                  <option>Narrow (1.27cm)</option>
                  <option>Wide (3.17cm)</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Line Spacing
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Single</option>
                  <option>1.15</option>
                  <option>1.5</option>
                  <option>Double</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Branding Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Upload Logo
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 2MB</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Watermark</label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    <span className="ml-2 text-sm text-gray-700">Enable watermark</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Watermark text"
                  />
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Light opacity</option>
                    <option>Medium opacity</option>
                    <option>High opacity</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Preview Styling
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Save Template
              </button>
              <button className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Reports Generated</h3>
          <p className="text-2xl font-bold text-blue-600">156</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Templates Active</h3>
          <p className="text-2xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Pending Generation</h3>
          <p className="text-2xl font-bold text-orange-600">8</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Scheduled Reports</h3>
          <p className="text-2xl font-bold text-purple-600">23</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Export Queue</h3>
          <p className="text-2xl font-bold text-green-600">18</p>
        </div>
      </div>
    </div>
  )
}

export default ProofsReports

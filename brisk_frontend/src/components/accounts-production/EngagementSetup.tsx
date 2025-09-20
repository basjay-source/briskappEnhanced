import React, { useState, useEffect } from 'react'

interface EntityProfile {
  companyName: string
  companyNumber: string
  registeredOffice: string
  principalActivities: string
  auditors: string
  directors: string[]
  reportingCurrency: string
  yearEnd: string
  comparativePeriod: string
}

interface ReportingOptions {
  framework: 'FRS 102' | 'FRS 105' | 'IFRS' | 'LLP'
  smallCompanyExemptions: boolean
  abridgement: boolean
  auditVsCompilation: 'audit' | 'compilation'
  cashFlowExemption: boolean
}

interface MaterialitySettings {
  threshold: number
  roundingBase: number
  disclosureSuppressionRules: string[]
}

const EngagementSetup: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('entity-profile')
  const [entityProfile, setEntityProfile] = useState<EntityProfile>({
    companyName: 'Acme Corp Ltd',
    companyNumber: '12345678',
    registeredOffice: '123 Business Street, London, EC1A 1BB',
    principalActivities: 'Software development and consulting services',
    auditors: 'Smith & Partners LLP',
    directors: ['John Smith', 'Jane Doe', 'Mike Johnson'],
    reportingCurrency: 'GBP',
    yearEnd: '31/12/2023',
    comparativePeriod: '31/12/2022'
  })

  const [reportingOptions, setReportingOptions] = useState<ReportingOptions>({
    framework: 'FRS 102',
    smallCompanyExemptions: true,
    abridgement: false,
    auditVsCompilation: 'compilation',
    cashFlowExemption: true
  })

  const [materialitySettings, setMaterialitySettings] = useState<MaterialitySettings>({
    threshold: 5000,
    roundingBase: 100,
    disclosureSuppressionRules: ['Below materiality threshold', 'Immaterial balances']
  })

  const [checklists, setChecklists] = useState([
    { id: '1', item: 'Engagement letter signed', completed: true, required: true },
    { id: '2', item: 'Management representation letter', completed: false, required: true },
    { id: '3', item: 'Prior year accounts reviewed', completed: true, required: false },
    { id: '4', item: 'Going concern assessment', completed: false, required: true },
    { id: '5', item: 'Related party identification', completed: false, required: true },
    { id: '6', item: 'Subsequent events review', completed: false, required: false }
  ])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleEntityProfileChange = (field: keyof EntityProfile, value: string | string[]) => {
    setEntityProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleReportingOptionsChange = (field: keyof ReportingOptions, value: any) => {
    setReportingOptions(prev => ({ ...prev, [field]: value }))
  }

  const handleMaterialityChange = (field: keyof MaterialitySettings, value: any) => {
    setMaterialitySettings(prev => ({ ...prev, [field]: value }))
  }

  const toggleChecklistItem = (id: string) => {
    setChecklists(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const saveEngagementSetup = () => {
    console.log('Saving engagement setup...', { entityProfile, reportingOptions, materialitySettings, checklists })
  }

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
        <h1 className="text-2xl font-bold text-gray-900">Engagement Setup</h1>
        <div className="flex space-x-2">
          <button 
            onClick={saveEngagementSetup}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Setup
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Import from CoSec
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'entity-profile', label: 'Entity Profile' },
            { id: 'reporting-options', label: 'Reporting Options' },
            { id: 'materiality', label: 'Materiality & Rounding' },
            { id: 'checklists', label: 'Checklists' }
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

      {activeTab === 'entity-profile' && (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-lg font-semibold">Entity Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={entityProfile.companyName}
                onChange={(e) => handleEntityProfileChange('companyName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Number</label>
              <input
                type="text"
                value={entityProfile.companyNumber}
                onChange={(e) => handleEntityProfileChange('companyNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Registered Office</label>
              <textarea
                value={entityProfile.registeredOffice}
                onChange={(e) => handleEntityProfileChange('registeredOffice', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reporting-options' && (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-lg font-semibold">Reporting Options</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accounting Framework</label>
              <select
                value={reportingOptions.framework}
                onChange={(e) => handleReportingOptionsChange('framework', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="FRS 102">FRS 102 - Financial Reporting Standard</option>
                <option value="FRS 105">FRS 105 - Micro-entities</option>
                <option value="IFRS">IFRS - International Standards</option>
                <option value="LLP">LLP - Limited Liability Partnership</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'materiality' && (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-lg font-semibold">Materiality &amp; Rounding</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Materiality Threshold (&pound;)</label>
              <input
                type="number"
                value={materialitySettings.threshold}
                onChange={(e) => handleMaterialityChange('threshold', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rounding Base (&pound;)</label>
              <select
                value={materialitySettings.roundingBase}
                onChange={(e) => handleMaterialityChange('roundingBase', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>&pound;1 - Exact</option>
                <option value={10}>&pound;10 - Nearest ten</option>
                <option value={100}>&pound;100 - Nearest hundred</option>
                <option value={1000}>&pound;1,000 - Nearest thousand</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'checklists' && (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-lg font-semibold">Engagement Checklists</h2>
          <div className="space-y-4">
            {checklists.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleChecklistItem(item.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {item.item}
                  </span>
                  {item.required && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Required</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {item.completed ? '✓ Complete' : 'Pending'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default EngagementSetup

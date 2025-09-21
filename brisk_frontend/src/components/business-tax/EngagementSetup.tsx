import React, { useState, useEffect } from 'react'

const EngagementSetup: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('company-profile')
  const [formData, setFormData] = useState({
    companyName: 'Acme Corp Ltd',
    utr: '1234567890',
    companyNumber: '12345678',
    accountingRefDate: '31/12',
    companyType: 'small',
    apStart: '2023-01-01',
    apEnd: '2023-12-31',
    ctRateYear: '2023/24',
    agentRef: 'AG123456',
    hmrcConnected: true,
    materialityThreshold: 5000,
    roundingPolicy: 'nearest-pound'
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Engagement Setup</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Validate Setup
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'company-profile', label: 'Company Profile' },
            { id: 'aps-ct-rate', label: 'APs & CT Rate Year' },
            { id: 'agent-auth', label: 'Agent Auth' },
            { id: 'materiality', label: 'Materiality' }
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

      {activeTab === 'company-profile' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Company Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">UTR</label>
              <input
                type="text"
                value={formData.utr}
                onChange={(e) => handleInputChange('utr', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Number</label>
              <input
                type="text"
                value={formData.companyNumber}
                onChange={(e) => handleInputChange('companyNumber', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accounting Reference Date</label>
              <input
                type="text"
                value={formData.accountingRefDate}
                onChange={(e) => handleInputChange('accountingRefDate', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Type</label>
              <select
                value={formData.companyType}
                onChange={(e) => handleInputChange('companyType', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="small">Small Company</option>
                <option value="large">Large Company</option>
                <option value="group">Group Company</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Setup Progress</h3>
          <p className="text-2xl font-bold text-green-600">85%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">HMRC Status</h3>
          <p className="text-2xl font-bold text-green-600">Connected</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">AP Length</h3>
          <p className="text-2xl font-bold text-blue-600">12 months</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Filing Deadline</h3>
          <p className="text-2xl font-bold text-orange-600">15 Jan 2024</p>
        </div>
      </div>
    </div>
  )
}

export default EngagementSetup

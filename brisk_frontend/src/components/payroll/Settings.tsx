import React, { useState, useEffect } from 'react'

interface HMRCRates {
  personal_allowance: number
  basic_rate_threshold: number
  higher_rate_threshold: number
  ni_primary_threshold: number
  ni_upper_earnings_limit: number
  ni_employee_rate: number
  ni_employer_rate: number
  corporation_tax_main_rate: number
  corporation_tax_small_rate: number
  corporation_tax_threshold: number
  ssp_weekly_rate: number
  smp_weekly_rate: number
}

interface PayCalendar {
  id: string
  name: string
  frequency: 'Weekly' | 'Monthly' | '4-weekly' | 'Quarterly'
  payDate: string
  cutoffDate: string
  employees: number
  status: 'Active' | 'Inactive'
}

interface TaxYear {
  id: string
  year: string
  startDate: string
  endDate: string
  status: 'Current' | 'Previous' | 'Future'
  locked: boolean
}

interface COAMapping {
  id: string
  payElement: string
  account: string
  department: string
  description: string
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pay-calendars')
  const [payCalendars, setPayCalendars] = useState<PayCalendar[]>([])
  const [taxYears, setTaxYears] = useState<TaxYear[]>([])
  const [coaMappings, setCoaMappings] = useState<COAMapping[]>([])
  const [hmrcRates, setHmrcRates] = useState<HMRCRates | null>(null)
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'pay-calendars', label: 'Pay Calendars', icon: '📅' },
    { id: 'tax-year-setup', label: 'Tax Year Setup', icon: '🗓️' },
    { id: 'coa-mapping', label: 'COA Mapping', icon: '🗺️' },
    { id: 'dimensions-defaults', label: 'Dimensions Defaults', icon: '📊' },
    { id: 'roles-permissions', label: 'Roles/Permissions', icon: '👥' },
    { id: 'statutory-settings', label: 'Statutory Settings', icon: '⚖️' },
    { id: 'templates', label: 'Templates', icon: '📄' }
  ]

  useEffect(() => {
    const fetchHMRCRates = async () => {
      try {
        const response = await fetch('/api/business-tax/hmrc-rates')
        if (response.ok) {
          const data = await response.json()
          setHmrcRates(data.rates)
        }
      } catch (error) {
        console.error('Error fetching HMRC rates:', error)
      }
    }

    fetchHMRCRates()

    setTimeout(() => {
      setPayCalendars([
        {
          id: '1',
          name: 'Monthly Salary',
          frequency: 'Monthly',
          payDate: 'Last working day',
          cutoffDate: '25th of month',
          employees: 142,
          status: 'Active'
        },
        {
          id: '2',
          name: 'Weekly Wages',
          frequency: 'Weekly',
          payDate: 'Friday',
          cutoffDate: 'Wednesday',
          employees: 14,
          status: 'Active'
        },
        {
          id: '3',
          name: 'Directors Quarterly',
          frequency: 'Quarterly',
          payDate: '15th of quarter end',
          cutoffDate: '10th of quarter end',
          employees: 4,
          status: 'Active'
        }
      ])

      setTaxYears([
        {
          id: '1',
          year: '2024-25',
          startDate: '2024-04-06',
          endDate: '2025-04-05',
          status: 'Current',
          locked: false
        },
        {
          id: '2',
          year: '2023-24',
          startDate: '2023-04-06',
          endDate: '2024-04-05',
          status: 'Previous',
          locked: true
        },
        {
          id: '3',
          year: '2025-26',
          startDate: '2025-04-06',
          endDate: '2026-04-05',
          status: 'Future',
          locked: false
        }
      ])

      setCoaMappings([
        {
          id: '1',
          payElement: 'Basic Salary',
          account: '7000 - Salaries',
          department: 'General',
          description: 'Basic salary payments'
        },
        {
          id: '2',
          payElement: 'Employer NI',
          account: '7100 - Employer NI',
          department: 'General',
          description: 'Employer National Insurance contributions'
        },
        {
          id: '3',
          payElement: 'Pension Contributions',
          account: '7200 - Pension Costs',
          department: 'General',
          description: 'Employer pension contributions'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Current': 'bg-blue-100 text-blue-800',
      'Previous': 'bg-gray-100 text-gray-800',
      'Future': 'bg-yellow-100 text-yellow-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderPayCalendarsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Pay Calendar Configuration</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add Calendar
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Calendar Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Frequency
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pay Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cutoff Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payCalendars.map((calendar) => (
              <tr key={calendar.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{calendar.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{calendar.frequency}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{calendar.payDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{calendar.cutoffDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{calendar.employees}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(calendar.status)}`}>
                    {calendar.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Preview</button>
                  <button className="text-gray-600 hover:text-gray-900">Duplicate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderTaxYearTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Tax Year Management</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Create Tax Year
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Locked
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {taxYears.map((year) => (
              <tr key={year.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{year.year}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{year.startDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{year.endDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(year.status)}`}>
                    {year.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{year.locked ? '🔒 Yes' : '🔓 No'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {!year.locked && (
                    <>
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900 mr-3">Lock</button>
                    </>
                  )}
                  <button className="text-gray-600 hover:text-gray-900">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderCOAMappingTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Chart of Accounts Mapping</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add Mapping
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pay Element
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coaMappings.map((mapping) => (
              <tr key={mapping.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{mapping.payElement}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{mapping.account}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{mapping.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{mapping.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900 mr-3">Delete</button>
                  <button className="text-gray-600 hover:text-gray-900">Test</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderStatutorySettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Statutory Rates &amp; Thresholds</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Tax Rates (2024-25)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Personal Allowance:</span>
                <span className="font-medium">£{hmrcRates ? hmrcRates.personal_allowance.toLocaleString() : '12,570'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Basic Rate (20%):</span>
                <span className="font-medium">£{hmrcRates ? (hmrcRates.personal_allowance + 1).toLocaleString() : '12,571'} - £{hmrcRates ? hmrcRates.basic_rate_threshold.toLocaleString() : '50,270'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Higher Rate (40%):</span>
                <span className="font-medium">£{hmrcRates ? (hmrcRates.basic_rate_threshold + 1).toLocaleString() : '50,271'} - £{hmrcRates ? hmrcRates.higher_rate_threshold.toLocaleString() : '125,140'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Additional Rate (45%):</span>
                <span className="font-medium">Over £{hmrcRates ? hmrcRates.higher_rate_threshold.toLocaleString() : '125,140'}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">National Insurance (2024-25)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Lower Earnings Limit:</span>
                <span className="font-medium">£6,396</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Primary Threshold:</span>
                <span className="font-medium">£{hmrcRates ? hmrcRates.ni_primary_threshold.toLocaleString() : '12,570'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Upper Earnings Limit:</span>
                <span className="font-medium">£{hmrcRates ? hmrcRates.ni_upper_earnings_limit.toLocaleString() : '50,270'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Employee Rate:</span>
                <span className="font-medium">{hmrcRates ? `${(hmrcRates.ni_employee_rate * 100).toFixed(0)}% / 2%` : '12% / 2%'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Update Rates
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Import HMRC Rates
          </button>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pay-calendars': return renderPayCalendarsTab()
      case 'tax-year-setup': return renderTaxYearTab()
      case 'coa-mapping': return renderCOAMappingTab()
      case 'statutory-settings': return renderStatutorySettingsTab()
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600">
              Configure system-wide payroll settings, calendars, and integration mappings.
            </p>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure payroll system settings and preferences</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export Config
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            System Health
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {renderTabContent()}
    </div>
  )
}

export default Settings

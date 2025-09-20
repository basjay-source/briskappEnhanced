import React, { useState, useEffect } from 'react'

interface Contract {
  id: string
  name: string
  type: 'Salary' | 'Hourly' | 'Fixed Term'
  payCalendar: string
  standardHours: number
  salary: number
  holidayEntitlement: number
  employees: number
  status: 'Active' | 'Draft' | 'Expired'
}

interface PayCalendar {
  id: string
  name: string
  frequency: 'Weekly' | 'Monthly' | '4-weekly' | 'Quarterly'
  payDay: string
  cutOffDay: string
  employees: number
  nextPayDate: string
}

const ContractsPayProfiles: React.FC = () => {
  const [activeTab, setActiveTab] = useState('contracts')
  const [contracts, setContracts] = useState<Contract[]>([])
  const [payCalendars, setPayCalendars] = useState<PayCalendar[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'contracts', label: 'Contracts', icon: '📋' },
    { id: 'pay-calendars', label: 'Pay Calendars', icon: '📅' },
    { id: 'rates-grades', label: 'Rates & Grades', icon: '💰' },
    { id: 'work-locations', label: 'Work Locations', icon: '📍' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setContracts([
        {
          id: '1',
          name: 'Senior Management',
          type: 'Salary',
          payCalendar: 'Monthly Salary',
          standardHours: 37.5,
          salary: 65000,
          holidayEntitlement: 28,
          employees: 8,
          status: 'Active'
        },
        {
          id: '2',
          name: 'Standard Employee',
          type: 'Salary',
          payCalendar: 'Monthly Salary',
          standardHours: 37.5,
          salary: 35000,
          holidayEntitlement: 25,
          employees: 134,
          status: 'Active'
        }
      ])

      setPayCalendars([
        {
          id: '1',
          name: 'Monthly Salary',
          frequency: 'Monthly',
          payDay: 'Last working day',
          cutOffDay: '25th',
          employees: 142,
          nextPayDate: '31/01/2024'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Expired': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'contracts':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contract
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type &amp; Calendar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pay &amp; Hours
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
                {contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{contract.name}</div>
                        <div className="text-sm text-gray-500">{contract.holidayEntitlement} days holiday</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contract.type}</div>
                      <div className="text-sm text-gray-500">{contract.payCalendar}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {contract.type === 'Hourly' ? `£${contract.salary}/hour` : `£${contract.salary.toLocaleString()}`}
                      </div>
                      <div className="text-sm text-gray-500">{contract.standardHours} hours/week</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contract.employees}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(contract.status)}`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-green-600 hover:text-green-900 mr-3">Clone</button>
                      <button className="text-gray-600 hover:text-gray-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case 'pay-calendars':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {payCalendars.map((calendar) => (
              <div key={calendar.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{calendar.name}</h4>
                  <span className="text-sm text-gray-500">{calendar.employees} employees</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Frequency:</span>
                    <span className="text-sm font-medium">{calendar.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Pay Day:</span>
                    <span className="text-sm font-medium">{calendar.payDay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Next Pay Date:</span>
                    <span className="text-sm font-medium text-blue-600">{calendar.nextPayDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600">
              Content for {tabs.find(tab => tab.id === activeTab)?.label} will be displayed here.
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
          <h1 className="text-2xl font-bold text-gray-900">Contracts &amp; Pay Profiles</h1>
          <p className="text-gray-600">Manage employment contracts, pay structures, and work arrangements</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Import Contracts
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Export Data
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

export default ContractsPayProfiles

import React, { useState, useEffect } from 'react'

interface Benefit {
  id: string
  employee: string
  type: 'Company Car' | 'Medical Insurance' | 'Life Insurance' | 'Gym Membership' | 'Other'
  description: string
  annualValue: number
  taxableValue: number
  payrollTaxed: boolean
  startDate: string
  endDate?: string
  status: 'Active' | 'Inactive'
}

interface P11DReturn {
  id: string
  employee: string
  taxYear: string
  totalBenefits: number
  class1ANI: number
  submitted: boolean
  submissionDate?: string
  status: 'Draft' | 'Ready' | 'Submitted'
}

const BenefitsExpenses: React.FC = () => {
  const [activeTab, setActiveTab] = useState('benefits-register')
  const [benefits, setBenefits] = useState<Benefit[]>([])
  const [p11dReturns, setP11dReturns] = useState<P11DReturn[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'benefits-register', label: 'Benefits Register', icon: '📋' },
    { id: 'medical-insurances', label: 'Medical/Insurances', icon: '🏥' },
    { id: 'assets-provided', label: 'Assets Provided', icon: '💻' },
    { id: 'payroll-taxed-benefits', label: 'Payroll-Taxed Benefits', icon: '💰' },
    { id: 'p11d-returns', label: 'P11D Returns', icon: '📄' },
    { id: 'class-1a', label: 'Class 1A', icon: '🏛️' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setBenefits([
        {
          id: '1',
          employee: 'John Smith',
          type: 'Company Car',
          description: 'BMW 320d - CO2: 120g/km',
          annualValue: 4800,
          taxableValue: 4800,
          payrollTaxed: false,
          startDate: '2024-01-01',
          status: 'Active'
        },
        {
          id: '2',
          employee: 'Emma Davis',
          type: 'Medical Insurance',
          description: 'BUPA Healthcare - Family Cover',
          annualValue: 2400,
          taxableValue: 2400,
          payrollTaxed: true,
          startDate: '2024-01-01',
          status: 'Active'
        },
        {
          id: '3',
          employee: 'Michael Brown',
          type: 'Gym Membership',
          description: 'PureGym Corporate Membership',
          annualValue: 480,
          taxableValue: 480,
          payrollTaxed: true,
          startDate: '2024-01-01',
          status: 'Active'
        }
      ])

      setP11dReturns([
        {
          id: '1',
          employee: 'John Smith',
          taxYear: '2023-24',
          totalBenefits: 4800,
          class1ANI: 662.40,
          submitted: false,
          status: 'Ready'
        },
        {
          id: '2',
          employee: 'Emma Davis',
          taxYear: '2023-24',
          totalBenefits: 2400,
          class1ANI: 331.20,
          submitted: true,
          submissionDate: '2024-07-06',
          status: 'Submitted'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Draft': 'bg-gray-100 text-gray-800',
      'Ready': 'bg-yellow-100 text-yellow-800',
      'Submitted': 'bg-green-100 text-green-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      'Company Car': 'bg-blue-100 text-blue-800',
      'Medical Insurance': 'bg-green-100 text-green-800',
      'Life Insurance': 'bg-purple-100 text-purple-800',
      'Gym Membership': 'bg-orange-100 text-orange-800',
      'Other': 'bg-gray-100 text-gray-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderBenefitsRegisterTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Benefits Register</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add Benefit
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Benefit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Annual Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Taxable Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payroll Taxed
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
            {benefits.map((benefit) => (
              <tr key={benefit.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{benefit.employee}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(benefit.type)} mb-1`}>
                      {benefit.type}
                    </span>
                    <div className="text-sm text-gray-500">{benefit.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{benefit.annualValue.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{benefit.taxableValue.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    benefit.payrollTaxed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {benefit.payrollTaxed ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(benefit.status)}`}>
                    {benefit.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Calculate</button>
                  <button className="text-gray-600 hover:text-gray-900">History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderP11DReturnsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">P11D Returns</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Generate P11D
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Benefits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class 1A NI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submission Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {p11dReturns.map((p11d) => (
              <tr key={p11d.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{p11d.employee}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{p11d.taxYear}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{p11d.totalBenefits.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{p11d.class1ANI.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(p11d.status)}`}>
                    {p11d.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {p11d.submissionDate || 'Not submitted'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {p11d.status === 'Ready' && (
                    <button className="text-green-600 hover:text-green-900 mr-3">Submit</button>
                  )}
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-gray-600 hover:text-gray-900">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderClass1ATab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Class 1A National Insurance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">£993.60</div>
            <div className="text-sm text-gray-600">Total Class 1A Due</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">£331.20</div>
            <div className="text-sm text-gray-600">Paid to Date</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">£662.40</div>
            <div className="text-sm text-gray-600">Outstanding</div>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-3">
            Calculate Class 1A
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Make Payment
          </button>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'benefits-register': return renderBenefitsRegisterTab()
      case 'p11d-returns': return renderP11DReturnsTab()
      case 'class-1a': return renderClass1ATab()
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
          <h1 className="text-2xl font-bold text-gray-900">Benefits & Expenses (P11D)</h1>
          <p className="text-gray-600">Manage employee benefits and P11D reporting</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Year-End Process
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

export default BenefitsExpenses

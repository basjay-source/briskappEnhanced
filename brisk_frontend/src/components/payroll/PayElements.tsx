import React, { useState, useEffect } from 'react'

interface PayElement {
  id: string
  name: string
  code: string
  type: 'Earnings' | 'Deduction' | 'Allowance' | 'Statutory'
  taxable: boolean
  niable: boolean
  pensionable: boolean
  glAccount: string
  department: string
  usage: number
  status: 'Active' | 'Inactive'
}

const PayElements: React.FC = () => {
  const [activeTab, setActiveTab] = useState('earnings')
  const [payElements, setPayElements] = useState<PayElement[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'overtime', label: 'Overtime', icon: '⏰' },
    { id: 'allowances', label: 'Allowances', icon: '🎁' },
    { id: 'reimbursements', label: 'Reimbursements', icon: '💳' },
    { id: 'statutory', label: 'Statutory (SSP/SMP etc.)', icon: '🏛️' },
    { id: 'employer-costs', label: 'Employer Costs', icon: '📊' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setPayElements([
        {
          id: '1',
          name: 'Basic Salary',
          code: 'BASIC',
          type: 'Earnings',
          taxable: true,
          niable: true,
          pensionable: true,
          glAccount: '7000',
          department: 'All',
          usage: 156,
          status: 'Active'
        },
        {
          id: '2',
          name: 'Overtime Premium',
          code: 'OT1.5',
          type: 'Earnings',
          taxable: true,
          niable: true,
          pensionable: true,
          glAccount: '7010',
          department: 'Operations',
          usage: 24,
          status: 'Active'
        },
        {
          id: '3',
          name: 'Car Allowance',
          code: 'CARALL',
          type: 'Allowance',
          taxable: true,
          niable: true,
          pensionable: false,
          glAccount: '7020',
          department: 'Sales',
          usage: 12,
          status: 'Active'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      'Earnings': 'bg-blue-100 text-blue-800',
      'Deduction': 'bg-red-100 text-red-800',
      'Allowance': 'bg-green-100 text-green-800',
      'Statutory': 'bg-purple-100 text-purple-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
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
          <h1 className="text-2xl font-bold text-gray-900">Pay Elements</h1>
          <p className="text-gray-600">Configure earnings, deductions, and statutory payments</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Import Elements
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Export Setup
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Element
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax/NI/Pension
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GL Account
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
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
            {payElements.map((element) => (
              <tr key={element.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{element.name}</div>
                    <div className="text-sm text-gray-500">Code: {element.code}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(element.type)}`}>
                    {element.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    {element.taxable && (
                      <span className="inline-flex px-1 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                        Tax
                      </span>
                    )}
                    {element.niable && (
                      <span className="inline-flex px-1 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                        NI
                      </span>
                    )}
                    {element.pensionable && (
                      <span className="inline-flex px-1 py-0.5 text-xs bg-purple-100 text-purple-800 rounded">
                        Pension
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{element.glAccount}</div>
                  <div className="text-sm text-gray-500">{element.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{element.usage} employees</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(element.status)}`}>
                    {element.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Clone</button>
                  <button className="text-gray-600 hover:text-gray-900">History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PayElements

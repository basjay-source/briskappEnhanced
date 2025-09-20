import React, { useState, useEffect } from 'react'

interface Subcontractor {
  id: string
  name: string
  utr: string
  verificationNumber: string
  status: 'Verified' | 'Unverified' | 'Pending'
  deductionRate: number
  totalPayments: number
  totalDeductions: number
  registrationDate: string
}

interface CISPayment {
  id: string
  subcontractor: string
  paymentDate: string
  grossAmount: number
  deductionAmount: number
  netAmount: number
  materialCost: number
  status: 'Paid' | 'Pending' | 'Cancelled'
}

const CIS: React.FC = () => {
  const [activeTab, setActiveTab] = useState('subcontractors')
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([])
  const [payments, setPayments] = useState<CISPayment[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'subcontractors', label: 'Subcontractors', icon: '👷' },
    { id: 'verification', label: 'Verification', icon: '✅' },
    { id: 'payments-deductions', label: 'Payments & Deductions', icon: '💰' },
    { id: 'monthly-return', label: 'Monthly Return', icon: '📄' },
    { id: 'statements', label: 'Statements', icon: '📋' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setSubcontractors([
        {
          id: '1',
          name: 'ABC Construction Ltd',
          utr: '1234567890',
          verificationNumber: 'V123456789',
          status: 'Verified',
          deductionRate: 20,
          totalPayments: 45000,
          totalDeductions: 9000,
          registrationDate: '2024-01-15'
        },
        {
          id: '2',
          name: 'Smith Building Services',
          utr: '0987654321',
          verificationNumber: 'V987654321',
          status: 'Verified',
          deductionRate: 30,
          totalPayments: 28000,
          totalDeductions: 8400,
          registrationDate: '2024-02-01'
        },
        {
          id: '3',
          name: 'Jones Electrical',
          utr: '1122334455',
          verificationNumber: '',
          status: 'Unverified',
          deductionRate: 30,
          totalPayments: 15000,
          totalDeductions: 4500,
          registrationDate: '2024-02-15'
        }
      ])

      setPayments([
        {
          id: '1',
          subcontractor: 'ABC Construction Ltd',
          paymentDate: '2024-01-31',
          grossAmount: 5000,
          deductionAmount: 1000,
          netAmount: 4000,
          materialCost: 1200,
          status: 'Paid'
        },
        {
          id: '2',
          subcontractor: 'Smith Building Services',
          paymentDate: '2024-02-15',
          grossAmount: 3500,
          deductionAmount: 1050,
          netAmount: 2450,
          materialCost: 800,
          status: 'Paid'
        },
        {
          id: '3',
          subcontractor: 'Jones Electrical',
          paymentDate: '2024-02-28',
          grossAmount: 2000,
          deductionAmount: 600,
          netAmount: 1400,
          materialCost: 300,
          status: 'Pending'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Verified': 'bg-green-100 text-green-800',
      'Unverified': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Paid': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderSubcontractorsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Registered Subcontractors</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add Subcontractor
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                UTR
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Verification
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deduction Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Payments
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
            {subcontractors.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{sub.name}</div>
                  <div className="text-sm text-gray-500">Registered: {sub.registrationDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{sub.utr}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{sub.verificationNumber || 'Not verified'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{sub.deductionRate}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{sub.totalPayments.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Deductions: £{sub.totalDeductions.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(sub.status)}`}>
                    {sub.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Verify</button>
                  <button className="text-gray-600 hover:text-gray-900">History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderPaymentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">CIS Payments & Deductions</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Record Payment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subcontractor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gross Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deduction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Amount
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
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{payment.subcontractor}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payment.paymentDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{payment.grossAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Materials: £{payment.materialCost.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{payment.deductionAmount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{payment.netAmount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Statement</button>
                  <button className="text-gray-600 hover:text-gray-900">Receipt</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderMonthlyReturnTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">CIS Monthly Return</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">£88,000</div>
            <div className="text-sm text-gray-600">Total Payments This Month</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">£21,900</div>
            <div className="text-sm text-gray-600">Total Deductions</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-gray-600">Active Subcontractors</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">February 2024 Return</h4>
              <p className="text-sm text-gray-600">Due: 19th March 2024</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Generate Return
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Submit to HMRC
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'subcontractors': return renderSubcontractorsTab()
      case 'payments-deductions': return renderPaymentsTab()
      case 'monthly-return': return renderMonthlyReturnTab()
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600">
              Complete CIS management with HMRC verification and monthly returns.
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
          <h1 className="text-2xl font-bold text-gray-900">CIS (Construction Industry Scheme)</h1>
          <p className="text-gray-600">Manage subcontractors and CIS compliance</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            HMRC Verification
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

export default CIS

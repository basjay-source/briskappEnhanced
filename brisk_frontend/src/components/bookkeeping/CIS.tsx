import React, { useState } from 'react'
import { HardHat, FileText, Users, Calculator, Send, CheckCircle } from 'lucide-react'

const CIS: React.FC = () => {
  const [activeTab, setActiveTab] = useState('contractors')

  const tabs = [
    { id: 'contractors', name: 'Contractors', icon: Users },
    { id: 'subcontractors', name: 'Subcontractors', icon: HardHat },
    { id: 'deductions', name: 'Deductions', icon: Calculator },
    { id: 'returns', name: 'CIS Returns', icon: FileText },
    { id: 'submissions', name: 'Submissions', icon: Send },
    { id: 'verification', name: 'Verification', icon: CheckCircle }
  ]

  const mockContractors = [
    { id: 1, name: 'ABC Construction Ltd', utr: '1234567890', status: 'Verified', deductionRate: 20, totalPaid: 125000, totalDeducted: 25000, registrationDate: '2023-01-15' },
    { id: 2, name: 'XYZ Building Services', utr: '0987654321', status: 'Verified', deductionRate: 20, totalPaid: 85000, totalDeducted: 17000, registrationDate: '2023-03-22' },
    { id: 3, name: 'Smith & Sons Contractors', utr: '1122334455', status: 'Pending', deductionRate: 30, totalPaid: 45000, totalDeducted: 13500, registrationDate: '2024-01-10' },
    { id: 4, name: 'Elite Building Group', utr: '2233445566', status: 'Verified', deductionRate: 20, totalPaid: 95000, totalDeducted: 19000, registrationDate: '2022-11-08' }
  ]

  const mockSubcontractors = [
    { id: 1, name: 'John Smith', utr: '2233445566', verificationStatus: 'Verified', deductionRate: 20, monthlyPayments: 8500, lastPayment: '2024-04-15' },
    { id: 2, name: 'Mike Johnson Plastering', utr: '3344556677', verificationStatus: 'Unverified', deductionRate: 30, monthlyPayments: 6200, lastPayment: '2024-04-12' },
    { id: 3, name: 'Elite Electrical Ltd', utr: '4455667788', verificationStatus: 'Verified', deductionRate: 20, monthlyPayments: 12000, lastPayment: '2024-04-14' },
    { id: 4, name: 'Sarah Wilson Plumbing', utr: '5566778899', verificationStatus: 'Verified', deductionRate: 20, monthlyPayments: 7800, lastPayment: '2024-04-13' }
  ]

  const mockCISReturns = [
    { id: 1, period: 'March 2024', status: 'Submitted', submissionDate: '2024-04-19', totalDeductions: 45500, contractors: 8, dueDate: '2024-04-19' },
    { id: 2, period: 'February 2024', status: 'Submitted', submissionDate: '2024-03-19', totalDeductions: 38200, contractors: 7, dueDate: '2024-03-19' },
    { id: 3, period: 'January 2024', status: 'Submitted', submissionDate: '2024-02-19', totalDeductions: 42100, contractors: 9, dueDate: '2024-02-19' },
    { id: 4, period: 'April 2024', status: 'Draft', submissionDate: null, totalDeductions: 52300, contractors: 10, dueDate: '2024-05-19' }
  ]

  const mockDeductions = [
    { id: 1, contractor: 'ABC Construction Ltd', subcontractor: 'John Smith', period: 'April 2024', grossPayment: 5000, deductionRate: 20, deductionAmount: 1000, netPayment: 4000 },
    { id: 2, contractor: 'XYZ Building Services', subcontractor: 'Mike Johnson Plastering', period: 'April 2024', grossPayment: 3000, deductionRate: 30, deductionAmount: 900, netPayment: 2100 },
    { id: 3, contractor: 'ABC Construction Ltd', subcontractor: 'Elite Electrical Ltd', period: 'April 2024', grossPayment: 8000, deductionRate: 20, deductionAmount: 1600, netPayment: 6400 },
    { id: 4, contractor: 'Smith & Sons Contractors', subcontractor: 'Sarah Wilson Plumbing', period: 'April 2024', grossPayment: 4500, deductionRate: 20, deductionAmount: 900, netPayment: 3600 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">CIS</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Add Contractor
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            CIS Return
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900">Active Contractors</h4>
          <p className="text-2xl font-bold text-blue-600">12</p>
          <p className="text-sm text-blue-700">This month</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium text-green-900">Total Deductions</h4>
          <p className="text-2xl font-bold text-green-600">£45,500</p>
          <p className="text-sm text-green-700">Current period</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900">Pending Verification</h4>
          <p className="text-2xl font-bold text-yellow-600">3</p>
          <p className="text-sm text-yellow-700">Requires action</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-medium text-purple-900">Compliance Score</h4>
          <p className="text-2xl font-bold text-purple-600">96%</p>
          <p className="text-sm text-purple-700">Excellent</p>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {activeTab === 'contractors' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Contractors</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search contractors..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option value="">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Add New
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UTR</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deduction Rate</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Deducted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockContractors.map((contractor) => (
                  <tr key={contractor.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contractor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{contractor.utr}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        contractor.status === 'Verified' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {contractor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contractor.deductionRate}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{contractor.totalPaid.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{contractor.totalDeducted.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contractor.registrationDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Verify</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'subcontractors' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Subcontractors</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search subcontractors..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Add New
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UTR</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deduction Rate</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Payments</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockSubcontractors.map((subcontractor) => (
                  <tr key={subcontractor.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subcontractor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{subcontractor.utr}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subcontractor.verificationStatus === 'Verified' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subcontractor.verificationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subcontractor.deductionRate}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{subcontractor.monthlyPayments.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subcontractor.lastPayment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Verify</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'deductions' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">CIS Deductions</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search deductions..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
              />
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option value="">All Periods</option>
                <option value="april-2024">April 2024</option>
                <option value="march-2024">March 2024</option>
                <option value="february-2024">February 2024</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Calculate
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contractor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcontractor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Deduction</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockDeductions.map((deduction) => (
                  <tr key={deduction.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{deduction.contractor}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{deduction.subcontractor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deduction.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{deduction.grossPayment.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{deduction.deductionRate}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{deduction.deductionAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{deduction.netPayment.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Approve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'returns' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">CIS Returns</h3>
            <div className="flex space-x-2">
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                Prepare Return
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50">
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Deductions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contractors</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockCISReturns.map((cisReturn) => (
                  <tr key={cisReturn.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cisReturn.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        cisReturn.status === 'Submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {cisReturn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cisReturn.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cisReturn.submissionDate || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£{cisReturn.totalDeductions.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cisReturn.contractors}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">View</button>
                      {cisReturn.status === 'Draft' && (
                        <button className="text-green-600 hover:text-green-900">Submit</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(activeTab === 'submissions' || activeTab === 'verification') && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {activeTab === 'submissions' && 'HMRC CIS Submissions'}
            {activeTab === 'verification' && 'Contractor Verification'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">
                {activeTab === 'submissions' ? 'Pending Submissions' : 'Pending Verifications'}
              </h4>
              <p className="text-2xl font-bold text-blue-600">
                {activeTab === 'submissions' ? '2' : '3'}
              </p>
              <p className="text-sm text-blue-700">
                {activeTab === 'submissions' ? 'Returns to submit' : 'Awaiting verification'}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">
                {activeTab === 'submissions' ? 'Submitted This Year' : 'Verified Contractors'}
              </h4>
              <p className="text-2xl font-bold text-green-600">
                {activeTab === 'submissions' ? '12' : '9'}
              </p>
              <p className="text-sm text-green-700">
                {activeTab === 'submissions' ? 'Returns' : 'Active contractors'}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">
                {activeTab === 'submissions' ? 'Next Due Date' : 'Verification Rate'}
              </h4>
              <p className="text-2xl font-bold text-yellow-600">
                {activeTab === 'submissions' ? '19 May' : '75%'}
              </p>
              <p className="text-sm text-yellow-700">
                {activeTab === 'submissions' ? '2024' : 'Success rate'}
              </p>
            </div>
          </div>
          <p className="text-gray-600">
            {activeTab === 'submissions' && 'Submit CIS returns to HMRC and track submission status and acknowledgments. Monitor compliance and manage deadlines.'}
            {activeTab === 'verification' && 'Verify contractor status with HMRC and manage verification certificates. Track verification history and compliance status.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default CIS

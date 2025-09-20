import React, { useState } from 'react'
import { Plus, Search, Percent, TrendingUp, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react'

const WriteUpsOffs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('proposals')

  const writeUpDownProposals = [
    {
      id: 1,
      engagement: 'Acme Corp Audit',
      type: 'Write-down',
      originalValue: 15000.00,
      proposedValue: 13500.00,
      adjustment: -1500.00,
      percentage: -10.0,
      reason: 'Scope reduction - subsidiary excluded',
      proposedBy: 'Manager',
      status: 'Pending',
      requestDate: '2024-01-15'
    },
    {
      id: 2,
      engagement: 'Tech Ltd Tax',
      type: 'Write-up',
      originalValue: 8000.00,
      proposedValue: 9200.00,
      adjustment: 1200.00,
      percentage: 15.0,
      reason: 'Additional complexity discovered',
      proposedBy: 'Senior',
      status: 'Approved',
      requestDate: '2024-01-12',
      approvedBy: 'Partner',
      approvedDate: '2024-01-14'
    },
    {
      id: 3,
      engagement: 'Global Inc Advisory',
      type: 'Write-off',
      originalValue: 5000.00,
      proposedValue: 0.00,
      adjustment: -5000.00,
      percentage: -100.0,
      reason: 'Client dispute - goodwill gesture',
      proposedBy: 'Partner',
      status: 'Approved',
      requestDate: '2024-01-10',
      approvedBy: 'Partner',
      approvedDate: '2024-01-10'
    }
  ]

  const discounts = [
    {
      id: 1,
      invoice: 'INV-2024-001',
      client: 'Acme Corp',
      originalAmount: 15000.00,
      discountType: 'Percentage',
      discountValue: 5.0,
      discountAmount: 750.00,
      finalAmount: 14250.00,
      reason: 'Early payment discount',
      appliedBy: 'Manager',
      appliedDate: '2024-01-16'
    },
    {
      id: 2,
      invoice: 'INV-2024-002',
      client: 'Tech Ltd',
      originalAmount: 9200.00,
      discountType: 'Fixed Amount',
      discountValue: 200.00,
      discountAmount: 200.00,
      finalAmount: 9000.00,
      reason: 'Volume discount',
      appliedBy: 'Partner',
      appliedDate: '2024-01-14'
    }
  ]

  const approvalLimits = [
    { role: 'Staff', writeUpLimit: 0, writeDownLimit: 500, discountLimit: 0 },
    { role: 'Senior', writeUpLimit: 1000, writeDownLimit: 2000, discountLimit: 500 },
    { role: 'Manager', writeUpLimit: 5000, writeDownLimit: 10000, discountLimit: 2000 },
    { role: 'Partner', writeUpLimit: 'Unlimited', writeDownLimit: 'Unlimited', discountLimit: 'Unlimited' }
  ]

  const auditTrail = [
    {
      id: 1,
      action: 'Write-up Approved',
      engagement: 'Tech Ltd Tax',
      amount: 1200.00,
      user: 'Partner',
      date: '2024-01-14 15:30',
      reason: 'Additional complexity discovered'
    },
    {
      id: 2,
      action: 'Write-off Approved',
      engagement: 'Global Inc Advisory',
      amount: -5000.00,
      user: 'Partner',
      date: '2024-01-10 09:15',
      reason: 'Client dispute - goodwill gesture'
    },
    {
      id: 3,
      action: 'Discount Applied',
      engagement: 'Acme Corp Audit',
      amount: -750.00,
      user: 'Manager',
      date: '2024-01-16 11:45',
      reason: 'Early payment discount'
    }
  ]

  const tabs = [
    { id: 'proposals', name: 'Proposals', icon: Plus },
    { id: 'discounts', name: 'Discounts', icon: Percent },
    { id: 'approval-limits', name: 'Approval Limits', icon: AlertTriangle },
    { id: 'audit', name: 'Audit Trail', icon: Search }
  ]

  const renderProposals = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Value</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposed Value</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adjustment</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {writeUpDownProposals.map((proposal) => (
            <tr key={proposal.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{proposal.engagement}</div>
                <div className="text-sm text-gray-500">by {proposal.proposedBy}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  proposal.type === 'Write-up' ? 'bg-green-100 text-green-800' :
                  proposal.type === 'Write-down' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {proposal.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                £{proposal.originalValue.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                £{proposal.proposedValue.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-medium ${
                  proposal.adjustment > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {proposal.adjustment > 0 ? '+' : ''}£{proposal.adjustment.toLocaleString()}
                </div>
                <div className={`text-xs ${
                  proposal.adjustment > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  ({proposal.percentage > 0 ? '+' : ''}{proposal.percentage}%)
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{proposal.reason}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  proposal.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  proposal.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {proposal.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {proposal.status === 'Pending' ? (
                  <div className="flex space-x-2">
                    <button className="text-green-600 hover:text-green-900">Approve</button>
                    <button className="text-red-600 hover:text-red-900">Reject</button>
                  </div>
                ) : (
                  <button className="text-blue-600 hover:text-blue-900">View</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderDiscounts = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied By</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {discounts.map((discount) => (
            <tr key={discount.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {discount.invoice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {discount.client}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                £{discount.originalAmount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-red-600 font-medium">
                  -£{discount.discountAmount.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  {discount.discountType === 'Percentage' ? `${discount.discountValue}%` : 'Fixed'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                £{discount.finalAmount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {discount.reason}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{discount.appliedBy}</div>
                <div className="text-sm text-gray-500">{discount.appliedDate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderApprovalLimits = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Write-up Limit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Write-down Limit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount Limit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {approvalLimits.map((limit, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {limit.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {typeof limit.writeUpLimit === 'number' ? `£${limit.writeUpLimit.toLocaleString()}` : limit.writeUpLimit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {typeof limit.writeDownLimit === 'number' ? `£${limit.writeDownLimit.toLocaleString()}` : limit.writeDownLimit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {typeof limit.discountLimit === 'number' ? `£${limit.discountLimit.toLocaleString()}` : limit.discountLimit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderAuditTrail = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {auditTrail.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  entry.action.includes('Write-up') ? 'bg-green-100 text-green-800' :
                  entry.action.includes('Write-off') || entry.action.includes('Write-down') ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {entry.action}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {entry.engagement}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`text-sm font-medium ${
                  entry.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {entry.amount > 0 ? '+' : ''}£{Math.abs(entry.amount).toLocaleString()}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {entry.user}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {entry.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {entry.reason}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const totalWriteUps = writeUpDownProposals.filter(p => p.type === 'Write-up' && p.status === 'Approved').reduce((sum, p) => sum + p.adjustment, 0)
  const totalWriteDowns = Math.abs(writeUpDownProposals.filter(p => (p.type === 'Write-down' || p.type === 'Write-off') && p.status === 'Approved').reduce((sum, p) => sum + p.adjustment, 0))
  const totalDiscounts = discounts.reduce((sum, d) => sum + d.discountAmount, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Write-ups/Offs &amp; Discounts</h1>
          <p className="text-gray-600 mt-2">Propose write-up/off per line or invoice, apply discounts with approval limits</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Proposal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Write-ups</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            £{totalWriteUps.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">This period</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Write-downs/Offs</h3>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-red-600">
            £{totalWriteDowns.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">This period</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Discounts</h3>
            <Percent className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            £{totalDiscounts.toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">Applied this period</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Net Impact</h3>
            <DollarSign className="w-5 h-5 text-purple-500" />
          </div>
          <div className={`text-2xl font-bold ${
            (totalWriteUps - totalWriteDowns - totalDiscounts) >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {(totalWriteUps - totalWriteDowns - totalDiscounts) >= 0 ? '+' : ''}£{(totalWriteUps - totalWriteDowns - totalDiscounts).toLocaleString()}
          </div>
          <p className="text-sm text-gray-500 mt-1">On realization</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
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

        <div className="p-6">
          {activeTab === 'proposals' && renderProposals()}
          {activeTab === 'discounts' && renderDiscounts()}
          {activeTab === 'approval-limits' && renderApprovalLimits()}
          {activeTab === 'audit' && renderAuditTrail()}
        </div>
      </div>
    </div>
  )
}

export default WriteUpsOffs

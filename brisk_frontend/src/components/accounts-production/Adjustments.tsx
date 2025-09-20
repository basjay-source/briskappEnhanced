import React, { useState, useEffect } from 'react'

interface Adjustment {
  id: string
  type: 'Year-end' | 'Reclassification' | 'Prior-period' | 'Subsequent Event'
  reference: string
  description: string
  debitAccount: string
  creditAccount: string
  amount: number
  postBackToGL: boolean
  workingPaperRef: string
  status: 'Draft' | 'Approved' | 'Posted'
  createdBy: string
  createdDate: string
}

const Adjustments: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('year-end')
  const [adjustments, setAdjustments] = useState<Adjustment[]>([])

  const sampleAdjustments: Adjustment[] = [
    {
      id: '1',
      type: 'Year-end',
      reference: 'YE001',
      description: 'Accrual for audit fees',
      debitAccount: '7200 - Professional Fees',
      creditAccount: '3200 - Accruals',
      amount: 15000,
      postBackToGL: true,
      workingPaperRef: 'WP-AF-001',
      status: 'Approved',
      createdBy: 'John Smith',
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      type: 'Year-end',
      reference: 'YE002',
      description: 'Prepayment for insurance',
      debitAccount: '2200 - Prepayments',
      creditAccount: '7100 - Insurance',
      amount: 8000,
      postBackToGL: true,
      workingPaperRef: 'WP-INS-001',
      status: 'Approved',
      createdBy: 'Jane Doe',
      createdDate: '2024-01-16'
    },
    {
      id: '3',
      type: 'Reclassification',
      reference: 'RC001',
      description: 'Reclassify loan from current to long-term',
      debitAccount: '4200 - Long-term Loans',
      creditAccount: '3400 - Short-term Loans',
      amount: 100000,
      postBackToGL: false,
      workingPaperRef: 'WP-LOAN-001',
      status: 'Approved',
      createdBy: 'Sarah Wilson',
      createdDate: '2024-01-20'
    }
  ]

  useEffect(() => {
    setAdjustments(sampleAdjustments)
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredAdjustments = adjustments.filter(adj => {
    if (activeTab === 'year-end') return adj.type === 'Year-end'
    if (activeTab === 'reclassifications') return adj.type === 'Reclassification'
    if (activeTab === 'prior-period') return adj.type === 'Prior-period'
    if (activeTab === 'subsequent-events') return adj.type === 'Subsequent Event'
    return true
  })

  const approveAdjustment = (id: string) => {
    setAdjustments(prev => prev.map(adj => 
      adj.id === id ? { ...adj, status: 'Approved' as const } : adj
    ))
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
        <h1 className="text-2xl font-bold text-gray-900">Adjustments</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => {/* Add adjustment functionality */}}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Adjustment
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Post to GL
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'year-end', label: 'Year-end Adjustments' },
            { id: 'reclassifications', label: 'Reclassifications' },
            { id: 'prior-period', label: 'Prior-period' },
            { id: 'subsequent-events', label: 'Subsequent Events' }
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAdjustments.map((adjustment) => (
                <tr key={adjustment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {adjustment.reference}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{adjustment.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                    £{adjustment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      adjustment.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                      adjustment.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {adjustment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {adjustment.status === 'Draft' && (
                      <button 
                        onClick={() => approveAdjustment(adjustment.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                    )}
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Adjustments</h3>
          <p className="text-2xl font-bold text-gray-900">{adjustments.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Draft</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {adjustments.filter(adj => adj.status === 'Draft').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Approved</h3>
          <p className="text-2xl font-bold text-green-600">
            {adjustments.filter(adj => adj.status === 'Approved').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Posted</h3>
          <p className="text-2xl font-bold text-blue-600">
            {adjustments.filter(adj => adj.status === 'Posted').length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Adjustments

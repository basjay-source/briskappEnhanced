import React, { useState, useEffect } from 'react'

interface P60Record {
  id: string
  employee: string
  taxYear: string
  totalPay: number
  totalTax: number
  totalNI: number
  status: 'Generated' | 'Distributed' | 'Pending'
  generatedDate: string
}

interface P11DRecord {
  id: string
  employee: string
  taxYear: string
  totalBenefits: number
  class1ANI: number
  status: 'Draft' | 'Filed' | 'Pending'
  filingDate?: string
}

const YearEnd: React.FC = () => {
  const [activeTab, setActiveTab] = useState('p60')
  const [p60Records, setP60Records] = useState<P60Record[]>([])
  const [p11dRecords, setP11DRecords] = useState<P11DRecord[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'p60', label: 'P60', icon: '📄' },
    { id: 'p11d-cycle', label: 'P11D Cycle', icon: '🔄' },
    { id: 'roll-forward', label: 'Roll-Forward', icon: '➡️' },
    { id: 'final-submissions', label: 'Final Submissions', icon: '📤' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setP60Records([
        {
          id: '1',
          employee: 'John Smith',
          taxYear: '2023-24',
          totalPay: 45000,
          totalTax: 6700,
          totalNI: 3240,
          status: 'Generated',
          generatedDate: '2024-04-05'
        },
        {
          id: '2',
          employee: 'Emma Davis',
          taxYear: '2023-24',
          totalPay: 38000,
          totalTax: 4600,
          totalNI: 2640,
          status: 'Distributed',
          generatedDate: '2024-04-05'
        },
        {
          id: '3',
          employee: 'Michael Brown',
          taxYear: '2023-24',
          totalPay: 52000,
          totalTax: 8400,
          totalNI: 4080,
          status: 'Pending',
          generatedDate: '2024-04-05'
        }
      ])

      setP11DRecords([
        {
          id: '1',
          employee: 'John Smith',
          taxYear: '2023-24',
          totalBenefits: 4800,
          class1ANI: 662,
          status: 'Filed',
          filingDate: '2024-07-06'
        },
        {
          id: '2',
          employee: 'Sarah Wilson',
          taxYear: '2023-24',
          totalBenefits: 3200,
          class1ANI: 442,
          status: 'Draft'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Generated': 'bg-blue-100 text-blue-800',
      'Distributed': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Draft': 'bg-gray-100 text-gray-800',
      'Filed': 'bg-green-100 text-green-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderP60Tab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">P60 End of Year Certificates</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate All P60s
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Distribute to Portal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">156</div>
          <div className="text-sm text-gray-600">Total Employees</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">142</div>
          <div className="text-sm text-gray-600">P60s Generated</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">128</div>
          <div className="text-sm text-gray-600">Distributed</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">14</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
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
                Total Pay
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax &amp; NI
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
            {p60Records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{record.employee}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{record.taxYear}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{record.totalPay.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Tax: £{record.totalTax.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">NI: £{record.totalNI.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(record.status)}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Download</button>
                  <button className="text-gray-600 hover:text-gray-900">Email</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderP11DCycleTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">P11D Benefits Cycle</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate P11D Forms
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            File with HMRC
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">£24,800</div>
          <div className="text-sm text-gray-600">Total Benefits Value</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">£3,426</div>
          <div className="text-sm text-gray-600">Class 1A NI Due</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">12</div>
          <div className="text-sm text-gray-600">P11D Forms Required</div>
        </div>
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {p11dRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{record.employee}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{record.taxYear}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{record.totalBenefits.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">£{record.class1ANI.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(record.status)}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">File</button>
                  <button className="text-gray-600 hover:text-gray-900">Copy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderRollForwardTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Year Roll-Forward Process</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <h4 className="font-medium text-green-900">2023-24 Tax Year</h4>
              <p className="text-sm text-green-700">Completed and locked</p>
            </div>
            <div className="text-green-600">✓ Complete</div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div>
              <h4 className="font-medium text-blue-900">2024-25 Tax Year</h4>
              <p className="text-sm text-blue-700">Current active tax year</p>
            </div>
            <div className="text-blue-600">● Active</div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Roll-Forward Checklist</h4>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>✓ P60s generated and distributed</li>
                <li>✓ P11D forms filed</li>
                <li>✓ Final RTI submissions completed</li>
                <li>✓ Year-end journals posted</li>
                <li>✓ Employee records updated</li>
              </ul>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Start Roll-Forward
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderFinalSubmissionsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Final Year-End Submissions</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">HMRC Submissions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Final FPS:</span>
                  <span className="text-green-600">✓ Submitted</span>
                </div>
                <div className="flex justify-between">
                  <span>Final EPS:</span>
                  <span className="text-green-600">✓ Submitted</span>
                </div>
                <div className="flex justify-between">
                  <span>P11D(b) Return:</span>
                  <span className="text-green-600">✓ Filed</span>
                </div>
                <div className="flex justify-between">
                  <span>Class 1A Payment:</span>
                  <span className="text-blue-600">Due 22/07/2024</span>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Internal Processes</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Payroll Archive:</span>
                  <span className="text-green-600">✓ Complete</span>
                </div>
                <div className="flex justify-between">
                  <span>Audit Trail:</span>
                  <span className="text-green-600">✓ Exported</span>
                </div>
                <div className="flex justify-between">
                  <span>Document Retention:</span>
                  <span className="text-green-600">✓ Applied</span>
                </div>
                <div className="flex justify-between">
                  <span>Backup Created:</span>
                  <span className="text-green-600">✓ Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'p60': return renderP60Tab()
      case 'p11d-cycle': return renderP11DCycleTab()
      case 'roll-forward': return renderRollForwardTab()
      case 'final-submissions': return renderFinalSubmissionsTab()
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600">
              Streamlined year-end processing with automated P60 generation and roll-forward.
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
          <h1 className="text-2xl font-bold text-gray-900">Year-End</h1>
          <p className="text-gray-600">Manage year-end processes and submissions</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export Archive
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Year-End Report
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

export default YearEnd

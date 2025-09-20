import React, { useState, useEffect } from 'react'

interface PensionScheme {
  id: string
  name: string
  provider: string
  type: 'Defined Contribution' | 'Defined Benefit' | 'Hybrid'
  employerRate: number
  employeeRate: number
  members: number
  status: 'Active' | 'Inactive'
  nextContribution: string
}

interface Assessment {
  id: string
  employee: string
  assessmentDate: string
  category: 'Eligible' | 'Non-eligible' | 'Entitled'
  action: 'Auto-enrol' | 'Defer' | 'Opt-out' | 'No action'
  scheme: string
  status: 'Pending' | 'Complete'
}

const AutoEnrolmentPensions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('schemes')
  const [schemes, setSchemes] = useState<PensionScheme[]>([])
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)

  const tabs = [
    { id: 'schemes', label: 'Schemes', icon: '🏦' },
    { id: 'assessment', label: 'Assessment', icon: '📊' },
    { id: 'contributions', label: 'Contributions', icon: '💰' },
    { id: 'communications', label: 'Communications', icon: '📧' },
    { id: 're-enrolment', label: 'Re-Enrolment', icon: '🔄' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setSchemes([
        {
          id: '1',
          name: 'Company Pension Scheme',
          provider: 'NEST',
          type: 'Defined Contribution',
          employerRate: 3,
          employeeRate: 5,
          members: 142,
          status: 'Active',
          nextContribution: '31/01/2024'
        },
        {
          id: '2',
          name: 'Executive Scheme',
          provider: 'Aviva',
          type: 'Defined Contribution',
          employerRate: 8,
          employeeRate: 8,
          members: 12,
          status: 'Active',
          nextContribution: '31/01/2024'
        }
      ])

      setAssessments([
        {
          id: '1',
          employee: 'John Smith',
          assessmentDate: '2024-01-15',
          category: 'Eligible',
          action: 'Auto-enrol',
          scheme: 'Company Pension Scheme',
          status: 'Pending'
        },
        {
          id: '2',
          employee: 'Emma Davis',
          assessmentDate: '2024-01-10',
          category: 'Non-eligible',
          action: 'No action',
          scheme: 'N/A',
          status: 'Complete'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Complete': 'bg-green-100 text-green-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      'Eligible': 'bg-green-100 text-green-800',
      'Non-eligible': 'bg-gray-100 text-gray-800',
      'Entitled': 'bg-blue-100 text-blue-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderSchemesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Pension Schemes</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add Scheme
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-lg shadow p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{scheme.name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(scheme.status)}`}>
                {scheme.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Provider:</span>
                <span className="text-sm font-medium">{scheme.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Type:</span>
                <span className="text-sm font-medium">{scheme.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Employer Rate:</span>
                <span className="text-sm font-medium">{scheme.employerRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Employee Rate:</span>
                <span className="text-sm font-medium">{scheme.employeeRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Members:</span>
                <span className="text-sm font-medium">{scheme.members}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Next Contribution:</span>
                <span className="text-sm font-medium text-blue-600">{scheme.nextContribution}</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                Manage
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                Reports
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAssessmentTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Auto-Enrolment Assessment</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Run Assessment
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
                Assessment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scheme
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
            {assessments.map((assessment) => (
              <tr key={assessment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{assessment.employee}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{assessment.assessmentDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(assessment.category)}`}>
                    {assessment.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{assessment.action}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{assessment.scheme}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(assessment.status)}`}>
                    {assessment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Process</button>
                  <button className="text-green-600 hover:text-green-900">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderContributionsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contribution Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">£18,450</div>
            <div className="text-sm text-gray-600">This Month Employer</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">£24,600</div>
            <div className="text-sm text-gray-600">This Month Employee</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">£43,050</div>
            <div className="text-sm text-gray-600">Total Contributions</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'schemes': return renderSchemesTab()
      case 'assessment': return renderAssessmentTab()
      case 'contributions': return renderContributionsTab()
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
          <h1 className="text-2xl font-bold text-gray-900">Auto-Enrolment &amp; Pensions</h1>
          <p className="text-gray-600">Manage pension schemes, assessments, and compliance</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate Reports
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

export default AutoEnrolmentPensions

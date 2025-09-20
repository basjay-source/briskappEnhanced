import React, { useState, useEffect } from 'react'

interface Employee {
  id: string
  employeeNumber: string
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
  startDate: string
  status: 'Active' | 'Leaver' | 'Starter'
  payProfile: string
  taxCode: string
  niCategory: string
  salary: number
  bankDetails: boolean
  rtwDocs: boolean
}

const Employees: React.FC = () => {
  const [activeTab, setActiveTab] = useState('people')
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const tabs = [
    { id: 'people', label: 'People', icon: '👥' },
    { id: 'starters', label: 'Starters', icon: '🆕' },
    { id: 'leavers', label: 'Leavers', icon: '👋' },
    { id: 'rtw-docs', label: 'Right-to-Work &amp; Docs', icon: '📄' },
    { id: 'bank-contact', label: 'Bank/Contact', icon: '🏦' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setEmployees([
        {
          id: '1',
          employeeNumber: 'EMP001',
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@acme.com',
          department: 'Finance',
          position: 'Senior Accountant',
          startDate: '2022-03-15',
          status: 'Active',
          payProfile: 'Monthly Salary',
          taxCode: '1257L',
          niCategory: 'A',
          salary: 45000,
          bankDetails: true,
          rtwDocs: true
        },
        {
          id: '2',
          employeeNumber: 'EMP002',
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.johnson@acme.com',
          department: 'HR',
          position: 'HR Manager',
          startDate: '2021-09-01',
          status: 'Active',
          payProfile: 'Monthly Salary',
          taxCode: '1257L',
          niCategory: 'A',
          salary: 52000,
          bankDetails: true,
          rtwDocs: true
        },
        {
          id: '3',
          employeeNumber: 'EMP003',
          firstName: 'Michael',
          lastName: 'Brown',
          email: 'michael.brown@acme.com',
          department: 'Operations',
          position: 'Operations Assistant',
          startDate: '2024-01-08',
          status: 'Starter',
          payProfile: 'Weekly Wages',
          taxCode: 'BR',
          niCategory: 'A',
          salary: 28000,
          bankDetails: false,
          rtwDocs: false
        },
        {
          id: '4',
          employeeNumber: 'EMP004',
          firstName: 'Emma',
          lastName: 'Davis',
          email: 'emma.davis@acme.com',
          department: 'Marketing',
          position: 'Marketing Coordinator',
          startDate: '2020-11-12',
          status: 'Leaver',
          payProfile: 'Monthly Salary',
          taxCode: '1257L',
          niCategory: 'A',
          salary: 38000,
          bankDetails: true,
          rtwDocs: true
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = `${employee.firstName} ${employee.lastName} ${employee.employeeNumber} ${employee.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || employee.status.toLowerCase() === filterStatus.toLowerCase()
    
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Starter': 'bg-blue-100 text-blue-800',
      'Leaver': 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const renderPeopleTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="starter">Starter</option>
          <option value="leaver">Leaver</option>
        </select>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Employee
        </button>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pay Profile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax Details
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
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                        {employee.firstName[0]}{employee.lastName[0]}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {employee.firstName} {employee.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee.employeeNumber} • {employee.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.department}</div>
                  <div className="text-sm text-gray-500">{employee.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.payProfile}</div>
                  <div className="text-sm text-gray-500">£{employee.salary.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Tax: {employee.taxCode}</div>
                  <div className="text-sm text-gray-500">NI: {employee.niCategory}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(employee.status)}`}>
                    {employee.status}
                  </span>
                  <div className="flex space-x-1 mt-1">
                    {!employee.bankDetails && (
                      <span className="inline-flex px-1 py-0.5 text-xs bg-red-100 text-red-800 rounded">
                        No Bank
                      </span>
                    )}
                    {!employee.rtwDocs && (
                      <span className="inline-flex px-1 py-0.5 text-xs bg-orange-100 text-orange-800 rounded">
                        No RTW
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Payslip</button>
                  <button className="text-gray-600 hover:text-gray-900">More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderStartersTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">New Starters Workflow</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Pending Setup</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                <span className="text-sm">Michael Brown</span>
                <span className="text-xs text-orange-600">Missing Bank Details</span>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Documents Required</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="text-sm">Michael Brown</span>
                <span className="text-xs text-red-600">RTW Documents</span>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Ready for Payroll</h4>
            <div className="text-sm text-gray-500">No employees ready</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLeaversTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leavers Processing</h3>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Emma Davis</h4>
                <p className="text-sm text-gray-500">Marketing Coordinator • Left: 15 Jan 2024</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  Generate P45
                </button>
                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                  Final Pay
                </button>
              </div>
            </div>
            <div className="mt-3 flex space-x-4 text-sm">
              <span className="text-green-600">✓ Final timesheet approved</span>
              <span className="text-green-600">✓ Equipment returned</span>
              <span className="text-orange-600">⚠ P45 pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRTWDocsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Right-to-Work Documents</h3>
        <div className="space-y-4">
          {employees.filter(emp => !emp.rtwDocs).map(employee => (
            <div key={employee.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{employee.firstName} {employee.lastName}</h4>
                  <p className="text-sm text-gray-500">{employee.department} • {employee.position}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Upload Docs
                  </button>
                  <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700">
                    Request
                  </button>
                </div>
              </div>
              <div className="mt-2 text-sm text-red-600">
                ⚠ Right-to-work documents required before first pay run
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderBankContactTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Details &amp; Contact Information</h3>
        <div className="space-y-4">
          {employees.filter(emp => !emp.bankDetails).map(employee => (
            <div key={employee.id} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{employee.firstName} {employee.lastName}</h4>
                  <p className="text-sm text-gray-500">{employee.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Add Bank Details
                  </button>
                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                    Send Request
                  </button>
                </div>
              </div>
              <div className="mt-2 text-sm text-orange-600">
                ⚠ Bank details required for payment processing
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'people': return renderPeopleTab()
      case 'starters': return renderStartersTab()
      case 'leavers': return renderLeaversTab()
      case 'rtw-docs': return renderRTWDocsTab()
      case 'bank-contact': return renderBankContactTab()
      default: return renderPeopleTab()
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
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600">Manage employee records, starters, leavers, and documentation</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Import Employees
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Export Data
          </button>
        </div>
      </div>

      {/* Tabs */}
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

      {/* Tab Content */}
      {renderTabContent()}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Employee</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Employee Number"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Department</option>
                <option>Finance</option>
                <option>HR</option>
                <option>Operations</option>
                <option>Marketing</option>
              </select>
              <input
                type="text"
                placeholder="Position"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Employees

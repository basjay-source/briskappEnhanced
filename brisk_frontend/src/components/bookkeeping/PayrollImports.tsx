import React, { useState, useEffect } from 'react'
import { Upload, Users, FileText, RefreshCw, Settings, CheckCircle, AlertCircle, Download } from 'lucide-react'

interface PayrollJournal {
  id: number
  pay_run_id: number
  description: string
  total_debit: number
  total_credit: number
  status: string
  created_at: string
}

interface Employee {
  id: number
  employee_number: string
  full_name: string
  department: string
  status: string
  last_synced: string
}

const PayrollImports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('payroll-journals')
  const [payrollJournals, setPayrollJournals] = useState<PayrollJournal[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle')

  const tabs = [
    { id: 'payroll-journals', name: 'Payroll Journals', icon: FileText },
    { id: 'employee-sync', name: 'Employee Sync', icon: Users },
    { id: 'benefits-mapping', name: 'Benefits/P11D Mapping', icon: Settings },
    { id: 'import-history', name: 'Import History', icon: Upload },
    { id: 'reconciliation', name: 'Reconciliation', icon: RefreshCw }
  ]

  useEffect(() => {
    if (activeTab === 'payroll-journals') {
      fetchPayrollJournals()
    } else if (activeTab === 'employee-sync') {
      fetchEmployees()
    }
  }, [activeTab])

  const fetchPayrollJournals = async () => {
    try {
      const mockJournals: PayrollJournal[] = [
        {
          id: 1,
          pay_run_id: 101,
          description: 'March 2024 Monthly Payroll',
          total_debit: 284750.00,
          total_credit: 284750.00,
          status: 'posted',
          created_at: '2024-03-31T10:00:00Z'
        },
        {
          id: 2,
          pay_run_id: 102,
          description: 'March 2024 Bonus Run',
          total_debit: 25000.00,
          total_credit: 25000.00,
          status: 'pending',
          created_at: '2024-03-28T14:30:00Z'
        }
      ]
      setPayrollJournals(mockJournals)
    } catch (error) {
      console.error('Error fetching payroll journals:', error)
    }
  }

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/payroll/employees', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setEmployees(data)
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  const handleSyncEmployees = async () => {
    setSyncStatus('syncing')
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSyncStatus('success')
      await fetchEmployees()
    } catch (error) {
      setSyncStatus('error')
      console.error('Error syncing employees:', error)
    } finally {
      setLoading(false)
      setTimeout(() => setSyncStatus('idle'), 3000)
    }
  }

  const handleImportJournals = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('Payroll journals imported successfully')
      await fetchPayrollJournals()
    } catch (error) {
      console.error('Error importing journals:', error)
      alert('Error importing journals')
    } finally {
      setLoading(false)
    }
  }

  const renderPayrollJournalsTab = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Payroll Journal Integration</h4>
        <p className="text-blue-700 text-sm">
          Import journal entries from payroll runs directly into the bookkeeping system with automatic GL account mapping.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Available Payroll Journals</h4>
        <button
          onClick={handleImportJournals}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Importing...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Import Selected</span>
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payrollJournals.map((journal) => (
              <tr key={journal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{journal.description}</div>
                    <div className="text-sm text-gray-500">Pay Run #{journal.pay_run_id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  £{journal.total_debit.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    journal.status === 'posted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {journal.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(journal.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-green-600 hover:text-green-900">Import</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderEmployeeSyncTab = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">Employee Synchronization</h4>
        <p className="text-green-700 text-sm">
          Keep employee records synchronized between payroll and bookkeeping systems for accurate cost allocation.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h4 className="font-medium text-gray-900">Employee Records</h4>
          {syncStatus === 'success' && (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              Sync completed successfully
            </div>
          )}
          {syncStatus === 'error' && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              Sync failed
            </div>
          )}
        </div>
        <button
          onClick={handleSyncEmployees}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Syncing...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>Sync Now</span>
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Synced
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.slice(0, 10).map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {employee.employee_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.full_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.last_synced ? new Date(employee.last_synced).toLocaleDateString() : 'Never'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderBenefitsMappingTab = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-medium text-purple-900 mb-2">Benefits & P11D Mapping</h4>
        <p className="text-purple-700 text-sm">
          Configure how employee benefits and P11D items are mapped to bookkeeping accounts for accurate reporting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h5 className="font-medium text-gray-900 mb-3">Benefit Types</h5>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Company Car</span>
              <span className="text-sm font-medium">Account 7100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Medical Insurance</span>
              <span className="text-sm font-medium">Account 7110</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Life Insurance</span>
              <span className="text-sm font-medium">Account 7120</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h5 className="font-medium text-gray-900 mb-3">P11D Categories</h5>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Fuel Benefit</span>
              <span className="text-sm font-medium">Account 7130</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Accommodation</span>
              <span className="text-sm font-medium">Account 7140</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Other Benefits</span>
              <span className="text-sm font-medium">Account 7150</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderImportHistoryTab = () => (
    <div className="space-y-6">
      <h4 className="font-medium text-gray-900">Import History</h4>
      
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">March 2024 Payroll Import</h5>
              <p className="text-sm text-gray-600">Imported 247 employee records and journal entries</p>
              <p className="text-xs text-gray-500">Completed on 31/03/2024 at 10:15 AM</p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <button className="text-blue-600 hover:text-blue-900 text-sm">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">February 2024 Payroll Import</h5>
              <p className="text-sm text-gray-600">Imported 245 employee records and journal entries</p>
              <p className="text-xs text-gray-500">Completed on 29/02/2024 at 09:30 AM</p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <button className="text-blue-600 hover:text-blue-900 text-sm">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderReconciliationTab = () => (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h4 className="font-medium text-orange-900 mb-2">Payroll Reconciliation</h4>
        <p className="text-orange-700 text-sm">
          Reconcile payroll costs between the payroll system and bookkeeping records to ensure accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <h5 className="font-medium text-gray-900 mb-2">Payroll System</h5>
          <p className="text-2xl font-bold text-blue-600">£284,750</p>
          <p className="text-sm text-gray-600">March 2024 Total</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <h5 className="font-medium text-gray-900 mb-2">Bookkeeping</h5>
          <p className="text-2xl font-bold text-green-600">£284,750</p>
          <p className="text-sm text-gray-600">GL Account Total</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <h5 className="font-medium text-gray-900 mb-2">Variance</h5>
          <p className="text-2xl font-bold text-gray-600">£0</p>
          <p className="text-sm text-gray-600">Difference</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
          Run Reconciliation
        </button>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'payroll-journals':
        return renderPayrollJournalsTab()
      case 'employee-sync':
        return renderEmployeeSyncTab()
      case 'benefits-mapping':
        return renderBenefitsMappingTab()
      case 'import-history':
        return renderImportHistoryTab()
      case 'reconciliation':
        return renderReconciliationTab()
      default:
        return renderPayrollJournalsTab()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Imports</h1>
          <p className="text-gray-600">Integrate payroll data with bookkeeping system</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleImportJournals}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Import Payroll</span>
          </button>
          <button
            onClick={handleSyncEmployees}
            className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Sync Employees</span>
          </button>
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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default PayrollImports

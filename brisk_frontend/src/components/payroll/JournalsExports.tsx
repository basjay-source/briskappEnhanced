import React, { useState, useEffect } from 'react'
import { FileText, Download, Settings, RotateCcw, Eye, CheckCircle } from 'lucide-react'

interface PayRun {
  id: number
  description: string
  pay_period_start: string
  pay_period_end: string
  total_gross: number
  total_net: number
  employee_count: number
  status: string
}

interface JournalMapping {
  element_code: string
  element_name: string
  gl_account: string
  department_dimension: string
  cost_center: string
}

const JournalsExports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mapping')
  const [payRuns, setPayRuns] = useState<PayRun[]>([])
  const [selectedPayRun, setSelectedPayRun] = useState<number | null>(null)
  const [journalMappings, setJournalMappings] = useState<JournalMapping[]>([])
  const [loading, setLoading] = useState(false)

  const tabs = [
    { id: 'mapping', label: 'Mapping', icon: Settings },
    { id: 'preview-post', label: 'Preview &amp; Post', icon: Eye },
    { id: 'dimensions-split', label: 'Dimensions Split', icon: FileText },
    { id: 'reversals', label: 'Reversals', icon: RotateCcw }
  ]

  useEffect(() => {
    fetchPayRuns()
    fetchJournalMappings()
  }, [])

  const fetchPayRuns = async () => {
    try {
      const response = await fetch('/api/payroll/pay-runs?status=committed', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setPayRuns(data)
      }
    } catch (error) {
      console.error('Error fetching pay runs:', error)
    }
  }

  const fetchJournalMappings = async () => {
    try {
      const mappings: JournalMapping[] = [
        { element_code: 'BASIC', element_name: 'Basic Salary', gl_account: '7000', department_dimension: 'DEPT', cost_center: 'CC001' },
        { element_code: 'BONUS', element_name: 'Bonus Payment', gl_account: '7010', department_dimension: 'DEPT', cost_center: 'CC001' },
        { element_code: 'PAYE', element_name: 'PAYE Tax', gl_account: '2200', department_dimension: 'DEPT', cost_center: 'CC001' },
        { element_code: 'NI_EE', element_name: 'Employee NI', gl_account: '2210', department_dimension: 'DEPT', cost_center: 'CC001' },
        { element_code: 'NI_ER', element_name: 'Employer NI', gl_account: '7020', department_dimension: 'DEPT', cost_center: 'CC001' },
        { element_code: 'PENSION_EE', element_name: 'Employee Pension', gl_account: '2220', department_dimension: 'DEPT', cost_center: 'CC001' },
        { element_code: 'PENSION_ER', element_name: 'Employer Pension', gl_account: '7030', department_dimension: 'DEPT', cost_center: 'CC001' }
      ]
      setJournalMappings(mappings)
    } catch (error) {
      console.error('Error fetching journal mappings:', error)
    }
  }

  const handleExportJournals = async () => {
    if (!selectedPayRun) return

    setLoading(true)
    try {
      const response = await fetch('/api/payroll/journals/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          pay_run_id: selectedPayRun,
          mapping_config: journalMappings
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Journal export successful:', data)
        alert('Journals exported successfully to bookkeeping module')
      }
    } catch (error) {
      console.error('Error exporting journals:', error)
      alert('Error exporting journals')
    } finally {
      setLoading(false)
    }
  }

  const renderMappingTab = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Journal Mapping Configuration</h4>
        <p className="text-blue-700 text-sm">
          Configure how payroll elements map to general ledger accounts and dimensions for automatic journal creation.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Element Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Element Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GL Account
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost Center
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {journalMappings.map((mapping, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {mapping.element_code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mapping.element_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <input
                    type="text"
                    value={mapping.gl_account}
                    onChange={(e) => {
                      const updated = [...journalMappings]
                      updated[index].gl_account = e.target.value
                      setJournalMappings(updated)
                    }}
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-20"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <input
                    type="text"
                    value={mapping.department_dimension}
                    onChange={(e) => {
                      const updated = [...journalMappings]
                      updated[index].department_dimension = e.target.value
                      setJournalMappings(updated)
                    }}
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-20"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <input
                    type="text"
                    value={mapping.cost_center}
                    onChange={(e) => {
                      const updated = [...journalMappings]
                      updated[index].cost_center = e.target.value
                      setJournalMappings(updated)
                    }}
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-20"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Save Mapping Configuration
        </button>
      </div>
    </div>
  )

  const renderPreviewPostTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Select Pay Run for Journal Creation</h4>
        <button
          onClick={handleExportJournals}
          disabled={!selectedPayRun || loading}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Post to Bookkeeping</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {payRuns.map((payRun) => (
          <div
            key={payRun.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedPayRun === payRun.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedPayRun(payRun.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium text-gray-900">{payRun.description}</h5>
                <p className="text-sm text-gray-600">
                  {payRun.pay_period_start} to {payRun.pay_period_end}
                </p>
                <p className="text-sm text-gray-600">
                  {payRun.employee_count} employees • £{payRun.total_gross.toLocaleString()} gross
                </p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  payRun.status === 'committed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {payRun.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPayRun && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h5 className="font-medium text-gray-900 mb-3">Journal Preview</h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Gross Pay (Dr)</span>
              <span>£284,750.00</span>
            </div>
            <div className="flex justify-between">
              <span>PAYE Tax (Cr)</span>
              <span>£42,150.00</span>
            </div>
            <div className="flex justify-between">
              <span>Employee NI (Cr)</span>
              <span>£18,240.00</span>
            </div>
            <div className="flex justify-between">
              <span>Employee Pension (Cr)</span>
              <span>£14,238.00</span>
            </div>
            <div className="flex justify-between">
              <span>Net Pay (Cr)</span>
              <span>£210,122.00</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <span>Employer NI (Dr)</span>
              <span>£25,536.00</span>
            </div>
            <div className="flex justify-between">
              <span>Employer Pension (Dr)</span>
              <span>£8,543.00</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderDimensionsSplitTab = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">Dimensions Split Configuration</h4>
        <p className="text-yellow-700 text-sm">
          Configure how payroll costs are split across departments, projects, and cost centers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h5 className="font-medium text-gray-900 mb-3">Department Split</h5>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Finance</span>
              <span className="text-sm font-medium">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Operations</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Marketing</span>
              <span className="text-sm font-medium">20%</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h5 className="font-medium text-gray-900 mb-3">Project Allocation</h5>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Project Alpha</span>
              <span className="text-sm font-medium">60%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Project Beta</span>
              <span className="text-sm font-medium">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Overhead</span>
              <span className="text-sm font-medium">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderReversalsTab = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="font-medium text-red-900 mb-2">Journal Reversals</h4>
        <p className="text-red-700 text-sm">
          Create reversal entries for payroll accruals or corrections.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h5 className="font-medium text-gray-900 mb-3">Recent Reversals</h5>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="text-sm font-medium text-gray-900">March 2024 Accrual Reversal</p>
              <p className="text-xs text-gray-600">Reversed on 01/04/2024</p>
            </div>
            <span className="text-sm text-gray-600">£284,750.00</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="text-sm font-medium text-gray-900">Bonus Correction</p>
              <p className="text-xs text-gray-600">Reversed on 28/03/2024</p>
            </div>
            <span className="text-sm text-gray-600">£5,000.00</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
          Create Reversal Entry
        </button>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'mapping':
        return renderMappingTab()
      case 'preview-post':
        return renderPreviewPostTab()
      case 'dimensions-split':
        return renderDimensionsSplitTab()
      case 'reversals':
        return renderReversalsTab()
      default:
        return renderMappingTab()
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Journals &amp; Exports</h1>
          <p className="text-gray-600">Manage payroll journal entries and data exports to bookkeeping</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
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
                <span>{tab.label}</span>
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

export default JournalsExports

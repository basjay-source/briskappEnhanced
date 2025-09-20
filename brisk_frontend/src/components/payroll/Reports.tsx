import React, { useState, useEffect } from 'react'

interface ReportData {
  id: string
  name: string
  period: string
  employees: number
  grossPay: number
  netPay: number
  deductions: number
  variance: number
}

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('payslip-summary')
  const [reportData, setReportData] = useState<ReportData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01')

  const tabs = [
    { id: 'payslip-summary', label: 'Payslip Summary', icon: '📄' },
    { id: 'gross-to-net', label: 'Gross-to-Net', icon: '💰' },
    { id: 'variance', label: 'Variance', icon: '📊' },
    { id: 'cost-by-dept', label: 'Cost by Dept/Project', icon: '🏢' },
    { id: 'hmrc-reports', label: 'HMRC Reports', icon: '🏛️' },
    { id: 'pension-reports', label: 'Pension Reports', icon: '🏦' },
    { id: 'audit-trail', label: 'Audit Trail', icon: '🔍' },
    { id: 'custom', label: 'Custom', icon: '⚙️' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setReportData([
        {
          id: '1',
          name: 'January 2024 Monthly',
          period: '2024-01',
          employees: 156,
          grossPay: 485750,
          netPay: 342850,
          deductions: 142900,
          variance: 2.3
        },
        {
          id: '2',
          name: 'December 2023 Monthly',
          period: '2023-12',
          employees: 152,
          grossPay: 472300,
          netPay: 335200,
          deductions: 137100,
          variance: -1.2
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const renderPayslipSummary = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Payslip Summary Report</h3>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="2024-01">January 2024</option>
            <option value="2023-12">December 2023</option>
            <option value="2023-11">November 2023</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Export PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">John Smith</div>
                <div className="text-sm text-gray-500">EMP001 • Finance</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£3,750.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£1,125.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£2,625.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">View Payslip</button>
                <button className="text-green-600 hover:text-green-900">Drill Down</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderGrossToNet = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Gross-to-Net Analysis</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Export Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Total Gross Pay</h4>
          <div className="text-3xl font-bold text-blue-600">£485,750</div>
          <div className="text-sm text-gray-500 mt-2">156 employees</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Total Deductions</h4>
          <div className="text-3xl font-bold text-red-600">£142,900</div>
          <div className="text-sm text-gray-500 mt-2">29.4% of gross</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Total Net Pay</h4>
          <div className="text-3xl font-bold text-green-600">£342,850</div>
          <div className="text-sm text-gray-500 mt-2">70.6% of gross</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Deduction Breakdown</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">PAYE Tax</span>
            <span className="text-gray-900">£89,250 (18.4%)</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">National Insurance</span>
            <span className="text-gray-900">£42,150 (8.7%)</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">Pension Contributions</span>
            <span className="text-gray-900">£11,500 (2.4%)</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderVarianceReport = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Variance Analysis</h3>
        <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
          Investigate Variances
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reportData.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{(report.grossPay - report.variance * 1000).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{report.grossPay.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm ${report.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {report.variance > 0 ? '+' : ''}{report.variance}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">Drill Down</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderCostByDept = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Cost by Department/Project</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Export Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Department Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Finance</span>
              <span className="text-gray-900">£125,750 (25.9%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Operations</span>
              <span className="text-gray-900">£189,200 (38.9%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Sales &amp; Marketing</span>
              <span className="text-gray-900">£98,450 (20.3%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">IT &amp; Development</span>
              <span className="text-gray-900">£72,350 (14.9%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Allocation</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Project Alpha</span>
              <span className="text-gray-900">£156,200</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Project Beta</span>
              <span className="text-gray-900">£98,750</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">BAU Operations</span>
              <span className="text-gray-900">£230,800</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderHMRCReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">HMRC Reports</h3>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Submit RTI
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Download P60s
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">FPS Submissions</h4>
          <div className="text-2xl font-bold text-green-600 mb-2">12</div>
          <div className="text-sm text-gray-500">This tax year</div>
          <button className="mt-3 text-blue-600 hover:text-blue-900 text-sm">View Details</button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">EPS Submissions</h4>
          <div className="text-2xl font-bold text-blue-600 mb-2">4</div>
          <div className="text-sm text-gray-500">This tax year</div>
          <button className="mt-3 text-blue-600 hover:text-blue-900 text-sm">View Details</button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">P60 Forms</h4>
          <div className="text-2xl font-bold text-orange-600 mb-2">156</div>
          <div className="text-sm text-gray-500">Generated</div>
          <button className="mt-3 text-blue-600 hover:text-blue-900 text-sm">Download All</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">FPS-2024-01</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Full Payment Submission</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">31/01/2024</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Accepted
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderPensionReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Pension Reports</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Generate AE Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Auto-Enrolled</h4>
          <div className="text-2xl font-bold text-green-600 mb-2">142</div>
          <div className="text-sm text-gray-500">Employees</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Opted Out</h4>
          <div className="text-2xl font-bold text-red-600 mb-2">8</div>
          <div className="text-sm text-gray-500">Employees</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Contributions</h4>
          <div className="text-2xl font-bold text-blue-600 mb-2">£11,500</div>
          <div className="text-sm text-gray-500">This month</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Next Assessment</h4>
          <div className="text-2xl font-bold text-orange-600 mb-2">15</div>
          <div className="text-sm text-gray-500">Days</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Contribution Breakdown</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">Employee Contributions (5%)</span>
            <span className="text-gray-900">£5,750</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">Employer Contributions (3%)</span>
            <span className="text-gray-900">£3,450</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">Tax Relief (2%)</span>
            <span className="text-gray-900">£2,300</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAuditTrail = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Audit Trail</h3>
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Search audit logs..."
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Export Logs
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-31 14:30:25</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sarah Johnson</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Pay Run Approved</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">PR-2024-01</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">January 2024 Monthly</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-31 12:15:10</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mike Chen</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Employee Updated</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">EMP001</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Salary adjustment</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-30 16:45:33</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Admin System</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">RTI Submitted</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">FPS-2024-01</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">HMRC Accepted</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderCustomReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Custom Report Builder</h3>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          Create New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Saved Reports</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <div className="font-medium">Monthly Department Summary</div>
                <div className="text-sm text-gray-500">Created: 15/01/2024</div>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900 text-sm">Run</button>
                <button className="text-green-600 hover:text-green-900 text-sm">Edit</button>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <div className="font-medium">Overtime Analysis</div>
                <div className="text-sm text-gray-500">Created: 08/01/2024</div>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900 text-sm">Run</button>
                <button className="text-green-600 hover:text-green-900 text-sm">Edit</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Builder</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Employee Summary</option>
                <option>Department Analysis</option>
                <option>Pay Period Comparison</option>
                <option>Deduction Breakdown</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="date" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="date" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'payslip-summary': return renderPayslipSummary()
      case 'gross-to-net': return renderGrossToNet()
      case 'variance': return renderVarianceReport()
      case 'cost-by-dept': return renderCostByDept()
      case 'hmrc-reports': return renderHMRCReports()
      case 'pension-reports': return renderPensionReports()
      case 'audit-trail': return renderAuditTrail()
      case 'custom': return renderCustomReports()
      default: return renderPayslipSummary()
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
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Comprehensive payroll reporting and analytics</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Schedule Reports
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Report Builder
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

export default Reports

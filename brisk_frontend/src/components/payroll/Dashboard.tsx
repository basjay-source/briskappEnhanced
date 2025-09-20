import React, { useState, useEffect } from 'react'
import api from '../../services/api'

interface KPICardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: string
  onClick?: () => void
  drillDownData?: any
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, changeType, icon, onClick, drillDownData }) => {
  const [showDrillDown, setShowDrillDown] = useState(false)

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (drillDownData) {
      setShowDrillDown(!showDrillDown)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={handleClick}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${getChangeColor()}`}>
              {change}
            </p>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      
      {showDrillDown && drillDownData && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Detailed Analysis</h4>
          <div className="space-y-2">
            {drillDownData.breakdown?.map((item: any, index: number) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          {drillDownData.trend && (
            <div className="mt-3">
              <p className="text-xs text-gray-500">{drillDownData.trend}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface ExceptionTileProps {
  title: string
  count: number
  description: string
  priority: 'high' | 'medium' | 'low'
  actionLabel: string
  onAction: () => void
}

const ExceptionTile: React.FC<ExceptionTileProps> = ({ title, count, description, priority, actionLabel, onAction }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-orange-500 bg-orange-50'
      case 'low': return 'border-green-500 bg-green-50'
    }
  }

  const getPriorityDot = () => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-orange-500'
      case 'low': return 'bg-green-500'
    }
  }

  return (
    <div className={`border-l-4 ${getPriorityColor()} p-4 rounded-r-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${getPriorityDot()}`}></div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-gray-900">{count}</span>
          <button
            onClick={onAction}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const response = await api.get('/api/payroll/dashboard-kpis')
      setDashboardData(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setDashboardData({
        kpis: {
          totalEmployees: 156,
          activePayruns: 3,
          pendingApprovals: 12,
          monthlyPayrollCost: 485750,
          rtiCompliance: 98.5,
          pensionContributions: 28450
        },
        exceptions: [
          {
            title: 'Auto-Enrolment Due',
            count: 8,
            description: 'Employees due for auto-enrolment assessment',
            priority: 'high' as const,
            actionLabel: 'Review'
          },
          {
            title: 'RTI Submissions Pending',
            count: 2,
            description: 'FPS submissions awaiting filing',
            priority: 'high' as const,
            actionLabel: 'Submit'
          },
          {
            title: 'Pay Run Variances',
            count: 5,
            description: 'Variances >±10% requiring review',
            priority: 'medium' as const,
            actionLabel: 'Investigate'
          },
          {
            title: 'Missing P11D Data',
            count: 3,
            description: 'Employees with incomplete benefit records',
            priority: 'medium' as const,
            actionLabel: 'Update'
          },
          {
            title: 'CIS Returns Due',
            count: 1,
            description: 'Monthly CIS return due for filing',
            priority: 'low' as const,
            actionLabel: 'File'
          }
        ]
      })
      setLoading(false)
    }
  }

  const handleExceptionAction = (action: string) => {
    console.log(`Handling action: ${action}`)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Dashboard</h1>
          <p className="text-gray-600">Overview of payroll operations and compliance status</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Refresh Data
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
            Export Summary
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="Total Employees"
          value={dashboardData.kpis.totalEmployees}
          change="+12 this month"
          changeType="positive"
          icon="👥"
          drillDownData={{
            breakdown: [
              { label: 'Full-time', value: '142' },
              { label: 'Part-time', value: '14' },
              { label: 'Directors', value: '8' },
              { label: 'Contractors', value: '12' }
            ],
            trend: 'Steady growth in headcount over the past quarter'
          }}
        />
        
        <KPICard
          title="Active Pay Runs"
          value={dashboardData.kpis.activePayruns}
          change="2 pending approval"
          changeType="neutral"
          icon="🏃"
          drillDownData={{
            breakdown: [
              { label: 'Monthly Salary', value: '1' },
              { label: 'Weekly Wages', value: '1' },
              { label: 'Bonus Run', value: '1' }
            ],
            trend: 'All runs on schedule for current period'
          }}
        />
        
        <KPICard
          title="Pending Approvals"
          value={dashboardData.kpis.pendingApprovals}
          change="3 urgent"
          changeType="negative"
          icon="⏳"
          drillDownData={{
            breakdown: [
              { label: 'Pay Run Approvals', value: '8' },
              { label: 'Timesheet Approvals', value: '3' },
              { label: 'Leave Requests', value: '1' }
            ],
            trend: 'Higher than usual due to month-end processing'
          }}
        />
        
        <KPICard
          title="Monthly Payroll Cost"
          value={`£${dashboardData.kpis.monthlyPayrollCost.toLocaleString()}`}
          change="+2.3% vs last month"
          changeType="neutral"
          icon="💰"
          drillDownData={{
            breakdown: [
              { label: 'Gross Pay', value: '£385,750' },
              { label: 'Employer NIC', value: '£53,205' },
              { label: 'Pension Contributions', value: '£28,450' },
              { label: 'Other Benefits', value: '£18,345' }
            ],
            trend: 'Increase driven by annual salary reviews and new hires'
          }}
        />
        
        <KPICard
          title="RTI Compliance"
          value={`${dashboardData.kpis.rtiCompliance}%`}
          change="On target"
          changeType="positive"
          icon="📊"
          drillDownData={{
            breakdown: [
              { label: 'FPS Filed On Time', value: '98.5%' },
              { label: 'EPS Filed On Time', value: '100%' },
              { label: 'Late Submissions', value: '2' }
            ],
            trend: 'Excellent compliance record maintained'
          }}
        />
        
        <KPICard
          title="Pension Contributions"
          value={`£${dashboardData.kpis.pensionContributions.toLocaleString()}`}
          change="Due: 22nd Jan"
          changeType="neutral"
          icon="🏦"
          drillDownData={{
            breakdown: [
              { label: 'Employee Contributions', value: '£18,950' },
              { label: 'Employer Contributions', value: '£9,500' },
              { label: 'Eligible Employees', value: '134' }
            ],
            trend: 'Auto-enrolment assessment completed for Q4'
          }}
        />
      </div>

      {/* Exception Tiles */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Exception Tiles</h2>
        <div className="space-y-3">
          {dashboardData.exceptions.map((exception: any, index: number) => (
            <ExceptionTile
              key={index}
              title={exception.title}
              count={exception.count}
              description={exception.description}
              priority={exception.priority}
              actionLabel={exception.actionLabel}
              onAction={() => handleExceptionAction(exception.actionLabel)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl mb-2">👤</span>
            <span className="text-sm font-medium">Add Employee</span>
            <span className="text-xs text-gray-500">New starter setup</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl mb-2">🏃</span>
            <span className="text-sm font-medium">Create Pay Run</span>
            <span className="text-xs text-gray-500">Start new payroll</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl mb-2">⏰</span>
            <span className="text-sm font-medium">Approve Timesheets</span>
            <span className="text-xs text-gray-500">Review &amp; approve</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl mb-2">📊</span>
            <span className="text-sm font-medium">RTI Submission</span>
            <span className="text-xs text-gray-500">File with HMRC</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Pay run completed for January 2024</p>
              <p className="text-xs text-gray-500">156 employees processed • £485,750 total</p>
            </div>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">FPS submitted to HMRC</p>
              <p className="text-xs text-gray-500">Submission acknowledged • Reference: FPS240115001</p>
            </div>
            <span className="text-xs text-gray-400">4 hours ago</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Auto-enrolment assessment completed</p>
              <p className="text-xs text-gray-500">8 employees eligible for enrolment</p>
            </div>
            <span className="text-xs text-gray-400">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

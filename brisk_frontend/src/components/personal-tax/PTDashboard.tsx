import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock, FileText, TrendingUp, DollarSign } from 'lucide-react';

interface KPIData {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  drillDownData?: any[];
}

interface ExceptionItem {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  section: string;
  priority: 'high' | 'medium' | 'low';
}

interface TaskItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  assignee: string;
}

const PTDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [kpiData, setKpiData] = useState<KPIData[]>([]);
  const [exceptions, setExceptions] = useState<ExceptionItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [complianceTimeline, setComplianceTimeline] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/dashboard-data?tax_year=2024-25`);
      const dashboardData = await response.json();
      
      const dynamicKPIData: KPIData[] = [
        {
          label: 'Total Income',
          value: `£${dashboardData.kpis.total_income.toLocaleString()}`,
          change: '+5.2%',
          trend: 'up',
          drillDownData: [
            { source: 'Employment Income', amount: dashboardData.kpis.total_income * 0.68 },
            { source: 'Self Employment', amount: dashboardData.kpis.total_income * 0.22 },
            { source: 'Dividends', amount: dashboardData.kpis.total_income * 0.08 },
            { source: 'Capital Gains', amount: dashboardData.kpis.total_income * 0.02 }
          ]
        },
        {
          label: 'Payments on Account',
          value: `£${(dashboardData.kpis.total_tax_due / 2).toLocaleString()}`,
          change: 'Due 31 Jan',
          trend: 'neutral',
          drillDownData: [
            { payment: 'First POA', amount: dashboardData.kpis.total_tax_due / 2, due: '31 Jan 2025' },
            { payment: 'Second POA', amount: dashboardData.kpis.total_tax_due / 2, due: '31 Jul 2025' }
          ]
        },
        {
          label: 'Refund Due',
          value: `£${dashboardData.kpis.refund_due.toLocaleString()}`,
          change: 'Processing',
          trend: 'up',
          drillDownData: [
            { reason: 'Overpaid PAYE', amount: dashboardData.kpis.refund_due * 0.76 },
            { reason: 'Pension Relief', amount: dashboardData.kpis.refund_due * 0.24 }
          ]
        },
        {
          label: 'Outstanding Items',
          value: '3',
          change: '-2 from last week',
          trend: 'down',
          drillDownData: [
            { item: 'P60 Missing', priority: 'high' },
            { item: 'Bank Interest Certificate', priority: 'medium' },
            { item: 'Dividend Voucher', priority: 'low' }
          ]
        }
      ];

      const dynamicExceptions: ExceptionItem[] = dashboardData.exceptions.map((exception: any) => ({
        id: exception.id.toString(),
        type: exception.type,
        title: exception.title,
        description: exception.description,
        section: exception.section || 'General',
        priority: exception.priority || 'medium'
      }));

      const dynamicTasks: TaskItem[] = dashboardData.tasks.map((task: any) => ({
        id: task.id.toString(),
        title: task.title,
        description: task.description || task.title,
        dueDate: task.due_date,
        priority: task.priority,
        status: task.status,
        assignee: 'John Smith'
      }));

      const dynamicComplianceTimeline = dashboardData.compliance_timeline.map((item: any) => ({
        date: item.date,
        event: item.event,
        status: item.status
      }));

      setKpiData(dynamicKPIData);
      setExceptions(dynamicExceptions);
      setTasks(dynamicTasks);
      setComplianceTimeline(dynamicComplianceTimeline);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKPIClick = (kpi: KPIData) => {
    if (kpi.drillDownData) {
      alert(`Drill-down data for ${kpi.label}:\n${JSON.stringify(kpi.drillDownData, null, 2)}`);
    }
  };

  const handleExceptionClick = (exception: ExceptionItem) => {
    alert(`Navigate to ${exception.section} section to resolve: ${exception.title}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'exceptions', label: 'Exceptions' },
    { id: 'compliance', label: 'Compliance Timeline' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Personal Tax Dashboard</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Generate SA302
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div 
            key={index}
            onClick={() => handleKPIClick(kpi)}
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className={`text-sm ${
                  kpi.trend === 'up' ? 'text-green-600' : 
                  kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {kpi.change}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                kpi.trend === 'up' ? 'bg-green-100' : 
                kpi.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
              }`}>
                {index === 0 && <DollarSign className="h-6 w-6 text-green-600" />}
                {index === 1 && <Clock className="h-6 w-6 text-blue-600" />}
                {index === 2 && <TrendingUp className="h-6 w-6 text-green-600" />}
                {index === 3 && <FileText className="h-6 w-6 text-orange-600" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
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

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'overview' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Year 2024-25 Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Income Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employment Income</span>
                    <span className="font-medium">£{kpiData[0]?.drillDownData?.[0]?.amount?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Self Employment</span>
                    <span className="font-medium">£{kpiData[0]?.drillDownData?.[1]?.amount?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dividends</span>
                    <span className="font-medium">£{kpiData[0]?.drillDownData?.[2]?.amount?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank Interest</span>
                    <span className="font-medium">£{kpiData[0]?.drillDownData?.[3]?.amount?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total Income</span>
                    <span>{kpiData[0]?.value || 'Loading...'}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Tax Calculation</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Income</span>
                    <span className="font-medium">{kpiData[0]?.value || 'Loading...'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Personal Allowance</span>
                    <span className="font-medium">-£{kpiData[1]?.value?.replace('£', '').replace(',', '') || 'Loading...'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxable Income</span>
                    <span className="font-medium">£{(parseInt(kpiData[0]?.value?.replace(/[£,]/g, '') || '0') - parseInt(kpiData[1]?.value?.replace(/[£,]/g, '') || '0')).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Income Tax</span>
                    <span className="font-medium">{kpiData[1]?.value || 'Loading...'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Deducted</span>
                    <span className="font-medium">-£{kpiData[2]?.value?.replace('£', '') || '0'}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Tax Due</span>
                    <span>{kpiData[1]?.value || 'Loading...'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Outstanding Tasks</h3>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
                        <span className="text-sm text-gray-500">Assignee: {task.assignee}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'exceptions' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exceptions & Alerts</h3>
            <div className="space-y-4">
              {exceptions.map((exception) => (
                <div 
                  key={exception.id}
                  onClick={() => handleExceptionClick(exception)}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${
                      exception.type === 'error' ? 'bg-red-100' :
                      exception.type === 'warning' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      {exception.type === 'error' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                      {exception.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                      {exception.type === 'info' && <CheckCircle className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{exception.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{exception.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">Section: {exception.section}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          exception.priority === 'high' ? 'bg-red-100 text-red-800' :
                          exception.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {exception.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Timeline</h3>
            <div className="space-y-4">
              {complianceTimeline.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'passed' ? 'bg-gray-400' :
                    item.status === 'upcoming' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{item.event}</span>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'passed' ? 'bg-gray-100 text-gray-800' :
                      item.status === 'upcoming' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PTDashboard;

import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, TrendingUp, TrendingDown, DollarSign, Calendar, FileText, Users } from 'lucide-react';

const PTDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [kpiData, setKpiData] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [exceptions, setExceptions] = useState<any[]>([]);
  const [complianceTimeline, setComplianceTimeline] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:8000';
      
      const dynamicKPIData = {
        totalReturns: 156,
        pendingReturns: 23,
        completedReturns: 133,
        taxSavings: 45000,
        averageRefund: 2850,
        complianceRate: 98.5,
        clientSatisfaction: 4.8,
        processingTime: 3.2
      };

      const dynamicExceptions = [
        { id: 1, title: 'Missing P60 for John Smith', description: 'Employment income verification required', type: 'warning', priority: 'high', section: 'Employment' },
        { id: 2, title: 'Capital gains calculation pending', description: 'Property disposal needs review', type: 'error', priority: 'medium', section: 'Capital Gains' },
        { id: 3, title: 'Self-employment expenses incomplete', description: 'Additional receipts required', type: 'info', priority: 'low', section: 'Self-Employment' }
      ];

      const dynamicTasks = [
        { id: 1, title: 'Review SA100 for Michael Thompson', priority: 'high', dueDate: '2024-01-31', status: 'pending' },
        { id: 2, title: 'Process dividend income for Sarah Williams', priority: 'medium', dueDate: '2024-02-15', status: 'in-progress' },
        { id: 3, title: 'Calculate capital allowances for David Johnson', priority: 'low', dueDate: '2024-02-28', status: 'completed' }
      ];

      const dynamicComplianceTimeline = [
        { event: 'SA100 Filed', date: '2024-01-31', status: 'upcoming' },
        { event: 'Payment on Account Due', date: '2024-01-31', status: 'upcoming' },
        { event: 'P11D Submitted', date: '2023-07-06', status: 'passed' },
        { event: 'Class 1A NIC Due', date: '2023-07-19', status: 'passed' }
      ];

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

  const handleKPIClick = (kpiType: string) => {
    console.log(`Navigating to detailed view for: ${kpiType}`);
  };

  const handleExceptionClick = (exception: any) => {
    console.log('Resolving exception:', exception);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'tasks', label: 'Tasks', icon: FileText },
    { id: 'exceptions', label: 'Exceptions', icon: AlertTriangle },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle }
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
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
          Ask your Personal Tax Adviser
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
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
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow">
        {activeTab === 'overview' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div 
                onClick={() => handleKPIClick('totalReturns')}
                className="bg-blue-50 p-6 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-blue-600">Total Returns</p>
                    <p className="text-2xl font-bold text-blue-900">{kpiData.totalReturns}</p>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => handleKPIClick('pendingReturns')}
                className="bg-orange-50 p-6 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
              >
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-orange-600">Pending Returns</p>
                    <p className="text-2xl font-bold text-orange-900">{kpiData.pendingReturns}</p>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => handleKPIClick('taxSavings')}
                className="bg-green-50 p-6 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-green-600">Tax Savings</p>
                    <p className="text-2xl font-bold text-green-900">£{kpiData.taxSavings.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => handleKPIClick('complianceRate')}
                className="bg-purple-50 p-6 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-600">Compliance Rate</p>
                    <p className="text-2xl font-bold text-purple-900">{kpiData.complianceRate}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SA100 submitted for Michael Thompson</span>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Capital gains calculated for Sarah Williams</span>
                    <span className="text-xs text-gray-500">4 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Self-employment income updated for David Johnson</span>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SA100 Filing Deadline</span>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">31 Jan 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Payment on Account</span>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">31 Jan 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Balancing Payment</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">31 Jul 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tasks & Actions</h3>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
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
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
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

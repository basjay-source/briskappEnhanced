import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Database, Zap, CheckCircle } from 'lucide-react';

interface ModuleConnection {
  fromModule: string;
  toModule: string;
  dataFlow: string;
  status: 'active' | 'inactive' | 'error';
  lastSync: string;
}

interface EcosystemIntegrationProps {
  currentModule?: string;
}

const EcosystemIntegration: React.FC<EcosystemIntegrationProps> = ({ currentModule }) => {
  const [connections, setConnections] = useState<ModuleConnection[]>([]);
  const [loading, setLoading] = useState(true);

  const moduleConnections = [
    {
      fromModule: 'Charity Accounts',
      toModule: 'Bookkeeping',
      dataFlow: 'Trial Balance Import & Fund Mapping',
      status: 'active' as const,
      lastSync: '2024-09-22 10:30:00'
    },
    {
      fromModule: 'Charity Accounts',
      toModule: 'Payroll',
      dataFlow: 'Staff Costs & FTE Data for Activity Allocation',
      status: 'active' as const,
      lastSync: '2024-09-22 09:15:00'
    },
    {
      fromModule: 'Charity Accounts',
      toModule: 'Document Hub',
      dataFlow: 'Grant Letters, Legacy Docs, Filing Evidence',
      status: 'active' as const,
      lastSync: '2024-09-22 11:45:00'
    },
    {
      fromModule: 'Charity Accounts',
      toModule: 'Practice Management',
      dataFlow: 'Compliance Deadlines & Task Management',
      status: 'active' as const,
      lastSync: '2024-09-22 08:20:00'
    },
    {
      fromModule: 'Charity Accounts',
      toModule: 'Business Tax',
      dataFlow: 'Trading Subsidiary CT600 Data',
      status: 'active' as const,
      lastSync: '2024-09-22 12:10:00'
    },
    {
      fromModule: 'Bookkeeping',
      toModule: 'Accounts Production',
      dataFlow: 'Trial Balance & Adjustments',
      status: 'active' as const,
      lastSync: '2024-09-22 10:00:00'
    },
    {
      fromModule: 'Payroll',
      toModule: 'Bookkeeping',
      dataFlow: 'Payroll Journals & Accruals',
      status: 'active' as const,
      lastSync: '2024-09-22 09:30:00'
    },
    {
      fromModule: 'Personal Tax',
      toModule: 'Document Hub',
      dataFlow: 'SA100 Forms & Supporting Documents',
      status: 'active' as const,
      lastSync: '2024-09-22 11:20:00'
    },
    {
      fromModule: 'Company Secretarial',
      toModule: 'Accounts Production',
      dataFlow: 'Director Details & Share Capital',
      status: 'active' as const,
      lastSync: '2024-09-22 10:45:00'
    },
    {
      fromModule: 'AML/KYC',
      toModule: 'Practice Management',
      dataFlow: 'Client Risk Assessments & Compliance Status',
      status: 'active' as const,
      lastSync: '2024-09-22 09:00:00'
    },
    {
      fromModule: 'Time Management',
      toModule: 'Practice Management',
      dataFlow: 'Billing Data & Resource Allocation',
      status: 'active' as const,
      lastSync: '2024-09-22 11:00:00'
    },
    {
      fromModule: 'Admin',
      toModule: 'All Modules',
      dataFlow: 'User Permissions & System Configuration',
      status: 'active' as const,
      lastSync: '2024-09-22 12:00:00'
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setConnections(moduleConnections);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <ArrowRightLeft className="w-5 h-5 text-red-500" />;
      default:
        return <Database className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading ecosystem connections...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ecosystem Integration</h2>
          <p className="text-gray-600">Real-time data flow between all 12 modules</p>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-green-500" />
          <span className="text-sm text-green-600 font-medium">All Systems Connected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connections.map((connection, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg border-2 p-4 transition-all duration-200 ${
              currentModule && (connection.fromModule.includes(currentModule) || connection.toModule.includes(currentModule))
                ? 'border-orange-300 bg-orange-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(connection.status)}
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(connection.status)}`}>
                  {connection.status.toUpperCase()}
                </span>
              </div>
              <ArrowRightLeft className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600">{connection.fromModule}</span>
                <span className="text-xs text-gray-500">→</span>
                <span className="text-sm font-medium text-green-600">{connection.toModule}</span>
              </div>
              
              <p className="text-xs text-gray-600 leading-relaxed">
                {connection.dataFlow}
              </p>
              
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Last sync: {new Date(connection.lastSync).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Ecosystem Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Real-time Data Synchronization</h4>
            <p className="text-sm text-blue-700">
              All modules share data in real-time, eliminating duplicate entry and ensuring consistency across the entire practice management suite.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Automated Workflows</h4>
            <p className="text-sm text-blue-700">
              Cross-module automation triggers tasks, updates statuses, and maintains compliance across all areas of your practice.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Unified Reporting</h4>
            <p className="text-sm text-blue-700">
              Generate comprehensive reports that pull data from multiple modules, providing complete insights into your practice operations.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Compliance Monitoring</h4>
            <p className="text-sm text-blue-700">
              Integrated compliance tracking ensures all regulatory requirements are met across tax, accounts, payroll, and governance functions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcosystemIntegration;

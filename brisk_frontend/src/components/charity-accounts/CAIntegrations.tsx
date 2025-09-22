import React, { useState, useEffect } from 'react';
import { Link, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

interface CAIntegrationsProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const CAIntegrations: React.FC<CAIntegrationsProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('bookkeeping');
  const [loading, setLoading] = useState(true);
  const [integrationsData, setIntegrationsData] = useState<any>({});

  const tabs = [
    { id: 'bookkeeping', label: 'Bookkeeping', icon: Link },
    { id: 'payroll', label: 'Payroll', icon: RefreshCw },
    { id: 'cosec', label: 'CoSec', icon: CheckCircle },
    { id: 'investment-platforms', label: 'Investment Platforms', icon: AlertTriangle },
    { id: 'filing-gateways', label: 'Filing Gateways', icon: Link },
    { id: 'api-keys', label: 'API Keys', icon: RefreshCw }
  ];

  useEffect(() => {
    fetchIntegrationsData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchIntegrationsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/integrations?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      setIntegrationsData(data);
    } catch (error) {
      console.error('Error fetching integrations data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <RefreshCw className="w-4 h-4" />
          <span>Sync All</span>
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
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow">
        {activeTab === 'bookkeeping' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Bookkeeping Integration</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Trial Balance Import</h4>
                <p className="text-sm text-blue-800">
                  Connect to bookkeeping system to import trial balance with fund dimensions for charity accounts preparation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Connection Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>System:</span>
                      <span>{integrationsData.bookkeeping?.system || 'Not Connected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={integrationsData.bookkeeping?.status === 'connected' ? 'text-green-600' : 'text-red-600'}>
                        {integrationsData.bookkeeping?.status || 'Disconnected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Sync:</span>
                      <span>{integrationsData.bookkeeping?.lastSync || 'Never'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fund Mapping:</span>
                      <span className={integrationsData.bookkeeping?.fundMapping ? 'text-green-600' : 'text-red-600'}>
                        {integrationsData.bookkeeping?.fundMapping ? 'Configured' : 'Not Configured'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Sync Configuration</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked={integrationsData.bookkeeping?.autoSync} />
                      <span className="text-sm">Auto-sync trial balance</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked={integrationsData.bookkeeping?.fundDimensions} />
                      <span className="text-sm">Include fund dimensions</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked={integrationsData.bookkeeping?.comparatives} />
                      <span className="text-sm">Import comparatives</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked={integrationsData.bookkeeping?.budgets} />
                      <span className="text-sm">Import budgets</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Configure Connection
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Sync Now
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                  Test Connection
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payroll' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payroll Integration</h3>
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Staff Cost Allocation</h4>
                <p className="text-sm text-green-800">
                  Import staff costs and FTE data from payroll system for fund allocation and activity costing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Connection Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Payroll System:</span>
                      <span>{integrationsData.payroll?.system || 'Not Connected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={integrationsData.payroll?.status === 'connected' ? 'text-green-600' : 'text-red-600'}>
                        {integrationsData.payroll?.status || 'Disconnected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Import:</span>
                      <span>{integrationsData.payroll?.lastImport || 'Never'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Records Imported:</span>
                      <span>{integrationsData.payroll?.recordsImported || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Import Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked={integrationsData.payroll?.importStaffCosts} />
                      <span className="text-sm">Import staff costs</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked={integrationsData.payroll?.importFTE} />
                      <span className="text-sm">Import FTE data</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked={integrationsData.payroll?.importDepartments} />
                      <span className="text-sm">Import departments</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked={integrationsData.payroll?.importTimeAllocation} />
                      <span className="text-sm">Import time allocation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cosec' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Company Secretarial Integration</h3>
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Trustee/Governor Data</h4>
                <p className="text-sm text-yellow-700">
                  Sync trustee and governor information from company secretarial system for governance reporting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Sync Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>CoSec System:</span>
                      <span>{integrationsData.cosec?.system || 'Not Connected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={integrationsData.cosec?.status === 'connected' ? 'text-green-600' : 'text-red-600'}>
                        {integrationsData.cosec?.status || 'Disconnected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trustees Synced:</span>
                      <span>{integrationsData.cosec?.trusteesSynced || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Update:</span>
                      <span>{integrationsData.cosec?.lastUpdate || 'Never'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Data Mapping</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Trustee Names:</span>
                      <span className="text-green-600">Mapped</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Appointment Dates:</span>
                      <span className="text-green-600">Mapped</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Positions:</span>
                      <span className="text-green-600">Mapped</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Committee Memberships:</span>
                      <span className="text-yellow-600">Partial</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investment-platforms' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Platform Integration</h3>
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">Investment Data Import</h4>
                <p className="text-sm text-purple-800">
                  Connect to investment platforms to import valuations, transactions, and income data.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holdings</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(integrationsData.investmentPlatforms || []).map((platform: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{platform.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            platform.status === 'connected' ? 'bg-green-100 text-green-800' :
                            platform.status === 'error' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {platform.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{platform.lastSync}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{platform.holdings}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">Sync</button>
                          <button className="text-green-600 hover:text-green-800">Configure</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'filing-gateways' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filing Gateway Integration</h3>
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">Regulatory Filing Connections</h4>
                <p className="text-sm text-red-800">
                  Configure connections to Charity Commission, Companies House, and ESFA filing gateways.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Charity Commission</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={integrationsData.filingGateways?.charityCommission?.status === 'connected' ? 'text-green-600' : 'text-red-600'}>
                        {integrationsData.filingGateways?.charityCommission?.status || 'Disconnected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>API Version:</span>
                      <span>{integrationsData.filingGateways?.charityCommission?.apiVersion || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Filing:</span>
                      <span>{integrationsData.filingGateways?.charityCommission?.lastFiling || 'Never'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Companies House</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={integrationsData.filingGateways?.companiesHouse?.status === 'connected' ? 'text-green-600' : 'text-red-600'}>
                        {integrationsData.filingGateways?.companiesHouse?.status || 'Disconnected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>API Version:</span>
                      <span>{integrationsData.filingGateways?.companiesHouse?.apiVersion || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Filing:</span>
                      <span>{integrationsData.filingGateways?.companiesHouse?.lastFiling || 'Never'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">ESFA</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={integrationsData.filingGateways?.esfa?.status === 'connected' ? 'text-green-600' : 'text-red-600'}>
                        {integrationsData.filingGateways?.esfa?.status || 'Disconnected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Portal Access:</span>
                      <span>{integrationsData.filingGateways?.esfa?.portalAccess ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Return:</span>
                      <span>{integrationsData.filingGateways?.esfa?.lastReturn || 'Never'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api-keys' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">API Keys & Authentication</h3>
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Integration Authentication</h4>
                <p className="text-sm text-gray-600">
                  Manage API keys and authentication credentials for all integrated systems.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(integrationsData.apiKeys || []).map((key: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{key.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            key.status === 'active' ? 'bg-green-100 text-green-800' :
                            key.status === 'expired' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {key.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{key.expires}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">Rotate</button>
                          <button className="text-green-600 hover:text-green-800">Test</button>
                          <button className="text-red-600 hover:text-red-800">Revoke</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CAIntegrations;

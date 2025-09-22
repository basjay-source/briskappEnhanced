import React, { useState, useEffect } from 'react';
import { Settings, Users, FileText, ToggleLeft } from 'lucide-react';

interface CASettingsProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const CASettings: React.FC<CASettingsProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('fund-types');
  const [loading, setLoading] = useState(true);
  const [settingsData, setSettingsData] = useState<any>({});

  const tabs = [
    { id: 'fund-types', label: 'Fund Types & COA Mapping', icon: Settings },
    { id: 'policies-templates', label: 'Policies & Templates', icon: FileText },
    { id: 'roles-permissions', label: 'Roles/Permissions', icon: Users },
    { id: 'aad-toggles', label: 'AAD Toggles', icon: ToggleLeft }
  ];

  useEffect(() => {
    fetchSettingsData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchSettingsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/settings?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      setSettingsData(data);
    } catch (error) {
      console.error('Error fetching settings data:', error);
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
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
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
        {activeTab === 'fund-types' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Fund Types & COA Mapping</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Fund Catalogue</h4>
                <p className="text-sm text-blue-800">
                  Maintain fund types and chart of accounts mapping for consistent presentation across entities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Fund Types</h4>
                  <div className="space-y-3">
                    {(settingsData.fundTypes || []).map((fundType: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                        <div>
                          <span className="text-sm font-medium">{fundType.name}</span>
                          <span className="text-xs text-gray-500 block">{fundType.description}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            fundType.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {fundType.active ? 'Active' : 'Inactive'}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Add Fund Type
                  </button>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">COA Mapping Rules</h4>
                  <div className="space-y-3">
                    {(settingsData.coaMapping || []).map((mapping: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded border">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium">{mapping.rule}</span>
                          <button className="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                        </div>
                        <div className="text-xs text-gray-600">
                          <div>Account Range: {mapping.accountRange}</div>
                          <div>Default Fund: {mapping.defaultFund}</div>
                          <div>SoFA Line: {mapping.sofaLine}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    Add Mapping Rule
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies-templates' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Policies & Templates</h3>
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Standard Templates</h4>
                <p className="text-sm text-green-800">
                  Configure standard policies and templates for trustees' reports, reserves policies, and regularity statements.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Trustees' Report Template</h4>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={4}
                    placeholder="Standard trustees' report template..."
                    defaultValue={settingsData.templates?.trusteesReport || ''}
                  />
                  <div className="mt-2 flex items-center space-x-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                      Save Template
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                      Preview
                    </button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Reserves Policy Template</h4>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={4}
                    placeholder="Standard reserves policy template..."
                    defaultValue={settingsData.templates?.reservesPolicy || ''}
                  />
                  <div className="mt-2 flex items-center space-x-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                      Save Template
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                      Preview
                    </button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Regularity Statement (Academy)</h4>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={4}
                    placeholder="Standard regularity statement template..."
                    defaultValue={settingsData.templates?.regularityStatement || ''}
                  />
                  <div className="mt-2 flex items-center space-x-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                      Save Template
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roles-permissions' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Roles & Permissions</h3>
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Access Control</h4>
                <p className="text-sm text-yellow-700">
                  Configure role-based permissions for fund transfers, RPT approvals, and other sensitive operations.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preparer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(settingsData.permissions || []).map((permission: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{permission.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-blue-600"
                            defaultChecked={permission.preparer}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-blue-600"
                            defaultChecked={permission.reviewer}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-blue-600"
                            defaultChecked={permission.partner}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-blue-600"
                            defaultChecked={permission.client}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Save Permissions
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'aad-toggles' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Academy Accounts Direction (AAD) Toggles</h3>
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">Academy-Specific Features</h4>
                <p className="text-sm text-red-800">
                  Enable AAD-specific fields and features when working with academy trust accounts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">General AAD Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                      <div>
                        <span className="text-sm font-medium">Academy Mode</span>
                        <span className="text-xs text-gray-500 block">Enable academy-specific functionality</span>
                      </div>
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600"
                        defaultChecked={settingsData.aadToggles?.academyMode}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                      <div>
                        <span className="text-sm font-medium">ESFA Returns</span>
                        <span className="text-xs text-gray-500 block">Enable ESFA accounts return functionality</span>
                      </div>
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600"
                        defaultChecked={settingsData.aadToggles?.esfaReturns}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                      <div>
                        <span className="text-sm font-medium">MAT Reporting</span>
                        <span className="text-xs text-gray-500 block">Multi-academy trust segment reporting</span>
                      </div>
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600"
                        defaultChecked={settingsData.aadToggles?.matReporting}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Disclosure Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                      <div>
                        <span className="text-sm font-medium">Severance Disclosures</span>
                        <span className="text-xs text-gray-500 block">Academy severance payment disclosures</span>
                      </div>
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600"
                        defaultChecked={settingsData.aadToggles?.severanceDisclosures}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                      <div>
                        <span className="text-sm font-medium">Regularity Questionnaire</span>
                        <span className="text-xs text-gray-500 block">Academy regularity questionnaire</span>
                      </div>
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600"
                        defaultChecked={settingsData.aadToggles?.regularityQuestionnaire}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                      <div>
                        <span className="text-sm font-medium">RPT Thresholds</span>
                        <span className="text-xs text-gray-500 block">Academy RPT reporting thresholds</span>
                      </div>
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600"
                        defaultChecked={settingsData.aadToggles?.rptThresholds}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Configuration Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium">Features Enabled</div>
                    <div>{settingsData.aadSummary?.featuresEnabled || 0} / {settingsData.aadSummary?.totalFeatures || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Mode</div>
                    <div className={settingsData.aadSummary?.mode === 'academy' ? 'text-green-600' : 'text-blue-600'}>
                      {settingsData.aadSummary?.mode || 'Charity'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Last Updated</div>
                    <div>{settingsData.aadSummary?.lastUpdated || 'Never'}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Save Configuration
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Apply Academy Defaults
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                  Reset to Charity Mode
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CASettings;

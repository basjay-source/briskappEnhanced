import React, { useState, useEffect } from 'react';
import { Building, FileText, Settings, Save, AlertCircle } from 'lucide-react';

interface EngagementSetupProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: 'charity' | 'academy';
  selectedFramework: 'sorp' | 'aad';
}

interface EntityProfile {
  id: string;
  name: string;
  charityNumber?: string;
  companyNumber?: string;
  esfaUID?: string;
  reportingCurrency: string;
  yearEnd: string;
  legalForm: string;
  registeredAddress: string;
  trustees: string[];
  governors?: string[];
}

interface FrameworkOptions {
  fundTypesInUse: string[];
  smallCompany: boolean;
  companyLimitedByGuarantee: boolean;
  academyToggles: {
    aadCompliance: boolean;
    matVsSingle: 'mat' | 'single';
    academySegments: boolean;
  };
}

interface MaterialitySettings {
  overallMateriality: number;
  performanceMateriality: number;
  trivialThreshold: number;
  roundingPolicy: 'nearest_1000' | 'nearest_100' | 'nearest_10';
  suppressionRules: {
    balanceSheet: number;
    incomeExpenditure: number;
    notes: number;
  };
}

const EngagementSetup: React.FC<EngagementSetupProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('entity-profile');
  const [entityProfile, setEntityProfile] = useState<EntityProfile | null>(null);
  const [frameworkOptions, setFrameworkOptions] = useState<FrameworkOptions | null>(null);
  const [materialitySettings, setMaterialitySettings] = useState<MaterialitySettings | null>(null);
  const [checklists, setChecklists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'entity-profile', label: 'Entity Profile', icon: Building },
    { id: 'framework-options', label: 'Framework Options', icon: Settings },
    { id: 'materiality', label: 'Materiality & Rounding', icon: FileText },
    { id: 'checklists', label: 'Checklists', icon: AlertCircle }
  ];

  useEffect(() => {
    fetchEngagementData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchEngagementData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/charity-accounts/engagement-setup?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      
      setEntityProfile(data.entityProfile || {
        id: selectedEntity,
        name: 'St. Mary\'s Educational Trust',
        charityNumber: '1234567',
        companyNumber: selectedMode === 'charity' ? '12345678' : undefined,
        esfaUID: selectedMode === 'academy' ? '12345' : undefined,
        reportingCurrency: 'GBP',
        yearEnd: '31/08/2024',
        legalForm: selectedMode === 'charity' ? 'Charitable Company' : 'Academy Trust',
        registeredAddress: '123 Education Street, London, SW1A 1AA',
        trustees: ['John Smith (Chair)', 'Sarah Johnson', 'Michael Brown'],
        governors: selectedMode === 'academy' ? ['Dr. Emily Davis', 'Robert Wilson'] : undefined
      });

      setFrameworkOptions(data.frameworkOptions || {
        fundTypesInUse: ['Unrestricted', 'Restricted General', 'Restricted Fixed Asset'],
        smallCompany: false,
        companyLimitedByGuarantee: true,
        academyToggles: {
          aadCompliance: selectedMode === 'academy',
          matVsSingle: 'single',
          academySegments: false
        }
      });

      setMaterialitySettings(data.materialitySettings || {
        overallMateriality: 25000,
        performanceMateriality: 18750,
        trivialThreshold: 1250,
        roundingPolicy: 'nearest_1000',
        suppressionRules: {
          balanceSheet: 1000,
          incomeExpenditure: 1000,
          notes: 500
        }
      });

      setChecklists(data.checklists || [
        { id: 'sorp-checklist', name: 'SORP Compliance Checklist', completed: 0, total: 45, active: selectedFramework === 'sorp' },
        { id: 'aad-checklist', name: 'AAD Compliance Checklist', completed: 0, total: 38, active: selectedFramework === 'aad' },
        { id: 'companies-house', name: 'Companies House Requirements', completed: 0, total: 12, active: true }
      ]);
    } catch (error) {
      console.error('Error fetching engagement data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:8000/charity-accounts/engagement-setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: selectedEntity,
          year: selectedYear,
          mode: selectedMode,
          framework: selectedFramework,
          entityProfile,
          frameworkOptions,
          materialitySettings,
          checklists
        })
      });
      
      if (response.ok) {
        alert('Engagement setup saved successfully');
      }
    } catch (error) {
      console.error('Error saving engagement setup:', error);
      alert('Error saving engagement setup');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading engagement setup...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Engagement Setup</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Setup'}</span>
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
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === 'entity-profile' && entityProfile && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Entity Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Entity Name</label>
                <input
                  type="text"
                  value={entityProfile.name}
                  onChange={(e) => setEntityProfile({...entityProfile, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Legal Form</label>
                <select
                  value={entityProfile.legalForm}
                  onChange={(e) => setEntityProfile({...entityProfile, legalForm: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Charitable Company">Charitable Company</option>
                  <option value="Charitable Incorporated Organisation">Charitable Incorporated Organisation</option>
                  <option value="Academy Trust">Academy Trust</option>
                  <option value="Unincorporated Charity">Unincorporated Charity</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Charity Number</label>
                <input
                  type="text"
                  value={entityProfile.charityNumber || ''}
                  onChange={(e) => setEntityProfile({...entityProfile, charityNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {selectedMode === 'charity' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Number</label>
                  <input
                    type="text"
                    value={entityProfile.companyNumber || ''}
                    onChange={(e) => setEntityProfile({...entityProfile, companyNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              {selectedMode === 'academy' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ESFA UID</label>
                  <input
                    type="text"
                    value={entityProfile.esfaUID || ''}
                    onChange={(e) => setEntityProfile({...entityProfile, esfaUID: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year End</label>
                <input
                  type="date"
                  value={entityProfile.yearEnd}
                  onChange={(e) => setEntityProfile({...entityProfile, yearEnd: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reporting Currency</label>
                <select
                  value={entityProfile.reportingCurrency}
                  onChange={(e) => setEntityProfile({...entityProfile, reportingCurrency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="GBP">GBP - British Pound</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="USD">USD - US Dollar</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Registered Address</label>
              <textarea
                value={entityProfile.registeredAddress}
                onChange={(e) => setEntityProfile({...entityProfile, registeredAddress: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'framework-options' && frameworkOptions && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SORP Options</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fund Types in Use</label>
                <div className="space-y-2">
                  {['Unrestricted', 'Restricted General', 'Restricted Fixed Asset', 'Permanent Endowment', 'Expendable Endowment'].map((fundType) => (
                    <label key={fundType} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={frameworkOptions.fundTypesInUse.includes(fundType)}
                        onChange={(e) => {
                          const newFundTypes = e.target.checked
                            ? [...frameworkOptions.fundTypesInUse, fundType]
                            : frameworkOptions.fundTypesInUse.filter(f => f !== fundType);
                          setFrameworkOptions({...frameworkOptions, fundTypesInUse: newFundTypes});
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{fundType}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={frameworkOptions.smallCompany}
                    onChange={(e) => setFrameworkOptions({...frameworkOptions, smallCompany: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Small Company</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={frameworkOptions.companyLimitedByGuarantee}
                    onChange={(e) => setFrameworkOptions({...frameworkOptions, companyLimitedByGuarantee: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Company Limited by Guarantee</span>
                </label>
              </div>
            </div>
          </div>

          {selectedMode === 'academy' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Academy Options</h3>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={frameworkOptions.academyToggles.aadCompliance}
                    onChange={(e) => setFrameworkOptions({
                      ...frameworkOptions,
                      academyToggles: {...frameworkOptions.academyToggles, aadCompliance: e.target.checked}
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">AAD Compliance Required</span>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trust Type</label>
                  <select
                    value={frameworkOptions.academyToggles.matVsSingle}
                    onChange={(e) => setFrameworkOptions({
                      ...frameworkOptions,
                      academyToggles: {...frameworkOptions.academyToggles, matVsSingle: e.target.value as 'mat' | 'single'}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="single">Single Academy Trust</option>
                    <option value="mat">Multi-Academy Trust</option>
                  </select>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={frameworkOptions.academyToggles.academySegments}
                    onChange={(e) => setFrameworkOptions({
                      ...frameworkOptions,
                      academyToggles: {...frameworkOptions.academyToggles, academySegments: e.target.checked}
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Enable Academy Segment Reporting</span>
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'materiality' && materialitySettings && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Materiality Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Overall Materiality (£)</label>
                <input
                  type="number"
                  value={materialitySettings.overallMateriality}
                  onChange={(e) => setMaterialitySettings({...materialitySettings, overallMateriality: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Performance Materiality (£)</label>
                <input
                  type="number"
                  value={materialitySettings.performanceMateriality}
                  onChange={(e) => setMaterialitySettings({...materialitySettings, performanceMateriality: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trivial Threshold (£)</label>
                <input
                  type="number"
                  value={materialitySettings.trivialThreshold}
                  onChange={(e) => setMaterialitySettings({...materialitySettings, trivialThreshold: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rounding Policy</label>
              <select
                value={materialitySettings.roundingPolicy}
                onChange={(e) => setMaterialitySettings({...materialitySettings, roundingPolicy: e.target.value as any})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="nearest_1000">Nearest £1,000</option>
                <option value="nearest_100">Nearest £100</option>
                <option value="nearest_10">Nearest £10</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suppression Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Balance Sheet (£)</label>
                <input
                  type="number"
                  value={materialitySettings.suppressionRules.balanceSheet}
                  onChange={(e) => setMaterialitySettings({
                    ...materialitySettings,
                    suppressionRules: {...materialitySettings.suppressionRules, balanceSheet: Number(e.target.value)}
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Income & Expenditure (£)</label>
                <input
                  type="number"
                  value={materialitySettings.suppressionRules.incomeExpenditure}
                  onChange={(e) => setMaterialitySettings({
                    ...materialitySettings,
                    suppressionRules: {...materialitySettings.suppressionRules, incomeExpenditure: Number(e.target.value)}
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (£)</label>
                <input
                  type="number"
                  value={materialitySettings.suppressionRules.notes}
                  onChange={(e) => setMaterialitySettings({
                    ...materialitySettings,
                    suppressionRules: {...materialitySettings.suppressionRules, notes: Number(e.target.value)}
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'checklists' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Checklists</h3>
            <div className="space-y-4">
              {checklists.map((checklist) => (
                <div key={checklist.id} className={`p-4 border rounded-lg ${checklist.active ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{checklist.name}</h4>
                      <p className="text-sm text-gray-600">
                        {checklist.completed} of {checklist.total} items completed
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(checklist.completed / checklist.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {Math.round((checklist.completed / checklist.total) * 100)}%
                      </span>
                    </div>
                  </div>
                  {checklist.active && (
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                      View Checklist →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngagementSetup;

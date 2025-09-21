import React, { useState } from 'react';
import { Settings, Users, FileText, Link } from 'lucide-react';

const PTSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('defaults');

  const tabs = [
    { id: 'defaults', label: 'Defaults & Thresholds', icon: Settings },
    { id: 'permissions', label: 'Roles/Permissions', icon: Users },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'mappings', label: 'Mappings', icon: Link }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Save Settings
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
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

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'defaults' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Default Settings & Thresholds</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Tax Year</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>2024-25</option>
                  <option>2023-24</option>
                  <option>2022-23</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>GBP</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">User Permissions</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Preparer</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Edit schedules</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Import data</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">File returns</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Document Templates</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Representation Letter</h4>
                    <p className="text-sm text-gray-600">Standard client representation letter</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mappings' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Data Mappings</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Bookkeeping to SA Mapping</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sales Income</span>
                    <span className="text-sm font-medium">SA103 - Turnover</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Office Expenses</span>
                    <span className="text-sm font-medium">SA103 - Office Costs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PTSettings;

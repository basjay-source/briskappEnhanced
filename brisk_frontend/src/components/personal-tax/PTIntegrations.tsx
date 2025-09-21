import React, { useState } from 'react';
import { Link, Database, Key } from 'lucide-react';

const PTIntegrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hmrc');

  const tabs = [
    { id: 'hmrc', label: 'HMRC SA', icon: Link },
    { id: 'payroll', label: 'Payroll', icon: Database },
    { id: 'bookkeeping', label: 'Bookkeeping/Banking', icon: Database },
    { id: 'investments', label: 'Investment Platforms', icon: Link },
    { id: 'api', label: 'API Keys', icon: Key }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Add Integration
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
        {activeTab === 'hmrc' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">HMRC Self Assessment</h3>
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <h4 className="font-medium text-green-900">Connected</h4>
                  <p className="text-sm text-green-800">Agent authorisation active</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payroll' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Payroll Integration</h3>
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <h4 className="font-medium text-blue-900">Connected</h4>
                  <p className="text-sm text-blue-800">P60/P11D data sync enabled</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookkeeping' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Bookkeeping & Banking</h3>
            <div className="space-y-4">
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="font-medium text-green-900">Bookkeeping Module</h4>
                    <p className="text-sm text-green-800">Self-employment data sync</p>
                  </div>
                </div>
              </div>
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="font-medium text-green-900">Banking Feeds</h4>
                    <p className="text-sm text-green-800">Interest data import</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investments' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Investment Platforms</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Vanguard</h4>
                    <p className="text-sm text-gray-600">Dividend and capital gains import</p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">HMRC API Key</h4>
                    <p className="text-sm text-gray-600">For Self Assessment submissions</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PTIntegrations;

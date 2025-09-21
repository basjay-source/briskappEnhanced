import React, { useState } from 'react';
import { Building, Plus, FileText, Calculator } from 'lucide-react';

const TrustsEstates: React.FC = () => {
  const [activeTab, setActiveTab] = useState('distributions');

  const tabs = [
    { id: 'distributions', label: 'Distributions', icon: Building },
    { id: 'certificates', label: 'R185/R105', icon: FileText },
    { id: 'settlements', label: 'Settlements', icon: Calculator }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Trusts & Estates</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Distribution</span>
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
        {activeTab === 'distributions' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Trust Distributions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trust Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter trust name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trust UTR</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distribution Amount</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Deducted</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">R185/R105 Certificates</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Upload R185/R105 Certificate
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settlements' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Settlement Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Settlement Type</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Discretionary Trust</option>
                  <option>Interest in Possession Trust</option>
                  <option>Bare Trust</option>
                  <option>Mixed Trust</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Settlor Status</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Not a Settlor</option>
                  <option>Settlor</option>
                  <option>Interested Party</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrustsEstates;

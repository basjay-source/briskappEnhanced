import React, { useState } from 'react';
import { FileText, Upload, Send } from 'lucide-react';

const PTDocumentHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('source');

  const tabs = [
    { id: 'source', label: 'Source Docs', icon: FileText },
    { id: 'statements', label: 'Statements & Certificates', icon: FileText },
    { id: 'comms', label: 'Client Comms & e-Sign', icon: Send }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Document Hub</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Upload Documents</span>
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
        {activeTab === 'source' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Source Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">P60/P45/P11D</h4>
                <p className="text-sm text-gray-600 mb-3">Employment documents</p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                  Upload
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Bank Statements</h4>
                <p className="text-sm text-gray-600 mb-3">Interest certificates</p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                  Upload
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Investment Statements</h4>
                <p className="text-sm text-gray-600 mb-3">Dividend vouchers</p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'statements' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Statements & Certificates</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">P60 - ABC Company Ltd</h4>
                    <p className="text-sm text-gray-600">Uploaded: 15 May 2024</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Bank Interest Certificate</h4>
                    <p className="text-sm text-gray-600">Uploaded: 10 May 2024</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comms' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Client Communications</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Representation Letter</h4>
                <p className="text-sm text-gray-600 mb-3">Status: Signed</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                  View Signed Document
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PTDocumentHub;

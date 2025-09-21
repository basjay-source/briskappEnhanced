import React, { useState } from 'react';
import { FileText, AlertTriangle, MessageSquare } from 'lucide-react';

const PostFiling: React.FC = () => {
  const [activeTab, setActiveTab] = useState('statement');

  const tabs = [
    { id: 'statement', label: 'Statement of Account', icon: FileText },
    { id: 'amendments', label: 'Amendments', icon: AlertTriangle },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Post-Filing</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Check HMRC Status
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
        {activeTab === 'statement' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Statement of Account</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <h4 className="font-medium text-gray-900 mb-2">Account Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Due</span>
                  <span className="font-medium">£1,950</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payments Made</span>
                  <span className="font-medium">£1,950</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Balance</span>
                  <span className="text-green-600">£0</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'amendments' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Amendments</h3>
            <div className="text-center py-8">
              <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
              <h4 className="mt-4 text-lg font-medium text-gray-900">No Amendments Filed</h4>
              <p className="mt-2 text-gray-600">No amendments have been filed for this return.</p>
            </div>
          </div>
        )}

        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">HMRC Enquiries</h3>
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h4 className="mt-4 text-lg font-medium text-gray-900">No Active Enquiries</h4>
              <p className="mt-2 text-gray-600">No HMRC enquiries are currently open for this return.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostFiling;

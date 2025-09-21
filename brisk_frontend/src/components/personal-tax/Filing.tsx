import React, { useState } from 'react';
import { Wifi, Send, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

const Filing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('connection');

  const tabs = [
    { id: 'connection', label: 'HMRC Connection', icon: Wifi },
    { id: 'assemble', label: 'Assemble Package', icon: FileText },
    { id: 'validate', label: 'Validate', icon: CheckCircle },
    { id: 'efile', label: 'e-File', icon: Send },
    { id: 'acknowledgements', label: 'Acknowledgements', icon: CheckCircle }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Filing</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Send className="h-4 w-4" />
            <span>Submit Return</span>
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
        {activeTab === 'connection' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">HMRC Connection Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-900">HMRC Gateway Connected</h4>
                    <p className="text-sm text-green-800">Connection established successfully</p>
                  </div>
                </div>
              </div>
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-900">Agent Authorisation</h4>
                    <p className="text-sm text-green-800">Valid until 31/12/2025</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-900 mb-2">Connection Details</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p><strong>User ID:</strong> AGENT123456</p>
                <p><strong>Last Connected:</strong> 20 Sep 2025 09:30</p>
                <p><strong>Service:</strong> Self Assessment Online</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assemble' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Assemble SA Package</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Forms to be Filed</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">SA100 - Main Return</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">SA102 - Employment</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">SA103 - Self-Employment</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">SA108 - Capital Gains</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">White Space Notes</h4>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={4}
                  placeholder="Additional information for HMRC..."
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'validate' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Validation Results</h3>
            <div className="space-y-4">
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Schema Validation Passed</h4>
                    <p className="text-sm text-green-800">All required fields completed correctly</p>
                  </div>
                </div>
              </div>
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Business Rules Validation Passed</h4>
                    <p className="text-sm text-green-800">All calculations and cross-checks validated</p>
                  </div>
                </div>
              </div>
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Ready for Submission</h4>
                    <p className="text-sm text-green-800">Return is ready to be filed with HMRC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'efile' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Electronic Filing</h3>
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 mb-4">Filing Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxpayer</span>
                  <span className="font-medium">John Smith (1234567890)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Year</span>
                  <span className="font-medium">2024-25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Tax Due</span>
                  <span className="font-medium">£1,950</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Filing Deadline</span>
                  <span className="font-medium">31 January 2026</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-yellow-900">Important Notice</h5>
                    <p className="text-sm text-yellow-800">
                      Once submitted, this return cannot be amended online. Any changes will require a paper amendment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 font-medium">
                  Submit to HMRC
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'acknowledgements' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Filing Acknowledgements</h3>
            <div className="border border-green-200 rounded-lg p-6 bg-green-50">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Return Successfully Filed</h4>
                  <p className="text-sm text-green-800 mt-1">Your Self Assessment return has been received by HMRC</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Submission Reference:</span>
                      <span className="font-medium text-green-900">SA123456789012345</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Submission Date:</span>
                      <span className="font-medium text-green-900">20 Sep 2025 09:45</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Acknowledgement:</span>
                      <span className="font-medium text-green-900">ACK987654321</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
              <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                <li>Payment due by 31 January 2026</li>
                <li>Keep records for at least 5 years</li>
                <li>Check for any HMRC correspondence</li>
                <li>Set up payments on account if required</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filing;

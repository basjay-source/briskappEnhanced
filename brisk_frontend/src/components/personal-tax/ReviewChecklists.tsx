import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, FileText, Send } from 'lucide-react';

const ReviewChecklists: React.FC = () => {
  const [activeTab, setActiveTab] = useState('exceptions');

  const tabs = [
    { id: 'exceptions', label: 'Exceptions', icon: AlertTriangle },
    { id: 'checklists', label: 'Disclosure/SA Checklists', icon: CheckCircle },
    { id: 'representation', label: 'Representation Letter', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Review & Checklists</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Send className="h-4 w-4" />
            <span>Send for Review</span>
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
        {activeTab === 'exceptions' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Exceptions & Validation</h3>
            <div className="space-y-4">
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900">P60 Missing</h4>
                    <p className="text-sm text-red-800">P60 for main employment not uploaded</p>
                    <button className="mt-2 text-sm text-red-600 hover:text-red-800 underline">
                      Upload P60
                    </button>
                  </div>
                </div>
              </div>
              <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">High Income Child Benefit Charge</h4>
                    <p className="text-sm text-yellow-800">Income exceeds £60,000 - HICBC may apply</p>
                    <button className="mt-2 text-sm text-yellow-600 hover:text-yellow-800 underline">
                      Review HICBC
                    </button>
                  </div>
                </div>
              </div>
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">All Validations Passed</h4>
                    <p className="text-sm text-green-800">Employment income reconciled successfully</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'checklists' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">SA Checklists</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">SA100 Main Return</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Personal details verified</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Income sources complete</span>
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    <span className="text-sm text-gray-700">Reliefs to be reviewed</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">SA102 Employment</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">P60 reconciled</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">P11D benefits included</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Expenses validated</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">SA103 Self-Employment</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Accounts basis confirmed</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Capital allowances computed</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">CIS deductions applied</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">SA108 Capital Gains</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Disposals recorded</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Annual exemption applied</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Reliefs considered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'representation' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Representation Letter</h3>
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 mb-4">Client Representation Letter</h4>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>To:</strong> John Smith<br />
                  <strong>Tax Year:</strong> 2024-25<br />
                  <strong>UTR:</strong> 1234567890
                </p>
                <p className="text-sm text-gray-700">
                  We confirm that the information provided for your Self Assessment tax return is complete and accurate to the best of our knowledge.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="income-complete"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="income-complete" className="ml-2 text-sm text-gray-700">
                    All sources of income have been disclosed
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="expenses-valid"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="expenses-valid" className="ml-2 text-sm text-gray-700">
                    All expenses claimed are valid business expenses
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="records-maintained"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="records-maintained" className="ml-2 text-sm text-gray-700">
                    Adequate records have been maintained
                  </label>
                </div>
              </div>
              <div className="mt-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Send for e-Signature</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewChecklists;

import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, FileText, Send } from 'lucide-react';

const ReviewChecklists: React.FC = () => {
  const [activeTab, setActiveTab] = useState('exceptions');
  const [loading, setLoading] = useState(true);
  const [checklistsData, setChecklistsData] = useState<any>(null);

  useEffect(() => {
    fetchChecklistsData();
  }, []);

  const fetchChecklistsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/review-checklists?tax_year=2024-25`);
      const data = await response.json();
      setChecklistsData(data);
    } catch (error) {
      console.error('Error fetching checklists data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendForReview = () => {
    console.log('Send for review functionality');
  };

  const handleSendForESignature = () => {
    console.log('Send for e-signature functionality');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!checklistsData) {
    return <div className="text-center text-gray-500">Failed to load checklists data</div>;
  }

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
          <button 
            onClick={handleSendForReview}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
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
              {checklistsData.exceptions.map((exception: any) => (
                <div key={exception.id} className={`border rounded-lg p-4 ${
                  exception.type === 'error' ? 'border-red-200 bg-red-50' :
                  exception.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  'border-green-200 bg-green-50'
                }`}>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                      exception.type === 'error' ? 'text-red-600' :
                      exception.type === 'warning' ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                    <div>
                      <h4 className={`font-medium ${
                        exception.type === 'error' ? 'text-red-900' :
                        exception.type === 'warning' ? 'text-yellow-900' :
                        'text-green-900'
                      }`}>{exception.title}</h4>
                      <p className={`text-sm ${
                        exception.type === 'error' ? 'text-red-800' :
                        exception.type === 'warning' ? 'text-yellow-800' :
                        'text-green-800'
                      }`}>{exception.description}</p>
                      <button 
                        onClick={() => console.log(`Action: ${exception.action}`)}
                        className={`mt-2 text-sm underline hover:opacity-80 ${
                          exception.type === 'error' ? 'text-red-600' :
                          exception.type === 'warning' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}
                      >
                        {exception.action}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
                    {checklistsData.checklists.sa100.personal_details_verified ? 
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    }
                    <span className="text-sm text-gray-700">Personal details verified</span>
                  </div>
                  <div className="flex items-center">
                    {checklistsData.checklists.sa100.income_sources_complete ? 
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    }
                    <span className="text-sm text-gray-700">Income sources complete</span>
                  </div>
                  <div className="flex items-center">
                    {checklistsData.checklists.sa100.reliefs_reviewed ? 
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    }
                    <span className="text-sm text-gray-700">Reliefs to be reviewed</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">SA102 Employment</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    {checklistsData.checklists.sa102.p60_reconciled ? 
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    }
                    <span className="text-sm text-gray-700">P60 reconciled</span>
                  </div>
                  <div className="flex items-center">
                    {checklistsData.checklists.sa102.p11d_benefits_included ? 
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    }
                    <span className="text-sm text-gray-700">P11D benefits included</span>
                  </div>
                  <div className="flex items-center">
                    {checklistsData.checklists.sa102.expenses_validated ? 
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    }
                    <span className="text-sm text-gray-700">Expenses validated</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">SA103 Self-Employment</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    {checklistsData.checklists.sa103.accounts_basis_confirmed ? 
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    }
                    <span className="text-sm text-gray-700">Accounts basis confirmed</span>
                  </div>
                  <div className="flex items-center">
                    {checklistsData.checklists.sa103.capital_allowances_computed ? 
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    }
                    <span className="text-sm text-gray-700">Capital allowances computed</span>
                  </div>
                  <div className="flex items-center">
                    {checklistsData.checklists.sa103.cis_deductions_applied ? 
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    }
                    <span className="text-sm text-gray-700">CIS deductions applied</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">SA108 Capital Gains</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    {checklistsData.checklists.sa108.disposals_recorded ? 
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    }
                    <span className="text-sm text-gray-700">Disposals recorded</span>
                  </div>
                  <div className="flex items-center">
                    {checklistsData.checklists.sa108.annual_exemption_applied ? 
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    }
                    <span className="text-sm text-gray-700">Annual exemption applied</span>
                  </div>
                  <div className="flex items-center">
                    {checklistsData.checklists.sa108.reliefs_considered ? 
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    }
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
                  <strong>To:</strong> {checklistsData.representation_letter.taxpayer_name}<br />
                  <strong>Tax Year:</strong> {checklistsData.representation_letter.tax_year}<br />
                  <strong>UTR:</strong> {checklistsData.representation_letter.utr}
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
                    checked={checklistsData.representation_letter.confirmations.income_complete}
                    readOnly
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
                    checked={checklistsData.representation_letter.confirmations.expenses_valid}
                    readOnly
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
                    checked={checklistsData.representation_letter.confirmations.records_maintained}
                    readOnly
                  />
                  <label htmlFor="records-maintained" className="ml-2 text-sm text-gray-700">
                    Adequate records have been maintained
                  </label>
                </div>
              </div>
              <div className="mt-6">
                <button 
                  onClick={handleSendForESignature}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2"
                >
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

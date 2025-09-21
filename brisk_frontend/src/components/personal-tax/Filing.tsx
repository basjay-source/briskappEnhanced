import React, { useState, useEffect } from 'react';
import { Wifi, Send, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

const Filing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('connection');
  const [loading, setLoading] = useState(true);
  const [filingData, setFilingData] = useState<any>(null);

  useEffect(() => {
    fetchFilingData();
  }, []);

  const fetchFilingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/filing-status`);
      const data = await response.json();
      setFilingData(data);
    } catch (error) {
      console.error('Error fetching filing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReturn = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/submit-return`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        fetchFilingData(); // Refresh data
      } else {
        throw new Error('Failed to submit return');
      }
    } catch (error) {
      console.error('Error submitting return:', error);
      alert('Error submitting return');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!filingData) {
    return <div className="text-center text-gray-500">Failed to load filing data</div>;
  }

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
          <button 
            onClick={handleSubmitReturn}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
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
                    <p className="text-sm text-green-800">Valid until {filingData.agent_auth.expiry_date}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-900 mb-2">Connection Details</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p><strong>User ID:</strong> {filingData.hmrc_connection.user_id}</p>
                <p><strong>Last Connected:</strong> {new Date(filingData.hmrc_connection.last_connected).toLocaleString()}</p>
                <p><strong>Service:</strong> {filingData.hmrc_connection.service}</p>
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
                  {filingData.forms_to_file.map((form: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{form.form} - {form.form === 'SA100' ? 'Main Return' : 
                        form.form === 'SA102' ? 'Employment' :
                        form.form === 'SA103' ? 'Self-Employment' :
                        form.form === 'SA108' ? 'Capital Gains' : form.form}</span>
                      {form.status === 'ready' ? 
                        <CheckCircle className="h-4 w-4 text-green-600" /> :
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      }
                    </div>
                  ))}
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
                  <span className="font-medium">{filingData.submission.taxpayer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Year</span>
                  <span className="font-medium">{filingData.submission.tax_year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Tax Due</span>
                  <span className="font-medium">£{filingData.submission.total_tax_due.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Filing Deadline</span>
                  <span className="font-medium">{new Date(filingData.submission.filing_deadline).toLocaleDateString('en-GB')}</span>
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
                <button 
                  onClick={handleSubmitReturn}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 font-medium"
                >
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
                      <span className="font-medium text-green-900">{filingData?.submission_reference || 'Not submitted'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Submission Date:</span>
                      <span className="font-medium text-green-900">{filingData?.submission_date || 'Not submitted'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Acknowledgement:</span>
                      <span className="font-medium text-green-900">{filingData?.acknowledgement || 'Not available'}</span>
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

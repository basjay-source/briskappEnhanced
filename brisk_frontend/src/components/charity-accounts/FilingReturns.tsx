import React, { useState, useEffect } from 'react';
import { Send, FileText, CheckCircle, Download } from 'lucide-react';

interface FilingReturnsProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const FilingReturns: React.FC<FilingReturnsProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('charity-commission');
  const [loading, setLoading] = useState(true);
  const [filingData, setFilingData] = useState<any>({});

  const tabs = [
    { id: 'charity-commission', label: 'Charity Commission', icon: Send },
    { id: 'companies-house', label: 'Companies House', icon: FileText },
    { id: 'esfa-returns', label: 'ESFA Returns (Academy)', icon: CheckCircle },
    { id: 'deliver-pack', label: 'Deliver Pack', icon: Download }
  ];

  useEffect(() => {
    fetchFilingData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchFilingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/filing-returns?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      setFilingData(data);
    } catch (error) {
      console.error('Error fetching filing data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Filing & Returns</h1>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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

      <div className="bg-white rounded-lg shadow">
        {activeTab === 'charity-commission' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Charity Commission Filing</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Annual Return Requirements</h4>
                <p className="text-sm text-blue-800">
                  Charities must file annual returns and accounts with the Charity Commission within 10 months of year end.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Filing Requirements</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Charity Number:</span>
                      <span>{filingData.charityCommission?.charityNumber || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Filing Deadline:</span>
                      <span>{filingData.charityCommission?.deadline || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Income Threshold:</span>
                      <span>£{filingData.charityCommission?.incomeThreshold?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accounts Required:</span>
                      <span>{filingData.charityCommission?.accountsRequired ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Filing Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Annual Return:</span>
                      <span className={filingData.charityCommission?.annualReturnStatus === 'filed' ? 'text-green-600' : 'text-red-600'}>
                        {filingData.charityCommission?.annualReturnStatus || 'Not Filed'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accounts:</span>
                      <span className={filingData.charityCommission?.accountsStatus === 'filed' ? 'text-green-600' : 'text-red-600'}>
                        {filingData.charityCommission?.accountsStatus || 'Not Filed'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Filing Date:</span>
                      <span>{filingData.charityCommission?.filingDate || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Acknowledgment:</span>
                      <span>{filingData.charityCommission?.acknowledgment || 'Pending'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  File Annual Return
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Submit Accounts
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                  Download Acknowledgment
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'companies-house' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Companies House Filing</h3>
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Charitable Company Requirements</h4>
                <p className="text-sm text-green-800">
                  Charitable companies must file accounts and confirmation statements with Companies House.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Company Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Company Number:</span>
                      <span>{filingData.companiesHouse?.companyNumber || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accounts Deadline:</span>
                      <span>{filingData.companiesHouse?.accountsDeadline || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CS01 Deadline:</span>
                      <span>{filingData.companiesHouse?.cs01Deadline || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dormant Status:</span>
                      <span>{filingData.companiesHouse?.dormant ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Filing Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Accounts:</span>
                      <span className={filingData.companiesHouse?.accountsStatus === 'filed' ? 'text-green-600' : 'text-red-600'}>
                        {filingData.companiesHouse?.accountsStatus || 'Not Filed'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>CS01:</span>
                      <span className={filingData.companiesHouse?.cs01Status === 'filed' ? 'text-green-600' : 'text-red-600'}>
                        {filingData.companiesHouse?.cs01Status || 'Not Filed'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Filing Date:</span>
                      <span>{filingData.companiesHouse?.filingDate || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Acknowledgment:</span>
                      <span>{filingData.companiesHouse?.acknowledgment || 'Pending'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  File Accounts
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  File CS01
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                  Download Acknowledgment
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'esfa-returns' && selectedMode === 'academy' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">ESFA Accounts Return (Academy)</h3>
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">Academy Trust Requirements</h4>
                <p className="text-sm text-red-800">
                  Academy trusts must submit accounts return to ESFA by 31 December following year end.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Return Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>UPIN:</span>
                      <span>{filingData.esfa?.upin || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trust Type:</span>
                      <span>{filingData.esfa?.trustType || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deadline:</span>
                      <span>{filingData.esfa?.deadline || '31 December'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span>{filingData.esfa?.format || 'Excel/JSON'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Submission Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Return Status:</span>
                      <span className={filingData.esfa?.returnStatus === 'submitted' ? 'text-green-600' : 'text-red-600'}>
                        {filingData.esfa?.returnStatus || 'Not Submitted'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Validation:</span>
                      <span className={filingData.esfa?.validation === 'passed' ? 'text-green-600' : 'text-red-600'}>
                        {filingData.esfa?.validation || 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Submission Date:</span>
                      <span>{filingData.esfa?.submissionDate || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Acknowledgment:</span>
                      <span>{filingData.esfa?.acknowledgment || 'Pending'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Return Mapping</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium mb-2">Income Mapping:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>GAG Income:</span>
                        <span>£{filingData.esfa?.mapping?.gagIncome?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Other DfE Grants:</span>
                        <span>£{filingData.esfa?.mapping?.otherDfeGrants?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Other Income:</span>
                        <span>£{filingData.esfa?.mapping?.otherIncome?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Expenditure Mapping:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Teaching Costs:</span>
                        <span>£{filingData.esfa?.mapping?.teachingCosts?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Support Costs:</span>
                        <span>£{filingData.esfa?.mapping?.supportCosts?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Other Costs:</span>
                        <span>£{filingData.esfa?.mapping?.otherCosts?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Generate Return
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Submit to ESFA
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                  Download Acknowledgment
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deliver-pack' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Deliver Pack to Trustees/Governors</h3>
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">Client Delivery</h4>
                <p className="text-sm text-purple-800">
                  Deliver final accounts pack to trustees/governors including accounts, management letter, and filing acknowledgments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Delivery Package</h4>
                  <div className="space-y-2">
                    {(filingData.deliveryPack?.documents || []).map((document: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div>
                          <span className="text-sm font-medium">{document.name}</span>
                          <span className="text-xs text-gray-500 block">{document.description}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          document.status === 'ready' ? 'bg-green-100 text-green-800' :
                          document.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {document.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Delivery Options</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="radio" name="delivery" className="mr-2" />
                      <span className="text-sm">Email Delivery</span>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" name="delivery" className="mr-2" />
                      <span className="text-sm">Client Portal</span>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" name="delivery" className="mr-2" />
                      <span className="text-sm">Physical Delivery</span>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" name="delivery" className="mr-2" />
                      <span className="text-sm">Secure Download Link</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Message</label>
                    <textarea 
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      rows={3}
                      placeholder="Add a message for the trustees/governors..."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Delivery Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium">Documents Ready</div>
                    <div>{filingData.deliverySummary?.documentsReady || 0} / {filingData.deliverySummary?.totalDocuments || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Delivery Status</div>
                    <div className={filingData.deliverySummary?.status === 'ready' ? 'text-green-600' : 'text-yellow-600'}>
                      {filingData.deliverySummary?.status || 'Pending'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Last Delivery</div>
                    <div>{filingData.deliverySummary?.lastDelivery || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Prepare Package
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Send to Client
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                  Download Package
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilingReturns;

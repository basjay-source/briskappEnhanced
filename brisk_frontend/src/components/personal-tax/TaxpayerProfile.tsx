import React, { useState, useEffect } from 'react';
import { User, CreditCard, Heart, GraduationCap, Eye, Shield } from 'lucide-react';

interface TaxpayerData {
  utr: string;
  nino: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    country: string;
  };
  contact: {
    email: string;
    phone: string;
    mobile: string;
  };
  bankDetails: {
    accountName: string;
    sortCode: string;
    accountNumber: string;
    bankName: string;
  };
  maritalStatus: string;
  spouseDetails?: {
    name: string;
    nino: string;
    utr: string;
  };
  studentLoan: {
    plan: string;
    outstanding: boolean;
  };
  blindPersonAllowance: boolean;
  agentAuth: {
    status: string;
    expiryDate: string;
    reference: string;
  };
}

const TaxpayerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('identity');
  const [loading, setLoading] = useState(true);
  const [taxpayerData, setTaxpayerData] = useState<TaxpayerData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTaxpayerData();
  }, []);

  const fetchTaxpayerData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/taxpayer/profile`);
      if (!response.ok) {
        throw new Error('Failed to fetch taxpayer data');
      }
      const data = await response.json();
      setTaxpayerData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching taxpayer data:', error);
      setError('Failed to load taxpayer data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/taxpayer-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taxpayerData),
      });
      
      if (response.ok) {
        setIsEditing(false);
        alert('Taxpayer profile updated successfully');
      } else {
        throw new Error('Failed to save taxpayer profile');
      }
    } catch (error) {
      console.error('Error saving taxpayer data:', error);
      alert('Error saving taxpayer profile');
    }
  };

  const handleRefreshAuth = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/refresh-agent-auth`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        setTaxpayerData({
          ...taxpayerData!,
          agentAuth: {
            status: data.status,
            expiryDate: data.expiryDate,
            reference: data.reference
          }
        });
        alert(data.message);
      } else {
        throw new Error('Failed to refresh agent authorization');
      }
    } catch (error) {
      console.error('Error refreshing agent auth:', error);
      alert('Error refreshing agent authorisation');
    }
  };

  const tabs = [
    { id: 'identity', label: 'Identity & UTR', icon: User },
    { id: 'contact', label: 'Contact & Bank', icon: CreditCard },
    { id: 'family', label: 'Family/Marriage', icon: Heart },
    { id: 'student', label: 'Student Loan', icon: GraduationCap },
    { id: 'allowances', label: "Blind Person's Allowance", icon: Eye },
    { id: 'agent', label: 'Agent Authorisation', icon: Shield }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!taxpayerData) {
    return <div className="text-center text-gray-500">No taxpayer data found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Taxpayer Profile & Authorisations</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Save Changes
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Edit Profile
            </button>
          )}
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
        {taxpayerData && activeTab === 'identity' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Identity & UTR Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">UTR</label>
                <input
                  type="text"
                  value={taxpayerData?.utr || ''}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                  onChange={(e) => setTaxpayerData({...taxpayerData!, utr: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NINO</label>
                <input
                  type="text"
                  value={taxpayerData?.nino || ''}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                  onChange={(e) => setTaxpayerData({...taxpayerData!, nino: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={taxpayerData?.firstName || ''}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                  onChange={(e) => setTaxpayerData({...taxpayerData!, firstName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={taxpayerData?.lastName || ''}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                  onChange={(e) => setTaxpayerData({...taxpayerData!, lastName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={taxpayerData?.dateOfBirth || ''}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                  onChange={(e) => setTaxpayerData({...taxpayerData!, dateOfBirth: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                  <input
                    type="text"
                    value={taxpayerData?.address?.line1 || ''}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                    onChange={(e) => setTaxpayerData({
                      ...taxpayerData, 
                      address: {...taxpayerData.address, line1: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                  <input
                    type="text"
                    value={taxpayerData?.address?.line2 || ''}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                    onChange={(e) => setTaxpayerData({
                      ...taxpayerData, 
                      address: {...taxpayerData.address, line2: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={taxpayerData?.address?.city || ''}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                    onChange={(e) => setTaxpayerData({
                      ...taxpayerData, 
                      address: {...taxpayerData.address, city: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postcode</label>
                  <input
                    type="text"
                    value={taxpayerData?.address?.postcode || ''}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                    onChange={(e) => setTaxpayerData({
                      ...taxpayerData, 
                      address: {...taxpayerData.address, postcode: e.target.value}
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {taxpayerData && activeTab === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Contact & Bank Details</h3>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={taxpayerData?.contact?.email || ''}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                    onChange={(e) => setTaxpayerData({
                      ...taxpayerData, 
                      contact: {...taxpayerData.contact, email: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={taxpayerData?.contact?.phone || ''}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                    onChange={(e) => setTaxpayerData({
                      ...taxpayerData, 
                      contact: {...taxpayerData.contact, phone: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                  <input
                    type="tel"
                    value={taxpayerData?.contact?.mobile || ''}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                    onChange={(e) => setTaxpayerData({
                      ...taxpayerData, 
                      contact: {...taxpayerData.contact, mobile: e.target.value}
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Bank Details (for refunds)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                  <input
                    type="text"
                    value={taxpayerData?.bankDetails?.accountName || ''}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                    onChange={(e) => setTaxpayerData({
                      ...taxpayerData, 
                      bankDetails: {...taxpayerData.bankDetails, accountName: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <input
                    type="text"
                    value={taxpayerData?.bankDetails?.bankName || ''}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                    onChange={(e) => setTaxpayerData({
                      ...taxpayerData, 
                      bankDetails: {...taxpayerData.bankDetails, bankName: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort Code</label>
                  <input
                    type="text"
                    value={taxpayerData?.bankDetails?.sortCode || ''}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                    onChange={(e) => setTaxpayerData({
                      ...taxpayerData, 
                      bankDetails: {...taxpayerData.bankDetails, sortCode: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <input
                    type="text"
                    value={taxpayerData?.bankDetails?.accountNumber || ''}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                    onChange={(e) => setTaxpayerData({
                      ...taxpayerData, 
                      bankDetails: {...taxpayerData.bankDetails, accountNumber: e.target.value}
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {taxpayerData && activeTab === 'family' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Family & Marriage Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
              <select
                value={taxpayerData?.maritalStatus || ''}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                onChange={(e) => setTaxpayerData({...taxpayerData!, maritalStatus: e.target.value})}
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Civil Partnership">Civil Partnership</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            {(taxpayerData?.maritalStatus === 'Married' || taxpayerData?.maritalStatus === 'Civil Partnership') && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Spouse/Partner Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={taxpayerData?.spouseDetails?.name || ''}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                      onChange={(e) => setTaxpayerData({
                        ...taxpayerData, 
                        spouseDetails: {...taxpayerData?.spouseDetails!, name: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">NINO</label>
                    <input
                      type="text"
                      value={taxpayerData?.spouseDetails?.nino || ''}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                      onChange={(e) => setTaxpayerData({
                        ...taxpayerData, 
                        spouseDetails: {...taxpayerData?.spouseDetails!, nino: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">UTR</label>
                    <input
                      type="text"
                      value={taxpayerData?.spouseDetails?.utr || ''}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                      onChange={(e) => setTaxpayerData({
                        ...taxpayerData, 
                        spouseDetails: {...taxpayerData?.spouseDetails!, utr: e.target.value}
                      })}
                    />
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h5 className="font-medium text-blue-900 mb-2">Marriage Allowance</h5>
                  <p className="text-sm text-blue-800">
                    If your spouse's income is below the personal allowance threshold, you may be able to transfer part of your personal allowance to them, 
                    reducing their tax liability.
                  </p>
                  <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    Check Eligibility
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {taxpayerData && activeTab === 'student' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Student Loan Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student Loan Plan</label>
                <select
                  value={taxpayerData?.studentLoan?.plan || ''}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-50"
                  onChange={(e) => setTaxpayerData({
                    ...taxpayerData, 
                    studentLoan: {...taxpayerData.studentLoan, plan: e.target.value}
                  })}
                >
                  <option value="">No Student Loan</option>
                  <option value="Plan 1">Plan 1</option>
                  <option value="Plan 2">Plan 2</option>
                  <option value="Plan 4">Plan 4</option>
                  <option value="Plan 5">Plan 5</option>
                  <option value="Postgraduate Loan">Postgraduate Loan</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Outstanding Balance</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={taxpayerData?.studentLoan?.outstanding || false}
                    disabled={!isEditing}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    onChange={(e) => setTaxpayerData({
                      ...taxpayerData, 
                      studentLoan: {...taxpayerData?.studentLoan!, outstanding: e.target.checked}
                    })}
                  />
                  <span className="text-sm text-gray-700">Outstanding balance exists</span>
                </div>
              </div>
            </div>

            {taxpayerData?.studentLoan?.plan && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <h5 className="font-medium text-yellow-900 mb-2">Student Loan Repayment Thresholds</h5>
                <div className="text-sm text-yellow-800 space-y-1">
                  <p><strong>Plan 1:</strong> Check current HMRC rates</p>
                  <p><strong>Plan 2:</strong> Check current HMRC rates</p>
                  <p><strong>Plan 4:</strong> Check current HMRC rates</p>
                  <p><strong>Plan 5:</strong> Check current HMRC rates</p>
                  <p><strong>Postgraduate:</strong> Check current HMRC rates</p>
                </div>
              </div>
            )}
          </div>
        )}

        {taxpayerData && activeTab === 'allowances' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Blind Person's Allowance</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={taxpayerData?.blindPersonAllowance || false}
                  disabled={!isEditing}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  onChange={(e) => setTaxpayerData({...taxpayerData!, blindPersonAllowance: e.target.checked})}
                />
                <span className="text-sm font-medium text-gray-700">Eligible for Blind Person's Allowance</span>
              </div>

              {taxpayerData?.blindPersonAllowance && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <h5 className="font-medium text-green-900 mb-2">Blind Person's Allowance</h5>
                  <p className="text-sm text-green-800">
                    You're eligible for an additional allowance for the current tax year. 
                    This allowance can be transferred to your spouse or civil partner if you don't use it all.
                  </p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h5 className="font-medium text-blue-900 mb-2">Eligibility Criteria</h5>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>You're eligible if you're registered blind with your local council, or:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>In England and Wales: unable to perform work for which sight is essential</li>
                    <li>In Scotland: your vision is severely impaired</li>
                    <li>In Northern Ireland: unable to perform work for which sight is essential</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {taxpayerData && activeTab === 'agent' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Agent Authorisation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className={`px-3 py-2 rounded-md text-sm font-medium ${
                  taxpayerData?.agentAuth?.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {taxpayerData?.agentAuth?.status}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="date"
                  value={taxpayerData?.agentAuth?.expiryDate || ''}
                  disabled
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reference</label>
                <input
                  type="text"
                  value={taxpayerData?.agentAuth?.reference || ''}
                  disabled
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={handleRefreshAuth}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Refresh Authorisation
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">
                View Authorisation Letter
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h5 className="font-medium text-yellow-900 mb-2">Important Notes</h5>
              <div className="text-sm text-yellow-800 space-y-1">
                <p>• Agent authorisation must be valid to file returns electronically</p>
                <p>• Authorisation expires annually and must be renewed</p>
                <p>• HMRC may revoke authorisation if not used for 12 months</p>
                <p>• Client can revoke authorisation at any time through their personal tax account</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxpayerProfile;

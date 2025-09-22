import React, { useState, useEffect } from 'react';
import { Gift, PiggyBank, TrendingUp, Minus, Plus, Save, AlertCircle } from 'lucide-react';

interface Relief {
  id: string;
  type: string;
  amount: number;
  description: string;
  taxYear: string;
}

interface ReliefsData {
  giftAid: Relief[];
  pensionContributions: Relief[];
  eisSeisVct: Relief[];
  tradingLosses: Relief[];
  propertyLosses: Relief[];
  marriageAllowance: Relief | null;
  personalAllowances: Relief | null;
}

const ReliefsDeductions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('giftaid');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reliefsData, setReliefsData] = useState<ReliefsData>({
    giftAid: [],
    pensionContributions: [],
    eisSeisVct: [],
    tradingLosses: [],
    propertyLosses: [],
    marriageAllowance: null,
    personalAllowances: null
  });

  const [formData, setFormData] = useState({
    giftAidAmount: '',
    giftAidDescription: '',
    pensionAmount: '',
    pensionDescription: '',
    eisAmount: '',
    eisDescription: '',
    currentYearTradingLoss: '',
    broughtForwardTradingLoss: '',
    carriedBackTradingLoss: '',
    currentYearPropertyLoss: '',
    broughtForwardPropertyLoss: '',
    availablePropertyRelief: '',
    marriageAllowanceAmount: '',
    spouseName: '',
    personalAllowance: '',
    blindPersonAllowance: ''
  });

  useEffect(() => {
    fetchReliefsData();
  }, []);

  const fetchReliefsData = async () => {
    setLoading(true);
    try {
      const apiUrl = (import.meta as any).env.VITE_API_URL || 'https://app-xrzbrdsj.fly.dev';
      const response = await fetch(`${apiUrl}/api/personal-tax/reliefs-deductions-data`);
      if (response.ok) {
        const data = await response.json();
        setReliefsData(data);
      }
    } catch (error) {
      console.error('Error fetching reliefs data:', error);
      setError('Failed to load reliefs data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRelief = async (reliefType: string) => {
    try {
      const apiUrl = (import.meta as any).env.VITE_API_URL || 'https://app-xrzbrdsj.fly.dev';
      const response = await fetch(`${apiUrl}/api/personal-tax/reliefs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: reliefType,
          data: formData
        })
      });
      
      if (response.ok) {
        await fetchReliefsData();
        setError(null);
      }
    } catch (error) {
      console.error('Error adding relief:', error);
      setError('Failed to add relief');
    }
  };

  const handleSaveRelief = async (reliefType: string) => {
    try {
      const apiUrl = (import.meta as any).env.VITE_API_URL || 'https://app-xrzbrdsj.fly.dev';
      const response = await fetch(`${apiUrl}/api/personal-tax/reliefs/${reliefType}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchReliefsData();
        setError(null);
      }
    } catch (error) {
      console.error('Error saving relief:', error);
      setError('Failed to save relief');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = async (reliefType: string) => {
    await handleSaveRelief(reliefType);
  };

  const tabs = [
    { id: 'giftaid', label: 'Gift Aid', icon: Gift },
    { id: 'pension', label: 'Pension Contributions', icon: PiggyBank },
    { id: 'eis', label: 'EIS/SEIS/VCT', icon: TrendingUp },
    { id: 'losses', label: 'Trade/Property Losses', icon: Minus },
    { id: 'marriage', label: 'Marriage Allowance', icon: Plus },
    { id: 'allowances', label: 'Allowances', icon: Save }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Reliefs & Deductions</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => handleAddRelief(activeTab)}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Ask your Personal Tax Adviser
          </button>
          <button 
            onClick={() => handleAddRelief(activeTab)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            + Add Relief
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'giftaid' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Gift Aid Donations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Add New Donation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Donation Amount</label>
                      <input
                        type="number"
                        value={formData.giftAidAmount}
                        onChange={(e) => handleInputChange('giftAidAmount', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter donation amount"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={formData.giftAidDescription}
                        onChange={(e) => handleInputChange('giftAidDescription', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter charity name"
                      />
                    </div>
                    <button 
                      onClick={() => handleFormSubmit('giftaid')}
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Add Gift Aid Donation
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Current Donations</h4>
                  <div className="space-y-2">
                    {reliefsData.giftAid.length > 0 ? (
                      reliefsData.giftAid.map((donation) => (
                        <div key={donation.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">{donation.description}</span>
                          <span className="font-medium">£{donation.amount.toLocaleString()}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No donations recorded</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pension' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Pension Contributions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Add Contribution</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contribution Amount</label>
                      <input
                        type="number"
                        value={formData.pensionAmount}
                        onChange={(e) => handleInputChange('pensionAmount', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter contribution amount"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pension Provider</label>
                      <input
                        type="text"
                        value={formData.pensionDescription}
                        onChange={(e) => handleInputChange('pensionDescription', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter pension provider"
                      />
                    </div>
                    <button 
                      onClick={() => handleFormSubmit('pension')}
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Add Pension Contribution
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Annual Allowance Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Annual Allowance 2024-25:</span>
                      <span className="font-medium">£60,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Carry Forward Available:</span>
                      <span className="font-medium">£120,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'eis' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">EIS/SEIS/VCT Investments</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Add Investment</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount</label>
                      <input
                        type="number"
                        value={formData.eisAmount}
                        onChange={(e) => handleInputChange('eisAmount', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter investment amount"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Investment Type</label>
                      <select
                        value={formData.eisDescription}
                        onChange={(e) => handleInputChange('eisDescription', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="">Select investment type</option>
                        <option value="EIS">Enterprise Investment Scheme (EIS)</option>
                        <option value="SEIS">Seed Enterprise Investment Scheme (SEIS)</option>
                        <option value="VCT">Venture Capital Trust (VCT)</option>
                      </select>
                    </div>
                    <button 
                      onClick={() => handleFormSubmit('eis')}
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Add Investment
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Relief Rates 2024-25</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">EIS Relief:</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">SEIS Relief:</span>
                      <span className="font-medium">50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">VCT Relief:</span>
                      <span className="font-medium">30%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'losses' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Trade and Property Losses</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Trading Losses</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Year Trading Loss</label>
                      <input
                        type="number"
                        value={formData.currentYearTradingLoss}
                        onChange={(e) => handleInputChange('currentYearTradingLoss', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter current year trading loss"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brought Forward Loss</label>
                      <input
                        type="number"
                        value={formData.broughtForwardTradingLoss}
                        onChange={(e) => handleInputChange('broughtForwardTradingLoss', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter brought forward loss"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Carried Back Loss</label>
                      <input
                        type="number"
                        value={formData.carriedBackTradingLoss}
                        onChange={(e) => handleInputChange('carriedBackTradingLoss', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter carried back loss"
                      />
                    </div>
                    <button 
                      onClick={() => handleFormSubmit('trading_loss')}
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Save Trading Loss
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Property Losses</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Year Property Loss</label>
                      <input
                        type="number"
                        value={formData.currentYearPropertyLoss}
                        onChange={(e) => handleInputChange('currentYearPropertyLoss', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter current year property loss"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brought Forward Property Loss</label>
                      <input
                        type="number"
                        value={formData.broughtForwardPropertyLoss}
                        onChange={(e) => handleInputChange('broughtForwardPropertyLoss', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter brought forward property loss"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Available Relief</label>
                      <input
                        type="number"
                        value={formData.availablePropertyRelief}
                        onChange={(e) => handleInputChange('availablePropertyRelief', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter available relief"
                      />
                    </div>
                    <button 
                      onClick={() => handleFormSubmit('property_loss')}
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Save Property Loss
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Loss Relief Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-800">Carry Forward</h5>
                    <p className="text-blue-700">
                      Use losses against future profits from the same trade
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800">Carry Back</h5>
                    <p className="text-blue-700">
                      Use losses against profits from previous 3 years
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800">Sideways Relief</h5>
                    <p className="text-blue-700">
                      Use losses against other income in same or previous year
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'marriage' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Marriage Allowance</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Transfer Allowance</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Amount</label>
                      <input
                        type="number"
                        value={formData.marriageAllowanceAmount}
                        onChange={(e) => handleInputChange('marriageAllowanceAmount', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter transfer amount"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Spouse Name</label>
                      <input
                        type="text"
                        value={formData.spouseName}
                        onChange={(e) => handleInputChange('spouseName', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter spouse name"
                      />
                    </div>
                    <button 
                      onClick={() => handleFormSubmit('marriage')}
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Apply Marriage Allowance
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Allowance Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Maximum Transfer 2024-25:</span>
                      <span className="font-medium">£1,260</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tax Saving:</span>
                      <span className="font-medium text-green-600">£252</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'allowances' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Personal Allowances</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Current Allowances</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Personal Allowance</label>
                      <input
                        type="number"
                        value={formData.personalAllowance}
                        onChange={(e) => handleInputChange('personalAllowance', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="£12,570"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Blind Person Allowance</label>
                      <input
                        type="number"
                        value={formData.blindPersonAllowance}
                        onChange={(e) => handleInputChange('blindPersonAllowance', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="£2,870"
                      />
                    </div>
                    <button 
                      onClick={() => handleFormSubmit('allowances')}
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Update Allowances
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Standard Rates 2024-25</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Personal Allowance:</span>
                      <span className="font-medium">£12,570</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Blind Person Allowance:</span>
                      <span className="font-medium">£2,870</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Marriage Allowance:</span>
                      <span className="font-medium">£1,260</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReliefsDeductions;

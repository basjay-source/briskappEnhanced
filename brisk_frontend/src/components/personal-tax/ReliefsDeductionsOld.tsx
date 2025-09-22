import React, { useState, useEffect } from 'react';
import { Heart, Shield, TrendingUp, TrendingDown, Users, Calculator, Plus } from 'lucide-react';

interface ReliefsData {
  gift_aid?: {
    total_donations?: number;
    basic_rate_relief?: number;
    higher_rate_relief?: number;
  };
  pensions?: {
    annual_allowance?: number;
    personal_contributions?: number;
    employer_contributions?: number;
  };
  investment_reliefs?: {
    eis_relief_rate?: number;
    seis_relief_rate?: number;
    vct_relief_rate?: number;
  };
  marriage_allowance?: {
    transfer_amount?: number;
    income_limit?: number;
  };
  other_allowances?: {
    trading_allowance?: number;
    property_allowance?: number;
  };
}

const ReliefsDeductions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('giftaid');
  const [loading, setLoading] = useState(true);
  const [reliefsData, setReliefsData] = useState<ReliefsData | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchReliefsData();
  }, []);

  const fetchReliefsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${(import.meta as any).env.VITE_API_URL}/api/personal-tax/reliefs-deductions?tax_year=2024-25`);
      const data = await response.json();
      setReliefsData(data);
    } catch (error) {
      console.error('Error fetching reliefs data:', error);
      setReliefsData({});
    } finally {
      setLoading(false);
    }
  };

  const handleAddRelief = async (reliefType: string) => {
    try {
      const response = await fetch(`${(import.meta as any).env.VITE_API_URL}/api/personal-tax/reliefs-deductions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: reliefType, taxpayer_id: 1 })
      });
      if (response.ok) {
        fetchReliefsData();
        alert(`${reliefType} relief added successfully`);
      }
    } catch (error) {
      console.error('Error adding relief:', error);
      alert('Error adding relief. Please try again.');
    }
  };

  const handleSaveRelief = async (reliefType: string, data: any) => {
    try {
      const response = await fetch(`${(import.meta as any).env.VITE_API_URL}/api/personal-tax/reliefs-deductions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: reliefType, data, taxpayer_id: 1 })
      });
      if (response.ok) {
        fetchReliefsData();
        alert(`${reliefType} relief saved successfully`);
      }
    } catch (error) {
      console.error('Error saving relief:', error);
      alert('Error saving relief. Please try again.');
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = async (reliefType: string) => {
    await handleSaveRelief(reliefType, formData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!reliefsData) {
    return <div className="text-center text-gray-500">Failed to load reliefs data</div>;
  }

  const tabs = [
    { id: 'giftaid', label: 'Gift Aid', icon: Heart },
    { id: 'pensions', label: 'Pension Contributions', icon: Shield },
    { id: 'investments', label: 'EIS/SEIS/VCT', icon: TrendingUp },
    { id: 'losses', label: 'Trade/Property Losses', icon: TrendingDown },
    { id: 'marriage', label: 'Marriage Allowance', icon: Users },
    { id: 'allowances', label: 'Allowances', icon: Calculator }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reliefs & Deductions</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button 
            onClick={() => handleAddRelief('general')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Relief</span>
          </button>
        </div>
      </div>

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

      <div className="mt-6">
        {activeTab === 'giftaid' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Gift Aid Donations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Donations</label>
                <input
                  type="number"
                  value={formData.totalDonations || ''}
                  onChange={(e) => handleInputChange('totalDonations', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter total donations amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carry Back to Previous Year</label>
                <input
                  type="number"
                  value={formData.carryBackDonations || ''}
                  onChange={(e) => handleInputChange('carryBackDonations', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter carry back amount"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => handleFormSubmit('gift_aid')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Save Gift Aid Relief
              </button>
            </div>
          </div>
        )}

        {activeTab === 'pensions' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Pension Contributions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Personal Contributions</label>
                <input
                  type="number"
                  value={formData.personalContributions || ''}
                  onChange={(e) => handleInputChange('personalContributions', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter personal contributions"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employer Contributions</label>
                <input
                  type="number"
                  value={formData.employerContributions || ''}
                  onChange={(e) => handleInputChange('employerContributions', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter employer contributions"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => handleFormSubmit('pension_contributions')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Save Pension Contributions
              </button>
            </div>
          </div>
        )}

        {activeTab === 'investments' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Investment Reliefs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">EIS (Enterprise Investment Scheme)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount</label>
                    <input
                      type="number"
                      value={formData.eisInvestment || ''}
                      onChange={(e) => handleInputChange('eisInvestment', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter EIS investment amount"
                    />
                  </div>
                  <button
                    onClick={() => handleFormSubmit('eis_investment')}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Save EIS Investment
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">SEIS (Seed Enterprise Investment Scheme)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount</label>
                    <input
                      type="number"
                      value={formData.seisInvestment || ''}
                      onChange={(e) => handleInputChange('seisInvestment', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter SEIS investment amount"
                    />
                  </div>
                  <button
                    onClick={() => handleFormSubmit('seis_investment')}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Save SEIS Investment
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">VCT (Venture Capital Trust)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount</label>
                    <input
                      type="number"
                      value={formData.vctInvestment || ''}
                      onChange={(e) => handleInputChange('vctInvestment', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter VCT investment amount"
                    />
                  </div>
                  <button
                    onClick={() => handleFormSubmit('vct_investment')}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Save VCT Investment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marriage' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Marriage Allowance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transfer to Spouse</label>
                <input
                  type="number"
                  value={formData.marriageTransfer || ''}
                  onChange={(e) => handleInputChange('marriageTransfer', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter transfer amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Receive from Spouse</label>
                <input
                  type="number"
                  value={formData.marriageReceive || ''}
                  onChange={(e) => handleInputChange('marriageReceive', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter receive amount"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => handleFormSubmit('marriage_allowance')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Save Marriage Allowance
              </button>
            </div>
          </div>
        )}

        {activeTab === 'allowances' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Trading & Property Allowances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Trading Allowance</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Limit</span>
                    <span className="font-medium">£{(reliefsData?.other_allowances?.trading_allowance || 1000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Claimed</span>
                    <span className="font-medium">£0</span>
                  </div>
                  <button 
                    onClick={() => handleAddRelief('trading_allowance')}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Claim Trading Allowance
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Property Allowance</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Limit</span>
                    <span className="font-medium">£{(reliefsData?.other_allowances?.property_allowance || 1000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Claimed</span>
                    <span className="font-medium">£0</span>
                  </div>
                  <button 
                    onClick={() => handleAddRelief('property_allowance')}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Claim Property Allowance
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'losses' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Trade & Property Losses</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Trading Losses</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Year Loss</label>
                    <input
                      type="number"
                      value={formData.currentYearTradingLoss || ''}
                      onChange={(e) => handleInputChange('currentYearTradingLoss', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter current year trading loss"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brought Forward</label>
                    <input
                      type="number"
                      value={formData.broughtForwardTradingLoss || ''}
                      onChange={(e) => handleInputChange('broughtForwardTradingLoss', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter brought forward loss"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Carried Back</label>
                    <input
                      type="number"
                      value={formData.carriedBackTradingLoss || ''}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Year Loss</label>
                    <input
                      type="number"
                      value={formData.currentYearPropertyLoss || ''}
                      onChange={(e) => handleInputChange('currentYearPropertyLoss', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter current year property loss"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brought Forward</label>
                    <input
                      type="number"
                      value={formData.broughtForwardPropertyLoss || ''}
                      onChange={(e) => handleInputChange('broughtForwardPropertyLoss', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Enter brought forward loss"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available Relief</label>
                    <input
                      type="number"
                      value={formData.availablePropertyRelief || ''}
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
      </div>
    </div>
  );
};

export default ReliefsDeductions;

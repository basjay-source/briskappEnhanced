import React, { useState } from 'react';
import { Gift, PiggyBank, TrendingUp, Minus, Plus, Save } from 'lucide-react';

const ReliefsDeductions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('giftaid');
  const [formData, setFormData] = useState({
    giftAid: { charityName: '', donationAmount: '', dateOfDonation: '', giftAidClaimed: false },
    pension: { providerName: '', contributionAmount: '', taxYear: '', reliefClaimed: false },
    eisseisVct: { companyName: '', investmentAmount: '', certificateNumber: '', dateOfInvestment: '' },
    tradePropertyLosses: { lossType: 'trading', lossAmount: '', taxYear: '', carryBackClaimed: false, carryForwardAmount: '' },
    marriageAllowance: { spouseName: '', transferAmount: '', taxYear: '', claimed: false },
    allowances: { personalAllowance: '12570', blindPersonsAllowance: '', marriageAllowanceTransfer: '' }
  });

  const handleInputChange = (reliefType: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [reliefType]: { ...prev[reliefType as keyof typeof prev], [field]: value }
    }));
  };

  const handleSave = async (reliefType: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/reliefs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: reliefType, data: formData[reliefType as keyof typeof formData] })
      });
      if (response.ok) {
        alert(`${reliefType} relief saved successfully!`);
      }
    } catch (err) {
      console.error('Error saving relief:', err);
    }
  };

  const tabs = [
    { id: 'giftaid', label: 'Gift Aid', icon: Gift },
    { id: 'pension', label: 'Pension Contributions', icon: PiggyBank },
    { id: 'eisseisVct', label: 'EIS/SEIS/VCT', icon: TrendingUp },
    { id: 'tradePropertyLosses', label: 'Trade/Property Losses', icon: Minus },
    { id: 'marriageAllowance', label: 'Marriage Allowance', icon: Plus },
    { id: 'allowances', label: 'Allowances', icon: Save }
  ];

  const renderContent = () => {
    if (activeTab === 'giftaid') {
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Gift Aid Donations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Charity Name</label>
                <input type="text" value={formData.giftAid.charityName} onChange={(e) => handleInputChange('giftAid', 'charityName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter charity name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount (£)</label>
                <input type="number" value={formData.giftAid.donationAmount} onChange={(e) => handleInputChange('giftAid', 'donationAmount', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Donation</label>
                <input type="date" value={formData.giftAid.dateOfDonation} onChange={(e) => handleInputChange('giftAid', 'dateOfDonation', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" checked={formData.giftAid.giftAidClaimed} onChange={(e) => handleInputChange('giftAid', 'giftAidClaimed', e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Gift Aid claimed by charity</span>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-3">Gift Aid Relief Calculation</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Donation Amount</span>
                  <span className="font-medium">£{formData.giftAid.donationAmount || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Basic Rate Relief (25%)</span>
                  <span className="font-medium">£{(parseFloat(formData.giftAid.donationAmount) * 0.25 || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => handleSave('giftAid')} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">Save Gift Aid Relief</button>
        </div>
      );
    }

    if (activeTab === 'tradePropertyLosses') {
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Trade & Property Losses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loss Type</label>
                <select value={formData.tradePropertyLosses.lossType} onChange={(e) => handleInputChange('tradePropertyLosses', 'lossType', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="trading">Trading Loss</option>
                  <option value="property">Property Loss</option>
                  <option value="employment">Employment Loss</option>
                  <option value="miscellaneous">Miscellaneous Loss</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loss Amount (£)</label>
                <input type="number" value={formData.tradePropertyLosses.lossAmount} onChange={(e) => handleInputChange('tradePropertyLosses', 'lossAmount', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Year</label>
                <select value={formData.tradePropertyLosses.taxYear} onChange={(e) => handleInputChange('tradePropertyLosses', 'taxYear', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Tax Year</option>
                  <option value="2024-25">2024-25</option>
                  <option value="2023-24">2023-24</option>
                  <option value="2022-23">2022-23</option>
                  <option value="2021-22">2021-22</option>
                </select>
              </div>
              <div className="flex items-center">
                <input type="checkbox" checked={formData.tradePropertyLosses.carryBackClaimed} onChange={(e) => handleInputChange('tradePropertyLosses', 'carryBackClaimed', e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Claim carry back relief</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carry Forward Amount (£)</label>
                <input type="number" value={formData.tradePropertyLosses.carryForwardAmount} onChange={(e) => handleInputChange('tradePropertyLosses', 'carryForwardAmount', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-medium text-orange-800 mb-3">Loss Relief Options</h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-white rounded border">
                  <h5 className="font-medium mb-2">Carry Back Relief</h5>
                  <p className="text-gray-600">Offset losses against profits from previous tax years (up to 3 years for trading losses)</p>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h5 className="font-medium mb-2">Carry Forward Relief</h5>
                  <p className="text-gray-600">Offset losses against future profits of the same trade</p>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h5 className="font-medium mb-2">Sideways Relief</h5>
                  <p className="text-gray-600">Offset losses against other income in the same or previous tax year</p>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => handleSave('tradePropertyLosses')} className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors">Save Loss Relief</button>
        </div>
      );
    }

    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Content for {activeTab} tab will be implemented here.</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Reliefs & Deductions</h2>
        <button onClick={() => handleSave(activeTab)} className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">Save Current Tab</button>
      </div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default ReliefsDeductions;

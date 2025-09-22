import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Calculator, TrendingUp, FileText, DollarSign } from 'lucide-react';

interface SelfEmploymentData {
  id: string;
  business_name: string;
  trade_description: string;
  start_date: string;
  accounting_basis: string;
  turnover: number;
  expenses: number;
  capital_allowances: number;
  cis_deducted: number;
}

const SelfEmployment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('businesses');
  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState<SelfEmploymentData[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<any>(null);

  const tabs = [
    { id: 'businesses', label: 'Businesses', icon: Briefcase },
    { id: 'basis', label: 'Basis (Cash/Accruals)', icon: Calculator },
    { id: 'turnover', label: 'Turnover & Expenses', icon: DollarSign },
    { id: 'capital-allowances', label: 'Capital Allowances', icon: TrendingUp },
    { id: 'losses', label: 'Losses & CIS', icon: FileText }
  ];

  useEffect(() => {
    fetchSelfEmploymentData();
    fetchAssets();
  }, []);

  const fetchSelfEmploymentData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/self-employment?tax_year=2024-25`);
      const data = await response.json();
      setBusinesses(data.businesses || []);
    } catch (error) {
      console.error('Error fetching self-employment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/self-employment/assets`);
      const data = await response.json();
      setAssets(data.assets || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const handleCreateAsset = async (assetData: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/self-employment/assets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assetData)
      });
      if (response.ok) {
        fetchAssets();
        setShowAssetForm(false);
        alert('Asset created successfully!');
      }
    } catch (error) {
      console.error('Error creating asset:', error);
      alert('Error creating asset');
    }
  };

  const handleUpdateAsset = async (assetId: string, assetData: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/self-employment/assets/${assetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assetData)
      });
      if (response.ok) {
        fetchAssets();
        setEditingAsset(null);
        alert('Asset updated successfully!');
      }
    } catch (error) {
      console.error('Error updating asset:', error);
      alert('Error updating asset');
    }
  };

  const handleDeleteAsset = async (assetId: string) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/self-employment/assets/${assetId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchAssets();
          alert('Asset deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting asset:', error);
        alert('Error deleting asset');
      }
    }
  };

  const handleSaveAccountingBasis = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const basisData = {
      accounting_basis: formData.get('accounting-basis')
    };
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/self-employment/basis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(basisData)
      });
      if (response.ok) {
        alert('Accounting basis saved successfully!');
      }
    } catch (error) {
      console.error('Error saving accounting basis:', error);
      alert('Error saving accounting basis');
    }
  };

  const handleSaveTurnover = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const turnoverData = {
      sales_turnover: parseFloat(formData.get('sales_turnover') as string) || 0,
      other_income: parseFloat(formData.get('other_income') as string) || 0,
      cost_of_goods: parseFloat(formData.get('cost_of_goods') as string) || 0,
      office_costs: parseFloat(formData.get('office_costs') as string) || 0,
      travel_costs: parseFloat(formData.get('travel_costs') as string) || 0
    };
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/self-employment/turnover`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turnoverData)
      });
      if (response.ok) {
        alert('Turnover & Expenses saved successfully!');
      }
    } catch (error) {
      console.error('Error saving turnover data:', error);
      alert('Error saving turnover data');
    }
  };

  const handleSaveLosses = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const lossesData = {
      losses_brought_forward: parseFloat(formData.get('losses_brought_forward') as string) || 0,
      current_year_loss: parseFloat(formData.get('current_year_loss') as string) || 0,
      cis_tax_deducted: parseFloat(formData.get('cis_tax_deducted') as string) || 0,
      total_cis_income: parseFloat(formData.get('total_cis_income') as string) || 0
    };
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/self-employment/losses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lossesData)
      });
      if (response.ok) {
        alert('Losses & CIS data saved successfully!');
      }
    } catch (error) {
      console.error('Error saving losses data:', error);
      alert('Error saving losses data');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Self-Employment (SA103)</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Business</span>
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
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'businesses' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h3>
            <div className="space-y-4">
              {businesses.map((business) => (
                <div key={business.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{business.business_name}</h4>
                      <p className="text-sm text-gray-600">{business.trade_description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Started: {business.start_date}</p>
                      <p className="text-sm text-gray-600">Basis: {business.accounting_basis}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Turnover</label>
                      <p className="text-lg font-semibold text-gray-900">£{business.turnover.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Expenses</label>
                      <p className="text-lg font-semibold text-gray-900">£{business.expenses.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Capital Allowances</label>
                      <p className="text-lg font-semibold text-gray-900">£{business.capital_allowances.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Profit</label>
                      <p className="text-lg font-semibold text-green-600">
                        £{(business.turnover - business.expenses - business.capital_allowances).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'basis' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accounting Basis</h3>
            <form onSubmit={handleSaveAccountingBasis}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Accounting Basis</label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="cash-basis"
                        name="accounting-basis"
                        type="radio"
                        value="cash"
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                        defaultChecked
                      />
                      <label htmlFor="cash-basis" className="ml-3 block text-sm font-medium text-gray-700">
                        Cash Basis
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="accruals-basis"
                        name="accounting-basis"
                        type="radio"
                        value="accruals"
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                      />
                      <label htmlFor="accruals-basis" className="ml-3 block text-sm font-medium text-gray-700">
                        Traditional Accounting (Accruals)
                      </label>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Cash Basis Information</h4>
                  <p className="text-sm text-blue-800">
                    Under cash basis, you record income when you receive it and expenses when you pay them. 
                    This is simpler but has restrictions on allowable expenses and capital allowances.
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Save Accounting Basis
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'turnover' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Turnover & Expenses</h3>
            <form onSubmit={handleSaveTurnover}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Income</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sales/Turnover</label>
                      <input
                        type="number"
                        name="sales_turnover"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Other Business Income</label>
                      <input
                        type="number"
                        name="other_income"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Expenses</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cost of Goods Sold</label>
                      <input
                        type="number"
                        name="cost_of_goods"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Office Costs</label>
                      <input
                        type="number"
                        name="office_costs"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Travel Costs</label>
                      <input
                        type="number"
                        name="travel_costs"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save Turnover & Expenses
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'capital-allowances' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Capital Allowances</h3>
              <button 
                onClick={() => setShowAssetForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Add Asset
              </button>
            </div>

            {(showAssetForm || editingAsset) && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold mb-4">
                  {editingAsset ? 'Edit Asset' : 'Add New Asset'}
                </h4>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const assetData = {
                    description: formData.get('description'),
                    date_acquired: formData.get('date_acquired'),
                    cost: parseFloat(formData.get('cost') as string),
                    category: formData.get('category'),
                    aia_claimed: formData.get('aia_claimed') === 'on'
                  };
                  if (editingAsset) {
                    handleUpdateAsset(editingAsset.id, assetData);
                  } else {
                    handleCreateAsset(assetData);
                  }
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <input 
                        type="text" 
                        name="description"
                        defaultValue={editingAsset?.description || ''}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="e.g., MacBook Pro M3"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Acquired</label>
                      <input 
                        type="date" 
                        name="date_acquired"
                        defaultValue={editingAsset?.date_acquired || ''}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cost (£)</label>
                      <input 
                        type="number" 
                        name="cost"
                        defaultValue={editingAsset?.cost || ''}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                        step="0.01"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select 
                        name="category"
                        defaultValue={editingAsset?.category || 'Plant & Machinery'}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="Plant & Machinery">Plant & Machinery</option>
                        <option value="Motor Vehicles">Motor Vehicles</option>
                        <option value="Fixtures & Fittings">Fixtures & Fittings</option>
                        <option value="Computer Equipment">Computer Equipment</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="aia_claimed"
                        defaultChecked={editingAsset?.aia_claimed || false}
                        className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Claim Annual Investment Allowance (AIA)</span>
                    </label>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowAssetForm(false);
                        setEditingAsset(null);
                      }}
                      className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      {editingAsset ? 'Update Asset' : 'Create Asset'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-lg mb-6">
              <div className="px-4 py-3 border-b border-gray-200">
                <h4 className="font-medium text-gray-900">Assets Register</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Acquired</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">AIA</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {assets.map((asset) => (
                      <tr key={asset.id}>
                        <td className="px-4 py-3 text-sm text-gray-900">{asset.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{asset.date_acquired}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">£{asset.cost?.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{asset.category}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {asset.aia_claimed ? `£${asset.aia_amount?.toLocaleString()}` : 'No'}
                        </td>
                        <td className="px-4 py-3 text-sm space-x-2">
                          <button 
                            onClick={() => setEditingAsset(asset)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteAsset(asset.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Annual Investment Allowance</h4>
                  <p className="text-2xl font-bold text-gray-900">
                    £{assets.reduce((sum, asset) => sum + (asset.aia_amount || 0), 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">100% allowance</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Writing Down Allowance</h4>
                  <p className="text-2xl font-bold text-gray-900">
                    £{assets.reduce((sum, asset) => sum + (asset.wda_amount || 0), 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">18% rate</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">First Year Allowance</h4>
                  <p className="text-2xl font-bold text-gray-900">£0</p>
                  <p className="text-sm text-gray-600">100% allowance</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'losses' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Losses & CIS</h3>
            <form onSubmit={handleSaveLosses}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Loss Relief</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Losses Brought Forward</label>
                      <input
                        type="number"
                        name="losses_brought_forward"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Year Loss</label>
                      <input
                        type="number"
                        name="current_year_loss"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">CIS Deductions</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CIS Tax Deducted</label>
                      <input
                        type="number"
                        name="cis_tax_deducted"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total CIS Income</label>
                      <input
                        type="number"
                        name="total_cis_income"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save Losses & CIS Data
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfEmployment;

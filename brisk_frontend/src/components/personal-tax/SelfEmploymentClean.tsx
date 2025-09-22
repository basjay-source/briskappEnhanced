import React, { useState, useEffect } from 'react';
import { Briefcase, Calculator, TrendingUp, FileText, DollarSign, ArrowLeft } from 'lucide-react';

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

interface Asset {
  id: string;
  description: string;
  date_acquired: string;
  cost: number;
  category: string;
  aia_claimed: boolean;
  aia_amount?: number;
  wda_amount?: number;
}

const SelfEmploymentClean: React.FC = () => {
  const [activeTab, setActiveTab] = useState('businesses');
  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState<SelfEmploymentData[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [showFullPageForm, setShowFullPageForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);

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
        const result = await response.json();
        console.log('Asset created successfully:', result);
        await fetchAssets();
        setShowFullPageForm(false);
        alert('Asset created successfully with capital allowance calculations!');
      } else {
        const error = await response.text();
        console.error('Failed to create asset:', error);
        alert('Failed to create asset. Please try again.');
      }
    } catch (error) {
      console.error('Error creating asset:', error);
      alert('Error creating asset. Please check your connection.');
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
        const result = await response.json();
        console.log('Asset updated successfully:', result);
        await fetchAssets();
        setShowFullPageForm(false);
        setEditingAsset(null);
        alert('Asset updated successfully!');
      } else {
        const error = await response.text();
        console.error('Failed to update asset:', error);
        alert('Failed to update asset. Please try again.');
      }
    } catch (error) {
      console.error('Error updating asset:', error);
      alert('Error updating asset. Please check your connection.');
    }
  };

  const handleDeleteAsset = async (assetId: string) => {
    try {
      if (confirm('Are you sure you want to delete this asset?')) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/self-employment/assets/${assetId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          await fetchAssets();
          alert('Asset deleted successfully!');
        } else {
          alert('Failed to delete asset. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
      alert('Error deleting asset. Please check your connection.');
    }
  };

  const handleSaveAccountingBasis = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const basisData = {
        accounting_basis: formData.get('accounting-basis'),
        taxpayer_id: 1,
        tax_year: '2024-25'
      };
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/self-employment/basis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(basisData)
      });
      
      if (response.ok) {
        alert('Accounting basis saved successfully!');
        await fetchSelfEmploymentData();
      } else {
        alert('Failed to save accounting basis. Please try again.');
      }
    } catch (error) {
      console.error('Error saving accounting basis:', error);
      alert('Error saving accounting basis. Please check your connection.');
    }
  };

  const handleSaveTurnover = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const turnoverData = {
        sales_turnover: parseFloat(formData.get('sales_turnover') as string) || 0,
        other_income: parseFloat(formData.get('other_income') as string) || 0,
        cost_of_goods: parseFloat(formData.get('cost_of_goods') as string) || 0,
        office_costs: parseFloat(formData.get('office_costs') as string) || 0,
        travel_costs: parseFloat(formData.get('travel_costs') as string) || 0,
        taxpayer_id: 1,
        tax_year: '2024-25'
      };
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/self-employment/turnover`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turnoverData)
      });
      
      if (response.ok) {
        alert('Turnover & expenses saved successfully!');
        await fetchSelfEmploymentData();
      } else {
        alert('Failed to save turnover data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving turnover:', error);
      alert('Error saving turnover data. Please check your connection.');
    }
  };

  const handleSaveLosses = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const lossesData = {
        current_loss: parseFloat(formData.get('current_loss') as string) || 0,
        carry_back: parseFloat(formData.get('carry_back') as string) || 0,
        carry_forward: parseFloat(formData.get('carry_forward') as string) || 0,
        cis_deducted: parseFloat(formData.get('cis_deducted') as string) || 0,
        gross_payment: parseFloat(formData.get('gross_payment') as string) || 0,
        taxpayer_id: 1,
        tax_year: '2024-25'
      };
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/self-employment/losses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lossesData)
      });
      
      if (response.ok) {
        alert('Losses & CIS data saved successfully!');
        await fetchSelfEmploymentData();
      } else {
        alert('Failed to save losses data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving losses:', error);
      alert('Error saving losses data. Please check your connection.');
    }
  };

  if (showFullPageForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {editingAsset ? 'Edit Asset' : 'Add New Asset'}
              </h1>
              <button
                onClick={() => {
                  setShowFullPageForm(false);
                  setEditingAsset(null);
                }}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Capital Allowances
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const assetData = {
                name: formData.get('name'),
                category: formData.get('category'),
                cost: parseFloat(formData.get('cost') as string),
                date_acquired: formData.get('date_acquired'),
                description: formData.get('description'),
                taxpayer_id: 1,
                tax_year: '2024-25',
                cis_deducted: 0
              };

              if (editingAsset) {
                handleUpdateAsset(editingAsset.id, assetData);
              } else {
                handleCreateAsset(assetData);
              }
            }}>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Asset Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Asset Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={editingAsset?.description?.split(' - ')[0] || ''}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., Office Laptop"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      name="category"
                      required
                      defaultValue={editingAsset?.category || ''}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Select Category</option>
                      <option value="Plant & Machinery">Plant & Machinery</option>
                      <option value="Motor Vehicles">Motor Vehicles</option>
                      <option value="Fixtures & Fittings">Fixtures & Fittings</option>
                      <option value="Computer Equipment">Computer Equipment</option>
                      <option value="Office Equipment">Office Equipment</option>
                      <option value="Tools & Equipment">Tools & Equipment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cost (£) *</label>
                    <input
                      type="number"
                      name="cost"
                      step="0.01"
                      required
                      defaultValue={editingAsset?.cost || ''}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Acquired *</label>
                    <input
                      type="date"
                      name="date_acquired"
                      required
                      defaultValue={editingAsset?.date_acquired || ''}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      defaultValue={editingAsset?.description?.split(' - ')[1] || ''}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Additional details about the asset..."
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Capital Allowances</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">Automatic Calculation</h4>
                  <p className="text-sm text-blue-800">
                    Capital allowances will be automatically calculated based on the asset category and cost. 
                    Computer equipment may qualify for 100% Annual Investment Allowance (AIA).
                  </p>
                  <ul className="text-sm text-blue-700 mt-2 list-disc list-inside">
                    <li>Computer Equipment: 100% AIA (up to £1,000,000)</li>
                    <li>Plant & Machinery: 100% AIA (up to £1,000,000)</li>
                    <li>Motor Vehicles: 18% Writing Down Allowance</li>
                    <li>Other Equipment: 18% Writing Down Allowance</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowFullPageForm(false);
                    setEditingAsset(null);
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  {editingAsset ? 'Update Asset' : 'Create Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      )}

      {activeTab === 'businesses' && !loading && (
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Self-Employment Businesses</h3>
          <div className="space-y-4">
            {businesses.length > 0 ? (
              businesses.map((business) => (
                <div key={business.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{business.business_name}</h4>
                      <p className="text-sm text-gray-600">{business.trade_description}</p>
                      <p className="text-sm text-gray-500">Started: {business.start_date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Turnover: £{business.turnover.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Expenses: £{business.expenses.toLocaleString()}</p>
                      <p className="text-sm text-green-600">Profit: £{(business.turnover - business.expenses).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No businesses found. Add your first business to get started.</p>
              </div>
            )}
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
                      step="0.01"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other Business Income</label>
                    <input
                      type="number"
                      name="other_income"
                      step="0.01"
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
                      step="0.01"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Office Costs</label>
                    <input
                      type="number"
                      name="office_costs"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Travel Costs</label>
                    <input
                      type="number"
                      name="travel_costs"
                      step="0.01"
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
              onClick={() => setShowFullPageForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Asset
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg mb-6">
            <div className="px-4 py-3 border-b border-gray-200">
              <h4 className="font-medium text-gray-900">Assets Register</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Acquired</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AIA</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WDA</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assets.length > 0 ? (
                    assets.map((asset) => (
                      <tr key={asset.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{asset.description}</div>
                            <div className="text-sm text-gray-500">{asset.category}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.date_acquired}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{asset.cost.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {asset.aia_claimed ? `£${asset.aia_amount?.toLocaleString() || 0}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {!asset.aia_claimed ? `£${asset.wda_amount?.toLocaleString() || 0}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              setEditingAsset(asset);
                              setShowFullPageForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAsset(asset.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        No assets found. Click "Add Asset" to create your first asset.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Main Pool</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Brought Forward:</span>
                  <span>£15,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Additions:</span>
                  <span>£{assets.reduce((sum, asset) => sum + asset.cost, 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>AIA Claimed:</span>
                  <span>£{assets.filter(a => a.aia_claimed).reduce((sum, asset) => sum + (asset.aia_amount || 0), 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>WDA (18%):</span>
                  <span>£{assets.filter(a => !a.aia_claimed).reduce((sum, asset) => sum + (asset.wda_amount || 0), 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Carried Forward:</span>
                  <span>£{(15000 + assets.reduce((sum, asset) => sum + asset.cost - (asset.aia_amount || 0) - (asset.wda_amount || 0), 0)).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Special Rate Pool</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Brought Forward:</span>
                  <span>£5,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Additions:</span>
                  <span>£0</span>
                </div>
                <div className="flex justify-between">
                  <span>WDA (6%):</span>
                  <span>£300</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Carried Forward:</span>
                  <span>£4,700</span>
                </div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Year Loss</label>
                    <input
                      type="number"
                      name="current_loss"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Carry Back to Previous Year</label>
                    <input
                      type="number"
                      name="carry_back"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Carry Forward</label>
                    <input
                      type="number"
                      name="carry_forward"
                      step="0.01"
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
                      name="cis_deducted"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gross Payment</label>
                    <input
                      type="number"
                      name="gross_payment"
                      step="0.01"
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
  );
};

export default SelfEmploymentClean;

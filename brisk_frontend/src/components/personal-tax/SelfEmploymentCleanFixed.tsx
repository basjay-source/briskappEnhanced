import React, { useState, useEffect } from 'react';

const SelfEmploymentCleanFixed: React.FC = () => {
  const [activeTab, setActiveTab] = useState('businesses');
  const [loading, setLoading] = useState(false);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [showFullPageForm, setShowFullPageForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<any>(null);

  const tabs = [
    { id: 'businesses', label: 'Businesses' },
    { id: 'basis', label: 'Accounting Basis' },
    { id: 'turnover', label: 'Turnover & Expenses' },
    { id: 'allowances', label: 'Capital Allowances' },
    { id: 'losses', label: 'Losses & CIS' }
  ];

  const fetchSelfEmploymentData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://app-xrzbrdsj.fly.dev'}/api/personal-tax/self-employment`);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://app-xrzbrdsj.fly.dev'}/api/personal-tax/self-employment/assets`);
      const data = await response.json();
      setAssets(data.assets || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const handleCreateAsset = async (formData: FormData) => {
    try {
      const assetData = {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        cost: parseFloat(formData.get('cost') as string),
        date_acquired: formData.get('date_acquired') as string,
        description: formData.get('description') as string,
        taxpayer_id: 1,
        tax_year: '2024-25',
        cis_deducted: 0
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://app-xrzbrdsj.fly.dev'}/api/personal-tax/self-employment/assets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assetData)
      });

      if (response.ok) {
        await fetchAssets();
        setShowFullPageForm(false);
        setEditingAsset(null);
      }
    } catch (error) {
      console.error('Error creating asset:', error);
    }
  };

  const handleUpdateAsset = async (formData: FormData) => {
    if (!editingAsset) return;
    
    try {
      const assetData = {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        cost: parseFloat(formData.get('cost') as string),
        date_acquired: formData.get('date_acquired') as string,
        description: formData.get('description') as string,
        taxpayer_id: 1,
        tax_year: '2024-25',
        cis_deducted: 0
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://app-xrzbrdsj.fly.dev'}/api/personal-tax/self-employment/assets/${editingAsset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assetData)
      });

      if (response.ok) {
        await fetchAssets();
        setShowFullPageForm(false);
        setEditingAsset(null);
      }
    } catch (error) {
      console.error('Error updating asset:', error);
    }
  };

  const handleDeleteAsset = async (assetId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://app-xrzbrdsj.fly.dev'}/api/personal-tax/self-employment/assets/${assetId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchAssets();
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const handleSaveAccountingBasis = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const basisData = {
        business_id: '1',
        accounting_basis: formData.get('accounting_basis'),
        year_end: formData.get('year_end'),
        change_reason: formData.get('change_reason')
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://app-xrzbrdsj.fly.dev'}/api/personal-tax/self-employment/accounting-basis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(basisData)
      });

      if (response.ok) {
        console.log('Accounting basis saved successfully');
      }
    } catch (error) {
      console.error('Error saving accounting basis:', error);
    }
  };

  const handleSaveTurnover = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const turnoverData = {
        business_id: '1',
        turnover: parseFloat(formData.get('turnover') as string),
        other_income: parseFloat(formData.get('other_income') as string),
        total_expenses: parseFloat(formData.get('total_expenses') as string),
        cost_of_sales: parseFloat(formData.get('cost_of_sales') as string),
        staff_costs: parseFloat(formData.get('staff_costs') as string),
        premises_costs: parseFloat(formData.get('premises_costs') as string),
        motor_expenses: parseFloat(formData.get('motor_expenses') as string),
        other_expenses: parseFloat(formData.get('other_expenses') as string)
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://app-xrzbrdsj.fly.dev'}/api/personal-tax/self-employment/turnover`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turnoverData)
      });

      if (response.ok) {
        console.log('Turnover data saved successfully');
      }
    } catch (error) {
      console.error('Error saving turnover data:', error);
    }
  };

  const handleSaveLosses = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const lossesData = {
        business_id: '1',
        current_loss: parseFloat(formData.get('current_loss') as string),
        carry_back: parseFloat(formData.get('carry_back') as string),
        carry_forward: parseFloat(formData.get('carry_forward') as string),
        cis_deducted: parseFloat(formData.get('cis_deducted') as string),
        gross_payment: parseFloat(formData.get('gross_payment') as string)
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://app-xrzbrdsj.fly.dev'}/api/personal-tax/self-employment/losses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lossesData)
      });

      if (response.ok) {
        console.log('Losses data saved successfully');
      }
    } catch (error) {
      console.error('Error saving losses data:', error);
    }
  };

  useEffect(() => {
    fetchSelfEmploymentData();
    fetchAssets();
  }, []);

  if (showFullPageForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingAsset ? 'Edit Asset' : 'Add New Asset'}
              </h2>
              <button
                onClick={() => {
                  setShowFullPageForm(false);
                  setEditingAsset(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              if (editingAsset) {
                handleUpdateAsset(formData);
              } else {
                handleCreateAsset(formData);
              }
            }}>
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
                    placeholder="Additional details about the asset"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-blue-900 mb-2">Capital Allowances Information</h4>
                <p className="text-sm text-blue-700 mb-2">
                  Capital allowances will be automatically calculated based on the asset category and current HMRC rates.
                </p>
                <ul className="text-sm text-blue-700 mt-2 list-disc list-inside">
                  <li>Computer Equipment: 100% AIA (up to £1,000,000)</li>
                  <li>Plant & Machinery: 100% AIA (up to £1,000,000)</li>
                  <li>Motor Vehicles: 18% Writing Down Allowance</li>
                  <li>Other Equipment: 18% Writing Down Allowance</li>
                </ul>
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowFullPageForm(false);
                    setEditingAsset(null);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
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
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'businesses' && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Self-Employment Businesses</h3>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
              Add Business
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading businesses...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <div key={business.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{business.business_name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{business.trade_description}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Turnover:</span>
                      <span>£{business.turnover?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profit:</span>
                      <span>£{business.profit_loss?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Basis:</span>
                      <span className="capitalize">{business.accounting_basis}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'basis' && (
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Accounting Basis</h3>
          <form onSubmit={handleSaveAccountingBasis}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accounting Basis</label>
                <select
                  name="accounting_basis"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="cash">Cash Basis</option>
                  <option value="accruals">Accruals Basis</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year End</label>
                <input
                  type="date"
                  name="year_end"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Change</label>
                <textarea
                  name="change_reason"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="If changing basis, explain the reason"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Save Accounting Basis
              </button>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Turnover</label>
                    <input
                      type="number"
                      name="turnover"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other Income</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cost of Sales</label>
                    <input
                      type="number"
                      name="cost_of_sales"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Staff Costs</label>
                    <input
                      type="number"
                      name="staff_costs"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Premises Costs</label>
                    <input
                      type="number"
                      name="premises_costs"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Motor Expenses</label>
                    <input
                      type="number"
                      name="motor_expenses"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other Expenses</label>
                    <input
                      type="number"
                      name="other_expenses"
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

      {activeTab === 'allowances' && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Capital Allowances</h3>
            <button
              onClick={() => setShowFullPageForm(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Add Asset
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
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

export default SelfEmploymentCleanFixed;

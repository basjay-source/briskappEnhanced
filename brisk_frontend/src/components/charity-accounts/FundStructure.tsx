import React, { useState, useEffect } from 'react';
import { Target, Plus, Edit, Trash2, Save, AlertCircle, Building } from 'lucide-react';

interface FundStructureProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: 'charity' | 'academy';
  selectedFramework: 'sorp' | 'aad';
}

interface Fund {
  id: string;
  name: string;
  type: 'unrestricted' | 'restricted_general' | 'restricted_fixed_asset' | 'permanent_endowment' | 'expendable_endowment' | 'designated';
  description: string;
  restrictions?: string;
  openingBalance: number;
  currentBalance: number;
  isActive: boolean;
  academySegment?: string;
}

interface FundPolicy {
  id: string;
  fundType: string;
  recognitionPolicy: string;
  transferPolicy: string;
  restrictionPolicy: string;
}

interface AcademySegment {
  id: string;
  name: string;
  academyNumber: string;
  isActive: boolean;
}

const FundStructure: React.FC<FundStructureProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('fund-register');
  const [funds, setFunds] = useState<Fund[]>([]);
  const [fundPolicies, setFundPolicies] = useState<FundPolicy[]>([]);
  const [academySegments, setAcademySegments] = useState<AcademySegment[]>([]);
  const [dimensionMapping, setDimensionMapping] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [showAddFund, setShowAddFund] = useState(false);
  const [editingFund, setEditingFund] = useState<Fund | null>(null);

  const tabs = [
    { id: 'fund-register', label: 'Fund Register', icon: Target },
    { id: 'fund-policies', label: 'Fund Policies', icon: AlertCircle },
    { id: 'academy-segments', label: 'Academy Segments (MAT)', icon: Building },
    { id: 'dimension-mapping', label: 'Dimension Mapping', icon: Edit }
  ];

  const fundTypes = [
    { value: 'unrestricted', label: 'Unrestricted', description: 'Funds with no restrictions on use' },
    { value: 'restricted_general', label: 'Restricted General', description: 'Funds restricted for specific purposes' },
    { value: 'restricted_fixed_asset', label: 'Restricted Fixed Asset', description: 'Funds restricted for fixed assets' },
    { value: 'permanent_endowment', label: 'Permanent Endowment', description: 'Capital must be maintained permanently' },
    { value: 'expendable_endowment', label: 'Expendable Endowment', description: 'Capital may be spent' },
    { value: 'designated', label: 'Designated', description: 'Unrestricted funds set aside for specific purposes' }
  ];

  useEffect(() => {
    fetchFundStructureData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchFundStructureData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/charity-accounts/fund-structure?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      
      setFunds(data.funds || [
        {
          id: '1',
          name: 'General Fund',
          type: 'unrestricted',
          description: 'General unrestricted funds for charitable activities',
          openingBalance: 150000,
          currentBalance: 175000,
          isActive: true
        },
        {
          id: '2',
          name: 'Building Fund',
          type: 'restricted_general',
          description: 'Funds restricted for building improvements',
          restrictions: 'Must be used for building maintenance and improvements only',
          openingBalance: 50000,
          currentBalance: 45000,
          isActive: true
        },
        {
          id: '3',
          name: 'Fixed Asset Fund',
          type: 'restricted_fixed_asset',
          description: 'Funds invested in fixed assets',
          openingBalance: 500000,
          currentBalance: 520000,
          isActive: true
        }
      ]);

      setFundPolicies(data.fundPolicies || [
        {
          id: '1',
          fundType: 'unrestricted',
          recognitionPolicy: 'Income recognized when received or receivable',
          transferPolicy: 'Transfers allowed to any fund type with trustee approval',
          restrictionPolicy: 'No restrictions on use'
        },
        {
          id: '2',
          fundType: 'restricted_general',
          recognitionPolicy: 'Income recognized when conditions are met',
          transferPolicy: 'Transfers only to other restricted funds with same purpose',
          restrictionPolicy: 'Must comply with donor restrictions'
        }
      ]);

      if (selectedMode === 'academy') {
        setAcademySegments(data.academySegments || [
          {
            id: '1',
            name: 'St. Mary\'s Primary Academy',
            academyNumber: '12345',
            isActive: true
          },
          {
            id: '2',
            name: 'St. John\'s Secondary Academy',
            academyNumber: '12346',
            isActive: true
          }
        ]);
      }

      setDimensionMapping(data.dimensionMapping || {
        bookkeepingFunds: ['FUND001', 'FUND002', 'FUND003'],
        departments: ['ADMIN', 'TEACHING', 'FACILITIES'],
        projects: ['PROJ001', 'PROJ002']
      });
    } catch (error) {
      console.error('Error fetching fund structure data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFund = async (fund: Fund) => {
    try {
      const method = fund.id ? 'PUT' : 'POST';
      const url = fund.id 
        ? `${import.meta.env.VITE_API_URL}/charity-accounts/funds/${fund.id}`
        : `${import.meta.env.VITE_API_URL}/charity-accounts/funds`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fund)
      });

      if (response.ok) {
        const savedFund = await response.json();
        if (fund.id) {
          setFunds(funds.map(f => f.id === fund.id ? savedFund : f));
        } else {
          setFunds([...funds, savedFund]);
        }
        setShowAddFund(false);
        setEditingFund(null);
      }
    } catch (error) {
      console.error('Error saving fund:', error);
    }
  };

  const handleDeleteFund = async (fundId: string) => {
    if (confirm('Are you sure you want to delete this fund?')) {
      try {
        const response = await fetch(`http://localhost:8000/charity-accounts/funds/${fundId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setFunds(funds.filter(f => f.id !== fundId));
        }
      } catch (error) {
        console.error('Error deleting fund:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading fund structure...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Fund Structure & Dimensions</h1>
        {activeTab === 'fund-register' && (
          <button
            onClick={() => setShowAddFund(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Fund</span>
          </button>
        )}
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
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === 'fund-register' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Fund Register</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {funds.map((fund) => (
                    <tr key={fund.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{fund.name}</div>
                          <div className="text-sm text-gray-500">{fund.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          fund.type === 'unrestricted' ? 'bg-green-100 text-green-800' :
                          fund.type === 'restricted_general' ? 'bg-blue-100 text-blue-800' :
                          fund.type === 'restricted_fixed_asset' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {fundTypes.find(t => t.value === fund.type)?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        £{fund.openingBalance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        £{fund.currentBalance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          fund.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {fund.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingFund(fund)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteFund(fund.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {(showAddFund || editingFund) && (
            <FundForm
              fund={editingFund}
              fundTypes={fundTypes}
              academySegments={academySegments}
              selectedMode={selectedMode}
              onSave={handleSaveFund}
              onCancel={() => {
                setShowAddFund(false);
                setEditingFund(null);
              }}
            />
          )}
        </div>
      )}

      {activeTab === 'fund-policies' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fund Policies</h3>
            <div className="space-y-6">
              {fundPolicies.map((policy) => (
                <div key={policy.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {fundTypes.find(t => t.value === policy.fundType)?.label} Fund Policy
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recognition Policy</label>
                      <textarea
                        value={policy.recognitionPolicy}
                        onChange={(e) => {
                          const updatedPolicies = fundPolicies.map(p => 
                            p.id === policy.id ? {...p, recognitionPolicy: e.target.value} : p
                          );
                          setFundPolicies(updatedPolicies);
                        }}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Policy</label>
                      <textarea
                        value={policy.transferPolicy}
                        onChange={(e) => {
                          const updatedPolicies = fundPolicies.map(p => 
                            p.id === policy.id ? {...p, transferPolicy: e.target.value} : p
                          );
                          setFundPolicies(updatedPolicies);
                        }}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Restriction Policy</label>
                      <textarea
                        value={policy.restrictionPolicy}
                        onChange={(e) => {
                          const updatedPolicies = fundPolicies.map(p => 
                            p.id === policy.id ? {...p, restrictionPolicy: e.target.value} : p
                          );
                          setFundPolicies(updatedPolicies);
                        }}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academy-segments' && selectedMode === 'academy' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Academy Segments (MAT)</h3>
            <div className="space-y-4">
              {academySegments.map((segment) => (
                <div key={segment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{segment.name}</h4>
                    <p className="text-sm text-gray-600">Academy Number: {segment.academyNumber}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      segment.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {segment.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'dimension-mapping' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dimension Mapping</h3>
            <p className="text-sm text-gray-600 mb-6">
              Map dimensions from Bookkeeping module to charity funds and activities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Bookkeeping Fund Codes</h4>
                <div className="space-y-2">
                  {dimensionMapping.bookkeepingFunds?.map((code: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-700">{code}</span>
                      <select className="text-sm border border-gray-300 rounded px-2 py-1">
                        <option value="">Map to Fund...</option>
                        {funds.map(fund => (
                          <option key={fund.id} value={fund.id}>{fund.name}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Department Mapping</h4>
                <div className="space-y-2">
                  {dimensionMapping.departments?.map((dept: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-700">{dept}</span>
                      <select className="text-sm border border-gray-300 rounded px-2 py-1">
                        <option value="">Map to Activity...</option>
                        <option value="charitable">Charitable Activities</option>
                        <option value="fundraising">Raising Funds</option>
                        <option value="governance">Governance</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface FundFormProps {
  fund: Fund | null;
  fundTypes: any[];
  academySegments: AcademySegment[];
  selectedMode: 'charity' | 'academy';
  onSave: (fund: Fund) => void;
  onCancel: () => void;
}

const FundForm: React.FC<FundFormProps> = ({ fund, fundTypes, academySegments, selectedMode, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Fund>(fund || {
    id: '',
    name: '',
    type: 'unrestricted',
    description: '',
    restrictions: '',
    openingBalance: 0,
    currentBalance: 0,
    isActive: true,
    academySegment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {fund ? 'Edit Fund' : 'Add New Fund'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fund Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fund Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value as any})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fundTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {(formData.type === 'restricted_general' || formData.type === 'restricted_fixed_asset') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Restrictions</label>
            <textarea
              value={formData.restrictions || ''}
              onChange={(e) => setFormData({...formData, restrictions: e.target.value})}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the restrictions on this fund..."
            />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Opening Balance (£)</label>
            <input
              type="number"
              value={formData.openingBalance}
              onChange={(e) => setFormData({...formData, openingBalance: Number(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Balance (£)</label>
            <input
              type="number"
              value={formData.currentBalance}
              onChange={(e) => setFormData({...formData, currentBalance: Number(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {selectedMode === 'academy' && academySegments.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Academy Segment</label>
            <select
              value={formData.academySegment || ''}
              onChange={(e) => setFormData({...formData, academySegment: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Academies</option>
              {academySegments.map(segment => (
                <option key={segment.id} value={segment.id}>{segment.name}</option>
              ))}
            </select>
          </div>
        )}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">Active Fund</label>
        </div>
        <div className="flex items-center space-x-3 pt-4">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Save className="w-4 h-4" />
            <span>Save Fund</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FundStructure;

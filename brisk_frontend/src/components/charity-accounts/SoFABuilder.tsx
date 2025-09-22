import React, { useState, useEffect } from 'react';
import { BarChart3, Calculator, Eye, Save, AlertTriangle, TrendingUp } from 'lucide-react';

interface SoFABuilderProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: 'charity' | 'academy';
  selectedFramework: 'sorp' | 'aad';
  selectedFund: string;
}

interface SoFALine {
  id: string;
  category: 'income' | 'expenditure';
  subcategory: string;
  description: string;
  unrestricted: number;
  restrictedGeneral: number;
  restrictedFixedAsset: number;
  endowment: number;
  total: number;
  priorYear: number;
  fundAllocations: { [fundId: string]: number };
}

interface ActivityAllocation {
  id: string;
  activityName: string;
  directCosts: number;
  supportCosts: number;
  total: number;
  fundBreakdown: { [fundId: string]: number };
}

const SoFABuilder: React.FC<SoFABuilderProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework,
  selectedFund
}) => {
  const [activeTab, setActiveTab] = useState('income');
  const [sofaLines, setSofaLines] = useState<SoFALine[]>([]);
  const [activityAllocations, setActivityAllocations] = useState<ActivityAllocation[]>([]);
  const [supportCostDrivers, setSupportCostDrivers] = useState<any>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'income', label: 'Income by Fund', icon: TrendingUp },
    { id: 'expenditure', label: 'Expenditure by Activity', icon: BarChart3 },
    { id: 'support-costs', label: 'Support Costs', icon: Calculator },
    { id: 'preview', label: 'SoFA Preview', icon: Eye }
  ];


  useEffect(() => {
    fetchSoFAData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework, selectedFund]);

  const fetchSoFAData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/charity-accounts/sofa-builder?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}&fund=${selectedFund}`);
      const data = await response.json();
      
      setSofaLines(data.sofaLines || generateSampleSoFALines());
      setActivityAllocations(data.activityAllocations || generateSampleActivityAllocations());
      setSupportCostDrivers(data.supportCostDrivers || {
        fte: { education: 15, welfare: 8, fundraising: 3, governance: 2 },
        floorArea: { education: 1200, welfare: 600, fundraising: 200, governance: 100 },
        directCosts: { education: 450000, welfare: 200000, fundraising: 75000, governance: 25000 }
      });
    } catch (error) {
      console.error('Error fetching SoFA data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSampleSoFALines = (): SoFALine[] => [
    {
      id: '1',
      category: 'income',
      subcategory: 'Donations',
      description: 'Individual donations',
      unrestricted: 125000,
      restrictedGeneral: 75000,
      restrictedFixedAsset: 0,
      endowment: 0,
      total: 200000,
      priorYear: 185000,
      fundAllocations: { 'fund1': 125000, 'fund2': 75000 }
    },
    {
      id: '2',
      category: 'income',
      subcategory: 'Grants',
      description: 'Government grants',
      unrestricted: 0,
      restrictedGeneral: 300000,
      restrictedFixedAsset: 150000,
      endowment: 0,
      total: 450000,
      priorYear: 420000,
      fundAllocations: { 'fund2': 300000, 'fund3': 150000 }
    },
    {
      id: '3',
      category: 'expenditure',
      subcategory: 'Education',
      description: 'Educational activities',
      unrestricted: 200000,
      restrictedGeneral: 250000,
      restrictedFixedAsset: 50000,
      endowment: 0,
      total: 500000,
      priorYear: 475000,
      fundAllocations: { 'fund1': 200000, 'fund2': 250000, 'fund3': 50000 }
    }
  ];

  const generateSampleActivityAllocations = (): ActivityAllocation[] => [
    {
      id: '1',
      activityName: 'Education',
      directCosts: 450000,
      supportCosts: 67500,
      total: 517500,
      fundBreakdown: { 'unrestricted': 200000, 'restricted_general': 250000, 'restricted_fixed_asset': 67500 }
    },
    {
      id: '2',
      activityName: 'Fundraising',
      directCosts: 75000,
      supportCosts: 11250,
      total: 86250,
      fundBreakdown: { 'unrestricted': 86250 }
    }
  ];

  const validateSoFA = () => {
    const errors: string[] = [];
    
    const totalIncome = sofaLines.filter(l => l.category === 'income').reduce((sum, l) => sum + l.total, 0);
    const totalExpenditure = sofaLines.filter(l => l.category === 'expenditure').reduce((sum, l) => sum + l.total, 0);
    
    if (Math.abs(totalIncome - totalExpenditure) > 1000) {
      errors.push(`Income (£${totalIncome.toLocaleString()}) and expenditure (£${totalExpenditure.toLocaleString()}) do not balance`);
    }

    sofaLines.forEach(line => {
      if (line.restrictedGeneral > 0 && !line.description.includes('restricted')) {
        errors.push(`Line "${line.description}" has restricted funds but no restriction description`);
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSave = async () => {
    if (!validateSoFA()) {
      alert('Please fix validation errors before saving');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/charity-accounts/sofa-builder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: selectedEntity,
          year: selectedYear,
          mode: selectedMode,
          framework: selectedFramework,
          sofaLines,
          activityAllocations,
          supportCostDrivers
        })
      });

      if (response.ok) {
        alert('SoFA saved successfully');
      }
    } catch (error) {
      console.error('Error saving SoFA:', error);
      alert('Error saving SoFA');
    }
  };

  const allocateSupportCosts = () => {
    const totalDirectCosts = activityAllocations.reduce((sum, a) => sum + a.directCosts, 0);
    const totalSupportCosts = 150000; // Sample support costs

    const updatedAllocations = activityAllocations.map(allocation => ({
      ...allocation,
      supportCosts: (allocation.directCosts / totalDirectCosts) * totalSupportCosts,
      total: allocation.directCosts + ((allocation.directCosts / totalDirectCosts) * totalSupportCosts)
    }));

    setActivityAllocations(updatedAllocations);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading SoFA builder...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">SoFA Builder</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={allocateSupportCosts}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <Calculator className="w-4 h-4" />
            <span>Allocate Support Costs</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Save className="w-4 h-4" />
            <span>Save SoFA</span>
          </button>
        </div>
      </div>

      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-medium text-red-800">Validation Errors</h3>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index} className="text-sm text-red-700">{error}</li>
            ))}
          </ul>
        </div>
      )}

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

      {activeTab === 'income' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Income Allocation by Fund</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unrestricted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restricted General</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restricted Fixed Asset</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endowment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prior Year</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sofaLines.filter(line => line.category === 'income').map((line) => (
                    <tr key={line.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{line.subcategory}</div>
                          <div className="text-sm text-gray-500">{line.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={line.unrestricted}
                          onChange={(e) => {
                            const updatedLines = sofaLines.map(l => 
                              l.id === line.id 
                                ? {...l, unrestricted: Number(e.target.value), total: Number(e.target.value) + l.restrictedGeneral + l.restrictedFixedAsset + l.endowment}
                                : l
                            );
                            setSofaLines(updatedLines);
                          }}
                          className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={line.restrictedGeneral}
                          onChange={(e) => {
                            const updatedLines = sofaLines.map(l => 
                              l.id === line.id 
                                ? {...l, restrictedGeneral: Number(e.target.value), total: l.unrestricted + Number(e.target.value) + l.restrictedFixedAsset + l.endowment}
                                : l
                            );
                            setSofaLines(updatedLines);
                          }}
                          className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={line.restrictedFixedAsset}
                          onChange={(e) => {
                            const updatedLines = sofaLines.map(l => 
                              l.id === line.id 
                                ? {...l, restrictedFixedAsset: Number(e.target.value), total: l.unrestricted + l.restrictedGeneral + Number(e.target.value) + l.endowment}
                                : l
                            );
                            setSofaLines(updatedLines);
                          }}
                          className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={line.endowment}
                          onChange={(e) => {
                            const updatedLines = sofaLines.map(l => 
                              l.id === line.id 
                                ? {...l, endowment: Number(e.target.value), total: l.unrestricted + l.restrictedGeneral + l.restrictedFixedAsset + Number(e.target.value)}
                                : l
                            );
                            setSofaLines(updatedLines);
                          }}
                          className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        £{line.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        £{line.priorYear.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'expenditure' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Expenditure by Activity</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Direct Costs</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Support Costs</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund Breakdown</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activityAllocations.map((allocation) => (
                    <tr key={allocation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{allocation.activityName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={allocation.directCosts}
                          onChange={(e) => {
                            const updatedAllocations = activityAllocations.map(a => 
                              a.id === allocation.id 
                                ? {...a, directCosts: Number(e.target.value), total: Number(e.target.value) + a.supportCosts}
                                : a
                            );
                            setActivityAllocations(updatedAllocations);
                          }}
                          className="w-32 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        £{allocation.supportCosts.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        £{allocation.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs text-gray-600">
                          {Object.entries(allocation.fundBreakdown).map(([fund, amount]) => (
                            <div key={fund}>{fund}: £{amount.toLocaleString()}</div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'support-costs' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Cost Allocation Drivers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">FTE Allocation</h4>
                <div className="space-y-2">
                  {Object.entries(supportCostDrivers.fte || {}).map(([activity, fte]) => (
                    <div key={activity} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 capitalize">{activity}</span>
                      <input
                        type="number"
                        value={fte as number}
                        onChange={(e) => setSupportCostDrivers({
                          ...supportCostDrivers,
                          fte: {...supportCostDrivers.fte, [activity]: Number(e.target.value)}
                        })}
                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Floor Area (sq ft)</h4>
                <div className="space-y-2">
                  {Object.entries(supportCostDrivers.floorArea || {}).map(([activity, area]) => (
                    <div key={activity} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 capitalize">{activity}</span>
                      <input
                        type="number"
                        value={area as number}
                        onChange={(e) => setSupportCostDrivers({
                          ...supportCostDrivers,
                          floorArea: {...supportCostDrivers.floorArea, [activity]: Number(e.target.value)}
                        })}
                        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Direct Costs (£)</h4>
                <div className="space-y-2">
                  {Object.entries(supportCostDrivers.directCosts || {}).map(([activity, costs]) => (
                    <div key={activity} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 capitalize">{activity}</span>
                      <input
                        type="number"
                        value={costs as number}
                        onChange={(e) => setSupportCostDrivers({
                          ...supportCostDrivers,
                          directCosts: {...supportCostDrivers.directCosts, [activity]: Number(e.target.value)}
                        })}
                        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statement of Financial Activities Preview</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unrestricted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restricted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total 2024</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total 2023</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="bg-blue-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">INCOME</td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                  </tr>
                  {sofaLines.filter(line => line.category === 'income').map((line, index) => (
                    <tr key={line.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}. {line.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{line.unrestricted.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{(line.restrictedGeneral + line.restrictedFixedAsset + line.endowment).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">£{line.total.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{line.priorYear.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">EXPENDITURE</td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                  </tr>
                  {sofaLines.filter(line => line.category === 'expenditure').map((line, index) => (
                    <tr key={line.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}. {line.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{line.unrestricted.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">£{(line.restrictedGeneral + line.restrictedFixedAsset + line.endowment).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">£{line.total.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{line.priorYear.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoFABuilder;

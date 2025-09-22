import React, { useState, useEffect } from 'react';
import { Activity, Calculator, PieChart } from 'lucide-react';

interface ActivitiesSupportProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: 'charity' | 'academy';
  selectedFramework: 'sorp' | 'aad';
}

interface ActivityDefinition {
  id: string;
  name: string;
  description: string;
  category: 'charitable' | 'fundraising' | 'governance';
  directCosts: number;
  supportCosts: number;
  totalCosts: number;
}

interface CostDriver {
  id: string;
  name: string;
  type: 'fte' | 'floor_area' | 'direct_costs' | 'time';
  allocations: { [activityId: string]: number };
}

interface SupportCostAllocation {
  costCenter: string;
  totalCost: number;
  allocations: { [activityId: string]: number };
}

const ActivitiesSupport: React.FC<ActivitiesSupportProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('activities');
  const [activities, setActivities] = useState<ActivityDefinition[]>([]);
  const [costDrivers, setCostDrivers] = useState<CostDriver[]>([]);
  const [supportAllocations, setSupportAllocations] = useState<SupportCostAllocation[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'activities', label: 'Activities Register', icon: Activity },
    { id: 'drivers', label: 'Cost Drivers', icon: Calculator },
    { id: 'allocations', label: 'Allocations Engine', icon: PieChart }
  ];

  useEffect(() => {
    fetchActivitiesData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchActivitiesData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/charity-accounts/activities-support?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      
      setActivities(data.activities || [
        {
          id: '1',
          name: 'Education',
          description: 'Primary educational activities and teaching',
          category: 'charitable',
          directCosts: 450000,
          supportCosts: 67500,
          totalCosts: 517500
        },
        {
          id: '2',
          name: 'Welfare Support',
          description: 'Student welfare and support services',
          category: 'charitable',
          directCosts: 120000,
          supportCosts: 18000,
          totalCosts: 138000
        },
        {
          id: '3',
          name: 'Fundraising',
          description: 'Fundraising activities and events',
          category: 'fundraising',
          directCosts: 75000,
          supportCosts: 11250,
          totalCosts: 86250
        },
        {
          id: '4',
          name: 'Governance',
          description: 'Governance and administration',
          category: 'governance',
          directCosts: 25000,
          supportCosts: 3750,
          totalCosts: 28750
        }
      ]);

      setCostDrivers(data.costDrivers || [
        {
          id: '1',
          name: 'Full-Time Equivalent Staff',
          type: 'fte',
          allocations: {
            '1': 15, // Education
            '2': 5,  // Welfare
            '3': 3,  // Fundraising
            '4': 2   // Governance
          }
        },
        {
          id: '2',
          name: 'Floor Area (sq ft)',
          type: 'floor_area',
          allocations: {
            '1': 1200,
            '2': 400,
            '3': 200,
            '4': 200
          }
        },
        {
          id: '3',
          name: 'Direct Costs',
          type: 'direct_costs',
          allocations: {
            '1': 450000,
            '2': 120000,
            '3': 75000,
            '4': 25000
          }
        }
      ]);

      setSupportAllocations(data.supportAllocations || [
        {
          costCenter: 'Administration',
          totalCost: 60000,
          allocations: {
            '1': 36000, // 60% to Education
            '2': 12000, // 20% to Welfare
            '3': 9000,  // 15% to Fundraising
            '4': 3000   // 5% to Governance
          }
        },
        {
          costCenter: 'Facilities',
          totalCost: 40000,
          allocations: {
            '1': 24000, // Based on floor area
            '2': 8000,
            '3': 4000,
            '4': 4000
          }
        }
      ]);
    } catch (error) {
      console.error('Error fetching activities data:', error);
    } finally {
      setLoading(false);
    }
  };

  const runAllocationEngine = () => {
    const updatedActivities = activities.map(activity => {
      const newSupportCosts = supportAllocations.reduce((sum, allocation) => 
        sum + (allocation.allocations[activity.id] || 0), 0
      );
      
      return {
        ...activity,
        supportCosts: newSupportCosts,
        totalCosts: activity.directCosts + newSupportCosts
      };
    });

    setActivities(updatedActivities);
    alert('Support costs allocated successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading activities data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Activities & Support Cost Allocation</h1>
        <button
          onClick={runAllocationEngine}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          <Calculator className="w-4 h-4" />
          <span>Run Allocation Engine</span>
        </button>
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

      {activeTab === 'activities' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Activity Definitions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Direct Costs</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Support Costs</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Costs</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">% of Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activities.map((activity) => {
                    const totalAllCosts = activities.reduce((sum, a) => sum + a.totalCosts, 0);
                    const percentage = (activity.totalCosts / totalAllCosts) * 100;
                    
                    return (
                      <tr key={activity.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                            <div className="text-sm text-gray-500">{activity.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            activity.category === 'charitable' ? 'bg-green-100 text-green-800' :
                            activity.category === 'fundraising' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                          £{activity.directCosts.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-blue-600">
                          £{activity.supportCosts.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                          £{activity.totalCosts.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          {percentage.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Charitable Activities</h4>
              <p className="text-2xl font-bold text-green-900">
                £{activities.filter(a => a.category === 'charitable').reduce((sum, a) => sum + a.totalCosts, 0).toLocaleString()}
              </p>
              <p className="text-sm text-green-700">
                {activities.filter(a => a.category === 'charitable').length} activities
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Raising Funds</h4>
              <p className="text-2xl font-bold text-blue-900">
                £{activities.filter(a => a.category === 'fundraising').reduce((sum, a) => sum + a.totalCosts, 0).toLocaleString()}
              </p>
              <p className="text-sm text-blue-700">
                {activities.filter(a => a.category === 'fundraising').length} activities
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Governance</h4>
              <p className="text-2xl font-bold text-gray-900">
                £{activities.filter(a => a.category === 'governance').reduce((sum, a) => sum + a.totalCosts, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-700">
                {activities.filter(a => a.category === 'governance').length} activities
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'drivers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Allocation Drivers</h3>
            <div className="space-y-6">
              {costDrivers.map((driver) => (
                <div key={driver.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">{driver.name}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="text-center">
                        <div className="text-sm text-gray-600">{activity.name}</div>
                        <input
                          type="number"
                          value={driver.allocations[activity.id] || 0}
                          onChange={(e) => {
                            const updatedDrivers = costDrivers.map(d => 
                              d.id === driver.id 
                                ? {
                                    ...d,
                                    allocations: {
                                      ...d.allocations,
                                      [activity.id]: Number(e.target.value)
                                    }
                                  }
                                : d
                            );
                            setCostDrivers(updatedDrivers);
                          }}
                          className="mt-1 w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {driver.type === 'fte' ? 'FTE' :
                           driver.type === 'floor_area' ? 'sq ft' :
                           driver.type === 'direct_costs' ? '£' : 'hours'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    Total: {Object.values(driver.allocations).reduce((sum, val) => sum + val, 0).toLocaleString()}
                    {driver.type === 'fte' ? ' FTE' :
                     driver.type === 'floor_area' ? ' sq ft' :
                     driver.type === 'direct_costs' ? ' £' : ' hours'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'allocations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Cost Allocations</h3>
            <div className="space-y-4">
              {supportAllocations.map((allocation, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{allocation.costCenter}</h4>
                    <span className="text-lg font-bold text-gray-900">
                      £{allocation.totalCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {activities.map((activity) => {
                      const activityAllocation = allocation.allocations[activity.id] || 0;
                      const percentage = (activityAllocation / allocation.totalCost) * 100;
                      
                      return (
                        <div key={activity.id} className="text-center">
                          <div className="text-sm text-gray-600">{activity.name}</div>
                          <div className="text-lg font-medium text-gray-900">
                            £{activityAllocation.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {percentage.toFixed(1)}%
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Allocation Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activities.map((activity) => {
                const totalSupportForActivity = supportAllocations.reduce((sum, allocation) => 
                  sum + (allocation.allocations[activity.id] || 0), 0
                );
                
                return (
                  <div key={activity.id} className="text-center">
                    <div className="text-sm text-blue-800">{activity.name}</div>
                    <div className="text-lg font-bold text-blue-900">
                      £{totalSupportForActivity.toLocaleString()}
                    </div>
                    <div className="text-xs text-blue-700">Support Costs</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesSupport;

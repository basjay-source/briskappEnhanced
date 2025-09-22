import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart, AlertTriangle, Target } from 'lucide-react';

interface AnalyticsProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const Analytics: React.FC<AnalyticsProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('kpis');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>({});

  const tabs = [
    { id: 'kpis', label: 'KPI & Trends', icon: TrendingUp },
    { id: 'fund-health', label: 'Fund Health', icon: PieChart },
    { id: 'completeness', label: 'Disclosure Completeness', icon: Target },
    { id: 'variance', label: 'Variance Commentary', icon: BarChart3 }
  ];

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/analytics?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Review</h1>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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

      <div className="bg-white rounded-lg shadow">
        {activeTab === 'kpis' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Key Performance Indicators & Trends</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(analyticsData.kpis || []).map((kpi: any, index: number) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-900">{kpi.label}</p>
                        <p className="text-2xl font-bold text-blue-600">{kpi.value}</p>
                        <p className="text-xs text-blue-700">{kpi.period}</p>
                      </div>
                      <div className={`text-sm font-medium ${
                        kpi.trend === 'up' ? 'text-green-600' : 
                        kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {kpi.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Financial Ratios</h4>
                  <div className="space-y-3">
                    {(analyticsData.ratios || []).map((ratio: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">{ratio.name}</span>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-900">{ratio.current}</span>
                          <span className="text-xs text-gray-500 ml-2">({ratio.prior})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Income Mix Analysis</h4>
                  <div className="space-y-3">
                    {(analyticsData.incomeMix || []).map((source: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">{source.source}</span>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-900">{source.percentage}%</span>
                          <span className="text-xs text-gray-500 ml-2">£{source.amount?.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Trend Analysis</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{analyticsData.trends?.income?.growth || '0%'}</div>
                      <div className="text-sm text-gray-600">Income Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{analyticsData.trends?.efficiency?.ratio || '0%'}</div>
                      <div className="text-sm text-gray-600">Cost Efficiency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{analyticsData.trends?.reserves?.months || '0'}</div>
                      <div className="text-sm text-gray-600">Months of Reserves</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fund-health' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Fund Health Analysis</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Fund Balances</h4>
                  <div className="space-y-3">
                    {(analyticsData.fundHealth?.balances || []).map((fund: any, index: number) => (
                      <div key={index} className={`p-3 rounded-lg border ${
                        fund.status === 'healthy' ? 'bg-green-50 border-green-200' :
                        fund.status === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">{fund.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">£{fund.balance?.toLocaleString()}</span>
                            {fund.status === 'deficit' && (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </div>
                        {fund.restriction && (
                          <p className="text-xs text-gray-600 mt-1">{fund.restriction}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Fund Movement Summary</h4>
                  <div className="space-y-3">
                    {(analyticsData.fundHealth?.movements || []).map((movement: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{movement.description}</span>
                          <span className={`text-sm font-medium ${
                            movement.amount >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            £{Math.abs(movement.amount).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{movement.from} → {movement.to}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Fund Health Alerts</h4>
                <div className="space-y-2">
                  {(analyticsData.fundHealth?.alerts || []).map((alert: any, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <span className="text-sm text-yellow-800">{alert.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'completeness' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Disclosure Completeness Check</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(analyticsData.completeness?.sections || []).map((section: any, index: number) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    section.status === 'complete' ? 'bg-green-50 border-green-200' :
                    section.status === 'partial' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{section.name}</h4>
                      <div className={`w-3 h-3 rounded-full ${
                        section.status === 'complete' ? 'bg-green-500' :
                        section.status === 'partial' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Complete:</span>
                        <span>{section.completed}/{section.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${
                            section.status === 'complete' ? 'bg-green-500' :
                            section.status === 'partial' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${(section.completed / section.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    {section.missing && section.missing.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-700">Missing:</p>
                        <ul className="text-xs text-gray-600 list-disc list-inside">
                          {section.missing.map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Overall Completeness</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">
                    {analyticsData.completeness?.overall?.completed || 0} of {analyticsData.completeness?.overall?.total || 0} sections complete
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {Math.round(((analyticsData.completeness?.overall?.completed || 0) / (analyticsData.completeness?.overall?.total || 1)) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3 mt-2">
                  <div 
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${Math.round(((analyticsData.completeness?.overall?.completed || 0) / (analyticsData.completeness?.overall?.total || 1)) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'variance' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Variance Commentary</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Income Variances</h4>
                  <div className="space-y-3">
                    {(analyticsData.variances?.income || []).map((variance: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{variance.category}</span>
                          <span className={`text-sm font-medium ${
                            variance.variance >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {variance.variance >= 0 ? '+' : ''}£{variance.variance?.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">
                          Budget: £{variance.budget?.toLocaleString()} | Actual: £{variance.actual?.toLocaleString()}
                        </div>
                        {variance.commentary && (
                          <p className="text-xs text-gray-700 mt-2">{variance.commentary}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Expenditure Variances</h4>
                  <div className="space-y-3">
                    {(analyticsData.variances?.expenditure || []).map((variance: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{variance.category}</span>
                          <span className={`text-sm font-medium ${
                            variance.variance <= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {variance.variance >= 0 ? '+' : ''}£{variance.variance?.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">
                          Budget: £{variance.budget?.toLocaleString()} | Actual: £{variance.actual?.toLocaleString()}
                        </div>
                        {variance.commentary && (
                          <p className="text-xs text-gray-700 mt-2">{variance.commentary}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Key Variance Explanations</h4>
                <div className="space-y-4">
                  {(analyticsData.variances?.explanations || []).map((explanation: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">{explanation.title}</h5>
                      <p className="text-sm text-gray-700 mb-2">{explanation.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Impact: £{explanation.impact?.toLocaleString()}</span>
                        <span>Category: {explanation.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Summary for Trustees' Report</h4>
                <p className="text-sm text-green-800">
                  {analyticsData.variances?.summary || 'Overall financial performance was in line with expectations, with key variances explained by planned strategic initiatives and external factors beyond the charity\'s control.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;

import React, { useState, useEffect } from 'react';
import { BarChart3, Download, TrendingUp, PieChart } from 'lucide-react';

interface CAReportsProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const CAReports: React.FC<CAReportsProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('fund-movement');
  const [loading, setLoading] = useState(true);
  const [reportsData, setReportsData] = useState<any>({});

  const tabs = [
    { id: 'fund-movement', label: 'Fund Movement Register', icon: BarChart3 },
    { id: 'sofa-academy', label: 'SoFA by Academy', icon: PieChart },
    { id: 'free-reserves', label: 'Free Reserves', icon: TrendingUp },
    { id: 'donor-grant', label: 'Donor/Grant Reports', icon: Download },
    { id: 'rpt-summary', label: 'RPT Summary', icon: BarChart3 },
    { id: 'variance-pack', label: 'Variance Pack', icon: TrendingUp }
  ];

  useEffect(() => {
    fetchReportsData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/reports?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      setReportsData(data);
    } catch (error) {
      console.error('Error fetching reports data:', error);
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
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Download className="w-4 h-4" />
          <span>Export All</span>
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
        {activeTab === 'fund-movement' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Fund Movement Register</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Fund Movement Analysis</h4>
                <p className="text-sm text-blue-800">
                  Detailed analysis of fund movements with drill-down capabilities to transaction level detail.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Balance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expenditure</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transfers In</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transfers Out</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closing Balance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(reportsData.fundMovement || []).map((fund: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fund.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{fund.openingBalance?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">£{fund.income?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">£{fund.expenditure?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">£{fund.transfersIn?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">£{fund.transfersOut?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">£{fund.closingBalance?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Drill Down
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Export to Excel
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                  Print Report
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sofa-academy' && selectedMode === 'academy' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">SoFA by Academy (MAT Reporting)</h3>
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Multi-Academy Trust Reporting</h4>
                <p className="text-sm text-green-800">
                  Statement of Financial Activities broken down by individual academy within the trust.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academy</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GAG Income</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Other Income</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Income</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teaching Costs</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Other Costs</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Movement</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(reportsData.sofaByAcademy || []).map((academy: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{academy.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{academy.gagIncome?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{academy.otherIncome?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">£{academy.totalIncome?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{academy.teachingCosts?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{academy.otherCosts?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={academy.netMovement >= 0 ? 'text-green-600' : 'text-red-600'}>
                            £{academy.netMovement?.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'free-reserves' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Free Reserves Analysis</h3>
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Reserves Policy Compliance</h4>
                <p className="text-sm text-yellow-700">
                  Analysis of free reserves against policy targets with sensitivity reporting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Current Position</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Unrestricted Funds:</span>
                      <span>£{reportsData.freeReserves?.totalUnrestricted?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Designated Funds:</span>
                      <span>£{reportsData.freeReserves?.designated?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fixed Assets:</span>
                      <span>£{reportsData.freeReserves?.fixedAssets?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Free Reserves:</span>
                      <span>£{reportsData.freeReserves?.freeReserves?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Policy Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Policy Target:</span>
                      <span>£{reportsData.freeReserves?.policyTarget?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Months of Expenditure:</span>
                      <span>{reportsData.freeReserves?.monthsOfExpenditure || 0} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Policy Compliance:</span>
                      <span className={reportsData.freeReserves?.policyCompliance ? 'text-green-600' : 'text-red-600'}>
                        {reportsData.freeReserves?.policyCompliance ? 'Compliant' : 'Non-Compliant'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Variance:</span>
                      <span className={reportsData.freeReserves?.variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                        £{reportsData.freeReserves?.variance?.toLocaleString() || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'donor-grant' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Donor & Grant Reports</h3>
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">Donor-Specific Reporting</h4>
                <p className="text-sm text-purple-800">
                  Generate donor-specific grant reports and export to Excel/PDF for stakeholder communication.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Grant Reports</h4>
                  <div className="space-y-3">
                    {(reportsData.grantReports || []).map((report: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                        <div>
                          <span className="text-sm font-medium">{report.grantName}</span>
                          <span className="text-xs text-gray-500 block">{report.funder}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">£{report.amount?.toLocaleString()}</span>
                          <button className="text-blue-600 hover:text-blue-800 text-xs">Export</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Donor Reports</h4>
                  <div className="space-y-3">
                    {(reportsData.donorReports || []).map((report: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                        <div>
                          <span className="text-sm font-medium">{report.donorName}</span>
                          <span className="text-xs text-gray-500 block">{report.donationType}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">£{report.totalDonations?.toLocaleString()}</span>
                          <button className="text-blue-600 hover:text-blue-800 text-xs">Export</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rpt-summary' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Related Party Transaction Summary</h3>
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">RPT Summary for Board Packs</h4>
                <p className="text-sm text-red-800">
                  Summary of related party transactions for inclusion in board packs and governance reporting.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Related Party</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relationship</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disclosure Required</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(reportsData.rptSummary || []).map((rpt: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rpt.relatedParty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rpt.relationship}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{rpt.transactionValue?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            rpt.approvalStatus === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {rpt.approvalStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            rpt.disclosureRequired ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {rpt.disclosureRequired ? 'Required' : 'Not Required'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'variance-pack' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Variance Pack</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Budget vs Actual Analysis</h4>
                <p className="text-sm text-blue-800">
                  Comprehensive variance analysis with commentary for management and trustee reporting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Income Variances</h4>
                  <div className="space-y-2 text-sm">
                    {(reportsData.variancePack?.income || []).map((variance: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span>{variance.category}:</span>
                        <span className={variance.variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {variance.variance >= 0 ? '+' : ''}£{variance.variance?.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Expenditure Variances</h4>
                  <div className="space-y-2 text-sm">
                    {(reportsData.variancePack?.expenditure || []).map((variance: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span>{variance.category}:</span>
                        <span className={variance.variance <= 0 ? 'text-green-600' : 'text-red-600'}>
                          {variance.variance >= 0 ? '+' : ''}£{variance.variance?.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Variance Commentary</h4>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="Add commentary explaining significant variances..."
                  defaultValue={reportsData.variancePack?.commentary || ''}
                />
                <div className="mt-2 flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Save Commentary
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    Export Pack
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CAReports;

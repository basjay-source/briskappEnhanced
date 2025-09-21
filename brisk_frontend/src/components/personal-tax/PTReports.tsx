import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, FileText, Download } from 'lucide-react';

const PTReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [reportData, setReportData] = useState<any>(null);
  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/reports?tax_year=2024-25`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const tabs = [
    { id: 'summary', label: 'Tax Summary', icon: BarChart3 },
    { id: 'yoy', label: 'Year-on-Year', icon: TrendingUp },
    { id: 'sources', label: 'Source Summaries', icon: FileText },
    { id: 'export', label: 'Data Export', icon: Download }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
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
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Tax Summary Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Total Income</h4>
                <p className="text-2xl font-bold text-gray-900">£{reportData?.total_income?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-600">All sources</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Total Tax</h4>
                <p className="text-2xl font-bold text-gray-900">£{reportData?.total_tax?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-600">Income tax + NI</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Effective Rate</h4>
                <p className="text-2xl font-bold text-gray-900">{reportData?.effective_rate || '0'}%</p>
                <p className="text-sm text-gray-600">Overall rate</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'yoy' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Year-on-Year Comparison</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Income Comparison</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">2024-25</span>
                    <span className="font-medium">£{reportData?.income_current?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">2023-24</span>
                    <span className="font-medium">£{reportData?.income_previous?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Change</span>
                    <span className="text-green-600">£{reportData?.income_change?.toLocaleString() || '0'} ({reportData?.income_change_percent || '0'}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Income Source Summary</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Employment Income</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gross Pay</span>
                    <span className="font-medium">£{reportData?.employment_gross?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Benefits</span>
                    <span className="font-medium">£{reportData?.employment_benefits?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Deducted</span>
                    <span className="font-medium">£{reportData?.employment_tax?.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Self-Employment</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Turnover</span>
                    <span className="font-medium">£{reportData?.se_turnover?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expenses</span>
                    <span className="font-medium">-£{reportData?.se_expenses?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Profit</span>
                    <span className="font-medium">£{reportData?.se_profit?.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Data Export</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">CSV Export</h4>
                <p className="text-sm text-gray-600 mb-3">Export all tax data to CSV format</p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                  Export CSV
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Excel Export</h4>
                <p className="text-sm text-gray-600 mb-3">Export formatted Excel workbook</p>
                <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                  Export Excel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PTReports;

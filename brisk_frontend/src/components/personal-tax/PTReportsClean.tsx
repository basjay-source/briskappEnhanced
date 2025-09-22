import React, { useState, useEffect } from 'react';
import { FileText, Download, TrendingUp, BarChart3, Calculator } from 'lucide-react';

interface ReportData {
  sa100: {
    status: string;
    lastGenerated: string;
    taxYear: string;
    totalIncome: number;
    totalTax: number;
  };
  sa302: {
    status: string;
    lastGenerated: string;
    taxYear: string;
    computation: any;
  };
  mtdIncome: {
    status: string;
    lastGenerated: string;
    quarterlyReports: any[];
  };
  scheduleOfData: {
    status: string;
    lastGenerated: string;
    dataPoints: number;
  };
}

const PTReportsClean: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sa100');
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [generating, setGenerating] = useState<string | null>(null);

  const tabs = [
    { id: 'sa100', label: 'SA100 Tax Return', icon: FileText },
    { id: 'sa302', label: 'SA302 Computation', icon: Calculator },
    { id: 'mtd', label: 'MTD Income Report', icon: TrendingUp },
    { id: 'schedule', label: 'Schedule of Data', icon: BarChart3 }
  ];

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/reports?tax_year=2024-25`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (reportType: string) => {
    try {
      setGenerating(reportType);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/${reportType}-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taxpayer_id: 1,
          tax_year: '2024-25'
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`${reportType} report generated:`, result);
        await fetchReportData();
        alert(`${reportType.toUpperCase()} report generated successfully!`);
      } else {
        const error = await response.text();
        console.error(`Failed to generate ${reportType} report:`, error);
        alert(`Failed to generate ${reportType} report. Please try again.`);
      }
    } catch (error) {
      console.error(`Error generating ${reportType} report:`, error);
      alert(`Error generating ${reportType} report. Please check your connection.`);
    } finally {
      setGenerating(null);
    }
  };

  const downloadReport = async (reportType: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/personal-tax/${reportType}-report/download?taxpayer_id=1&tax_year=2024-25`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${reportType}-2024-25.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Failed to download report. Please generate it first.');
      }
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Error downloading report. Please try again.');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Personal Tax Reports</h1>
        <div className="flex space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Export All Reports
          </button>
        </div>
      </div>

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

      {activeTab === 'sa100' && !loading && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">SA100 Self Assessment Tax Return</h3>
                <p className="text-sm text-gray-600">Complete tax return including all supplementary pages</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => generateReport('sa100')}
                  disabled={generating === 'sa100'}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {generating === 'sa100' ? 'Generating...' : 'Generate SA100'}
                </button>
                <button
                  onClick={() => downloadReport('sa100')}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            </div>

            {reportData?.sa100 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                  <p className={`text-sm font-medium ${
                    reportData.sa100.status === 'Generated' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {reportData.sa100.status}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">Tax Year</h4>
                  <p className="text-sm text-gray-600">{reportData.sa100.taxYear}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">Last Generated</h4>
                  <p className="text-sm text-gray-600">
                    {reportData.sa100.lastGenerated ? formatDate(reportData.sa100.lastGenerated) : 'Not generated'}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Included Forms</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-blue-50 p-3 rounded-md text-center">
                  <p className="text-sm font-medium text-blue-900">SA100</p>
                  <p className="text-xs text-blue-700">Main Return</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-md text-center">
                  <p className="text-sm font-medium text-blue-900">SA102</p>
                  <p className="text-xs text-blue-700">Employment</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-md text-center">
                  <p className="text-sm font-medium text-blue-900">SA103S</p>
                  <p className="text-xs text-blue-700">Self-Employment</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-md text-center">
                  <p className="text-sm font-medium text-blue-900">SA110</p>
                  <p className="text-xs text-blue-700">Partnership</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sa302' && !loading && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">SA302 Tax Calculation</h3>
                <p className="text-sm text-gray-600">Personal tax computation showing detailed calculations</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => generateReport('sa302')}
                  disabled={generating === 'sa302'}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {generating === 'sa302' ? 'Generating...' : 'Generate SA302'}
                </button>
                <button
                  onClick={() => downloadReport('sa302')}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            </div>

            {reportData?.sa302 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">Computation Status</h4>
                    <p className={`text-sm font-medium ${
                      reportData.sa302.status === 'Generated' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {reportData.sa302.status}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">Tax Year</h4>
                    <p className="text-sm text-gray-600">{reportData.sa302.taxYear}</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-900 mb-3">Calculation Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Income:</span>
                      <span className="font-medium">{formatCurrency(68950)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Allowable Deductions:</span>
                      <span className="font-medium">{formatCurrency(12570)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxable Income:</span>
                      <span className="font-medium">{formatCurrency(56380)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Tax Due:</span>
                      <span className="font-medium text-red-600">{formatCurrency(18903)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'mtd' && !loading && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Making Tax Digital Income Report</h3>
                <p className="text-sm text-gray-600">Quarterly income and expense summaries for MTD compliance</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => generateReport('mtd-income')}
                  disabled={generating === 'mtd-income'}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {generating === 'mtd-income' ? 'Generating...' : 'Generate MTD Report'}
                </button>
                <button
                  onClick={() => downloadReport('mtd-income')}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-md text-center">
                <h4 className="font-medium text-blue-900">Q1 2024-25</h4>
                <p className="text-sm text-blue-700">Apr - Jun</p>
                <p className="text-lg font-semibold text-blue-900 mt-2">{formatCurrency(15240)}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md text-center">
                <h4 className="font-medium text-blue-900">Q2 2024-25</h4>
                <p className="text-sm text-blue-700">Jul - Sep</p>
                <p className="text-lg font-semibold text-blue-900 mt-2">{formatCurrency(16890)}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md text-center">
                <h4 className="font-medium text-blue-900">Q3 2024-25</h4>
                <p className="text-sm text-blue-700">Oct - Dec</p>
                <p className="text-lg font-semibold text-blue-900 mt-2">{formatCurrency(18320)}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-center">
                <h4 className="font-medium text-gray-600">Q4 2024-25</h4>
                <p className="text-sm text-gray-500">Jan - Mar</p>
                <p className="text-lg font-semibold text-gray-600 mt-2">Pending</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h4 className="font-medium text-green-900 mb-2">MTD Compliance Status</h4>
              <p className="text-sm text-green-800">
                All quarterly submissions are up to date. Next submission due: 31 January 2025
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && !loading && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Schedule of Data</h3>
                <p className="text-sm text-gray-600">Comprehensive data schedule for tax return preparation</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => generateReport('schedule-of-data')}
                  disabled={generating === 'schedule-of-data'}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {generating === 'schedule-of-data' ? 'Generating...' : 'Generate Schedule'}
                </button>
                <button
                  onClick={() => downloadReport('schedule-of-data')}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-2">Employment Data</h4>
                <p className="text-sm text-gray-600">P60s, P45s, Benefits</p>
                <p className="text-lg font-semibold text-blue-600 mt-2">12 items</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-2">Self-Employment</h4>
                <p className="text-sm text-gray-600">Business records, receipts</p>
                <p className="text-lg font-semibold text-blue-600 mt-2">45 items</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-2">Property Income</h4>
                <p className="text-sm text-gray-600">Rental income, expenses</p>
                <p className="text-lg font-semibold text-blue-600 mt-2">8 items</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-2">Savings & Investments</h4>
                <p className="text-sm text-gray-600">Interest, dividends</p>
                <p className="text-lg font-semibold text-blue-600 mt-2">23 items</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-2">Capital Gains</h4>
                <p className="text-sm text-gray-600">Disposals, acquisitions</p>
                <p className="text-lg font-semibold text-blue-600 mt-2">6 items</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-2">Other Income</h4>
                <p className="text-sm text-gray-600">Pensions, foreign income</p>
                <p className="text-lg font-semibold text-blue-600 mt-2">4 items</p>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-900 mb-2">Data Completeness</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">Overall completion status</span>
                <span className="text-lg font-semibold text-blue-900">94%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
              <p className="text-xs text-blue-700 mt-2">6 items require attention before filing</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PTReportsClean;

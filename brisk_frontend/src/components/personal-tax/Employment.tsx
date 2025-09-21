import React, { useState, useEffect } from 'react';
import { Building, Plus, Edit, Trash2, FileText, Calculator, DollarSign, AlertTriangle } from 'lucide-react';

interface EmploymentData {
  employments: Array<{
    id: number;
    employer: string;
    paye_reference: string;
    gross_pay: number;
    tax_deducted: number;
    ni_contributions: number;
    p60_received: boolean;
    p11d_benefits: number;
    pension_contributions: number;
    start_date: string;
    end_date?: string;
    payroll_id: string;
  }>;
  totals: {
    gross_pay: number;
    tax_deducted: number;
    ni_contributions: number;
    benefits_in_kind: number;
    net_employment_income: number;
  };
  validation: {
    expected_tax: number;
    expected_ni: number;
    tax_variance: number;
    ni_variance: number;
  };
  rates_used: {
    personal_allowance: number;
    basic_rate: number;
    ni_rate: number;
    ni_threshold: number;
  };
}

const Employment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('employments');
  const [loading, setLoading] = useState(true);
  const [employmentData, setEmploymentData] = useState<EmploymentData | null>(null);
  const [taxYear, setTaxYear] = useState('2024-25');

  const tabs = [
    { id: 'employments', label: 'Employments', icon: Building },
    { id: 'p60', label: 'P60', icon: FileText },
    { id: 'benefits', label: 'P11D/Payrolled Benefits', icon: DollarSign },
    { id: 'expenses', label: 'Expenses', icon: Calculator },
    { id: 'directors', label: 'Directors', icon: Building }
  ];

  useEffect(() => {
    fetchEmploymentData();
  }, [taxYear]);

  const fetchEmploymentData = async () => {
    try {
      setLoading(true);
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_BASE_URL}/api/personal-tax/employment?tax_year=${taxYear}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEmploymentData(data);
      }
    } catch (error) {
      console.error('Error fetching employment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${(rate * 100).toFixed(1)}%`;
  };

  const handleAddEmployment = () => {
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!employmentData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Failed to load employment data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Employment (SA102)</h1>
        <div className="flex space-x-3">
          <select
            value={taxYear}
            onChange={(e) => setTaxYear(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            {/* Dynamic tax year options will be populated from HMRC rates service */}
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
            <option value="2022-23">2022-23</option>
          </select>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Ask your Personal Tax Adviser
          </button>
          <button 
            onClick={handleAddEmployment}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Employment</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Gross Pay</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(employmentData.totals.gross_pay)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calculator className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tax Deducted</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(employmentData.totals.tax_deducted)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">NI Contributions</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(employmentData.totals.ni_contributions)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Benefits in Kind</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(employmentData.totals.benefits_in_kind)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Alerts */}
      {(Math.abs(employmentData.validation.tax_variance) > 100 || Math.abs(employmentData.validation.ni_variance) > 100) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Validation Warnings</h3>
              <div className="mt-2 text-sm text-yellow-700">
                {Math.abs(employmentData.validation.tax_variance) > 100 && (
                  <p>Tax variance: {formatCurrency(employmentData.validation.tax_variance)} (Expected: {formatCurrency(employmentData.validation.expected_tax)})</p>
                )}
                {Math.abs(employmentData.validation.ni_variance) > 100 && (
                  <p>NI variance: {formatCurrency(employmentData.validation.ni_variance)} (Expected: {formatCurrency(employmentData.validation.expected_ni)})</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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
        {activeTab === 'employments' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Employment Details</h3>
              <div className="text-sm text-gray-500">
                Using {taxYear} rates: Personal Allowance {formatCurrency(employmentData.rates_used.personal_allowance)}, 
                Basic Rate {formatPercentage(employmentData.rates_used.basic_rate)}, 
                NI Rate {formatPercentage(employmentData.rates_used.ni_rate)}
              </div>
            </div>
            <div className="space-y-4">
              {employmentData.employments.map((employment) => (
                <div key={employment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{employment.employer}</h4>
                      <p className="text-sm text-gray-600">PAYE Ref: {employment.paye_reference}</p>
                      <p className="text-sm text-gray-600">Payroll ID: {employment.payroll_id}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Gross Pay</label>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(employment.gross_pay)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Tax Deducted</label>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(employment.tax_deducted)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">NI Contributions</label>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(employment.ni_contributions)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">P11D Benefits</label>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(employment.p11d_benefits)}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Start Date</label>
                      <p className="text-sm text-gray-900">{employment.start_date}</p>
                    </div>
                    {employment.end_date && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">End Date</label>
                        <p className="text-sm text-gray-900">{employment.end_date}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-700">P60 Status</label>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        employment.p60_received 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {employment.p60_received ? 'Received' : 'Missing'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'p60' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">P60 Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Tax Year {taxYear} Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Pay</span>
                    <span className="font-medium">{formatCurrency(employmentData.totals.gross_pay)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Tax</span>
                    <span className="font-medium">{formatCurrency(employmentData.totals.tax_deducted)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total NI</span>
                    <span className="font-medium">{formatCurrency(employmentData.totals.ni_contributions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Pay</span>
                    <span className="font-medium">{formatCurrency(employmentData.totals.gross_pay - employmentData.totals.tax_deducted - employmentData.totals.ni_contributions)}</span>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <h5 className="font-medium text-blue-900 mb-2">Rate Information for {taxYear}</h5>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div className="flex justify-between">
                      <span>Personal Allowance:</span>
                      <span>{formatCurrency(employmentData.rates_used.personal_allowance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Basic Rate:</span>
                      <span>{formatPercentage(employmentData.rates_used.basic_rate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NI Rate:</span>
                      <span>{formatPercentage(employmentData.rates_used.ni_rate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NI Threshold:</span>
                      <span>{formatCurrency(employmentData.rates_used.ni_threshold)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">P60 Documents</h4>
                {employmentData.employments.map((employment) => (
                  <div key={employment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-gray-900">{employment.employer}</h5>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        employment.p60_received 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {employment.p60_received ? 'Received' : 'Missing'}
                      </span>
                    </div>
                    {!employment.p60_received && (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <FileText className="mx-auto h-8 w-8 text-gray-400" />
                        <div className="mt-2">
                          <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm">
                            Upload P60
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">P11D/Payrolled Benefits</h3>
            <div className="space-y-6">
              {employmentData.employments.map((employment) => (
                <div key={employment.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">{employment.employer}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">Total P11D Benefits</h5>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(employment.p11d_benefits)}</p>
                      <p className="text-sm text-gray-600">Benefit in Kind</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">Pension Contributions</h5>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(employment.pension_contributions)}</p>
                      <p className="text-sm text-gray-600">Employer Contribution</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">Net Taxable Income</h5>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(employment.gross_pay + employment.p11d_benefits)}</p>
                      <p className="text-sm text-gray-600">Including Benefits</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Car Benefit</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Medical Insurance</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Benefit</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Other Benefits</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Expenses</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Trading Allowance for {taxYear}:</strong> {formatCurrency(1000)}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                You can claim the trading allowance instead of actual expenses if your total expenses are less than {formatCurrency(1000)}.
              </p>
            </div>
            <div className="space-y-6">
              {employmentData.employments.map((employment) => (
                <div key={employment.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">{employment.employer}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Professional Fees</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Travel &amp; Subsistence</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Equipment &amp; Tools</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Working from Home</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Flat Rate Expenses</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Other Allowable Expenses</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'directors' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Director Information</h3>
            <div className="space-y-6">
              {employmentData.employments.map((employment) => (
                <div key={employment.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">{employment.employer}</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={`is_director_${employment.id}`}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`is_director_${employment.id}`} className="text-sm font-medium text-gray-700">
                        Director of this company
                      </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Date</label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Resignation Date</label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Shareholding %</label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder=""
                          max="100"
                        />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">Director's Remuneration Summary</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Salary:</span>
                          <span className="font-medium ml-2">{formatCurrency(employment.gross_pay)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Benefits:</span>
                          <span className="font-medium ml-2">{formatCurrency(employment.p11d_benefits)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Pension:</span>
                          <span className="font-medium ml-2">{formatCurrency(employment.pension_contributions)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employment;

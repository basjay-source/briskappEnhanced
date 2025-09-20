import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, Edit, Eye, Download, Search, Filter, BookOpen, Settings, Upload } from 'lucide-react';

interface ChartOfAccountsProps {
  loading?: boolean;
}

const ChartOfAccounts: React.FC<ChartOfAccountsProps> = ({ loading = false }) => {
  const [activeTab, setActiveTab] = useState('chart');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const chartOfAccounts = [
    { code: "1000", name: "Freehold Property", category: "Fixed Assets", balance: 500000, type: "Asset" },
    { code: "1100", name: "Plant and Machinery", category: "Fixed Assets", balance: 125000, type: "Asset" },
    { code: "1200", name: "Motor Vehicles", category: "Fixed Assets", balance: 45000, type: "Asset" },
    { code: "1300", name: "Office Equipment", category: "Fixed Assets", balance: 15000, type: "Asset" },
    { code: "1400", name: "Computer Equipment", category: "Fixed Assets", balance: 25000, type: "Asset" },
    { code: "1500", name: "Accumulated Depreciation - Property", category: "Fixed Assets", balance: -50000, type: "Asset" },
    { code: "1600", name: "Accumulated Depreciation - Plant", category: "Fixed Assets", balance: -35000, type: "Asset" },
    
    { code: "2000", name: "Stock", category: "Current Assets", balance: 85000, type: "Asset" },
    { code: "2100", name: "Trade Debtors", category: "Current Assets", balance: 125000, type: "Asset" },
    { code: "2200", name: "Other Debtors", category: "Current Assets", balance: 15000, type: "Asset" },
    { code: "2300", name: "Prepayments", category: "Current Assets", balance: 8000, type: "Asset" },
    { code: "2400", name: "VAT Recoverable", category: "Current Assets", balance: 12000, type: "Asset" },
    { code: "2500", name: "Bank Current Account", category: "Current Assets", balance: 35000, type: "Asset" },
    { code: "2600", name: "Bank Deposit Account", category: "Current Assets", balance: 50000, type: "Asset" },
    { code: "2700", name: "Petty Cash", category: "Current Assets", balance: 500, type: "Asset" },
    
    { code: "3000", name: "Trade Creditors", category: "Current Liabilities", balance: 65000, type: "Liability" },
    { code: "3100", name: "Other Creditors", category: "Current Liabilities", balance: 15000, type: "Liability" },
    { code: "3200", name: "Accruals", category: "Current Liabilities", balance: 25000, type: "Liability" },
    { code: "3300", name: "VAT Payable", category: "Current Liabilities", balance: 18000, type: "Liability" },
    { code: "3400", name: "PAYE/NIC Payable", category: "Current Liabilities", balance: 12000, type: "Liability" },
    { code: "3500", name: "Corporation Tax", category: "Current Liabilities", balance: 45000, type: "Liability" },
    { code: "3600", name: "Dividends Payable", category: "Current Liabilities", balance: 20000, type: "Liability" },
    
    { code: "4000", name: "Bank Loan", category: "Long-term Liabilities", balance: 150000, type: "Liability" },
    { code: "4100", name: "Directors Loan Account", category: "Long-term Liabilities", balance: 25000, type: "Liability" },
    { code: "4200", name: "Hire Purchase", category: "Long-term Liabilities", balance: 35000, type: "Liability" },
    
    { code: "5000", name: "Share Capital", category: "Capital & Reserves", balance: 100000, type: "Equity" },
    { code: "5100", name: "Share Premium", category: "Capital & Reserves", balance: 50000, type: "Equity" },
    { code: "5200", name: "Retained Earnings", category: "Capital & Reserves", balance: 285000, type: "Equity" },
    { code: "5300", name: "Revaluation Reserve", category: "Capital & Reserves", balance: 75000, type: "Equity" },
    
    { code: "6000", name: "Sales - Product A", category: "Sales", balance: 450000, type: "Income" },
    { code: "6100", name: "Sales - Product B", category: "Sales", balance: 320000, type: "Income" },
    { code: "6200", name: "Sales - Services", category: "Sales", balance: 180000, type: "Income" },
    { code: "6300", name: "Other Income", category: "Sales", balance: 25000, type: "Income" },
    { code: "6400", name: "Interest Received", category: "Sales", balance: 3500, type: "Income" },
    
    { code: "7000", name: "Purchases - Materials", category: "Cost of Sales", balance: 285000, type: "Expense" },
    { code: "7100", name: "Direct Labour", category: "Cost of Sales", balance: 125000, type: "Expense" },
    { code: "7200", name: "Subcontractors", category: "Cost of Sales", balance: 45000, type: "Expense" },
    { code: "7300", name: "Carriage Inwards", category: "Cost of Sales", balance: 8000, type: "Expense" },
    
    { code: "8000", name: "Salaries", category: "Overheads", balance: 185000, type: "Expense" },
    { code: "8100", name: "Employers NIC", category: "Overheads", balance: 22000, type: "Expense" },
    { code: "8200", name: "Pension Contributions", category: "Overheads", balance: 15000, type: "Expense" },
    { code: "8300", name: "Rent", category: "Overheads", balance: 36000, type: "Expense" },
    { code: "8400", name: "Rates", category: "Overheads", balance: 8500, type: "Expense" },
    { code: "8500", name: "Insurance", category: "Overheads", balance: 12000, type: "Expense" },
    { code: "8600", name: "Light and Heat", category: "Overheads", balance: 6500, type: "Expense" },
    { code: "8700", name: "Telephone", category: "Overheads", balance: 4500, type: "Expense" },
    { code: "8800", name: "Professional Fees", category: "Overheads", balance: 25000, type: "Expense" },
    { code: "8900", name: "Bank Charges", category: "Overheads", balance: 2500, type: "Expense" },
    { code: "8950", name: "Depreciation", category: "Overheads", balance: 45000, type: "Expense" }
  ];

  const accountCategories = [
    { name: "Fixed Assets", range: "1000-1999", count: 7, color: "bg-blue-100 text-blue-800" },
    { name: "Current Assets", range: "2000-2999", count: 8, color: "bg-green-100 text-green-800" },
    { name: "Current Liabilities", range: "3000-3999", count: 7, color: "bg-red-100 text-red-800" },
    { name: "Long-term Liabilities", range: "4000-4999", count: 3, color: "bg-orange-100 text-orange-800" },
    { name: "Capital & Reserves", range: "5000-5999", count: 4, color: "bg-purple-100 text-purple-800" },
    { name: "Sales", range: "6000-6999", count: 5, color: "bg-emerald-100 text-emerald-800" },
    { name: "Cost of Sales", range: "7000-7999", count: 4, color: "bg-yellow-100 text-yellow-800" },
    { name: "Overheads", range: "8000-8999", count: 12, color: "bg-gray-100 text-gray-800" }
  ];

  const coaKPIs = [
    { title: "Total Accounts", value: "50", description: "Active accounts", trend: "up" },
    { title: "Categories", value: "8", description: "Account categories", trend: "stable" },
    { title: "Balance Check", value: "✓", description: "Trial balance", trend: "up" },
    { title: "Mapping", value: "98%", description: "Accounts mapped", trend: "up" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Chart of Accounts</h2>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import COA
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chart">Chart of Accounts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="mapping">Account Mapping</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search accounts..." 
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <select className="px-3 py-2 border rounded-lg">
              <option>All Categories</option>
              <option>Fixed Assets</option>
              <option>Current Assets</option>
              <option>Current Liabilities</option>
              <option>Long-term Liabilities</option>
              <option>Capital and Reserves</option>
              <option>Sales</option>
              <option>Cost of Sales</option>
              <option>Overheads</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Chart of Accounts (IRIS Format)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Code</th>
                      <th className="text-left p-2">Account Name</th>
                      <th className="text-left p-2">Category</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-right p-2">Balance</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartOfAccounts.map((account) => (
                      <tr key={account.code} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-mono font-medium">{account.code}</td>
                        <td className="p-2">{account.name}</td>
                        <td className="p-2">
                          <Badge 
                            variant="outline" 
                            className={
                              account.category === 'Fixed Assets' ? 'text-blue-600 border-blue-600' :
                              account.category === 'Current Assets' ? 'text-green-600 border-green-600' :
                              account.category === 'Current Liabilities' ? 'text-red-600 border-red-600' :
                              account.category === 'Long-term Liabilities' ? 'text-orange-600 border-orange-600' :
                              account.category === 'Capital & Reserves' ? 'text-purple-600 border-purple-600' :
                              account.category === 'Sales' ? 'text-emerald-600 border-emerald-600' :
                              account.category === 'Cost of Sales' ? 'text-yellow-600 border-yellow-600' :
                              'text-gray-600 border-gray-600'
                            }
                          >
                            {account.category}
                          </Badge>
                        </td>
                        <td className="p-2 text-sm">{account.type}</td>
                        <td className="p-2 text-right font-medium">
                          <span className={account.balance < 0 ? 'text-red-600' : 'text-gray-900'}>
                            £{Math.abs(account.balance).toLocaleString()}
                            {account.balance < 0 && ' CR'}
                          </span>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {accountCategories.map((category) => (
              <Card key={category.name} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <p className="text-sm text-gray-500">Range: {category.range}</p>
                    </div>
                    <Badge variant="outline" className={category.color}>
                      {category.count} accounts
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Account Range:</span>
                      <span className="font-mono">{category.range}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Active Accounts:</span>
                      <span className="font-medium">{category.count}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Mapping Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Trial Balance Mapping</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Fixed Assets</span>
                        <Badge className="bg-green-100 text-green-800">Mapped</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Current Assets</span>
                        <Badge className="bg-green-100 text-green-800">Mapped</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Liabilities</span>
                        <Badge className="bg-green-100 text-green-800">Mapped</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Equity</span>
                        <Badge className="bg-orange-100 text-orange-800">Partial</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Financial Statement Mapping</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Balance Sheet</span>
                        <Badge className="bg-green-100 text-green-800">Complete</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Profit and Loss</span>
                        <Badge className="bg-green-100 text-green-800">Complete</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Cash Flow</span>
                        <Badge className="bg-orange-100 text-orange-800">Review</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Notes</span>
                        <Badge className="bg-green-100 text-green-800">Complete</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Overall Mapping Progress</span>
                    <span className="font-bold text-green-600">98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Chart Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Chart Format</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>IRIS Standard</option>
                      <option>UK GAAP</option>
                      <option>IFRS</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Account Code Length</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>4 digits</option>
                      <option>5 digits</option>
                      <option>6 digits</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Default Currency</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>GBP (£)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Auto-create contra accounts</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Enable multi-currency</span>
                  </div>
                  
                  <Button className="w-full">Save Configuration</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Import/Export Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Import Templates</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="w-4 h-4 mr-2" />
                        IRIS Template
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Sage Template
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Xero Template
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Export Formats</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Excel (.xlsx)
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        CSV (.csv)
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        PDF Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-4 gap-4">
        {coaKPIs.map((kpi, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{kpi.value}</div>
              <div className="text-sm font-medium text-gray-900">{kpi.title}</div>
              <div className="text-xs text-gray-500 mt-1">{kpi.description}</div>
              <div className={`text-xs mt-1 ${
                kpi.trend === 'up' ? 'text-green-600' : 
                kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {kpi.trend === 'up' ? '↗' : kpi.trend === 'down' ? '↘' : '→'} {kpi.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChartOfAccounts;

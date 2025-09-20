import React, { useState } from 'react'
import { Globe, DollarSign, Percent, TrendingUp, RefreshCw, Settings } from 'lucide-react'

const MultiCurrencyVAT: React.FC = () => {
  const [activeTab, setActiveTab] = useState('fx-tables')

  const fxRates = [
    { currency: 'USD', rate: 1.2650, lastUpdated: '2024-01-16 09:00', source: 'Bank of England' },
    { currency: 'EUR', rate: 1.1750, lastUpdated: '2024-01-16 09:00', source: 'Bank of England' },
    { currency: 'CAD', rate: 1.7120, lastUpdated: '2024-01-16 09:00', source: 'Bank of England' },
    { currency: 'AUD', rate: 1.9850, lastUpdated: '2024-01-16 09:00', source: 'Bank of England' },
    { currency: 'JPY', rate: 188.45, lastUpdated: '2024-01-16 09:00', source: 'Bank of England' }
  ]

  const invoiceCurrencies = [
    {
      id: 1,
      invoice: 'INV-2024-001',
      client: 'Acme Corp USA',
      invoiceCurrency: 'USD',
      invoiceAmount: 15000.00,
      fxRate: 1.2650,
      baseCurrencyAmount: 11857.71,
      baseCurrency: 'GBP'
    },
    {
      id: 2,
      invoice: 'INV-2024-002',
      client: 'Tech Europe Ltd',
      invoiceCurrency: 'EUR',
      invoiceAmount: 12000.00,
      fxRate: 1.1750,
      baseCurrencyAmount: 10212.77,
      baseCurrency: 'GBP'
    },
    {
      id: 3,
      invoice: 'INV-2024-003',
      client: 'Global Canada Inc',
      invoiceCurrency: 'CAD',
      invoiceAmount: 20000.00,
      fxRate: 1.7120,
      baseCurrencyAmount: 11682.24,
      baseCurrency: 'GBP'
    }
  ]

  const vatCodes = [
    {
      code: 'STD',
      description: 'Standard Rate',
      rate: 20.0,
      country: 'UK',
      servicePlace: 'UK',
      applicableServices: 'Most services'
    },
    {
      code: 'ZER',
      description: 'Zero Rate',
      rate: 0.0,
      country: 'UK',
      servicePlace: 'UK',
      applicableServices: 'Exports, certain supplies'
    },
    {
      code: 'EXE',
      description: 'Exempt',
      rate: 0.0,
      country: 'UK',
      servicePlace: 'UK',
      applicableServices: 'Financial services, insurance'
    },
    {
      code: 'REV',
      description: 'Reverse Charge',
      rate: 0.0,
      country: 'EU',
      servicePlace: 'EU',
      applicableServices: 'B2B services to EU'
    },
    {
      code: 'OS',
      description: 'Outside Scope',
      rate: 0.0,
      country: 'Non-EU',
      servicePlace: 'Non-EU',
      applicableServices: 'Services to non-EU businesses'
    }
  ]

  const vatRules = [
    {
      id: 1,
      rule: 'UK B2B Services',
      condition: 'Client in UK, Business customer',
      vatCode: 'STD',
      rate: 20.0,
      placeOfSupply: 'UK'
    },
    {
      id: 2,
      rule: 'EU B2B Services',
      condition: 'Client in EU, Business customer with VAT number',
      vatCode: 'REV',
      rate: 0.0,
      placeOfSupply: 'Customer location'
    },
    {
      id: 3,
      rule: 'Non-EU B2B Services',
      condition: 'Client outside EU, Business customer',
      vatCode: 'OS',
      rate: 0.0,
      placeOfSupply: 'Customer location'
    },
    {
      id: 4,
      rule: 'UK B2C Services',
      condition: 'Client in UK, Consumer',
      vatCode: 'STD',
      rate: 20.0,
      placeOfSupply: 'UK'
    }
  ]

  const tabs = [
    { id: 'fx-tables', name: 'FX Tables', icon: TrendingUp },
    { id: 'invoice-currency', name: 'Invoice Currency', icon: DollarSign },
    { id: 'vat-codes', name: 'VAT Codes & Rules', icon: Percent }
  ]

  const renderFXTables = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Exchange Rates</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Update Rates</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate (to GBP)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fxRates.map((rate, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-blue-600">{rate.currency}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{rate.currency}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {rate.rate.toFixed(4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {rate.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {rate.source}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <Globe className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-sm font-medium text-blue-800">Exchange Rate Settings</h4>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          Rates are updated automatically from Bank of England at 9:00 AM daily. You can also set monthly average rates for reporting.
        </p>
      </div>
    </div>
  )

  const renderInvoiceCurrency = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Currency</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FX Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Currency</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {invoiceCurrencies.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {invoice.invoice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {invoice.client}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {invoice.invoiceCurrency}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {invoice.invoiceCurrency} {invoice.invoiceAmount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {invoice.fxRate.toFixed(4)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {invoice.baseCurrency} {invoice.baseCurrencyAmount.toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderVATCodes = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">VAT Codes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicable Services</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vatCodes.map((code, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      {code.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {code.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {code.rate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {code.country}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {code.applicableServices}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">VAT Rules</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Place of Supply</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vatRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {rule.rule}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {rule.condition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {rule.vatCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rule.rate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rule.placeOfSupply}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Multi-currency &amp; VAT</h1>
          <p className="text-gray-600 mt-2">Maintain FX tables, bill in client currency, configure VAT rules and tax codes</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Currencies</h3>
            <Globe className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {fxRates.length + 1}
          </div>
          <p className="text-sm text-gray-500 mt-1">Including GBP base</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Multi-Currency Invoices</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {invoiceCurrencies.length}
          </div>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">VAT Codes</h3>
            <Percent className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {vatCodes.length}
          </div>
          <p className="text-sm text-gray-500 mt-1">Configured</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">FX Variance</h3>
            <TrendingUp className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-orange-600">
            £2,450
          </div>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'fx-tables' && renderFXTables()}
          {activeTab === 'invoice-currency' && renderInvoiceCurrency()}
          {activeTab === 'vat-codes' && renderVATCodes()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent FX Updates</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">USD rate updated</p>
                <p className="text-sm text-gray-500">1.2650 (was 1.2635)</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium">+0.12%</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">EUR rate updated</p>
                <p className="text-sm text-gray-500">1.1750 (was 1.1765)</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-red-600 font-medium">-0.13%</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">VAT Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Standard Rate (20%)</span>
              <span className="text-sm font-medium">£12,450</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Zero Rate (0%)</span>
              <span className="text-sm font-medium">£0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Reverse Charge</span>
              <span className="text-sm font-medium">£8,200</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-900">Total VAT</span>
                <span className="text-sm font-bold text-gray-900">£12,450</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiCurrencyVAT

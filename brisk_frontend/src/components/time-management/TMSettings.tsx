import React, { useState } from 'react'
import { Settings, Clock, Users, FileText, Hash, MessageSquare, Globe, Shield } from 'lucide-react'

const TMSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('time-policies')

  const tabs = [
    { id: 'time-policies', name: 'Time Policies', icon: Clock },
    { id: 'approval-rules', name: 'Approval Rules', icon: Users },
    { id: 'invoice-templates', name: 'Invoice Templates', icon: FileText },
    { id: 'numbering', name: 'Numbering', icon: Hash },
    { id: 'narratives', name: 'Narratives', icon: MessageSquare },
    { id: 'tax-currencies', name: 'Tax & Currencies', icon: Globe },
    { id: 'permissions', name: 'Permissions', icon: Shield }
  ]

  const renderTimePolicies = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Entry Rules</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Minimum time unit</label>
              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                <option>6 minutes</option>
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Rounding rule</label>
              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                <option>Round up</option>
                <option>Round down</option>
                <option>Round to nearest</option>
                <option>No rounding</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Require narratives</label>
              <input type="checkbox" checked className="rounded border-gray-300" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Rules</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Late submission penalty</label>
              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                <option>None</option>
                <option>Warning</option>
                <option>Approval required</option>
                <option>Block submission</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Grace period (days)</label>
              <input type="number" value="3" className="px-3 py-2 border border-gray-300 rounded-lg w-20" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Auto-submit timesheets</label>
              <input type="checkbox" className="rounded border-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Require manager approval</label>
              <input type="checkbox" checked className="rounded border-gray-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billable Codes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Billable</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Service Line</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">AUD</td>
                <td className="px-4 py-2 text-sm text-gray-900">Audit fieldwork</td>
                <td className="px-4 py-2"><span className="text-green-600">Yes</span></td>
                <td className="px-4 py-2 text-sm text-gray-900">Audit</td>
                <td className="px-4 py-2"><button className="text-blue-600 hover:text-blue-900">Edit</button></td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">TAX</td>
                <td className="px-4 py-2 text-sm text-gray-900">Tax preparation</td>
                <td className="px-4 py-2"><span className="text-green-600">Yes</span></td>
                <td className="px-4 py-2 text-sm text-gray-900">Tax</td>
                <td className="px-4 py-2"><button className="text-blue-600 hover:text-blue-900">Edit</button></td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-900">ADM</td>
                <td className="px-4 py-2 text-sm text-gray-900">Administration</td>
                <td className="px-4 py-2"><span className="text-red-600">No</span></td>
                <td className="px-4 py-2 text-sm text-gray-900">Admin</td>
                <td className="px-4 py-2"><button className="text-blue-600 hover:text-blue-900">Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderApprovalRules = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Chains</h3>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Time & Expenses</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Staff → Senior</span>
                <input type="checkbox" checked className="rounded border-gray-300" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Senior → Manager</span>
                <input type="checkbox" checked className="rounded border-gray-300" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Manager → Partner (&gt;£1000)</span>
                <input type="checkbox" checked className="rounded border-gray-300" />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Write-offs & Discounts</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Manager (up to £5,000)</span>
                <input type="checkbox" checked className="rounded border-gray-300" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Partner (unlimited)</span>
                <input type="checkbox" checked className="rounded border-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Limits</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time Approval</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Expense Approval</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Write-off Limit</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Discount Limit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">Staff</td>
                <td className="px-4 py-2 text-sm text-gray-900">Own only</td>
                <td className="px-4 py-2 text-sm text-gray-900">Own only</td>
                <td className="px-4 py-2 text-sm text-gray-900">£0</td>
                <td className="px-4 py-2 text-sm text-gray-900">£0</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">Senior</td>
                <td className="px-4 py-2 text-sm text-gray-900">Team</td>
                <td className="px-4 py-2 text-sm text-gray-900">Team</td>
                <td className="px-4 py-2 text-sm text-gray-900">£1,000</td>
                <td className="px-4 py-2 text-sm text-gray-900">£500</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">Manager</td>
                <td className="px-4 py-2 text-sm text-gray-900">Department</td>
                <td className="px-4 py-2 text-sm text-gray-900">Department</td>
                <td className="px-4 py-2 text-sm text-gray-900">£5,000</td>
                <td className="px-4 py-2 text-sm text-gray-900">£2,000</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">Partner</td>
                <td className="px-4 py-2 text-sm text-gray-900">All</td>
                <td className="px-4 py-2 text-sm text-gray-900">All</td>
                <td className="px-4 py-2 text-sm text-gray-900">Unlimited</td>
                <td className="px-4 py-2 text-sm text-gray-900">Unlimited</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderInvoiceTemplates = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Templates</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Standard Template</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Header Text</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} defaultValue="Professional Services Invoice" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Footer Text</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={2} defaultValue="Payment terms: 30 days from invoice date" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" checked className="rounded border-gray-300" />
                <label className="text-sm text-gray-700">Show detailed time breakdown</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" checked className="rounded border-gray-300" />
                <label className="text-sm text-gray-700">Include VAT breakdown</label>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Fixed Fee Template</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Header Text</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} defaultValue="Fixed Fee Services Invoice" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Footer Text</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={2} defaultValue="Fixed fee as agreed in engagement letter" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <label className="text-sm text-gray-700">Show milestone progress</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" checked className="rounded border-gray-300" />
                <label className="text-sm text-gray-700">Include scope description</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNumbering = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Numbering Sequences</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Numbers</label>
              <input type="text" value="INV-{YYYY}-{####}" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <p className="text-xs text-gray-500 mt-1">Next: INV-2024-0001</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Credit Note Numbers</label>
              <input type="text" value="CN-{YYYY}-{####}" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <p className="text-xs text-gray-500 mt-1">Next: CN-2024-0001</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quote Numbers</label>
              <input type="text" value="QUO-{YYYY}-{####}" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              <p className="text-xs text-gray-500 mt-1">Next: QUO-2024-0001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNarratives = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Narratives</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Audit Planning</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={2} defaultValue="Audit planning and risk assessment procedures" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Preparation</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={2} defaultValue="Preparation of corporation tax return and computations" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Advisory Services</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={2} defaultValue="Strategic advisory and consultation services" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Review Work</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={2} defaultValue="Review of work papers and supporting documentation" />
          </div>
        </div>
      </div>
    </div>
  )

  const renderTaxCurrencies = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default VAT Rate</label>
              <input type="number" value="20" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">VAT Registration Number</label>
              <input type="text" value="GB123456789" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked className="rounded border-gray-300" />
              <label className="text-sm text-gray-700">Apply VAT to all services by default</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <label className="text-sm text-gray-700">Enable reverse charge VAT</label>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Currency Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Currency</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>GBP - British Pound</option>
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Rate Source</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Bank of England</option>
                <option>European Central Bank</option>
                <option>Manual Entry</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked className="rounded border-gray-300" />
              <label className="text-sm text-gray-700">Auto-update exchange rates daily</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <label className="text-sm text-gray-700">Allow multi-currency invoicing</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPermissions = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Module Permissions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Permission</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Staff</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Senior</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Manager</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Partner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">View rates</td>
                <td className="px-4 py-2"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" checked className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" checked className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" checked className="rounded border-gray-300" /></td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">View WIP</td>
                <td className="px-4 py-2"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" checked className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" checked className="rounded border-gray-300" /></td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">View AR</td>
                <td className="px-4 py-2"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" checked className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" checked className="rounded border-gray-300" /></td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">Create invoices</td>
                <td className="px-4 py-2"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" checked className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" checked className="rounded border-gray-300" /></td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">Manage retainers</td>
                <td className="px-4 py-2"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="px-4 py-2"><input type="checkbox" checked className="rounded border-gray-300" /></td>
              </tr>
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
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Configure time policies, approval rules, templates, and permissions</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
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
          {activeTab === 'time-policies' && renderTimePolicies()}
          {activeTab === 'approval-rules' && renderApprovalRules()}
          {activeTab === 'invoice-templates' && renderInvoiceTemplates()}
          {activeTab === 'numbering' && renderNumbering()}
          {activeTab === 'narratives' && renderNarratives()}
          {activeTab === 'tax-currencies' && renderTaxCurrencies()}
          {activeTab === 'permissions' && renderPermissions()}
        </div>
      </div>
    </div>
  )
}

export default TMSettings

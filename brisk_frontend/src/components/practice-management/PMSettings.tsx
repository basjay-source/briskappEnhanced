import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Settings, Save, RefreshCw, Shield, Bell,
  Clock, DollarSign, FileText
} from 'lucide-react'

const PMSettings: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'general' | 'permissions' | 'rates' | 'sla' | 'workflows' | 'notifications'>('general')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure practice management preferences and policies</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'general', label: 'General', icon: Settings },
            { id: 'permissions', label: 'Roles & Permissions', icon: Shield },
            { id: 'rates', label: 'Rate Cards', icon: DollarSign },
            { id: 'sla', label: 'SLA Policies', icon: Clock },
            { id: 'workflows', label: 'Workflow Templates', icon: FileText },
            { id: 'notifications', label: 'Notifications', icon: Bell }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Practice Information</CardTitle>
              <CardDescription>Basic practice details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Practice Name</label>
                <Input defaultValue="Brisk Accountants Ltd" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option value="GBP">GBP (£)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Europe/Dublin">Europe/Dublin (GMT)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Financial Year End</label>
                <Input type="date" defaultValue="2024-03-31" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Working Hours</CardTitle>
              <CardDescription>Default working hours and holidays</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Working Days</label>
                <div className="space-y-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <label key={day} className="flex items-center">
                      <input 
                        type="checkbox" 
                        defaultChecked={!['Saturday', 'Sunday'].includes(day)}
                        className="mr-2"
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <Input type="time" defaultValue="09:00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <Input type="time" defaultValue="17:30" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Permissions Settings */}
      {activeTab === 'permissions' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Role Permissions</CardTitle>
            <CardDescription>Configure what each role can access and modify</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { role: 'Partner', permissions: ['All Access', 'Approve Pricing', 'Final Sign-off', 'Write-offs'] },
                { role: 'Manager', permissions: ['Plan Work', 'Approve Invoices', 'Manage Jobs', 'Team Management'] },
                { role: 'Senior', permissions: ['Execute Tasks', 'Log Time', 'Raise Issues', 'Review Work'] },
                { role: 'Staff', permissions: ['Execute Tasks', 'Log Time', 'View Assigned Work'] },
                { role: 'Reviewer', permissions: ['Gate Filings', 'QA Findings', 'Review Queue'] }
              ].map((roleData) => (
                <div key={roleData.role} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">{roleData.role}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {roleData.permissions.map((permission) => (
                      <label key={permission} className="flex items-center text-sm">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        {permission}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rate Cards */}
      {activeTab === 'rates' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Billing Rate Cards</CardTitle>
            <CardDescription>Set standard billing rates by role and service type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { role: 'Partner', standard: 250, accounts: 275, tax: 300, advisory: 350 },
                { role: 'Manager', standard: 150, accounts: 165, tax: 180, advisory: 200 },
                { role: 'Senior', standard: 100, accounts: 110, tax: 120, advisory: 130 },
                { role: 'Staff', standard: 65, accounts: 70, tax: 75, advisory: 80 },
                { role: 'Trainee', standard: 45, accounts: 50, tax: 55, advisory: 60 }
              ].map((rate) => (
                <div key={rate.role} className="grid grid-cols-5 gap-4 items-center p-3 border rounded-lg">
                  <div className="font-medium">{rate.role}</div>
                  <div>
                    <label className="block text-xs text-gray-600">Standard</label>
                    <Input type="number" defaultValue={rate.standard} className="text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Accounts</label>
                    <Input type="number" defaultValue={rate.accounts} className="text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Tax</label>
                    <Input type="number" defaultValue={rate.tax} className="text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Advisory</label>
                    <Input type="number" defaultValue={rate.advisory} className="text-sm" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* SLA Policies */}
      {activeTab === 'sla' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Service Level Agreements</CardTitle>
            <CardDescription>Define response times and delivery commitments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { service: 'Accounts Preparation', response: 2, delivery: 14, escalation: 7 },
                { service: 'VAT Returns', response: 1, delivery: 5, escalation: 3 },
                { service: 'Payroll Processing', response: 4, delivery: 2, escalation: 1 },
                { service: 'Tax Advisory', response: 1, delivery: 7, escalation: 3 },
                { service: 'Company Secretarial', response: 2, delivery: 10, escalation: 5 }
              ].map((sla) => (
                <div key={sla.service} className="grid grid-cols-4 gap-4 items-center p-3 border rounded-lg">
                  <div className="font-medium">{sla.service}</div>
                  <div>
                    <label className="block text-xs text-gray-600">Response (hours)</label>
                    <Input type="number" defaultValue={sla.response} className="text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Delivery (days)</label>
                    <Input type="number" defaultValue={sla.delivery} className="text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Escalation (days)</label>
                    <Input type="number" defaultValue={sla.escalation} className="text-sm" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workflow Templates */}
      {activeTab === 'workflows' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Workflow Templates</CardTitle>
            <CardDescription>Manage standard workflow templates for different services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Limited Company Accounts', steps: 12, estimated_hours: 25, version: '2.1' },
                { name: 'VAT Return Process', steps: 8, estimated_hours: 4, version: '1.8' },
                { name: 'Payroll Setup', steps: 15, estimated_hours: 8, version: '3.0' },
                { name: 'Corporation Tax Return', steps: 10, estimated_hours: 12, version: '2.3' },
                { name: 'Client Onboarding', steps: 6, estimated_hours: 3, version: '1.5' }
              ].map((template) => (
                <div key={template.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      <Badge variant="outline" className="text-xs">v{template.version}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>{template.steps} steps</span>
                      <span>{template.estimated_hours}h estimated</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Clone</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Email Notifications</CardTitle>
              <CardDescription>Configure when to send email alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { event: 'Job assigned to me', enabled: true },
                { event: 'Deadline approaching (7 days)', enabled: true },
                { event: 'WIP over budget', enabled: true },
                { event: 'Invoice overdue', enabled: false },
                { event: 'Quality review required', enabled: true },
                { event: 'Client document uploaded', enabled: false }
              ].map((notification) => (
                <label key={notification.event} className="flex items-center justify-between">
                  <span className="text-sm">{notification.event}</span>
                  <input type="checkbox" defaultChecked={notification.enabled} />
                </label>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">System Preferences</CardTitle>
              <CardDescription>General system behavior settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default View</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option value="kanban">Kanban Board</option>
                  <option value="list">List View</option>
                  <option value="gantt">Gantt Chart</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Auto-save Interval</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option value="30">30 seconds</option>
                  <option value="60">1 minute</option>
                  <option value="300">5 minutes</option>
                </select>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Show capacity warnings</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Enable desktop notifications</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default PMSettings

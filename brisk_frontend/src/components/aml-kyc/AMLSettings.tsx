import React, { useState } from 'react'
import { Save, RefreshCw, Shield, CheckCircle } from 'lucide-react'

interface AMLSettings {
  riskThresholds: {
    low: number
    medium: number
    high: number
  }
  screeningSettings: {
    autoScreening: boolean
    screeningFrequency: 'daily' | 'weekly' | 'monthly'
    matchThreshold: number
    falsePositiveReduction: boolean
  }
  workflowSettings: {
    autoApprovalLimit: number
    requireDualApproval: boolean
    escalationTimeout: number
    reminderFrequency: number
  }
  complianceSettings: {
    retentionPeriod: number
    auditTrail: boolean
    dataEncryption: boolean
    gdprCompliance: boolean
  }
  notificationSettings: {
    emailAlerts: boolean
    smsAlerts: boolean
    dashboardAlerts: boolean
    alertRecipients: string[]
  }
}

const AMLSettings: React.FC = () => {
  const [settings, setSettings] = useState<AMLSettings>({
    riskThresholds: {
      low: 30,
      medium: 50,
      high: 70
    },
    screeningSettings: {
      autoScreening: true,
      screeningFrequency: 'daily',
      matchThreshold: 85,
      falsePositiveReduction: true
    },
    workflowSettings: {
      autoApprovalLimit: 10000,
      requireDualApproval: true,
      escalationTimeout: 48,
      reminderFrequency: 24
    },
    complianceSettings: {
      retentionPeriod: 5,
      auditTrail: true,
      dataEncryption: true,
      gdprCompliance: true
    },
    notificationSettings: {
      emailAlerts: true,
      smsAlerts: false,
      dashboardAlerts: true,
      alertRecipients: ['mlro@company.com', 'compliance@company.com']
    }
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('risk')

  const handleSave = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = (section: keyof AMLSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">AML/KYC system configuration and preferences</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('risk')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'risk'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Risk Thresholds
              </button>
              <button
                onClick={() => setActiveTab('screening')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'screening'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Screening
              </button>
              <button
                onClick={() => setActiveTab('workflow')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'workflow'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Workflow
              </button>
              <button
                onClick={() => setActiveTab('compliance')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'compliance'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Compliance
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notifications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notifications
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'risk' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Score Thresholds</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-green-800 mb-2">Low Risk Threshold</label>
                      <input
                        type="number"
                        value={settings.riskThresholds.low}
                        onChange={(e) => updateSettings('riskThresholds', 'low', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        min="0"
                        max="100"
                      />
                      <p className="text-xs text-green-600 mt-1">0 - {settings.riskThresholds.low}</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-yellow-800 mb-2">Medium Risk Threshold</label>
                      <input
                        type="number"
                        value={settings.riskThresholds.medium}
                        onChange={(e) => updateSettings('riskThresholds', 'medium', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        min="0"
                        max="100"
                      />
                      <p className="text-xs text-yellow-600 mt-1">{settings.riskThresholds.low + 1} - {settings.riskThresholds.medium}</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-red-800 mb-2">High Risk Threshold</label>
                      <input
                        type="number"
                        value={settings.riskThresholds.high}
                        onChange={(e) => updateSettings('riskThresholds', 'high', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        min="0"
                        max="100"
                      />
                      <p className="text-xs text-red-600 mt-1">{settings.riskThresholds.medium + 1} - {settings.riskThresholds.high}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'screening' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Screening Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Automatic Screening</label>
                        <p className="text-sm text-gray-600">Enable automatic screening for new clients</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.screeningSettings.autoScreening}
                        onChange={(e) => updateSettings('screeningSettings', 'autoScreening', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Screening Frequency</label>
                      <select
                        value={settings.screeningSettings.screeningFrequency}
                        onChange={(e) => updateSettings('screeningSettings', 'screeningFrequency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Match Threshold (%)</label>
                      <input
                        type="number"
                        value={settings.screeningSettings.matchThreshold}
                        onChange={(e) => updateSettings('screeningSettings', 'matchThreshold', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'workflow' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Workflow Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Auto-Approval Limit (£)</label>
                      <input
                        type="number"
                        value={settings.workflowSettings.autoApprovalLimit}
                        onChange={(e) => updateSettings('workflowSettings', 'autoApprovalLimit', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Require Dual Approval</label>
                        <p className="text-sm text-gray-600">Require two approvers for high-risk cases</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.workflowSettings.requireDualApproval}
                        onChange={(e) => updateSettings('workflowSettings', 'requireDualApproval', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Escalation Timeout (hours)</label>
                      <input
                        type="number"
                        value={settings.workflowSettings.escalationTimeout}
                        onChange={(e) => updateSettings('workflowSettings', 'escalationTimeout', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Data Retention Period (years)</label>
                      <input
                        type="number"
                        value={settings.complianceSettings.retentionPeriod}
                        onChange={(e) => updateSettings('complianceSettings', 'retentionPeriod', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                        max="10"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-900">Audit Trail</span>
                        </div>
                        <span className="text-sm text-green-600">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-gray-900">Data Encryption</span>
                        </div>
                        <span className="text-sm text-blue-600">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-900">GDPR Compliance</span>
                        </div>
                        <span className="text-sm text-green-600">Enabled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Email Alerts</label>
                        <p className="text-sm text-gray-600">Receive email notifications for AML alerts</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notificationSettings.emailAlerts}
                        onChange={(e) => updateSettings('notificationSettings', 'emailAlerts', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">SMS Alerts</label>
                        <p className="text-sm text-gray-600">Receive SMS notifications for urgent alerts</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notificationSettings.smsAlerts}
                        onChange={(e) => updateSettings('notificationSettings', 'smsAlerts', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Dashboard Alerts</label>
                        <p className="text-sm text-gray-600">Show alerts on the dashboard</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notificationSettings.dashboardAlerts}
                        onChange={(e) => updateSettings('notificationSettings', 'dashboardAlerts', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {saved && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Settings saved successfully</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{loading ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AMLSettings

import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Settings as SettingsIcon, Globe, Clock, DollarSign, Database } from 'lucide-react'

const Settings: React.FC = () => {
  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Configure global system settings and preferences</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <SettingsIcon className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Global Configuration</CardTitle>
            <CardDescription>System-wide settings and defaults</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Default Region</span>
              </div>
              <Badge variant="outline">UK</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Default Timezone</span>
              </div>
              <Badge variant="outline">Europe/London</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Default Currency</span>
              </div>
              <Badge variant="outline">GBP</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>Data Retention</span>
              </div>
              <Badge variant="outline">7 years</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Preferences</CardTitle>
            <CardDescription>Application behavior and defaults</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Session Timeout</span>
              <Badge variant="outline">8 hours</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Password Expiry</span>
              <Badge variant="outline">90 days</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Audit Log Retention</span>
              <Badge variant="outline">10 years</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Backup Frequency</span>
              <Badge variant="outline">Daily</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure system notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>SMS Alerts</span>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Security Alerts</span>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>System Maintenance</span>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integration Settings</CardTitle>
            <CardDescription>External service configurations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>API Rate Limiting</span>
              <Badge variant="outline">1000/hour</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Webhook Timeout</span>
              <Badge variant="outline">30 seconds</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>External Auth</span>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Data Export</span>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Settings

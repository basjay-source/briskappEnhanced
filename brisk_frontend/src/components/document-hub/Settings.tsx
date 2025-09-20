import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { 
  Database, Tag, FileText, Shield
} from 'lucide-react'

const Settings: React.FC = () => {
  return (
    <div className="w-full max-w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure document hub settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Metadata Schema
            </CardTitle>
            <CardDescription>Configure required fields by document type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Default Language</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Default Region</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option value="uk">United Kingdom</option>
                  <option value="eu">European Union</option>
                  <option value="us">United States</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              Tag Taxonomy
            </CardTitle>
            <CardDescription>Manage document tags and categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Auto-tagging</label>
                <div className="mt-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Enable AI auto-tagging</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Tag Suggestions</label>
                <div className="mt-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Show tag suggestions</span>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Conversion Profiles
          </CardTitle>
          <CardDescription>Default conversion settings and profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Default PDF Quality</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option value="high">High Quality</option>
                  <option value="medium">Medium Quality</option>
                  <option value="low">Low Quality (Compressed)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">OCR Language</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="auto">Auto-detect</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security & Permissions
          </CardTitle>
          <CardDescription>Configure access controls and security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Default Sharing Permissions</label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">View only</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-700">Download allowed</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-700">Print allowed</span>
                </label>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Default Share Expiry</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="never">Never expires</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}

export default Settings

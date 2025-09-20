import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { 
  LayoutDashboard, Inbox, FolderOpen, Search, RefreshCw, Eye,
  FileSignature, FileText, Clipboard, Package, Share2, Shield,
  Activity, Bot, Plug, Settings as SettingsIcon, BarChart3, LogOut,
  ChevronDown, Upload, Plus, AlertTriangle
} from 'lucide-react'
import DocumentDashboard from '../components/document-hub/DocumentDashboard'
import InboxIngest from '../components/document-hub/InboxIngest'
import BindersTags from '../components/document-hub/BindersTags'
import SearchRetrieval from '../components/document-hub/SearchRetrieval'
import ConversionTransforms from '../components/document-hub/ConversionTransforms'
import OCRDataCapture from '../components/document-hub/OCRDataCapture'
import ESignApprovals from '../components/document-hub/ESignApprovals'
import TemplatesMailMerge from '../components/document-hub/TemplatesMailMerge'
import WorkpapersChecklists from '../components/document-hub/WorkpapersChecklists'
import PacksPublishing from '../components/document-hub/PacksPublishing'
import SharingClientPortal from '../components/document-hub/SharingClientPortal'
import RetentionCompliance from '../components/document-hub/RetentionCompliance'
import AuditActivity from '../components/document-hub/AuditActivity'
import AIAssist from '../components/document-hub/AIAssist'
import Integrations from '../components/document-hub/Integrations'
import Settings from '../components/document-hub/Settings'
import Reports from '../components/document-hub/Reports'

const DocumentHubDashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const [selectedClient] = useState('Brisk Accountants Ltd')
  const [selectedPeriod] = useState('2024')
  const [selectedBinder] = useState('Year-end')

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/document-hub/' },
    { id: 'inbox', label: 'Inbox & Ingest', icon: Inbox, path: '/document-hub/inbox' },
    { id: 'binders', label: 'Binders & Tags', icon: FolderOpen, path: '/document-hub/binders' },
    { id: 'search', label: 'Search & Retrieval', icon: Search, path: '/document-hub/search' },
    { id: 'conversion', label: 'Conversion & Transforms', icon: RefreshCw, path: '/document-hub/conversion' },
    { id: 'ocr', label: 'OCR & Data Capture', icon: Eye, path: '/document-hub/ocr' },
    { id: 'esign', label: 'E-Sign & Approvals', icon: FileSignature, path: '/document-hub/esign' },
    { id: 'templates', label: 'Templates & Mail-Merge', icon: FileText, path: '/document-hub/templates' },
    { id: 'workpapers', label: 'Workpapers & Checklists', icon: Clipboard, path: '/document-hub/workpapers' },
    { id: 'packs', label: 'Packs & Publishing', icon: Package, path: '/document-hub/packs' },
    { id: 'sharing', label: 'Sharing & Client Portal', icon: Share2, path: '/document-hub/sharing' },
    { id: 'retention', label: 'Retention & Compliance', icon: Shield, path: '/document-hub/retention' },
    { id: 'audit', label: 'Audit & Activity', icon: Activity, path: '/document-hub/audit' },
    { id: 'ai', label: 'AI Assist', icon: Bot, path: '/document-hub/ai' },
    { id: 'integrations', label: 'Integrations', icon: Plug, path: '/document-hub/integrations' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, path: '/document-hub/settings' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '/document-hub/reports' }
  ]

  return (
    <div className="min-h-screen w-full bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-bold text-lg text-gray-900">Document Hub</span>
            </div>
            <a 
              href="/admin" 
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Admin
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 group"
              >
                <item.icon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">
                  {user?.full_name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.full_name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.role?.replace('_', ' ')}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-gray-400 hover:text-gray-600"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Client Switcher */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Client:</span>
                <Button variant="outline" size="sm" className="text-sm">
                  {selectedClient}
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Period */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Period:</span>
                <Button variant="outline" size="sm" className="text-sm">
                  {selectedPeriod}
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Binder View */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Binder:</span>
                <Badge variant="outline">{selectedBinder}</Badge>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Global Search
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Convert
              </Button>
              <Button variant="outline" size="sm">
                <Package className="h-4 w-4 mr-2" />
                Create Pack
              </Button>
              <Badge variant="destructive" className="bg-orange-100 text-orange-800 border-orange-200">
                <AlertTriangle className="h-3 w-3 mr-1" />
                3 Alerts
              </Badge>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<DocumentDashboard />} />
            <Route path="/inbox" element={<InboxIngest />} />
            <Route path="/binders" element={<BindersTags />} />
            <Route path="/search" element={<SearchRetrieval />} />
            <Route path="/conversion" element={<ConversionTransforms />} />
            <Route path="/ocr" element={<OCRDataCapture />} />
            <Route path="/esign" element={<ESignApprovals />} />
            <Route path="/templates" element={<TemplatesMailMerge />} />
            <Route path="/workpapers" element={<WorkpapersChecklists />} />
            <Route path="/packs" element={<PacksPublishing />} />
            <Route path="/sharing" element={<SharingClientPortal />} />
            <Route path="/retention" element={<RetentionCompliance />} />
            <Route path="/audit" element={<AuditActivity />} />
            <Route path="/ai" element={<AIAssist />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<DocumentDashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default DocumentHubDashboard

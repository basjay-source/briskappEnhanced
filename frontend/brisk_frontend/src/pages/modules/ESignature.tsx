import { 
  FileSignature, 
  Send, 
  Users, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Upload,
  Plus,
  Filter,
  Search,
  FileText,
  Shield,
  History,
  Mail,
  X,
  ChevronRight,
  ChevronLeft,
  Download,
  Copy,
  MoreHorizontal,
  Calendar,
  Calendar as CalendarIcon,
  DollarSign,
  Smartphone,
  Globe,
  Zap,
  BarChart3,
  Target,
  TrendingUp,
  Activity,
  Workflow,
  MousePointer,
  Type,
  Square,
  CheckSquare,
  PenTool,
  CreditCard,
  UserCheck,
  Lock,
  Fingerprint,
  Bell,
  RefreshCw,
  ExternalLink,
  GitBranch,
  Timer,
  MapPin,
  Code,
  Database,
  Cloud,
  WifiOff,
  Settings,
  Palette,
  Image
} from 'lucide-react'
import '../../styles/signature-fonts.css'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useIsMobile } from '@/hooks/use-mobile'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function DocuSignage() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [showEnvelopeBuilder, setShowEnvelopeBuilder] = useState(false)
  const [builderStep, setBuilderStep] = useState(1)
  const [, setSelectedEnvelope] = useState<{
    id: string;
    title: string;
    status: string;
    created: string;
    dueDate: string;
    signers: number;
    completed: number;
    documents: string[];
    creator: string;
  } | null>(null)
  const [showBulkSend, setShowBulkSend] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [showSignatureFontSelector, setShowSignatureFontSelector] = useState(false)
  const [selectedSignatureFont, setSelectedSignatureFont] = useState('elegant-script')
  const [showTemplateEditor, setShowTemplateEditor] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null)
  const [templateBranding, setTemplateBranding] = useState({
    companyName: '',
    logoUrl: '',
    primaryColor: '#0B5FFF',
    secondaryColor: '#FF7A00',
    fontFamily: 'Inter'
  })
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const kpis = [
    {
      title: 'Active Envelopes',
      value: '12',
      change: '+3 this week',
      icon: FileSignature,
      color: 'text-brisk-primary',
      trend: 'up'
    },
    {
      title: 'Pending Signatures',
      value: '8',
      change: 'Awaiting response',
      icon: Clock,
      color: 'text-brisk-accent',
      trend: 'neutral'
    },
    {
      title: 'Completed (MTD)',
      value: '45',
      change: '+25% vs last month',
      icon: CheckCircle,
      color: 'text-green-600',
      trend: 'up'
    },
    {
      title: 'Conversion Rate',
      value: '94.2%',
      change: '+2.1% improvement',
      icon: Target,
      color: 'text-purple-600',
      trend: 'up'
    },
    {
      title: 'Avg. Completion',
      value: '2.3 days',
      change: '-20% faster',
      icon: Timer,
      color: 'text-blue-600',
      trend: 'down'
    },
    {
      title: 'Revenue Generated',
      value: '£24,500',
      change: '+15% this month',
      icon: DollarSign,
      color: 'text-green-600',
      trend: 'up'
    }
  ]

  const advancedAnalytics = {
    signingBehavior: {
      mobileSignatures: 68,
      desktopSignatures: 32,
      averageTimeToSign: '4.2 minutes',
      peakSigningHours: '10-11 AM, 2-3 PM'
    },
    geographicData: {
      uk: 78,
      eu: 15,
      other: 7
    },
    documentTypes: [
      { type: 'Annual Accounts', count: 23, completion: 96 },
      { type: 'Employment Contracts', count: 18, completion: 89 },
      { type: 'Service Agreements', count: 12, completion: 94 },
      { type: 'Tax Authorizations', count: 8, completion: 100 }
    ]
  }

  const envelopes = [
    {
      id: 'ENV001',
      title: 'Annual Accounts - TechCorp Ltd',
      status: 'Pending Signatures',
      created: '2024-01-20',
      dueDate: '2024-01-27',
      signers: 3,
      completed: 1,
      documents: ['Annual Accounts.pdf', 'Directors Report.pdf'],
      creator: 'Sarah Johnson'
    },
    {
      id: 'ENV002',
      title: 'Employment Contract - John Smith',
      status: 'Completed',
      created: '2024-01-18',
      dueDate: '2024-01-25',
      signers: 2,
      completed: 2,
      documents: ['Employment Contract.pdf'],
      creator: 'Mike Chen'
    },
    {
      id: 'ENV003',
      title: 'Service Agreement - ABC Services',
      status: 'Draft',
      created: '2024-01-19',
      dueDate: '2024-01-26',
      signers: 4,
      completed: 0,
      documents: ['Service Agreement.pdf', 'Terms & Conditions.pdf'],
      creator: 'Emma Wilson'
    }
  ]

  const signingRequests = [
    {
      id: 'SR001',
      envelope: 'Annual Accounts - TechCorp Ltd',
      signer: 'John Smith (Director)',
      email: 'john.smith@techcorp.com',
      status: 'Sent',
      sentDate: '2024-01-20',
      reminderCount: 1,
      position: 'Director Signature'
    },
    {
      id: 'SR002',
      envelope: 'Annual Accounts - TechCorp Ltd',
      signer: 'Jane Doe (Secretary)',
      email: 'jane.doe@techcorp.com',
      status: 'Pending',
      sentDate: '2024-01-20',
      reminderCount: 0,
      position: 'Company Secretary'
    },
    {
      id: 'SR003',
      envelope: 'Service Agreement - ABC Services',
      signer: 'Robert Brown (CEO)',
      email: 'robert@abcservices.com',
      status: 'Viewed',
      sentDate: '2024-01-19',
      reminderCount: 2,
      position: 'CEO Signature'
    }
  ]

  const templates = [
    {
      id: 'TPL001',
      name: 'Annual Accounts Package',
      description: 'Standard annual accounts with director signatures',
      fields: ['Director Signature', 'Company Secretary', 'Date'],
      usage: 45,
      lastUsed: '2024-01-20',
      category: 'Accounts',
      hasConditionalLogic: true,
      hasPaymentCollection: false,
      version: '2.1'
    },
    {
      id: 'TPL002',
      name: 'Employment Contract',
      description: 'New employee contract template',
      fields: ['Employee Signature', 'HR Manager', 'Start Date'],
      usage: 23,
      lastUsed: '2024-01-18',
      category: 'HR',
      hasConditionalLogic: false,
      hasPaymentCollection: false,
      version: '1.3'
    },
    {
      id: 'TPL003',
      name: 'Service Agreement with Payment',
      description: 'Client service agreement with payment collection',
      fields: ['Client Signature', 'Account Manager', 'Service Date', 'Payment'],
      usage: 12,
      lastUsed: '2024-01-15',
      category: 'Legal',
      hasConditionalLogic: true,
      hasPaymentCollection: true,
      version: '1.0'
    },
    {
      id: 'TPL004',
      name: 'Tax Authorization Form',
      description: 'HMRC authorization with identity verification',
      fields: ['Client Signature', 'ID Verification', 'Date'],
      usage: 34,
      lastUsed: '2024-01-22',
      category: 'Tax',
      hasConditionalLogic: false,
      hasPaymentCollection: false,
      version: '3.2'
    }
  ]

  const workflowTemplates = [
    {
      id: 'WF001',
      name: 'Sequential Director Approval',
      description: 'CEO → CFO → Company Secretary',
      steps: 3,
      avgCompletion: '2.1 days'
    },
    {
      id: 'WF002',
      name: 'Parallel Team Approval',
      description: 'All department heads simultaneously',
      steps: 1,
      avgCompletion: '1.3 days'
    },
    {
      id: 'WF003',
      name: 'Conditional Approval Chain',
      description: 'Route based on document value',
      steps: 'Variable',
      avgCompletion: '1.8 days'
    }
  ]

  // Comprehensive signature font library for DocuSignage
  const signatureFonts = [
    { id: 'elegant-script', name: 'Elegant Script', family: 'Dancing Script', preview: 'John Smith', style: 'cursive' },
    { id: 'classic-signature', name: 'Classic Signature', family: 'Great Vibes', preview: 'John Smith', style: 'cursive' },
    { id: 'modern-handwriting', name: 'Modern Handwriting', family: 'Kalam', preview: 'John Smith', style: 'handwriting' },
    { id: 'professional-script', name: 'Professional Script', family: 'Allura', preview: 'John Smith', style: 'cursive' },
    { id: 'bold-signature', name: 'Bold Signature', family: 'Pacifico', preview: 'John Smith', style: 'display' },
    { id: 'refined-cursive', name: 'Refined Cursive', family: 'Alex Brush', preview: 'John Smith', style: 'cursive' },
    { id: 'executive-style', name: 'Executive Style', family: 'Satisfy', preview: 'John Smith', style: 'cursive' },
    { id: 'artistic-flow', name: 'Artistic Flow', family: 'Tangerine', preview: 'John Smith', style: 'cursive' },
    { id: 'formal-script', name: 'Formal Script', family: 'Pinyon Script', preview: 'John Smith', style: 'cursive' },
    { id: 'casual-handwriting', name: 'Casual Handwriting', family: 'Caveat', preview: 'John Smith', style: 'handwriting' },
    { id: 'luxury-signature', name: 'Luxury Signature', family: 'Herr Von Muellerhoff', preview: 'John Smith', style: 'cursive' },
    { id: 'vintage-script', name: 'Vintage Script', family: 'Mr Dafoe', preview: 'John Smith', style: 'cursive' },
    { id: 'contemporary-flow', name: 'Contemporary Flow', family: 'Amatic SC', preview: 'John Smith', style: 'handwriting' },
    { id: 'distinguished-cursive', name: 'Distinguished Cursive', family: 'Courgette', preview: 'John Smith', style: 'cursive' },
    { id: 'sleek-signature', name: 'Sleek Signature', family: 'Homemade Apple', preview: 'John Smith', style: 'handwriting' },
    { id: 'royal-script', name: 'Royal Script', family: 'Euphoria Script', preview: 'John Smith', style: 'cursive' },
    { id: 'minimalist-hand', name: 'Minimalist Hand', family: 'Patrick Hand', preview: 'John Smith', style: 'handwriting' },
    { id: 'flowing-cursive', name: 'Flowing Cursive', family: 'Yellowtail', preview: 'John Smith', style: 'cursive' },
    { id: 'business-signature', name: 'Business Signature', family: 'Shadows Into Light', preview: 'John Smith', style: 'handwriting' },
    { id: 'elegant-handwriting', name: 'Elegant Handwriting', family: 'Indie Flower', preview: 'John Smith', style: 'handwriting' }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'Pending Signatures':
      case 'Sent':
      case 'Pending':
        return <Clock className="h-4 w-4 text-brisk-primary" />
      case 'Draft':
        return <Edit className="h-4 w-4 text-gray-500" />
      case 'Viewed':
        return <Eye className="h-4 w-4 text-blue-500" />
      case 'Overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <FileSignature className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-50'
      case 'Pending Signatures':
      case 'Sent':
      case 'Pending':
        return 'text-brisk-primary bg-brisk-primary-50'
      case 'Draft':
        return 'text-gray-600 bg-gray-50'
      case 'Viewed':
        return 'text-blue-600 bg-blue-50'
      case 'Overdue':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <ResponsiveLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">DocuSignage</h1>
            <p className="text-gray-600">Advanced document signing with comprehensive signature fonts and workflow automation</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {!isOnline && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <WifiOff className="h-3 w-3" />
                Offline Mode
              </Badge>
            )}
            <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={() => setShowSignatureFontSelector(true)}>
              <Type className="h-4 w-4 mr-2" />
              Signature Fonts
            </Button>
            <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={() => setShowBulkSend(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Bulk Send
            </Button>
            <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={() => setShowAnalytics(true)}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button variant="outline" size={isMobile ? "sm" : "default"}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size={isMobile ? "sm" : "default"} onClick={() => setShowEnvelopeBuilder(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Envelope
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-6'}`}>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="envelopes">Envelopes</TabsTrigger>
            <TabsTrigger value="signing">Signing</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {kpis.map((kpi, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                        <p className="text-2xl font-bold">{kpi.value}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {kpi.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                          {kpi.trend === 'down' && <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />}
                          {kpi.trend === 'neutral' && <Activity className="h-3 w-3 text-gray-500" />}
                          <p className="text-xs text-gray-500">{kpi.change}</p>
                        </div>
                      </div>
                      <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-brisk-primary" />
                    Real-time Activity Feed
                  </CardTitle>
                  <CardDescription>Live updates on signing activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">John Smith signed Annual Accounts - TechCorp Ltd</p>
                        <p className="text-xs text-gray-500">2 minutes ago • Mobile device • London, UK</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Eye className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Sarah Johnson viewed Employment Contract</p>
                        <p className="text-xs text-gray-500">5 minutes ago • Desktop • Manchester, UK</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <Send className="h-5 w-5 text-orange-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Service Agreement sent to 3 signers</p>
                        <p className="text-xs text-gray-500">12 minutes ago • Bulk operation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Payment of £2,500 collected via envelope</p>
                        <p className="text-xs text-gray-500">18 minutes ago • Stripe integration</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-brisk-accent" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" onClick={() => setShowEnvelopeBuilder(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Envelope
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => setShowBulkSend(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Send
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Integration Shortcuts</h4>
                    <Button className="w-full justify-start text-xs" variant="ghost" size="sm">
                      <FileSignature className="h-3 w-3 mr-2" />
                      Accounts Approval
                    </Button>
                    <Button className="w-full justify-start text-xs" variant="ghost" size="sm">
                      <Users className="h-3 w-3 mr-2" />
                      HR Documents
                    </Button>
                    <Button className="w-full justify-start text-xs" variant="ghost" size="sm">
                      <Shield className="h-3 w-3 mr-2" />
                      Company Secretarial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Envelopes
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>Latest signing workflows with real-time status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {envelopes.slice(0, 3).map((envelope) => (
                      <div key={envelope.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{envelope.title}</p>
                            <Badge className={getStatusColor(envelope.status)}>
                              {envelope.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{envelope.completed}/{envelope.signers} signatures</span>
                            <span>Due: {envelope.dueDate}</span>
                            <span className="flex items-center gap-1">
                              <Smartphone className="h-3 w-3" />
                              Mobile-ready
                            </span>
                          </div>
                          <Progress value={(envelope.completed / envelope.signers) * 100} className="mt-2 h-1" />
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {getStatusIcon(envelope.status)}
                          <Button variant="ghost" size="sm" onClick={() => setSelectedEnvelope(envelope)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-brisk-primary" />
                    Global Signing Insights
                  </CardTitle>
                  <CardDescription>Advanced analytics and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium">Mobile Signatures</p>
                        <p className="text-sm text-gray-600">68% of all signatures</p>
                      </div>
                      <Smartphone className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Avg. Sign Time</p>
                        <p className="text-sm text-gray-600">4.2 minutes</p>
                      </div>
                      <Timer className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                      <div>
                        <p className="font-medium">Peak Hours</p>
                        <p className="text-sm text-gray-600">10-11 AM, 2-3 PM</p>
                      </div>
                      <Clock className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <div>
                        <p className="font-medium">Revenue Impact</p>
                        <p className="text-sm text-gray-600">£24,500 this month</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-brisk-primary" />
                  Security and Compliance
                </CardTitle>
                <CardDescription>Digital signature security and audit information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900">Security Status</h3>
                    <p className="text-sm text-green-700">All signatures use 256-bit encryption with tamper-evident seals. Certificate authority validation active.</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Compliance</h3>
                    <p className="text-sm text-blue-700">eIDAS compliant signatures. Full audit trail maintained for all documents. Legal validity ensured.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-900">Audit Trail</h3>
                    <p className="text-sm text-purple-700">Complete signing history tracked: IP addresses, timestamps, device information, and authentication methods.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="envelopes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Advanced Envelope Management</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowBulkSend(true)}>
                      <Upload className="h-4 w-4 mr-2" />
                      Bulk Actions
                    </Button>
                    <Button size="sm" onClick={() => setShowEnvelopeBuilder(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Envelope
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>Comprehensive envelope management with advanced features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search envelopes, signers, or content..." className="pl-10" />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending Signatures</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="payment-pending">Payment Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Document Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="accounts">Annual Accounts</SelectItem>
                      <SelectItem value="contracts">Contracts</SelectItem>
                      <SelectItem value="tax">Tax Documents</SelectItem>
                      <SelectItem value="hr">HR Documents</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filter
                  </Button>
                </div>

                <div className="space-y-4">
                  {envelopes.map((envelope) => (
                    <Card key={envelope.id} className="border-l-4 border-l-brisk-primary hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{envelope.title}</h3>
                              <Badge className={getStatusColor(envelope.status)}>
                                {envelope.status}
                              </Badge>
                              <Badge variant="outline">{envelope.id}</Badge>
                              {envelope.status === 'Pending Signatures' && (
                                <Badge variant="destructive" className="animate-pulse">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-gray-600 mb-2">
                              <span>Created: {envelope.created}</span>
                              <span>Due: {envelope.dueDate}</span>
                              <span>Signatures: {envelope.completed}/{envelope.signers}</span>
                              <span className="flex items-center gap-1">
                                <Smartphone className="h-3 w-3" />
                                Mobile-ready
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <Progress value={(envelope.completed / envelope.signers) * 100} className="flex-1 h-2" />
                              <span className="text-xs text-gray-500">
                                {Math.round((envelope.completed / envelope.signers) * 100)}%
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {envelope.documents.map((doc, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  <FileText className="h-3 w-3 mr-1" />
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Created by: {envelope.creator}</span>
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Shield className="h-3 w-3" />
                                  Encrypted
                                </span>
                                <span className="flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  eIDAS Compliant
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => setSelectedEnvelope(envelope)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Send className="h-4 w-4 mr-2" />
                              Send
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="h-5 w-5 text-brisk-primary" />
                  Advanced Signing Management
                </CardTitle>
                <CardDescription>Real-time tracking with mobile optimization and identity verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 mb-6 md:grid-cols-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Mobile Signatures</p>
                        <p className="text-lg font-bold">68%</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">ID Verified</p>
                        <p className="text-lg font-bold">94%</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <Timer className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium">Avg. Sign Time</p>
                        <p className="text-lg font-bold">4.2m</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">Global Reach</p>
                        <p className="text-lg font-bold">23 Countries</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  {signingRequests.map((request) => (
                    <Card key={request.id} className="border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{request.signer}</h3>
                              <Badge className={getStatusColor(request.status)}>
                                {request.status}
                              </Badge>
                              <Badge variant="outline">{request.position}</Badge>
                              {request.status === 'Viewed' && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  Recently Viewed
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Envelope: {request.envelope}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {request.email}
                              </span>
                              <span>Sent: {request.sentDate}</span>
                              <span>Reminders: {request.reminderCount}</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                Location tracked
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Lock className="h-3 w-3" />
                                SMS Authentication
                              </span>
                              <span className="flex items-center gap-1">
                                <Fingerprint className="h-3 w-3" />
                                Biometric Ready
                              </span>
                              <span className="flex items-center gap-1">
                                <Shield className="h-3 w-3" />
                                ID Verification
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Smartphone className="h-4 w-4 mr-2" />
                              SMS
                            </Button>
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4 mr-2" />
                              Remind
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <History className="h-4 w-4 mr-2" />
                              History
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-brisk-primary" />
                      Advanced Template Library
                    </CardTitle>
                    <CardDescription>Smart templates with conditional logic, payment collection, and industry-specific designs</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={() => setShowTemplateEditor(true)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Template Settings
                    </Button>
                    <Button size={isMobile ? "sm" : "default"}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Template
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="accounts">Accounts</SelectItem>
                      <SelectItem value="hr">HR Documents</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="tax">Tax</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Features" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Features</SelectItem>
                      <SelectItem value="conditional">Conditional Logic</SelectItem>
                      <SelectItem value="payment">Payment Collection</SelectItem>
                      <SelectItem value="verification">ID Verification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {templates.map((template) => (
                    <Card key={template.id} className="border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{template.name}</h3>
                              <Badge variant="outline">Used {template.usage} times</Badge>
                              <Badge variant="secondary">{template.category}</Badge>
                              <Badge variant="outline" className="text-xs">v{template.version}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {template.fields.map((field, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {field === 'Director Signature' && <PenTool className="h-3 w-3 mr-1" />}
                                  {field === 'Payment' && <CreditCard className="h-3 w-3 mr-1" />}
                                  {field === 'ID Verification' && <UserCheck className="h-3 w-3 mr-1" />}
                                  {field === 'Date' && <Calendar className="h-3 w-3 mr-1" />}
                                  {!['Director Signature', 'Payment', 'ID Verification', 'Date'].includes(field) && <Type className="h-3 w-3 mr-1" />}
                                  {field}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                              <span>Last used: {template.lastUsed}</span>
                              {template.hasConditionalLogic && (
                                <span className="flex items-center gap-1 text-blue-600">
                                  <GitBranch className="h-3 w-3" />
                                  Conditional Logic
                                </span>
                              )}
                              {template.hasPaymentCollection && (
                                <span className="flex items-center gap-1 text-green-600">
                                  <CreditCard className="h-3 w-3" />
                                  Payment Collection
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Shield className="h-3 w-3" />
                                eIDAS Compliant
                              </span>
                              <span className="flex items-center gap-1">
                                <Smartphone className="h-3 w-3" />
                                Mobile Optimized
                              </span>
                              <span className="flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                Multi-language
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                            <Button variant="outline" size="sm">
                              <Copy className="h-4 w-4 mr-2" />
                              Clone
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedTemplate(template)
                                setShowTemplateEditor(true)
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button size="sm" onClick={() => setShowEnvelopeBuilder(true)}>
                              <Plus className="h-4 w-4 mr-2" />
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5 text-brisk-primary" />
                      Create Advanced Template
                    </CardTitle>
                    <CardDescription>Build sophisticated templates with conditional logic, payment collection, and custom branding</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">Blank Template</h3>
                          <p className="text-sm text-gray-600 mb-3">Start from scratch</p>
                          <Button size="sm" variant="outline">Create</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <Upload className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">Upload & Convert</h3>
                          <p className="text-sm text-gray-600 mb-3">Convert existing PDF</p>
                          <Button size="sm" variant="outline">Upload</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <Workflow className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">Smart Workflow</h3>
                          <p className="text-sm text-gray-600 mb-3">Conditional routing</p>
                          <Button size="sm" variant="outline">Build</Button>
                        </CardContent>
                      </Card>

                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <CreditCard className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">Payment Template</h3>
                          <p className="text-sm text-gray-600 mb-3">Collect payments</p>
                          <Button size="sm" variant="outline">Setup</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-brisk-primary" />
                  Advanced Workflow Automation
                </CardTitle>
                <CardDescription>Create intelligent signing workflows with conditional logic and automated routing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Workflow Templates</h3>
                    {workflowTemplates.map((workflow) => (
                      <Card key={workflow.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{workflow.name}</h4>
                            <Badge variant="outline">{workflow.steps} steps</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{workflow.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Avg: {workflow.avgCompletion}</span>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-2" />
                              Customize
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Workflow Builder</h3>
                    <Card className="border-2 border-dashed border-gray-200">
                      <CardContent className="p-8 text-center">
                        <Workflow className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Create Custom Workflow</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Build sophisticated signing workflows with conditional logic, parallel processing, and automated escalation
                        </p>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Start Building
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Workflow Features</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <GitBranch className="h-4 w-4 text-brisk-primary" />
                          <span className="text-sm">Conditional routing based on document values</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-brisk-primary" />
                          <span className="text-sm">Parallel and sequential signing options</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-brisk-primary" />
                          <span className="text-sm">Automated reminders and escalation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-brisk-primary" />
                          <span className="text-sm">Identity verification requirements</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-brisk-primary" />
                  Module Integrations & API
                </CardTitle>
                <CardDescription>Seamless integration with all Brisk Practice Suite modules and external systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Brisk Module Integrations</h3>
                    <div className="space-y-3">
                      <Card className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileSignature className="h-8 w-8 text-blue-600" />
                              <div>
                                <h4 className="font-medium">Accounts Production</h4>
                                <p className="text-sm text-gray-600">Director approval workflows</p>
                              </div>
                            </div>
                            <Badge variant="secondary">Active</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Users className="h-8 w-8 text-green-600" />
                              <div>
                                <h4 className="font-medium">Payroll & HR</h4>
                                <p className="text-sm text-gray-600">Employment contracts & policies</p>
                              </div>
                            </div>
                            <Badge variant="secondary">Active</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Shield className="h-8 w-8 text-purple-600" />
                              <div>
                                <h4 className="font-medium">Company Secretarial</h4>
                                <p className="text-sm text-gray-600">Board resolutions & filings</p>
                              </div>
                            </div>
                            <Badge variant="secondary">Active</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="h-8 w-8 text-orange-600" />
                              <div>
                                <h4 className="font-medium">Tax Modules</h4>
                                <p className="text-sm text-gray-600">Client authorization forms</p>
                              </div>
                            </div>
                            <Badge variant="secondary">Active</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">External Integrations</h3>
                    <div className="space-y-3">
                      <Card className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-8 w-8 text-blue-600" />
                              <div>
                                <h4 className="font-medium">Payment Processing</h4>
                                <p className="text-sm text-gray-600">Stripe, PayPal integration</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Configure
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <UserCheck className="h-8 w-8 text-green-600" />
                              <div>
                                <h4 className="font-medium">Identity Verification</h4>
                                <p className="text-sm text-gray-600">Onfido, Jumio integration</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Setup
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Cloud className="h-8 w-8 text-purple-600" />
                              <div>
                                <h4 className="font-medium">Cloud Storage</h4>
                                <p className="text-sm text-gray-600">Google Drive, Dropbox sync</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Connect
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Database className="h-8 w-8 text-orange-600" />
                              <div>
                                <h4 className="font-medium">API & Webhooks</h4>
                                <p className="text-sm text-gray-600">Custom integrations</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Manage
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Advanced Envelope Builder Modal */}
        <Dialog open={showEnvelopeBuilder} onOpenChange={setShowEnvelopeBuilder}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileSignature className="h-5 w-5 text-brisk-primary" />
                Advanced Envelope Builder
              </DialogTitle>
              <DialogDescription>
                Create sophisticated signing workflows with conditional logic and payment collection
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className={`flex items-center gap-2 ${step <= builderStep ? 'text-brisk-primary' : 'text-gray-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= builderStep ? 'bg-brisk-primary text-white' : 'bg-gray-200'
                      }`}>
                        {step}
                      </div>
                      {step < 5 && <ChevronRight className="h-4 w-4" />}
                    </div>
                  ))}
                </div>
                <Button variant="outline" onClick={() => setShowEnvelopeBuilder(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {builderStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Step 1: Document Upload & Template Selection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <Upload className="h-8 w-8 text-brisk-primary mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">Upload Documents</h3>
                          <p className="text-sm text-gray-600">PDF, Word, or image files</p>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-dashed border-gray-200 hover:border-brisk-primary transition-colors cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <FileText className="h-8 w-8 text-brisk-primary mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">Use Template</h3>
                          <p className="text-sm text-gray-600">Start from existing template</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={() => setBuilderStep(2)}>
                        Next: Signers <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {builderStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Step 2: Signer Management & Authentication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Signer Name</Label>
                          <Input placeholder="John Smith" />
                        </div>
                        <div>
                          <Label>Email Address</Label>
                          <Input placeholder="john@company.com" />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Role/Position</Label>
                          <Input placeholder="Director" />
                        </div>
                        <div>
                          <Label>Authentication Method</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email verification</SelectItem>
                              <SelectItem value="sms">SMS PIN</SelectItem>
                              <SelectItem value="id">ID verification</SelectItem>
                              <SelectItem value="biometric">Biometric</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mobile-optimized" />
                        <Label htmlFor="mobile-optimized">Mobile-optimized signing experience</Label>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setBuilderStep(1)}>
                        <ChevronLeft className="h-4 w-4 mr-2" /> Back
                      </Button>
                      <Button onClick={() => setBuilderStep(3)}>
                        Next: Fields <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {builderStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Step 3: Field Placement & Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <PenTool className="h-4 w-4" />
                        Signature
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Type className="h-4 w-4" />
                        Text Field
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Square className="h-4 w-4" />
                        Checkbox
                      </Button>
                    </div>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                      <MousePointer className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Document preview will appear here</p>
                      <p className="text-sm text-gray-500">Drag and drop fields onto the document</p>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setBuilderStep(2)}>
                        <ChevronLeft className="h-4 w-4 mr-2" /> Back
                      </Button>
                      <Button onClick={() => setBuilderStep(4)}>
                        Next: Workflow <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {builderStep === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Step 4: Workflow & Payment Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label>Signing Order</Label>
                        <RadioGroup defaultValue="sequential">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sequential" id="sequential" />
                            <Label htmlFor="sequential">Sequential (one after another)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="parallel" id="parallel" />
                            <Label htmlFor="parallel">Parallel (all at once)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="conditional" id="conditional" />
                            <Label htmlFor="conditional">Conditional (based on responses)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="payment-collection" />
                        <Label htmlFor="payment-collection">Enable payment collection</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-reminders" />
                        <Label htmlFor="auto-reminders">Automatic reminder emails</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="custom-branding" />
                        <Label htmlFor="custom-branding">Custom branding</Label>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setBuilderStep(3)}>
                        <ChevronLeft className="h-4 w-4 mr-2" /> Back
                      </Button>
                      <Button onClick={() => setBuilderStep(5)}>
                        Next: Review <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {builderStep === 5 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Step 5: Review & Send</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="font-semibold text-green-900 mb-2">Envelope Summary</h3>
                        <div className="grid gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Documents:</span>
                            <span>1 PDF uploaded</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Signers:</span>
                            <span>3 recipients</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fields:</span>
                            <span>5 signature fields</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Workflow:</span>
                            <span>Sequential signing</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label>Envelope Title</Label>
                        <Input placeholder="Annual Accounts - Company Name" />
                      </div>
                      <div>
                        <Label>Message to Signers</Label>
                        <Textarea placeholder="Please review and sign the attached documents..." />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setBuilderStep(4)}>
                        <ChevronLeft className="h-4 w-4 mr-2" /> Back
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          Save as Draft
                        </Button>
                        <Button onClick={() => setShowEnvelopeBuilder(false)}>
                          <Send className="h-4 w-4 mr-2" />
                          Send Envelope
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Bulk Send Modal */}
        <Dialog open={showBulkSend} onOpenChange={setShowBulkSend}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-brisk-primary" />
                Bulk Envelope Operations
              </DialogTitle>
              <DialogDescription>
                Send multiple envelopes or perform bulk actions on existing envelopes
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Tabs defaultValue="bulk-send">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bulk-send">Bulk Send</TabsTrigger>
                  <TabsTrigger value="bulk-actions">Bulk Actions</TabsTrigger>
                </TabsList>
                <TabsContent value="bulk-send" className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <Label>Upload CSV File</Label>
                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Drop CSV file here or click to browse</p>
                            <p className="text-xs text-gray-500">Required columns: Name, Email, Role</p>
                          </div>
                        </div>
                        <div>
                          <Label>Select Template</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose template" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="accounts">Annual Accounts Package</SelectItem>
                              <SelectItem value="employment">Employment Contract</SelectItem>
                              <SelectItem value="service">Service Agreement</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="bulk-actions" className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Send Reminders
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Data
                          </Button>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh Status
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">Select envelopes from the main list to perform bulk actions</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>

        {/* Analytics Modal */}
        <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-brisk-primary" />
                Advanced Analytics Dashboard
              </DialogTitle>
              <DialogDescription>
                Comprehensive insights into signing behavior, performance metrics, and business impact
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Conversion Rate</p>
                        <p className="text-lg font-bold">94.2%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Timer className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Avg. Completion</p>
                        <p className="text-lg font-bold">2.3 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">Mobile Usage</p>
                        <p className="text-lg font-bold">68%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Revenue Impact</p>
                        <p className="text-lg font-bold">£24.5K</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Type Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {advancedAnalytics.documentTypes.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{doc.type}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={doc.completion} className="w-20 h-2" />
                            <span className="text-sm font-medium">{doc.completion}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Geographic Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">United Kingdom</span>
                        <span className="text-sm font-medium">{advancedAnalytics.geographicData.uk}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">European Union</span>
                        <span className="text-sm font-medium">{advancedAnalytics.geographicData.eu}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Other Countries</span>
                        <span className="text-sm font-medium">{advancedAnalytics.geographicData.other}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Signature Font Selector Dialog */}
        <Dialog open={showSignatureFontSelector} onOpenChange={setShowSignatureFontSelector}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Type className="h-5 w-5 text-brisk-primary" />
                DocuSignage Signature Font Library
              </DialogTitle>
              <DialogDescription>
                Choose from our comprehensive collection of elegant signature fonts for professional document signing
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {signatureFonts.map((font) => (
                  <Card 
                    key={font.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedSignatureFont === font.id ? 'ring-2 ring-brisk-primary border-brisk-primary' : ''
                    }`}
                    onClick={() => setSelectedSignatureFont(font.id)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm">{font.name}</h3>
                          <Badge variant={font.style === 'cursive' ? 'default' : 'secondary'}>
                            {font.style}
                          </Badge>
                        </div>
                        <div 
                          className="text-2xl text-center py-4 border rounded-lg bg-gray-50"
                          style={{ fontFamily: font.family }}
                        >
                          {font.preview}
                        </div>
                        <div className="text-xs text-gray-500 text-center">
                          Font: {font.family}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold">Preview Your Signature</h3>
                  <div className="border rounded-lg p-6 bg-white">
                    <div className="space-y-4">
                      <Label htmlFor="signature-preview">Type your name to preview:</Label>
                      <Input 
                        id="signature-preview"
                        placeholder="Enter your full name"
                        className="text-lg"
                      />
                      <div className="border-t pt-4">
                        <div 
                          className="text-3xl text-center py-6"
                          style={{ 
                            fontFamily: signatureFonts.find(f => f.id === selectedSignatureFont)?.family || 'Dancing Script'
                          }}
                        >
                          John Smith
                        </div>
                        <p className="text-sm text-gray-500 text-center">
                          Selected: {signatureFonts.find(f => f.id === selectedSignatureFont)?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  {signatureFonts.length} professional signature fonts available
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowSignatureFontSelector(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowSignatureFontSelector(false)}>
                    Apply Font
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Template Editor Dialog */}
        <Dialog open={showTemplateEditor} onOpenChange={setShowTemplateEditor}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Template Editor
              </DialogTitle>
              <DialogDescription>
                Customize template appearance, branding, and field configuration
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <Tabs defaultValue="branding" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="branding">Branding</TabsTrigger>
                  <TabsTrigger value="fields">Fields</TabsTrigger>
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="branding" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Company Branding
                      </CardTitle>
                      <CardDescription>
                        Customize your company's appearance in documents
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input
                              id="company-name"
                              value={templateBranding.companyName}
                              onChange={(e) => setTemplateBranding({
                                ...templateBranding,
                                companyName: e.target.value
                              })}
                              placeholder="Enter company name"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="primary-color">Primary Color</Label>
                            <div className="flex gap-2">
                              <Input
                                id="primary-color"
                                type="color"
                                value={templateBranding.primaryColor}
                                onChange={(e) => setTemplateBranding({
                                  ...templateBranding,
                                  primaryColor: e.target.value
                                })}
                                className="w-16 h-10"
                              />
                              <Input
                                value={templateBranding.primaryColor}
                                onChange={(e) => setTemplateBranding({
                                  ...templateBranding,
                                  primaryColor: e.target.value
                                })}
                                placeholder="#0B5FFF"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="secondary-color">Secondary Color</Label>
                            <div className="flex gap-2">
                              <Input
                                id="secondary-color"
                                type="color"
                                value={templateBranding.secondaryColor}
                                onChange={(e) => setTemplateBranding({
                                  ...templateBranding,
                                  secondaryColor: e.target.value
                                })}
                                className="w-16 h-10"
                              />
                              <Input
                                value={templateBranding.secondaryColor}
                                onChange={(e) => setTemplateBranding({
                                  ...templateBranding,
                                  secondaryColor: e.target.value
                                })}
                                placeholder="#FF7A00"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="font-family">Font Family</Label>
                            <Select
                              value={templateBranding.fontFamily}
                              onValueChange={(value) => setTemplateBranding({
                                ...templateBranding,
                                fontFamily: value
                              })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Inter">Inter</SelectItem>
                                <SelectItem value="Roboto">Roboto</SelectItem>
                                <SelectItem value="Open Sans">Open Sans</SelectItem>
                                <SelectItem value="Lato">Lato</SelectItem>
                                <SelectItem value="Montserrat">Montserrat</SelectItem>
                                <SelectItem value="Poppins">Poppins</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label>Company Logo</Label>
                            <div 
                              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                                dragActive ? 'border-brisk-primary bg-blue-50' : 'border-gray-300'
                              }`}
                              onDragOver={(e) => {
                                e.preventDefault()
                                setDragActive(true)
                              }}
                              onDragLeave={() => setDragActive(false)}
                              onDrop={(e) => {
                                e.preventDefault()
                                setDragActive(false)
                                const files = Array.from(e.dataTransfer.files)
                                if (files.length > 0 && files[0].type.startsWith('image/')) {
                                  const reader = new FileReader()
                                  reader.onload = (event) => {
                                    setTemplateBranding({
                                      ...templateBranding,
                                      logoUrl: event.target?.result as string
                                    })
                                  }
                                  reader.readAsDataURL(files[0])
                                }
                              }}
                            >
                              {templateBranding.logoUrl ? (
                                <div className="space-y-3">
                                  <img 
                                    src={templateBranding.logoUrl} 
                                    alt="Company Logo" 
                                    className="max-h-20 mx-auto"
                                  />
                                  <div className="flex gap-2 justify-center">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => setTemplateBranding({
                                        ...templateBranding,
                                        logoUrl: ''
                                      })}
                                    >
                                      Remove
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      Replace
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <Image className="h-12 w-12 text-gray-400 mx-auto" />
                                  <div>
                                    <p className="text-sm font-medium">Drop logo here or click to upload</p>
                                    <p className="text-xs text-gray-500">PNG, JPG, SVG up to 2MB</p>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Choose File
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-medium mb-2">Branding Preview</h4>
                            <div 
                              className="p-4 bg-white rounded border"
                              style={{ 
                                fontFamily: templateBranding.fontFamily,
                                borderColor: templateBranding.primaryColor
                              }}
                            >
                              {templateBranding.logoUrl && (
                                <img 
                                  src={templateBranding.logoUrl} 
                                  alt="Logo" 
                                  className="h-8 mb-2"
                                />
                              )}
                              <h5 
                                className="font-semibold"
                                style={{ color: templateBranding.primaryColor }}
                              >
                                {templateBranding.companyName || 'Your Company Name'}
                              </h5>
                              <p className="text-sm text-gray-600">Sample document content</p>
                              <div 
                                className="mt-2 px-3 py-1 rounded text-white text-sm inline-block"
                                style={{ backgroundColor: templateBranding.secondaryColor }}
                              >
                                Action Button
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="fields" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Template Fields</CardTitle>
                      <CardDescription>
                        Configure signature fields, text inputs, and other form elements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                          <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
                            <Type className="h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">Signature</div>
                              <div className="text-xs text-gray-500">Digital signature field</div>
                            </div>
                          </Button>
                          <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
                            <FileText className="h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">Text Field</div>
                              <div className="text-xs text-gray-500">Single line input</div>
                            </div>
                          </Button>
                          <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
                            <CheckSquare className="h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">Checkbox</div>
                              <div className="text-xs text-gray-500">Yes/No selection</div>
                            </div>
                          </Button>
                          <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
                            <CalendarIcon className="h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">Date</div>
                              <div className="text-xs text-gray-500">Date picker field</div>
                            </div>
                          </Button>
                        </div>
                        
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                          <MousePointer className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Document preview will appear here</p>
                          <p className="text-sm text-gray-500">Drag and drop fields onto the document</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="layout" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Layout Settings</CardTitle>
                      <CardDescription>
                        Configure document layout, margins, and positioning
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <div>
                            <Label>Page Size</Label>
                            <Select defaultValue="a4">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="a4">A4 (210 × 297 mm)</SelectItem>
                                <SelectItem value="letter">Letter (8.5 × 11 in)</SelectItem>
                                <SelectItem value="legal">Legal (8.5 × 14 in)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label>Orientation</Label>
                            <RadioGroup defaultValue="portrait">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="portrait" id="portrait" />
                                <Label htmlFor="portrait">Portrait</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="landscape" id="landscape" />
                                <Label htmlFor="landscape">Landscape</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label>Margins (mm)</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <Input placeholder="Top" defaultValue="20" />
                              <Input placeholder="Right" defaultValue="20" />
                              <Input placeholder="Bottom" defaultValue="20" />
                              <Input placeholder="Left" defaultValue="20" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label>Header</Label>
                            <Textarea 
                              placeholder="Enter header content..."
                              className="min-h-[80px]"
                            />
                          </div>
                          
                          <div>
                            <Label>Footer</Label>
                            <Textarea 
                              placeholder="Enter footer content..."
                              className="min-h-[80px]"
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch id="page-numbers" />
                            <Label htmlFor="page-numbers">Show page numbers</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Template Preview</CardTitle>
                      <CardDescription>
                        Preview how your template will appear to signers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-lg p-6 bg-white min-h-[400px]">
                        <div className="space-y-4">
                          {templateBranding.logoUrl && (
                            <div className="flex justify-center">
                              <img 
                                src={templateBranding.logoUrl} 
                                alt="Company Logo" 
                                className="max-h-16"
                              />
                            </div>
                          )}
                          
                          <div className="text-center">
                            <h3 
                              className="text-xl font-semibold mb-2"
                              style={{ 
                                color: templateBranding.primaryColor,
                                fontFamily: templateBranding.fontFamily
                              }}
                            >
                              {templateBranding.companyName || 'Your Company Name'}
                            </h3>
                            <h4 className="text-lg font-medium mb-4">
                              {selectedTemplate?.name || 'Document Template'}
                            </h4>
                          </div>

                          <div className="space-y-4">
                            <p className="text-gray-700">
                              This is a preview of your customized template. The actual document will include your content and signature fields as configured.
                            </p>
                            
                            <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                              <Type className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Signature Field</p>
                            </div>

                            <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                              <CalendarIcon className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Date Field</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  Template changes will be saved automatically
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowTemplateEditor(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowTemplateEditor(false)}>
                    Save Template
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ResponsiveLayout>
  )
}

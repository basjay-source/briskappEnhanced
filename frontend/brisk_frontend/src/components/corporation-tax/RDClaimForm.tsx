import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Save, 
  X, 
  Edit, 
  FileText,
  Calculator,
  Users,
  Building2,
  DollarSign
} from 'lucide-react'

export interface RDClaimData {
  id?: string
  projectName: string
  projectDescription: string
  companyName: string
  companyNumber: string
  utr: string
  accountingPeriodStart: string
  accountingPeriodEnd: string
  status: 'draft' | 'in-progress' | 'submitted' | 'approved' | 'rejected'
  claimType: 'SME' | 'RDEC' | 'Merged'
  
  staffCosts: number
  staffDirectlyEmployed: number
  staffExternallyProvided: number
  staffNICosts: number
  staffPensionCosts: number
  staffBenefitsCosts: number
  
  subcontractorCosts: number
  subcontractorRDCosts: number
  subcontractorNonRDCosts: number
  
  consumablesCosts: number
  materialsPrototyping: number
  materialsRawMaterials: number
  materialsDisposables: number
  
  softwareCosts: number
  softwareLicenses: number
  softwareCloudServices: number
  softwareDataStorage: number
  
  clinicalTrialCosts: number
  clinicalTrialVolunteerCosts: number
  clinicalTrialEthicsApproval: number
  
  otherCosts: number
  otherUtilities: number
  otherEquipment: number
  
  totalQualifyingExpenditure: number
  enhancementRate: number
  totalEnhancement: number
  reliefClaimed: number
  taxCredit: number
  
  staffCount: number
  projectManager: string
  technicalLead: string
  teamMembers: string
  
  projectStartDate: string
  projectEndDate: string
  milestonesAchieved: string
  currentPhase: string
  
  // Technical Narratives
  technicalDescription: string
  uncertaintyDescription: string
  advancementDescription: string
  baselineComparison: string
  methodologyApplied: string
  
  hmrcAdvanceAssurance: boolean
  advanceAssuranceRef: string
  previousClaimsCount: number
  lastClaimAmount: number
  anticipatedCompetentProfessional: string
  
  supportingDocuments: string
  technicalReports: string
  projectLogs: string
  
  notes?: string
  createdAt?: string
  updatedAt?: string
}

interface RDClaimFormProps {
  data?: Partial<RDClaimData>
  onSave: (data: Partial<RDClaimData>) => void
  onCancel: () => void
  isEditing?: boolean
}

export default function RDClaimForm({ 
  data, 
  onSave, 
  onCancel, 
  isEditing = false 
}: RDClaimFormProps) {
  const [formData, setFormData] = useState<Partial<RDClaimData>>(data || {
    projectName: '',
    projectDescription: '',
    companyName: '',
    companyNumber: '',
    utr: '',
    accountingPeriodStart: '',
    accountingPeriodEnd: '',
    status: 'draft',
    claimType: 'SME',
    staffCosts: 0,
    staffDirectlyEmployed: 0,
    staffExternallyProvided: 0,
    staffNICosts: 0,
    staffPensionCosts: 0,
    staffBenefitsCosts: 0,
    subcontractorCosts: 0,
    subcontractorRDCosts: 0,
    subcontractorNonRDCosts: 0,
    consumablesCosts: 0,
    materialsPrototyping: 0,
    materialsRawMaterials: 0,
    materialsDisposables: 0,
    softwareCosts: 0,
    softwareLicenses: 0,
    softwareCloudServices: 0,
    softwareDataStorage: 0,
    clinicalTrialCosts: 0,
    clinicalTrialVolunteerCosts: 0,
    clinicalTrialEthicsApproval: 0,
    otherCosts: 0,
    otherUtilities: 0,
    otherEquipment: 0,
    totalQualifyingExpenditure: 0,
    enhancementRate: 230,
    totalEnhancement: 0,
    reliefClaimed: 0,
    taxCredit: 0,
    staffCount: 0,
    projectManager: '',
    technicalLead: '',
    teamMembers: '',
    projectStartDate: '',
    projectEndDate: '',
    milestonesAchieved: '',
    currentPhase: '',
    technicalDescription: '',
    uncertaintyDescription: '',
    advancementDescription: '',
    baselineComparison: '',
    methodologyApplied: '',
    hmrcAdvanceAssurance: false,
    advanceAssuranceRef: '',
    previousClaimsCount: 0,
    lastClaimAmount: 0,
    anticipatedCompetentProfessional: '',
    supportingDocuments: '',
    technicalReports: '',
    projectLogs: '',
    notes: ''
  })
  
  const [editMode, setEditMode] = useState(isEditing)

  const calculateTotals = () => {
    const staffCosts = formData.staffCosts || 0
    const subcontractorCosts = formData.subcontractorCosts || 0
    const consumablesCosts = formData.consumablesCosts || 0
    const softwareCosts = formData.softwareCosts || 0
    const clinicalTrialCosts = formData.clinicalTrialCosts || 0
    const otherCosts = formData.otherCosts || 0
    
    const totalQualifyingExpenditure = 
      staffCosts + 
      (subcontractorCosts * 0.65) +
      consumablesCosts + 
      softwareCosts + 
      clinicalTrialCosts + 
      otherCosts
    
    const enhancementRate = formData.enhancementRate || 230
    const totalEnhancement = totalQualifyingExpenditure * (enhancementRate / 100)
    
    let reliefClaimed = 0
    let taxCredit = 0
    
    if (formData.claimType === 'SME') {
      reliefClaimed = totalEnhancement * 0.19
      taxCredit = totalEnhancement * 0.1467
    } else if (formData.claimType === 'RDEC') {
      reliefClaimed = totalQualifyingExpenditure * 0.20 * 0.19
    }
    
    return {
      totalQualifyingExpenditure,
      totalEnhancement,
      reliefClaimed,
      taxCredit
    }
  }

  const handleSave = () => {
    const totals = calculateTotals()
    onSave({
      ...formData,
      ...totals
    })
  }

  const updateField = (field: keyof RDClaimData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const totals = calculateTotals()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-auto bg-white">
        <CardHeader className="border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-[#001f3f]">
                R&D Tax Relief Claim
              </CardTitle>
              <CardDescription>
                {formData.projectName || 'New R&D Claim'}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={formData.status === 'approved' ? 'default' : 'secondary'}>
                {formData.status}
              </Badge>
              {!editMode && (
                <Button
                  onClick={() => setEditMode(true)}
                  variant="outline"
                  className="border-[#001f3f] text-[#001f3f]"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
              {editMode && (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-[#001f3f] hover:bg-[#001f3f]/90"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setEditMode(false)
                      setFormData(data || {})
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </>
              )}
              <Button
                onClick={onCancel}
                variant="ghost"
                size="icon"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="project" className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-6">
              <TabsTrigger value="project"><FileText className="h-4 w-4 mr-2" />Project</TabsTrigger>
              <TabsTrigger value="costs"><DollarSign className="h-4 w-4 mr-2" />Costs</TabsTrigger>
              <TabsTrigger value="team"><Users className="h-4 w-4 mr-2" />Team</TabsTrigger>
              <TabsTrigger value="technical"><Building2 className="h-4 w-4 mr-2" />Technical</TabsTrigger>
              <TabsTrigger value="calculation"><Calculator className="h-4 w-4 mr-2" />Calculation</TabsTrigger>
              <TabsTrigger value="compliance"><FileText className="h-4 w-4 mr-2" />HMRC</TabsTrigger>
              <TabsTrigger value="summary"><FileText className="h-4 w-4 mr-2" />Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="project" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="projectName" className="text-[#001f3f]">Project Name *</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => updateField('projectName', e.target.value)}
                    disabled={!editMode}
                    className="border-[#001f3f]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="claimType" className="text-[#001f3f]">Claim Type *</Label>
                  <select
                    id="claimType"
                    value={formData.claimType}
                    onChange={(e) => updateField('claimType', e.target.value)}
                    disabled={!editMode}
                    className="flex h-10 w-full rounded-md border border-[#001f3f] bg-white px-3 py-2 text-sm"
                  >
                    <option value="SME">SME Scheme</option>
                    <option value="RDEC">RDEC Scheme</option>
                    <option value="Merged">Merged Scheme</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDescription" className="text-[#001f3f]">Project Description</Label>
                <Textarea
                  id="projectDescription"
                  value={formData.projectDescription}
                  onChange={(e) => updateField('projectDescription', e.target.value)}
                  disabled={!editMode}
                  rows={3}
                  className="border-[#001f3f]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-[#001f3f]">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    disabled={!editMode}
                    className="border-[#001f3f]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyNumber" className="text-[#001f3f]">Company Number</Label>
                  <Input
                    id="companyNumber"
                    value={formData.companyNumber}
                    onChange={(e) => updateField('companyNumber', e.target.value)}
                    disabled={!editMode}
                    className="border-[#001f3f]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="utr" className="text-[#001f3f]">UTR</Label>
                  <Input
                    id="utr"
                    value={formData.utr}
                    onChange={(e) => updateField('utr', e.target.value)}
                    disabled={!editMode}
                    className="border-[#001f3f]"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="projectStartDate" className="text-[#001f3f]">Project Start Date</Label>
                  <Input
                    id="projectStartDate"
                    type="date"
                    value={formData.projectStartDate}
                    onChange={(e) => updateField('projectStartDate', e.target.value)}
                    disabled={!editMode}
                    className="border-[#001f3f]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectEndDate" className="text-[#001f3f]">Project End Date</Label>
                  <Input
                    id="projectEndDate"
                    type="date"
                    value={formData.projectEndDate}
                    onChange={(e) => updateField('projectEndDate', e.target.value)}
                    disabled={!editMode}
                    className="border-[#001f3f]"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="costs" className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-lg font-bold text-[#001f3f] mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Staff Costs (100% Qualifying Expenditure)
                </h3>
                <div className="grid gap-4 md:grid-cols-3 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="staffDirectlyEmployed" className="text-[#001f3f] font-semibold">Directly Employed Staff Salaries</Label>
                    <Input
                      id="staffDirectlyEmployed"
                      type="number"
                      value={formData.staffDirectlyEmployed}
                      onChange={(e) => updateField('staffDirectlyEmployed', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                    <p className="text-xs text-gray-600">Gross salaries for R&D staff</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="staffExternallyProvided" className="text-[#001f3f] font-semibold">Externally Provided Workers (EPWs)</Label>
                    <Input
                      id="staffExternallyProvided"
                      type="number"
                      value={formData.staffExternallyProvided}
                      onChange={(e) => updateField('staffExternallyProvided', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                    <p className="text-xs text-gray-600">Agency & contract workers</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="staffNICosts" className="text-[#001f3f] font-semibold">Employer's NI Contributions</Label>
                    <Input
                      id="staffNICosts"
                      type="number"
                      value={formData.staffNICosts}
                      onChange={(e) => updateField('staffNICosts', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                    <p className="text-xs text-gray-600">Class 1 NI on R&D salaries</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="staffPensionCosts" className="text-[#001f3f] font-semibold">Employer Pension Contributions</Label>
                    <Input
                      id="staffPensionCosts"
                      type="number"
                      value={formData.staffPensionCosts}
                      onChange={(e) => updateField('staffPensionCosts', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                    <p className="text-xs text-gray-600">Pension contributions for R&D staff</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="staffBenefitsCosts" className="text-[#001f3f] font-semibold">Other Benefits & Reimbursements</Label>
                    <Input
                      id="staffBenefitsCosts"
                      type="number"
                      value={formData.staffBenefitsCosts}
                      onChange={(e) => updateField('staffBenefitsCosts', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                    <p className="text-xs text-gray-600">Benefits, expenses, training</p>
                  </div>
                  <div className="space-y-2 bg-green-100 p-3 rounded border-2 border-green-500">
                    <Label className="text-green-800 font-bold">Total Staff Costs</Label>
                    <div className="text-2xl font-bold text-green-700">
                      £{((formData.staffDirectlyEmployed || 0) + (formData.staffExternallyProvided || 0) + (formData.staffNICosts || 0) + (formData.staffPensionCosts || 0) + (formData.staffBenefitsCosts || 0)).toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </div>
                    <p className="text-xs text-green-700">100% qualifying</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                <h3 className="text-lg font-bold text-[#001f3f] mb-4">Subcontractor Costs (65% Qualifying Expenditure)</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="subcontractorRDCosts" className="text-[#001f3f] font-semibold">R&D Subcontractor Costs</Label>
                    <Input
                      id="subcontractorRDCosts"
                      type="number"
                      value={formData.subcontractorRDCosts}
                      onChange={(e) => updateField('subcontractorRDCosts', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                    <p className="text-xs text-gray-600">R&D work by third parties</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subcontractorNonRDCosts" className="text-[#001f3f] font-semibold">Non-R&D Support Costs</Label>
                    <Input
                      id="subcontractorNonRDCosts"
                      type="number"
                      value={formData.subcontractorNonRDCosts}
                      onChange={(e) => updateField('subcontractorNonRDCosts', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                    <p className="text-xs text-gray-600">Support services (not qualifying)</p>
                  </div>
                  <div className="space-y-2 bg-green-100 p-3 rounded border-2 border-green-500">
                    <Label className="text-green-800 font-bold">Qualifying Amount (65%)</Label>
                    <div className="text-2xl font-bold text-green-700">
                      £{((formData.subcontractorRDCosts || 0) * 0.65).toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </div>
                    <p className="text-xs text-gray-700">Total: £{(formData.subcontractorRDCosts || 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                <h3 className="text-lg font-bold text-[#001f3f] mb-4">Consumables & Materials (100% Qualifying)</h3>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="materialsPrototyping" className="text-[#001f3f] font-semibold">Prototyping Materials</Label>
                    <Input
                      id="materialsPrototyping"
                      type="number"
                      value={formData.materialsPrototyping}
                      onChange={(e) => updateField('materialsPrototyping', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="materialsRawMaterials" className="text-[#001f3f] font-semibold">Raw Materials</Label>
                    <Input
                      id="materialsRawMaterials"
                      type="number"
                      value={formData.materialsRawMaterials}
                      onChange={(e) => updateField('materialsRawMaterials', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="materialsDisposables" className="text-[#001f3f] font-semibold">Lab Consumables</Label>
                    <Input
                      id="materialsDisposables"
                      type="number"
                      value={formData.materialsDisposables}
                      onChange={(e) => updateField('materialsDisposables', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                  </div>
                  <div className="space-y-2 bg-green-100 p-3 rounded border-2 border-green-500">
                    <Label className="text-green-800 font-bold">Total Materials</Label>
                    <div className="text-2xl font-bold text-green-700">
                      £{((formData.materialsPrototyping || 0) + (formData.materialsRawMaterials || 0) + (formData.materialsDisposables || 0)).toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-50 p-6 rounded-lg border-2 border-cyan-200">
                <h3 className="text-lg font-bold text-[#001f3f] mb-4">Software & Technology Costs (100% Qualifying)</h3>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="softwareLicenses" className="text-[#001f3f] font-semibold">Software Licenses</Label>
                    <Input
                      id="softwareLicenses"
                      type="number"
                      value={formData.softwareLicenses}
                      onChange={(e) => updateField('softwareLicenses', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="softwareCloudServices" className="text-[#001f3f] font-semibold">Cloud Services & APIs</Label>
                    <Input
                      id="softwareCloudServices"
                      type="number"
                      value={formData.softwareCloudServices}
                      onChange={(e) => updateField('softwareCloudServices', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="softwareDataStorage" className="text-[#001f3f] font-semibold">Data Storage & Computing</Label>
                    <Input
                      id="softwareDataStorage"
                      type="number"
                      value={formData.softwareDataStorage}
                      onChange={(e) => updateField('softwareDataStorage', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                  </div>
                  <div className="space-y-2 bg-green-100 p-3 rounded border-2 border-green-500">
                    <Label className="text-green-800 font-bold">Total Software</Label>
                    <div className="text-2xl font-bold text-green-700">
                      £{((formData.softwareLicenses || 0) + (formData.softwareCloudServices || 0) + (formData.softwareDataStorage || 0)).toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
                <h3 className="text-lg font-bold text-[#001f3f] mb-4">Clinical Trial Costs (if applicable)</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="clinicalTrialVolunteerCosts" className="text-[#001f3f] font-semibold">Volunteer Payments</Label>
                    <Input
                      id="clinicalTrialVolunteerCosts"
                      type="number"
                      value={formData.clinicalTrialVolunteerCosts}
                      onChange={(e) => updateField('clinicalTrialVolunteerCosts', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clinicalTrialEthicsApproval" className="text-[#001f3f] font-semibold">Ethics & Regulatory Costs</Label>
                    <Input
                      id="clinicalTrialEthicsApproval"
                      type="number"
                      value={formData.clinicalTrialEthicsApproval}
                      onChange={(e) => updateField('clinicalTrialEthicsApproval', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                  </div>
                  <div className="space-y-2 bg-green-100 p-3 rounded border-2 border-green-500">
                    <Label className="text-green-800 font-bold">Total Clinical</Label>
                    <div className="text-2xl font-bold text-green-700">
                      £{((formData.clinicalTrialVolunteerCosts || 0) + (formData.clinicalTrialEthicsApproval || 0)).toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg border-2 border-gray-400">
                <h3 className="text-lg font-bold text-[#001f3f] mb-4">Other Qualifying Costs</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="otherUtilities" className="text-[#001f3f] font-semibold">Utilities & Lab Running Costs</Label>
                    <Input
                      id="otherUtilities"
                      type="number"
                      value={formData.otherUtilities}
                      onChange={(e) => updateField('otherUtilities', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otherEquipment" className="text-[#001f3f] font-semibold">Equipment & Tooling</Label>
                    <Input
                      id="otherEquipment"
                      type="number"
                      value={formData.otherEquipment}
                      onChange={(e) => updateField('otherEquipment', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f] font-mono"
                      placeholder="£0.00"
                    />
                  </div>
                  <div className="space-y-2 bg-green-100 p-3 rounded border-2 border-green-500">
                    <Label className="text-green-800 font-bold">Total Other</Label>
                    <div className="text-2xl font-bold text-green-700">
                      £{((formData.otherUtilities || 0) + (formData.otherEquipment || 0)).toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-lg border-4 border-green-800 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-4">TOTAL QUALIFYING EXPENDITURE</h2>
                <div className="text-5xl font-bold text-white">
                  £{totals.totalQualifyingExpenditure.toLocaleString('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </div>
                <p className="text-white mt-2 text-sm">This is the amount eligible for R&D tax relief enhancement</p>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-[#001f3f] mb-4">Project Team Information</h3>
                <div className="grid gap-4 md:grid-cols-3 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="staffCount" className="text-[#001f3f]">Number of R&D Staff</Label>
                    <Input
                      id="staffCount"
                      type="number"
                      value={formData.staffCount}
                      onChange={(e) => updateField('staffCount', parseInt(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectManager" className="text-[#001f3f]">Project Manager</Label>
                    <Input
                      id="projectManager"
                      value={formData.projectManager}
                      onChange={(e) => updateField('projectManager', e.target.value)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                      placeholder="Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technicalLead" className="text-[#001f3f]">Technical Lead</Label>
                    <Input
                      id="technicalLead"
                      value={formData.technicalLead}
                      onChange={(e) => updateField('technicalLead', e.target.value)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamMembers" className="text-[#001f3f]">Key Team Members</Label>
                  <Textarea
                    id="teamMembers"
                    value={formData.teamMembers}
                    onChange={(e) => updateField('teamMembers', e.target.value)}
                    disabled={!editMode}
                    rows={3}
                    className="border-[#001f3f]"
                    placeholder="List key R&D team members and their roles..."
                  />
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-[#001f3f] mb-4">Project Timeline & Milestones</h3>
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPhase" className="text-[#001f3f]">Current Project Phase</Label>
                    <Input
                      id="currentPhase"
                      value={formData.currentPhase}
                      onChange={(e) => updateField('currentPhase', e.target.value)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                      placeholder="e.g., Prototype Development, Testing Phase"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="milestonesAchieved" className="text-[#001f3f]">Key Milestones Achieved</Label>
                    <Textarea
                      id="milestonesAchieved"
                      value={formData.milestonesAchieved}
                      onChange={(e) => updateField('milestonesAchieved', e.target.value)}
                      disabled={!editMode}
                      rows={3}
                      className="border-[#001f3f]"
                      placeholder="List completed milestones and achievements..."
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="clinicalTrialCosts" className="text-[#001f3f]">Clinical Trial Costs</Label>
                <Input
                    id="clinicalTrialCosts"
                    type="number"
                    value={formData.clinicalTrialCosts}
                    onChange={(e) => updateField('clinicalTrialCosts', parseFloat(e.target.value) || 0)}
                    disabled={!editMode}
                    className="border-[#001f3f]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherCosts" className="text-[#001f3f]">Other Qualifying Costs</Label>
                <Input
                  id="otherCosts"
                  type="number"
                  value={formData.otherCosts}
                  onChange={(e) => updateField('otherCosts', parseFloat(e.target.value) || 0)}
                  disabled={!editMode}
                  className="border-[#001f3f]"
                />
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="technicalDescription" className="text-[#001f3f]">
                  Technical Description - What are you trying to achieve?
                </Label>
                <Textarea
                  id="technicalDescription"
                  value={formData.technicalDescription}
                  onChange={(e) => updateField('technicalDescription', e.target.value)}
                  disabled={!editMode}
                  rows={5}
                  className="border-[#001f3f]"
                  placeholder="Describe the technical objectives and goals of the project..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="uncertaintyDescription" className="text-[#001f3f]">
                  Scientific/Technological Uncertainty - What challenges did you face?
                </Label>
                <Textarea
                  id="uncertaintyDescription"
                  value={formData.uncertaintyDescription}
                  onChange={(e) => updateField('uncertaintyDescription', e.target.value)}
                  disabled={!editMode}
                  rows={5}
                  className="border-[#001f3f]"
                  placeholder="Describe the scientific or technological uncertainties that were addressed..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="advancementDescription" className="text-[#001f3f]">
                  Advancement in Science/Technology - How did you overcome them?
                </Label>
                <Textarea
                  id="advancementDescription"
                  value={formData.advancementDescription}
                  onChange={(e) => updateField('advancementDescription', e.target.value)}
                  disabled={!editMode}
                  rows={5}
                  className="border-[#001f3f]"
                  placeholder="Describe the advancement achieved and how uncertainties were resolved..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-[#001f3f]">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  disabled={!editMode}
                  rows={3}
                  className="border-[#001f3f]"
                />
              </div>
            </TabsContent>

            <TabsContent value="calculation" className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                <h3 className="font-semibold text-[#001f3f] text-lg">Qualifying Expenditure Breakdown</h3>
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span>Staff Costs (100%):</span>
                    <span className="font-semibold">£{(formData.staffCosts || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subcontractor Costs (65%):</span>
                    <span className="font-semibold">£{((formData.subcontractorCosts || 0) * 0.65).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consumables:</span>
                    <span className="font-semibold">£{(formData.consumablesCosts || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Software:</span>
                    <span className="font-semibold">£{(formData.softwareCosts || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Clinical Trials:</span>
                    <span className="font-semibold">£{(formData.clinicalTrialCosts || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other Costs:</span>
                    <span className="font-semibold">£{(formData.otherCosts || 0).toLocaleString()}</span>
                  </div>
                  <div className="border-t-2 border-[#001f3f] pt-2 flex justify-between text-lg font-bold">
                    <span>Total Qualifying Expenditure:</span>
                    <span className="text-[#001f3f]">£{totals.totalQualifyingExpenditure.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="enhancementRate" className="text-[#001f3f]">Enhancement Rate (%)</Label>
                <Input
                  id="enhancementRate"
                  type="number"
                  value={formData.enhancementRate}
                  onChange={(e) => updateField('enhancementRate', parseFloat(e.target.value) || 0)}
                  disabled={!editMode}
                  className="border-[#001f3f]"
                />
                <p className="text-sm text-gray-500">SME: 230% | RDEC: 20% | Merged: varies</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold text-[#001f3f] text-lg">R&D Relief Calculation</h3>
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span>Total Enhancement ({formData.enhancementRate}%):</span>
                    <span className="font-semibold">£{totals.totalEnhancement.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Corporation Tax Relief (19%):</span>
                    <span className="text-green-600">£{totals.reliefClaimed.toLocaleString()}</span>
                  </div>
                  {formData.claimType === 'SME' && (
                    <div className="flex justify-between text-lg font-bold">
                      <span>Payable Tax Credit (14.67%):</span>
                      <span className="text-green-600">£{totals.taxCredit.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-[#001f3f] mb-4">R&D Claim Summary</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-600">Project Name</p>
                    <p className="font-semibold text-[#001f3f]">{formData.projectName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Claim Type</p>
                    <p className="font-semibold text-[#001f3f]">{formData.claimType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company Name</p>
                    <p className="font-semibold text-[#001f3f]">{formData.companyName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge variant={formData.status === 'approved' ? 'default' : 'secondary'}>
                      {formData.status}
                    </Badge>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold text-[#001f3f] mb-3">Financial Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Qualifying Expenditure:</span>
                      <span className="font-semibold">£{totals.totalQualifyingExpenditure.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Enhancement:</span>
                      <span className="font-semibold">£{totals.totalEnhancement.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg border-t pt-2">
                      <span className="font-bold">Corporation Tax Relief:</span>
                      <span className="font-bold text-green-600">£{totals.reliefClaimed.toLocaleString()}</span>
                    </div>
                    {formData.claimType === 'SME' && totals.taxCredit > 0 && (
                      <div className="flex justify-between text-lg">
                        <span className="font-bold">Payable Tax Credit:</span>
                        <span className="font-bold text-green-600">£{totals.taxCredit.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

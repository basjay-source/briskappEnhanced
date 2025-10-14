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
  Building2,
  Users,
  FileText,
  DollarSign,
  TrendingDown
} from 'lucide-react'

export interface GroupReliefData {
  id?: string
  claimingCompanyName: string
  claimingCompanyNumber: string
  claimingCompanyUTR: string
  surrenderingCompanyName: string
  surrenderingCompanyNumber: string
  surrenderingCompanyUTR: string
  accountingPeriodStart: string
  accountingPeriodEnd: string
  status: 'draft' | 'in-progress' | 'submitted' | 'approved'
  groupReliefType: 'current-period' | 'carried-forward' | 'carried-back'
  availableLosses: number
  lossesClaimedAgainst: number
  lossesSurrendered: number
  effectiveTaxSaving: number
  taxRate: number
  groupStructureDescription: string
  consentLetterReceived: boolean
  consentLetterDate?: string
  groupCompanies: GroupCompany[]
  notes?: string
  createdAt?: string
  updatedAt?: string
}

interface GroupCompany {
  companyName: string
  companyNumber: string
  utr: string
  relationshipType: 'parent' | 'subsidiary' | 'sister'
  ownershipPercentage: number
}

interface GroupReliefFormProps {
  data?: Partial<GroupReliefData>
  onSave: (data: Partial<GroupReliefData>) => void
  onCancel: () => void
  isEditing?: boolean
}

export default function GroupReliefForm({ 
  data, 
  onSave, 
  onCancel, 
  isEditing = false 
}: GroupReliefFormProps) {
  const [formData, setFormData] = useState<Partial<GroupReliefData>>(data || {
    claimingCompanyName: '',
    claimingCompanyNumber: '',
    claimingCompanyUTR: '',
    surrenderingCompanyName: '',
    surrenderingCompanyNumber: '',
    surrenderingCompanyUTR: '',
    accountingPeriodStart: '',
    accountingPeriodEnd: '',
    status: 'draft',
    groupReliefType: 'current-period',
    availableLosses: 0,
    lossesClaimedAgainst: 0,
    lossesSurrendered: 0,
    effectiveTaxSaving: 0,
    taxRate: 25,
    groupStructureDescription: '',
    consentLetterReceived: false,
    consentLetterDate: '',
    groupCompanies: [],
    notes: ''
  })
  
  const [editMode, setEditMode] = useState(isEditing)
  const [newCompany, setNewCompany] = useState<GroupCompany>({
    companyName: '',
    companyNumber: '',
    utr: '',
    relationshipType: 'subsidiary',
    ownershipPercentage: 100
  })

  const calculateTaxSaving = () => {
    const lossesClaimed = formData.lossesClaimedAgainst || 0
    const taxRate = (formData.taxRate || 25) / 100
    return lossesClaimed * taxRate
  }

  const handleSave = () => {
    const taxSaving = calculateTaxSaving()
    onSave({
      ...formData,
      effectiveTaxSaving: taxSaving
    })
  }

  const updateField = (field: keyof GroupReliefData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addGroupCompany = () => {
    if (newCompany.companyName && newCompany.companyNumber) {
      setFormData(prev => ({
        ...prev,
        groupCompanies: [...(prev.groupCompanies || []), newCompany]
      }))
      setNewCompany({
        companyName: '',
        companyNumber: '',
        utr: '',
        relationshipType: 'subsidiary',
        ownershipPercentage: 100
      })
    }
  }

  const removeGroupCompany = (index: number) => {
    setFormData(prev => ({
      ...prev,
      groupCompanies: (prev.groupCompanies || []).filter((_, i) => i !== index)
    }))
  }

  const taxSaving = calculateTaxSaving()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-auto bg-white">
        <CardHeader className="border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-[#001f3f]">
                Group Relief Claim
              </CardTitle>
              <CardDescription>
                {formData.claimingCompanyName || 'New Group Relief Claim'}
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
          <Tabs defaultValue="claiming" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="claiming"><Building2 className="h-4 w-4 mr-2" />Claiming Company</TabsTrigger>
              <TabsTrigger value="surrendering"><TrendingDown className="h-4 w-4 mr-2" />Surrendering Company</TabsTrigger>
              <TabsTrigger value="losses"><DollarSign className="h-4 w-4 mr-2" />Losses & Relief</TabsTrigger>
              <TabsTrigger value="group"><Users className="h-4 w-4 mr-2" />Group Structure</TabsTrigger>
              <TabsTrigger value="summary"><FileText className="h-4 w-4 mr-2" />Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="claiming" className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#001f3f] mb-4">Claiming Company Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="claimingCompanyName" className="text-[#001f3f]">Company Name *</Label>
                    <Input
                      id="claimingCompanyName"
                      value={formData.claimingCompanyName}
                      onChange={(e) => updateField('claimingCompanyName', e.target.value)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="claimingCompanyNumber" className="text-[#001f3f]">Company Number</Label>
                    <Input
                      id="claimingCompanyNumber"
                      value={formData.claimingCompanyNumber}
                      onChange={(e) => updateField('claimingCompanyNumber', e.target.value)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="claimingCompanyUTR" className="text-[#001f3f]">UTR</Label>
                    <Input
                      id="claimingCompanyUTR"
                      value={formData.claimingCompanyUTR}
                      onChange={(e) => updateField('claimingCompanyUTR', e.target.value)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="accountingPeriodStart" className="text-[#001f3f]">Accounting Period Start</Label>
                  <Input
                    id="accountingPeriodStart"
                    type="date"
                    value={formData.accountingPeriodStart}
                    onChange={(e) => updateField('accountingPeriodStart', e.target.value)}
                    disabled={!editMode}
                    className="border-[#001f3f]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountingPeriodEnd" className="text-[#001f3f]">Accounting Period End</Label>
                  <Input
                    id="accountingPeriodEnd"
                    type="date"
                    value={formData.accountingPeriodEnd}
                    onChange={(e) => updateField('accountingPeriodEnd', e.target.value)}
                    disabled={!editMode}
                    className="border-[#001f3f]"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="surrendering" className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#001f3f] mb-4">Surrendering Company Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="surrenderingCompanyName" className="text-[#001f3f]">Company Name *</Label>
                    <Input
                      id="surrenderingCompanyName"
                      value={formData.surrenderingCompanyName}
                      onChange={(e) => updateField('surrenderingCompanyName', e.target.value)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surrenderingCompanyNumber" className="text-[#001f3f]">Company Number</Label>
                    <Input
                      id="surrenderingCompanyNumber"
                      value={formData.surrenderingCompanyNumber}
                      onChange={(e) => updateField('surrenderingCompanyNumber', e.target.value)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surrenderingCompanyUTR" className="text-[#001f3f]">UTR</Label>
                    <Input
                      id="surrenderingCompanyUTR"
                      value={formData.surrenderingCompanyUTR}
                      onChange={(e) => updateField('surrenderingCompanyUTR', e.target.value)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="consentLetterReceived"
                    checked={formData.consentLetterReceived}
                    onChange={(e) => updateField('consentLetterReceived', e.target.checked)}
                    disabled={!editMode}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="consentLetterReceived" className="text-[#001f3f]">
                    Consent Letter Received
                  </Label>
                </div>
              </div>

              {formData.consentLetterReceived && (
                <div className="space-y-2">
                  <Label htmlFor="consentLetterDate" className="text-[#001f3f]">Consent Letter Date</Label>
                  <Input
                    id="consentLetterDate"
                    type="date"
                    value={formData.consentLetterDate}
                    onChange={(e) => updateField('consentLetterDate', e.target.value)}
                    disabled={!editMode}
                    className="border-[#001f3f]"
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="losses" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="groupReliefType" className="text-[#001f3f]">Relief Type *</Label>
                <select
                  id="groupReliefType"
                  value={formData.groupReliefType}
                  onChange={(e) => updateField('groupReliefType', e.target.value)}
                  disabled={!editMode}
                  className="flex h-10 w-full rounded-md border border-[#001f3f] bg-white px-3 py-2 text-sm"
                >
                  <option value="current-period">Current Period Relief</option>
                  <option value="carried-forward">Carried Forward Losses</option>
                  <option value="carried-back">Carried Back Losses</option>
                </select>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg space-y-4">
                <h3 className="font-semibold text-[#001f3f]">Loss Allocation</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="availableLosses" className="text-[#001f3f]">Available Losses</Label>
                    <Input
                      id="availableLosses"
                      type="number"
                      value={formData.availableLosses}
                      onChange={(e) => updateField('availableLosses', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                    <p className="text-xs text-gray-500">Total losses available from surrendering company</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lossesSurrendered" className="text-[#001f3f]">Losses Surrendered</Label>
                    <Input
                      id="lossesSurrendered"
                      type="number"
                      value={formData.lossesSurrendered}
                      onChange={(e) => updateField('lossesSurrendered', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                    <p className="text-xs text-gray-500">Amount of losses being surrendered</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg space-y-4">
                <h3 className="font-semibold text-[#001f3f]">Tax Calculation</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lossesClaimedAgainst" className="text-[#001f3f]">Losses Claimed Against Profits</Label>
                    <Input
                      id="lossesClaimedAgainst"
                      type="number"
                      value={formData.lossesClaimedAgainst}
                      onChange={(e) => updateField('lossesClaimedAgainst', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate" className="text-[#001f3f]">Corporation Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={formData.taxRate}
                      onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 25)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                    <p className="text-xs text-gray-500">Standard rate: 19-25%</p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-white rounded-lg border-2 border-green-600">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#001f3f]">Effective Tax Saving:</span>
                    <span className="text-2xl font-bold text-green-600">
                      £{taxSaving.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Calculated as: Losses Claimed (£{(formData.lossesClaimedAgainst || 0).toLocaleString()}) × Tax Rate ({formData.taxRate}%)
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="group" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="groupStructureDescription" className="text-[#001f3f]">
                  Group Structure Description
                </Label>
                <Textarea
                  id="groupStructureDescription"
                  value={formData.groupStructureDescription}
                  onChange={(e) => updateField('groupStructureDescription', e.target.value)}
                  disabled={!editMode}
                  rows={4}
                  className="border-[#001f3f]"
                  placeholder="Describe the group structure and relationships between companies..."
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#001f3f] mb-4">Group Companies</h3>
                
                {editMode && (
                  <div className="grid gap-4 md:grid-cols-5 mb-4 p-4 bg-white rounded-lg border">
                    <div className="space-y-2">
                      <Label className="text-xs text-[#001f3f]">Company Name</Label>
                      <Input
                        value={newCompany.companyName}
                        onChange={(e) => setNewCompany(prev => ({ ...prev, companyName: e.target.value }))}
                        className="border-[#001f3f]"
                        placeholder="Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-[#001f3f]">Number</Label>
                      <Input
                        value={newCompany.companyNumber}
                        onChange={(e) => setNewCompany(prev => ({ ...prev, companyNumber: e.target.value }))}
                        className="border-[#001f3f]"
                        placeholder="Number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-[#001f3f]">UTR</Label>
                      <Input
                        value={newCompany.utr}
                        onChange={(e) => setNewCompany(prev => ({ ...prev, utr: e.target.value }))}
                        className="border-[#001f3f]"
                        placeholder="UTR"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-[#001f3f]">Relationship</Label>
                      <select
                        value={newCompany.relationshipType}
                        onChange={(e) => setNewCompany(prev => ({ ...prev, relationshipType: e.target.value as any }))}
                        className="flex h-10 w-full rounded-md border border-[#001f3f] bg-white px-3 py-2 text-sm"
                      >
                        <option value="parent">Parent</option>
                        <option value="subsidiary">Subsidiary</option>
                        <option value="sister">Sister</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-[#001f3f]">Ownership %</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={newCompany.ownershipPercentage}
                          onChange={(e) => setNewCompany(prev => ({ ...prev, ownershipPercentage: parseFloat(e.target.value) || 0 }))}
                          className="border-[#001f3f]"
                          max={100}
                          min={0}
                        />
                        <Button onClick={addGroupCompany} size="sm" className="bg-[#001f3f]">
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {(formData.groupCompanies || []).map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="grid grid-cols-5 gap-4 flex-1">
                        <div>
                          <p className="text-xs text-gray-500">Company Name</p>
                          <p className="font-semibold text-[#001f3f]">{company.companyName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Number</p>
                          <p className="font-semibold text-[#001f3f]">{company.companyNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">UTR</p>
                          <p className="font-semibold text-[#001f3f]">{company.utr}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Relationship</p>
                          <p className="font-semibold text-[#001f3f] capitalize">{company.relationshipType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Ownership</p>
                          <p className="font-semibold text-[#001f3f]">{company.ownershipPercentage}%</p>
                        </div>
                      </div>
                      {editMode && (
                        <Button
                          onClick={() => removeGroupCompany(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {(!formData.groupCompanies || formData.groupCompanies.length === 0) && (
                    <p className="text-center text-gray-500 py-4">No group companies added yet</p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-[#001f3f] mb-6">Group Relief Summary</h3>
                
                <div className="grid gap-4 md:grid-cols-2 mb-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-[#001f3f] mb-3">Claiming Company</h4>
                    <div className="space-y-1">
                      <p className="text-sm"><span className="text-gray-600">Name:</span> {formData.claimingCompanyName}</p>
                      <p className="text-sm"><span className="text-gray-600">Number:</span> {formData.claimingCompanyNumber}</p>
                      <p className="text-sm"><span className="text-gray-600">UTR:</span> {formData.claimingCompanyUTR}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-[#001f3f] mb-3">Surrendering Company</h4>
                    <div className="space-y-1">
                      <p className="text-sm"><span className="text-gray-600">Name:</span> {formData.surrenderingCompanyName}</p>
                      <p className="text-sm"><span className="text-gray-600">Number:</span> {formData.surrenderingCompanyNumber}</p>
                      <p className="text-sm"><span className="text-gray-600">UTR:</span> {formData.surrenderingCompanyUTR}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow mb-6">
                  <h4 className="font-semibold text-[#001f3f] mb-3">Financial Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between pb-2 border-b">
                      <span>Available Losses:</span>
                      <span className="font-semibold">£{(formData.availableLosses || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Losses Surrendered:</span>
                      <span className="font-semibold">£{(formData.lossesSurrendered || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Losses Claimed Against Profits:</span>
                      <span className="font-semibold">£{(formData.lossesClaimedAgainst || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Tax Rate:</span>
                      <span className="font-semibold">{formData.taxRate}%</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t-2 border-[#001f3f]">
                      <span className="text-lg font-bold">Effective Tax Saving:</span>
                      <span className="text-2xl font-bold text-green-600">£{taxSaving.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-[#001f3f] mb-2">Group Companies</h4>
                  <p className="text-sm text-gray-600">{(formData.groupCompanies || []).length} companies in group</p>
                  <Badge variant={formData.consentLetterReceived ? 'default' : 'secondary'} className="mt-2">
                    Consent Letter: {formData.consentLetterReceived ? 'Received' : 'Not Received'}
                  </Badge>
                </div>

                <div className="mt-6 space-y-2">
                  <Label htmlFor="notes" className="text-[#001f3f]">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    disabled={!editMode}
                    rows={4}
                    className="border-[#001f3f]"
                    placeholder="Additional notes about group relief claim..."
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

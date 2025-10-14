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
  Award,
  DollarSign,
  Building2,
  FileText
} from 'lucide-react'

export interface ReliefsData {
  id?: string
  companyName: string
  companyNumber: string
  utr: string
  accountingPeriodStart: string
  accountingPeriodEnd: string
  status: 'draft' | 'in-progress' | 'submitted' | 'approved'
  patentBoxIncome: number
  patentBoxProfits: number
  patentBoxRelief: number
  patentBoxRate: number
  creativeIndustryExpenditure: number
  creativeIndustryRelief: number
  creativeIndustryRate: number
  landRemediationCosts: number
  landRemediationRelief: number
  structuresAllowance: number
  structuresRelief: number
  firstYearAllowance: number
  firstYearRelief: number
  superDeductionExpenditure: number
  superDeductionRelief: number
  marginalReliefCalculation: number
  marginalReliefAmount: number
  otherReliefsDescription: string
  otherReliefsAmount: number
  totalReliefsAndCredits: number
  notes?: string
  createdAt?: string
  updatedAt?: string
}

interface ReliefsFormProps {
  data?: Partial<ReliefsData>
  onSave: (data: Partial<ReliefsData>) => void
  onCancel: () => void
  isEditing?: boolean
}

export default function ReliefsForm({ 
  data, 
  onSave, 
  onCancel, 
  isEditing = false 
}: ReliefsFormProps) {
  const [formData, setFormData] = useState<Partial<ReliefsData>>(data || {
    companyName: '',
    companyNumber: '',
    utr: '',
    accountingPeriodStart: '',
    accountingPeriodEnd: '',
    status: 'draft',
    patentBoxIncome: 0,
    patentBoxProfits: 0,
    patentBoxRelief: 0,
    patentBoxRate: 10,
    creativeIndustryExpenditure: 0,
    creativeIndustryRelief: 0,
    creativeIndustryRate: 25,
    landRemediationCosts: 0,
    landRemediationRelief: 0,
    structuresAllowance: 0,
    structuresRelief: 0,
    firstYearAllowance: 0,
    firstYearRelief: 0,
    superDeductionExpenditure: 0,
    superDeductionRelief: 0,
    marginalReliefCalculation: 0,
    marginalReliefAmount: 0,
    otherReliefsDescription: '',
    otherReliefsAmount: 0,
    totalReliefsAndCredits: 0,
    notes: ''
  })
  
  const [editMode, setEditMode] = useState(isEditing)

  const calculateTotals = () => {
    const patentBoxRelief = (formData.patentBoxProfits || 0) * ((formData.patentBoxRate || 10) / 100)
    const creativeIndustryRelief = (formData.creativeIndustryExpenditure || 0) * ((formData.creativeIndustryRate || 25) / 100)
    const landRemediationRelief = (formData.landRemediationCosts || 0) * 1.5
    const structuresRelief = (formData.structuresAllowance || 0) * 0.03
    const firstYearRelief = (formData.firstYearAllowance || 0)
    const superDeductionRelief = (formData.superDeductionExpenditure || 0) * 1.3
    
    const totalReliefsAndCredits = 
      patentBoxRelief +
      creativeIndustryRelief +
      landRemediationRelief +
      structuresRelief +
      firstYearRelief +
      superDeductionRelief +
      (formData.marginalReliefAmount || 0) +
      (formData.otherReliefsAmount || 0)
    
    return {
      patentBoxRelief,
      creativeIndustryRelief,
      landRemediationRelief,
      structuresRelief,
      firstYearRelief,
      superDeductionRelief,
      totalReliefsAndCredits
    }
  }

  const handleSave = () => {
    const totals = calculateTotals()
    onSave({
      ...formData,
      ...totals
    })
  }

  const updateField = (field: keyof ReliefsData, value: any) => {
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
                Corporation Tax Reliefs & Credits
              </CardTitle>
              <CardDescription>
                {formData.companyName || 'New Relief Claim'}
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
          <Tabs defaultValue="company" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="company"><Building2 className="h-4 w-4 mr-2" />Company Details</TabsTrigger>
              <TabsTrigger value="patent"><Award className="h-4 w-4 mr-2" />Patent Box & Creative</TabsTrigger>
              <TabsTrigger value="capital"><DollarSign className="h-4 w-4 mr-2" />Capital Allowances</TabsTrigger>
              <TabsTrigger value="summary"><FileText className="h-4 w-4 mr-2" />Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="company" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-[#001f3f]">Company Name *</Label>
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

            <TabsContent value="patent" className="space-y-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#001f3f] mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Patent Box Relief
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="patentBoxIncome" className="text-[#001f3f]">Patent Box Income</Label>
                    <Input
                      id="patentBoxIncome"
                      type="number"
                      value={formData.patentBoxIncome}
                      onChange={(e) => updateField('patentBoxIncome', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patentBoxProfits" className="text-[#001f3f]">Patent Box Profits</Label>
                    <Input
                      id="patentBoxProfits"
                      type="number"
                      value={formData.patentBoxProfits}
                      onChange={(e) => updateField('patentBoxProfits', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patentBoxRate" className="text-[#001f3f]">Patent Box Rate (%)</Label>
                    <Input
                      id="patentBoxRate"
                      type="number"
                      value={formData.patentBoxRate}
                      onChange={(e) => updateField('patentBoxRate', parseFloat(e.target.value) || 10)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                    <p className="text-xs text-gray-500">Standard rate: 10%</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#001f3f]">Calculated Relief</Label>
                    <div className="h-10 px-3 py-2 bg-gray-50 rounded-md border border-[#001f3f] flex items-center">
                      <span className="font-semibold text-green-600">
                        £{totals.patentBoxRelief.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#001f3f] mb-4">Creative Industry Tax Reliefs</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="creativeIndustryExpenditure" className="text-[#001f3f]">Qualifying Expenditure</Label>
                    <Input
                      id="creativeIndustryExpenditure"
                      type="number"
                      value={formData.creativeIndustryExpenditure}
                      onChange={(e) => updateField('creativeIndustryExpenditure', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                    <p className="text-xs text-gray-500">Film, TV, Video Games, Theatre, Orchestra</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creativeIndustryRate" className="text-[#001f3f]">Relief Rate (%)</Label>
                    <Input
                      id="creativeIndustryRate"
                      type="number"
                      value={formData.creativeIndustryRate}
                      onChange={(e) => updateField('creativeIndustryRate', parseFloat(e.target.value) || 25)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                    <p className="text-xs text-gray-500">Varies: 25-45% depending on type</p>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-[#001f3f]">Calculated Relief</Label>
                    <div className="h-10 px-3 py-2 bg-gray-50 rounded-md border border-[#001f3f] flex items-center">
                      <span className="font-semibold text-green-600">
                        £{totals.creativeIndustryRelief.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#001f3f] mb-4">Land Remediation Relief</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="landRemediationCosts" className="text-[#001f3f]">Remediation Costs</Label>
                    <Input
                      id="landRemediationCosts"
                      type="number"
                      value={formData.landRemediationCosts}
                      onChange={(e) => updateField('landRemediationCosts', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                    <p className="text-xs text-gray-500">150% deduction available</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#001f3f]">Calculated Relief (150%)</Label>
                    <div className="h-10 px-3 py-2 bg-gray-50 rounded-md border border-[#001f3f] flex items-center">
                      <span className="font-semibold text-green-600">
                        £{totals.landRemediationRelief.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="capital" className="space-y-6">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#001f3f] mb-4">Structures & Buildings Allowance</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="structuresAllowance" className="text-[#001f3f]">Qualifying Expenditure</Label>
                    <Input
                      id="structuresAllowance"
                      type="number"
                      value={formData.structuresAllowance}
                      onChange={(e) => updateField('structuresAllowance', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                    <p className="text-xs text-gray-500">3% annual allowance</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#001f3f]">Annual Allowance (3%)</Label>
                    <div className="h-10 px-3 py-2 bg-gray-50 rounded-md border border-[#001f3f] flex items-center">
                      <span className="font-semibold text-green-600">
                        £{totals.structuresRelief.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#001f3f] mb-4">First Year Allowance (FYA)</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstYearAllowance" className="text-[#001f3f]">FYA Qualifying Expenditure</Label>
                    <Input
                      id="firstYearAllowance"
                      type="number"
                      value={formData.firstYearAllowance}
                      onChange={(e) => updateField('firstYearAllowance', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                    <p className="text-xs text-gray-500">100% deduction in year of expenditure</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#001f3f]">FYA Relief (100%)</Label>
                    <div className="h-10 px-3 py-2 bg-gray-50 rounded-md border border-[#001f3f] flex items-center">
                      <span className="font-semibold text-green-600">
                        £{totals.firstYearRelief.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#001f3f] mb-4">Super-Deduction (Historical)</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="superDeductionExpenditure" className="text-[#001f3f]">Super-Deduction Expenditure</Label>
                    <Input
                      id="superDeductionExpenditure"
                      type="number"
                      value={formData.superDeductionExpenditure}
                      onChange={(e) => updateField('superDeductionExpenditure', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                    <p className="text-xs text-gray-500">130% deduction (April 2021 - March 2023)</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#001f3f]">Super-Deduction Relief (130%)</Label>
                    <div className="h-10 px-3 py-2 bg-gray-50 rounded-md border border-[#001f3f] flex items-center">
                      <span className="font-semibold text-green-600">
                        £{totals.superDeductionRelief.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#001f3f] mb-4">Marginal Relief</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="marginalReliefCalculation" className="text-[#001f3f]">Marginal Relief Calculation</Label>
                    <Input
                      id="marginalReliefCalculation"
                      type="number"
                      value={formData.marginalReliefCalculation}
                      onChange={(e) => updateField('marginalReliefCalculation', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                    <p className="text-xs text-gray-500">For profits between £50k and £250k</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marginalReliefAmount" className="text-[#001f3f]">Marginal Relief Amount</Label>
                    <Input
                      id="marginalReliefAmount"
                      type="number"
                      value={formData.marginalReliefAmount}
                      onChange={(e) => updateField('marginalReliefAmount', parseFloat(e.target.value) || 0)}
                      disabled={!editMode}
                      className="border-[#001f3f]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherReliefsDescription" className="text-[#001f3f]">Other Reliefs Description</Label>
                <Textarea
                  id="otherReliefsDescription"
                  value={formData.otherReliefsDescription}
                  onChange={(e) => updateField('otherReliefsDescription', e.target.value)}
                  disabled={!editMode}
                  rows={3}
                  className="border-[#001f3f]"
                  placeholder="Describe any other reliefs or credits claimed..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherReliefsAmount" className="text-[#001f3f]">Other Reliefs Amount</Label>
                <Input
                  id="otherReliefsAmount"
                  type="number"
                  value={formData.otherReliefsAmount}
                  onChange={(e) => updateField('otherReliefsAmount', parseFloat(e.target.value) || 0)}
                  disabled={!editMode}
                  className="border-[#001f3f]"
                />
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-[#001f3f] mb-6">Total Reliefs & Credits Summary</h3>
                
                <div className="space-y-3 bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm">Patent Box Relief:</span>
                    <span className="font-semibold text-green-600">£{totals.patentBoxRelief.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm">Creative Industry Relief:</span>
                    <span className="font-semibold text-green-600">£{totals.creativeIndustryRelief.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm">Land Remediation Relief:</span>
                    <span className="font-semibold text-green-600">£{totals.landRemediationRelief.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm">Structures & Buildings Allowance:</span>
                    <span className="font-semibold text-green-600">£{totals.structuresRelief.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm">First Year Allowance:</span>
                    <span className="font-semibold text-green-600">£{totals.firstYearRelief.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm">Super-Deduction:</span>
                    <span className="font-semibold text-green-600">£{totals.superDeductionRelief.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm">Marginal Relief:</span>
                    <span className="font-semibold text-green-600">£{(formData.marginalReliefAmount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm">Other Reliefs:</span>
                    <span className="font-semibold text-green-600">£{(formData.otherReliefsAmount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t-2 border-[#001f3f]">
                    <span className="text-lg font-bold">Total Reliefs & Credits:</span>
                    <span className="text-2xl font-bold text-green-600">£{totals.totalReliefsAndCredits.toLocaleString()}</span>
                  </div>
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
                    placeholder="Additional notes about reliefs and credits claimed..."
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

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Save, Plus, X } from 'lucide-react'

interface IndividualClient {
  id?: string
  firstName: string
  lastName: string
  title?: 'Mr' | 'Mrs' | 'Miss' | 'Ms' | 'Dr' | 'Prof'
  dateOfBirth?: string
  nationalInsuranceNumber?: string
  utr?: string
  businessStartDate?: string
  businessType?: 'self-employed' | 'partnership' | 'rental-income' | 'investment-income' | 'employed'
  tradingName?: string
  vatNumber?: string
  vatScheme?: 'non-vat' | 'standard-accrual' | 'standard-cash' | 'flat-rate-accrual' | 'flat-rate-cash'
  vatRegDate?: string
  vatSubmitType?: 'monthly' | 'quarterly' | 'yearly'
  accountOfficeRef?: string
  payeRef?: string
  email: string
  phone: string
  mobile?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  county?: string
  postcode?: string
  country?: string
  taxStatus: 'self-assessment' | 'paye' | 'both' | 'non-uk-resident'
  lastTaxReturn?: string
  nextDueDate?: string
  annualFee?: number
  engagementLetterSigned?: boolean
  engagementLetterDate?: string
  notes?: string
  tags?: string[]
}

interface IndividualClientFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client?: IndividualClient | null
  onSave: (client: Partial<IndividualClient>) => void
  mode: 'add' | 'edit' | 'view'
}

export const IndividualClientForm: React.FC<IndividualClientFormProps> = ({
  open,
  onOpenChange,
  client,
  onSave,
  mode
}) => {
  const [formData, setFormData] = useState<Partial<IndividualClient>>(client || {
    taxStatus: 'self-assessment',
    country: 'United Kingdom',
    tags: []
  })
  
  const [newTag, setNewTag] = useState('')

  const updateField = (field: keyof IndividualClient, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const addTag = () => {
    if (newTag && !formData.tags?.includes(newTag)) {
      updateField('tags', [...(formData.tags || []), newTag])
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    updateField('tags', formData.tags?.filter(t => t !== tag))
  }

  const handleSave = () => {
    onSave(formData)
    onOpenChange(false)
  }

  const isReadOnly = mode === 'view'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#001f3f]">
        <DialogHeader>
          <DialogTitle className="text-[#001f3f] text-2xl">
            {mode === 'add' ? 'Add New Individual Client' : mode === 'edit' ? 'Edit Individual Client' : 'View Client Details'}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-100">
            <TabsTrigger value="basic" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">
              Contact & Address
            </TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">
              Business Details
            </TabsTrigger>
            <TabsTrigger value="tax" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">
              Tax & Compliance
            </TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">
              Notes & Tags
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Basic Info */}
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#001f3f] font-semibold">Title</Label>
                <Select 
                  value={formData.title} 
                  onValueChange={(value) => updateField('title', value)}
                >
                  <SelectTrigger className="border-[#001f3f]" disabled={isReadOnly}>
                    <SelectValue placeholder="Select title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mr">Mr</SelectItem>
                    <SelectItem value="Mrs">Mrs</SelectItem>
                    <SelectItem value="Miss">Miss</SelectItem>
                    <SelectItem value="Ms">Ms</SelectItem>
                    <SelectItem value="Dr">Dr</SelectItem>
                    <SelectItem value="Prof">Prof</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.dateOfBirth || ''}
                  onChange={(e) => updateField('dateOfBirth', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">First Name *</Label>
                <Input
                  value={formData.firstName || ''}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="John"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Last Name *</Label>
                <Input
                  value={formData.lastName || ''}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="Smith"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">National Insurance Number</Label>
                <Input
                  value={formData.nationalInsuranceNumber || ''}
                  onChange={(e) => updateField('nationalInsuranceNumber', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="AB123456C"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">UTR (Tax Reference)</Label>
                <Input
                  value={formData.utr || ''}
                  onChange={(e) => updateField('utr', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="10 digit UTR"
                />
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Contact & Address */}
          <TabsContent value="contact" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#001f3f]">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label className="text-[#001f3f] font-semibold">Email *</Label>
                  <Input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="john.smith@email.com"
                  />
                </div>

                <div>
                  <Label className="text-[#001f3f] font-semibold">Phone</Label>
                  <Input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="020 1234 5678"
                  />
                </div>

                <div>
                  <Label className="text-[#001f3f] font-semibold">Mobile</Label>
                  <Input
                    type="tel"
                    value={formData.mobile || ''}
                    onChange={(e) => updateField('mobile', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="07123 456789"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-[#001f3f] mt-6">Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label className="text-[#001f3f] font-semibold">Address Line 1</Label>
                  <Input
                    value={formData.addressLine1 || ''}
                    onChange={(e) => updateField('addressLine1', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="123 High Street"
                  />
                </div>

                <div className="col-span-2">
                  <Label className="text-[#001f3f] font-semibold">Address Line 2</Label>
                  <Input
                    value={formData.addressLine2 || ''}
                    onChange={(e) => updateField('addressLine2', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="Apartment/District (optional)"
                  />
                </div>

                <div>
                  <Label className="text-[#001f3f] font-semibold">City/Town</Label>
                  <Input
                    value={formData.city || ''}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="London"
                  />
                </div>

                <div>
                  <Label className="text-[#001f3f] font-semibold">County</Label>
                  <Input
                    value={formData.county || ''}
                    onChange={(e) => updateField('county', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="Greater London"
                  />
                </div>

                <div>
                  <Label className="text-[#001f3f] font-semibold">Postcode</Label>
                  <Input
                    value={formData.postcode || ''}
                    onChange={(e) => updateField('postcode', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="SW1A 1AA"
                  />
                </div>

                <div>
                  <Label className="text-[#001f3f] font-semibold">Country</Label>
                  <Input
                    value={formData.country || 'United Kingdom'}
                    onChange={(e) => updateField('country', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Business Details */}
          <TabsContent value="business" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label className="text-[#001f3f] font-semibold">Business Type</Label>
                <Select 
                  value={formData.businessType} 
                  onValueChange={(value) => updateField('businessType', value)}
                >
                  <SelectTrigger className="border-[#001f3f]" disabled={isReadOnly}>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self-employed">Self-Employed</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="rental-income">Rental Income</SelectItem>
                    <SelectItem value="investment-income">Investment Income</SelectItem>
                    <SelectItem value="employed">Employed Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Trading Name</Label>
                <Input
                  value={formData.tradingName || ''}
                  onChange={(e) => updateField('tradingName', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="Business trading name"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Business Start Date</Label>
                <Input
                  type="date"
                  value={formData.businessStartDate || ''}
                  onChange={(e) => updateField('businessStartDate', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                />
              </div>

              <div className="col-span-2">
                <Label className="text-[#001f3f] font-semibold">VAT Scheme</Label>
                <Select 
                  value={formData.vatScheme} 
                  onValueChange={(value) => updateField('vatScheme', value)}
                >
                  <SelectTrigger className="border-[#001f3f]" disabled={isReadOnly}>
                    <SelectValue placeholder="Select VAT scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="non-vat">Non-VAT Registered</SelectItem>
                    <SelectItem value="standard-accrual">Cash-Based Normal Scheme</SelectItem>
                    <SelectItem value="standard-cash">Accrual Based</SelectItem>
                    <SelectItem value="flat-rate-accrual">Flat Rate Accrual Based</SelectItem>
                    <SelectItem value="flat-rate-cash">Flat Rate Cash Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">VAT Number</Label>
                <Input
                  value={formData.vatNumber || ''}
                  onChange={(e) => updateField('vatNumber', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="GB123456789"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">VAT Registration Date</Label>
                <Input
                  type="date"
                  value={formData.vatRegDate || ''}
                  onChange={(e) => updateField('vatRegDate', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">VAT Submit Type</Label>
                <Select 
                  value={formData.vatSubmitType} 
                  onValueChange={(value) => updateField('vatSubmitType', value)}
                >
                  <SelectTrigger className="border-[#001f3f]" disabled={isReadOnly}>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Accounts Office Reference No.</Label>
                <Input
                  value={formData.accountOfficeRef || ''}
                  onChange={(e) => updateField('accountOfficeRef', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="e.g., 123PA45678901"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">PAYE Reference No.</Label>
                <Input
                  value={formData.payeRef || ''}
                  onChange={(e) => updateField('payeRef', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="e.g., 123/AB45678"
                />
              </div>
            </div>
          </TabsContent>

          {/* Tab 4: Tax & Compliance */}
          <TabsContent value="tax" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#001f3f]">Tax Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label className="text-[#001f3f] font-semibold">Tax Status *</Label>
                  <Select 
                    value={formData.taxStatus} 
                    onValueChange={(value) => updateField('taxStatus', value)}
                  >
                    <SelectTrigger className="border-[#001f3f]" disabled={isReadOnly}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self-assessment">Self-Assessment</SelectItem>
                      <SelectItem value="paye">PAYE Only</SelectItem>
                      <SelectItem value="both">Both (Self-Assessment & PAYE)</SelectItem>
                      <SelectItem value="non-uk-resident">Non-UK Resident</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[#001f3f] font-semibold">Last Tax Return Filed</Label>
                  <Input
                    type="date"
                    value={formData.lastTaxReturn || ''}
                    onChange={(e) => updateField('lastTaxReturn', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  />
                </div>

                <div>
                  <Label className="text-[#001f3f] font-semibold">Next Due Date</Label>
                  <Input
                    type="date"
                    value={formData.nextDueDate || ''}
                    onChange={(e) => updateField('nextDueDate', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-[#001f3f] mt-6">Engagement Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Annual Fee (£)</Label>
                  <Input
                    type="number"
                    value={formData.annualFee || ''}
                    onChange={(e) => updateField('annualFee', parseFloat(e.target.value) || 0)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label className="text-[#001f3f] font-semibold">Engagement Letter Date</Label>
                  <Input
                    type="date"
                    value={formData.engagementLetterDate || ''}
                    onChange={(e) => updateField('engagementLetterDate', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  />
                </div>

                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="engagementLetterSigned"
                      checked={formData.engagementLetterSigned || false}
                      onCheckedChange={(checked) => updateField('engagementLetterSigned', checked)}
                    />
                    <Label htmlFor="engagementLetterSigned" className="text-[#001f3f] cursor-pointer">
                      Engagement Letter Signed
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 5: Notes & Tags */}
          <TabsContent value="notes" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label className="text-[#001f3f] font-semibold">Notes</Label>
                <Textarea
                  value={formData.notes || ''}
                  onChange={(e) => updateField('notes', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f] min-h-[150px]"
                  placeholder="Add any additional notes, special requirements, or important information about this client..."
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="Add tag (e.g., VIP, Complex Tax)"
                  />
                  <Button 
                    onClick={addTag}
                    className="bg-[#001f3f] hover:bg-[#003366]"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((tag, index) => (
                    <Badge 
                      key={index} 
                      className="bg-[#001f3f] text-white"
                    >
                      {tag}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {mode === 'view' ? 'Close' : 'Cancel'}
          </Button>
          {mode !== 'view' && (
            <Button onClick={handleSave} className="bg-[#001f3f] hover:bg-[#003366]">
              {mode === 'add' ? (
                <><Plus className="h-4 w-4 mr-2" />Add Client</>
              ) : (
                <><Save className="h-4 w-4 mr-2" />Save Changes</>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

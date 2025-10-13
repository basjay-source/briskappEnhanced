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

interface Client {
  id?: string
  name: string
  type: 'sole-trader' | 'partnership' | 'limited-company' | 'llp' | 'charity' | 'academy' | 'cic'
  registrationNumber?: string
  incorporationDate?: string
  businessStartDate?: string
  vatNumber?: string
  vatScheme?: 'non-vat' | 'standard-accrual' | 'standard-cash' | 'flat-rate-accrual' | 'flat-rate-cash'
  vatRegDate?: string
  vatSubmitType?: 'monthly' | 'quarterly' | 'yearly'
  accountOfficeRef?: string
  payeRef?: string
  utr?: string
  yearEnd: string
  accountsStatus: 'not-started' | 'in-progress' | 'review' | 'completed' | 'filed'
  lastAccounts: string
  nextDue: string
  frsStandard: 'FRS 101' | 'FRS 102' | 'FRS 102 1A' | 'FRS 105' | 'IFRS'
  contactPerson: string
  email: string
  phone: string
  website?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  county?: string
  postcode?: string
  country?: string
  industry?: string
  turnover?: number
  numberOfEmployees?: number
  auditRequired?: boolean
  dormant?: boolean
  annualFee?: number
  engagementLetterSigned?: boolean
  engagementLetterDate?: string
  notes?: string
  tags?: string[]
}

interface EnhancedClientFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client?: Client | null
  onSave: (client: Partial<Client>) => void
  mode: 'add' | 'edit' | 'view'
}

export const EnhancedClientForm: React.FC<EnhancedClientFormProps> = ({
  open,
  onOpenChange,
  client,
  onSave,
  mode
}) => {
  const [formData, setFormData] = useState<Partial<Client>>(client || {
    type: 'limited-company',
    accountsStatus: 'not-started',
    frsStandard: 'FRS 102',
    country: 'United Kingdom',
    tags: []
  })
  
  const [newTag, setNewTag] = useState('')
  const [currentTab, setCurrentTab] = useState('basic')
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const tabs = ['basic', 'contact', 'business', 'compliance', 'notes']

  const updateField = (field: keyof Client, value: any) => {
    setFormData({ ...formData, [field]: value })
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
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

  const validateForm = (): boolean => {
    const errors: string[] = []
    
    if (!formData.name?.trim()) {
      errors.push('Client Name is required')
    }
    if (!formData.email?.trim()) {
      errors.push('Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address')
    }
    if (!formData.phone?.trim()) {
      errors.push('Phone number is required')
    }
    if (!formData.yearEnd) {
      errors.push('Year End date is required')
    }
    
    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleNext = () => {
    const currentIndex = tabs.indexOf(currentTab)
    if (currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const currentIndex = tabs.indexOf(currentTab)
    if (currentIndex > 0) {
      setCurrentTab(tabs[currentIndex - 1])
    }
  }

  const handleSave = () => {
    if (!validateForm()) {
      setCurrentTab('basic')
      return
    }
    onSave(formData)
    onOpenChange(false)
    setValidationErrors([])
  }

  const isReadOnly = mode === 'view'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#001f3f]">
        <DialogHeader>
          <DialogTitle className="text-[#001f3f] text-2xl">
            {mode === 'add' ? 'Add New Client' : mode === 'edit' ? 'Edit Client' : 'View Client Details'}
          </DialogTitle>
        </DialogHeader>

        {validationErrors.length > 0 && (
          <div className="bg-red-50 border-2 border-red-500 rounded p-3 mb-4">
            <p className="font-semibold text-red-800 mb-2">Please fix the following errors:</p>
            <ul className="list-disc list-inside text-sm text-red-700">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
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
            <TabsTrigger value="compliance" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">
              Compliance
            </TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">
              Notes & Tags
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Basic Info */}
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label className="text-[#001f3f] font-semibold">Client Name *</Label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="Enter client/company name"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Entity Type *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => updateField('type', value)}
                >
                  <SelectTrigger className="border-[#001f3f]" disabled={isReadOnly}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="limited-company">Limited Company</SelectItem>
                    <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="sole-trader">Sole Trader</SelectItem>
                    <SelectItem value="charity">Charity</SelectItem>
                    <SelectItem value="academy">Academy</SelectItem>
                    <SelectItem value="cic">Community Interest Company (CIC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Registration Number</Label>
                <Input
                  value={formData.registrationNumber || ''}
                  onChange={(e) => updateField('registrationNumber', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="Company number"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Incorporation Date</Label>
                <Input
                  type="date"
                  value={formData.incorporationDate || ''}
                  onChange={(e) => updateField('incorporationDate', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                />
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
                <Label className="text-[#001f3f] font-semibold">UTR (Tax Reference)</Label>
                <Input
                  value={formData.utr || ''}
                  onChange={(e) => updateField('utr', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="10 digit UTR"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Year End *</Label>
                <Input
                  type="date"
                  value={formData.yearEnd || ''}
                  onChange={(e) => updateField('yearEnd', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Accounts Status</Label>
                <Select 
                  value={formData.accountsStatus} 
                  onValueChange={(value) => updateField('accountsStatus', value)}
                >
                  <SelectTrigger className="border-[#001f3f]" disabled={isReadOnly}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="filed">Filed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Last Accounts Filed</Label>
                <Input
                  type="date"
                  value={formData.lastAccounts || ''}
                  onChange={(e) => updateField('lastAccounts', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Next Due Date</Label>
                <Input
                  type="date"
                  value={formData.nextDue || ''}
                  onChange={(e) => updateField('nextDue', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                />
              </div>

              <div className="col-span-2">
                <Label className="text-[#001f3f] font-semibold">FRS Standard</Label>
                <Select 
                  value={formData.frsStandard} 
                  onValueChange={(value) => updateField('frsStandard', value)}
                >
                  <SelectTrigger className="border-[#001f3f]" disabled={isReadOnly}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FRS 101">FRS 101 (Reduced Disclosure Framework)</SelectItem>
                    <SelectItem value="FRS 102">FRS 102 (UK GAAP)</SelectItem>
                    <SelectItem value="FRS 102 1A">FRS 102 Section 1A (Small Entities)</SelectItem>
                    <SelectItem value="FRS 105">FRS 105 (Micro-entities)</SelectItem>
                    <SelectItem value="IFRS">IFRS (International)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Contact & Address */}
          <TabsContent value="contact" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#001f3f]">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#001f3f] font-semibold">Contact Person</Label>
                  <Input
                    value={formData.contactPerson || ''}
                    onChange={(e) => updateField('contactPerson', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="Main contact name"
                  />
                </div>

                <div>
                  <Label className="text-[#001f3f] font-semibold">Email Address</Label>
                  <Input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="contact@company.com"
                  />
                </div>

                <div>
                  <Label className="text-[#001f3f] font-semibold">Phone Number</Label>
                  <Input
                    value={formData.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="+44 20 1234 5678"
                  />
                </div>

                <div>
                  <Label className="text-[#001f3f] font-semibold">Website</Label>
                  <Input
                    value={formData.website || ''}
                    onChange={(e) => updateField('website', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="https://www.company.com"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-[#001f3f] mt-6">Registered Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label className="text-[#001f3f] font-semibold">Address Line 1</Label>
                  <Input
                    value={formData.addressLine1 || ''}
                    onChange={(e) => updateField('addressLine1', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="Building name/number and street"
                  />
                </div>

                <div className="col-span-2">
                  <Label className="text-[#001f3f] font-semibold">Address Line 2</Label>
                  <Input
                    value={formData.addressLine2 || ''}
                    onChange={(e) => updateField('addressLine2', e.target.value)}
                    className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                    placeholder="District/Area (optional)"
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
              <div>
                <Label className="text-[#001f3f] font-semibold">Business Start Date</Label>
                <Input
                  type="date"
                  value={formData.businessStartDate || ''}
                  onChange={(e) => updateField('businessStartDate', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Year End Date (Month/Year)</Label>
                <Input
                  type="date"
                  value={formData.yearEnd || ''}
                  onChange={(e) => updateField('yearEnd', e.target.value)}
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

              <div className="col-span-2">
                <Label className="text-[#001f3f] font-semibold">Industry/Sector</Label>
                <Input
                  value={formData.industry || ''}
                  onChange={(e) => updateField('industry', e.target.value)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="e.g., Technology, Retail, Manufacturing"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Annual Turnover (£)</Label>
                <Input
                  type="number"
                  value={formData.turnover || ''}
                  onChange={(e) => updateField('turnover', parseFloat(e.target.value) || 0)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Number of Employees</Label>
                <Input
                  type="number"
                  value={formData.numberOfEmployees || ''}
                  onChange={(e) => updateField('numberOfEmployees', parseInt(e.target.value) || 0)}
                  className="text-[#001f3f] border-[#001f3f]" disabled={isReadOnly}
                  placeholder="0"
                />
              </div>
            </div>
          </TabsContent>

          {/* Tab 4: Compliance & Engagement */}
          <TabsContent value="compliance" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#001f3f]">Compliance Requirements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="auditRequired"
                    checked={formData.auditRequired || false}
                    onCheckedChange={(checked) => updateField('auditRequired', checked)}
                  />
                  <Label htmlFor="auditRequired" className="text-[#001f3f] cursor-pointer">
                    Audit Required
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dormant"
                    checked={formData.dormant || false}
                    onCheckedChange={(checked) => updateField('dormant', checked)}
                  />
                  <Label htmlFor="dormant" className="text-[#001f3f] cursor-pointer">
                    Dormant Company
                  </Label>
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
                    placeholder="Add tag (e.g., VIP, High Priority)"
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

        <DialogFooter className="mt-6 flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {mode === 'view' ? 'Close' : 'Cancel'}
            </Button>
          </div>
          <div className="flex gap-2">
            {mode !== 'view' && currentTab !== 'basic' && (
              <Button variant="outline" onClick={handleBack} className="border-[#001f3f] text-[#001f3f]">
                ← Back
              </Button>
            )}
            {mode !== 'view' && currentTab !== 'notes' && (
              <Button onClick={handleNext} className="bg-[#001f3f] hover:bg-[#003366]">
                Next →
              </Button>
            )}
            {mode !== 'view' && currentTab === 'notes' && (
              <Button onClick={handleSave} className="bg-[#001f3f] hover:bg-[#003366]">
                {mode === 'add' ? (
                  <><Plus className="h-4 w-4 mr-2" />Add Client</>
                ) : (
                  <><Save className="h-4 w-4 mr-2" />Save Changes</>
                )}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

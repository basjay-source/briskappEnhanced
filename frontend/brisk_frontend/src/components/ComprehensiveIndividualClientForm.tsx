import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

interface EmploymentHistory {
  id: string
  type: 'employed' | 'director'
  employerName: string
  payeReference: string
  fromDate: string
  toDate: string
  current: boolean
  salary: number
  benefits: number
  expenses: number
}

interface SelfEmploymentBusiness {
  id: string
  tradeName: string
  natureOfBusiness: string
  startDate: string
  accountingPeriodEnd: string
  turnover: number
  expenses: number
  profit: number
  cashBasis: boolean
  utr?: string
}

interface PartnershipDetails {
  id: string
  partnershipName: string
  partnershipUTR: string
  yourShare: number
  accountingPeriodEnd: string
  profitShare: number
}

interface PropertyDetails {
  id: string
  address: string
  propertyType: 'residential' | 'commercial' | 'furnished-holiday-let'
  rentalIncome: number
  expenses: number
  mortgageInterest: number
}

interface ComprehensiveIndividualClient {
  id?: string
  title?: 'Mr' | 'Mrs' | 'Miss' | 'Ms' | 'Dr' | 'Prof'
  firstName: string
  lastName: string
  dateOfBirth?: string
  nationalInsuranceNumber?: string
  utr?: string
  
  email: string
  phone: string
  mobile?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  county?: string
  postcode?: string
  country?: string
  
  employmentHistory: EmploymentHistory[]
  
  selfEmploymentBusinesses: SelfEmploymentBusiness[]
  
  partnerships: PartnershipDetails[]
  
  properties: PropertyDetails[]
  
  taxStatus: 'self-assessment' | 'paye' | 'both' | 'non-uk-resident'
  lastTaxReturn?: string
  nextDueDate?: string
  
  vatRegistered: boolean
  vatNumber?: string
  vatScheme?: 'standard' | 'flat-rate' | 'cash-accounting'
  vatPeriod?: 'monthly' | 'quarterly' | 'annual'
  
  clientType: 'individual' | 'sole-trader' | 'partner'
  
  engagementLetterSigned?: boolean
  engagementLetterDate?: string
  annualFee?: number
  
  notes?: string
  tags?: string[]
}

interface ComprehensiveIndividualClientFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client?: Partial<ComprehensiveIndividualClient> | null
  onSave: (client: Partial<ComprehensiveIndividualClient>) => void
  mode: 'add' | 'edit' | 'view'
}

export default function ComprehensiveIndividualClientForm({
  open,
  onOpenChange,
  client,
  onSave,
  mode
}: ComprehensiveIndividualClientFormProps) {
  const [formData, setFormData] = useState<Partial<ComprehensiveIndividualClient>>(client || {
    taxStatus: 'self-assessment',
    country: 'United Kingdom',
    clientType: 'individual',
    vatRegistered: false,
    employmentHistory: [],
    selfEmploymentBusinesses: [],
    partnerships: [],
    properties: [],
    tags: []
  })

  const [currentTab, setCurrentTab] = useState('basic')
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const tabs = ['basic', 'contact', 'employment', 'business', 'property', 'tax', 'notes']

  const updateField = (field: keyof ComprehensiveIndividualClient, value: any) => {
    setFormData({ ...formData, [field]: value })
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const addEmployment = () => {
    const newEmployment: EmploymentHistory = {
      id: Date.now().toString(),
      type: 'employed',
      employerName: '',
      payeReference: '',
      fromDate: '',
      toDate: '',
      current: false,
      salary: 0,
      benefits: 0,
      expenses: 0
    }
    setFormData(prev => ({
      ...prev,
      employmentHistory: [...(prev.employmentHistory || []), newEmployment]
    }))
  }

  const addBusiness = () => {
    const newBusiness: SelfEmploymentBusiness = {
      id: Date.now().toString(),
      tradeName: '',
      natureOfBusiness: '',
      startDate: '',
      accountingPeriodEnd: '',
      turnover: 0,
      expenses: 0,
      profit: 0,
      cashBasis: false
    }
    setFormData(prev => ({
      ...prev,
      selfEmploymentBusinesses: [...(prev.selfEmploymentBusinesses || []), newBusiness]
    }))
  }

  const addPartnership = () => {
    const newPartnership: PartnershipDetails = {
      id: Date.now().toString(),
      partnershipName: '',
      partnershipUTR: '',
      yourShare: 0,
      accountingPeriodEnd: '',
      profitShare: 0
    }
    setFormData(prev => ({
      ...prev,
      partnerships: [...(prev.partnerships || []), newPartnership]
    }))
  }

  const addProperty = () => {
    const newProperty: PropertyDetails = {
      id: Date.now().toString(),
      address: '',
      propertyType: 'residential',
      rentalIncome: 0,
      expenses: 0,
      mortgageInterest: 0
    }
    setFormData(prev => ({
      ...prev,
      properties: [...(prev.properties || []), newProperty]
    }))
  }

  const validateForm = (): boolean => {
    const errors: string[] = []
    
    if (!formData.firstName?.trim()) errors.push('First Name is required')
    if (!formData.lastName?.trim()) errors.push('Last Name is required')
    if (!formData.email?.trim()) {
      errors.push('Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address')
    }
    if (!formData.phone?.trim()) errors.push('Phone number is required')
    
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto border-2 border-[#001f3f]">
        <DialogHeader>
          <DialogTitle className="text-[#001f3f] text-2xl font-bold">
            {mode === 'add' ? 'Add New Individual Client' : mode === 'edit' ? 'Edit Individual Client' : 'View Client Details'}
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
          <TabsList className="grid w-full grid-cols-7 bg-gray-100">
            <TabsTrigger value="basic" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="contact" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px">
              Contact
            </TabsTrigger>
            <TabsTrigger value="employment" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px">
              Employment
            </TabsTrigger>
            <TabsTrigger value="business" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px">
              Business
            </TabsTrigger>
            <TabsTrigger value="property" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px">
              Property
            </TabsTrigger>
            <TabsTrigger value="tax" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px">
              Tax & VAT
            </TabsTrigger>
            <TabsTrigger value="notes" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px">
              Notes
            </TabsTrigger>
          </TabsList>

          {/* BASIC INFO TAB */}
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#001f3f] font-semibold">Client Type</Label>
                <Select value={formData.clientType} onValueChange={(value) => updateField('clientType', value)}>
                  <SelectTrigger className="border-[#001f3f]" disabled={isReadOnly}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="sole-trader">Sole Trader</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Title</Label>
                <Select value={formData.title} onValueChange={(value) => updateField('title', value)}>
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
                <Label className="text-[#001f3f] font-semibold">First Name *</Label>
                <Input
                  value={formData.firstName || ''}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className="border-[#001f3f]"
                  disabled={isReadOnly}
                  placeholder="John"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Last Name *</Label>
                <Input
                  value={formData.lastName || ''}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className="border-[#001f3f]"
                  disabled={isReadOnly}
                  placeholder="Smith"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.dateOfBirth || ''}
                  onChange={(e) => updateField('dateOfBirth', e.target.value)}
                  className="border-[#001f3f]"
                  disabled={isReadOnly}
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">National Insurance Number</Label>
                <Input
                  value={formData.nationalInsuranceNumber || ''}
                  onChange={(e) => updateField('nationalInsuranceNumber', e.target.value)}
                  className="border-[#001f3f]"
                  disabled={isReadOnly}
                  placeholder="AB123456C"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">UTR (Tax Reference)</Label>
                <Input
                  value={formData.utr || ''}
                  onChange={(e) => updateField('utr', e.target.value)}
                  className="border-[#001f3f]"
                  disabled={isReadOnly}
                  placeholder="10 digit UTR"
                />
              </div>
            </div>
          </TabsContent>

          {/* CONTACT TAB */}
          <TabsContent value="contact" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label className="text-[#001f3f] font-semibold">Email *</Label>
                <Input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="border-[#001f3f]"
                  disabled={isReadOnly}
                  placeholder="john.smith@email.com"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Phone *</Label>
                <Input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="border-[#001f3f]"
                  disabled={isReadOnly}
                  placeholder="020 1234 5678"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Mobile</Label>
                <Input
                  type="tel"
                  value={formData.mobile || ''}
                  onChange={(e) => updateField('mobile', e.target.value)}
                  className="border-[#001f3f]"
                  disabled={isReadOnly}
                  placeholder="07123 456789"
                />
              </div>

              <div className="col-span-2">
                <Label className="text-[#001f3f] font-semibold">Address Line 1</Label>
                <Input
                  value={formData.addressLine1 || ''}
                  onChange={(e) => updateField('addressLine1', e.target.value)}
                  className="border-[#001f3f]"
                  disabled={isReadOnly}
                  placeholder="123 High Street"
                />
              </div>

              <div className="col-span-2">
                <Label className="text-[#001f3f] font-semibold">Address Line 2</Label>
                <Input
                  value={formData.addressLine2 || ''}
                  onChange={(e) => updateField('addressLine2', e.target.value)}
                  className="border-[#001f3f]"
                  disabled={isReadOnly}
                  placeholder="Apartment/District (optional)"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">City/Town</Label>
                <Input
                  value={formData.city || ''}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="border-[#001f3f]"
                  disabled={isReadOnly}
                  placeholder="London"
                />
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Postcode</Label>
                <Input
                  value={formData.postcode || ''}
                  onChange={(e) => updateField('postcode', e.target.value)}
                  className="border-[#001f3f]"
                  disabled={isReadOnly}
                  placeholder="SW1A 1AA"
                />
              </div>
            </div>
          </TabsContent>

          {/* EMPLOYMENT HISTORY TAB */}
          <TabsContent value="employment" className="space-y-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#001f3f]">Employment History</h3>
              <Button onClick={addEmployment} className="bg-[#001f3f] text-white hover:bg-[#003366]" disabled={isReadOnly}>
                <Plus className="w-4 h-4 mr-2" />
                Add Employment
              </Button>
            </div>

            {(formData.employmentHistory || []).map((employment, index) => (
              <div key={employment.id} className="border-2 border-[#001f3f] rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#001f3f]">Employment {index + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const updated = formData.employmentHistory?.filter(e => e.id !== employment.id)
                      setFormData({ ...formData, employmentHistory: updated })
                    }}
                    disabled={isReadOnly}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="text-[#001f3f] font-semibold">Employer Name</Label>
                    <Input className="border-[#001f3f]" value={employment.employerName} disabled={isReadOnly} />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">PAYE Reference</Label>
                    <Input className="border-[#001f3f]" value={employment.payeReference} disabled={isReadOnly} />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">From Date</Label>
                    <Input type="date" className="border-[#001f3f]" value={employment.fromDate} disabled={isReadOnly} />
                  </div>
                </div>
              </div>
            ))}

            {(formData.employmentHistory?.length === 0) && (
              <p className="text-center text-gray-500 py-8">No employment history added. Click "Add Employment" to begin.</p>
            )}
          </TabsContent>

          {/* BUSINESS TAB */}
          <TabsContent value="business" className="space-y-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#001f3f]">Self-Employment & Partnerships</h3>
              <div className="flex gap-2">
                <Button onClick={addBusiness} className="bg-[#001f3f] text-white hover:bg-[#003366]" disabled={isReadOnly}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Business
                </Button>
                <Button onClick={addPartnership} className="bg-[#001f3f] text-white hover:bg-[#003366]" disabled={isReadOnly}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Partnership
                </Button>
              </div>
            </div>

            {(formData.selfEmploymentBusinesses || []).map((business, index) => (
              <div key={business.id} className="border-2 border-[#001f3f] rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#001f3f]">Business {index + 1}</h4>
                  {!isReadOnly && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-600 text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          selfEmploymentBusinesses: prev.selfEmploymentBusinesses?.filter(b => b.id !== business.id) || []
                        }))
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Trade Name</Label>
                    <Input 
                      className="border-[#001f3f]" 
                      value={business.tradeName} 
                      onChange={(e) => {
                        const updated = [...(formData.selfEmploymentBusinesses || [])]
                        updated[index] = { ...updated[index], tradeName: e.target.value }
                        setFormData(prev => ({ ...prev, selfEmploymentBusinesses: updated }))
                      }}
                      disabled={isReadOnly} 
                    />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Nature of Business</Label>
                    <Input 
                      className="border-[#001f3f]" 
                      value={business.natureOfBusiness} 
                      onChange={(e) => {
                        const updated = [...(formData.selfEmploymentBusinesses || [])]
                        updated[index] = { ...updated[index], natureOfBusiness: e.target.value }
                        setFormData(prev => ({ ...prev, selfEmploymentBusinesses: updated }))
                      }}
                      disabled={isReadOnly} 
                    />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Start Date</Label>
                    <Input 
                      className="border-[#001f3f]" 
                      type="date"
                      value={business.startDate} 
                      onChange={(e) => {
                        const updated = [...(formData.selfEmploymentBusinesses || [])]
                        updated[index] = { ...updated[index], startDate: e.target.value }
                        setFormData(prev => ({ ...prev, selfEmploymentBusinesses: updated }))
                      }}
                      disabled={isReadOnly} 
                    />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Accounting Period End</Label>
                    <Input 
                      className="border-[#001f3f]" 
                      type="date"
                      value={business.accountingPeriodEnd} 
                      onChange={(e) => {
                        const updated = [...(formData.selfEmploymentBusinesses || [])]
                        updated[index] = { ...updated[index], accountingPeriodEnd: e.target.value }
                        setFormData(prev => ({ ...prev, selfEmploymentBusinesses: updated }))
                      }}
                      disabled={isReadOnly} 
                    />
                  </div>
                </div>
              </div>
            ))}

            {(formData.partnerships || []).map((partnership, index) => (
              <div key={partnership.id} className="border-2 border-[#001f3f] rounded-lg p-4 bg-blue-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#001f3f]">Partnership {index + 1}</h4>
                  {!isReadOnly && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-600 text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          partnerships: prev.partnerships?.filter(p => p.id !== partnership.id) || []
                        }))
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Partnership Name</Label>
                    <Input 
                      className="border-[#001f3f] bg-white" 
                      value={partnership.partnershipName} 
                      onChange={(e) => {
                        const updated = [...(formData.partnerships || [])]
                        updated[index] = { ...updated[index], partnershipName: e.target.value }
                        setFormData(prev => ({ ...prev, partnerships: updated }))
                      }}
                      disabled={isReadOnly} 
                      placeholder="Enter partnership name"
                    />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Partnership UTR</Label>
                    <Input 
                      className="border-[#001f3f] bg-white" 
                      value={partnership.partnershipUTR} 
                      onChange={(e) => {
                        const updated = [...(formData.partnerships || [])]
                        updated[index] = { ...updated[index], partnershipUTR: e.target.value }
                        setFormData(prev => ({ ...prev, partnerships: updated }))
                      }}
                      disabled={isReadOnly} 
                      placeholder="10-digit UTR"
                    />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Your Share (%)</Label>
                    <Input 
                      className="border-[#001f3f] bg-white" 
                      type="number"
                      min="0"
                      max="100"
                      value={partnership.yourShare || ''} 
                      onChange={(e) => {
                        const updated = [...(formData.partnerships || [])]
                        updated[index] = { ...updated[index], yourShare: parseFloat(e.target.value) || 0 }
                        setFormData(prev => ({ ...prev, partnerships: updated }))
                      }}
                      disabled={isReadOnly} 
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Accounting Period End</Label>
                    <Input 
                      className="border-[#001f3f] bg-white" 
                      type="date"
                      value={partnership.accountingPeriodEnd} 
                      onChange={(e) => {
                        const updated = [...(formData.partnerships || [])]
                        updated[index] = { ...updated[index], accountingPeriodEnd: e.target.value }
                        setFormData(prev => ({ ...prev, partnerships: updated }))
                      }}
                      disabled={isReadOnly} 
                    />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Your Profit Share (£)</Label>
                    <Input 
                      className="border-[#001f3f] bg-white" 
                      type="number"
                      min="0"
                      value={partnership.profitShare || ''} 
                      onChange={(e) => {
                        const updated = [...(formData.partnerships || [])]
                        updated[index] = { ...updated[index], profitShare: parseFloat(e.target.value) || 0 }
                        setFormData(prev => ({ ...prev, partnerships: updated }))
                      }}
                      disabled={isReadOnly} 
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* PROPERTY TAB */}
          <TabsContent value="property" className="space-y-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#001f3f]">Property Portfolio</h3>
              <Button onClick={addProperty} className="bg-[#001f3f] text-white hover:bg-[#003366]" disabled={isReadOnly}>
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>

            {(formData.properties || []).map((property, index) => (
              <div key={property.id} className="border-2 border-[#001f3f] rounded-lg p-4">
                <h4 className="font-semibold text-[#001f3f] mb-4">Property {index + 1}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="text-[#001f3f] font-semibold">Address</Label>
                    <Input className="border-[#001f3f]" value={property.address} disabled={isReadOnly} />
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* TAX & VAT TAB */}
          <TabsContent value="tax" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#001f3f] font-semibold">Tax Status</Label>
                <Select value={formData.taxStatus} onValueChange={(value) => updateField('taxStatus', value)}>
                  <SelectTrigger className="border-[#001f3f]" disabled={isReadOnly}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self-assessment">Self Assessment</SelectItem>
                    <SelectItem value="paye">PAYE Only</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                    <SelectItem value="non-uk-resident">Non-UK Resident</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* NOTES TAB */}
          <TabsContent value="notes" className="space-y-4 mt-4">
            <div>
              <Label className="text-[#001f3f] font-semibold">Internal Notes</Label>
              <textarea
                className="w-full min-h-[200px] border-2 border-[#001f3f] rounded p-2"
                value={formData.notes || ''}
                onChange={(e) => updateField('notes', e.target.value)}
                disabled={isReadOnly}
                placeholder="Add any relevant notes about this client..."
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between items-center mt-6">
          <div className="flex gap-2">
            {currentTab !== 'basic' && (
              <Button onClick={handleBack} variant="outline" className="border-[#001f3f] text-[#001f3f]">
                ← Back
              </Button>
            )}
            {currentTab !== 'notes' && (
              <Button onClick={handleNext} className="bg-[#001f3f] text-white hover:bg-[#003366]">
                Next →
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-green-600 text-white hover:bg-green-700">
              Save Client
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

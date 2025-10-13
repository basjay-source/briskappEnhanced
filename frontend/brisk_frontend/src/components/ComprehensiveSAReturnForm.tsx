import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

interface Employment {
  id: string
  type: 'employed' | 'director'
  employerName: string
  payeReference: string
  fromDate: string
  toDate: string
  grossPay: number
  taxDeducted: number
  p60Received: boolean
  benefits: {
    companyCarBenefit: number
    medicalInsurance: number
    otherBenefits: number
  }
  expenses: {
    businessMileage: number
    professionalFees: number
    otherExpenses: number
  }
  studentLoan: {
    plan1: number
    plan2: number
  }
}

interface SelfEmployment {
  id: string
  tradeName: string
  description: string
  startDate: string
  accountingPeriodEnd: string
  turnover: number
  allowableExpenses: number
  capitalAllowances: number
  profit: number
  niContributions: {
    class2: number
    class4: number
  }
  losses: {
    currentYearLoss: number
    lossCarryBack: number
    lossCarryForward: number
  }
  overlapRelief: number
  basisPeriodReform: boolean
  cashBasis: boolean
}

interface Partnership {
  id: string
  partnershipName: string
  partnershipUTR: string
  profitShare: number
  accountingPeriodEnd: string
  yourShareOfProfit: number
  yourShareOfLoss: number
  capitalIntroduced: number
  capitalWithdrawn: number
}

interface UKProperty {
  id: string
  propertyAddress: string
  propertyType: 'residential' | 'commercial' | 'furnished-holiday-let'
  rentalIncome: number
  expenses: {
    mortgageInterest: number
    repairsMaintenance: number
    insuranceFees: number
    otherExpenses: number
  }
  profitOrLoss: number
}

interface ForeignProperty {
  id: string
  country: string
  propertyAddress: string
  rentalIncome: number
  expensesAllowed: number
  foreignTaxPaid: number
  profitOrLoss: number
}

interface DividendIncome {
  id: string
  companyName: string
  companyUTR?: string
  ukDividends: number
  foreignDividends: number
  foreignTaxCredit: number
}

interface PensionIncome {
  id: string
  providerName: string
  pensionType: 'state' | 'private' | 'overseas'
  grossPension: number
  taxDeducted: number
  statePensionLumpSum: number
}

interface ForeignIncome {
  id: string
  country: string
  incomeType: 'employment' | 'self-employment' | 'investment' | 'other'
  grossIncome: number
  foreignTaxPaid: number
  taxCreditRelief: number
}

interface ReliefsClaims {
  pensionContributions: number
  giftAidDonations: number
  marriageAllowance: boolean
  marriageAllowanceTransfer: number
  eisInvestments: number
  seisSeed: number
  vctInvestments: number
  loanInterestRelief: number
  maintenancePayments: number
}

interface CapitalGain {
  id: string
  assetType: string
  disposalDate: string
  disposalProceeds: number
  acquisitionCost: number
  enhancementCosts: number
  gain: number
  loss: number
  reliefsClaimed: number
}

interface SAReturnFormData {
  clientId: string
  taxYear: string
  returnType: 'full' | 'short'
  filingDeadline: string
  
  employments: Employment[]
  selfEmployments: SelfEmployment[]
  partnerships: Partnership[]
  ukProperties: UKProperty[]
  foreignProperties: ForeignProperty[]
  dividends: DividendIncome[]
  pensions: PensionIncome[]
  foreignIncome: ForeignIncome[]
  
  savingsInterest: number
  otherIncome: number
  
  reliefs: ReliefsClaims
  
  capitalGains: CapitalGain[]
  
  totalIncome: number
  totalTaxLiability: number
  paymentsOnAccount: {
    firstPayment: number
    secondPayment: number
  }
  balancingPayment: number
  
  status: 'draft' | 'review' | 'submitted'
}

interface ComprehensiveSAReturnFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clients: Array<{ id: string; name: string }>
  onSave: (data: Partial<SAReturnFormData>) => void
}

export default function ComprehensiveSAReturnForm({ 
  open, 
  onOpenChange, 
  clients, 
  onSave 
}: ComprehensiveSAReturnFormProps) {
  const [formData, setFormData] = useState<Partial<SAReturnFormData>>({
    returnType: 'full',
    employments: [],
    selfEmployments: [],
    partnerships: [],
    ukProperties: [],
    foreignProperties: [],
    dividends: [],
    pensions: [],
    foreignIncome: [],
    capitalGains: [],
    reliefs: {
      pensionContributions: 0,
      giftAidDonations: 0,
      marriageAllowance: false,
      marriageAllowanceTransfer: 0,
      eisInvestments: 0,
      seisSeed: 0,
      vctInvestments: 0,
      loanInterestRelief: 0,
      maintenancePayments: 0
    }
  })

  const [currentTab, setCurrentTab] = useState('basic')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const tabs = [
    'basic',
    'employment', 
    'self-employment',
    'property',
    'dividends',
    'pensions',
    'foreign',
    'reliefs',
    'capital-gains',
    'summary'
  ]

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const addEmployment = () => {
    const newEmployment: Employment = {
      id: Date.now().toString(),
      type: 'employed',
      employerName: '',
      payeReference: '',
      fromDate: '',
      toDate: '',
      grossPay: 0,
      taxDeducted: 0,
      p60Received: false,
      benefits: { companyCarBenefit: 0, medicalInsurance: 0, otherBenefits: 0 },
      expenses: { businessMileage: 0, professionalFees: 0, otherExpenses: 0 },
      studentLoan: { plan1: 0, plan2: 0 }
    }
    setFormData(prev => ({
      ...prev,
      employments: [...(prev.employments || []), newEmployment]
    }))
  }

  const addSelfEmployment = () => {
    const newBusiness: SelfEmployment = {
      id: Date.now().toString(),
      tradeName: '',
      description: '',
      startDate: '',
      accountingPeriodEnd: '',
      turnover: 0,
      allowableExpenses: 0,
      capitalAllowances: 0,
      profit: 0,
      niContributions: { class2: 0, class4: 0 },
      losses: { currentYearLoss: 0, lossCarryBack: 0, lossCarryForward: 0 },
      overlapRelief: 0,
      basisPeriodReform: false,
      cashBasis: false
    }
    setFormData(prev => ({
      ...prev,
      selfEmployments: [...(prev.selfEmployments || []), newBusiness]
    }))
  }

  const addUKProperty = () => {
    const newProperty: UKProperty = {
      id: Date.now().toString(),
      propertyAddress: '',
      propertyType: 'residential',
      rentalIncome: 0,
      expenses: {
        mortgageInterest: 0,
        repairsMaintenance: 0,
        insuranceFees: 0,
        otherExpenses: 0
      },
      profitOrLoss: 0
    }
    setFormData(prev => ({
      ...prev,
      ukProperties: [...(prev.ukProperties || []), newProperty]
    }))
  }

  const addDividend = () => {
    const newDividend: DividendIncome = {
      id: Date.now().toString(),
      companyName: '',
      companyUTR: '',
      ukDividends: 0,
      foreignDividends: 0,
      foreignTaxCredit: 0
    }
    setFormData(prev => ({
      ...prev,
      dividends: [...(prev.dividends || []), newDividend]
    }))
  }

  const addPension = () => {
    const newPension: PensionIncome = {
      id: Date.now().toString(),
      providerName: '',
      pensionType: 'private',
      grossPension: 0,
      taxDeducted: 0,
      statePensionLumpSum: 0
    }
    setFormData(prev => ({
      ...prev,
      pensions: [...(prev.pensions || []), newPension]
    }))
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

  const handleSubmit = () => {
    onSave(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto border-2 border-[#001f3f]">
        <DialogHeader>
          <DialogTitle className="text-[#001f3f] text-2xl font-bold">
            Comprehensive Self Assessment Tax Return
          </DialogTitle>
          <DialogDescription className="text-[#001f3f]">
            Enterprise-grade SA return with comprehensive functionality
          </DialogDescription>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-100">
            <TabsTrigger value="basic" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white text-sm">
              Basic Details
            </TabsTrigger>
            <TabsTrigger value="employment" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white text-sm">
              Employment
            </TabsTrigger>
            <TabsTrigger value="self-employment" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white text-sm">
              Self-Employment
            </TabsTrigger>
            <TabsTrigger value="property" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white text-sm">
              Property
            </TabsTrigger>
            <TabsTrigger value="dividends" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white text-sm">
              Dividends & More
            </TabsTrigger>
          </TabsList>

          {/* BASIC DETAILS TAB */}
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#001f3f] font-semibold">Client *</Label>
                <Select value={formData.clientId} onValueChange={(value) => setFormData({ ...formData, clientId: value })}>
                  <SelectTrigger className="border-[#001f3f]">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Tax Year *</Label>
                <Select value={formData.taxYear} onValueChange={(value) => setFormData({ ...formData, taxYear: value })}>
                  <SelectTrigger className="border-[#001f3f]">
                    <SelectValue placeholder="Select tax year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-25">2024-25</SelectItem>
                    <SelectItem value="2023-24">2023-24</SelectItem>
                    <SelectItem value="2022-23">2022-23</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Return Type</Label>
                <Select value={formData.returnType} onValueChange={(value: 'full' | 'short') => setFormData({ ...formData, returnType: value })}>
                  <SelectTrigger className="border-[#001f3f]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Return</SelectItem>
                    <SelectItem value="short">Short Return</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#001f3f] font-semibold">Filing Deadline</Label>
                <Input
                  type="date"
                  value={formData.filingDeadline || ''}
                  onChange={(e) => setFormData({ ...formData, filingDeadline: e.target.value })}
                  className="border-[#001f3f]"
                />
              </div>
            </div>
          </TabsContent>

          {/* EMPLOYMENT TAB */}
          <TabsContent value="employment" className="space-y-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#001f3f]">Employment & Directorship Income</h3>
              <Button onClick={addEmployment} className="bg-[#001f3f] text-white hover:bg-[#003366]">
                <Plus className="w-4 h-4 mr-2" />
                Add Employment
              </Button>
            </div>

            {(formData.employments || []).map((employment, index) => (
              <div key={employment.id} className="border-2 border-[#001f3f] rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#001f3f]">Employment {index + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const updated = formData.employments?.filter(e => e.id !== employment.id)
                      setFormData({ ...formData, employments: updated })
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <Tabs defaultValue="employed" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="employed">Employed</TabsTrigger>
                    <TabsTrigger value="director">Director</TabsTrigger>
                  </TabsList>

                  <TabsContent value="employed" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label className="text-[#001f3f] font-semibold">Employer Name *</Label>
                        <Input
                          value={employment.employerName}
                          onChange={(e) => {
                            const updated = formData.employments?.map(emp =>
                              emp.id === employment.id ? { ...emp, employerName: e.target.value } : emp
                            )
                            setFormData({ ...formData, employments: updated })
                          }}
                          className="border-[#001f3f]"
                          placeholder="e.g., ABC Ltd"
                        />
                      </div>

                      <div>
                        <Label className="text-[#001f3f] font-semibold">PAYE Reference</Label>
                        <Input
                          value={employment.payeReference}
                          onChange={(e) => {
                            const updated = formData.employments?.map(emp =>
                              emp.id === employment.id ? { ...emp, payeReference: e.target.value } : emp
                            )
                            setFormData({ ...formData, employments: updated })
                          }}
                          className="border-[#001f3f]"
                          placeholder="123/AB12345"
                        />
                      </div>

                      <div>
                        <Label className="text-[#001f3f] font-semibold">Gross Pay (P60)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={employment.grossPay}
                          onChange={(e) => {
                            const updated = formData.employments?.map(emp =>
                              emp.id === employment.id ? { ...emp, grossPay: parseFloat(e.target.value) || 0 } : emp
                            )
                            setFormData({ ...formData, employments: updated })
                          }}
                          className="border-[#001f3f]"
                        />
                      </div>

                      <div>
                        <Label className="text-[#001f3f] font-semibold">From Date</Label>
                        <Input
                          type="date"
                          value={employment.fromDate}
                          onChange={(e) => {
                            const updated = formData.employments?.map(emp =>
                              emp.id === employment.id ? { ...emp, fromDate: e.target.value } : emp
                            )
                            setFormData({ ...formData, employments: updated })
                          }}
                          className="border-[#001f3f]"
                        />
                      </div>

                      <div>
                        <Label className="text-[#001f3f] font-semibold">To Date</Label>
                        <Input
                          type="date"
                          value={employment.toDate}
                          onChange={(e) => {
                            const updated = formData.employments?.map(emp =>
                              emp.id === employment.id ? { ...emp, toDate: e.target.value } : emp
                            )
                            setFormData({ ...formData, employments: updated })
                          }}
                          className="border-[#001f3f]"
                        />
                      </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="mt-4">
                      <button
                        onClick={() => toggleSection(`benefits-${employment.id}`)}
                        className="flex items-center text-[#001f3f] font-semibold mb-2"
                      >
                        {expandedSections[`benefits-${employment.id}`] ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                        Benefits & Expenses
                      </button>
                      {expandedSections[`benefits-${employment.id}`] && (
                        <div className="grid grid-cols-3 gap-4 pl-6">
                          <div>
                            <Label className="text-[#001f3f]">Company Car</Label>
                            <Input type="number" step="0.01" className="border-[#001f3f]" value={employment.benefits.companyCarBenefit} />
                          </div>
                          <div>
                            <Label className="text-[#001f3f]">Medical Insurance</Label>
                            <Input type="number" step="0.01" className="border-[#001f3f]" value={employment.benefits.medicalInsurance} />
                          </div>
                          <div>
                            <Label className="text-[#001f3f]">Other Benefits</Label>
                            <Input type="number" step="0.01" className="border-[#001f3f]" value={employment.benefits.otherBenefits} />
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="director">
                    <p className="text-sm text-[#001f3f] italic">Director-specific fields (same structure as employed with additional directorship details)</p>
                  </TabsContent>
                </Tabs>
              </div>
            ))}

            {(formData.employments?.length === 0) && (
              <p className="text-center text-gray-500 py-8">No employments added. Click "Add Employment" to begin.</p>
            )}
          </TabsContent>

          {/* SELF-EMPLOYMENT TAB */}
          <TabsContent value="self-employment" className="space-y-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#001f3f]">Self-Employment & Partnerships</h3>
              <Button onClick={addSelfEmployment} className="bg-[#001f3f] text-white hover:bg-[#003366]">
                <Plus className="w-4 h-4 mr-2" />
                Add Business
              </Button>
            </div>

            {(formData.selfEmployments || []).map((business, index) => (
              <div key={business.id} className="border-2 border-[#001f3f] rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Trade/Business Name</Label>
                    <Input className="border-[#001f3f]" value={business.tradeName} />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Description</Label>
                    <Input className="border-[#001f3f]" value={business.description} />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Turnover</Label>
                    <Input type="number" step="0.01" className="border-[#001f3f]" value={business.turnover} />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Allowable Expenses</Label>
                    <Input type="number" step="0.01" className="border-[#001f3f]" value={business.allowableExpenses} />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Capital Allowances</Label>
                    <Input type="number" step="0.01" className="border-[#001f3f]" value={business.capitalAllowances} />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Net Profit</Label>
                    <Input type="number" step="0.01" className="border-[#001f3f]" value={business.profit} readOnly />
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* PROPERTY TAB */}
          <TabsContent value="property" className="space-y-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#001f3f]">UK Land & Property</h3>
              <Button onClick={addUKProperty} className="bg-[#001f3f] text-white hover:bg-[#003366]">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>

            {(formData.ukProperties || []).map((property, index) => (
              <div key={property.id} className="border-2 border-[#001f3f] rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="text-[#001f3f] font-semibold">Property Address</Label>
                    <Input className="border-[#001f3f]" value={property.propertyAddress} />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Property Type</Label>
                    <Select value={property.propertyType}>
                      <SelectTrigger className="border-[#001f3f]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="furnished-holiday-let">Furnished Holiday Let</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Rental Income</Label>
                    <Input type="number" step="0.01" className="border-[#001f3f]" value={property.rentalIncome} />
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* DIVIDENDS TAB */}
          <TabsContent value="dividends" className="space-y-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#001f3f]">Dividend Income</h3>
              <Button onClick={addDividend} className="bg-[#001f3f] text-white hover:bg-[#003366]">
                <Plus className="w-4 h-4 mr-2" />
                Add Dividend
              </Button>
            </div>

            {(formData.dividends || []).map((dividend, index) => (
              <div key={dividend.id} className="border-2 border-[#001f3f] rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[#001f3f] font-semibold">Company Name</Label>
                    <Input className="border-[#001f3f]" value={dividend.companyName} />
                  </div>
                  <div>
                    <Label className="text-[#001f3f] font-semibold">UK Dividends</Label>
                    <Input type="number" step="0.01" className="border-[#001f3f]" value={dividend.ukDividends} />
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between items-center mt-6">
          <div className="flex gap-2">
            {currentTab !== 'basic' && (
              <Button onClick={handleBack} variant="outline" className="border-[#001f3f] text-[#001f3f]">
                ← Back
              </Button>
            )}
            {currentTab !== 'summary' && (
              <Button onClick={handleNext} className="bg-[#001f3f] text-white hover:bg-[#003366]">
                Next →
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSubmit} className="bg-green-600 text-white hover:bg-green-700">
              Save Return
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

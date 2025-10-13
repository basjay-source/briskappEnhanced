import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface EmploymentDetails {
  employerName: string
  payeReference: string
  grossPay: number
  taxDeducted: number
  benefits: number
  expenses: number
}

interface SelfEmploymentDetails {
  businessName: string
  natureOfBusiness: string
  turnover: number
  grossProfit: number
  allowableExpenses: number
  netProfit: number
  capitalAllowances: number
}

interface PensionDetails {
  providerName: string
  pensionType: string
  grossAmount: number
  taxDeducted: number
}

interface DividendDetails {
  companyName: string
  dividendAmount: number
  isDomestic: boolean
}

interface RentalProperty {
  propertyAddress: string
  rentalIncome: number
  mortgageInterest: number
  repairs: number
  insurance: number
  otherExpenses: number
  netIncome: number
}

interface SAReturn {
  id: string
  clientId: string
  clientName: string
  taxYear: string
  status: 'draft' | 'in_progress' | 'review' | 'submitted' | 'approved'
  dueDate: string
  submittedDate?: string
  utr: string
  niNumber: string
  employmentIncome: number
  employmentDetails?: EmploymentDetails[]
  selfEmploymentIncome: number
  selfEmploymentDetails?: SelfEmploymentDetails[]
  propertyIncome: number
  rentalProperties?: RentalProperty[]
  dividendIncome: number
  dividendDetails?: DividendDetails[]
  pensionIncome?: number
  pensionDetails?: PensionDetails[]
  savingsInterest: number
  capitalGains: number
  otherIncome: number
  totalIncome: number
  personalAllowance: number
  taxRelief: number
  pensionContributions: number
  businessExpenses?: number
  rentalExpenses?: number
  tradingLosses?: number
  capitalAllowances?: number
  charitableGiving: number
  taxableIncome: number
  estimatedTax: number
  progress: number
  notes?: string
  createdAt: string
  updatedAt: string
}

interface SAReturnFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  saReturn: SAReturn | null
  onSave: (data: Partial<SAReturn>) => void
  mode: 'add' | 'edit' | 'view'
  clients: Array<{ id: string; firstName: string; lastName: string; utr?: string; nationalInsuranceNumber?: string }>
}

export function SAReturnForm({ open, onOpenChange, saReturn, onSave, mode, clients }: SAReturnFormProps) {
  const [formData, setFormData] = useState<Partial<SAReturn>>({
    clientId: '',
    clientName: '',
    taxYear: '2024/25',
    status: 'draft',
    dueDate: '',
    utr: '',
    niNumber: '',
    employmentIncome: 0,
    employmentDetails: [],
    selfEmploymentIncome: 0,
    selfEmploymentDetails: [],
    propertyIncome: 0,
    rentalProperties: [],
    dividendIncome: 0,
    dividendDetails: [],
    pensionIncome: 0,
    pensionDetails: [],
    savingsInterest: 0,
    capitalGains: 0,
    otherIncome: 0,
    totalIncome: 0,
    personalAllowance: 12570,
    taxRelief: 0,
    pensionContributions: 0,
    businessExpenses: 0,
    rentalExpenses: 0,
    tradingLosses: 0,
    capitalAllowances: 0,
    charitableGiving: 0,
    taxableIncome: 0,
    estimatedTax: 0,
    progress: 0,
    notes: ''
  })

  const [currentTab, setCurrentTab] = useState('basic')
  const [currentIncomeTab, setCurrentIncomeTab] = useState('employment')
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const tabs = ['basic', 'income', 'deductions', 'summary']

  useEffect(() => {
    if (saReturn && mode !== 'add') {
      setFormData(saReturn)
    } else {
      setFormData({
        clientId: '',
        clientName: '',
        taxYear: '2024/25',
        status: 'draft',
        dueDate: new Date(new Date().getFullYear() + 1, 0, 31).toISOString().split('T')[0],
        utr: '',
        niNumber: '',
        employmentIncome: 0,
        selfEmploymentIncome: 0,
        propertyIncome: 0,
        dividendIncome: 0,
        savingsInterest: 0,
        capitalGains: 0,
        otherIncome: 0,
        totalIncome: 0,
        personalAllowance: 12570,
        taxRelief: 0,
        pensionContributions: 0,
        charitableGiving: 0,
        taxableIncome: 0,
        estimatedTax: 0,
        progress: 0,
        notes: ''
      })
    }
  }, [saReturn, mode, open])

  const handleClientChange = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    if (client) {
      setFormData({
        ...formData,
        clientId,
        clientName: `${client.firstName} ${client.lastName}`,
        utr: client.utr || '',
        niNumber: client.nationalInsuranceNumber || ''
      })
    }
  }

  const calculateTotals = () => {
    const totalIncome = 
      Number(formData.employmentIncome || 0) +
      Number(formData.selfEmploymentIncome || 0) +
      Number(formData.propertyIncome || 0) +
      Number(formData.dividendIncome || 0) +
      Number(formData.savingsInterest || 0) +
      Number(formData.otherIncome || 0)

    const taxableIncome = Math.max(0, 
      totalIncome - 
      Number(formData.personalAllowance || 0) -
      Number(formData.taxRelief || 0) -
      Number(formData.pensionContributions || 0) -
      Number(formData.charitableGiving || 0)
    )

    let estimatedTax = 0
    if (taxableIncome > 125140) {
      estimatedTax = (taxableIncome - 125140) * 0.45 + 50270 * 0.4 + 37700 * 0.2
    } else if (taxableIncome > 50270) {
      estimatedTax = (taxableIncome - 50270) * 0.4 + 37700 * 0.2
    } else if (taxableIncome > 12570) {
      estimatedTax = (taxableIncome - 12570) * 0.2
    }

    const capitalGainsTax = Number(formData.capitalGains || 0) > 6000 
      ? (Number(formData.capitalGains || 0) - 6000) * 0.2 
      : 0

    estimatedTax += capitalGainsTax

    setFormData({
      ...formData,
      totalIncome,
      taxableIncome,
      estimatedTax: Math.round(estimatedTax * 100) / 100
    })
  }

  useEffect(() => {
    calculateTotals()
  }, [
    formData.employmentIncome,
    formData.selfEmploymentIncome,
    formData.propertyIncome,
    formData.dividendIncome,
    formData.savingsInterest,
    formData.otherIncome,
    formData.capitalGains,
    formData.personalAllowance,
    formData.taxRelief,
    formData.pensionContributions,
    formData.charitableGiving
  ])

  const validateForm = (): boolean => {
    const errors: string[] = []
    
    if (!formData.clientId?.trim()) {
      errors.push('Client is required')
    }
    if (!formData.taxYear?.trim()) {
      errors.push('Tax Year is required')
    }
    if (!formData.dueDate) {
      errors.push('Due Date is required')
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#001f3f] text-xl">
            {mode === 'add' ? 'New SA Return' : mode === 'edit' ? 'Edit SA Return' : 'View SA Return'}
          </DialogTitle>
          <DialogDescription className="text-[#001f3f]">
            {mode === 'add' 
              ? 'Create a new Self Assessment tax return for a client' 
              : mode === 'edit'
              ? 'Update Self Assessment tax return details'
              : 'View Self Assessment tax return details'}
          </DialogDescription>
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

        <form onSubmit={handleSubmit}>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100">
              <TabsTrigger value="basic" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">Basic Info</TabsTrigger>
              <TabsTrigger value="income" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">Income</TabsTrigger>
              <TabsTrigger value="deductions" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">Deductions</TabsTrigger>
              <TabsTrigger value="summary" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client" className="text-[#001f3f]">Client*</Label>
                  <Select
                    value={formData.clientId}
                    onValueChange={handleClientChange}
                    disabled={isReadOnly || mode === 'edit'}
                  >
                    <SelectTrigger className="border-[#001f3f]">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.firstName} {client.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxYear" className="text-[#001f3f]">Tax Year*</Label>
                  <Select
                    value={formData.taxYear}
                    onValueChange={(value) => setFormData({ ...formData, taxYear: value })}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger className="border-[#001f3f]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024/25">2024/25</SelectItem>
                      <SelectItem value="2023/24">2023/24</SelectItem>
                      <SelectItem value="2022/23">2022/23</SelectItem>
                      <SelectItem value="2021/22">2021/22</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="utr" className="text-[#001f3f]">UTR</Label>
                  <Input
                    id="utr"
                    value={formData.utr}
                    onChange={(e) => setFormData({ ...formData, utr: e.target.value })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="niNumber" className="text-[#001f3f]">NI Number</Label>
                  <Input
                    id="niNumber"
                    value={formData.niNumber}
                    onChange={(e) => setFormData({ ...formData, niNumber: e.target.value })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="text-[#001f3f]">Due Date*</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-[#001f3f]">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger className="border-[#001f3f]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="income" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentIncome" className="text-[#001f3f]">Employment Income (£)</Label>
                  <Input
                    id="employmentIncome"
                    type="number"
                    step="0.01"
                    value={formData.employmentIncome}
                    onChange={(e) => setFormData({ ...formData, employmentIncome: parseFloat(e.target.value) || 0 })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="selfEmploymentIncome" className="text-[#001f3f]">Self Employment Income (£)</Label>
                  <Input
                    id="selfEmploymentIncome"
                    type="number"
                    step="0.01"
                    value={formData.selfEmploymentIncome}
                    onChange={(e) => setFormData({ ...formData, selfEmploymentIncome: parseFloat(e.target.value) || 0 })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyIncome" className="text-[#001f3f]">Property Income (£)</Label>
                  <Input
                    id="propertyIncome"
                    type="number"
                    step="0.01"
                    value={formData.propertyIncome}
                    onChange={(e) => setFormData({ ...formData, propertyIncome: parseFloat(e.target.value) || 0 })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dividendIncome" className="text-[#001f3f]">Dividend Income (£)</Label>
                  <Input
                    id="dividendIncome"
                    type="number"
                    step="0.01"
                    value={formData.dividendIncome}
                    onChange={(e) => setFormData({ ...formData, dividendIncome: parseFloat(e.target.value) || 0 })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="savingsInterest" className="text-[#001f3f]">Savings Interest (£)</Label>
                  <Input
                    id="savingsInterest"
                    type="number"
                    step="0.01"
                    value={formData.savingsInterest}
                    onChange={(e) => setFormData({ ...formData, savingsInterest: parseFloat(e.target.value) || 0 })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherIncome" className="text-[#001f3f]">Other Income (£)</Label>
                  <Input
                    id="otherIncome"
                    type="number"
                    step="0.01"
                    value={formData.otherIncome}
                    onChange={(e) => setFormData({ ...formData, otherIncome: parseFloat(e.target.value) || 0 })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capitalGains" className="text-[#001f3f]">Capital Gains (£)</Label>
                  <Input
                    id="capitalGains"
                    type="number"
                    step="0.01"
                    value={formData.capitalGains}
                    onChange={(e) => setFormData({ ...formData, capitalGains: parseFloat(e.target.value) || 0 })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="deductions" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="personalAllowance" className="text-[#001f3f]">Personal Allowance (£)</Label>
                  <Input
                    id="personalAllowance"
                    type="number"
                    step="0.01"
                    value={formData.personalAllowance}
                    onChange={(e) => setFormData({ ...formData, personalAllowance: parseFloat(e.target.value) || 0 })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pensionContributions" className="text-[#001f3f]">Pension Contributions (£)</Label>
                  <Input
                    id="pensionContributions"
                    type="number"
                    step="0.01"
                    value={formData.pensionContributions}
                    onChange={(e) => setFormData({ ...formData, pensionContributions: parseFloat(e.target.value) || 0 })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="charitableGiving" className="text-[#001f3f]">Charitable Giving (£)</Label>
                  <Input
                    id="charitableGiving"
                    type="number"
                    step="0.01"
                    value={formData.charitableGiving}
                    onChange={(e) => setFormData({ ...formData, charitableGiving: parseFloat(e.target.value) || 0 })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxRelief" className="text-[#001f3f]">Other Tax Relief (£)</Label>
                  <Input
                    id="taxRelief"
                    type="number"
                    step="0.01"
                    value={formData.taxRelief}
                    onChange={(e) => setFormData({ ...formData, taxRelief: parseFloat(e.target.value) || 0 })}
                    className="border-[#001f3f]"
                    disabled={isReadOnly}
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes" className="text-[#001f3f]">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="border-[#001f3f]"
                    rows={4}
                    disabled={isReadOnly}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4 mt-4">
              <div className="border-2 border-[#001f3f] rounded p-4 space-y-3 bg-blue-50">
                <h3 className="font-bold text-[#001f3f] text-lg">Tax Calculation Summary</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-[#001f3f] rounded">
                    <div className="text-sm text-[#001f3f]">Total Income</div>
                    <div className="text-xl font-bold text-[#001f3f]">£{formData.totalIncome?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>

                  <div className="p-3 bg-white border border-[#001f3f] rounded">
                    <div className="text-sm text-[#001f3f]">Taxable Income</div>
                    <div className="text-xl font-bold text-[#001f3f]">£{formData.taxableIncome?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>

                  <div className="p-3 bg-white border border-[#001f3f] rounded col-span-2">
                    <div className="text-sm text-[#001f3f]">Estimated Tax Liability</div>
                    <div className="text-2xl font-bold text-[#001f3f]">£{formData.estimatedTax?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#001f3f]">
                  <h4 className="font-semibold text-[#001f3f]">Income Breakdown</h4>
                  {formData.employmentIncome! > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#001f3f]">Employment Income:</span>
                      <span className="font-medium text-[#001f3f]">£{formData.employmentIncome?.toLocaleString()}</span>
                    </div>
                  )}
                  {formData.selfEmploymentIncome! > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#001f3f]">Self Employment:</span>
                      <span className="font-medium text-[#001f3f]">£{formData.selfEmploymentIncome?.toLocaleString()}</span>
                    </div>
                  )}
                  {formData.propertyIncome! > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#001f3f]">Property Income:</span>
                      <span className="font-medium text-[#001f3f]">£{formData.propertyIncome?.toLocaleString()}</span>
                    </div>
                  )}
                  {formData.dividendIncome! > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#001f3f]">Dividends:</span>
                      <span className="font-medium text-[#001f3f]">£{formData.dividendIncome?.toLocaleString()}</span>
                    </div>
                  )}
                  {formData.savingsInterest! > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#001f3f]">Savings Interest:</span>
                      <span className="font-medium text-[#001f3f]">£{formData.savingsInterest?.toLocaleString()}</span>
                    </div>
                  )}
                  {formData.capitalGains! > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#001f3f]">Capital Gains:</span>
                      <span className="font-medium text-[#001f3f]">£{formData.capitalGains?.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-3 border-t border-[#001f3f]">
                  <h4 className="font-semibold text-[#001f3f]">Deductions</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#001f3f]">Personal Allowance:</span>
                    <span className="font-medium text-[#001f3f]">£{formData.personalAllowance?.toLocaleString()}</span>
                  </div>
                  {formData.pensionContributions! > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#001f3f]">Pension Contributions:</span>
                      <span className="font-medium text-[#001f3f]">£{formData.pensionContributions?.toLocaleString()}</span>
                    </div>
                  )}
                  {formData.charitableGiving! > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#001f3f]">Charitable Giving:</span>
                      <span className="font-medium text-[#001f3f]">£{formData.charitableGiving?.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6 flex justify-between">
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {mode === 'view' ? 'Close' : 'Cancel'}
              </Button>
            </div>
            <div className="flex gap-2">
              {!isReadOnly && currentTab !== 'basic' && (
                <Button type="button" variant="outline" onClick={handleBack} className="border-[#001f3f] text-[#001f3f]">
                  ← Back
                </Button>
              )}
              {!isReadOnly && currentTab !== 'summary' && (
                <Button type="button" onClick={handleNext} className="bg-[#001f3f] hover:bg-[#003366]">
                  Next →
                </Button>
              )}
              {!isReadOnly && currentTab === 'summary' && (
                <Button type="submit" className="bg-[#001f3f] hover:bg-[#001f3f]/90">
                  {mode === 'add' ? 'Create SA Return' : 'Update SA Return'}
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

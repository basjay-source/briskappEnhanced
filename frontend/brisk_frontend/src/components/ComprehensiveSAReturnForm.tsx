import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus } from 'lucide-react'
import { importFromBookkeeping, importFromAccountsProduction, importFromPreviousYear } from '@/services/taxReturnDataImport'
import { getTaxRatesForYear, calculateIncomeTax, calculateDividendTax, calculateCapitalGainsTax, generateTaxYears } from '@/services/taxRates'

interface EmploymentDetails {
  id: string
  employerName: string // Box 5
  payeReference: string // Box 4
  dateStoppedBeingDirector: string // Box 6.1
  payFromEmployment: number // Box 1
  taxDeducted: number // Box 2
  tipsAndOtherPayments: number // Box 3
  directorIndicator: boolean // Box 6
  offPayrollWorkingIndicator: boolean // Box 8
  benefits: {
    companyCarAndVan: number // Box 9
    fuelForCompanyCar: number // Box 10
    privateMedicalDental: number // Box 11
    vouchersCreditsCards: number // Box 12
    otherBenefits: number
  }
  expenses: {
    travelExpenses: number // Box 17-20
    professionalFees: number
    otherExpenses: number
    expensesDescription: string
  }
}

interface SelfEmploymentDetails {
  id: string
  businessName: string
  businessDescription: string
  accountingBasis: 'cash' | 'traditional'
  accountsPeriodEnd: string
  turnover: number // Box 15
  otherBusinessIncome: number // Box 16
  tradingIncomeAllowanceClaimed: boolean // Box 16.1
  tradingIncomeAllowanceAmount: number
  costOfGoods: number // Box 17
  paymentsToSubcontractors: number // Box 18 CIS
  staffCosts: number // Box 19
  carTravelExpenses: number // Box 20
  rentRatesPowerInsurance: number // Box 21
  repairsMaintenance: number // Box 22
  phoneStationeryOffice: number // Box 23
  advertisingEntertainment: number // Box 24
  interestOnLoans: number // Box 25
  bankCharges: number // Box 26
  irrecoverableDebts: number // Box 27
  accountancyLegalFees: number // Box 28
  depreciationLossProfitOnSale: number // Box 29
  otherBusinessExpenses: number // Box 30
  privateUseAdjustments: number // Box 32-45
  disallowables: number
  capitalAllowances: {
    annualInvestmentAllowance: number // Box 49-59
    otherCapitalAllowances: number
  }
  netProfit: number // Box 47
  netLoss: number // Box 48
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

interface BankInterestDetails {
  id: string
  institutionName: string
  accountNumber: string
  grossInterest: number
  taxDeducted: number
  isForeign: boolean
  country?: string
}

interface CapitalGainsAsset {
  id: string
  assetType: 'property' | 'shares' | 'crypto' | 'other'
  description: string
  dateAcquired: string
  acquisitionCost: number
  dateDisposed: string
  disposalProceeds: number
  allowableExpenses: number
  gain: number
  loss: number
}

interface RentalProperty {
  id: string
  propertyType: 'uk-rental' | 'fhl-uk' | 'fhl-eea' | 'other'
  jointOwnership: boolean // Box 3
  rentARoomRelief: boolean
  totalRents: number // Box 20
  taxDeductedFromRents: number // Box 21
  premiumsForLease: number // Box 22
  reversePremiums: number // Box 23
  propertyIncomeAllowanceClaimed: boolean // Box 20.1
  propertyIncomeAllowanceAmount: number
  accountingBasis: 'cash' | 'traditional' // Box 20.2
  expenses: {
    rentRatesInsurance: number // Box 24
    repairs: number // Box 25
    nonResidentialFinanceCosts: number // Box 26
    legalManagementFees: number // Box 27
    servicesWages: number // Box 28
    otherExpenses: number // Box 29
  }
  privateUseAdjustment: number // Box 30
  balancingCharges: number // Box 31
  capitalAllowances: {
    annualInvestmentAllowance: number // Box 32-33.2
    otherAllowances: number
  }
  netProfit: number
  netLoss: number
}

interface BankInterest {
  taxedUKInterestNet: number // Box 1
  untaxedUKInterestGross: number // Box 2
  untaxedForeignInterest: number // Box 3
  foreignCountry: string
}

interface PensionContributions {
  paymentsToRegisteredSchemes: number // Box 1
  oneOffPensionContributions: number // Box 1.1
  paymentsToRetirementAnnuities: number // Box 2
  paymentsToEmployerSchemes: number // Box 3
  paymentsToOverseasSchemes: number // Box 4
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
  bankInterest?: BankInterest
  bankInterestDetails?: BankInterestDetails[]
  savingsInterest: number
  capitalGains: number
  capitalGainsAssets?: CapitalGainsAsset[]
  otherIncome: number
  totalIncome: number
  personalAllowance: number
  taxRelief: number
  pensionContributionsTotal: number
  detailedPensionContributions?: PensionContributions
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
    bankInterest: {
      taxedUKInterestNet: 0,
      untaxedUKInterestGross: 0,
      untaxedForeignInterest: 0,
      foreignCountry: ''
    },
    savingsInterest: 0,
    capitalGains: 0,
    otherIncome: 0,
    totalIncome: 0,
    personalAllowance: 12570,
    taxRelief: 0,
    pensionContributionsTotal: 0,
    detailedPensionContributions: {
      paymentsToRegisteredSchemes: 0,
      oneOffPensionContributions: 0,
      paymentsToRetirementAnnuities: 0,
      paymentsToEmployerSchemes: 0,
      paymentsToOverseasSchemes: 0
    },
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
  
  const [showSetup, setShowSetup] = useState(mode === 'add')
  const [setupData, setSetupData] = useState({
    refNo: `SA-${Math.floor(Math.random() * 1000)}`,
    description: '',
    taxYear: '2024-25',
    returnType: 'new' as 'new' | 'amended',
    importSource: 'manual' as 'manual' | 'previous' | 'bookkeeping' | 'accounts',
    previousReturnId: '',
    addToQuestionnaire: false
  })

  const [showExchangeSync, setShowExchangeSync] = useState(false)
  const [showInterestModal, setShowInterestModal] = useState(false)
  const [showCapitalGainsModal, setShowCapitalGainsModal] = useState(false)

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
    const employmentTotal = (formData.employmentDetails || []).reduce((sum, emp) => 
      sum + Number(emp.grossPay || 0) + Number(emp.benefits || 0) - Number(emp.expenses || 0), 0
    )

    const selfEmploymentTotal = (formData.selfEmploymentDetails || []).reduce((sum, business) =>
      sum + Number(business.turnover || 0) - Number(business.allowableExpenses || 0) - Number(business.capitalAllowances || 0), 0
    )

    const rentalTotal = (formData.rentalProperties || []).reduce((sum, property) =>
      sum + Number(property.rentalIncome || 0) - Number(property.mortgageInterest || 0) - 
      Number(property.repairs || 0) - Number(property.insurance || 0) - Number(property.otherExpenses || 0), 0
    )

    const dividendTotal = (formData.dividendDetails || []).reduce((sum, div) =>
      sum + Number(div.dividendAmount || 0), 0
    )

    const pensionTotal = (formData.pensionDetails || []).reduce((sum, pension) =>
      sum + Number(pension.grossAmount || 0), 0
    )

    const totalIncome = 
      employmentTotal +
      selfEmploymentTotal +
      rentalTotal +
      dividendTotal +
      pensionTotal +
      Number(formData.savingsInterest || 0) +
      Number(formData.otherIncome || 0)

    const taxYear = formData.taxYear?.replace('/', '-') || '2024-25'
    const taxRates = getTaxRatesForYear(taxYear)

    const nonDividendIncome = totalIncome - dividendTotal - Number(formData.capitalGains || 0)
    
    const taxableIncome = Math.max(0, 
      totalIncome - 
      taxRates.personalAllowance -
      Number(formData.taxRelief || 0) -
      Number(formData.pensionContributions || 0) -
      Number(formData.charitableGiving || 0)
    )

    const incomeTax = calculateIncomeTax(nonDividendIncome, taxYear)
    const dividendTax = calculateDividendTax(dividendTotal, nonDividendIncome, taxYear)
    const capitalGainsTax = calculateCapitalGainsTax(
      Number(formData.capitalGains || 0), 
      taxableIncome - Number(formData.capitalGains || 0), 
      taxYear
    )

    const estimatedTax = incomeTax + dividendTax + capitalGainsTax

    setFormData({
      ...formData,
      employmentIncome: employmentTotal,
      selfEmploymentIncome: selfEmploymentTotal,
      propertyIncome: rentalTotal,
      dividendIncome: dividendTotal,
      pensionIncome: pensionTotal,
      totalIncome,
      taxableIncome,
      estimatedTax: Math.round(estimatedTax * 100) / 100,
      personalAllowance: taxRates.personalAllowance
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

  const handleSetupComplete = async () => {
    try {
      let importedData: any = {}

      if (setupData.importSource === 'bookkeeping' && formData.clientId) {
        importedData = await importFromBookkeeping(formData.clientId)
      } else if (setupData.importSource === 'accounts' && formData.clientId) {
        importedData = await importFromAccountsProduction(formData.clientId)
      } else if (setupData.importSource === 'previous' && setupData.previousReturnId) {
        importedData = await importFromPreviousYear(setupData.previousReturnId)
      }

      setFormData({
        ...formData,
        ...importedData,
        taxYear: setupData.taxYear.replace('-', '/'),
        status: setupData.returnType === 'new' ? 'draft' : 'amended'
      })
      setShowSetup(false)
    } catch (error) {
      console.error('Error importing data:', error)
      setFormData({
        ...formData,
        taxYear: setupData.taxYear.replace('-', '/'),
        status: setupData.returnType === 'new' ? 'draft' : 'amended'
      })
      setShowSetup(false)
    }
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

        {showSetup && mode === 'add' ? (
          <div className="space-y-6 py-4">
            <h3 className="text-xl font-semibold text-gray-700">Create new SA100 Tax Return</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Select Client <span className="text-red-600">*</span></Label>
                <Select
                  value={formData.clientId}
                  onValueChange={handleClientChange}
                >
                  <SelectTrigger className="border-gray-300">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700">Ref No <span className="text-red-600">*</span></Label>
                  <Input
                    value={setupData.refNo}
                    onChange={(e) => setSetupData({ ...setupData, refNo: e.target.value })}
                    className="border-gray-300 bg-gray-100"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Description</Label>
                  <Input
                    value={setupData.description}
                    onChange={(e) => setSetupData({ ...setupData, description: e.target.value })}
                    className="border-gray-300"
                    placeholder="Optional description"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Tax Year <span className="text-red-600">*</span></Label>
                <Select
                  value={setupData.taxYear}
                  onValueChange={(value) => setSetupData({ ...setupData, taxYear: value })}
                >
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {generateTaxYears().map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Return Type <span className="text-red-600">*</span></Label>
                <div className="flex gap-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={setupData.returnType === 'new'}
                      onChange={() => setSetupData({ ...setupData, returnType: 'new' })}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-gray-700">New</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={setupData.returnType === 'amended'}
                      onChange={() => setSetupData({ ...setupData, returnType: 'amended' })}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">Amended</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Import Data</Label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={setupData.importSource === 'previous'}
                      onChange={() => setSetupData({ ...setupData, importSource: 'previous' })}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-gray-700">Previous Year</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={setupData.importSource === 'bookkeeping'}
                      onChange={() => setSetupData({ ...setupData, importSource: 'bookkeeping' })}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">Bookkeeping</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={setupData.importSource === 'manual'}
                      onChange={() => setSetupData({ ...setupData, importSource: 'manual' })}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">Manual</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={setupData.importSource === 'accounts'}
                      onChange={() => setSetupData({ ...setupData, importSource: 'accounts' })}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">Accounts Production</span>
                  </label>
                </div>
              </div>

              {setupData.importSource === 'previous' && (
                <div className="space-y-2">
                  <Label className="text-gray-700">Select Tax Return</Label>
                  <Select
                    value={setupData.previousReturnId}
                    onValueChange={(value) => setSetupData({ ...setupData, previousReturnId: value })}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="SA-4 2023-24" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sa4-2023">SA-4 2023-24</SelectItem>
                      <SelectItem value="sa3-2022">SA-3 2022-23</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="questionnaire"
                  checked={setupData.addToQuestionnaire}
                  onChange={(e) => setSetupData({ ...setupData, addToQuestionnaire: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="questionnaire" className="text-gray-700 cursor-pointer">
                  Add this client's return to the Questionnaire dashboard
                </Label>
              </div>
            </div>

            <DialogFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-2"
              >
                ← Back
              </Button>
              <Button 
                type="button" 
                onClick={handleSetupComplete}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Save & Continue
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-9 bg-gray-100">
              <TabsTrigger value="basic" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Basic Info</TabsTrigger>
              <TabsTrigger value="income" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Income</TabsTrigger>
              <TabsTrigger value="deductions" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Deductions</TabsTrigger>
              <TabsTrigger value="capitalallowances" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Capital Allow.</TabsTrigger>
              <TabsTrigger value="capitalgains" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Capital Gains</TabsTrigger>
              <TabsTrigger value="losses" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Losses</TabsTrigger>
              <TabsTrigger value="paymentonaccount" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Payment/Acc</TabsTrigger>
              <TabsTrigger value="other" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Other</TabsTrigger>
              <TabsTrigger value="summary" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Summary</TabsTrigger>
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
              <Tabs value={currentIncomeTab} onValueChange={setCurrentIncomeTab} className="w-full">
                <TabsList className="grid w-full grid-cols-7 bg-gray-100">
                  <TabsTrigger value="employment" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Employment</TabsTrigger>
                  <TabsTrigger value="selfemployment" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Self-Employed</TabsTrigger>
                  <TabsTrigger value="rental" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Rental</TabsTrigger>
                  <TabsTrigger value="dividends" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Dividends</TabsTrigger>
                  <TabsTrigger value="pensions" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Pensions</TabsTrigger>
                  <TabsTrigger value="interest" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Interest</TabsTrigger>
                  <TabsTrigger value="other" className="bg-blue-500 text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs mx-px whitespace-normal break-words">Other</TabsTrigger>
                </TabsList>

                {/* Employment Income Tab */}
                <TabsContent value="employment" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#001f3f]">Employment Income Details</h3>
                    {!isReadOnly && (
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => {
                          const newEmployment: EmploymentDetails = {
                            id: `emp-${Date.now()}`,
                            employerName: '',
                            payeReference: '',
                            dateStoppedBeingDirector: '',
                            payFromEmployment: 0,
                            taxDeducted: 0,
                            tipsAndOtherPayments: 0,
                            directorIndicator: false,
                            offPayrollWorkingIndicator: false,
                            benefits: {
                              companyCarAndVan: 0,
                              fuelForCompanyCar: 0,
                              privateMedicalDental: 0,
                              vouchersCreditsCards: 0,
                              otherBenefits: 0
                            },
                            expenses: {
                              travelExpenses: 0,
                              professionalFees: 0,
                              otherExpenses: 0,
                              expensesDescription: ''
                            }
                          }
                          setFormData({
                            ...formData,
                            employmentDetails: [...(formData.employmentDetails || []), newEmployment]
                          })
                        }}
                        className="bg-[#001f3f] hover:bg-[#003366]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Employment
                      </Button>
                    )}
                  </div>

                  {formData.employmentDetails && formData.employmentDetails.length > 0 ? (
                    <div className="space-y-4">
                      {formData.employmentDetails.map((employment, index) => (
                        <div key={index} className="p-4 border-2 border-[#001f3f] rounded space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-[#001f3f]">Employment {index + 1}</h4>
                            {!isReadOnly && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const updated = formData.employmentDetails!.filter((_, i) => i !== index)
                                  setFormData({ ...formData, employmentDetails: updated })
                                }}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          
                          {/* Basic Employment Details */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-[#001f3f] text-sm">Employment Information (Box 4-6.1)</h5>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">PAYE Reference (Box 4)*</Label>
                                <Input
                                  value={employment.payeReference}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].payeReference = e.target.value
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                  placeholder="123/AB12345"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Employer Name (Box 5)*</Label>
                                <Input
                                  value={employment.employerName}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].employerName = e.target.value
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                  placeholder="Enter employer name"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Director?</Label>
                                <Select
                                  value={employment.directorIndicator ? 'yes' : 'no'}
                                  onValueChange={(val) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].directorIndicator = val === 'yes'
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  disabled={isReadOnly}
                                >
                                  <SelectTrigger className="border-[#001f3f]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="no">No</SelectItem>
                                    <SelectItem value="yes">Yes</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              {employment.directorIndicator && (
                                <div className="space-y-2">
                                  <Label className="text-[#001f3f]">Date Stopped Being Director (Box 6.1)</Label>
                                  <Input
                                    type="date"
                                    value={employment.dateStoppedBeingDirector}
                                    onChange={(e) => {
                                      const updated = [...formData.employmentDetails!]
                                      updated[index].dateStoppedBeingDirector = e.target.value
                                      setFormData({ ...formData, employmentDetails: updated })
                                    }}
                                    className="border-[#001f3f]"
                                    disabled={isReadOnly}
                                  />
                                </div>
                              )}
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Off-Payroll Working (Box 8)</Label>
                                <Select
                                  value={employment.offPayrollWorkingIndicator ? 'yes' : 'no'}
                                  onValueChange={(val) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].offPayrollWorkingIndicator = val === 'yes'
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  disabled={isReadOnly}
                                >
                                  <SelectTrigger className="border-[#001f3f]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="no">No</SelectItem>
                                    <SelectItem value="yes">Yes</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          {/* Pay and Tax (Box 1-3) */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-[#001f3f] text-sm">Pay & Tax (Box 1-3)</h5>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Pay from Employment (Box 1) £*</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.payFromEmployment}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].payFromEmployment = parseFloat(e.target.value) || 0
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Tax Deducted (Box 2) £</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.taxDeducted}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].taxDeducted = parseFloat(e.target.value) || 0
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Tips & Other Payments (Box 3) £</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.tipsAndOtherPayments}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].tipsAndOtherPayments = parseFloat(e.target.value) || 0
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Benefits (Box 9-12) */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-[#001f3f] text-sm">Benefits from Employment (Box 9-12)</h5>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Company Car & Van (Box 9) £</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.benefits.companyCarAndVan}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].benefits = { ...updated[index].benefits, companyCarAndVan: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Fuel for Company Car (Box 10) £</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.benefits.fuelForCompanyCar}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].benefits = { ...updated[index].benefits, fuelForCompanyCar: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Private Medical/Dental (Box 11) £</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.benefits.privateMedicalDental}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].benefits = { ...updated[index].benefits, privateMedicalDental: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Vouchers/Credit Cards (Box 12) £</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.benefits.vouchersCreditsCards}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].benefits = { ...updated[index].benefits, vouchersCreditsCards: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Other Benefits £</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.benefits.otherBenefits}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].benefits = { ...updated[index].benefits, otherBenefits: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Expenses (Box 17-20) */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-[#001f3f] text-sm">Employment Expenses (Box 17-20)</h5>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Travel Expenses £</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.expenses.travelExpenses}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, travelExpenses: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Professional Fees £</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.expenses.professionalFees}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, professionalFees: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Other Expenses £</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.expenses.otherExpenses}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, otherExpenses: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2 col-span-3">
                                <Label className="text-[#001f3f]">Expenses Description</Label>
                                <Textarea
                                  value={employment.expenses.expensesDescription}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, expensesDescription: e.target.value }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                  rows={2}
                                  placeholder="Describe employment expenses"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Fuel Benefit (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.p11dBenefits?.fuelBenefit || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].p11dBenefits = { ...updated[index].p11dBenefits, fuelBenefit: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Medical Insurance (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.p11dBenefits?.medicalInsurance || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].p11dBenefits = { ...updated[index].p11dBenefits, medicalInsurance: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Accommodation (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.p11dBenefits?.accommodation || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].p11dBenefits = { ...updated[index].p11dBenefits, accommodation: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Loans (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.p11dBenefits?.loans || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].p11dBenefits = { ...updated[index].p11dBenefits, loans: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Mileage Allowance (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.p11dBenefits?.mileageAllowance || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].p11dBenefits = { ...updated[index].p11dBenefits, mileageAllowance: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Other Benefits (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.p11dBenefits?.otherBenefits || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].p11dBenefits = { ...updated[index].p11dBenefits, otherBenefits: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Employment Expenses */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-[#001f3f] text-sm">Employment Expenses</h5>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Travel Expenses (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.employmentExpenses?.travelExpenses || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].employmentExpenses = { ...updated[index].employmentExpenses, travelExpenses: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Professional Fees (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.employmentExpenses?.professionalFees || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].employmentExpenses = { ...updated[index].employmentExpenses, professionalFees: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Other Expenses (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={employment.employmentExpenses?.otherExpenses || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.employmentDetails!]
                                    updated[index].employmentExpenses = { ...updated[index].employmentExpenses, otherExpenses: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, employmentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#001f3f]">
                      <p>No employment income added yet. Click "Add Employment" to get started.</p>
                    </div>
                  )}
                </TabsContent>

                {/* Self-Employment Tab */}
                <TabsContent value="selfemployment" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#001f3f]">Self-Employment Income Details</h3>
                    {!isReadOnly && (
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => {
                          const newBusiness: SelfEmploymentDetails = {
                            businessName: '',
                            natureOfBusiness: '',
                            turnover: 0,
                            grossProfit: 0,
                            allowableExpenses: 0,
                            netProfit: 0,
                            capitalAllowances: 0
                          }
                          setFormData({
                            ...formData,
                            selfEmploymentDetails: [...(formData.selfEmploymentDetails || []), newBusiness]
                          })
                        }}
                        className="bg-[#001f3f] hover:bg-[#003366]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Business
                      </Button>
                    )}
                  </div>

                  {formData.selfEmploymentDetails && formData.selfEmploymentDetails.length > 0 ? (
                    <div className="space-y-4">
                      {formData.selfEmploymentDetails.map((business, index) => (
                        <div key={index} className="p-4 border-2 border-[#001f3f] rounded space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-[#001f3f]">Business {index + 1}</h4>
                            {!isReadOnly && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const updated = formData.selfEmploymentDetails!.filter((_, i) => i !== index)
                                  setFormData({ ...formData, selfEmploymentDetails: updated })
                                }}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          
                          {/* Business Information */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-[#001f3f] text-sm">Business Information</h5>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Business Name*</Label>
                                <Input
                                  value={business.businessName}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].businessName = e.target.value
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                  placeholder="Enter business/trading name"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Nature of Business*</Label>
                                <Input
                                  value={business.natureOfBusiness}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].natureOfBusiness = e.target.value
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                  placeholder="e.g., Consultant, Trader"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Accounting Period Start</Label>
                                <Input
                                  type="date"
                                  value={business.accountingPeriodStart}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].accountingPeriodStart = e.target.value
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Accounting Period End</Label>
                                <Input
                                  type="date"
                                  value={business.accountingPeriodEnd}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].accountingPeriodEnd = e.target.value
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Business Address (Postcode)</Label>
                                <Input
                                  value={business.businessPostcode}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].businessPostcode = e.target.value
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                  placeholder="SW1A 1AA"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Income */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-[#001f3f] text-sm">Income</h5>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Turnover (£)*</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.turnover}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].turnover = parseFloat(e.target.value) || 0
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Other Business Income (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.otherBusinessIncome || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].otherBusinessIncome = parseFloat(e.target.value) || 0
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Detailed Allowable Expenses (Box 17-30) */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-[#001f3f] text-sm">Allowable Business Expenses</h5>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Cost of Goods Bought (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.costOfGoodsBought || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, costOfGoodsBought: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Construction Industry Scheme (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.cisPayments || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, cisPayments: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Wages, Salaries & Staff Costs (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.wagesSalaries || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, wagesSalaries: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Car, Van & Travel Expenses (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.carVanTravel || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, carVanTravel: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Premises Running Costs (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.premisesRunningCosts || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, premisesRunningCosts: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Repairs & Renewals (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.repairsRenewals || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, repairsRenewals: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Phone, Fax, Stationery (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.phoneStationery || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, phoneStationery: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Advertising & Business Entertainment (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.advertisingEntertainment || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, advertisingEntertainment: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Interest on Bank & Loans (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.interestOnLoans || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, interestOnLoans: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Bank, Credit Card & Other Charges (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.bankCharges || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, bankCharges: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Irrecoverable Debts (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.irrecoverableDebts || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, irrecoverableDebts: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Accountancy, Legal & Professional (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.professionalFees || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, professionalFees: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Depreciation & Loss/Profit on Sale (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.depreciation || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, depreciation: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Other Business Expenses (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.expenses?.otherExpenses || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].expenses = { ...updated[index].expenses, otherExpenses: parseFloat(e.target.value) || 0 }
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Use of Home */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-[#001f3f] text-sm">Use of Home as Office</h5>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Business Use of Home (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.useOfHome || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].useOfHome = parseFloat(e.target.value) || 0
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Capital Allowances & Net Profit */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-[#001f3f] text-sm">Capital Allowances & Net Profit</h5>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Capital Allowances (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.capitalAllowances}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].capitalAllowances = parseFloat(e.target.value) || 0
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f]">Goods Taken for Own Use (£)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={business.goodsTakenForOwnUse || 0}
                                  onChange={(e) => {
                                    const updated = [...formData.selfEmploymentDetails!]
                                    updated[index].goodsTakenForOwnUse = parseFloat(e.target.value) || 0
                                    setFormData({ ...formData, selfEmploymentDetails: updated })
                                  }}
                                  className="border-[#001f3f]"
                                  disabled={isReadOnly}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[#001f3f] font-semibold">Net Profit (£)</Label>
                                <div className="p-3 bg-blue-50 border-2 border-[#001f3f] rounded">
                                  <span className="text-xl font-bold text-[#001f3f]">
                                    £{(business.turnover - (business.expenses?.costOfGoodsBought || 0) - (business.expenses?.cisPayments || 0) - (business.expenses?.wagesSalaries || 0) - (business.expenses?.carVanTravel || 0) - (business.expenses?.premisesRunningCosts || 0) - (business.expenses?.repairsRenewals || 0) - (business.expenses?.phoneStationery || 0) - (business.expenses?.advertisingEntertainment || 0) - (business.expenses?.interestOnLoans || 0) - (business.expenses?.bankCharges || 0) - (business.expenses?.irrecoverableDebts || 0) - (business.expenses?.professionalFees || 0) - (business.expenses?.depreciation || 0) - (business.expenses?.otherExpenses || 0) - business.capitalAllowances - (business.useOfHome || 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#001f3f]">
                      <p>No self-employment income added yet. Click "Add Business" to get started.</p>
                    </div>
                  )}
                </TabsContent>

                {/* Rental Properties Tab */}
                <TabsContent value="rental" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#001f3f]">Rental Property Income</h3>
                    {!isReadOnly && (
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => {
                          const newProperty: RentalProperty = {
                            propertyAddress: '',
                            rentalIncome: 0,
                            mortgageInterest: 0,
                            repairs: 0,
                            insurance: 0,
                            otherExpenses: 0,
                            netIncome: 0
                          }
                          setFormData({
                            ...formData,
                            rentalProperties: [...(formData.rentalProperties || []), newProperty]
                          })
                        }}
                        className="bg-[#001f3f] hover:bg-[#003366]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Property
                      </Button>
                    )}
                  </div>

                  {formData.rentalProperties && formData.rentalProperties.length > 0 ? (
                    <div className="space-y-4">
                      {formData.rentalProperties.map((property, index) => (
                        <div key={index} className="p-4 border-2 border-[#001f3f] rounded space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-[#001f3f]">Property {index + 1}</h4>
                            {!isReadOnly && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const updated = formData.rentalProperties!.filter((_, i) => i !== index)
                                  setFormData({ ...formData, rentalProperties: updated })
                                }}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 col-span-2">
                              <Label className="text-[#001f3f]">Property Address*</Label>
                              <Textarea
                                value={property.propertyAddress}
                                onChange={(e) => {
                                  const updated = [...formData.rentalProperties!]
                                  updated[index].propertyAddress = e.target.value
                                  setFormData({ ...formData, rentalProperties: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                                placeholder="Full property address"
                                rows={2}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Rental Income (£)*</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={property.rentalIncome}
                                onChange={(e) => {
                                  const updated = [...formData.rentalProperties!]
                                  updated[index].rentalIncome = parseFloat(e.target.value) || 0
                                  setFormData({ ...formData, rentalProperties: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Mortgage Interest (£)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={property.mortgageInterest}
                                onChange={(e) => {
                                  const updated = [...formData.rentalProperties!]
                                  updated[index].mortgageInterest = parseFloat(e.target.value) || 0
                                  setFormData({ ...formData, rentalProperties: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Repairs & Maintenance (£)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={property.repairs}
                                onChange={(e) => {
                                  const updated = [...formData.rentalProperties!]
                                  updated[index].repairs = parseFloat(e.target.value) || 0
                                  setFormData({ ...formData, rentalProperties: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Insurance (£)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={property.insurance}
                                onChange={(e) => {
                                  const updated = [...formData.rentalProperties!]
                                  updated[index].insurance = parseFloat(e.target.value) || 0
                                  setFormData({ ...formData, rentalProperties: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                              />
                            </div>
                            <div className="space-y-2 col-span-2">
                              <Label className="text-[#001f3f]">Other Expenses (£)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={property.otherExpenses}
                                onChange={(e) => {
                                  const updated = [...formData.rentalProperties!]
                                  updated[index].otherExpenses = parseFloat(e.target.value) || 0
                                  setFormData({ ...formData, rentalProperties: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                                placeholder="Agents fees, legal costs, etc."
                              />
                            </div>
                            <div className="space-y-2 col-span-2">
                              <Label className="text-[#001f3f] font-semibold">Net Rental Income (£)</Label>
                              <div className="p-3 bg-blue-50 border-2 border-[#001f3f] rounded">
                                <span className="text-xl font-bold text-[#001f3f]">
                                  £{(property.rentalIncome - property.mortgageInterest - property.repairs - property.insurance - property.otherExpenses).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#001f3f]">
                      <p>No rental properties added yet. Click "Add Property" to get started.</p>
                    </div>
                  )}
                </TabsContent>

                {/* Dividends Tab */}
                <TabsContent value="dividends" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#001f3f]">Dividend Income with Exchange Integration</h3>
                    {!isReadOnly && (
                      <div className="flex gap-2">
                        <Button 
                          type="button" 
                          size="sm" 
                          onClick={() => setShowExchangeSync(true)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Sync from Exchange
                        </Button>
                        <Button 
                          type="button" 
                          size="sm" 
                          onClick={() => {
                            const newDividend: DividendDetails = {
                              companyName: '',
                              dividendAmount: 0,
                              isDomestic: true
                            }
                            setFormData({
                              ...formData,
                              dividendDetails: [...(formData.dividendDetails || []), newDividend]
                            })
                          }}
                          className="bg-[#001f3f] hover:bg-[#003366]"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Manual
                        </Button>
                      </div>
                    )}
                  </div>

                  {formData.dividendDetails && formData.dividendDetails.length > 0 ? (
                    <div className="space-y-4">
                      {formData.dividendDetails.map((dividend, index) => (
                        <div key={index} className="p-4 border-2 border-[#001f3f] rounded space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-[#001f3f]">Dividend {index + 1}</h4>
                            {!isReadOnly && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const updated = formData.dividendDetails!.filter((_, i) => i !== index)
                                  setFormData({ ...formData, dividendDetails: updated })
                                }}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Company/Stock Name (Box 1)*</Label>
                              <Input
                                value={dividend.companyName}
                                onChange={(e) => {
                                  const updated = [...formData.dividendDetails!]
                                  updated[index].companyName = e.target.value
                                  setFormData({ ...formData, dividendDetails: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                                placeholder="Company/Stock ticker"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Stock Exchange</Label>
                              <Select disabled={isReadOnly}>
                                <SelectTrigger className="border-[#001f3f]">
                                  <SelectValue placeholder="Select exchange" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="lse">London Stock Exchange (LSE)</SelectItem>
                                  <SelectItem value="nyse">New York Stock Exchange (NYSE)</SelectItem>
                                  <SelectItem value="nasdaq">NASDAQ</SelectItem>
                                  <SelectItem value="euronext">Euronext</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Stock Ticker Symbol</Label>
                              <Input
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                                placeholder="e.g., AAPL, TSLA"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Number of Shares</Label>
                              <Input
                                type="number"
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                                placeholder="Quantity"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Dividend per Share (Box 2) £</Label>
                              <Input
                                type="number"
                                step="0.01"
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Total Dividend (Box 3) £*</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={dividend.dividendAmount}
                                onChange={(e) => {
                                  const updated = [...formData.dividendDetails!]
                                  updated[index].dividendAmount = parseFloat(e.target.value) || 0
                                  setFormData({ ...formData, dividendDetails: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Dividend Type (Box 4)</Label>
                              <Select
                                value={dividend.isDomestic ? 'domestic' : 'foreign'}
                                onValueChange={(value) => {
                                  const updated = [...formData.dividendDetails!]
                                  updated[index].isDomestic = value === 'domestic'
                                  setFormData({ ...formData, dividendDetails: updated })
                                }}
                                disabled={isReadOnly}
                              >
                                <SelectTrigger className="border-[#001f3f]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="domestic">UK Dividends</SelectItem>
                                  <SelectItem value="foreign">Foreign Dividends</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Tax Credit (Box 5) £</Label>
                              <Input
                                type="number"
                                step="0.01"
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Payment Date</Label>
                              <Input
                                type="date"
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                              />
                            </div>
                          </div>
                          <div className="p-2 bg-blue-50 border border-blue-300 rounded">
                            <p className="text-xs text-[#001f3f]">
                              💡 <strong>Real-time Integration:</strong> Use "Sync from Exchange" to automatically import dividend data from connected brokerage platforms (Interactive Brokers, Charles Schwab, Trading 212, etc.)
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#001f3f]">
                      <p>No dividend income added yet. Click "Sync from Exchange" to import from brokers or "Add Manual" to enter manually.</p>
                    </div>
                  )}
                </TabsContent>

                {/* Pensions Tab */}
                <TabsContent value="pensions" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#001f3f]">Pension Income</h3>
                    {!isReadOnly && (
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => {
                          const newPension: PensionDetails = {
                            providerName: '',
                            pensionType: '',
                            grossAmount: 0,
                            taxDeducted: 0
                          }
                          setFormData({
                            ...formData,
                            pensionDetails: [...(formData.pensionDetails || []), newPension]
                          })
                        }}
                        className="bg-[#001f3f] hover:bg-[#003366]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Pension
                      </Button>
                    )}
                  </div>

                  {formData.pensionDetails && formData.pensionDetails.length > 0 ? (
                    <div className="space-y-4">
                      {formData.pensionDetails.map((pension, index) => (
                        <div key={index} className="p-4 border-2 border-[#001f3f] rounded space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-[#001f3f]">Pension {index + 1}</h4>
                            {!isReadOnly && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const updated = formData.pensionDetails!.filter((_, i) => i !== index)
                                  setFormData({ ...formData, pensionDetails: updated })
                                }}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Provider Name*</Label>
                              <Input
                                value={pension.providerName}
                                onChange={(e) => {
                                  const updated = [...formData.pensionDetails!]
                                  updated[index].providerName = e.target.value
                                  setFormData({ ...formData, pensionDetails: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                                placeholder="Pension provider name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Pension Type*</Label>
                              <Select
                                value={pension.pensionType}
                                onValueChange={(value) => {
                                  const updated = [...formData.pensionDetails!]
                                  updated[index].pensionType = value
                                  setFormData({ ...formData, pensionDetails: updated })
                                }}
                                disabled={isReadOnly}
                              >
                                <SelectTrigger className="border-[#001f3f]">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="state">State Pension</SelectItem>
                                  <SelectItem value="occupational">Occupational Pension</SelectItem>
                                  <SelectItem value="personal">Personal Pension</SelectItem>
                                  <SelectItem value="stakeholder">Stakeholder Pension</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Gross Amount (£)*</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={pension.grossAmount}
                                onChange={(e) => {
                                  const updated = [...formData.pensionDetails!]
                                  updated[index].grossAmount = parseFloat(e.target.value) || 0
                                  setFormData({ ...formData, pensionDetails: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Tax Deducted (£)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={pension.taxDeducted}
                                onChange={(e) => {
                                  const updated = [...formData.pensionDetails!]
                                  updated[index].taxDeducted = parseFloat(e.target.value) || 0
                                  setFormData({ ...formData, pensionDetails: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#001f3f]">
                      <p>No pension income added yet. Click "Add Pension" to get started.</p>
                    </div>
                  )}
                </TabsContent>

                {/* Bank Interest Tab - Comprehensive with Multiple Sources */}
                <TabsContent value="interest" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#001f3f]">Bank Interest & Investment Income</h3>
                    {!isReadOnly && (
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => {
                          const newInterest: BankInterestDetails = {
                            id: `int-${Date.now()}`,
                            institutionName: '',
                            accountNumber: '',
                            grossInterest: 0,
                            taxDeducted: 0,
                            isForeign: false
                          }
                          setFormData({
                            ...formData,
                            bankInterestDetails: [...(formData.bankInterestDetails || []), newInterest]
                          })
                        }}
                        className="bg-[#001f3f] hover:bg-[#003366]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Bank Interest
                      </Button>
                    )}
                  </div>

                  {formData.bankInterestDetails && formData.bankInterestDetails.length > 0 ? (
                    <div className="space-y-4">
                      {formData.bankInterestDetails.map((interest, index) => (
                        <div key={interest.id} className="p-4 border-2 border-[#001f3f] rounded space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-[#001f3f]">
                              {interest.isForeign ? 'Foreign' : 'UK'} Interest Source {index + 1}
                            </h4>
                            {!isReadOnly && (
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  const updated = formData.bankInterestDetails!.filter((_, i) => i !== index)
                                  setFormData({ ...formData, bankInterestDetails: updated })
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Institution Name*</Label>
                              <Input
                                value={interest.institutionName}
                                onChange={(e) => {
                                  const updated = [...formData.bankInterestDetails!]
                                  updated[index].institutionName = e.target.value
                                  setFormData({ ...formData, bankInterestDetails: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                                placeholder="Bank/Building Society name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Account Number</Label>
                              <Input
                                value={interest.accountNumber}
                                onChange={(e) => {
                                  const updated = [...formData.bankInterestDetails!]
                                  updated[index].accountNumber = e.target.value
                                  setFormData({ ...formData, bankInterestDetails: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                                placeholder="Account number"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Gross Interest £*</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={interest.grossInterest}
                                onChange={(e) => {
                                  const updated = [...formData.bankInterestDetails!]
                                  updated[index].grossInterest = parseFloat(e.target.value) || 0
                                  setFormData({ ...formData, bankInterestDetails: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#001f3f]">Tax Deducted £</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={interest.taxDeducted}
                                onChange={(e) => {
                                  const updated = [...formData.bankInterestDetails!]
                                  updated[index].taxDeducted = parseFloat(e.target.value) || 0
                                  setFormData({ ...formData, bankInterestDetails: updated })
                                }}
                                className="border-[#001f3f]"
                                disabled={isReadOnly}
                              />
                            </div>
                            <div className="space-y-2 col-span-2">
                              <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={interest.isForeign}
                                    onChange={(e) => {
                                      const updated = [...formData.bankInterestDetails!]
                                      updated[index].isForeign = e.target.checked
                                      setFormData({ ...formData, bankInterestDetails: updated })
                                    }}
                                    disabled={isReadOnly}
                                    className="w-4 h-4"
                                  />
                                  <span className="text-[#001f3f]">Foreign Interest</span>
                                </label>
                                {interest.isForeign && (
                                  <div className="flex-1">
                                    <Input
                                      value={interest.country || ''}
                                      onChange={(e) => {
                                        const updated = [...formData.bankInterestDetails!]
                                        updated[index].country = e.target.value
                                        setFormData({ ...formData, bankInterestDetails: updated })
                                      }}
                                      className="border-[#001f3f]"
                                      disabled={isReadOnly}
                                      placeholder="Country"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#001f3f]">
                      <p>No bank interest added yet. Click "Add Bank Interest" to get started.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="other" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                </TabsContent>
              </Tabs>
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

            {/* Capital Allowances Tab */}
            <TabsContent value="capitalallowances" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold text-[#001f3f] mb-4">Capital Allowances</h3>
              <div className="space-y-4">
                <div className="p-4 border-2 border-[#001f3f] rounded space-y-3">
                  <h4 className="font-semibold text-[#001f3f]">Plant & Machinery</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Annual Investment Allowance (Box 1) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">First Year Allowance (Box 2) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Writing Down Allowance (Box 3) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                  </div>
                </div>

                <div className="p-4 border-2 border-[#001f3f] rounded space-y-3">
                  <h4 className="font-semibold text-[#001f3f]">Structures & Buildings Allowance</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Structures & Buildings Allowance (Box 4) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Enhanced Structures Allowance (Box 5) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                  </div>
                </div>

                <div className="p-4 border-2 border-[#001f3f] rounded space-y-3">
                  <h4 className="font-semibold text-[#001f3f]">Other Allowances</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Balancing Charges (Box 6) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Total Capital Allowances (Box 7) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-[#001f3f] rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#001f3f]">Total Capital Allowances Claimed:</span>
                    <span className="text-xl font-bold text-[#001f3f]">£0.00</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="capitalgains" className="space-y-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#001f3f]">Capital Gains Tax - Asset Disposals</h3>
                {!isReadOnly && (
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={() => {
                      const newAsset: CapitalGainsAsset = {
                        id: `cgt-${Date.now()}`,
                        assetType: 'shares',
                        description: '',
                        dateAcquired: '',
                        acquisitionCost: 0,
                        dateDisposed: '',
                        disposalProceeds: 0,
                        allowableExpenses: 0,
                        gain: 0,
                        loss: 0
                      }
                      setFormData({
                        ...formData,
                        capitalGainsAssets: [...(formData.capitalGainsAssets || []), newAsset]
                      })
                    }}
                    className="bg-[#001f3f] hover:bg-[#003366]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Asset Disposal
                  </Button>
                )}
              </div>

              {formData.capitalGainsAssets && formData.capitalGainsAssets.length > 0 ? (
                <div className="space-y-4">
                  {formData.capitalGainsAssets.map((asset, index) => {
                    const calculatedGain = asset.disposalProceeds - asset.acquisitionCost - asset.allowableExpenses
                    const isGain = calculatedGain > 0
                    const isLoss = calculatedGain < 0

                    return (
                      <div key={asset.id} className="p-4 border-2 border-[#001f3f] rounded space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-[#001f3f]">Asset Disposal {index + 1}</h4>
                          {!isReadOnly && (
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                const updated = formData.capitalGainsAssets!.filter((_, i) => i !== index)
                                setFormData({ ...formData, capitalGainsAssets: updated })
                              }}
                            >
                              Remove
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[#001f3f]">Asset Type*</Label>
                            <Select
                              value={asset.assetType}
                              onValueChange={(value: any) => {
                                const updated = [...formData.capitalGainsAssets!]
                                updated[index].assetType = value
                                setFormData({ ...formData, capitalGainsAssets: updated })
                              }}
                              disabled={isReadOnly}
                            >
                              <SelectTrigger className="border-[#001f3f]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="property">Property/Land</SelectItem>
                                <SelectItem value="shares">Shares/Securities</SelectItem>
                                <SelectItem value="crypto">Cryptocurrency</SelectItem>
                                <SelectItem value="other">Other Assets</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#001f3f]">Description*</Label>
                            <Input
                              value={asset.description}
                              onChange={(e) => {
                                const updated = [...formData.capitalGainsAssets!]
                                updated[index].description = e.target.value
                                setFormData({ ...formData, capitalGainsAssets: updated })
                              }}
                              className="border-[#001f3f]"
                              disabled={isReadOnly}
                              placeholder="Brief description of asset"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#001f3f]">Date Acquired*</Label>
                            <Input
                              type="date"
                              value={asset.dateAcquired}
                              onChange={(e) => {
                                const updated = [...formData.capitalGainsAssets!]
                                updated[index].dateAcquired = e.target.value
                                setFormData({ ...formData, capitalGainsAssets: updated })
                              }}
                              className="border-[#001f3f]"
                              disabled={isReadOnly}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#001f3f]">Acquisition Cost £*</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={asset.acquisitionCost}
                              onChange={(e) => {
                                const updated = [...formData.capitalGainsAssets!]
                                updated[index].acquisitionCost = parseFloat(e.target.value) || 0
                                const calc = updated[index].disposalProceeds - parseFloat(e.target.value || '0') - updated[index].allowableExpenses
                                updated[index].gain = calc > 0 ? calc : 0
                                updated[index].loss = calc < 0 ? Math.abs(calc) : 0
                                setFormData({ ...formData, capitalGainsAssets: updated })
                              }}
                              className="border-[#001f3f]"
                              disabled={isReadOnly}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#001f3f]">Date Disposed*</Label>
                            <Input
                              type="date"
                              value={asset.dateDisposed}
                              onChange={(e) => {
                                const updated = [...formData.capitalGainsAssets!]
                                updated[index].dateDisposed = e.target.value
                                setFormData({ ...formData, capitalGainsAssets: updated })
                              }}
                              className="border-[#001f3f]"
                              disabled={isReadOnly}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[#001f3f]">Disposal Proceeds £*</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={asset.disposalProceeds}
                              onChange={(e) => {
                                const updated = [...formData.capitalGainsAssets!]
                                updated[index].disposalProceeds = parseFloat(e.target.value) || 0
                                const calc = parseFloat(e.target.value || '0') - updated[index].acquisitionCost - updated[index].allowableExpenses
                                updated[index].gain = calc > 0 ? calc : 0
                                updated[index].loss = calc < 0 ? Math.abs(calc) : 0
                                setFormData({ ...formData, capitalGainsAssets: updated })
                              }}
                              className="border-[#001f3f]"
                              disabled={isReadOnly}
                            />
                          </div>

                          <div className="space-y-2 col-span-2">
                            <Label className="text-[#001f3f]">Allowable Expenses £</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={asset.allowableExpenses}
                              onChange={(e) => {
                                const updated = [...formData.capitalGainsAssets!]
                                updated[index].allowableExpenses = parseFloat(e.target.value) || 0
                                const calc = updated[index].disposalProceeds - updated[index].acquisitionCost - parseFloat(e.target.value || '0')
                                updated[index].gain = calc > 0 ? calc : 0
                                updated[index].loss = calc < 0 ? Math.abs(calc) : 0
                                setFormData({ ...formData, capitalGainsAssets: updated })
                              }}
                              className="border-[#001f3f]"
                              disabled={isReadOnly}
                              placeholder="Legal fees, improvement costs, etc."
                            />
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-300">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-[#001f3f] text-sm">Calculated Result:</Label>
                              {isGain && (
                                <div className="text-lg font-bold text-green-600">
                                  Gain: £{calculatedGain.toFixed(2)}
                                </div>
                              )}
                              {isLoss && (
                                <div className="text-lg font-bold text-red-600">
                                  Loss: £{Math.abs(calculatedGain).toFixed(2)}
                                </div>
                              )}
                              {!isGain && !isLoss && (
                                <div className="text-lg font-bold text-gray-600">
                                  No Gain/Loss
                                </div>
                              )}
                            </div>
                            <div>
                              <Label className="text-[#001f3f] text-sm">Days Held:</Label>
                              {asset.dateAcquired && asset.dateDisposed && (
                                <div className="text-lg font-bold text-[#001f3f]">
                                  {Math.floor((new Date(asset.dateDisposed).getTime() - new Date(asset.dateAcquired).getTime()) / (1000 * 60 * 60 * 24))} days
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded">
                    <h4 className="font-semibold text-[#001f3f] mb-2">Summary</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm text-[#001f3f]">Total Gains:</Label>
                        <div className="text-xl font-bold text-green-600">
                          £{(formData.capitalGainsAssets?.reduce((sum, a) => sum + a.gain, 0) || 0).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-[#001f3f]">Total Losses:</Label>
                        <div className="text-xl font-bold text-red-600">
                          £{(formData.capitalGainsAssets?.reduce((sum, a) => sum + a.loss, 0) || 0).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-[#001f3f]">Net Position:</Label>
                        <div className="text-xl font-bold text-[#001f3f]">
                          £{((formData.capitalGainsAssets?.reduce((sum, a) => sum + a.gain, 0) || 0) - (formData.capitalGainsAssets?.reduce((sum, a) => sum + a.loss, 0) || 0)).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-[#001f3f]">
                  <p>No capital gains disposals added yet. Click "Add Asset Disposal" to get started.</p>
                </div>
              )}
            </TabsContent>

            {/* Losses Tab */}
            <TabsContent value="losses" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold text-[#001f3f] mb-4">Losses</h3>
              <div className="space-y-4">
                <div className="p-4 border-2 border-[#001f3f] rounded space-y-3">
                  <h4 className="font-semibold text-[#001f3f]">Trading Losses</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Loss from This Year (Box 1) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Loss Brought Forward (Box 2) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Loss Set Against Other Income (Box 3) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Loss to Carry Forward (Box 4) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                  </div>
                </div>

                <div className="p-4 border-2 border-[#001f3f] rounded space-y-3">
                  <h4 className="font-semibold text-[#001f3f]">Property Losses</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Property Loss This Year (Box 5) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Property Loss Brought Forward (Box 6) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                  </div>
                </div>

                <div className="p-4 border-2 border-[#001f3f] rounded space-y-3">
                  <h4 className="font-semibold text-[#001f3f]">Capital Losses</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Capital Loss This Year (Box 7) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Capital Loss Brought Forward (Box 8) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-[#001f3f] rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#001f3f]">Total Losses to Carry Forward:</span>
                    <span className="text-xl font-bold text-[#001f3f]">£0.00</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Payment on Account Tab */}
            <TabsContent value="paymentonaccount" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold text-[#001f3f] mb-4">Payment on Account</h3>
              <div className="space-y-4">
                <div className="p-4 border-2 border-[#001f3f] rounded space-y-3">
                  <h4 className="font-semibold text-[#001f3f]">Current Tax Year Payments</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">First Payment on Account (Box 1) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} placeholder="Payment due 31 January" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Second Payment on Account (Box 2) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} placeholder="Payment due 31 July" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Balancing Payment (Box 3) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Total Tax Payable (Box 4) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                  </div>
                </div>

                <div className="p-4 border-2 border-[#001f3f] rounded space-y-3">
                  <h4 className="font-semibold text-[#001f3f]">Payments Already Made</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">First Payment Made (Box 5) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Second Payment Made (Box 6) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Tax Deducted at Source (Box 7) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#001f3f]">Total Payments Made (Box 8) £</Label>
                      <Input type="number" step="0.01" className="border-[#001f3f]" disabled={isReadOnly} />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border-2 border-[#001f3f] rounded">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#001f3f]">Total Tax Due:</span>
                      <span className="text-xl font-bold text-[#001f3f]">£0.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#001f3f]">Amount Outstanding:</span>
                      <span className="text-xl font-bold text-red-600">£0.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Other Tab */}
            <TabsContent value="other" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold text-[#001f3f] mb-4">Other Income & Information</h3>
              <div className="grid grid-cols-2 gap-4">
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
        )}
      </DialogContent>
    </Dialog>

    {/* Exchange Sync Modal */}
    <Dialog open={showExchangeSync} onOpenChange={setShowExchangeSync}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#001f3f]">Sync Dividends from Exchange</DialogTitle>
          <DialogDescription>
            Connect to your brokerage platform to automatically import dividend data
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[#001f3f]">Select Brokerage Platform</Label>
            <Select>
              <SelectTrigger className="border-[#001f3f]">
                <SelectValue placeholder="Choose your broker" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interactive-brokers">Interactive Brokers</SelectItem>
                <SelectItem value="charles-schwab">Charles Schwab</SelectItem>
                <SelectItem value="trading212">Trading 212</SelectItem>
                <SelectItem value="etoro">eToro</SelectItem>
                <SelectItem value="degiro">DEGIRO</SelectItem>
                <SelectItem value="freetrade">Freetrade</SelectItem>
                <SelectItem value="hargreaves">Hargreaves Lansdown</SelectItem>
                <SelectItem value="aj-bell">AJ Bell</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 className="font-semibold text-[#001f3f] mb-2">Authentication Required</h4>
            <div className="space-y-3">
              <div>
                <Label className="text-[#001f3f]">API Key / Username</Label>
                <Input className="border-[#001f3f]" placeholder="Enter your API key or username" />
              </div>
              <div>
                <Label className="text-[#001f3f]">API Secret / Password</Label>
                <Input type="password" className="border-[#001f3f]" placeholder="Enter your API secret or password" />
              </div>
              <div>
                <Label className="text-[#001f3f]">Account Number (optional)</Label>
                <Input className="border-[#001f3f]" placeholder="Enter account number if applicable" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#001f3f]">Date Range</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-[#001f3f]">From Date</Label>
                <Input type="date" className="border-[#001f3f]" />
              </div>
              <div>
                <Label className="text-sm text-[#001f3f]">To Date</Label>
                <Input type="date" className="border-[#001f3f]" />
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h4 className="font-semibold text-[#001f3f] mb-2">💡 Quick Tips</h4>
            <ul className="text-sm text-[#001f3f] space-y-1 list-disc list-inside">
              <li>Ensure your API credentials have read-only access</li>
              <li>Data will be imported as UK Sterling (GBP) equivalent</li>
              <li>Foreign dividends will be tagged automatically</li>
              <li>You can review and edit imported data before saving</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setShowExchangeSync(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              alert('Exchange sync feature - Integration with broker APIs will be implemented in production')
              setShowExchangeSync(false)
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            Connect & Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

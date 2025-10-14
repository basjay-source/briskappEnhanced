import { useState } from 'react'
import { Save, X, Edit, ChevronLeft, ChevronRight, FileText, Building2, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'

interface CT600Data {
  companyName: string
  companyNumber: string
  utr: string
  accountingPeriodStart: string
  accountingPeriodEnd: string
  
  turnover: number
  costOfSales: number
  grossProfit: number
  adminExpenses: number
  otherIncome: number
  financeCosts: number
  profitBeforeTax: number
  
  depreciationAddback: number
  legalProfessionalFees: number
  entertainmentDisallowed: number
  provisionsNotAllowed: number
  otherAdjustments: number
  totalAdjustments: number
  
  plantMachineryAdditions: number
  plantMachineryDisposals: number
  annualInvestmentAllowance: number
  writingDownAllowance: number
  balancingChargeAllowance: number
  totalCapitalAllowances: number
  
  lossesBroughtForward: number
  lossesCarriedBack: number
  lossesCarriedForward: number
  lossesSetAgainstProfit: number
  
  taxableProfit: number
  corporationTaxRate: number
  corporationTaxBeforeReliefs: number
  
  rdQualifyingExpenditure: number
  rdEnhancementRate: number
  rdReliefClaimed: number
  rdTaxCredit: number
  
  patentBoxRelief: number
  creativeIndustryRelief: number
  marginalRelief: number
  groupRelief: number
  otherReliefs: number
  totalReliefs: number
  
  corporationTaxDue: number
  quarterlyPaymentsMade: number
  balanceDue: number
  
  status: 'draft' | 'in-progress' | 'validated' | 'submitted' | 'filed'
  syncedFromAccounts: boolean
  lastSyncDate: string
}

interface CT600FormProps {
  data: Partial<CT600Data>
  onSave: (data: Partial<CT600Data>) => void
  onCancel?: () => void
  isEditing?: boolean
}

export default function CT600Form({ data, onSave, onCancel, isEditing = false }: CT600FormProps) {
  const [formData, setFormData] = useState<Partial<CT600Data>>(data)
  const [editMode, setEditMode] = useState(isEditing)
  const [manualEntryMode, setManualEntryMode] = useState(!data.syncedFromAccounts)
  const [activeTab, setActiveTab] = useState('company')

  const handleChange = (field: keyof CT600Data, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(formData)
    setEditMode(false)
  }

  const handleCancel = () => {
    setFormData(data)
    setEditMode(false)
  }

  const calculateTotals = () => {
    const profit = formData.profitBeforeTax || 0
    const adjustments = (formData.depreciationAddback || 0) +
                       (formData.legalProfessionalFees || 0) +
                       (formData.entertainmentDisallowed || 0) +
                       (formData.provisionsNotAllowed || 0) +
                       (formData.otherAdjustments || 0)
    
    const capitalAllowances = (formData.annualInvestmentAllowance || 0) +
                             (formData.writingDownAllowance || 0) +
                             (formData.balancingChargeAllowance || 0)
    
    const taxableProfit = profit + adjustments - capitalAllowances - (formData.lossesSetAgainstProfit || 0)
    
    let corpTax = 0
    if (taxableProfit <= 50000) {
      corpTax = taxableProfit * 0.19
    } else if (taxableProfit <= 250000) {
      const marginalRelief = (250000 - taxableProfit) * 0.015
      corpTax = (taxableProfit * 0.25) - marginalRelief
    } else {
      corpTax = taxableProfit * 0.25
    }
    
    const totalReliefs = (formData.rdReliefClaimed || 0) +
                        (formData.patentBoxRelief || 0) +
                        (formData.creativeIndustryRelief || 0) +
                        (formData.marginalRelief || 0) +
                        (formData.groupRelief || 0) +
                        (formData.otherReliefs || 0)
    
    const taxDue = corpTax - totalReliefs
    const balanceDue = taxDue - (formData.quarterlyPaymentsMade || 0)
    
    return {
      totalAdjustments: adjustments,
      totalCapitalAllowances: capitalAllowances,
      taxableProfit,
      corporationTaxBeforeReliefs: corpTax,
      totalReliefs,
      corporationTaxDue: taxDue,
      balanceDue
    }
  }

  const calculated = calculateTotals()

  const renderField = (label: string, field: keyof CT600Data, type: 'text' | 'number' | 'date' = 'text', readonly = false) => {
    const rawValue = formData[field]
    const value = rawValue === undefined || rawValue === null ? '' : String(rawValue)
    const isReadonly = readonly || (!editMode && !manualEntryMode)
    
    return (
      <div className="space-y-2">
        <Label htmlFor={field} className="text-[#001f3f] font-medium">{label}</Label>
        <Input
          id={field}
          type={type}
          value={value}
          onChange={(e) => handleChange(field, type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
          disabled={isReadonly}
          className={`border-[#001f3f] ${isReadonly ? 'bg-gray-100' : 'bg-white'}`}
        />
      </div>
    )
  }

  const renderCalculatedField = (label: string, value: number, className = '') => {
    return (
      <div className="space-y-2">
        <Label className="text-[#001f3f] font-medium">{label}</Label>
        <div className={`p-2 border-2 border-[#001f3f] rounded bg-blue-50 font-semibold ${className}`}>
          £{value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with HMRC Green Branding */}
      <Card className="border-2 border-[#00703c] bg-white">
        <CardHeader className="bg-[#00703c] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8" />
              <div>
                <CardTitle className="text-2xl">CT600 Corporation Tax Return</CardTitle>
                <CardDescription className="text-green-100">HM Revenue & Customs</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded">
                <Switch
                  checked={manualEntryMode}
                  onCheckedChange={setManualEntryMode}
                  disabled={!editMode}
                />
                <span className="text-sm">Manual Entry</span>
              </div>
              {editMode ? (
                <>
                  <Button onClick={handleSave} className="bg-white text-[#00703c] hover:bg-green-50">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditMode(true)} className="bg-white text-[#00703c] hover:bg-green-50">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Status Badge */}
      <div className="flex items-center gap-4">
        <Badge variant={formData.syncedFromAccounts ? 'default' : 'secondary'} className="text-sm py-2 px-4">
          {formData.syncedFromAccounts ? '🔄 Synced from Accounts Production' : '✍️ Manual Entry'}
        </Badge>
        {formData.lastSyncDate && (
          <span className="text-sm text-[#001f3f]">
            Last synced: {new Date(formData.lastSyncDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Multi-Page Form Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-[#001f3f]/10 p-1 rounded-lg">
          <TabsTrigger value="company" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">
            Company Details
          </TabsTrigger>
          <TabsTrigger value="profitloss" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">
            Profit & Loss
          </TabsTrigger>
          <TabsTrigger value="adjustments" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">
            Adjustments
          </TabsTrigger>
          <TabsTrigger value="allowances" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">
            Capital Allowances
          </TabsTrigger>
          <TabsTrigger value="reliefs" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">
            Reliefs & Credits
          </TabsTrigger>
          <TabsTrigger value="computation" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">
            Tax Computation
          </TabsTrigger>
        </TabsList>

        {/* Page 1: Company Details */}
        <TabsContent value="company" className="space-y-6">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f] flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>Details of the company making this return</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {renderField('Company Name', 'companyName', 'text')}
              {renderField('Company Registration Number', 'companyNumber', 'text')}
              {renderField('Unique Taxpayer Reference (UTR)', 'utr', 'text')}
              {renderField('Accounting Period Start', 'accountingPeriodStart', 'date')}
              {renderField('Accounting Period End', 'accountingPeriodEnd', 'date')}
              <div className="md:col-span-2">
                <Label className="text-[#001f3f] font-medium">Status</Label>
                <div className="mt-2">
                  <Badge className="text-sm py-2 px-4">
                    {formData.status || 'Draft'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Page 2: Profit & Loss */}
        <TabsContent value="profitloss" className="space-y-6">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Profit and Loss Account</CardTitle>
              <CardDescription>
                {formData.syncedFromAccounts 
                  ? '✅ Data automatically synced from Accounts Production module'
                  : 'Enter profit and loss figures manually'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {renderField('Turnover', 'turnover', 'number')}
                {renderField('Cost of Sales', 'costOfSales', 'number')}
                {renderCalculatedField('Gross Profit', (formData.turnover || 0) - (formData.costOfSales || 0))}
                {renderField('Administrative Expenses', 'adminExpenses', 'number')}
                {renderField('Other Operating Income', 'otherIncome', 'number')}
                {renderField('Finance Costs', 'financeCosts', 'number')}
              </div>
              <div className="border-t-2 border-[#001f3f] pt-4 mt-4">
                {renderCalculatedField(
                  'Profit Before Tax',
                  (formData.turnover || 0) - (formData.costOfSales || 0) - (formData.adminExpenses || 0) + (formData.otherIncome || 0) - (formData.financeCosts || 0),
                  'text-xl text-[#001f3f]'
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Page 3: Tax Adjustments */}
        <TabsContent value="adjustments" className="space-y-6">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Tax Adjustments to Profit</CardTitle>
              <CardDescription>Add back non-deductible expenses and adjust for tax purposes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {renderField('Depreciation (Add back)', 'depreciationAddback', 'number')}
                {renderField('Legal & Professional Fees (Disallowed)', 'legalProfessionalFees', 'number')}
                {renderField('Entertainment (Disallowed)', 'entertainmentDisallowed', 'number')}
                {renderField('Provisions (Not Allowed)', 'provisionsNotAllowed', 'number')}
                {renderField('Other Adjustments', 'otherAdjustments', 'number')}
              </div>
              <div className="border-t-2 border-[#001f3f] pt-4 mt-4">
                {renderCalculatedField('Total Adjustments', calculated.totalAdjustments, 'text-lg text-[#001f3f]')}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Page 4: Capital Allowances */}
        <TabsContent value="allowances" className="space-y-6">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Capital Allowances</CardTitle>
              <CardDescription>
                {formData.syncedFromAccounts 
                  ? '✅ Fixed asset acquisitions automatically synced from Accounts Production'
                  : 'Enter capital allowances manually'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {renderField('Plant & Machinery Additions', 'plantMachineryAdditions', 'number')}
                {renderField('Plant & Machinery Disposals', 'plantMachineryDisposals', 'number')}
                {renderField('Annual Investment Allowance (AIA)', 'annualInvestmentAllowance', 'number')}
                {renderField('Writing Down Allowance (WDA)', 'writingDownAllowance', 'number')}
                {renderField('Balancing Charge/Allowance', 'balancingChargeAllowance', 'number')}
              </div>
              <div className="border-t-2 border-[#001f3f] pt-4 mt-4">
                {renderCalculatedField('Total Capital Allowances', calculated.totalCapitalAllowances, 'text-lg text-[#001f3f]')}
              </div>
            </CardContent>
          </Card>

          {/* Losses Section */}
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Losses</CardTitle>
              <CardDescription>Carry forward, carry back, or set against current period profits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {renderField('Losses Brought Forward', 'lossesBroughtForward', 'number')}
                {renderField('Losses Set Against This Period Profit', 'lossesSetAgainstProfit', 'number')}
                {renderField('Losses Carried Back', 'lossesCarriedBack', 'number')}
                {renderField('Losses Carried Forward', 'lossesCarriedForward', 'number')}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Page 5: Reliefs & Credits */}
        <TabsContent value="reliefs" className="space-y-6">
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">R&D Relief & Tax Credits</CardTitle>
              <CardDescription>Research & Development expenditure relief claims</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {renderField('R&D Qualifying Expenditure', 'rdQualifyingExpenditure', 'number')}
                {renderField('R&D Enhancement Rate (%)', 'rdEnhancementRate', 'number')}
                {renderField('R&D Relief Claimed', 'rdReliefClaimed', 'number')}
                {renderField('R&D Tax Credit', 'rdTaxCredit', 'number')}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Other Reliefs & Credits</CardTitle>
              <CardDescription>Patent Box, Creative Industry, Group Relief, and other reliefs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {renderField('Patent Box Relief', 'patentBoxRelief', 'number')}
                {renderField('Creative Industry Relief', 'creativeIndustryRelief', 'number')}
                {renderField('Marginal Relief', 'marginalRelief', 'number')}
                {renderField('Group Relief', 'groupRelief', 'number')}
                {renderField('Other Reliefs', 'otherReliefs', 'number')}
              </div>
              <div className="border-t-2 border-[#001f3f] pt-4 mt-4">
                {renderCalculatedField('Total Reliefs & Credits', calculated.totalReliefs, 'text-lg text-green-600')}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Page 6: Tax Computation */}
        <TabsContent value="computation" className="space-y-6">
          <Card className="border-2 border-[#00703c] bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="bg-[#00703c] text-white">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calculator className="h-6 w-6" />
                Corporation Tax Computation
              </CardTitle>
              <CardDescription className="text-green-100">
                Final tax calculation summary
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded border border-[#001f3f]">
                  <span className="text-[#001f3f] font-medium">Profit Before Tax:</span>
                  <span className="font-semibold text-[#001f3f]">
                    £{(formData.profitBeforeTax || 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded border border-[#001f3f]">
                  <span className="text-[#001f3f] font-medium">Add: Tax Adjustments:</span>
                  <span className="font-semibold text-red-600">
                    £{calculated.totalAdjustments.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded border border-[#001f3f]">
                  <span className="text-[#001f3f] font-medium">Less: Capital Allowances:</span>
                  <span className="font-semibold text-green-600">
                    (£{calculated.totalCapitalAllowances.toLocaleString('en-GB', { minimumFractionDigits: 2 })})
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded border border-[#001f3f]">
                  <span className="text-[#001f3f] font-medium">Less: Losses Set Against Profit:</span>
                  <span className="font-semibold text-green-600">
                    (£{(formData.lossesSetAgainstProfit || 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })})
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg border-2 border-[#001f3f]">
                  <span className="text-[#001f3f] font-bold text-lg">Taxable Profit:</span>
                  <span className="font-bold text-xl text-[#001f3f]">
                    £{calculated.taxableProfit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded border border-[#001f3f]">
                  <span className="text-[#001f3f] font-medium">Corporation Tax @ {formData.corporationTaxRate || '19-25'}%:</span>
                  <span className="font-semibold text-red-600">
                    £{calculated.corporationTaxBeforeReliefs.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded border border-[#001f3f]">
                  <span className="text-[#001f3f] font-medium">Less: Total Reliefs & Credits:</span>
                  <span className="font-semibold text-green-600">
                    (£{calculated.totalReliefs.toLocaleString('en-GB', { minimumFractionDigits: 2 })})
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-5 bg-[#00703c] text-white rounded-lg border-2 border-[#00703c]">
                  <span className="font-bold text-xl">Corporation Tax Due:</span>
                  <span className="font-bold text-2xl">
                    £{calculated.corporationTaxDue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded border border-[#001f3f]">
                  <span className="text-[#001f3f] font-medium">Less: Quarterly Payments Made:</span>
                  <span className="font-semibold text-green-600">
                    (£{(formData.quarterlyPaymentsMade || 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })})
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg border-2 border-orange-600 shadow-lg">
                  <span className="font-bold text-xl">Balance Due / (Refund):</span>
                  <span className="font-bold text-2xl">
                    £{calculated.balanceDue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="border-2 border-[#001f3f]">
            <CardHeader>
              <CardTitle className="text-[#001f3f]">Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-4 md:grid-cols-2">
                {renderField('Quarterly Payments Made', 'quarterlyPaymentsMade', 'number')}
                <div className="space-y-2">
                  <Label className="text-[#001f3f] font-medium">Payment Deadline</Label>
                  <div className="p-2 border-2 border-[#001f3f] rounded bg-orange-50 font-semibold text-orange-600">
                    {formData.accountingPeriodEnd ? 
                      new Date(new Date(formData.accountingPeriodEnd).setMonth(new Date(formData.accountingPeriodEnd).getMonth() + 9)).toLocaleDateString('en-GB')
                      : 'Set accounting period end date'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t-2 border-[#001f3f]">
        <Button
          onClick={() => {
            const tabs = ['company', 'profitloss', 'adjustments', 'allowances', 'reliefs', 'computation']
            const currentIndex = tabs.indexOf(activeTab)
            if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1])
          }}
          variant="outline"
          disabled={activeTab === 'company'}
          className="border-[#001f3f]"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous Page
        </Button>
        
        <Button
          onClick={() => {
            const tabs = ['company', 'profitloss', 'adjustments', 'allowances', 'reliefs', 'computation']
            const currentIndex = tabs.indexOf(activeTab)
            if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1])
          }}
          variant="outline"
          disabled={activeTab === 'computation'}
          className="border-[#001f3f]"
        >
          Next Page
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

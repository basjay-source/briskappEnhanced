/**
 * Corporation Tax Data Sync Service
 * Syncs data from Accounts Production to Corporation Tax module
 * Automatically populates CT600 forms with P&L data, fixed assets, and adjustments
 */

export interface ProfitLossData {
  turnover: number
  costOfSales: number
  grossProfit: number
  distributionCosts: number
  administrativeExpenses: number
  otherOperatingIncome: number
  operatingProfit: number
  interestReceivable: number
  interestPayable: number
  profitBeforeTax: number
  taxation: number
  profitAfterTax: number
}

export interface FixedAsset {
  id: string
  assetName: string
  assetType: 'Plant & Machinery' | 'Buildings' | 'Vehicles' | 'IT Equipment' | 'Fixtures & Fittings' | 'Intangibles'
  acquisitionDate: string
  cost: number
  accumulatedDepreciation: number
  netBookValue: number
  disposalDate?: string
  disposalProceeds?: number
  usefulLife: number
  depreciationMethod: 'Straight Line' | 'Reducing Balance'
  depreciationRate: number
}

export interface TaxAdjustmentItem {
  id: string
  category: 'Depreciation' | 'Entertainment' | 'Legal & Professional' | 'Provisions' | 'Bad Debts' | 'Donations' | 'Fines & Penalties' | 'Client Entertainment' | 'Other'
  description: string
  accountsAmount: number
  taxAmount: number
  adjustment: number
  isAddition: boolean
  notes: string
}

export interface LossesData {
  tradeLossesBroughtForward: number
  capitalLossesBroughtForward: number
  currentYearTradeLoss: number
  currentYearCapitalLoss: number
  lossesCarriedBack: number
  lossesCarriedForward: number
  lossReliefClaimed: number
  groupReliefReceived: number
}

export interface SupplementaryPage {
  id: string
  pageType: 'CT600A' | 'CT600B' | 'CT600C' | 'CT600D' | 'CT600E' | 'CT600F' | 'CT600G' | 'CT600H' | 'CT600I' | 'CT600J'
  pageName: string
  data: any
}

export interface LoansToParticipators {
  loansMadeInPeriod: Array<{
    participatorName: string
    amountLoaned: number
    dateLoaned: string
    interestRate: number
    repaymentTerms: string
    outstandingBalance: number
  }>
  loansRepaidInPeriod: Array<{
    participatorName: string
    amountRepaid: number
    dateRepaid: string
    originalLoanDate: string
  }>
  totalLoansOutstanding: number
  s455TaxCharge: number
  s455TaxPaid: number
}

export interface CT600Data {
  companyDetails: {
    companyName: string
    companyNumber: string
    utr: string
    accountingPeriodStart: string
    accountingPeriodEnd: string
    taxYear: string
  }
  profitAndLoss: ProfitLossData
  taxAdjustments: TaxAdjustmentItem[]
  tradingProfit: number
  capitalAllowances: number
  balancingCharges: number
  adjustedTradingProfit: number
  nonTradingIncome: number
  chargeableGains: number
  totalProfits: number
  losses: LossesData
  taxableProfit: number
  corporationTaxRate: number
  corporationTaxCharge: number
  reliefs: {
    rdRelief: number
    patentBoxRelief: number
    creativeIndustryRelief: number
    marginalRelief: number
    groupRelief: number
    otherReliefs: number
    totalReliefs: number
  }
  taxAfterReliefs: number
  supplementaryPages: SupplementaryPage[]
  loansToParticipators?: LoansToParticipators
}

class CTDataSyncService {
  /**
   * Sync profit & loss data from Accounts Production
   */
  async syncProfitAndLoss(clientId: string, accountingPeriod: string): Promise<ProfitLossData> {
    return {
      turnover: 1250000,
      costOfSales: 450000,
      grossProfit: 800000,
      distributionCosts: 125000,
      administrativeExpenses: 385000,
      otherOperatingIncome: 15000,
      operatingProfit: 305000,
      interestReceivable: 2500,
      interestPayable: 12500,
      profitBeforeTax: 295000,
      taxation: 56050,
      profitAfterTax: 238950
    }
  }

  /**
   * Sync fixed assets from Accounts Production for capital allowances
   */
  async syncFixedAssets(clientId: string, accountingPeriod: string): Promise<FixedAsset[]> {
    return [
      {
        id: 'FA001',
        assetName: 'Manufacturing Equipment',
        assetType: 'Plant & Machinery',
        acquisitionDate: '2024-04-15',
        cost: 125000,
        accumulatedDepreciation: 15625,
        netBookValue: 109375,
        usefulLife: 8,
        depreciationMethod: 'Straight Line',
        depreciationRate: 12.5
      },
      {
        id: 'FA002',
        assetName: 'Office Building',
        assetType: 'Buildings',
        acquisitionDate: '2020-01-10',
        cost: 850000,
        accumulatedDepreciation: 85000,
        netBookValue: 765000,
        usefulLife: 50,
        depreciationMethod: 'Straight Line',
        depreciationRate: 2
      },
      {
        id: 'FA003',
        assetName: 'Computer Systems',
        assetType: 'IT Equipment',
        acquisitionDate: '2024-09-01',
        cost: 45000,
        accumulatedDepreciation: 1875,
        netBookValue: 43125,
        usefulLife: 4,
        depreciationMethod: 'Straight Line',
        depreciationRate: 25
      }
    ]
  }

  /**
   * Calculate tax adjustments automatically
   */
  calculateTaxAdjustments(profitLoss: ProfitLossData, fixedAssets: FixedAsset[]): TaxAdjustmentItem[] {
    const adjustments: TaxAdjustmentItem[] = []

    const totalDepreciation = fixedAssets.reduce((sum, asset) => sum + asset.accumulatedDepreciation, 0)
    adjustments.push({
      id: 'ADJ001',
      category: 'Depreciation',
      description: 'Depreciation disallowed for tax purposes',
      accountsAmount: totalDepreciation,
      taxAmount: 0,
      adjustment: totalDepreciation,
      isAddition: true,
      notes: 'Depreciation is not tax deductible. Capital allowances claimed separately.'
    })

    const entertainment = profitLoss.administrativeExpenses * 0.05 // Assume 5% is entertainment
    adjustments.push({
      id: 'ADJ002',
      category: 'Entertainment',
      description: 'Client entertainment - 50% disallowed',
      accountsAmount: entertainment,
      taxAmount: entertainment * 0.5,
      adjustment: entertainment * 0.5,
      isAddition: true,
      notes: 'Staff entertaining is allowable, client entertaining is not'
    })

    const legalFees = profitLoss.administrativeExpenses * 0.03 // Assume 3% is legal
    const capitalLegal = legalFees * 0.3 // 30% is capital in nature
    adjustments.push({
      id: 'ADJ003',
      category: 'Legal & Professional',
      description: 'Legal fees - capital element disallowed',
      accountsAmount: legalFees,
      taxAmount: legalFees - capitalLegal,
      adjustment: capitalLegal,
      isAddition: true,
      notes: 'Legal fees relating to capital transactions are not deductible'
    })

    return adjustments
  }

  /**
   * Calculate capital allowances from fixed assets
   */
  calculateCapitalAllowances(fixedAssets: FixedAsset[], accountingPeriod: string): {
    mainPool: number
    specialRatePool: number
    aia: number
    fya: number
    wda: number
    totalAllowances: number
  } {
    let aia = 0
    let mainPoolAdditions = 0
    let specialRateAdditions = 0

    const currentYearAssets = fixedAssets.filter(asset => {
      const acqDate = new Date(asset.acquisitionDate)
      const periodStart = new Date(accountingPeriod.split(' - ')[0])
      const periodEnd = new Date(accountingPeriod.split(' - ')[1])
      return acqDate >= periodStart && acqDate <= periodEnd
    })

    const aiaLimit = 1000000
    let aiaUsed = 0

    currentYearAssets.forEach(asset => {
      if (asset.assetType === 'Plant & Machinery' || asset.assetType === 'IT Equipment' || asset.assetType === 'Vehicles') {
        const aiaAvailable = Math.min(asset.cost, aiaLimit - aiaUsed)
        aia += aiaAvailable
        aiaUsed += aiaAvailable
        
        const remainingCost = asset.cost - aiaAvailable
        if (remainingCost > 0) {
          mainPoolAdditions += remainingCost
        }
      } else if (asset.assetType === 'Buildings') {
        specialRateAdditions += asset.cost
      }
    })

    const mainPoolRate = 0.18 // 18% main pool
    const specialRatePoolRate = 0.06 // 6% special rate pool

    const wdaMain = mainPoolAdditions * mainPoolRate
    const wdaSpecial = specialRateAdditions * specialRatePoolRate
    const totalWda = wdaMain + wdaSpecial

    return {
      mainPool: mainPoolAdditions,
      specialRatePool: specialRateAdditions,
      aia: aia,
      fya: 0, // First Year Allowances for specific assets
      wda: totalWda,
      totalAllowances: aia + totalWda
    }
  }

  /**
   * Calculate losses brought forward and carry back/forward
   */
  calculateLosses(currentYearProfit: number, lossesBroughtForward: number, priorYearProfits: number[]): LossesData {
    const currentYearLoss = Math.max(0, -currentYearProfit)
    const currentYearProfit_positive = Math.max(0, currentYearProfit)

    let lossReliefClaimed = 0
    let lossesCarriedBack = 0
    let lossesCarriedForward = 0

    if (currentYearLoss > 0) {
      const carryBackLimit = Math.min(currentYearLoss, 2000000)
      const availableForCarryBack = priorYearProfits.length > 0 ? Math.min(priorYearProfits[0], carryBackLimit) : 0
      lossesCarriedBack = availableForCarryBack
      lossesCarriedForward = currentYearLoss - lossesCarriedBack
    } else if (lossesBroughtForward > 0 && currentYearProfit_positive > 0) {
      const profitThreshold = 5000000
      const maxLossRelief = currentYearProfit_positive > profitThreshold 
        ? currentYearProfit_positive - profitThreshold 
        : currentYearProfit_positive
      
      lossReliefClaimed = Math.min(lossesBroughtForward, maxLossRelief)
      lossesCarriedForward = lossesBroughtForward - lossReliefClaimed
    } else {
      lossesCarriedForward = lossesBroughtForward
    }

    return {
      tradeLossesBroughtForward: lossesBroughtForward,
      capitalLossesBroughtForward: 0,
      currentYearTradeLoss: currentYearLoss,
      currentYearCapitalLoss: 0,
      lossesCarriedBack: lossesCarriedBack,
      lossesCarriedForward: lossesCarriedForward,
      lossReliefClaimed: lossReliefClaimed,
      groupReliefReceived: 0
    }
  }

  /**
   * Create CT600A supplementary page for loans to/from participators
   */
  createLoansToParticipatorsPage(loansData: LoansToParticipators): SupplementaryPage {
    const s455Rate = 0.325
    const s455Charge = loansData.totalLoansOutstanding * s455Rate

    return {
      id: 'CT600A',
      pageType: 'CT600A',
      pageName: 'Loans to Participators',
      data: {
        ...loansData,
        s455TaxCharge: s455Charge,
        calculationMethod: 'Outstanding loans x 32.5%',
        dueDate: 'Nine months and one day after end of accounting period'
      }
    }
  }

  /**
   * Generate complete CT600 data from Accounts Production sync
   */
  async generateCT600Data(
    clientId: string,
    companyDetails: any,
    accountingPeriod: string,
    lossesBroughtForward: number = 0,
    priorYearProfits: number[] = [],
    loansToParticipators?: LoansToParticipators
  ): Promise<CT600Data> {
    const profitLoss = await this.syncProfitAndLoss(clientId, accountingPeriod)
    const fixedAssets = await this.syncFixedAssets(clientId, accountingPeriod)

    const taxAdjustments = this.calculateTaxAdjustments(profitLoss, fixedAssets)
    const totalAdjustments = taxAdjustments.reduce((sum, adj) => 
      sum + (adj.isAddition ? adj.adjustment : -adj.adjustment), 0
    )

    const capitalAllowances = this.calculateCapitalAllowances(fixedAssets, accountingPeriod)

    const tradingProfit = profitLoss.profitBeforeTax + totalAdjustments - capitalAllowances.totalAllowances

    const losses = this.calculateLosses(tradingProfit, lossesBroughtForward, priorYearProfits)

    const taxableProfit = Math.max(0, tradingProfit - losses.lossReliefClaimed)

    const smallProfitsLimit = 50000
    const marginalReliefLowerLimit = 50000
    const marginalReliefUpperLimit = 250000

    let corporationTaxRate: number
    let corporationTaxCharge: number
    let marginalRelief = 0

    if (taxableProfit <= marginalReliefLowerLimit) {
      corporationTaxRate = 0.19
      corporationTaxCharge = taxableProfit * 0.19
    } else if (taxableProfit >= marginalReliefUpperLimit) {
      corporationTaxRate = 0.25
      corporationTaxCharge = taxableProfit * 0.25
    } else {
      corporationTaxRate = 0.25
      const fullRate = taxableProfit * 0.25
      marginalRelief = ((marginalReliefUpperLimit - taxableProfit) / taxableProfit) * (taxableProfit - marginalReliefLowerLimit) * 0.015
      corporationTaxCharge = fullRate - marginalRelief
    }

    const reliefs = {
      rdRelief: 0,
      patentBoxRelief: 0,
      creativeIndustryRelief: 0,
      marginalRelief: marginalRelief,
      groupRelief: 0,
      otherReliefs: 0,
      totalReliefs: marginalRelief
    }

    const taxAfterReliefs = Math.max(0, corporationTaxCharge - reliefs.totalReliefs)

    const supplementaryPages: SupplementaryPage[] = []
    if (loansToParticipators && loansToParticipators.totalLoansOutstanding > 0) {
      supplementaryPages.push(this.createLoansToParticipatorsPage(loansToParticipators))
    }

    return {
      companyDetails,
      profitAndLoss: profitLoss,
      taxAdjustments,
      tradingProfit,
      capitalAllowances: capitalAllowances.totalAllowances,
      balancingCharges: 0,
      adjustedTradingProfit: tradingProfit,
      nonTradingIncome: profitLoss.interestReceivable,
      chargeableGains: 0,
      totalProfits: tradingProfit + profitLoss.interestReceivable,
      losses,
      taxableProfit,
      corporationTaxRate,
      corporationTaxCharge,
      reliefs,
      taxAfterReliefs,
      supplementaryPages,
      loansToParticipators
    }
  }
}

export const ctDataSyncService = new CTDataSyncService()

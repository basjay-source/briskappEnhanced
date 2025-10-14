interface TaxBand {
  name: string
  threshold: number
  rate: number
}

interface TaxRates {
  year: string
  personalAllowance: number
  incomeTaxBands: TaxBand[]
  nationalInsuranceRates: {
    class1Employee: { threshold: number; rate: number; upperRate: number }
    class2SelfEmployed: number
    class4SelfEmployed: { lowerThreshold: number; upperThreshold: number; lowerRate: number; upperRate: number }
  }
  dividendAllowance: number
  dividendTaxRates: {
    basic: number
    higher: number
    additional: number
  }
  capitalGainsTax: {
    allowance: number
    basicRate: number
    higherRate: number
  }
  savingsAllowance: {
    basic: number
    higher: number
  }
  inheritanceTax: {
    nilRateBand: number
    residenceNilRateBand: number
    rate: number
    taperThreshold: number
  }
  pension: {
    annualAllowance: number
    lifetimeAllowance: number
    moneyPurchaseAnnualAllowance: number
    taperThreshold: number
    taperRate: number
    minimumAllowance: number
  }
  marriageAllowance: {
    transferableAmount: number
    incomeLimit: number
  }
  corporationTax: {
    mainRate: number
    smallProfitsRate: number
    smallProfitsThreshold: number
    marginalReliefUpperLimit: number
    marginalReliefLowerLimit: number
    marginalReliefFraction: number
  }
  vat: {
    standardRate: number
    reducedRate: number
    registrationThreshold: number
    deregistrationThreshold: number
    flatRateSchemes: {
      accountancy: number
      advertising: number
      catering: number
      construction: number
      it: number
      retail: number
      other: number
    }
  }
  capitalAllowances: {
    annualInvestmentAllowance: number
    writingDownAllowanceMain: number
    writingDownAllowanceSpecial: number
    firstYearAllowance: number
  }
}

const historicalTaxRates: Record<string, TaxRates> = {
  '2024-25': {
    year: '2024-25',
    personalAllowance: 12570,
    incomeTaxBands: [
      { name: 'Basic rate', threshold: 12570, rate: 20 },
      { name: 'Higher rate', threshold: 50270, rate: 40 },
      { name: 'Additional rate', threshold: 125140, rate: 45 }
    ],
    nationalInsuranceRates: {
      class1Employee: { threshold: 12570, rate: 12, upperRate: 2 },
      class2SelfEmployed: 3.45,
      class4SelfEmployed: { lowerThreshold: 12570, upperThreshold: 50270, lowerRate: 9, upperRate: 2 }
    },
    dividendAllowance: 500,
    dividendTaxRates: { basic: 8.75, higher: 33.75, additional: 39.35 },
    capitalGainsTax: { allowance: 3000, basicRate: 10, higherRate: 20 },
    savingsAllowance: { basic: 1000, higher: 500 },
    inheritanceTax: {
      nilRateBand: 325000,
      residenceNilRateBand: 175000,
      rate: 40,
      taperThreshold: 2000000
    },
    pension: {
      annualAllowance: 60000,
      lifetimeAllowance: 0,
      moneyPurchaseAnnualAllowance: 10000,
      taperThreshold: 260000,
      taperRate: 0.5,
      minimumAllowance: 10000
    },
    marriageAllowance: {
      transferableAmount: 1260,
      incomeLimit: 50270
    },
    corporationTax: {
      mainRate: 25,
      smallProfitsRate: 19,
      smallProfitsThreshold: 50000,
      marginalReliefUpperLimit: 250000,
      marginalReliefLowerLimit: 50000,
      marginalReliefFraction: 0.015
    },
    vat: {
      standardRate: 20,
      reducedRate: 5,
      registrationThreshold: 90000,
      deregistrationThreshold: 88000,
      flatRateSchemes: {
        accountancy: 14.5,
        advertising: 11,
        catering: 12.5,
        construction: 14.5,
        it: 14.5,
        retail: 7.5,
        other: 12
      }
    },
    capitalAllowances: {
      annualInvestmentAllowance: 1000000,
      writingDownAllowanceMain: 18,
      writingDownAllowanceSpecial: 6,
      firstYearAllowance: 100
    }
  },
  '2023-24': {
    year: '2023-24',
    personalAllowance: 12570,
    incomeTaxBands: [
      { name: 'Basic rate', threshold: 12570, rate: 20 },
      { name: 'Higher rate', threshold: 50270, rate: 40 },
      { name: 'Additional rate', threshold: 125140, rate: 45 }
    ],
    nationalInsuranceRates: {
      class1Employee: { threshold: 12570, rate: 12, upperRate: 2 },
      class2SelfEmployed: 3.45,
      class4SelfEmployed: { lowerThreshold: 12570, upperThreshold: 50270, lowerRate: 9, upperRate: 2 }
    },
    dividendAllowance: 1000,
    dividendTaxRates: { basic: 8.75, higher: 33.75, additional: 39.35 },
    capitalGainsTax: { allowance: 6000, basicRate: 10, higherRate: 20 },
    savingsAllowance: { basic: 1000, higher: 500 },
    inheritanceTax: {
      nilRateBand: 325000,
      residenceNilRateBand: 175000,
      rate: 40,
      taperThreshold: 2000000
    },
    pension: {
      annualAllowance: 60000,
      lifetimeAllowance: 1073100,
      moneyPurchaseAnnualAllowance: 10000,
      taperThreshold: 260000,
      taperRate: 0.5,
      minimumAllowance: 10000
    },
    marriageAllowance: {
      transferableAmount: 1260,
      incomeLimit: 50270
    },
    corporationTax: {
      mainRate: 25,
      smallProfitsRate: 19,
      smallProfitsThreshold: 50000,
      marginalReliefUpperLimit: 250000,
      marginalReliefLowerLimit: 50000,
      marginalReliefFraction: 0.015
    },
    vat: {
      standardRate: 20,
      reducedRate: 5,
      registrationThreshold: 85000,
      deregistrationThreshold: 83000,
      flatRateSchemes: {
        accountancy: 14.5,
        advertising: 11,
        catering: 12.5,
        construction: 14.5,
        it: 14.5,
        retail: 7.5,
        other: 12
      }
    },
    capitalAllowances: {
      annualInvestmentAllowance: 1000000,
      writingDownAllowanceMain: 18,
      writingDownAllowanceSpecial: 6,
      firstYearAllowance: 100
    }
  },
  '2022-23': {
    year: '2022-23',
    personalAllowance: 12570,
    incomeTaxBands: [
      { name: 'Basic rate', threshold: 12570, rate: 20 },
      { name: 'Higher rate', threshold: 50270, rate: 40 },
      { name: 'Additional rate', threshold: 150000, rate: 45 }
    ],
    nationalInsuranceRates: {
      class1Employee: { threshold: 12570, rate: 13.25, upperRate: 3.25 },
      class2SelfEmployed: 3.15,
      class4SelfEmployed: { lowerThreshold: 11908, upperThreshold: 50270, lowerRate: 10.25, upperRate: 3.25 }
    },
    dividendAllowance: 2000,
    dividendTaxRates: { basic: 8.75, higher: 33.75, additional: 39.35 },
    capitalGainsTax: { allowance: 12300, basicRate: 10, higherRate: 20 },
    savingsAllowance: { basic: 1000, higher: 500 },
    inheritanceTax: {
      nilRateBand: 325000,
      residenceNilRateBand: 175000,
      rate: 40,
      taperThreshold: 2000000
    },
    pension: {
      annualAllowance: 40000,
      lifetimeAllowance: 1073100,
      moneyPurchaseAnnualAllowance: 4000,
      taperThreshold: 240000,
      taperRate: 0.5,
      minimumAllowance: 10000
    },
    marriageAllowance: {
      transferableAmount: 1260,
      incomeLimit: 50270
    }
  },
  '2021-22': {
    year: '2021-22',
    personalAllowance: 12570,
    incomeTaxBands: [
      { name: 'Basic rate', threshold: 12570, rate: 20 },
      { name: 'Higher rate', threshold: 50270, rate: 40 },
      { name: 'Additional rate', threshold: 150000, rate: 45 }
    ],
    nationalInsuranceRates: {
      class1Employee: { threshold: 9568, rate: 12, upperRate: 2 },
      class2SelfEmployed: 3.05,
      class4SelfEmployed: { lowerThreshold: 9568, upperThreshold: 50270, lowerRate: 9, upperRate: 2 }
    },
    dividendAllowance: 2000,
    dividendTaxRates: { basic: 7.5, higher: 32.5, additional: 38.1 },
    capitalGainsTax: { allowance: 12300, basicRate: 10, higherRate: 20 },
    savingsAllowance: { basic: 1000, higher: 500 },
    inheritanceTax: { nilRateBand: 325000, residenceNilRateBand: 175000, rate: 40, taperThreshold: 2000000 },
    pension: { annualAllowance: 40000, lifetimeAllowance: 1073100, moneyPurchaseAnnualAllowance: 4000, taperThreshold: 240000, taperRate: 0.5, minimumAllowance: 10000 },
    marriageAllowance: { transferableAmount: 1260, incomeLimit: 50270 }
  },
  '2020-21': {
    year: '2020-21',
    personalAllowance: 12500,
    incomeTaxBands: [
      { name: 'Basic rate', threshold: 12500, rate: 20 },
      { name: 'Higher rate', threshold: 50000, rate: 40 },
      { name: 'Additional rate', threshold: 150000, rate: 45 }
    ],
    nationalInsuranceRates: {
      class1Employee: { threshold: 9500, rate: 12, upperRate: 2 },
      class2SelfEmployed: 3.05,
      class4SelfEmployed: { lowerThreshold: 9500, upperThreshold: 50000, lowerRate: 9, upperRate: 2 }
    },
    dividendAllowance: 2000,
    dividendTaxRates: { basic: 7.5, higher: 32.5, additional: 38.1 },
    capitalGainsTax: { allowance: 12300, basicRate: 10, higherRate: 20 },
    savingsAllowance: { basic: 1000, higher: 500 },
    inheritanceTax: { nilRateBand: 325000, residenceNilRateBand: 150000, rate: 40, taperThreshold: 2000000 },
    pension: { annualAllowance: 40000, lifetimeAllowance: 1073100, moneyPurchaseAnnualAllowance: 4000, taperThreshold: 240000, taperRate: 0.5, minimumAllowance: 10000 },
    marriageAllowance: { transferableAmount: 1250, incomeLimit: 50000 }
  },
  '2019-20': {
    year: '2019-20',
    personalAllowance: 12500,
    incomeTaxBands: [
      { name: 'Basic rate', threshold: 12500, rate: 20 },
      { name: 'Higher rate', threshold: 50000, rate: 40 },
      { name: 'Additional rate', threshold: 150000, rate: 45 }
    ],
    nationalInsuranceRates: {
      class1Employee: { threshold: 8632, rate: 12, upperRate: 2 },
      class2SelfEmployed: 3.00,
      class4SelfEmployed: { lowerThreshold: 8632, upperThreshold: 50000, lowerRate: 9, upperRate: 2 }
    },
    dividendAllowance: 2000,
    dividendTaxRates: { basic: 7.5, higher: 32.5, additional: 38.1 },
    capitalGainsTax: { allowance: 12000, basicRate: 10, higherRate: 20 },
    savingsAllowance: { basic: 1000, higher: 500 },
    inheritanceTax: { nilRateBand: 325000, residenceNilRateBand: 150000, rate: 40, taperThreshold: 2000000 },
    pension: { annualAllowance: 40000, lifetimeAllowance: 1055000, moneyPurchaseAnnualAllowance: 4000, taperThreshold: 150000, taperRate: 0.5, minimumAllowance: 10000 },
    marriageAllowance: { transferableAmount: 1250, incomeLimit: 50000 }
  },
  '2018-19': {
    year: '2018-19',
    personalAllowance: 11850,
    incomeTaxBands: [
      { name: 'Basic rate', threshold: 11850, rate: 20 },
      { name: 'Higher rate', threshold: 46350, rate: 40 },
      { name: 'Additional rate', threshold: 150000, rate: 45 }
    ],
    nationalInsuranceRates: {
      class1Employee: { threshold: 8424, rate: 12, upperRate: 2 },
      class2SelfEmployed: 2.95,
      class4SelfEmployed: { lowerThreshold: 8424, upperThreshold: 46350, lowerRate: 9, upperRate: 2 }
    },
    dividendAllowance: 2000,
    dividendTaxRates: { basic: 7.5, higher: 32.5, additional: 38.1 },
    capitalGainsTax: { allowance: 11700, basicRate: 10, higherRate: 20 },
    savingsAllowance: { basic: 1000, higher: 500 },
    inheritanceTax: { nilRateBand: 325000, residenceNilRateBand: 125000, rate: 40, taperThreshold: 2000000 },
    pension: { annualAllowance: 40000, lifetimeAllowance: 1030000, moneyPurchaseAnnualAllowance: 4000, taperThreshold: 150000, taperRate: 0.5, minimumAllowance: 10000 },
    marriageAllowance: { transferableAmount: 1190, incomeLimit: 46350 }
  },
  '2017-18': {
    year: '2017-18',
    personalAllowance: 11500,
    incomeTaxBands: [
      { name: 'Basic rate', threshold: 11500, rate: 20 },
      { name: 'Higher rate', threshold: 45000, rate: 40 },
      { name: 'Additional rate', threshold: 150000, rate: 45 }
    ],
    nationalInsuranceRates: {
      class1Employee: { threshold: 8164, rate: 12, upperRate: 2 },
      class2SelfEmployed: 2.85,
      class4SelfEmployed: { lowerThreshold: 8164, upperThreshold: 45000, lowerRate: 9, upperRate: 2 }
    },
    dividendAllowance: 5000,
    dividendTaxRates: { basic: 7.5, higher: 32.5, additional: 38.1 },
    capitalGainsTax: { allowance: 11300, basicRate: 10, higherRate: 20 },
    savingsAllowance: { basic: 1000, higher: 500 },
    inheritanceTax: { nilRateBand: 325000, residenceNilRateBand: 100000, rate: 40, taperThreshold: 2000000 },
    pension: { annualAllowance: 40000, lifetimeAllowance: 1000000, moneyPurchaseAnnualAllowance: 4000, taperThreshold: 150000, taperRate: 0.5, minimumAllowance: 10000 },
    marriageAllowance: { transferableAmount: 1150, incomeLimit: 45000 }
  },
  '2016-17': {
    year: '2016-17',
    personalAllowance: 11000,
    incomeTaxBands: [
      { name: 'Basic rate', threshold: 11000, rate: 20 },
      { name: 'Higher rate', threshold: 43000, rate: 40 },
      { name: 'Additional rate', threshold: 150000, rate: 45 }
    ],
    nationalInsuranceRates: {
      class1Employee: { threshold: 8060, rate: 12, upperRate: 2 },
      class2SelfEmployed: 2.80,
      class4SelfEmployed: { lowerThreshold: 8060, upperThreshold: 43000, lowerRate: 9, upperRate: 2 }
    },
    dividendAllowance: 5000,
    dividendTaxRates: { basic: 7.5, higher: 32.5, additional: 38.1 },
    capitalGainsTax: { allowance: 11100, basicRate: 10, higherRate: 20 },
    savingsAllowance: { basic: 1000, higher: 500 },
    inheritanceTax: { nilRateBand: 325000, residenceNilRateBand: 100000, rate: 40, taperThreshold: 2000000 },
    pension: { annualAllowance: 40000, lifetimeAllowance: 1000000, moneyPurchaseAnnualAllowance: 4000, taperThreshold: 150000, taperRate: 0.5, minimumAllowance: 10000 },
    marriageAllowance: { transferableAmount: 1100, incomeLimit: 43000 }
  },
  '2015-16': {
    year: '2015-16',
    personalAllowance: 10600,
    incomeTaxBands: [
      { name: 'Basic rate', threshold: 10600, rate: 20 },
      { name: 'Higher rate', threshold: 42385, rate: 40 },
      { name: 'Additional rate', threshold: 150000, rate: 45 }
    ],
    nationalInsuranceRates: {
      class1Employee: { threshold: 8060, rate: 12, upperRate: 2 },
      class2SelfEmployed: 2.80,
      class4SelfEmployed: { lowerThreshold: 8060, upperThreshold: 42385, lowerRate: 9, upperRate: 2 }
    },
    dividendAllowance: 0,
    dividendTaxRates: { basic: 0, higher: 25, additional: 30.56 },
    capitalGainsTax: { allowance: 11100, basicRate: 18, higherRate: 28 },
    savingsAllowance: { basic: 0, higher: 0 },
    inheritanceTax: { nilRateBand: 325000, residenceNilRateBand: 0, rate: 40, taperThreshold: 2000000 },
    pension: { annualAllowance: 40000, lifetimeAllowance: 1250000, moneyPurchaseAnnualAllowance: 4000, taperThreshold: 150000, taperRate: 0.5, minimumAllowance: 10000 },
    marriageAllowance: { transferableAmount: 1060, incomeLimit: 42385 }
  }
}

export function getTaxRatesForYear(taxYear: string): TaxRates {
  const rates = historicalTaxRates[taxYear]
  if (!rates) {
    return historicalTaxRates['2024-25']
  }
  return rates
}

export function calculateIncomeTax(income: number, taxYear: string): number {
  const rates = getTaxRatesForYear(taxYear)
  let tax = 0
  let remainingIncome = income

  if (remainingIncome <= rates.personalAllowance) {
    return 0
  }

  remainingIncome -= rates.personalAllowance

  for (let i = 0; i < rates.incomeTaxBands.length; i++) {
    const band = rates.incomeTaxBands[i]
    const nextBand = rates.incomeTaxBands[i + 1]
    
    if (nextBand) {
      const bandWidth = nextBand.threshold - band.threshold
      const taxableInBand = Math.min(remainingIncome, bandWidth)
      tax += taxableInBand * (band.rate / 100)
      remainingIncome -= taxableInBand
    } else {
      tax += remainingIncome * (band.rate / 100)
      break
    }
  }

  return Math.round(tax * 100) / 100
}

export function calculateDividendTax(dividendIncome: number, otherIncome: number, taxYear: string): number {
  const rates = getTaxRatesForYear(taxYear)
  let tax = 0
  
  const taxableDiv = Math.max(0, dividendIncome - rates.dividendAllowance)
  const totalIncome = otherIncome + dividendIncome
  
  if (totalIncome <= rates.personalAllowance) {
    return 0
  }

  const basicRateLimit = rates.incomeTaxBands[0]?.threshold || 50270
  const higherRateLimit = rates.incomeTaxBands[1]?.threshold || 150000

  if (totalIncome <= basicRateLimit) {
    tax = taxableDiv * (rates.dividendTaxRates.basic / 100)
  } else if (totalIncome <= higherRateLimit) {
    const basicRatePortion = Math.max(0, basicRateLimit - otherIncome)
    const higherRatePortion = taxableDiv - basicRatePortion
    tax = (basicRatePortion * rates.dividendTaxRates.basic / 100) + 
          (higherRatePortion * rates.dividendTaxRates.higher / 100)
  } else {
    const basicRatePortion = Math.max(0, basicRateLimit - otherIncome)
    const higherRatePortion = Math.max(0, Math.min(taxableDiv - basicRatePortion, higherRateLimit - basicRateLimit))
    const additionalRatePortion = Math.max(0, taxableDiv - basicRatePortion - higherRatePortion)
    tax = (basicRatePortion * rates.dividendTaxRates.basic / 100) + 
          (higherRatePortion * rates.dividendTaxRates.higher / 100) +
          (additionalRatePortion * rates.dividendTaxRates.additional / 100)
  }

  return Math.round(tax * 100) / 100
}

export function calculateCapitalGainsTax(gains: number, taxableIncome: number, taxYear: string): number {
  const rates = getTaxRatesForYear(taxYear)
  const taxableGains = Math.max(0, gains - rates.capitalGainsTax.allowance)
  
  if (taxableGains === 0) return 0

  const basicRateLimit = rates.incomeTaxBands[0]?.threshold || 50270
  const remainingBasicRate = Math.max(0, basicRateLimit - taxableIncome)

  let tax = 0
  if (remainingBasicRate >= taxableGains) {
    tax = taxableGains * (rates.capitalGainsTax.basicRate / 100)
  } else {
    tax = (remainingBasicRate * rates.capitalGainsTax.basicRate / 100) +
          ((taxableGains - remainingBasicRate) * rates.capitalGainsTax.higherRate / 100)
  }

  return Math.round(tax * 100) / 100
}

export function generateTaxYears(): string[] {
  const currentYear = new Date().getFullYear()
  const years: string[] = []
  
  for (let i = 0; i < 30; i++) {
    const startYear = currentYear - i
    const endYear = startYear + 1
    years.push(`${startYear}-${endYear.toString().slice(-2)}`)
  }
  
  return years
}

export function getAllTaxRates(): TaxRates[] {
  return Object.values(historicalTaxRates)
}

export function calculateIHT(estateValue: number, residenceValue: number, taxYear: string): {
  nilRateBand: number
  residenceNilRateBand: number
  totalNilRateBand: number
  taxableEstate: number
  ihtDue: number
  effectiveRate: number
} {
  const rates = getTaxRatesForYear(taxYear)
  const iht = rates.inheritanceTax
  
  let residenceNRB = iht.residenceNilRateBand
  
  if (estateValue > iht.taperThreshold) {
    const excess = estateValue - iht.taperThreshold
    const reduction = Math.floor(excess / 2)
    residenceNRB = Math.max(0, residenceNRB - reduction)
  }
  
  if (residenceValue === 0) {
    residenceNRB = 0
  }
  
  const totalNilRateBand = iht.nilRateBand + residenceNRB
  const taxableEstate = Math.max(0, estateValue - totalNilRateBand)
  const ihtDue = taxableEstate * (iht.rate / 100)
  const effectiveRate = estateValue > 0 ? (ihtDue / estateValue) * 100 : 0
  
  return {
    nilRateBand: iht.nilRateBand,
    residenceNilRateBand: residenceNRB,
    totalNilRateBand,
    taxableEstate,
    ihtDue,
    effectiveRate
  }
}

export function calculatePensionAllowance(adjustedIncome: number, taxYear: string): {
  annualAllowance: number
  tapered: boolean
  reduction: number
  availableAllowance: number
} {
  const rates = getTaxRatesForYear(taxYear)
  const pension = rates.pension
  
  if (adjustedIncome <= pension.taperThreshold) {
    return {
      annualAllowance: pension.annualAllowance,
      tapered: false,
      reduction: 0,
      availableAllowance: pension.annualAllowance
    }
  }
  
  const excess = adjustedIncome - pension.taperThreshold
  const reduction = Math.floor(excess * pension.taperRate)
  const taperedAllowance = Math.max(pension.minimumAllowance, pension.annualAllowance - reduction)
  
  return {
    annualAllowance: pension.annualAllowance,
    tapered: true,
    reduction,
    availableAllowance: taperedAllowance
  }
}

export function calculateMarriageAllowanceSaving(spouse1Income: number, spouse2Income: number, taxYear: string): {
  eligible: boolean
  transferableAmount: number
  taxSaving: number
  reason: string
} {
  const rates = getTaxRatesForYear(taxYear)
  const ma = rates.marriageAllowance
  const basicRateTax = rates.incomeTaxBands[0]?.rate || 20
  
  const checkTransfer = (lowerIncome: number, higherIncome: number) => {
    if (lowerIncome > ma.incomeLimit) {
      return { eligible: false, reason: 'Both incomes exceed the limit' }
    }
    if (higherIncome > ma.incomeLimit) {
      return { eligible: false, reason: 'Receiving spouse is a higher rate taxpayer' }
    }
    if (lowerIncome > rates.personalAllowance) {
      return { eligible: false, reason: 'Transferring spouse uses all their personal allowance' }
    }
    return { eligible: true, reason: 'Eligible for Marriage Allowance' }
  }
  
  let result
  if (spouse1Income < spouse2Income) {
    result = checkTransfer(spouse1Income, spouse2Income)
  } else {
    result = checkTransfer(spouse2Income, spouse1Income)
  }
  
  const taxSaving = result.eligible ? (ma.transferableAmount * basicRateTax / 100) : 0
  
  return {
    eligible: result.eligible,
    transferableAmount: ma.transferableAmount,
    taxSaving,
    reason: result.reason
  }
}
export function calculateOpportunityEstimate(
  opportunityType: string,
  taxYear: string,
  assumedIncome: number = 50000
): number {
  const rates = getTaxRatesForYear(taxYear)
  
  switch (opportunityType) {
    case 'pension-contribution':
      return Math.round(assumedIncome * 0.16)
    
    case 'marriage-allowance':
      return Math.round(rates.marriageAllowance.transferableAmount * 0.20)
    
    case 'dividend-optimization':
      const dividendSavings = rates.dividendAllowance * (rates.dividendTaxRates.basic / 100)
      return Math.round(dividendSavings + (5000 * 0.135))
    
    case 'capital-allowances':
      return Math.round(assumedIncome * 0.10)
    
    case 'tax-loss-harvesting':
      return Math.round(rates.capitalGainsTax.allowance * (rates.capitalGainsTax.basicRate / 100))
    
    case 'iht-planning':
      return Math.round(rates.inheritanceTax.nilRateBand * (rates.inheritanceTax.rate / 100))
    
    case 'gift-aid':
      const giftAidContribution = 5000
      return Math.round(giftAidContribution * 0.25)
    
    case 'eis-seis':
      const eisInvestment = 50000
      return Math.round(eisInvestment * 0.30)
    
    case 'vct-investment':
      const vctInvestment = 30000
      return Math.round(vctInvestment * 0.30)
    
    case 'rent-a-room':
      return Math.round(7500 * 0.20)
    
    case 'trading-allowance':
      return Math.round(1000 * 0.20)
    
    case 'property-allowance':
      return Math.round(1000 * 0.20)
    
    case 'child-benefit':
      const childBenefitAmount = 2200
      return Math.round(childBenefitAmount * 0.50)
    
    case 'tax-code-review':
      return Math.round(assumedIncome * 0.015)
    
    case 'business-expense':
      const expenseClaim = 12000
      return Math.round(expenseClaim * 0.20)
    
    case 'incorporation':
      const corporationTaxSaving = assumedIncome * (0.20 - 0.19)
      const dividendSaving = assumedIncome * 0.15
      return Math.round(corporationTaxSaving + dividendSaving)
    
    case 'r&d-relief':
      const rdExpenditure = 100000
      return Math.round(rdExpenditure * 0.25)
    
    case 'other':
    default:
      return 0
  }
}

export function calculateCorporationTax(
  taxableProfit: number,
  taxYear: string
): {
  mainRate: number
  smallProfitsRate: number
  effectiveRate: number
  corporationTax: number
  marginalRelief: number
} {
  const rates = getTaxRatesForYear(taxYear)
  const ct = rates.corporationTax
  
  if (taxableProfit <= ct.smallProfitsThreshold) {
    return {
      mainRate: ct.mainRate,
      smallProfitsRate: ct.smallProfitsRate,
      effectiveRate: ct.smallProfitsRate,
      corporationTax: Math.round(taxableProfit * (ct.smallProfitsRate / 100)),
      marginalRelief: 0
    }
  }
  
  if (taxableProfit >= ct.marginalReliefUpperLimit) {
    const tax = Math.round(taxableProfit * (ct.mainRate / 100))
    return {
      mainRate: ct.mainRate,
      smallProfitsRate: ct.smallProfitsRate,
      effectiveRate: ct.mainRate,
      corporationTax: tax,
      marginalRelief: 0
    }
  }
  
  const standardTax = taxableProfit * (ct.mainRate / 100)
  const marginalRelief = (ct.marginalReliefUpperLimit - taxableProfit) * ct.marginalReliefFraction
  const corporationTax = Math.round(standardTax - marginalRelief)
  const effectiveRate = (corporationTax / taxableProfit) * 100
  
  return {
    mainRate: ct.mainRate,
    smallProfitsRate: ct.smallProfitsRate,
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    corporationTax,
    marginalRelief: Math.round(marginalRelief)
  }
}

export function calculateVAT(
  netAmount: number,
  vatRate: 'standard' | 'reduced' | 'zero' = 'standard',
  taxYear: string = '2024-25'
): {
  netAmount: number
  vatAmount: number
  grossAmount: number
  vatRate: number
} {
  const rates = getTaxRatesForYear(taxYear)
  const rate = vatRate === 'standard' ? rates.vat.standardRate : 
               vatRate === 'reduced' ? rates.vat.reducedRate : 0
  
  const vatAmount = Math.round((netAmount * rate / 100) * 100) / 100
  const grossAmount = netAmount + vatAmount
  
  return {
    netAmount,
    vatAmount,
    grossAmount,
    vatRate: rate
  }
}

export function calculateCapitalAllowances(
  expenditure: number,
  poolType: 'main' | 'special' | 'aia' | 'fya',
  taxYear: string
): {
  allowance: number
  writtenDownValue: number
  allowanceRate: number
} {
  const rates = getTaxRatesForYear(taxYear)
  const ca = rates.capitalAllowances
  
  let allowanceRate = 0
  let allowance = 0
  
  switch (poolType) {
    case 'aia':
      allowance = Math.min(expenditure, ca.annualInvestmentAllowance)
      allowanceRate = 100
      break
    case 'fya':
      allowance = expenditure * (ca.firstYearAllowance / 100)
      allowanceRate = ca.firstYearAllowance
      break
    case 'main':
      allowance = expenditure * (ca.writingDownAllowanceMain / 100)
      allowanceRate = ca.writingDownAllowanceMain
      break
    case 'special':
      allowance = expenditure * (ca.writingDownAllowanceSpecial / 100)
      allowanceRate = ca.writingDownAllowanceSpecial
      break
  }
  
  return {
    allowance: Math.round(allowance),
    writtenDownValue: Math.round(expenditure - allowance),
    allowanceRate
  }
}

// Helper function to add default CT/VAT/CA rates to older years
const defaultCTVATRates = {
  corporationTax: {
    mainRate: 19,
    smallProfitsRate: 19,
    smallProfitsThreshold: 300000,
    marginalReliefUpperLimit: 1500000,
    marginalReliefLowerLimit: 300000,
    marginalReliefFraction: 0.0075
  },
  vat: {
    standardRate: 20,
    reducedRate: 5,
    registrationThreshold: 85000,
    deregistrationThreshold: 83000,
    flatRateSchemes: {
      accountancy: 14.5,
      advertising: 11,
      catering: 12.5,
      construction: 14.5,
      it: 14.5,
      retail: 7.5,
      other: 12
    }
  },
  capitalAllowances: {
    annualInvestmentAllowance: 200000,
    writingDownAllowanceMain: 18,
    writingDownAllowanceSpecial: 8,
    firstYearAllowance: 100
  }
}

// Add missing rates to all years
Object.keys(historicalTaxRates).forEach(year => {
  const rates = historicalTaxRates[year] as any
  if (!rates.corporationTax) {
    rates.corporationTax = { ...defaultCTVATRates.corporationTax }
  }
  if (!rates.vat) {
    rates.vat = { ...defaultCTVATRates.vat }
  }
  if (!rates.capitalAllowances) {
    rates.capitalAllowances = { ...defaultCTVATRates.capitalAllowances }
  }
})

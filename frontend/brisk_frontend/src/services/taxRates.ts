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
    savingsAllowance: { basic: 1000, higher: 500 }
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
    savingsAllowance: { basic: 1000, higher: 500 }
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
    savingsAllowance: { basic: 1000, higher: 500 }
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
    savingsAllowance: { basic: 1000, higher: 500 }
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
    savingsAllowance: { basic: 1000, higher: 500 }
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
    savingsAllowance: { basic: 1000, higher: 500 }
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
    savingsAllowance: { basic: 1000, higher: 500 }
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
    savingsAllowance: { basic: 1000, higher: 500 }
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
    savingsAllowance: { basic: 1000, higher: 500 }
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
    savingsAllowance: { basic: 0, higher: 0 }
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

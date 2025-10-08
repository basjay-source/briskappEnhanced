export interface VATRate {
  country: string;
  countryCode: string;
  standardRate: number;
  reducedRates: number[];
  superReducedRate?: number;
  zeroRate: boolean;
  exemptions: string[];
  currency: string;
  effectiveDate: string;
}

export const globalVATRates: VATRate[] = [
  { country: 'United Kingdom', countryCode: 'GB', standardRate: 20, reducedRates: [5], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Education', 'Health'], currency: 'GBP', effectiveDate: '2011-01-04' },
  { country: 'Germany', countryCode: 'DE', standardRate: 19, reducedRates: [7], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Medical care'], currency: 'EUR', effectiveDate: '2007-01-01' },
  { country: 'France', countryCode: 'FR', standardRate: 20, reducedRates: [5.5, 10], superReducedRate: 2.1, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Education'], currency: 'EUR', effectiveDate: '2014-01-01' },
  { country: 'Italy', countryCode: 'IT', standardRate: 22, reducedRates: [5, 10], superReducedRate: 4, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Medical services'], currency: 'EUR', effectiveDate: '2013-10-01' },
  { country: 'Spain', countryCode: 'ES', standardRate: 21, reducedRates: [10], superReducedRate: 4, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Education'], currency: 'EUR', effectiveDate: '2012-09-01' },
  { country: 'Netherlands', countryCode: 'NL', standardRate: 21, reducedRates: [9], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Healthcare'], currency: 'EUR', effectiveDate: '2019-01-01' },
  { country: 'Belgium', countryCode: 'BE', standardRate: 21, reducedRates: [6, 12], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Education'], currency: 'EUR', effectiveDate: '2015-01-01' },
  { country: 'Austria', countryCode: 'AT', standardRate: 20, reducedRates: [10, 13], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Medical care'], currency: 'EUR', effectiveDate: '2016-01-01' },
  { country: 'Sweden', countryCode: 'SE', standardRate: 25, reducedRates: [6, 12], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Medical care'], currency: 'SEK', effectiveDate: '2013-01-01' },
  { country: 'Denmark', countryCode: 'DK', standardRate: 25, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Healthcare'], currency: 'DKK', effectiveDate: '1992-01-01' },
  { country: 'Finland', countryCode: 'FI', standardRate: 24, reducedRates: [10, 14], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Healthcare'], currency: 'EUR', effectiveDate: '2013-01-01' },
  { country: 'Ireland', countryCode: 'IE', standardRate: 23, reducedRates: [9, 13.5], superReducedRate: 4.8, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Education'], currency: 'EUR', effectiveDate: '2012-01-01' },
  { country: 'Portugal', countryCode: 'PT', standardRate: 23, reducedRates: [6, 13], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Healthcare'], currency: 'EUR', effectiveDate: '2011-01-01' },
  { country: 'Greece', countryCode: 'GR', standardRate: 24, reducedRates: [6, 13], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Education'], currency: 'EUR', effectiveDate: '2016-06-01' },
  { country: 'Poland', countryCode: 'PL', standardRate: 23, reducedRates: [5, 8], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Healthcare'], currency: 'PLN', effectiveDate: '2011-01-01' },
  { country: 'Czech Republic', countryCode: 'CZ', standardRate: 21, reducedRates: [10, 15], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Healthcare'], currency: 'CZK', effectiveDate: '2013-01-01' },
  { country: 'Hungary', countryCode: 'HU', standardRate: 27, reducedRates: [5, 18], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Medical care'], currency: 'HUF', effectiveDate: '2012-01-01' },
  { country: 'Romania', countryCode: 'RO', standardRate: 19, reducedRates: [5, 9], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Education'], currency: 'RON', effectiveDate: '2017-01-01' },
  { country: 'Bulgaria', countryCode: 'BG', standardRate: 20, reducedRates: [9], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Healthcare'], currency: 'BGN', effectiveDate: '2011-04-01' },
  { country: 'Croatia', countryCode: 'HR', standardRate: 25, reducedRates: [5, 13], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Healthcare'], currency: 'HRK', effectiveDate: '2013-07-01' },
  { country: 'Slovakia', countryCode: 'SK', standardRate: 20, reducedRates: [10], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Medical care'], currency: 'EUR', effectiveDate: '2011-01-01' },
  { country: 'Slovenia', countryCode: 'SI', standardRate: 22, reducedRates: [9.5], superReducedRate: 5, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Healthcare'], currency: 'EUR', effectiveDate: '2013-07-01' },
  { country: 'Lithuania', countryCode: 'LT', standardRate: 21, reducedRates: [5, 9], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Medical care'], currency: 'EUR', effectiveDate: '2015-01-01' },
  { country: 'Latvia', countryCode: 'LV', standardRate: 21, reducedRates: [5, 12], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Healthcare'], currency: 'EUR', effectiveDate: '2014-01-01' },
  { country: 'Estonia', countryCode: 'EE', standardRate: 20, reducedRates: [9], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Medical services'], currency: 'EUR', effectiveDate: '2011-01-01' },
  { country: 'Luxembourg', countryCode: 'LU', standardRate: 17, reducedRates: [8], superReducedRate: 3, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Healthcare'], currency: 'EUR', effectiveDate: '2015-01-01' },
  { country: 'Malta', countryCode: 'MT', standardRate: 18, reducedRates: [5, 7], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Education'], currency: 'EUR', effectiveDate: '2011-01-01' },
  { country: 'Cyprus', countryCode: 'CY', standardRate: 19, reducedRates: [5, 9], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Insurance', 'Healthcare'], currency: 'EUR', effectiveDate: '2014-01-13' },

  { country: 'United States', countryCode: 'US', standardRate: 0, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Sales tax varies by state (0-10.25%)'], currency: 'USD', effectiveDate: '2024-01-01' },
  { country: 'Canada', countryCode: 'CA', standardRate: 5, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Provincial sales tax varies (0-10%)'], currency: 'CAD', effectiveDate: '2008-01-01' },
  { country: 'Mexico', countryCode: 'MX', standardRate: 16, reducedRates: [8], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical care'], currency: 'MXN', effectiveDate: '2014-01-01' },
  { country: 'Brazil', countryCode: 'BR', standardRate: 17, reducedRates: [7, 12], superReducedRate: 0, zeroRate: true, exemptions: ['Exports', 'Basic foods', 'Medical supplies'], currency: 'BRL', effectiveDate: '2023-01-01' },
  { country: 'Argentina', countryCode: 'AR', standardRate: 21, reducedRates: [10.5], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'ARS', effectiveDate: '2017-09-01' },
  { country: 'Chile', countryCode: 'CL', standardRate: 19, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'CLP', effectiveDate: '2016-01-01' },
  { country: 'Colombia', countryCode: 'CO', standardRate: 19, reducedRates: [5], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Basic foods'], currency: 'COP', effectiveDate: '2017-01-01' },
  { country: 'Peru', countryCode: 'PE', standardRate: 18, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical care'], currency: 'PEN', effectiveDate: '2011-03-01' },
  { country: 'Uruguay', countryCode: 'UY', standardRate: 22, reducedRates: [10], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'UYU', effectiveDate: '2017-01-01' },

  { country: 'China', countryCode: 'CN', standardRate: 13, reducedRates: [6, 9], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical care'], currency: 'CNY', effectiveDate: '2019-04-01' },
  { country: 'Japan', countryCode: 'JP', standardRate: 10, reducedRates: [8], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical care'], currency: 'JPY', effectiveDate: '2019-10-01' },
  { country: 'South Korea', countryCode: 'KR', standardRate: 10, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'KRW', effectiveDate: '2011-01-01' },
  { country: 'India', countryCode: 'IN', standardRate: 18, reducedRates: [5, 12], superReducedRate: 0.25, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'INR', effectiveDate: '2017-07-01' },
  { country: 'Australia', countryCode: 'AU', standardRate: 10, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'AUD', effectiveDate: '2000-07-01' },
  { country: 'New Zealand', countryCode: 'NZ', standardRate: 15, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Residential rent', 'Donated goods'], currency: 'NZD', effectiveDate: '2010-10-01' },
  { country: 'Singapore', countryCode: 'SG', standardRate: 8, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Residential property', 'Exports'], currency: 'SGD', effectiveDate: '2023-01-01' },
  { country: 'Malaysia', countryCode: 'MY', standardRate: 8, reducedRates: [6], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'MYR', effectiveDate: '2022-01-01' },
  { country: 'Thailand', countryCode: 'TH', standardRate: 7, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical care'], currency: 'THB', effectiveDate: '2013-10-01' },
  { country: 'Indonesia', countryCode: 'ID', standardRate: 11, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'IDR', effectiveDate: '2022-04-01' },
  { country: 'Philippines', countryCode: 'PH', standardRate: 12, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical care'], currency: 'PHP', effectiveDate: '2018-01-01' },
  { country: 'Vietnam', countryCode: 'VN', standardRate: 10, reducedRates: [5], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'VND', effectiveDate: '2014-01-01' },
  { country: 'Pakistan', countryCode: 'PK', standardRate: 18, reducedRates: [8, 12], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical supplies'], currency: 'PKR', effectiveDate: '2021-07-01' },
  { country: 'Bangladesh', countryCode: 'BD', standardRate: 15, reducedRates: [5, 7.5, 10], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'BDT', effectiveDate: '2021-07-01' },
  { country: 'Sri Lanka', countryCode: 'LK', standardRate: 15, reducedRates: [8], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical care'], currency: 'LKR', effectiveDate: '2023-01-01' },
  { country: 'Taiwan', countryCode: 'TW', standardRate: 5, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'TWD', effectiveDate: '2011-01-01' },
  { country: 'Hong Kong', countryCode: 'HK', standardRate: 0, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['No VAT/GST system'], currency: 'HKD', effectiveDate: '2024-01-01' },

  { country: 'Saudi Arabia', countryCode: 'SA', standardRate: 15, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'SAR', effectiveDate: '2020-07-01' },
  { country: 'United Arab Emirates', countryCode: 'AE', standardRate: 5, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'AED', effectiveDate: '2018-01-01' },
  { country: 'Qatar', countryCode: 'QA', standardRate: 0, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['No VAT system currently'], currency: 'QAR', effectiveDate: '2024-01-01' },
  { country: 'Kuwait', countryCode: 'KW', standardRate: 0, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['No VAT system currently'], currency: 'KWD', effectiveDate: '2024-01-01' },
  { country: 'Bahrain', countryCode: 'BH', standardRate: 10, reducedRates: [5], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'BHD', effectiveDate: '2022-01-01' },
  { country: 'Oman', countryCode: 'OM', standardRate: 5, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical care'], currency: 'OMR', effectiveDate: '2021-04-01' },
  { country: 'Israel', countryCode: 'IL', standardRate: 17, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'ILS', effectiveDate: '2015-10-01' },
  { country: 'Turkey', countryCode: 'TR', standardRate: 18, reducedRates: [1, 8], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'TRY', effectiveDate: '2018-07-01' },
  { country: 'Egypt', countryCode: 'EG', standardRate: 14, reducedRates: [5], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical supplies'], currency: 'EGP', effectiveDate: '2017-09-01' },
  { country: 'Jordan', countryCode: 'JO', standardRate: 16, reducedRates: [4, 8], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical care'], currency: 'JOD', effectiveDate: '2018-01-01' },

  { country: 'South Africa', countryCode: 'ZA', standardRate: 15, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'ZAR', effectiveDate: '2018-04-01' },
  { country: 'Nigeria', countryCode: 'NG', standardRate: 7.5, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical services'], currency: 'NGN', effectiveDate: '2020-02-01' },
  { country: 'Kenya', countryCode: 'KE', standardRate: 16, reducedRates: [8], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical supplies'], currency: 'KES', effectiveDate: '2021-01-01' },
  { country: 'Ghana', countryCode: 'GH', standardRate: 15, reducedRates: [3], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'GHS', effectiveDate: '2021-07-01' },
  { country: 'Morocco', countryCode: 'MA', standardRate: 20, reducedRates: [7, 10, 14], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical care'], currency: 'MAD', effectiveDate: '2011-01-01' },
  { country: 'Tunisia', countryCode: 'TN', standardRate: 19, reducedRates: [7, 13], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'TND', effectiveDate: '2018-01-01' },
  { country: 'Tanzania', countryCode: 'TZ', standardRate: 18, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical supplies'], currency: 'TZS', effectiveDate: '2015-07-01' },
  { country: 'Uganda', countryCode: 'UG', standardRate: 18, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'UGX', effectiveDate: '2011-07-01' },
  { country: 'Ethiopia', countryCode: 'ET', standardRate: 15, reducedRates: [], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical services'], currency: 'ETB', effectiveDate: '2016-01-01' },

  { country: 'Russia', countryCode: 'RU', standardRate: 20, reducedRates: [10], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical care'], currency: 'RUB', effectiveDate: '2019-01-01' },
  { country: 'Ukraine', countryCode: 'UA', standardRate: 20, reducedRates: [7], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'UAH', effectiveDate: '2014-01-01' },
  { country: 'Switzerland', countryCode: 'CH', standardRate: 7.7, reducedRates: [2.5, 3.7], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'CHF', effectiveDate: '2018-01-01' },
  { country: 'Norway', countryCode: 'NO', standardRate: 25, reducedRates: [12, 15], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical care'], currency: 'NOK', effectiveDate: '2016-01-01' },
  { country: 'Iceland', countryCode: 'IS', standardRate: 24, reducedRates: [11], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Healthcare'], currency: 'ISK', effectiveDate: '2015-01-01' },
  { country: 'Serbia', countryCode: 'RS', standardRate: 20, reducedRates: [10], superReducedRate: 0, zeroRate: true, exemptions: ['Financial services', 'Education', 'Medical services'], currency: 'RSD', effectiveDate: '2012-01-01' },
];

export function getVATRateByCountry(countryCode: string): VATRate | undefined {
  return globalVATRates.find(rate => rate.countryCode === countryCode);
}

export function getVATRateByCurrency(currency: string): VATRate[] {
  return globalVATRates.filter(rate => rate.currency === currency);
}

export function calculateVAT(amount: number, vatRate: number): number {
  return (amount * vatRate) / 100;
}

export function addVAT(amount: number, vatRate: number): number {
  return amount + calculateVAT(amount, vatRate);
}

export function removeVAT(amountWithVAT: number, vatRate: number): number {
  return amountWithVAT / (1 + vatRate / 100);
}

export function getVATAmount(amountWithVAT: number, vatRate: number): number {
  return amountWithVAT - removeVAT(amountWithVAT, vatRate);
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  decimalPlaces: number;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: Date;
}

export const supportedCurrencies: Currency[] = [
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', decimalPlaces: 2 },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', decimalPlaces: 2 },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', decimalPlaces: 2 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', decimalPlaces: 0 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', decimalPlaces: 2 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', decimalPlaces: 2 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', decimalPlaces: 2 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', decimalPlaces: 2 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭', decimalPlaces: 2 },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', decimalPlaces: 2 },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', decimalPlaces: 2 },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', decimalPlaces: 2 },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱', decimalPlaces: 2 },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺', decimalPlaces: 2 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', decimalPlaces: 2 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', decimalPlaces: 2 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', decimalPlaces: 2 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', decimalPlaces: 2 },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', decimalPlaces: 2 },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', decimalPlaces: 0 },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$', flag: '🇲🇽', decimalPlaces: 2 },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', decimalPlaces: 2 },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', decimalPlaces: 2 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', decimalPlaces: 0 },
];

export const exchangeRates: Record<string, number> = {
  'GBP': 1.00, 'USD': 1.27, 'EUR': 1.17, 'JPY': 186.50, 'CHF': 1.12,
  'CAD': 1.75, 'MXN': 21.50, 'BRL': 6.35, 'ARS': 1050.00, 'CLP': 1185.00,
  'COP': 5050.00, 'PEN': 4.75, 'UYU': 52.00, 'VES': 36500.00, 'BOB': 8.75,
  'PYG': 9250.00, 'NOK': 13.85, 'SEK': 13.45, 'DKK': 8.70, 'PLN': 5.12,
  'CZK': 28.50, 'HUF': 450.00, 'RON': 5.75, 'BGN': 2.28, 'HRK': 8.82,
  'RUB': 118.50, 'UAH': 52.50, 'TRY': 42.50, 'ISK': 175.00, 'RSD': 137.00,
  'MKD': 72.00, 'ALL': 122.00, 'BAM': 2.28, 'MDL': 23.50, 'BYN': 4.15,
  'CNY': 9.15, 'HKD': 9.90, 'SGD': 1.70, 'KRW': 1685.00, 'INR': 106.50,
  'PKR': 355.00, 'BDT': 139.00, 'LKR': 390.00, 'NPR': 170.00, 'IDR': 19850.00,
  'MYR': 5.70, 'PHP': 72.50, 'THB': 44.50, 'VND': 31500.00, 'TWD': 40.50,
  'AUD': 1.95, 'NZD': 2.08, 'MMK': 3350.00, 'KHR': 5150.00, 'LAK': 27500.00,
  'BND': 1.70, 'MOP': 10.20, 'MVR': 19.50, 'AFN': 112.00, 'KZT': 595.00,
  'UZS': 15950.00, 'AZN': 2.16, 'GEL': 3.55, 'AMD': 520.00, 'KGS': 113.00,
  'TJS': 13.90, 'TMT': 4.45, 'MNT': 4380.00, 'AED': 4.65, 'SAR': 4.75,
  'QAR': 4.62, 'KWD': 0.39, 'BHD': 0.48, 'OMR': 0.49, 'JOD': 0.90,
  'ILS': 4.65, 'EGP': 39.50, 'LBP': 15050.00, 'SYP': 15950.00, 'IQD': 1650.00,
  'IRR': 53500.00, 'YER': 315.00, 'ZAR': 23.50, 'NGN': 1980.00, 'KES': 165.00,
  'GHS': 19.50, 'TZS': 3150.00, 'UGX': 4750.00, 'ETB': 142.00, 'MAD': 12.75,
  'TND': 3.90, 'DZD': 170.00, 'XOF': 768.00, 'XAF': 768.00, 'BWP': 17.25,
  'MUR': 57.50, 'SCR': 17.25, 'MWK': 2150.00, 'ZMW': 33.50, 'AOA': 1075.00,
  'MZN': 80.50, 'NAD': 23.50, 'SZL': 23.50, 'LSL': 23.50, 'RWF': 1680.00,
  'BIF': 3700.00, 'DJF': 224.00, 'SOS': 720.00, 'SDG': 755.00, 'SSP': 1650.00,
  'LYD': 6.12, 'GMD': 84.50, 'SLL': 26500.00, 'LRD': 239.00, 'JMD': 196.00,
  'TTD': 8.55, 'BBD': 2.54, 'BSD': 1.27, 'XCD': 3.42, 'HTG': 176.00,
  'DOP': 75.50, 'CRC': 645.00, 'GTQ': 9.85, 'HNL': 31.50, 'NIO': 46.50,
  'PAB': 1.27, 'SVC': 11.10, 'BZD': 2.54, 'AWG': 2.28, 'ANG': 2.28,
  'FJD': 2.85, 'PGK': 5.05, 'WST': 3.45, 'TOP': 2.98, 'VUV': 150.00,
  'SBD': 10.50, 'BTC': 0.000020, 'ETH': 0.00032, 'USDT': 1.27,
};

export function convertCurrency(amount: number, from: string, to: string): number {
  if (from === to) return amount;
  if (!exchangeRates[from] || !exchangeRates[to]) return amount;
  const gbpAmount = amount / exchangeRates[from];
  return gbpAmount * exchangeRates[to];
}

export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = supportedCurrencies.find(c => c.code === currencyCode);
  if (!currency) return `${amount.toFixed(2)} ${currencyCode}`;
  
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currency.decimalPlaces,
      maximumFractionDigits: currency.decimalPlaces,
    }).format(amount);
  } catch (e) {
    return `${currency.symbol}${amount.toFixed(currency.decimalPlaces)}`;
  }
}

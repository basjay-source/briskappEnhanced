import { convertCurrency, formatCurrency } from '@/types/currency';
import i18n from '@/i18n/config';

export interface ReportData {
  [key: string]: any;
  amounts?: { [key: string]: number };
  currency?: string;
}

export interface TranslatedReport {
  data: ReportData;
  language: string;
  displayCurrency: string;
  originalCurrency: string;
  exchangeRate: number;
  generatedAt: Date;
}

/**
 * Translate a financial report into any language and currency
 * This enables clients to view reports in their preferred language and currency
 */
export function translateReport(
  reportData: ReportData,
  targetLanguage: string,
  targetCurrency: string,
  originalCurrency: string = 'GBP'
): TranslatedReport {
  if (targetLanguage !== i18n.language) {
    i18n.changeLanguage(targetLanguage);
  }

  const translatedData = { ...reportData };
  const exchangeRate = convertCurrency(1, originalCurrency, targetCurrency);

  if (translatedData.amounts) {
    const convertedAmounts: { [key: string]: number } = {};
    
    for (const [key, amount] of Object.entries(translatedData.amounts)) {
      convertedAmounts[key] = convertCurrency(
        amount as number,
        originalCurrency,
        targetCurrency
      );
    }
    
    translatedData.amounts = convertedAmounts;
  }

  convertNestedAmounts(translatedData, originalCurrency, targetCurrency);

  return {
    data: translatedData,
    language: targetLanguage,
    displayCurrency: targetCurrency,
    originalCurrency,
    exchangeRate,
    generatedAt: new Date(),
  };
}

/**
 * Recursively convert all numeric values that represent currency amounts
 */
function convertNestedAmounts(
  obj: any,
  fromCurrency: string,
  toCurrency: string
): void {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      convertNestedAmounts(obj[key], fromCurrency, toCurrency);
    } else if (
      typeof obj[key] === 'number' &&
      (key.includes('amount') ||
        key.includes('total') ||
        key.includes('value') ||
        key.includes('revenue') ||
        key.includes('cost') ||
        key.includes('expense') ||
        key.includes('profit') ||
        key.includes('loss') ||
        key.includes('tax') ||
        key.includes('vat') ||
        key.includes('balance'))
    ) {
      obj[key] = convertCurrency(obj[key], fromCurrency, toCurrency);
    }
  }
}

/**
 * Format a tax return for display in client's preferred language and currency
 */
export function formatTaxReturn(
  taxReturnData: any,
  clientLanguage: string,
  clientCurrency: string
): TranslatedReport {
  return translateReport(
    taxReturnData,
    clientLanguage,
    clientCurrency,
    taxReturnData.currency || 'GBP'
  );
}

/**
 * Format financial statements for multi-language/multi-currency display
 */
export function formatFinancialStatements(
  statements: any,
  language: string,
  currency: string
): TranslatedReport {
  return translateReport(
    statements,
    language,
    currency,
    statements.baseCurrency || 'GBP'
  );
}

/**
 * Generate a report header with language and currency information
 */
export function generateReportHeader(
  reportTitle: string,
  reportDate: Date,
  displayCurrency: string,
  displayLanguage: string,
  exchangeRate?: number
): string {
  const formattedDate = new Intl.DateTimeFormat(displayLanguage, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(reportDate);

  let header = `${reportTitle}\n`;
  header += `${formattedDate}\n`;
  header += `Currency: ${displayCurrency}\n`;
  header += `Language: ${displayLanguage}\n`;
  
  if (exchangeRate && exchangeRate !== 1) {
    header += `Exchange Rate: ${exchangeRate.toFixed(4)}\n`;
  }

  return header;
}

/**
 * Convert a complete accounting period report to client's preferences
 */
export interface AccountingReport {
  periodStart: Date;
  periodEnd: Date;
  revenue: number;
  expenses: number;
  grossProfit: number;
  netProfit: number;
  assets: number;
  liabilities: number;
  equity: number;
  currency: string;
  [key: string]: any;
}

export function translateAccountingReport(
  report: AccountingReport,
  clientLanguage: string,
  clientCurrency: string
): TranslatedReport & { formatted: any } {
  const translated = translateReport(
    report,
    clientLanguage,
    clientCurrency,
    report.currency
  );

  const formatted = {
    ...translated.data,
    revenue: formatCurrency(translated.data.revenue, clientCurrency),
    expenses: formatCurrency(translated.data.expenses, clientCurrency),
    grossProfit: formatCurrency(translated.data.grossProfit, clientCurrency),
    netProfit: formatCurrency(translated.data.netProfit, clientCurrency),
    assets: formatCurrency(translated.data.assets, clientCurrency),
    liabilities: formatCurrency(translated.data.liabilities, clientCurrency),
    equity: formatCurrency(translated.data.equity, clientCurrency),
  };

  return {
    ...translated,
    formatted,
  };
}

/**
 * Batch translate multiple reports for a client
 */
export function batchTranslateReports(
  reports: ReportData[],
  targetLanguage: string,
  targetCurrency: string
): TranslatedReport[] {
  return reports.map(report =>
    translateReport(report, targetLanguage, targetCurrency)
  );
}

/**
 * Get live forex rate (in production, this would call a live API)
 */
export async function getLiveForexRate(
  from: string,
  to: string
): Promise<number> {
  
  return convertCurrency(1, from, to);
}

/**
 * Update all reports with latest forex rates
 */
export async function refreshReportsWithLiveRates(
  reports: TranslatedReport[]
): Promise<TranslatedReport[]> {
  const updatedReports: TranslatedReport[] = [];

  for (const report of reports) {
    await getLiveForexRate(
      report.originalCurrency,
      report.displayCurrency
    );

    const refreshed = translateReport(
      report.data,
      report.language,
      report.displayCurrency,
      report.originalCurrency
    );

    updatedReports.push(refreshed);
  }

  return updatedReports;
}

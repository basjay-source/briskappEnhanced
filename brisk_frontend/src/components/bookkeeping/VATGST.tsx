import React, { useState, useEffect } from 'react'
import { Calculator, Plus, FileText, Globe, Send } from 'lucide-react'
import { bookkeepingApi } from '../../services/api'

const VATGST: React.FC = () => {
  const [activeTab, setActiveTab] = useState('returns')
  const [loading, setLoading] = useState(true)
  const [, setVatReturns] = useState([])

  useEffect(() => {
    const fetchVATReturns = async () => {
      try {
        const response = await bookkeepingApi.getVATReturns()
        setVatReturns(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching VAT returns:', error)
        setLoading(false)
      }
    }

    fetchVATReturns()
  }, [])

  const enhancedInternationalVATCodes = [
    { country: 'UK', code: 'STD', rate: 20.0, description: 'Standard Rate VAT', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'UK' },
    { country: 'UK', code: 'RED', rate: 5.0, description: 'Reduced Rate VAT', scheme: 'Standard', reverseCharge: false, category: 'Reduced', servicePlace: 'UK' },
    { country: 'UK', code: 'ZER', rate: 0.0, description: 'Zero Rate VAT', scheme: 'Standard', reverseCharge: false, category: 'Zero', servicePlace: 'UK' },
    { country: 'UK', code: 'EXE', rate: 0.0, description: 'Exempt from VAT', scheme: 'Standard', reverseCharge: false, category: 'Exempt', servicePlace: 'UK' },
    { country: 'UK', code: 'FRS', rate: 16.5, description: 'Flat Rate Scheme', scheme: 'Flat Rate', reverseCharge: false, category: 'Flat Rate', servicePlace: 'UK' },
    { country: 'UK', code: 'CAS', rate: 20.0, description: 'Cash Accounting Scheme', scheme: 'Cash Accounting', reverseCharge: false, category: 'Standard', servicePlace: 'UK' },
    { country: 'UK', code: 'RC', rate: 20.0, description: 'Reverse Charge', scheme: 'Standard', reverseCharge: true, category: 'Reverse Charge', servicePlace: 'UK' },
    
    { country: 'DE', code: 'DE_STD', rate: 19.0, description: 'Germany Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Germany' },
    { country: 'DE', code: 'DE_RED', rate: 7.0, description: 'Germany Reduced Rate', scheme: 'Standard', reverseCharge: false, category: 'Reduced', servicePlace: 'Germany' },
    { country: 'DE', code: 'DE_RC', rate: 19.0, description: 'Germany Reverse Charge', scheme: 'Standard', reverseCharge: true, category: 'Reverse Charge', servicePlace: 'Germany' },
    { country: 'FR', code: 'FR_STD', rate: 20.0, description: 'France Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'France' },
    { country: 'FR', code: 'FR_RED', rate: 5.5, description: 'France Reduced Rate', scheme: 'Standard', reverseCharge: false, category: 'Reduced', servicePlace: 'France' },
    { country: 'FR', code: 'FR_INT', rate: 10.0, description: 'France Intermediate Rate', scheme: 'Standard', reverseCharge: false, category: 'Intermediate', servicePlace: 'France' },
    { country: 'NL', code: 'NL_STD', rate: 21.0, description: 'Netherlands Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Netherlands' },
    { country: 'NL', code: 'NL_RED', rate: 9.0, description: 'Netherlands Reduced Rate', scheme: 'Standard', reverseCharge: false, category: 'Reduced', servicePlace: 'Netherlands' },
    { country: 'IT', code: 'IT_STD', rate: 22.0, description: 'Italy Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Italy' },
    { country: 'IT', code: 'IT_RED', rate: 10.0, description: 'Italy Reduced Rate', scheme: 'Standard', reverseCharge: false, category: 'Reduced', servicePlace: 'Italy' },
    { country: 'ES', code: 'ES_STD', rate: 21.0, description: 'Spain Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Spain' },
    { country: 'ES', code: 'ES_RED', rate: 10.0, description: 'Spain Reduced Rate', scheme: 'Standard', reverseCharge: false, category: 'Reduced', servicePlace: 'Spain' },
    { country: 'SE', code: 'SE_STD', rate: 25.0, description: 'Sweden Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Sweden' },
    { country: 'SE', code: 'SE_RED', rate: 12.0, description: 'Sweden Reduced Rate', scheme: 'Standard', reverseCharge: false, category: 'Reduced', servicePlace: 'Sweden' },
    { country: 'DK', code: 'DK_STD', rate: 25.0, description: 'Denmark Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Denmark' },
    { country: 'NO', code: 'NO_STD', rate: 25.0, description: 'Norway Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Norway' },
    { country: 'CH', code: 'CH_STD', rate: 7.7, description: 'Switzerland Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Switzerland' },
    { country: 'AT', code: 'AT_STD', rate: 20.0, description: 'Austria Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Austria' },
    { country: 'BE', code: 'BE_STD', rate: 21.0, description: 'Belgium Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Belgium' },
    { country: 'FI', code: 'FI_STD', rate: 24.0, description: 'Finland Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Finland' },
    { country: 'IE', code: 'IE_STD', rate: 23.0, description: 'Ireland Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Ireland' },
    { country: 'PT', code: 'PT_STD', rate: 23.0, description: 'Portugal Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Portugal' },
    { country: 'GR', code: 'GR_STD', rate: 24.0, description: 'Greece Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Greece' },
    { country: 'PL', code: 'PL_STD', rate: 23.0, description: 'Poland Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Poland' },
    { country: 'CZ', code: 'CZ_STD', rate: 21.0, description: 'Czech Republic Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Czech Republic' },
    { country: 'HU', code: 'HU_STD', rate: 27.0, description: 'Hungary Standard Rate', scheme: 'Standard', reverseCharge: false, category: 'Standard', servicePlace: 'Hungary' },
    
    { country: 'US', code: 'US_ST', rate: 8.5, description: 'US Sales Tax (Average)', scheme: 'Sales Tax', reverseCharge: false, category: 'Sales Tax', servicePlace: 'United States' },
    { country: 'US', code: 'US_CA', rate: 10.25, description: 'California Sales Tax', scheme: 'Sales Tax', reverseCharge: false, category: 'Sales Tax', servicePlace: 'California' },
    { country: 'US', code: 'US_NY', rate: 8.0, description: 'New York Sales Tax', scheme: 'Sales Tax', reverseCharge: false, category: 'Sales Tax', servicePlace: 'New York' },
    { country: 'US', code: 'US_TX', rate: 6.25, description: 'Texas Sales Tax', scheme: 'Sales Tax', reverseCharge: false, category: 'Sales Tax', servicePlace: 'Texas' },
    { country: 'US', code: 'US_FL', rate: 6.0, description: 'Florida Sales Tax', scheme: 'Sales Tax', reverseCharge: false, category: 'Sales Tax', servicePlace: 'Florida' },
    { country: 'CA', code: 'CA_GST', rate: 5.0, description: 'Canadian GST', scheme: 'GST', reverseCharge: false, category: 'GST', servicePlace: 'Canada' },
    { country: 'CA', code: 'CA_HST_ON', rate: 13.0, description: 'Ontario HST', scheme: 'HST', reverseCharge: false, category: 'HST', servicePlace: 'Ontario' },
    { country: 'CA', code: 'CA_HST_NS', rate: 15.0, description: 'Nova Scotia HST', scheme: 'HST', reverseCharge: false, category: 'HST', servicePlace: 'Nova Scotia' },
    { country: 'CA', code: 'CA_PST_BC', rate: 7.0, description: 'British Columbia PST', scheme: 'PST', reverseCharge: false, category: 'PST', servicePlace: 'British Columbia' },
    { country: 'CA', code: 'CA_QST', rate: 9.975, description: 'Quebec Sales Tax', scheme: 'QST', reverseCharge: false, category: 'QST', servicePlace: 'Quebec' },
    { country: 'MX', code: 'MX_IVA', rate: 16.0, description: 'Mexico IVA', scheme: 'IVA', reverseCharge: false, category: 'IVA', servicePlace: 'Mexico' },
    
    { country: 'AU', code: 'AU_GST', rate: 10.0, description: 'Australian GST', scheme: 'GST', reverseCharge: false, category: 'GST', servicePlace: 'Australia' },
    { country: 'AU', code: 'AU_EXE', rate: 0.0, description: 'Australia GST-Free', scheme: 'GST', reverseCharge: false, category: 'GST-Free', servicePlace: 'Australia' },
    { country: 'NZ', code: 'NZ_GST', rate: 15.0, description: 'New Zealand GST', scheme: 'GST', reverseCharge: false, category: 'GST', servicePlace: 'New Zealand' },
    { country: 'SG', code: 'SG_GST', rate: 8.0, description: 'Singapore GST', scheme: 'GST', reverseCharge: false, category: 'GST', servicePlace: 'Singapore' },
    { country: 'SG', code: 'SG_ZER', rate: 0.0, description: 'Singapore Zero-Rated', scheme: 'GST', reverseCharge: false, category: 'Zero-Rated', servicePlace: 'Singapore' },
    { country: 'HK', code: 'HK_EXE', rate: 0.0, description: 'Hong Kong (No GST)', scheme: 'No Tax', reverseCharge: false, category: 'No Tax', servicePlace: 'Hong Kong' },
    { country: 'JP', code: 'JP_CT', rate: 10.0, description: 'Japan Consumption Tax', scheme: 'Consumption Tax', reverseCharge: false, category: 'Consumption Tax', servicePlace: 'Japan' },
    { country: 'JP', code: 'JP_RED', rate: 8.0, description: 'Japan Reduced Rate', scheme: 'Consumption Tax', reverseCharge: false, category: 'Reduced', servicePlace: 'Japan' },
    { country: 'KR', code: 'KR_VAT', rate: 10.0, description: 'South Korea VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'South Korea' },
    { country: 'IN', code: 'IN_GST_28', rate: 28.0, description: 'India GST 28%', scheme: 'GST', reverseCharge: false, category: 'GST High', servicePlace: 'India' },
    { country: 'IN', code: 'IN_GST_18', rate: 18.0, description: 'India GST 18%', scheme: 'GST', reverseCharge: false, category: 'GST Standard', servicePlace: 'India' },
    { country: 'IN', code: 'IN_GST_12', rate: 12.0, description: 'India GST 12%', scheme: 'GST', reverseCharge: false, category: 'GST Medium', servicePlace: 'India' },
    { country: 'IN', code: 'IN_GST_5', rate: 5.0, description: 'India GST 5%', scheme: 'GST', reverseCharge: false, category: 'GST Low', servicePlace: 'India' },
    { country: 'IN', code: 'IN_GST_3', rate: 3.0, description: 'India GST 3%', scheme: 'GST', reverseCharge: false, category: 'GST Minimal', servicePlace: 'India' },
    { country: 'IN', code: 'IN_GST_0', rate: 0.0, description: 'India GST 0%', scheme: 'GST', reverseCharge: false, category: 'GST Zero', servicePlace: 'India' },
    { country: 'MY', code: 'MY_SST', rate: 6.0, description: 'Malaysia SST', scheme: 'SST', reverseCharge: false, category: 'SST', servicePlace: 'Malaysia' },
    { country: 'TH', code: 'TH_VAT', rate: 7.0, description: 'Thailand VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Thailand' },
    { country: 'ID', code: 'ID_VAT', rate: 11.0, description: 'Indonesia VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Indonesia' },
    { country: 'PH', code: 'PH_VAT', rate: 12.0, description: 'Philippines VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Philippines' },
    { country: 'VN', code: 'VN_VAT', rate: 10.0, description: 'Vietnam VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Vietnam' },
    { country: 'CN', code: 'CN_VAT', rate: 13.0, description: 'China VAT Standard', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'China' },
    { country: 'CN', code: 'CN_VAT_9', rate: 9.0, description: 'China VAT Reduced', scheme: 'VAT', reverseCharge: false, category: 'VAT Reduced', servicePlace: 'China' },
    { country: 'CN', code: 'CN_VAT_6', rate: 6.0, description: 'China VAT Services', scheme: 'VAT', reverseCharge: false, category: 'VAT Services', servicePlace: 'China' },
    
    { country: 'AE', code: 'AE_VAT', rate: 5.0, description: 'UAE VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'UAE' },
    { country: 'SA', code: 'SA_VAT', rate: 15.0, description: 'Saudi Arabia VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Saudi Arabia' },
    { country: 'ZA', code: 'ZA_VAT', rate: 15.0, description: 'South Africa VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'South Africa' },
    { country: 'ZA', code: 'ZA_ZER', rate: 0.0, description: 'South Africa Zero-Rated', scheme: 'VAT', reverseCharge: false, category: 'Zero-Rated', servicePlace: 'South Africa' },
    { country: 'EG', code: 'EG_VAT', rate: 14.0, description: 'Egypt VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Egypt' },
    { country: 'NG', code: 'NG_VAT', rate: 7.5, description: 'Nigeria VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Nigeria' },
    { country: 'KE', code: 'KE_VAT', rate: 16.0, description: 'Kenya VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Kenya' },
    { country: 'IL', code: 'IL_VAT', rate: 17.0, description: 'Israel VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Israel' },
    { country: 'TR', code: 'TR_VAT', rate: 18.0, description: 'Turkey VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Turkey' },
    
    { country: 'BR', code: 'BR_ICMS', rate: 17.0, description: 'Brazil ICMS (Average)', scheme: 'ICMS', reverseCharge: false, category: 'ICMS', servicePlace: 'Brazil' },
    { country: 'BR', code: 'BR_IPI', rate: 10.0, description: 'Brazil IPI', scheme: 'IPI', reverseCharge: false, category: 'IPI', servicePlace: 'Brazil' },
    { country: 'BR', code: 'BR_PIS', rate: 1.65, description: 'Brazil PIS', scheme: 'PIS', reverseCharge: false, category: 'PIS', servicePlace: 'Brazil' },
    { country: 'BR', code: 'BR_COFINS', rate: 7.6, description: 'Brazil COFINS', scheme: 'COFINS', reverseCharge: false, category: 'COFINS', servicePlace: 'Brazil' },
    { country: 'AR', code: 'AR_IVA', rate: 21.0, description: 'Argentina IVA', scheme: 'IVA', reverseCharge: false, category: 'IVA', servicePlace: 'Argentina' },
    { country: 'CL', code: 'CL_IVA', rate: 19.0, description: 'Chile IVA', scheme: 'IVA', reverseCharge: false, category: 'IVA', servicePlace: 'Chile' },
    { country: 'CO', code: 'CO_IVA', rate: 19.0, description: 'Colombia IVA', scheme: 'IVA', reverseCharge: false, category: 'IVA', servicePlace: 'Colombia' },
    { country: 'PE', code: 'PE_IGV', rate: 18.0, description: 'Peru IGV', scheme: 'IGV', reverseCharge: false, category: 'IGV', servicePlace: 'Peru' },
    { country: 'UY', code: 'UY_IVA', rate: 22.0, description: 'Uruguay IVA', scheme: 'IVA', reverseCharge: false, category: 'IVA', servicePlace: 'Uruguay' },
    
    { country: 'RU', code: 'RU_VAT', rate: 20.0, description: 'Russia VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Russia' },
    { country: 'RU', code: 'RU_VAT_10', rate: 10.0, description: 'Russia VAT Reduced', scheme: 'VAT', reverseCharge: false, category: 'VAT Reduced', servicePlace: 'Russia' },
    { country: 'UA', code: 'UA_VAT', rate: 20.0, description: 'Ukraine VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Ukraine' },
    { country: 'BY', code: 'BY_VAT', rate: 20.0, description: 'Belarus VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Belarus' },
    { country: 'KZ', code: 'KZ_VAT', rate: 12.0, description: 'Kazakhstan VAT', scheme: 'VAT', reverseCharge: false, category: 'VAT', servicePlace: 'Kazakhstan' }
  ]

  const comprehensiveForexRates = [
    { code: 'GBP', name: 'British Pound Sterling', symbol: '£', rate: 1.0000, region: 'United Kingdom', isBase: true, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.0 },
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.2750, region: 'United States', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Up', dayChange: 0.0025 },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 1.1650, region: 'Eurozone', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.0015 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 150.25, region: 'Japan', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Up', dayChange: 0.85 },
    
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rate: 1.1250, region: 'Switzerland', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.0005 },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', rate: 11.85, region: 'Sweden', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.12 },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', rate: 11.25, region: 'Norway', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Up', dayChange: 0.08 },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr', rate: 8.65, region: 'Denmark', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.02 },
    { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', rate: 5.15, region: 'Poland', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.03 },
    { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', rate: 28.45, region: 'Czech Republic', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Up', dayChange: 0.15 },
    { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', rate: 385.50, region: 'Hungary', isBase: false, volatility: 'High', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -2.25 },
    { code: 'RON', name: 'Romanian Leu', symbol: 'lei', rate: 5.75, region: 'Romania', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.01 },
    { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', rate: 2.28, region: 'Bulgaria', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.0 },
    { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', rate: 8.78, region: 'Croatia', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.0 },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', rate: 92.50, region: 'Russia', isBase: false, volatility: 'High', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -1.85 },
    { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', rate: 47.25, region: 'Ukraine', isBase: false, volatility: 'High', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.75 },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺', rate: 30.25, region: 'Turkey', isBase: false, volatility: 'High', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.45 },
    
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.7250, region: 'Canada', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Up', dayChange: 0.0035 },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', rate: 21.50, region: 'Mexico', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.15 },
    
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.9250, region: 'Australia', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Up', dayChange: 0.0085 },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', rate: 2.0150, region: 'New Zealand', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Up', dayChange: 0.0125 },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 1.7150, region: 'Singapore', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.0015 },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', rate: 9.95, region: 'Hong Kong', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.02 },
    { code: 'CNY', name: 'Chinese Yuan Renminbi', symbol: '¥', rate: 9.15, region: 'China', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Up', dayChange: 0.05 },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', rate: 1685.50, region: 'South Korea', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -8.25 },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 106.25, region: 'India', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.35 },
    { code: 'THB', name: 'Thai Baht', symbol: '฿', rate: 44.85, region: 'Thailand', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Up', dayChange: 0.25 },
    { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', rate: 5.95, region: 'Malaysia', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.02 },
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', rate: 19850.00, region: 'Indonesia', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -125.00 },
    { code: 'PHP', name: 'Philippine Peso', symbol: '₱', rate: 71.25, region: 'Philippines', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.45 },
    { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', rate: 30750.00, region: 'Vietnam', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 15.00 },
    { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', rate: 39.85, region: 'Taiwan', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Up', dayChange: 0.15 },
    
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', rate: 4.68, region: 'United Arab Emirates', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.01 },
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', rate: 4.78, region: 'Saudi Arabia', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.01 },
    { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', rate: 4.64, region: 'Qatar', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.01 },
    { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', rate: 0.39, region: 'Kuwait', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Up', dayChange: 0.001 },
    { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', rate: 0.48, region: 'Bahrain', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.0 },
    { code: 'OMR', name: 'Omani Rial', symbol: '﷼', rate: 0.49, region: 'Oman', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.0 },
    { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', rate: 4.65, region: 'Israel', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.08 },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', rate: 23.85, region: 'South Africa', isBase: false, volatility: 'High', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.35 },
    { code: 'EGP', name: 'Egyptian Pound', symbol: '£', rate: 39.25, region: 'Egypt', isBase: false, volatility: 'High', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.85 },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rate: 1285.50, region: 'Nigeria', isBase: false, volatility: 'High', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -15.25 },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', rate: 195.75, region: 'Kenya', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -2.15 },
    { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', rate: 15.25, region: 'Ghana', isBase: false, volatility: 'High', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.45 },
    { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', rate: 12.85, region: 'Morocco', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.05 },
    
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', rate: 6.25, region: 'Brazil', isBase: false, volatility: 'High', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.15 },
    { code: 'ARS', name: 'Argentine Peso', symbol: '$', rate: 875.50, region: 'Argentina', isBase: false, volatility: 'Very High', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -25.75 },
    { code: 'CLP', name: 'Chilean Peso', symbol: '$', rate: 1085.25, region: 'Chile', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -8.50 },
    { code: 'COP', name: 'Colombian Peso', symbol: '$', rate: 5125.00, region: 'Colombia', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -35.00 },
    { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', rate: 4.75, region: 'Peru', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.02 },
    { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', rate: 49.85, region: 'Uruguay', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.25 },
    { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs', rate: 8.78, region: 'Bolivia', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.01 },
    { code: 'PYG', name: 'Paraguayan Guarani', symbol: '₲', rate: 9125.00, region: 'Paraguay', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -45.00 },
    
    { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', rate: 575.25, region: 'Kazakhstan', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -8.75 },
    { code: 'UZS', name: 'Uzbekistani Som', symbol: 'лв', rate: 15750.00, region: 'Uzbekistan', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 25.00 },
    { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', rate: 3.25, region: 'Belarus', isBase: false, volatility: 'High', lastUpdated: '2024-01-20 15:30:00', trend: 'Down', dayChange: -0.05 },
    { code: 'GEL', name: 'Georgian Lari', symbol: '₾', rate: 3.42, region: 'Georgia', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.01 },
    { code: 'AMD', name: 'Armenian Dram', symbol: '֏', rate: 515.75, region: 'Armenia', isBase: false, volatility: 'Medium', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 2.25 },
    { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼', rate: 2.17, region: 'Azerbaijan', isBase: false, volatility: 'Low', lastUpdated: '2024-01-20 15:30:00', trend: 'Stable', dayChange: 0.01 }
  ]

  const mockVATReturns = [
    {
      id: 1,
      periodStart: '2024-01-01',
      periodEnd: '2024-03-31',
      box1VatDueSales: 12500.00,
      box4VatReclaimed: 8750.00,
      box5NetVatDue: 3750.00,
      status: 'draft',
      dueDate: '2024-05-07'
    },
    {
      id: 2,
      periodStart: '2023-10-01',
      periodEnd: '2023-12-31',
      box1VatDueSales: 15000.00,
      box4VatReclaimed: 9500.00,
      box5NetVatDue: 5500.00,
      status: 'submitted',
      dueDate: '2024-02-07'
    }
  ]

  const tabs = [
    { id: 'returns', name: 'Returns', icon: Calculator },
    { id: 'mtd-filing', name: 'MTD/e-Filing', icon: Send },
    { id: 'tax-codes', name: 'Tax Codes', icon: FileText },
    { id: 'ec-intrastat', name: 'EC/Intrastat', icon: Globe },
    { id: 'adjustments', name: 'Adjustments', icon: Plus }
  ]

  const renderReturns = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">VAT Returns</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Return</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT Due Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT Reclaimed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net VAT Due</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockVATReturns.map((vatReturn) => (
                <tr key={vatReturn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vatReturn.periodStart} to {vatReturn.periodEnd}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{vatReturn.box1VatDueSales.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{vatReturn.box4VatReclaimed.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    £{vatReturn.box5NetVatDue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vatReturn.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      vatReturn.status === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vatReturn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    {vatReturn.status === 'draft' && (
                      <button className="text-green-600 hover:text-green-900 mr-3">Submit</button>
                    )}
                    <button className="text-purple-600 hover:text-purple-900">PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderTaxCodes = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Enhanced International VAT/GST Codes</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search VAT codes..."
              className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
            />
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option value="">All Countries</option>
              <option value="UK">United Kingdom</option>
              <option value="EU">European Union</option>
              <option value="US">United States</option>
              <option value="APAC">Asia Pacific</option>
              <option value="MENA">Middle East & Africa</option>
              <option value="LATAM">Latin America</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reverse Charge</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enhancedInternationalVATCodes.slice(0, 50).map((code, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{code.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{code.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{code.rate}%</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{code.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{code.scheme}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      code.category === 'Standard' ? 'bg-blue-100 text-blue-800' :
                      code.category === 'Reduced' ? 'bg-green-100 text-green-800' :
                      code.category === 'Zero' || code.category === 'Zero-Rated' ? 'bg-gray-100 text-gray-800' :
                      code.category === 'Exempt' ? 'bg-yellow-100 text-yellow-800' :
                      code.category === 'Reverse Charge' ? 'bg-red-100 text-red-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {code.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {code.reverseCharge ? (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Yes
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Showing 50 of {enhancedInternationalVATCodes.length} VAT codes. 
            <button className="ml-2 text-blue-600 hover:text-blue-800">Load more</button>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Comprehensive Forex Rates & Currency Management</h3>
          <div className="flex space-x-2">
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
              Refresh Rates
            </button>
            <input
              type="text"
              placeholder="Search currencies..."
              className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
            />
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option value="">All Regions</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Asia Pacific">Asia Pacific</option>
              <option value="Middle East & Africa">Middle East & Africa</option>
              <option value="South America">South America</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Exchange Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volatility</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Day Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comprehensiveForexRates.slice(0, 30).map((currency, index) => (
                <tr key={index} className={currency.isBase ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{currency.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currency.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{currency.symbol}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-mono">
                    {currency.rate >= 1 ? currency.rate.toFixed(4) : currency.rate.toFixed(6)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{currency.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      currency.volatility === 'Low' ? 'bg-green-100 text-green-800' :
                      currency.volatility === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      currency.volatility === 'High' ? 'bg-red-100 text-red-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {currency.volatility}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                      currency.trend === 'Up' ? 'bg-green-100 text-green-800' :
                      currency.trend === 'Down' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {currency.trend === 'Up' ? '↗' : currency.trend === 'Down' ? '↘' : '→'} {currency.trend}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono">
                    <span className={currency.dayChange > 0 ? 'text-green-600' : currency.dayChange < 0 ? 'text-red-600' : 'text-gray-500'}>
                      {currency.dayChange > 0 ? '+' : ''}{currency.dayChange.toFixed(4)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{currency.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {currency.isBase ? (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Base
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing 30 of {comprehensiveForexRates.length} currencies. Real-time rates updated every 15 minutes.
            <button className="ml-2 text-blue-600 hover:text-blue-800">Load more</button>
          </p>
          <div className="flex space-x-4 text-sm text-gray-500">
            <span>Base Currency: GBP</span>
            <span>Last Update: {comprehensiveForexRates[0]?.lastUpdated}</span>
            <button className="text-blue-600 hover:text-blue-800">Configure Base Currency</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Currency Conversion Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Currency</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="GBP">GBP - British Pound</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Currency</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              placeholder="1000.00"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-500">Converted Amount</p>
            <p className="text-2xl font-bold text-gray-900">$1,275.00 USD</p>
            <p className="text-sm text-gray-500">Rate: 1 GBP = 1.2750 USD</p>
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">VAT/GST</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            MTD Connect
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            Export Data
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {activeTab === 'returns' && renderReturns()}
      {activeTab === 'tax-codes' && renderTaxCodes()}
      {activeTab === 'mtd-filing' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">MTD Status</h4>
              <p className="text-2xl font-bold text-green-600">Connected</p>
              <p className="text-sm text-green-700">HMRC API active</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Filed Returns</h4>
              <p className="text-2xl font-bold text-blue-600">4</p>
              <p className="text-sm text-blue-700">This year</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Next Due</h4>
              <p className="text-2xl font-bold text-yellow-600">7</p>
              <p className="text-sm text-yellow-700">Days remaining</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900">Compliance Score</h4>
              <p className="text-2xl font-bold text-purple-600">98%</p>
              <p className="text-sm text-purple-700">Excellent</p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">MTD Submission History</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">Q4 2023 VAT Return</p>
                  <p className="text-sm text-gray-500">Submitted: 31 Jan 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">£12,500.00</p>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Accepted
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">Q3 2023 VAT Return</p>
                  <p className="text-sm text-gray-500">Submitted: 31 Oct 2023</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">£8,750.00</p>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Accepted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'ec-intrastat' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">EC Sales</h4>
              <p className="text-2xl font-bold text-blue-600">£45,250</p>
              <p className="text-sm text-blue-700">This quarter</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900">EC Purchases</h4>
              <p className="text-2xl font-bold text-green-600">£28,750</p>
              <p className="text-sm text-green-700">This quarter</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900">Intrastat Value</h4>
              <p className="text-2xl font-bold text-purple-600">£125,000</p>
              <p className="text-sm text-purple-700">Above threshold</p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">EC Sales List</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VAT Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">German Tech GmbH</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">DE123456789</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Germany</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£25,000.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Q1 2024</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">French Solutions SARL</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">FR987654321</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">France</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£20,250.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Q1 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'adjustments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900">Fuel Scale Charge</h4>
              <p className="text-2xl font-bold text-yellow-600">£450</p>
              <p className="text-sm text-yellow-700">This quarter</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900">Partial Exemption</h4>
              <p className="text-2xl font-bold text-blue-600">£1,250</p>
              <p className="text-sm text-blue-700">Adjustment required</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-medium text-red-900">Manual Adjustments</h4>
              <p className="text-2xl font-bold text-red-600">£750</p>
              <p className="text-sm text-red-700">This period</p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">VAT Adjustments</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fuel Scale</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Company car fuel benefit adjustment</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£450.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Q1 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Applied
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Partial Exemption</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Annual partial exemption calculation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£1,250.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Manual</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Prior period error correction</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">£750.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Q4 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Applied
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VATGST

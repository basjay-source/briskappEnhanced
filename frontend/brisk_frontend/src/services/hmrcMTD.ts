
interface HMRCAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes: string[]
}

interface HMRCTokens {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  scope: string
}

interface QuarterlyPeriod {
  periodId: string
  from: string
  to: string
}

interface QuarterlyObligation {
  start: string
  end: string
  due: string
  status: 'O' | 'F' // Open or Fulfilled
  periodKey: string
  received?: string
}

export interface MTDQuarterlySubmission {
  periodKey: string
  periodFrom: string
  periodTo: string
  employments?: {
    incomeReceived: number
  }
  selfEmployments?: Array<{
    id: string
    incomeReceived: number
    expenses: {
      costOfGoodsAllowable: number
      constructionIndustryScheme: number
      depreciation: number
      financialCharges: number
      interest: number
      badDebt: number
      professionalFees: number
      travelCosts: number
      adminCosts: number
      advertisingCosts: number
      businessEntertainmentCosts: number
      otherExpenses: number
    }
  }>
  ukProperties?: {
    income: {
      rentIncome: number
      premiumsReceived: number
      reversePremiums: number
      otherIncome: number
    }
    expenses: {
      premisesRunningCosts: number
      repairsAndMaintenance: number
      financialCosts: number
      professionalFees: number
      costOfServices: number
      residentialFinancialCost: number
      otherExpenses: number
    }
  }
  foreignProperties?: Array<{
    countryCode: string
    income: number
    expenses: number
  }>
  dividends?: {
    ukDividends: number
    otherUkDividends: number
  }
  savings?: {
    securities: number
    foreignInterest: number
  }
}

interface HMRCSubmissionResponse {
  transactionReference: string
  periodKey: string
}

class HMRCMTDService {
  private baseUrl = 'https://api.service.hmrc.gov.uk'
  private testBaseUrl = 'https://test-api.service.hmrc.gov.uk'
  private isProduction = false
  
  private config: HMRCAuthConfig = {
    clientId: import.meta.env.VITE_HMRC_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_HMRC_CLIENT_SECRET || '',
    redirectUri: import.meta.env.VITE_HMRC_REDIRECT_URI || 'http://localhost:5173/hmrc/callback',
    scopes: [
      'read:self-assessment',
      'write:self-assessment'
    ]
  }

  private tokens: HMRCTokens | null = null

  constructor(isProduction = false) {
    this.isProduction = isProduction
    this.loadTokensFromStorage()
  }

  private getApiUrl(): string {
    return this.isProduction ? this.baseUrl : this.testBaseUrl
  }

  private loadTokensFromStorage(): void {
    const stored = localStorage.getItem('hmrc_tokens')
    if (stored) {
      try {
        this.tokens = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to load HMRC tokens:', e)
      }
    }
  }

  private saveTokensToStorage(tokens: HMRCTokens): void {
    this.tokens = tokens
    localStorage.setItem('hmrc_tokens', JSON.stringify(tokens))
  }

  initiateOAuth(): string {
    const state = Math.random().toString(36).substring(7)
    localStorage.setItem('hmrc_oauth_state', state)
    
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scopes.join(' '),
      state
    })

    return `${this.getApiUrl()}/oauth/authorize?${params.toString()}`
  }

  async exchangeCodeForToken(code: string): Promise<HMRCTokens> {
    const response = await fetch(`${this.getApiUrl()}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.redirectUri
      })
    })

    if (!response.ok) {
      throw new Error(`HMRC OAuth failed: ${response.statusText}`)
    }

    const tokens: HMRCTokens = await response.json()
    this.saveTokensToStorage(tokens)
    return tokens
  }

  async refreshAccessToken(): Promise<HMRCTokens> {
    if (!this.tokens?.refresh_token) {
      throw new Error('No refresh token available')
    }

    const response = await fetch(`${this.getApiUrl()}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.tokens.refresh_token,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret
      })
    })

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.statusText}`)
    }

    const tokens: HMRCTokens = await response.json()
    this.saveTokensToStorage(tokens)
    return tokens
  }

  private async makeAuthenticatedRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' = 'GET',
    body?: any
  ): Promise<any> {
    if (!this.tokens?.access_token) {
      throw new Error('Not authenticated with HMRC')
    }

    const headers: HeadersInit = {
      'Authorization': `Bearer ${this.tokens.access_token}`,
      'Accept': 'application/vnd.hmrc.1.0+json',
      'Content-Type': 'application/json'
    }

    const response = await fetch(`${this.getApiUrl()}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    })

    if (response.status === 401) {
      await this.refreshAccessToken()
      return this.makeAuthenticatedRequest(endpoint, method, body)
    }

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`HMRC API Error: ${JSON.stringify(error)}`)
    }

    return response.json()
  }


  async getObligations(nino: string, taxYear: string): Promise<QuarterlyObligation[]> {
    const fromDate = `${taxYear}-04-06`
    const toDate = `${parseInt(taxYear) + 1}-04-05`
    
    const data = await this.makeAuthenticatedRequest(
      `/individuals/self-assessment/ni/${nino}/obligations?from=${fromDate}&to=${toDate}`
    )
    
    return data.obligations || []
  }

  async submitQuarterlyUpdate(
    nino: string,
    businessId: string,
    submission: MTDQuarterlySubmission
  ): Promise<HMRCSubmissionResponse> {
    const endpoint = `/individuals/business/self-employment/${nino}/${businessId}/period/${submission.periodKey}`
    
    return this.makeAuthenticatedRequest(endpoint, 'PUT', submission)
  }

  async getQuarterlySubmission(
    nino: string,
    businessId: string,
    periodKey: string
  ): Promise<MTDQuarterlySubmission> {
    const endpoint = `/individuals/business/self-employment/${nino}/${businessId}/period/${periodKey}`
    return this.makeAuthenticatedRequest(endpoint)
  }

  async submitFinalDeclaration(
    nino: string,
    taxYear: string,
    finalData: any
  ): Promise<any> {
    const endpoint = `/individuals/self-assessment/ni/${nino}/${taxYear}`
    return this.makeAuthenticatedRequest(endpoint, 'POST', finalData)
  }

  async getBusinessDetails(nino: string): Promise<any> {
    const endpoint = `/individuals/business/details/ni/${nino}/list`
    return this.makeAuthenticatedRequest(endpoint)
  }

  isAuthenticated(): boolean {
    return this.tokens !== null && !!this.tokens.access_token
  }

  clearAuthentication(): void {
    this.tokens = null
    localStorage.removeItem('hmrc_tokens')
    localStorage.removeItem('hmrc_oauth_state')
  }
}

export const hmrcMTDService = new HMRCMTDService()

export async function syncDividendsFromExchange(
  platform: string,
  apiKey: string,
  fromDate: string,
  toDate: string
): Promise<any[]> {
  console.log(`Syncing dividends from ${platform} for ${fromDate} to ${toDate}`)
  
  
  return []
}

export default HMRCMTDService

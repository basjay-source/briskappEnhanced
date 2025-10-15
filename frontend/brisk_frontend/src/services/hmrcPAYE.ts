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

export interface RTISubmissionData {
  employerReference: string
  taxYear: string
  taxMonth: number
  submissionType: 'FPS' | 'EPS' | 'EAS' | 'NVR'
  employees?: Array<{
    employeeId: string
    name: string
    niNumber: string
    grossPay: number
    taxDeducted: number
    niDeducted: number
    studentLoanDeducted?: number
    pensionContributions?: number
  }>
  employerNIContributions?: number
  apprenticeshipLevy?: number
  statutoryPayments?: {
    smp?: number
    spp?: number
    sap?: number
    sspp?: number
  }
  recoveries?: number
}

export interface RTISubmissionResponse {
  correlationId: string
  submissionId: string
  status: 'accepted' | 'rejected' | 'pending'
  timestamp: string
  errors?: Array<{
    code: string
    message: string
    field?: string
  }>
}

export interface HMRCNotification {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

class HMRCPAYEService {
  private baseUrl = 'https://api.service.hmrc.gov.uk'
  private testBaseUrl = 'https://test-api.service.hmrc.gov.uk'
  private isProduction = false
  
  private config: HMRCAuthConfig = {
    clientId: import.meta.env.VITE_HMRC_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_HMRC_CLIENT_SECRET || '',
    redirectUri: import.meta.env.VITE_HMRC_REDIRECT_URI || 'http://localhost:5173/hmrc/callback',
    scopes: [
      'read:paye',
      'write:paye',
      'read:rti',
      'write:rti'
    ]
  }

  private tokens: HMRCTokens | null = null
  private notificationCallback: ((notification: HMRCNotification) => void) | null = null

  constructor(isProduction = false) {
    this.isProduction = isProduction
    this.loadTokensFromStorage()
  }

  private getApiUrl(): string {
    return this.isProduction ? this.baseUrl : this.testBaseUrl
  }

  private loadTokensFromStorage(): void {
    const stored = localStorage.getItem('hmrc_paye_tokens')
    if (stored) {
      try {
        this.tokens = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to load HMRC PAYE tokens:', e)
      }
    }
  }

  private saveTokensToStorage(tokens: HMRCTokens): void {
    this.tokens = tokens
    localStorage.setItem('hmrc_paye_tokens', JSON.stringify(tokens))
  }

  setNotificationCallback(callback: (notification: HMRCNotification) => void): void {
    this.notificationCallback = callback
  }

  private notify(notification: HMRCNotification): void {
    if (this.notificationCallback) {
      this.notificationCallback(notification)
    }
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
    try {
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
        this.notify({
          type: 'error',
          title: 'HMRC Authentication Failed',
          message: `Failed to authenticate with HMRC: ${response.statusText}`,
          duration: 5000
        })
        throw new Error(`HMRC OAuth failed: ${response.statusText}`)
      }

      const tokens: HMRCTokens = await response.json()
      this.saveTokensToStorage(tokens)
      
      this.notify({
        type: 'success',
        title: 'HMRC Authentication Successful',
        message: 'Successfully authenticated with HMRC. You can now submit RTI returns.',
        duration: 5000
      })
      
      return tokens
    } catch (error) {
      this.notify({
        type: 'error',
        title: 'Authentication Error',
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        duration: 5000
      })
      throw error
    }
  }

  async refreshAccessToken(): Promise<HMRCTokens> {
    if (!this.tokens?.refresh_token) {
      throw new Error('No refresh token available')
    }

    try {
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
    } catch (error) {
      this.notify({
        type: 'warning',
        title: 'Session Expired',
        message: 'Your HMRC session has expired. Please re-authenticate.',
        duration: 5000
      })
      throw error
    }
  }

  private async makeAuthenticatedRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' = 'GET',
    body?: any
  ): Promise<any> {
    if (!this.tokens?.access_token) {
      this.notify({
        type: 'error',
        title: 'Authentication Required',
        message: 'You must authenticate with HMRC before submitting returns.',
        duration: 5000
      })
      throw new Error('Not authenticated with HMRC')
    }

    const headers: HeadersInit = {
      'Authorization': `Bearer ${this.tokens.access_token}`,
      'Accept': 'application/vnd.hmrc.2.0+json',
      'Content-Type': 'application/json',
      'Gov-Client-Connection-Method': 'WEB_APP_VIA_SERVER'
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

  async checkAuthenticationBeforeSubmission(): Promise<boolean> {
    if (this.isAuthenticated()) {
      return true
    }

    this.notify({
      type: 'info',
      title: 'HMRC Authentication Required',
      message: 'Redirecting to HMRC to authenticate...',
      duration: 3000
    })

    const authUrl = this.initiateOAuth()
    window.location.href = authUrl
    return false
  }

  async submitRTI(data: RTISubmissionData): Promise<RTISubmissionResponse> {
    const authenticated = await this.checkAuthenticationBeforeSubmission()
    if (!authenticated) {
      throw new Error('Authentication required')
    }

    try {
      const endpoint = `/employers/${data.employerReference}/rti/${data.submissionType.toLowerCase()}`
      
      const response = await this.makeAuthenticatedRequest(endpoint, 'POST', data)
      
      this.notify({
        type: 'success',
        title: 'RTI Submission Successful',
        message: `Your ${data.submissionType} submission has been successfully sent to HMRC. Reference: ${response.submissionId}`,
        duration: 7000
      })

      return {
        correlationId: response.correlationId || `COR-${Date.now()}`,
        submissionId: response.submissionId || `SUB-${Date.now()}`,
        status: 'accepted',
        timestamp: new Date().toISOString(),
        ...response
      }
    } catch (error) {
      this.notify({
        type: 'error',
        title: 'RTI Submission Failed',
        message: error instanceof Error ? error.message : 'Failed to submit RTI return to HMRC',
        duration: 7000
      })
      throw error
    }
  }

  async getEmployerDetails(employerReference: string): Promise<any> {
    const authenticated = await this.checkAuthenticationBeforeSubmission()
    if (!authenticated) {
      throw new Error('Authentication required')
    }

    try {
      const endpoint = `/employers/${employerReference}`
      return await this.makeAuthenticatedRequest(endpoint)
    } catch (error) {
      this.notify({
        type: 'error',
        title: 'Failed to Fetch Employer Details',
        message: error instanceof Error ? error.message : 'An error occurred',
        duration: 5000
      })
      throw error
    }
  }

  async getRTISubmissionHistory(
    employerReference: string,
    taxYear: string
  ): Promise<any[]> {
    const authenticated = await this.checkAuthenticationBeforeSubmission()
    if (!authenticated) {
      throw new Error('Authentication required')
    }

    try {
      const endpoint = `/employers/${employerReference}/rti/submissions?taxYear=${taxYear}`
      const response = await this.makeAuthenticatedRequest(endpoint)
      return response.submissions || []
    } catch (error) {
      this.notify({
        type: 'error',
        title: 'Failed to Fetch Submission History',
        message: error instanceof Error ? error.message : 'An error occurred',
        duration: 5000
      })
      throw error
    }
  }

  isAuthenticated(): boolean {
    return this.tokens !== null && !!this.tokens.access_token
  }

  clearAuthentication(): void {
    this.tokens = null
    localStorage.removeItem('hmrc_paye_tokens')
    localStorage.removeItem('hmrc_oauth_state')
    
    this.notify({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been signed out from HMRC.',
      duration: 3000
    })
  }

  getAuthenticationStatus(): {
    authenticated: boolean
    expiresAt?: Date
    scopes?: string[]
  } {
    if (!this.isAuthenticated()) {
      return { authenticated: false }
    }

    return {
      authenticated: true,
      expiresAt: this.tokens?.expires_in 
        ? new Date(Date.now() + this.tokens.expires_in * 1000)
        : undefined,
      scopes: this.tokens?.scope?.split(' ')
    }
  }
}

export const hmrcPAYEService = new HMRCPAYEService()

export default HMRCPAYEService

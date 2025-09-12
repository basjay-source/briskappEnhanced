const API_BASE_URL = '/api/v1'

interface TrialBalanceEntry {
  code: string;
  name: string;
  debit: number;
  credit: number;
}

interface Job {
  id: string;
  title: string;
  client_name: string;
  status: string;
  type: string;
}

interface Client {
  id: string;
  name: string;
  company_number: string;
}

interface FinancialStatement {
  id: string;
  statement_type: string;
  company_id: string;
  period_start?: string;
  period_end?: string;
}

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    
    return response.json()
  }

  async getTrialBalance(companyId: string, periodEnd?: string) {
    const params = periodEnd ? `?period_end=${periodEnd}` : ''
    return this.request<{ trial_balance: TrialBalanceEntry[] }>(`/accounts/trial-balance/${companyId}${params}`)
  }

  async createJournalEntry(data: Record<string, unknown>) {
    return this.request('/accounts/journals', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getFinancialStatements(companyId: string, statementType?: string) {
    const params = statementType ? `?statement_type=${statementType}` : ''
    return this.request<FinancialStatement[]>(`/accounts/statements/${companyId}${params}`)
  }

  async compileFinancialStatements(data: Record<string, unknown>) {
    return this.request('/accounts/statements/compile', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getJobs(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request<{ jobs: Job[] }>(`/practice/jobs?${params}`)
  }

  async createJob(data: Record<string, unknown>) {
    return this.request('/practice/jobs', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async updateJob(jobId: string, data: Record<string, unknown>) {
    return this.request(`/practice/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async getTasks(jobId?: string) {
    const params = jobId ? `?job_id=${jobId}` : ''
    return this.request(`/practice/tasks${params}`)
  }

  async createTask(data: Record<string, unknown>) {
    return this.request('/practice/tasks', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getClients() {
    return this.request<Client[]>('/clients')
  }

  async createClient(data: Record<string, unknown>) {
    return this.request('/clients', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async updateClient(clientId: string, data: Record<string, unknown>) {
    return this.request(`/clients/${clientId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async search(query: string, modules?: string[]) {
    const params = new URLSearchParams({
      q: query,
      ...(modules && { modules: modules.join(',') })
    })
    return this.request(`/search?${params}`)
  }

  async getAdvice(adviserType: string, data: Record<string, unknown>) {
    return this.request(`/ai-advisers/${adviserType}/report`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getVATReturns(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request<Record<string, unknown>[]>(`/vat/returns?${params}`)
  }

  async createVATReturn(data: Record<string, unknown>) {
    return this.request('/vat/returns', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async updateVATReturn(returnId: string, data: Record<string, unknown>) {
    return this.request(`/vat/returns/${returnId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async submitVATReturn(returnId: string) {
    return this.request(`/vat/returns/${returnId}/submit`, {
      method: 'POST'
    })
  }

  async getVATSchemes() {
    return this.request<Record<string, unknown>[]>('/vat/schemes')
  }

  async createVATScheme(data: Record<string, unknown>) {
    return this.request('/vat/schemes', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async updateVATScheme(schemeId: string, data: Record<string, unknown>) {
    return this.request(`/vat/schemes/${schemeId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async getVATAnalytics(type: string, filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/vat/analytics/${type}?${params}`)
  }

  async getVATCompliance() {
    return this.request('/vat/compliance')
  }

  async getVATAuditTrail(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/vat/audit-trail?${params}`)
  }
}

export const apiClient = new ApiClient()

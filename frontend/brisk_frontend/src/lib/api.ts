const API_BASE_URL = '/api/v1'

interface TrialBalanceEntry {
  code: string;
  name: string;
  debit: number;
  credit: number;
}

interface TrialBalanceResponse {
  trial_balance: TrialBalanceEntry[];
  totals: {
    debits: number;
    credits: number;
    balanced: boolean;
  };
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
    return this.request<TrialBalanceResponse>(`/accounts/trial-balance/${companyId}${params}`)
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

  async getTimeEntries(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/practice/time-entries?${params}`)
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

  async getClients(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request<Client[]>(`/books/customers?${params}`)
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

  async getInvoices(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/books/invoices?${params}`)
  }

  async createInvoice(data: Record<string, unknown>) {
    return this.request('/books/invoices', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async updateInvoice(invoiceId: string, data: Record<string, unknown>) {
    return this.request(`/books/invoices/${invoiceId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async getBills(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/books/bills?${params}`)
  }

  async createBill(data: Record<string, unknown>) {
    return this.request('/books/bills', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async updateBill(billId: string, data: Record<string, unknown>) {
    return this.request(`/books/bills/${billId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async getBankTransactions(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/books/transactions?${params}`)
  }

  async createBankTransaction(data: Record<string, unknown>) {
    return this.request('/books/transactions', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async reconcileBankTransaction(transactionId: string, data: Record<string, unknown>) {
    return this.request(`/books/transactions/${transactionId}/reconcile`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getQuotes(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/books/quotes?${params}`)
  }

  async createQuote(data: Record<string, unknown>) {
    return this.request('/books/quotes', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getPurchaseOrders(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/books/purchase-orders?${params}`)
  }

  async createPurchaseOrder(data: Record<string, unknown>) {
    return this.request('/books/purchase-orders', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getCustomers(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/books/customers?${params}`)
  }

  async getSuppliers(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/books/suppliers?${params}`)
  }

  async getJobCodes(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/practice/job-codes?${params}`)
  }

  async getEmployeeRates(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/practice/employee-rates?${params}`)
  }

  async getCorporationTaxReturns(companyId: string = 'default-company') {
    return this.request(`/tax/ct/returns/${companyId}`)
  }

  async getPersonalTaxReturns(companyId: string = 'default-company') {
    return this.request(`/tax/sa/returns/${companyId}`)
  }

  async getPayrollEmployees(companyId: string = 'default-company', filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    const queryString = params.toString() ? `?${params}` : ''
    return this.request(`/payroll/employees/${companyId}${queryString}`)
  }

  async getAMLCases(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/aml/cases?${params}`)
  }

  async getCompanySecretarialFilings(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/cosec/filings?${params}`)
  }

  async getPracticeDashboard() {
    return this.request('/practice/dashboard')
  }

  async getAvailableReliefs(companyId: string = 'default-company') {
    return this.request(`/tax/ct/reliefs/available?company_id=${companyId}`)
  }

  async getCharities(): Promise<any> {
    return this.request('/charity/charities')
  }

  async createCharity(data: Record<string, unknown>): Promise<any> {
    return this.request('/charity/charities', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getCharityFunds(charityId: string): Promise<any> {
    return this.request(`/charity/charities/${charityId}/funds`)
  }

  async getCharityTrustees(charityId: string): Promise<any> {
    return this.request(`/charity/charities/${charityId}/trustees`)
  }

  async generateCharitySOFA(charityId: string, year: number): Promise<any> {
    return this.request(`/charity/charities/${charityId}/sofa?year=${year}`)
  }

  async getCharityAIAdvice(charityId: string): Promise<any> {
    return this.request(`/charity/charities/${charityId}/ai-advice`)
  }

  async getCompanyFilings(companyId: string): Promise<any> {
    return this.request(`/cosec/filings/${companyId}`)
  }

  async createFiling(data: Record<string, unknown>): Promise<any> {
    return this.request('/cosec/filings', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getFilingDeadlines(companyId: string): Promise<any> {
    return this.request(`/cosec/deadlines/${companyId}`)
  }

  async getCompanyOfficers(companyId: string): Promise<any> {
    return this.request(`/cosec/officers/${companyId}`)
  }

  async getCompanyPSCs(companyId: string): Promise<any> {
    return this.request(`/cosec/pscs/${companyId}`)
  }

  async getAMLRiskAssessments(filters?: Record<string, string>): Promise<any> {
    const params = new URLSearchParams(filters || {})
    return this.request(`/aml/risk-assessments?${params}`)
  }

  async createAMLRiskAssessment(data: Record<string, unknown>): Promise<any> {
    return this.request('/aml/risk-assessments', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getAMLAlerts(filters?: Record<string, string>): Promise<any> {
    const params = new URLSearchParams(filters || {})
    return this.request(`/aml/alerts?${params}`)
  }

  async getAMLComplianceMetrics(): Promise<any> {
    return this.request('/aml/compliance-metrics')
  }

  async getAMLTrainingRecords(filters?: Record<string, string>): Promise<any> {
    const params = new URLSearchParams(filters || {})
    return this.request(`/aml/training-records?${params}`)
  }

  async createCustomer(data: Record<string, unknown>) {
    return this.request('/books/customers', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async createSupplier(data: Record<string, unknown>) {
    return this.request('/books/suppliers', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async createProduct(data: Record<string, unknown>) {
    return this.request('/books/products', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async createExpense(data: Record<string, unknown>) {
    return this.request('/books/expenses', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async createApprovalRequest(data: Record<string, unknown>) {
    return this.request('/admin/approval-requests', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async approveRequest(requestId: number) {
    return this.request(`/admin/approval-requests/${requestId}/approve`, {
      method: 'POST'
    })
  }

  async rejectRequest(requestId: number) {
    return this.request(`/admin/approval-requests/${requestId}/reject`, {
      method: 'POST'
    })
  }

  async createAccount(data: Record<string, unknown>) {
    return this.request('/books/accounts', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getProducts(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/books/products?${params}`)
  }

  async getProduct(productId: string) {
    return this.request(`/books/products/${productId}`)
  }

  async updateProduct(productId: string, data: Record<string, unknown>) {
    return this.request(`/books/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async deleteProduct(productId: string) {
    return this.request(`/books/products/${productId}`, {
      method: 'DELETE'
    })
  }

  async getProductInventory(productId: string) {
    return this.request(`/books/products/${productId}/inventory`)
  }

  async createInventoryMovement(data: Record<string, unknown>) {
    return this.request('/books/inventory/movements', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getInventoryMovements(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/books/inventory/movements?${params}`)
  }

  async getStockReport(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {})
    return this.request(`/books/inventory/stock-report?${params}`)
  }

  async createStockAdjustment(data: Record<string, unknown>) {
    return this.request('/books/inventory/adjustments', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async getBankReconciliation(accountId: string, startDate?: string, endDate?: string) {
    const params = new URLSearchParams()
    if (startDate) params.append('start_date', startDate)
    if (endDate) params.append('end_date', endDate)
    return this.request(`/books/reconciliation/${accountId}?${params}`)
  }

  async getReconciliationSummary() {
    return this.request('/books/reconciliation/summary')
  }

  async getBankAccountsForReconciliation() {
    return this.request('/books/bank-connections')
  }

  async getTrialBalanceWithRunningBalances(asOfDate?: string) {
    const params = asOfDate ? `?as_of_date=${asOfDate}` : ''
    return this.request(`/accounts/trial-balance-running${params}`)
  }

  async getProfitLossWithRunningBalances(startDate: string, endDate: string) {
    return this.request(`/accounts/profit-loss-running?start_date=${startDate}&end_date=${endDate}`)
  }

  async getBalanceSheetWithRunningBalances(asOfDate: string) {
    return this.request(`/accounts/balance-sheet-running?as_of_date=${asOfDate}`)
  }

  async getAgedDebtors(asOfDate?: string) {
    const params = asOfDate ? `?as_of_date=${asOfDate}` : ''
    return this.request(`/books/aged-debtors${params}`)
  }

  async getAgedCreditors(asOfDate?: string) {
    const params = asOfDate ? `?as_of_date=${asOfDate}` : ''
    return this.request(`/books/aged-creditors${params}`)
  }

}

export const apiClient = new ApiClient()

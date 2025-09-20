import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export interface DashboardOverview {
  total_tenants: number
  active_users: number
  total_subscriptions: number
  recent_logins: number
  security_alerts: number
  system_health: string
}

export interface Tenant {
  id: number
  name: string
  legal_entity: string
  primary_region: string
  environment: string
  status: string
  created_at: string
}

export interface User {
  id: number
  email: string
  full_name: string
  role: string
  is_active: boolean
  last_login: string | null
}

export interface Subscription {
  id: number
  tenant_id: number
  plan_name: string
  status: string
  seats: number
  amount: number
  currency: string
}

export interface FeatureFlag {
  id: number
  name: string
  description: string
  is_enabled: boolean
  created_at: string
}

export interface AuditLog {
  id: number
  user_id: number | null
  action: string
  resource_type: string | null
  timestamp: string
  ip_address: string | null
}

export interface DocumentHubDashboard {
  total_documents: number
  pending_ocr: number
  conversion_failures: number
  pending_signatures: number
  storage_usage: {
    total_size_gb: number
    used_size_gb: number
    usage_percentage: number
  }
  recent_activity: Array<{
    id: number
    action: string
    document: string
    user: string
    timestamp: string
  }>
}

export interface Document {
  id: number
  filename: string
  document_type: string | null
  status: string
  file_size: number
  client_name: string | null
  binder_name: string | null
  tags: string[]
  is_favorite: boolean
  created_at: string
  updated_at: string
}

export interface ConversionJob {
  id: number
  document_filename: string | null
  source_format: string
  target_format: string
  status: string
  progress: number
  error_message: string | null
  created_at: string
  completed_at: string | null
}

export interface OCRResult {
  id: number
  document_filename: string
  language: string
  confidence_score: number
  extracted_text: string
  structured_data: any
  processing_time: number | null
  created_at: string
}

export interface ESignEnvelope {
  id: number
  name: string
  status: string
  document_count: number
  recipient_count: number
  completed_at: string | null
  expires_at: string | null
  created_at: string
}

export interface DocumentTemplate {
  id: number
  name: string
  template_type: string
  description: string | null
  merge_fields: any
  created_at: string
}

export interface DocumentShare {
  id: number
  document_filename: string
  recipient_email: string
  share_token: string
  permissions: any
  expires_at: string | null
  access_count: number
  last_accessed: string | null
  created_at: string
}

export interface RetentionPolicy {
  id: number
  document_type: string
  retention_period_years: number
  jurisdiction: string
  auto_delete: boolean
  legal_hold_exempt: boolean
  description: string | null
  created_at: string
}

export interface DocumentPack {
  id: number
  name: string
  pack_type: string
  client_name: string | null
  status: string
  component_count: number
  created_at: string
}

export interface Client {
  id: number
  name: string
  client_code: string
  contact_email: string | null
  document_count: number
  created_at: string
}

export interface Binder {
  id: number
  name: string
  binder_type: string
  client_name: string | null
  document_count: number
  is_locked: boolean
  created_at: string
}

export const adminApi = {
  getDashboardOverview: (): Promise<DashboardOverview> =>
    api.get('/admin/dashboard/overview').then(res => res.data),

  getTenants: (): Promise<Tenant[]> =>
    api.get('/admin/tenants').then(res => res.data),

  createTenant: (data: { name: string; legal_entity: string; primary_region: string }) =>
    api.post('/admin/tenants', data).then(res => res.data),

  getUsers: (params?: { tenant_id?: number; role?: string }): Promise<User[]> =>
    api.get('/admin/users', { params }).then(res => res.data),

  updateUserRole: (userId: number, newRole: string) =>
    api.put(`/admin/users/${userId}/role`, { new_role: newRole }).then(res => res.data),

  getSubscriptions: (): Promise<Subscription[]> =>
    api.get('/admin/subscriptions').then(res => res.data),

  createSubscription: (data: { tenant_id: number; plan_name: string; seats: number; amount: number }) =>
    api.post('/admin/subscriptions', data).then(res => res.data),

  getFeatureFlags: (): Promise<FeatureFlag[]> =>
    api.get('/admin/feature-flags').then(res => res.data),

  createFeatureFlag: (data: { name: string; description: string; is_enabled?: boolean }) =>
    api.post('/admin/feature-flags', data).then(res => res.data),

  toggleFeatureFlag: (flagId: number) =>
    api.put(`/admin/feature-flags/${flagId}/toggle`).then(res => res.data),

  getAuditLogs: (params?: { tenant_id?: number; limit?: number }): Promise<AuditLog[]> =>
    api.get('/admin/audit-logs', { params }).then(res => res.data),

  getSystemHealth: () =>
    api.get('/admin/monitoring/health').then(res => res.data),

  getSystemMetrics: () =>
    api.get('/admin/monitoring/metrics').then(res => res.data),
}

export const documentHubApi = {
  getDashboardOverview: (): Promise<DocumentHubDashboard> =>
    api.get('/document-hub/dashboard').then(res => res.data),

  getClients: (): Promise<Client[]> =>
    api.get('/document-hub/clients').then(res => res.data),

  createClient: (data: FormData) =>
    api.post('/document-hub/clients', data).then(res => res.data),

  getBinders: (params?: { client_id?: number }): Promise<Binder[]> =>
    api.get('/document-hub/binders', { params }).then(res => res.data),

  createBinder: (data: FormData) =>
    api.post('/document-hub/binders', data).then(res => res.data),

  getDocuments: (params?: { 
    client_id?: number
    binder_id?: number
    document_type?: string
    search?: string
  }): Promise<Document[]> =>
    api.get('/document-hub/documents', { params }).then(res => res.data),

  uploadDocument: (data: FormData) =>
    api.post('/document-hub/documents/upload', data).then(res => res.data),

  getConversionJobs: (params?: { status?: string }): Promise<ConversionJob[]> =>
    api.get('/document-hub/conversions', { params }).then(res => res.data),

  createConversionJob: (data: FormData) =>
    api.post('/document-hub/conversions', data).then(res => res.data),

  getOCRResults: (params?: { document_id?: number }): Promise<OCRResult[]> =>
    api.get('/document-hub/ocr-results', { params }).then(res => res.data),

  getESignEnvelopes: (params?: { status?: string }): Promise<ESignEnvelope[]> =>
    api.get('/document-hub/esign-envelopes', { params }).then(res => res.data),

  getDocumentTemplates: (params?: { template_type?: string }): Promise<DocumentTemplate[]> =>
    api.get('/document-hub/templates', { params }).then(res => res.data),

  getDocumentShares: (params?: { document_id?: number }): Promise<DocumentShare[]> =>
    api.get('/document-hub/shares', { params }).then(res => res.data),

  getRetentionPolicies: (): Promise<RetentionPolicy[]> =>
    api.get('/document-hub/retention-policies').then(res => res.data),

  getDocumentPacks: (params?: { client_id?: number; pack_type?: string }): Promise<DocumentPack[]> =>
    api.get('/document-hub/document-packs', { params }).then(res => res.data),

  getUsageReports: () =>
    api.get('/document-hub/reports/usage').then(res => res.data),
}

export interface PMDashboard {
  active_jobs: number
  overdue_deadlines: number
  wip_over_budget: number
  unbilled_wip_amount: number
  team_utilization: number
  recent_activity: Array<{
    id: number
    action: string
    client: string
    user: string
    timestamp: string
  }>
}

export interface Opportunity {
  id: number
  name: string
  client_name: string | null
  value_estimate: number | null
  probability: number
  stage: string
  expected_close_date: string | null
  assignee: string | null
  created_at: string
}

export interface PMProposal {
  id: number
  proposal_number: string
  title: string
  client_name: string | null
  total_value: number | null
  status: string
  sent_at: string | null
  created_at: string
}

export interface ServiceCatalogItem {
  id: number
  name: string
  service_type: string
  description: string
  pricing_model: string
  base_price: number | null
  hourly_rate: number | null
  default_sla_hours: number
  created_at: string
}

export interface PMJob {
  id: number
  job_number: string
  name: string
  client_name: string | null
  status: string
  priority: string
  budget_hours: number
  actual_hours: number
  budget_amount: number | null
  actual_amount: number | null
  due_date: string | null
  assignee: string | null
  created_at: string
}

export interface PMTask {
  id: number
  name: string
  job_name: string | null
  status: string
  priority: string
  estimated_hours: number
  actual_hours: number
  due_date: string | null
  assignee: string | null
  approval_required: boolean
  created_at: string
}

export interface TimeEntry {
  id: number
  user_name: string | null
  job_name: string | null
  date: string
  hours: number
  description: string
  billable: boolean
  hourly_rate: number | null
  status: string
  created_at: string
}

export interface WIPEntry {
  id: number
  job_name: string | null
  date: string
  hours: number | null
  billing_amount: number | null
  write_up_amount: number | null
  write_off_amount: number | null
  status: string
  created_at: string
}

export interface PMInvoice {
  id: number
  invoice_number: string
  client_name: string | null
  invoice_date: string
  due_date: string | null
  total_amount: number | null
  status: string
  sent_at: string | null
  paid_at: string | null
  created_at: string
}

export interface PMDeadline {
  id: number
  name: string
  client_name: string | null
  deadline_type: string
  regulatory_type: string
  due_date: string
  status: string
  readiness_percentage: number
  escalated: boolean
  created_at: string
}

export interface PMSLA {
  id: number
  name: string
  service_type: string
  response_time_hours: number
  resolution_time_hours: number
  uptime_percentage: number | null
  created_at: string
}

export interface QualityReview {
  id: number
  job_name: string | null
  reviewer_name: string | null
  review_type: string
  sampling_reason: string
  overall_rating: string
  remediation_required: boolean
  completed_at: string | null
  created_at: string
}

export interface RiskRegister {
  id: number
  client_name: string | null
  risk_type: string
  description: string
  likelihood: string
  impact: string
  risk_score: number
  status: string
  owner: string | null
  created_at: string
}

export interface PMHold {
  id: number
  client_name: string | null
  hold_type: string
  reason: string
  applied_by: string | null
  applied_at: string
  is_active: boolean
  affects_filing: boolean
  affects_billing: boolean
}

export interface StaffSkill {
  id: number
  user_name: string | null
  skill_name: string
  skill_category: string
  proficiency_level: string
  certification_name: string
  expiry_date: string | null
  cpd_hours_required: number
  cpd_hours_completed: number
  created_at: string
}

export interface LeaveRequest {
  id: number
  user_name: string | null
  leave_type: string
  start_date: string
  end_date: string
  days_requested: number
  status: string
  approved_by: string | null
  created_at: string
}

export interface WorkflowTemplate {
  id: number
  name: string
  service_type: string
  description: string
  estimated_hours: number
  version: string
  created_at: string
}

export interface EmailTemplate {
  id: number
  name: string
  template_type: string
  subject: string
  created_at: string
}

export interface AutomationRule {
  id: number
  name: string
  description: string
  trigger_event: string
  is_active: boolean
  execution_count: number
  last_executed: string | null
  created_at: string
}

export const practiceManagementApi = {
  getDashboard: (): Promise<PMDashboard> =>
    api.get('/practice-management/dashboard').then(res => res.data),

  getClients: (search?: string): Promise<Client[]> =>
    api.get('/practice-management/clients', { params: { search } }).then(res => res.data),

  getOpportunities: (params?: { client_id?: number; stage?: string }): Promise<Opportunity[]> =>
    api.get('/practice-management/opportunities', { params }).then(res => res.data),

  getProposals: (params?: { status?: string; client_id?: number }): Promise<PMProposal[]> =>
    api.get('/practice-management/proposals', { params }).then(res => res.data),

  getServiceCatalog: (service_type?: string): Promise<ServiceCatalogItem[]> =>
    api.get('/practice-management/service-catalog', { params: { service_type } }).then(res => res.data),

  getJobs: (params?: { status?: string; client_id?: number; assigned_to?: number }): Promise<PMJob[]> =>
    api.get('/practice-management/jobs', { params }).then(res => res.data),

  getTasks: (params?: { job_id?: number; assigned_to?: number; status?: string }): Promise<PMTask[]> =>
    api.get('/practice-management/tasks', { params }).then(res => res.data),

  getTimeEntries: (params?: { user_id?: number; job_id?: number; date_from?: string; date_to?: string }): Promise<TimeEntry[]> =>
    api.get('/practice-management/time-entries', { params }).then(res => res.data),

  getWIPEntries: (params?: { job_id?: number; status?: string }): Promise<WIPEntry[]> =>
    api.get('/practice-management/wip-entries', { params }).then(res => res.data),

  getInvoices: (params?: { client_id?: number; status?: string }): Promise<PMInvoice[]> =>
    api.get('/practice-management/invoices', { params }).then(res => res.data),

  getDeadlines: (params?: { client_id?: number; deadline_type?: string; overdue_only?: boolean }): Promise<PMDeadline[]> =>
    api.get('/practice-management/deadlines', { params }).then(res => res.data),

  getSLAs: (service_type?: string): Promise<PMSLA[]> =>
    api.get('/practice-management/slas', { params: { service_type } }).then(res => res.data),

  getQualityReviews: (params?: { job_id?: number; reviewer_id?: number }): Promise<QualityReview[]> =>
    api.get('/practice-management/quality-reviews', { params }).then(res => res.data),

  getRisks: (params?: { client_id?: number; risk_type?: string }): Promise<RiskRegister[]> =>
    api.get('/practice-management/risks', { params }).then(res => res.data),

  getHolds: (params?: { client_id?: number; active_only?: boolean }): Promise<PMHold[]> =>
    api.get('/practice-management/holds', { params }).then(res => res.data),

  getStaffSkills: (params?: { user_id?: number; skill_category?: string }): Promise<StaffSkill[]> =>
    api.get('/practice-management/staff-skills', { params }).then(res => res.data),

  getLeaveRequests: (params?: { user_id?: number; status?: string }): Promise<LeaveRequest[]> =>
    api.get('/practice-management/leave-requests', { params }).then(res => res.data),

  getWorkflowTemplates: (service_type?: string): Promise<WorkflowTemplate[]> =>
    api.get('/practice-management/workflow-templates', { params: { service_type } }).then(res => res.data),

  getEmailTemplates: (template_type?: string): Promise<EmailTemplate[]> =>
    api.get('/practice-management/email-templates', { params: { template_type } }).then(res => res.data),

  getAutomationRules: (is_active?: boolean): Promise<AutomationRule[]> =>
    api.get('/practice-management/automation-rules', { params: { is_active } }).then(res => res.data),

  getUtilizationReport: (params?: { date_from?: string; date_to?: string }) =>
    api.get('/practice-management/reports/utilization', { params }).then(res => res.data),

  getProfitabilityReport: (params?: { client_id?: number; service_type?: string }) =>
    api.get('/practice-management/reports/profitability', { params }).then(res => res.data),
}

export interface AMLCase {
  id: number
  case_number: string
  client_id: number
  jurisdiction: string
  case_type: string
  status: string
  risk_level: string
  assigned_to: number
  mlro_id: number
  review_due_date: string
  created_at: string
  updated_at: string
}

export interface Individual {
  id: number
  case_id: number
  legal_name: string
  aliases: string[]
  date_of_birth: string
  nationalities: string[]
  tax_ids: Record<string, string>
  document_type: string
  document_number: string
  document_expiry: string
  roles: string[]
  verification_status: string
  created_at: string
}

export interface Entity {
  id: number
  case_id: number
  legal_form: string
  company_number: string
  lei: string
  registered_address: string
  operating_address: string
  tax_residencies: string[]
  tax_ids: Record<string, string>
  verification_status: string
  created_at: string
}

export interface Screening {
  id: number
  case_id: number
  subject_type: string
  subject_id: number
  screening_type: string
  watchlist_name: string
  match_score: number
  match_status: string
  reviewed_by: number
  reviewed_at: string
  rationale: string
  created_at: string
}

export interface RiskAssessment {
  id: number
  case_id: number
  client_risk_score: number
  geography_risk_score: number
  product_risk_score: number
  delivery_risk_score: number
  overall_risk_level: string
  risk_factors: Record<string, any>
  assessment_date: string
  assessed_by: number
}

export interface SARReport {
  id: number
  case_id: number
  report_type: string
  jurisdiction: string
  suspicion_reason: string
  transaction_details: Record<string, any>
  filing_status: string
  filed_by: number
  filed_at: string
  acknowledgment_ref: string
  tipping_off_applied: boolean
  created_at: string
}

export const amlKycApi = {
  getDashboardStats: () =>
    api.get('/aml-kyc/dashboard-stats').then(res => res.data),

  getCases: (params?: { status?: string; risk_level?: string }): Promise<AMLCase[]> =>
    api.get('/aml-kyc/cases', { params }).then(res => res.data),

  getIndividuals: (params?: { case_id?: number }): Promise<Individual[]> =>
    api.get('/aml-kyc/individuals', { params }).then(res => res.data),

  getEntities: (params?: { case_id?: number }): Promise<Entity[]> =>
    api.get('/aml-kyc/entities', { params }).then(res => res.data),

  getScreenings: (params?: { match_status?: string; screening_type?: string }): Promise<Screening[]> =>
    api.get('/aml-kyc/screenings', { params }).then(res => res.data),

  getRiskAssessments: (params?: { case_id?: number }): Promise<RiskAssessment[]> =>
    api.get('/aml-kyc/risk-assessments', { params }).then(res => res.data),

  getSARReports: (params?: { filing_status?: string; jurisdiction?: string }): Promise<SARReport[]> =>
    api.get('/aml-kyc/sar-reports', { params }).then(res => res.data),

  getInternalReports: () =>
    api.get('/aml-kyc/internal-reports').then(res => res.data),

  getAMLDocuments: () =>
    api.get('/aml-kyc/documents').then(res => res.data),

  getRiskMatrix: () =>
    api.get('/aml-kyc/risk-matrix').then(res => res.data),

  createCase: (data: any) =>
    api.post('/aml-kyc/cases', data).then(res => res.data),
}

export interface TMEngagement {
  id: number
  client_id: number
  name: string
  description: string
  fee_arrangement: string
  budget_hours: number
  budget_amount: number
  fee_cap: number
  currency: string
  billing_plan: string
  status: string
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface TMTimeEntry {
  id: number
  user_id: number
  engagement_id: number
  task_code_id: number
  date: string
  hours: number
  rate: number
  currency: string
  narrative: string
  billable: boolean
  status: string
  submitted_at: string
  approved_at: string
  created_at: string
  updated_at: string
}

export interface TMWIPItem {
  id: number
  engagement_id: number
  time_entry_id?: number
  expense_id?: number
  standard_value: number
  billing_value: number
  currency: string
  status: string
  write_up_down: number
  write_off_reason?: string
  created_at: string
  updated_at: string
}

export interface TMInvoice {
  id: number
  client_id: number
  invoice_number: string
  invoice_date: string
  due_date: string
  currency: string
  subtotal: number
  tax_amount: number
  total_amount: number
  status: string
  payment_terms: string
  notes: string
  pdf_url?: string
  issued_at?: string
  paid_at?: string
  created_at: string
  updated_at: string
}

export interface TMRetainerAccount {
  id: number
  client_id: number
  engagement_id?: number
  account_name: string
  currency: string
  balance: number
  target_balance?: number
  low_balance_threshold?: number
  status: string
  created_at: string
  updated_at: string
}

export interface TMExpense {
  id: number
  date: string
  amount: number
  description: string
  category: string
  billable: boolean
  status: string
}

export interface TMRateCard {
  id: number
  role: string
  rate: number
  currency: string
}

export const timeFeesApi = {
  getDashboardStats: () =>
    api.get('/time-fees/dashboard').then(res => res.data),
  
  getEngagements: (params?: { status?: string; client_id?: number }): Promise<TMEngagement[]> =>
    api.get('/time-fees/engagements', { params }).then(res => res.data),
  createEngagement: (data: Partial<TMEngagement>) =>
    api.post('/time-fees/engagements', data).then(res => res.data),
  updateEngagement: (id: number, data: Partial<TMEngagement>) =>
    api.put(`/time-fees/engagements/${id}`, data).then(res => res.data),
  deleteEngagement: (id: number) =>
    api.delete(`/time-fees/engagements/${id}`).then(res => res.data),
  
  getTimeEntries: (params?: { engagement_id?: number; user_id?: number; start_date?: string; end_date?: string }): Promise<TMTimeEntry[]> =>
    api.get('/time-fees/time-entries', { params }).then(res => res.data),
  createTimeEntry: (data: Partial<TMTimeEntry>) =>
    api.post('/time-fees/time-entries', data).then(res => res.data),
  updateTimeEntry: (id: number, data: Partial<TMTimeEntry>) =>
    api.put(`/time-fees/time-entries/${id}`, data).then(res => res.data),
  deleteTimeEntry: (id: number) =>
    api.delete(`/time-fees/time-entries/${id}`).then(res => res.data),
  
  getWIPItems: (params?: { engagement_id?: number; status?: string }): Promise<TMWIPItem[]> =>
    api.get('/time-fees/wip-items', { params }).then(res => res.data),
  
  getInvoices: (params?: { status?: string; client_id?: number }): Promise<TMInvoice[]> =>
    api.get('/time-fees/invoices', { params }).then(res => res.data),
  createInvoice: (data: Partial<TMInvoice>) =>
    api.post('/time-fees/invoices', data).then(res => res.data),
  updateInvoice: (id: number, data: Partial<TMInvoice>) =>
    api.put(`/time-fees/invoices/${id}`, data).then(res => res.data),
  deleteInvoice: (id: number) =>
    api.delete(`/time-fees/invoices/${id}`).then(res => res.data),
  
  getRetainerAccounts: (params?: { client_id?: number; status?: string }): Promise<TMRetainerAccount[]> =>
    api.get('/time-fees/retainer-accounts', { params }).then(res => res.data),
  createRetainerAccount: (data: Partial<TMRetainerAccount>) =>
    api.post('/time-fees/retainer-accounts', data).then(res => res.data),
  updateRetainerAccount: (id: number, data: Partial<TMRetainerAccount>) =>
    api.put(`/time-fees/retainer-accounts/${id}`, data).then(res => res.data),
  deleteRetainerAccount: (id: number) =>
    api.delete(`/time-fees/retainer-accounts/${id}`).then(res => res.data),
  
  getExpenses: (params?: { date_from?: string; date_to?: string; user_id?: number }): Promise<TMExpense[]> =>
    api.get('/time-fees/expenses', { params }).then(res => res.data),
  createExpense: (data: Partial<TMExpense>) =>
    api.post('/time-fees/expenses', data).then(res => res.data),
  updateExpense: (id: number, data: Partial<TMExpense>) =>
    api.put(`/time-fees/expenses/${id}`, data).then(res => res.data),
  deleteExpense: (id: number) =>
    api.delete(`/time-fees/expenses/${id}`).then(res => res.data),
  
  getRateCards: (): Promise<TMRateCard[]> =>
    api.get('/time-fees/rate-cards').then(res => res.data),
  createRateCard: (data: Partial<TMRateCard>) =>
    api.post('/time-fees/rate-cards', data).then(res => res.data),
  updateRateCard: (id: number, data: Partial<TMRateCard>) =>
    api.put(`/time-fees/rate-cards/${id}`, data).then(res => res.data),
  deleteRateCard: (id: number) =>
    api.delete(`/time-fees/rate-cards/${id}`).then(res => res.data),
  
  getUtilizationReport: (params?: { period?: string; user_id?: number }) =>
    api.get('/time-fees/reports/utilization', { params }).then(res => res.data),
  getRealizationReport: (params?: { period?: string; engagement_id?: number }) =>
    api.get('/time-fees/reports/realization', { params }).then(res => res.data)
}

export const bookkeepingApi = {
  getDashboardStats: () => api.get('/bookkeeping/dashboard-stats'),
  getChartOfAccounts: () => api.get('/bookkeeping/chart-of-accounts'),
  getBankAccounts: () => api.get('/bookkeeping/bank-accounts'),
  getCustomers: () => api.get('/bookkeeping/customers'),
  getSuppliers: () => api.get('/bookkeeping/suppliers'),
  getSalesInvoices: () => api.get('/bookkeeping/sales-invoices'),
  getPurchaseBills: () => api.get('/bookkeeping/purchase-bills'),
  getJournalEntries: () => api.get('/bookkeeping/journal-entries'),
  getFixedAssets: () => api.get('/bookkeeping/fixed-assets'),
  getVATCodes: () => api.get('/bookkeeping/vat-codes'),
  getCurrencies: () => api.get('/bookkeeping/currencies'),
  getVATReturns: () => api.get('/bookkeeping/vat-returns'),
  getBankTransactions: () => api.get('/bookkeeping/bank-transactions'),
  getExpenseClaims: () => api.get('/bookkeeping/expense-claims'),
  getTrialBalance: () => api.get('/bookkeeping/reports/trial-balance'),
  getAgedReceivables: () => api.get('/bookkeeping/reports/aged-receivables'),
  getAgedPayables: () => api.get('/bookkeeping/reports/aged-payables'),
  createCustomer: (data: any) => api.post('/bookkeeping/customers', data),
  createSupplier: (data: any) => api.post('/bookkeeping/suppliers', data),
  createSalesInvoice: (data: any) => api.post('/bookkeeping/sales-invoices', data),
  createPurchaseBill: (data: any) => api.post('/bookkeeping/purchase-bills', data),
  createJournalEntry: (data: any) => api.post('/bookkeeping/journal-entries', data)
}

export default api

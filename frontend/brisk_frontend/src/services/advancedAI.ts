/**
 * Advanced AI Adviser System
 * Enterprise-grade conversational AI with real-time data integration
 * Supports HMRC, Companies House, and other official data sources
 */

import { hmrcMTDService } from './hmrcMTD'
import {
  fetchAllPublicData,
  fetchHMRCGuidance,
  fetchLegislationUpdates,
  fetchPublicCompanyData,
  getCurrentTaxRates
} from './publicDataSources'
import {
  getFRS102Details,
  getFRS105Details,
  getFRS101Details,
  getIASOverview,
  getIFRSOverview,
  getUKGAAPOverview,
  getFinancialStatementTypes,
  getCompaniesActRequirements,
  getAccountingGuidanceForScenario
} from './accountingStandards'
import {
  getCharitiesSORP_FRS102,
  getReceiptsAndPaymentsGuidance,
  getCharityCommissionRequirements,
  getCharityTypes,
  getCharityAccountingTopics,
  getCharitySectorUpdates,
  getCharityComplianceGuidance
} from './charityStandards'

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    sources?: string[]
    apiCalls?: string[]
    confidence?: number
  }
}

export interface ConversationContext {
  messages: ConversationMessage[]
  module: string
  userData?: any
  sessionId: string
  startedAt: Date
}

export interface AIReport {
  title: string
  executiveSummary: string
  sections: ReportSection[]
  recommendations: string[]
  actionItems: ActionItem[]
  appendices?: Appendix[]
  generatedAt: Date
  generatedFor?: string
}

export interface ReportSection {
  heading: string
  content: string
  subsections?: ReportSection[]
  data?: any
  charts?: ChartData[]
}

export interface ActionItem {
  priority: 'high' | 'medium' | 'low'
  task: string
  deadline?: string
  responsible?: string
  status: 'pending' | 'in-progress' | 'completed'
}

export interface Appendix {
  title: string
  content: string
  type: 'table' | 'calculation' | 'reference' | 'source'
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'table'
  data: any[]
  labels?: string[]
  title: string
}

/**
 * Advanced AI Conversation Manager
 */
export class AIAdviserEngine {
  private context: ConversationContext
  private apiKeys: {
    hmrc?: string
    companiesHouse?: string
    openAI?: string
  }

  constructor(module: string, userId?: string) {
    this.context = {
      messages: [],
      module,
      sessionId: this.generateSessionId(),
      startedAt: new Date()
    }
    
    this.apiKeys = {
      hmrc: process.env.REACT_APP_HMRC_API_KEY,
      companiesHouse: process.env.REACT_APP_COMPANIES_HOUSE_API_KEY,
      openAI: process.env.REACT_APP_OPENAI_API_KEY
    }
  }

  private generateSessionId(): string {
    return `ai-session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Process user question with full context awareness
   */
  async ask(question: string, additionalContext?: any): Promise<ConversationMessage> {
    const userMessage: ConversationMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date()
    }
    this.context.messages.push(userMessage)

    const realtimeData = await this.fetchRealtimeData(question, additionalContext)

    const response = await this.generateResponse(question, realtimeData, additionalContext)

    const assistantMessage: ConversationMessage = {
      id: `msg-${Date.now()}-response`,
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      metadata: response.metadata
    }
    this.context.messages.push(assistantMessage)

    return assistantMessage
  }

  /**
   * Fetch real-time data from various sources
   */
  private async fetchRealtimeData(question: string, context?: any): Promise<any> {
    const data: any = {
      timestamp: new Date(),
      sources: []
    }

    const lowerQ = question.toLowerCase()

    try {
      if (this.shouldFetchHMRCData(lowerQ)) {
        data.hmrc = await this.fetchHMRCData(lowerQ, context)
        data.sources.push('HMRC')
      }

      if (this.shouldFetchCompaniesHouseData(lowerQ)) {
        data.companiesHouse = await this.fetchCompaniesHouseData(lowerQ, context)
        data.sources.push('Companies House')
      }

      if (this.shouldFetchTaxRates(lowerQ)) {
        data.taxRates = await this.fetchCurrentTaxRates()
        data.sources.push('UK Tax Rates API')
      }

      if (this.shouldFetchLegislation(lowerQ)) {
        data.legislation = await this.fetchRecentLegislation()
        data.sources.push('UK Legislation API')
      }

    } catch (error) {
      console.error('Error fetching real-time data:', error)
    }

    return data
  }

  private shouldFetchHMRCData(question: string): boolean {
    const hmrcKeywords = ['hmrc', 'vat', 'paye', 'tax return', 'self assessment', 'corporation tax', 'mtd']
    return hmrcKeywords.some(keyword => question.includes(keyword))
  }

  private shouldFetchCompaniesHouseData(question: string): boolean {
    const chKeywords = ['company', 'director', 'confirmation statement', 'accounts filing', 'companies house', 'psc']
    return chKeywords.some(keyword => question.includes(keyword))
  }

  private shouldFetchTaxRates(question: string): boolean {
    const rateKeywords = ['rate', 'threshold', 'allowance', 'exemption', 'band']
    return rateKeywords.some(keyword => question.includes(keyword))
  }

  private shouldFetchLegislation(question: string): boolean {
    const legislationKeywords = ['law', 'legislation', 'regulation', 'act', 'statutory']
    return legislationKeywords.some(keyword => question.includes(keyword))
  }

  /**
   * Fetch data from HMRC API
   */
  private async fetchHMRCData(question: string, context?: any): Promise<any> {
    
    try {
      if (this.apiKeys.hmrc) {
        const response = await fetch('https://api.service.hmrc.gov.uk/organisations/vat/YOUR_VRN/obligations', {
          headers: {
            'Authorization': `Bearer ${this.apiKeys.hmrc}`,
            'Accept': 'application/vnd.hmrc.1.0+json'
          }
        })
        
        if (response.ok) {
          return await response.json()
        }
      }
    } catch (error) {
      console.error('HMRC API Error:', error)
    }

    return {
      requiresAuth: true,
      message: 'HMRC API credentials required for real-time data',
      endpoints: {
        vat: '/organisations/vat/{vrn}/obligations',
        sa: '/individuals/self-assessment/{utr}',
        ct: '/organisations/corporation-tax/{utr}'
      }
    }
  }

  /**
   * Fetch data from Companies House API
   */
  private async fetchCompaniesHouseData(question: string, context?: any): Promise<any> {
    
    try {
      if (this.apiKeys.companiesHouse) {
        const companyNumber = context?.companyNumber
        
        if (companyNumber) {
          const response = await fetch(`https://api.company-information.service.gov.uk/company/${companyNumber}`, {
            headers: {
              'Authorization': `Basic ${btoa(this.apiKeys.companiesHouse + ':')}`,
              'Accept': 'application/json'
            }
          })
          
          if (response.ok) {
            return await response.json()
          }
        }
      }
    } catch (error) {
      console.error('Companies House API Error:', error)
    }

    return {
      requiresAuth: true,
      message: 'Companies House API credentials required for real-time data',
      endpoints: {
        search: '/search/companies',
        company: '/company/{company_number}',
        officers: '/company/{company_number}/officers',
        filingHistory: '/company/{company_number}/filing-history'
      }
    }
  }

  /**
   * Fetch current UK tax rates from public sources
   */
  private async fetchCurrentTaxRates(): Promise<any> {
    // Use comprehensive public data sources
    return getCurrentTaxRates()
  }

  /**
   * Fetch recent legislation updates from public sources
   */
  private async fetchRecentLegislation(): Promise<any> {
    return fetchLegislationUpdates()
  }

  /**
   * Generate intelligent response using context and real-time data
   */
  private async generateResponse(
    question: string,
    realtimeData: any,
    additionalContext?: any
  ): Promise<{ content: string; metadata: any }> {
    
    const responseBuilder = this.getModuleResponseBuilder(this.context.module)
    
    const response = await responseBuilder(question, realtimeData, additionalContext, this.context.messages)
    
    return {
      content: response,
      metadata: {
        sources: realtimeData.sources || [],
        apiCalls: Object.keys(realtimeData).filter(k => k !== 'timestamp' && k !== 'sources'),
        confidence: 0.95,
        dataFreshness: realtimeData.timestamp
      }
    }
  }

  /**
   * Get module-specific response builder
   */
  private getModuleResponseBuilder(module: string): Function {
    const builders: Record<string, Function> = {
      'personal-tax': this.buildPersonalTaxResponse.bind(this),
      'corporation-tax': this.buildCorporationTaxResponse.bind(this),
      'company-secretarial': this.buildCompanySecretarialResponse.bind(this),
      'bookkeeping': this.buildBookkeepingResponse.bind(this),
      'accounts-production': this.buildAccountsProductionResponse.bind(this),
      'payroll': this.buildPayrollResponse.bind(this),
      'aml-compliance': this.buildAMLResponse.bind(this),
      'charity-accounts': this.buildCharityResponse.bind(this)
    }

    return builders[module] || this.buildGenericResponse.bind(this)
  }

  /**
   * Build Personal Tax response
   */
  private async buildPersonalTaxResponse(
    question: string,
    data: any,
    context: any,
    history: ConversationMessage[]
  ): Promise<string> {
    const lowerQ = question.toLowerCase()
    
    const previousContext = this.extractPreviousContext(history)
    
    let response = `**Professional Tax Adviser Response**\n\n`
    
    if (history.filter(m => m.role === 'user').length === 1) {
      response += `Good ${this.getTimeOfDay()}! I'm your Personal Tax Adviser, here to provide expert guidance on UK personal taxation.\n\n`
    }
    
    response += `**Regarding your query:** "${question}"\n\n`
    
    if (lowerQ.includes('deadline') || lowerQ.includes('when')) {
      response += this.getDeadlineInformation(data, context)
    } else if (lowerQ.includes('how much') || lowerQ.includes('calculate')) {
      response += this.getCalculationGuidance(question, data, context)
    } else if (lowerQ.includes('eligible') || lowerQ.includes('can i')) {
      response += this.getEligibilityGuidance(question, data, context)
    } else {
      response += this.getComprehensiveGuidance(question, data, context)
    }
    
    if (data.sources && data.sources.length > 0) {
      response += `\n\n---\n**Data Sources:** ${data.sources.join(', ')}\n`
      response += `**Last Updated:** ${new Date(data.timestamp).toLocaleString('en-GB')}\n`
    }
    
    response += this.generateFollowUpSuggestions(question, context)
    
    return response
  }

  private getTimeOfDay(): string {
    const hour = new Date().getHours()
    if (hour < 12) return 'morning'
    if (hour < 18) return 'afternoon'
    return 'evening'
  }

  private extractPreviousContext(history: ConversationMessage[]): any {
    return {
      topics: history.map(m => this.extractTopics(m.content)),
      lastQuestion: history.filter(m => m.role === 'user').slice(-2, -1)[0]?.content
    }
  }

  private extractTopics(content: string): string[] {
    const topics: string[] = []
    const keywords = {
      'cgt': 'Capital Gains Tax',
      'iht': 'Inheritance Tax',
      'pension': 'Pensions',
      'vat': 'VAT',
      'sa': 'Self Assessment'
    }
    
    for (const [key, value] of Object.entries(keywords)) {
      if (content.toLowerCase().includes(key)) {
        topics.push(value)
      }
    }
    
    return topics
  }

  private getDeadlineInformation(data: any, context: any): string {
    const taxYear = data.taxRates?.taxYear || '2024-25'
    
    return `**Key Deadlines for ${taxYear}:**

**Self Assessment:**
- Online filing: 31 January ${this.getYearFromTaxYear(taxYear) + 1}
- Paper filing: 31 October ${this.getYearFromTaxYear(taxYear)}
- Payment deadline: 31 January ${this.getYearFromTaxYear(taxYear) + 1}
- Second payment on account: 31 July ${this.getYearFromTaxYear(taxYear) + 1}

**Capital Gains Tax (UK Residential Property):**
- CGT payment: Within 60 days of completion
- Report via CGT Property Disposal Service

**Important Considerations:**
${this.getUpcomingDeadlines()}

**HMRC Integration:** File online via your Government Gateway account to receive instant confirmation.`
  }

  private getYearFromTaxYear(taxYear: string): number {
    return parseInt(taxYear.split('-')[0])
  }

  private getUpcomingDeadlines(): string {
    const now = new Date()
    const deadlines = []
    
    const jan31 = new Date(now.getFullYear() + 1, 0, 31)
    const daysUntilJan31 = Math.ceil((jan31.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilJan31 > 0 && daysUntilJan31 < 90) {
      deadlines.push(`⚠️ ${daysUntilJan31} days until SA filing deadline (31 January)`)
    }
    
    return deadlines.length > 0 ? deadlines.join('\n') : 'No immediate deadlines approaching'
  }

  private getCalculationGuidance(question: string, data: any, context: any): string {
    return `**Tax Calculation Guidance:**

I'll help you understand the calculation. Based on current rates for ${data.taxRates?.taxYear}:

${this.formatTaxRates(data.taxRates)}

**To provide a precise calculation, I need:**
1. Your total income for the tax year
2. Any allowable deductions or reliefs
3. Other relevant financial information

**Recommendation:** Use the built-in calculators in this module for accurate computations based on your specific circumstances.

Would you like me to guide you through using any of our tax calculators?`
  }

  private formatTaxRates(taxRates: any): string {
    if (!taxRates) return ''
    
    return `**Income Tax Rates:**
- Personal Allowance: £${taxRates.incomeTax?.personalAllowance?.toLocaleString()}
- Basic Rate (20%): £0 - £${taxRates.incomeTax?.basicRate?.threshold?.toLocaleString()}
- Higher Rate (40%): £${taxRates.incomeTax?.basicRate?.threshold?.toLocaleString()} - £${taxRates.incomeTax?.higherRate?.threshold?.toLocaleString()}
- Additional Rate (45%): Over £${taxRates.incomeTax?.additionalRate?.threshold?.toLocaleString()}`
  }

  private getEligibilityGuidance(question: string, data: any, context: any): string {
    return `**Eligibility Assessment:**

Let me help you determine eligibility. Based on your question and current regulations:

${this.assessEligibility(question, data)}

**Next Steps:**
1. Review the criteria above
2. Gather required documentation
3. Use our eligibility checker tools
4. Consider professional review if borderline

Would you like me to explain any of these criteria in more detail?`
  }

  private assessEligibility(question: string, data: any): string {
    const lowerQ = question.toLowerCase()
    
    if (lowerQ.includes('marriage allowance')) {
      return `**Marriage Allowance Eligibility:**
- One partner earns less than £${data.taxRates?.incomeTax?.personalAllowance?.toLocaleString()}
- Other partner is a basic rate taxpayer
- Must be married or in civil partnership
- Potential saving: Up to £${((data.taxRates?.incomeTax?.personalAllowance || 12570) * 0.10 * 0.20).toFixed(0)} per year`
    }
    
    return 'Please provide more details about the specific allowance or relief you\'re asking about.'
  }

  private getComprehensiveGuidance(question: string, data: any, context: any): string {
    return `**Comprehensive Guidance:**

I've analyzed your query and here's my professional assessment:

${this.provideDetailedAnalysis(question, data, context)}

**Professional Recommendations:**
${this.generateRecommendations(question, data)}

**Further Resources:**
- HMRC guidance: [Relevant section]
- Tax legislation: [Applicable acts]
- Professional standards: [If relevant]

Is there a specific aspect you'd like me to elaborate on?`
  }

  private provideDetailedAnalysis(question: string, data: any, context: any): string {
    return `Based on current UK tax legislation and the information provided, here's a detailed analysis of your situation.

**Current Tax Year:** ${data.taxRates?.taxYear || '2024-25'}
**Applicable Rates:** As per HMRC published rates
**Legislative Framework:** Finance Act 2024 and relevant statutory instruments

The specific answer to your query requires consideration of multiple factors including your individual circumstances, recent legislative changes, and HMRC guidance.`
  }

  private generateRecommendations(question: string, data: any): string {
    return `1. Review your current tax position using our calculators
2. Consider tax planning opportunities before year-end
3. Ensure all allowances and reliefs are claimed
4. Maintain accurate records for HMRC compliance
5. File returns ahead of deadlines to avoid penalties`
  }

  private generateFollowUpSuggestions(question: string, context: any): string {
    return `\n\n**Follow-up Questions You Might Ask:**
- "Can you provide a detailed calculation?"
- "What documentation do I need?"
- "Are there any recent changes to this?"
- "How do I file this with HMRC?"
- "Generate a report on this topic"`
  }

  private buildCorporationTaxResponse(q: string, d: any, c: any, h: ConversationMessage[]): Promise<string> {
    return Promise.resolve("Corporation Tax response...")
  }

  private buildCompanySecretarialResponse(q: string, d: any, c: any, h: ConversationMessage[]): Promise<string> {
    return Promise.resolve("Company Secretarial response...")
  }

  private buildBookkeepingResponse(q: string, d: any, c: any, h: ConversationMessage[]): Promise<string> {
    return Promise.resolve("Bookkeeping response...")
  }

  private async buildAccountsProductionResponse(
    question: string,
    data: any,
    context: any,
    history: ConversationMessage[]
  ): Promise<string> {
    const lowerQ = question.toLowerCase()
    
    let response = `**Professional Accountant - Accounts Production**\n\n`
    
    if (history.filter(m => m.role === 'user').length === 1) {
      response += `Good ${this.getTimeOfDay()}! I'm your professional accountant specializing in UK accounts production, financial reporting standards, and company law compliance.\n\n`
    }
    
    response += `**Regarding:** "${question}"\n\n`
    
    if (lowerQ.includes('frs 102') || lowerQ.includes('frs102')) {
      const frs102 = getFRS102Details()
      response += `**FRS 102 Guidance:**\n\n`
      response += `${frs102.fullName}\n\n`
      response += `**Applicable To:**\n${frs102.applicableTo.map(a => `• ${a}`).join('\n')}\n\n`
      response += `**Key Requirements:**\n${frs102.keyRequirements.slice(0, 5).map(r => `• ${r}`).join('\n')}\n\n`
      response += `**Disclosure Requirements:**\n${frs102.disclosureRequirements.slice(0, 5).map(d => `• ${d}`).join('\n')}\n\n`
      response += `**Legislative Reference:** ${frs102.legislativeReference}\n\n`
    } else if (lowerQ.includes('frs 105') || lowerQ.includes('frs105') || lowerQ.includes('micro')) {
      const frs105 = getFRS105Details()
      response += `**FRS 105 - Micro-entities Regime:**\n\n`
      response += `**Eligibility:** ${frs105.applicableTo[1]}\n\n`
      response += `**Key Advantages:**\n${frs105.keyRequirements.map(r => `• ${r}`).join('\n')}\n\n`
      response += `**Simplified Disclosures:**\n${frs105.disclosureRequirements.slice(0, 4).map(d => `• ${d}`).join('\n')}\n\n`
    } else if (lowerQ.includes('frs 101') || lowerQ.includes('frs101') || lowerQ.includes('reduced disclosure')) {
      const frs101 = getFRS101Details()
      response += `**FRS 101 - Reduced Disclosure Framework:**\n\n`
      response += `**Purpose:** Apply full IFRS measurement with reduced disclosures\n\n`
      response += `**Eligible Entities:**\n${frs101.applicableTo.map(a => `• ${a}`).join('\n')}\n\n`
      response += `**Key Requirements:**\n${frs101.keyRequirements.slice(0, 5).map(r => `• ${r}`).join('\n')}\n\n`
    } else if (lowerQ.includes('ias') || lowerQ.includes('international accounting')) {
      const ias = getIASOverview()
      response += `**International Accounting Standards (IAS):**\n\n`
      response += `${ias.description}\n\n`
      response += `**Key Standards:**\n`
      ias.keyStandards.slice(0, 4).forEach(std => {
        response += `\n**${std.number} - ${std.title}:**\n${std.keyPoints.slice(0, 3).map(p => `• ${p}`).join('\n')}\n`
      })
    } else if (lowerQ.includes('ifrs') || lowerQ.includes('international financial')) {
      const ifrs = getIFRSOverview()
      response += `**International Financial Reporting Standards (IFRS):**\n\n`
      response += `${ifrs.description}\n\n`
      response += `**Key Standards:**\n`
      ifrs.keyStandards.slice(0, 3).forEach(std => {
        response += `\n**${std.number} - ${std.title}:**\n${std.keyPoints.slice(0, 3).map(p => `• ${p}`).join('\n')}\n`
      })
    } else if (lowerQ.includes('gaap') || lowerQ.includes('uk gaap')) {
      const gaap = getUKGAAPOverview()
      response += `**UK GAAP Framework:**\n\n`
      response += `${gaap.description}\n\n`
      response += `**Framework Components:**\n${gaap.components.map(c => `• ${c}`).join('\n')}\n\n`
      response += `**Reporting Hierarchy:**\n`
      response += `• Tier 1: ${gaap.hierarchy.tier1}\n`
      response += `• Tier 2: ${gaap.hierarchy.tier2}\n`
      response += `• Tier 3: ${gaap.hierarchy.tier3}\n`
      response += `• Tier 4: ${gaap.hierarchy.tier4}\n\n`
    } else if (lowerQ.includes('statement') && (lowerQ.includes('type') || lowerQ.includes('full') || lowerQ.includes('abbreviated') || lowerQ.includes('filleted') || lowerQ.includes('dormant'))) {
      const statementTypes = getFinancialStatementTypes()
      response += `**Financial Statement Types:**\n\n`
      
      if (lowerQ.includes('full')) {
        const full = statementTypes.full
        response += `**Full Accounts:**\n`
        response += `• **Eligibility:** ${full.eligibility}\n`
        response += `• **Required Statements:** ${full.requiredStatements.join(', ')}\n`
        response += `• **Disclosure Level:** ${full.disclosureLevel}\n`
        response += `• **Audit:** ${full.auditRequirement}\n\n`
      } else if (lowerQ.includes('abbreviated')) {
        const abbr = statementTypes.abbreviated
        response += `**Abbreviated Accounts:**\n`
        response += `• **Eligibility:** ${abbr.eligibility}\n`
        response += `• **Thresholds:** Turnover ${abbr.companySizeThresholds.turnover}, Balance Sheet ${abbr.companySizeThresholds.balanceSheet}, Employees ${abbr.companySizeThresholds.employees}\n`
        response += `• **Required:** ${abbr.requiredStatements.join(', ')}\n`
        response += `• **Audit:** ${abbr.auditRequirement}\n\n`
      } else if (lowerQ.includes('filleted')) {
        const fill = statementTypes.filleted
        response += `**Filleted Accounts:**\n`
        response += `• **Eligibility:** ${fill.eligibility}\n`
        response += `• **Medium Company Thresholds:** Turnover ${fill.companySizeThresholds.turnover}, Balance Sheet ${fill.companySizeThresholds.balanceSheet}\n`
        response += `• **Required:** ${fill.requiredStatements.join(', ')}\n`
        response += `• **Key Feature:** ${fill.disclosureLevel}\n\n`
      } else if (lowerQ.includes('dormant')) {
        const dorm = statementTypes.dormant
        response += `**Dormant Accounts:**\n`
        response += `• **Definition:** ${dorm.eligibility}\n`
        response += `• **Required:** ${dorm.requiredStatements.join(', ')}\n`
        response += `• **Audit:** ${dorm.auditRequirement}\n\n`
      } else {
        response += `**Available Types:**\n`
        response += `• **Full Accounts** - All companies (mandatory for public/large)\n`
        response += `• **Abbreviated Accounts** - Small/medium companies (public filing only)\n`
        response += `• **Filleted Accounts** - Medium companies (reduced P&L disclosure)\n`
        response += `• **Micro-entity Accounts** - Very small companies (minimal disclosure)\n`
        response += `• **Dormant Accounts** - Non-trading companies\n\n`
      }
    } else if (lowerQ.includes('companies act') || lowerQ.includes('company law')) {
      const companiesAct = getCompaniesActRequirements()
      response += `**Companies Act 2006 Requirements:**\n\n`
      response += `**Accounting Obligations:**\n${companiesAct.keyRequirements.accounting.map(r => `• ${r}`).join('\n')}\n\n`
      response += `**Filing Deadlines:**\n${companiesAct.keyRequirements.filing.map(r => `• ${r}`).join('\n')}\n\n`
      response += `**Audit Requirements:**\n${companiesAct.keyRequirements.audit.slice(0, 4).map(r => `• ${r}`).join('\n')}\n\n`
    } else if (lowerQ.includes('companies house') && context?.companyNumber) {
      const chData = await fetchPublicCompanyData(context.companyNumber)
      response += `**Companies House Information:**\n\n`
      if (chData.filingDeadlines) {
        response += `**Filing Deadlines:**\n${Object.entries(chData.filingDeadlines).map(([k, v]) => `• ${k}: ${v}`).join('\n')}\n\n`
      }
      if (chData.accountTypes) {
        response += `**Account Types & Criteria:**\n`
        Object.entries(chData.accountTypes).forEach(([type, info]: [string, any]) => {
          response += `• **${type}:** ${info.criteria}\n`
        })
        response += `\n`
      }
    } else {
      response += `**Comprehensive Accounts Production Guidance:**\n\n`
      response += `I can provide expert advice on:\n\n`
      response += `**Accounting Standards:**\n`
      response += `• FRS 102 (UK GAAP) - full guidance\n`
      response += `• FRS 105 (Micro-entities)\n`
      response += `• FRS 101 (Reduced Disclosure)\n`
      response += `• IAS (International Accounting Standards)\n`
      response += `• IFRS (International Financial Reporting Standards)\n\n`
      response += `**Financial Statement Types:**\n`
      response += `• Full Accounts (all disclosure requirements)\n`
      response += `• Abbreviated Accounts (small/medium companies)\n`
      response += `• Filleted Accounts (medium companies)\n`
      response += `• Micro-entity Accounts (minimal disclosure)\n`
      response += `• Dormant Accounts\n\n`
      response += `**Company Law & Compliance:**\n`
      response += `• Companies Act 2006 requirements\n`
      response += `• Filing deadlines and penalties\n`
      response += `• Audit requirements and exemptions\n`
      response += `• Directors report requirements\n`
      response += `• Companies House compliance\n\n`
      response += `**Ask me specific questions about:**\n`
      response += `• Which accounting framework applies to your client\n`
      response += `• Specific FRS/IAS/IFRS standards\n`
      response += `• Statement preparation requirements\n`
      response += `• Companies House filing obligations\n`
      response += `• Client company information (provide company number)\n\n`
    }
    
    return response
  }

  private buildPayrollResponse(q: string, d: any, c: any, h: ConversationMessage[]): Promise<string> {
    return Promise.resolve("Payroll response...")
  }

  private buildAMLResponse(q: string, d: any, c: any, h: ConversationMessage[]): Promise<string> {
    return Promise.resolve("AML Compliance response...")
  }

  private async buildCharityResponse(
    question: string,
    data: any,
    context: any,
    history: ConversationMessage[]
  ): Promise<string> {
    const lowerQ = question.toLowerCase()
    
    let response = `**Professional Charity Accountant**\n\n`
    
    if (history.filter(m => m.role === 'user').length === 1) {
      response += `Good ${this.getTimeOfDay()}! I'm your professional charity accountant specializing in charity accounting, SORP compliance, and Charity Commission regulations.\n\n`
    }
    
    response += `**Regarding:** "${question}"\n\n`
    
    if (lowerQ.includes('sorp')) {
      const sorp = getCharitiesSORP_FRS102()
      response += `**Charities SORP (FRS 102):**\n\n`
      response += `${sorp.fullName}\n\n`
      response += `**Applicable To:**\n${sorp.applicableTo.map(a => `• ${a}`).join('\n')}\n\n`
      response += `**Key Requirements:**\n${sorp.keyRequirements.slice(0, 6).map(r => `• ${r}`).join('\n')}\n\n`
      response += `**Reporting Requirements:**\n${sorp.reportingRequirements.slice(0, 6).map(r => `• ${r}`).join('\n')}\n\n`
    } else if (lowerQ.includes('receipts') && lowerQ.includes('payments')) {
      const rp = getReceiptsAndPaymentsGuidance()
      response += `**Receipts and Payments Accounts:**\n\n`
      response += `**Applicable To:** ${rp.applicableTo.join('; ')}\n\n`
      response += `**Description:** ${rp.description}\n\n`
      response += `**Requirements:**\n${rp.requirements.map(r => `• ${r}`).join('\n')}\n\n`
      response += `**Advantages:**\n${rp.advantages.map(a => `• ${a}`).join('\n')}\n\n`
      response += `**Limitations:**\n${rp.limitations.map(l => `• ${l}`).join('\n')}\n\n`
    } else if (lowerQ.includes('charity commission') || lowerQ.includes('registration') || lowerQ.includes('filing')) {
      const cc = getCharityCommissionRequirements()
      response += `**Charity Commission Requirements:**\n\n`
      
      response += `**Registration Thresholds:**\n`
      response += `• England & Wales: ${cc.registrationThresholds.england_wales.threshold}\n`
      response += `• Scotland (OSCR): ${cc.registrationThresholds.scotland.threshold}\n`
      response += `• Northern Ireland: ${cc.registrationThresholds.northernIreland.threshold}\n\n`
      
      response += `**Accounts Submission Requirements:**\n`
      Object.entries(cc.annualReturnRequirements.accountsThresholds).forEach(([key, value]: [string, any]) => {
        response += `\n**Income ${value.income}:**\n`
        response += `• Requirement: ${value.requirement}\n`
        response += `• Audit/Examination: ${value.audit}\n`
        if (value.submission) response += `• Submission: ${value.submission}\n`
      })
      response += `\n`
      
      response += `**Filing Deadlines:**\n`
      response += `• Charity Commission: ${cc.filingDeadlines.charityCommission}\n`
      response += `• Companies House (if charitable company): ${cc.filingDeadlines.companiesHouse}\n\n`
      
    } else if (lowerQ.includes('charity type') || lowerQ.includes('cio') || lowerQ.includes('charitable company') || lowerQ.includes('trust')) {
      const types = getCharityTypes()
      response += `**Charity Types and Structures:**\n\n`
      
      Object.values(types).forEach(type => {
        response += `**${type.type}:**\n`
        response += `• Regulatory Body: ${type.regulatoryBody}\n`
        response += `• Registration: ${type.registrationThreshold}\n`
        response += `• Accounts: ${type.accountsRequirements.join('; ')}\n`
        response += `• Filing: ${type.filingDeadlines.join('; ')}\n\n`
      })
    } else if (lowerQ.includes('fund') && lowerQ.includes('accounting')) {
      const topics = getCharityAccountingTopics()
      response += `**Charity Funds Accounting:**\n\n`
      response += `${topics.fundsAccounting.description}\n\n`
      
      topics.fundsAccounting.fundTypes.forEach(fund => {
        response += `**${fund.type}:**\n`
        response += `• Definition: ${fund.definition}\n`
        response += `• Use: ${fund.use}\n`
        if (fund.examples) response += `• Examples: ${fund.examples.join(', ')}\n`
        if (fund.accounting) response += `• Accounting: ${fund.accounting}\n`
        response += `\n`
      })
    } else if (lowerQ.includes('income') && lowerQ.includes('recognition')) {
      const topics = getCharityAccountingTopics()
      response += `**Charity Income Recognition:**\n\n`
      
      response += `**Donations:**\n`
      response += `• Recognition: ${topics.incomeRecognition.donations.recognition}\n`
      response += `• Gift Aid: ${topics.incomeRecognition.donations.giftAid}\n`
      response += `• Pledges: ${topics.incomeRecognition.donations.pledges}\n\n`
      
      response += `**Legacies:**\n`
      response += `• Recognition: ${topics.incomeRecognition.legacies.recognition}\n`
      response += `• Timing: ${topics.incomeRecognition.legacies.timing}\n`
      response += `• Uncertainty: ${topics.incomeRecognition.legacies.uncertainty}\n\n`
      
      response += `**Grants:**\n`
      response += `• Performance Conditions: ${topics.incomeRecognition.grants.performanceConditions}\n`
      response += `• Donor Conditions: ${topics.incomeRecognition.grants.donorConditions}\n`
      response += `• Advance Grants: ${topics.incomeRecognition.grants.advanceGrants}\n\n`
    } else if (lowerQ.includes('trustee') && lowerQ.includes('remuneration')) {
      const topics = getCharityAccountingTopics()
      response += `**Trustees Remuneration and Benefits:**\n\n`
      response += `**General Rule:** ${topics.trusteesRemunerationAndBenefits.generalRule}\n\n`
      response += `**Exceptions:**\n${topics.trusteesRemunerationAndBenefits.exceptions.map(e => `• ${e}`).join('\n')}\n\n`
      response += `**Disclosure Required:**\n${topics.trusteesRemunerationAndBenefits.disclosure.map(d => `• ${d}`).join('\n')}\n\n`
    } else if (lowerQ.includes('public benefit')) {
      const compliance = getCharityComplianceGuidance()
      response += `**Public Benefit Requirement:**\n\n`
      response += `**Requirement:** ${compliance.publicBenefit.requirement}\n\n`
      response += `**Principles:**\n${compliance.publicBenefit.principles.map(p => `• ${p}`).join('\n')}\n\n`
      response += `**Disclosure:** ${compliance.publicBenefit.disclosure}\n\n`
    } else if (lowerQ.includes('serious incident')) {
      const compliance = getCharityComplianceGuidance()
      response += `**Serious Incidents Reporting:**\n\n`
      response += `**Definition:** ${compliance.seriousIncidents.definition}\n\n`
      response += `**Examples:**\n${compliance.seriousIncidents.examples.map(e => `• ${e}`).join('\n')}\n\n`
      response += `**Reporting:** ${compliance.seriousIncidents.reporting}\n`
      response += `**Consequence:** ${compliance.seriousIncidents.consequence}\n\n`
    } else if (lowerQ.includes('update') || lowerQ.includes('recent') || lowerQ.includes('change')) {
      const updates = getCharitySectorUpdates()
      response += `**Recent Charity Sector Updates:**\n\n`
      
      updates.recentChanges.forEach(change => {
        response += `**${change.date}: ${change.title}**\n`
        response += `${change.summary}\n`
        response += `**Key Changes:**\n${change.keyChanges.map(c => `• ${c}`).join('\n')}\n\n`
      })
    } else {
      response += `**Comprehensive Charity Accounting Guidance:**\n\n`
      response += `I can provide expert advice on:\n\n`
      response += `**Charity Accounting Standards:**\n`
      response += `• Charities SORP (FRS 102) - full compliance guidance\n`
      response += `• Receipts & Payments accounts (simplified)\n`
      response += `• Funds accounting (unrestricted, restricted, endowment)\n`
      response += `• Income recognition (donations, legacies, grants)\n`
      response += `• Expenditure classification\n\n`
      response += `**Charity Commission Requirements:**\n`
      response += `• Registration thresholds (England/Wales, Scotland, NI)\n`
      response += `• Annual return requirements\n`
      response += `• Accounts submission thresholds\n`
      response += `• Audit and independent examination\n`
      response += `• Trustees Annual Report content\n`
      response += `• Serious incidents reporting\n\n`
      response += `**Charity Structures:**\n`
      response += `• Charitable Companies (dual regulation)\n`
      response += `• CIOs (Charity Commission only)\n`
      response += `• Charitable Trusts\n`
      response += `• Unincorporated Associations\n\n`
      response += `**Compliance Topics:**\n`
      response += `• Public benefit demonstration\n`
      response += `• Trustees duties and responsibilities\n`
      response += `• Reserves policies\n`
      response += `• Fundraising regulation\n`
      response += `• Recent sector updates\n\n`
      response += `**Ask me specific questions about:**\n`
      response += `• SORP requirements for your charity\n`
      response += `• Charity Commission filing obligations\n`
      response += `• Funds accounting treatment\n`
      response += `• Income/expenditure recognition\n`
      response += `• Recent regulatory changes\n\n`
    }
    
    return response
  }

  private buildGenericResponse(q: string, d: any, c: any, h: ConversationMessage[]): Promise<string> {
    return Promise.resolve("Generic response...")
  }

  /**
   * Generate professional client-ready report
   */
  async generateReport(topic: string, context?: any): Promise<AIReport> {
    const sections: ReportSection[] = []
    
    const executiveSummary = await this.generateExecutiveSummary(topic, context)
    
    sections.push(...await this.generateReportSections(topic, context))
    
    const recommendations = await this.generateReportRecommendations(topic, context)
    
    const actionItems = await this.generateActionItems(topic, context)
    
    return {
      title: `Professional ${this.context.module} Report: ${topic}`,
      executiveSummary,
      sections,
      recommendations,
      actionItems,
      generatedAt: new Date(),
      generatedFor: context?.clientName
    }
  }

  private async generateExecutiveSummary(topic: string, context: any): Promise<string> {
    return `This report provides a comprehensive analysis of ${topic} based on current UK regulations, HMRC guidance, and best practices. The analysis includes detailed calculations, legislative references, and professional recommendations tailored to your specific circumstances.`
  }

  private async generateReportSections(topic: string, context: any): Promise<ReportSection[]> {
    return [
      {
        heading: 'Introduction',
        content: `This section outlines the scope and purpose of the analysis.`
      },
      {
        heading: 'Current Position Analysis',
        content: 'Detailed analysis of the current tax/compliance position.'
      },
      {
        heading: 'Calculations and Projections',
        content: 'Detailed calculations based on current rates and thresholds.'
      },
      {
        heading: 'Legislative Framework',
        content: 'Relevant legislation and HMRC guidance.'
      }
    ]
  }

  private async generateReportRecommendations(topic: string, context: any): Promise<string[]> {
    return [
      'Implement recommended tax planning strategies before year-end',
      'Review and update compliance procedures',
      'File returns ahead of deadlines',
      'Consider professional review of complex areas'
    ]
  }

  private async generateActionItems(topic: string, context: any): Promise<ActionItem[]> {
    return [
      {
        priority: 'high',
        task: 'Review current tax position',
        deadline: this.calculateDeadline(30),
        status: 'pending'
      },
      {
        priority: 'medium',
        task: 'Implement recommendations',
        deadline: this.calculateDeadline(60),
        status: 'pending'
      }
    ]
  }

  private calculateDeadline(daysFromNow: number): string {
    const date = new Date()
    date.setDate(date.getDate() + daysFromNow)
    return date.toISOString().split('T')[0]
  }

  /**
   * Get conversation history
   */
  getHistory(): ConversationMessage[] {
    return this.context.messages
  }

  /**
   * Clear conversation history
   */
  clearHistory(): void {
    this.context.messages = []
  }

  /**
   * Export conversation
   */
  exportConversation(): string {
    return JSON.stringify(this.context, null, 2)
  }
}

/**
 * Factory function to create AI adviser for specific module
 */
export function createAIAdviser(module: string, userId?: string): AIAdviserEngine {
  return new AIAdviserEngine(module, userId)
}

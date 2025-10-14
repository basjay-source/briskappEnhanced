/**
 * AI Adviser Service
 * Provides context-aware AI assistance for different modules with API integrations
 */

export interface AIResponse {
  answer: string
  suggestions?: string[]
  relatedTopics?: string[]
  apiData?: any
}

export interface AIContext {
  module: string
  userData?: any
  recentActivity?: any[]
  specificContext?: any
}

/**
 * Generate AI response based on module context and question
 */
export async function getAIAdvice(
  question: string,
  context: AIContext
): Promise<AIResponse> {
  const { module, userData, recentActivity, specificContext } = context

  await new Promise(resolve => setTimeout(resolve, 1000))

  switch (module) {
    case 'personal-tax':
      return getPersonalTaxAdvice(question, specificContext)
    
    case 'corporation-tax':
      return getCorporationTaxAdvice(question, specificContext)
    
    case 'company-secretarial':
      return getCompanySecretarialAdvice(question, specificContext)
    
    case 'bookkeeping':
      return getBookkeepingAdvice(question, specificContext)
    
    case 'accounts-production':
      return getAccountsProductionAdvice(question, specificContext)
    
    case 'payroll':
      return getPayrollAdvice(question, specificContext)
    
    case 'aml-compliance':
      return getAMLComplianceAdvice(question, specificContext)
    
    case 'charity-accounts':
      return getCharityAccountsAdvice(question, specificContext)
    
    default:
      return {
        answer: 'I can help you with questions about ' + module + '. Please provide more specific details about what you need assistance with.',
        suggestions: ['Try asking about specific tasks', 'Refer to module documentation', 'Contact support for complex queries']
      }
  }
}

/**
 * Personal Tax AI Adviser (HMRC Integration)
 */
function getPersonalTaxAdvice(question: string, context: any): AIResponse {
  const lowerQ = question.toLowerCase()

  if (lowerQ.includes('cgt') || lowerQ.includes('capital gains')) {
    return {
      answer: `**Capital Gains Tax Guidance:**

For the ${context?.taxYear || '2024-25'} tax year, here are the key points:

• **Annual Exemption:** £3,000 (reduced from £6,000 in 2023-24)
• **CGT Rates:** 
  - Basic rate taxpayers: 10% (18% for residential property)
  - Higher/Additional rate: 20% (24% for residential property)

**Key Considerations:**
1. Calculate your taxable gain by deducting acquisition costs, improvement costs, and selling costs
2. Offset losses from previous years if available
3. Consider timing of disposal - spreading over multiple tax years may be beneficial
4. Utilize your annual exemption efficiently
5. Consider transferring assets to spouse/civil partner to use both exemptions

**HMRC Integration:** You can file your CGT return online within 60 days of completion for UK residential property, or include in your Self Assessment for other assets.`,
      suggestions: [
        'Use the CGT Calculator to estimate your liability',
        'Review timing strategies for asset disposals',
        'Check if you have unused losses to carry forward',
        'Consider Marriage Allowance implications'
      ],
      relatedTopics: ['Self Assessment', 'Property Disposal', 'Share Disposal', 'Tax Loss Harvesting']
    }
  }

  if (lowerQ.includes('iht') || lowerQ.includes('inheritance')) {
    return {
      answer: `**Inheritance Tax Planning Guidance:**

Current IHT thresholds for ${context?.taxYear || '2024-25'}:

• **Nil Rate Band (NRB):** £325,000
• **Residence Nil Rate Band (RNRB):** £175,000
• **Combined Maximum:** £500,000 per person (£1m for married couples)
• **IHT Rate:** 40% on estates above threshold

**Planning Strategies:**
1. **Seven-Year Gifting Rule:** Gifts become exempt after 7 years (with taper relief after 3 years)
2. **Annual Gift Exemption:** £3,000 per year (can be carried forward one year)
3. **Small Gifts:** £250 per person per year
4. **Life Insurance in Trust:** Cover IHT liability without increasing estate value
5. **Charitable Donations:** 10% to charity reduces IHT rate to 36%

**RNRB Taper:** Reduces by £1 for every £2 over £2 million estate value.

**Action Items:**
- Review estate valuation regularly
- Document all gifts with dates
- Consider establishing trusts
- Obtain professional valuations for property/business assets`,
      suggestions: [
        'Use the IHT Calculator to estimate liability',
        'Review gift strategy and timing',
        'Consider charitable donations for rate reduction',
        'Set up life insurance policies in trust'
      ],
      relatedTopics: ['Estate Planning', 'Gift Planning', 'Trusts', 'Business Property Relief']
    }
  }

  if (lowerQ.includes('pension')) {
    return {
      answer: `**Pension Annual Allowance Guidance:**

For ${context?.taxYear || '2024-25'}:

• **Standard Annual Allowance:** £60,000
• **Money Purchase Annual Allowance:** £10,000 (if flexibly accessed)
• **Lifetime Allowance:** Abolished from 6 April 2024

**Tapering Rules:**
- Taper starts at adjusted income over £260,000
- Reduces by £1 for every £2 of income
- Minimum allowance: £10,000
- Threshold income must exceed £200,000 for taper to apply

**Tax Relief:**
- Basic rate: 20% relief at source
- Higher rate: Additional 20% via Self Assessment
- Additional rate: Additional 25% via Self Assessment

**Planning Considerations:**
1. Carry forward unused allowances from previous 3 years
2. Consider employer vs personal contributions for tax efficiency
3. Salary sacrifice can reduce adjusted income for taper
4. Monitor total contributions to avoid annual allowance charge

**HMRC Reporting:** Annual allowance charges must be reported via Self Assessment.`,
      suggestions: [
        'Calculate your adjusted income for taper',
        'Review carry forward opportunities',
        'Consider salary sacrifice arrangements',
        'Plan contributions to maximize tax relief'
      ],
      relatedTopics: ['Salary Sacrifice', 'Employer Contributions', 'Carry Forward', 'Net Pay Arrangements']
    }
  }

  if (lowerQ.includes('self assessment') || lowerQ.includes('sa return')) {
    return {
      answer: `**Self Assessment Guidance:**

**Filing Deadlines ${context?.taxYear || '2024-25'}:**
- Paper return: 31 October 2025
- Online return: 31 January 2026
- Payment deadline: 31 January 2026
- Second payment on account: 31 July 2026

**Who Must File:**
- Self-employed income over £1,000
- Untaxed income over £2,500
- Capital gains above annual exemption
- High earners with child benefit (income over £50,000)
- Directors of limited companies
- Income from property over £2,500

**HMRC Online Filing:**
- Register for Self Assessment (10 days for activation)
- Use Government Gateway credentials
- File return online via HMRC portal
- View payment history and tax calculations

**Penalties:**
- £100 immediate penalty for late filing
- Additional penalties increase with delay
- 5% interest on late payments

**Best Practices:**
1. Gather all income documents early
2. Claim all eligible expenses
3. Review tax code for employment income
4. Consider payments on account requirements
5. File early to avoid technical issues`,
      suggestions: [
        'Register for HMRC online services now',
        'Set up reminders for key deadlines',
        'Review last year's return for changes',
        'Consider professional review before filing'
      ],
      relatedTopics: ['Payment on Account', 'Tax Code', 'Late Filing Penalties', 'Income Categories']
    }
  }

  return {
    answer: `**Personal Tax Adviser:**

I can help you with:

• **Self Assessment** - Filing deadlines, registration, and submissions
• **Capital Gains Tax** - Calculations, exemptions, and reporting
• **Inheritance Tax** - Estate planning and mitigation strategies
• **Pension Planning** - Annual allowance, carry forward, and tax relief
• **Marriage Allowance** - Eligibility and potential savings
• **Tax Optimization** - Strategies to minimize tax liability

**Current Tax Year:** ${context?.taxYear || '2024-25'}

**Recent HMRC Updates:**
- Annual CGT exemption reduced to £3,000
- Lifetime Allowance abolished
- High Income Child Benefit threshold increased
- Marriage Allowance: £1,260 transferable

Please ask a more specific question about any of these topics, and I'll provide detailed guidance with calculations and planning strategies.`,
    suggestions: [
      'How can I optimize my pension contributions?',
      'What CGT planning opportunities exist this year?',
      'Am I eligible for Marriage Allowance?',
      'What are the IHT allowances and planning options?'
    ],
    relatedTopics: ['HMRC Integration', 'Tax Planning', 'Deadline Management', 'Online Filing']
  }
}

/**
 * Corporation Tax AI Adviser (HMRC Integration)
 */
function getCorporationTaxAdvice(question: string, context: any): AIResponse {
  const lowerQ = question.toLowerCase()

  if (lowerQ.includes('rate') || lowerQ.includes('threshold')) {
    return {
      answer: `**Corporation Tax Rates ${context?.taxYear || '2024-25'}:**

• **Main Rate:** 25% (profits over £250,000)
• **Small Profits Rate:** 19% (profits up to £50,000)
• **Marginal Relief:** Available between £50,000 and £250,000

**Marginal Relief Calculation:**
- Marginal Relief = (Upper Limit - Profits) × Marginal Relief Fraction
- Current Fraction: 3/200 (0.015)
- Effective rate gradually increases from 19% to 25%

**Example:**
- Profits: £150,000
- Corporation Tax at 25%: £37,500
- Less Marginal Relief: £1,500
- Actual CT Due: £36,000 (24% effective rate)

**HMRC Filing:**
- File CT600 online within 12 months of accounting period end
- Pay CT within 9 months and 1 day of period end
- Quarterly installment payments for large companies (profits > £1.5m)

**Planning Considerations:**
1. Time capital expenditure for optimal allowances
2. Consider director's remuneration vs dividends
3. Review R&D tax relief eligibility
4. Maximize pension contributions
5. Utilize group relief if applicable`,
      suggestions: [
        'Calculate effective CT rate for your profit level',
        'Review timing of income and expenses',
        'Check R&D claim eligibility',
        'Consider profit extraction strategies'
      ],
      relatedTopics: ['R&D Relief', 'Capital Allowances', 'Group Relief', 'Dividend Strategy']
    }
  }

  if (lowerQ.includes('r&d') || lowerQ.includes('research')) {
    return {
      answer: `**R&D Tax Relief Guidance:**

**SME R&D Relief (fewer than 500 employees, turnover < €100m):**
- Additional 86% deduction on qualifying R&D costs
- Total deduction: 186% of expenditure
- Effective benefit: 16.37% for profitable companies
- Loss-making companies: surrender losses for payable credit

**RDEC (Large Companies or SME intensive):**
- R&D Expenditure Credit: 20% of qualifying costs
- Taxable credit reduces net cost
- Effective benefit: 15% after CT

**Qualifying Activities:**
- Advances in science or technology
- Overcoming scientific/technological uncertainty
- Not routine problem-solving

**Eligible Costs:**
- Staff costs (direct and indirect)
- Subcontractor costs (65% if not connected)
- Software and data licenses
- Consumable items
- Clinical trial volunteers

**HMRC Process:**
- Claim via CT600 or amended return
- Detailed project descriptions required
- Technical narrative demonstrating uncertainty
- Contemporaneous records essential
- Advance Assurance available for new claimants

**Recent Changes:**
- PAYE/NIC caps introduced April 2021
- Additional reporting requirements
- Increased HMRC scrutiny
- Pre-notification required for first claims`,
      suggestions: [
        'Review projects for R&D qualifying activities',
        'Maintain detailed contemporaneous records',
        'Consider advance assurance application',
        'Separate R&D from non-R&D costs'
      ],
      relatedTopics: ['HMRC Compliance', 'Technical Narrative', 'Cost Categories', 'Advance Assurance']
    }
  }

  return {
    answer: `**Business Tax Adviser:**

I can assist with:

• **Corporation Tax Rates** - Main rate, small profits rate, marginal relief
• **R&D Tax Relief** - SME scheme, RDEC, qualifying activities
• **Capital Allowances** - AIA, WDA, enhanced allowances
• **Group Relief** - Loss surrender and group structures
• **Close Company** - Loans to participators, benefits in kind
• **CT600 Filing** - Online submission to HMRC

**Key Deadlines:**
- Filing: 12 months after period end
- Payment: 9 months + 1 day after period end
- Quarterly payments for large companies

Please ask specific questions about corporation tax planning, compliance, or HMRC submissions.`,
    suggestions: [
      'What are current CT rates and thresholds?',
      'How do I claim R&D tax relief?',
      'What capital allowances can I claim?',
      'How does marginal relief work?'
    ],
    relatedTopics: ['CT600', 'Payment Deadlines', 'Group Relief', 'Close Companies']
  }
}

/**
 * Company Secretarial AI Adviser (Companies House Integration)
 */
function getCompanySecretarialAdvice(question: string, context: any): AIResponse {
  const lowerQ = question.toLowerCase()

  if (lowerQ.includes('confirmation statement') || lowerQ.includes('cs01')) {
    return {
      answer: `**Confirmation Statement (CS01) Guidance:**

**Filing Requirements:**
- Must be filed at least once every 12 months
- Due date shown on Companies House record
- Late filing penalties: £150-£1,500

**Information Confirmed:**
1. **Company Details:**
   - Registered office address
   - Principal business activities (SIC codes)
   - Trading status

2. **Directors & Officers:**
   - Current directors and secretary
   - Residential addresses (not public)
   - Usual residential country

3. **Shareholders:**
   - Statement of capital
   - Shareholdings and PSC information
   - Share transfers since last statement

4. **PSC Register:**
   - People with Significant Control
   - Ownership/voting rights over 25%
   - Must be kept up to date

**Companies House Online Filing:**
- File via Companies House WebFiling service
- Real-time validation and confirmation
- £13 online fee (£40 paper)
- Instant receipt and reference number

**Best Practices:**
1. Review and update all registers before filing
2. Ensure PSC register is accurate
3. Verify SIC codes reflect actual activities
4. File early to avoid penalties
5. Keep internal records synchronized

**Recent Changes:**
- Enhanced PSC verification requirements
- Mandatory identity verification for directors
- Increased emphasis on beneficial ownership transparency`,
      suggestions: [
        'Review current shareholder register',
        'Update PSC register if needed',
        'Verify director details are current',
        'Check SIC codes accuracy'
      ],
      relatedTopics: ['PSC Register', 'SIC Codes', 'Share Capital', 'Director Verification']
    }
  }

  if (lowerQ.includes('accounts') || lowerQ.includes('annual accounts')) {
    return {
      answer: `**Annual Accounts Filing Guidance:**

**Filing Deadlines:**
- **Private Companies:** 9 months after year-end
- **Public Companies:** 6 months after year-end
- Extensions available in exceptional circumstances

**Account Types:**
- **Full Accounts:** Complete financial statements
- **Filleted Accounts:** Directors' report removed
- **Abridged Accounts:** Reduced disclosure (small companies)
- **Micro-entity Accounts:** Minimal disclosure

**Small Company Criteria (2 of 3):**
- Turnover ≤ £10.2 million
- Balance sheet total ≤ £5.1 million
- Employees ≤ 50

**Micro-entity Criteria (2 of 3):**
- Turnover ≤ £632,000
- Balance sheet total ≤ £316,000
- Employees ≤ 10

**Companies House Requirements:**
- Balance sheet must be signed
- Director's report (unless filleted)
- Auditor's report (if applicable)
- Notes to accounts
- Statutory registers confirmation

**iXBRL Tagging:**
- Required for all accounts filed online
- Ensures machine-readable format
- Auto-validated by Companies House systems

**Penalties for Late Filing:**
1 month late: £150
3 months: £375
6 months: £750
Over 6 months: £1,500

**Persistent late filers:** Directors may be prosecuted`,
      suggestions: [
        'Determine correct account type for your company',
        'Ensure accounts are properly prepared',
        'Check iXBRL tagging compliance',
        'File well before deadline'
      ],
      relatedTopics: ['iXBRL', 'Small Company Exemptions', 'Audit Requirements', 'Filleted Accounts']
    }
  }

  if (lowerQ.includes('director') || lowerQ.includes('appointment')) {
    return {
      answer: `**Director Appointment & Management:**

**Appointing a Director (AP01):**
- Must be at least 16 years old
- Not disqualified from being a director
- Consent to act as director required
- Service address can differ from residential
- Identity verification now mandatory

**Director Duties:**
1. Act within company powers
2. Promote success of company
3. Exercise independent judgment
4. Exercise reasonable care, skill, and diligence
5. Avoid conflicts of interest
6. Not accept benefits from third parties
7. Declare interest in proposed transactions

**Companies House Filing:**
- **AP01:** Appoint director (£13 online)
- **CH01:** Change director details
- **TM01:** Terminate director
- Must file within 14 days of change

**Director's Residential Address:**
- Protected information (not on public record)
- Service address shown publicly
- Can apply for protection if at risk

**Disqualification:**
- Bankruptcy may lead to disqualification
- Serious breaches of duties
- Unfit director of insolvent company
- Maximum: 15 years disqualification

**Identity Verification:**
- New requirement from 2024
- Must verify identity with Companies House
- One-time verification per individual
- Required before first appointment`,
      suggestions: [
        'Complete identity verification process',
        'Ensure directors understand their duties',
        'Keep residential addresses updated privately',
        'File changes within 14-day deadline'
      ],
      relatedTopics: ['Director Duties', 'Disqualification', 'Identity Verification', 'Service Address']
    }
  }

  return {
    answer: `**Company Secretary Adviser:**

I can help with Companies House filings and compliance:

• **Confirmation Statement (CS01)** - Annual filing requirements
• **Annual Accounts** - Filing deadlines and account types
• **Director Changes** - Appointments, resignations, details
• **Share Capital** - Allotments, transfers, reductions
• **PSC Register** - People with Significant Control
• **Registered Office** - Address changes
• **Company Name** - Changes and restrictions

**Companies House Integration:**
All forms can be filed online through Companies House WebFiling service with real-time validation and instant confirmation.

**Key Deadlines:**
- Confirmation Statement: Every 12 months
- Annual Accounts: 9 months (private) / 6 months (public)
- Director changes: 14 days
- Share allotments: 1 month

Please ask specific questions about Companies House filings or company secretarial matters.`,
    suggestions: [
      'How do I file a Confirmation Statement?',
      'What are the annual accounts requirements?',
      'How do I appoint or remove a director?',
      'What is the PSC register?'
    ],
    relatedTopics: ['Companies House', 'Corporate Governance', 'Filing Deadlines', 'Statutory Records']
  }
}

/**
 * Bookkeeping AI Adviser
 */
function getBookkeepingAdvice(question: string, context: any): AIResponse {
  return {
    answer: `**Bookkeeping Adviser:**

I can assist with:
• Chart of accounts structure
• Journal entries and adjustments
• Bank reconciliation best practices
• VAT compliance and calculations
• Accounts payable/receivable management
• Trial balance preparation

Based on your query about "${question}", here's guidance:

**Best Practices:**
1. Maintain accurate and timely records
2. Reconcile bank accounts monthly
3. Follow accounting standards (FRS 102/105)
4. Keep supporting documentation
5. Regular backups of financial data

**Common Issues:**
- Misclassified transactions
- Missing invoices or receipts
- Timing differences in recognition
- VAT treatment errors

Would you like specific guidance on any of these areas?`,
    suggestions: [
      'Review chart of accounts setup',
      'Check VAT coding accuracy',
      'Verify bank reconciliation',
      'Review aged debtors/creditors'
    ]
  }
}

/**
 * Accounts Production AI Adviser
 */
function getAccountsProductionAdvice(question: string, context: any): AIResponse {
  return {
    answer: `**Accountant Adviser:**

I can help with:
• Financial statement preparation
• Trial balance adjustments
• Year-end procedures
• Disclosure requirements
• FRS 102/105 compliance
• iXBRL tagging

**Financial Statements:**
- Profit & Loss Account
- Balance Sheet
- Notes to Accounts
- Director's Report
- Accounting Policies

**Key Considerations:**
1. Apply correct accounting standards
2. Ensure proper disclosure
3. Material adjustments properly recorded
4. Prior year comparatives included
5. iXBRL tagged for Companies House filing

Please provide more details about your specific accounts production query.`,
    suggestions: [
      'Review accounting policies',
      'Check disclosure requirements',
      'Verify prior year adjustments',
      'Ensure FRS compliance'
    ]
  }
}

/**
 * Payroll AI Adviser
 */
function getPayrollAdvice(question: string, context: any): AIResponse {
  return {
    answer: `**HR Adviser:**

I can assist with:
• PAYE and NI calculations
• RTI submissions to HMRC
• Auto-enrolment pensions
• Statutory payments (SSP, SMP, SPP)
• P45, P60, P11D preparation
• Employment law compliance

**Current Thresholds ${context?.taxYear || '2024-25'}:**
- Personal Allowance: £12,570
- NI Primary Threshold: £12,570
- NI Secondary Threshold: £9,100
- Student Loan Thresholds vary by plan

**RTI Requirements:**
- Submit FPS on or before payment date
- EPS for adjustments and statutory payments
- Real-time information to HMRC

Would you like specific guidance on payroll processing or employment law?`,
    suggestions: [
      'Check current tax codes',
      'Review pension contributions',
      'Verify statutory payment calculations',
      'Ensure RTI submissions are timely'
    ]
  }
}

/**
 * AML Compliance AI Adviser
 */
function getAMLComplianceAdvice(question: string, context: any): AIResponse {
  return {
    answer: `**AML Compliance Adviser:**

I can help with:
• Customer Due Diligence (CDD)
• Enhanced Due Diligence (EDD)
• PEP screening
• Sanctions checking
• Risk assessments
• Suspicious Activity Reports (SARs)

**Key Requirements:**
1. Know Your Customer (KYC) procedures
2. Ongoing monitoring
3. Record keeping (5 years)
4. Staff training
5. Policies and procedures
6. Risk-based approach

**Red Flags:**
- Complex corporate structures
- Unusual transaction patterns
- PEPs without disclosed source of wealth
- Cash-intensive businesses
- High-risk jurisdictions

**Reporting:**
- Submit SARs to NCA when suspicious
- Maintain audit trail
- Document decision-making

Please specify your AML compliance question for detailed guidance.`,
    suggestions: [
      'Review CDD procedures',
      'Update risk assessment',
      'Check staff training records',
      'Verify PEP screening'
    ]
  }
}

/**
 * Charity Accounts AI Adviser
 */
function getCharityAccountsAdvice(question: string, context: any): AIResponse {
  return {
    answer: `**Charity Accountant Adviser:**

I can assist with:
• SORP compliance (FRS 102)
• Annual returns to Charity Commission
• Trustees' report requirements
• Fund accounting
• Restricted vs unrestricted funds
• Activity reporting

**Reporting Thresholds:**
- Income < £25,000: Receipts & payments
- £25,000 - £250,000: Accruals or R&P, Annual Return
- £250,000 - £1m: Accruals accounts, Independent Examination
- > £1m: Statutory audit required

**Key Requirements:**
1. Apply Charity SORP
2. Separate fund accounting
3. Activity-based reporting
4. Public benefit disclosure
5. Trustee remuneration disclosure

**Charity Commission Filing:**
- Annual Return deadline: 10 months after year-end
- Accounts filing: With Annual Return
- Updates to register: Within 60 days of change

Would you like specific guidance on charity accounting or Charity Commission requirements?`,
    suggestions: [
      'Review fund accounting structure',
      'Check SORP compliance',
      'Verify public benefit reporting',
      'Ensure timely Charity Commission filing'
    ]
  }
}

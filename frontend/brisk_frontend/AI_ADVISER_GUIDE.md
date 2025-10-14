# AI Professional Adviser System - User Guide

## Overview
The AI Professional Adviser is an advanced, enterprise-grade conversational AI system integrated across all modules of Brisk Accountants. It provides real-time professional guidance using official UK government data sources including HMRC, Companies House, GOV.UK, and UK Legislation.

## Key Features

### 1. Interactive Professional Conversations
- **Context-Aware Responses** - AI remembers previous questions and builds on conversation history
- **Multi-Turn Dialogues** - Have extended professional conversations just like with a human adviser
- **Module-Specific Expertise** - Each module has specialized AI trained for that area:
  - Personal Tax: "Ask your Personal Tax Adviser"
  - Corporation Tax: "Ask your Business Tax Adviser"
  - Payroll: "Ask your HR Adviser"
  - AML Compliance: "Ask your AML Compliance Adviser"
  - Accounts Production: "Ask your Accountant"
  - Company Secretarial: "Ask your Company Secretary"
  - Charity Accounts: "Ask your Charity Accountant"

### 2. Real-Time Data Integration
The AI fetches live data from multiple official sources:

**HMRC (HM Revenue & Customs)**
- Current tax rates and thresholds
- Filing deadlines and obligations
- MTD (Making Tax Digital) requirements
- Penalty information
- Payment on account schedules

**Companies House**
- Company filing deadlines
- Director obligations
- Company size thresholds
- Filing fees
- PSC requirements

**GOV.UK & UK Legislation**
- Recent legislative changes
- Finance Act updates
- Statutory instruments
- Regulatory updates

**Professional Standards (FRC)**
- FRS 102 requirements
- FRS 105 (micro-entities)
- Audit thresholds
- Reporting standards

### 3. Comprehensive Professional Reports
Generate client-ready reports in multiple formats:

**Available Formats:**
- **HTML** - Interactive, styled reports that can be printed to PDF
- **PDF** - Professional PDF documents (via HTML conversion)
- **Word (RTF)** - Editable documents in Microsoft Word format
- **Markdown** - Plain text format for easy editing

**Report Contents:**
- Executive summary
- Detailed analysis with real-time data
- Professional recommendations
- Prioritized action items with deadlines
- Legislative references and citations
- Data source attributions
- HMRC/Companies House compliance guidance

## How to Use

### Starting a Conversation

1. **Navigate to any module** (Personal Tax, Corporation Tax, etc.)
2. **Look for the AI Adviser button** - usually in the top section or sidebar
3. **Click to open** the AI conversation panel
4. **Type your question** in the input field
5. **Press Enter or click Send**

### Suggested Questions

The AI can help with:

**Tax & Compliance Questions:**
- "What are the key deadlines I need to be aware of?"
- "Can you explain the current tax rates?"
- "What are the penalties for late filing?"
- "How do I calculate Corporation Tax with marginal relief?"
- "What's the threshold for VAT registration?"

**Eligibility & Planning:**
- "Am I eligible for Marriage Allowance?"
- "Can I claim Annual Investment Allowance?"
- "Should my client use the Cash Basis?"
- "What are the inheritance tax thresholds?"

**Recent Changes:**
- "What recent legislative changes should I know about?"
- "Have there been any updates to MTD?"
- "What changed in the latest Finance Act?"

**Calculations & Guidance:**
- "How much Capital Gains Tax will my client pay?"
- "Calculate pension annual allowance tapering"
- "What's the Corporation Tax for a profit of £150,000?"
- "Explain the IHT residence nil rate band taper"

**Professional Reports:**
- "Generate a comprehensive report on my situation"
- "Create a tax planning report for my client"
- "Provide a compliance summary report"

### Understanding Responses

Each AI response includes:

**Response Body:**
- Professional, detailed answer to your question
- Relevant calculations and examples
- Step-by-step guidance
- Practical recommendations

**Metadata Footer:**
- **Data Sources** - Shows which official sources were used (e.g., "HMRC, Companies House")
- **Timestamp** - When the data was last updated
- **Confidence Level** - AI's confidence in the response

**Follow-Up Suggestions:**
- The AI suggests related questions you might want to ask next

### Generating Professional Reports

1. **Have a conversation** with the AI about your topic
2. **Click "Generate Report"** in the top-right corner
3. **Select your format:**
   - HTML (recommended for most users)
   - PDF (instructions for conversion)
   - Word RTF (editable in Microsoft Word)
   - Markdown (plain text)
4. **Click "Generate [FORMAT] Report"**
5. **Download** opens automatically

**Report Customization:**
The system automatically includes:
- All relevant information from your conversation
- Current tax rates and thresholds
- Compliance deadlines
- Professional recommendations
- Action items with priorities

### Managing Conversations

**Copy Responses:**
- Click the copy icon on any AI response to copy to clipboard

**Clear Conversation:**
- Click the trash icon to start a new conversation
- Previous context is cleared

**Export Conversation:**
- Click "Export" to download full conversation history as JSON
- Useful for record-keeping or sharing with colleagues

## Data Sources & Accuracy

### Primary Data Sources

**1. HMRC Published Rates (Official)**
- Tax Year: 2024-25 and historical
- Source: HM Revenue & Customs official publications
- Update Frequency: Annual (or when announced)

**2. GOV.UK API**
- Guidance documents
- Rate changes and announcements
- Policy updates

**3. Companies House Public Data**
- Filing requirements
- Deadlines and fees
- Company size thresholds

**4. UK Legislation API**
- Finance Acts
- Statutory instruments
- Regulatory changes

### Data Accuracy

**Current Information (2024-25):**
- All rates and thresholds are accurate as published by HMRC
- Legislative information current as of implementation date
- Deadlines verified against official sources

**Historical Information:**
- Comprehensive data back to 2015
- Intelligent defaults for earlier years where specific rates unavailable
- User should verify critical historical calculations

**Future Changes:**
- AI will indicate "expected" or "proposed" for announced but not yet effective changes
- Check official sources for confirmation

## Examples of Professional Use

### Example 1: Personal Tax Planning

**User:** "My client earns £65,000 in employment and has £15,000 rental income. What's their tax position?"

**AI Response:**
```
Professional Tax Adviser Response

Regarding your query: "My client earns £65,000 in employment and has £15,000 rental income..."

Tax Position Analysis:

Total Income: £80,000 (Employment £65,000 + Rental £15,000)

Income Tax Calculation (2024-25):
- Personal Allowance: £12,570
- Taxable Income: £67,430

Tax Bands:
- £37,700 @ 20% = £7,540
- £29,730 @ 40% = £11,892

Total Income Tax: £19,432

National Insurance:
- Class 1 on employment: £2,988
- Class 2 on rental: £179.40

Recommendations:
1. Consider pension contributions to reduce higher rate tax
2. Ensure rental expenses fully claimed
3. Check eligibility for property allowance (£1,000)
4. Review timing of rental income for tax efficiency

Data Sources: HMRC Published Rates
Last Updated: [timestamp]
```

### Example 2: Corporation Tax with Marginal Relief

**User:** "Calculate Corporation Tax for a company with £180,000 profits"

**AI Response:**
```
Professional Tax Adviser Response

Corporation Tax Calculation for £180,000 profits:

Your company falls in the marginal relief band.

Profits: £180,000
Main Rate (25%): £45,000

Less: Marginal Relief
Formula: (£250,000 - £180,000) × £180,000 / £180,000 × 3/200
Relief: £1,050

Final Corporation Tax: £43,950
Effective Rate: 24.42%

Important Points:
- Small Profits Rate (19%) applies up to £50,000
- Main Rate (25%) applies above £250,000
- Marginal relief available between £50,000 - £250,000
- Associated companies reduce thresholds proportionately

Recommendation: Consider timing of income/expenses to optimize effective rate.

Data Sources: HMRC, UK Tax Rates
Last Updated: [timestamp]
```

### Example 3: Company Filing Deadline

**User:** "When must my client file accounts? Year end is 31 December 2024"

**AI Response:**
```
Professional Tax Adviser Response

Filing Deadlines for 31 December 2024 year end:

Companies House:
- Private Company: 30 September 2025 (9 months)
- Public Company: 30 June 2025 (6 months)

HMRC Corporation Tax:
- CT600 Return: 31 December 2025 (12 months)
- Tax Payment: 1 October 2025 (9 months + 1 day)

Confirmation Statement:
- At least annually (max 12 months from last filing)

Late Filing Penalties:
Companies House:
- 1 month late: £150
- 3 months late: £375
- 6 months late: £750
- Over 6 months: £1,500

Recommendation: File early to avoid penalties and ensure time for queries.

Data Sources: Companies House, HMRC
Last Updated: [timestamp]
```

## Best Practices

### For Accountants & Tax Professionals

1. **Use as a First Line of Research**
   - Quick answers to common questions
   - Rate confirmations
   - Deadline checks

2. **Generate Client Reports**
   - Professional documentation of advice
   - Include in client files
   - Email to clients as summaries

3. **Training & Reference**
   - Use for junior staff training
   - Quick reference during client calls
   - Verify calculations

4. **Keep Conversations Focused**
   - One topic per conversation for best results
   - Clear new conversation for new clients/topics
   - Be specific in questions

### For Business Owners

1. **Get Quick Answers**
   - Don't wait for accountant for simple queries
   - Understand your obligations
   - Plan ahead with deadline information

2. **Save Reports**
   - Keep AI-generated reports for records
   - Share with your accountant
   - Use for decision-making documentation

3. **Ask Follow-Up Questions**
   - The AI remembers context
   - Drill down into details
   - Request clarifications

## Limitations & Disclaimer

### What the AI CAN Do
✓ Provide current tax rates and thresholds  
✓ Explain calculations and examples  
✓ Cite legislation and regulations  
✓ Give general professional guidance  
✓ Generate professional documentation  
✓ Answer compliance questions  
✓ Explain deadlines and obligations  

### What the AI CANNOT Do
✗ Provide formal tax advice (human review needed)  
✗ File returns on your behalf  
✗ Access your specific client data (unless provided)  
✗ Replace professional judgment  
✗ Guarantee outcomes with HMRC  
✗ Provide legal advice  

### Important Disclaimer

**This AI system provides information and guidance based on current UK tax legislation and regulations. While every effort is made to ensure accuracy:**

- Information is current as of the generation date
- Tax legislation changes regularly
- Individual circumstances vary
- Professional review is recommended for:
  - Complex situations
  - Large tax liabilities
  - Disputes with HMRC
  - Legal matters

**This system is not a substitute for professional tax or legal advice.** For formal advice, consult a qualified accountant or tax adviser.

## Troubleshooting

### AI Not Responding
- Check internet connection
- Refresh the page
- Clear browser cache
- Try a shorter, simpler question

### Unexpected Response
- Rephrase your question more specifically
- Provide more context
- Break complex questions into smaller parts
- Use the suggested questions as templates

### Report Generation Failing
- Ensure you've had a conversation first
- Try a different format
- Check browser pop-up blocker
- Try again after clearing conversation

### Data Seems Outdated
- Check the "Last Updated" timestamp
- Verify against official GOV.UK sources
- Report discrepancies to system administrator

## Support & Feedback

### Getting Help
- Review this guide
- Check suggested questions
- Try rephrasing your query
- Contact your system administrator

### Reporting Issues
If you encounter:
- Incorrect tax rates
- Wrong calculations  
- Outdated legislation references
- System errors

Please provide:
- Screenshot of the conversation
- Expected vs actual response
- Date and time
- Module you were using

### Feature Requests
The AI system is continuously improved. Suggest:
- Additional data sources
- New report formats
- Enhanced calculations
- Module-specific features

---

## Version Information

**System Version:** 2.0  
**Data Current As Of:** 2024-25 Tax Year  
**Last Guide Update:** ${new Date().toLocaleDateString('en-GB')}  

**Upcoming Features:**
- Direct HMRC API integration (when credentials configured)
- Companies House live company lookups
- Enhanced chart and graph generation
- Multi-client comparison reports
- Integration with external calculation tools

---

## Quick Reference Card

### Common Questions & Keywords

| Topic | Keywords to Use |
|-------|----------------|
| Tax Rates | "rates", "threshold", "allowance", "band" |
| Deadlines | "when", "deadline", "due date", "filing" |
| Calculations | "calculate", "how much", "work out" |
| Eligibility | "eligible", "can I", "qualify", "allowed" |
| Compliance | "must I", "requirement", "obligation", "penalty" |
| Changes | "recent", "new", "changed", "update" |

### Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Send Message | Enter |
| New Line (in message) | Shift + Enter |
| Clear Conversation | Ctrl/Cmd + Delete |

### Report Format Comparison

| Format | Best For | File Size | Editable |
|--------|----------|-----------|----------|
| HTML | Viewing, emailing, printing | Medium | No |
| PDF | Formal presentations | Medium | No |
| Word | Client editing, customization | Small | Yes |
| Markdown | Plain text, version control | Smallest | Yes |

---

**Need More Help?** Contact your system administrator or refer to the technical documentation at `API_CONFIGURATION.md`

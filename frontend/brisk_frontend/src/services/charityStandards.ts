/**
 * Charity Accounting Standards & Charity Commission Data
 * SORP, Charity Commission requirements, and charity-specific regulations
 */

export interface CharityAccountingStandard {
  name: string
  fullName: string
  applicableTo: string[]
  keyRequirements: string[]
  reportingRequirements: string[]
  examples: string[]
}

export interface CharityType {
  type: string
  regulatoryBody: string
  registrationThreshold: string
  accountsRequirements: string[]
  filingDeadlines: string[]
}

/**
 * Charities SORP (FRS 102)
 */
export function getCharitiesSORP_FRS102(): CharityAccountingStandard {
  return {
    name: 'Charities SORP (FRS 102)',
    fullName: 'Statement of Recommended Practice: Accounting and Reporting by Charities (FRS 102)',
    applicableTo: [
      'All UK charities preparing accounts under FRS 102',
      'Charitable companies',
      'Charitable trusts',
      'Charitable incorporated organisations (CIOs)',
      'Unincorporated charities'
    ],
    keyRequirements: [
      'Accounts must give true and fair view of charity\'s financial activities',
      'Statement of Financial Activities (SoFA) required instead of P&L',
      'Funds accounting: unrestricted, restricted, endowment funds',
      'Income recognition: when entitlement, probability, measurement certainty',
      'Expenditure classification: charitable activities, raising funds, governance',
      'Support costs allocation on reasonable basis',
      'Volunteer time: not recognized but disclosed if material',
      'Donated goods and services: recognized at fair value',
      'Legacy income: recognized when receipt probable and measurable',
      'Grant income: performance or donor conditions assessment'
    ],
    reportingRequirements: [
      'Statement of Financial Activities (SoFA)',
      'Balance Sheet',
      'Cash Flow Statement (if not small charity)',
      'Notes to the accounts',
      'Trustees Annual Report',
      'Accounting policies note (detailed)',
      'Analysis of income and expenditure',
      'Funds movement reconciliation',
      'Related party transactions',
      'Trustees remuneration and expenses',
      'Staff costs and employee numbers',
      'Grants made disclosure'
    ],
    examples: [
      'Registered charities (CIOs, charitable companies, trusts)',
      'Charities with income over £250,000 (full SORP)',
      'Housing associations (with SORP adaptations)',
      'Educational charities',
      'Religious charities',
      'Grant-making trusts'
    ]
  }
}

/**
 * Receipts & Payments Accounts
 */
export function getReceiptsAndPaymentsGuidance() {
  return {
    name: 'Receipts and Payments Accounts',
    fullName: 'Receipts and Payments Accounts for Smaller Charities',
    applicableTo: [
      'Unincorporated charities only',
      'Gross income ≤£250,000',
      'Not companies, CIOs, or required by constitution to prepare accruals accounts'
    ],
    description: 'Simplified cash-based accounting for very small charities',
    requirements: [
      'Receipts and Payments Account (cash in and out)',
      'Statement of Assets and Liabilities',
      'Notes to the accounts (if helpful)',
      'Trustees Annual Report',
      'No accruals or prepayments',
      'No depreciation',
      'Fixed assets shown at cost or nil if fully paid',
      'Simple cash book basis'
    ],
    advantages: [
      'Much simpler than accruals accounts',
      'Suitable for small charities with simple transactions',
      'Less technical accounting knowledge required',
      'Lower accountancy costs'
    ],
    limitations: [
      'Only for unincorporated charities',
      'Income threshold £250,000',
      'Not accepted by some funders/grant providers',
      'Does not show true financial position (no accruals)',
      'Cannot be used by charitable companies or CIOs'
    ]
  }
}

/**
 * Charity Commission Requirements
 */
export function getCharityCommissionRequirements() {
  return {
    registrationThresholds: {
      england_wales: {
        threshold: '£5,000 annual income',
        exceptions: 'Some charities excepted or exempt from registration',
        website: 'www.gov.uk/charity-commission'
      },
      scotland: {
        threshold: 'No income threshold (all charities must register)',
        regulator: 'OSCR (Office of the Scottish Charity Regulator)',
        website: 'www.oscr.org.uk'
      },
      northernIreland: {
        threshold: '£5,000 annual income',
        regulator: 'Charity Commission for Northern Ireland (CCNI)',
        website: 'www.charitycommissionni.org.uk'
      }
    },
    
    annualReturnRequirements: {
      allCharities: [
        'Submit annual return to Charity Commission',
        'Update charity details if changed',
        'Confirm trustees are eligible',
        'Declare serious incidents if occurred'
      ],
      accountsThresholds: {
        under25k: {
          income: '< £25,000',
          requirement: 'Income and expenditure summary only',
          audit: 'No accounts submission or audit required'
        },
        from25kTo250k: {
          income: '£25,000 - £250,000',
          requirement: 'Receipts & Payments OR Accruals accounts',
          audit: 'Independent examination required',
          submission: 'Submit accounts to Charity Commission'
        },
        from250kTo1m: {
          income: '£250,000 - £1,000,000',
          requirement: 'Accruals accounts (SORP compliant)',
          audit: 'Independent examination or audit',
          submission: 'Submit accounts to Charity Commission'
        },
        over1m: {
          income: '> £1,000,000',
          requirement: 'Full accruals accounts (SORP compliant)',
          audit: 'Statutory audit required',
          submission: 'Submit accounts to Charity Commission and Companies House (if company)'
        }
      }
    },
    
    filingDeadlines: {
      charityCommission: '10 months after financial year end',
      companiesHouse: '9 months after year end (if charitable company)',
      lateFilingPenalties: [
        'Automatic £50-£500 penalty from Companies House',
        'Charity Commission may open compliance case',
        'Loss of reputation and donor confidence',
        'Potential inquiry or regulatory action'
      ]
    },
    
    trusteesReport: {
      allCharities: [
        'Reference and administration details',
        'Structure, governance and management',
        'Objectives and activities',
        'Achievements and performance',
        'Financial review',
        'Plans for future periods',
        'Funds held as custodian trustee'
      ],
      charities_over500k: [
        'Strategic report (if also a company)',
        'Public benefit statement (how charity delivers benefit)',
        'Grant-making policy (if applicable)',
        'Investment policy and performance',
        'Reserves policy',
        'Risk management statement',
        'Going concern statement'
      ]
    }
  }
}

/**
 * Charity Types and Structures
 */
export function getCharityTypes(): Record<string, CharityType> {
  return {
    charitableCompany: {
      type: 'Charitable Company (Company Limited by Guarantee)',
      regulatoryBody: 'Charity Commission AND Companies House',
      registrationThreshold: '£5,000 income for Charity Commission; immediate for Companies House',
      accountsRequirements: [
        'Accruals accounts required (cannot use receipts & payments)',
        'Must follow Companies Act formats',
        'Apply Charities SORP (FRS 102)',
        'Directors report = Trustees report',
        'Strategic report if large'
      ],
      filingDeadlines: [
        'Companies House: 9 months after year end',
        'Charity Commission: 10 months after year end',
        'File accounts in both places'
      ]
    },
    
    CIO: {
      type: 'Charitable Incorporated Organisation (CIO)',
      regulatoryBody: 'Charity Commission only',
      registrationThreshold: 'All CIOs must register with Charity Commission',
      accountsRequirements: [
        'Accruals accounts required (cannot use receipts & payments)',
        'Apply Charities SORP (FRS 102)',
        'No Companies House filing',
        'CIO-specific regulations apply'
      ],
      filingDeadlines: [
        'Charity Commission: 10 months after year end',
        'No Companies House filing required'
      ]
    },
    
    charitableTrust: {
      type: 'Charitable Trust (Unincorporated)',
      regulatoryBody: 'Charity Commission (if income over £5,000)',
      registrationThreshold: '£5,000 annual income',
      accountsRequirements: [
        'Receipts & Payments if income ≤£250,000 (and constitution allows)',
        'Accruals accounts if income >£250,000',
        'Apply Charities SORP if using accruals',
        'Trustees personally liable (no limited liability)'
      ],
      filingDeadlines: [
        'Charity Commission: 10 months after year end (if income over £25k)',
        'No Companies House filing'
      ]
    },
    
    unincorporatedAssociation: {
      type: 'Unincorporated Charitable Association',
      regulatoryBody: 'Charity Commission (if income over £5,000)',
      registrationThreshold: '£5,000 annual income',
      accountsRequirements: [
        'Receipts & Payments if income ≤£250,000 (and constitution allows)',
        'Accruals accounts if income >£250,000',
        'Apply Charities SORP if using accruals',
        'Members may have some liability'
      ],
      filingDeadlines: [
        'Charity Commission: 10 months after year end (if income over £25k)',
        'No Companies House filing'
      ]
    }
  }
}

/**
 * Charity-Specific Accounting Topics
 */
export function getCharityAccountingTopics() {
  return {
    fundsAccounting: {
      description: 'Charity-specific requirement to account for different fund types',
      fundTypes: [
        {
          type: 'Unrestricted Funds',
          definition: 'Funds available for general purposes, no donor restrictions',
          examples: ['General donations', 'Trading income', 'Investment income (unless restricted)'],
          use: 'Can be used for any charitable purpose'
        },
        {
          type: 'Restricted Funds',
          definition: 'Funds subject to specific donor-imposed restrictions',
          examples: ['Grants for specific projects', 'Donations for specific purposes'],
          use: 'Must be used only for the specified purpose',
          accounting: 'Separate fund column in SoFA, separate reserves in balance sheet'
        },
        {
          type: 'Endowment Funds',
          definition: 'Capital that must be retained, only income may be spent',
          examples: ['Permanent endowments', 'Expendable endowments'],
          types: {
            permanent: 'Capital must be retained permanently',
            expendable: 'Trustees have power to convert to income'
          }
        },
        {
          type: 'Designated Funds',
          definition: 'Unrestricted funds set aside by trustees for specific purposes',
          examples: ['Building fund (trustee decision)', 'Future projects reserve'],
          accounting: 'Sub-category of unrestricted, trustees can redesignate'
        }
      ],
      reporting: 'All movements between funds must be disclosed in accounts'
    },
    
    incomeRecognition: {
      donations: {
        recognition: 'When receivable and measurable',
        giftAid: 'Recognize donation plus reclaimable tax',
        pledges: 'Only when legally enforceable'
      },
      legacies: {
        recognition: 'When receipt is probable and measurable',
        timing: 'Often at grant of probate, or notification if earlier',
        uncertainty: 'Disclose contingent legacies in notes if significant'
      },
      grants: {
        performanceConditions: 'Recognize as performance obligations met',
      donorConditions: 'Recognize when conditions fulfilled',
        advanceGrants: 'Treat as deferred income if conditions not yet met'
      },
      tradingIncome: {
        primaryPurpose: 'Part of charitable activities',
        subsidiaryTrading: 'Non-primary purpose trading, often in subsidiary',
        recognition: 'When earned, FRS 102 Section 23 applies'
      }
    },
    
    expenditureClassification: {
      categories: [
        {
          category: 'Costs of Raising Funds',
          includes: ['Fundraising costs', 'Trading costs', 'Investment management costs'],
          disclosure: 'Separate SoFA line'
        },
        {
          category: 'Charitable Activities',
          includes: ['Direct charitable expenditure', 'Support costs allocated'],
          disclosure: 'Analysis by activity type required'
        },
        {
          category: 'Governance Costs',
          includes: ['Audit/examination fees', 'Legal advice for trustees', 'Trustee meetings'],
          disclosure: 'Previously separate, now part of support costs but disclosed'
        }
      ],
      allocation: 'Support costs allocated on reasonable, consistent basis'
    },
    
    trusteesRemunerationAndBenefits: {
      generalRule: 'Trustees serve voluntarily, no payment for being a trustee',
      exceptions: [
        'Payment for services (e.g., as employee) if authorized by constitution',
        'Trustee who is also employee: detailed disclosure required',
        'Conflicts of interest must be managed',
        'Charity Commission approval may be needed'
      ],
      disclosure: [
        'Trustees expenses reimbursed (nature and amount)',
        'Payments to trustees for services',
        'Number of trustees receiving remuneration',
        'Related party transactions with trustees'
      ]
    }
  }
}

/**
 * Recent Charity Sector Updates
 */
export function getCharitySectorUpdates() {
  return {
    recentChanges: [
      {
        date: '2024',
        title: 'Charity Governance Code Updates',
        summary: 'Updated guidance on good governance for charities',
        relevantTo: ['All charities'],
        keyChanges: [
          'Enhanced diversity and inclusion recommendations',
          'Updated financial sustainability guidance',
          'Stronger emphasis on risk management',
          'Digital governance considerations'
        ]
      },
      {
        date: '2023',
        title: 'Charity Commission Strategic Plan 2023-28',
        summary: 'New regulatory priorities and approach',
        relevantTo: ['All registered charities'],
        keyChanges: [
          'Increased focus on financial sustainability',
          'Enhanced safeguarding requirements',
          'Stronger action on serious incidents',
          'Digital first approach to regulation'
        ]
      },
      {
        date: '2022',
        title: 'SORP (FRS 102) 2nd Edition',
        summary: 'Updates to charity accounting standard',
        relevantTo: ['All charities preparing accruals accounts'],
        keyChanges: [
          'Clarifications on income recognition',
          'Enhanced disclosure requirements',
          'Updates for going concern assessment',
          'Alignment with Companies Act changes'
        ]
      }
    ],
    
    upcomingChanges: [
      {
        effectiveDate: 'Ongoing',
        title: 'Digital Reporting Initiatives',
        description: 'Charity Commission moving to digital-first filing',
        impact: [
          'iXBRL tagging for larger charities (under consideration)',
          'Enhanced online filing portal',
          'Machine-readable accounts'
        ]
      }
    ]
  }
}

/**
 * Charity Compliance Topics
 */
export function getCharityComplianceGuidance() {
  return {
    publicBenefit: {
      requirement: 'All charities must demonstrate public benefit',
      principles: [
        'Identifiable benefit: clear how activities benefit people',
        'Benefit to public or sufficient section of public',
        'People in poverty cannot be excluded from benefit',
        'Any private benefit must be incidental'
      ],
      disclosure: 'Trustees report must explain how charity delivers public benefit'
    },
    
    seriousIncidents: {
      definition: 'Adverse events that result in or risk significant harm or loss',
      examples: [
        'Fraud or theft',
        'Safeguarding incidents',
        'Data breaches',
        'Significant financial loss',
        'Damage to charity property',
        'Links to terrorism or extremism'
      ],
      reporting: 'Must report to Charity Commission as soon as possible',
      consequence: 'Failure to report can result in regulatory action'
    },
    
    reserves: {
      requirement: 'Trustees must have reserves policy',
      considerations: [
        'Appropriate level of reserves for charity size and risk',
        'Free reserves calculation (excluding restricted and fixed assets)',
        'Justification if reserves excessive or too low',
        'Plans to build or use reserves'
      ],
      disclosure: 'Reserves policy disclosed in trustees report'
    },
    
    fundraising: {
      regulation: 'Fundraising Regulator Code of Fundraising Practice',
      requirements: [
        'Honest and respectful fundraising',
        'Protect vulnerable donors',
        'Handle complaints properly',
        'Work with professional fundraisers and commercial participators',
        'Data protection compliance'
      ],
      disclosure: 'Fundraising approach disclosed in trustees report if significant'
    }
  }
}

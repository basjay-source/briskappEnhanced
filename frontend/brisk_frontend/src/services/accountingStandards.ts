/**
 * Accounting Standards Data Source
 * Comprehensive UK accounting standards, IAS, IFRS, GAAP, FRS guidance
 */

export interface AccountingStandard {
  name: string
  fullName: string
  applicableTo: string[]
  keyRequirements: string[]
  disclosureRequirements: string[]
  exampleUseCases: string[]
  legislativeReference: string
}

export interface FinancialStatementType {
  name: string
  eligibility: string
  requiredStatements: string[]
  disclosureLevel: string
  auditRequirement: string
  companySizeThresholds: {
    turnover?: string
    balanceSheet?: string
    employees?: string
  }
  examples: string[]
}

/**
 * FRS 102 - Financial Reporting Standard applicable to UK and Republic of Ireland
 */
export function getFRS102Details(): AccountingStandard {
  return {
    name: 'FRS 102',
    fullName: 'Financial Reporting Standard 102: The Financial Reporting Standard applicable in the UK and Republic of Ireland',
    applicableTo: [
      'All UK companies not applying FRS 101, FRS 103, FRS 104, or FRS 105',
      'Large companies',
      'Medium-sized companies',
      'Small companies (unless using FRS 105)',
      'Public benefit entities',
      'LLPs'
    ],
    keyRequirements: [
      'True and fair view of financial position and performance',
      'Going concern assessment required',
      'Accruals basis of accounting',
      'Consistency of presentation',
      'Materiality and aggregation',
      'Offsetting prohibited except where required/permitted',
      'Comparative information for all amounts',
      'Recognition criteria: probable future economic benefits, reliable measurement'
    ],
    disclosureRequirements: [
      'Accounting policies note',
      'Judgements and key sources of estimation uncertainty',
      'Statement of compliance with FRS 102',
      'Related party disclosures',
      'Events after the reporting date',
      'Financial instruments disclosures',
      'Deferred tax movements and reconciliation',
      'Share capital and reserves movements',
      'Contingent liabilities and commitments',
      'Operating leases commitments'
    ],
    exampleUseCases: [
      'Medium-sized company preparing full accounts',
      'Large private company (not qualifying for FRS 101)',
      'Group accounts consolidation',
      'Public benefit entities (charities, housing associations)',
      'Companies with complex transactions requiring detailed guidance'
    ],
    legislativeReference: 'Companies Act 2006, SI 2008/410 (as amended)'
  }
}

/**
 * FRS 105 - Financial Reporting Standard for Micro-entities
 */
export function getFRS105Details(): AccountingStandard {
  return {
    name: 'FRS 105',
    fullName: 'FRS 105: The Financial Reporting Standard applicable to the Micro-entities Regime',
    applicableTo: [
      'Micro-entities qualifying under Companies Act criteria',
      'Companies meeting 2 of 3: Turnover ≤£632,000, Balance Sheet ≤£316,000, Employees ≤10'
    ],
    keyRequirements: [
      'Simplified recognition and measurement rules',
      'Reduced disclosure requirements',
      'Historical cost accounting basis',
      'Accruals concept',
      'Going concern presumption',
      'No requirement for cash flow statement',
      'No requirement for directors report (unless otherwise required)'
    ],
    disclosureRequirements: [
      'Accounting policies (brief)',
      'Guarantees and financial commitments',
      'Share capital details',
      'Related undertakings (if applicable)',
      'Employee numbers (average)',
      'Directors advances/credits/guarantees',
      'Post balance sheet events (material)',
      'No requirement for profit and loss account disclosure in certain circumstances'
    ],
    exampleUseCases: [
      'Small family companies',
      'Owner-managed businesses',
      'Companies with straightforward transactions',
      'Minimal disclosure preference',
      'Dormant subsidiaries'
    ],
    legislativeReference: 'Companies Act 2006 s384A, SI 2013/3008'
  }
}

/**
 * FRS 101 - Reduced Disclosure Framework
 */
export function getFRS101Details(): AccountingStandard {
  return {
    name: 'FRS 101',
    fullName: 'FRS 101: Reduced Disclosure Framework',
    applicableTo: [
      'Qualifying entities (subsidiaries, ultimate parents preparing consolidated accounts)',
      'Companies already applying EU-adopted IFRS',
      'Must have shareholders that do not object'
    ],
    keyRequirements: [
      'Apply full IFRS recognition and measurement',
      'Take advantage of disclosure exemptions',
      'Shareholder notification required',
      'Parent must prepare publicly available consolidated accounts using IFRS',
      'Must be included in consolidation',
      'All recognition and measurement as per full IFRS',
      'Reduced disclosure burden compared to full IFRS'
    ],
    disclosureRequirements: [
      'Exemptions from: IFRS 7 financial instruments disclosures (certain)',
      'Related party transactions with group entities',
      'Key management compensation (if in consolidated accounts)',
      'Share-based payments (if in consolidated accounts)',
      'Cash flow statement (in certain circumstances)',
      'Must still disclose: accounting policies, critical judgements, estimation uncertainty',
      'Must comply with Companies Act disclosure requirements'
    ],
    exampleUseCases: [
      'UK subsidiary of IFRS-reporting parent',
      'Large private companies in international groups',
      'Companies wanting IFRS measurement but reduced disclosure',
      'Private equity backed companies',
      'Groups with EU parent preparing IFRS consolidated accounts'
    ],
    legislativeReference: 'Companies Act 2006, IAS Regulation (EC 1606/2002)'
  }
}

/**
 * IAS - International Accounting Standards
 */
export function getIASOverview() {
  return {
    name: 'IAS',
    fullName: 'International Accounting Standards',
    description: 'Older standards issued by IASC (predecessor to IASB), still in effect where not replaced by IFRS',
    keyStandards: [
      {
        number: 'IAS 1',
        title: 'Presentation of Financial Statements',
        keyPoints: [
          'Structure and content requirements',
          'Fair presentation and compliance with IFRS',
          'Going concern assessment',
          'Accrual basis of accounting',
          'Complete set of financial statements definition',
          'Materiality and aggregation',
          'Offsetting rules',
          'Comparative information requirements'
        ]
      },
      {
        number: 'IAS 2',
        title: 'Inventories',
        keyPoints: [
          'Measurement at lower of cost and net realizable value',
          'Cost formulas: FIFO or weighted average',
          'Costs of conversion included',
          'Exclusions: abnormal waste, storage costs, admin overheads',
          'Write-down to NRV when cost not recoverable'
        ]
      },
      {
        number: 'IAS 7',
        title: 'Statement of Cash Flows',
        keyPoints: [
          'Operating, investing, financing activities classification',
          'Direct or indirect method for operating activities',
          'Non-cash transactions disclosure',
          'Changes in working capital presentation',
          'Interest and dividends classification'
        ]
      },
      {
        number: 'IAS 8',
        title: 'Accounting Policies, Changes in Estimates and Errors',
        keyPoints: [
          'Selection and application of accounting policies',
          'Retrospective application of policy changes',
          'Prospective recognition of estimate changes',
          'Retrospective restatement of prior period errors',
          'Disclosure of changes and their effects'
        ]
      },
      {
        number: 'IAS 12',
        title: 'Income Taxes',
        keyPoints: [
          'Current tax and deferred tax accounting',
          'Temporary differences recognition',
          'Tax base determination',
          'Recognition exceptions for certain temporary differences',
          'Deferred tax measurement at expected tax rates',
          'Presentation and disclosure requirements'
        ]
      },
      {
        number: 'IAS 16',
        title: 'Property, Plant and Equipment',
        keyPoints: [
          'Recognition criteria: probable future benefits, reliable cost measurement',
          'Initial measurement at cost',
          'Subsequent measurement: cost or revaluation model',
          'Depreciation over useful life',
          'Component accounting required',
          'Derecognition on disposal or when no future benefits expected'
        ]
      },
      {
        number: 'IAS 24',
        title: 'Related Party Disclosures',
        keyPoints: [
          'Definition of related parties',
          'Key management personnel compensation',
          'Transactions with related parties disclosure',
          'Outstanding balances disclosure',
          'Commitments with related parties'
        ]
      },
      {
        number: 'IAS 36',
        title: 'Impairment of Assets',
        keyPoints: [
          'Indicators of impairment assessment',
          'Recoverable amount determination',
          'Value in use calculation',
          'Cash-generating units identification',
          'Impairment loss recognition and reversal',
          'Goodwill impairment testing annually'
        ]
      },
      {
        number: 'IAS 38',
        title: 'Intangible Assets',
        keyPoints: [
          'Recognition criteria: identifiable, control, future economic benefits',
          'Separate acquisition, business combination, internal generation',
          'Research costs expensed, development costs may be capitalized',
          'Amortization over useful life',
          'Indefinite life intangibles: annual impairment test',
          'Revaluation model rarely used'
        ]
      }
    ]
  }
}

/**
 * IFRS - International Financial Reporting Standards
 */
export function getIFRSOverview() {
  return {
    name: 'IFRS',
    fullName: 'International Financial Reporting Standards',
    description: 'Standards issued by IASB from 2003 onwards, replacing and supplementing IAS',
    keyStandards: [
      {
        number: 'IFRS 1',
        title: 'First-time Adoption of IFRS',
        keyPoints: [
          'Transition requirements for first-time adopters',
          'Opening IFRS statement of financial position preparation',
          'Exemptions from full retrospective application',
          'Reconciliations from previous GAAP required'
        ]
      },
      {
        number: 'IFRS 3',
        title: 'Business Combinations',
        keyPoints: [
          'Acquisition method required',
          'Identification of acquirer',
          'Determination of acquisition date',
          'Recognition and measurement of assets acquired, liabilities assumed',
          'Goodwill or bargain purchase gain recognition',
          'Contingent consideration measurement',
          'Disclosure requirements for business combinations'
        ]
      },
      {
        number: 'IFRS 9',
        title: 'Financial Instruments',
        keyPoints: [
          'Classification and measurement: amortized cost, FVOCI, FVTPL',
          'Expected credit loss impairment model',
          'Hedge accounting requirements',
          'Derecognition of financial assets and liabilities',
          'Effective interest method',
          'Extensive disclosure requirements'
        ]
      },
      {
        number: 'IFRS 15',
        title: 'Revenue from Contracts with Customers',
        keyPoints: [
          'Five-step model: identify contract, performance obligations, price, allocate, recognize',
          'Revenue recognized when performance obligation satisfied',
          'Over time vs point in time recognition',
          'Variable consideration estimation',
          'Contract modifications',
          'Principal vs agent considerations',
          'Significant financing component'
        ]
      },
      {
        number: 'IFRS 16',
        title: 'Leases',
        keyPoints: [
          'Single lessee accounting model (no operating lease classification)',
          'Right-of-use asset and lease liability recognition',
          'Exemptions: short-term leases, low-value assets',
          'Lease term determination including extension options',
          'Discount rate: incremental borrowing rate',
          'Subsequent measurement and remeasurement',
          'Lessor accounting: operating vs finance lease'
        ]
      }
    ]
  }
}

/**
 * UK GAAP Overview
 */
export function getUKGAAPOverview() {
  return {
    name: 'UK GAAP',
    fullName: 'United Kingdom Generally Accepted Accounting Practice',
    description: 'UK accounting standards framework comprising FRS standards and Companies Act requirements',
    components: [
      'FRS 100: Application of Financial Reporting Requirements',
      'FRS 101: Reduced Disclosure Framework (IFRS-based)',
      'FRS 102: The Financial Reporting Standard (main UK GAAP)',
      'FRS 103: Insurance Contracts',
      'FRS 104: Interim Financial Reporting',
      'FRS 105: The Financial Reporting Standard applicable to the Micro-entities Regime'
    ],
    hierarchy: {
      tier1: 'Listed companies, public interest entities → Full IFRS (EU-adopted)',
      tier2: 'Qualifying entities → FRS 101 (IFRS with reduced disclosures)',
      tier3: 'Most UK companies → FRS 102',
      tier4: 'Micro-entities → FRS 105'
    },
    companiesActRequirements: [
      'True and fair view override',
      'Accounting policies must be appropriate',
      'Prudence, accruals, going concern, consistency',
      'Individual and group accounts requirements',
      'Formats for balance sheet and profit and loss',
      'Disclosure notes requirements',
      'Directors report requirements',
      'Audit requirements and exemptions'
    ]
  }
}

/**
 * Financial Statement Types
 */
export function getFinancialStatementTypes(): Record<string, FinancialStatementType> {
  return {
    full: {
      name: 'Full Accounts',
      eligibility: 'All companies can file full accounts; required for public companies and large companies',
      requiredStatements: [
        'Balance Sheet',
        'Profit and Loss Account',
        'Statement of Changes in Equity',
        'Cash Flow Statement (if not small company)',
        'Notes to the Accounts',
        'Directors Report',
        'Strategic Report (if required)',
        'Auditors Report (if applicable)'
      ],
      disclosureLevel: 'Full disclosure of all required information under applicable accounting framework',
      auditRequirement: 'Required unless company qualifies for audit exemption',
      companySizeThresholds: {
        turnover: 'No limit',
        balanceSheet: 'No limit',
        employees: 'No limit'
      },
      examples: [
        'Listed companies (mandatory)',
        'Large private companies',
        'Companies choosing not to use small company regime',
        'Public companies',
        'Banking and insurance companies'
      ]
    },
    abbreviated: {
      name: 'Abbreviated Accounts',
      eligibility: 'Small and medium-sized companies filing at Companies House (not shareholders)',
      requiredStatements: [
        'Abbreviated Balance Sheet',
        'Special auditors report (if applicable)',
        'Notes (reduced)'
      ],
      disclosureLevel: 'Reduced public disclosure; full accounts still required for shareholders',
      auditRequirement: 'Audit exemption available if qualifying',
      companySizeThresholds: {
        turnover: '≤£10.2m',
        balanceSheet: '≤£5.1m',
        employees: '≤50'
      },
      examples: [
        'Small companies wanting privacy',
        'Medium companies filing reduced information publicly',
        'Owner-managed businesses',
        'Companies with no public accountability'
      ]
    },
    filleted: {
      name: 'Filleted Accounts',
      eligibility: 'Medium-sized companies filing at Companies House',
      requiredStatements: [
        'Abbreviated Profit and Loss (starting from gross profit)',
        'Full Balance Sheet',
        'Reduced notes',
        'Directors Report (may be abbreviated)'
      ],
      disclosureLevel: 'Turnover and cost of sales not disclosed publicly',
      auditRequirement: 'Audit required (medium companies do not qualify for audit exemption)',
      companySizeThresholds: {
        turnover: '£10.2m - £36m',
        balanceSheet: '£5.1m - £18m',
        employees: '50-250'
      },
      examples: [
        'Medium-sized private companies',
        'Growing businesses wanting some privacy',
        'Companies between small and large thresholds'
      ]
    },
    microEntity: {
      name: 'Micro-entity Accounts',
      eligibility: 'Companies meeting 2 of 3 criteria and opting into micro-entity regime',
      requiredStatements: [
        'Micro Balance Sheet',
        'Notes (minimal)',
        'Profit and Loss Account (optional)'
      ],
      disclosureLevel: 'Absolute minimum disclosure requirements',
      auditRequirement: 'Audit exemption available',
      companySizeThresholds: {
        turnover: '≤£632,000',
        balanceSheet: '≤£316,000',
        employees: '≤10'
      },
      examples: [
        'Very small companies',
        'Family companies',
        'Start-ups',
        'Simple trading companies',
        'Companies wanting absolute minimum compliance'
      ]
    },
    dormant: {
      name: 'Dormant Accounts',
      eligibility: 'Companies with no significant accounting transactions during the period',
      requiredStatements: [
        'Balance Sheet',
        'Notes (minimal)',
        'Statement of dormancy'
      ],
      disclosureLevel: 'Minimal - dormant company statement',
      auditRequirement: 'Audit exemption available for dormant companies',
      companySizeThresholds: {
        turnover: 'Zero (no trading)',
        balanceSheet: 'Only revaluation or transactions required by law',
        employees: 'Not relevant'
      },
      examples: [
        'Non-trading holding companies',
        'Companies awaiting activation',
        'Shelf companies',
        'Companies temporarily ceased trading'
      ]
    }
  }
}

/**
 * Companies Act 2006 Key Requirements
 */
export function getCompaniesActRequirements() {
  return {
    name: 'Companies Act 2006',
    keyRequirements: {
      accounting: [
        'Directors must prepare accounts for each financial year (s394)',
        'Accounts must show true and fair view (s393)',
        'Must comply with applicable accounting framework (s395-396)',
        'Group accounts required if parent company (s399)',
        'Individual accounts required for each company (s394)'
      ],
      filing: [
        'Private companies: 9 months after year end (s442)',
        'Public companies: 6 months after year end (s442)',
        'Penalties for late filing increase with delay',
        'Companies House may strike off for persistent non-filing'
      ],
      audit: [
        'Companies require audit unless exempt (s475)',
        'Small company audit exemption: turnover ≤£10.2m, balance sheet ≤£5.1m (s477)',
        'Dormant company audit exemption (s480)',
        'Audit exemption not available for public companies, financial services, etc.',
        'Shareholders can require audit if hold ≥10% shares (s476)'
      ],
      directors: [
        'Directors report required (s415)',
        'Strategic report required for certain companies (s414A)',
        'Directors responsible for maintaining accounting records (s386)',
        'Criminal offence to approve non-compliant accounts (s414)',
        'Statement of directors responsibilities'
      ]
    },
    formats: {
      balanceSheet: [
        'Format 1: Traditional UK format (fixed assets, current assets, etc.)',
        'Format 2: Alternative format',
        'Must include called up share capital, reserves, provisions',
        'Comparative figures required'
      ],
      profitAndLoss: [
        'Format 1: Expenses by nature',
        'Format 2: Expenses by function',
        'Format 3: Mixed presentation',
        'Format 4: Alternative presentation',
        'Must show turnover, operating profit, interest, tax, profit after tax'
      ]
    }
  }
}

/**
 * Get comprehensive accounting guidance
 */
export function getAccountingGuidanceForScenario(scenario: {
  companySize?: 'micro' | 'small' | 'medium' | 'large'
  accountsType?: string
  listed?: boolean
  groupCompany?: boolean
}) {
  const { companySize, accountsType, listed, groupCompany } = scenario
  
  let applicableStandards: string[] = []
  let requirements: string[] = []
  
  if (listed) {
    applicableStandards.push('Full EU-adopted IFRS')
    requirements.push('Full IFRS compliance mandatory for listed companies')
  } else if (companySize === 'micro') {
    applicableStandards.push('FRS 105 (or can choose FRS 102)')
    requirements.push('Micro-entity regime available if qualifying')
  } else if (groupCompany) {
    applicableStandards.push('FRS 101 (if qualifying) or FRS 102')
    requirements.push('Consider reduced disclosure framework if subsidiary of IFRS parent')
  } else {
    applicableStandards.push('FRS 102 (main UK GAAP)')
    requirements.push('Standard UK GAAP for most UK companies')
  }
  
  return {
    applicableStandards,
    requirements,
    companiesActCompliance: getCompaniesActRequirements()
  }
}

// Standard IAS Chart of Accounts
export interface AccountCode {
  code: string
  name: string
  category?: string
  groupNumber?: string
}

export interface AccountGroup {
  groupNumber: string
  groupName: string
  accounts: AccountCode[]
}

export interface AccountCategory {
  category: string
  groups: AccountGroup[]
}

export const chartOfAccounts: AccountCategory[] = [
  { category: 'Income Statement', groups: [
      { groupNumber: '1', groupName: 'REVENUE', accounts: [
          { code: '1', name: 'Sales', groupNumber: '1', category: 'Income' },
          { code: '2', name: 'Contracts', groupNumber: '1', category: 'Income' },
          { code: '11', name: 'Revenue from contracts with customers', groupNumber: '1', category: 'Income' }
        ]},
      { groupNumber: '21', groupName: 'COST OF SALES', accounts: [
          { code: '17', name: 'Opening valuation', groupNumber: '21', category: 'Cost of Sales' },
          { code: '18', name: 'Opening stock', groupNumber: '21', category: 'Cost of Sales' },
          { code: '19', name: 'Opening raw materials', groupNumber: '21', category: 'Cost of Sales' },
          { code: '20', name: 'Cost of sales (20)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '21', name: 'Cost of sales (21)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '22', name: 'Cost of sales (22)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '23', name: 'Cost of sales (23)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '24', name: 'Cost of sales (24)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '25', name: 'Cost of sales (25)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '26', name: 'Cost of sales (26)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '27', name: 'Purchases', groupNumber: '21', category: 'Cost of Sales' },
          { code: '28', name: 'Cost of sales (28)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '29', name: 'Cost of sales (29)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '30', name: 'Cost of sales (30)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '31', name: 'Cost of sales (31)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '32', name: 'Cost of sales (32)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '33', name: 'Cost of sales (33)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '34', name: 'Cost of sales (34)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '35', name: 'Cost of sales (35)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '36', name: 'Cost of sales (36)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '37', name: 'Cost of sales (37)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '38', name: 'Cost of sales (38)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '39', name: 'Cost of sales (39)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '40', name: 'Cost of sales (40)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '41', name: 'Cost of sales (41)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '42', name: 'Cost of sales (42)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '43', name: "Directors' remuneration", groupNumber: '21', category: 'Cost of Sales' },
          { code: '44', name: 'Wages', groupNumber: '21', category: 'Cost of Sales' },
          { code: '45', name: 'Social security', groupNumber: '21', category: 'Cost of Sales' },
          { code: '46', name: 'Pensions', groupNumber: '21', category: 'Cost of Sales' },
          { code: '47', name: 'Cost of sales (47)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '48', name: 'Cost of sales (48)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '49', name: 'IFRS 16 Leases', groupNumber: '21', category: 'Cost of Sales' },
          { code: '50', name: 'Hire of plant and machinery', groupNumber: '21', category: 'Cost of Sales' },
          { code: '51', name: 'Cost of sales (51)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '52', name: 'Cost of sales (52)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '53', name: 'Sub contractors', groupNumber: '21', category: 'Cost of Sales' },
          { code: '54', name: 'Cost of sales (54)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '55', name: 'Cost of sales (55)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '56', name: 'Cost of sales (56)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '57', name: 'Cost of sales (57)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '58', name: 'Cost of sales (58)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '59', name: 'Cost of sales (59)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '60', name: 'Cost of sales (60)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '61', name: 'Cost of sales (61)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '62', name: 'Cost of sales (62)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '63', name: 'Cost of sales (63)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '64', name: 'Cost of sales (64)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '65', name: 'Amortisation of intangible assets', groupNumber: '21', category: 'Cost of Sales' },
          { code: '66', name: 'Depreciation of tangible assets', groupNumber: '21', category: 'Cost of Sales' },
          { code: '67', name: 'Cost of sales (67)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '68', name: 'Cost of sales (68)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '69', name: 'Cost of sales (69)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '70', name: 'Cost of sales (70)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '71', name: 'Cost of sales (71)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '72', name: 'Cost of sales (72)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '73', name: 'Closing valuation', groupNumber: '21', category: 'Cost of Sales' },
          { code: '74', name: 'Closing stock', groupNumber: '21', category: 'Cost of Sales' },
          { code: '75', name: 'Closing raw materials', groupNumber: '21', category: 'Cost of Sales' },
          { code: '76', name: 'Cost of sales (76)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '77', name: 'Cost of sales (77)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '78', name: 'Cost of sales (78)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '79', name: 'Cost of sales (79)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '80', name: 'Cost of sales (80)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '81', name: 'Cost of sales (81)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '82', name: 'Cost of sales (82)', groupNumber: '21', category: 'Cost of Sales' },
          { code: '83', name: 'Gain/loss on revaluation of assets', groupNumber: '21', category: 'Cost of Sales' }
        ]},
      { groupNumber: '101', groupName: 'DISTRIBUTION COSTS', accounts: [
          { code: '151', name: "Directors' remuneration", groupNumber: '101', category: 'Expenses' },
          { code: '152', name: 'Wages', groupNumber: '101', category: 'Expenses' },
          { code: '153', name: 'Social security', groupNumber: '101', category: 'Expenses' },
          { code: '154', name: 'Pensions', groupNumber: '101', category: 'Expenses' }
        ]},
      { groupNumber: '151', groupName: 'ADMINISTRATIVE EXPENSES', accounts: [
          { code: '220', name: "Directors' remuneration", groupNumber: '151', category: 'Expenses' },
          { code: '221', name: 'Wages', groupNumber: '151', category: 'Expenses' },
          { code: '222', name: 'Social security', groupNumber: '151', category: 'Expenses' },
          { code: '223', name: 'Pensions', groupNumber: '151', category: 'Expenses' },
          { code: '224', name: 'Staff training', groupNumber: '151', category: 'Expenses' },
          { code: '225', name: 'Recruitment costs', groupNumber: '151', category: 'Expenses' },
          { code: '226', name: 'Staff welfare', groupNumber: '151', category: 'Expenses' },
          { code: '227', name: 'Redundancy costs', groupNumber: '151', category: 'Expenses' },
          { code: '228', name: 'Medical insurance', groupNumber: '151', category: 'Expenses' },
          { code: '229', name: 'Life insurance', groupNumber: '151', category: 'Expenses' },
          { code: '230', name: 'Health and safety', groupNumber: '151', category: 'Expenses' },
          { code: '235', name: 'Rent', groupNumber: '151', category: 'Expenses' },
          { code: '236', name: 'Rates', groupNumber: '151', category: 'Expenses' },
          { code: '237', name: 'Water charges', groupNumber: '151', category: 'Expenses' },
          { code: '238', name: 'Electricity', groupNumber: '151', category: 'Expenses' },
          { code: '239', name: 'Gas', groupNumber: '151', category: 'Expenses' },
          { code: '240', name: 'Heating oil', groupNumber: '151', category: 'Expenses' },
          { code: '241', name: 'Cleaning', groupNumber: '151', category: 'Expenses' },
          { code: '242', name: 'Security', groupNumber: '151', category: 'Expenses' },
          { code: '243', name: 'Repairs and maintenance', groupNumber: '151', category: 'Expenses' },
          { code: '244', name: 'Buildings insurance', groupNumber: '151', category: 'Expenses' },
          { code: '249', name: 'IFRS 16 Leases', groupNumber: '151', category: 'Expenses' },
          { code: '250', name: 'Hire of equipment', groupNumber: '151', category: 'Expenses' },
          { code: '251', name: 'Computer costs', groupNumber: '151', category: 'Expenses' },
          { code: '252', name: 'IT support', groupNumber: '151', category: 'Expenses' },
          { code: '253', name: 'Software licenses', groupNumber: '151', category: 'Expenses' },
          { code: '254', name: 'Cloud services', groupNumber: '151', category: 'Expenses' },
          { code: '255', name: 'Website hosting', groupNumber: '151', category: 'Expenses' },
          { code: '259', name: 'Mobile phones', groupNumber: '151', category: 'Expenses' },
          { code: '260', name: 'Landline phones', groupNumber: '151', category: 'Expenses' },
          { code: '263', name: 'Telephone', groupNumber: '151', category: 'Expenses' },
          { code: '264', name: 'Post and stationery', groupNumber: '151', category: 'Expenses' },
          { code: '265', name: 'Advertising', groupNumber: '151', category: 'Expenses' },
          { code: '266', name: 'Printing', groupNumber: '151', category: 'Expenses' },
          { code: '267', name: 'Motor expenses', groupNumber: '151', category: 'Expenses' },
          { code: '268', name: 'Fuel', groupNumber: '151', category: 'Expenses' },
          { code: '269', name: 'Vehicle insurance', groupNumber: '151', category: 'Expenses' },
          { code: '270', name: 'Vehicle repairs', groupNumber: '151', category: 'Expenses' },
          { code: '277', name: 'Travel expenses', groupNumber: '151', category: 'Expenses' },
          { code: '282', name: 'Hotel accommodation', groupNumber: '151', category: 'Expenses' },
          { code: '283', name: 'Subsistence', groupNumber: '151', category: 'Expenses' },
          { code: '284', name: 'Entertaining', groupNumber: '151', category: 'Expenses' },
          { code: '289', name: 'Subscriptions', groupNumber: '151', category: 'Expenses' },
          { code: '290', name: 'Legal fees', groupNumber: '151', category: 'Expenses' },
          { code: '291', name: 'Professional fees', groupNumber: '151', category: 'Expenses' },
          { code: '292', name: "Auditors' remuneration", groupNumber: '151', category: 'Expenses' },
          { code: '293', name: 'Accountancy fees', groupNumber: '151', category: 'Expenses' },
          { code: '294', name: 'Consultancy fees', groupNumber: '151', category: 'Expenses' },
          { code: '295', name: 'Tax advice', groupNumber: '151', category: 'Expenses' },
          { code: '296', name: 'VAT advice', groupNumber: '151', category: 'Expenses' },
          { code: '302', name: 'Bank charges', groupNumber: '151', category: 'Expenses' },
          { code: '305', name: 'Interest payable', groupNumber: '151', category: 'Expenses' },
          { code: '311', name: 'Foreign exchange losses', groupNumber: '151', category: 'Expenses' },
          { code: '313', name: 'Bad debts', groupNumber: '151', category: 'Expenses' },
          { code: '321', name: 'Insurance - general', groupNumber: '151', category: 'Expenses' },
          { code: '322', name: 'Public liability insurance', groupNumber: '151', category: 'Expenses' },
          { code: '323', name: 'Employers liability insurance', groupNumber: '151', category: 'Expenses' },
          { code: '324', name: 'Professional indemnity', groupNumber: '151', category: 'Expenses' },
          { code: '343', name: 'Office supplies', groupNumber: '151', category: 'Expenses' },
          { code: '396', name: 'Amortisation of intangibles', groupNumber: '151', category: 'Expenses' },
          { code: '397', name: 'Depreciation of tangibles', groupNumber: '151', category: 'Expenses' },
          { code: '398', name: 'Impairment losses', groupNumber: '151', category: 'Expenses' },
          { code: '399', name: 'Provision for bad debts', groupNumber: '151', category: 'Expenses' }
        ]}
    ]},
  { category: 'Balance Sheet', groups: [
      { groupNumber: '411', groupName: 'NON-CURRENT ASSETS - INTANGIBLES', accounts: [
          { code: '502', name: 'Goodwill', groupNumber: '411', category: 'Assets' },
          { code: '503', name: 'Goodwill - cost', groupNumber: '411', category: 'Assets' },
          { code: '504', name: 'Goodwill - accumulated amortisation', groupNumber: '411', category: 'Assets' },
          { code: '505', name: 'Development costs', groupNumber: '411', category: 'Assets' },
          { code: '506', name: 'Patents', groupNumber: '411', category: 'Assets' },
          { code: '507', name: 'Trademarks', groupNumber: '411', category: 'Assets' }
        ]},
      { groupNumber: '421', groupName: 'NON-CURRENT ASSETS - TANGIBLES', accounts: [
          { code: '508', name: 'Freehold land and buildings', groupNumber: '421', category: 'Assets' },
          { code: '509', name: 'Freehold land - cost', groupNumber: '421', category: 'Assets' },
          { code: '510', name: 'Freehold buildings - cost', groupNumber: '421', category: 'Assets' },
          { code: '511', name: 'Freehold buildings - depreciation', groupNumber: '421', category: 'Assets' },
          { code: '515', name: 'Leasehold property', groupNumber: '421', category: 'Assets' },
          { code: '516', name: 'Leasehold property - cost', groupNumber: '421', category: 'Assets' },
          { code: '517', name: 'Leasehold property - depreciation', groupNumber: '421', category: 'Assets' },
          { code: '522', name: 'Plant and machinery', groupNumber: '421', category: 'Assets' },
          { code: '523', name: 'Plant and machinery - cost', groupNumber: '421', category: 'Assets' },
          { code: '524', name: 'Plant and machinery - depreciation', groupNumber: '421', category: 'Assets' },
          { code: '529', name: 'Fixtures and fittings', groupNumber: '421', category: 'Assets' },
          { code: '530', name: 'Fixtures and fittings - cost', groupNumber: '421', category: 'Assets' },
          { code: '531', name: 'Fixtures and fittings - depreciation', groupNumber: '421', category: 'Assets' },
          { code: '536', name: 'Motor vehicles', groupNumber: '421', category: 'Assets' },
          { code: '537', name: 'Motor vehicles - cost', groupNumber: '421', category: 'Assets' },
          { code: '538', name: 'Motor vehicles - depreciation', groupNumber: '421', category: 'Assets' },
          { code: '543', name: 'Computer equipment', groupNumber: '421', category: 'Assets' },
          { code: '544', name: 'Computer equipment - cost', groupNumber: '421', category: 'Assets' },
          { code: '545', name: 'Computer equipment - depreciation', groupNumber: '421', category: 'Assets' },
          { code: '550', name: 'Office equipment', groupNumber: '421', category: 'Assets' },
          { code: '551', name: 'Office equipment - cost', groupNumber: '421', category: 'Assets' },
          { code: '552', name: 'Office equipment - depreciation', groupNumber: '421', category: 'Assets' }
        ]},
      { groupNumber: '481', groupName: 'CURRENT ASSETS', accounts: [
          { code: '560', name: 'Raw materials stock', groupNumber: '481', category: 'Assets' },
          { code: '563', name: 'Work in progress', groupNumber: '481', category: 'Assets' },
          { code: '566', name: 'Finished goods stock', groupNumber: '481', category: 'Assets' },
          { code: '568', name: 'Stock', groupNumber: '481', category: 'Assets' },
          { code: '575', name: 'Trade debtors - UK', groupNumber: '481', category: 'Assets' },
          { code: '578', name: 'Trade debtors - Export', groupNumber: '481', category: 'Assets' },
          { code: '581', name: 'Trade debtors - Intra-EU', groupNumber: '481', category: 'Assets' },
          { code: '583', name: 'Trade debtors', groupNumber: '481', category: 'Assets' },
          { code: '584', name: 'Provision for bad debts', groupNumber: '481', category: 'Assets' },
          { code: '586', name: 'Prepayments', groupNumber: '481', category: 'Assets' },
          { code: '587', name: 'Accrued income', groupNumber: '481', category: 'Assets' },
          { code: '590', name: 'Other debtors', groupNumber: '481', category: 'Assets' },
          { code: '592', name: 'VAT recoverable', groupNumber: '481', category: 'Assets' },
          { code: '595', name: 'Corporation tax recoverable', groupNumber: '481', category: 'Assets' },
          { code: '598', name: 'Deposits paid', groupNumber: '481', category: 'Assets' },
          { code: '601', name: 'Current asset investments', groupNumber: '481', category: 'Assets' },
          { code: '605', name: 'Short term deposits', groupNumber: '481', category: 'Assets' },
          { code: '608', name: 'Cash at bank', groupNumber: '481', category: 'Assets' },
          { code: '610', name: 'Cash in hand', groupNumber: '481', category: 'Assets' },
          { code: '611', name: 'Cash at bank and in hand', groupNumber: '481', category: 'Assets' },
          { code: '613', name: 'Bank deposit account', groupNumber: '481', category: 'Assets' },
          { code: '615', name: 'Petty cash', groupNumber: '481', category: 'Assets' }
        ]},
      { groupNumber: '649', groupName: 'CURRENT LIABILITIES', accounts: [
          { code: '720', name: 'Bank overdraft', groupNumber: '649', category: 'Liabilities' },
          { code: '725', name: 'Bank loans - short term', groupNumber: '649', category: 'Liabilities' },
          { code: '730', name: 'Trade creditors - UK', groupNumber: '649', category: 'Liabilities' },
          { code: '733', name: 'Trade creditors - Import', groupNumber: '649', category: 'Liabilities' },
          { code: '735', name: 'Trade creditors - Intra-EU', groupNumber: '649', category: 'Liabilities' },
          { code: '737', name: 'Trade creditors', groupNumber: '649', category: 'Liabilities' },
          { code: '740', name: 'Accruals', groupNumber: '649', category: 'Liabilities' },
          { code: '743', name: 'Deferred income', groupNumber: '649', category: 'Liabilities' },
          { code: '745', name: 'VAT payable', groupNumber: '649', category: 'Liabilities' },
          { code: '747', name: 'Taxation', groupNumber: '649', category: 'Liabilities' },
          { code: '748', name: 'Corporation tax payable', groupNumber: '649', category: 'Liabilities' },
          { code: '750', name: 'PAYE/NIC payable', groupNumber: '649', category: 'Liabilities' },
          { code: '752', name: 'Pension contributions payable', groupNumber: '649', category: 'Liabilities' },
          { code: '755', name: 'Social security and other taxes', groupNumber: '649', category: 'Liabilities' },
          { code: '758', name: 'Other creditors', groupNumber: '649', category: 'Liabilities' },
          { code: '760', name: 'Directors loan account', groupNumber: '649', category: 'Liabilities' },
          { code: '763', name: 'Hire purchase - current portion', groupNumber: '649', category: 'Liabilities' },
          { code: '765', name: 'Finance leases - current portion', groupNumber: '649', category: 'Liabilities' },
          { code: '768', name: 'Dividends payable', groupNumber: '649', category: 'Liabilities' }
        ]},
      { groupNumber: '749', groupName: 'NON-CURRENT LIABILITIES', accounts: [
          { code: '800', name: 'Bank loans - long term', groupNumber: '749', category: 'Liabilities' },
          { code: '803', name: 'Director loans - long term', groupNumber: '749', category: 'Liabilities' },
          { code: '806', name: 'Hire purchase - long term', groupNumber: '749', category: 'Liabilities' },
          { code: '809', name: 'Finance leases - long term', groupNumber: '749', category: 'Liabilities' },
          { code: '812', name: 'Debentures', groupNumber: '749', category: 'Liabilities' },
          { code: '815', name: 'Provision for liabilities', groupNumber: '749', category: 'Liabilities' },
          { code: '818', name: 'Deferred taxation', groupNumber: '749', category: 'Liabilities' },
          { code: '821', name: 'Pension provision', groupNumber: '749', category: 'Liabilities' }
        ]},
      { groupNumber: '801', groupName: 'SHARE CAPITAL', accounts: [
          { code: '960', name: 'Authorised share capital', groupNumber: '801', category: 'Equity' },
          { code: '963', name: 'Issued share capital', groupNumber: '801', category: 'Equity' },
          { code: '966', name: 'Called up share capital', groupNumber: '801', category: 'Equity' },
          { code: '967', name: 'Ordinary shares', groupNumber: '801', category: 'Equity' }
        ]},
      { groupNumber: '811', groupName: 'RESERVES', accounts: [
          { code: '968', name: 'Profit and loss account', groupNumber: '811', category: 'Equity' },
          { code: '969', name: 'Share premium', groupNumber: '811', category: 'Equity' },
          { code: '970', name: 'Revaluation reserve', groupNumber: '811', category: 'Equity' },
          { code: '971', name: 'Capital redemption reserve', groupNumber: '811', category: 'Equity' },
          { code: '972', name: 'Other reserves', groupNumber: '811', category: 'Equity' },
          { code: '973', name: 'Retained earnings', groupNumber: '811', category: 'Equity' },
          { code: '974', name: 'Treasury shares', groupNumber: '811', category: 'Equity' },
          { code: '975', name: 'Translation reserve', groupNumber: '811', category: 'Equity' }
        ]}
    ]}
]


const accountTransactions: Record<string, number> = {
  '1': 5,
  '27': 12,
  '568': 8,
  '583': 15,
  '611': 20
}

export function getAllAccounts() {
  const accounts: AccountCode[] = []
  chartOfAccounts.forEach(cat => cat.groups.forEach(g => accounts.push(...g.accounts)))
  return accounts
}

export function searchAccounts(term: string) {
  const lower = term.toLowerCase()
  return getAllAccounts().filter(a => 
    a.code.toLowerCase().includes(lower) || a.name.toLowerCase().includes(lower)
  )
}

export function findAccount(code: string): AccountCode | undefined {
  return getAllAccounts().find(a => a.code === code)
}

export function hasTransactions(code: string): boolean {
  return (accountTransactions[code] || 0) > 0
}

export function getTransactionCount(code: string): number {
  return accountTransactions[code] || 0
}

export function addAccount(account: AccountCode): boolean {
  for (const cat of chartOfAccounts) {
    const group = cat.groups.find(g => g.groupNumber === account.groupNumber)
    if (group) {
      const exists = getAllAccounts().some(a => a.code === account.code)
      if (exists) {
        return false
      }
      group.accounts.push(account)
      return true
    }
  }
  return false
}

export function updateAccount(code: string, updatedAccount: Partial<AccountCode>): boolean {
  for (const cat of chartOfAccounts) {
    for (const group of cat.groups) {
      const accountIndex = group.accounts.findIndex(a => a.code === code)
      if (accountIndex !== -1) {
        group.accounts[accountIndex] = { ...group.accounts[accountIndex], ...updatedAccount }
        return true
      }
    }
  }
  return false
}

export function deleteAccount(code: string): { success: boolean; message: string } {
  if (hasTransactions(code)) {
    return {
      success: false,
      message: `Cannot delete account ${code}. It has ${getTransactionCount(code)} transaction(s) associated with it.`
    }
  }

  for (const cat of chartOfAccounts) {
    for (const group of cat.groups) {
      const accountIndex = group.accounts.findIndex(a => a.code === code)
      if (accountIndex !== -1) {
        group.accounts.splice(accountIndex, 1)
        return { success: true, message: 'Account deleted successfully' }
      }
    }
  }
  
  return { success: false, message: 'Account not found' }
}

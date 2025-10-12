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
          { code: '43', name: 'Directors' remuneration', groupNumber: '21', category: 'Cost of Sales' },
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
          { code: '151', name: 'Directors' remuneration', groupNumber: '101', category: 'Expenses' },
          { code: '152', name: 'Wages', groupNumber: '101', category: 'Expenses' },
          { code: '153', name: 'Social security', groupNumber: '101', category: 'Expenses' },
          { code: '154', name: 'Pensions', groupNumber: '101', category: 'Expenses' }
        ]},
      { groupNumber: '151', groupName: 'ADMINISTRATIVE EXPENSES', accounts: [
          { code: '220', name: 'Directors' remuneration', groupNumber: '151', category: 'Expenses' },
          { code: '221', name: 'Wages', groupNumber: '151', category: 'Expenses' },
          { code: '263', name: 'Telephone', groupNumber: '151', category: 'Expenses' },
          { code: '264', name: 'Post and stationery', groupNumber: '151', category: 'Expenses' },
          { code: '265', name: 'Advertising', groupNumber: '151', category: 'Expenses' },
          { code: '267', name: 'Motor expenses', groupNumber: '151', category: 'Expenses' },
          { code: '290', name: 'Legal fees', groupNumber: '151', category: 'Expenses' },
          { code: '292', name: 'Auditors' remuneration', groupNumber: '151', category: 'Expenses' }
        ]}
    ]},
  { category: 'Balance Sheet', groups: [
      { groupNumber: '411', groupName: 'NON-CURRENT ASSETS', accounts: [
          { code: '502', name: 'Goodwill', groupNumber: '411', category: 'Assets' },
          { code: '508', name: 'Freehold land and buildings', groupNumber: '411', category: 'Assets' },
          { code: '522', name: 'Plant and machinery', groupNumber: '411', category: 'Assets' },
          { code: '529', name: 'Fixtures and fittings', groupNumber: '411', category: 'Assets' },
          { code: '536', name: 'Motor vehicles', groupNumber: '411', category: 'Assets' },
          { code: '543', name: 'Computer equipment', groupNumber: '411', category: 'Assets' }
        ]},
      { groupNumber: '481', groupName: 'CURRENT ASSETS', accounts: [
          { code: '568', name: 'Stock', groupNumber: '481', category: 'Assets' },
          { code: '583', name: 'Trade debtors', groupNumber: '481', category: 'Assets' },
          { code: '590', name: 'Other debtors', groupNumber: '481', category: 'Assets' },
          { code: '611', name: 'Cash at bank and in hand', groupNumber: '481', category: 'Assets' }
        ]},
      { groupNumber: '649', groupName: 'CURRENT LIABILITIES', accounts: [
          { code: '737', name: 'Trade creditors', groupNumber: '649', category: 'Liabilities' },
          { code: '747', name: 'Taxation', groupNumber: '649', category: 'Liabilities' },
          { code: '755', name: 'Social security and other taxes', groupNumber: '649', category: 'Liabilities' }
        ]},
      { groupNumber: '801', groupName: 'SHARE CAPITAL', accounts: [
          { code: '966', name: 'Called up share capital', groupNumber: '801', category: 'Equity' }
        ]},
      { groupNumber: '811', groupName: 'RESERVES', accounts: [
          { code: '968', name: 'Profit and loss account', groupNumber: '811', category: 'Equity' },
          { code: '969', name: 'Share premium', groupNumber: '811', category: 'Equity' },
          { code: '970', name: 'Revaluation reserve', groupNumber: '811', category: 'Equity' }
        ]}
    ]}
]

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

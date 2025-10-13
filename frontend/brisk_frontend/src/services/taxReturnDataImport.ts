interface BookkeepingData {
  sales: {
    totalRevenue: number
    invoices: Array<{
      id: string
      date: string
      amount: number
      description: string
    }>
  }
  purchases: {
    totalExpenses: number
    bills: Array<{
      id: string
      date: string
      amount: number
      category: string
    }>
  }
  banking: {
    transactions: Array<{
      id: string
      date: string
      description: string
      amount: number
      type: 'credit' | 'debit'
    }>
  }
}

interface AccountsProductionData {
  trialBalance: Array<{
    accountCode: string
    accountName: string
    debit: number
    credit: number
    category: string
  }>
  clientDetails: {
    businessName: string
    tradingName?: string
    businessType: string
    accountingPeriodEnd: string
  }
}

export async function importFromBookkeeping(clientId: string): Promise<any> {
  try {
    const bookkeepingData: BookkeepingData = {
      sales: {
        totalRevenue: 0,
        invoices: []
      },
      purchases: {
        totalExpenses: 0,
        bills: []
      },
      banking: {
        transactions: []
      }
    }

    const selfEmploymentIncome = bookkeepingData.sales.totalRevenue
    const businessExpenses = bookkeepingData.purchases.totalExpenses
    
    const selfEmploymentDetails = [{
      id: `se-${Date.now()}`,
      businessName: 'Business from Bookkeeping',
      businessDescription: 'Imported from Bookkeeping Module',
      accountingBasis: 'cash' as const,
      accountsPeriodEnd: new Date().toISOString().split('T')[0],
      turnover: bookkeepingData.sales.totalRevenue,
      otherBusinessIncome: 0,
      tradingIncomeAllowanceClaimed: false,
      tradingIncomeAllowanceAmount: 0,
      costOfGoods: 0,
      paymentsToSubcontractors: 0,
      staffCosts: 0,
      carTravelExpenses: 0,
      rentRatesPowerInsurance: 0,
      repairsMaintenance: 0,
      phoneStationeryOffice: 0,
      advertisingEntertainment: 0,
      interestOnLoans: 0,
      bankCharges: 0,
      irrecoverableDebts: 0,
      accountancyLegalFees: 0,
      depreciationLossProfitOnSale: 0,
      otherBusinessExpenses: bookkeepingData.purchases.totalExpenses,
      privateUseAdjustments: 0,
      disallowables: 0,
      capitalAllowances: {
        annualInvestmentAllowance: 0,
        otherCapitalAllowances: 0
      },
      netProfit: bookkeepingData.sales.totalRevenue - bookkeepingData.purchases.totalExpenses,
      netLoss: 0
    }]

    return {
      selfEmploymentIncome,
      selfEmploymentDetails,
      businessExpenses,
      importSource: 'bookkeeping'
    }
  } catch (error) {
    console.error('Error importing from bookkeeping:', error)
    throw new Error('Failed to import data from Bookkeeping module')
  }
}

export async function importFromAccountsProduction(clientId: string): Promise<any> {
  try {
    const accountsData: AccountsProductionData = {
      trialBalance: [],
      clientDetails: {
        businessName: '',
        businessType: '',
        accountingPeriodEnd: ''
      }
    }

    const income = accountsData.trialBalance
      .filter(entry => entry.category === 'Income' || entry.category === 'Revenue')
      .reduce((sum, entry) => sum + entry.credit, 0)

    const expenses = accountsData.trialBalance
      .filter(entry => entry.category === 'Expenses' || entry.category === 'Cost of Sales')
      .reduce((sum, entry) => sum + entry.debit, 0)

    const selfEmploymentDetails = [{
      id: `se-${Date.now()}`,
      businessName: accountsData.clientDetails.businessName || 'Business from Accounts',
      businessDescription: 'Imported from Accounts Production',
      accountingBasis: 'traditional' as const,
      accountsPeriodEnd: accountsData.clientDetails.accountingPeriodEnd || new Date().toISOString().split('T')[0],
      turnover: income,
      otherBusinessIncome: 0,
      tradingIncomeAllowanceClaimed: false,
      tradingIncomeAllowanceAmount: 0,
      costOfGoods: accountsData.trialBalance
        .filter(entry => entry.accountName.toLowerCase().includes('cost of sales'))
        .reduce((sum, entry) => sum + entry.debit, 0),
      paymentsToSubcontractors: accountsData.trialBalance
        .filter(entry => entry.accountName.toLowerCase().includes('subcontractor'))
        .reduce((sum, entry) => sum + entry.debit, 0),
      staffCosts: accountsData.trialBalance
        .filter(entry => entry.accountName.toLowerCase().includes('wages') || entry.accountName.toLowerCase().includes('salaries'))
        .reduce((sum, entry) => sum + entry.debit, 0),
      carTravelExpenses: accountsData.trialBalance
        .filter(entry => entry.accountName.toLowerCase().includes('travel') || entry.accountName.toLowerCase().includes('motor'))
        .reduce((sum, entry) => sum + entry.debit, 0),
      rentRatesPowerInsurance: accountsData.trialBalance
        .filter(entry => entry.accountName.toLowerCase().includes('rent') || entry.accountName.toLowerCase().includes('insurance'))
        .reduce((sum, entry) => sum + entry.debit, 0),
      repairsMaintenance: accountsData.trialBalance
        .filter(entry => entry.accountName.toLowerCase().includes('repair'))
        .reduce((sum, entry) => sum + entry.debit, 0),
      phoneStationeryOffice: accountsData.trialBalance
        .filter(entry => entry.accountName.toLowerCase().includes('office') || entry.accountName.toLowerCase().includes('stationery'))
        .reduce((sum, entry) => sum + entry.debit, 0),
      advertisingEntertainment: accountsData.trialBalance
        .filter(entry => entry.accountName.toLowerCase().includes('advertising') || entry.accountName.toLowerCase().includes('marketing'))
        .reduce((sum, entry) => sum + entry.debit, 0),
      interestOnLoans: accountsData.trialBalance
        .filter(entry => entry.accountName.toLowerCase().includes('interest') && entry.accountName.toLowerCase().includes('loan'))
        .reduce((sum, entry) => sum + entry.debit, 0),
      bankCharges: accountsData.trialBalance
        .filter(entry => entry.accountName.toLowerCase().includes('bank charges'))
        .reduce((sum, entry) => sum + entry.debit, 0),
      irrecoverableDebts: accountsData.trialBalance
        .filter(entry => entry.accountName.toLowerCase().includes('bad debt'))
        .reduce((sum, entry) => sum + entry.debit, 0),
      accountancyLegalFees: accountsData.trialBalance
        .filter(entry => entry.accountName.toLowerCase().includes('professional fees') || entry.accountName.toLowerCase().includes('accountancy'))
        .reduce((sum, entry) => sum + entry.debit, 0),
      depreciationLossProfitOnSale: accountsData.trialBalance
        .filter(entry => entry.accountName.toLowerCase().includes('depreciation'))
        .reduce((sum, entry) => sum + entry.debit, 0),
      otherBusinessExpenses: 0,
      privateUseAdjustments: 0,
      disallowables: 0,
      capitalAllowances: {
        annualInvestmentAllowance: 0,
        otherCapitalAllowances: 0
      },
      netProfit: income - expenses,
      netLoss: 0
    }]

    return {
      selfEmploymentIncome: income,
      selfEmploymentDetails,
      businessExpenses: expenses,
      importSource: 'accounts'
    }
  } catch (error) {
    console.error('Error importing from accounts production:', error)
    throw new Error('Failed to import data from Accounts Production module')
  }
}

export async function importFromPreviousYear(previousReturnId: string): Promise<any> {
  try {
    return {
      importSource: 'previous',
      message: 'Data will be copied from previous year return'
    }
  } catch (error) {
    console.error('Error importing from previous year:', error)
    throw new Error('Failed to import data from previous year')
  }
}

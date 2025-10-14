/**
 * Corporation Tax Data Service
 * Enterprise-grade CT600, R&D Claims, Reliefs & Credits, Group Relief data management
 */

export interface CTClient {
  id: string
  companyName: string
  companyNumber: string
  utr: string
  accountingPeriodStart: string
  accountingPeriodEnd: string
  taxYear: string
  status: 'draft' | 'in-progress' | 'submitted' | 'approved' | 'filed'
  taxDue: number
  filingDeadline: string
  contactPerson: string
  email: string
  phone: string
  address: string
  registeredOffice: string
  natureOfBusiness: string
  isLargeCompany: boolean
  isGroupMember: boolean
  quarterlyInstalmentsRequired: boolean
  createdDate: string
  lastModified: string
}

export interface CT600Computation {
  id: string
  clientId: string
  taxYear: string
  accountingPeriodStart: string
  accountingPeriodEnd: string
  profitBeforeTax: number
  adjustments: number
  capitalAllowances: number
  taxableProfit: number
  corporationTaxRate: number
  corporationTax: number
  marginalRelief: number
  rdRelief: number
  patentBoxRelief: number
  creativeIndustryRelief: number
  otherReliefs: number
  groupRelief: number
  totalReliefs: number
  taxAfterReliefs: number
  quarterlyPayments: number
  taxDue: number
  status: 'draft' | 'in-progress' | 'validated' | 'submitted' | 'approved'
  validationErrors: string[]
  createdDate: string
  lastModified: string
}

export interface RDProject {
  id: string
  clientId: string
  projectName: string
  projectDescription: string
  startDate: string
  endDate: string
  taxYear: string
  scheme: 'SME' | 'RDEC' | 'Merged'
  staffCosts: number
  subcontractorCosts: number
  materialsCosts: number
  softwareCosts: number
  otherCosts: number
  totalQualifyingExpenditure: number
  enhancedExpenditure: number
  reliefClaimed: number
  taxCredit: number
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'claimed'
  technicalNarrative: string
  uncertainties: string
  advancementInField: string
  hmrcReference: string
  submissionDate: string
  approvalDate: string
  notes: string
  createdDate: string
  lastModified: string
}

export interface CapitalAllowance {
  id: string
  clientId: string
  taxYear: string
  assetType: 'Plant & Machinery' | 'Buildings' | 'Vehicles' | 'IT Equipment' | 'Fixtures & Fittings' | 'Other'
  poolType: 'Main Pool' | 'Special Rate Pool' | 'Single Asset Pool' | 'Short Life Asset' | 'Annual Investment Allowance'
  assetDescription: string
  acquisitionDate: string
  disposalDate?: string
  cost: number
  writtenDownValue: number
  allowanceClaimed: number
  disposalProceeds?: number
  balancingCharge?: number
  aiaUsed: number
  fya: number
  wda: number
  status: 'active' | 'disposed' | 'scrapped'
  notes: string
  createdDate: string
  lastModified: string
}

export interface PatentBoxClaim {
  id: string
  clientId: string
  taxYear: string
  patentName: string
  patentNumber: string
  patentRegistrationDate: string
  relevantIpIncome: number
  routineProfitFigure: number
  marketingAssetsReturnFigure: number
  qualifyingResidualProfit: number
  patentBoxDeduction: number
  effectiveTaxRate: number
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  notes: string
  createdDate: string
  lastModified: string
}

export interface CreativeIndustryRelief {
  id: string
  clientId: string
  taxYear: string
  reliefType: 'Film' | 'TV' | 'Animation' | 'Video Games' | 'Theatre' | 'Orchestra'
  productionName: string
  productionStartDate: string
  productionEndDate: string
  coreExpenditure: number
  totalProductionExpenditure: number
  ukExpenditure: number
  enhancedExpenditure: number
  reliefClaimed: number
  taxCredit: number
  britishCertification: boolean
  certificationNumber: string
  culturalTest: boolean
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  notes: string
  createdDate: string
  lastModified: string
}

export interface GroupReliefClaim {
  id: string
  claimantCompanyId: string
  surrenderingCompanyId: string
  surrenderingCompanyName: string
  surrenderingCompanyUTR: string
  accountingPeriod: string
  taxYear: string
  availableLosses: number
  lossesClaimed: number
  consentReceived: boolean
  consentDate: string
  electionDate: string
  reliefValue: number
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  notes: string
  createdDate: string
  lastModified: string
}

export interface QuarterlyPayment {
  id: string
  clientId: string
  taxYear: string
  installmentNumber: 1 | 2 | 3 | 4
  dueDate: string
  estimatedLiability: number
  paymentDue: number
  paymentMade: number
  paymentDate?: string
  status: 'pending' | 'paid' | 'overdue'
  reference: string
  notes: string
}

export interface TaxAdjustment {
  id: string
  clientId: string
  computationId: string
  category: 'Depreciation' | 'Entertainment' | 'Legal Fees' | 'Provisions' | 'Bad Debts' | 'Donations' | 'Other'
  description: string
  accountsAmount: number
  adjustment: number
  taxAmount: number
  isAddition: boolean
  notes: string
  createdDate: string
}

export interface CTClientFormData extends Omit<CTClient, 'id' | 'createdDate' | 'lastModified'> {}
export interface RDProjectFormData extends Omit<RDProject, 'id' | 'createdDate' | 'lastModified'> {}
export interface CapitalAllowanceFormData extends Omit<CapitalAllowance, 'id' | 'createdDate' | 'lastModified'> {}

class CorporationTaxDataService {
  private clients: CTClient[] = []
  private computations: CT600Computation[] = []
  private rdProjects: RDProject[] = []
  private capitalAllowances: CapitalAllowance[] = []
  private patentBoxClaims: PatentBoxClaim[] = []
  private creativeReliefs: CreativeIndustryRelief[] = []
  private groupReliefs: GroupReliefClaim[] = []
  private quarterlyPayments: QuarterlyPayment[] = []
  private adjustments: TaxAdjustment[] = []

  constructor() {
    this.loadSampleData()
  }

  private loadSampleData() {
    this.clients = [
      {
        id: 'CT001',
        companyName: 'TechInnovate Solutions Ltd',
        companyNumber: '12345678',
        utr: '1234567890',
        accountingPeriodStart: '2024-01-01',
        accountingPeriodEnd: '2024-12-31',
        taxYear: '2024-25',
        status: 'in-progress',
        taxDue: 54750,
        filingDeadline: '2025-12-31',
        contactPerson: 'Sarah Mitchell',
        email: 'sarah.mitchell@techinnovate.com',
        phone: '020 1234 5678',
        address: '123 Tech Street, London, EC1A 1BB',
        registeredOffice: '123 Tech Street, London, EC1A 1BB',
        natureOfBusiness: 'Software Development and IT Consulting',
        isLargeCompany: false,
        isGroupMember: true,
        quarterlyInstalmentsRequired: false,
        createdDate: '2024-01-15',
        lastModified: '2024-11-20'
      },
      {
        id: 'CT002',
        companyName: 'GreenBuild Construction Ltd',
        companyNumber: '87654321',
        utr: '0987654321',
        accountingPeriodStart: '2024-04-01',
        accountingPeriodEnd: '2025-03-31',
        taxYear: '2024-25',
        status: 'draft',
        taxDue: 127500,
        filingDeadline: '2026-03-31',
        contactPerson: 'James Thompson',
        email: 'james@greenbuild.co.uk',
        phone: '020 9876 5432',
        address: '45 Builder Road, Manchester, M1 1AA',
        registeredOffice: '45 Builder Road, Manchester, M1 1AA',
        natureOfBusiness: 'Sustainable Construction',
        isLargeCompany: false,
        isGroupMember: false,
        quarterlyInstalmentsRequired: false,
        createdDate: '2024-04-10',
        lastModified: '2024-11-18'
      },
      {
        id: 'CT003',
        companyName: 'HealthTech Innovations plc',
        companyNumber: '11223344',
        utr: '1122334455',
        accountingPeriodStart: '2024-01-01',
        accountingPeriodEnd: '2024-12-31',
        taxYear: '2024-25',
        status: 'submitted',
        taxDue: 892000,
        filingDeadline: '2025-12-31',
        contactPerson: 'Dr. Emma Wilson',
        email: 'emma.wilson@healthtech.co.uk',
        phone: '020 5555 1234',
        address: '200 Medical Plaza, Cambridge, CB2 1AA',
        registeredOffice: '200 Medical Plaza, Cambridge, CB2 1AA',
        natureOfBusiness: 'Medical Device R&D and Manufacturing',
        isLargeCompany: true,
        isGroupMember: true,
        quarterlyInstalmentsRequired: true,
        createdDate: '2024-01-05',
        lastModified: '2024-10-15'
      }
    ]

    this.rdProjects = [
      {
        id: 'RD001',
        clientId: 'CT001',
        projectName: 'AI Algorithm Development',
        projectDescription: 'Development of novel machine learning algorithms for natural language processing',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        taxYear: '2024-25',
        scheme: 'SME',
        staffCosts: 95000,
        subcontractorCosts: 25000,
        materialsCosts: 8000,
        softwareCosts: 15000,
        otherCosts: 7000,
        totalQualifyingExpenditure: 150000,
        enhancedExpenditure: 346500, // 231% for SME
        reliefClaimed: 46575,
        taxCredit: 0,
        status: 'approved',
        technicalNarrative: 'Advanced neural network architecture with novel attention mechanisms for improved NLP performance',
        uncertainties: 'Uncertainty regarding optimal hyperparameter configuration and model convergence rates',
        advancementInField: 'Significant improvement in processing speed and accuracy compared to existing solutions',
        hmrcReference: 'RD2024/001/TI',
        submissionDate: '2024-09-15',
        approvalDate: '2024-10-30',
        notes: 'HMRC approved without queries',
        createdDate: '2024-01-15',
        lastModified: '2024-10-30'
      },
      {
        id: 'RD002',
        clientId: 'CT002',
        projectName: 'Sustainable Building Materials Research',
        projectDescription: 'Development of eco-friendly construction materials with enhanced thermal properties',
        startDate: '2024-04-01',
        endDate: '2025-03-31',
        taxYear: '2024-25',
        scheme: 'SME',
        staffCosts: 65000,
        subcontractorCosts: 30000,
        materialsCosts: 45000,
        softwareCosts: 5000,
        otherCosts: 8000,
        totalQualifyingExpenditure: 153000,
        enhancedExpenditure: 353430,
        reliefClaimed: 47212,
        taxCredit: 0,
        status: 'pending',
        technicalNarrative: 'Novel composite materials combining recycled polymers with natural fibers for superior insulation',
        uncertainties: 'Unknown durability characteristics under extreme weather conditions and load-bearing capacity',
        advancementInField: 'First application of bio-based binders in structural applications meeting UK building standards',
        hmrcReference: 'RD2024/002/GB',
        submissionDate: '2024-11-01',
        approvalDate: '',
        notes: 'Awaiting HMRC review',
        createdDate: '2024-04-10',
        lastModified: '2024-11-01'
      },
      {
        id: 'RD003',
        clientId: 'CT003',
        projectName: 'Medical Diagnostic AI Platform',
        projectDescription: 'AI-powered diagnostic system for early disease detection using medical imaging',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        taxYear: '2024-25',
        scheme: 'RDEC',
        staffCosts: 450000,
        subcontractorCosts: 120000,
        materialsCosts: 80000,
        softwareCosts: 95000,
        otherCosts: 55000,
        totalQualifyingExpenditure: 800000,
        enhancedExpenditure: 800000,
        reliefClaimed: 0,
        taxCredit: 160000, // 20% RDEC
        status: 'approved',
        technicalNarrative: 'Deep learning models trained on multi-modal medical imaging datasets with FDA-equivalent validation',
        uncertainties: 'Clinical validation requirements and regulatory approval pathways for AI-based diagnostics',
        advancementInField: 'Breakthrough accuracy rates in early-stage cancer detection surpassing radiologist performance',
        hmrcReference: 'RD2024/003/HT',
        submissionDate: '2024-09-01',
        approvalDate: '2024-10-20',
        notes: 'Large company RDEC scheme applied',
        createdDate: '2024-01-05',
        lastModified: '2024-10-20'
      }
    ]

    this.capitalAllowances = [
      {
        id: 'CA001',
        clientId: 'CT001',
        taxYear: '2024-25',
        assetType: 'IT Equipment',
        poolType: 'Annual Investment Allowance',
        assetDescription: 'High-performance computing servers for AI development',
        acquisitionDate: '2024-03-15',
        cost: 125000,
        writtenDownValue: 0,
        allowanceClaimed: 125000,
        aiaUsed: 125000,
        fya: 0,
        wda: 0,
        status: 'active',
        notes: 'Full AIA claimed in year of acquisition',
        createdDate: '2024-03-15',
        lastModified: '2024-03-15'
      },
      {
        id: 'CA002',
        clientId: 'CT002',
        taxYear: '2024-25',
        assetType: 'Plant & Machinery',
        poolType: 'Main Pool',
        assetDescription: 'Construction equipment and machinery',
        acquisitionDate: '2024-05-10',
        cost: 450000,
        writtenDownValue: 382500,
        allowanceClaimed: 67500,
        aiaUsed: 0,
        fya: 0,
        wda: 67500,
        status: 'active',
        notes: '18% WDA on main pool addition',
        createdDate: '2024-05-10',
        lastModified: '2024-11-18'
      }
    ]
  }

  getClients(): CTClient[] {
    return [...this.clients]
  }

  getClient(id: string): CTClient | undefined {
    return this.clients.find(c => c.id === id)
  }

  createClient(data: CTClientFormData): CTClient {
    const newClient: CTClient = {
      ...data,
      id: `CT${String(this.clients.length + 1).padStart(3, '0')}`,
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }
    this.clients.push(newClient)
    return newClient
  }

  updateClient(id: string, data: Partial<CTClientFormData>): CTClient | undefined {
    const index = this.clients.findIndex(c => c.id === id)
    if (index === -1) return undefined

    this.clients[index] = {
      ...this.clients[index],
      ...data,
      lastModified: new Date().toISOString()
    }
    return this.clients[index]
  }

  deleteClient(id: string): boolean {
    const index = this.clients.findIndex(c => c.id === id)
    if (index === -1) return false
    this.clients.splice(index, 1)
    return true
  }

  getRDProjects(clientId?: string): RDProject[] {
    if (clientId) {
      return this.rdProjects.filter(p => p.clientId === clientId)
    }
    return [...this.rdProjects]
  }

  getRDProject(id: string): RDProject | undefined {
    return this.rdProjects.find(p => p.id === id)
  }

  createRDProject(data: RDProjectFormData): RDProject {
    const newProject: RDProject = {
      ...data,
      id: `RD${String(this.rdProjects.length + 1).padStart(3, '0')}`,
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }
    this.rdProjects.push(newProject)
    return newProject
  }

  updateRDProject(id: string, data: Partial<RDProjectFormData>): RDProject | undefined {
    const index = this.rdProjects.findIndex(p => p.id === id)
    if (index === -1) return undefined

    this.rdProjects[index] = {
      ...this.rdProjects[index],
      ...data,
      lastModified: new Date().toISOString()
    }
    return this.rdProjects[index]
  }

  deleteRDProject(id: string): boolean {
    const index = this.rdProjects.findIndex(p => p.id === id)
    if (index === -1) return false
    this.rdProjects.splice(index, 1)
    return true
  }

  getCapitalAllowances(clientId?: string): CapitalAllowance[] {
    if (clientId) {
      return this.capitalAllowances.filter(ca => ca.clientId === clientId)
    }
    return [...this.capitalAllowances]
  }

  getCapitalAllowance(id: string): CapitalAllowance | undefined {
    return this.capitalAllowances.find(ca => ca.id === id)
  }

  createCapitalAllowance(data: CapitalAllowanceFormData): CapitalAllowance {
    const newCA: CapitalAllowance = {
      ...data,
      id: `CA${String(this.capitalAllowances.length + 1).padStart(3, '0')}`,
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }
    this.capitalAllowances.push(newCA)
    return newCA
  }

  updateCapitalAllowance(id: string, data: Partial<CapitalAllowanceFormData>): CapitalAllowance | undefined {
    const index = this.capitalAllowances.findIndex(ca => ca.id === id)
    if (index === -1) return undefined

    this.capitalAllowances[index] = {
      ...this.capitalAllowances[index],
      ...data,
      lastModified: new Date().toISOString()
    }
    return this.capitalAllowances[index]
  }

  deleteCapitalAllowance(id: string): boolean {
    const index = this.capitalAllowances.findIndex(ca => ca.id === id)
    if (index === -1) return false
    this.capitalAllowances.splice(index, 1)
    return true
  }

  getPatentBoxClaims(clientId?: string): PatentBoxClaim[] {
    if (clientId) {
      return this.patentBoxClaims.filter(pbc => pbc.clientId === clientId)
    }
    return [...this.patentBoxClaims]
  }

  getCreativeReliefs(clientId?: string): CreativeIndustryRelief[] {
    if (clientId) {
      return this.creativeReliefs.filter(cr => cr.clientId === clientId)
    }
    return [...this.creativeReliefs]
  }

  getGroupReliefs(clientId?: string): GroupReliefClaim[] {
    if (clientId) {
      return this.groupReliefs.filter(gr => gr.claimantCompanyId === clientId)
    }
    return [...this.groupReliefs]
  }

  createGroupRelief(data: Omit<GroupReliefClaim, 'id' | 'createdDate' | 'lastModified'>): GroupReliefClaim {
    const newGR: GroupReliefClaim = {
      ...data,
      id: `GR${String(this.groupReliefs.length + 1).padStart(3, '0')}`,
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }
    this.groupReliefs.push(newGR)
    return newGR
  }

  updateGroupRelief(id: string, data: Partial<Omit<GroupReliefClaim, 'id' | 'createdDate' | 'lastModified'>>): GroupReliefClaim | undefined {
    const index = this.groupReliefs.findIndex(gr => gr.id === id)
    if (index === -1) return undefined

    this.groupReliefs[index] = {
      ...this.groupReliefs[index],
      ...data,
      lastModified: new Date().toISOString()
    }
    return this.groupReliefs[index]
  }

  deleteGroupRelief(id: string): boolean {
    const index = this.groupReliefs.findIndex(gr => gr.id === id)
    if (index === -1) return false
    this.groupReliefs.splice(index, 1)
    return true
  }

  getDashboardStats() {
    const totalClients = this.clients.length
    const activeCT600s = this.clients.filter(c => c.status === 'in-progress').length
    const totalTaxDue = this.clients.reduce((sum, c) => sum + c.taxDue, 0)
    const totalRDRelief = this.rdProjects
      .filter(p => p.status === 'approved')
      .reduce((sum, p) => sum + p.reliefClaimed + p.taxCredit, 0)
    
    const upcomingDeadlines = this.clients
      .filter(c => {
        const deadline = new Date(c.filingDeadline)
        const now = new Date()
        const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        return diffDays > 0 && diffDays <= 90
      })
      .length

    return {
      totalClients,
      activeCT600s,
      totalTaxDue,
      totalRDRelief,
      upcomingDeadlines,
      rdProjectsActive: this.rdProjects.filter(p => p.status !== 'rejected').length,
      capitalAllowancesClaimed: this.capitalAllowances.reduce((sum, ca) => sum + ca.allowanceClaimed, 0),
      groupReliefsActive: this.groupReliefs.filter(gr => gr.status !== 'rejected').length
    }
  }
}

export const ctDataService = new CorporationTaxDataService()

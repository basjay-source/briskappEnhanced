export interface Employee {
  id: string;
  employeeNumber: string;
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  niNumber: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    county?: string;
    postcode: string;
    country: string;
  };
  
  jobTitle: string;
  department: string;
  startDate: string;
  endDate?: string;
  employmentStatus: 'Active' | 'On Leave' | 'Suspended' | 'Terminated';
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Casual' | 'Apprentice';
  workingHours: number;
  
  payFrequency: 'Weekly' | 'Bi-weekly' | 'Monthly';
  payMethod: 'BACS' | 'Cheque' | 'Cash';
  basicSalary: number;
  hourlyRate?: number;
  taxCode: string;
  studentLoan?: 'Plan 1' | 'Plan 2' | 'Plan 4' | 'Postgraduate';
  
  bankName: string;
  accountName: string;
  sortCode: string;
  accountNumber: string;
  
  pensionScheme?: string;
  pensionProvider?: string;
  pensionEnrolmentDate?: string;
  pensionOptOut?: boolean;
  employeePensionRate: number;
  employerPensionRate: number;
  
  cumulativeTax: boolean;
  week1Month1: boolean;
  
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  
  benefits: Benefit[];
  deductions: Deduction[];
  
  isCISSubcontractor: boolean;
  cisVerificationNumber?: string;
  cisDeductionRate?: number;
  
  statutoryLeave?: StatutoryLeave[];
  
  p45Issued?: boolean;
  p45Date?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface Benefit {
  id: string;
  type: 'Company Car' | 'Medical Insurance' | 'Life Assurance' | 'Gym Membership' | 'Season Ticket Loan' | 'Other';
  description: string;
  value: number;
  taxable: boolean;
  effectiveFrom: string;
  effectiveTo?: string;
}

export interface Deduction {
  id: string;
  type: 'Court Order' | 'Student Loan' | 'Pension AVC' | 'Union Fees' | 'Charity' | 'Other';
  description: string;
  amount: number;
  percentage?: number;
  effectiveFrom: string;
  effectiveTo?: string;
}

export interface StatutoryLeave {
  id: string;
  type: 'Maternity' | 'Paternity' | 'Adoption' | 'Shared Parental' | 'Sick';
  startDate: string;
  endDate?: string;
  expectedReturn: string;
  payRate: number;
  status: 'Pending' | 'Approved' | 'Active' | 'Completed';
}

export interface PayrollRun {
  id: string;
  payPeriod: string;
  payDate: string;
  periodStart: string;
  periodEnd: string;
  status: 'Draft' | 'Processing' | 'Approved' | 'Paid' | 'Submitted';
  employeeCount: number;
  totalGrossPay: number;
  totalNetPay: number;
  totalTax: number;
  totalNI: number;
  totalPension: number;
  totalEmployerNI: number;
  totalEmployerPension: number;
  payslips: Payslip[];
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface Payslip {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeNumber: string;
  payPeriod: string;
  payDate: string;
  taxCode: string;
  niNumber: string;
  
  basicPay: number;
  overtime?: number;
  bonus?: number;
  commission?: number;
  holiday?: number;
  ssp?: number;
  smp?: number;
  totalGrossPay: number;
  
  tax: number;
  employeeNI: number;
  employeePension: number;
  studentLoan?: number;
  otherDeductions: number;
  totalDeductions: number;
  
  netPay: number;
  
  employerNI: number;
  employerPension: number;
  
  ytdGrossPay: number;
  ytdTax: number;
  ytdNI: number;
  ytdPension: number;
  ytdNetPay: number;
}

export interface RTISubmission {
  id: string;
  type: 'FPS' | 'EPS' | 'Earlier Year Update';
  taxYear: string;
  payPeriod: string;
  submissionDate: string;
  status: 'Draft' | 'Submitted' | 'Accepted' | 'Rejected';
  employeeCount?: number;
  hmrcReference?: string;
  correlationId?: string;
  errors?: string[];
  createdAt: string;
  submittedBy?: string;
}

export interface PensionContribution {
  id: string;
  employeeId: string;
  employeeName: string;
  payPeriod: string;
  assessmentStatus: 'Eligible' | 'Non-eligible' | 'Entitled' | 'Opt-out';
  employeeContribution: number;
  employerContribution: number;
  totalContribution: number;
  pensionScheme: string;
  providerReference: string;
}

export interface CISSubcontractor {
  id: string;
  businessName: string;
  tradingName?: string;
  utr: string;
  verificationNumber: string;
  verificationDate: string;
  deductionRate: number;
  companyNumber?: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    county?: string;
    postcode: string;
  };
  status: 'Active' | 'Inactive' | 'Verification Required';
  createdAt: string;
}

export interface CISPayment {
  id: string;
  subcontractorId: string;
  subcontractorName: string;
  invoiceNumber: string;
  paymentDate: string;
  taxMonth: number;
  taxYear: string;
  grossAmount: number;
  materialsDeducted: number;
  labourAmount: number;
  cisDeduction: number;
  netPayment: number;
  vatAmount?: number;
  status: 'Draft' | 'Approved' | 'Paid';
}

export interface Timesheet {
  id: string;
  employeeId: string;
  employeeName: string;
  weekCommencing: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  days: {
    date: string;
    regularHours: number;
    overtimeHours: number;
    absenceType?: 'Holiday' | 'Sick' | 'Unpaid' | 'Other';
    notes?: string;
  }[];
  totalRegularHours: number;
  totalOvertimeHours: number;
  submittedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export const mockEmployees: Employee[] = [
  {
    id: 'emp001',
    employeeNumber: 'EMP001',
    title: 'Mr',
    firstName: 'John',
    lastName: 'Smith',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    niNumber: 'AB123456C',
    email: 'john.smith@company.com',
    phone: '07700 900123',
    address: {
      line1: '123 High Street',
      city: 'London',
      postcode: 'SW1A 1AA',
      country: 'United Kingdom'
    },
    jobTitle: 'Senior Developer',
    department: 'Development',
    startDate: '2020-01-15',
    employmentStatus: 'Active',
    employmentType: 'Full-time',
    workingHours: 37.5,
    payFrequency: 'Monthly',
    payMethod: 'BACS',
    basicSalary: 55000,
    taxCode: '1257L',
    bankName: 'HSBC',
    accountName: 'John Smith',
    sortCode: '40-05-30',
    accountNumber: '12345678',
    pensionScheme: 'NEST',
    pensionProvider: 'NEST Corporation',
    pensionEnrolmentDate: '2020-02-01',
    employeePensionRate: 5,
    employerPensionRate: 3,
    cumulativeTax: true,
    week1Month1: false,
    emergencyContactName: 'Jane Smith',
    emergencyContactPhone: '07700 900456',
    emergencyContactRelationship: 'Spouse',
    benefits: [],
    deductions: [],
    isCISSubcontractor: false,
    createdAt: '2020-01-15T09:00:00Z',
    updatedAt: '2024-12-15T10:30:00Z'
  },
  {
    id: 'emp002',
    employeeNumber: 'EMP002',
    title: 'Ms',
    firstName: 'Sarah',
    lastName: 'Johnson',
    dateOfBirth: '1990-07-22',
    gender: 'Female',
    niNumber: 'CD789012D',
    email: 'sarah.johnson@company.com',
    phone: '07700 900789',
    address: {
      line1: '45 Park Avenue',
      city: 'Manchester',
      postcode: 'M1 1AE',
      country: 'United Kingdom'
    },
    jobTitle: 'Marketing Manager',
    department: 'Marketing',
    startDate: '2021-06-01',
    employmentStatus: 'Active',
    employmentType: 'Full-time',
    workingHours: 37.5,
    payFrequency: 'Monthly',
    payMethod: 'BACS',
    basicSalary: 48000,
    taxCode: '1257L',
    studentLoan: 'Plan 2',
    bankName: 'Barclays',
    accountName: 'Sarah Johnson',
    sortCode: '20-00-00',
    accountNumber: '87654321',
    pensionScheme: 'The People\'s Pension',
    pensionProvider: 'The People\'s Pension',
    pensionEnrolmentDate: '2021-07-01',
    employeePensionRate: 5,
    employerPensionRate: 3,
    cumulativeTax: true,
    week1Month1: false,
    emergencyContactName: 'Michael Johnson',
    emergencyContactPhone: '07700 900987',
    emergencyContactRelationship: 'Father',
    benefits: [
      {
        id: 'ben001',
        type: 'Company Car',
        description: 'BMW 3 Series',
        value: 350,
        taxable: true,
        effectiveFrom: '2022-01-01'
      }
    ],
    deductions: [],
    isCISSubcontractor: false,
    createdAt: '2021-06-01T09:00:00Z',
    updatedAt: '2024-12-15T10:30:00Z'
  }
];

export const mockPayrollRuns: PayrollRun[] = [
  {
    id: 'run001',
    payPeriod: 'December 2024',
    payDate: '2024-12-28',
    periodStart: '2024-12-01',
    periodEnd: '2024-12-31',
    status: 'Approved',
    employeeCount: 247,
    totalGrossPay: 980000,
    totalNetPay: 720000,
    totalTax: 180000,
    totalNI: 80000,
    totalPension: 49000,
    totalEmployerNI: 135000,
    totalEmployerPension: 29400,
    payslips: [],
    createdAt: '2024-12-15T09:00:00Z',
    approvedBy: 'admin@company.com',
    approvedAt: '2024-12-20T14:30:00Z'
  }
];

export const mockRTISubmissions: RTISubmission[] = [
  {
    id: 'rti001',
    type: 'FPS',
    taxYear: '2024-25',
    payPeriod: 'December 2024',
    submissionDate: '2024-12-28',
    status: 'Submitted',
    employeeCount: 247,
    hmrcReference: 'FPS-2024-12-001',
    correlationId: 'CORR-123456789',
    createdAt: '2024-12-28T10:00:00Z',
    submittedBy: 'admin@company.com'
  },
  {
    id: 'rti002',
    type: 'EPS',
    taxYear: '2024-25',
    payPeriod: 'December 2024',
    submissionDate: '2024-12-28',
    status: 'Accepted',
    hmrcReference: 'EPS-2024-12-001',
    correlationId: 'CORR-987654321',
    createdAt: '2024-12-28T11:00:00Z',
    submittedBy: 'admin@company.com'
  }
];

export const mockPensionContributions: PensionContribution[] = [
  {
    id: 'pen001',
    employeeId: 'emp001',
    employeeName: 'John Smith',
    payPeriod: 'December 2024',
    assessmentStatus: 'Eligible',
    employeeContribution: 229.17,
    employerContribution: 137.50,
    totalContribution: 366.67,
    pensionScheme: 'NEST',
    providerReference: 'NEST-001'
  },
  {
    id: 'pen002',
    employeeId: 'emp002',
    employeeName: 'Sarah Johnson',
    payPeriod: 'December 2024',
    assessmentStatus: 'Eligible',
    employeeContribution: 200.00,
    employerContribution: 120.00,
    totalContribution: 320.00,
    pensionScheme: 'The People\'s Pension',
    providerReference: 'TPP-002'
  }
];

export const mockCISSubcontractors: CISSubcontractor[] = [
  {
    id: 'cis001',
    businessName: 'ABC Construction Ltd',
    utr: '1234567890',
    verificationNumber: 'VERIFY-123456',
    verificationDate: '2024-01-15',
    deductionRate: 20,
    companyNumber: '12345678',
    contactPerson: 'David Brown',
    email: 'david@abcconstruction.com',
    phone: '07700 900111',
    address: {
      line1: '789 Industrial Estate',
      city: 'Birmingham',
      postcode: 'B1 1AA'
    },
    status: 'Active',
    createdAt: '2024-01-15T09:00:00Z'
  }
];

export const mockTimesheets: Timesheet[] = [
  {
    id: 'ts001',
    employeeId: 'emp001',
    employeeName: 'John Smith',
    weekCommencing: '2024-12-16',
    status: 'Approved',
    days: [
      { date: '2024-12-16', regularHours: 7.5, overtimeHours: 0 },
      { date: '2024-12-17', regularHours: 7.5, overtimeHours: 2 },
      { date: '2024-12-18', regularHours: 7.5, overtimeHours: 0 },
      { date: '2024-12-19', regularHours: 7.5, overtimeHours: 0 },
      { date: '2024-12-20', regularHours: 7.5, overtimeHours: 0 }
    ],
    totalRegularHours: 37.5,
    totalOvertimeHours: 2,
    submittedAt: '2024-12-20T17:00:00Z',
    approvedBy: 'manager@company.com',
    approvedAt: '2024-12-21T09:00:00Z'
  }
];

export const payrollAPI = {
  getEmployees: async (): Promise<Employee[]> => {
    return mockEmployees;
  },
  
  getEmployee: async (id: string): Promise<Employee | undefined> => {
    return mockEmployees.find(emp => emp.id === id);
  },
  
  createEmployee: async (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> => {
    const newEmployee: Employee = {
      ...employee,
      id: `emp${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockEmployees.push(newEmployee);
    return newEmployee;
  },
  
  updateEmployee: async (id: string, updates: Partial<Employee>): Promise<Employee> => {
    const index = mockEmployees.findIndex(emp => emp.id === id);
    if (index === -1) throw new Error('Employee not found');
    
    mockEmployees[index] = {
      ...mockEmployees[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockEmployees[index];
  },
  
  deleteEmployee: async (id: string): Promise<void> => {
    const index = mockEmployees.findIndex(emp => emp.id === id);
    if (index === -1) throw new Error('Employee not found');
    mockEmployees.splice(index, 1);
  },
  
  getPayrollRuns: async (): Promise<PayrollRun[]> => {
    return mockPayrollRuns;
  },
  
  createPayrollRun: async (run: Omit<PayrollRun, 'id' | 'createdAt'>): Promise<PayrollRun> => {
    const newRun: PayrollRun = {
      ...run,
      id: `run${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    mockPayrollRuns.push(newRun);
    return newRun;
  },
  
  getRTISubmissions: async (): Promise<RTISubmission[]> => {
    return mockRTISubmissions;
  },
  
  createRTISubmission: async (submission: Omit<RTISubmission, 'id' | 'createdAt'>): Promise<RTISubmission> => {
    const newSubmission: RTISubmission = {
      ...submission,
      id: `rti${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    mockRTISubmissions.push(newSubmission);
    return newSubmission;
  },
  
  getPensionContributions: async (): Promise<PensionContribution[]> => {
    return mockPensionContributions;
  },
  
  getCISSubcontractors: async (): Promise<CISSubcontractor[]> => {
    return mockCISSubcontractors;
  },
  
  createCISSubcontractor: async (subcontractor: Omit<CISSubcontractor, 'id' | 'createdAt'>): Promise<CISSubcontractor> => {
    const newSubcontractor: CISSubcontractor = {
      ...subcontractor,
      id: `cis${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    mockCISSubcontractors.push(newSubcontractor);
    return newSubcontractor;
  },
  
  getTimesheets: async (): Promise<Timesheet[]> => {
    return mockTimesheets;
  },
  
  createTimesheet: async (timesheet: Omit<Timesheet, 'id'>): Promise<Timesheet> => {
    const newTimesheet: Timesheet = {
      ...timesheet,
      id: `ts${Math.random().toString(36).substr(2, 9)}`
    };
    mockTimesheets.push(newTimesheet);
    return newTimesheet;
  }
};

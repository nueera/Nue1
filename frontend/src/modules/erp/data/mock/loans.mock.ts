export interface LoanType {
  id: string;
  name: string;
  interestRate: number;
  maxAmount: number;
  maxTenure: number;
  repaymentFrequency: 'monthly' | 'quarterly' | 'semi-annual';
}

export interface LoanApplication {
  id: string;
  employeeId: string;
  employeeName: string;
  loanType: string;
  amount: number;
  tenure: number;
  emi: number;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'closed';
  appliedDate: string;
  approvedBy: string | null;
  purpose: string;
}

export interface RepaymentSchedule {
  id: string;
  loanId: string;
  month: number;
  emiAmount: number;
  principal: number;
  interest: number;
  outstandingBalance: number;
  status: 'paid' | 'upcoming' | 'overdue';
  dueDate: string;
}

export const loanTypes: LoanType[] = [
  {
    id: 'LT001',
    name: 'Personal Loan',
    interestRate: 8.5,
    maxAmount: 500000,
    maxTenure: 60,
    repaymentFrequency: 'monthly',
  },
  {
    id: 'LT002',
    name: 'Emergency Loan',
    interestRate: 5.0,
    maxAmount: 100000,
    maxTenure: 24,
    repaymentFrequency: 'monthly',
  },
  {
    id: 'LT003',
    name: 'Education Loan',
    interestRate: 4.5,
    maxAmount: 1000000,
    maxTenure: 84,
    repaymentFrequency: 'monthly',
  },
  {
    id: 'LT004',
    name: 'Vehicle Loan',
    interestRate: 7.0,
    maxAmount: 800000,
    maxTenure: 60,
    repaymentFrequency: 'monthly',
  },
  {
    id: 'LT005',
    name: 'Home Improvement Loan',
    interestRate: 6.5,
    maxAmount: 1500000,
    maxTenure: 120,
    repaymentFrequency: 'monthly',
  },
];

export const loanApplications: LoanApplication[] = [
  {
    id: 'LOAN001',
    employeeId: 'EMP001',
    employeeName: 'Sarah Chen',
    loanType: 'Personal Loan',
    amount: 200000,
    tenure: 24,
    emi: 9085,
    status: 'disbursed',
    appliedDate: '2024-09-15',
    approvedBy: 'EMP019',
    purpose: 'Home renovation and furniture purchase',
  },
  {
    id: 'LOAN002',
    employeeId: 'EMP004',
    employeeName: 'James Wilson',
    loanType: 'Vehicle Loan',
    amount: 450000,
    tenure: 48,
    emi: 10812,
    status: 'disbursed',
    appliedDate: '2024-06-20',
    approvedBy: 'EMP019',
    purpose: 'Purchase of new sedan for daily commute',
  },
  {
    id: 'LOAN003',
    employeeId: 'EMP006',
    employeeName: 'David Kim',
    loanType: 'Emergency Loan',
    amount: 75000,
    tenure: 12,
    emi: 6440,
    status: 'approved',
    appliedDate: '2025-02-10',
    approvedBy: 'EMP019',
    purpose: 'Medical emergency for family member',
  },
  {
    id: 'LOAN004',
    employeeId: 'EMP002',
    employeeName: 'Marcus Johnson',
    loanType: 'Education Loan',
    amount: 500000,
    tenure: 60,
    emi: 9374,
    status: 'pending',
    appliedDate: '2025-02-20',
    approvedBy: null,
    purpose: 'Executive MBA program at Wharton',
  },
  {
    id: 'LOAN005',
    employeeId: 'EMP009',
    employeeName: 'Mei Zhang',
    loanType: 'Personal Loan',
    amount: 150000,
    tenure: 18,
    emi: 8865,
    status: 'rejected',
    appliedDate: '2025-01-15',
    approvedBy: 'EMP019',
    purpose: 'Debt consolidation',
  },
  {
    id: 'LOAN006',
    employeeId: 'EMP012',
    employeeName: 'Lucas Anderson',
    loanType: 'Home Improvement Loan',
    amount: 800000,
    tenure: 84,
    emi: 11876,
    status: 'disbursed',
    appliedDate: '2024-03-10',
    approvedBy: 'EMP019',
    purpose: 'Kitchen and bathroom remodeling',
  },
  {
    id: 'LOAN007',
    employeeId: 'EMP014',
    employeeName: 'Nathan Clark',
    loanType: 'Emergency Loan',
    amount: 50000,
    tenure: 6,
    emi: 8498,
    status: 'closed',
    appliedDate: '2024-04-01',
    approvedBy: 'EMP019',
    purpose: 'Unexpected car repair costs',
  },
  {
    id: 'LOAN008',
    employeeId: 'EMP008',
    employeeName: 'Tyler Brooks',
    loanType: 'Vehicle Loan',
    amount: 350000,
    tenure: 36,
    emi: 10829,
    status: 'approved',
    appliedDate: '2025-02-25',
    approvedBy: 'EMP019',
    purpose: 'Electric vehicle purchase for commuting',
  },
  {
    id: 'LOAN009',
    employeeId: 'EMP018',
    employeeName: 'Isabella Costa',
    loanType: 'Personal Loan',
    amount: 100000,
    tenure: 12,
    emi: 8716,
    status: 'pending',
    appliedDate: '2025-02-28',
    approvedBy: null,
    purpose: 'Professional photography equipment upgrade',
  },
  {
    id: 'LOAN010',
    employeeId: 'EMP016',
    employeeName: 'Olivia Brown',
    loanType: 'Education Loan',
    amount: 300000,
    tenure: 36,
    emi: 8929,
    status: 'pending',
    appliedDate: '2025-02-22',
    approvedBy: null,
    purpose: 'Online data science certification program',
  },
];

export const repaymentSchedules: RepaymentSchedule[][] = [
  // Repayment schedule for LOAN001 (Sarah Chen - Personal Loan, 24 months)
  Array.from({ length: 24 }, (_, i) => {
    const month = i + 1;
    const emiAmount = 9085;
    const interest = Math.round((200000 - (emiAmount - 1417) * i) * 0.085 / 12);
    const principal = emiAmount - interest;
    const outstandingBalance = Math.max(0, 200000 - principal * month);
    const dueDate = new Date(2024, 9 + i, 15);
    return {
      id: `RS001-${String(month).padStart(3, '0')}`,
      loanId: 'LOAN001',
      month,
      emiAmount,
      principal,
      interest,
      outstandingBalance,
      status: month <= 5 ? 'paid' as const : (month === 6 ? 'overdue' as const : 'upcoming' as const),
      dueDate: dueDate.toISOString().split('T')[0],
    };
  }),
  // Repayment schedule for LOAN002 (James Wilson - Vehicle Loan, 48 months)
  Array.from({ length: 48 }, (_, i) => {
    const month = i + 1;
    const emiAmount = 10812;
    const interest = Math.round((450000 - (emiAmount - 2625) * i) * 0.07 / 12);
    const principal = emiAmount - interest;
    const outstandingBalance = Math.max(0, 450000 - principal * month);
    const dueDate = new Date(2024, 6 + i, 20);
    return {
      id: `RS002-${String(month).padStart(3, '0')}`,
      loanId: 'LOAN002',
      month,
      emiAmount,
      principal,
      interest,
      outstandingBalance,
      status: month <= 8 ? 'paid' as const : 'upcoming' as const,
      dueDate: dueDate.toISOString().split('T')[0],
    };
  }),
];

export function getLoanApplicationById(id: string): LoanApplication | undefined {
  return loanApplications.find((l) => l.id === id);
}

export function getLoanTypeById(id: string): LoanType | undefined {
  return loanTypes.find((lt) => lt.id === id);
}

export function getRepaymentSchedule(loanId: string): RepaymentSchedule[] {
  return repaymentSchedules.find((schedule) => schedule[0]?.loanId === loanId) || [];
}

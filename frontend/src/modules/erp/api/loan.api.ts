import type { LoanType, LoanApplication, RepaymentSchedule } from '../data/mock/loans.mock';
import {
  loanTypes,
  loanApplications,
  getLoanApplicationById,
  getRepaymentSchedule,
} from '../data/mock/loans.mock';

export const loanApi = {
  getAll: async (): Promise<LoanApplication[]> => loanApplications,
  getById: async (id: string): Promise<LoanApplication | undefined> => getLoanApplicationById(id),
  create: async (data: Partial<LoanApplication>): Promise<LoanApplication> => {
    const newApplication: LoanApplication = {
      id: `LOAN${String(loanApplications.length + 1).padStart(3, '0')}`,
      employeeId: data.employeeId || '',
      employeeName: data.employeeName || '',
      loanType: data.loanType || '',
      amount: data.amount || 0,
      tenure: data.tenure || 12,
      emi: data.emi || 0,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
      approvedBy: null,
      purpose: data.purpose || '',
    };
    return newApplication;
  },
  approve: async (id: string, approvedBy: string): Promise<LoanApplication | undefined> => {
    const application = getLoanApplicationById(id);
    if (application) {
      return { ...application, status: 'approved', approvedBy };
    }
    return undefined;
  },
  reject: async (id: string, approvedBy: string): Promise<LoanApplication | undefined> => {
    const application = getLoanApplicationById(id);
    if (application) {
      return { ...application, status: 'rejected', approvedBy };
    }
    return undefined;
  },
};

export const loanTypeApi = {
  getAll: async (): Promise<LoanType[]> => loanTypes,
  create: async (data: Partial<LoanType>): Promise<LoanType> => {
    const newLoanType: LoanType = {
      id: `LT${String(loanTypes.length + 1).padStart(3, '0')}`,
      name: data.name || '',
      interestRate: data.interestRate || 0,
      maxAmount: data.maxAmount || 0,
      maxTenure: data.maxTenure || 12,
      repaymentFrequency: data.repaymentFrequency || 'monthly',
    };
    return newLoanType;
  },
};

export const repaymentApi = {
  getSchedule: async (loanId: string): Promise<RepaymentSchedule[]> => getRepaymentSchedule(loanId),
};

export const LOAN_TYPES = [
  'Personal Loan',
  'Emergency Loan',
  'Education Loan',
  'Vehicle Loan',
  'Home Loan',
  'Salary Advance',
] as const;

export const LOAN_APPLICATION_STATUSES = ['All', 'pending', 'approved', 'disbursed', 'rejected', 'closed'] as const;

export const LOAN_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending Approval',
  approved: 'Approved',
  disbursed: 'Disbursed',
  rejected: 'Rejected',
  closed: 'Closed',
  'in-repayment': 'In Repayment',
  defaulted: 'Defaulted',
};

export const REPAYMENT_FREQUENCIES = ['monthly', 'quarterly'] as const;

export const DEFAULT_INTEREST_RATE = 8.5; // % per annum
export const MAX_LOAN_TO_SALARY_RATIO = 6;
export const MIN_LOAN_AMOUNT = 5000;
export const MAX_LOAN_TENURE_MONTHS = 60;

export const LEAVE_STATUSES = ['All', 'pending', 'approved', 'rejected'] as const;
export const LEAVE_TYPES = ['All', 'annual', 'sick', 'personal', 'maternity'] as const;

export const ACCRUAL_FREQUENCY_LABELS: Record<string, string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  yearly: 'Yearly',
};

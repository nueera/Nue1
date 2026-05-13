export const EXPENSE_CATEGORIES = [
  'Travel',
  'Meals',
  'Accommodation',
  'Transport',
  'Office Supplies',
  'Communication',
  'Training',
  'Entertainment',
  'Miscellaneous',
] as const;

export const EXPENSE_STATUSES = ['All', 'draft', 'pending', 'approved', 'rejected', 'paid'] as const;

export const EXPENSE_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  pending: 'Pending Approval',
  approved: 'Approved',
  rejected: 'Rejected',
  paid: 'Paid',
};

export const ADVANCE_STATUSES = ['All', 'pending', 'approved', 'disbursed', 'settled'] as const;

export const TRAVEL_MODES = ['Flight', 'Train', 'Bus', 'Car', 'Other'] as const;

export const MILEAGE_RATE_PER_KM = 12; // INR per km

export const PER_DIEM_RATES = {
  domestic: 800,
  international: 3500,
  metro: 1200,
} as const;

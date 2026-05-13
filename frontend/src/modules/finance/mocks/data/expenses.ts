import type { Money, ExpenseStatus } from '../../types/finance-common';

export interface MockExpense {
  id: string;
  description: string;
  category: string;
  amount: Money;
  date: string;
  vendor: string;
  status: ExpenseStatus;
  receipt: boolean;
  project: string;
}

export const mockExpenses: MockExpense[] = [
  {
    id: 'exp-001',
    description: 'Team lunch meeting at The Capital Grille',
    category: 'Meals & Entertainment',
    amount: { amount: 487.6, currency: 'USD' },
    date: '2024-07-01T12:30:00Z',
    vendor: 'The Capital Grille',
    status: 'approved',
    receipt: true,
    project: 'Q3 Planning',
  },
  {
    id: 'exp-002',
    description: 'Round-trip flight to New York client meeting',
    category: 'Travel',
    amount: { amount: 620.0, currency: 'USD' },
    date: '2024-06-28T06:00:00Z',
    vendor: 'Delta Airlines',
    status: 'reimbursed',
    receipt: true,
    project: 'Nova Health Account',
  },
  {
    id: 'exp-003',
    description: 'Annual Adobe Creative Cloud subscription',
    category: 'Software',
    amount: { amount: 699.96, currency: 'USD' },
    date: '2024-07-03T00:00:00Z',
    vendor: 'Adobe Inc.',
    status: 'approved',
    receipt: true,
    project: 'Marketing Operations',
  },
  {
    id: 'exp-004',
    description: 'Client dinner with Apex Industries executives',
    category: 'Meals & Entertainment',
    amount: { amount: 312.45, currency: 'USD' },
    date: '2024-07-05T19:00:00Z',
    vendor: 'Ruth\'s Chris Steak House',
    status: 'submitted',
    receipt: true,
    project: 'Apex Account',
  },
  {
    id: 'exp-005',
    description: 'Hotel stay for Denver conference (3 nights)',
    category: 'Travel',
    amount: { amount: 891.0, currency: 'USD' },
    date: '2024-06-18T15:00:00Z',
    vendor: 'Marriott Downtown Denver',
    status: 'approved',
    receipt: true,
    project: 'Tech Summit 2024',
  },
  {
    id: 'exp-006',
    description: 'Office decor and plants for reception area',
    category: 'Office Supplies',
    amount: { amount: 245.0, currency: 'USD' },
    date: '2024-07-08T10:00:00Z',
    vendor: 'IKEA',
    status: 'draft',
    receipt: false,
    project: 'Office Renovation',
  },
  {
    id: 'exp-007',
    description: 'Google Ads campaign spend for June',
    category: 'Marketing',
    amount: { amount: 3750.0, currency: 'USD' },
    date: '2024-07-01T00:00:00Z',
    vendor: 'Google',
    status: 'approved',
    receipt: true,
    project: 'Q3 Lead Generation',
  },
  {
    id: 'exp-008',
    description: 'Uber rides for team offsite transportation',
    category: 'Travel',
    amount: { amount: 134.5, currency: 'USD' },
    date: '2024-07-02T08:00:00Z',
    vendor: 'Uber',
    status: 'rejected',
    receipt: true,
    project: 'Team Offsite',
  },
];

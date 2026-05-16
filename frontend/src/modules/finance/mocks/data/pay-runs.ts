import type { Money } from '../../types/finance-common';

export interface MockPayRun {
  id: string;
  name: string;
  payDate: string;
  period: string;
  totalAmount: Money;
  employeeCount: number;
  status: 'draft' | 'processing' | 'completed' | 'cancelled';
}

export const mockPayRuns: MockPayRun[] = [
  {
    id: 'pr-001',
    name: 'July 2024 Payroll - Mid Month',
    payDate: '2024-07-15T00:00:00Z',
    period: 'Jul 1 - Jul 15, 2024',
    totalAmount: { amount: 67850.0, currency: 'USD' },
    employeeCount: 42,
    status: 'completed',
  },
  {
    id: 'pr-002',
    name: 'July 2024 Payroll - End of Month',
    payDate: '2024-07-31T00:00:00Z',
    period: 'Jul 16 - Jul 31, 2024',
    totalAmount: { amount: 71250.0, currency: 'USD' },
    employeeCount: 42,
    status: 'processing',
  },
  {
    id: 'pr-003',
    name: 'August 2024 Payroll - Mid Month',
    payDate: '2024-08-15T00:00:00Z',
    period: 'Aug 1 - Aug 15, 2024',
    totalAmount: { amount: 68500.0, currency: 'USD' },
    employeeCount: 44,
    status: 'draft',
  },
  {
    id: 'pr-004',
    name: 'Q2 2024 Bonus Run',
    payDate: '2024-07-05T00:00:00Z',
    period: 'Q2 2024 Bonus Period',
    totalAmount: { amount: 125000.0, currency: 'USD' },
    employeeCount: 38,
    status: 'completed',
  },
];

// Projects Types — Zoho Invoice
import type { Money } from '../../../types/finance-common';

export type ProjectStatus = 'active' | 'completed' | 'on_hold' | 'cancelled';
export interface Project {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  description: string;
  status: ProjectStatus;
  budget: Money;
  spent: Money;
  startDate: string;
  endDate: string;
  progress: number;
  createdAt: string;
}

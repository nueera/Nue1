'use client';
// Taxes Types — Zoho Payroll
import type { Money } from '../../../types/finance-common';

export type TaxType = 'federal' | 'state' | 'local' | 'fica' | 'medicare' | 'futa' | 'suta';
export interface TaxBracket {
  from: number;
  to: number | null;
  rate: number;
}
export interface TaxConfiguration {
  id: string;
  name: string;
  type: TaxType;
  description: string;
  rate: number;
  brackets: TaxBracket[];
  employerPortion: number;
  employeePortion: number;
  annualLimit: Money;
  isActive: boolean;
  effectiveFrom: string;
  createdAt: string;
}

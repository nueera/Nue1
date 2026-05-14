// @ts-nocheck
'use client';
// Reports Types — Zoho Payroll
import type { Money } from '../../../types/finance-common';

export type PayrollReportType = 'summary' | 'tax_liability' | 'benefit_costs' | 'department';
export interface PayrollReport {
  id: string;
  type: PayrollReportType;
  period: string;
  startDate: string;
  endDate: string;
  totalGross: Money;
  totalDeductions: Money;
  totalNet: Money;
  employerTaxes: Money;
  employeeCount: number;
  departmentBreakdown: { department: string; gross: Money; net: Money; count: number }[];
  taxBreakdown: { tax: string; amount: Money }[];
}

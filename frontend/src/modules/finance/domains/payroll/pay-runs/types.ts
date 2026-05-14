// @ts-nocheck
'use client';
// PayRuns Types — Zoho Payroll
import type { Money } from '../../../types/finance-common';

export type PayRunStatus = 'draft' | 'processing' | 'completed' | 'cancelled';
export interface PayslipLine {
  component: string;
  type: 'earning' | 'deduction';
  amount: Money;
}
export interface Payslip {
  employeeId: string;
  employeeName: string;
  grossEarnings: Money;
  totalDeductions: Money;
  netPay: Money;
  lines: PayslipLine[];
}
export interface PayRun {
  id: string;
  payRunNumber: string;
  periodStart: string;
  periodEnd: string;
  payDate: string;
  status: PayRunStatus;
  employeeCount: number;
  grossTotal: Money;
  deductionsTotal: Money;
  netTotal: Money;
  payslips: Payslip[];
  createdAt: string;
}

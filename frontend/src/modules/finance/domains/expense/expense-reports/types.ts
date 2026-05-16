'use client';
// ExpenseReports Types — Zoho Expense
import type { Money, ExpenseStatus } from '../../../types/finance-common';

export type ReportStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'reimbursed';
export interface ApprovalStep {
  approverId: string;
  approverName: string;
  status: 'pending' | 'approved' | 'rejected';
 actionDate: string;
  comment: string;
}
export interface ExpenseReport {
  id: string;
  reportNumber: string;
  title: string;
  employeeId: string;
  employeeName: string;
  totalAmount: Money;
  expenseCount: number;
  status: ReportStatus;
  submittedDate: string;
  approvalSteps: ApprovalStep[];
  reimbursedDate: string;
  createdAt: string;
}
export type ExpenseReportStatus = ReportStatus;

// @ts-nocheck
'use client';
// Approvals Types — Zoho Expense
import type { Money } from '../../../types/finance-common';

export type ApprovalAction = 'approve' | 'reject' | 'hold' | 'delegate';
export interface ApprovalStep {
  stepOrder: number;
  approverId: string;
  approverName: string;
  action: ApprovalAction | null;
  actionDate: string;
  comment: string;
}
export interface ApprovalFlow {
  id: string;
  entityType: 'expense_report' | 'purchase_request' | 'advance' | 'trip';
  entityId: string;
  entityName: string;
  requestedBy: string;
  requestedByName: string;
  currentStep: number;
  totalSteps: number;
  steps: ApprovalStep[];
  status: 'pending' | 'approved' | 'rejected' | 'on_hold';
  createdAt: string;
}

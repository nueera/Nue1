'use client';
// PurchaseRequests Types — Zoho Expense
import type { Money } from '../../../types/finance-common';

export type PurchaseRequestStatus = 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'ordered';
export interface PurchaseRequestItem {
  name: string;
  quantity: number;
  estimatedPrice: Money;
  description: string;
}
export interface PurchaseRequest {
  id: string;
  requestNumber: string;
  requesterId: string;
  requesterName: string;
  department: string;
  items: PurchaseRequestItem[];
  totalEstimated: Money;
  status: PurchaseRequestStatus;
  priority: 'low' | 'medium' | 'high';
  justification: string;
  createdAt: string;
}

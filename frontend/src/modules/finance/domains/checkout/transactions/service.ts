'use client';
// Transactions Service — Zoho Checkout
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Transaction } from './types';

const mockTransactions: Transaction[] = [
  { id: 'txn-1', transactionId: 'TXN-001', type: 'payment', customerId: 'c1', customerName: 'Acme Corp', amount: { amount: 49, currency: 'USD' }, currency: 'USD', method: 'credit_card', gateway: 'stripe', status: 'completed', paymentPageId: 'pp-1', paymentLinkId: '', refund: null, dispute: null, createdAt: '2024-02-15T14:30:00Z' },
  { id: 'txn-2', transactionId: 'TXN-002', type: 'payment', customerId: 'c2', customerName: 'Beta LLC', amount: { amount: 13200, currency: 'USD' }, currency: 'USD', method: 'bank_transfer', gateway: 'stripe', status: 'completed', paymentPageId: '', paymentLinkId: 'pl-2', refund: null, dispute: null, createdAt: '2024-02-01T10:00:00Z' },
  { id: 'txn-3', transactionId: 'TXN-003', type: 'refund', customerId: 'c1', customerName: 'Acme Corp', amount: { amount: 49, currency: 'USD' }, currency: 'USD', method: 'credit_card', gateway: 'stripe', status: 'refunded', paymentPageId: 'pp-1', paymentLinkId: '', refund: { refundId: 'REF-001', amount: { amount: 49, currency: 'USD' }, reason: 'Customer request', status: 'processed', initiatedAt: '2024-02-20T10:00:00Z' }, dispute: null, createdAt: '2024-02-20T10:00:00Z' },
  { id: 'txn-4', transactionId: 'TXN-004', type: 'dispute', customerId: 'c3', customerName: 'Gamma Inc', amount: { amount: 199, currency: 'USD' }, currency: 'USD', method: 'credit_card', gateway: 'paypal', status: 'failed', paymentPageId: 'pp-2', paymentLinkId: '', refund: null, dispute: { disputeId: 'DSP-001', reason: 'Unauthorized transaction', status: 'open', amount: { amount: 199, currency: 'USD' }, openedAt: '2024-02-25T10:00:00Z', resolvedAt: '' }, createdAt: '2024-02-25T10:00:00Z' },
];

export const transactionsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Transaction>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockTransactions];
    if (params?.search) data = data.filter(e => e.transactionId.toLowerCase().includes(params.search!.toLowerCase()) || e.customerName.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Transaction>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockTransactions.find(e => e.id === id);
    if (!item) throw new Error('Transaction not found');
    return { success: true, data: item };
  },
  refund: async (id: string, amount: Money, reason: string): Promise<ApiResponse<Transaction>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockTransactions.find(e => e.id === id);
    if (!existing) throw new Error('Transaction not found');
    return { success: true, data: { ...existing, type: 'refund', status: 'refunded', refund: { refundId: 'REF-' + Date.now(), amount, reason, status: 'processed', initiatedAt: new Date().toISOString() } } };
  },
};

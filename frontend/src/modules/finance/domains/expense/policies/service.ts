// @ts-nocheck
'use client';
// Policies Service — Zoho Expense
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Policy } from './types';

const mockPolicies: Policy[] = [
  { id: 'pol-1', name: 'General Expense Policy', type: 'expense', description: 'Standard expense rules', rules: [{ field: 'amount', operator: 'greater_than', value: '25', message: 'Receipt required for expenses over $25' }], maxAmount: { amount: 5000, currency: 'USD' }, requiresReceipt: true, receiptThreshold: { amount: 25, currency: 'USD' }, isActive: true, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'pol-2', name: 'Travel Policy', type: 'travel', description: 'Business travel guidelines', rules: [{ field: 'class', operator: 'equals', value: 'economy', message: 'Only economy class allowed for domestic flights' }, { field: 'hotel_rate', operator: 'less_than', value: '250', message: 'Hotel rate cannot exceed $250/night' }], maxAmount: { amount: 10000, currency: 'USD' }, requiresReceipt: true, receiptThreshold: { amount: 0, currency: 'USD' }, isActive: true, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'pol-3', name: 'Mileage Policy', type: 'mileage', description: 'Mileage reimbursement rules', rules: [{ field: 'distance', operator: 'less_than', value: '500', message: 'Pre-approval needed for trips over 500 miles' }], maxAmount: { amount: 1000, currency: 'USD' }, requiresReceipt: false, receiptThreshold: { amount: 0, currency: 'USD' }, isActive: true, createdAt: '2024-01-01T10:00:00Z' },
];

export const policiesService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Policy>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockPolicies];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Policy>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockPolicies.find(e => e.id === id);
    if (!item) throw new Error('Policy not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Policy>): Promise<ApiResponse<Policy>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockPolicies[0], id: 'pol-' + Date.now(), ...data } as Policy;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Policy>): Promise<ApiResponse<Policy>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockPolicies.find(e => e.id === id);
    if (!existing) throw new Error('Policy not found');
    return { success: true, data: { ...existing, ...data } as Policy };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};

'use client';
// PurchaseRequests Service — Zoho Expense
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { PurchaseRequest } from './types';

const mockPurchaseRequests: PurchaseRequest[] = [
  { id: 'pr-1', requestNumber: 'PR-001', requesterId: 'u1', requesterName: 'Alice Smith', department: 'Engineering', items: [{ name: 'MacBook Pro', quantity: 2, estimatedPrice: { amount: 2499, currency: 'USD' }, description: 'New developer laptops' }], totalEstimated: { amount: 4998, currency: 'USD' }, status: 'pending_approval', priority: 'high', justification: 'New team members starting', createdAt: '2024-02-15T10:00:00Z' },
  { id: 'pr-2', requestNumber: 'PR-002', requesterId: 'u2', requesterName: 'Bob Jones', department: 'Marketing', items: [{ name: 'Monitor', quantity: 3, estimatedPrice: { amount: 450, currency: 'USD' }, description: 'External monitors' }], totalEstimated: { amount: 1350, currency: 'USD' }, status: 'approved', priority: 'medium', justification: 'Replace broken monitors', createdAt: '2024-02-10T10:00:00Z' },
  { id: 'pr-3', requestNumber: 'PR-003', requesterId: 'u1', requesterName: 'Alice Smith', department: 'Engineering', items: [{ name: 'Standing Desk', quantity: 1, estimatedPrice: { amount: 800, currency: 'USD' }, description: 'Ergonomic desk' }], totalEstimated: { amount: 800, currency: 'USD' }, status: 'draft', priority: 'low', justification: 'Ergonomic improvement', createdAt: '2024-02-20T10:00:00Z' },
];

export const purchaseRequestsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<PurchaseRequest>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockPurchaseRequests];
    if (params?.search) data = data.filter(e => e.requesterName.toLowerCase().includes(params.search!.toLowerCase()) || e.requestNumber.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<PurchaseRequest>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockPurchaseRequests.find(e => e.id === id);
    if (!item) throw new Error('Purchase request not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<PurchaseRequest>): Promise<ApiResponse<PurchaseRequest>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockPurchaseRequests[0], id: 'pr-' + Date.now(), ...data } as PurchaseRequest;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<PurchaseRequest>): Promise<ApiResponse<PurchaseRequest>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockPurchaseRequests.find(e => e.id === id);
    if (!existing) throw new Error('Purchase request not found');
    return { success: true, data: { ...existing, ...data } as PurchaseRequest };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};

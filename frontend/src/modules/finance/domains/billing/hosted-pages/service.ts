// @ts-nocheck
'use client';
// HostedPages Service — Zoho Billing
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { HostedPage } from './types';

const mockHostedPages: HostedPage[] = [
  { id: 'hp-1', type: 'checkout', url: 'https://billing.example.com/checkout/hp-1', planId: 'plan-1', planName: 'Starter Monthly', status: 'active', expiresAt: '2024-03-15', createdAt: '2024-02-15T10:00:00Z', completedAt: '', subscriptionId: '' },
  { id: 'hp-2', type: 'portal', url: 'https://billing.example.com/portal/hp-2', planId: 'plan-2', planName: 'Enterprise Annual', status: 'used', expiresAt: '2024-02-10', createdAt: '2024-01-10T10:00:00Z', completedAt: '2024-01-12T14:30:00Z', subscriptionId: 'sub-2' },
  { id: 'hp-3', type: 'update_payment', url: 'https://billing.example.com/update/hp-3', planId: 'plan-1', planName: 'Starter Monthly', status: 'expired', expiresAt: '2024-01-01', createdAt: '2023-12-01T10:00:00Z', completedAt: '', subscriptionId: 'sub-1' },
];

export const hostedPagesService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<HostedPage>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockHostedPages];
    if (params?.search) data = data.filter(e => e.planName.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<HostedPage>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockHostedPages.find(e => e.id === id);
    if (!item) throw new Error('Hosted page not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<HostedPage>): Promise<ApiResponse<HostedPage>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockHostedPages[0], id: 'hp-' + Date.now(), ...data } as HostedPage;
    return { success: true, data: item };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};

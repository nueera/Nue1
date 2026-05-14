// @ts-nocheck
'use client';
// Dunning Service — Zoho Billing
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { DunningRule } from './types';

const mockDunningRules: DunningRule[] = [
  { id: 'dun-1', name: 'First Reminder', description: 'Send first payment reminder', triggersAfterDays: 3, action: { type: 'send_reminder', lateFeeAmount: { amount: 0, currency: 'USD' }, lateFeePercentage: 0, emailTemplateId: 'tmpl-remind-1' }, templateId: 'tmpl-remind-1', status: 'active', order: 1, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'dun-2', name: 'Late Fee', description: 'Charge late fee after 7 days', triggersAfterDays: 7, action: { type: 'charge_late_fee', lateFeeAmount: { amount: 25, currency: 'USD' }, lateFeePercentage: 5, emailTemplateId: 'tmpl-latefee-1' }, templateId: 'tmpl-latefee-1', status: 'active', order: 2, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'dun-3', name: 'Suspension Warning', description: 'Suspend after 14 days', triggersAfterDays: 14, action: { type: 'suspend_subscription', lateFeeAmount: { amount: 0, currency: 'USD' }, lateFeePercentage: 0, emailTemplateId: 'tmpl-suspend-1' }, templateId: 'tmpl-suspend-1', status: 'active', order: 3, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'dun-4', name: 'Cancellation', description: 'Cancel after 30 days', triggersAfterDays: 30, action: { type: 'cancel_subscription', lateFeeAmount: { amount: 0, currency: 'USD' }, lateFeePercentage: 0, emailTemplateId: 'tmpl-cancel-1' }, templateId: 'tmpl-cancel-1', status: 'inactive', order: 4, createdAt: '2024-01-01T10:00:00Z' },
];

export const dunningService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<DunningRule>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockDunningRules];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<DunningRule>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockDunningRules.find(e => e.id === id);
    if (!item) throw new Error('Dunning rule not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<DunningRule>): Promise<ApiResponse<DunningRule>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockDunningRules[0], id: 'dun-' + Date.now(), ...data } as DunningRule;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<DunningRule>): Promise<ApiResponse<DunningRule>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockDunningRules.find(e => e.id === id);
    if (!existing) throw new Error('Dunning rule not found');
    return { success: true, data: { ...existing, ...data } as DunningRule };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};

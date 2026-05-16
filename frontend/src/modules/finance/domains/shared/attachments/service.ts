'use client';
// Attachments Service — Finance Shared
import type { ApiResponse } from '../../../types/finance-common';
import type { Attachment } from './types';

const mockAttachments: Attachment[] = [
  { id: 'att-1', entityType: 'expense', entityId: 'exp-1', fileName: 'receipt-delta.pdf', fileType: 'application/pdf', fileSize: 245000, url: '/attachments/att-1', uploadedBy: 'u1', uploadedByName: 'Alice Smith', createdAt: '2024-02-10T10:00:00Z' },
  { id: 'att-2', entityType: 'invoice', entityId: 'inv-1', fileName: 'contract.pdf', fileType: 'application/pdf', fileSize: 520000, url: '/attachments/att-2', uploadedBy: 'u2', uploadedByName: 'Bob Jones', createdAt: '2024-02-12T10:00:00Z' },
  { id: 'att-3', entityType: 'expense', entityId: 'exp-2', fileName: 'lunch-receipt.jpg', fileType: 'image/jpeg', fileSize: 85000, url: '/attachments/att-3', uploadedBy: 'u1', uploadedByName: 'Alice Smith', createdAt: '2024-02-11T10:00:00Z' },
];

export const attachmentsService = {
  getForEntity: async (entityType: string, entityId: string): Promise<ApiResponse<Attachment[]>> => {
    await new Promise(r => setTimeout(r, 100));
    const data = mockAttachments.filter(a => a.entityType === entityType && a.entityId === entityId);
    return { success: true, data };
  },
  upload: async (entityType: string, entityId: string, file: File): Promise<ApiResponse<Attachment>> => {
    await new Promise(r => setTimeout(r, 300));
    const item: Attachment = { id: 'att-' + Date.now(), entityType, entityId, fileName: file.name, fileType: file.type, fileSize: file.size, url: '/attachments/att-' + Date.now(), uploadedBy: 'u1', uploadedByName: 'Current User', createdAt: new Date().toISOString() };
    return { success: true, data: item };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
  getAll: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
};

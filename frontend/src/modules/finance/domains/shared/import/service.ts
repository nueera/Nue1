'use client';
// Import Service — Finance Shared
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { ImportJob } from './types';

const mockJobs: ImportJob[] = [
  { id: 'imp-1', fileName: 'contacts-2024.csv', entityType: 'contacts', status: 'completed', totalRows: 500, processedRows: 500, successRows: 488, errorRows: 12, mappings: [{ sourceColumn: 'Name', targetField: 'name', transform: 'none' }, { sourceColumn: 'Email', targetField: 'email', transform: 'email' }], startedAt: '2024-02-15T10:00:00Z', completedAt: '2024-02-15T10:02:30Z', errors: [{ row: 45, message: 'Invalid email format' }], createdAt: '2024-02-15T10:00:00Z' },
  { id: 'imp-2', fileName: 'invoices-q1.csv', entityType: 'invoices', status: 'processing', totalRows: 200, processedRows: 150, successRows: 148, errorRows: 2, mappings: [{ sourceColumn: 'Invoice #', targetField: 'invoiceNumber', transform: 'none' }, { sourceColumn: 'Amount', targetField: 'total', transform: 'number' }], startedAt: '2024-02-20T14:00:00Z', completedAt: '', errors: [], createdAt: '2024-02-20T14:00:00Z' },
];

export const importService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<ImportJob>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockJobs];
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<ImportJob>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockJobs.find(e => e.id === id);
    if (!item) throw new Error('Import job not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<ImportJob>): Promise<ApiResponse<ImportJob>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockJobs[0], id: 'imp-' + Date.now(), ...data } as ImportJob;
    return { success: true, data: item };
  },
  cancel: async (id: string): Promise<ApiResponse<ImportJob>> => {
    await new Promise(r => setTimeout(r, 100));
    const existing = mockJobs.find(e => e.id === id);
    if (!existing) throw new Error('Import job not found');
    return { success: true, data: { ...existing, status: 'cancelled' } };
  },
};

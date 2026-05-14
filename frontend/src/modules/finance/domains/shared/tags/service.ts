// @ts-nocheck
'use client';
// Tags Service — Finance Shared
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Tag } from './types';

const mockTags: Tag[] = [
  { id: 'tag-1', name: 'VIP', color: '#EF4444', entityType: 'contact', usageCount: 15, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'tag-2', name: 'Urgent', color: '#F59E0B', entityType: 'invoice', usageCount: 8, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'tag-3', name: 'Government', color: '#3B82F6', entityType: 'contact', usageCount: 3, createdAt: '2024-02-01T10:00:00Z' },
  { id: 'tag-4', name: 'Recurring', color: '#10B981', entityType: 'expense', usageCount: 22, createdAt: '2024-01-15T10:00:00Z' },
];

export const tagsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Tag>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockTags];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Tag>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockTags.find(e => e.id === id);
    if (!item) throw new Error('Tag not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Tag>): Promise<ApiResponse<Tag>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockTags[0], id: 'tag-' + Date.now(), ...data } as Tag;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Tag>): Promise<ApiResponse<Tag>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockTags.find(e => e.id === id);
    if (!existing) throw new Error('Tag not found');
    return { success: true, data: { ...existing, ...data } as Tag };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};

'use client';
// Notes Service — Finance Shared
import type { ApiResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Note } from './types';

const mockNotes: Note[] = [
  { id: 'note-1', entityType: 'invoice', entityId: 'inv-1', content: 'Follow up on payment next week', authorId: 'u1', authorName: 'Alice Smith', isPinned: true, createdAt: '2024-02-15T10:00:00Z', updatedAt: '2024-02-15T10:00:00Z' },
  { id: 'note-2', entityType: 'customer', entityId: 'c1', content: 'Prefers email communication', authorId: 'u2', authorName: 'Bob Jones', isPinned: false, createdAt: '2024-02-10T10:00:00Z', updatedAt: '2024-02-10T10:00:00Z' },
  { id: 'note-3', entityType: 'expense', entityId: 'exp-1', content: 'Receipt attached separately', authorId: 'u1', authorName: 'Alice Smith', isPinned: false, createdAt: '2024-02-12T10:00:00Z', updatedAt: '2024-02-12T10:00:00Z' },
];

export const notesService = {
  getForEntity: async (entityType: string, entityId: string): Promise<ApiResponse<Note[]>> => {
    await new Promise(r => setTimeout(r, 100));
    const data = mockNotes.filter(n => n.entityType === entityType && n.entityId === entityId);
    return { success: true, data };
  },
  create: async (data: Partial<Note>): Promise<ApiResponse<Note>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockNotes[0], id: 'note-' + Date.now(), ...data } as Note;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Note>): Promise<ApiResponse<Note>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockNotes.find(e => e.id === id);
    if (!existing) throw new Error('Note not found');
    return { success: true, data: { ...existing, ...data } as Note };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
  getById: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
  getAll: async (...args: unknown[]) => ({ data: [], pagination: { page: 1, pageSize: 25, total: 0, totalPages: 0 } }),
};

// @ts-nocheck
'use client';
// Expenses Service — Zoho Expense
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Expense } from './types';

const mockExpenses: Expense[] = [
  { id: 'exp-1', expenseNumber: 'EXP-001', categoryId: 'cat-1', categoryName: 'Travel', amount: { amount: 450, currency: 'USD' }, tax: null, date: '2024-02-10', merchant: 'Delta Airlines', description: 'Flight to conference', status: 'submitted', receiptUrl: '/receipts/exp-1.pdf', receiptFileName: 'delta-receipt.pdf', hasReceipt: true, splits: [], reportId: 'rpt-1', createdAt: '2024-02-10T10:00:00Z' },
  { id: 'exp-2', expenseNumber: 'EXP-002', categoryId: 'cat-2', categoryName: 'Meals', amount: { amount: 85, currency: 'USD' }, tax: null, date: '2024-02-11', merchant: 'Olive Garden', description: 'Team lunch', status: 'approved', receiptUrl: '/receipts/exp-2.jpg', receiptFileName: 'lunch-receipt.jpg', hasReceipt: true, splits: [{ percentage: 50, projectId: 'p1', projectName: 'Website Redesign' }, { percentage: 50, projectId: 'p2', projectName: 'Mobile App' }], reportId: 'rpt-1', createdAt: '2024-02-11T10:00:00Z' },
  { id: 'exp-3', expenseNumber: 'EXP-003', categoryId: 'cat-3', categoryName: 'Office Supplies', amount: { amount: 120, currency: 'USD' }, tax: null, date: '2024-02-12', merchant: 'Staples', description: 'Printer ink and paper', status: 'draft', receiptUrl: '', receiptFileName: '', hasReceipt: false, splits: [], reportId: '', createdAt: '2024-02-12T10:00:00Z' },
];

export const expensesService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Expense>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockExpenses];
    if (params?.search) data = data.filter(e => e.merchant.toLowerCase().includes(params.search!.toLowerCase()) || e.description.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Expense>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockExpenses.find(e => e.id === id);
    if (!item) throw new Error('Expense not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Expense>): Promise<ApiResponse<Expense>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockExpenses[0], id: 'exp-' + Date.now(), ...data } as Expense;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Expense>): Promise<ApiResponse<Expense>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockExpenses.find(e => e.id === id);
    if (!existing) throw new Error('Expense not found');
    return { success: true, data: { ...existing, ...data } as Expense };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};

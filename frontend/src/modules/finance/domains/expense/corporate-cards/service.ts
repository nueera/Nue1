// @ts-nocheck
'use client';
// CorporateCards Service — Zoho Expense
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { CorporateCard } from './types';

const mockCorporateCards: CorporateCard[] = [
  { id: 'cc-1', cardNumber: '****4242', cardHolder: 'Alice Smith', employeeId: 'u1', cardType: 'visa', limit: { amount: 10000, currency: 'USD' }, spent: { amount: 3500, currency: 'USD' }, available: { amount: 6500, currency: 'USD' }, expiryMonth: '12', expiryYear: '2026', status: 'active', lastTransaction: '2024-02-15', createdAt: '2023-01-01T10:00:00Z' },
  { id: 'cc-2', cardNumber: '****8888', cardHolder: 'Bob Jones', employeeId: 'u2', cardType: 'amex', limit: { amount: 15000, currency: 'USD' }, spent: { amount: 8200, currency: 'USD' }, available: { amount: 6800, currency: 'USD' }, expiryMonth: '06', expiryYear: '2025', status: 'active', lastTransaction: '2024-02-10', createdAt: '2023-01-01T10:00:00Z' },
  { id: 'cc-3', cardNumber: '****1234', cardHolder: 'Charlie Brown', employeeId: 'u3', cardType: 'mastercard', limit: { amount: 5000, currency: 'USD' }, spent: { amount: 0, currency: 'USD' }, available: { amount: 5000, currency: 'USD' }, expiryMonth: '03', expiryYear: '2024', status: 'expired', lastTransaction: '2024-01-15', createdAt: '2022-01-01T10:00:00Z' },
];

export const corporateCardsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<CorporateCard>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockCorporateCards];
    if (params?.search) data = data.filter(e => e.cardHolder.toLowerCase().includes(params.search!.toLowerCase()) || e.cardNumber.includes(params.search!));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<CorporateCard>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockCorporateCards.find(e => e.id === id);
    if (!item) throw new Error('Card not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<CorporateCard>): Promise<ApiResponse<CorporateCard>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockCorporateCards[0], id: 'cc-' + Date.now(), ...data } as CorporateCard;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<CorporateCard>): Promise<ApiResponse<CorporateCard>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockCorporateCards.find(e => e.id === id);
    if (!existing) throw new Error('Card not found');
    return { success: true, data: { ...existing, ...data } as CorporateCard };
  },
  block: async (id: string): Promise<ApiResponse<CorporateCard>> => {
    await new Promise(r => setTimeout(r, 100));
    const existing = mockCorporateCards.find(e => e.id === id);
    if (!existing) throw new Error('Card not found');
    return { success: true, data: { ...existing, status: 'blocked' } };
  },
  unblock: async (id: string): Promise<ApiResponse<CorporateCard>> => {
    await new Promise(r => setTimeout(r, 100));
    const existing = mockCorporateCards.find(e => e.id === id);
    if (!existing) throw new Error('Card not found');
    return { success: true, data: { ...existing, status: 'active' } };
  },
};

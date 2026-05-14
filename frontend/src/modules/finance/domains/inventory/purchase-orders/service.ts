// @ts-nocheck
'use client';
// PurchaseOrders Service — Zoho Inventory
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { InvPurchaseOrder } from './types';

const mockPurchaseOrders: InvPurchaseOrder[] = [
  { id: 'po-1', purchaseOrderNumber: 'PO-001', vendorId: 'v1', vendorName: 'Supply Co', date: '2024-02-01', expectedDelivery: '2024-02-15', lineItems: [], subtotal: { amount: 10000, currency: 'USD' }, taxTotal: { amount: 1000, currency: 'USD' }, total: { amount: 11000, currency: 'USD' }, status: 'issued', notes: 'Restock widgets', createdAt: '2024-02-01T10:00:00Z' },
  { id: 'po-2', purchaseOrderNumber: 'PO-002', vendorId: 'v2', vendorName: 'Parts Direct', date: '2024-01-20', expectedDelivery: '2024-02-05', lineItems: [], subtotal: { amount: 5000, currency: 'USD' }, taxTotal: { amount: 500, currency: 'USD' }, total: { amount: 5500, currency: 'USD' }, status: 'received', notes: '', createdAt: '2024-01-20T10:00:00Z' },
  { id: 'po-3', purchaseOrderNumber: 'PO-003', vendorId: 'v1', vendorName: 'Supply Co', date: '2024-02-20', expectedDelivery: '2024-03-10', lineItems: [], subtotal: { amount: 7500, currency: 'USD' }, taxTotal: { amount: 750, currency: 'USD' }, total: { amount: 8250, currency: 'USD' }, status: 'draft', notes: 'Pending approval', createdAt: '2024-02-20T10:00:00Z' },
];

export const purchaseOrdersService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<InvPurchaseOrder>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockPurchaseOrders];
    if (params?.search) data = data.filter(e => e.vendorName.toLowerCase().includes(params.search!.toLowerCase()) || e.purchaseOrderNumber.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<InvPurchaseOrder>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockPurchaseOrders.find(e => e.id === id);
    if (!item) throw new Error('Purchase order not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<InvPurchaseOrder>): Promise<ApiResponse<InvPurchaseOrder>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockPurchaseOrders[0], id: 'po-' + Date.now(), ...data } as InvPurchaseOrder;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<InvPurchaseOrder>): Promise<ApiResponse<InvPurchaseOrder>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockPurchaseOrders.find(e => e.id === id);
    if (!existing) throw new Error('Purchase order not found');
    return { success: true, data: { ...existing, ...data } as InvPurchaseOrder };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};

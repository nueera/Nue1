// @ts-nocheck
'use client';
// SalesOrders Service — Zoho Inventory
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { InvSalesOrder } from './types';

const mockSalesOrders: InvSalesOrder[] = [
  { id: 'so-1', salesOrderNumber: 'SO-001', customerId: 'c1', customerName: 'Acme Corp', date: '2024-02-15', shipmentDate: '2024-02-20', lineItems: [], subtotal: { amount: 5000, currency: 'USD' }, taxTotal: { amount: 500, currency: 'USD' }, total: { amount: 5500, currency: 'USD' }, status: 'confirmed', fulfillmentItems: [{ itemId: 'item-1', itemName: 'Widget Pro', quantityOrdered: 100, quantityPacked: 0, quantityShipped: 0 }], notes: '', createdAt: '2024-02-15T10:00:00Z' },
  { id: 'so-2', salesOrderNumber: 'SO-002', customerId: 'c2', customerName: 'Beta LLC', date: '2024-02-10', shipmentDate: '2024-02-15', lineItems: [], subtotal: { amount: 3000, currency: 'USD' }, taxTotal: { amount: 300, currency: 'USD' }, total: { amount: 3300, currency: 'USD' }, status: 'shipped', fulfillmentItems: [{ itemId: 'item-2', itemName: 'Gadget Plus', quantityOrdered: 50, quantityPacked: 50, quantityShipped: 50 }], notes: 'Express shipping', createdAt: '2024-02-10T10:00:00Z' },
  { id: 'so-3', salesOrderNumber: 'SO-003', customerId: 'c3', customerName: 'Gamma Inc', date: '2024-02-20', shipmentDate: '2024-02-25', lineItems: [], subtotal: { amount: 1500, currency: 'USD' }, taxTotal: { amount: 150, currency: 'USD' }, total: { amount: 1650, currency: 'USD' }, status: 'draft', fulfillmentItems: [], notes: '', createdAt: '2024-02-20T10:00:00Z' },
];

export const salesOrdersService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<InvSalesOrder>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockSalesOrders];
    if (params?.search) data = data.filter(e => e.customerName.toLowerCase().includes(params.search!.toLowerCase()) || e.salesOrderNumber.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<InvSalesOrder>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockSalesOrders.find(e => e.id === id);
    if (!item) throw new Error('Sales order not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<InvSalesOrder>): Promise<ApiResponse<InvSalesOrder>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockSalesOrders[0], id: 'so-' + Date.now(), ...data } as InvSalesOrder;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<InvSalesOrder>): Promise<ApiResponse<InvSalesOrder>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockSalesOrders.find(e => e.id === id);
    if (!existing) throw new Error('Sales order not found');
    return { success: true, data: { ...existing, ...data } as InvSalesOrder };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};

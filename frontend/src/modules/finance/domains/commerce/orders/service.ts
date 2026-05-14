// @ts-nocheck
'use client';
// Orders Service — Zoho Commerce
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { CommerceOrder } from './types';

const mockOrders: CommerceOrder[] = [
  { id: 'cord-1', orderNumber: 'ORD-001', customerId: 'c1', customerName: 'Jane Doe', customerEmail: 'jane@acme.com', items: [{ productId: 'cprod-1', productName: 'Premium Widget', quantity: 2, price: { amount: 79.99, currency: 'USD' }, total: { amount: 159.98, currency: 'USD' } }], subtotal: { amount: 159.98, currency: 'USD' }, shipping: { amount: 9.99, currency: 'USD' }, tax: { amount: 14.40, currency: 'USD' }, total: { amount: 184.37, currency: 'USD' }, status: 'shipped', shippingAddress: { street: '123 Main St', city: 'San Francisco', state: 'CA', zip: '94102', country: 'US' }, billingAddress: { street: '123 Main St', city: 'San Francisco', state: 'CA', zip: '94102', country: 'US' }, fulfillment: { carrier: 'UPS', trackingNumber: '1Z999AA', shippedDate: '2024-02-16', deliveredDate: '' }, notes: '', createdAt: '2024-02-15T10:00:00Z' },
  { id: 'cord-2', orderNumber: 'ORD-002', customerId: 'c2', customerName: 'Bob Smith', customerEmail: 'bob@beta.com', items: [{ productId: 'cprod-2', productName: 'Basic Gadget', quantity: 1, price: { amount: 29.99, currency: 'USD' }, total: { amount: 29.99, currency: 'USD' } }], subtotal: { amount: 29.99, currency: 'USD' }, shipping: { amount: 5.99, currency: 'USD' }, tax: { amount: 2.70, currency: 'USD' }, total: { amount: 38.68, currency: 'USD' }, status: 'pending', shippingAddress: { street: '456 Oak Ave', city: 'New York', state: 'NY', zip: '10001', country: 'US' }, billingAddress: { street: '456 Oak Ave', city: 'New York', state: 'NY', zip: '10001', country: 'US' }, fulfillment: null, notes: '', createdAt: '2024-02-20T10:00:00Z' },
  { id: 'cord-3', orderNumber: 'ORD-003', customerId: 'c3', customerName: 'Carol Lee', customerEmail: 'carol@gamma.com', items: [{ productId: 'cprod-1', productName: 'Premium Widget', quantity: 3, price: { amount: 79.99, currency: 'USD' }, total: { amount: 239.97, currency: 'USD' } }], subtotal: { amount: 239.97, currency: 'USD' }, shipping: { amount: 0, currency: 'USD' }, tax: { amount: 21.60, currency: 'USD' }, total: { amount: 261.57, currency: 'USD' }, status: 'delivered', shippingAddress: { street: '789 Pine Rd', city: 'Chicago', state: 'IL', zip: '60601', country: 'US' }, billingAddress: { street: '789 Pine Rd', city: 'Chicago', state: 'IL', zip: '60601', country: 'US' }, fulfillment: { carrier: 'FedEx', trackingNumber: 'FX123456', shippedDate: '2024-02-10', deliveredDate: '2024-02-14' }, notes: 'Free shipping promotion', createdAt: '2024-02-08T10:00:00Z' },
];

export const commerceOrdersService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<CommerceOrder>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockOrders];
    if (params?.search) data = data.filter(e => e.orderNumber.toLowerCase().includes(params.search!.toLowerCase()) || e.customerName.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<CommerceOrder>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockOrders.find(e => e.id === id);
    if (!item) throw new Error('Order not found');
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<CommerceOrder>): Promise<ApiResponse<CommerceOrder>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockOrders.find(e => e.id === id);
    if (!existing) throw new Error('Order not found');
    return { success: true, data: { ...existing, ...data } as CommerceOrder };
  },
};

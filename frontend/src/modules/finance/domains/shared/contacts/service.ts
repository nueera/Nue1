'use client';
// Contacts Service — Finance Shared
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Contact } from './types';

const mockContacts: Contact[] = [
  { id: 'con-1', name: 'Acme Corp', email: 'billing@acme.com', phone: '+1-555-0101', type: 'customer', company: 'Acme Corp', address: { street: '100 Business Ave', city: 'San Francisco', state: 'CA', zip: '94102', country: 'US' }, taxId: 'TAX-001', currency: 'USD', paymentTerms: 'Net 30', balance: 5500, isActive: true, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'con-2', name: 'Supply Co', email: 'orders@supplyco.com', phone: '+1-555-0202', type: 'vendor', company: 'Supply Co', address: { street: '200 Industrial Blvd', city: 'New York', state: 'NY', zip: '10001', country: 'US' }, taxId: 'TAX-002', currency: 'USD', paymentTerms: 'Net 15', balance: -3200, isActive: true, createdAt: '2024-01-15T10:00:00Z' },
  { id: 'con-3', name: 'Beta LLC', email: 'finance@beta.com', phone: '+1-555-0303', type: 'both', company: 'Beta LLC', address: { street: '300 Commerce St', city: 'Chicago', state: 'IL', zip: '60601', country: 'US' }, taxId: 'TAX-003', currency: 'USD', paymentTerms: 'Net 30', balance: 1200, isActive: true, createdAt: '2024-02-01T10:00:00Z' },
];

export const contactsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Contact>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockContacts];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()) || e.email.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Contact>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockContacts.find(e => e.id === id);
    if (!item) throw new Error('Contact not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Contact>): Promise<ApiResponse<Contact>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockContacts[0], id: 'con-' + Date.now(), ...data } as Contact;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Contact>): Promise<ApiResponse<Contact>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockContacts.find(e => e.id === id);
    if (!existing) throw new Error('Contact not found');
    return { success: true, data: { ...existing, ...data } as Contact };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};

'use client';
// Shipments Service — Zoho Inventory
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Shipment } from './types';

const mockShipments: Shipment[] = [
  { id: 'shp-1', shipmentNumber: 'SHP-001', salesOrderId: 'so-2', packageId: 'pkg-1', customerId: 'c2', customerName: 'Beta LLC', origin: { city: 'San Francisco', state: 'CA', country: 'US' }, destination: { street: '123 Business Ave', city: 'New York', state: 'NY', zip: '10001', country: 'US' }, carrier: 'UPS', trackingNumber: '1Z999AA10123456784', status: 'in_transit', shippedDate: '2024-02-15', estimatedDelivery: '2024-02-20', actualDelivery: '', shippingCost: { amount: 25, currency: 'USD' }, trackingEvents: [{ timestamp: '2024-02-15T10:00:00Z', location: 'San Francisco, CA', status: 'picked_up', description: 'Package picked up' }, { timestamp: '2024-02-16T06:00:00Z', location: 'Denver, CO', status: 'in_transit', description: 'In transit' }], createdAt: '2024-02-15T10:00:00Z' },
  { id: 'shp-2', shipmentNumber: 'SHP-002', salesOrderId: '', packageId: 'pkg-2', customerId: 'c1', customerName: 'Acme Corp', origin: { city: 'San Francisco', state: 'CA', country: 'US' }, destination: { street: '456 Corp Blvd', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' }, carrier: 'FedEx', trackingNumber: '', status: 'pending', shippedDate: '', estimatedDelivery: '2024-02-25', actualDelivery: '', shippingCost: { amount: 45, currency: 'USD' }, trackingEvents: [], createdAt: '2024-02-18T10:00:00Z' },
];

export const shipmentsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Shipment>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockShipments];
    if (params?.search) data = data.filter(e => e.shipmentNumber.toLowerCase().includes(params.search!.toLowerCase()) || e.customerName.toLowerCase().includes(params.search!.toLowerCase()) || e.trackingNumber.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Shipment>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockShipments.find(e => e.id === id);
    if (!item) throw new Error('Shipment not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Shipment>): Promise<ApiResponse<Shipment>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockShipments[0], id: 'shp-' + Date.now(), ...data } as Shipment;
    return { success: true, data: item };
  },
  track: async (trackingNumber: string): Promise<ApiResponse<Shipment>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = mockShipments.find(e => e.trackingNumber === trackingNumber);
    if (!item) throw new Error('Shipment not found');
    return { success: true, data: item };
  },
};

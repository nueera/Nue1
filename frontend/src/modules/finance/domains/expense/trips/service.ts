'use client';
// Trips Service — Zoho Expense
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Trip } from './types';

const mockTrips: Trip[] = [
  { id: 'trip-1', name: 'Tech Conference NYC', employeeId: 'u1', employeeName: 'Alice Smith', destination: 'New York, NY', startDate: '2024-03-10', endDate: '2024-03-13', status: 'upcoming', budget: { amount: 3000, currency: 'USD' }, spent: { amount: 0, currency: 'USD' }, itinerary: [{ type: 'flight', departure: 'SFO', arrival: 'JFK', date: '2024-03-10', confirmationCode: 'ABC123' }, { type: 'hotel', departure: 'Check-in', arrival: 'Check-out', date: '2024-03-10', confirmationCode: 'HTL-456' }], createdAt: '2024-02-01T10:00:00Z' },
  { id: 'trip-2', name: 'Client Visit Chicago', employeeId: 'u2', employeeName: 'Bob Jones', destination: 'Chicago, IL', startDate: '2024-02-15', endDate: '2024-02-16', status: 'completed', budget: { amount: 1500, currency: 'USD' }, spent: { amount: 1350, currency: 'USD' }, itinerary: [{ type: 'flight', departure: 'SFO', arrival: 'ORD', date: '2024-02-15', confirmationCode: 'DEF789' }], createdAt: '2024-01-20T10:00:00Z' },
  { id: 'trip-3', name: 'Training Seattle', employeeId: 'u1', employeeName: 'Alice Smith', destination: 'Seattle, WA', startDate: '2024-04-01', endDate: '2024-04-03', status: 'upcoming', budget: { amount: 2000, currency: 'USD' }, spent: { amount: 0, currency: 'USD' }, itinerary: [], createdAt: '2024-03-01T10:00:00Z' },
];

export const tripsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Trip>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockTrips];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()) || e.destination.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Trip>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockTrips.find(e => e.id === id);
    if (!item) throw new Error('Trip not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Trip>): Promise<ApiResponse<Trip>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockTrips[0], id: 'trip-' + Date.now(), ...data } as Trip;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Trip>): Promise<ApiResponse<Trip>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockTrips.find(e => e.id === id);
    if (!existing) throw new Error('Trip not found');
    return { success: true, data: { ...existing, ...data } as Trip };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};

'use client';
// Benefits Service — Zoho Payroll
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Benefit } from './types';

const mockBenefits: Benefit[] = [
  { id: 'ben-1', name: 'Health Insurance PPO', provider: 'BlueCross', type: 'health', description: 'Comprehensive health plan', employeeCost: { amount: 450, currency: 'USD' }, employerCost: { amount: 900, currency: 'USD' }, totalCost: { amount: 1350, currency: 'USD' }, enrollments: [{ employeeId: 'emp-1', employeeName: 'Alice Smith', status: 'active', enrolledAt: '2024-01-01', dependents: 1, employeeContribution: { amount: 450, currency: 'USD' }, employerContribution: { amount: 900, currency: 'USD' } }], enrollmentCount: 2, openEnrollment: '2024-11-01', isActive: true, createdAt: '2024-01-01T10:00:00Z' },
  { id: 'ben-2', name: '401(k) Retirement', provider: 'Vanguard', type: 'retirement', description: '401k with employer match', employeeCost: { amount: 500, currency: 'USD' }, employerCost: { amount: 250, currency: 'USD' }, totalCost: { amount: 750, currency: 'USD' }, enrollments: [{ employeeId: 'emp-1', employeeName: 'Alice Smith', status: 'active', enrolledAt: '2022-03-15', dependents: 0, employeeContribution: { amount: 500, currency: 'USD' }, employerContribution: { amount: 250, currency: 'USD' } }, { employeeId: 'emp-2', employeeName: 'Bob Jones', status: 'active', enrolledAt: '2023-01-10', dependents: 0, employeeContribution: { amount: 400, currency: 'USD' }, employerContribution: { amount: 200, currency: 'USD' } }], enrollmentCount: 2, openEnrollment: '2024-01-01', isActive: true, createdAt: '2024-01-01T10:00:00Z' },
];

export const benefitsService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<Benefit>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockBenefits];
    if (params?.search) data = data.filter(e => e.name.toLowerCase().includes(params.search!.toLowerCase()) || e.provider.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<Benefit>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockBenefits.find(e => e.id === id);
    if (!item) throw new Error('Benefit not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<Benefit>): Promise<ApiResponse<Benefit>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockBenefits[0], id: 'ben-' + Date.now(), ...data } as Benefit;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<Benefit>): Promise<ApiResponse<Benefit>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockBenefits.find(e => e.id === id);
    if (!existing) throw new Error('Benefit not found');
    return { success: true, data: { ...existing, ...data } as Benefit };
  },
};

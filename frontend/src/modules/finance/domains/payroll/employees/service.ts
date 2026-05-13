'use client';
// Employees Service — Zoho Payroll
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { PayrollEmployee } from './types';

const mockEmployees: PayrollEmployee[] = [
  { id: 'emp-1', employeeId: 'EMP-001', firstName: 'Alice', lastName: 'Smith', email: 'alice@company.com', department: 'Engineering', designation: 'Senior Developer', employmentType: 'full_time', status: 'active', joinDate: '2022-03-15', salaryStructure: [{ name: 'Basic', type: 'earning', amount: { amount: 8000, currency: 'USD' }, isFixed: true }, { name: 'Housing', type: 'earning', amount: { amount: 2000, currency: 'USD' }, isFixed: true }, { name: 'Tax', type: 'deduction', amount: { amount: 2500, currency: 'USD' }, isFixed: true }], grossSalary: { amount: 10000, currency: 'USD' }, netSalary: { amount: 7500, currency: 'USD' }, address: { city: 'San Francisco', state: 'CA', country: 'US' }, bankAccount: '****1234', taxId: 'SSN-***-**-1234', createdAt: '2022-03-15T10:00:00Z' },
  { id: 'emp-2', employeeId: 'EMP-002', firstName: 'Bob', lastName: 'Jones', email: 'bob@company.com', department: 'Marketing', designation: 'Marketing Manager', employmentType: 'full_time', status: 'active', joinDate: '2023-01-10', salaryStructure: [{ name: 'Basic', type: 'earning', amount: { amount: 7000, currency: 'USD' }, isFixed: true }, { name: 'Housing', type: 'earning', amount: { amount: 1500, currency: 'USD' }, isFixed: true }, { name: 'Tax', type: 'deduction', amount: { amount: 2000, currency: 'USD' }, isFixed: true }], grossSalary: { amount: 8500, currency: 'USD' }, netSalary: { amount: 6500, currency: 'USD' }, address: { city: 'New York', state: 'NY', country: 'US' }, bankAccount: '****5678', taxId: 'SSN-***-**-5678', createdAt: '2023-01-10T10:00:00Z' },
  { id: 'emp-3', employeeId: 'EMP-003', firstName: 'Charlie', lastName: 'Brown', email: 'charlie@company.com', department: 'Design', designation: 'UI Designer', employmentType: 'part_time', status: 'on_leave', joinDate: '2023-06-01', salaryStructure: [{ name: 'Basic', type: 'earning', amount: { amount: 4000, currency: 'USD' }, isFixed: true }], grossSalary: { amount: 4000, currency: 'USD' }, netSalary: { amount: 3400, currency: 'USD' }, address: { city: 'Chicago', state: 'IL', country: 'US' }, bankAccount: '****9012', taxId: 'SSN-***-**-9012', createdAt: '2023-06-01T10:00:00Z' },
];

export const payrollEmployeesService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<PayrollEmployee>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockEmployees];
    if (params?.search) data = data.filter(e => e.firstName.toLowerCase().includes(params.search!.toLowerCase()) || e.lastName.toLowerCase().includes(params.search!.toLowerCase()) || e.employeeId.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<PayrollEmployee>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockEmployees.find(e => e.id === id);
    if (!item) throw new Error('Employee not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<PayrollEmployee>): Promise<ApiResponse<PayrollEmployee>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockEmployees[0], id: 'emp-' + Date.now(), ...data } as PayrollEmployee;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<PayrollEmployee>): Promise<ApiResponse<PayrollEmployee>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockEmployees.find(e => e.id === id);
    if (!existing) throw new Error('Employee not found');
    return { success: true, data: { ...existing, ...data } as PayrollEmployee };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
};

// @ts-nocheck
'use client';
// TimeTracking Service — Zoho Invoice
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { TimeLog, Timer } from './types';

const mockTimeLogs: TimeLog[] = [
  { id: 'tl-1', projectId: 'p1', projectName: 'Website Redesign', taskId: 't1', userId: 'u1', userName: 'Alice Smith', date: '2024-02-01', startTime: '09:00', endTime: '12:00', duration: 10800, description: 'Frontend development', billable: true, hourlyRate: { amount: 150, currency: 'USD' }, createdAt: '2024-02-01T09:00:00Z' },
  { id: 'tl-2', projectId: 'p1', projectName: 'Website Redesign', taskId: 't2', userId: 'u2', userName: 'Bob Jones', date: '2024-02-01', startTime: '10:00', endTime: '14:00', duration: 14400, description: 'Backend API work', billable: true, hourlyRate: { amount: 175, currency: 'USD' }, createdAt: '2024-02-01T10:00:00Z' },
  { id: 'tl-3', projectId: 'p2', projectName: 'Mobile App', taskId: 't3', userId: 'u1', userName: 'Alice Smith', date: '2024-02-02', startTime: '08:00', endTime: '10:30', duration: 9000, description: 'Design review', billable: false, hourlyRate: { amount: 150, currency: 'USD' }, createdAt: '2024-02-02T08:00:00Z' },
];

export const timeTrackingService = {
  getAll: async (params?: PaginatedRequest): Promise<PaginatedResponse<TimeLog>> => {
    await new Promise(r => setTimeout(r, 200));
    let data = [...mockTimeLogs];
    if (params?.search) data = data.filter(e => e.projectName.toLowerCase().includes(params.search!.toLowerCase()) || e.userName.toLowerCase().includes(params.search!.toLowerCase()));
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 20;
    return { success: true, data: data.slice((page - 1) * pageSize, page * pageSize), pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) } };
  },
  getById: async (id: string): Promise<ApiResponse<TimeLog>> => {
    await new Promise(r => setTimeout(r, 100));
    const item = mockTimeLogs.find(e => e.id === id);
    if (!item) throw new Error('Time log not found');
    return { success: true, data: item };
  },
  create: async (data: Partial<TimeLog>): Promise<ApiResponse<TimeLog>> => {
    await new Promise(r => setTimeout(r, 200));
    const item = { ...mockTimeLogs[0], id: 'tl-' + Date.now(), ...data } as TimeLog;
    return { success: true, data: item };
  },
  update: async (id: string, data: Partial<TimeLog>): Promise<ApiResponse<TimeLog>> => {
    await new Promise(r => setTimeout(r, 200));
    const existing = mockTimeLogs.find(e => e.id === id);
    if (!existing) throw new Error('Time log not found');
    return { success: true, data: { ...existing, ...data } as TimeLog };
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: undefined as void };
  },
  getTimer: async (): Promise<ApiResponse<Timer>> => {
    await new Promise(r => setTimeout(r, 50));
    return { success: true, data: { isRunning: false, startTime: null, projectId: null, taskId: null, elapsedSeconds: 0 } };
  },
  startTimer: async (projectId: string, taskId: string): Promise<ApiResponse<Timer>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: { isRunning: true, startTime: new Date().toISOString(), projectId, taskId, elapsedSeconds: 0 } };
  },
  stopTimer: async (): Promise<ApiResponse<Timer>> => {
    await new Promise(r => setTimeout(r, 100));
    return { success: true, data: { isRunning: false, startTime: null, projectId: null, taskId: null, elapsedSeconds: 0 } };
  },
};

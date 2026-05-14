// @ts-nocheck
'use client';
// TimeTracking Types — Zoho Invoice
import type { Money } from '../../../types/finance-common';

export interface TimeLog {
  id: string;
  projectId: string;
  projectName: string;
  taskId: string;
  userId: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  description: string;
  billable: boolean;
  hourlyRate: Money;
  createdAt: string;
}
export interface Timer {
  isRunning: boolean;
  startTime: string | null;
  projectId: string | null;
  taskId: string | null;
  elapsedSeconds: number;
}

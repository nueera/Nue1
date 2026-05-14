// @ts-nocheck
// ============================================================================
// Reports — Types
// ============================================================================

import type { Money } from '../../../types/finance-common';

export type ReportType =
  | 'profit-and-loss'
  | 'balance-sheet'
  | 'cash-flow'
  | 'trial-balance'
  | 'aged-receivables'
  | 'aged-payables'
  | 'sales-by-customer'
  | 'purchases-by-vendor'
  | 'expense-by-category'
  | 'tax-summary'
  | 'project-profitability'
  | 'budget-vs-actual';

export type ReportFormat = 'pdf' | 'csv' | 'xlsx';

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  description: string;
  lastRunAt?: string;
  isScheduled: boolean;
  scheduleFrequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  scheduleEmails?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ReportRun {
  id: string;
  reportId: string;
  reportType: ReportType;
  dateRange: { from: string; to: string };
  status: 'pending' | 'running' | 'completed' | 'failed';
  generatedAt?: string;
  fileUrl?: string;
  fileSize?: number;
  format: ReportFormat;
}

export interface ReportData {
  reportType: ReportType;
  dateRange: { from: string; to: string };
  columns: string[];
  rows: Record<string, string | number>[];
  totals: Record<string, Money>;
}

export interface ReportList {
  reports: Report[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}

'use client';
// Import Types — Finance Shared

export type ImportStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
export type ImportEntityType = 'contacts' | 'invoices' | 'items' | 'expenses' | 'transactions';
export interface ColumnMapping {
  sourceColumn: string;
  targetField: string;
  transform: 'none' | 'date' | 'number' | 'email' | 'phone';
}
export interface ImportJob {
  id: string;
  fileName: string;
  entityType: ImportEntityType;
  status: ImportStatus;
  totalRows: number;
  processedRows: number;
  successRows: number;
  errorRows: number;
  mappings: ColumnMapping[];
  startedAt: string;
  completedAt: string;
  errors: { row: number; message: string }[];
  createdAt: string;
}

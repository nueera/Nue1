// @ts-nocheck
// ExpenseReports Hooks — Zoho Expense
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseReportsService } from './service';
import { expenseReportsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { ExpenseReport } from './types';

export function useExpenseReportsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: expenseReportsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => expenseReportsService.getAll(params) });
}

export function useExpenseReport(id: string) {
  return useQuery({ queryKey: expenseReportsKeys.detail(id), queryFn: () => expenseReportsService.getById(id), enabled: !!id });
}

export function useCreateExpenseReport() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: expenseReportsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: expenseReportsKeys.all }); } });
}

export function useUpdateExpenseReport() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<ExpenseReport> }) => expenseReportsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: expenseReportsKeys.all }); } });
}

export function useDeleteExpenseReport() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: expenseReportsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: expenseReportsKeys.all }); } });
}


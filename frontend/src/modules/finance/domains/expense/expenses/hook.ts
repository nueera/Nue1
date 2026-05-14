// @ts-nocheck
// Expenses Hooks — Zoho Expense
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expensesService } from './service';
import { expensesKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Expense } from './types';

export function useExpensesList(params?: PaginatedRequest) {
  return useQuery({ queryKey: expensesKeys.list((params || {}) as Record<string, unknown>), queryFn: () => expensesService.getAll(params) });
}

export function useExpense(id: string) {
  return useQuery({ queryKey: expensesKeys.detail(id), queryFn: () => expensesService.getById(id), enabled: !!id });
}

export function useCreateExpense() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: expensesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: expensesKeys.all }); } });
}

export function useUpdateExpense() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Expense> }) => expensesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: expensesKeys.all }); } });
}

export function useDeleteExpense() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: expensesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: expensesKeys.all }); } });
}

export function useExpensesStats() {
  return useQuery({ queryKey: expensesKeys.stats(), queryFn: () => expensesService.getStats() });
}


// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseService } from './service';
import { expenseKeys } from './query-keys';
import type { Expense } from './types';

export function useExpenses(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: expenseKeys.list(params || {}), queryFn: () => expenseService.getAll(params) });
}
export function useExpense(id: string) {
  return useQuery({ queryKey: expenseKeys.detail(id), queryFn: () => expenseService.getById(id), enabled: !!id });
}
export function useCreateExpense() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: expenseService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: expenseKeys.all }); } });
}
export function useUpdateExpense() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Expense> }) => expenseService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: expenseKeys.all }); } });
}
export function useDeleteExpense() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: expenseService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: expenseKeys.all }); } });
}
export function useApproveExpense() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: expenseService.approve, onSuccess: () => { qc.invalidateQueries({ queryKey: expenseKeys.all }); } });
}

// ============================================================================
// Banking — Hooks
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bankAccountService } from './service';
import { bankAccountKeys } from './query-keys';
import type { BankAccount } from './types';

export function useBankAccounts(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: bankAccountKeys.list(params || {}), queryFn: () => bankAccountService.getAll(params) });
}

export function useBankAccount(id: string) {
  return useQuery({ queryKey: bankAccountKeys.detail(id), queryFn: () => bankAccountService.getById(id), enabled: !!id });
}

export function useBankTransactions(id: string, params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: bankAccountKeys.transactions(id), queryFn: () => bankAccountService.getTransactions(id, params), enabled: !!id });
}

export function useCreateBankAccount() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: bankAccountService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: bankAccountKeys.all }); } });
}

export function useUpdateBankAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BankAccount> }) => bankAccountService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: bankAccountKeys.all }); },
  });
}

export function useDeleteBankAccount() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: bankAccountService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: bankAccountKeys.all }); } });
}

export function useSyncBankAccount() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: bankAccountService.sync, onSuccess: () => { qc.invalidateQueries({ queryKey: bankAccountKeys.all }); } });
}

export function useReconciliationMatches(id: string) {
  return useQuery({ queryKey: bankAccountKeys.reconciliation(id), queryFn: () => bankAccountService.getReconciliationMatches(id), enabled: !!id });
}

// ============================================================================
// Accountant — Hooks
// ============================================================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chartOfAccountService } from './service';
import { chartOfAccountKeys } from './query-keys';
import type { ChartOfAccount, JournalEntry } from './types';

export function useChartOfAccounts(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: chartOfAccountKeys.list(params || {}), queryFn: () => chartOfAccountService.getAll(params) });
}

export function useChartOfAccount(id: string) {
  return useQuery({ queryKey: chartOfAccountKeys.detail(id), queryFn: () => chartOfAccountService.getById(id), enabled: !!id });
}

export function useChartOfAccountsTree() {
  return useQuery({ queryKey: chartOfAccountKeys.tree(), queryFn: () => chartOfAccountService.getTree() });
}

export function useJournalEntries(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: chartOfAccountKeys.journalEntries(), queryFn: () => chartOfAccountService.getJournalEntries(params) });
}

export function useCreateChartOfAccount() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: chartOfAccountService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: chartOfAccountKeys.all }); } });
}

export function useUpdateChartOfAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ChartOfAccount> }) => chartOfAccountService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: chartOfAccountKeys.all }); },
  });
}

export function useDeleteChartOfAccount() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: chartOfAccountService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: chartOfAccountKeys.all }); } });
}

export function useActivateChartOfAccount() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: chartOfAccountService.activate, onSuccess: () => { qc.invalidateQueries({ queryKey: chartOfAccountKeys.all }); } });
}

export function useDeactivateChartOfAccount() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: chartOfAccountService.deactivate, onSuccess: () => { qc.invalidateQueries({ queryKey: chartOfAccountKeys.all }); } });
}

export function useCreateJournalEntry() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: chartOfAccountService.createJournalEntry, onSuccess: () => { qc.invalidateQueries({ queryKey: chartOfAccountKeys.all }); } });
}

export function usePostJournalEntry() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: chartOfAccountService.postJournalEntry, onSuccess: () => { qc.invalidateQueries({ queryKey: chartOfAccountKeys.all }); } });
}

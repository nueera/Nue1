// @ts-nocheck
// Hooks — Auto-generated
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pettyCashService } from './service';
import { pettyCashKeys } from './query-keys';

export function usepettyCashList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...pettyCashKeys.all, 'list', params],
    queryFn: () => pettyCashService.getAllFunds(params),
  });
}
export function usePettyCash(id: string) {
  return useQuery({
    queryKey: pettyCashKeys.detail(id),
    queryFn: () => pettyCashService.getFundById(id),
    enabled: !!id,
  });
}
export function useDisburse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { fundId: string, data: Record<string, unknown> }) => pettyCashService.disburse(...Object.values(args)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: pettyCashKeys.all }); },
  });
}
export function useReplenish() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { fundId: string, data: Record<string, unknown> }) => pettyCashService.replenish(...Object.values(args)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: pettyCashKeys.all }); },
  });
}
export function useCloseFund() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { fundId: string }) => pettyCashService.closeFund(...Object.values(args)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: pettyCashKeys.all }); },
  });
}
export function useGetTransactions(linkId: string) {
  return useQuery({
    queryKey: [...pettyCashKeys.all, 'getTransactions', linkId],
    queryFn: () => pettyCashService.getTransactions(linkId),
    enabled: !!linkId,
  });
}

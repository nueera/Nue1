// Hooks — Auto-generated
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { approvalsService } from './service';
import { approvalsKeys } from './query-keys';

export function useGetPending() {
  return useQuery({
    queryKey: [...approvalsKeys.all, 'getPending'],
    queryFn: () => approvalsService.getPending(),
  });
}
export function useGetHistory(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...approvalsKeys.all, 'getHistory', params],
    queryFn: () => approvalsService.getHistory(params),
  });
}
export function useApprove() {
  const qc = useQueryClient();
  return useMutation({
    // @ts-expect-error — A spread argument must either have a tuple type or be passed...
    mutationFn: (args: { id: string, comments?: string }) => approvalsService.approve(...Object.values(args)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: approvalsKeys.all }); },
  });
}
export function useReject() {
  const qc = useQueryClient();
  return useMutation({
    // @ts-expect-error — A spread argument must either have a tuple type or be passed...
    mutationFn: (args: { id: string, comments?: string }) => approvalsService.reject(...Object.values(args)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: approvalsKeys.all }); },
  });
}
export function useReturn() {
  const qc = useQueryClient();
  return useMutation({
    // @ts-expect-error — Property 'return' does not exist on type '{ getAll: (params?...
    mutationFn: (args: { id: string, comments?: string }) => approvalsService.return(...Object.values(args)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: approvalsKeys.all }); },
  });
}
export function useForward() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string, userId: string }) => approvalsService.forward(...Object.values(args)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: approvalsKeys.all }); },
  });
}
export function useBulkApprove() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { ids: string[] }) => approvalsService.bulkApprove(...Object.values(args)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: approvalsKeys.all }); },
  });
}
export function useBulkReject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { ids: string[] }) => approvalsService.bulkReject(...Object.values(args)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: approvalsKeys.all }); },
  });
}

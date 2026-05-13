// Hooks — Auto-generated
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dunningService } from './service';
import { dunningKeys } from './query-keys';

export function usedunningList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...dunningKeys.all, 'list', params],
    queryFn: () => dunningService.getAllRules(params),
  });
}
export function useDunning(id: string) {
  return useQuery({
    queryKey: dunningKeys.detail(id),
    queryFn: () => dunningService.getRuleById(id),
    enabled: !!id,
  });
}
export function useReorderRules() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { ruleIds: string[] }) => dunningService.reorderRules(...Object.values(args)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: dunningKeys.all }); },
  });
}
export function useGetEvents(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...dunningKeys.all, 'getEvents', params?, unknown>],
    queryFn: () => dunningService.getEvents(params?, unknown>),
  });
}
export function useRetryEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { eventId: string }) => dunningService.retryEvent(...Object.values(args)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: dunningKeys.all }); },
  });
}

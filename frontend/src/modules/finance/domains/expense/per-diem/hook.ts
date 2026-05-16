// Hooks — Auto-generated
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { perDiemService } from './service';
import { perDiemKeys } from './query-keys';

export function useperDiemList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...perDiemKeys.all, 'list', params],
    queryFn: () => perDiemService.getAllRates(params),
  });
}
export function usePerDiem(id: string) {
  return useQuery({
    queryKey: perDiemKeys.detail(id),
    queryFn: () => perDiemService.getRateById(id),
    enabled: !!id,
  });
}
export function useGetEntries(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...perDiemKeys.all, 'getEntries', params],
    queryFn: () => perDiemService.getEntries(params),
  });
}

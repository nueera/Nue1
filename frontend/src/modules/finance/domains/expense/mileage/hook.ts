// Hooks — Auto-generated
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mileageService } from './service';
import { mileageKeys } from './query-keys';

export function usemileageList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...mileageKeys.all, 'list', params],
    queryFn: () => mileageService.getAllRates(params),
  });
}
export function useGetEntries(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...mileageKeys.all, 'getEntries', params?, unknown>],
    queryFn: () => mileageService.getEntries(params?, unknown>),
  });
}

// Hooks — Auto-generated
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taxesService } from './service';
import { taxesKeys } from './query-keys';

export function usetaxesList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...taxesKeys.all, 'list', params],
    queryFn: () => taxesService.getAllConfigurations(params),
  });
}
export function useTaxe(id: string) {
  return useQuery({
    queryKey: taxesKeys.detail(id),
    queryFn: () => taxesService.getConfigurationById(id),
    enabled: !!id,
  });
}
export function useGetWithholdings(employeeId: string) {
  return useQuery({
    queryKey: [...taxesKeys.all, 'getWithholdings', employeeId],
    queryFn: () => taxesService.getWithholdings(employeeId),
    enabled: !!employeeId,
  });
}

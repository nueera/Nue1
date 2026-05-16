// Hooks — Auto-generated
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { batchTrackingService } from './service';
import { batchTrackingKeys } from './query-keys';

export function usebatchTrackingList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...batchTrackingKeys.all, 'list', params],
    queryFn: () => batchTrackingService.getAllBatches(params),
  });
}
export function useBatchTracking(id: string) {
  return useQuery({
    queryKey: batchTrackingKeys.detail(id),
    queryFn: () => batchTrackingService.getBatchById(id),
    enabled: !!id,
  });
}
export function useGetSerialNumbers(itemId: string) {
  return useQuery({
    queryKey: [...batchTrackingKeys.all, 'getSerialNumbers', itemId],
    queryFn: () => batchTrackingService.getSerialNumbers(itemId),
    enabled: !!itemId,
  });
}
export function useGetExpiringBatches(days?: number) {
  return useQuery({
    queryKey: [...batchTrackingKeys.all, 'getExpiringBatches', days],
    queryFn: () => batchTrackingService.getExpiringBatches(days),
    enabled: !!days,
  });
}

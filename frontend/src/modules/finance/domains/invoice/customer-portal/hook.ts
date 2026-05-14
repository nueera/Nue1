// @ts-nocheck
// Hooks — Auto-generated
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerPortalService } from './service';
import { customerPortalKeys } from './query-keys';

export function useGetPreferences() {
  return useQuery({
    queryKey: [...customerPortalKeys.all, 'getPreferences'],
    queryFn: () => customerPortalService.getPreferences(),
  });
}
export function useGetSession(sessionId: string) {
  return useQuery({
    queryKey: [...customerPortalKeys.all, 'getSession', sessionId],
    queryFn: () => customerPortalService.getSession(sessionId),
    enabled: !!sessionId,
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveService } from './leave.service';
import { leaveKeys } from './query-keys';

export function useLeaves(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: leaveKeys.requests(params || {}),
    queryFn: () => leaveService.getRequests(params),
  });
}

export function useLeaveBalances(userId: string) {
  return useQuery({
    queryKey: leaveKeys.balances(userId),
    queryFn: () => leaveService.getBalances(userId),
    enabled: !!userId,
  });
}

export function useApplyLeave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leaveService.apply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaveKeys.all });
    },
  });
}

export function useApproveLeave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => leaveService.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaveKeys.all });
    },
  });
}

export function useRejectLeave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      leaveService.reject(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaveKeys.all });
    },
  });
}

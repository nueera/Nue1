import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { performanceService } from './performance.service';
import { performanceKeys } from './query-keys';

export function useReviewCycles() {
  return useQuery({
    queryKey: performanceKeys.cycles(),
    queryFn: () => performanceService.getCycles(),
  });
}

export function useGoals(employeeId: string) {
  return useQuery({
    queryKey: performanceKeys.goals(employeeId),
    queryFn: () => performanceService.getGoals(employeeId),
    enabled: !!employeeId,
  });
}

export function useReviews(cycleId: string) {
  return useQuery({
    queryKey: performanceKeys.reviews(cycleId),
    queryFn: () => performanceService.getReviews?.(cycleId) ?? Promise.resolve({ success: true, data: [] }),
    enabled: !!cycleId,
  });
}

export function useFeedback(employeeId: string) {
  return useQuery({
    queryKey: [...performanceKeys.all, 'feedback', employeeId],
    queryFn: () => performanceService.getFeedback?.(employeeId) ?? Promise.resolve({ success: true, data: [] }),
    enabled: !!employeeId,
  });
}

export function useCreateCycle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, string | number | boolean | undefined>) => performanceService.createCycle?.(data) ?? Promise.resolve(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: performanceKeys.all });
    },
  });
}

export function useSetGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, string | number | boolean | undefined>) => performanceService.setGoal?.(data) ?? Promise.resolve(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: performanceKeys.all });
    },
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, string | number | boolean | undefined>) => performanceService.submitReview?.(data) ?? Promise.resolve(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: performanceKeys.all });
    },
  });
}

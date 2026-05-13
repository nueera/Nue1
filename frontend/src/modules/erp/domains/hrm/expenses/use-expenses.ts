import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseService } from './expense.service';
import { expenseKeys } from './query-keys';

export function useExpenses(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: expenseKeys.claims(params || {}),
    queryFn: () => expenseService.getClaims(params),
  });
}

export function useExpenseClaim(id: string) {
  return useQuery({
    queryKey: expenseKeys.claim(id),
    queryFn: () => expenseService.getClaim(id),
    enabled: !!id,
  });
}

export function useExpenseCategories() {
  return useQuery({
    queryKey: expenseKeys.categories(),
    queryFn: () => expenseService.getCategories(),
  });
}

export function useAdvances(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: expenseKeys.advances(params || {}),
    queryFn: () => expenseService.getAdvances(params),
  });
}

export function useTravelRequests(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: expenseKeys.travelRequests(params || {}),
    queryFn: () => expenseService.getTravelRequests(params),
  });
}

export function useCreateClaim() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: expenseService.createClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}

export function useApproveClaim() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => expenseService.approveClaim(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}

export function useRejectClaim() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      expenseService.rejectClaim(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}

export function useRequestAdvance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: expenseService.requestAdvance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}

export function useCreateTravelRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: expenseService.createTravelRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}

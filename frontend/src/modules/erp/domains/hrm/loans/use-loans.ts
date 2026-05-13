import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loanService } from './loan.service';
import { loanKeys } from './query-keys';

export function useLoanTypes() {
  return useQuery({
    queryKey: loanKeys.types(),
    queryFn: () => loanService.getLoanTypes(),
  });
}

export function useLoanApplications(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: loanKeys.applications(params || {}),
    queryFn: () => loanService.getApplications(params),
  });
}

export function useLoanApplication(id: string) {
  return useQuery({
    queryKey: loanKeys.application(id),
    queryFn: () => loanService.getApplication(id),
    enabled: !!id,
  });
}

export function useActiveLoans(employeeId: string) {
  return useQuery({
    queryKey: loanKeys.active(employeeId),
    queryFn: () => loanService.getActiveLoans(employeeId),
    enabled: !!employeeId,
  });
}

export function useRepaymentSchedule(loanId: string) {
  return useQuery({
    queryKey: loanKeys.schedules(loanId),
    queryFn: () => loanService.getRepaymentSchedule(loanId),
    enabled: !!loanId,
  });
}

export function useCreateLoanType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loanService.createLoanType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loanKeys.all });
    },
  });
}

export function useApplyLoan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loanService.applyLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loanKeys.all });
    },
  });
}

export function useApproveLoan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { comments?: string; approvedAmount?: number; disbursalDate?: string } }) =>
      loanService.approveLoan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loanKeys.all });
    },
  });
}

export function useRejectLoan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      loanService.rejectLoan(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loanKeys.all });
    },
  });
}

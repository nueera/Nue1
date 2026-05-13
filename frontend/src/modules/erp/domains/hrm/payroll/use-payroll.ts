import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { payrollService } from './payroll.service';
import { payrollKeys } from './query-keys';

export function usePayrollRecords(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: [...payrollKeys.all, 'records', params],
    queryFn: () => payrollService.getRecords(params),
  });
}

export function usePayrollRuns(month: string) {
  return useQuery({
    queryKey: payrollKeys.runs(month),
    queryFn: () => payrollService.getRuns(month),
    enabled: !!month,
  });
}

export function usePayslip(id: string) {
  return useQuery({
    queryKey: payrollKeys.payslip(id),
    queryFn: () => payrollService.getPayslip(id),
    enabled: !!id,
  });
}

export function useRunPayroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ month }: { month: string }) => payrollService.runPayroll(month),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: payrollKeys.all });
    },
  });
}

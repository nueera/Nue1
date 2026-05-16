// Hooks — Auto-generated
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportsService } from './service';
import { reportsKeys } from './query-keys';

export function useGetPayrollSummary(period: string) {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getPayrollSummary', period],
    queryFn: () => reportsService.getPayrollSummary(period),
    enabled: !!period,
  });
}
export function useGetTaxLiability(period: string) {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getTaxLiability', period],
    queryFn: () => reportsService.getTaxLiability(period),
    enabled: !!period,
  });
}
export function useGetEmployeeEarnings(employeeId: string, period: string) {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getEmployeeEarnings', employeeId, period],
    queryFn: () => reportsService.getEmployeeEarnings(employeeId, period),
  });
}
export function useGetBenefitCosts(period: string) {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getBenefitCosts', period],
    queryFn: () => reportsService.getBenefitCosts(period),
    enabled: !!period,
  });
}
export function useGetTimeOffReport(period: string) {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getTimeOffReport', period],
    queryFn: () => reportsService.getTimeOffReport(period),
    enabled: !!period,
  });
}

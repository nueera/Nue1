// Hooks — Auto-generated
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { analyticsService } from './service';
import { analyticsKeys } from './query-keys';

export function useGetOverview() {
  return useQuery({
    queryKey: [...analyticsKeys.all, 'getOverview'],
    queryFn: () => analyticsService.getOverview(),
  });
}
export function useGetCategoryBreakdown() {
  return useQuery({
    queryKey: [...analyticsKeys.all, 'getCategoryBreakdown'],
    queryFn: () => analyticsService.getCategoryBreakdown(),
  });
}
export function useGetMonthlyTrend() {
  return useQuery({
    queryKey: [...analyticsKeys.all, 'getMonthlyTrend'],
    queryFn: () => analyticsService.getMonthlyTrend(),
  });
}
export function useGetEmployeeSpending() {
  return useQuery({
    queryKey: [...analyticsKeys.all, 'getEmployeeSpending'],
    queryFn: () => analyticsService.getEmployeeSpending(),
  });
}
export function useGetPolicyViolations() {
  return useQuery({
    queryKey: [...analyticsKeys.all, 'getPolicyViolations'],
    queryFn: () => analyticsService.getPolicyViolations(),
  });
}
export function useGetApprovalMetrics() {
  return useQuery({
    queryKey: [...analyticsKeys.all, 'getApprovalMetrics'],
    queryFn: () => analyticsService.getApprovalMetrics(),
  });
}

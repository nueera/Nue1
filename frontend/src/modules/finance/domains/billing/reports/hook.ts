// Hooks — Auto-generated
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportsService } from './service';
import { reportsKeys } from './query-keys';

export function useGetRevenueReport(period: string) {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getRevenueReport', period],
    queryFn: () => reportsService.getRevenueReport(period),
    enabled: !!period,
  });
}
export function useGetSubscriptionMetrics() {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getSubscriptionMetrics'],
    queryFn: () => reportsService.getSubscriptionMetrics(),
  });
}
export function useGetCohortAnalysis(period: string) {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getCohortAnalysis', period],
    queryFn: () => reportsService.getCohortAnalysis(period),
    enabled: !!period,
  });
}
export function useGetChurnAnalysis(period: string) {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getChurnAnalysis', period],
    queryFn: () => reportsService.getChurnAnalysis(period),
    enabled: !!period,
  });
}
export function useGetMRRBreakdown() {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getMRRBreakdown'],
    queryFn: () => reportsService.getMRRBreakdown(),
  });
}

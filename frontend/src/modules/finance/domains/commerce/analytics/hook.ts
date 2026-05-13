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
export function useGetSalesMetrics(period: string) {
  return useQuery({
    queryKey: [...analyticsKeys.all, 'getSalesMetrics', period],
    queryFn: () => analyticsService.getSalesMetrics(period),
    enabled: !!period,
  });
}
export function useGetProductPerformance(period: string) {
  return useQuery({
    queryKey: [...analyticsKeys.all, 'getProductPerformance', period],
    queryFn: () => analyticsService.getProductPerformance(period),
    enabled: !!period,
  });
}
export function useGetCustomerInsights() {
  return useQuery({
    queryKey: [...analyticsKeys.all, 'getCustomerInsights'],
    queryFn: () => analyticsService.getCustomerInsights(),
  });
}
export function useGetTrafficAnalytics(period: string) {
  return useQuery({
    queryKey: [...analyticsKeys.all, 'getTrafficAnalytics', period],
    queryFn: () => analyticsService.getTrafficAnalytics(period),
    enabled: !!period,
  });
}
export function useGetConversionFunnel() {
  return useQuery({
    queryKey: [...analyticsKeys.all, 'getConversionFunnel'],
    queryFn: () => analyticsService.getConversionFunnel(),
  });
}

// Hooks — Auto-generated
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportsService } from './service';
import { reportsKeys } from './query-keys';

export function useGetStockSummary() {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getStockSummary'],
    queryFn: () => reportsService.getStockSummary(),
  });
}
export function useGetInventoryValuation() {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getInventoryValuation'],
    queryFn: () => reportsService.getInventoryValuation(),
  });
}
export function useGetSalesReport(period: string) {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getSalesReport', period],
    queryFn: () => reportsService.getSalesReport(period),
    enabled: !!period,
  });
}
export function useGetPurchaseReport(period: string) {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getPurchaseReport', period],
    queryFn: () => reportsService.getPurchaseReport(period),
    enabled: !!period,
  });
}
export function useGetProfitabilityReport(period: string) {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getProfitabilityReport', period],
    queryFn: () => reportsService.getProfitabilityReport(period),
    enabled: !!period,
  });
}
export function useGetReorderReport() {
  return useQuery({
    queryKey: [...reportsKeys.all, 'getReorderReport'],
    queryFn: () => reportsService.getReorderReport(),
  });
}

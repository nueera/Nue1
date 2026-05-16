import { crmKeys } from "../../core/query-keys";
export const customerAnalyticsKeys = {
  ...crmKeys.customerAnalytics,
  list: (filters: Record<string, unknown>) => crmKeys.customerAnalytics.segments(filters),
  detail: (id: string) => crmKeys.customerAnalytics.segments({}),
};

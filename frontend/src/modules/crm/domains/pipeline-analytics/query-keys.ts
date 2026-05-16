import { crmKeys } from "../../core/query-keys";
export const pipelineAnalyticsKeys = {
  ...crmKeys.pipelineAnalytics,
  list: (filters: Record<string, unknown>) => crmKeys.pipelineAnalytics.snapshots(filters),
  detail: (id: string) => crmKeys.pipelineAnalytics.snapshots({}),
};

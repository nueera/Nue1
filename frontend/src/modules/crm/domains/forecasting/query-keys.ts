import { crmKeys } from "../../core/query-keys";
export const forecastingKeys = {
  ...crmKeys.forecasting,
  list: (filters: Record<string, unknown>) => crmKeys.forecasting.periods(filters),
  detail: (id: string) => crmKeys.forecasting.periods({}),
};

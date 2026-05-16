import { crmKeys } from "../../core/query-keys";
export const salesiqKeys = {
  ...crmKeys.salesiq,
  list: (filters: Record<string, unknown>) => crmKeys.salesiq.sessions(filters),
  detail: (id: string) => crmKeys.salesiq.sessions({}),
};

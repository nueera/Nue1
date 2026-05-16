import { crmKeys } from "../../core/query-keys";
export const importKeys = {
  ...crmKeys.import,
  list: (filters: Record<string, unknown>) => crmKeys.import.jobs(filters),
};

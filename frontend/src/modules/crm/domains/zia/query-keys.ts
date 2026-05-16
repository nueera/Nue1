import { crmKeys } from "../../core/query-keys";
export const ziaKeys = {
  ...crmKeys.zia,
  list: (filters: Record<string, unknown>) => crmKeys.zia.predictions(filters),
  detail: (id: string) => crmKeys.zia.config(),
};

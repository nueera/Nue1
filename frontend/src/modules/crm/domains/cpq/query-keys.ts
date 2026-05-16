import { crmKeys } from "../../core/query-keys";
export const cpqKeys = {
  ...crmKeys.cpq,
  list: (filters: Record<string, unknown>) => crmKeys.cpq.productRules(filters),
  detail: (id: string) => crmKeys.cpq.config(),
};

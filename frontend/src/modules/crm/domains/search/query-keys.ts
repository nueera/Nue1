import { crmKeys } from "../../core/query-keys";
export const searchKeys = {
  ...crmKeys.search,
  list: (filters: Record<string, unknown>) => crmKeys.search.global(""),
  detail: (id: string) => crmKeys.search.global(""),
};

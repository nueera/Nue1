import { crmKeys } from "../../core/query-keys";
export const apisKeys = {
  ...crmKeys.apis,
  list: (filters: Record<string, unknown>) => crmKeys.apis.endpoints(),
  detail: (id: string) => crmKeys.apis.keys(),
};

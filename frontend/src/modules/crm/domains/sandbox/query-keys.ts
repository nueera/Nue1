import { crmKeys } from "../../core/query-keys";
export const sandboxKeys = {
  ...crmKeys.sandbox,
  list: (filters: Record<string, unknown>) => crmKeys.sandbox.lists(),
};

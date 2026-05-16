import { crmKeys } from "../../core/query-keys";
export const emailKeys = {
  ...crmKeys.email,
  list: (filters: Record<string, unknown>) => crmKeys.email.messages(filters),
  detail: (id: string) => crmKeys.email.messages({}),
};

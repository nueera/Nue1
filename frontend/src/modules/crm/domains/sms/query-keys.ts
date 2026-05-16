import { crmKeys } from "../../core/query-keys";
export const smsKeys = {
  ...crmKeys.sms,
  list: (filters: Record<string, unknown>) => crmKeys.sms.messages(filters),
  detail: (id: string) => crmKeys.sms.messages({}),
};

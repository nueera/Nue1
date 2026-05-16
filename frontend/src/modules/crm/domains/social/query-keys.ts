import { crmKeys } from "../../core/query-keys";
export const socialKeys = {
  ...crmKeys.social,
  list: (filters: Record<string, unknown>) => crmKeys.social.profiles(filters),
  detail: (id: string) => crmKeys.social.profiles({}),
};

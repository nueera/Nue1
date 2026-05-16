import { crmKeys } from "../../core/query-keys";
export const settingsKeys = {
  ...crmKeys.settings,
  list: (filters: Record<string, unknown>) => crmKeys.settings.general(),
  detail: (id: string) => crmKeys.settings.general(),
};

import { crmKeys } from "../../core/query-keys";
export const calendarKeys = {
  ...crmKeys.calendar,
  list: (filters: Record<string, unknown>) => crmKeys.calendar.events(filters),
  detail: (id: string) => crmKeys.calendar.events({}),
};

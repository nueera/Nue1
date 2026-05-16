import { crmKeys } from "../../core/query-keys";
export const notesKeys = {
  ...crmKeys.notes,
  list: (filters: Record<string, unknown>) => crmKeys.notes.lists(),
};

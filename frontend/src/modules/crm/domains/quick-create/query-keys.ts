import { crmKeys } from "../../core/query-keys";

const quickCreateBase = {
  all: ['crm', 'quick-create'] as const,
  lists: () => [...quickCreateBase.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...quickCreateBase.lists(), filters] as const,
  details: () => [...quickCreateBase.all, 'detail'] as const,
  detail: (id: string) => [...quickCreateBase.details(), id] as const,
};

export const quickCreateKeys = quickCreateBase;

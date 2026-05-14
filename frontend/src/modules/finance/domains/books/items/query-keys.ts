// @ts-nocheck
export const itemKeys = {
  all: ['items'] as const,
  lists: () => [...itemKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...itemKeys.lists(), params] as const,
  details: () => [...itemKeys.all, 'detail'] as const,
  detail: (id: string) => [...itemKeys.details(), id] as const,
  groups: () => [...itemKeys.all, 'groups'] as const,
  search: (query: string) => [...itemKeys.all, 'search', query] as const,
};

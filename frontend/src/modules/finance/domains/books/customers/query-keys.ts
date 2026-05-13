// ============================================================================
// Customers — Query Keys
// ============================================================================

export const customerKeys = {
  all: ['customers'] as const,
  lists: () => [...customerKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...customerKeys.lists(), params] as const,
  details: () => [...customerKeys.all, 'detail'] as const,
  detail: (id: string) => [...customerKeys.details(), id] as const,
  transactions: (id: string) => [...customerKeys.detail(id), 'transactions'] as const,
  statement: (id: string) => [...customerKeys.detail(id), 'statement'] as const,
  search: (query: string) => [...customerKeys.all, 'search', query] as const,
  stats: () => [...customerKeys.all, 'stats'] as const,
};

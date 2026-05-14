// @ts-nocheck
// ============================================================================
// Vendors — Query Keys
// ============================================================================

export const vendorKeys = {
  all: ['vendors'] as const,
  lists: () => [...vendorKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...vendorKeys.lists(), params] as const,
  details: () => [...vendorKeys.all, 'detail'] as const,
  detail: (id: string) => [...vendorKeys.details(), id] as const,
  transactions: (id: string) => [...vendorKeys.detail(id), 'transactions'] as const,
  search: (query: string) => [...vendorKeys.all, 'search', query] as const,
  stats: () => [...vendorKeys.all, 'stats'] as const,
};

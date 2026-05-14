// @ts-nocheck
// Reports Query Keys — Zoho Inventory

export const reportsKeys = {
  all: ['inventory', 'reports'] as const,
  lists: () => [...reportsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...reportsKeys.lists(), params] as const,
  details: () => [...reportsKeys.all, 'detail'] as const,
  detail: (id: string) => [...reportsKeys.details(), id] as const,
  stats: () => [...reportsKeys.all, 'stats'] as const,
} as const;

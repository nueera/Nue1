// @ts-nocheck
// Reports Query Keys — Zoho Billing

export const reportsKeys = {
  all: ['billing', 'reports'] as const,
  lists: () => [...reportsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...reportsKeys.lists(), params] as const,
  details: () => [...reportsKeys.all, 'detail'] as const,
  detail: (id: string) => [...reportsKeys.details(), id] as const,
  stats: () => [...reportsKeys.all, 'stats'] as const,
} as const;

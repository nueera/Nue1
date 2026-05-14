// @ts-nocheck
// SalesOrders Query Keys — Zoho Inventory

export const salesOrdersKeys = {
  all: ['inventory', 'sales-orders'] as const,
  lists: () => [...salesOrdersKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...salesOrdersKeys.lists(), params] as const,
  details: () => [...salesOrdersKeys.all, 'detail'] as const,
  detail: (id: string) => [...salesOrdersKeys.details(), id] as const,
  stats: () => [...salesOrdersKeys.all, 'stats'] as const,
} as const;

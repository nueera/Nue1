// @ts-nocheck
// PurchaseOrders Query Keys — Zoho Inventory

export const purchaseOrdersKeys = {
  all: ['inventory', 'purchase-orders'] as const,
  lists: () => [...purchaseOrdersKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...purchaseOrdersKeys.lists(), params] as const,
  details: () => [...purchaseOrdersKeys.all, 'detail'] as const,
  detail: (id: string) => [...purchaseOrdersKeys.details(), id] as const,
  stats: () => [...purchaseOrdersKeys.all, 'stats'] as const,
} as const;

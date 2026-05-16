// StockAdjustments Query Keys — Zoho Inventory

export const stockAdjustmentsKeys = {
  all: ['inventory', 'stock-adjustments'] as const,
  lists: () => [...stockAdjustmentsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...stockAdjustmentsKeys.lists(), params] as const,
  details: () => [...stockAdjustmentsKeys.all, 'detail'] as const,
  detail: (id: string) => [...stockAdjustmentsKeys.details(), id] as const,
  stats: () => [...stockAdjustmentsKeys.all, 'stats'] as const,
} as const;

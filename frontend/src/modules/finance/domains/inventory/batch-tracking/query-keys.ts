// @ts-nocheck
// BatchTracking Query Keys — Zoho Inventory

export const batchTrackingKeys = {
  all: ['inventory', 'batch-tracking'] as const,
  lists: () => [...batchTrackingKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...batchTrackingKeys.lists(), params] as const,
  details: () => [...batchTrackingKeys.all, 'detail'] as const,
  detail: (id: string) => [...batchTrackingKeys.details(), id] as const,
  stats: () => [...batchTrackingKeys.all, 'stats'] as const,
} as const;

// @ts-nocheck
// TimeTracking Query Keys — Zoho Invoice

export const timeTrackingKeys = {
  all: ['invoice', 'time-tracking'] as const,
  lists: () => [...timeTrackingKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...timeTrackingKeys.lists(), params] as const,
  details: () => [...timeTrackingKeys.all, 'detail'] as const,
  detail: (id: string) => [...timeTrackingKeys.details(), id] as const,
  stats: () => [...timeTrackingKeys.all, 'stats'] as const,
} as const;

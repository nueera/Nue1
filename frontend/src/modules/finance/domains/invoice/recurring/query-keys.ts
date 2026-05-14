// @ts-nocheck
// Recurring Query Keys — Zoho Invoice

export const recurringKeys = {
  all: ['invoice', 'recurring'] as const,
  lists: () => [...recurringKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...recurringKeys.lists(), params] as const,
  details: () => [...recurringKeys.all, 'detail'] as const,
  detail: (id: string) => [...recurringKeys.details(), id] as const,
  stats: () => [...recurringKeys.all, 'stats'] as const,
} as const;

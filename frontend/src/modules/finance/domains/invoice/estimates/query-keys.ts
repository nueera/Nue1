// @ts-nocheck
// Estimates Query Keys — Zoho Invoice

export const estimatesKeys = {
  all: ['invoice', 'estimates'] as const,
  lists: () => [...estimatesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...estimatesKeys.lists(), params] as const,
  details: () => [...estimatesKeys.all, 'detail'] as const,
  detail: (id: string) => [...estimatesKeys.details(), id] as const,
  stats: () => [...estimatesKeys.all, 'stats'] as const,
} as const;

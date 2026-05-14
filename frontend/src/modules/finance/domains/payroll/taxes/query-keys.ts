// @ts-nocheck
// Taxes Query Keys — Zoho Payroll

export const taxesKeys = {
  all: ['payroll', 'taxes'] as const,
  lists: () => [...taxesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...taxesKeys.lists(), params] as const,
  details: () => [...taxesKeys.all, 'detail'] as const,
  detail: (id: string) => [...taxesKeys.details(), id] as const,
  stats: () => [...taxesKeys.all, 'stats'] as const,
} as const;

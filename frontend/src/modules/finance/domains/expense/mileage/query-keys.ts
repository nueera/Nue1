// @ts-nocheck
// Mileage Query Keys — Zoho Expense

export const mileageKeys = {
  all: ['expense', 'mileage'] as const,
  lists: () => [...mileageKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...mileageKeys.lists(), params] as const,
  details: () => [...mileageKeys.all, 'detail'] as const,
  detail: (id: string) => [...mileageKeys.details(), id] as const,
  stats: () => [...mileageKeys.all, 'stats'] as const,
} as const;

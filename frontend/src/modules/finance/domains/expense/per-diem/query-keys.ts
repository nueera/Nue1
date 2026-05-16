// PerDiem Query Keys — Zoho Expense

export const perDiemKeys = {
  all: ['expense', 'per-diem'] as const,
  lists: () => [...perDiemKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...perDiemKeys.lists(), params] as const,
  details: () => [...perDiemKeys.all, 'detail'] as const,
  detail: (id: string) => [...perDiemKeys.details(), id] as const,
  stats: () => [...perDiemKeys.all, 'stats'] as const,
} as const;

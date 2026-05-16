// Expenses Query Keys — Zoho Expense

export const expensesKeys = {
  all: ['expense', 'expenses'] as const,
  lists: () => [...expensesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...expensesKeys.lists(), params] as const,
  details: () => [...expensesKeys.all, 'detail'] as const,
  detail: (id: string) => [...expensesKeys.details(), id] as const,
  stats: () => [...expensesKeys.all, 'stats'] as const,
} as const;

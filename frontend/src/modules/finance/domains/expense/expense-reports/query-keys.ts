// ExpenseReports Query Keys — Zoho Expense

export const expenseReportsKeys = {
  all: ['expense', 'expense-reports'] as const,
  lists: () => [...expenseReportsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...expenseReportsKeys.lists(), params] as const,
  details: () => [...expenseReportsKeys.all, 'detail'] as const,
  detail: (id: string) => [...expenseReportsKeys.details(), id] as const,
  stats: () => [...expenseReportsKeys.all, 'stats'] as const,
} as const;

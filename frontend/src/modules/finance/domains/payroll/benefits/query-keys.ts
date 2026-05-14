// @ts-nocheck
// Benefits Query Keys — Zoho Payroll

export const benefitsKeys = {
  all: ['payroll', 'benefits'] as const,
  lists: () => [...benefitsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...benefitsKeys.lists(), params] as const,
  details: () => [...benefitsKeys.all, 'detail'] as const,
  detail: (id: string) => [...benefitsKeys.details(), id] as const,
  stats: () => [...benefitsKeys.all, 'stats'] as const,
} as const;

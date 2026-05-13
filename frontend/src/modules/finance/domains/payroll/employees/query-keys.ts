// Employees Query Keys — Zoho Payroll

export const employeesKeys = {
  all: ['payroll', 'employees'] as const,
  lists: () => [...employeesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...employeesKeys.lists(), params] as const,
  details: () => [...employeesKeys.all, 'detail'] as const,
  detail: (id: string) => [...employeesKeys.details(), id] as const,
  stats: () => [...employeesKeys.all, 'stats'] as const,
} as const;

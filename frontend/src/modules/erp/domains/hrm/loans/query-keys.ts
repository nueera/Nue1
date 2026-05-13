export const loanKeys = {
  all: ['loans'] as const,
  types: () => [...loanKeys.all, 'types'] as const,
  type: (id: string) => [...loanKeys.all, 'type', id] as const,
  applications: (filters: Record<string, unknown>) => [...loanKeys.all, 'applications', filters] as const,
  application: (id: string) => [...loanKeys.all, 'application', id] as const,
  schedules: (loanId: string) => [...loanKeys.all, 'schedules', loanId] as const,
  active: (employeeId: string) => [...loanKeys.all, 'active', employeeId] as const,
} as const;

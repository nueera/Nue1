export const attendanceKeys = {
  all: ['attendance'] as const,
  daily: (date: string) => [...attendanceKeys.all, 'daily', date] as const,
  monthly: (month: string) => [...attendanceKeys.all, 'monthly', month] as const,
  summary: () => [...attendanceKeys.all, 'summary'] as const,
} as const;

export const reportKeys = {
  all: ['reports'] as const,
  configs: () => [...reportKeys.all, 'configs'] as const,
  config: (id: string) => [...reportKeys.all, 'config', id] as const,
  custom: (filters: Record<string, unknown>) => [...reportKeys.all, 'custom', filters] as const,
  customReport: (id: string) => [...reportKeys.all, 'custom-report', id] as const,
  saved: (filters: Record<string, unknown>) => [...reportKeys.all, 'saved', filters] as const,
  savedReport: (id: string) => [...reportKeys.all, 'saved-report', id] as const,
  data: (reportId: string, params: Record<string, unknown>) => [...reportKeys.all, 'data', reportId, params] as const,
  scheduled: () => [...reportKeys.all, 'scheduled'] as const,
} as const;

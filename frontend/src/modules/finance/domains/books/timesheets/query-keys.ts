// @ts-nocheck
// ============================================================================
// Timesheets — Query Keys
// ============================================================================

export const timesheetKeys = {
  all: ['timesheets'] as const,
  lists: () => [...timesheetKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...timesheetKeys.lists(), params] as const,
  details: () => [...timesheetKeys.all, 'detail'] as const,
  detail: (id: string) => [...timesheetKeys.details(), id] as const,
  weekly: (employeeId: string, weekStart: string) => [...timesheetKeys.all, 'weekly', employeeId, weekStart] as const,
};

export const shiftKeys = {
  all: ['shifts'] as const,
  types: () => [...shiftKeys.all, 'types'] as const,
  type: (id: string) => [...shiftKeys.all, 'type', id] as const,
  requests: (filters: Record<string, unknown>) => [...shiftKeys.all, 'requests', filters] as const,
  assignments: (filters: Record<string, unknown>) => [...shiftKeys.all, 'assignments', filters] as const,
  assignment: (id: string) => [...shiftKeys.all, 'assignment', id] as const,
} as const;

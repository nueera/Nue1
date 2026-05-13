export const trainingKeys = {
  all: ['training'] as const,
  programs: (filters: Record<string, unknown>) => [...trainingKeys.all, 'programs', filters] as const,
  program: (id: string) => [...trainingKeys.all, 'program', id] as const,
  sessions: (filters: Record<string, unknown>) => [...trainingKeys.all, 'sessions', filters] as const,
  enrollments: (filters: Record<string, unknown>) => [...trainingKeys.all, 'enrollments', filters] as const,
  myEnrollments: () => [...trainingKeys.all, 'my-enrollments'] as const,
  feedback: (programId: string) => [...trainingKeys.all, 'feedback', programId] as const,
  certificates: (employeeId: string) => [...trainingKeys.all, 'certificates', employeeId] as const,
} as const;

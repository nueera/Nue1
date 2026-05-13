export const recruitmentKeys = {
  all: ['recruitment'] as const,
  openings: (filters: Record<string, unknown>) => [...recruitmentKeys.all, 'openings', filters] as const,
  opening: (id: string) => [...recruitmentKeys.all, 'opening', id] as const,
  candidates: (filters: Record<string, unknown>) => [...recruitmentKeys.all, 'candidates', filters] as const,
  candidate: (id: string) => [...recruitmentKeys.all, 'candidate', id] as const,
  applications: (filters: Record<string, unknown>) => [...recruitmentKeys.all, 'applications', filters] as const,
  application: (id: string) => [...recruitmentKeys.all, 'application', id] as const,
  interviews: (filters: Record<string, unknown>) => [...recruitmentKeys.all, 'interviews', filters] as const,
  referrals: (filters: Record<string, unknown>) => [...recruitmentKeys.all, 'referrals', filters] as const,
} as const;

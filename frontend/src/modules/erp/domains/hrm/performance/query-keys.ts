export const performanceKeys = {
  all: ['performance'] as const,
  cycles: () => [...performanceKeys.all, 'cycles'] as const,
  goals: (userId: string) => [...performanceKeys.all, 'goals', userId] as const,
  reviews: (cycleId: string) => [...performanceKeys.all, 'reviews', cycleId] as const,
} as const;

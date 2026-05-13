export const onboardingKeys = {
  all: ['onboarding'] as const,
  templates: () => [...onboardingKeys.all, 'templates'] as const,
  newHires: () => [...onboardingKeys.all, 'new-hires'] as const,
  detail: (id: string) => [...onboardingKeys.all, 'detail', id] as const,
} as const;

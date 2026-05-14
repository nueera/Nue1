// @ts-nocheck
// Projects Query Keys — Zoho Invoice

export const projectsKeys = {
  all: ['invoice', 'projects'] as const,
  lists: () => [...projectsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...projectsKeys.lists(), params] as const,
  details: () => [...projectsKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectsKeys.details(), id] as const,
  stats: () => [...projectsKeys.all, 'stats'] as const,
} as const;

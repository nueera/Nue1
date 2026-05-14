// @ts-nocheck
// Attachments Query Keys — Cross-product

export const attachmentsKeys = {
  all: ['shared', 'attachments'] as const,
  lists: () => [...attachmentsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...attachmentsKeys.lists(), params] as const,
  details: () => [...attachmentsKeys.all, 'detail'] as const,
  detail: (id: string) => [...attachmentsKeys.details(), id] as const,
  stats: () => [...attachmentsKeys.all, 'stats'] as const,
} as const;

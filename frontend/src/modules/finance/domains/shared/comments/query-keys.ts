// @ts-nocheck
// Comments Query Keys — Cross-product

export const commentsKeys = {
  all: ['shared', 'comments'] as const,
  lists: () => [...commentsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...commentsKeys.lists(), params] as const,
  details: () => [...commentsKeys.all, 'detail'] as const,
  detail: (id: string) => [...commentsKeys.details(), id] as const,
  stats: () => [...commentsKeys.all, 'stats'] as const,
} as const;

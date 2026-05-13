export const RATING_SCALE = {
  min: 1,
  max: 5,
  labels: ['Needs Improvement', 'Below Expectations', 'Meets Expectations', 'Exceeds Expectations', 'Outstanding'],
} as const;

export const GOAL_CATEGORIES = ['Performance', 'Development', 'Learning', 'Project', 'Leadership'] as const;
export const REVIEW_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

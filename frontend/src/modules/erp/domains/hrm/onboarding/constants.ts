export const ONBOARDING_STAGES: Record<string, string> = {
  'pre-boarding': 'Pre-boarding',
  'day-one': 'Day One',
  'week-one': 'Week One',
  'month-one': 'Month One',
  completed: 'Completed',
};

export const TASK_CATEGORIES: Record<string, string> = {
  'it-setup': 'IT Setup',
  hr: 'HR',
  team: 'Team',
  training: 'Training',
  documentation: 'Documentation',
};

export const OFFBOARDING_REASONS = [
  'Resignation',
  'Termination',
  'End of Contract',
  'Retirement',
  'Layoff',
] as const;

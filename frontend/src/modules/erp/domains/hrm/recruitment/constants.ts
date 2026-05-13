export const JOB_OPENING_STATUSES = ['All', 'draft', 'open', 'on-hold', 'closed', 'filled'] as const;

export const JOB_OPENING_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  open: 'Open',
  'on-hold': 'On Hold',
  closed: 'Closed',
  filled: 'Filled',
};

export const APPLICATION_STAGES = [
  'applied',
  'screening',
  'phone-screen',
  'technical',
  'managerial',
  'hr-round',
  'offer',
  'hired',
  'rejected',
] as const;

export const APPLICATION_STAGE_LABELS: Record<string, string> = {
  applied: 'Applied',
  screening: 'Screening',
  'phone-screen': 'Phone Screen',
  technical: 'Technical',
  managerial: 'Managerial',
  'hr-round': 'HR Round',
  offer: 'Offer',
  hired: 'Hired',
  rejected: 'Rejected',
};

export const INTERVIEW_TYPES = ['phone', 'video', 'onsite', 'panel'] as const;

export const EMPLOYMENT_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
] as const;

export const EXPERIENCE_LEVELS = [
  'Entry Level',
  'Junior',
  'Mid-Level',
  'Senior',
  'Lead',
  'Manager',
  'Director',
] as const;

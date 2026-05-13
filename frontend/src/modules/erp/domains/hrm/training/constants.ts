export const PROGRAM_STATUSES = ['All', 'draft', 'upcoming', 'in-progress', 'completed', 'cancelled'] as const;

export const PROGRAM_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  upcoming: 'Upcoming',
  'in-progress': 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const TRAINING_CATEGORIES = [
  'Technical',
  'Leadership',
  'Soft Skills',
  'Compliance',
  'Onboarding',
  'Certification',
  'Safety',
  'Product',
] as const;

export const DELIVERY_MODES = ['classroom', 'online', 'hybrid', 'self-paced'] as const;

export const DELIVERY_MODE_LABELS: Record<string, string> = {
  classroom: 'Classroom',
  online: 'Online',
  hybrid: 'Hybrid',
  'self-paced': 'Self-Paced',
};

export const FEEDBACK_RATING_LABELS = [
  'Poor',
  'Fair',
  'Good',
  'Very Good',
  'Excellent',
] as const;

export const CERT_STATUSES = ['active', 'expired', 'expiring'] as const;

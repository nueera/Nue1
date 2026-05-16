// ============================================================================
// Planner Constants
// Activity types, budget categories, and configuration for Marketing Planner
// ============================================================================

// ---------------------------------------------------------------------------
// Plan Activity Types
// ---------------------------------------------------------------------------

export const PLAN_ACTIVITY_CONFIG = {
  campaign: { label: 'Campaign', color: 'blue', icon: 'megaphone' },
  content: { label: 'Content', color: 'green', icon: 'file-text' },
  event: { label: 'Event', color: 'purple', icon: 'calendar' },
  social_post: { label: 'Social Post', color: 'cyan', icon: 'share-2' },
  ad_spend: { label: 'Ad Spend', color: 'amber', icon: 'credit-card' },
  review: { label: 'Review', color: 'orange', icon: 'check-circle' },
  meeting: { label: 'Meeting', color: 'teal', icon: 'users' },
  deadline: { label: 'Deadline', color: 'red', icon: 'alert-circle' },
} as const;

// ---------------------------------------------------------------------------
// Plan Status Config
// ---------------------------------------------------------------------------

export const PLAN_STATUS_CONFIG = {
  planning: { label: 'Planning', color: 'blue' },
  active: { label: 'Active', color: 'green' },
  completed: { label: 'Completed', color: 'emerald' },
  on_hold: { label: 'On Hold', color: 'amber' },
  cancelled: { label: 'Cancelled', color: 'red' },
} as const;

// ---------------------------------------------------------------------------
// Budget Categories
// ---------------------------------------------------------------------------

export const BUDGET_CATEGORIES = [
  { id: 'advertising', label: 'Advertising', description: 'Paid media and ad spend' },
  { id: 'content', label: 'Content Creation', description: 'Blog posts, videos, design' },
  { id: 'tools', label: 'Tools & Software', description: 'Marketing technology stack' },
  { id: 'events', label: 'Events & Webinars', description: 'Virtual and in-person events' },
  { id: 'agency', label: 'Agency / Freelance', description: 'External marketing services' },
  { id: 'other', label: 'Other', description: 'Miscellaneous marketing expenses' },
] as const;

// ---------------------------------------------------------------------------
// Plan Recurrence Options
// ---------------------------------------------------------------------------

export const PLAN_RECURRENCE_OPTIONS = [
  { value: 'none', label: 'One-time' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annually', label: 'Annually' },
] as const;

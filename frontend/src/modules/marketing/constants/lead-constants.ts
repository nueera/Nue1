// @ts-nocheck
// ============================================================================
// Lead Constants
// Statuses, sources, stages, and configuration for the Leads domain
// ============================================================================

import type { LeadSource, LeadStage, LeadStatus } from '../types';

// ---------------------------------------------------------------------------
// Lead Source Config
// ---------------------------------------------------------------------------

export const LEAD_SOURCE_CONFIG: Record<LeadSource, { label: string; color: string; icon: string }> = {
  website: { label: 'Website', color: 'blue', icon: 'globe' },
  social_media: { label: 'Social Media', color: 'purple', icon: 'share-2' },
  email: { label: 'Email', color: 'cyan', icon: 'mail' },
  referral: { label: 'Referral', color: 'green', icon: 'users' },
  paid_ads: { label: 'Paid Ads', color: 'amber', icon: 'megaphone' },
  organic_search: { label: 'Organic Search', color: 'emerald', icon: 'search' },
  events: { label: 'Events', color: 'rose', icon: 'calendar' },
  webinar: { label: 'Webinar', color: 'indigo', icon: 'video' },
  content_download: { label: 'Content Download', color: 'teal', icon: 'download' },
  chat: { label: 'Chat', color: 'sky', icon: 'message-circle' },
  phone: { label: 'Phone', color: 'orange', icon: 'phone' },
  partner: { label: 'Partner', color: 'violet', icon: 'handshake' },
  other: { label: 'Other', color: 'gray', icon: 'more-horizontal' },
};

// ---------------------------------------------------------------------------
// Lead Stage Config
// ---------------------------------------------------------------------------

export const LEAD_STAGE_CONFIG: Record<LeadStage, { label: string; color: string; order: number; probability: number }> = {
  new: { label: 'New', color: 'blue', order: 0, probability: 10 },
  contacted: { label: 'Contacted', color: 'cyan', order: 1, probability: 20 },
  qualified: { label: 'Qualified', color: 'green', order: 2, probability: 40 },
  proposal: { label: 'Proposal', color: 'amber', order: 3, probability: 60 },
  negotiation: { label: 'Negotiation', color: 'orange', order: 4, probability: 80 },
  closed_won: { label: 'Closed Won', color: 'emerald', order: 5, probability: 100 },
  closed_lost: { label: 'Closed Lost', color: 'red', order: 6, probability: 0 },
  nurturing: { label: 'Nurturing', color: 'slate', order: 7, probability: 15 },
};

// ---------------------------------------------------------------------------
// Lead Status Config
// ---------------------------------------------------------------------------

export const LEAD_STATUS_CONFIG: Record<LeadStatus, { label: string; color: string }> = {
  active: { label: 'Active', color: 'green' },
  inactive: { label: 'Inactive', color: 'gray' },
  converted: { label: 'Converted', color: 'emerald' },
  disqualified: { label: 'Disqualified', color: 'red' },
  recycled: { label: 'Recycled', color: 'amber' },
  archived: { label: 'Archived', color: 'slate' },
};

// ---------------------------------------------------------------------------
// Lead Score Ranges
// ---------------------------------------------------------------------------

export const LEAD_SCORE_RANGES = {
  cold: { min: 0, max: 30, label: 'Cold', color: 'blue' },
  warm: { min: 31, max: 60, label: 'Warm', color: 'amber' },
  hot: { min: 61, max: 100, label: 'Hot', color: 'red' },
} as const;

// ---------------------------------------------------------------------------
// Lead Activity Types
// ---------------------------------------------------------------------------

export const LEAD_ACTIVITY_TYPES = {
  email_open: { label: 'Email Opened', icon: 'mail-open', points: 2 },
  email_click: { label: 'Email Clicked', icon: 'mouse-pointer-click', points: 5 },
  page_visit: { label: 'Page Visited', icon: 'eye', points: 3 },
  form_submit: { label: 'Form Submitted', icon: 'file-text', points: 10 },
  download: { label: 'Content Downloaded', icon: 'download', points: 8 },
  event_attend: { label: 'Event Attended', icon: 'calendar', points: 15 },
  social_engage: { label: 'Social Engagement', icon: 'share-2', points: 4 },
  call: { label: 'Phone Call', icon: 'phone', points: 10 },
  meeting: { label: 'Meeting', icon: 'users', points: 20 },
  note: { label: 'Note Added', icon: 'sticky-note', points: 0 },
} as const;

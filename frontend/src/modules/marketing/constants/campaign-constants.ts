// @ts-nocheck
// ============================================================================
// Campaign Constants
// Statuses, types, channels, and configuration for Campaigns domain
// ============================================================================

import type { CampaignType, CampaignStatus, CampaignChannel } from '../types';

// ---------------------------------------------------------------------------
// Campaign Type Config
// ---------------------------------------------------------------------------

export const CAMPAIGN_TYPE_CONFIG: Record<CampaignType, { label: string; color: string; icon: string }> = {
  email: { label: 'Email', color: 'blue', icon: 'mail' },
  sms: { label: 'SMS', color: 'green', icon: 'message-square' },
  whatsapp: { label: 'WhatsApp', color: 'emerald', icon: 'phone' },
  social: { label: 'Social', color: 'purple', icon: 'share-2' },
  multi_channel: { label: 'Multi-Channel', color: 'amber', icon: 'layers' },
};

// ---------------------------------------------------------------------------
// Campaign Status Config
// ---------------------------------------------------------------------------

export const CAMPAIGN_STATUS_CONFIG: Record<CampaignStatus, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'gray' },
  scheduled: { label: 'Scheduled', color: 'blue' },
  sending: { label: 'Sending', color: 'cyan' },
  active: { label: 'Active', color: 'green' },
  paused: { label: 'Paused', color: 'amber' },
  completed: { label: 'Completed', color: 'emerald' },
  archived: { label: 'Archived', color: 'slate' },
};

// ---------------------------------------------------------------------------
// Campaign Channel Config
// ---------------------------------------------------------------------------

export const CAMPAIGN_CHANNEL_CONFIG: Record<CampaignChannel, { label: string; color: string; icon: string }> = {
  email: { label: 'Email', color: 'blue', icon: 'mail' },
  sms: { label: 'SMS', color: 'green', icon: 'message-square' },
  whatsapp: { label: 'WhatsApp', color: 'emerald', icon: 'phone' },
  facebook: { label: 'Facebook', color: 'blue', icon: 'facebook' },
  instagram: { label: 'Instagram', color: 'purple', icon: 'instagram' },
  linkedin: { label: 'LinkedIn', color: 'sky', icon: 'linkedin' },
  twitter: { label: 'Twitter/X', color: 'cyan', icon: 'twitter' },
  google_ads: { label: 'Google Ads', color: 'red', icon: 'target' },
  web_push: { label: 'Web Push', color: 'amber', icon: 'bell' },
};

// ---------------------------------------------------------------------------
// Campaign Metric Benchmarks
// ---------------------------------------------------------------------------

export const CAMPAIGN_BENCHMARKS = {
  email: { openRate: 22, clickRate: 3.5, bounceRate: 2, unsubscribeRate: 0.5 },
  sms: { openRate: 95, clickRate: 10, bounceRate: 1, unsubscribeRate: 1 },
  whatsapp: { openRate: 90, clickRate: 8, bounceRate: 0.5, unsubscribeRate: 0.3 },
  social: { openRate: 15, clickRate: 1.5, bounceRate: 0, unsubscribeRate: 0 },
  web_push: { openRate: 12, clickRate: 2, bounceRate: 0, unsubscribeRate: 2 },
} as const;

// ---------------------------------------------------------------------------
// Email-Specific Constants
// ---------------------------------------------------------------------------

export const EMAIL_SEND_LIMITS = {
  maxRecipientsPerCampaign: 50000,
  maxAttachmentsPerEmail: 5,
  maxAttachmentSizeMB: 25,
  maxSubjectLength: 150,
  maxPreheaderLength: 100,
} as const;

// ---------------------------------------------------------------------------
// SMS-Specific Constants
// ---------------------------------------------------------------------------

export const SMS_LIMITS = {
  maxMessageLength: 160,
  maxMessageLengthUnicode: 70,
  maxSegments: 6,
  optOutKeywords: ['STOP', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT'],
} as const;

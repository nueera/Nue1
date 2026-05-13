// ============================================================================
// Campaign Helpers — Labels, colors, icons for campaign types/statuses
// ============================================================================

import type { CampaignType, CampaignStatus, CampaignChannel } from '../types';

const CAMPAIGN_TYPE_LABELS: Record<CampaignType, string> = {
  email: 'Email',
  sms: 'SMS',
  whatsapp: 'WhatsApp',
  social: 'Social',
  multi_channel: 'Multi-Channel',
};

const CAMPAIGN_STATUS_COLORS: Record<CampaignStatus, string> = {
  draft: 'bg-gray-100 text-gray-700',
  scheduled: 'bg-blue-100 text-blue-700',
  sending: 'bg-amber-100 text-amber-700',
  active: 'bg-green-100 text-green-700',
  paused: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-emerald-100 text-emerald-700',
  archived: 'bg-slate-100 text-slate-600',
};

const CAMPAIGN_CHANNEL_ICONS: Record<CampaignChannel, string> = {
  email: 'Mail',
  sms: 'MessageSquare',
  whatsapp: 'Phone',
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'Linkedin',
  twitter: 'Twitter',
  google_ads: 'Target',
  web_push: 'Bell',
};

export function getCampaignTypeLabel(type: CampaignType): string {
  return CAMPAIGN_TYPE_LABELS[type] ?? type;
}

export function getCampaignStatusColor(status: CampaignStatus): string {
  return CAMPAIGN_STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-700';
}

export function isCampaignEditable(status: CampaignStatus): boolean {
  return status === 'draft' || status === 'paused';
}

export function getCampaignChannelIcon(channel: CampaignChannel): string {
  return CAMPAIGN_CHANNEL_ICONS[channel] ?? 'Megaphone';
}

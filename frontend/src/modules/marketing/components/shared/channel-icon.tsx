'use client';

import { cn } from '@/lib/utils';
import {
  Mail,
  MessageSquare,
  Phone,
  Share2,
} from 'lucide-react';
import type { CampaignChannel } from '@/modules/marketing/types';

export interface ChannelIconProps {
  channel: CampaignChannel;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CHANNEL_ICON_MAP: Record<CampaignChannel, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  email: Mail,
  sms: MessageSquare,
  whatsapp: Phone,
  facebook: Share2,
  instagram: Share2,
  linkedin: Share2,
  twitter: Share2,
  google_ads: Share2,
  web_push: Share2,
};

const SIZE_MAP = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function ChannelIcon({ channel, className, size = 'md' }: ChannelIconProps) {
  const Icon = CHANNEL_ICON_MAP[channel] ?? Share2;
  return <Icon className={cn(SIZE_MAP[size], className)} strokeWidth={1.8} />;
}

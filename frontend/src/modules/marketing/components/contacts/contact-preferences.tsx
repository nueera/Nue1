// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ContactPreference } from '@/modules/marketing/types';
import { Mail, MessageSquare, Phone, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactPreferencesProps {
  preferences: ContactPreference[];
  contactId: string;
  className?: string;
}

const CHANNEL_CONFIG: {
  key: ContactPreference;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}[] = [
  {
    key: 'email',
    label: 'Email',
    icon: Mail,
    description: 'Marketing emails and newsletters',
  },
  {
    key: 'sms',
    label: 'SMS',
    icon: MessageSquare,
    description: 'Text messages and notifications',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    icon: Phone,
    description: 'WhatsApp messages and updates',
  },
  {
    key: 'phone',
    label: 'Phone',
    icon: Phone,
    description: 'Phone calls and voice messages',
  },
];

export function ContactPreferences({ preferences, contactId, className }: ContactPreferencesProps) {
  const isEnabled = (channel: ContactPreference) => preferences.includes(channel);

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          Communication Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pb-6">
        {CHANNEL_CONFIG.map((channel, idx) => {
          const Icon = channel.icon;
          const enabled = isEnabled(channel.key);

          return (
            <motion.div
              key={channel.key}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.06 }}
              className="flex items-center justify-between gap-3 py-1"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    'flex items-center justify-center h-8 w-8 rounded-lg',
                    enabled
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-muted/30 text-muted-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <Label className="text-sm font-medium">{channel.label}</Label>
                  <p className="text-xs text-muted-foreground">{channel.description}</p>
                </div>
              </div>
              <Switch checked={enabled} disabled />
            </motion.div>
          );
        })}

        <div className="pt-2 border-t">
          <Label className="text-xs text-muted-foreground">Email Frequency</Label>
          <Select defaultValue="weekly" disabled>
            <SelectTrigger className="h-8 mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realtime">Real-time</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

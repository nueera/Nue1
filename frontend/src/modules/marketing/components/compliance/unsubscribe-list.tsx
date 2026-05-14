// @ts-nocheck
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, UserMinus, Mail, MessageSquare, Ban } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useUnsubscribes } from '@/modules/marketing/hooks/use-compliance';
import type { UnsubscribeEntry } from '@/modules/marketing/types';

const CHANNEL_ICONS: Record<string, typeof Mail> = { email: Mail, sms: MessageSquare, whatsapp: MessageSquare, all: Ban };

export function UnsubscribeList() {
  const { data: unsubscribesData } = useUnsubscribes();
  const [search, setSearch] = useState('');

  const mockUnsubscribes: UnsubscribeEntry[] = [
    { id: '1', contactId: 'c1', channel: 'email', reason: 'Too many emails', timestamp: '2024-03-15T10:00:00Z' },
    { id: '2', contactId: 'c2', channel: 'all', reason: 'No longer interested', timestamp: '2024-03-14T10:00:00Z' },
    { id: '3', contactId: 'c3', channel: 'sms', reason: '', timestamp: '2024-03-13T10:00:00Z' },
    { id: '4', contactId: 'c4', channel: 'email', reason: 'Content not relevant', timestamp: '2024-03-12T10:00:00Z' },
    { id: '5', contactId: 'c5', channel: 'whatsapp', reason: '', timestamp: '2024-03-11T10:00:00Z' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <UserMinus className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Unsubscribe List</h3>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
      </div>

      <div className="space-y-2">
        {mockUnsubscribes.map((entry, idx) => {
          const Icon = CHANNEL_ICONS[entry.channel] ?? UserMinus;
          return (
            <motion.div key={entry.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50"
            >
              <Icon className="h-4 w-4 text-red-500" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{entry.channel}</Badge>
                  {entry.reason && <span className="text-xs text-muted-foreground">{entry.reason}</span>}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{new Date(entry.timestamp).toLocaleDateString()}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Shield, Search, Check, X, Mail, MessageSquare, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useConsents, useUpdateConsent } from '@/modules/marketing/hooks';
import type { ConsentRecord } from '@/modules/marketing/types';

const TYPE_ICONS: Record<string, typeof Mail> = { email: Mail, sms: MessageSquare, whatsapp: MessageSquare, phone: Phone, tracking: Shield, marketing: Mail };

export function ConsentManagement() {
  const { data: consentsData } = useConsents();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const mockConsents: ConsentRecord[] = [
    { id: '1', contactId: 'c1', type: 'email', granted: true, source: 'signup_form', timestamp: '2024-03-15T10:00:00Z' },
    { id: '2', contactId: 'c2', type: 'sms', granted: false, source: 'preference_center', timestamp: '2024-03-14T10:00:00Z' },
    { id: '3', contactId: 'c3', type: 'whatsapp', granted: true, source: 'double_opt_in', timestamp: '2024-03-13T10:00:00Z' },
    { id: '4', contactId: 'c4', type: 'tracking', granted: true, source: 'cookie_banner', timestamp: '2024-03-12T10:00:00Z' },
    { id: '5', contactId: 'c5', type: 'marketing', granted: false, source: 'unsubscribe', timestamp: '2024-03-11T10:00:00Z' },
  ];

  const filtered = mockConsents.filter((c) => {
    if (typeFilter !== 'all' && c.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Consent Management</h3>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[130px] h-9"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="tracking">Tracking</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filtered.map((consent, idx) => {
          const Icon = TYPE_ICONS[consent.type] ?? Shield;
          return (
            <motion.div key={consent.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50"
            >
              <Icon className={`h-4 w-4 ${consent.granted ? 'text-emerald-600' : 'text-red-600'}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{consent.type}</Badge>
                  <span className="text-xs text-muted-foreground">{consent.source}</span>
                </div>
              </div>
              {consent.granted ? (
                <Badge className="text-xs bg-emerald-600 gap-1"><Check className="h-3 w-3" />Granted</Badge>
              ) : (
                <Badge variant="destructive" className="text-xs gap-1"><X className="h-3 w-3" />Denied</Badge>
              )}
              <span className="text-xs text-muted-foreground">{new Date(consent.timestamp).toLocaleDateString()}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

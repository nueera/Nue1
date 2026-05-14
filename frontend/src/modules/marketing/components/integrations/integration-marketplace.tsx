// @ts-nocheck
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plug, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import type { IntegrationCategory } from '@/modules/marketing/types';

const CATEGORIES: Array<{ value: IntegrationCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'crm', label: 'CRM' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'advertising', label: 'Advertising' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'communication', label: 'Communication' },
];

const INTEGRATIONS = [
  { id: '1', name: 'Salesforce', category: 'crm' as const, description: 'Sync contacts and leads with Salesforce CRM', status: 'connected' as const },
  { id: '2', name: 'Google Analytics', category: 'analytics' as const, description: 'Track website analytics and conversions', status: 'connected' as const },
  { id: '3', name: 'Facebook Ads', category: 'advertising' as const, description: 'Manage and track Facebook ad campaigns', status: 'disconnected' as const },
  { id: '4', name: 'Slack', category: 'communication' as const, description: 'Send notifications to Slack channels', status: 'disconnected' as const },
  { id: '5', name: 'Shopify', category: 'ecommerce' as const, description: 'Sync products and orders from Shopify', status: 'connected' as const },
  { id: '6', name: 'Twitter', category: 'social_media' as const, description: 'Schedule and publish tweets', status: 'error' as const },
  { id: '7', name: 'HubSpot', category: 'crm' as const, description: 'Sync with HubSpot CRM', status: 'disconnected' as const },
  { id: '8', name: 'Google Ads', category: 'advertising' as const, description: 'Manage Google Ads campaigns', status: 'disconnected' as const },
];

export function IntegrationMarketplace() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const filtered = INTEGRATIONS.filter((i) => {
    if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'all' && i.category !== category) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Plug className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Integration Marketplace</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search integrations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map((cat) => (
            <Button key={cat.value} variant={category === cat.value ? 'default' : 'outline'} size="sm" className="h-8 text-xs" onClick={() => setCategory(cat.value)}>
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((integration, idx) => (
          <motion.div key={integration.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
            <Card className="border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-sm font-bold">
                    {integration.name[0]}
                  </div>
                  <Badge variant={integration.status === 'connected' ? 'default' : integration.status === 'error' ? 'destructive' : 'secondary'} className="text-xs">
                    {integration.status}
                  </Badge>
                </div>
                <h4 className="text-sm font-semibold">{integration.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{integration.description}</p>
                <Button variant="outline" size="sm" className="w-full mt-3" disabled={integration.status === 'connected'}>
                  {integration.status === 'connected' ? 'Connected' : <><Plus className="h-3 w-3 mr-1" />Connect</>}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// @ts-nocheck
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, Store, ExternalLink, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { useStores } from '@/modules/marketing/hooks/use-ecommerce';
import type { EcommerceStore } from '@/modules/marketing/types';

interface StoreListProps {
  onConnectStore?: () => void;
  onViewStore?: (store: EcommerceStore) => void;
}

const PLATFORM_BADGE: Record<string, string> = {
  shopify: 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400',
  woocommerce: 'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400',
  magento: 'bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400',
  bigcommerce: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
  custom: 'bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400',
};

export function StoreList({ onConnectStore, onViewStore }: StoreListProps) {
  const { data: storesData, isLoading } = useStores();
  const stores = storesData?.data ?? [];
  const [search, setSearch] = useState('');

  const filtered = stores.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.platform.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search stores..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Button onClick={onConnectStore} size="sm">
          <Plus className="h-4 w-4 mr-2" />Connect Store
        </Button>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Store className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <h3 className="text-lg font-semibold">No stores found</h3>
            <p className="text-sm text-muted-foreground mt-1">Connect your first e-commerce store to get started.</p>
            <Button className="mt-4" size="sm" onClick={onConnectStore}>
              <Plus className="h-4 w-4 mr-2" />Connect Store
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((store, idx) => (
            <motion.div key={store.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
              <Card className="border-border/50 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onViewStore?.(store)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-sm font-bold">
                        {store.platform[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{store.name}</p>
                        <Badge className={`text-xs ${PLATFORM_BADGE[store.platform] ?? ''}`} variant="secondary">
                          {store.platform}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onViewStore?.(store); }}>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Sync Products</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Disconnect</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center mt-3">
                    {[
                      { label: 'Products', value: store.productCount },
                      { label: 'Orders', value: store.orderCount },
                      { label: 'Revenue', value: `$${(store.revenue / 1000).toFixed(1)}k` },
                    ].map((stat) => (
                      <div key={stat.label} className="p-2 rounded-lg bg-muted/30">
                        <p className="text-sm font-semibold tabular-nums">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                    <Badge variant={store.status === 'connected' ? 'default' : 'destructive'} className="text-xs">
                      {store.status}
                    </Badge>
                    <span className="ml-auto flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      {store.domain}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft, Store, RefreshCw, ExternalLink, Package, ShoppingCart, DollarSign, Activity,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { EcommerceStore } from '@/modules/marketing/types';

interface StoreDetailProps {
  store: EcommerceStore;
  onBack?: () => void;
  onSync?: (storeId: string) => void;
}

export function StoreDetail({ store, onBack, onSync }: StoreDetailProps) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Store className="h-6 w-6 text-emerald-600" />
              {store.name}
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
              <ExternalLink className="h-3 w-3" />{store.domain}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={store.status === 'connected' ? 'default' : 'destructive'}>
            {store.status}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => onSync?.(store.id)}>
            <RefreshCw className="h-4 w-4 mr-2" />Sync Now
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Package, label: 'Products', value: store.productCount.toLocaleString() },
          { icon: ShoppingCart, label: 'Orders', value: store.orderCount.toLocaleString() },
          { icon: DollarSign, label: 'Revenue', value: `${store.currency} ${store.revenue.toLocaleString()}` },
          { icon: Activity, label: 'Platform', value: store.platform },
        ].map((item, idx) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{item.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Sync Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Connected</span>
              <span className="text-sm">{new Date(store.connectedAt).toLocaleDateString()}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant={store.status === 'connected' ? 'default' : 'destructive'}>{store.status}</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Currency</span>
              <span className="text-sm">{store.currency}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

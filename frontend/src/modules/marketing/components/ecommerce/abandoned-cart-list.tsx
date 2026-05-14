// @ts-nocheck
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { ShoppingCart, Search, Mail, MessageSquare, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAbandonedCarts } from '@/modules/marketing/hooks/use-ecommerce';
import type { AbandonedCart } from '@/modules/marketing/types';

const STATUS_CONFIG: Record<string, { variant: 'default' | 'secondary' | 'destructive'; icon: typeof AlertTriangle }> = {
  active: { variant: 'destructive', icon: AlertTriangle },
  recovered: { variant: 'default', icon: CheckCircle2 },
  expired: { variant: 'secondary', icon: Clock },
};

interface AbandonedCartListProps {
  onViewCart?: (cart: AbandonedCart) => void;
}

export function AbandonedCartList({ onViewCart }: AbandonedCartListProps) {
  const { data: cartsData, isLoading } = useAbandonedCarts();
  const carts = cartsData?.data ?? [];
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = carts.filter((c) => {
    if (search && !c.id.includes(search)) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search carts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="recovered">Recovered</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <h3 className="text-lg font-semibold">No abandoned carts</h3>
            <p className="text-sm text-muted-foreground mt-1">Abandoned carts will appear here when customers leave without purchasing.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((cart, idx) => {
            const config = STATUS_CONFIG[cart.status] ?? STATUS_CONFIG.active;
            const StatusIcon = config.icon;

            return (
              <motion.div
                key={cart.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors"
                onClick={() => onViewCart?.(cart)}
              >
                <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-amber-50 dark:bg-amber-950/30">
                  <ShoppingCart className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{cart.items.length} items · {cart.currency} {cart.total.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    Abandoned {new Date(cart.abandonedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {cart.recoveryEmailSent && <Mail className="h-3.5 w-3.5 text-blue-500" />}
                  {cart.recoverySmsSent && <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />}
                  <Badge variant={config.variant} className="text-xs gap-1">
                    <StatusIcon className="h-3 w-3" />
                    {cart.status}
                  </Badge>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

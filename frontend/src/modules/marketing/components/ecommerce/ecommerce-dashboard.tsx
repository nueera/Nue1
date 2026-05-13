'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStores, useAbandonedCarts } from '@/modules/marketing/hooks';
import { cn } from '@/lib/utils';

interface EcommerceDashboardProps {
  onCreateCampaign?: () => void;
}

export function EcommerceDashboard({ onCreateCampaign }: EcommerceDashboardProps) {
  const { data: storesData } = useStores();
  const { data: cartsData } = useAbandonedCarts();
  const stores = storesData?.data ?? [];
  const carts = cartsData?.data ?? [];

  const totalRevenue = stores.reduce((sum, s) => sum + s.revenue, 0);
  const totalOrders = stores.reduce((sum, s) => sum + s.orderCount, 0);
  const activeCarts = carts.filter((c) => c.status === 'active').length;

  const metrics = [
    { icon: DollarSign, label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: 12.5, bg: 'bg-emerald-50 dark:bg-emerald-950/30', color: 'text-emerald-600' },
    { icon: ShoppingCart, label: 'Total Orders', value: totalOrders.toLocaleString(), change: 8.3, bg: 'bg-blue-50 dark:bg-blue-950/30', color: 'text-blue-600' },
    { icon: Package, label: 'Products', value: stores.reduce((s, st) => s + st.productCount, 0).toLocaleString(), change: 2.1, bg: 'bg-purple-50 dark:bg-purple-950/30', color: 'text-purple-600' },
    { icon: AlertTriangle, label: 'Abandoned Carts', value: activeCarts.toString(), change: -5.2, bg: 'bg-amber-50 dark:bg-amber-950/30', color: 'text-amber-600' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 42000, orders: 320 },
    { month: 'Feb', revenue: 48000, orders: 360 },
    { month: 'Mar', revenue: 55000, orders: 410 },
    { month: 'Apr', revenue: 52000, orders: 395 },
    { month: 'May', revenue: 61000, orders: 450 },
    { month: 'Jun', revenue: 68000, orders: 520 },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const isPositive = m.change >= 0;
          return (
            <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl', m.bg)}>
                      <m.icon className={cn('h-5 w-5', m.color)} />
                    </div>
                    <div className={cn('flex items-center gap-0.5 text-xs font-medium', isPositive ? 'text-emerald-600' : 'text-red-600')}>
                      {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {Math.abs(m.change)}%
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-3 tabular-nums">{m.value}</p>
                  <p className="text-sm text-muted-foreground">{m.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue chart */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            Revenue Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revGrad)" name="Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Connected stores */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-emerald-600" />
              Connected Stores
            </h3>
            <Button variant="outline" size="sm" onClick={onCreateCampaign}>
              <ShoppingCart className="h-4 w-4 mr-1" />
              Connect Store
            </Button>
          </div>
          {stores.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No stores connected yet.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stores.map((store, idx) => (
                <motion.div
                  key={store.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 rounded-xl border border-border/50 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold">
                      {store.platform[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{store.name}</p>
                      <p className="text-xs text-muted-foreground">{store.platform}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span>${store.revenue.toLocaleString()} revenue</span>
                    <span>{store.orderCount} orders</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

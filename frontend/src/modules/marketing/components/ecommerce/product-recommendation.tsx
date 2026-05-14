// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, ShoppingCart, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProductRecommendationProps {
  storeId?: string;
  onAddToCampaign?: (productId: string) => void;
}

const MOCK_RECOMMENDATIONS = [
  { id: '1', name: 'Wireless Headphones Pro', score: 95, reason: 'High margin + trending', revenue: 12500, orders: 85, trend: 12.5 },
  { id: '2', name: 'Smart Watch Ultra', score: 88, reason: 'Frequently bought together', revenue: 9800, orders: 62, trend: 8.3 },
  { id: '3', name: 'Premium Laptop Stand', score: 82, reason: 'Cross-sell opportunity', revenue: 7200, orders: 48, trend: 15.2 },
  { id: '4', name: 'USB-C Hub Adapter', score: 76, reason: 'Complementary product', revenue: 5600, orders: 112, trend: 6.1 },
  { id: '5', name: 'Ergonomic Keyboard', score: 71, reason: 'High engagement rate', revenue: 4900, orders: 31, trend: -2.4 },
];

const CHART_DATA = MOCK_RECOMMENDATIONS.map((r) => ({ name: r.name.split(' ').slice(0, 2).join(' '), score: r.score, revenue: r.revenue }));

export function ProductRecommendation({ storeId, onAddToCampaign }: ProductRecommendationProps) {
  return (
    <div className="space-y-4">
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            AI Product Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="score" fill="#10b981" radius={[4, 4, 0, 0]} name="Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {MOCK_RECOMMENDATIONS.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 shrink-0">
              <span className="text-sm font-bold text-emerald-600">#{idx + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{product.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="secondary" className="text-xs">{product.reason}</Badge>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold tabular-nums">${product.revenue.toLocaleString()}</p>
              <div className="flex items-center gap-1 justify-end">
                <span className={`text-xs font-medium ${product.trend >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {product.trend >= 0 ? '+' : ''}{product.trend}%
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0" onClick={() => onAddToCampaign?.(product.id)}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

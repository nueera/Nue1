// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import type { PageVariant } from '@/modules/marketing/types';
import { Plus, Trophy, Eye, MousePointerClick, BarChart3, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageVariantsProps {
  variants: PageVariant[];
  onUpdate?: (variants: PageVariant[]) => void;
}

export function LandingPageVariants({ variants, onUpdate }: LandingPageVariantsProps) {
  const [newVariantName, setNewVariantName] = useState('');

  const totalViews = variants.reduce((sum, v) => sum + v.views, 0);
  const totalConversions = variants.reduce((sum, v) => sum + v.conversions, 0);

  const handleAddVariant = () => {
    if (!newVariantName.trim()) return;
    const newVariant: PageVariant = {
      id: `variant-${Date.now()}`,
      name: newVariantName.trim(),
      sections: [],
      views: 0,
      conversions: 0,
      conversionRate: 0,
      isControl: variants.length === 0,
    };
    onUpdate?.([...variants, newVariant]);
    setNewVariantName('');
  };

  const handleRemoveVariant = (id: string) => {
    onUpdate?.(variants.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-semibold text-foreground">A/B Test Variants</h3>
        <p className="text-sm text-muted-foreground mt-1">Test different page versions to optimize conversion rate</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border/50">
          <CardContent className="p-3 text-center">
            <Eye className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-bold">{totalViews.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">Total Views</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-3 text-center">
            <MousePointerClick className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-bold">{totalConversions.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">Total Conversions</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-3 text-center">
            <BarChart3 className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-bold">{totalViews > 0 ? `${Math.round((totalConversions / totalViews) * 100)}%` : '0%'}</p>
            <p className="text-[10px] text-muted-foreground">Overall Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Variant */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Input
              value={newVariantName}
              onChange={(e) => setNewVariantName(e.target.value)}
              placeholder="Variant name (e.g., Version B)"
              className="h-8 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleAddVariant()}
            />
            <Button size="sm" onClick={handleAddVariant} className="shrink-0">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Variants List */}
      <div className="space-y-3">
        {variants.map((variant, index) => (
          <motion.div
            key={variant.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Card className={cn('border-border/50', variant.isControl && 'ring-1 ring-emerald-500/30')}>
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium">{variant.name}</CardTitle>
                    {variant.isControl && (
                      <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                        Control
                      </Badge>
                    )}
                    {variant.conversionRate === Math.max(...variants.map((v) => v.conversionRate)) && variant.views > 0 && (
                      <Trophy className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                  {!variant.isControl && (
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleRemoveVariant(variant.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Views</p>
                    <p className="text-sm font-semibold">{variant.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Conversions</p>
                    <p className="text-sm font-semibold">{variant.conversions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Conv. Rate</p>
                    <p className="text-sm font-semibold text-emerald-600">{variant.conversionRate}%</p>
                  </div>
                </div>
                <Progress value={variant.conversionRate} className="h-1.5" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {variants.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <BarChart3 className="h-10 w-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No variants yet</p>
          <p className="text-xs mt-1">Add a variant to start A/B testing</p>
        </div>
      )}
    </div>
  );
}

// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { FlaskConical, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Variant {
  id: string;
  name: string;
  subject: string;
  content: string;
  trafficPercent: number;
  isControl: boolean;
}

interface EmailABTestProps {
  value?: string;
  onChange: (abTestId: string) => void;
  className?: string;
}

export function EmailABTest({ value, onChange, className }: EmailABTestProps) {
  const [enabled, setEnabled] = useState(!!value);
  const [variants, setVariants] = useState<Variant[]>([
    { id: 'v1', name: 'Control', subject: '', content: '', trafficPercent: 50, isControl: true },
    { id: 'v2', name: 'Variant B', subject: '', content: '', trafficPercent: 50, isControl: false },
  ]);
  const [winningCriteria, setWinningCriteria] = useState('open_rate');
  const [confidenceLevel, setConfidenceLevel] = useState(95);

  const handleAddVariant = () => {
    const newId = `v${variants.length + 1}`;
    const totalTraffic = 100;
    const equalPercent = Math.floor(totalTraffic / (variants.length + 1));
    const remainder = totalTraffic - equalPercent * (variants.length + 1);

    const updatedVariants = variants.map((v, i) => ({
      ...v,
      trafficPercent: equalPercent + (i === 0 ? remainder : 0),
    }));

    setVariants([
      ...updatedVariants,
      { id: newId, name: `Variant ${String.fromCharCode(65 + variants.length)}`, subject: '', content: '', trafficPercent: equalPercent, isControl: false },
    ]);
  };

  const handleRemoveVariant = (id: string) => {
    if (variants.length <= 2) return;
    const filtered = variants.filter((v) => v.id !== id);
    const equalPercent = Math.floor(100 / filtered.length);
    const remainder = 100 - equalPercent * filtered.length;
    setVariants(
      filtered.map((v, i) => ({
        ...v,
        trafficPercent: equalPercent + (i === 0 ? remainder : 0),
      }))
    );
  };

  const handleVariantChange = (id: string, field: keyof Variant, val: string | number) => {
    setVariants(variants.map((v) => (v.id === id ? { ...v, [field]: val } : v)));
  };

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-muted-foreground" />
            A/B Test
          </CardTitle>
          <Button
            variant={enabled ? 'destructive' : 'default'}
            size="sm"
            className={cn('text-xs', !enabled && 'bg-emerald-600 hover:bg-emerald-700')}
            onClick={() => setEnabled(!enabled)}
          >
            {enabled ? 'Disable' : 'Enable A/B Test'}
          </Button>
        </div>
      </CardHeader>

      {enabled && (
        <CardContent className="space-y-4">
          {/* Winning Criteria */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Winning Criteria</Label>
              <Select value={winningCriteria} onValueChange={setWinningCriteria}>
                <SelectTrigger className="h-9 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open_rate">Open Rate</SelectItem>
                  <SelectItem value="click_rate">Click Rate</SelectItem>
                  <SelectItem value="conversion">Conversion</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Confidence Level: {confidenceLevel}%</Label>
              <Slider
                value={[confidenceLevel]}
                onValueChange={([v]) => setConfidenceLevel(v)}
                min={80}
                max={99}
                step={1}
                className="mt-3"
              />
            </div>
          </div>

          <Separator />

          {/* Variants */}
          <div className="space-y-3">
            {variants.map((variant, index) => (
              <motion.div
                key={variant.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg border border-border/50 bg-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{variant.name}</span>
                    {variant.isControl && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        Control
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {variant.trafficPercent}% traffic
                    </Badge>
                  </div>
                  {!variant.isControl && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleRemoveVariant(variant.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    value={variant.subject}
                    onChange={(e) => handleVariantChange(variant.id, 'subject', e.target.value)}
                    placeholder="Subject line for this variant..."
                    className="h-8 text-xs"
                  />
                  <Textarea
                    value={variant.content}
                    onChange={(e) => handleVariantChange(variant.id, 'content', e.target.value)}
                    placeholder="Content variant description..."
                    rows={2}
                    className="text-xs resize-none"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {variants.length < 5 && (
            <Button variant="outline" size="sm" className="w-full text-xs" onClick={handleAddVariant}>
              <Plus className="h-3 w-3 mr-1" />
              Add Variant
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
}

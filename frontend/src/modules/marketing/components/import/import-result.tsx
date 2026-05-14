// @ts-nocheck
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImportResultProps {
  created?: number;
  updated?: number;
  errors?: number;
  skipped?: number;
  onComplete?: () => void;
}

export function ImportResult({ created = 48, updated = 12, errors = 3, skipped = 2, onComplete }: ImportResultProps) {
  const total = created + updated + errors + skipped;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="text-center py-4">
        <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold">Import Complete</h3>
        <p className="text-sm text-muted-foreground mt-1">{total} records processed</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { icon: CheckCircle2, label: 'Created', value: created, color: 'text-emerald-600' },
          { icon: CheckCircle2, label: 'Updated', value: updated, color: 'text-blue-600' },
          { icon: XCircle, label: 'Errors', value: errors, color: 'text-red-600' },
          { icon: AlertTriangle, label: 'Skipped', value: skipped, color: 'text-amber-600' },
        ].map((item) => (
          <Card key={item.label} className="border-border/50">
            <CardContent className="p-3 text-center">
              <item.icon className={`h-4 w-4 ${item.color} mx-auto mb-1`} />
              <p className="text-lg font-bold tabular-nums">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={onComplete} className="w-full">Done</Button>
    </motion.div>
  );
}

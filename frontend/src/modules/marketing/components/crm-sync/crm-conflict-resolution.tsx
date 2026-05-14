// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Check, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Conflict {
  id: string;
  field: string;
  marketingValue: string;
  crmValue: string;
  direction: string;
}

interface CrmConflictResolutionProps {
  conflicts?: Conflict[];
  onResolve?: (conflictId: string, resolution: 'marketing' | 'crm') => void;
}

const MOCK_CONFLICTS: Conflict[] = [
  { id: '1', field: 'email', marketingValue: 'john@example.com', crmValue: 'john.doe@example.com', direction: 'bidirectional' },
  { id: '2', field: 'phone', marketingValue: '+1234567890', crmValue: '+0987654321', direction: 'bidirectional' },
  { id: '3', field: 'company', marketingValue: 'Acme Inc', crmValue: 'Acme Corporation', direction: 'bidirectional' },
];

export function CrmConflictResolution({ conflicts = MOCK_CONFLICTS, onResolve }: CrmConflictResolutionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
        <h3 className="text-lg font-semibold">Conflict Resolution</h3>
        <Badge variant="destructive" className="text-xs">{conflicts.length} conflicts</Badge>
      </div>

      <div className="space-y-3">
        {conflicts.map((conflict, idx) => (
          <motion.div key={conflict.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <p className="text-sm font-medium mb-3">{conflict.field}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                    <p className="text-xs text-muted-foreground mb-1">Marketing</p>
                    <p className="text-sm font-medium">{conflict.marketingValue}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-muted-foreground mb-1">CRM</p>
                    <p className="text-sm font-medium">{conflict.crmValue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => onResolve?.(conflict.id, 'marketing')}>
                    <Check className="h-3 w-3 text-emerald-600" />Use Marketing
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => onResolve?.(conflict.id, 'crm')}>
                    <Check className="h-3 w-3 text-blue-600" />Use CRM
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { ArrowRightLeft, Plus, Trash2, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFieldMappings } from '@/modules/marketing/hooks/use-crm-sync';
import type { FieldMapping } from '@/modules/marketing/types';

interface MappingRow {
  marketingField: string;
  crmField: string;
  direction: FieldMapping['direction'];
}

interface CrmFieldMappingProps {
  mappings?: FieldMapping[];
  onSave?: (mappings: FieldMapping[]) => void;
}

export function CrmFieldMapping({ mappings: initialMappings, onSave }: CrmFieldMappingProps) {
  const { data: mappingsData } = useFieldMappings();
  const [mappings, setMappings] = useState<MappingRow[]>(
    initialMappings ?? mappingsData?.data ?? [
      { marketingField: 'email', crmField: 'Email', direction: 'bidirectional' },
      { marketingField: 'firstName', crmField: 'FirstName', direction: 'bidirectional' },
      { marketingField: 'lastName', crmField: 'LastName', direction: 'bidirectional' },
      { marketingField: 'phone', crmField: 'Phone', direction: 'marketing_to_crm' },
    ]
  );

  const addMapping = () => setMappings([...mappings, { marketingField: '', crmField: '', direction: 'bidirectional' }]);
  const removeMapping = (idx: number) => setMappings(mappings.filter((_, i) => i !== idx));
  const updateMapping = (idx: number, updates: Partial<MappingRow>) => setMappings(mappings.map((m, i) => i === idx ? { ...m, ...updates } : m));

  const DIRECTION_LABELS: Record<string, string> = { marketing_to_crm: 'Marketing → CRM', crm_to_marketing: 'CRM → Marketing', bidirectional: '↔ Bidirectional' };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5 text-emerald-600" />Field Mappings
            </CardTitle>
            <Button variant="outline" size="sm" onClick={addMapping}><Plus className="h-4 w-4 mr-1" />Add</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mappings.map((mapping, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                <Input placeholder="Marketing field" value={mapping.marketingField} onChange={(e) => updateMapping(idx, { marketingField: e.target.value })} className="h-9 text-sm flex-1" />
                <Select value={mapping.direction} onValueChange={(v) => updateMapping(idx, { direction: v as FieldMapping['direction'] })}>
                  <SelectTrigger className="w-40 h-9 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bidirectional">↔ Bidirectional</SelectItem>
                    <SelectItem value="marketing_to_crm">Marketing → CRM</SelectItem>
                    <SelectItem value="crm_to_marketing">CRM → Marketing</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="CRM field" value={mapping.crmField} onChange={(e) => updateMapping(idx, { crmField: e.target.value })} className="h-9 text-sm flex-1" />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => removeMapping(idx)}><Trash2 className="h-4 w-4" /></Button>
              </motion.div>
            ))}
          </div>
          <Button onClick={() => onSave?.(mappings as FieldMapping[])} className="w-full mt-4"><Save className="h-4 w-4 mr-2" />Save Mappings</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

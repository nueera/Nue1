'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SlidersHorizontal, Plus, Pencil, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface CustomField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  entity: string;
}

interface CustomFieldListProps {
  fields?: CustomField[];
  onCreateField?: () => void;
  onEditField?: (field: CustomField) => void;
  onDeleteField?: (fieldId: string) => void;
}

const MOCK_FIELDS: CustomField[] = [
  { id: '1', name: 'Industry', type: 'select', required: false, entity: 'Lead' },
  { id: '2', name: 'Annual Revenue', type: 'number', required: false, entity: 'Lead' },
  { id: '3', name: 'Preferred Language', type: 'select', required: true, entity: 'Contact' },
  { id: '4', name: 'Loyalty Tier', type: 'select', required: false, entity: 'Contact' },
  { id: '5', name: 'Renewal Date', type: 'date', required: true, entity: 'Campaign' },
];

export function CustomFieldList({ fields = MOCK_FIELDS, onCreateField, onEditField, onDeleteField }: CustomFieldListProps) {
  const [search, setSearch] = useState('');

  const filtered = fields.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold">Custom Fields</h3>
        </div>
        <Button variant="outline" size="sm" onClick={onCreateField}><Plus className="h-4 w-4 mr-1" />Add Field</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search fields..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
      </div>

      <div className="space-y-2">
        {filtered.map((field, idx) => (
          <motion.div key={field.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
            className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{field.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Badge variant="secondary" className="text-xs">{field.type}</Badge>
                <Badge variant="outline" className="text-xs">{field.entity}</Badge>
                {field.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEditField?.(field)}><Pencil className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onDeleteField?.(field.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

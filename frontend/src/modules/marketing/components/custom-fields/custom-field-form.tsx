// @ts-nocheck
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { SlidersHorizontal, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface CustomFieldFormProps {
  field?: { id: string; name: string; type: string; required: boolean; entity: string };
  onSave?: (data: { name: string; type: string; required: boolean; entity: string }) => void;
  onCancel?: () => void;
}

export function CustomFieldForm({ field, onSave, onCancel }: CustomFieldFormProps) {
  const isEditing = !!field;
  const [name, setName] = useState(field?.name ?? '');
  const [type, setType] = useState(field?.type ?? 'text');
  const [required, setRequired] = useState(field?.required ?? false);
  const [entity, setEntity] = useState(field?.entity ?? 'Lead');

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50 max-w-lg mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-emerald-600" />{isEditing ? 'Edit' : 'Create'} Custom Field
            </CardTitle>
            {onCancel && <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCancel}><X className="h-4 w-4" /></Button>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Field Name</Label>
            <Input placeholder="e.g., Industry" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Field Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="select">Select</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="url">URL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Applies To</Label>
            <Select value={entity} onValueChange={setEntity}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Lead">Lead</SelectItem>
                <SelectItem value="Contact">Contact</SelectItem>
                <SelectItem value="Campaign">Campaign</SelectItem>
                <SelectItem value="Plan">Plan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <Label className="text-sm">Required</Label>
            <Switch checked={required} onCheckedChange={setRequired} />
          </div>
          <Button onClick={() => onSave?.({ name, type, required, entity })} disabled={!name} className="w-full">
            <Save className="h-4 w-4 mr-2" />{isEditing ? 'Update' : 'Create'} Field
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

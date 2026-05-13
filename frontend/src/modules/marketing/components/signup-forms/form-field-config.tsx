'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import type { FormField } from '@/modules/marketing/types';
import { Trash2, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormFieldConfigProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onRemove: () => void;
}

export function FormFieldConfig({ field, onUpdate, onRemove }: FormFieldConfigProps) {
  const handleChange = (partial: Partial<FormField>) => {
    onUpdate({ ...field, ...partial });
  };

  const handleAddOption = () => {
    const opts = field.options ? [...field.options, `Option ${field.options.length + 1}`] : ['Option 1'];
    handleChange({ options: opts });
  };

  const handleRemoveOption = (index: number) => {
    if (!field.options) return;
    const opts = field.options.filter((_, i) => i !== index);
    handleChange({ options: opts });
  };

  const handleUpdateOption = (index: number, value: string) => {
    if (!field.options) return;
    const opts = [...field.options];
    opts[index] = value;
    handleChange({ options: opts });
  };

  const hasOptions = ['select', 'radio', 'checkbox'].includes(field.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          {field.type.charAt(0).toUpperCase() + field.type.slice(1)} Field
        </h3>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={onRemove}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <Separator />

      {/* Label */}
      <div className="space-y-1.5">
        <Label className="text-xs">Label</Label>
        <Input
          value={field.label}
          onChange={(e) => handleChange({ label: e.target.value })}
          className="h-8 text-sm"
        />
      </div>

      {/* Name */}
      <div className="space-y-1.5">
        <Label className="text-xs">Field Name</Label>
        <Input
          value={field.name}
          onChange={(e) => handleChange({ name: e.target.value })}
          className="h-8 text-sm"
        />
      </div>

      {/* Placeholder */}
      {!hasOptions && field.type !== 'checkbox' && field.type !== 'consent' && field.type !== 'hidden' && (
        <div className="space-y-1.5">
          <Label className="text-xs">Placeholder</Label>
          <Input
            value={field.placeholder ?? ''}
            onChange={(e) => handleChange({ placeholder: e.target.value })}
            className="h-8 text-sm"
          />
        </div>
      )}

      {/* Default Value */}
      <div className="space-y-1.5">
        <Label className="text-xs">Default Value</Label>
        <Input
          value={field.defaultValue ?? ''}
          onChange={(e) => handleChange({ defaultValue: e.target.value })}
          className="h-8 text-sm"
        />
      </div>

      {/* Help Text */}
      <div className="space-y-1.5">
        <Label className="text-xs">Help Text</Label>
        <Textarea
          value={field.helpText ?? ''}
          onChange={(e) => handleChange({ helpText: e.target.value })}
          className="text-sm min-h-[60px]"
          rows={2}
        />
      </div>

      {/* Required */}
      <div className="flex items-center justify-between">
        <Label className="text-xs">Required</Label>
        <Switch
          checked={field.required}
          onCheckedChange={(checked) => handleChange({ required: checked })}
        />
      </div>

      <Separator />

      {/* Options (for select, radio, checkbox) */}
      {hasOptions && (
        <div className="space-y-2">
          <Label className="text-xs">Options</Label>
          <div className="space-y-1.5">
            {(field.options ?? []).map((opt, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <Input
                  value={opt}
                  onChange={(e) => handleUpdateOption(idx, e.target.value)}
                  className="h-7 text-xs"
                />
                <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => handleRemoveOption(idx)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full h-7 text-xs" onClick={handleAddOption}>
            <Plus className="h-3 w-3 mr-1" />
            Add Option
          </Button>
        </div>
      )}
    </motion.div>
  );
}

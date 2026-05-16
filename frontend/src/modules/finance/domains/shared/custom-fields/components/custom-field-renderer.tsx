'use client';

import type { CustomField, CustomFieldValue } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface CustomFieldRendererProps {
  fields: CustomField[];
  values: Record<string, unknown>;
  onChange: (fieldId: string, value: unknown) => void;
  readOnly?: boolean;
}

export function CustomFieldRenderer({ fields, values, onChange, readOnly }: CustomFieldRendererProps) {
  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const val = values[field.id];

        if (readOnly) {
          return (
            <div key={field.id} className="flex flex-col gap-1">
              <Label className="text-xs text-muted-foreground">{field.label}</Label>
              <p className="text-sm">{val != null ? String(val) : '—'}</p>
            </div>
          );
        }

        switch (field.type) {
          case 'text':
          case 'email':
          case 'phone':
          case 'url':
            return (
              <div key={field.id} className="flex flex-col gap-1.5">
                <Label className="text-sm">{field.label}{field.isRequired && ' *'}</Label>
                <Input
                  type={field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : field.type === 'phone' ? 'tel' : 'text'}
                  value={(val as string) ?? ''}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                />
              </div>
            );
          case 'number':
            return (
              <div key={field.id} className="flex flex-col gap-1.5">
                <Label className="text-sm">{field.label}{field.isRequired && ' *'}</Label>
                <Input
                  type="number"
                  value={(val as number) ?? ''}
                  onChange={(e) => onChange(field.id, Number(e.target.value))}
                />
              </div>
            );
          case 'date':
            return (
              <div key={field.id} className="flex flex-col gap-1.5">
                <Label className="text-sm">{field.label}{field.isRequired && ' *'}</Label>
                <Input
                  type="date"
                  value={(val as string) ?? ''}
                  onChange={(e) => onChange(field.id, e.target.value)}
                />
              </div>
            );
          case 'textarea':
            return (
              <div key={field.id} className="flex flex-col gap-1.5">
                <Label className="text-sm">{field.label}{field.isRequired && ' *'}</Label>
                <Textarea
                  value={(val as string) ?? ''}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                />
              </div>
            );
          case 'dropdown':
            return (
              <div key={field.id} className="flex flex-col gap-1.5">
                <Label className="text-sm">{field.label}{field.isRequired && ' *'}</Label>
                <Select value={(val as string) ?? ''} onValueChange={(v) => onChange(field.id, v)}>
                  <SelectTrigger><SelectValue placeholder={field.placeholder || 'Select...'} /></SelectTrigger>
                  <SelectContent>
                    {/* @ts-expect-error — map callback type mismatch */}
                    {field.options?.map((opt: { value: string; label: string }) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          case 'checkbox':
            return (
              <div key={field.id} className="flex items-center gap-2">
                <Checkbox
                  checked={(val as boolean) ?? false}
                  onCheckedChange={(checked) => onChange(field.id, !!checked)}
                />
                <Label className="text-sm">{field.label}</Label>
              </div>
            );
          default:
            return (
              <div key={field.id} className="flex flex-col gap-1.5">
                <Label className="text-sm">{field.label}</Label>
                <Input value={val != null ? String(val) : ''} onChange={(e) => onChange(field.id, e.target.value)} />
              </div>
            );
        }
      })}
    </div>
  );
}

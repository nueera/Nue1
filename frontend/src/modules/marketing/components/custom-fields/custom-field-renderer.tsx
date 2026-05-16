'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

interface CustomFieldRendererProps {
  field: { name: string; type: string; required: boolean; options?: string[] };
  value?: string | number | boolean;
  onChange?: (value: string | number | boolean) => void;
}

export function CustomFieldRenderer({ field, value, onChange }: CustomFieldRendererProps) {
  const handleChange = (v: string | number | boolean) => onChange?.(v);

  switch (field.type) {
    case 'text':
    case 'url':
      return (
        <div className="space-y-1">
          <Label className="text-sm">{field.name}{field.required && ' *'}</Label>
          <Input
            type={field.type === 'url' ? 'url' : 'text'}
            value={(value as string) ?? ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.type === 'url' ? 'https://' : `Enter ${field.name.toLowerCase()}`}
          />
        </div>
      );

    case 'number':
      return (
        <div className="space-y-1">
          <Label className="text-sm">{field.name}{field.required && ' *'}</Label>
          <Input
            type="number"
            value={(value as number) ?? ''}
            onChange={(e) => handleChange(Number(e.target.value))}
            placeholder={`Enter ${field.name.toLowerCase()}`}
          />
        </div>
      );

    case 'date':
      return (
        <div className="space-y-1">
          <Label className="text-sm">{field.name}{field.required && ' *'}</Label>
          <Input
            type="date"
            value={(value as string) ?? ''}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      );

    case 'select':
      return (
        <div className="space-y-1">
          <Label className="text-sm">{field.name}{field.required && ' *'}</Label>
          <Select value={(value as string) ?? ''} onValueChange={(v) => handleChange(v)}>
            <SelectTrigger><SelectValue placeholder={`Select ${field.name.toLowerCase()}`} /></SelectTrigger>
            <SelectContent>
              {(field.options ?? []).map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center justify-between">
          <Label className="text-sm">{field.name}</Label>
          <Switch
            checked={(value as boolean) ?? false}
            onCheckedChange={(v) => handleChange(v)}
          />
        </div>
      );

    default:
      return (
        <div className="space-y-1">
          <Label className="text-sm">{field.name}</Label>
          <Input value={(value as string) ?? ''} onChange={(e) => handleChange(e.target.value)} />
        </div>
      );
  }
}

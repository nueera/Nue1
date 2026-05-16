'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageSectionData {
  id: string;
  type: string;
  content: Record<string, unknown>;
}

interface SectionEditorProps {
  section: PageSectionData;
  onUpdate: (content: Record<string, unknown>) => void;
  onRemove: () => void;
}

export function SectionEditor({ section, onUpdate, onRemove }: SectionEditorProps) {
  const handleChange = (key: string, value: unknown) => {
    onUpdate({ ...section.content, [key]: value });
  };

  const handleListItemChange = (listKey: string, index: number, field: string, value: string) => {
    const list = [...(section.content[listKey] as Array<Record<string, string>>)];
    list[index] = { ...list[index], [field]: value };
    handleChange(listKey, list);
  };

  const handleAddListItem = (listKey: string, template: Record<string, string>) => {
    const list = [...(section.content[listKey] as Array<Record<string, string>> ?? []), template];
    handleChange(listKey, list);
  };

  const handleRemoveListItem = (listKey: string, index: number) => {
    const list = (section.content[listKey] as Array<Record<string, string>>).filter((_, i) => i !== index);
    handleChange(listKey, list);
  };

  const renderFields = () => {
    switch (section.type) {
      case 'hero':
        return (
          <>
            <FieldInput label="Headline" value={(section.content.headline as string) ?? ''} onChange={(v) => handleChange('headline', v)} />
            <FieldInput label="Subheadline" value={(section.content.subheadline as string) ?? ''} onChange={(v) => handleChange('subheadline', v)} />
            <FieldInput label="CTA Text" value={(section.content.ctaText as string) ?? ''} onChange={(v) => handleChange('ctaText', v)} />
            <FieldInput label="CTA URL" value={(section.content.ctaUrl as string) ?? ''} onChange={(v) => handleChange('ctaUrl', v)} />
          </>
        );
      case 'features':
      case 'testimonials':
      case 'stats':
      case 'faq': {
        const listKey = 'items';
        const items = section.content[listKey] as Array<Record<string, string>> ?? [];
        const templates: Record<string, Record<string, string>> = {
          features: { title: 'New Feature', description: 'Description' },
          testimonials: { name: 'Name', quote: 'Quote' },
          stats: { label: 'Label', value: '0' },
          faq: { question: 'Question', answer: 'Answer' },
        };
        return (
          <>
            <FieldInput label="Title" value={(section.content.title as string) ?? ''} onChange={(v) => handleChange('title', v)} />
            <Separator />
            <Label className="text-xs">Items</Label>
            {items.map((item, i) => (
              <div key={i} className="space-y-1.5 p-2 rounded-md border border-border/50">
                {Object.entries(item).map(([key, val]) => (
                  <FieldInput key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} value={val} onChange={(v) => handleListItemChange(listKey, i, key, v)} />
                ))}
                <Button variant="ghost" size="sm" className="h-6 text-xs text-destructive" onClick={() => handleRemoveListItem(listKey, i)}>Remove</Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full h-7 text-xs" onClick={() => handleAddListItem(listKey, templates[section.type] ?? { title: 'New' })}>
              Add Item
            </Button>
          </>
        );
      }
      case 'cta':
        return (
          <>
            <FieldInput label="Headline" value={(section.content.headline as string) ?? ''} onChange={(v) => handleChange('headline', v)} />
            <FieldInput label="Button Text" value={(section.content.buttonText as string) ?? ''} onChange={(v) => handleChange('buttonText', v)} />
            <FieldInput label="Button URL" value={(section.content.buttonUrl as string) ?? ''} onChange={(v) => handleChange('buttonUrl', v)} />
          </>
        );
      case 'pricing': {
        const plans = section.content.plans as Array<Record<string, string>> ?? [];
        return (
          <>
            <FieldInput label="Title" value={(section.content.title as string) ?? ''} onChange={(v) => handleChange('title', v)} />
            <Separator />
            <Label className="text-xs">Plans</Label>
            {plans.map((plan, i) => (
              <div key={i} className="space-y-1.5 p-2 rounded-md border border-border/50">
                <FieldInput label="Plan Name" value={plan.name ?? ''} onChange={(v) => handleListItemChange('plans', i, 'name', v)} />
                <FieldInput label="Price" value={plan.price ?? ''} onChange={(v) => handleListItemChange('plans', i, 'price', v)} />
                <Button variant="ghost" size="sm" className="h-6 text-xs text-destructive" onClick={() => handleRemoveListItem('plans', i)}>Remove</Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full h-7 text-xs" onClick={() => handleAddListItem('plans', { name: 'New Plan', price: '$0/mo' })}>
              Add Plan
            </Button>
          </>
        );
      }
      case 'form':
        return (
          <>
            <FieldInput label="Title" value={(section.content.title as string) ?? ''} onChange={(v) => handleChange('title', v)} />
            <FieldInput label="Submit Text" value={(section.content.submitText as string) ?? ''} onChange={(v) => handleChange('submitText', v)} />
          </>
        );
      case 'video':
        return (
          <>
            <FieldInput label="Title" value={(section.content.title as string) ?? ''} onChange={(v) => handleChange('title', v)} />
            <FieldInput label="Video URL" value={(section.content.videoUrl as string) ?? ''} onChange={(v) => handleChange('videoUrl', v)} />
          </>
        );
      case 'gallery':
        return (
          <FieldInput label="Title" value={(section.content.title as string) ?? ''} onChange={(v) => handleChange('title', v)} />
        );
      case 'custom':
        return (
          <div className="space-y-1.5">
            <Label className="text-xs">Custom HTML</Label>
            <Textarea
              value={(section.content.html as string) ?? ''}
              onChange={(e) => handleChange('html', e.target.value)}
              className="text-xs font-mono min-h-[120px]"
              rows={6}
            />
          </div>
        );
      default:
        return <p className="text-xs text-muted-foreground">No configuration available</p>;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          {section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section
        </h3>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={onRemove}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
      <Separator />
      <div className="space-y-3">{renderFields()}</div>
    </motion.div>
  );
}

// Helper field component
function FieldInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="h-8 text-sm" />
    </div>
  );
}

// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { FormFieldType } from '@/modules/marketing/types';
import {
  Type,
  Mail,
  Phone,
  Hash,
  List,
  CircleDot,
  CheckSquare,
  AlignLeft,
  Calendar,
  Link,
  EyeOff,
  ShieldCheck,
  GripVertical,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface FormFieldPaletteProps {
  onAddField?: (type: FormFieldType) => void;
}

const fieldTypes: Array<{
  type: FormFieldType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}> = [
  { type: 'text', label: 'Text', icon: Type, description: 'Single line text' },
  { type: 'email', label: 'Email', icon: Mail, description: 'Email address' },
  { type: 'phone', label: 'Phone', icon: Phone, description: 'Phone number' },
  { type: 'number', label: 'Number', icon: Hash, description: 'Numeric input' },
  { type: 'select', label: 'Dropdown', icon: List, description: 'Select from list' },
  { type: 'radio', label: 'Radio', icon: CircleDot, description: 'Single choice' },
  { type: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'Multiple choice' },
  { type: 'textarea', label: 'Textarea', icon: AlignLeft, description: 'Multi-line text' },
  { type: 'date', label: 'Date', icon: Calendar, description: 'Date picker' },
  { type: 'url', label: 'URL', icon: Link, description: 'Web address' },
  { type: 'hidden', label: 'Hidden', icon: EyeOff, description: 'Hidden field' },
  { type: 'consent', label: 'Consent', icon: ShieldCheck, description: 'GDPR consent' },
];

export function FormFieldPalette({ onAddField }: FormFieldPaletteProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Field Types</h3>
      <div className="space-y-1.5">
        {fieldTypes.map((ft, index) => (
          <motion.div
            key={ft.type}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, delay: index * 0.02 }}
          >
            <Card
              className="cursor-grab hover:shadow-sm transition-all border-border/50 active:cursor-grabbing"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('fieldType', ft.type);
              }}
              onClick={() => onAddField?.(ft.type)}
            >
              <CardContent className="p-2.5 flex items-center gap-2.5">
                <div className="flex items-center gap-0.5 text-muted-foreground/40">
                  <GripVertical className="h-3.5 w-3.5" />
                </div>
                <div className={cn('flex items-center justify-center w-7 h-7 rounded-md bg-muted')}>
                  <ft.icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground leading-tight">{ft.label}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{ft.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

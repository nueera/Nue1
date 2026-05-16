'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Braces } from 'lucide-react';
import { MergeFieldPicker, type MergeField } from '../shared/merge-field-picker';

interface TemplateVariablesProps {
  onSelect?: (field: MergeField) => void;
  className?: string;
}

const VARIABLE_CATEGORIES = [
  {
    name: 'Contact',
    variables: [
      { key: 'first_name', label: 'First Name', example: 'John' },
      { key: 'last_name', label: 'Last Name', example: 'Doe' },
      { key: 'email', label: 'Email', example: 'john@example.com' },
      { key: 'phone', label: 'Phone', example: '+1-555-0100' },
      { key: 'company', label: 'Company', example: 'Acme Corp' },
      { key: 'job_title', label: 'Job Title', example: 'CEO' },
    ],
  },
  {
    name: 'Campaign',
    variables: [
      { key: 'unsubscribe_url', label: 'Unsubscribe URL', example: 'https://...' },
      { key: 'preferences_url', label: 'Preferences URL', example: 'https://...' },
      { key: 'campaign_name', label: 'Campaign Name', example: 'Welcome Series' },
      { key: 'sender_name', label: 'Sender Name', example: 'Acme Team' },
    ],
  },
  {
    name: 'Custom',
    variables: [
      { key: 'custom_field_1', label: 'Custom Field 1', example: 'Value' },
      { key: 'custom_field_2', label: 'Custom Field 2', example: 'Value' },
    ],
  },
];

export function TemplateVariables({ onSelect, className }: TemplateVariablesProps) {
  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Braces className="h-4 w-4 text-muted-foreground" />
          Variables & Merge Fields
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {VARIABLE_CATEGORIES.map((category) => (
          <div key={category.name}>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              {category.name}
            </p>
            <div className="space-y-1">
              {category.variables.map((variable) => (
                <button
                  key={variable.key}
                  className="w-full flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-colors text-left"
                  onClick={() => onSelect?.({ key: variable.key, label: variable.label, category: category.name, example: variable.example })}
                >
                  <div>
                    <p className="text-xs font-mono text-foreground">{`{{${variable.key}}}`}</p>
                    <p className="text-[10px] text-muted-foreground">{variable.label} · e.g. {variable.example}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-2 border-t">
          <MergeFieldPicker onSelect={(field) => onSelect?.(field)} className="w-full h-8 text-xs" />
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FormField, FormTheme } from '@/modules/marketing/types';
import { CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormPreviewProps {
  fields: FormField[];
  theme: FormTheme;
  submitButtonText: string;
  successMessage: string;
}

const themeStyles: Record<FormTheme, string> = {
  minimal: 'bg-white dark:bg-gray-950 border border-border rounded-lg p-6',
  card: 'bg-white dark:bg-gray-950 shadow-lg rounded-2xl p-8',
  full: 'bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-gray-950 min-h-[400px] rounded-2xl p-8',
  popup: 'bg-white dark:bg-gray-950 shadow-2xl rounded-xl p-6 max-w-sm mx-auto',
  slide_in: 'bg-white dark:bg-gray-950 shadow-xl rounded-l-xl p-6 ml-auto max-w-sm',
  floating_bar: 'bg-gray-900 dark:bg-gray-800 text-white rounded-full px-6 py-3',
};

export function FormPreview({ fields, theme, submitButtonText, successMessage }: FormPreviewProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (theme === 'floating_bar') {
    return (
      <div className="p-8 bg-gray-100 dark:bg-gray-900 rounded-lg">
        <div className={themeStyles[theme]}>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium flex-1">Subscribe to our newsletter</span>
            <div className="flex items-center gap-2">
              <Input placeholder="Email" className="h-8 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm w-48" />
              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white h-8">
                {submitButtonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('p-4 flex items-center justify-center min-h-[500px]', theme === 'full' ? '' : 'bg-muted/20 rounded-lg')}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <CheckCircle2 className="h-12 w-12 mx-auto text-emerald-500 mb-3" />
            <p className="text-lg font-semibold text-foreground">{successMessage}</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn('w-full max-w-md', themeStyles[theme])}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <Label className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-0.5">*</span>}
                  </Label>
                  {field.type === 'textarea' ? (
                    <Textarea placeholder={field.placeholder} className="text-sm" rows={3} />
                  ) : field.type === 'select' ? (
                    <Select>
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder={field.placeholder ?? 'Select...'} />
                      </SelectTrigger>
                      <SelectContent>
                        {(field.options ?? []).map((opt, i) => (
                          <SelectItem key={i} value={opt.toLowerCase()}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === 'checkbox' ? (
                    <div className="space-y-2">
                      {(field.options ?? []).map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Checkbox id={`${field.id}-${i}`} />
                          <Label htmlFor={`${field.id}-${i}`} className="text-sm font-normal">{opt}</Label>
                        </div>
                      ))}
                    </div>
                  ) : field.type === 'consent' ? (
                    <div className="flex items-start gap-2">
                      <Checkbox id={field.id} className="mt-0.5" />
                      <Label htmlFor={field.id} className="text-xs font-normal text-muted-foreground">
                        {field.placeholder ?? 'I agree to the privacy policy and terms of service'}
                      </Label>
                    </div>
                  ) : (
                    <Input
                      type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : field.type === 'url' ? 'url' : 'text'}
                      placeholder={field.placeholder}
                      className="h-9 text-sm"
                    />
                  )}
                  {field.helpText && (
                    <p className="text-[10px] text-muted-foreground">{field.helpText}</p>
                  )}
                </div>
              ))}
              {fields.length > 0 && (
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  {submitButtonText}
                </Button>
              )}
              {fields.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-8">Add fields to preview your form</p>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

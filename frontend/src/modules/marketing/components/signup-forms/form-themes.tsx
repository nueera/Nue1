// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import type { FormTheme } from '@/modules/marketing/types';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormThemesProps {
  selectedTheme: FormTheme;
  onSelectTheme: (theme: FormTheme) => void;
}

const themes: Array<{
  id: FormTheme;
  name: string;
  description: string;
  preview: string;
}> = [
  { id: 'minimal', name: 'Minimal', description: 'Clean and simple', preview: 'border border-border rounded-lg bg-white' },
  { id: 'card', name: 'Card', description: 'Elevated card style', preview: 'shadow-lg rounded-2xl bg-white' },
  { id: 'full', name: 'Full Page', description: 'Full-width background', preview: 'bg-gradient-to-br from-emerald-50 to-white rounded-2xl' },
  { id: 'popup', name: 'Popup', description: 'Centered overlay', preview: 'shadow-2xl rounded-xl bg-white' },
  { id: 'slide_in', name: 'Slide-in', description: 'Slides from right', preview: 'shadow-xl rounded-l-xl bg-white ml-auto' },
  { id: 'floating_bar', name: 'Floating Bar', description: 'Bottom bar style', preview: 'bg-gray-900 text-white rounded-full' },
];

export function FormThemes({ selectedTheme, onSelectTheme }: FormThemesProps) {
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Choose a Theme</h3>
        <p className="text-sm text-muted-foreground mt-1">Select the appearance style for your signup form</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((t, index) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Card
              className={cn(
                'cursor-pointer transition-all duration-200 hover:shadow-md',
                selectedTheme === t.id ? 'ring-2 ring-emerald-500 border-emerald-500' : 'border-border/50'
              )}
              onClick={() => onSelectTheme(t.id)}
            >
              <CardContent className="p-4">
                {/* Preview */}
                <div className={cn('h-24 flex items-center justify-center mb-3 overflow-hidden', t.preview)}>
                  <div className="space-y-1.5 w-3/4">
                    <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full w-2/3" />
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-5 bg-emerald-400 dark:bg-emerald-600 rounded w-1/2" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.description}</p>
                  </div>
                  {selectedTheme === t.id && (
                    <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

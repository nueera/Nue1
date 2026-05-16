'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface PopupThemesProps {
  selectedTheme: string;
  onSelectTheme: (theme: string) => void;
}

const themes: Array<{
  id: string;
  name: string;
  description: string;
  bgClass: string;
  accentColor: string;
}> = [
  { id: 'modern', name: 'Modern', description: 'Clean white with emerald accent', bgClass: 'bg-white border border-gray-200', accentColor: 'bg-emerald-500' },
  { id: 'dark', name: 'Dark', description: 'Dark background with light text', bgClass: 'bg-gray-900 text-white', accentColor: 'bg-emerald-400' },
  { id: 'gradient', name: 'Gradient', description: 'Colorful gradient background', bgClass: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white', accentColor: 'bg-white' },
  { id: 'minimal', name: 'Minimal', description: 'Subtle and lightweight', bgClass: 'bg-white border border-gray-100 shadow-sm', accentColor: 'bg-gray-900' },
  { id: 'bold', name: 'Bold', description: 'High contrast, attention-grabbing', bgClass: 'bg-amber-500 text-white', accentColor: 'bg-white' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated with serif feel', bgClass: 'bg-gray-50 border border-gray-200', accentColor: 'bg-violet-600' },
];

export function PopupThemes({ selectedTheme, onSelectTheme }: PopupThemesProps) {
  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <h3 className="text-lg font-semibold text-foreground">Popup Theme</h3>
        <p className="text-sm text-muted-foreground mt-1">Choose the appearance style for your popup</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className={cn('h-28 rounded-lg p-3 mb-3 flex flex-col items-center justify-center gap-1.5', t.bgClass)}>
                  <div className="h-2 w-2/3 bg-current opacity-20 rounded-full" />
                  <div className="h-1.5 w-1/2 bg-current opacity-10 rounded-full" />
                  <div className={cn('h-5 w-20 rounded-md mt-1', t.accentColor)} />
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

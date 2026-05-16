'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PopupPreviewProps {
  type: 'popup' | 'slide_in' | 'floating_bar' | 'full_screen' | 'sticky_bar';
  headline: string;
  bodyText: string;
  ctaText: string;
  dismissText: string;
  theme: string;
}

const themeStyles: Record<string, { bg: string; text: string; accent: string; btnBg: string; btnText: string }> = {
  modern: { bg: 'bg-white', text: 'text-gray-900', accent: '', btnBg: 'bg-emerald-500', btnText: 'text-white' },
  dark: { bg: 'bg-gray-900', text: 'text-white', accent: '', btnBg: 'bg-emerald-400', btnText: 'text-gray-900' },
  gradient: { bg: 'bg-gradient-to-br from-emerald-500 to-teal-600', text: 'text-white', accent: '', btnBg: 'bg-white', btnText: 'text-emerald-600' },
  minimal: { bg: 'bg-white border', text: 'text-gray-900', accent: '', btnBg: 'bg-gray-900', btnText: 'text-white' },
  bold: { bg: 'bg-amber-500', text: 'text-white', accent: '', btnBg: 'bg-white', btnText: 'text-amber-600' },
  elegant: { bg: 'bg-gray-50 border', text: 'text-gray-900', accent: '', btnBg: 'bg-violet-600', btnText: 'text-white' },
};

export function PopupPreview({ type, headline, bodyText, ctaText, dismissText, theme }: PopupPreviewProps) {
  const [visible, setVisible] = useState(true);
  const t = themeStyles[theme] ?? themeStyles.modern;

  const renderPopup = () => {
    switch (type) {
      case 'popup':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn('relative w-80 rounded-xl shadow-2xl p-6', t.bg, t.text)}
          >
            <button onClick={() => setVisible(false)} className="absolute top-2 right-2 opacity-40 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-lg font-bold">{headline}</h3>
            <p className="text-sm mt-2 opacity-80">{bodyText}</p>
            <Button className={cn('w-full mt-4', t.btnBg, t.btnText)}>{ctaText}</Button>
            <button className="text-xs opacity-50 hover:opacity-80 mt-2 w-full text-center">{dismissText}</button>
          </motion.div>
        );
      case 'slide_in':
        return (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={cn('relative w-80 rounded-l-xl shadow-2xl p-6 ml-auto', t.bg, t.text)}
          >
            <button onClick={() => setVisible(false)} className="absolute top-2 right-2 opacity-40 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-lg font-bold">{headline}</h3>
            <p className="text-sm mt-2 opacity-80">{bodyText}</p>
            <Button className={cn('w-full mt-4', t.btnBg, t.btnText)}>{ctaText}</Button>
            <button className="text-xs opacity-50 hover:opacity-80 mt-2">{dismissText}</button>
          </motion.div>
        );
      case 'floating_bar':
        return (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn('w-full px-6 py-3 flex items-center justify-between rounded-lg shadow-lg', t.bg, t.text)}
          >
            <div className="flex items-center gap-3 flex-1">
              <p className="text-sm font-medium">{headline}</p>
              <Button size="sm" className={cn(t.btnBg, t.btnText)}>{ctaText}</Button>
            </div>
            <button onClick={() => setVisible(false)} className="opacity-40 hover:opacity-100 ml-3">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        );
      case 'full_screen':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn('w-full h-full flex flex-col items-center justify-center p-8', t.bg, t.text)}
          >
            <button onClick={() => setVisible(false)} className="absolute top-4 right-4 opacity-40 hover:opacity-100">
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-3xl font-bold text-center">{headline}</h3>
            <p className="text-lg mt-3 opacity-80 text-center max-w-md">{bodyText}</p>
            <Button className={cn('mt-6 text-lg px-8 py-3', t.btnBg, t.btnText)}>{ctaText}</Button>
            <button className="text-sm opacity-50 hover:opacity-80 mt-4">{dismissText}</button>
          </motion.div>
        );
      case 'sticky_bar':
        return (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn('w-full px-6 py-2.5 flex items-center justify-between', t.bg, t.text)}
          >
            <p className="text-sm font-medium">{headline}</p>
            <div className="flex items-center gap-2">
              <Button size="sm" className={cn(t.btnBg, t.btnText)}>{ctaText}</Button>
              <button onClick={() => setVisible(false)} className="opacity-40 hover:opacity-100">
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full min-h-[400px] bg-muted/30 rounded-lg flex items-center justify-center overflow-hidden">
      {/* Simulated page background */}
      <div className="absolute inset-0 p-8 space-y-3">
        <div className="h-6 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-32 bg-muted rounded mt-4" />
      </div>

      {/* Popup overlay */}
      <AnimatePresence>
        {visible && (
          <div className={cn(
            'relative z-10',
            type === 'full_screen' ? 'absolute inset-0' : '',
            type === 'floating_bar' || type === 'sticky_bar' ? 'absolute left-0 right-0 px-4' : '',
            type === 'floating_bar' ? 'top-4' : '',
            type === 'sticky_bar' ? 'bottom-0' : '',
          )}>
            {renderPopup()}
          </div>
        )}
      </AnimatePresence>

      {!visible && (
        <Button variant="outline" size="sm" className="absolute bottom-4 z-10" onClick={() => setVisible(true)}>
          Show Popup Again
        </Button>
      )}
    </div>
  );
}

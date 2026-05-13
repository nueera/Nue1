'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import type { PageSection } from '@/modules/marketing/types';
import {
  Sparkles,
  LayoutList,
  MessageSquareQuote,
  CreditCard,
  MousePointerClick,
  HelpCircle,
  FileText,
  Video,
  ImageIcon,
  BarChart3,
  Code2,
  GripVertical,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SectionPaletteProps {
  onAddSection?: (type: PageSection) => void;
}

const sectionTypes: Array<{
  type: PageSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}> = [
  { type: 'hero', label: 'Hero', icon: Sparkles, description: 'Main banner area' },
  { type: 'features', label: 'Features', icon: LayoutList, description: 'Feature grid' },
  { type: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, description: 'Customer quotes' },
  { type: 'pricing', label: 'Pricing', icon: CreditCard, description: 'Pricing plans' },
  { type: 'cta', label: 'Call to Action', icon: MousePointerClick, description: 'CTA banner' },
  { type: 'faq', label: 'FAQ', icon: HelpCircle, description: 'Q&A accordion' },
  { type: 'form', label: 'Signup Form', icon: FileText, description: 'Lead capture form' },
  { type: 'video', label: 'Video', icon: Video, description: 'Video embed' },
  { type: 'gallery', label: 'Gallery', icon: ImageIcon, description: 'Image gallery' },
  { type: 'stats', label: 'Statistics', icon: BarChart3, description: 'Number stats' },
  { type: 'custom', label: 'Custom HTML', icon: Code2, description: 'Raw HTML block' },
];

export function SectionPalette({ onAddSection }: SectionPaletteProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sections</h3>
      <div className="space-y-1.5">
        {sectionTypes.map((st, index) => (
          <motion.div
            key={st.type}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, delay: index * 0.02 }}
          >
            <Card
              className="cursor-grab hover:shadow-sm transition-all border-border/50 active:cursor-grabbing"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('sectionType', st.type);
              }}
              onClick={() => onAddSection?.(st.type)}
            >
              <CardContent className="p-2.5 flex items-center gap-2.5">
                <div className="flex items-center gap-0.5 text-muted-foreground/40">
                  <GripVertical className="h-3.5 w-3.5" />
                </div>
                <div className={cn('flex items-center justify-center w-7 h-7 rounded-md bg-muted')}>
                  <st.icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground leading-tight">{st.label}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{st.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

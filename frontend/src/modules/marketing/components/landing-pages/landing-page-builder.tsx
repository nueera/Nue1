// @ts-nocheck
'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { SectionPalette } from './section-palette';
import { SectionEditor } from './section-editor';
import { LandingPagePreview } from './landing-page-preview';
import { LandingPageSeo } from './landing-page-seo';
import { LandingPageVariants } from './landing-page-variants';
import { LandingPagePublish } from './landing-page-publish';
import type { LandingPage, PageSection } from '@/modules/marketing/types';
import {
  ArrowLeft,
  Save,
  Eye,
  Settings,
  LayoutTemplate,
  BarChart3,
  Share2,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageSectionData {
  id: string;
  type: PageSection;
  content: Record<string, unknown>;
}

interface LandingPageBuilderProps {
  page?: LandingPage;
  onSave?: (data: Partial<LandingPage>) => void;
  onBack?: () => void;
}

const sectionDefaults: Record<PageSection, Record<string, unknown>> = {
  hero: { headline: 'Build Something Amazing', subheadline: 'The all-in-one platform for growth', ctaText: 'Get Started', ctaUrl: '#', backgroundImage: '' },
  features: { title: 'Features', items: [{ title: 'Fast', description: 'Lightning fast performance' }, { title: 'Secure', description: 'Enterprise-grade security' }, { title: 'Scalable', description: 'Grows with your business' }] },
  testimonials: { title: 'What Our Customers Say', items: [{ name: 'Jane', quote: 'Amazing product!' }, { name: 'Bob', quote: 'Changed our workflow' }] },
  pricing: { title: 'Pricing Plans', plans: [{ name: 'Starter', price: '$9/mo' }, { name: 'Pro', price: '$29/mo' }] },
  cta: { headline: 'Ready to Get Started?', buttonText: 'Start Free Trial', buttonUrl: '#' },
  faq: { title: 'Frequently Asked Questions', items: [{ question: 'How does it work?', answer: 'Sign up and start building.' }] },
  form: { title: 'Sign Up', fields: ['name', 'email'], submitText: 'Join Now' },
  video: { title: 'Watch Our Demo', videoUrl: '', thumbnail: '' },
  gallery: { title: 'Gallery', images: [] },
  stats: { title: 'By The Numbers', items: [{ label: 'Users', value: '10,000+' }, { label: 'Revenue', value: '$5M+' }] },
  custom: { html: '' },
};

export function LandingPageBuilder({ page, onSave, onBack }: LandingPageBuilderProps) {
  const [pageName, setPageName] = useState(page?.name ?? 'Untitled Page');
  const [sections, setSections] = useState<PageSectionData[]>(
    page?.sections?.map((s, i) => ({ id: `section-${i}`, type: s, content: sectionDefaults[s] ?? {} })) ?? []
  );
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('design');

  const selectedSection = sections.find((s) => s.id === selectedSectionId) ?? null;

  const handleAddSection = useCallback((type: PageSection) => {
    const newSection: PageSectionData = {
      id: `section-${Date.now()}`,
      type,
      content: sectionDefaults[type] ?? {},
    };
    setSections((prev) => [...prev, newSection]);
    setSelectedSectionId(newSection.id);
  }, []);

  const handleRemoveSection = useCallback((id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
    if (selectedSectionId === id) setSelectedSectionId(null);
  }, [selectedSectionId]);

  const handleUpdateSection = useCallback((id: string, content: Record<string, unknown>) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, content } : s)));
  }, []);

  const handleMoveSection = useCallback((id: string, direction: 'up' | 'down') => {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx === -1) return prev;
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
      return arr;
    });
  }, []);

  const handleSave = () => {
    onSave?.({
      name: pageName,
      sections: sections.map((s) => s.type),
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <input
            type="text"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            className="text-lg font-semibold bg-transparent outline-none text-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setActiveTab('preview')}>
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-4 pt-2">
            <TabsList className="h-9">
              <TabsTrigger value="design" className="text-xs"><LayoutTemplate className="h-3.5 w-3.5 mr-1" />Design</TabsTrigger>
              <TabsTrigger value="preview" className="text-xs"><Eye className="h-3.5 w-3.5 mr-1" />Preview</TabsTrigger>
              <TabsTrigger value="seo" className="text-xs"><Settings className="h-3.5 w-3.5 mr-1" />SEO</TabsTrigger>
              <TabsTrigger value="variants" className="text-xs"><BarChart3 className="h-3.5 w-3.5 mr-1" />A/B Test</TabsTrigger>
              <TabsTrigger value="publish" className="text-xs"><Share2 className="h-3.5 w-3.5 mr-1" />Publish</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="design" className="flex-1 flex overflow-hidden m-0">
            {/* Section Palette */}
            <div className="w-56 border-r bg-muted/20">
              <ScrollArea className="h-full">
                <div className="p-3">
                  <SectionPalette onAddSection={handleAddSection} />
                </div>
              </ScrollArea>
            </div>

            {/* Canvas */}
            <div className="flex-1 overflow-auto p-4">
              <div className="max-w-2xl mx-auto space-y-2">
                {sections.length === 0 && (
                  <div className="text-center py-16 text-muted-foreground">
                    <LayoutTemplate className="h-10 w-10 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">Add sections from the palette to start building</p>
                  </div>
                )}
                <AnimatePresence>
                  {sections.map((section) => (
                    <motion.div
                      key={section.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        'group relative rounded-lg border-2 p-4 cursor-pointer transition-all',
                        selectedSectionId === section.id
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10'
                          : 'border-border hover:border-emerald-300'
                      )}
                      onClick={() => setSelectedSectionId(section.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground/40" />
                          <span className="text-xs font-medium text-muted-foreground uppercase">{section.type}</span>
                          <span className="text-sm font-medium text-foreground">
                            {(section.content.title as string) || (section.content.headline as string) || section.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); handleMoveSection(section.id, 'up'); }}>↑</Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); handleMoveSection(section.id, 'down'); }}>↓</Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={(e) => { e.stopPropagation(); handleRemoveSection(section.id); }}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Section Editor */}
            <div className="w-72 border-l bg-muted/20">
              <ScrollArea className="h-full">
                <div className="p-3">
                  {selectedSection ? (
                    <SectionEditor
                      section={selectedSection}
                      onUpdate={(content) => handleUpdateSection(selectedSection.id, content)}
                      onRemove={() => handleRemoveSection(selectedSection.id)}
                    />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Settings className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p className="text-xs">Select a section to edit</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="flex-1 m-0">
            <LandingPagePreview sections={sections} />
          </TabsContent>

          <TabsContent value="seo" className="flex-1 m-0 p-4 overflow-auto">
            <LandingPageSeo pageId={page?.id ?? 'new'} />
          </TabsContent>

          <TabsContent value="variants" className="flex-1 m-0 p-4 overflow-auto">
            <LandingPageVariants variants={page?.variants ?? []} />
          </TabsContent>

          <TabsContent value="publish" className="flex-1 m-0 p-4 overflow-auto">
            <LandingPagePublish pageId={page?.id ?? 'new'} slug={page?.slug ?? ''} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

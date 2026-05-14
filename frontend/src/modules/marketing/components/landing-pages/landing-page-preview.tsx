// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { PageSection } from '@/modules/marketing/types';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageSectionData {
  id: string;
  type: PageSection;
  content: Record<string, unknown>;
}

interface LandingPagePreviewProps {
  sections: PageSectionData[];
}

const deviceWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export function LandingPagePreview({ sections }: LandingPagePreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="flex flex-col h-full">
      {/* Device Toggle */}
      <div className="flex items-center justify-center gap-2 py-3 border-b bg-muted/20">
        <Button
          variant={device === 'desktop' ? 'secondary' : 'ghost'}
          size="sm"
          className="h-8"
          onClick={() => setDevice('desktop')}
        >
          <Monitor className="h-4 w-4 mr-1" />
          Desktop
        </Button>
        <Button
          variant={device === 'tablet' ? 'secondary' : 'ghost'}
          size="sm"
          className="h-8"
          onClick={() => setDevice('tablet')}
        >
          <Tablet className="h-4 w-4 mr-1" />
          Tablet
        </Button>
        <Button
          variant={device === 'mobile' ? 'secondary' : 'ghost'}
          size="sm"
          className="h-8"
          onClick={() => setDevice('mobile')}
        >
          <Smartphone className="h-4 w-4 mr-1" />
          Mobile
        </Button>
      </div>

      {/* Preview Canvas */}
      <div className="flex-1 overflow-auto bg-muted/30 p-4 flex justify-center">
        <motion.div
          layout
          className={cn(
            'bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden transition-all duration-300',
            device === 'mobile' && 'max-w-[375px]',
            device === 'tablet' && 'max-w-[768px]',
          )}
          style={{ width: deviceWidths[device] }}
        >
          {sections.length === 0 ? (
            <div className="flex items-center justify-center py-24 text-gray-400">
              <p className="text-sm">Add sections to preview your page</p>
            </div>
          ) : (
            sections.map((section) => (
              <SectionPreview key={section.id} section={section} />
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}

function SectionPreview({ section }: { section: PageSectionData }) {
  const c = section.content;

  const renderSection = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white px-8 py-16 text-center">
            <h1 className="text-3xl font-bold mb-3">{(c.headline as string) || 'Hero Headline'}</h1>
            <p className="text-lg opacity-90 mb-6">{(c.subheadline as string) || 'Subheadline text'}</p>
            <button className="bg-white text-emerald-700 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-100">
              {(c.ctaText as string) || 'Get Started'}
            </button>
          </div>
        );
      case 'features': {
        const items = (c.items as Array<Record<string, string>>) ?? [];
        return (
          <div className="px-8 py-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">{(c.title as string) || 'Features'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-xl mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case 'testimonials': {
        const items = (c.items as Array<Record<string, string>>) ?? [];
        return (
          <div className="px-8 py-12 bg-gray-50 dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">{(c.title as string) || 'Testimonials'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{item.quote}"</p>
                  <p className="text-sm font-semibold mt-2 text-gray-900 dark:text-white">— {item.name}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case 'cta':
        return (
          <div className="px-8 py-12 bg-emerald-600 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">{(c.headline as string) || 'Ready to Get Started?'}</h2>
            <button className="bg-white text-emerald-700 px-6 py-2.5 rounded-lg font-semibold text-sm">
              {(c.buttonText as string) || 'Start Now'}
            </button>
          </div>
        );
      case 'stats': {
        const items = (c.items as Array<Record<string, string>>) ?? [];
        return (
          <div className="px-8 py-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">{(c.title as string) || 'By The Numbers'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold text-emerald-600">{item.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case 'faq': {
        const items = (c.items as Array<Record<string, string>>) ?? [];
        return (
          <div className="px-8 py-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">{(c.title as string) || 'FAQ'}</h2>
            <div className="max-w-2xl mx-auto space-y-3">
              {items.map((item, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{item.question}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case 'form':
        return (
          <div className="px-8 py-12 bg-gray-50 dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">{(c.title as string) || 'Sign Up'}</h2>
            <div className="max-w-sm mx-auto space-y-3">
              <input className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Name" />
              <input className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Email" />
              <button className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                {(c.submitText as string) || 'Submit'}
              </button>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="px-8 py-12 text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{(c.title as string) || 'Video'}</h2>
            <div className="max-w-2xl mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg aspect-video flex items-center justify-center">
              <p className="text-gray-400 text-sm">Video Placeholder</p>
            </div>
          </div>
        );
      case 'pricing': {
        const plans = (c.plans as Array<Record<string, string>>) ?? [];
        return (
          <div className="px-8 py-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">{(c.title as string) || 'Pricing'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan, i) => (
                <div key={i} className="border rounded-lg p-6 text-center">
                  <p className="font-semibold text-gray-900 dark:text-white">{plan.name}</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-2">{plan.price}</p>
                  <button className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm w-full">Choose Plan</button>
                </div>
              ))}
            </div>
          </div>
        );
      }
      default:
        return (
          <div className="px-8 py-12 text-center text-gray-400">
            <p className="text-sm">{section.type} section preview</p>
          </div>
        );
    }
  };

  return <div>{renderSection()}</div>;
}

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone } from 'lucide-react';

interface TemplatePreviewProps {
  htmlContent?: string;
  subject?: string;
  fromName?: string;
  className?: string;
}

export function TemplatePreview({ htmlContent, subject, fromName = 'Sender', className }: TemplatePreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <Card className={cn('border-border/50', className)}>
      <div className="flex items-center gap-2 p-3 border-b">
        <Button variant={device === 'desktop' ? 'secondary' : 'ghost'} size="sm" className="text-xs gap-1" onClick={() => setDevice('desktop')}>
          <Monitor className="h-3.5 w-3.5" />Desktop
        </Button>
        <Button variant={device === 'mobile' ? 'secondary' : 'ghost'} size="sm" className="text-xs gap-1" onClick={() => setDevice('mobile')}>
          <Smartphone className="h-3.5 w-3.5" />Mobile
        </Button>
      </div>
      <CardContent className="p-4">
        <div className={cn('mx-auto border rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-300', device === 'desktop' ? 'max-w-[600px]' : 'max-w-[375px]')}>
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-semibold">
                {fromName[0]}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-xs">{fromName}</p>
                <p className="text-[10px] text-gray-500">sender@example.com</p>
              </div>
            </div>
            <p className="font-medium text-gray-900 text-sm mt-2">{subject ?? 'Email Subject'}</p>
          </div>
          <div className="p-4 min-h-[300px]">
            {htmlContent ? (
              <div className="prose prose-sm max-w-none text-gray-900" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400 text-center">
                <div>
                  <Monitor className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No template content</p>
                  <p className="text-xs mt-1">Build your template to see a preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PopupTriggerConfig } from './popup-trigger-config';
import { PopupTargeting } from './popup-targeting';
import { PopupThemes } from './popup-themes';
import { PopupPreview } from './popup-preview';
import type { Popup, PopupTrigger, PopupTargeting as PopupTargetingType } from '@/modules/marketing/types';
import { ArrowLeft, Save, Eye, Settings, Crosshair, Users, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

interface PopupBuilderProps {
  popup?: Popup;
  onSave?: (data: Partial<Popup>) => void;
  onBack?: () => void;
}

export function PopupBuilder({ popup, onSave, onBack }: PopupBuilderProps) {
  const [name, setName] = useState(popup?.name ?? 'Untitled Popup');
  const [popupType, setPopupType] = useState<Popup['type']>(popup?.type ?? 'popup');
  const [headline, setHeadline] = useState('Get 20% Off Today!');
  const [bodyText, setBodyText] = useState('Subscribe to our newsletter and receive an exclusive discount.');
  const [ctaText, setCtaText] = useState('Get My Discount');
  const [dismissText, setDismissText] = useState('No thanks');
  const [trigger, setTrigger] = useState<PopupTrigger>(popup?.trigger ?? 'time_on_page');
  const [triggerConfig, setTriggerConfig] = useState<Record<string, unknown>>(popup?.triggerConfig ?? { seconds: 5 });
  const [targeting, setTargeting] = useState<PopupTargetingType[]>(popup?.targeting ?? ['all_visitors']);
  const [targetingConfig, setTargetingConfig] = useState<Record<string, unknown>>(popup?.targetingConfig ?? {});
  const [theme, setTheme] = useState<string>('modern');
  const [activeTab, setActiveTab] = useState<string>('content');

  const handleSave = () => {
    onSave?.({
      name,
      type: popupType,
      trigger,
      triggerConfig,
      targeting,
      targetingConfig,
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-lg font-semibold bg-transparent outline-none text-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setActiveTab('preview')}>
            <Eye className="h-4 w-4 mr-1" />Preview
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />Save
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-4 pt-2">
            <TabsList className="h-9">
              <TabsTrigger value="content" className="text-xs"><Settings className="h-3.5 w-3.5 mr-1" />Content</TabsTrigger>
              <TabsTrigger value="trigger" className="text-xs"><Crosshair className="h-3.5 w-3.5 mr-1" />Trigger</TabsTrigger>
              <TabsTrigger value="targeting" className="text-xs"><Users className="h-3.5 w-3.5 mr-1" />Targeting</TabsTrigger>
              <TabsTrigger value="theme" className="text-xs"><Palette className="h-3.5 w-3.5 mr-1" />Theme</TabsTrigger>
              <TabsTrigger value="preview" className="text-xs"><Eye className="h-3.5 w-3.5 mr-1" />Preview</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="content" className="flex-1 m-0 overflow-auto p-4">
            <div className="max-w-lg mx-auto space-y-4">
              <Card className="border-border/50">
                <CardContent className="p-4 space-y-3">
                  <h3 className="text-sm font-semibold">Popup Content</h3>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Type</Label>
                    <div className="flex flex-wrap gap-2">
                      {(['popup', 'slide_in', 'floating_bar', 'full_screen', 'sticky_bar'] as const).map((t) => (
                        <Button
                          key={t}
                          variant={popupType === t ? 'default' : 'outline'}
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => setPopupType(t)}
                        >
                          {t.replace('_', ' ')}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Headline</Label>
                    <Input value={headline} onChange={(e) => setHeadline(e.target.value)} className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Body Text</Label>
                    <Textarea value={bodyText} onChange={(e) => setBodyText(e.target.value)} className="text-sm" rows={3} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">CTA Button</Label>
                    <Input value={ctaText} onChange={(e) => setCtaText(e.target.value)} className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Dismiss Text</Label>
                    <Input value={dismissText} onChange={(e) => setDismissText(e.target.value)} className="h-8 text-sm" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trigger" className="flex-1 m-0 overflow-auto p-4">
            <div className="max-w-lg mx-auto">
              <PopupTriggerConfig
                trigger={trigger}
                config={triggerConfig}
                onTriggerChange={setTrigger}
                onConfigChange={setTriggerConfig}
              />
            </div>
          </TabsContent>

          <TabsContent value="targeting" className="flex-1 m-0 overflow-auto p-4">
            <div className="max-w-lg mx-auto">
              <PopupTargeting
                targeting={targeting}
                config={targetingConfig}
                onTargetingChange={setTargeting}
                onConfigChange={setTargetingConfig}
              />
            </div>
          </TabsContent>

          <TabsContent value="theme" className="flex-1 m-0 overflow-auto p-4">
            <div className="max-w-lg mx-auto">
              <PopupThemes selectedTheme={theme} onSelectTheme={setTheme} />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="flex-1 m-0">
            <PopupPreview
              type={popupType}
              headline={headline}
              bodyText={bodyText}
              ctaText={ctaText}
              dismissText={dismissText}
              theme={theme}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

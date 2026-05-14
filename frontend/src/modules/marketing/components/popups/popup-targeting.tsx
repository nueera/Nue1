// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import type { PopupTargeting as PopupTargetingType } from '@/modules/marketing/types';
import { Globe, Users, Smartphone, MapPin, Link2, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

interface PopupTargetingProps {
  targeting: PopupTargetingType[];
  config: Record<string, unknown>;
  onTargetingChange: (targeting: PopupTargetingType[]) => void;
  onConfigChange: (config: Record<string, unknown>) => void;
}

const targetingOptions: Array<{
  value: PopupTargetingType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}> = [
  { value: 'all_visitors', label: 'All Visitors', icon: Globe, description: 'Show to everyone' },
  { value: 'new_visitors', label: 'New Visitors', icon: Users, description: 'First-time visitors only' },
  { value: 'returning_visitors', label: 'Returning Visitors', icon: Users, description: 'Previously visited' },
  { value: 'specific_pages', label: 'Specific Pages', icon: Link2, description: 'URL matching rules' },
  { value: 'specific_segments', label: 'Specific Segments', icon: Users, description: 'Audience segments' },
  { value: 'device_type', label: 'Device Type', icon: Smartphone, description: 'Mobile / Desktop / Tablet' },
  { value: 'geo_location', label: 'Geo Location', icon: MapPin, description: 'Country / Region' },
  { value: 'utm_source', label: 'UTM Source', icon: Monitor, description: 'Campaign attribution' },
];

export function PopupTargeting({ targeting, config, onTargetingChange, onConfigChange }: PopupTargetingProps) {
  const toggleTargeting = (value: PopupTargetingType) => {
    if (targeting.includes(value)) {
      onTargetingChange(targeting.filter((t) => t !== value));
    } else {
      onTargetingChange([...targeting, value]);
    }
  };

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <h3 className="text-lg font-semibold text-foreground">Audience Targeting</h3>
        <p className="text-sm text-muted-foreground mt-1">Define who sees this popup</p>
      </motion.div>

      <Card className="border-border/50">
        <CardContent className="p-4 space-y-2">
          <Label className="text-xs font-semibold">Targeting Rules</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {targetingOptions.map((opt) => (
              <motion.button
                key={opt.value}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                  targeting.includes(opt.value)
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10'
                    : 'border-border hover:border-emerald-300'
                }`}
                onClick={() => toggleTargeting(opt.value)}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted shrink-0">
                  <opt.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">{opt.label}</p>
                  <p className="text-[10px] text-muted-foreground">{opt.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Specific Pages Config */}
      {targeting.includes('specific_pages') && (
        <Card className="border-border/50">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              Page URL Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <Label className="text-xs">Include URLs (one per line)</Label>
            <textarea
              value={(config.includeUrls as string) ?? ''}
              onChange={(e) => onConfigChange({ ...config, includeUrls: e.target.value })}
              placeholder="/pricing&#10;/features&#10;/demo"
              className="w-full border rounded-lg px-3 py-2 text-sm font-mono bg-background min-h-[80px] resize-none"
              rows={4}
            />
            <Label className="text-xs">Exclude URLs (one per line)</Label>
            <textarea
              value={(config.excludeUrls as string) ?? ''}
              onChange={(e) => onConfigChange({ ...config, excludeUrls: e.target.value })}
              placeholder="/admin&#10;/api"
              className="w-full border rounded-lg px-3 py-2 text-sm font-mono bg-background min-h-[60px] resize-none"
              rows={3}
            />
          </CardContent>
        </Card>
      )}

      {/* Device Type Config */}
      {targeting.includes('device_type') && (
        <Card className="border-border/50">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-muted-foreground" />
              Device Targeting
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            {['desktop', 'mobile', 'tablet'].map((device) => (
              <div key={device} className="flex items-center justify-between">
                <Label className="text-xs capitalize">{device}</Label>
                <Switch
                  checked={((config.devices as string[]) ?? ['desktop', 'mobile']).includes(device)}
                  onCheckedChange={(checked) => {
                    const devices = (config.devices as string[]) ?? ['desktop', 'mobile'];
                    onConfigChange({
                      ...config,
                      devices: checked ? [...devices, device] : devices.filter((d) => d !== device),
                    });
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Geo Location Config */}
      {targeting.includes('geo_location') && (
        <Card className="border-border/50">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Geo Targeting
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <Label className="text-xs">Countries (comma-separated)</Label>
            <Input
              value={(config.countries as string) ?? ''}
              onChange={(e) => onConfigChange({ ...config, countries: e.target.value })}
              placeholder="US, UK, CA"
              className="h-8 text-sm"
            />
          </CardContent>
        </Card>
      )}

      {/* UTM Source Config */}
      {targeting.includes('utm_source') && (
        <Card className="border-border/50">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Monitor className="h-4 w-4 text-muted-foreground" />
              UTM Source
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <Label className="text-xs">UTM Sources (comma-separated)</Label>
            <Input
              value={(config.utmSources as string) ?? ''}
              onChange={(e) => onConfigChange({ ...config, utmSources: e.target.value })}
              placeholder="google, facebook, newsletter"
              className="h-8 text-sm"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

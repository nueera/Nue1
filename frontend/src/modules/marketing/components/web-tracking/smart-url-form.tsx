'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link2, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SmartUrlFormProps {
  onSave?: (data: { name: string; originalUrl: string; utmSource?: string; utmMedium?: string; utmCampaign?: string }) => void;
  onCancel?: () => void;
}

export function SmartUrlForm({ onSave, onCancel }: SmartUrlFormProps) {
  const [name, setName] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');

  const handleSubmit = () => {
    onSave?.({ name, originalUrl, utmSource, utmMedium, utmCampaign });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50 max-w-lg mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Link2 className="h-5 w-5 text-emerald-600" />Create Smart URL
            </CardTitle>
            {onCancel && <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCancel}><X className="h-4 w-4" /></Button>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input placeholder="e.g., Summer Campaign Link" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Destination URL</Label>
            <Input placeholder="https://example.com/landing-page" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} />
          </div>
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-3">UTM Parameters</p>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>UTM Source</Label>
                <Input placeholder="e.g., newsletter" value={utmSource} onChange={(e) => setUtmSource(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>UTM Medium</Label>
                <Input placeholder="e.g., email" value={utmMedium} onChange={(e) => setUtmMedium(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>UTM Campaign</Label>
                <Input placeholder="e.g., summer_sale_2024" value={utmCampaign} onChange={(e) => setUtmCampaign(e.target.value)} />
              </div>
            </div>
          </div>
          <Button onClick={handleSubmit} disabled={!name || !originalUrl} className="w-full">
            <Save className="h-4 w-4 mr-2" />Create Smart URL
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

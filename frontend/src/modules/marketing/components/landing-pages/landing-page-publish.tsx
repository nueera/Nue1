'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Globe, Link2, Copy, Check, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPagePublishProps {
  pageId: string;
  slug?: string;
  onPublish?: (config: PublishConfig) => void;
}

interface PublishConfig {
  slug: string;
  customDomain: string;
  isPublished: boolean;
}

export function LandingPagePublish({ pageId, slug: initialSlug, onPublish }: LandingPagePublishProps) {
  const [slug, setSlug] = useState(initialSlug ?? '');
  const [customDomain, setCustomDomain] = useState('');
  const [useCustomDomain, setUseCustomDomain] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://app.example.com';
  const pageUrl = useCustomDomain && customDomain
    ? `https://${customDomain}`
    : `${baseUrl}/p/${slug || 'untitled'}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePublish = () => {
    setIsPublished(true);
    onPublish?.({ slug, customDomain, isPublished: true });
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <h3 className="text-lg font-semibold text-foreground">Publish Settings</h3>
        <p className="text-sm text-muted-foreground mt-1">Configure your page URL and domain</p>
      </motion.div>

      {/* URL Configuration */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.05 }}>
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              Page URL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">URL Slug</Label>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground whitespace-nowrap">/p/</span>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  placeholder="my-landing-page"
                  className="h-8 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-foreground flex-1 truncate">{pageUrl}</span>
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={handleCopyUrl}>
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Custom Domain */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              Custom Domain
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Use custom domain</Label>
              <Switch checked={useCustomDomain} onCheckedChange={setUseCustomDomain} />
            </div>
            {useCustomDomain && (
              <div className="space-y-1.5">
                <Label className="text-xs">Domain</Label>
                <Input
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="marketing.example.com"
                  className="h-8 text-sm"
                />
                <p className="text-[10px] text-muted-foreground">
                  Configure a CNAME record pointing to <code className="bg-muted px-1 py-0.5 rounded text-[10px]">pages.example.com</code>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Publish Button */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.15 }}>
        <Card className="border-border/50">
          <CardContent className="p-4">
            {isPublished ? (
              <div className="flex items-center gap-2 text-emerald-600">
                <Check className="h-5 w-5" />
                <span className="text-sm font-medium">Page is live!</span>
                <Button variant="outline" size="sm" className="ml-auto h-7 text-xs" onClick={handleCopyUrl}>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy URL
                </Button>
              </div>
            ) : (
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handlePublish}>
                <Rocket className="h-4 w-4 mr-2" />
                Publish Page
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

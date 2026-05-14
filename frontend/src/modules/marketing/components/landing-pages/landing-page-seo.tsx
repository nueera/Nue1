// @ts-nocheck
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Globe, Image, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import NextImage from 'next/image';

interface LandingPageSeoProps {
  pageId: string;
  initialData?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    keywords?: string;
  };
  onSave?: (data: Record<string, string>) => void;
}

export function LandingPageSeo({ pageId, initialData, onSave }: LandingPageSeoProps) {
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle ?? '');
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription ?? '');
  const [ogImage, setOgImage] = useState(initialData?.ogImage ?? '');
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl ?? '');
  const [keywords, setKeywords] = useState(initialData?.keywords ?? '');

  const titleCharCount = metaTitle.length;
  const descCharCount = metaDescription.length;

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <h3 className="text-lg font-semibold text-foreground">SEO Settings</h3>
        <p className="text-sm text-muted-foreground mt-1">Optimize your landing page for search engines</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.05 }}>
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              Meta Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Meta Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Meta Title</Label>
                <span className={`text-xs ${titleCharCount > 60 ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {titleCharCount}/60
                </span>
              </div>
              <Input
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Enter meta title..."
                className="h-8 text-sm"
              />
            </div>

            {/* Meta Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Meta Description</Label>
                <span className={`text-xs ${descCharCount > 160 ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {descCharCount}/160
                </span>
              </div>
              <Textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Enter meta description..."
                className="text-sm min-h-[80px]"
                rows={3}
              />
            </div>

            {/* Keywords */}
            <div className="space-y-1.5">
              <Label className="text-xs">Keywords</Label>
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="keyword1, keyword2, keyword3..."
                className="h-8 text-sm"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Image className="h-4 w-4 text-muted-foreground" />
              Open Graph
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">OG Image URL</Label>
              <Input
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="https://example.com/og-image.png"
                className="h-8 text-sm"
              />
            </div>

            {/* OG Preview */}
            <div className="border rounded-lg overflow-hidden">
              <div className="h-32 bg-muted flex items-center justify-center relative">
                {ogImage ? (
                  <NextImage src={ogImage} alt="Open Graph preview image" className="w-full h-full object-cover" fill sizes="400px" unoptimized />
                ) : (
                  <p className="text-xs text-muted-foreground">OG Image Preview</p>
                )}
              </div>
              <div className="p-3 bg-muted/50">
                <p className="text-xs font-medium text-foreground truncate">{metaTitle || 'Page Title'}</p>
                <p className="text-[10px] text-muted-foreground truncate mt-0.5">{metaDescription || 'Page description will appear here'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.15 }}>
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Canonical URL</Label>
              <Input
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder="https://example.com/page"
                className="h-8 text-sm"
              />
            </div>
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => onSave?.({ metaTitle, metaDescription, ogImage, canonicalUrl, keywords })}
            >
              <Save className="h-4 w-4 mr-1" />
              Save SEO Settings
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

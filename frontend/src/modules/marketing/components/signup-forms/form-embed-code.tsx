// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check, Copy, Code2, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormEmbedCodeProps {
  formId: string;
  className?: string;
}

export function FormEmbedCode({ formId, className }: FormEmbedCodeProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [embedWidth, setEmbedWidth] = useState('100%');
  const [embedHeight, setEmbedHeight] = useState('600');

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://app.example.com';
  const formUrl = `${baseUrl}/f/${formId}`;

  const iframeCode = `<iframe
  src="${formUrl}"
  width="${embedWidth}"
  height="${embedHeight}"
  frameborder="0"
  style="border:none;"
></iframe>`;

  const jsCode = `<script>
  (function() {
    var s = document.createElement('script');
    s.src = '${baseUrl}/js/form.js';
    s.setAttribute('data-form-id', '${formId}');
    document.head.appendChild(s);
  })();
</script>`;

  const linkCode = `<a href="${formUrl}" target="_blank">Sign Up Now</a>`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const embedOptions = [
    { key: 'iframe', label: 'iframe Embed', code: iframeCode, icon: Code2 },
    { key: 'js', label: 'JavaScript', code: jsCode, icon: Code2 },
    { key: 'link', label: 'Direct Link', code: linkCode, icon: Link2 },
  ];

  return (
    <div className={cn('space-y-4 max-w-2xl mx-auto', className)}>
      <div>
        <h3 className="text-lg font-semibold text-foreground">Embed Your Form</h3>
        <p className="text-sm text-muted-foreground mt-1">Copy the code below and paste it into your website</p>
      </div>

      {/* Form URL */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <Label className="text-xs text-muted-foreground">Form URL</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input readOnly value={formUrl} className="h-8 text-sm font-mono" />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => handleCopy(formUrl, 'url')}
            >
              {copied === 'url' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Embed Size Config */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Width</Label>
              <Input value={embedWidth} onChange={(e) => setEmbedWidth(e.target.value)} className="h-8 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Height</Label>
              <Input value={embedHeight} onChange={(e) => setEmbedHeight(e.target.value)} className="h-8 text-sm" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Options */}
      <div className="space-y-3">
        {embedOptions.map((opt, index) => (
          <motion.div
            key={opt.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Card className="border-border/50">
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <opt.icon className="h-4 w-4 text-muted-foreground" />
                    {opt.label}
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => handleCopy(opt.code, opt.key)}
                  >
                    {copied === opt.key ? (
                      <>
                        <Check className="h-3 w-3 mr-1 text-emerald-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <pre className="bg-muted rounded-lg p-3 text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap">
                  {opt.code}
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

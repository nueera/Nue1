// @ts-nocheck
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrackingScriptProps {
  siteId?: string;
}

export function TrackingScript({ siteId }: TrackingScriptProps) {
  const [copied, setCopied] = useState(false);

  const scriptCode = `<!-- Marketing Tracking Script -->
<script>
  (function(w,d,s,o,f,js,fjs){
    w['MarketingTrack']=o;w[o]=w[o]||function(){
    (w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s);fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=true;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','mt','https://track.example.com/sdk.js'));
  mt('init', '${siteId ?? 'YOUR_SITE_ID'}');
  mt('trackPageView');
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Code className="h-4 w-4 text-emerald-600" />
            Tracking Script
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add this script to your website&apos;s &lt;head&gt; section to start tracking visitor behavior.
          </p>

          <div className="relative">
            <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-lg text-xs overflow-x-auto leading-relaxed">
              <code>{scriptCode}</code>
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
            <p className="text-xs text-amber-700 dark:text-amber-400">
              <strong>Important:</strong> Place this code on every page of your website for accurate tracking.
              The script loads asynchronously and won&apos;t affect page performance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs font-medium">Site ID</p>
              <p className="text-sm font-mono text-emerald-600">{siteId ?? 'YOUR_SITE_ID'}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs font-medium">Script Version</p>
              <p className="text-sm font-mono">v2.4.1</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface SmsPreviewProps {
  message?: string;
  senderId?: string;
  className?: string;
}

export function SmsPreview({ message, senderId, className }: SmsPreviewProps) {
  return (
    <Card className={cn('border-border/50', className)}>
      <CardContent className="p-6 flex justify-center">
        {/* Phone Mockup */}
        <div className="w-[300px] bg-gray-900 rounded-[2.5rem] p-3 shadow-xl">
          {/* Notch */}
          <div className="flex justify-center mb-3">
            <div className="w-20 h-5 bg-gray-800 rounded-full" />
          </div>

          {/* Screen */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden min-h-[400px]">
            {/* Status Bar */}
            <div className="flex items-center justify-between px-4 py-2 text-[10px] text-gray-500">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Message Header */}
            <div className="px-4 py-2 bg-white dark:bg-gray-700 border-b">
              <p className="text-xs font-medium text-foreground">
                {senderId ?? 'ACME'}
              </p>
              <p className="text-[10px] text-muted-foreground">SMS</p>
            </div>

            {/* Message Bubble */}
            <div className="p-4">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
                <p className="text-sm text-foreground whitespace-pre-wrap">
                  {message || 'Your SMS message will appear here...'}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1 text-right">Now</p>
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center mt-2">
            <div className="w-28 h-1 bg-gray-700 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

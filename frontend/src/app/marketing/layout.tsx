'use client';

import { type ReactNode } from 'react';
import { MarketingProvider } from '@/modules/marketing/providers/marketing-provider';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <MarketingProvider>{children}</MarketingProvider>;
}

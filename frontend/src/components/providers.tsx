'use client';

import { ThemeProvider } from '@/modules/erp/core/providers/theme-provider';
import { AuthProvider } from '@/modules/erp/core/providers/auth-provider';
import { QueryProvider } from '@/components/providers/query-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

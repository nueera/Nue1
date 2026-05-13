'use client';

import { PageTransition } from '@/modules/erp/design-system/components/animations';

export default function LoginPage() {
  return (
    <PageTransition>
      <div className="w-full max-w-md mx-auto p-8">
        <div className="glass-surface rounded-xl p-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Sign in to NueERP</h1>
          <p className="text-muted-foreground mb-6">Enter your credentials to access your account</p>
          <div className="border border-glass-border/30 rounded-lg bg-glass-bg/20 p-8 text-center">
            <p className="text-muted-foreground">Login form coming soon</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

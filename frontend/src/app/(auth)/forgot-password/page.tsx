'use client';

import { PageTransition } from '@/modules/erp/design-system/components/animations';

export default function ForgotPasswordPage() {
  return (
    <PageTransition>
      <div className="w-full max-w-md mx-auto p-8">
        <div className="glass-surface rounded-xl p-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Reset Password</h1>
          <p className="text-muted-foreground mb-6">Enter your email to receive a reset link</p>
          <div className="border border-glass-border/30 rounded-lg bg-glass-bg/20 p-8 text-center">
            <p className="text-muted-foreground">Password reset form coming soon</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

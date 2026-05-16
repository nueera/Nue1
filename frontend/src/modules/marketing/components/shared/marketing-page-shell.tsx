'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

// ---------------------------------------------------------------------------
// Reusable Marketing Page Shell
// Uses CSS animations instead of framer-motion for lighter runtime overhead.
// The @keyframes are defined in globals.css under "workspace-enter".
// ---------------------------------------------------------------------------

interface MarketingPageShellProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  addLabel: string;
  children?: React.ReactNode;
}

export function MarketingPageShell({ title, description, icon, addLabel, children }: MarketingPageShellProps) {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header — CSS fade-in */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-1 duration-200"
      >
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {addLabel}
        </Button>
      </div>

      {/* Search & Filters Bar — CSS fade-in with slight delay */}
      <div
        className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-1 duration-200 delay-50"
      >
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 h-9" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Content area — CSS fade-in with slightly more delay */}
      {children || (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100">
          <Card className="border-border/50">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                This section is being built. {description.toLowerCase()} will be available here.
              </p>
              <Button className="mt-4" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {addLabel}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

// ---------------------------------------------------------------------------
// Reusable Finance Page Shell
// ---------------------------------------------------------------------------

interface FinancePageShellProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  addLabel: string;
  children?: React.ReactNode;
}

export function FinancePageShell({ title, description, icon, addLabel, children }: FinancePageShellProps) {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
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
      </motion.div>

      {/* Search & Filters Bar */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
        className="flex items-center gap-3"
      >
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 h-9" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </motion.div>

      {/* Content area */}
      {children || (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
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
        </motion.div>
      )}
    </div>
  );
}

'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Users,
  DollarSign,
  Megaphone,
  BarChart3,
  Zap,
  Heart,
  Settings,
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { useStoreHydrated } from '@/hooks/use-store-hydrated';
import type { ModuleData } from './ModuleTile';
import ModuleTile from './ModuleTile';
import ListModule from './ListModule';
import CompactTile from './CompactTile';

const modules: ModuleData[] = [
  {
    id: 'erp',
    name: 'ERP',
    icon: Building2,
    accentKey: 'erp',
    hexColor: '#3B82F6',
    description: 'Enterprise Resource Planning',
    featured: true,
  },
  {
    id: 'crm',
    name: 'CRM / Sales',
    icon: Users,
    accentKey: 'crm',
    hexColor: '#F97316',
    description: 'Customer Relationship Management',
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: DollarSign,
    accentKey: 'finance',
    hexColor: '#10B981',
    description: 'Financial Operations',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: Megaphone,
    accentKey: 'marketing',
    hexColor: '#8B5CF6',
    description: 'Campaign Management',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3,
    accentKey: 'analytics',
    hexColor: '#06B6D4',
    description: 'Data Insights & Reporting',
  },
  {
    id: 'automation',
    name: 'Automation',
    icon: Zap,
    accentKey: 'automation',
    hexColor: '#EAB308',
    description: 'Workflow Automation',
  },
  {
    id: 'retention',
    name: 'Retention',
    icon: Heart,
    accentKey: 'retention',
    hexColor: '#EC4899',
    description: 'Customer Retention',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    accentKey: 'settings',
    hexColor: '#6B7280',
    description: 'System Configuration',
  },
];

interface TileGridProps {
  searchQuery?: string;
}

export default function TileGrid({ searchQuery = '' }: TileGridProps) {
  const hydrated = useStoreHydrated();
  const { viewMode, getSortedModules } = useAppStore();

  // Sort modules by intelligence: pinned → frequent → recent
  // Only apply intelligence sorting AFTER the first client render to avoid
  // hydration mismatch (Zustand persist rehydrates from localStorage,
  // producing different data than the server's default state)
  const sortedModules = useMemo(() => {
    if (!hydrated) return modules; // Use natural order during SSR + first client render
    const sortedIds = getSortedModules(modules.map((m) => m.id));
    return sortedIds.map((id) => modules.find((m) => m.id === id)!).filter(Boolean);
  }, [hydrated, getSortedModules]);

  const filteredModules = useMemo(() => {
    const source = sortedModules;
    if (!searchQuery.trim()) return source;
    const q = searchQuery.toLowerCase();
    return source.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );
  }, [sortedModules, searchQuery]);

  if (filteredModules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p className="text-base font-medium" style={{ letterSpacing: 'var(--tracking-tight)' }}>No modules found</p>
        <p className="text-sm mt-1" style={{ letterSpacing: 'var(--tracking-normal)' }}>Try a different search term</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {viewMode === 'tile' && (
        <motion.div
          key="tile"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {filteredModules.map((mod, i) => (
            <ModuleTile key={mod.id} module={mod} index={i} />
          ))}
        </motion.div>
      )}

      {viewMode === 'list' && (
        <motion.div
          key="list"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex flex-col gap-2 max-w-2xl mx-auto"
        >
          {filteredModules.map((mod, i) => (
            <ListModule key={mod.id} module={mod} index={i} />
          ))}
        </motion.div>
      )}

      {viewMode === 'compact' && (
        <motion.div
          key="compact"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2"
        >
          {filteredModules.map((mod, i) => (
            <CompactTile key={mod.id} module={mod} index={i} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

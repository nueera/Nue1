'use client';

import { useState } from 'react';
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
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { useMounted } from '@/hooks/use-mounted';

interface SidebarModule {
  id: string;
  name: string;
  icon: typeof Building2;
  hexColor: string;
}

const sidebarModules: SidebarModule[] = [
  { id: 'erp', name: 'ERP', icon: Building2, hexColor: '#3B82F6' },
  { id: 'crm', name: 'CRM / Sales', icon: Users, hexColor: '#F97316' },
  { id: 'finance', name: 'Finance', icon: DollarSign, hexColor: '#10B981' },
  { id: 'marketing', name: 'Marketing', icon: Megaphone, hexColor: '#8B5CF6' },
  { id: 'analytics', name: 'Analytics', icon: BarChart3, hexColor: '#06B6D4' },
  { id: 'automation', name: 'Automation', icon: Zap, hexColor: '#EAB308' },
  { id: 'retention', name: 'Retention', icon: Heart, hexColor: '#EC4899' },
  { id: 'settings', name: 'Settings', icon: Settings, hexColor: '#6B7280' },
];

const EXPANDED_WIDTH = 200;
const COLLAPSED_WIDTH = 56;

export default function Sidebar() {
  const mounted = useMounted();
  const [collapsed, setCollapsed] = useState(false);
  const { recordModuleClick, recentModules } = useAppStore();

  // The last clicked module is the first in recentModules
  const activeModuleId = recentModules.length > 0 ? recentModules[0] : null;

  const width = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  if (!mounted) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.38, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="hidden md:flex lg:hidden flex-col shrink-0 h-fit"
      style={{ width }}
    >
      <div className="glass-surface rounded-lg border-r border-glass-border flex flex-col overflow-hidden">
        {/* Module list */}
        <nav className="flex-1 py-2" role="navigation" aria-label="Sidebar modules">
          {sidebarModules.map((mod) => {
            const Icon = mod.icon;
            const isActive = mod.id === activeModuleId;

            return (
              <motion.button
                key={mod.id}
                onClick={() => recordModuleClick(mod.id)}
                whileHover={{ x: 2, transition: { duration: 0.14 } }}
                whileTap={{ scale: 0.97 }}
                className={`
                  relative w-full flex items-center gap-3
                  min-h-[44px] rounded-none
                  transition-colors duration-[140ms]
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
                  ${isActive
                    ? 'bg-glass-hover text-foreground'
                    : 'text-muted-foreground hover:bg-glass-hover hover:text-foreground'
                  }
                `}
                style={{
                  paddingLeft: collapsed ? 0 : undefined,
                  paddingRight: collapsed ? 0 : undefined,
                }}
                aria-label={mod.name}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Active accent bar */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-accent"
                    className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full"
                    style={{ backgroundColor: mod.hexColor }}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}

                {/* Icon */}
                <span
                  className={`flex items-center justify-center shrink-0 ${collapsed ? 'mx-auto' : 'ml-3'}`}
                  style={{ width: 32, height: 32 }}
                >
                  <Icon
                    className="h-4.5 w-4.5"
                    strokeWidth={1.8}
                    style={{ color: isActive ? mod.hexColor : undefined }}
                  />
                </span>

                {/* Label (hidden when collapsed) */}
                <AnimatePresence initial={false}>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.14, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      style={{ letterSpacing: 'var(--tracking-normal)' }}
                    >
                      {mod.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="border-t border-glass-border p-2 flex justify-center">
          <motion.button
            onClick={() => setCollapsed(!collapsed)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-glass-hover transition-colors duration-[140ms]"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronsRight className="h-4 w-4" strokeWidth={1.8} />
            ) : (
              <ChevronsLeft className="h-4 w-4" strokeWidth={1.8} />
            )}
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
}

'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';

/* ============================================================
   TYPES
   ============================================================ */

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  slug: string;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

interface CollapsibleNavSectionProps {
  /** Module ID for state persistence (e.g., 'erp', 'crm') */
  moduleId: string;

  /** The section config */
  section: NavSection;

  /** Whether the sidebar is collapsed (icon-only mode) */
  sidebarCollapsed: boolean;

  /** Currently active slug */
  activeSlug: string;

  /** Flash slug for instant highlight */
  flashSlug: string | null;

  /** Whether this item is recently used */
  isRecentlyUsed: (slug: string) => boolean;

  /** Navigation handler */
  onNavigate: (slug: string) => void;

  /** Additional class name for the section container */
  className?: string;
}

/* ============================================================
   COLLAPSIBLE NAV SECTION
   ============================================================ */

export function CollapsibleNavSection({
  moduleId,
  section,
  sidebarCollapsed,
  activeSlug,
  flashSlug,
  isRecentlyUsed,
  onNavigate,
  className,
}: CollapsibleNavSectionProps) {
  const sidebarSections = useWorkspaceStore((s) => s.sidebarSections);
  const toggleSidebarSection = useWorkspaceStore((s) => s.toggleSidebarSection);

  // Read persisted collapse state
  const sectionKey = `${moduleId}:${section.title}`;
  const isCollapsed = sidebarSections[sectionKey] ?? false;

  // Auto-expand if any item in this section is active
  const hasActiveItem = section.items.some(
    (item) => activeSlug === item.slug || activeSlug.startsWith(item.slug + '/')
  );
  const effectiveCollapsed = isCollapsed && !hasActiveItem;

  const handleToggle = useCallback(() => {
    toggleSidebarSection(moduleId, section.title);
  }, [moduleId, section.title, toggleSidebarSection]);

  // When sidebar is collapsed (icon-only mode), show just icons without section headers
  if (sidebarCollapsed) {
    return (
      <div className="space-y-0.5 mb-2">
        {section.items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSlug === item.slug || activeSlug.startsWith(item.slug + '/');
          const isRecent = isRecentlyUsed(item.slug);
          const isFlashing = flashSlug === item.slug;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.slug)}
              className={cn(
                'group relative flex items-center justify-center w-full rounded-lg px-2 py-2.5 transition-all duration-[60ms]',
                (isActive || isFlashing)
                  ? `bg-module-${moduleId}/8 text-module-${moduleId}`
                  : 'text-muted-foreground hover:bg-glass-hover hover:text-foreground',
                isFlashing && 'sidebar-item-flash',
                isRecent && !isActive && !isFlashing && 'sidebar-recent'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              suppressHydrationWarning
            >
              {isActive && (
                <motion.div
                  layoutId={`${moduleId}-sidebar-active-indicator`}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-r-full bg-module-${moduleId}`}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  'shrink-0 transition-colors duration-[60ms]',
                  isActive ? `text-module-${moduleId}` : 'text-muted-foreground group-hover:text-foreground',
                  'h-5 w-5'
                )}
                strokeWidth={1.8}
              />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('mb-3', className)}>
      {/* Section header — clickable to toggle collapse */}
      <button
        onClick={handleToggle}
        className={cn(
          'flex items-center w-full px-3 mb-1.5 group/section',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-focus rounded'
        )}
        aria-expanded={!effectiveCollapsed}
        aria-label={`${section.title} section${effectiveCollapsed ? ' (collapsed)' : ''}`}
      >
        {/* ▼ / ▶ Chevron */}
        <motion.span
          animate={{ rotate: effectiveCollapsed ? 0 : 90 }}
          transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex items-center justify-center w-4 h-4 shrink-0 mr-1.5"
        >
          <ChevronRight
            className={cn(
              'size-3 transition-colors duration-[var(--motion-fast)]',
              'text-muted-foreground/40 group-hover/section:text-muted-foreground/70'
            )}
            strokeWidth={2}
          />
        </motion.span>

        <span
          className="font-semibold text-muted-foreground/50 uppercase select-none"
          style={{
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-wide)',
          }}
        >
          {section.title}
        </span>

        {/* Item count badge when collapsed */}
        {effectiveCollapsed && section.items.length > 1 && (
          <span
            className={cn(
              'ml-auto font-medium text-muted-foreground/30',
            )}
            style={{
              fontSize: 'var(--text-xs)',
            }}
          >
            {section.items.length}
          </span>
        )}
      </button>

      {/* Collapsible items */}
      <AnimatePresence initial={false}>
        {!effectiveCollapsed && (
          <motion.div
            key="items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as const },
              opacity: { duration: 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const },
            }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSlug === item.slug || activeSlug.startsWith(item.slug + '/');
                const isRecent = isRecentlyUsed(item.slug);
                const isFlashing = flashSlug === item.slug;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.slug)}
                    className={cn(
                      'group relative flex items-center w-full rounded-lg transition-all duration-[60ms]',
                      'gap-3 px-3 py-2',
                      (isActive || isFlashing)
                        ? `bg-module-${moduleId}/8 text-module-${moduleId}`
                        : 'text-muted-foreground hover:bg-glass-hover hover:text-foreground',
                      isFlashing && 'sidebar-item-flash',
                      isRecent && !isActive && !isFlashing && 'sidebar-recent'
                    )}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                    suppressHydrationWarning
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId={`${moduleId}-sidebar-active-indicator`}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-r-full bg-module-${moduleId}`}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}

                    <Icon
                      className={cn(
                        'shrink-0 transition-colors duration-[60ms]',
                        isActive ? `text-module-${moduleId}` : 'text-muted-foreground group-hover:text-foreground',
                        'h-4.5 w-4.5'
                      )}
                      strokeWidth={1.8}
                    />

                    <span
                      className="truncate"
                      style={{
                        fontSize: 'var(--text-sm)',
                        letterSpacing: 'var(--tracking-normal)',
                        lineHeight: 'var(--leading-normal)',
                      }}
                    >
                      {item.label}
                    </span>

                    {/* Badge */}
                    {item.badge && (
                      <span
                        className={cn(
                          'ml-auto px-1.5 py-0.5 rounded-full font-medium',
                          `bg-module-${moduleId}/10 text-module-${moduleId}`
                        )}
                        style={{ fontSize: 'var(--text-xs)' }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* When collapsed, show a thin line indicating collapsed items */}
      {effectiveCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="px-3"
        >
          <button
            onClick={handleToggle}
            className={cn(
              'flex items-center gap-2 w-full px-2 py-1.5 rounded-md',
              'text-muted-foreground/30 hover:text-muted-foreground/60 hover:bg-glass-hover',
              'transition-colors duration-[var(--motion-fast)]',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-focus'
            )}
            aria-label={`Expand ${section.title} section`}
          >
            <span className="flex-1 text-left" style={{ fontSize: 'var(--text-xs)' }}>
              {section.items.length} item{section.items.length !== 1 ? 's' : ''}
            </span>
          </button>
        </motion.div>
      )}
    </div>
  );
}

'use client';

import { useMemo, useState, Fragment } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Home, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Module ID to display label mapping.
 */
const MODULE_LABELS: Record<string, string> = {
  erp: 'ERP',
  crm: 'CRM',
  finance: 'Finance',
  marketing: 'Marketing',
  analytics: 'Analytics',
  automation: 'Automation',
  retention: 'Retention',
  settings: 'Settings',
};

/**
 * Set of known module IDs for quick lookup.
 */
const KNOWN_MODULES = new Set(Object.keys(MODULE_LABELS));

interface BreadcrumbSegment {
  label: string;
  href: string;
  isModule: boolean;
  moduleId?: string;
}

/**
 * Parse the current pathname into breadcrumb segments.
 *
 * Example: /crm/contacts → [
 *   { label: 'CRM', href: '/crm', isModule: true, moduleId: 'crm' },
 *   { label: 'Contacts', href: '/crm/contacts', isModule: false }
 * ]
 */
function parseBreadcrumbs(pathname: string): BreadcrumbSegment[] {
  // Remove trailing slash and split
  const segments = pathname.replace(/\/+$/, '').split('/').filter(Boolean);

  if (segments.length === 0) return [];

  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isModule = index === 0 && KNOWN_MODULES.has(segment);
    const moduleId = isModule ? segment : undefined;

    // Use module label map for known modules, otherwise title-case the segment
    const label = isModule
      ? MODULE_LABELS[segment]
      : segment
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());

    return { label, href, isModule, moduleId };
  });
}

/**
 * Format a path into a display-friendly key for animation.
 */
function breadcrumbKey(segments: BreadcrumbSegment[]): string {
  return segments.map((s) => s.href).join('|');
}

/**
 * Maximum number of visible segments before collapsing.
 */
const COLLAPSE_THRESHOLD = 4;

/**
 * Minimum number of segments to show at the tail when collapsed.
 */
const TAIL_COUNT = 2;

interface GlobalBreadcrumbProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * GlobalBreadcrumb — Auto-generated breadcrumb navigation bar.
 *
 * Features:
 * - Auto-generates breadcrumbs from the current URL pathname
 * - Detects the current module and applies its accent color
 * - Collapses long paths (>4 segments) into a "..." dropdown
 * - Glass surface styling for a subtle, integrated look
 * - Animated crumb transitions with framer-motion
 * - Responsive: mobile shows only module + current page
 * - Home icon for root navigation
 */
export function GlobalBreadcrumb({ className }: GlobalBreadcrumbProps) {
  const pathname = usePathname();
  const [ellipsisOpen, setEllipsisOpen] = useState(false);

  const allSegments = useMemo(() => parseBreadcrumbs(pathname), [pathname]);

  // Determine the current module from the first path segment
  const currentModule = useMemo(() => {
    const firstSegment = allSegments[0];
    return firstSegment?.isModule ? firstSegment.moduleId : undefined;
  }, [allSegments]);

  // Decide whether to collapse middle segments
  const shouldCollapse = allSegments.length > COLLAPSE_THRESHOLD;

  // Desktop: first + "..." + last 2; Mobile: first + last
  const visibleSegments = useMemo(() => {
    if (!shouldCollapse) return allSegments;

    // Show first segment, collapse the middle, show last TAIL_COUNT
    const head = allSegments.slice(0, 1);
    const tail = allSegments.slice(-TAIL_COUNT);

    return [...head, ...tail];
  }, [allSegments, shouldCollapse]);

  // The hidden segments (those between first and last TAIL_COUNT)
  const hiddenSegments = useMemo(() => {
    if (!shouldCollapse) return [];
    return allSegments.slice(1, -TAIL_COUNT);
  }, [allSegments, shouldCollapse]);

  // Mobile segments: only module (first) + current page (last)
  const mobileSegments = useMemo(() => {
    if (allSegments.length <= 2) return allSegments;
    return [allSegments[0], allSegments[allSegments.length - 1]];
  }, [allSegments]);

  // Reset ellipsis dropdown when path changes
  const animKey = useMemo(() => breadcrumbKey(allSegments), [allSegments]);

  // Accent color class for the active (last) breadcrumb
  const accentClass = currentModule ? `text-module-${currentModule}` : 'text-foreground';

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'glass-surface inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm',
        className
      )}
    >
      {/* Home crumb */}
      <AnimatePresence mode="wait">
        <motion.span
          key={`home-${animKey}`}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -4 }}
          transition={{ duration: 0.15 }}
          className="inline-flex items-center"
        >
          <Link
            href="/"
            className={cn(
              'inline-flex items-center rounded-md p-1 text-muted-foreground transition-colors',
              'hover:text-foreground hover:bg-accent/50',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
            aria-label="Home"
          >
            <Home className="size-3.5" />
          </Link>
        </motion.span>
      </AnimatePresence>

      {/* Desktop breadcrumb */}
      <ol className="hidden sm:flex items-center gap-1" aria-label="Breadcrumb">
        {visibleSegments.map((segment, index) => {
          const isFirst = index === 0;
          const isLast = index === visibleSegments.length - 1;
          const isEllipsisSlot = shouldCollapse && !isFirst && index === 1;

          return (
            <Fragment key={`desktop-${segment.href}-${index}`}>
              {/* Separator */}
              <motion.li
                key={`sep-desktop-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.12, delay: index * 0.03 }}
                role="presentation"
                aria-hidden="true"
                className="flex items-center text-muted-foreground/50"
              >
                <ChevronRight className="size-3.5" />
              </motion.li>

              {/* Ellipsis dropdown for collapsed segments */}
              {isEllipsisSlot && hiddenSegments.length > 0 ? (
                <motion.li
                  key={`ellipsis-${animKey}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => setEllipsisOpen((prev) => !prev)}
                    onBlur={() => setTimeout(() => setEllipsisOpen(false), 150)}
                    className={cn(
                      'inline-flex items-center justify-center rounded-md p-1',
                      'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                      'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                    )}
                    aria-label="Show more breadcrumb items"
                    aria-expanded={ellipsisOpen}
                  >
                    <MoreHorizontal className="size-3.5" />
                  </button>

                  {/* Dropdown */}
                  {ellipsisOpen && (
                    <div
                      className={cn(
                        'absolute left-0 top-full z-50 mt-1 min-w-[160px]',
                        'glass-surface rounded-lg p-1 shadow-md'
                      )}
                    >
                      {hiddenSegments.map((hidden, hIdx) => (
                        <Link
                          key={hidden.href}
                          href={hidden.href}
                          className={cn(
                            'block rounded-md px-3 py-1.5 text-sm',
                            'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                            'transition-colors'
                          )}
                        >
                          {hidden.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.li>
              ) : (
                /* Normal breadcrumb segment */
                <motion.li
                  key={`crumb-desktop-${segment.href}`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.04 }}
                  className="inline-flex items-center"
                >
                  {isLast ? (
                    <span
                      className={cn(
                        'rounded-md px-2 py-0.5 font-medium',
                        accentClass
                      )}
                      aria-current="page"
                    >
                      {segment.label}
                    </span>
                  ) : (
                    <Link
                      href={segment.href}
                      className={cn(
                        'rounded-md px-2 py-0.5 text-muted-foreground',
                        'hover:text-foreground hover:bg-accent/50',
                        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                      )}
                    >
                      {segment.label}
                    </Link>
                  )}
                </motion.li>
              )}
            </Fragment>
          );
        })}
      </ol>

      {/* Mobile breadcrumb */}
      <ol className="flex sm:hidden items-center gap-1" aria-label="Breadcrumb">
        {mobileSegments.map((segment, index) => (
          <Fragment key={`mobile-${segment.href}-${index}`}>
            {/* Separator */}
            {index > 0 && (
              <li
                role="presentation"
                aria-hidden="true"
                className="flex items-center text-muted-foreground/50"
              >
                <ChevronRight className="size-3.5" />
              </li>
            )}

            <motion.li
              key={`crumb-mobile-${segment.href}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center"
            >
              {index === mobileSegments.length - 1 ? (
                <span
                  className={cn(
                    'rounded-md px-2 py-0.5 font-medium',
                    accentClass
                  )}
                  aria-current="page"
                >
                  {segment.label}
                </span>
              ) : (
                <Link
                  href={segment.href}
                  className={cn(
                    'rounded-md px-2 py-0.5 text-muted-foreground',
                    'hover:text-foreground hover:bg-accent/50',
                    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                  )}
                >
                  {segment.label}
                </Link>
              )}
            </motion.li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

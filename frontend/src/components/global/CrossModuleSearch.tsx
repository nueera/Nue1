'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Search,
  Building2,
  Users,
  DollarSign,
  Megaphone,
  BarChart3,
  Zap,
  Heart,
  Settings,
  Clock,
  X,
  FileText,
  UserCircle,
  Briefcase,
  Contact,
  TrendingUp,
  Receipt,
  PieChart,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useGlobalSearchStore,
  type SearchResult,
  type SearchCategory,
} from '@/stores/useGlobalSearchStore';

/* ============================================================
   MODULE CONFIG
   ============================================================ */

const moduleConfig: Record<
  string,
  { label: string; icon: typeof Building2; accentColor: string }
> = {
  erp: {
    label: 'ERP',
    icon: Building2,
    accentColor: 'var(--module-erp)',
  },
  crm: {
    label: 'CRM',
    icon: Users,
    accentColor: 'var(--module-crm)',
  },
  finance: {
    label: 'Finance',
    icon: DollarSign,
    accentColor: 'var(--module-finance)',
  },
  marketing: {
    label: 'Marketing',
    icon: Megaphone,
    accentColor: 'var(--module-marketing)',
  },
  analytics: {
    label: 'Analytics',
    icon: BarChart3,
    accentColor: 'var(--module-analytics)',
  },
  automation: {
    label: 'Automation',
    icon: Zap,
    accentColor: 'var(--module-automation)',
  },
  retention: {
    label: 'Retention',
    icon: Heart,
    accentColor: 'var(--module-retention)',
  },
  settings: {
    label: 'Settings',
    icon: Settings,
    accentColor: 'var(--module-settings)',
  },
};

/* ============================================================
   ICON MAP FOR RESULTS
   ============================================================ */

const resultIconMap: Record<string, typeof Building2> = {
  employee: UserCircle,
  project: Briefcase,
  contact: Contact,
  lead: ArrowRight,
  deal: TrendingUp,
  invoice: Receipt,
  report: PieChart,
  default: FileText,
};

function getResultIcon(iconName?: string): typeof Building2 {
  if (!iconName) return FileText;
  return resultIconMap[iconName] || FileText;
}

/* ============================================================
   MOCK SEARCH FUNCTION
   ============================================================ */

const mockSearch = (query: string): SearchCategory[] => {
  const q = query.toLowerCase();

  const allCategories: SearchCategory[] = [
    {
      moduleId: 'erp',
      label: 'ERP',
      icon: 'Building2',
      results: [
        {
          id: 'erp-emp-1',
          moduleId: 'erp',
          moduleLabel: 'ERP',
          title: 'Employees',
          description: 'Manage employee records, attendance, and HR workflows',
          href: '/erp/hrm/employees',
          icon: 'employee',
        },
        {
          id: 'erp-proj-1',
          moduleId: 'erp',
          moduleLabel: 'ERP',
          title: 'Projects',
          description: 'Track projects, timelines, and deliverables',
          href: '/erp/projects',
          icon: 'project',
        },
        {
          id: 'erp-emp-2',
          moduleId: 'erp',
          moduleLabel: 'ERP',
          title: 'Employee Directory',
          description: 'Browse and search the full employee directory',
          href: '/erp/hrm/employees',
          icon: 'employee',
        },
        {
          id: 'erp-report-1',
          moduleId: 'erp',
          moduleLabel: 'ERP',
          title: 'Reports',
          description: 'View and generate business reports',
          href: '/erp/reports',
          icon: 'report',
        },
      ],
    },
    {
      moduleId: 'crm',
      label: 'CRM',
      icon: 'Users',
      results: [
        {
          id: 'crm-contact-1',
          moduleId: 'crm',
          moduleLabel: 'CRM',
          title: 'Contacts',
          description: 'Manage your customer and prospect contacts',
          href: '/crm/contacts',
          icon: 'contact',
        },
        {
          id: 'crm-lead-1',
          moduleId: 'crm',
          moduleLabel: 'CRM',
          title: 'Leads',
          description: 'Track leads through the sales pipeline',
          href: '/crm/leads',
          icon: 'lead',
        },
        {
          id: 'crm-deal-1',
          moduleId: 'crm',
          moduleLabel: 'CRM',
          title: 'Deals',
          description: 'Monitor deal progress and revenue forecasts',
          href: '/crm/deals',
          icon: 'deal',
        },
        {
          id: 'crm-contact-2',
          moduleId: 'crm',
          moduleLabel: 'CRM',
          title: 'Contact Groups',
          description: 'Organize contacts into segments and lists',
          href: '/crm/contacts',
          icon: 'contact',
        },
      ],
    },
    {
      moduleId: 'finance',
      label: 'Finance',
      icon: 'DollarSign',
      results: [
        {
          id: 'fin-invoice-1',
          moduleId: 'finance',
          moduleLabel: 'Finance',
          title: 'Invoices',
          description: 'Create and manage invoices and billing',
          href: '/erp/finance',
          icon: 'invoice',
        },
        {
          id: 'fin-report-1',
          moduleId: 'finance',
          moduleLabel: 'Finance',
          title: 'Financial Reports',
          description: 'P&L, balance sheets, and cash flow analysis',
          href: '/erp/finance',
          icon: 'report',
        },
        {
          id: 'fin-invoice-2',
          moduleId: 'finance',
          moduleLabel: 'Finance',
          title: 'Invoice Templates',
          description: 'Customize invoice layouts and branding',
          href: '/erp/finance',
          icon: 'invoice',
        },
      ],
    },
  ];

  // Filter results by query
  const filtered = allCategories
    .map((category) => ({
      ...category,
      results: category.results.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          (r.description && r.description.toLowerCase().includes(q)) ||
          r.moduleLabel.toLowerCase().includes(q)
      ),
    }))
    .filter((category) => category.results.length > 0);

  return filtered;
};

/* ============================================================
   OVERLAY ANIMATION VARIANTS
   ============================================================ */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.96, y: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -8,
    transition: {
      duration: 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

/* ============================================================
   SEARCH MODAL COMPONENT
   ============================================================ */

function SearchModal() {
  const router = useRouter();
  const {
    isOpen,
    query,
    recentSearches,
    isLoading,
    results,
    closeSearch,
    setQuery,
    addRecentSearch,
    clearRecentSearches,
    setResults,
    setLoading,
  } = useGlobalSearchStore();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runningIndexRef = useRef(0);

  // Flatten results for keyboard navigation
  const flatResults = useMemo(() => {
    const flat: SearchResult[] = [];
    for (const category of results) {
      for (const result of category.results) {
        flat.push(result);
      }
    }
    return flat;
  }, [results]);

  // Debounced search execution
  const executeSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      // Simulate async search with mock data
      // In production, replace with actual API call
      setTimeout(() => {
        const searchResults = mockSearch(searchQuery);
        setResults(searchResults);
        setLoading(false);
      }, 150);
    },
    [setResults, setLoading]
  );

  // Handle query changes with debounce
  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (!newQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      debounceRef.current = setTimeout(() => {
        executeSearch(newQuery);
      }, 200);
    },
    [setQuery, setResults, setLoading, executeSearch]
  );

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow animation to start
      const timer = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Navigate to result
  const navigateToResult = useCallback(
    (result: SearchResult) => {
      addRecentSearch(query);
      closeSearch();
      router.push(result.href);
    },
    [query, addRecentSearch, closeSearch, router]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, flatResults.length - 1)
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (flatResults[selectedIndex]) {
            navigateToResult(flatResults[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          closeSearch();
          break;
      }
    },
    [flatResults, selectedIndex, navigateToResult, closeSearch]
  );

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0) {
      const el = listRef.current?.querySelector(
        `[data-search-index="${selectedIndex}"]`
      );
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Handle recent search click
  const handleRecentSearchClick = useCallback(
    (recentQuery: string) => {
      setQuery(recentQuery);
      executeSearch(recentQuery);
    },
    [setQuery, executeSearch]
  );

  // Compute flat index tracker for rendering groups
  runningIndexRef.current = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] sm:pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
            onClick={closeSearch}
          />

          {/* Search Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-[560px] mx-4 glass-surface-strong rounded-2xl overflow-hidden shadow-2xl"
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label="Global search"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-glass-border">
              <Search
                className="h-5 w-5 text-muted-foreground shrink-0"
                strokeWidth={1.8}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search across all modules..."
                className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                style={{
                  fontSize: 'var(--text-base)',
                  letterSpacing: 'var(--tracking-normal)',
                }}
                aria-label="Search query"
              />
              {query && (
                <button
                  onClick={() => handleQueryChange('')}
                  className="p-1 rounded-md hover:bg-glass-hover transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground/50 border border-glass-border bg-glass-bg/50">
                ESC
              </kbd>
            </div>

            {/* Results Area */}
            <div
              ref={listRef}
              className="max-h-[420px] overflow-y-auto custom-scrollbar"
            >
              {/* Loading State */}
              {isLoading && (
                <div className="px-4 py-8 flex items-center justify-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 border-t-module-erp animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    Searching...
                  </span>
                </div>
              )}

              {/* Empty Query — Recent Searches */}
              {!isLoading && !query.trim() && (
                <div className="py-2">
                  {recentSearches.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between px-4 py-2">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                          Recent Searches
                        </span>
                        <button
                          onClick={clearRecentSearches}
                          className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                        >
                          Clear all
                        </button>
                      </div>
                      {recentSearches.map((recentQuery) => (
                        <button
                          key={recentQuery}
                          onClick={() =>
                            handleRecentSearchClick(recentQuery)
                          }
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 hover:bg-glass-hover"
                        >
                          <Clock
                            className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0"
                            strokeWidth={1.8}
                          />
                          <span
                            className="flex-1 text-sm text-foreground/80"
                            style={{
                              letterSpacing: 'var(--tracking-normal)',
                            }}
                          >
                            {recentQuery}
                          </span>
                          <ArrowRight
                            className="h-3 w-3 text-muted-foreground/30"
                            strokeWidth={1.8}
                          />
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="px-4 py-10 text-center">
                      <Search
                        className="h-8 w-8 mx-auto text-muted-foreground/20 mb-3"
                        strokeWidth={1.5}
                      />
                      <p className="text-sm text-muted-foreground/60">
                        Start typing to search across all modules
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* No Results */}
              {!isLoading &&
                query.trim() &&
                results.length === 0 && (
                  <div className="px-4 py-10 text-center">
                    <Search
                      className="h-8 w-8 mx-auto text-muted-foreground/20 mb-3"
                      strokeWidth={1.5}
                    />
                    <p className="text-sm text-muted-foreground/60">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-xs text-muted-foreground/40 mt-1">
                      Try a different search term or browse modules
                    </p>
                  </div>
                )}

              {/* Grouped Results */}
              {!isLoading &&
                query.trim() &&
                results.length > 0 &&
                results.map((category) => {
                  const moduleCfg = moduleConfig[category.moduleId];
                  const ModuleIcon = moduleCfg?.icon || FileText;
                  const accentColor = moduleCfg?.accentColor || 'var(--primary)';

                  return (
                    <div key={category.moduleId} className="py-1">
                      {/* Category Header */}
                      <div className="flex items-center gap-2 px-4 py-2">
                        <div
                          className="w-0.5 h-4 rounded-full shrink-0"
                          style={{ backgroundColor: accentColor }}
                        />
                        <ModuleIcon
                          className="h-3.5 w-3.5 shrink-0"
                          style={{ color: accentColor }}
                          strokeWidth={1.8}
                        />
                        <span
                          className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60"
                          style={{ letterSpacing: 'var(--tracking-wide)' }}
                        >
                          {category.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground/30">
                          {category.results.length}
                        </span>
                      </div>

                      {/* Category Results */}
                      {category.results.map((result) => {
                        const ResultIcon = getResultIcon(result.icon);
                        const currentIndex = runningIndexRef.current++;
                        const isSelected =
                          currentIndex === selectedIndex;

                        return (
                          <button
                            key={result.id}
                            data-search-index={currentIndex}
                            onClick={() => navigateToResult(result)}
                            onMouseEnter={() =>
                              setSelectedIndex(currentIndex)
                            }
                            className={cn(
                              'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100',
                              isSelected
                                ? 'bg-glass-hover text-foreground'
                                : 'text-foreground/80 hover:bg-glass-hover'
                            )}
                          >
                            {/* Result Icon */}
                            <div
                              className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
                              style={{
                                backgroundColor: `color-mix(in oklch, ${accentColor} 12%, transparent)`,
                                color: accentColor,
                              }}
                            >
                              <ResultIcon
                                className="h-3.5 w-3.5"
                                strokeWidth={1.8}
                              />
                            </div>

                            {/* Result Text */}
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-sm truncate"
                                style={{
                                  letterSpacing:
                                    'var(--tracking-normal)',
                                }}
                              >
                                {result.title}
                              </p>
                              {result.description && (
                                <p className="text-xs text-muted-foreground/60 truncate mt-0.5">
                                  {result.description}
                                </p>
                              )}
                            </div>

                            {/* Module Badge */}
                            <span
                              className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 border border-glass-border bg-glass-bg/50"
                              style={{
                                color: accentColor,
                                letterSpacing: 'var(--tracking-wide)',
                              }}
                            >
                              {result.moduleLabel}
                            </span>

                            {/* Selection Indicator */}
                            {isSelected && (
                              <ArrowRight
                                className="h-3 w-3 text-muted-foreground/40 shrink-0"
                                strokeWidth={1.8}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
            </div>

            {/* Footer — Keyboard Hints */}
            <div className="flex items-center justify-center gap-4 px-4 py-2.5 border-t border-glass-border text-[10px] text-muted-foreground/40">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded border border-glass-border bg-glass-bg font-mono">
                  ↑↓
                </kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded border border-glass-border bg-glass-bg font-mono">
                  ↵
                </kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded border border-glass-border bg-glass-bg font-mono">
                  Esc
                </kbd>
                Close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   CROSS MODULE SEARCH — EXPORTED COMPONENT
   Registers Cmd+K shortcut and custom event listener.
   Render once at app root.
   ============================================================ */

export function CrossModuleSearch() {
  const { toggleSearch, closeSearch, isOpen } = useGlobalSearchStore();

  // Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        closeSearch();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleSearch, closeSearch, isOpen]);

  // Custom event: nueone:global-search
  useEffect(() => {
    const handler = () => {
      toggleSearch();
    };
    window.addEventListener('nueone:global-search', handler);
    return () =>
      window.removeEventListener('nueone:global-search', handler);
  }, [toggleSearch]);

  return <SearchModal />;
}

export default CrossModuleSearch;

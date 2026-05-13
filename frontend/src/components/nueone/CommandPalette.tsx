'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Building2,
  Users,
  DollarSign,
  Megaphone,
  BarChart3,
  Zap,
  Heart,
  Settings,
  Hash,
  Clock,
  Pin,
  Command,
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';

const moduleIconMap: Record<string, typeof Building2> = {
  erp: Building2,
  crm: Users,
  finance: DollarSign,
  marketing: Megaphone,
  analytics: BarChart3,
  automation: Zap,
  retention: Heart,
  settings: Settings,
};

const moduleColorMap: Record<string, string> = {
  erp: '#3B82F6',
  crm: '#F97316',
  finance: '#10B981',
  marketing: '#8B5CF6',
  analytics: '#06B6D4',
  automation: '#EAB308',
  retention: '#EC4899',
  settings: '#6B7280',
};

const commandActions = [
  { id: 'new-invoice', label: 'Create New Invoice', group: 'Actions', shortcut: '⌘N', moduleId: 'erp' },
  { id: 'add-contact', label: 'Add Contact', group: 'Actions', shortcut: '⌘C', moduleId: 'crm' },
  { id: 'run-report', label: 'Run Report', group: 'Actions', shortcut: '⌘R', moduleId: 'analytics' },
  { id: 'new-campaign', label: 'New Campaign', group: 'Actions', shortcut: '⌘⇧C', moduleId: 'marketing' },
  { id: 'toggle-theme', label: 'Toggle Theme', group: 'System', shortcut: '⌘T', moduleId: '' },
  { id: 'fullscreen', label: 'Toggle Fullscreen', group: 'System', shortcut: '⌘F', moduleId: '' },
  { id: 'view-tile', label: 'Switch to Tile View', group: 'System', shortcut: '⌘1', moduleId: '' },
  { id: 'view-list', label: 'Switch to List View', group: 'System', shortcut: '⌘2', moduleId: '' },
  { id: 'view-compact', label: 'Switch to Compact View', group: 'System', shortcut: '⌘3', moduleId: '' },
];

const moduleNames: Record<string, string> = {
  erp: 'ERP',
  crm: 'CRM / Sales',
  finance: 'Finance',
  marketing: 'Marketing',
  analytics: 'Analytics',
  automation: 'Automation',
  retention: 'Retention',
  settings: 'Settings',
};

interface CommandItem {
  id: string;
  label: string;
  group: string;
  shortcut?: string;
  moduleId: string;
  icon: typeof Building2;
  color: string;
  type: 'module' | 'action';
  isRecent?: boolean;
  isPinned?: boolean;
}

export default function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, recentModules, moduleUsage } = useAppStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Build command items
  const items: CommandItem[] = useMemo(() => {
    const moduleItems: CommandItem[] = Object.keys(moduleNames).map((id) => {
      const Icon = moduleIconMap[id];
      return {
        id: `nav-${id}`,
        label: moduleNames[id],
        group: 'Modules',
        moduleId: id,
        icon: Icon,
        color: moduleColorMap[id],
        type: 'module' as const,
        isRecent: recentModules.includes(id),
        isPinned: moduleUsage[id]?.pinned ?? false,
      };
    });

    const actionItems: CommandItem[] = commandActions.map((action) => ({
      id: action.id,
      label: action.label,
      group: action.group,
      shortcut: action.shortcut,
      moduleId: action.moduleId,
      icon: action.moduleId ? moduleIconMap[action.moduleId] : Command,
      color: action.moduleId ? moduleColorMap[action.moduleId] : '#6B7280',
      type: 'action' as const,
    }));

    return [...moduleItems, ...actionItems];
  }, [recentModules, moduleUsage]);

  // Filter items by query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        (item.shortcut && item.shortcut.toLowerCase().includes(q))
    );
  }, [items, query]);

  // Reset selection when filtered items change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems.length]);

  // Focus input when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Keyboard shortcut to open (⌘K)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const handleSelect = (item: CommandItem) => {
    setCommandPaletteOpen(false);
    if (item.type === 'module') {
      const { recordModuleClick } = useAppStore.getState();
      recordModuleClick(item.moduleId);
    }
  };

  // Group filtered items
  const groupedItems = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filteredItems.forEach((item) => {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item);
    });
    return groups;
  }, [filteredItems]);

  let flatIndex = 0;

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-full max-w-lg mx-4 glass-surface-strong rounded-2xl overflow-hidden shadow-2xl"
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-glass-border">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search modules, actions, or type a command..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                style={{ letterSpacing: 'var(--tracking-normal)' }}
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground border border-glass-border bg-glass-bg">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[340px] overflow-y-auto custom-scrollbar py-2">
              {filteredItems.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                Object.entries(groupedItems).map(([group, groupItems]) => (
                  <div key={group}>
                    <div className="px-4 py-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                        {group}
                      </span>
                    </div>
                    {groupItems.map((item) => {
                      const currentIndex = flatIndex++;
                      const isSelected = currentIndex === selectedIndex;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          data-index={currentIndex}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(currentIndex)}
                          className={`
                            w-full flex items-center gap-3 px-4 py-2.5 text-left
                            transition-colors duration-100
                            ${isSelected ? 'bg-glass-hover text-foreground' : 'text-foreground/80 hover:bg-glass-hover'}
                          `}
                        >
                          <div
                            className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
                            style={{ backgroundColor: `${item.color}15`, color: item.color }}
                          >
                            <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </div>
                          <span className="flex-1 text-sm" style={{ letterSpacing: 'var(--tracking-normal)' }}>
                            {item.label}
                          </span>
                          {/* Recent / Pinned indicators */}
                          <div className="flex items-center gap-1.5">
                            {item.isPinned && (
                              <Pin className="h-3 w-3 text-module-erp pin-indicator" />
                            )}
                            {item.isRecent && !item.isPinned && (
                              <Clock className="h-3 w-3 text-muted-foreground/50" />
                            )}
                            {item.shortcut && (
                              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground/50 border border-glass-border bg-glass-bg">
                                {item.shortcut}
                              </kbd>
                            )}
                            {isSelected && (
                              <ArrowRight className="h-3 w-3 text-muted-foreground/40" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-glass-border text-[10px] text-muted-foreground/50">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-glass-border bg-glass-bg font-mono">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-glass-border bg-glass-bg font-mono">↵</kbd>
                  select
                </span>
              </div>
              <span>NueOne Command Palette</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

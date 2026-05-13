import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewMode = "tile" | "list" | "compact";

export interface AccentColor {
  name: string;
  hex: string;
  oklchHue: number; // Hue for oklch generation
}

export const ACCENT_COLORS: AccentColor[] = [
  { name: 'Blue', hex: '#3B82F6', oklchHue: 260 },
  { name: 'Violet', hex: '#8B5CF6', oklchHue: 300 },
  { name: 'Rose', hex: '#F43F5E', oklchHue: 350 },
  { name: 'Orange', hex: '#F97316', oklchHue: 40 },
  { name: 'Emerald', hex: '#10B981', oklchHue: 160 },
  { name: 'Cyan', hex: '#06B6D4', oklchHue: 195 },
  { name: 'Amber', hex: '#EAB308', oklchHue: 90 },
  { name: 'Pink', hex: '#EC4899', oklchHue: 340 },
];

export const DEFAULT_ACCENT = ACCENT_COLORS[0]; // Blue

interface ModuleUsage {
  id: string;
  clickCount: number;
  lastOpened: number | null;
  pinned: boolean;
}

interface AppState {
  // View
  viewMode: ViewMode;
  isFullscreen: boolean;
  searchOpen: boolean;
  searchQuery: string;
  commandPaletteOpen: boolean;

  // Custom accent
  accentColor: AccentColor;

  // Intelligence layer
  moduleUsage: Record<string, ModuleUsage>;
  recentModules: string[];

  // Actions
  setViewMode: (mode: ViewMode) => void;
  setIsFullscreen: (fullscreen: boolean) => void;
  toggleFullscreen: () => void;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  setAccentColor: (color: AccentColor) => void;

  // Intelligence actions
  recordModuleClick: (moduleId: string) => void;
  toggleModulePin: (moduleId: string) => void;
  isModulePinned: (moduleId: string) => boolean;
  getModuleClickCount: (moduleId: string) => number;
  getSortedModules: (moduleIds: string[]) => string[];
}

const defaultModuleUsage: Record<string, ModuleUsage> = {
  erp: { id: 'erp', clickCount: 0, lastOpened: null, pinned: true },
  crm: { id: 'crm', clickCount: 0, lastOpened: null, pinned: false },
  finance: { id: 'finance', clickCount: 0, lastOpened: null, pinned: false },
  marketing: { id: 'marketing', clickCount: 0, lastOpened: null, pinned: false },
  analytics: { id: 'analytics', clickCount: 0, lastOpened: null, pinned: false },
  automation: { id: 'automation', clickCount: 0, lastOpened: null, pinned: false },
  retention: { id: 'retention', clickCount: 0, lastOpened: null, pinned: false },
  settings: { id: 'settings', clickCount: 0, lastOpened: null, pinned: false },
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      viewMode: "tile",
      isFullscreen: false,
      searchOpen: false,
      searchQuery: "",
      commandPaletteOpen: false,
      accentColor: DEFAULT_ACCENT,
      moduleUsage: defaultModuleUsage,
      recentModules: [],

      setViewMode: (mode) => set({ viewMode: mode }),
      setIsFullscreen: (fullscreen) => set({ isFullscreen: fullscreen }),
      toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
      setSearchOpen: (open) => set({ searchOpen: open }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
      setAccentColor: (color) => set({ accentColor: color }),

      recordModuleClick: (moduleId) =>
        set((state) => {
          const usage = state.moduleUsage[moduleId] || {
            id: moduleId,
            clickCount: 0,
            lastOpened: null,
            pinned: false,
          };
          const now = Date.now();
          const updatedRecent = [moduleId, ...state.recentModules.filter((id) => id !== moduleId)].slice(0, 5);
          return {
            moduleUsage: {
              ...state.moduleUsage,
              [moduleId]: {
                ...usage,
                clickCount: usage.clickCount + 1,
                lastOpened: now,
              },
            },
            recentModules: updatedRecent,
          };
        }),

      toggleModulePin: (moduleId) =>
        set((state) => {
          const usage = state.moduleUsage[moduleId] || {
            id: moduleId,
            clickCount: 0,
            lastOpened: null,
            pinned: false,
          };
          return {
            moduleUsage: {
              ...state.moduleUsage,
              [moduleId]: {
                ...usage,
                pinned: !usage.pinned,
              },
            },
          };
        }),

      isModulePinned: (moduleId) => {
        return get().moduleUsage[moduleId]?.pinned ?? false;
      },

      getModuleClickCount: (moduleId) => {
        return get().moduleUsage[moduleId]?.clickCount ?? 0;
      },

      getSortedModules: (moduleIds) => {
        const state = get();
        return [...moduleIds].sort((a, b) => {
          const aUsage = state.moduleUsage[a];
          const bUsage = state.moduleUsage[b];
          // Pinned first
          if (aUsage?.pinned && !bUsage?.pinned) return -1;
          if (!aUsage?.pinned && bUsage?.pinned) return 1;
          // Then by click count (most used)
          const aCount = aUsage?.clickCount ?? 0;
          const bCount = bUsage?.clickCount ?? 0;
          if (bCount !== aCount) return bCount - aCount;
          // Then by last opened
          const aLast = aUsage?.lastOpened ?? 0;
          const bLast = bUsage?.lastOpened ?? 0;
          return bLast - aLast;
        });
      },
    }),
    {
      name: 'nueone-app-store',
      partialize: (state) => ({
        viewMode: state.viewMode,
        accentColor: state.accentColor,
        moduleUsage: state.moduleUsage,
        recentModules: state.recentModules,
      }),
    }
  )
);

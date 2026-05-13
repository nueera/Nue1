import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* ============================================================
   WORKSPACE TYPES
   ============================================================ */

export type WorkspaceState = 'compact' | 'expanded' | 'maximized' | 'minimized';
export type PanelLayout = 'single' | 'split-h' | 'split-v' | 'triple';

export interface WorkspacePanel {
  id: string;
  moduleId: string;         // e.g. 'erp', 'crm', 'finance'
  submodulePath?: string;   // e.g. 'hrm/employees'
  title: string;
  icon?: string;
  width?: number;           // percentage 0-100 for resizable
}

export interface WorkspaceMemory {
  scrollPosition: number;
  filters: Record<string, unknown>;
  activeTab?: string;
  lastActive: number;
}

export interface Workspace {
  id: string;
  moduleId: string;
  title: string;
  icon?: string;
  state: WorkspaceState;
  previousState?: WorkspaceState; // State before minimize, for restore
  panels: WorkspacePanel[];
  layout: PanelLayout;
  memory: Record<string, WorkspaceMemory>; // keyed by panel id
  pinned: boolean;
  lastActive: number;
  created: number;
  currentPath?: string; // Current route path for navigation restore
}

export interface WorkspaceDockItem {
  workspaceId: string;
  moduleId: string;
  title: string;
  icon?: string;
  state: WorkspaceState;
  pinned: boolean;
  currentPath?: string;
}

/* ============================================================
   SIDEBAR SECTION COLLAPSE STATE
   ============================================================ */

export interface SidebarSectionState {
  // Keyed by `${moduleId}:${sectionTitle}` → true = collapsed
  [key: string]: boolean;
}

/* ============================================================
   WORKSPACE STORE STATE
   ============================================================ */

interface WorkspaceState_Store {
  // Active workspace
  activeWorkspaceId: string | null;

  // All workspaces
  workspaces: Record<string, Workspace>;

  // Panel layout for multi-panel mode
  panelLayout: PanelLayout;

  // Focus mode (dimming background when maximized)
  focusMode: boolean;

  // Sidebar auto-hide when maximized
  sidebarAutoHide: boolean;

  // Dock items (minimized + pinned workspaces)
  dockItems: WorkspaceDockItem[];

  // Recently used modules
  recentWorkspaces: string[];

  // Sidebar section collapse state (persisted)
  sidebarSections: SidebarSectionState;

  // ---- Actions ----

  // Create a new workspace
  createWorkspace: (moduleId: string, title: string, icon?: string) => string;

  // Remove a workspace
  removeWorkspace: (workspaceId: string) => void;

  // Set active workspace
  setActiveWorkspace: (workspaceId: string) => void;

  // Change workspace state (compact/expanded/maximized/minimized)
  setWorkspaceState: (workspaceId: string, state: WorkspaceState) => void;

  // Toggle workspace pin
  toggleWorkspacePin: (workspaceId: string) => void;

  // Minimize a workspace (sends to dock)
  minimizeWorkspace: (workspaceId: string) => void;

  // Restore a workspace from dock
  restoreWorkspace: (workspaceId: string) => void;

  // Maximize a workspace (full focus mode)
  maximizeWorkspace: (workspaceId: string) => void;

  // Expand a workspace from compact
  expandWorkspace: (workspaceId: string) => void;

  // Collapse a workspace to compact
  collapseWorkspace: (workspaceId: string) => void;

  // Set panel layout
  setPanelLayout: (layout: PanelLayout) => void;

  // Add panel to active workspace
  addPanel: (workspaceId: string, panel: Omit<WorkspacePanel, 'id'>) => void;

  // Remove panel from workspace
  removePanel: (workspaceId: string, panelId: string) => void;

  // Resize panel
  resizePanel: (workspaceId: string, panelId: string, width: number) => void;

  // Save workspace memory (scroll, filters, etc.)
  saveWorkspaceMemory: (workspaceId: string, panelId: string, memory: Partial<WorkspaceMemory>) => void;

  // Restore workspace memory
  getWorkspaceMemory: (workspaceId: string, panelId: string) => WorkspaceMemory | null;

  // Set focus mode
  setFocusMode: (enabled: boolean) => void;

  // Set sidebar auto-hide
  setSidebarAutoHide: (enabled: boolean) => void;

  // Get dock items
  getDockItems: () => WorkspaceDockItem[];

  // Get active workspace
  getActiveWorkspace: () => Workspace | null;

  // Find or create workspace for a module
  findOrCreateWorkspace: (moduleId: string, title: string, icon?: string) => string;

  // Find existing workspace for a module (read-only, no mutations)
  findWorkspaceByModule: (moduleId: string) => Workspace | null;

  // Create a workspace without setting it as active (for safe use during render)
  createWorkspaceSilent: (moduleId: string, title: string, icon?: string) => string;

  // Cleanup old workspaces (keep last N)
  cleanupWorkspaces: (keepCount: number) => void;

  // Toggle sidebar section collapsed state
  toggleSidebarSection: (moduleId: string, sectionTitle: string) => void;

  // Check if a sidebar section is collapsed
  isSidebarSectionCollapsed: (moduleId: string, sectionTitle: string) => boolean;

  // Expand a sidebar section
  expandSidebarSection: (moduleId: string, sectionTitle: string) => void;

  // Collapse a sidebar section
  collapseSidebarSection: (moduleId: string, sectionTitle: string) => void;

  // Save current path for workspace (for restore navigation)
  updateWorkspacePath: (workspaceId: string, path: string) => void;

  // Get module route for a given moduleId
  getModuleRoute: (moduleId: string) => string;

  // Get all active (non-minimized) workspace moduleIds
  getActiveModuleIds: () => string[];

  // Check if a module has an active workspace
  isModuleActive: (moduleId: string) => boolean;
}

/* ============================================================
   WORKSPACE STORE
   ============================================================ */

const generateId = () => `ws-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useWorkspaceStore = create<WorkspaceState_Store>()(
  persist(
    (set, get) => ({
      activeWorkspaceId: null,
      workspaces: {},
      panelLayout: 'single',
      focusMode: false,
      sidebarAutoHide: true,
      dockItems: [],
      recentWorkspaces: [],
      sidebarSections: {},

      createWorkspace: (moduleId, title, icon) => {
        const id = generateId();
        const now = Date.now();
        const workspace: Workspace = {
          id,
          moduleId,
          title,
          icon,
          state: 'expanded',
          panels: [{
            id: `${id}-main`,
            moduleId,
            title,
            icon,
            width: 100,
          }],
          layout: 'single',
          memory: {},
          pinned: false,
          lastActive: now,
          created: now,
        };
        set((state) => ({
          workspaces: { ...state.workspaces, [id]: workspace },
          activeWorkspaceId: id,
          recentWorkspaces: [id, ...state.recentWorkspaces.filter(wid => wid !== id)].slice(0, 10),
        }));
        return id;
      },

      removeWorkspace: (workspaceId) => {
        set((state) => {
          const { [workspaceId]: removed, ...rest } = state.workspaces;
          return {
            workspaces: rest,
            activeWorkspaceId: state.activeWorkspaceId === workspaceId
              ? Object.keys(rest)[0] || null
              : state.activeWorkspaceId,
            recentWorkspaces: state.recentWorkspaces.filter(wid => wid !== workspaceId),
            dockItems: state.dockItems.filter(d => d.workspaceId !== workspaceId),
          };
        });
      },

      setActiveWorkspace: (workspaceId) => {
        set((state) => {
          const workspace = state.workspaces[workspaceId];
          if (!workspace) return state;
          return {
            activeWorkspaceId: workspaceId,
            workspaces: {
              ...state.workspaces,
              [workspaceId]: { ...workspace, lastActive: Date.now() },
            },
            recentWorkspaces: [workspaceId, ...state.recentWorkspaces.filter(wid => wid !== workspaceId)].slice(0, 10),
          };
        });
      },

      setWorkspaceState: (workspaceId, newState) => {
        set((state) => {
          const workspace = state.workspaces[workspaceId];
          if (!workspace) return state;

          // Save previous state before minimizing
          const previousState = newState === 'minimized' ? workspace.state : workspace.previousState;

          const updated = { ...workspace, state: newState, previousState, lastActive: Date.now() };

          // Update dock items for minimized
          let dockItems = state.dockItems;
          if (newState === 'minimized') {
            const exists = dockItems.find(d => d.workspaceId === workspaceId);
            if (!exists) {
              dockItems = [...dockItems, {
                workspaceId,
                moduleId: workspace.moduleId,
                title: workspace.title,
                icon: workspace.icon,
                state: newState,
                pinned: workspace.pinned,
                currentPath: workspace.currentPath,
              }];
            } else {
              // Update existing dock item state
              dockItems = dockItems.map(d =>
                d.workspaceId === workspaceId
                  ? { ...d, state: newState, currentPath: workspace.currentPath }
                  : d
              );
            }
          } else {
            // Remove from dock when restored/expanded
            dockItems = dockItems.filter(d => d.workspaceId !== workspaceId || d.pinned);
            // Update pinned item state if it exists
            dockItems = dockItems.map(d =>
              d.workspaceId === workspaceId
                ? { ...d, state: newState }
                : d
            );
          }

          return {
            workspaces: { ...state.workspaces, [workspaceId]: updated },
            dockItems,
            focusMode: newState === 'maximized' && state.sidebarAutoHide,
          };
        });
      },

      toggleWorkspacePin: (workspaceId) => {
        set((state) => {
          const workspace = state.workspaces[workspaceId];
          if (!workspace) return state;
          const pinned = !workspace.pinned;
          return {
            workspaces: {
              ...state.workspaces,
              [workspaceId]: { ...workspace, pinned },
            },
            dockItems: pinned
              ? [...state.dockItems.filter(d => d.workspaceId !== workspaceId), {
                  workspaceId,
                  moduleId: workspace.moduleId,
                  title: workspace.title,
                  icon: workspace.icon,
                  state: workspace.state,
                  pinned: true,
                }]
              : state.dockItems.filter(d => !(d.workspaceId === workspaceId && d.pinned)),
          };
        });
      },

      minimizeWorkspace: (workspaceId) => {
        get().setWorkspaceState(workspaceId, 'minimized');
      },

      restoreWorkspace: (workspaceId) => {
        const workspace = get().workspaces[workspaceId];
        if (!workspace) return;
        // Restore to previous state if available, otherwise expanded
        const restoreState = workspace.previousState || 'expanded';
        get().setWorkspaceState(workspaceId, restoreState === 'minimized' ? 'expanded' : restoreState);
        get().setActiveWorkspace(workspaceId);
      },

      maximizeWorkspace: (workspaceId) => {
        get().setWorkspaceState(workspaceId, 'maximized');
      },

      expandWorkspace: (workspaceId) => {
        get().setWorkspaceState(workspaceId, 'expanded');
      },

      collapseWorkspace: (workspaceId) => {
        get().setWorkspaceState(workspaceId, 'compact');
      },

      setPanelLayout: (layout) => {
        set({ panelLayout: layout });
      },

      addPanel: (workspaceId, panel) => {
        set((state) => {
          const workspace = state.workspaces[workspaceId];
          if (!workspace) return state;
          const panelId = `${workspaceId}-${Date.now()}`;
          const newPanel: WorkspacePanel = { ...panel, id: panelId, width: 50 };
          const panels = [...workspace.panels, newPanel];
          // Redistribute widths
          const equalWidth = Math.floor(100 / panels.length);
          const updatedPanels = panels.map((p, i) => ({
            ...p,
            width: i === panels.length - 1 ? 100 - equalWidth * (panels.length - 1) : equalWidth,
          }));
          return {
            workspaces: {
              ...state.workspaces,
              [workspaceId]: {
                ...workspace,
                panels: updatedPanels,
                layout: panels.length === 1 ? 'single' : panels.length === 2 ? 'split-h' : 'triple',
              },
            },
          };
        });
      },

      removePanel: (workspaceId, panelId) => {
        set((state) => {
          const workspace = state.workspaces[workspaceId];
          if (!workspace) return state;
          const panels = workspace.panels.filter(p => p.id !== panelId);
          if (panels.length === 0) return state;
          const equalWidth = Math.floor(100 / panels.length);
          const updatedPanels = panels.map((p, i) => ({
            ...p,
            width: i === panels.length - 1 ? 100 - equalWidth * (panels.length - 1) : equalWidth,
          }));
          return {
            workspaces: {
              ...state.workspaces,
              [workspaceId]: {
                ...workspace,
                panels: updatedPanels,
                layout: panels.length === 1 ? 'single' : 'split-h',
              },
            },
          };
        });
      },

      resizePanel: (workspaceId, panelId, width) => {
        set((state) => {
          const workspace = state.workspaces[workspaceId];
          if (!workspace) return state;
          const panels = workspace.panels.map(p =>
            p.id === panelId ? { ...p, width } : p
          );
          return {
            workspaces: {
              ...state.workspaces,
              [workspaceId]: { ...workspace, panels },
            },
          };
        });
      },

      saveWorkspaceMemory: (workspaceId, panelId, memory) => {
        set((state) => {
          const workspace = state.workspaces[workspaceId];
          if (!workspace) return state;
          const existing = workspace.memory[panelId] || {
            scrollPosition: 0,
            filters: {},
            lastActive: Date.now(),
          };
          return {
            workspaces: {
              ...state.workspaces,
              [workspaceId]: {
                ...workspace,
                memory: {
                  ...workspace.memory,
                  [panelId]: { ...existing, ...memory, lastActive: Date.now() },
                },
              },
            },
          };
        });
      },

      getWorkspaceMemory: (workspaceId, panelId) => {
        const workspace = get().workspaces[workspaceId];
        return workspace?.memory[panelId] || null;
      },

      setFocusMode: (enabled) => set({ focusMode: enabled }),

      setSidebarAutoHide: (enabled) => set({ sidebarAutoHide: enabled }),

      getDockItems: () => {
        const state = get();
        return state.dockItems;
      },

      getActiveWorkspace: () => {
        const state = get();
        return state.activeWorkspaceId ? state.workspaces[state.activeWorkspaceId] || null : null;
      },

      findOrCreateWorkspace: (moduleId, title, icon) => {
        const state = get();
        // Find existing workspace for this module
        const existing = Object.values(state.workspaces).find(w => w.moduleId === moduleId);
        if (existing) {
          // If minimized, keep it minimized (don't auto-restore) —
          // the caller (dock click, tile click) handles navigation.
          // Just make it active in the store.
          get().setActiveWorkspace(existing.id);
          return existing.id;
        }
        return get().createWorkspace(moduleId, title, icon);
      },

      findWorkspaceByModule: (moduleId) => {
        const state = get();
        return Object.values(state.workspaces).find(w => w.moduleId === moduleId) || null;
      },

      createWorkspaceSilent: (moduleId, title, icon) => {
        const id = generateId();
        const now = Date.now();
        const workspace: Workspace = {
          id,
          moduleId,
          title,
          icon,
          state: 'expanded',
          panels: [{
            id: `${id}-main`,
            moduleId,
            title,
            icon,
            width: 100,
          }],
          layout: 'single',
          memory: {},
          pinned: false,
          lastActive: now,
          created: now,
        };
        // Only add to workspaces — do NOT set activeWorkspaceId or update recentWorkspaces
        // Those side effects will be handled by the caller (WorkspaceProvider) in a useEffect.
        set((state) => ({
          workspaces: { ...state.workspaces, [id]: workspace },
        }));
        return id;
      },

      cleanupWorkspaces: (keepCount) => {
        set((state) => {
          const entries = Object.values(state.workspaces)
            .sort((a, b) => b.lastActive - a.lastActive);
          const toKeep = entries.slice(0, keepCount);
          const keepIds = new Set(toKeep.map(w => w.id));
          const filtered: Record<string, Workspace> = {};
          toKeep.forEach(w => { filtered[w.id] = w; });
          return {
            workspaces: filtered,
            dockItems: state.dockItems.filter(d => keepIds.has(d.workspaceId)),
            recentWorkspaces: state.recentWorkspaces.filter(wid => keepIds.has(wid)),
            activeWorkspaceId: state.activeWorkspaceId && keepIds.has(state.activeWorkspaceId)
              ? state.activeWorkspaceId
              : toKeep[0]?.id || null,
          };
        });
      },

      toggleSidebarSection: (moduleId, sectionTitle) => {
        const key = `${moduleId}:${sectionTitle}`;
        set((state) => ({
          sidebarSections: {
            ...state.sidebarSections,
            [key]: !state.sidebarSections[key],
          },
        }));
      },

      isSidebarSectionCollapsed: (moduleId, sectionTitle) => {
        const key = `${moduleId}:${sectionTitle}`;
        return get().sidebarSections[key] ?? false;
      },

      expandSidebarSection: (moduleId, sectionTitle) => {
        const key = `${moduleId}:${sectionTitle}`;
        set((state) => ({
          sidebarSections: {
            ...state.sidebarSections,
            [key]: false,
          },
        }));
      },

      collapseSidebarSection: (moduleId, sectionTitle) => {
        const key = `${moduleId}:${sectionTitle}`;
        set((state) => ({
          sidebarSections: {
            ...state.sidebarSections,
            [key]: true,
          },
        }));
      },

      updateWorkspacePath: (workspaceId, path) => {
        set((state) => {
          const workspace = state.workspaces[workspaceId];
          if (!workspace) return state;
          return {
            workspaces: {
              ...state.workspaces,
              [workspaceId]: { ...workspace, currentPath: path },
            },
            dockItems: state.dockItems.map(d =>
              d.workspaceId === workspaceId ? { ...d, currentPath: path } : d
            ),
          };
        });
      },

      getModuleRoute: (moduleId) => {
        const routes: Record<string, string> = {
          erp: '/erp',
          crm: '/crm',
          finance: '/finance',
          marketing: '/marketing',
          analytics: '/analytics',
          automation: '/automation',
          retention: '/retention',
          settings: '/settings',
        };
        return routes[moduleId] || '/';
      },

      getActiveModuleIds: () => {
        const state = get();
        return Object.values(state.workspaces)
          .filter(w => w.state !== 'minimized')
          .map(w => w.moduleId);
      },

      isModuleActive: (moduleId) => {
        const state = get();
        return Object.values(state.workspaces).some(
          w => w.moduleId === moduleId
        );
      },
    }),
    {
      name: 'nueone-workspace-store',
      partialize: (state) => ({
        workspaces: state.workspaces,
        activeWorkspaceId: state.activeWorkspaceId,
        panelLayout: state.panelLayout,
        sidebarAutoHide: state.sidebarAutoHide,
        recentWorkspaces: state.recentWorkspaces,
        dockItems: state.dockItems,
        sidebarSections: state.sidebarSections,
      }),
    }
  )
);

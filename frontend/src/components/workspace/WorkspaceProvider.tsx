'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
  type ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useWorkspaceStore, type WorkspaceState } from '@/stores/useWorkspaceStore';

/* ============================================================
   TYPES
   ============================================================ */

interface WorkspaceContextValue {
  workspaceId: string;
  state: WorkspaceState;
  moduleId: string;
  controls: {
    expand: () => void;
    collapse: () => void;
    minimize: () => void;
    maximize: () => void;
    restore: () => void;
    togglePin: () => void;
  };
  isMaximized: boolean;
  isCompact: boolean;
  isMinimized: boolean;
}

interface WorkspaceProviderProps {
  moduleId: string;
  title: string;
  icon?: string;
  children: ReactNode;
}

/* ============================================================
   CONTEXT
   ============================================================ */

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

/* ============================================================
   HOOK
   ============================================================ */

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    // Return a safe default instead of throwing — prevents SSR/build crashes
    return {
      workspaceId: '',
      state: 'expanded',
      moduleId: '',
      controls: {
        expand: () => {},
        collapse: () => {},
        minimize: () => {},
        maximize: () => {},
        restore: () => {},
        togglePin: () => {},
      },
      isMaximized: false,
      isCompact: false,
      isMinimized: false,
    };
  }
  return ctx;
}

/** Returns true if the useWorkspace hook is inside a WorkspaceProvider */
export function useHasWorkspace(): boolean {
  return useContext(WorkspaceContext) !== null;
}

/* ============================================================
   PROVIDER
   ============================================================ */

export function WorkspaceProvider({
  moduleId,
  title,
  icon,
  children,
}: WorkspaceProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRestoredRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  // Resolve workspace ID without triggering store mutations that cause
  // "Cannot update a component while rendering a different component" errors.
  //
  // We first try a pure read (findWorkspaceByModule). If found, we use that ID
  // immediately. If NOT found, we defer workspace creation to useEffect to
  // avoid mutating the Zustand store during the render phase — which would
  // trigger re-renders in other components that subscribe to the store
  // (e.g. ModuleTile subscribing to `workspaces`).
  const existingWorkspace = useWorkspaceStore.getState().findWorkspaceByModule(moduleId);
  const [workspaceId, setWorkspaceId] = useState<string | null>(
    existingWorkspace?.id ?? null
  );

  // Track whether we've registered this workspace as active
  const didSetActive = useRef(false);

  // If no existing workspace was found during render, create one in useEffect
  // to avoid the "Cannot update a component while rendering a different component"
  // React error. All store mutations must happen outside the render phase.
  useEffect(() => {
    if (workspaceId) {
      // Workspace already exists — just ensure it's set as active
      if (!didSetActive.current) {
        didSetActive.current = true;
        useWorkspaceStore.getState().setActiveWorkspace(workspaceId);
      }
      return;
    }
    // No workspace yet — create one silently and set it as active
    const store = useWorkspaceStore.getState();
    const id = store.createWorkspaceSilent(moduleId, title, icon);
    setWorkspaceId(id);
    didSetActive.current = true;
    useWorkspaceStore.getState().setActiveWorkspace(id);
  }, [workspaceId, moduleId, title, icon]);

  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const expandWorkspace = useWorkspaceStore((s) => s.expandWorkspace);
  const collapseWorkspace = useWorkspaceStore((s) => s.collapseWorkspace);
  const minimizeWorkspace = useWorkspaceStore((s) => s.minimizeWorkspace);
  const maximizeWorkspace = useWorkspaceStore((s) => s.maximizeWorkspace);
  const restoreWorkspace = useWorkspaceStore((s) => s.restoreWorkspace);
  const toggleWorkspacePin = useWorkspaceStore((s) => s.toggleWorkspacePin);
  const saveWorkspaceMemory = useWorkspaceStore((s) => s.saveWorkspaceMemory);
  const updateWorkspacePath = useWorkspaceStore((s) => s.updateWorkspacePath);

  const workspace = workspaceId ? workspaces[workspaceId] : null;
  const currentState: WorkspaceState = workspace?.state ?? 'expanded';

  // Track current path for workspace (for restore navigation)
  useEffect(() => {
    if (workspaceId && pathname) {
      updateWorkspacePath(workspaceId, pathname);
    }
  }, [workspaceId, pathname, updateWorkspacePath]);

  // Handle minimize with navigation to home
  const handleMinimize = useCallback(() => {
    if (!workspaceId) return;
    minimizeWorkspace(workspaceId);
    // Navigate to home so user can start another module
    router.push('/');
  }, [workspaceId, minimizeWorkspace, router]);

  // Controls — only used when workspace exists (guarded by if(!workspace) below)
  const controls = useMemo(
    () => ({
      expand: () => { if (workspaceId) expandWorkspace(workspaceId); },
      collapse: () => { if (workspaceId) collapseWorkspace(workspaceId); },
      minimize: handleMinimize,
      maximize: () => { if (workspaceId) maximizeWorkspace(workspaceId); },
      restore: () => { if (workspaceId) restoreWorkspace(workspaceId); },
      togglePin: () => { if (workspaceId) toggleWorkspacePin(workspaceId); },
    }),
    [workspaceId, expandWorkspace, collapseWorkspace, handleMinimize, maximizeWorkspace, restoreWorkspace, toggleWorkspacePin]
  );

  // Note: If moduleId changes dynamically, the parent should key this provider
  // with key={moduleId} to force a remount, which will re-initialize the workspace.

  // Save scroll position on unmount
  useEffect(() => {
    const ref = containerRef;
    const wsId = workspaceId;
    return () => {
      if (ref.current && wsId) {
        const ws = useWorkspaceStore.getState().workspaces[wsId];
        const mainPanel = ws?.panels?.[0];
        if (mainPanel) {
          saveWorkspaceMemory(wsId, mainPanel.id, {
            scrollPosition: ref.current.scrollTop,
          });
        }
      }
    };
  }, [workspaceId, saveWorkspaceMemory]);

  // Restore scroll position when workspace changes to expanded
  useEffect(() => {
    if (currentState === 'expanded' && workspace && !scrollRestoredRef.current && containerRef.current) {
      const mainPanel = workspace.panels[0];
      if (mainPanel) {
        const memory = useWorkspaceStore.getState().getWorkspaceMemory(workspace.id, mainPanel.id);
        if (memory && memory.scrollPosition > 0) {
          scrollRestoredRef.current = true;
          requestAnimationFrame(() => {
            if (containerRef.current) {
              containerRef.current.scrollTop = memory.scrollPosition;
            }
          });
        }
      }
    }
  }, [currentState, workspace]);

  const contextValue = useMemo<WorkspaceContextValue>(
    () => ({
      workspaceId: workspaceId!,  // Non-null when workspace exists (we guard with if(!workspace) below)
      state: currentState,
      moduleId,
      controls,
      isMaximized: currentState === 'maximized',
      isCompact: currentState === 'compact',
      isMinimized: currentState === 'minimized',
    }),
    [workspaceId, currentState, moduleId, controls]
  );

  // If workspace hasn't been created yet (first render before useEffect fires),
  // return a minimal placeholder to avoid a blank flash while the workspace
  // is being created in the useEffect above.
  if (!workspace) {
    return (
      <div className="workspace-shell relative flex flex-col h-full" data-module={moduleId}>
        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
          Loading workspace…
        </div>
      </div>
    );
  }

  return (
    <WorkspaceContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        data-workspace={currentState}
        data-module={moduleId}
        className="workspace-shell relative flex flex-col h-full"
      >
        {children}
      </div>
    </WorkspaceContext.Provider>
  );
}

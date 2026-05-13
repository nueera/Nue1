import type { CrmRecord } from "../../core/types";

export interface CanvasComponent { id: string; type: string; label: string; props: Record<string, unknown>; children?: CanvasComponent[]; }

export interface CanvasTemplate { id: string; name: string; description: string; components: CanvasComponent[]; bindings: { componentId: string; field: string; source: string }[]; isPublished: boolean; createdAt: string; updatedAt: string; owner: string; }

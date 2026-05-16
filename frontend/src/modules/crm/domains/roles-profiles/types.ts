import type { CrmRecord } from "../../core/types";

export interface Role { id: string; name: string; parentId?: string; level: number; userCount: number; }

export interface Profile { id: string; name: string; description: string; isSystem: boolean; permissions: { module: string; create: boolean; read: boolean; update: boolean; delete: boolean }[]; fieldPermissions: { field: string; access: "hidden" | "readonly" | "read-write" }[]; }

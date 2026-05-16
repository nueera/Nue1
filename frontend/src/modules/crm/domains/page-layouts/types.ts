import type { CrmRecord } from "../../core/types";

export interface LayoutSection { id: string; name: string; columns: number; fields: { id: string; name: string; type: string; required: boolean; readonly: boolean; visible: boolean; }[]; }

export interface PageLayout { id: string; name: string; module: string; sections: LayoutSection[]; relatedLists: { module: string; label: string; fields: string[] }[]; isActive: boolean; createdAt: string; updatedAt: string; owner: string; }

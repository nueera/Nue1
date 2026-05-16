import type { CrmRecord } from "../../core/types";

export interface Note { id: string; content: string; parentId: string; parentType: string; parentName: string; visibility: "private" | "public" | "team"; attachments: { id: string; name: string; size: number; url: string }[]; createdAt: string; updatedAt: string; owner: string; }

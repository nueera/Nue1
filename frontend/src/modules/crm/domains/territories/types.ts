import type { CrmRecord } from "../../core/types";

export interface Territory { id: string; name: string; parentId?: string; managerId: string; managerName: string; members: { userId: string; userName: string; role: string }[]; rules: { field: string; operator: string; value: unknown }[]; accountCount: number; createdAt: string; updatedAt: string; }

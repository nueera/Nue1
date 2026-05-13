import type { CrmRecord } from "../../core/types";

export interface Widget { id: string; name: string; type: "metric" | "chart" | "list" | "custom"; config: Record<string, unknown>; dataSource: { type: string; module: string; query: Record<string, unknown> }; isActive: boolean; createdAt: string; updatedAt: string; owner: string; }

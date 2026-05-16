import type { CrmRecord } from "../../core/types";

export type PortalStatus = "draft" | "published" | "unpublished";

export interface Portal { id: string; name: string; domain?: string; status: PortalStatus; modules: string[]; theme: { primary: string; logo?: string }; users: { userId: string; role: string }[]; createdAt: string; updatedAt: string; owner: string; }

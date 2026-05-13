import type { CrmRecord } from "../../core/types";

export type TeamRole = "lead" | "member" | "viewer";

export interface Team { id: string; name: string; description: string; members: { userId: string; userName: string; role: TeamRole; joinedAt: string }[]; sharingRules: { id: string; fromModule: string; accessLevel: "read" | "read-write" }[]; createdAt: string; updatedAt: string; owner: string; }

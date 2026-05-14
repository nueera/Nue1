// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type SandboxStatus = "creating" | "ready" | "syncing" | "error";

export interface Sandbox { id: string; name: string; status: SandboxStatus; lastSyncAt?: string; changes: { type: string; module: string; count: number }[]; createdAt: string; }

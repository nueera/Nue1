import type { CrmRecord } from "../../core/types";

export type ImportStatus = "uploading" | "mapping" | "previewing" | "importing" | "completed" | "failed";

export interface ImportJob { id: string; module: string; fileName: string; status: ImportStatus; totalRows: number; imported: number; skipped: number; errors: number; mapping: Record<string, string>; createdAt: string; }

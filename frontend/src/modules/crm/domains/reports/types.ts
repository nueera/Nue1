// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type ReportType = "tabular" | "summary" | "matrix" | "pivot";

export interface Report { id: string; name: string; type: ReportType; module: string; columns: { field: string; label: string; aggregate?: "sum" | "avg" | "count" | "min" | "max" }[]; filters: { field: string; operator: string; value: unknown }[]; groupBy?: string[]; sortBy?: { field: string; order: "asc" | "desc" }; chart?: { type: string; xAxis: string; yAxis: string }; schedule?: { frequency: string; recipients: string[] }; createdAt: string; updatedAt: string; owner: string; }

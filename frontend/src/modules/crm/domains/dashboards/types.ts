// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type WidgetType = "metric" | "chart" | "list" | "funnel" | "pipeline";

export interface DashboardWidget { id: string; type: WidgetType; title: string; config: Record<string, unknown>; position: { x: number; y: number; w: number; h: number }; }

export interface Dashboard { id: string; name: string; description: string; widgets: DashboardWidget[]; filters: { id: string; field: string; label: string; type: string; }[]; isDefault: boolean; createdAt: string; updatedAt: string; owner: string; }

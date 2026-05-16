import type { CrmRecord } from "../../core/types";

export interface QuickCreateConfig { module: string; fields: { name: string; label: string; type: string; required: boolean; options?: { label: string; value: string }[] }[]; }

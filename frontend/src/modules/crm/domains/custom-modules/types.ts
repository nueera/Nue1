import type { CrmRecord } from "../../core/types";

export interface CustomField { id: string; name: string; label: string; type: "text" | "number" | "date" | "select" | "multiselect" | "lookup" | "boolean" | "textarea"; required: boolean; options?: { label: string; value: string }[]; }

export interface CustomModule { id: string; name: string; singularLabel: string; pluralLabel: string; icon: string; fields: CustomField[]; recordsCount: number; createdAt: string; updatedAt: string; owner: string; }

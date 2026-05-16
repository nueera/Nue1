import type { Workflow } from "./types";

export function getWorkflowLabel(item: Workflow): string { return item.name || item.id; }
import type { PipelineSnapshot } from "./types";

export function getPipelineSnapshotLabel(item: PipelineSnapshot): string { return item.date || item.id; }
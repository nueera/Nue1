import type { PipelineSnapshot } from "./types";

export function getPipelineSnapshotLabel(item: PipelineSnapshot): string { return item.name || item.id; }
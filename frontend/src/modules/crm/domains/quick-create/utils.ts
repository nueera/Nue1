// @ts-nocheck
import type { QuickCreateConfig } from "./types";

export function getQuickCreateConfigLabel(item: QuickCreateConfig): string { return item.name || item.id; }
// @ts-nocheck
import type { Portal } from "./types";

export function getPortalLabel(item: Portal): string { return item.name || item.id; }
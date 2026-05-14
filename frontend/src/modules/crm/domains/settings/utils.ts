// @ts-nocheck
import type { CRMSettings } from "./types";

export function getCRMSettingsLabel(item: CRMSettings): string { return item.name || item.id; }
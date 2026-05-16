import type { CRMSettings } from "./types";

export function getCRMSettingsLabel(item: CRMSettings): string { return item.general.companyName; }

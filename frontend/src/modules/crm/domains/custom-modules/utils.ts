import type { CustomModule } from "./types";

export function getCustomModuleLabel(item: CustomModule): string { return item.name || item.id; }
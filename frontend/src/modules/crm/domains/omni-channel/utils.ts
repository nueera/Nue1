// @ts-nocheck
import type { OmniChannelConfig } from "./types";

export function getOmniChannelConfigLabel(item: OmniChannelConfig): string { return item.name || item.id; }
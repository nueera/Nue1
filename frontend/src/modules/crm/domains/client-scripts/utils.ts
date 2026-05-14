// @ts-nocheck
import type { ClientScript } from "./types";

export function getClientScriptLabel(item: ClientScript): string { return item.name || item.id; }
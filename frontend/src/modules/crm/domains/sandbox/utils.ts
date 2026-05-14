// @ts-nocheck
import type { Sandbox } from "./types";

export function getSandboxLabel(item: Sandbox): string { return item.name || item.id; }
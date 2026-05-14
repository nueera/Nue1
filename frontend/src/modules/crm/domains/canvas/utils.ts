// @ts-nocheck
import type { CanvasTemplate } from "./types";

export function getCanvasTemplateLabel(item: CanvasTemplate): string { return item.name || item.id; }
import { crmKeys } from "../../core/query-keys";
export const canvasKeys = {
  ...crmKeys.canvas,
  list: (filters: Record<string, unknown>) => crmKeys.canvas.templates(filters),
};

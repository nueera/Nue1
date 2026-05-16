import { crmKeys } from "../../core/query-keys";
export const attachmentsKeys = {
  ...crmKeys.attachments,
  list: (parentId: string) => crmKeys.attachments.byParent(parentId),
};

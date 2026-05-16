import { crmKeys } from "../../core/query-keys";
export const omniChannelKeys = {
  ...crmKeys.omniChannel,
  list: (filters: Record<string, unknown>) => crmKeys.omniChannel.queues(filters),
  detail: (id: string) => crmKeys.omniChannel.config(),
};

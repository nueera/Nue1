// @ts-nocheck
import type { Item, ItemType, ItemStatus } from './types';
import { ITEM_TYPES, ITEM_STATUSES } from './constants';

export function getItemTypeLabel(type: ItemType): string {
  return ITEM_TYPES.find(t => t.value === type)?.label ?? type;
}

export function getItemStatusLabel(status: ItemStatus): string {
  return ITEM_STATUSES.find(s => s.value === status)?.label ?? status;
}

export function getItemStatusColor(status: ItemStatus): string {
  const map: Record<ItemStatus, string> = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    inactive: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
    archived: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  };
  return map[status] ?? '';
}

export function isLowStock(item: Item): boolean {
  return item.trackInventory && item.stockOnHand <= item.reorderPoint;
}

export function computeItemMargin(item: Item): number {
  if (item.cost.amount === 0) return 100;
  return ((item.rate.amount - item.cost.amount) / item.rate.amount) * 100;
}

// @ts-nocheck
import type { ItemType, ItemStatus } from './types';

export const ITEM_TYPES: { value: ItemType; label: string }[] = [
  { value: 'inventory', label: 'Inventory' },
  { value: 'service', label: 'Service' },
  { value: 'non-inventory', label: 'Non-Inventory' },
  { value: 'bundle', label: 'Bundle' },
];

export const ITEM_STATUSES: { value: ItemStatus; label: string; color: string }[] = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'inactive', label: 'Inactive', color: 'gray' },
  { value: 'archived', label: 'Archived', color: 'amber' },
];

export const ITEM_TABLE_COLUMNS = [
  { key: 'name', label: 'Item', visible: true, sortable: true },
  { key: 'sku', label: 'SKU', visible: true, sortable: true },
  { key: 'type', label: 'Type', visible: true, sortable: true },
  { key: 'category', label: 'Category', visible: true, sortable: true },
  { key: 'rate', label: 'Rate', visible: true, sortable: true },
  { key: 'stockOnHand', label: 'Stock', visible: true, sortable: true },
  { key: 'status', label: 'Status', visible: true, sortable: true },
] as const;

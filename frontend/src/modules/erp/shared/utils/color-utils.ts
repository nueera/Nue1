import { STATUS_COLORS, type StatusKey } from '../../core/utils/constants';

export function getStatusColor(status: string): string {
  return STATUS_COLORS[status as StatusKey] || 'bg-zinc-500/10 text-zinc-500 border-zinc-500/15';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

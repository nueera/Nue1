export interface DateRange {
  from: Date;
  to: Date;
  label: string;
}

export function getPresetDateRanges(): DateRange[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return [
    { from: today, to: today, label: 'Today' },
    { from: new Date(today.getTime() - 86400000), to: new Date(today.getTime() - 86400000), label: 'Yesterday' },
    { from: new Date(today.getTime() - today.getDay() * 86400000), to: today, label: 'This Week' },
    { from: new Date(today.getFullYear(), today.getMonth(), 1), to: today, label: 'This Month' },
    { from: new Date(today.getFullYear(), today.getMonth() - 1, 1), to: new Date(today.getFullYear(), today.getMonth(), 0), label: 'Last Month' },
    { from: new Date(today.getFullYear(), 0, 1), to: today, label: 'This Year' },
  ];
}

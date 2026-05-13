export interface SelectOption {
  label: string;
  value: string;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  key: string;
  value: string;
  label?: string;
}

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface Tab {
  value: string;
  label: string;
  content?: React.ReactNode;
}

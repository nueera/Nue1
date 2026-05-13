/**
 * Aggregate data by a specified key and calculate sums/counts.
 */
export function aggregateData<T extends Record<string, unknown>>(
  data: T[],
  groupKey: keyof T,
  aggregateKeys: Array<keyof T>,
  operation: 'sum' | 'count' | 'avg' = 'sum',
): Array<Record<string, unknown>> {
  const grouped = new Map<string, T[]>();

  for (const item of data) {
    const key = String(item[groupKey]);
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(item);
  }

  const result: Array<Record<string, unknown>> = [];

  for (const [key, items] of grouped) {
    const row: Record<string, unknown> = { [groupKey as string]: key, count: items.length };

    for (const aggKey of aggregateKeys) {
      const values = items.map((item) => Number(item[aggKey]) || 0);

      switch (operation) {
        case 'sum':
          row[aggKey as string] = values.reduce((a, b) => a + b, 0);
          break;
        case 'count':
          row[aggKey as string] = values.filter((v) => v !== 0).length;
          break;
        case 'avg':
          row[aggKey as string] = values.length > 0
            ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100
            : 0;
          break;
      }
    }

    result.push(row);
  }

  return result;
}

/**
 * Calculate a percentage with a specified number of decimal places.
 */
export function calcPercentage(part: number, total: number, decimals: number = 1): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 100 * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Build a query parameter object from report configuration.
 */
export function buildReportQuery(config: {
  reportId: string;
  dateRange?: { start: string; end: string };
  filters?: Array<{ field: string; operator: string; value: unknown }>;
  groupBy?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}): Record<string, unknown> {
  const query: Record<string, unknown> = {
    reportId: config.reportId,
  };

  if (config.dateRange) {
    query.startDate = config.dateRange.start;
    query.endDate = config.dateRange.end;
  }

  if (config.filters && config.filters.length > 0) {
    query.filters = config.filters;
  }

  if (config.groupBy && config.groupBy.length > 0) {
    query.groupBy = config.groupBy.join(',');
  }

  if (config.sortBy) {
    query.sortBy = config.sortBy;
    query.sortOrder = config.sortOrder || 'asc';
  }

  if (config.page) {
    query.page = config.page;
    query.pageSize = config.pageSize || 50;
  }

  return query;
}

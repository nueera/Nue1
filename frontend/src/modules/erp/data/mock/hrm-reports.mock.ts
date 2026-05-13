export interface ReportConfig {
  id: string;
  name: string;
  category: string;
  description: string;
  parameters: string[];
  chartType: 'bar' | 'line' | 'pie' | 'table' | 'area' | 'mixed';
}

export interface ReportData {
  id: string;
  reportId: string;
  generatedAt: string;
  data: Record<string, unknown>;
  summary: {
    title: string;
    keyMetrics: { label: string; value: string | number }[];
  };
}

export const reportConfigs: ReportConfig[] = [
  {
    id: 'RPT001',
    name: 'Employee Analytics',
    category: 'Workforce',
    description: 'Comprehensive overview of workforce demographics, distribution by department, tenure analysis, and headcount trends.',
    parameters: ['department', 'dateRange', 'status'],
    chartType: 'mixed',
  },
  {
    id: 'RPT002',
    name: 'Leave Balance Report',
    category: 'Leave',
    description: 'Individual and team-level leave balance summary showing accrued, used, and remaining leaves by type.',
    parameters: ['department', 'leaveType', 'year'],
    chartType: 'bar',
  },
  {
    id: 'RPT003',
    name: 'Leave Summary Report',
    category: 'Leave',
    description: 'Aggregate leave utilization report showing trends, patterns, and departmental comparisons over time.',
    parameters: ['department', 'dateRange', 'leaveType'],
    chartType: 'line',
  },
  {
    id: 'RPT004',
    name: 'Advance Summary',
    category: 'Finance',
    description: 'Summary of employee advances including outstanding amounts, settlement status, and aging analysis.',
    parameters: ['department', 'status', 'dateRange'],
    chartType: 'table',
  },
  {
    id: 'RPT005',
    name: 'Employee Birthdays',
    category: 'Workforce',
    description: 'Monthly listing of employee birthdays for celebration planning and employee engagement activities.',
    parameters: ['month', 'department'],
    chartType: 'table',
  },
  {
    id: 'RPT006',
    name: 'Daily Work Summary',
    category: 'Attendance',
    description: 'Daily attendance and work hours summary including check-in/out times, overtime, and absence tracking.',
    parameters: ['date', 'department'],
    chartType: 'table',
  },
  {
    id: 'RPT007',
    name: 'Expense Report',
    category: 'Finance',
    description: 'Detailed breakdown of employee expense claims by category, approval status, and amount trends.',
    parameters: ['department', 'category', 'dateRange', 'status'],
    chartType: 'pie',
  },
  {
    id: 'RPT008',
    name: 'Custom Report Builder',
    category: 'Custom',
    description: 'Build your own report by selecting data sources, filters, grouping, and visualization options.',
    parameters: ['dataSource', 'filters', 'groupBy', 'chartType'],
    chartType: 'mixed',
  },
];

export const reportDataSets: ReportData[] = [
  {
    id: 'RD001',
    reportId: 'RPT001',
    generatedAt: '2025-03-01T10:30:00Z',
    data: {
      totalEmployees: 25,
      activeEmployees: 22,
      departments: [
        { name: 'Engineering', count: 7, percentage: 28 },
        { name: 'Marketing', count: 4, percentage: 16 },
        { name: 'Sales', count: 4, percentage: 16 },
        { name: 'Finance', count: 3, percentage: 12 },
        { name: 'HR', count: 3, percentage: 12 },
        { name: 'Operations', count: 4, percentage: 16 },
      ],
      genderDistribution: { male: 52, female: 44, other: 4 },
      averageTenure: '2.8 years',
      headcountTrend: [
        { month: 'Sep 2024', count: 22 },
        { month: 'Oct 2024', count: 23 },
        { month: 'Nov 2024', count: 23 },
        { month: 'Dec 2024', count: 24 },
        { month: 'Jan 2025', count: 25 },
        { month: 'Feb 2025', count: 25 },
      ],
    },
    summary: {
      title: 'Employee Analytics Summary',
      keyMetrics: [
        { label: 'Total Employees', value: 25 },
        { label: 'Active', value: 22 },
        { label: 'On Leave', value: 2 },
        { label: 'Inactive', value: 2 },
        { label: 'Avg Tenure', value: '2.8 years' },
      ],
    },
  },
  {
    id: 'RD002',
    reportId: 'RPT002',
    generatedAt: '2025-03-01T11:00:00Z',
    data: {
      year: 2025,
      leaveBalances: [
        { department: 'Engineering', casual: { total: 70, used: 18, remaining: 52 }, sick: { total: 35, used: 5, remaining: 30 }, earned: { total: 70, used: 10, remaining: 60 } },
        { department: 'Marketing', casual: { total: 40, used: 12, remaining: 28 }, sick: { total: 20, used: 4, remaining: 16 }, earned: { total: 40, used: 8, remaining: 32 } },
        { department: 'Sales', casual: { total: 40, used: 15, remaining: 25 }, sick: { total: 20, used: 3, remaining: 17 }, earned: { total: 40, used: 12, remaining: 28 } },
        { department: 'Finance', casual: { total: 30, used: 6, remaining: 24 }, sick: { total: 15, used: 2, remaining: 13 }, earned: { total: 30, used: 4, remaining: 26 } },
        { department: 'HR', casual: { total: 30, used: 8, remaining: 22 }, sick: { total: 15, used: 3, remaining: 12 }, earned: { total: 30, used: 5, remaining: 25 } },
        { department: 'Operations', casual: { total: 40, used: 10, remaining: 30 }, sick: { total: 20, used: 6, remaining: 14 }, earned: { total: 40, used: 7, remaining: 33 } },
      ],
    },
    summary: {
      title: 'Leave Balance Summary - 2025',
      keyMetrics: [
        { label: 'Total Casual Leave', value: '250' },
        { label: 'Casual Used', value: '69 (28%)' },
        { label: 'Total Sick Leave', value: '125' },
        { label: 'Sick Used', value: '23 (18%)' },
        { label: 'Total Earned Leave', value: '250' },
      ],
    },
  },
  {
    id: 'RD003',
    reportId: 'RPT004',
    generatedAt: '2025-03-01T14:15:00Z',
    data: {
      totalAdvances: 8,
      totalOutstanding: 6300,
      advances: [
        { employee: 'James Wilson', amount: 2000, status: 'Disbursed', age: '45 days' },
        { employee: 'Carlos Mendez', amount: 3000, status: 'Approved', age: '12 days' },
        { employee: 'Raj Krishnan', amount: 800, status: 'Disbursed', age: '28 days' },
        { employee: 'Tyler Brooks', amount: 1000, status: 'Pending', age: '2 days' },
        { employee: 'Fatima Al-Hassan', amount: 500, status: 'Pending', age: '4 days' },
      ],
      agingAnalysis: {
        '0-30 days': 4500,
        '31-60 days': 2000,
        '61-90 days': 0,
        '90+ days': 0,
      },
    },
    summary: {
      title: 'Advance Summary',
      keyMetrics: [
        { label: 'Total Advances', value: 8 },
        { label: 'Outstanding Amount', value: '$6,300' },
        { label: 'Settled This Month', value: '$1,800' },
        { label: 'Pending Approval', value: 2 },
        { label: 'Overdue', value: 0 },
      ],
    },
  },
];

export function getReportConfigById(id: string): ReportConfig | undefined {
  return reportConfigs.find((r) => r.id === id);
}

export function getReportDataByReportId(reportId: string): ReportData[] {
  return reportDataSets.filter((rd) => rd.reportId === reportId);
}

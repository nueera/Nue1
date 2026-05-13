import type { ReportConfig, ReportData } from '../data/mock/hrm-reports.mock';
import {
  reportConfigs,
  reportDataSets,
  getReportConfigById,
  getReportDataByReportId,
} from '../data/mock/hrm-reports.mock';

export const reportsApi = {
  getReportTypes: async (): Promise<ReportConfig[]> => reportConfigs,
  getReport: async (id: string): Promise<ReportData[] | undefined> => {
    const config = getReportConfigById(id);
    if (!config) return undefined;
    return getReportDataByReportId(id);
  },
  getCustomReports: async (): Promise<ReportConfig[]> => {
    return reportConfigs.filter((r) => r.category === 'Custom');
  },
  createCustomReport: async (data: Partial<ReportConfig>): Promise<ReportConfig> => {
    const newReport: ReportConfig = {
      id: `RPT${String(reportConfigs.length + 1).padStart(3, '0')}`,
      name: data.name || 'Custom Report',
      category: 'Custom',
      description: data.description || '',
      parameters: data.parameters || [],
      chartType: data.chartType || 'mixed',
    };
    return newReport;
  },
  scheduleReport: async (reportId: string, schedule: { frequency: string; recipients: string[] }): Promise<{ reportId: string; schedule: { frequency: string; recipients: string[] }; scheduledAt: string }> => {
    return {
      reportId,
      schedule,
      scheduledAt: new Date().toISOString(),
    };
  },
};

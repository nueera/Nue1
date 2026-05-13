// ============================================================================
// Marketing Utils — Barrel Export
// ============================================================================

export { getCampaignTypeLabel, getCampaignStatusColor, isCampaignEditable, getCampaignChannelIcon } from './campaign-helpers';
export { calculateLeadScore, getScoreCategory, getScoreColor, getScoreBgColor, getScoreTrend, getScoreCategoryLabel } from './scoring';
export { evaluateSegmentRule, evaluateCondition, evaluateConditionGroup, getSegmentMemberCount } from './segmentation';
export { validateJourneyNodes, validateJourneyEdges, validateJourneyFlow, hasUnreachableNodes } from './journey-validation';
export type { JourneyValidationError } from './journey-validation';
export { calculateFirstTouch, calculateLastTouch, calculateMultiTouch, getAttributionWeight } from './attribution';
export type { AttributionResult } from './attribution';
export { calculateBudgetUtilization, calculateROI, calculateROAS, getBudgetStatus, getBudgetStatusColor, getBudgetStatusBgColor, getBudgetStatusLabel, formatCurrency } from './budget';
export type { BudgetInfo } from './budget';
export { buildSmartUrl, buildUtmParams, parseUtmParams, shortenUrl } from './url-builder';
export type { UtmParams } from './url-builder';
export { checkGdprCompliance, checkCanSpamCompliance, checkCaslCompliance, isConsentRequired } from './compliance';
export type { ComplianceCheckResult } from './compliance';
export { exportToCSV, exportToPDF, exportLeads, exportCampaignReport } from './export';

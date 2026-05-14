// @ts-nocheck
// ============================================================================
// Marketing Hooks — Barrel Export
// ============================================================================

export { useMarketingModule } from './use-marketing-module';
export { useLeads, useLead, useCreateLead, useUpdateLead, useDeleteLead, useConvertLead, useMergeLeads, useImportLeads, useLeadTimeline } from './use-leads';
export { useContacts, useContact, useCreateContact, useUpdateContact, useDeleteContact, useContactPreferences, useContactTimeline, useImportContacts } from './use-contacts';
export { useCampaigns, useCampaign, useCreateCampaign, useUpdateCampaign, useDeleteCampaign, useSendCampaign, useScheduleCampaign, useDuplicateCampaign, useCampaignAnalytics } from './use-campaigns';
export { useJourneys, useJourney, useCreateJourney, useUpdateJourney, useDeleteJourney, useActivateJourney, usePauseJourney, useJourneyAnalytics } from './use-journeys';
export { useJourneyBuilder } from './use-journey-builder';
export { useSignupForms, useSignupForm, useCreateForm, useUpdateForm, useDeleteForm, useFormSubmissions, usePublishForm } from './use-signup-forms';
export { useLandingPages, useLandingPage, useCreatePage, useUpdatePage, useDeletePage, usePublishPage, usePageAnalytics } from './use-landing-pages';
export { usePopups, usePopup, useCreatePopup, useUpdatePopup, useDeletePopup, usePopupAnalytics } from './use-popups';
export { useAudiences, useAudience, useCreateAudience, useUpdateAudience, useDeleteAudience, useAudienceMembers, useAudienceGrowth } from './use-audiences';
export { useSegments, useSegment, useCreateSegment, useUpdateSegment, useDeleteSegment, useSegmentPreview } from './use-segments';
export { useScoringRules, useScoringRule, useCreateRule, useUpdateRule, useDeleteRule, useRecalculateScores, useScoreLeaderboard } from './use-lead-scoring';
export { useStages, useStage, useCreateStage, useUpdateStage, useDeleteStage, useStageDistribution } from './use-lead-stages';
export { usePlans, usePlan, useCreatePlan, useUpdatePlan, useDeletePlan, usePlanActivities, usePlanBudget, usePlanROI } from './use-planner';
export { useStores, useStore, useConnectStore, useAbandonedCarts, usePurchaseFollowups, useProductCampaigns } from './use-ecommerce';
export { useAnalyticsOverview, useCampaignReport, useAttributionReport, useWebAnalytics, useJourneyReport, useABTestResults, useROIDashboard } from './use-analytics';
export { useWorkflows, useWorkflow, useCreateWorkflow, useUpdateWorkflow, useDeleteWorkflow, useActivateWorkflow, useWorkflowLogs } from './use-workflows';
export { useSmartUrls, useSmartUrl, useCreateSmartUrl, useGoals, useGoal, useCreateGoal, useConversions } from './use-web-tracking';
export { useCrmSyncConfig, useUpdateCrmSyncConfig, useFieldMappings, useSyncNow, useSyncLogs } from './use-crm-sync';
export { useMarketingSearch } from './use-marketing-search';
export { useCampaignScheduler } from './use-campaign-scheduler';
export { useConsents, useUpdateConsent, useGdprRequests, useHandleGdprRequest, useUnsubscribes } from './use-compliance';

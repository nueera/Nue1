// ============================================================================
// Scoring Constants
// Criteria types, default rules, and configuration for Lead Scoring domain
// ============================================================================

import type { ScoringCriteria } from '../types';

// ---------------------------------------------------------------------------
// Scoring Criteria Config
// ---------------------------------------------------------------------------

export const SCORING_CRITERIA_CONFIG: Record<ScoringCriteria, { label: string; description: string; icon: string }> = {
  email_engagement: { label: 'Email Engagement', description: 'Actions related to email interactions', icon: 'mail' },
  web_activity: { label: 'Web Activity', description: 'Website visits and page views', icon: 'globe' },
  social_engagement: { label: 'Social Engagement', description: 'Social media interactions', icon: 'share-2' },
  demographic_fit: { label: 'Demographic Fit', description: 'Company and role match', icon: 'users' },
  behavioral: { label: 'Behavioral', description: 'General behavioral patterns', icon: 'activity' },
  custom: { label: 'Custom', description: 'Custom scoring criteria', icon: 'settings' },
};

// ---------------------------------------------------------------------------
// Default Scoring Rules
// ---------------------------------------------------------------------------

export const DEFAULT_SCORING_RULES = [
  { criteria: 'email_engagement' as const, condition: 'Opens any email', points: 2, isPositive: true },
  { criteria: 'email_engagement' as const, condition: 'Clicks any email link', points: 5, isPositive: true },
  { criteria: 'email_engagement' as const, condition: 'Unsubscribes from email', points: -10, isPositive: false },
  { criteria: 'web_activity' as const, condition: 'Visits pricing page', points: 10, isPositive: true },
  { criteria: 'web_activity' as const, condition: 'Visits 5+ pages in session', points: 5, isPositive: true },
  { criteria: 'social_engagement' as const, condition: 'Engages with social post', points: 3, isPositive: true },
  { criteria: 'demographic_fit' as const, condition: 'Job title matches ICP', points: 15, isPositive: true },
  { criteria: 'demographic_fit' as const, condition: 'Company size matches ICP', points: 10, isPositive: true },
  { criteria: 'behavioral' as const, condition: 'Downloads content', points: 8, isPositive: true },
  { criteria: 'behavioral' as const, condition: 'Attends webinar', points: 15, isPositive: true },
  { criteria: 'behavioral' as const, condition: 'No activity in 30 days', points: -5, isPositive: false },
] as const;

// ---------------------------------------------------------------------------
// Score Decay Config
// ---------------------------------------------------------------------------

export const SCORE_DECAY_OPTIONS = [
  { value: 30, label: '30 Days' },
  { value: 60, label: '60 Days' },
  { value: 90, label: '90 Days' },
  { value: 180, label: '180 Days' },
  { value: 365, label: '1 Year' },
  { value: 0, label: 'No Decay' },
] as const;

// ---------------------------------------------------------------------------
// Score Range Labels
// ---------------------------------------------------------------------------

export const SCORE_RANGE_LABELS = {
  cold: { min: 0, max: 30, label: 'Cold', color: 'blue' },
  warm: { min: 31, max: 60, label: 'Warm', color: 'amber' },
  hot: { min: 61, max: 80, label: 'Hot', color: 'orange' },
  very_hot: { min: 81, max: 100, label: 'Very Hot', color: 'red' },
} as const;

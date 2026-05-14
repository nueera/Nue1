// @ts-nocheck
import type { Account, AccountTier, AccountIndustry } from "./types"; import { ACCOUNT_TIERS, ACCOUNT_INDUSTRIES } from "./constants";
export function getAccountTier(tier: AccountTier): string { return ACCOUNT_TIERS.find(t => t.value === tier)?.label ?? tier; }
export function computeAccountHealth(account: Account): number { let score = 50; if (account.annualRevenue > 1000000) score += 15; if (account.type === "customer") score += 10; if (account.tier === "enterprise") score += 10; return Math.min(100, Math.max(0, score)); }
export function formatIndustry(industry: AccountIndustry): string { return ACCOUNT_INDUSTRIES.find(i => i.value === industry)?.label ?? industry; }
export function isEnterpriseAccount(account: Account): boolean { return account.tier === "enterprise"; }
export function calculateAccountValue(account: Account): number { return account.annualRevenue * (account.healthScore / 100); }
export function getAccountTierColor(tier: AccountTier): string { return ACCOUNT_TIERS.find(t => t.value === tier)?.color ?? "text-status-neutral"; }
export function getHealthScoreColor(score: number): string { if (score >= 80) return "text-status-success"; if (score >= 60) return "text-status-warning"; if (score >= 40) return "text-status-elevated"; return "text-status-danger"; }
// ============================================================================
// CRM Mock Data — Deal Mock Data & Generator
// ============================================================================

import type { Deal, DealStage, DealForecastCategory } from '../../domains/deals/types';
import { COMPANY_PREFIXES, COMPANY_SUFFIXES, FIRST_NAMES, LAST_NAMES, CITIES, STATES, FAKER_SEED } from './faker-setup';

function seededRandom(seed: number): () => number { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
const rand = seededRandom(FAKER_SEED + 3);
const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const randInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

const stages: DealStage[] = ['qualification', 'needs-analysis', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];
const stageProbabilities: Record<DealStage, number> = { 'qualification': 10, 'needs-analysis': 25, 'proposal': 50, 'negotiation': 75, 'closed-won': 100, 'closed-lost': 0 };
const forecastCategories: DealForecastCategory[] = ['pipeline', 'best-case', 'committed', 'closed', 'omitted'];

function generateDeal(id: number): Deal {
  const stage = pick(stages);
  const accountName = `${pick(COMPANY_PREFIXES)} ${pick(COMPANY_SUFFIXES)}`;
  const contactName = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
  const amount = randInt(5, 500) * 1000;
  return {
    id: `deal-${id}`, dealName: `${accountName} - ${pick(['Enterprise License', 'Pro Plan', 'Custom Solution', 'Annual Contract', 'POC'])}`,
    amount, stage, probability: stageProbabilities[stage],
    closingDate: new Date(Date.now() + randInt(-30, 90) * 86400000).toISOString(),
    accountId: `account-${randInt(1, 30)}`, accountName,
    contactId: `contact-${randInt(1, 50)}`, contactName,
    pipelineId: 'default', pipelineName: 'Standard Pipeline',
    type: pick(['New Business', 'Renewal', 'Upsell', 'Downsell']),
    leadSource: pick(['web', 'referral', 'partner', 'cold-call']),
    nextStep: pick(['Follow up call', 'Send proposal', 'Schedule demo', 'Review contract']),
    description: `Deal with ${accountName}`,
    forecastCategory: pick(forecastCategories),
    lossReason: stage === 'closed-lost' ? pick(['price', 'competitor', 'no-budget', 'no-decision', 'timing']) : undefined,
    lossDescription: stage === 'closed-lost' ? 'Lost to competitor' : undefined,
    expectedRevenue: amount * (stageProbabilities[stage] / 100),
    campaignId: `campaign-${randInt(1, 5)}`, competitorIds: [],
    productLineItems: [], contactRoles: [],
    createdAt: new Date(Date.now() - randInt(1, 120) * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - randInt(0, 7) * 86400000).toISOString(),
    owner: `user-${randInt(1, 10)}`, modifiedBy: `user-${randInt(1, 10)}`,
  };
}

export const deals: Deal[] = Array.from({ length: 40 }, (_, i) => generateDeal(i + 1));
export function getDealById(id: string): Deal | undefined { return deals.find((d) => d.id === id); }
export function getDealsByStage(stage: DealStage): Deal[] { return deals.filter((d) => d.stage === stage); }
export function getDealsByAccount(accountId: string): Deal[] { return deals.filter((d) => d.accountId === accountId); }

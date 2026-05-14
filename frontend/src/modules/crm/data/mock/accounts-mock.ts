// @ts-nocheck
// ============================================================================
// CRM Mock Data — Account Mock Data & Generator
// ============================================================================

import type { Account, AccountType, AccountTier, AccountIndustry } from '../../domains/accounts/types';
import { COMPANY_PREFIXES, COMPANY_SUFFIXES, INDUSTRIES, CITIES, STATES, COUNTRIES, FAKER_SEED } from './faker-setup';

function seededRandom(seed: number): () => number { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
const rand = seededRandom(FAKER_SEED + 2);
const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const randInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

const types: AccountType[] = ['customer', 'prospect', 'partner', 'vendor', 'reseller', 'competitor'];
const tiers: AccountTier[] = ['enterprise', 'mid-market', 'smb', 'startup', 'freemium'];
const industries: AccountIndustry[] = ['technology', 'finance', 'healthcare', 'education', 'manufacturing', 'retail', 'media', 'energy', 'real-estate', 'transportation', 'other'];

function generateAccount(id: number): Account {
  const name = `${pick(COMPANY_PREFIXES)} ${pick(COMPANY_SUFFIXES)}`;
  return {
    id: `account-${id}`, name, type: pick(types), tier: pick(tiers),
    ownership: pick(['private', 'public', 'subsidiary', 'government', 'non-profit']),
    industry: pick(industries), annualRevenue: randInt(500000, 100000000),
    employees: randInt(10, 50000), phone: `+1 (${randInt(200, 999)}) ${randInt(200, 999)}-${randInt(1000, 9999)}`,
    fax: `+1 (${randInt(200, 999)}) ${randInt(200, 999)}-${randInt(1000, 9999)}`,
    website: `https://${name.toLowerCase().replace(/\s/g, '')}.com`,
    tickerSymbol: pick(['NYSE', 'NASDAQ', '']), description: `${name} - ${pick(INDUSTRIES)}`,
    billingStreet: `${randInt(100, 9999)} ${pick(['Main', 'Oak', 'Pine'])} St`,
    billingCity: pick(CITIES), billingState: pick(STATES), billingZip: `${randInt(10000, 99999)}`, billingCountry: pick(COUNTRIES),
    shippingStreet: `${randInt(100, 9999)} ${pick(['Main', 'Oak'])} St`,
    shippingCity: pick(CITIES), shippingState: pick(STATES), shippingZip: `${randInt(10000, 99999)}`, shippingCountry: pick(COUNTRIES),
    parentId: id > 5 ? `account-${randInt(1, 5)}` : '', parentName: id > 5 ? `${pick(COMPANY_PREFIXES)} ${pick(COMPANY_SUFFIXES)}` : '',
    rating: randInt(1, 5), healthScore: randInt(30, 100), territoryId: `territory-${randInt(1, 5)}`,
    sicCode: `${randInt(1000, 9999)}`,
    createdAt: new Date(Date.now() - randInt(1, 730) * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - randInt(0, 14) * 86400000).toISOString(),
    owner: `user-${randInt(1, 10)}`, modifiedBy: `user-${randInt(1, 10)}`,
  };
}

export const accounts: Account[] = Array.from({ length: 30 }, (_, i) => generateAccount(i + 1));
export function getAccountById(id: string): Account | undefined { return accounts.find((a) => a.id === id); }

// ============================================================================
// Attribution Utils — First touch, last touch, multi-touch attribution models
// ============================================================================

import type { AttributionTouchpoint, AttributionModel } from '../types';

export interface AttributionResult {
  campaignId: string;
  channel: string;
  weight: number;
  revenue: number;
  attributedRevenue: number;
}

export function calculateFirstTouch(
  touchpoints: AttributionTouchpoint[]
): AttributionResult[] {
  if (touchpoints.length === 0) return [];

  // Sort by touch date
  const sorted = [...touchpoints].sort(
    (a, b) => new Date(a.touchDate).getTime() - new Date(b.touchDate).getTime()
  );

  // First touch gets 100% credit
  const firstTouch = sorted[0];
  return sorted.map((tp) => ({
    campaignId: tp.campaignId,
    channel: tp.channel,
    weight: tp.campaignId === firstTouch.campaignId ? 1 : 0,
    revenue: tp.revenue,
    attributedRevenue: tp.campaignId === firstTouch.campaignId ? tp.revenue : 0,
  }));
}

export function calculateLastTouch(
  touchpoints: AttributionTouchpoint[]
): AttributionResult[] {
  if (touchpoints.length === 0) return [];

  // Sort by touch date
  const sorted = [...touchpoints].sort(
    (a, b) => new Date(a.touchDate).getTime() - new Date(b.touchDate).getTime()
  );

  // Last touch gets 100% credit
  const lastTouch = sorted[sorted.length - 1];
  return sorted.map((tp) => ({
    campaignId: tp.campaignId,
    channel: tp.channel,
    weight: tp.campaignId === lastTouch.campaignId ? 1 : 0,
    revenue: tp.revenue,
    attributedRevenue: tp.campaignId === lastTouch.campaignId ? tp.revenue : 0,
  }));
}

export function calculateMultiTouch(
  touchpoints: AttributionTouchpoint[],
  model: 'linear' | 'time_decay' | 'u_shaped' | 'w_shaped' = 'linear'
): AttributionResult[] {
  if (touchpoints.length === 0) return [];

  const n = touchpoints.length;
  const sorted = [...touchpoints].sort(
    (a, b) => new Date(a.touchDate).getTime() - new Date(b.touchDate).getTime()
  );

  let weights: number[];

  switch (model) {
    case 'linear':
      weights = sorted.map(() => 1 / n);
      break;

    case 'time_decay': {
      const halfLife = 7; // 7-day half-life
      weights = sorted.map((tp, i) => {
        const daysSinceFirst =
          (new Date(tp.touchDate).getTime() - new Date(sorted[0].touchDate).getTime()) /
          (1000 * 60 * 60 * 24);
        return Math.pow(0.5, daysSinceFirst / halfLife);
      });
      const totalWeight = weights.reduce((sum, w) => sum + w, 0);
      weights = weights.map((w) => w / totalWeight);
      break;
    }

    case 'u_shaped': {
      // 40% first, 40% last, 20% distributed among middle
      weights = sorted.map((_, i) => {
        if (n === 1) return 1;
        if (i === 0) return 0.4;
        if (i === n - 1) return 0.4;
        return 0.2 / Math.max(1, n - 2);
      });
      break;
    }

    case 'w_shaped': {
      // 30% first, 30% lead creation, 30% last, 10% distributed
      weights = sorted.map((_, i) => {
        if (n === 1) return 1;
        if (n === 2) return i === 0 ? 0.5 : 0.5;
        const midIndex = Math.floor(n / 2);
        if (i === 0) return 0.3;
        if (i === midIndex) return 0.3;
        if (i === n - 1) return 0.3;
        return 0.1 / Math.max(1, n - 3);
      });
      break;
    }

    default:
      weights = sorted.map(() => 1 / n);
  }

  return sorted.map((tp, i) => ({
    campaignId: tp.campaignId,
    channel: tp.channel,
    weight: weights[i],
    revenue: tp.revenue,
    attributedRevenue: tp.revenue * weights[i],
  }));
}

export function getAttributionWeight(model: AttributionModel): string {
  const descriptions: Record<AttributionModel, string> = {
    first_touch: 'Gives 100% credit to the first touchpoint',
    last_touch: 'Gives 100% credit to the last touchpoint',
    linear: 'Distributes credit equally across all touchpoints',
    time_decay: 'Gives more credit to touchpoints closer to conversion',
    u_shaped: '40% first touch, 40% last touch, 20% middle',
    w_shaped: '30% first, 30% lead creation, 30% last, 10% middle',
    custom: 'Custom weight distribution',
  };
  return descriptions[model];
}

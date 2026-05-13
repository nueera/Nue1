'use client';

import { Gift, CheckCircle2, Clock, DollarSign, TrendingUp } from 'lucide-react';
import type { Referral } from '../types';

interface ReferralBonusProps {
  referrals: Referral[];
  isLoading?: boolean;
}

interface BonusSummary {
  earned: number;
  pending: number;
  paid: number;
}

export function ReferralBonus({ referrals, isLoading }: ReferralBonusProps) {
  const summary: BonusSummary = referrals.reduce(
    (acc, ref) => {
      const bonus = ref.bonusAmount || 0;
      if (ref.status === 'hired') {
        if (ref.bonusPaid) {
          acc.paid += bonus;
        } else {
          acc.pending += bonus;
        }
        acc.earned += bonus;
      }
      return acc;
    },
    { earned: 0, pending: 0, paid: 0 }
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
              <div className="h-4 w-20 bg-white/10 rounded mb-2" />
              <div className="h-6 w-24 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const hiredReferrals = referrals.filter((r) => r.status === 'hired');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-module-erp" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Earned</span>
          </div>
          <p className="text-xl font-bold text-foreground">₹{summary.earned.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-amber-400" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Pending Payout</span>
          </div>
          <p className="text-xl font-bold text-amber-400">₹{summary.pending.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Paid Out</span>
          </div>
          <p className="text-xl font-bold text-emerald-400">₹{summary.paid.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Referral Details */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-white/10">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Referral Bonus Details</h4>
        </div>
        {hiredReferrals.length === 0 ? (
          <div className="py-8 text-center">
            <Gift className="h-8 w-8 text-muted-foreground/20 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No referral bonuses yet</p>
            <p className="text-[10px] text-muted-foreground/50">Refer candidates who get hired to earn bonuses</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {hiredReferrals.map((ref) => (
              <div key={ref.id} className="px-5 py-3.5 hover:bg-white/5 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {ref.candidateName}
                      <span className="text-muted-foreground font-normal"> for </span>
                      {ref.jobTitle}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      Referred by {ref.referrerName} · {new Date(ref.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    {ref.bonusAmount ? (
                      <>
                        <p className="text-sm font-semibold text-foreground">
                          ₹{ref.bonusAmount.toLocaleString('en-IN')}
                        </p>
                        <span className={`text-[10px] font-medium ${ref.bonusPaid ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {ref.bonusPaid ? 'Paid' : 'Pending'}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground/50">No bonus set</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

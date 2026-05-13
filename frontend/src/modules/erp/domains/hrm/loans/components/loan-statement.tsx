'use client';

import { Download, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Loan } from '../types';

interface LoanStatementProps {
  loan: Loan;
  transactions: Array<{
    id: string;
    date: string;
    description: string;
    debit?: number;
    credit?: number;
    balance: number;
  }>;
  onExportPDF?: () => void;
  onExportCSV?: () => void;
}

export function LoanStatement({ loan, transactions, onExportPDF, onExportCSV }: LoanStatementProps) {
  if (transactions.length === 0) {
    return (
      <div className="py-8 text-center">
        <FileText className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Loan Statement</h4>
          <p className="text-[10px] text-muted-foreground">{loan.loanTypeName} · Disbursed: {loan.disbursalDate}</p>
        </div>
        <div className="flex items-center gap-2">
          {onExportPDF && (
            <button
              onClick={onExportPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-module-erp/10 border border-module-erp/20 text-module-erp rounded-lg hover:bg-module-erp/20 transition-all duration-200"
            >
              <Download className="h-3.5 w-3.5" />PDF
            </button>
          )}
          {onExportCSV && (
            <button
              onClick={onExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 text-muted-foreground rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              <Download className="h-3.5 w-3.5" />CSV
            </button>
          )}
        </div>
      </div>

      {/* Statement Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-4 py-2.5">Date</th>
                <th className="text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-4 py-2.5">Description</th>
                <th className="text-right text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-4 py-2.5">Debit</th>
                <th className="text-right text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-4 py-2.5">Credit</th>
                <th className="text-right text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-4 py-2.5">Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200">
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{txn.date}</td>
                  <td className="px-4 py-2.5 text-xs text-foreground">{txn.description}</td>
                  <td className="px-4 py-2.5 text-xs text-right">
                    {txn.debit ? (
                      <span className="flex items-center justify-end gap-1 text-red-400">
                        <ArrowUpRight className="h-3 w-3" />
                        ₹{txn.debit.toLocaleString('en-IN')}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-right">
                    {txn.credit ? (
                      <span className="flex items-center justify-end gap-1 text-emerald-400">
                        <ArrowDownRight className="h-3 w-3" />
                        ₹{txn.credit.toLocaleString('en-IN')}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-right font-medium text-foreground">
                    ₹{txn.balance.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Award, Download, Printer, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { Certificate } from '../types';
import { isCertExpiringSoon, isCertExpired } from '../training.utils';

interface TrainingCertificateProps {
  certificate: Certificate;
  onDownload?: (certificate: Certificate) => void;
  onPrint?: (certificate: Certificate) => void;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string; icon?: React.ComponentType<{ className?: string }> }> = {
  active: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/15' },
  expired: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/15' },
  expiring: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/15' },
};

export function TrainingCertificate({ certificate, onDownload, onPrint }: TrainingCertificateProps) {
  const isExpired = certificate.expiryDate ? isCertExpired(certificate.expiryDate) : false;
  const isExpiring = certificate.expiryDate ? isCertExpiringSoon(certificate.expiryDate) : false;
  const effectiveStatus = isExpired ? 'expired' : isExpiring ? 'expiring' : certificate.status;
  const style = STATUS_STYLES[effectiveStatus] || STATUS_STYLES.active;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      {/* Certificate visual */}
      <div className="relative bg-gradient-to-br from-module-erp/5 to-module-erp/[0.02] border border-module-erp/20 rounded-xl p-6 text-center">
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md border ${style.bg} ${style.text} ${style.border}`}>
            {effectiveStatus === 'expired' && <AlertTriangle className="h-3 w-3" />}
            {effectiveStatus === 'active' && <CheckCircle2 className="h-3 w-3" />}
            {effectiveStatus.charAt(0).toUpperCase() + effectiveStatus.slice(1)}
          </span>
        </div>

        {/* Award icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-module-erp/10 flex items-center justify-center mb-4">
          <Award className="h-8 w-8 text-module-erp" />
        </div>

        {/* Certificate number */}
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
          Certificate #{certificate.certificateNumber}
        </p>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-1">Certificate of Completion</h3>

        {/* Participant */}
        <p className="text-xs text-muted-foreground mt-3">This is to certify that</p>
        <p className="text-base font-semibold text-foreground mt-1">{certificate.employeeName}</p>

        {/* Program */}
        <p className="text-xs text-muted-foreground mt-3">has successfully completed the training program</p>
        <p className="text-sm font-semibold text-module-erp mt-1">{certificate.programTitle}</p>

        {/* Date */}
        <div className="flex items-center justify-center gap-1.5 mt-4 text-[10px] text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Issued: {new Date(certificate.issueDate).toLocaleDateString()}</span>
          {certificate.expiryDate && (
            <>
              <span>·</span>
              <span className={isExpired ? 'text-red-400' : isExpiring ? 'text-amber-400' : ''}>
                Expires: {new Date(certificate.expiryDate).toLocaleDateString()}
              </span>
            </>
          )}
        </div>

        {/* Validity */}
        <p className="text-[9px] text-muted-foreground/50 mt-2">
          Valid for {certificate.validityMonths} months
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-4">
        {onDownload && (
          <button
            onClick={() => onDownload(certificate)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-module-erp text-white text-xs font-medium hover:bg-module-erp/90 press-scale transition-all duration-200"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        )}
        {onPrint && (
          <button
            onClick={() => onPrint(certificate)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-foreground hover:bg-white/10 transition-all duration-200"
          >
            <Printer className="h-3.5 w-3.5" />
            Print
          </button>
        )}
      </div>
    </div>
  );
}

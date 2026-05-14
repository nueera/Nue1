// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export interface CRMSettings { general: { companyName: string; currency: string; timezone: string; fiscalYear: string }; security: { ipRestriction: boolean; twoFactor: boolean; sessionTimeout: number }; dataAdmin: { autoBackup: boolean; backupFrequency: string; deduplication: boolean }; }

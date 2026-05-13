import { z } from "zod";
export const createAccountSchema = z.object({
  name: z.string().min(1, "Account name required"),
  type: z.enum(["customer","prospect","partner","vendor","reseller","competitor"] as const).default("prospect"),
  tier: z.enum(["enterprise","mid-market","smb","startup","freemium"] as const).default("smb"),
  ownership: z.enum(["private","public","subsidiary","government","non-profit"] as const).optional(),
  industry: z.enum(["technology","finance","healthcare","education","manufacturing","retail","media","energy","real-estate","transportation","other"] as const).optional(),
  annualRevenue: z.number().optional(), employees: z.number().optional(),
  phone: z.string().optional(), website: z.string().url().optional().or(z.literal("")),
  description: z.string().max(5000).optional(), billingStreet: z.string().optional(),
  billingCity: z.string().optional(), billingState: z.string().optional(),
  billingZip: z.string().optional(), billingCountry: z.string().optional(),
});
export const updateAccountSchema = createAccountSchema.partial();
export const accountMergeSchema = z.object({ primaryId: z.string().min(1), secondaryIds: z.array(z.string()).min(1), fieldResolutions: z.record(z.enum(["primary","secondary"])).optional() });
export const accountMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateAccountInput = z.infer<typeof createAccountSchema>; export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
export type AccountMergeInput = z.infer<typeof accountMergeSchema>; export type AccountMassUpdateInput = z.infer<typeof accountMassUpdateSchema>;
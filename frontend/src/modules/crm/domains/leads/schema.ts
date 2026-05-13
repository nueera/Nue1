import { z } from "zod";
export const createLeadSchema = z.object({
  firstName: z.string().min(1, "First name is required"), lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"), phone: z.string().min(1, "Phone required"),
  company: z.string().min(1, "Company required"), title: z.string().optional(),
  leadSource: z.enum(["web","referral","advertisement","cold-call","trade-show","social-media","email-campaign","partner","organic","other"] as const),
  status: z.enum(["new","contacted","qualified","unqualified","converted","nurturing","junk"] as const).default("new"),
  rating: z.enum(["hot","warm","cold"] as const).default("warm"),
  industry: z.string().optional(), annualRevenue: z.number().optional(), website: z.string().url().optional().or(z.literal("")),
  description: z.string().max(5000).optional(), street: z.string().optional(), city: z.string().optional(),
  state: z.string().optional(), zipCode: z.string().optional(), country: z.string().optional(), assignedTo: z.string().optional(),
});
export const updateLeadSchema = createLeadSchema.partial();
export const leadConvertSchema = z.object({ createContact: z.boolean().default(true), createAccount: z.boolean().default(true), createDeal: z.boolean().default(false), dealAmount: z.number().positive().optional(), dealClosingDate: z.string().optional() });
export const leadMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export const leadImportSchema = z.object({ file: z.instanceof(File), mapping: z.record(z.string(), z.string()), duplicateHandling: z.enum(["skip","overwrite","create-new"] as const).default("skip") });
export type CreateLeadInput = z.infer<typeof createLeadSchema>; export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type LeadConvertInput = z.infer<typeof leadConvertSchema>; export type LeadMassUpdateInput = z.infer<typeof leadMassUpdateSchema>;
export type LeadImportInput = z.infer<typeof leadImportSchema>;
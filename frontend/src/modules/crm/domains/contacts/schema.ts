import { z } from "zod";
export const createContactSchema = z.object({
  firstName: z.string().min(1, "First name required"), lastName: z.string().min(1, "Last name required"),
  email: z.string().email("Invalid email"), phone: z.string().min(1, "Phone required"),
  title: z.string().optional(), department: z.string().optional(), accountId: z.string().optional(),
  type: z.enum(["customer","prospect","vendor","partner","employee","other"] as const).default("prospect"),
  lifecycle: z.enum(["subscriber","lead","opportunity","customer","churned","evangelist"] as const).default("lead"),
  leadSource: z.string().optional(), mailingStreet: z.string().optional(), mailingCity: z.string().optional(),
  mailingState: z.string().optional(), mailingZip: z.string().optional(), mailingCountry: z.string().optional(),
  description: z.string().max(5000).optional(),
});
export const updateContactSchema = createContactSchema.partial();
export const contactMergeSchema = z.object({ primaryId: z.string().min(1), secondaryIds: z.array(z.string()).min(1), fieldResolutions: z.record(z.enum(["primary","secondary"])).optional() });
export const contactMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateContactInput = z.infer<typeof createContactSchema>; export type UpdateContactInput = z.infer<typeof updateContactSchema>;
export type ContactMergeInput = z.infer<typeof contactMergeSchema>; export type ContactMassUpdateInput = z.infer<typeof contactMassUpdateSchema>;
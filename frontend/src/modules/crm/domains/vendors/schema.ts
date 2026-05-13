import { z } from "zod";

export const createVendorSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateVendorSchema = createVendorSchema.partial();
export const vendorsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateVendorInput = z.infer<typeof createVendorSchema>;
export type UpdateVendorInput = z.infer<typeof updateVendorSchema>;
export type VendorMassUpdateInput = z.infer<typeof vendorsMassUpdateSchema>;
// schemas/invoiceStagesSchema.ts
import { z } from 'zod';

export const invoiceStagesSchema = z.object({
  state: z.string().min(1, "State is required"),
  stageDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Enter a valid date for the stage",
  }),
  invoiceId: z.number().min(1, "Invoice ID is required"),
  staffId: z.number().min(1, "Staff ID is required"),
});

export type InvoiceStagesFormData = z.infer<typeof invoiceStagesSchema>;

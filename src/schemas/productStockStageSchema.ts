// schemas/productStockStageSchema.ts
import { z } from 'zod';

export const productStockStageSchema = z.object({
  stage: z.string().min(1, "Stage is required"),
  stageDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Enter a valid date for stage",
  }),
  stockId: z.number().min(1, "Stock ID is required"),
  invoiceId: z.number().min(1, "Invoice ID is required"),
  staffId: z.number().min(1, "Staff ID is required"),
});

export type ProductStockStageFormData = z.infer<typeof productStockStageSchema>;

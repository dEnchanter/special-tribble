// schemas/productionSchema.ts
import { z } from 'zod';

export const productionSchema = z.object({
  assignDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Enter a valid assign date",
  }),
  code: z.string().min(1, "Code is required"),
  stage: z.string().min(1, "Stage is required"),
  tailorId: z.number().min(1, "Tailor ID is required"),
  productInfo: z.record(z.unknown()).refine(val => Object.keys(val).length > 0, {
    message: "Product Information are required"
  }),
  materialRequestId: z.number().min(1, "Material Request ID is required"),
});

export type ProductionFormData = z.infer<typeof productionSchema>;

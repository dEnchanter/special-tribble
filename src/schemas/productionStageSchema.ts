// schemas/productionStagesSchema.ts
import { z } from 'zod';

export const productionStagesSchema = z.object({
  changeDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Enter a valid date for stage change",
  }),
  stageName: z.string().min(1, "Stage name is required"),
  description: z.string().min(1, "Description is required"),
  productionId: z.number().min(1, "Production ID is required"),
  staffId: z.number().min(1, "Staff ID is required"),
});

export type ProductionStagesFormData = z.infer<typeof productionStagesSchema>;

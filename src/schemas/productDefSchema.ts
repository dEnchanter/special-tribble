// schemas/productDefSchema.ts
import { z } from 'zod';

export const productDefSchema = z.object({
  code: z.string().min(1, "Product code is required"),
  name: z.string().min(1, "Product name is required"),
  cost: z.number().min(0, "Cost must be greater than or equal to 0"),
  def: z.record(z.unknown()).refine(val => Object.keys(val).length > 0, {
    message: "Product Specification are required"
  }),
  productSizes: z.record(z.unknown()).refine(val => Object.keys(val).length > 0, {
    message: "Product Sizes are required"
  }),
  description: z.string().min(1, "Product description is required"),
  genderType: z.string().min(1, "Gender type is required"),
  creatorId: z.number().min(1, "Creator ID is required"),
});

export type ProductDefFormData = z.infer<typeof productDefSchema>;

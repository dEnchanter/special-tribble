// schemas/productInProductionSchema.ts
import { z } from 'zod';

export const productInProductionSchema = z.object({
  dateRequested: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Enter a valid date for request",
  }),
  requestedBy: z.number().min(1, "Requested By (User ID) is required"),
  quantity: z.record(z.unknown()).refine(val => Object.keys(val).length > 0, {
    message: "Product Quantity is required"
  }),
  productGuide: z.record(z.unknown()).refine(val => Object.keys(val).length > 0, {
    message: "Product Guide is required"
  }),
  isActive: z.boolean(),
  productId: z.number().min(1, "Product ID is required"),
});

export type ProductInProductionFormData = z.infer<typeof productInProductionSchema>;

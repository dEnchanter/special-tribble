// schemas/productStockSchema.ts
import { z } from 'zod';

export const productStockSchema = z.object({
  productionCode: z.string().min(1, "Production Code is required"),
  pushedBy: z.number().min(1, "Pushed By (User ID) is required"),
  receivedBy: z.number().min(1, "Received By (User ID) is required"),
  productInfo: z.record(z.unknown()).refine(val => Object.keys(val).length > 0, {
    message: "Product Information is required"
  }),
  isAvailable: z.boolean(),
  productDefId: z.number().min(1, "Product Definition ID is required"),
});

export type ProductStockFormData = z.infer<typeof productStockSchema>;

// schemas/customerTypeSchema.ts
import { z } from 'zod';

export const customerTypeSchema = z.object({
  type: z.string().min(1, "Customer type is required"),
});

export type CustomerTypeFormData = z.infer<typeof customerTypeSchema>;

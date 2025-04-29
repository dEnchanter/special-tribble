// schemas/customerSchema.ts
import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  customerType: z.object({
    id: z.number().min(1, "Customer type ID is required"),
    type: z.string().min(1, "Customer type is required"),
  }),
});

export type CustomerFormData = z.infer<typeof customerSchema>;

// schemas/itemTypeSchema.ts
import { z } from 'zod';

export const itemTypeSchema = z.object({
  name: z.string().min(1, "Item type name is required"),
  code: z.string().min(1, "Item code is required"),
  unit: z.string().min(1, "Unit is required"),
});

export type ItemTypeFormData = z.infer<typeof itemTypeSchema>;

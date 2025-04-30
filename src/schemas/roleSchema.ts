// schemas/roleSchema.ts
import { z } from 'zod';

export const roleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  code: z.string().min(1, "Code is required"),
  unit: z.string().min(1, "Unit is required"),
  isLogin: z.boolean(),
});

export type RoleFormData = z.infer<typeof roleSchema>;
